from __future__ import annotations

from dataclasses import dataclass
from difflib import get_close_matches

from times_data.model.model import Model
from times_data.schema.parameters import PARAMETER_REGISTRY


@dataclass
class ValidationMessage:
    level: str  # "error", "warning"
    category: str  # "schema", "structural"
    message: str
    entity: str = ""
    hint: str = ""


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
                hint="Rename one commodity so each commodity name is unique.",
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
                hint="Rename one process so each process name is unique.",
            ))
        seen_processes.add(key)

    for pv in model.parameters.values:
        param_key = pv.parameter.lower()
        pdef = registry_lower.get(param_key)

        if pdef is None:
            known = sorted(p.name for p in PARAMETER_REGISTRY.values())
            close = get_close_matches(pv.parameter.upper(), known, n=1, cutoff=0.7)
            suggestion = f" Did you mean '{close[0]}'?" if close else ""
            msgs.append(ValidationMessage(
                level="error",
                category="schema",
                message=f"Unknown parameter: '{pv.parameter}'.{suggestion}",
                entity=pv.parameter,
                hint="Use an official TIMES parameter name from PARAMETER_REGISTRY.",
            ))
            continue

        allowed_indexes = set(pdef.indexes)
        extra = set(pv.indexes.keys()) - allowed_indexes
        if extra:
            expected = ", ".join(pdef.indexes)
            msgs.append(ValidationMessage(
                level="error",
                category="schema",
                message=(
                    f"Parameter '{pv.parameter}' has invalid index keys "
                    f"{sorted(extra)}; allowed: {sorted(allowed_indexes)}"
                ),
                entity=pv.parameter,
                hint=f"Use exactly these index keys for {pv.parameter}: {expected}.",
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
                hint="Check units/sign convention or confirm this negative value is intended.",
            ))

    return msgs
