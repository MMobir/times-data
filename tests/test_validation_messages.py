"""Tests for actionable validation messaging."""

from times_data.model import Commodity, CommodityType, FlowSpec, Model, ModelConfig, Process
from times_data.validation import validate_all


def test_unknown_parameter_includes_fix_hint():
    m = Model(config=ModelConfig(name="m", regions=["R1"], start_year=2020, periods=[2020]))
    m.add_parameter("NCAP_CST", 100, r="R1", datayear=2020, p="P1", cur="MEUR")

    msgs = validate_all(m)
    unknown = [x for x in msgs if x.level == "error" and x.entity == "NCAP_CST"]
    assert unknown
    assert "Unknown parameter" in unknown[0].message
    assert "Did you mean" in unknown[0].message
    assert "official TIMES parameter name" in unknown[0].hint


def test_missing_input_commodity_includes_fix_hint():
    m = Model(config=ModelConfig(name="m", regions=["R1"], start_year=2020, periods=[2020]))
    m.add_process(Process("PP", inputs=[FlowSpec("MISSING_FUEL")], outputs=[]))

    msgs = validate_all(m)
    errors = [x for x in msgs if x.level == "error" and x.entity == "PP"]
    assert errors
    assert "undefined input commodity" in errors[0].message
    assert "Define commodity 'MISSING_FUEL'" in errors[0].hint


def test_config_errors_include_fix_hints():
    m = Model(config=ModelConfig(name="bad", regions=[], start_year=2020, periods=[]))

    msgs = validate_all(m)
    config_errors = [x for x in msgs if x.level == "error" and x.entity == "config"]
    assert len(config_errors) >= 2
    assert any("Define at least one region" in x.hint for x in config_errors)
    assert any("Define at least one milestone period year" in x.hint for x in config_errors)


def test_invalid_index_keys_include_expected_index_hint():
    m = Model(config=ModelConfig(name="m", regions=["R1"], start_year=2020, periods=[2020]))
    m.add_commodity(Commodity("ELC", CommodityType.NRG))
    m.add_process(Process("PP", outputs=[FlowSpec("ELC")]))
    m.add_parameter("NCAP_COST", 1000, r="R1", datayear=2020, p="PP", cur="MEUR", bogus="x")

    msgs = validate_all(m)
    index_errors = [x for x in msgs if x.level == "error" and "invalid index keys" in x.message]
    assert index_errors
    assert "Use exactly these index keys for NCAP_COST" in index_errors[0].hint
