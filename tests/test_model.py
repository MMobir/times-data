"""Tests for the Model graph: CRUD operations, queries."""

import pytest
from times_data.model import Model, ModelConfig, Commodity, CommodityType, Process, FlowSpec


def _make_model():
    m = Model(config=ModelConfig(name="test", regions=["R1"], start_year=2020, periods=[2020, 2030]))
    m.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ"))
    m.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    m.add_commodity(Commodity("CO2", CommodityType.ENV, unit="kt"))
    m.add_commodity(Commodity("RH", CommodityType.DEM, unit="PJ"))
    m.add_process(Process("COAL_PP", inputs=[FlowSpec("COAL")],
                          outputs=[FlowSpec("ELC"), FlowSpec("CO2")]))
    m.add_process(Process("WIND", outputs=[FlowSpec("ELC")]))
    m.add_process(Process("HP", inputs=[FlowSpec("ELC")], outputs=[FlowSpec("RH")]))
    m.add_parameter("NCAP_COST", 1800, r="R1", datayear=2020, p="COAL_PP", cur="MEUR")
    m.add_parameter("NCAP_COST", 1200, r="R1", datayear=2020, p="WIND", cur="MEUR")
    return m


def test_add_commodity():
    m = _make_model()
    assert len(m.commodities) == 4
    assert "ELC" in m.commodities


def test_add_duplicate_commodity_raises():
    m = _make_model()
    with pytest.raises(ValueError, match="already exists"):
        m.add_commodity(Commodity("ELC", CommodityType.NRG))


def test_add_process():
    m = _make_model()
    assert len(m.processes) == 3
    assert m.processes["COAL_PP"].input_commodities() == {"COAL"}
    assert m.processes["COAL_PP"].output_commodities() == {"ELC", "CO2"}


def test_remove_process():
    m = _make_model()
    assert m.remove_process("COAL_PP")
    assert "COAL_PP" not in m.processes
    assert len(m.get_parameter("NCAP_COST", p="COAL_PP")) == 0


def test_remove_commodity_cleans_topology():
    m = _make_model()
    m.remove_commodity("CO2")
    assert "CO2" not in m.commodities
    assert not m.processes["COAL_PP"].has_output("CO2")


def test_set_parameter_upsert():
    m = _make_model()
    m.set_parameter("NCAP_COST", 900, r="R1", datayear=2020, p="WIND", cur="MEUR")
    vals = m.get_parameter("NCAP_COST", p="WIND")
    assert len(vals) == 1
    assert vals[0].value == 900


def test_producers_of():
    m = _make_model()
    prods = m.producers_of("ELC")
    names = {p.name for p in prods}
    assert names == {"COAL_PP", "WIND"}


def test_consumers_of():
    m = _make_model()
    cons = m.consumers_of("ELC")
    names = {p.name for p in cons}
    assert names == {"HP"}


def test_find_processes():
    m = _make_model()
    procs = m.find_processes(has_output="ELC")
    assert len(procs) == 2


def test_find_commodities_by_type():
    m = _make_model()
    nrg = m.find_commodities(ctype=CommodityType.NRG)
    assert len(nrg) == 2


def test_summary():
    m = _make_model()
    s = m.summary()
    assert s["commodities"] == 4
    assert s["processes"] == 3
    assert s["parameter_values"] == 2


def test_process_add_remove_flow():
    m = _make_model()
    p = m.get_process("WIND")
    p.add_output("CO2", emission_factor=0.01)
    assert p.has_output("CO2")
    p.remove_output("CO2")
    assert not p.has_output("CO2")
