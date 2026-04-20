from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from times_data.model.model import Model


@dataclass
class EntityChange:
    name: str
    fields: dict[str, tuple[Any, Any]]


@dataclass
class ParameterChange:
    parameter: str
    indexes: dict[str, Any]
    old_value: float | None
    new_value: float | None


@dataclass
class ModelDiff:
    added_commodities: list[str] = field(default_factory=list)
    removed_commodities: list[str] = field(default_factory=list)
    changed_commodities: list[EntityChange] = field(default_factory=list)

    added_processes: list[str] = field(default_factory=list)
    removed_processes: list[str] = field(default_factory=list)
    changed_processes: list[EntityChange] = field(default_factory=list)

    added_parameters: list[ParameterChange] = field(default_factory=list)
    removed_parameters: list[ParameterChange] = field(default_factory=list)
    changed_parameters: list[ParameterChange] = field(default_factory=list)

    def has_changes(self) -> bool:
        return any(
            (
                self.added_commodities,
                self.removed_commodities,
                self.changed_commodities,
                self.added_processes,
                self.removed_processes,
                self.changed_processes,
                self.added_parameters,
                self.removed_parameters,
                self.changed_parameters,
            )
        )


def _flow_signature(flow) -> tuple[Any, ...]:
    return (
        flow.commodity,
        flow.group,
        flow.efficiency,
        flow.emission_factor,
        flow.share,
    )


def _commodity_snapshot(commodity) -> dict[str, Any]:
    return {
        "type": commodity.ctype.value,
        "description": commodity.description,
        "unit": commodity.unit,
        "timeslice_level": commodity.timeslice_level,
        "balance_type": commodity.balance_type,
    }


def _process_snapshot(process) -> dict[str, Any]:
    return {
        "description": process.description,
        "process_type": process.process_type,
        "regions": tuple(sorted(process.regions)),
        "primary_group": process.primary_group,
        "inputs": tuple(sorted(_flow_signature(x) for x in process.inputs)),
        "outputs": tuple(sorted(_flow_signature(x) for x in process.outputs)),
    }


def _field_diff(old: dict[str, Any], new: dict[str, Any]) -> dict[str, tuple[Any, Any]]:
    changed: dict[str, tuple[Any, Any]] = {}
    for key in sorted(set(old) | set(new)):
        ov = old.get(key)
        nv = new.get(key)
        if ov != nv:
            changed[key] = (ov, nv)
    return changed


def _parameter_key(parameter: str, indexes: dict[str, Any]) -> tuple[str, tuple[tuple[str, Any], ...]]:
    return (parameter.upper(), tuple(sorted(indexes.items())))


def compare_models(model_a: Model, model_b: Model) -> ModelDiff:
    diff = ModelDiff()

    names_a = set(model_a.commodities)
    names_b = set(model_b.commodities)
    diff.added_commodities = sorted(names_b - names_a)
    diff.removed_commodities = sorted(names_a - names_b)
    for name in sorted(names_a & names_b):
        changed = _field_diff(
            _commodity_snapshot(model_a.commodities[name]),
            _commodity_snapshot(model_b.commodities[name]),
        )
        if changed:
            diff.changed_commodities.append(EntityChange(name=name, fields=changed))

    proc_a = set(model_a.processes)
    proc_b = set(model_b.processes)
    diff.added_processes = sorted(proc_b - proc_a)
    diff.removed_processes = sorted(proc_a - proc_b)
    for name in sorted(proc_a & proc_b):
        changed = _field_diff(
            _process_snapshot(model_a.processes[name]),
            _process_snapshot(model_b.processes[name]),
        )
        if changed:
            diff.changed_processes.append(EntityChange(name=name, fields=changed))

    params_a: dict[tuple[str, tuple[tuple[str, Any], ...]], float] = {}
    params_b: dict[tuple[str, tuple[tuple[str, Any], ...]], float] = {}
    for pv in model_a.parameters.values:
        params_a[_parameter_key(pv.parameter, pv.indexes)] = pv.value
    for pv in model_b.parameters.values:
        params_b[_parameter_key(pv.parameter, pv.indexes)] = pv.value

    key_a = set(params_a)
    key_b = set(params_b)
    for key in sorted(key_b - key_a):
        parameter, idx = key
        diff.added_parameters.append(
            ParameterChange(
                parameter=parameter,
                indexes=dict(idx),
                old_value=None,
                new_value=params_b[key],
            )
        )
    for key in sorted(key_a - key_b):
        parameter, idx = key
        diff.removed_parameters.append(
            ParameterChange(
                parameter=parameter,
                indexes=dict(idx),
                old_value=params_a[key],
                new_value=None,
            )
        )
    for key in sorted(key_a & key_b):
        if params_a[key] != params_b[key]:
            parameter, idx = key
            diff.changed_parameters.append(
                ParameterChange(
                    parameter=parameter,
                    indexes=dict(idx),
                    old_value=params_a[key],
                    new_value=params_b[key],
                )
            )

    return diff


