"""Tests for YAML I/O round-trip and DD import."""

import tempfile
from pathlib import Path

from times_data.model import Model, ModelConfig, Commodity, CommodityType, Process, FlowSpec
from times_data.io import write_model, read_model


def _make_model():
    m = Model(config=ModelConfig(
        name="io-test", regions=["R1", "R2"], start_year=2020,
        periods=[2020, 2030, 2040], currencies=["MEUR"],
    ))
    m.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ", timeslice_level="DAYNITE"))
    m.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    m.add_commodity(Commodity("CO2", CommodityType.ENV, unit="kt"))
    m.add_process(Process("COAL_PP", description="Coal plant",
                          inputs=[FlowSpec("COAL")],
                          outputs=[FlowSpec("ELC", efficiency=0.42), FlowSpec("CO2")]))
    m.add_parameter("NCAP_COST", 1800, r="R1", datayear=2020, p="COAL_PP", cur="MEUR")
    m.add_parameter("NCAP_COST", 1600, r="R1", datayear=2030, p="COAL_PP", cur="MEUR")
    return m


def test_yaml_round_trip():
    m = _make_model()
    with tempfile.TemporaryDirectory() as tmp:
        p = Path(tmp) / "model"
        write_model(m, p)

        assert (p / "config.yaml").exists()
        assert (p / "commodities").is_dir()
        assert (p / "processes").is_dir()
        assert (p / "parameters").is_dir()

        m2 = read_model(p)
        assert m2.config.name == "io-test"
        assert len(m2.config.regions) == 2
        assert len(m2.commodities) == 3
        assert len(m2.processes) == 1
        assert len(m2.parameters.values) == 2
        assert m2.processes["COAL_PP"].outputs[0].efficiency == 0.42


def test_yaml_preserves_timeslice_level():
    m = _make_model()
    with tempfile.TemporaryDirectory() as tmp:
        p = Path(tmp) / "model"
        write_model(m, p)
        m2 = read_model(p)
        assert m2.commodities["ELC"].timeslice_level == "DAYNITE"


def test_yaml_empty_model():
    m = Model(config=ModelConfig(name="empty", regions=["R1"], start_year=2020, periods=[2020]))
    with tempfile.TemporaryDirectory() as tmp:
        p = Path(tmp) / "model"
        write_model(m, p)
        m2 = read_model(p)
        assert m2.config.name == "empty"
        assert len(m2.commodities) == 0
        assert len(m2.processes) == 0
