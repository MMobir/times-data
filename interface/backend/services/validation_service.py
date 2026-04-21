from __future__ import annotations

from collections import defaultdict
from typing import Any

from times_data.model import Model
from times_data.validation import validate_all
from times_data.wiki import WikiIndex, get_default_index


def validate_model(model: Model) -> dict[str, Any]:
    messages = validate_all(model)
    errors = [m for m in messages if m.level == "error"]
    warnings = [m for m in messages if m.level == "warning"]

    return {
        "errors": [
            {
                "level": m.level,
                "category": m.category,
                "message": m.message,
                "entity": m.entity,
                "hint": m.hint,
            }
            for m in errors
        ],
        "warnings": [
            {
                "level": m.level,
                "category": m.category,
                "message": m.message,
                "entity": m.entity,
                "hint": m.hint,
            }
            for m in warnings
        ],
        "counts": {
            "errors": len(errors),
            "warnings": len(warnings),
            "total": len(messages),
        },
    }


def _faq_links_for_category(category: str, index: WikiIndex) -> list[dict[str, str]]:
    if not category:
        return []
    hits = index.search(category, limit=3, types=["faq"])
    return [{"slug": hit.slug, "title": hit.title} for hit in hits]


def grouped_validation(model: Model, *, wiki_index: WikiIndex | None = None) -> dict[str, Any]:
    index = wiki_index if wiki_index is not None else get_default_index()
    messages = validate_all(model)

    error_count = sum(1 for m in messages if m.level == "error")
    warning_count = sum(1 for m in messages if m.level == "warning")

    grouped: dict[tuple[str, str], list[Any]] = defaultdict(list)
    for message in messages:
        grouped[(message.category or "general", message.level)].append(message)

    groups: list[dict[str, Any]] = []
    for (category, level), msgs in grouped.items():
        sample = [
            {
                "message": m.message,
                "entity": m.entity,
                "hint": m.hint,
            }
            for m in msgs[:5]
        ]
        groups.append(
            {
                "category": category,
                "level": level,
                "message_count": len(msgs),
                "sample_messages": sample,
                "faq_links": _faq_links_for_category(category, index),
            }
        )

    level_order = {"error": 0, "warning": 1}
    groups.sort(
        key=lambda g: (
            level_order.get(g["level"], 99),
            -g["message_count"],
            g["category"],
        )
    )

    return {
        "counts": {
            "errors": error_count,
            "warnings": warning_count,
            "total": len(messages),
        },
        "groups": groups,
    }