def format_model_diff(
    diff: ModelDiff,
    model_a_label: str,
    model_b_label: str,
    max_items: int = 20,
) -> str:
    lines = [f"Comparing {model_a_label} -> {model_b_label}"]
    if not diff.has_changes():
        lines.append("No differences found.")
        return "\n".join(lines)

    lines.append("")
    lines.extend(_format_name_section(
        title="Commodities",
        added=diff.added_commodities,
        removed=diff.removed_commodities,
        changed=[c.name for c in diff.changed_commodities],
        max_items=max_items,
    ))
    lines.extend(_format_name_section(
        title="Processes",
        added=diff.added_processes,
        removed=diff.removed_processes,
        changed=[c.name for c in diff.changed_processes],
        max_items=max_items,
    ))
    lines.extend(_format_parameter_section(diff, max_items=max_items))
    return "\n".join(lines)


def _format_name_section(
    title: str,
    added: list[str],
    removed: list[str],
    changed: list[str],
    max_items: int,
) -> list[str]:
    lines = [
        f"{title}: +{len(added)} / -{len(removed)} / ~{len(changed)}",
    ]
    lines.extend(_list_with_limit("  added", added, max_items))
    lines.extend(_list_with_limit("  removed", removed, max_items))
    lines.extend(_list_with_limit("  changed", changed, max_items))
    lines.append("")
    return lines


def _format_parameter_section(diff: ModelDiff, max_items: int) -> list[str]:
    lines = [
        "Parameters: "
        f"+{len(diff.added_parameters)} / -{len(diff.removed_parameters)} / ~{len(diff.changed_parameters)}",
    ]
    lines.extend(_list_with_limit(
        "  added",
        [_format_parameter_change(x) for x in diff.added_parameters],
        max_items,
    ))
    lines.extend(_list_with_limit(
        "  removed",
        [_format_parameter_change(x) for x in diff.removed_parameters],
        max_items,
    ))
    lines.extend(_list_with_limit(
        "  changed",
        [_format_parameter_change(x) for x in diff.changed_parameters],
        max_items,
    ))
    lines.append("")
    return lines


def _format_parameter_change(change: ParameterChange) -> str:
    index_text = ",".join(f"{k}={v}" for k, v in sorted(change.indexes.items()))
    if change.old_value is None:
        return f"{change.parameter} [{index_text}] = {change.new_value}"
    if change.new_value is None:
        return f"{change.parameter} [{index_text}] was {change.old_value}"
    return f"{change.parameter} [{index_text}] {change.old_value} -> {change.new_value}"


def _list_with_limit(label: str, values: list[str], max_items: int) -> list[str]:
    if not values:
        return [f"{label}: none"]
    show = values[:max_items]
    text = ", ".join(show)
    if len(values) > max_items:
        text += f" ... (+{len(values) - max_items} more)"
    return [f"{label}: {text}"]
