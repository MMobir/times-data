from __future__ import annotations

from dataclasses import dataclass

from times_data.model.model import Model
from times_data.schema.parameters import PARAMETER_REGISTRY


@dataclass
class ValidationMessage:
    level: str  # "error", "warning"
    category: str  # "schema", "structural"
    message: str
    entity: str = ""


def validate_schema(model: Model) -> list[ValidationMessage]:
    """Level 1: Schema validation. Checks parameter names, index patterns, value ranges."""
    msgs: list[ValidationMessage] = []

    registry_lower = {k.lower(): v for k, v in PARAMETER_REGISTRY.items()}

    seen_commodities: set[str] = set()
    for name in model.commodities:
        key = name.lower()
        if key in seen_commodities:
            msgs.append(ValidationMessage(
                level="error",
                category="schema",
                message=f"Duplicate commodity name: '{name}'",
                entity=name,
            ))
        seen_commodities.add(key)

    seen_processes: set[str] = set()
    for name in model.processes:
        key = name.lower()
        if key in seen_processes:
            msgs.append(ValidationMessage(
                level="error",
                category="schema",
                message=f"Duplicate process name: '{name}'",
                entity=name,
            ))
        seen_processes.add(key)

    for pv in model.parameters.values:
        param_key = pv.parameter.lower()
        pdef = registry_lower.get(param_key)

        if pdef is None:
            msgs.append(ValidationMessage(
                level="error",
                category="schema",
                message=f"Unknown parameter: '{pv.parameter}'",
                entity=pv.parameter,
            ))
            continue

        allowed_indexes = set(pdef.indexes)
        extra = set(pv.indexes.keys()) - allowed_indexes
        if extra:
            msgs.append(ValidationMessage(
                level="error",
                category="schema",
                message=(
                    f"Parameter '{pv.parameter}' has invalid index keys "
                    f"{sorted(extra)}; allowed: {sorted(allowed_indexes)}"
                ),
                entity=pv.parameter,
            ))

        if "[0," in pdef.units_info and pv.value < 0:
            msgs.append(ValidationMessage(
                level="warning",
                category="schema",
                message=(
                    f"Parameter '{pv.parameter}' value {pv.value} is negative "
                    f"but expected non-negative range"
                ),
                entity=pv.parameter,
            ))

    return msgs
