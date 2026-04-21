from __future__ import annotations

from pathlib import Path
from typing import Any

from times_data.diff import compare_models
from times_data.io import read_model
from times_data.model import Model

from interface.backend.session_store import SessionStore


def _resolve_model(side: str, payload: dict[str, Any], store: SessionStore) -> Model:
    session_key = f"{side}_session_id"
    path_key = f"{side}_model_path"
    session_id = payload.get(session_key)
    model_path = payload.get(path_key)

    if session_id:
        return store.get(session_id).model
    if model_path:
        return read_model(Path(model_path))
    raise ValueError(f"Provide either {session_key} or {path_key}.")


def diff_models(payload: dict[str, Any], store: SessionStore) -> dict[str, Any]:
    left = _resolve_model("left", payload, store)
    right = _resolve_model("right", payload, store)
    diff = compare_models(left, right)

    return {
        "has_changes": diff.has_changes(),
        "added_commodities": diff.added_commodities,
        "removed_commodities": diff.removed_commodities,
        "changed_commodities": [
            {"name": change.name, "fields": change.fields}
            for change in diff.changed_commodities
        ],
        "added_processes": diff.added_processes,
        "removed_processes": diff.removed_processes,
        "changed_processes": [
            {"name": change.name, "fields": change.fields}
            for change in diff.changed_processes
        ],
        "added_parameters": [
            {
                "parameter": change.parameter,
                "indexes": change.indexes,
                "old_value": change.old_value,
                "new_value": change.new_value,
            }
            for change in diff.added_parameters
        ],
        "removed_parameters": [
            {
                "parameter": change.parameter,
                "indexes": change.indexes,
                "old_value": change.old_value,
                "new_value": change.new_value,
            }
            for change in diff.removed_parameters
        ],
        "changed_parameters": [
            {
                "parameter": change.parameter,
                "indexes": change.indexes,
                "old_value": change.old_value,
                "new_value": change.new_value,
            }
            for change in diff.changed_parameters
        ],
    }
