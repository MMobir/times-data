"""
DD File Importer — parse GAMS-compatible DD files into a times-data Model.

Handles the standard DD file format produced by VEDA:
  SET <name> / entries /
  PARAMETER <name> '<desc>' / r.y.p.s.bd value /
"""

from __future__ import annotations

import re
from pathlib import Path

from times_data.model.model import Model
from times_data.model.config import ModelConfig
from times_data.model.commodity import Commodity, CommodityType
from times_data.model.process import Process, FlowSpec
from times_data.schema import PARAMETER_REGISTRY


def import_dd(dd_files: list[Path]) -> Model:
    """Import one or more DD files into a Model."""
    raw = _RawDD()
    for f in sorted(dd_files):
        _parse_dd_file(f, raw)
    return _build_model(raw)


class _RawDD:
    """Accumulator for raw parsed DD data before building a Model."""

    def __init__(self):
        self.sets: dict[str, list[str]] = {}
        self.parameters: dict[str, list[tuple[str, float]]] = {}
        self.run_name: str = ""
        self.scenario_name: str = ""

    def add_set(self, name: str, entries: list[str]) -> None:
        self.sets.setdefault(name, []).extend(entries)

    def add_parameter(self, name: str, entries: list[tuple[str, float]]) -> None:
        self.parameters.setdefault(name, []).extend(entries)


def _parse_dd_file(path: Path, raw: _RawDD) -> None:
    """Parse a single DD file into the raw accumulator."""
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.split("\n")
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        # Skip empty lines, comments, and GAMS directives
        if not line or line.startswith("*"):
            i += 1
            continue

        if line.startswith("$"):
            m = re.match(r"\$SET\s+RUN_NAME\s+'([^']*)'", line)
            if m:
                raw.run_name = m.group(1)
            m = re.match(r"\$SET\s+SCENARIO_NAME\s+'([^']*)'", line)
            if m:
                raw.scenario_name = m.group(1)
            i += 1
            continue

        # Skip OPTION, SET MILESTONYR (handled separately), and other GAMS statements
        if line.upper().startswith("OPTION ") or line.upper().startswith("SCALAR"):
            i += 1
            continue

        # SET block
        if line.startswith("SET "):
            set_name = line[4:].strip()
            i += 1
            entries, i = _read_block(lines, i)
            raw.add_set(set_name.upper(), entries)
            continue

        # PARAMETER block
        if line == "PARAMETER":
            i += 1
            if i >= len(lines):
                break
            # Next line is: PARAM_NAME '<desc>'/
            header = lines[i].strip()
            param_name = header.split("'")[0].split("/")[0].strip()
            if header.endswith("/"):
                # Opening / is on same line as name
                pass
            i += 1
            entries, i = _read_param_block(lines, i)
            raw.add_parameter(param_name.upper(), entries)
            continue

        i += 1


def _strip_quotes(s: str) -> str:
    """Remove surrounding single quotes from a GAMS value."""
    s = s.strip()
    if s.startswith("'") and s.endswith("'"):
        return s[1:-1]
    return s


def _clean_set_entry(entry: str) -> str:
    """Clean a single set entry from xl2times quoted format to GAMS format.
    
    Input examples:
        'REG1' 'REG1'           -> REG1 'REG1'
        'REG1'.'DMD'.'DTPSCOA'  -> REG1.DMD.DTPSCOA
        'REG1'.'COA' 'Solid'    -> REG1.COA 'Solid'
        REG1.DMD.DTPSCOA        -> REG1.DMD.DTPSCOA (unchanged)
    """
    if "'" not in entry:
        return entry

    # Use regex to extract all quoted tokens and whitespace structure
    # Strategy: find all 'xxx' tokens, strip quotes, reassemble
    import re

    # Split into key part (dot-separated) and optional description
    # The description starts after a space that follows a complete key token
    # Key tokens are 'xxx' or 'xxx'.'yyy'.'zzz'
    
    # Find all quoted segments
    tokens = re.findall(r"'([^']*)'", entry)
    if not tokens:
        return entry

    # Check if dots separate key tokens: 'A'.'B'.'C' pattern
    if "'." in entry:
        # Split at the point where key ends and description begins
        # Key parts are connected by '.', description follows after space
        # e.g., 'REG1'.'COA' 'description here'
        
        # Find all dot-connected quoted tokens first
        key_match = re.match(r"((?:'[^']*'\.)*'[^']*')\s*(.*)", entry)
        if key_match:
            key_part = key_match.group(1)
            desc_part = key_match.group(2).strip()
            
            key_tokens = re.findall(r"'([^']*)'", key_part)
            key = ".".join(key_tokens)
            
            if desc_part:
                desc = _strip_quotes(desc_part)
                return f"{key} '{desc}'"
            return key
    
    # Simple case: 'VALUE' or 'VALUE' 'description'
    if len(tokens) == 1:
        return tokens[0]
    elif len(tokens) == 2:
        # Check if second token is a description (separated by space, not dot)
        if "'.'" not in entry:
            return f"{tokens[0]} '{tokens[1]}'"
    
    # Fallback: just strip all quotes
    return entry.replace("'", "")


