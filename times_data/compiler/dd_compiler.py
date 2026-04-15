"""
DD File Compiler — generates GAMS-compatible DD files from a times-data Model.

When a model was imported from DD files, the compiler passes through all raw
SET and PARAMETER data to ensure exact round-trip fidelity. For models built
programmatically, it derives the sets from the model graph.
"""

from __future__ import annotations

from collections import defaultdict
from pathlib import Path

from times_data.model.model import Model
from times_data.model.commodity import CommodityType


def compile_dd(model: Model, output_dir: Path) -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    generated = []

    ts_path = _write_ts_dd(model, output_dir)
    generated.append(ts_path)

    base_path = _write_base_dd(model, output_dir)
    generated.append(base_path)

    run_path = _write_run_file(model, output_dir)
    generated.append(run_path)

    return generated


def _write_ts_dd(model: Model, output_dir: Path) -> Path:
    path = output_dir / f"{model.config.name}_TS.DD"

    all_ts = getattr(model, "_all_ts", None)
    if not all_ts:
        all_ts = model.config.all_timeslice_names()
    if not all_ts:
        all_ts = ["ANNUAL"]

    lines = ["* timeslices MUST come 1st to ensure ordering OK", "SET ALL_TS", "/"]
    for ts in all_ts:
        lines.append(f" {ts}")
    lines.extend(["/", ""])

    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def _write_base_dd(model: Model, output_dir: Path) -> Path:
    path = output_dir / "BASE.DD"
    lines = [
        "$ONEMPTY", "$ONEPS", "$ONWARNING",
        f"$SET RUN_NAME '{model.config.name}'",
        "$SET SCENARIO_NAME 'base'", "",
    ]

    # If we have raw sets from DD import, use them for exact fidelity
    raw_sets = getattr(model, "_raw_sets", None)
    raw_params = getattr(model, "_raw_params", None)

    if raw_sets and raw_params:
        _write_passthrough(lines, model, raw_sets, raw_params)
    else:
        _write_derived(lines, model)

    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def _write_passthrough(lines: list[str], model: Model,
                       raw_sets: dict[str, list[str]],
                       raw_params: dict[str, list[tuple[str, float]]]) -> None:
    """Write sets and parameters from raw imported data for exact round-trip."""

    # Emit sets in a sensible order
    SET_ORDER = [
        "ALL_REG", "REG", "TS_GROUP", "TS_MAP", "CUR", "UNITS", "UNITS_COM",
        "UNITS_CAP", "UNITS_ACT", "UNITS_MONY", "DATAYEAR", "MODLYEAR",
        "PASTYEAR", "COM_GRP", "COM", "COM_GMAP", "COM_TMAP", "NRG_TMAP",
        "COM_TSL", "COM_UNIT", "COM_PEAK", "COM_AGG", "PRC", "PRC_MAP",
        "PRC_TSL", "PRC_ACTUNT", "PRC_VINT", "TOP", "TOP_IRE",
        "PRC_DESC", "COM_DESC", "UC_N",
    ]

    emitted = set()
    for name in SET_ORDER:
        if name in raw_sets:
            _write_set(lines, name, raw_sets[name])
            emitted.add(name)

    # Emit any remaining sets not in the order list
    for name in sorted(raw_sets.keys()):
        if name not in emitted:
            _write_set(lines, name, raw_sets[name])

    # Emit parameters
    for param_name in sorted(raw_params.keys()):
        entries = raw_params[param_name]
        lines.append("PARAMETER")
        lines.append(f"{param_name} ' '/")
        for key, value in entries:
            if value == int(value):
                val_str = str(int(value))
            else:
                val_str = str(value)
            if key:
                lines.append(f"{key} {val_str}")
            else:
                lines.append(f" {val_str}")
        lines.extend(["/", ""])


