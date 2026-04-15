"""
DemoS_001 — The simplest TIMES model, built with times-data.

This is the TIMES DemoS_001 model from the official documentation:
- Single region (REG1)
- Single commodity (COA - coal)
- 3-step supply curve (mining), import, export
- One demand (TPSCOA - total primary supply of coal)
- One demand technology (DTPSCOA)
- Two periods: 2005 (1 year), 2006 (2 years)
- Annual timeslice only

Source: Part IV, Chapter 3 of TIMES documentation
"""

from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from times_data.model import (
    Model, ModelConfig, Commodity, CommodityType, Process, FlowSpec,
)
from times_data.io import write_model
from times_data.validation import validate_all
from times_data.compiler import compile_dd


def build_demos_001() -> Model:
    # ── Model Config ─────────────────────────────────────────────────────
    m = Model(config=ModelConfig(
        name="DemoS_001",
        description="Resource supply — simplest TIMES demo model",
        regions=["REG1"],
        start_year=2005,
        periods=[2005, 2006],
        currencies=["MEuro05"],
    ))

    # ── Commodities ──────────────────────────────────────────────────────
    # COA: the single energy commodity (coal)
    m.add_commodity(Commodity(
        name="COA",
        ctype=CommodityType.NRG,
        description="Coal",
        unit="PJ",
        timeslice_level="ANNUAL",
    ))

    # TPSCOA: demand for total primary supply of coal
    m.add_commodity(Commodity(
        name="TPSCOA",
        ctype=CommodityType.DEM,
        description="Demand Total Primary Supply - COA",
        unit="PJ",
        timeslice_level="ANNUAL",
    ))

    # ── Supply Processes: 3-step mining curve ────────────────────────────

    # MINCOA1: cheapest mining step
    m.add_process(Process(
        name="MINCOA1",
        description="Mining COA - Step 1 (cheapest)",
        inputs=[],
        outputs=[FlowSpec("COA")],
        regions=["REG1"],
    ))
    m.add_parameter("ACT_COST", 1.0, r="REG1", datayear=2005, p="MINCOA1", cur="MEuro05")
    m.add_parameter("ACT_CUM", 40.0, r="REG1", p="MINCOA1", y1=2005, y2=2006, bd="UP")
    m.add_parameter("ACT_BND", 14.0, r="REG1", datayear=2005, p="MINCOA1", s="ANNUAL", bd="UP")
    m.add_parameter("ACT_BND", 14.0, r="REG1", datayear=2006, p="MINCOA1", s="ANNUAL", bd="UP")

    # MINCOA2: mid-price mining step
    m.add_process(Process(
        name="MINCOA2",
        description="Mining COA - Step 2 (mid-price)",
        inputs=[],
        outputs=[FlowSpec("COA")],
        regions=["REG1"],
    ))
    m.add_parameter("ACT_COST", 2.0, r="REG1", datayear=2005, p="MINCOA2", cur="MEuro05")
    m.add_parameter("ACT_CUM", 80.0, r="REG1", p="MINCOA2", y1=2005, y2=2006, bd="UP")
    m.add_parameter("ACT_BND", 10.0, r="REG1", datayear=2005, p="MINCOA2", s="ANNUAL", bd="UP")
    m.add_parameter("ACT_BND", 10.0, r="REG1", datayear=2006, p="MINCOA2", s="ANNUAL", bd="UP")

    # MINCOA3: most expensive mining step
    m.add_process(Process(
        name="MINCOA3",
        description="Mining COA - Step 3 (expensive)",
        inputs=[],
        outputs=[FlowSpec("COA")],
        regions=["REG1"],
    ))
    m.add_parameter("ACT_COST", 3.0, r="REG1", datayear=2005, p="MINCOA3", cur="MEuro05")
    m.add_parameter("ACT_CUM", 120.0, r="REG1", p="MINCOA3", y1=2005, y2=2006, bd="UP")
    m.add_parameter("ACT_BND", 5.0, r="REG1", datayear=2005, p="MINCOA3", s="ANNUAL", bd="UP")
    m.add_parameter("ACT_BND", 5.0, r="REG1", datayear=2006, p="MINCOA3", s="ANNUAL", bd="UP")

    # ── Import / Export ──────────────────────────────────────────────────

    m.add_process(Process(
        name="IMPCOA1",
        description="Import COA",
        inputs=[],
        outputs=[FlowSpec("COA")],
        regions=["REG1"],
    ))
    m.add_parameter("ACT_COST", 5.0, r="REG1", datayear=2005, p="IMPCOA1", cur="MEuro05")
    m.add_parameter("ACT_BND", 6.0, r="REG1", datayear=2005, p="IMPCOA1", s="ANNUAL", bd="UP")
    m.add_parameter("ACT_BND", 6.0, r="REG1", datayear=2006, p="IMPCOA1", s="ANNUAL", bd="UP")

    m.add_process(Process(
        name="EXPCOA1",
        description="Export COA",
        inputs=[FlowSpec("COA")],
        outputs=[],
        regions=["REG1"],
    ))
    m.add_parameter("ACT_COST", -0.5, r="REG1", datayear=2005, p="EXPCOA1", cur="MEuro05")
    m.add_parameter("ACT_BND", 5.0, r="REG1", datayear=2005, p="EXPCOA1", s="ANNUAL", bd="UP")
    m.add_parameter("ACT_BND", 5.0, r="REG1", datayear=2006, p="EXPCOA1", s="ANNUAL", bd="UP")

    # ── Demand Technology ────────────────────────────────────────────────

    m.add_process(Process(
        name="DTPSCOA",
        description="Demand technology - Total Primary Supply COA",
        inputs=[FlowSpec("COA")],
        outputs=[FlowSpec("TPSCOA", efficiency=1.0)],
        regions=["REG1"],
    ))
    m.add_parameter("NCAP_COST", 0.001, r="REG1", datayear=2005, p="DTPSCOA", cur="MEuro05")
    m.add_parameter("NCAP_TLIFE", 10.0, r="REG1", datayear=2005, p="DTPSCOA")
    m.add_parameter("NCAP_AF", 1.0, r="REG1", datayear=2005, p="DTPSCOA", s="ANNUAL", bd="UP")

    # ── Demand Projection ────────────────────────────────────────────────
    # 26.6 PJ demand for coal in the base year (from energy balance)
    m.add_parameter("COM_PROJ", 26.6, r="REG1", datayear=2005, c="TPSCOA")

    # ── Global Parameters ────────────────────────────────────────────────
    m.add_parameter("G_DRATE", 0.05, r="REG1", allyear=2005, cur="MEuro05")

    return m


