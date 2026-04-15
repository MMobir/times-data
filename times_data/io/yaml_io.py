from __future__ import annotations

from collections import defaultdict
from pathlib import Path
from typing import Any

import yaml

from times_data.model.commodity import Commodity, CommodityType
from times_data.model.config import ModelConfig, TimesliceLevel
from times_data.model.model import Model
from times_data.model.parameter import ParameterTable, ParameterValue
from times_data.model.process import FlowSpec, Process


def _slugify(name: str) -> str:
    return name.lower().replace("_", "-")


# ---------------------------------------------------------------------------
# Timeslice helpers
# ---------------------------------------------------------------------------

def _timeslice_to_dict(level: TimesliceLevel) -> dict[str, Any]:
    out: dict[str, Any] = {}
    for name, child in level.children.items():
        if isinstance(child, TimesliceLevel):
            out[name] = _timeslice_to_dict(child)
        else:
            out[name] = child
    return out


def _dict_to_timeslice(d: dict[str, Any]) -> TimesliceLevel:
    children: dict[str, float | TimesliceLevel] = {}
    for name, child in d.items():
        if isinstance(child, dict):
            children[name] = _dict_to_timeslice(child)
        else:
            children[name] = float(child)
    return TimesliceLevel(children=children)


# ---------------------------------------------------------------------------
# Write helpers
# ---------------------------------------------------------------------------

def _dump(data: Any, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w") as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)


def _write_config(config: ModelConfig, path: Path) -> None:
    data: dict[str, Any] = {
        "name": config.name,
        "description": config.description,
        "regions": config.regions,
        "start_year": config.start_year,
        "periods": config.periods,
        "currencies": config.currencies,
        "timeslices": _timeslice_to_dict(config.timeslices) if config.timeslices else None,
    }
    _dump(data, path / "config.yaml")


def _flow_to_dict(flow: FlowSpec) -> dict[str, Any]:
    return {
        "commodity": flow.commodity,
        "group": flow.group,
        "efficiency": flow.efficiency,
        "emission_factor": flow.emission_factor,
        "share": flow.share,
    }


def _write_commodities(commodities: dict[str, Commodity], path: Path) -> None:
    cdir = path / "commodities"
    for commodity in commodities.values():
        data = {
            "name": commodity.name,
            "type": commodity.ctype.value,
            "description": commodity.description,
            "unit": commodity.unit,
            "timeslice_level": commodity.timeslice_level,
            "balance_type": commodity.balance_type,
        }
        _dump(data, cdir / f"{_slugify(commodity.name)}.yaml")


def _write_processes(processes: dict[str, Process], path: Path) -> None:
    pdir = path / "processes"
    for process in processes.values():
        data = {
            "name": process.name,
            "description": process.description,
            "process_type": process.process_type,
            "regions": process.regions,
            "primary_group": process.primary_group,
            "inputs": [_flow_to_dict(f) for f in process.inputs],
            "outputs": [_flow_to_dict(f) for f in process.outputs],
        }
        _dump(data, pdir / f"{_slugify(process.name)}.yaml")


def _write_parameters(parameters: ParameterTable, path: Path) -> None:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for pv in parameters.values:
        grouped[pv.parameter].append({"indexes": pv.indexes, "value": pv.value})

    param_dir = path / "parameters"
    for param_name, entries in grouped.items():
        data = {"parameter": param_name, "values": entries}
        _dump(data, param_dir / f"{_slugify(param_name)}.yaml")


# ---------------------------------------------------------------------------
# Read helpers
# ---------------------------------------------------------------------------

def _read_config(path: Path) -> ModelConfig:
    with open(path / "config.yaml") as f:
        data = yaml.safe_load(f)

    ts = None
    if data.get("timeslices"):
        ts = _dict_to_timeslice(data["timeslices"])

    return ModelConfig(
        name=data["name"],
        description=data.get("description", ""),
        regions=data.get("regions", []),
        start_year=data.get("start_year", 2020),
        periods=data.get("periods", []),
        currencies=data.get("currencies", ["MEUR"]),
        timeslices=ts,
    )


def _read_commodities(path: Path) -> dict[str, Commodity]:
    cdir = path / "commodities"
    commodities: dict[str, Commodity] = {}
    if not cdir.exists():
        return commodities
    for file in sorted(cdir.glob("*.yaml")):
        with open(file) as f:
            data = yaml.safe_load(f)
        c = Commodity(
            name=data["name"],
            ctype=CommodityType(data["type"]),
            description=data.get("description", ""),
            unit=data.get("unit", ""),
            timeslice_level=data.get("timeslice_level", "ANNUAL"),
            balance_type=data.get("balance_type", ""),
        )
        commodities[c.name] = c
    return commodities


def _dict_to_flow(data: dict[str, Any]) -> FlowSpec:
    return FlowSpec(
        commodity=data["commodity"],
        group=data.get("group", ""),
        efficiency=data.get("efficiency"),
        emission_factor=data.get("emission_factor"),
        share=data.get("share"),
    )


def _read_processes(path: Path) -> dict[str, Process]:
    pdir = path / "processes"
    processes: dict[str, Process] = {}
    if not pdir.exists():
        return processes
    for file in sorted(pdir.glob("*.yaml")):
        with open(file) as f:
            data = yaml.safe_load(f)
        p = Process(
            name=data["name"],
            description=data.get("description", ""),
            process_type=data.get("process_type", "STD"),
            inputs=[_dict_to_flow(fd) for fd in (data.get("inputs") or [])],
            outputs=[_dict_to_flow(fd) for fd in (data.get("outputs") or [])],
            regions=data.get("regions", []),
            primary_group=data.get("primary_group", ""),
        )
        processes[p.name] = p
    return processes


def _read_parameters(path: Path) -> ParameterTable:
    param_dir = path / "parameters"
    table = ParameterTable()
    if not param_dir.exists():
        return table
    for file in sorted(param_dir.glob("*.yaml")):
        with open(file) as f:
            data = yaml.safe_load(f)
        param_name = data["parameter"]
        for entry in data.get("values", []):
            indexes = {str(k): v for k, v in entry["indexes"].items()}
            table.add(param_name, float(entry["value"]), **indexes)
    return table


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def write_model(model: Model, path: Path) -> None:
    """Write a model to a directory of YAML files."""
    path.mkdir(parents=True, exist_ok=True)
    _write_config(model.config, path)
    _write_commodities(model.commodities, path)
    _write_processes(model.processes, path)
    _write_parameters(model.parameters, path)


def read_model(path: Path) -> Model:
    """Read a model from a directory of YAML files."""
    config = _read_config(path)
    commodities = _read_commodities(path)
    processes = _read_processes(path)
    parameters = _read_parameters(path)
    return Model(
        config=config,
        commodities=commodities,
        processes=processes,
        parameters=parameters,
    )