def _write_derived(lines: list[str], model: Model) -> None:
    """Derive sets and parameters from the model graph (for programmatic models)."""

    # ALL_REG
    all_reg = list(model.config.regions)
    # Add special trade regions if any IRE processes exist
    has_ire = any(p.process_type == "IRE" for p in model.processes.values())
    if has_ire:
        for special in ["IMPEXP", "MINRNW"]:
            if special not in all_reg:
                all_reg.append(special)
    _write_set(lines, "ALL_REG", all_reg)

    _write_set(lines, "REG", [f"{r} '{r}'" for r in model.config.regions])

    # TS_GROUP
    ts_groups = getattr(model, "_ts_groups", [])
    if ts_groups:
        _write_set(lines, "TS_GROUP",
                   [f"{r}.{lvl}.{ts}" for r, lvl, ts in ts_groups if r and lvl and ts])
    else:
        entries = []
        for r in model.config.regions:
            entries.append(f"{r}.ANNUAL.ANNUAL")
        _write_set(lines, "TS_GROUP", entries)

    ts_map = getattr(model, "_ts_map", [])
    if ts_map:
        _write_set(lines, "TS_MAP",
                   [f"{r}.{parent}.{ts}" for r, parent, ts in ts_map if r and parent and ts])

    _write_set(lines, "CUR", model.config.currencies)

    # UNITS
    units = set()
    for c in model.commodities.values():
        if c.unit:
            units.add(c.unit)
    for cur in model.config.currencies:
        units.add(cur)
    if units:
        _write_set(lines, "UNITS", sorted(units))
        com_units_set = {c.unit for c in model.commodities.values() if c.unit}
        if com_units_set:
            _write_set(lines, "UNITS_COM", sorted(com_units_set))
        _write_set(lines, "UNITS_CAP", ["PJA"] if "PJ" in units else sorted(units))
        _write_set(lines, "UNITS_ACT", sorted(com_units_set) if com_units_set else ["PJ"])
        _write_set(lines, "UNITS_MONY", sorted(model.config.currencies))

    # DATAYEAR
    all_datayears = set()
    for pv in model.parameters.values:
        for key in ("datayear", "allyear", "y1", "y2"):
            dy = pv.indexes.get(key)
            if dy is not None:
                try:
                    all_datayears.add(int(dy))
                except (ValueError, TypeError):
                    pass
    for p in model.config.periods:
        all_datayears.add(p)
    all_datayears.add(model.config.start_year)
    _write_set(lines, "DATAYEAR", [f" {y} '{y}'" for y in sorted(all_datayears)])
    _write_set(lines, "MODLYEAR", [f" {y} '{y}'" for y in sorted(model.config.periods)])

    # COM_GRP
    _write_set(lines, "COM_GRP", sorted(model.commodities.keys()))

    # COM
    for ctype in CommodityType:
        coms = [c for c in model.commodities.values() if c.ctype == ctype]
        if coms:
            _write_set(lines, "COM", [f"{c.name} '{c.description or c.name}'" for c in coms])

    # COM_TMAP
    entries = []
    for r in model.config.regions:
        for c in model.commodities.values():
            entries.append(f"{r}.{c.ctype.value}.{c.name}")
    _write_set(lines, "COM_TMAP", entries)

    # COM_TSL
    entries = []
    for r in model.config.regions:
        for c in model.commodities.values():
            entries.append(f"{r}.{c.name}.{c.timeslice_level}")
    _write_set(lines, "COM_TSL", entries)

    # COM_UNIT
    entries = []
    for r in model.config.regions:
        for c in model.commodities.values():
            if c.unit:
                entries.append(f"{r}.{c.name}.{c.unit}")
    if entries:
        _write_set(lines, "COM_UNIT", entries)

    # PRC
    _write_set(lines, "PRC", sorted(model.processes.keys()))

    # PRC_MAP
    entries = []
    for r in model.config.regions:
        for p in model.processes.values():
            if not p.regions or r in p.regions:
                entries.append(f"{r}.{p.process_type}.{p.name}")
    _write_set(lines, "PRC_MAP", entries)

    # PRC_TSL
    entries = []
    for r in model.config.regions:
        for p in model.processes.values():
            if not p.regions or r in p.regions:
                entries.append(f"{r}.{p.name}.ANNUAL")
    _write_set(lines, "PRC_TSL", entries)

    # PRC_ACTUNT
    entries = []
    for r in model.config.regions:
        for p in model.processes.values():
            if not p.regions or r in p.regions:
                pcg = _get_primary_commodity(p, model)
                if pcg:
                    entries.append(f"{r}.{p.name}.{pcg}.PJ")
    if entries:
        _write_set(lines, "PRC_ACTUNT", entries)

    # TOP
    entries = []
    for r in model.config.regions:
        for p in model.processes.values():
            if not p.regions or r in p.regions:
                for f in p.inputs:
                    entries.append(f"{r}.{p.name}.{f.commodity}.IN")
                for f in p.outputs:
                    entries.append(f"{r}.{p.name}.{f.commodity}.OUT")
    _write_set(lines, "TOP", entries)

    # TOP_IRE
    top_ire = getattr(model, "_top_ire", [])
    if top_ire:
        entries = [f"{r1}.{c1}.{r2}.{c2}.{p}" for r1, c1, r2, c2, p in top_ire]
        _write_set(lines, "TOP_IRE", entries)

    # PRC_DESC
    entries = []
    for r in model.config.regions:
        for p in model.processes.values():
            if not p.regions or r in p.regions:
                desc = (p.description or p.name).replace("'", "''")
                entries.append(f"{r}.{p.name} '{desc}'")
    _write_set(lines, "PRC_DESC", entries)

    # COM_DESC
    entries = []
    for r in model.config.regions:
        for c in model.commodities.values():
            desc = (c.description or c.name).replace("'", "''")
            entries.append(f"{r}.{c.name} '{desc}'")
    _write_set(lines, "COM_DESC", entries)

    # PARAMETERS
    param_groups: dict[str, list[tuple[str, float]]] = defaultdict(list)
    for pv in model.parameters.values:
        key = _format_param_indexes(pv.parameter, pv.indexes)
        param_groups[pv.parameter].append((key, pv.value))

    for param_name in sorted(param_groups.keys()):
        entries = param_groups[param_name]
        lines.append("PARAMETER")
        lines.append(f"{param_name} ' '/")
        for key, value in entries:
            if value == int(value):
                val_str = str(int(value))
            else:
                val_str = str(value)
            if key:
                lines.append(f"{key} {val_str}")
            else:
                lines.append(f" {val_str}")
        lines.extend(["/", ""])