def _read_block(lines: list[str], i: int) -> tuple[list[str], int]:
    """Read a SET block between / ... / or /; delimiters."""
    entries = []
    # Skip to opening /
    while i < len(lines):
        line = lines[i].strip()
        if line == "/" or line == "/;":
            i += 1
            break
        if line.startswith("/"):
            i += 1
            break
        i += 1

    # Read entries until closing / or /;
    while i < len(lines):
        line = lines[i].strip()
        if line in ("/", "/;", ""):
            if line in ("/", "/;"):
                i += 1
            else:
                i += 1
                continue
            break
        entry = line.rstrip("/").rstrip(";").strip()
        if entry:
            entries.append(_clean_set_entry(entry))
        i += 1

    return entries, i


def _read_param_block(lines: list[str], i: int) -> tuple[list[tuple[str, float]], int]:
    """Read a PARAMETER block: key value pairs until / or /;."""
    entries = []
    while i < len(lines):
        line = lines[i].strip()
        if line in ("/", "/;"):
            i += 1
            break
        if not line or line.startswith("*"):
            i += 1
            continue
        # Format: REG1.2005.MINCOA1.ANNUAL.UP 14.0
        # Or with quotes: 'REG1'.'2005'.'MINCOA1'.'ANNUAL'.'UP' 14.0
        clean = line.rstrip("/").rstrip(";").strip()
        parts = clean.split()
        if len(parts) >= 2:
            key_raw = parts[0]
            # Strip quotes from dot-separated key parts
            key = ".".join(_strip_quotes(p) for p in key_raw.split("."))
            try:
                value = float(parts[1].rstrip("/").rstrip(";"))
                entries.append((key, value))
            except ValueError:
                pass
        elif len(parts) == 1:
            # Scalar value (no key)
            try:
                value = float(parts[0].rstrip("/").rstrip(";"))
                entries.append(("", value))
            except ValueError:
                pass
        i += 1

    return entries, i


COM_TYPE_MAP = {"NRG": CommodityType.NRG, "DEM": CommodityType.DEM,
                "MAT": CommodityType.MAT, "ENV": CommodityType.ENV,
                "FIN": CommodityType.FIN}


