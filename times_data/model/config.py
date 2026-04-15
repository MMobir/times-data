from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class TimesliceLevel:
    """One level of the timeslice tree with named children and their year fractions."""

    children: dict[str, float | TimesliceLevel]


@dataclass
class ModelConfig:
    name: str
    description: str = ""
    regions: list[str] = field(default_factory=list)
    start_year: int = 2020
    periods: list[int] = field(default_factory=list)
    timeslices: TimesliceLevel | None = None
    currencies: list[str] = field(default_factory=lambda: ["MEUR"])

    def all_timeslice_names(self) -> list[str]:
        """Flatten the timeslice tree into a list of leaf names."""
        if self.timeslices is None:
            return []
        return _collect_leaves(self.timeslices)

    def validate(self) -> list[str]:
        """Return list of error messages, empty if valid."""
        errors: list[str] = []
        if not self.regions:
            errors.append("At least one region is required")
        if not self.periods:
            errors.append("At least one period is required")
        if self.periods and self.periods != sorted(self.periods):
            errors.append("Periods must be sorted in ascending order")
        if self.periods and self.start_year > self.periods[0]:
            errors.append(
                f"start_year ({self.start_year}) must be <= first period ({self.periods[0]})"
            )
        return errors


def _collect_leaves(level: TimesliceLevel) -> list[str]:
    leaves: list[str] = []
    for name, child in level.children.items():
        if isinstance(child, TimesliceLevel):
            leaves.extend(_collect_leaves(child))
        else:
            leaves.append(name)
    return leaves
