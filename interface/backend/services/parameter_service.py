from __future__ import annotations

from typing import Any

from times_data.model import Model

from interface.backend.services.model_service import exact_parameter_value


def _meta(changed_count: int, touched_entities: list[str]) -> dict[str, Any]:
    changed = changed_count > 0
    return {
        "changed": changed,
        "changed_count": changed_count,
        "touched_entities": touched_entities if changed else [],
    }


def upsert_parameter(model: Model, payload: dict[str, Any]) -> dict[str, Any]:
    parameter = payload["parameter"]
    indexes = payload.get("indexes", {})
    value = payload["value"]
    old_value = exact_parameter_value(model, parameter, indexes)
    changed = old_value is None or old_value != value
    if changed:
        model.set_parameter(parameter, value, **indexes)
    return {**_meta(1 if changed else 0, [parameter]), "exists": True}


def patch_parameter(model: Model, payload: dict[str, Any]) -> dict[str, Any]:
    parameter = payload["parameter"]
    indexes = payload.get("indexes", {})
    value = payload["value"]
    old_value = exact_parameter_value(model, parameter, indexes)
    if old_value is None:
        return {**_meta(0, []), "exists": False}
    changed = old_value != value
    if changed:
        model.update_parameter(parameter, value, **indexes)
    return {**_meta(1 if changed else 0, [parameter]), "exists": True}


def delete_parameter(model: Model, payload: dict[str, Any]) -> dict[str, Any]:
    parameter = payload["parameter"]
    indexes = payload.get("indexes", {})
    if indexes:
        removed = model.remove_parameter(parameter, **indexes)
    else:
        removed = model.parameters.remove_all_for(parameter)
    return _meta(removed, [parameter] if removed else [])


def preview_patch(model: Model, rows: list[dict[str, Any]]) -> dict[str, Any]:
    preview_rows: list[dict[str, Any]] = []
    changed_count = 0
    touched: list[str] = []

    for row in rows:
        parameter = row["parameter"]
        indexes = row.get("indexes", {})
        new_value = row["value"]
        old_value = exact_parameter_value(model, parameter, indexes)
        changed = old_value != new_value
        if changed:
            changed_count += 1
            if parameter not in touched:
                touched.append(parameter)
        preview_rows.append(
            {
                "parameter": parameter,
                "indexes": indexes,
                "value": new_value,
                "old_value": old_value,
                "changed": changed,
            }
        )

    return {
        **_meta(changed_count, touched),
        "rows": preview_rows,
    }


def apply_patch(model: Model, rows: list[dict[str, Any]]) -> dict[str, Any]:
    applied_rows: list[dict[str, Any]] = []
    changed_count = 0
    touched: list[str] = []

    for row in rows:
        parameter = row["parameter"]
        indexes = row.get("indexes", {})
        new_value = row["value"]
        old_value = exact_parameter_value(model, parameter, indexes)
        changed = old_value != new_value
        if changed:
            model.set_parameter(parameter, new_value, **indexes)
            changed_count += 1
            if parameter not in touched:
                touched.append(parameter)
        applied_rows.append(
            {
                "parameter": parameter,
                "indexes": indexes,
                "value": new_value,
                "old_value": old_value,
                "changed": changed,
            }
        )

    return {
        **_meta(changed_count, touched),
        "rows": applied_rows,
    }