def _build_model(raw: _RawDD) -> Model:
    """Convert raw parsed DD data into a typed Model."""

    # ── Extract config ──
    regions = []
    for entry in raw.sets.get("REG", []):
        name = entry.split("'")[0].strip()
        if name:
            regions.append(name)

    currencies = [e.strip() for e in raw.sets.get("CUR", []) if e.strip()]

    modlyears = []
    for entry in raw.sets.get("MODLYEAR", []):
        name = entry.split("'")[0].strip()
        try:
            modlyears.append(int(name))
        except ValueError:
            pass

    pastyears = set()
    for entry in raw.sets.get("PASTYEAR", []):
        name = entry.split("'")[0].strip()
        try:
            pastyears.add(int(name))
        except ValueError:
            pass

    periods = [y for y in sorted(modlyears) if y not in pastyears]
    start_year = periods[0] if periods else 2005

    config = ModelConfig(
        name=raw.run_name or "imported",
        regions=regions,
        start_year=start_year,
        periods=periods,
        currencies=currencies,
    )

    model = Model(config=config)

    # ── Build commodity type map from COM_TMAP ──
    com_types: dict[str, CommodityType] = {}
    for entry in raw.sets.get("COM_TMAP", []):
        parts = entry.split(".")
        if len(parts) >= 3:
            ctype_str = parts[1].strip()
            cname = parts[2].strip()
            if ctype_str in COM_TYPE_MAP:
                com_types[cname] = COM_TYPE_MAP[ctype_str]

    # ── Build commodity descriptions from COM_DESC ──
    com_descs: dict[str, str] = {}
    for entry in raw.sets.get("COM_DESC", []):
        m = re.match(r"\S+\.(\S+)\s+'([^']*)'", entry)
        if m:
            com_descs[m.group(1)] = m.group(2)

    # ── Build commodity timeslice levels from COM_TSL ──
    com_tsls: dict[str, str] = {}
    for entry in raw.sets.get("COM_TSL", []):
        parts = entry.split(".")
        if len(parts) >= 3:
            com_tsls[parts[1].strip()] = parts[2].strip()

    # ── Build commodity units from COM_UNIT ──
    com_units: dict[str, str] = {}
    for entry in raw.sets.get("COM_UNIT", []):
        parts = entry.split(".")
        if len(parts) >= 3:
            com_units[parts[1].strip()] = parts[2].strip()

    # ── Create commodities ──
    all_com_names = set()
    for entry in raw.sets.get("COM_GRP", []):
        name = entry.split("'")[0].strip()
        if name:
            all_com_names.add(name)
    for name in com_types:
        all_com_names.add(name)

    for cname in sorted(all_com_names):
        ctype = com_types.get(cname, CommodityType.NRG)
        model.add_commodity(Commodity(
            name=cname,
            ctype=ctype,
            description=com_descs.get(cname, ""),
            unit=com_units.get(cname, ""),
            timeslice_level=com_tsls.get(cname, "ANNUAL"),
        ))

    # ── Build topology from TOP set ──
    proc_inputs: dict[str, list[str]] = {}
    proc_outputs: dict[str, list[str]] = {}
    proc_regions: dict[str, set[str]] = {}

    for entry in raw.sets.get("TOP", []):
        parts = entry.split(".")
        if len(parts) >= 4:
            region = parts[0].strip()
            pname = parts[1].strip()
            cname = parts[2].strip()
            direction = parts[3].strip()

            proc_regions.setdefault(pname, set()).add(region)
            if direction == "IN":
                proc_inputs.setdefault(pname, []).append(cname)
            elif direction == "OUT":
                proc_outputs.setdefault(pname, []).append(cname)

    # ── Build process descriptions from PRC_DESC ──
    prc_descs: dict[str, str] = {}
    for entry in raw.sets.get("PRC_DESC", []):
        m = re.match(r"\S+\.(\S+)\s+'([^']*)'", entry)
        if m:
            prc_descs[m.group(1)] = m.group(2)

    # ── Build process type map from PRC_MAP ──
    prc_types: dict[str, str] = {}
    for entry in raw.sets.get("PRC_MAP", []):
        parts = entry.split(".")
        if len(parts) >= 3:
            ptype = parts[1].strip()
            pname = parts[2].strip()
            if ptype in ("STD", "DMD", "CHP", "IRE", "STG", "NST", "PRW", "PRV"):
                prc_types[pname] = ptype

    # ── Create processes ──
    all_proc_names = set()
    for entry in raw.sets.get("PRC", []):
        name = entry.split("'")[0].split()[0].strip()
        # PRC entries are region.process, extract process name
        parts = name.split(".")
        if len(parts) >= 2:
            all_proc_names.add(parts[1])
        elif parts[0]:
            all_proc_names.add(parts[0])

    for pname in sorted(all_proc_names):
        inputs = [FlowSpec(c) for c in dict.fromkeys(proc_inputs.get(pname, []))]
        outputs = [FlowSpec(c) for c in dict.fromkeys(proc_outputs.get(pname, []))]
        ptype = prc_types.get(pname, "STD")

        model.add_process(Process(
            name=pname,
            description=prc_descs.get(pname, ""),
            process_type=ptype,
            inputs=inputs,
            outputs=outputs,
            regions=sorted(proc_regions.get(pname, [])),
        ))

    # ── Import parameters into typed model ──
    for param_name, entries in raw.parameters.items():
        pdef = PARAMETER_REGISTRY.get(param_name.lower())
        if not pdef:
            continue

        for key_str, value in entries:
            indexes = _parse_param_key(param_name, key_str, pdef.indexes)
            if indexes:
                model.parameters.add(param_name, value, **indexes)

    # ── Store raw data for exact round-trip via compiler passthrough ──
    # Re-format set entries: ensure they're clean GAMS syntax (no xl2times quotes)
    clean_sets = {}
    for name, entries in raw.sets.items():
        clean = []
        for e in entries:
            # Entry might be "VALUE 'description'" — keep that format
            parts = e.split(".", 1) if "." not in e else [e]
            if len(parts) == 1 and " " not in e:
                clean.append(e)
            else:
                clean.append(e)
        clean_sets[name] = clean
    model._raw_sets = clean_sets
    model._raw_params = raw.parameters

    # ── Store timeslice data ──
    all_ts = []
    for entry in raw.sets.get("ALL_TS", []):
        name = entry.split("'")[0].strip()
        if name:
            all_ts.append(name)
    model._all_ts = all_ts if all_ts else ["ANNUAL"]

    return model


def _parse_param_key(param_name: str, key_str: str, index_names: tuple[str, ...]) -> dict | None:
    """Parse a dot-separated parameter key into named indexes."""
    parts = key_str.split(".")
    if len(parts) != len(index_names):
        return None

    indexes = {}
    for idx_name, val in zip(index_names, parts):
        if idx_name in ("datayear", "allyear", "y1", "y2"):
            try:
                indexes[idx_name] = int(val)
            except ValueError:
                indexes[idx_name] = val
        else:
            indexes[idx_name] = val

    return indexes
