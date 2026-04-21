from __future__ import annotations

import re
from typing import Any

from times_data.wiki import WikiEntry, WikiIndex, get_default_index


_INDEXES_RE = re.compile(r"^\s*\*\*Indexes:\*\*\s*(.+?)\s*$", re.MULTILINE | re.IGNORECASE)
_CATEGORY_RE = re.compile(r"^\s*\*\*Category:\*\*\s*(.+?)\s*$", re.MULTILINE | re.IGNORECASE)
_DEFAULT_IE_RE = re.compile(r"Default\s*i/e\s*:\s*([A-Za-z0-9_+\-]+)", re.IGNORECASE)
_DESCRIPTION_RE = re.compile(
    r"##\s*Description\s*\n+([^\n][^\n]*(?:\n[^\n#][^\n]*)*)",
    re.IGNORECASE,
)


def _parse_indexes(body: str) -> list[str] | None:
    match = _INDEXES_RE.search(body)
    if not match:
        return None
    raw = match.group(1).strip()
    raw = re.sub(r"^[\(\[]+|[\)\]]+$", "", raw)
    parts = [p.strip().strip("`") for p in re.split(r"[,\s]+", raw) if p.strip()]
    return parts or None


def _parse_category(body: str) -> str | None:
    match = _CATEGORY_RE.search(body)
    if not match:
        return None
    return match.group(1).strip()


def _parse_default_ie(body: str) -> str | None:
    match = _DEFAULT_IE_RE.search(body)
    if not match:
        return None
    return match.group(1).strip()


def _parse_description(body: str, *, max_length: int = 240) -> str | None:
    match = _DESCRIPTION_RE.search(body)
    if not match:
        flat = re.sub(r"\s+", " ", body).strip()
        return (flat[: max_length - 1] + "…") if len(flat) > max_length else (flat or None)
    text = re.sub(r"\s+", " ", match.group(1)).strip()
    if not text:
        return None
    if len(text) > max_length:
        return text[: max_length - 1] + "…"
    return text


def _entry_payload(entry: WikiEntry) -> dict[str, Any]:
    return {
        "slug": entry.slug,
        "type": entry.type,
        "title": entry.title,
        "body_markdown": entry.body_markdown,
        "frontmatter": entry.frontmatter or {},
    }


def categories_payload(index: WikiIndex | None = None) -> dict[str, Any]:
    idx = index if index is not None else get_default_index()
    return {"categories": idx.list_categories()}


def entry_payload(slug: str, *, index: WikiIndex | None = None) -> dict[str, Any] | None:
    idx = index if index is not None else get_default_index()
    entry = idx.get(slug)
    return _entry_payload(entry) if entry else None


def parameter_payload(name: str, *, index: WikiIndex | None = None) -> dict[str, Any] | None:
    idx = index if index is not None else get_default_index()
    entry = idx.get_parameter(name)
    return _entry_payload(entry) if entry else None


def concept_payload(slug: str, *, index: WikiIndex | None = None) -> dict[str, Any] | None:
    idx = index if index is not None else get_default_index()
    entry = idx.get_concept(slug)
    return _entry_payload(entry) if entry else None


def faq_payload(slug: str, *, index: WikiIndex | None = None) -> dict[str, Any] | None:
    idx = index if index is not None else get_default_index()
    entry = idx.get_faq(slug)
    return _entry_payload(entry) if entry else None


def search_payload(
    query: str,
    *,
    limit: int = 10,
    types: list[str] | None = None,
    index: WikiIndex | None = None,
) -> dict[str, Any]:
    idx = index if index is not None else get_default_index()
    hits = idx.search(query=query, limit=limit, types=types)
    return {
        "hits": [
            {
                "slug": hit.slug,
                "type": hit.type,
                "title": hit.title,
                "snippet": hit.snippet,
                "score": hit.score,
            }
            for hit in hits
        ]
    }


def _list_item(entry: WikiEntry) -> dict[str, Any]:
    body = entry.body_markdown or ""
    return {
        "slug": entry.slug,
        "type": entry.type,
        "title": entry.title,
        "indexes": _parse_indexes(body),
        "category": _parse_category(body),
        "default_ie": _parse_default_ie(body),
        "description": _parse_description(body),
    }


def list_payload(
    *,
    types: list[str] | None = None,
    limit: int | None = None,
    offset: int | None = None,
    query: str | None = None,
    index: WikiIndex | None = None,
) -> dict[str, Any]:
    idx = index if index is not None else get_default_index()
    type_filter = {t.lower() for t in types} if types else None
    needle = (query or "").strip().lower()

    matched: list[WikiEntry] = []
    for entry in idx.all_entries():
        if type_filter and entry.type.lower() not in type_filter:
            continue
        if needle:
            haystacks: list[str] = [entry.title or "", entry.slug or ""]
            haystacks.extend(entry.aliases or [])
            if not any(needle in h.lower() for h in haystacks):
                continue
        matched.append(entry)

    matched.sort(key=lambda e: (e.type, e.title.lower()))
    total = len(matched)
    start = max(0, offset or 0)
    end = total if limit is None else start + max(0, limit)
    page = matched[start:end]
    return {
        "hits": [_list_item(entry) for entry in page],
        "total": total,
    }
