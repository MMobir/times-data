from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from typing import Any


@dataclass
class ParameterValue:
    """A single parameter assignment with its index values."""

    parameter: str
    indexes: dict[str, Any]
    value: float


@dataclass
class ParameterTable:
    """Mutable, queryable collection of parameter values."""

    values: list[ParameterValue] = field(default_factory=list)
    _index: dict[str, list[int]] = field(default_factory=lambda: defaultdict(list), repr=False)

    def _rebuild_index(self) -> None:
        self._index = defaultdict(list)
        for i, v in enumerate(self.values):
            self._index[v.parameter.upper()].append(i)

    def add(self, parameter: str, value: float, **indexes: Any) -> None:
        """Add a parameter value. If exact same indexes exist, update instead."""
        existing = self._find_exact(parameter, indexes)
        if existing is not None:
            self.values[existing].value = value
        else:
            idx = len(self.values)
            self.values.append(ParameterValue(parameter=parameter, indexes=indexes, value=value))
            self._index[parameter.upper()].append(idx)

    def get(self, parameter: str, **filters: Any) -> list[ParameterValue]:
        """Get all values for a parameter, optionally filtered by index values."""
        results = [self.values[i] for i in self._index.get(parameter.upper(), [])
                   if self.values[i] is not None]
        for key, val in filters.items():
            results = [v for v in results if v.indexes.get(key) == val]
        return results

    def update(self, parameter: str, value: float, **indexes: Any) -> bool:
        """Update an existing parameter value. Returns True if found, False otherwise."""
        existing = self._find_exact(parameter, indexes)
        if existing is not None:
            self.values[existing].value = value
            return True
        return False

    def remove(self, parameter: str, **filters: Any) -> int:
        """Remove parameter values matching the filters. Returns count removed."""
        to_remove = set()
        for i in self._index.get(parameter.upper(), []):
            v = self.values[i]
            if v is None:
                continue
            match = all(v.indexes.get(k) == val for k, val in filters.items())
            if match:
                to_remove.add(i)

        for i in to_remove:
            self.values[i] = None  # type: ignore

        if to_remove:
            self.values = [v for v in self.values if v is not None]
            self._rebuild_index()

        return len(to_remove)

    def remove_all_for(self, parameter: str) -> int:
        """Remove all values for a parameter name."""
        before = len(self.values)
        self.values = [v for v in self.values if v.parameter.upper() != parameter.upper()]
        self._rebuild_index()
        return before - len(self.values)

    def remove_for_process(self, process_name: str) -> int:
        """Remove all parameter values that reference a process."""
        before = len(self.values)
        self.values = [v for v in self.values if v.indexes.get("p") != process_name]
        self._rebuild_index()
        return before - len(self.values)

    def remove_for_commodity(self, commodity_name: str) -> int:
        """Remove all parameter values that reference a commodity."""
        before = len(self.values)
        self.values = [v for v in self.values if v.indexes.get("c") != commodity_name]
        self._rebuild_index()
        return before - len(self.values)

    def parameters_used(self) -> set[str]:
        return {v.parameter for v in self.values if v is not None}

    def _find_exact(self, parameter: str, indexes: dict) -> int | None:
        for i in self._index.get(parameter.upper(), []):
            v = self.values[i]
            if v is not None and v.indexes == indexes:
                return i
        return None