def _write_run_file(model: Model, output_dir: Path) -> Path:
    path = output_dir / f"{model.config.name}.RUN"
    periods_str = ",".join(str(y) for y in model.config.periods)

    content = f"""\
$TITLE  TIMES -- {model.config.name} via times-data
OPTION RESLIM=50000, PROFILE=1, SOLVEOPT=REPLACE;
OPTION ITERLIM=999999, LIMROW=0, LIMCOL=0, SOLPRINT=OFF;
$OFFLISTING

option LP=CBC;

$SET REDUCE  YES

$   SET DSCAUTO               YES
$   SET VDA                   YES
$   SET DEBUG                 NO
$   SET DUMPSOL               NO
$   SET SOLVE_NOW             YES
$   SET XTQA                  YES
$   SET VAR_UC                YES
$   SET OBJ                   MOD
$   SET SOLVEDA               YES
 OPTION BRATIO=1;

$   ONMULTI

* timeslices first
$BATINCLUDE {model.config.name}_TS.DD

* fixed declarations
$SET BOTIME {model.config.start_year - 50}
$BATINCLUDE initsys.mod
$BATINCLUDE initmty.mod

* model data
$BATINCLUDE BASE.DD

SET MILESTONYR / {periods_str} /;

$SET RUN_NAME {model.config.name}

$ BATINCLUDE maindrv.mod mod
"""
    path.write_text(content, encoding="utf-8")
    return path


def _format_param_indexes(param_name: str, indexes: dict) -> str:
    from times_data.schema import PARAMETER_REGISTRY
    pdef = PARAMETER_REGISTRY.get(param_name.lower())
    if pdef and pdef.indexes:
        parts = []
        for idx_name in pdef.indexes:
            val = indexes.get(idx_name)
            if val is None:
                ALIASES = {
                    "all_r": ["r"], "r": ["all_r"],
                    "allyear": ["datayear", "year"], "datayear": ["allyear", "year"],
                    "com": ["c"], "c": ["com"],
                    "cg1": ["cg"], "cg2": ["c", "com"],
                    "t": ["datayear", "allyear", "year"],
                }
                for alias in ALIASES.get(idx_name, []):
                    val = indexes.get(alias)
                    if val is not None:
                        break
            if val is not None:
                parts.append(str(val))
        return ".".join(parts)
    elif not indexes:
        return ""
    else:
        return ".".join(str(v) for v in indexes.values())


def _get_primary_commodity(process, model) -> str | None:
    if process.primary_group and process.primary_group in model.commodities:
        return process.primary_group
    for f in process.outputs:
        com = model.commodities.get(f.commodity)
        if com and com.ctype == CommodityType.DEM:
            return f.commodity
    if process.outputs and not process.inputs:
        return process.outputs[0].commodity
    if process.outputs:
        return process.outputs[0].commodity
    if process.inputs:
        return process.inputs[0].commodity
    return None


def _write_set(lines: list[str], name: str, entries: list[str]) -> None:
    lines.append(f"SET {name}")
    lines.append("/")
    for e in entries:
        lines.append(e)
    lines.extend(["/", ""])
