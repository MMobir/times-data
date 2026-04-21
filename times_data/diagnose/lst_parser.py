"""Parse a GAMS .LST snippet from a TIMES run into an actionable report."""

from __future__ import annotations

import re
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Optional

from times_data.wiki import WikiIndex, get_default_index

# Plain-English hints for the most commonly observed TIMES equations.
_EQUATION_HINTS: dict[str, str] = {
    "EQ_COMBAL": (
        "Commodity balance: production plus imports do not meet demand plus "
        "exports for the indicated region/commodity/period/timeslice."
    ),
    "EQ_PEAK": (
        "Peak equation: installed capacity is insufficient to cover the peak "
        "demand for the indicated commodity and period."
    ),
    "EQ_PTRANS": (
        "Process transformation: input/output flows are inconsistent with the "
        "process activity for the indicated process."
    ),
    "EQ_CAPACT": (
        "Capacity-activity relation: process activity exceeds the available "
        "capacity (installed plus reserve) for the period."
    ),
    "EQ_CUMFLO": (
        "Cumulative flow: a cumulative limit (e.g. CUM constraint) on a "
        "commodity flow has been violated."
    ),
    "EQ_ACTBL": (
        "Activity bound: process activity violates a user-supplied bound "
        "(ACT_BND or similar) for the indicated indices."
    ),
    "EQ_ACTUPS": (
        "Activity upper bound by timeslice: per-timeslice activity exceeds "
        "the user-supplied limit."
    ),
    "EQ_CAPLOA": (
        "Capacity loading: timeslice capacity loading exceeds the available "
        "capacity for the indicated period."
    ),
    "EQ_OBJ": (
        "Objective row marked infeasible: typically a downstream symptom of "
        "another infeasibility; check earlier rows first."
    ),
}

_ERROR_HINTS: dict[str, str] = {
    "$338": (
        "Symbol declared but never assigned a value. Check that the parameter "
        "or set referenced in the equation has been populated in your DD files."
    ),
    "$148": (
        "Dimension mismatch in an assignment or equation. Verify that the "
        "indices in the symbol declaration match the indices used at the "
        "assignment site."
    ),
    "$170": (
        "Domain violation: the value supplied is not a member of the declared "
        "set domain. Confirm that all set elements (regions, processes, "
        "commodities, timeslices) are declared before being referenced."
    ),
    "$172": (
        "Set element used but not declared. Add the missing element to the "
        "appropriate set, or fix the typo in the DD file."
    ),
    "$282": (
        "Identifier expected but not found. Often caused by a stray character "
        "or a missing semicolon in the DD file."
    ),
    "170": (
        "Domain violation (Error 170): a symbol was used with a set element "
        "that is not part of its declared domain. Check that set members are "
        "declared in the right order."
    ),
}

_EQUATION_ROW_RE = re.compile(
    r"(EQ_[A-Z0-9_]+)\s*\(\s*([^)]*)\s*\)",
    re.IGNORECASE,
)
_INFEASIBLE_LINE_RE = re.compile(r"infeas", re.IGNORECASE)
_OBJECTIVE_RE = re.compile(
    r"(?:\*{4}\s*OBJECTIVE\s*VALUE|OBJECTIVE\s*VALUE|Objective)\s*[:=]?\s*"
    r"([\-\+]?\d+(?:\.\d+)?(?:[eE][\-\+]?\d+)?)",
    re.IGNORECASE,
)
_ERROR_DOLLAR_RE = re.compile(r"\*{4}\s*\$(\d+)")
_ERROR_NUM_RE = re.compile(r"\bError\s+(\d+)", re.IGNORECASE)
_DOMAIN_VIOLATION_RE = re.compile(r"Domain\s+violation", re.IGNORECASE)
_STATUS_OPTIMAL_RE = re.compile(r"SOLVER\s+STATUS\s*[:=]?\s*[12]\s+(?:NORMAL|OPTIMAL)|MODEL\s+STATUS\s*[:=]?\s*1\s+OPTIMAL", re.IGNORECASE)


@dataclass
class InfeasibleEquation:
    raw: str
    equation: str
    args: list[str]
    hint: str

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class LstError:
    raw: str
    code: str
    hint: str

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class FAQLink:
    slug: str
    title: str

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class InfeasibilityReport:
    status: str = "UNKNOWN"
    objective: Optional[float] = None
    infeasible_equations: list[InfeasibleEquation] = field(default_factory=list)
    errors: list[LstError] = field(default_factory=list)
    faq_links: list[FAQLink] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "status": self.status,
            "objective": self.objective,
            "infeasible_equations": [eq.to_dict() for eq in self.infeasible_equations],
            "errors": [err.to_dict() for err in self.errors],
            "faq_links": [link.to_dict() for link in self.faq_links],
        }


