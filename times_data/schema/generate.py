"""Code generator that reads raw TIMES reference JSON and emits typed Python modules.

Usage:
    python3 -m times_data.schema.generate
"""
from __future__ import annotations

import json
import re
import textwrap
from pathlib import Path

RAW_DIR = Path(__file__).resolve().parents[2] / "raw" / "reference"
SCHEMA_DIR = Path(__file__).resolve().parent


def _repr_tuple(items: list[str] | tuple[str, ...]) -> str:
    """Return a valid Python tuple repr from a list of strings."""
    if not items:
        return "()"
    if len(items) == 1:
        return f"({items[0]!r},)"
    inner = ", ".join(repr(s) for s in items)
    return f"({inner})"


def _escape(s: str) -> str:
    """Escape a string for embedding in Python source."""
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")


# ---------------------------------------------------------------------------
# Indexes
# ---------------------------------------------------------------------------

def generate_indexes() -> str:
    with open(RAW_DIR / "indexes.json") as f:
        data = json.load(f)

    lines: list[str] = [
        "from __future__ import annotations",
        "",
        "from dataclasses import dataclass",
        "",
        "",
        "@dataclass(frozen=True)",
        "class IndexDef:",
        "    name: str",
        "    aliases: tuple[str, ...]",
        "    related: tuple[str, ...]",
        "    description: str",
        "",
        "",
        "INDEX_REGISTRY: dict[str, IndexDef] = {",
    ]

    for idx in data["indices"]:
        name = idx["Name"]
        aliases = tuple(idx.get("Aliases") or [])
        related = tuple(idx.get("Related Indexes") or [])
        desc = _escape(idx.get("Description") or "")

        lines.append(f"    {name.lower()!r}: IndexDef(")
        lines.append(f"        name={name!r},")
        lines.append(f"        aliases={_repr_tuple(aliases)},")
        lines.append(f"        related={_repr_tuple(related)},")
        lines.append(f"        description='{desc}',")
        lines.append("    ),")

    lines.append("}")
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Sets
# ---------------------------------------------------------------------------

def _parse_set_id(raw: str) -> tuple[str, tuple[str, ...]]:
    """Parse 'com_ts (r,c,s)' -> ('com_ts', ('r','c','s'))."""
    raw = raw.strip()
    m = re.match(r"^(\S+)\s*\(([^)]*)\)\s*$", raw)
    if m:
        base = m.group(1)
        indexes = tuple(i.strip() for i in m.group(2).split(",") if i.strip())
        return base, indexes
    m2 = re.match(r"^(\S+)\s*$", raw)
    if m2:
        return m2.group(1), ()
    return raw.strip(), ()


def _parse_alias(alias_field: str | list[str] | None) -> tuple[str, ...]:
    """Normalize alias field (can be string, list, or None) to tuple."""
    if alias_field is None:
        return ()
    if isinstance(alias_field, list):
        return tuple(a.strip() for a in alias_field if a and a.strip())
    return tuple(a.strip() for a in alias_field.split(",") if a.strip())


def generate_sets() -> str:
    with open(RAW_DIR / "sets.json") as f:
        data = json.load(f)

    lines: list[str] = [
        "from __future__ import annotations",
        "",
        "from dataclasses import dataclass",
        "",
        "",
        "@dataclass(frozen=True)",
        "class SetDef:",
        '    name: str           # e.g. "com_ts (r,c,s)"',
        '    base_name: str      # e.g. "com_ts"',
        "    aliases: tuple[str, ...]",
        "    indexes: tuple[str, ...]",
        "    description: str",
        '    category: str       # "User Input" or "Internal"',
        "",
        "",
        "SET_REGISTRY: dict[str, SetDef] = {",
    ]

    for s in data["sets"]:
        raw_id = s["Set ID/Indexes"]
        base_name, indexes = _parse_set_id(raw_id)
        aliases = _parse_alias(s.get("Alias"))
        desc = _escape(s.get("Description") or "")
        category = s.get("Category", "")

        key = base_name.lower()

        # Handle the special "rtp = rvp" name
        if "=" in base_name:
            parts = base_name.split("=")
            base_name = parts[0].strip()
            key = base_name.lower()

        lines.append(f"    {key!r}: SetDef(")
        lines.append(f"        name={raw_id!r},")
        lines.append(f"        base_name={base_name!r},")
        lines.append(f"        aliases={_repr_tuple(aliases)},")
        lines.append(f"        indexes={_repr_tuple(indexes)},")
        lines.append(f"        description='{desc}',")
        lines.append(f"        category={category!r},")
        lines.append("    ),")

    lines.append("}")
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Parameters
# ---------------------------------------------------------------------------

_DEFAULT_IE_PATTERN = re.compile(r"[Dd]efault\s+i/e\s*:\s*(\S+)")


def _parse_default_ie(units_field: str) -> str:
    m = _DEFAULT_IE_PATTERN.search(units_field)
    if m:
        return m.group(1).rstrip(",;.")
    return "N/A"


def _parse_related(field: str | None) -> tuple[str, ...]:
    if not field or field.lower() == "none":
        return ()
    return tuple(r.strip() for r in field.split(",") if r.strip())


def generate_parameters() -> str:
    with open(RAW_DIR / "parameters.json") as f:
        data = json.load(f)

    lines: list[str] = [
        "from __future__ import annotations",
        "",
        "from dataclasses import dataclass",
        "",
        "",
        "@dataclass(frozen=True)",
        "class ParameterDef:",
        "    name: str",
        "    indexes: tuple[str, ...]",
        "    description: str",
        "    category: str",
        "    units_info: str",
        '    default_ie: str        # e.g. "STD", "MIG", "N/A"',
        "    related: tuple[str, ...]",
        "    affected_equations: str",
        "    details: str",
        "",
        "",
        "PARAMETER_REGISTRY: dict[str, ParameterDef] = {",
    ]

    for p in data["parameters"]:
        name = p["Name"]
        indexes = tuple(p.get("Indexes") or [])
        desc = _escape(p.get("Description") or "")
        category = p.get("Category", "")
        units_info = _escape(p.get("Units/Ranges/Defaults") or "")
        default_ie = _parse_default_ie(p.get("Units/Ranges/Defaults") or "")
        related = _parse_related(p.get("Related Sets/Parameters"))
        affected = _escape(p.get("Affected Equations/Variables") or "")
        details = _escape(p.get("Details/Notes") or "")

        key = name.lower()
        lines.append(f"    {key!r}: ParameterDef(")
        lines.append(f"        name={name!r},")
        lines.append(f"        indexes={_repr_tuple(indexes)},")
        lines.append(f"        description='{desc}',")
        lines.append(f"        category={category!r},")
        lines.append(f"        units_info='{units_info}',")
        lines.append(f"        default_ie={default_ie!r},")
        lines.append(f"        related={_repr_tuple(related)},")
        lines.append(f"        affected_equations='{affected}',")
        lines.append(f"        details='{details}',")
        lines.append("    ),")

    lines.append("}")
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    for name, gen_fn in [
        ("indexes.py", generate_indexes),
        ("sets.py", generate_sets),
        ("parameters.py", generate_parameters),
    ]:
        content = gen_fn()
        out_path = SCHEMA_DIR / name
        out_path.write_text(content, encoding="utf-8")
        print(f"Generated {out_path} ({content.count(chr(10))} lines)")


if __name__ == "__main__":
    main()
