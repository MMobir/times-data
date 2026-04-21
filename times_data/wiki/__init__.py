"""Bundled TIMES wiki knowledge base with lazy in-memory index and search."""

from __future__ import annotations

import re
import threading
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import yaml

DATA_DIR = Path(__file__).resolve().parent / "data"

_STOPWORDS = frozenset(
    {
        "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from",
        "has", "have", "if", "in", "into", "is", "it", "its", "of", "on", "or",
        "that", "the", "their", "then", "there", "these", "this", "to", "was",
        "were", "will", "with", "which", "when", "while", "where", "what", "who",
        "how", "may", "any", "all", "can", "such", "than", "they", "you", "your",
        "we", "our", "i",
    }
)

_TOKEN_RE = re.compile(r"[A-Za-z0-9_]+")
_FRONTMATTER_RE = re.compile(r"\A---\s*\n(.*?)\n---\s*\n?(.*)\Z", re.DOTALL)


@dataclass
class WikiEntry:
    """A single wiki page bundled with the package."""

    slug: str
    type: str
    title: str
    body_markdown: str
    frontmatter: dict
    relative_path: str
    aliases: list[str] = field(default_factory=list)


@dataclass
class SearchHit:
    """Result row for `WikiIndex.search`."""

    slug: str
    type: str
    title: str
    snippet: str
    score: float


def _tokenize(text: str) -> list[str]:
    return [
        token.lower()
        for token in _TOKEN_RE.findall(text or "")
        if token.lower() not in _STOPWORDS and not token.isdigit()
    ]


def _canonical_slug(name: str) -> str:
    """Normalise a free-form name into the index's canonical slug form."""
    name = name.strip().lower()
    name = name.replace("_", "-").replace(" ", "-")
    name = re.sub(r"-+", "-", name).strip("-")
    return name


def _parse_markdown(text: str) -> tuple[dict, str]:
    match = _FRONTMATTER_RE.match(text)
    if not match:
        return {}, text
    raw_front, body = match.group(1), match.group(2)
    try:
        frontmatter = yaml.safe_load(raw_front) or {}
    except yaml.YAMLError:
        frontmatter = {}
    if not isinstance(frontmatter, dict):
        frontmatter = {}
    return frontmatter, body


def _categorize(relative_path: Path, frontmatter: dict, filename_stem: str) -> str:
    """Map a wiki page to one of the public category labels."""
    parts = {p.lower() for p in relative_path.parts}
    if "parameters" in parts and "entities" in parts:
        return "parameter"
    if "sets" in parts and "entities" in parts:
        return "set"
    if "indexes" in parts and "entities" in parts:
        return "index"

    declared = str(frontmatter.get("type") or "").strip().lower()
    if filename_stem == "overview" and not relative_path.parent.parts:
        return "overview"
    if filename_stem == "index" and not relative_path.parent.parts:
        return "index"
    if "faq" in parts or declared == "faq":
        return "faq"
    if "concepts" in parts or declared == "concept":
        return "concept"
    if "topics" in parts or declared == "topic":
        return "topic"
    if "sources" in parts or declared.startswith("source"):
        return "source"
    return declared or "other"


