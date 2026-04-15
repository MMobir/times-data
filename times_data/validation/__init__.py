from __future__ import annotations

from times_data.model.model import Model
from times_data.validation.schema_check import ValidationMessage, validate_schema
from times_data.validation.structural import validate_structural


def validate_all(model: Model) -> list[ValidationMessage]:
    """Run all validation levels and return combined messages."""
    msgs: list[ValidationMessage] = []
    msgs.extend(validate_schema(model))
    msgs.extend(validate_structural(model))
    return msgs
