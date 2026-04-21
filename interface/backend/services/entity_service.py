from __future__ import annotations

from typing import Any

from times_data.model import Commodity, CommodityType, FlowSpec, Model, Process

from interface.backend.services.model_service import serialize_commodity, serialize_process


def _meta(changed: bool, touched: list[str]) -> dict[str, Any]:
    return {
        "changed": changed,
        "changed_count": 1 if changed else 0,
        "touched_entities": touched if changed else [],
    }


def create_commodity(model: Model, payload: dict[str, Any]) -> dict[str, Any]:
    commodity = Commodity(
        name=payload["name"],
        ctype=CommodityType(payload["type"]),
        description=payload.get("description", ""),
        unit=payload.get("unit", ""),
        timeslice_level=payload.get("timeslice_level", "ANNUAL"),
        balance_type=payload.get("balance_type", ""),
    )
    model.add_commodity(commodity)
    return {**_meta(True, [commodity.name]), "exists": True}


def update_commodity(model: Model, name: str, payload: dict[str, Any]) -> dict[str, Any]:
    commodity = model.get_commodity(name)
    if commodity is None:
        return {**_meta(False, []), "exists": False}

    before = serialize_commodity(commodity)
    if payload.get("type") is not None:
        commodity.ctype = CommodityType(payload["type"])
    for key in ("description", "unit", "timeslice_level", "balance_type"):
        if payload.get(key) is not None:
            setattr(commodity, key, payload[key])
    after = serialize_commodity(commodity)
    changed = before != after
    return {**_meta(changed, [name]), "exists": True}


def delete_commodity(model: Model, name: str) -> dict[str, Any]:
    changed = model.remove_commodity(name)
    return {**_meta(changed, [name]), "exists": changed}


def _flow_from_payload(item: dict[str, Any]) -> FlowSpec:
    return FlowSpec(
        commodity=item["commodity"],
        group=item.get("group", ""),
        efficiency=item.get("efficiency"),
        emission_factor=item.get("emission_factor"),
        share=item.get("share"),
    )


def create_process(model: Model, payload: dict[str, Any]) -> dict[str, Any]:
    process = Process(
        name=payload["name"],
        description=payload.get("description", ""),
        process_type=payload.get("process_type", "STD"),
        inputs=[_flow_from_payload(flow) for flow in payload.get("inputs", [])],
        outputs=[_flow_from_payload(flow) for flow in payload.get("outputs", [])],
        regions=payload.get("regions", []),
        primary_group=payload.get("primary_group", ""),
    )
    model.add_process(process)
    return {**_meta(True, [process.name]), "exists": True}


def update_process(model: Model, name: str, payload: dict[str, Any]) -> dict[str, Any]:
    process = model.get_process(name)
    if process is None:
        return {**_meta(False, []), "exists": False}

    before = serialize_process(process)
    for key in ("description", "process_type", "regions", "primary_group"):
        if payload.get(key) is not None:
            setattr(process, key, payload[key])
    if payload.get("inputs") is not None:
        process.inputs = [_flow_from_payload(flow) for flow in payload["inputs"]]
    if payload.get("outputs") is not None:
        process.outputs = [_flow_from_payload(flow) for flow in payload["outputs"]]
    after = serialize_process(process)
    changed = before != after
    return {**_meta(changed, [name]), "exists": True}


def delete_process(model: Model, name: str) -> dict[str, Any]:
    changed = model.remove_process(name)
    return {**_meta(changed, [name]), "exists": changed}