class WikiIndex:
    """Lazy, thread-safe in-memory index over the bundled wiki markdown files."""

    def __init__(self, data_dir: Path | None = None) -> None:
        self._data_dir = Path(data_dir) if data_dir is not None else DATA_DIR
        self._lock = threading.Lock()
        self._loaded = False
        self._entries: dict[str, WikiEntry] = {}
        self._inverted: dict[str, dict[str, int]] = defaultdict(dict)
        self._title_tokens: dict[str, set[str]] = {}
        self._alias_index: dict[str, str] = {}
        self._categories: Counter[str] = Counter()

    @property
    def data_dir(self) -> Path:
        return self._data_dir

    def _ensure_loaded(self) -> None:
        if self._loaded:
            return
        with self._lock:
            if self._loaded:
                return
            self._load()
            self._loaded = True

    def _load(self) -> None:
        if not self._data_dir.exists():
            return
        for path in sorted(self._data_dir.rglob("*.md")):
            try:
                text = path.read_text(encoding="utf-8")
            except OSError:
                continue
            relative_path = path.relative_to(self._data_dir)
            frontmatter, body = _parse_markdown(text)
            stem = path.stem
            slug = _canonical_slug(stem)
            if not slug:
                continue
            entry_type = _categorize(relative_path, frontmatter, stem)
            title = str(frontmatter.get("title") or stem)
            aliases_raw = frontmatter.get("aliases") or []
            if isinstance(aliases_raw, str):
                aliases = [aliases_raw]
            elif isinstance(aliases_raw, list):
                aliases = [str(item) for item in aliases_raw if item is not None]
            else:
                aliases = []
            entry = WikiEntry(
                slug=slug,
                type=entry_type,
                title=title,
                body_markdown=body,
                frontmatter=frontmatter,
                relative_path=str(relative_path).replace("\\", "/"),
                aliases=aliases,
            )
            existing = self._entries.get(slug)
            if existing is not None:
                # Disambiguate by category to avoid clobbering distinct pages
                # that happen to share a stem (e.g. concepts/x.md vs faq/x.md).
                slug = f"{entry_type}:{slug}"
                entry.slug = slug
                if slug in self._entries:
                    continue
            self._entries[slug] = entry
            self._categories[entry_type] += 1

            title_tokens = set(_tokenize(title)) | {_canonical_slug(title)}
            self._title_tokens[slug] = {t for t in title_tokens if t}

            for alias in aliases:
                key = _canonical_slug(alias)
                if key:
                    self._alias_index.setdefault(key, slug)
            self._alias_index.setdefault(_canonical_slug(stem), slug)

            tokens: list[str] = []
            tokens.extend(_tokenize(title))
            for alias in aliases:
                tokens.extend(_tokenize(alias))
            tokens.extend(_tokenize(body))
            counts = Counter(tokens)
            for token, count in counts.items():
                self._inverted[token][slug] = count

    def get(self, slug: str) -> Optional[WikiEntry]:
        self._ensure_loaded()
        if not slug:
            return None
        if slug in self._entries:
            return self._entries[slug]
        canonical = _canonical_slug(slug)
        if canonical in self._entries:
            return self._entries[canonical]
        target = self._alias_index.get(canonical)
        if target and target in self._entries:
            return self._entries[target]
        return None

    def _get_with_type(self, slug: str, expected_type: str) -> Optional[WikiEntry]:
        self._ensure_loaded()
        canonical = _canonical_slug(slug)
        prefixed = f"{expected_type}:{canonical}"
        if prefixed in self._entries:
            return self._entries[prefixed]
        entry = self.get(slug)
        if entry is not None and entry.type == expected_type:
            return entry
        for stored in self._entries.values():
            if stored.type != expected_type:
                continue
            if _canonical_slug(stored.slug.split(":", 1)[-1]) == canonical:
                return stored
            if any(_canonical_slug(a) == canonical for a in stored.aliases):
                return stored
        return None

    def get_parameter(self, name: str) -> Optional[WikiEntry]:
        return self._get_with_type(name, "parameter")

    def get_set(self, name: str) -> Optional[WikiEntry]:
        return self._get_with_type(name, "set")

    def get_index(self, name: str) -> Optional[WikiEntry]:
        return self._get_with_type(name, "index")

    def get_concept(self, slug: str) -> Optional[WikiEntry]:
        return self._get_with_type(slug, "concept")

    def get_topic(self, slug: str) -> Optional[WikiEntry]:
        return self._get_with_type(slug, "topic")

    def get_faq(self, slug: str) -> Optional[WikiEntry]:
        return self._get_with_type(slug, "faq")

    def list_categories(self) -> dict[str, int]:
        self._ensure_loaded()
        return dict(self._categories)

    def all_entries(self) -> list[WikiEntry]:
        self._ensure_loaded()
        return list(self._entries.values())

    def search(
        self,
        query: str,
        limit: int = 10,
        types: Optional[list[str]] = None,
    ) -> list[SearchHit]:
        self._ensure_loaded()
        tokens = _tokenize(query or "")
        if not tokens:
            return []
        type_filter = {t.lower() for t in types} if types else None
        scores: dict[str, float] = defaultdict(float)
        for token in tokens:
            postings = self._inverted.get(token, {})
            for slug, count in postings.items():
                entry = self._entries[slug]
                if type_filter and entry.type not in type_filter:
                    continue
                scores[slug] += float(count)
                if token in self._title_tokens.get(slug, set()):
                    scores[slug] += 5.0
                slug_key = _canonical_slug(entry.slug.split(":", 1)[-1])
                if slug_key == _canonical_slug(token):
                    scores[slug] += 25.0
        if not scores:
            return []
        ranked = sorted(scores.items(), key=lambda kv: (-kv[1], kv[0]))[:limit]
        hits: list[SearchHit] = []
        for slug, score in ranked:
            entry = self._entries[slug]
            hits.append(
                SearchHit(
                    slug=entry.slug,
                    type=entry.type,
                    title=entry.title,
                    snippet=_make_snippet(entry.body_markdown, tokens),
                    score=score,
                )
            )
        return hits


def _make_snippet(body: str, tokens: list[str], width: int = 200) -> str:
    if not body:
        return ""
    flat = re.sub(r"\s+", " ", body).strip()
    lower = flat.lower()
    for token in tokens:
        idx = lower.find(token)
        if idx == -1:
            continue
        start = max(0, idx - width // 2)
        end = min(len(flat), start + width)
        snippet = flat[start:end].strip()
        prefix = "..." if start > 0 else ""
        suffix = "..." if end < len(flat) else ""
        return f"{prefix}{snippet}{suffix}"
    return flat[:width] + ("..." if len(flat) > width else "")


_DEFAULT_INDEX: Optional[WikiIndex] = None
_DEFAULT_LOCK = threading.Lock()


def get_default_index() -> WikiIndex:
    """Return a process-wide singleton index over the bundled wiki."""
    global _DEFAULT_INDEX
    if _DEFAULT_INDEX is None:
        with _DEFAULT_LOCK:
            if _DEFAULT_INDEX is None:
                _DEFAULT_INDEX = WikiIndex()
    return _DEFAULT_INDEX


__all__ = [
    "DATA_DIR",
    "SearchHit",
    "WikiEntry",
    "WikiIndex",
    "get_default_index",
]
