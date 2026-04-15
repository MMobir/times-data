"""Tests for the validation engine."""

from times_data.model import Model, ModelConfig, Commodity, CommodityType, Process, FlowSpec
from times_data.validation import validate_all


def test_valid_model_no_errors():
    m = Model(config=ModelConfig(name="ok", regions=["R1"], start_year=2020, periods=[2020, 2030]))
    m.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ"))
    m.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    m.add_process(Process("PP", inputs=[FlowSpec("COAL")], outputs=[FlowSpec("ELC")]))
    m.add_parameter("NCAP_COST", 1800, r="R1", datayear=2020, p="PP", cur="MEUR")

    msgs = validate_all(m)
    errors = [x for x in msgs if x.level == "error"]
    assert len(errors) == 0


def test_unknown_parameter_detected():
    m = Model(config=ModelConfig(name="bad", regions=["R1"], start_year=2020, periods=[2020]))
    m.add_parameter("FAKE_PARAM", 100, r="R1", p="X")

    msgs = validate_all(m)
    errors = [x for x in msgs if x.level == "error"]
    assert any("FAKE_PARAM" in e.message for e in errors)


def test_missing_commodity_reference_detected():
    m = Model(config=ModelConfig(name="bad", regions=["R1"], start_year=2020, periods=[2020]))
    m.add_process(Process("PP", inputs=[FlowSpec("MISSING_FUEL")], outputs=[]))

    msgs = validate_all(m)
    errors = [x for x in msgs if x.level == "error"]
    assert any("MISSING_FUEL" in e.message for e in errors)


def test_empty_regions_detected():
    m = Model(config=ModelConfig(name="bad", regions=[], start_year=2020, periods=[]))

    msgs = validate_all(m)
    errors = [x for x in msgs if x.level == "error"]
    assert len(errors) >= 2  # no regions + no periods


def test_orphan_commodity_warned():
    m = Model(config=ModelConfig(name="w", regions=["R1"], start_year=2020, periods=[2020]))
    m.add_commodity(Commodity("ORPHAN", CommodityType.NRG))

    msgs = validate_all(m)
    warnings = [x for x in msgs if x.level == "warning"]
    assert any("ORPHAN" in w.message for w in warnings)
