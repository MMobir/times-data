from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from .commodity import Commodity, CommodityType
from .config import ModelConfig
from .parameter import ParameterTable
from .process import Process, FlowSpec


@dataclass
class Model:
    config: ModelConfig
    commodities: dict[str, Commodity] = field(default_factory=dict)
    processes: dict[str, Process] = field(default_factory=dict)
    parameters: ParameterTable = field(default_factory=ParameterTable)

    # ── Add ──────────────────────────────────────────────────────────────

    def add_commodity(self, commodity: Commodity) -> Commodity:
        """Add a commodity. Raises if it already exists."""
        if commodity.name in self.commodities:
            raise ValueError(f"Commodity '{commodity.name}' already exists")
        self.commodities[commodity.name] = commodity
        return commodity

    def add_process(self, process: Process) -> Process:
        """Add a process. Raises if it already exists."""
        if process.name in self.processes:
            raise ValueError(f"Process '{process.name}' already exists")
        self.processes[process.name] = process
        return process

    def add_parameter(self, parameter: str, value: float, **indexes: Any) -> None:
        """Add or update a parameter value."""
        self.parameters.add(parameter, value, **indexes)

    # ── Remove ───────────────────────────────────────────────────────────

    def remove_commodity(self, name: str) -> bool:
        """Remove a commodity and all parameter values referencing it."""
        if name not in self.commodities:
            return False
        del self.commodities[name]
        self.parameters.remove_for_commodity(name)
        for proc in self.processes.values():
            proc.remove_input(name)
            proc.remove_output(name)
        return True

    def remove_process(self, name: str) -> bool:
        """Remove a process and all parameter values referencing it."""
        if name not in self.processes:
            return False
        del self.processes[name]
        self.parameters.remove_for_process(name)
        return True

    def remove_parameter(self, parameter: str, **filters: Any) -> int:
        """Remove parameter values matching the filters. Returns count removed."""
        return self.parameters.remove(parameter, **filters)

    # ── Update ───────────────────────────────────────────────────────────

    def update_parameter(self, parameter: str, value: float, **indexes: Any) -> bool:
        """Update an existing parameter value. Returns True if found."""
        return self.parameters.update(parameter, value, **indexes)

    def set_parameter(self, parameter: str, value: float, **indexes: Any) -> None:
        """Set a parameter value (add or update, like dict assignment)."""
        self.parameters.add(parameter, value, **indexes)

    def update_commodity(self, name: str, **kwargs) -> bool:
        """Update commodity attributes. Returns True if found."""
        if name not in self.commodities:
            return False
        com = self.commodities[name]
        for k, v in kwargs.items():
            if hasattr(com, k):
                setattr(com, k, v)
        return True

    def update_process(self, name: str, **kwargs) -> bool:
        """Update process attributes (not topology — use process methods for that)."""
        if name not in self.processes:
            return False
        proc = self.processes[name]
        for k, v in kwargs.items():
            if hasattr(proc, k) and k not in ("inputs", "outputs", "name"):
                setattr(proc, k, v)
        return True

    # ── Query ────────────────────────────────────────────────────────────

    def get_parameter(self, parameter: str, **filters: Any) -> list:
        """Get parameter values, optionally filtered by indexes."""
        return self.parameters.get(parameter, **filters)

    def get_commodity(self, name: str) -> Commodity | None:
        """Get a commodity by name."""
        return self.commodities.get(name)

    def get_process(self, name: str) -> Process | None:
        """Get a process by name."""
        return self.processes.get(name)

    def find_commodities(self, ctype: CommodityType | None = None, **kwargs) -> list[Commodity]:
        """Find commodities matching criteria."""
        results = list(self.commodities.values())
        if ctype is not None:
            results = [c for c in results if c.ctype == ctype]
        for k, v in kwargs.items():
            results = [c for c in results if getattr(c, k, None) == v]
        return results

    def find_processes(self, process_type: str | None = None,
                       has_input: str | None = None,
                       has_output: str | None = None,
                       region: str | None = None) -> list[Process]:
        """Find processes matching criteria."""
        results = list(self.processes.values())
        if process_type is not None:
            results = [p for p in results if p.process_type == process_type]
        if has_input is not None:
            results = [p for p in results if p.has_input(has_input)]
        if has_output is not None:
            results = [p for p in results if p.has_output(has_output)]
        if region is not None:
            results = [p for p in results if not p.regions or region in p.regions]
        return results

    def producers_of(self, commodity: str) -> list[Process]:
        """Find all processes that produce a commodity."""
        return [p for p in self.processes.values() if p.has_output(commodity)]

    def consumers_of(self, commodity: str) -> list[Process]:
        """Find all processes that consume a commodity."""
        return [p for p in self.processes.values() if p.has_input(commodity)]

    def process_cost(self, process_name: str, year: int = None) -> dict[str, float]:
        """Get all cost-related parameters for a process."""
        cost_params = ["NCAP_COST", "ACT_COST", "FLO_COST", "NCAP_FOM"]
        result = {}
        for cp in cost_params:
            vals = self.parameters.get(cp, p=process_name)
            if year is not None:
                vals = [v for v in vals if v.indexes.get("datayear") == year]
            if vals:
                result[cp] = vals[0].value
        return result

    # ── Summary ──────────────────────────────────────────────────────────

    def summary(self) -> dict:
        return {
            "name": self.config.name,
            "regions": len(self.config.regions),
            "periods": len(self.config.periods),
            "commodities": len(self.commodities),
            "processes": len(self.processes),
            "parameter_values": len(self.parameters.values),
        }

    def describe(self) -> str:
        """Human-readable description of the model."""
        lines = [
            f"Model: {self.config.name}",
            f"  Regions: {', '.join(self.config.regions)}",
            f"  Periods: {self.config.periods[0]}-{self.config.periods[-1]} ({len(self.config.periods)} periods)",
            f"  Commodities: {len(self.commodities)}",
        ]
        for ct in CommodityType:
            coms = self.find_commodities(ctype=ct)
            if coms:
                names = ", ".join(c.name for c in coms[:5])
                suffix = f" +{len(coms)-5} more" if len(coms) > 5 else ""
                lines.append(f"    {ct.value}: {names}{suffix}")
        lines.append(f"  Processes: {len(self.processes)}")
        ptypes = {}
        for p in self.processes.values():
            ptypes.setdefault(p.process_type, []).append(p.name)
        for ptype, names in sorted(ptypes.items()):
            sample = ", ".join(names[:3])
            suffix = f" +{len(names)-3} more" if len(names) > 3 else ""
            lines.append(f"    {ptype}: {len(names)} ({sample}{suffix})")
        lines.append(f"  Parameters: {len(self.parameters.values)} values across {len(self.parameters.parameters_used())} parameters")
        return "\n".join(lines)
