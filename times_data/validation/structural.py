from __future__ import annotations

from times_data.model.model import Model
from times_data.validation.schema_check import ValidationMessage


def validate_structural(model: Model) -> list[ValidationMessage]:
    """Level 2: Structural validation. Checks RES connectivity and topology."""
    msgs: list[ValidationMessage] = []

    config_errors = model.config.validate()
    for err in config_errors:
        msgs.append(ValidationMessage(
            level="error",
            category="structural",
            message=err,
            entity="config",
        ))

    commodities_in_flows: set[str] = set()
    for proc in model.processes.values():
        for flow in proc.inputs:
            commodities_in_flows.add(flow.commodity)
            if flow.commodity not in model.commodities:
                msgs.append(ValidationMessage(
                    level="error",
                    category="structural",
                    message=(
                        f"Process '{proc.name}' references undefined input "
                        f"commodity '{flow.commodity}'"
                    ),
                    entity=proc.name,
                ))
        for flow in proc.outputs:
            commodities_in_flows.add(flow.commodity)
            if flow.commodity not in model.commodities:
                msgs.append(ValidationMessage(
                    level="error",
                    category="structural",
                    message=(
                        f"Process '{proc.name}' references undefined output "
                        f"commodity '{flow.commodity}'"
                    ),
                    entity=proc.name,
                ))

        if not proc.inputs:
            msgs.append(ValidationMessage(
                level="warning",
                category="structural",
                message=f"Process '{proc.name}' has no inputs",
                entity=proc.name,
            ))
        if not proc.outputs:
            msgs.append(ValidationMessage(
                level="warning",
                category="structural",
                message=f"Process '{proc.name}' has no outputs",
                entity=proc.name,
            ))

    for pv in model.parameters.values:
        if "p" in pv.indexes and pv.indexes["p"] not in model.processes:
            msgs.append(ValidationMessage(
                level="error",
                category="structural",
                message=(
                    f"Parameter '{pv.parameter}' references undefined "
                    f"process '{pv.indexes['p']}'"
                ),
                entity=pv.parameter,
            ))
        if "c" in pv.indexes and pv.indexes["c"] not in model.commodities:
            msgs.append(ValidationMessage(
                level="error",
                category="structural",
                message=(
                    f"Parameter '{pv.parameter}' references undefined "
                    f"commodity '{pv.indexes['c']}'"
                ),
                entity=pv.parameter,
            ))

    for name in model.commodities:
        if name not in commodities_in_flows:
            msgs.append(ValidationMessage(
                level="warning",
                category="structural",
                message=f"Commodity '{name}' is defined but never used in any process",
                entity=name,
            ))

    return msgs
