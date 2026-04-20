from __future__ import annotations

from times_data.model.model import Model
from times_data.validation.schema_check import ValidationMessage


def _config_hint(error_message: str) -> str:
    if "At least one region is required" in error_message:
        return "Define at least one region in config (for example: REG1)."
    if "At least one period is required" in error_message:
        return "Define at least one milestone period year (for example: 2020,2030)."
    if "Periods must be sorted" in error_message:
        return "Sort periods in ascending order (for example: 2020,2030,2040)."
    if "start_year" in error_message and "must be <=" in error_message:
        return "Set start_year less than or equal to the first milestone period."
    return "Review model config values (regions, periods, start_year)."


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
            hint=_config_hint(err),
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
                    hint=f"Define commodity '{flow.commodity}' or remove it from process '{proc.name}' inputs.",
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
                    hint=f"Define commodity '{flow.commodity}' or remove it from process '{proc.name}' outputs.",
                ))

        if not proc.inputs:
            msgs.append(ValidationMessage(
                level="warning",
                category="structural",
                message=f"Process '{proc.name}' has no inputs",
                entity=proc.name,
                hint="Add at least one input flow, or keep as-is if this is an intended source/supply process.",
            ))
        if not proc.outputs:
            msgs.append(ValidationMessage(
                level="warning",
                category="structural",
                message=f"Process '{proc.name}' has no outputs",
                entity=proc.name,
                hint="Add at least one output flow, or keep as-is if this is an intended sink/export process.",
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
                hint=f"Create process '{pv.indexes['p']}' or update index p to an existing process.",
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
                hint=f"Create commodity '{pv.indexes['c']}' or update index c to an existing commodity.",
            ))

    for name in model.commodities:
        if name not in commodities_in_flows:
            msgs.append(ValidationMessage(
                level="warning",
                category="structural",
                message=f"Commodity '{name}' is defined but never used in any process",
                entity=name,
                hint=f"Connect commodity '{name}' to at least one process input/output, or remove it.",
            ))

    return msgs
