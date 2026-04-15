from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class FlowSpec:
    """Specification of a commodity flow into or out of a process."""

    commodity: str
    group: str = ""
    efficiency: float | None = None
    emission_factor: float | None = None
    share: float | None = None


@dataclass
class Process:
    name: str
    description: str = ""
    process_type: str = "STD"
    inputs: list[FlowSpec] = field(default_factory=list)
    outputs: list[FlowSpec] = field(default_factory=list)
    regions: list[str] = field(default_factory=list)
    primary_group: str = ""

    def input_commodities(self) -> set[str]:
        return {f.commodity for f in self.inputs}

    def output_commodities(self) -> set[str]:
        return {f.commodity for f in self.outputs}

    def all_commodities(self) -> set[str]:
        return self.input_commodities() | self.output_commodities()

    def add_input(self, commodity: str, **kwargs) -> FlowSpec:
        """Add an input flow. Returns the FlowSpec."""
        flow = FlowSpec(commodity=commodity, **kwargs)
        self.inputs.append(flow)
        return flow

    def add_output(self, commodity: str, **kwargs) -> FlowSpec:
        """Add an output flow. Returns the FlowSpec."""
        flow = FlowSpec(commodity=commodity, **kwargs)
        self.outputs.append(flow)
        return flow

    def remove_input(self, commodity: str) -> bool:
        """Remove an input flow by commodity name. Returns True if removed."""
        before = len(self.inputs)
        self.inputs = [f for f in self.inputs if f.commodity != commodity]
        return len(self.inputs) < before

    def remove_output(self, commodity: str) -> bool:
        """Remove an output flow by commodity name. Returns True if removed."""
        before = len(self.outputs)
        self.outputs = [f for f in self.outputs if f.commodity != commodity]
        return len(self.outputs) < before

    def has_input(self, commodity: str) -> bool:
        return commodity in self.input_commodities()

    def has_output(self, commodity: str) -> bool:
        return commodity in self.output_commodities()