def main():
    m = build_demos_001()

    # Validate
    msgs = validate_all(m)
    errors = [x for x in msgs if x.level == "error"]
    warnings = [x for x in msgs if x.level == "warning"]

    print(f"\n  DemoS_001 Model Summary")
    print(f"  {'='*40}")
    s = m.summary()
    for k, v in s.items():
        print(f"  {k:20s} {v}")

    print(f"\n  Validation: {len(errors)} errors, {len(warnings)} warnings")
    for msg in msgs:
        marker = "ERROR" if msg.level == "error" else "WARN "
        print(f"    [{marker}] {msg.message}")

    # Write to YAML
    out = Path(__file__).parent / "model"
    write_model(m, out)
    print(f"\n  Written to: {out}/")
    print(f"  Files:")
    for f in sorted(out.rglob("*.yaml")):
        print(f"    {f.relative_to(out)}")

    if errors:
        print(f"\n  FAILED: {len(errors)} validation errors")
        return 1

    # Compile DD files
    dd_dir = Path(__file__).parent / "dd_output"
    generated = compile_dd(m, dd_dir)
    print(f"\n  DD files compiled to: {dd_dir}/")
    for f in generated:
        size = f.stat().st_size
        print(f"    {f.name} ({size:,} bytes)")

    print(f"\n  SUCCESS: DemoS_001 model built, validated, and compiled")
    return 0


if __name__ == "__main__":
    sys.exit(main())
