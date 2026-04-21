from __future__ import annotations

from pathlib import Path
from typing import Any

from times_data.io import read_model
from times_data.model import Commodity, Model, Process
from times_data.model.parameter import ParameterValue

from interface.backend.session_store import SessionStore


def open_session_from_model_path(store: SessionStore, model_path: str) -> tuple[str, str, dict[str, Any]]:
    model_dir = Path(model_path)
    model = read_model(model_dir)
    record = store.open(model, model_dir)
    return record.session_id, str(model_dir), model.summary()


def save_session(store: SessionStore, session_id: str, model_path: str | None) -> tuple[bool, str | None]:
    record = store.get(session_id)
    was_dirty = record.dirty
    destination = Path(model_path) if model_path else None
    saved = store.save(session_id, destination)
    return was_dirty, str(saved.model_path) if saved.model_path else None


def close_session(store: SessionStore, session_id: str) -> bool:
    return store.close(session_id)


def serialize_commodity(commodity: Commodity) -> dict[str, Any]:
    return {
        "name": commodity.name,
        "type": commodity.ctype.value,
        "description": commodity.description,
        "unit": commodity.unit,
        "timeslice_level": commodity.timeslice_level,
        "balance_type": commodity.balance_type,
    }


def serialize_flow(flow) -> dict[str, Any]:
    return {
        "commodity": flow.commodity,
        "group": flow.group,
        "efficiency": flow.efficiency,
        "emission_factor": flow.emission_factor,
        "share": flow.share,
    }


def serialize_process(process: Process) -> dict[str, Any]:
    return {
        "name": process.name,
        "description": process.description,
        "process_type": process.process_type,
        "inputs": [serialize_flow(flow) for flow in process.inputs],
        "outputs": [serialize_flow(flow) for flow in process.outputs],
        "regions": list(process.regions),
        "primary_group": process.primary_group,
    }


def serialize_parameter(value: ParameterValue) -> dict[str, Any]:
    return {
        "parameter": value.parameter,
        "indexes": dict(value.indexes),
        "value": value.value,
    }


def list_commodities(model: Model) -> list[dict[str, Any]]:
    return [serialize_commodity(model.commodities[name]) for name in sorted(model.commodities)]


def list_processes(model: Model) -> list[dict[str, Any]]:
    return [serialize_process(model.processes[name]) for name in sorted(model.processes)]


def list_parameters(model: Model, parameter: str | None = None) -> list[dict[str, Any]]:
    values = model.parameters.values
    if parameter:
        values = model.get_parameter(parameter)
    ordered = sorted(
        values,
        key=lambda row: (row.parameter.upper(), tuple(sorted(row.indexes.items()))),
    )
    return [serialize_parameter(row) for row in ordered]


def get_model_graph(model: Model) -> dict[str, Any]:
    nodes = {
        "commodities": [serialize_commodity(model.commodities[name]) for name in sorted(model.commodities)],
        "processes": [serialize_process(model.processes[name]) for name in sorted(model.processes)],
    }
    edges: list[dict[str, str]] = []
    for process_name in sorted(model.processes):
        process = model.processes[process_name]
        for flow in process.inputs:
            edges.append({"from": flow.commodity, "to": process.name, "direction": "input"})
        for flow in process.outputs:
            edges.append({"from": process.name, "to": flow.commodity, "direction": "output"})

    return {
        "summary": model.summary(),
        "config": {
            "name": model.config.name,
            "regions": model.config.regions,
            "start_year": model.config.start_year,
            "periods": model.config.periods,
            "currencies": model.config.currencies,
        },
        "nodes": nodes,
        "edges": edges,
    }


def exact_parameter_value(model: Model, parameter: str, indexes: dict[str, Any]) -> float | None:
    rows = model.get_parameter(parameter, **indexes)
    for row in rows:
        if row.indexes == indexes:
            return row.value
    return None