def _split_args(raw: str) -> list[str]:
    parts: list[str] = []
    for chunk in raw.split(","):
        cleaned = chunk.strip().strip("'\"")
        if cleaned:
            parts.append(cleaned)
    return parts


def _equation_hint(name: str) -> str:
    upper = name.upper()
    if upper in _EQUATION_HINTS:
        return _EQUATION_HINTS[upper]
    return (
        "TIMES equation reported infeasible. Inspect the listed indices and "
        "confirm that supply, demand, and bounds are compatible."
    )


def _error_hint(code: str) -> str:
    if code in _ERROR_HINTS:
        return _ERROR_HINTS[code]
    return "GAMS reported an error; consult the GAMS log for context."


def _collect_faq_links(index: WikiIndex, max_links: int = 5) -> list[FAQLink]:
    queries = ["infeasibility", "error", "debugging"]
    seen: set[str] = set()
    links: list[FAQLink] = []
    for query in queries:
        for hit in index.search(query, limit=max_links, types=["faq"]):
            if hit.slug in seen:
                continue
            seen.add(hit.slug)
            links.append(FAQLink(slug=hit.slug, title=hit.title))
            if len(links) >= max_links:
                return links
    return links


def parse_lst_text(text: str, *, wiki_index: WikiIndex | None = None) -> InfeasibilityReport:
    """Parse a GAMS .LST snippet and produce an actionable infeasibility report."""
    report = InfeasibilityReport()
    if not text:
        return report

    seen_equations: set[tuple[str, tuple[str, ...]]] = set()
    seen_errors: set[tuple[str, str]] = set()
    has_infeasible_marker = False
    has_error_marker = False

    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue

        if _INFEASIBLE_LINE_RE.search(stripped):
            has_infeasible_marker = True
            for match in _EQUATION_ROW_RE.finditer(stripped):
                equation = match.group(1).upper()
                args = _split_args(match.group(2))
                key = (equation, tuple(args))
                if key in seen_equations:
                    continue
                seen_equations.add(key)
                report.infeasible_equations.append(
                    InfeasibleEquation(
                        raw=stripped,
                        equation=equation,
                        args=args,
                        hint=_equation_hint(equation),
                    )
                )

        for match in _ERROR_DOLLAR_RE.finditer(stripped):
            code = f"${match.group(1)}"
            key = (code, stripped)
            if key in seen_errors:
                continue
            seen_errors.add(key)
            report.errors.append(LstError(raw=stripped, code=code, hint=_error_hint(code)))
            has_error_marker = True

        for match in _ERROR_NUM_RE.finditer(stripped):
            code = match.group(1)
            key = (code, stripped)
            if key in seen_errors:
                continue
            seen_errors.add(key)
            report.errors.append(LstError(raw=stripped, code=code, hint=_error_hint(code)))
            has_error_marker = True

        if _DOMAIN_VIOLATION_RE.search(stripped):
            key = ("170", stripped)
            if key not in seen_errors:
                seen_errors.add(key)
                report.errors.append(
                    LstError(raw=stripped, code="170", hint=_error_hint("170"))
                )
                has_error_marker = True

        objective_match = _OBJECTIVE_RE.search(stripped)
        if objective_match and report.objective is None:
            try:
                report.objective = float(objective_match.group(1))
            except ValueError:
                pass

    if has_infeasible_marker or report.infeasible_equations:
        report.status = "INFEASIBLE"
    elif has_error_marker:
        report.status = "ERROR"
    elif _STATUS_OPTIMAL_RE.search(text):
        report.status = "OPTIMAL"
    else:
        report.status = "UNKNOWN"

    index = wiki_index if wiki_index is not None else get_default_index()
    report.faq_links = _collect_faq_links(index)
    return report


def parse_lst_file(path: Path, *, wiki_index: WikiIndex | None = None) -> InfeasibilityReport:
    """Read a .LST file from disk and parse it."""
    file_path = Path(path)
    text = file_path.read_text(encoding="utf-8", errors="replace")
    return parse_lst_text(text, wiki_index=wiki_index)


__all__ = [
    "FAQLink",
    "InfeasibilityReport",
    "InfeasibleEquation",
    "LstError",
    "parse_lst_file",
    "parse_lst_text",
]
