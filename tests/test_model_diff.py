from __future__ import annotations

from click.testing import CliRunner

from times_data.cli.main import cli
from times_data.diff import compare_models, format_model_diff
from times_data.io import write_model
from times_data.model import Commodity, CommodityType, FlowSpec, Model, ModelConfig, Process


def _base_model() -> Model:
    m = Model(config=ModelConfig(name="A", regions=["R1"], start_year=2020, periods=[2020, 2030]))
    m.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ"))
    m.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    m.add_commodity(Commodity("CO2", CommodityType.ENV, unit="kt"))
    m.add_process(Process("COAL_PP", inputs=[FlowSpec("COAL")], outputs=[FlowSpec("ELC"), FlowSpec("CO2")]))
    m.add_process(Process("WIND", outputs=[FlowSpec("ELC")]))
    m.add_parameter("NCAP_COST", 1800, r="R1", datayear=2020, p="COAL_PP", cur="MEUR")
    m.add_parameter("NCAP_COST", 1200, r="R1", datayear=2020, p="WIND", cur="MEUR")
    return m


def _modified_model() -> Model:
    m = _base_model()
    m.update_commodity("ELC", unit="GWh")
    m.remove_commodity("CO2")
    m.add_commodity(Commodity("H2", CommodityType.NRG, unit="PJ"))

    m.remove_process("WIND")
    m.add_process(Process("SOLAR", outputs=[FlowSpec("ELC")]))

    m.set_parameter("NCAP_COST", 2000, r="R1", datayear=2020, p="COAL_PP", cur="MEUR")
    m.set_parameter("NCAP_COST", 700, r="R1", datayear=2020, p="SOLAR", cur="MEUR")
    return m


def test_compare_models_detects_added_removed_changed():
    base = _base_model()
    modified = _modified_model()

    diff = compare_models(base, modified)

    assert diff.added_commodities == ["H2"]
    assert diff.removed_commodities == ["CO2"]
    assert [x.name for x in diff.changed_commodities] == ["ELC"]

    assert diff.added_processes == ["SOLAR"]
    assert diff.removed_processes == ["WIND"]
    assert [x.name for x in diff.changed_processes] == ["COAL_PP"]

    assert len(diff.added_parameters) == 1
    assert diff.added_parameters[0].indexes["p"] == "SOLAR"
    assert len(diff.removed_parameters) == 1
    assert diff.removed_parameters[0].indexes["p"] == "WIND"
    assert len(diff.changed_parameters) == 1
    assert diff.changed_parameters[0].indexes["p"] == "COAL_PP"
    assert diff.changed_parameters[0].old_value == 1800
    assert diff.changed_parameters[0].new_value == 2000


def test_format_model_diff_no_changes_message():
    base = _base_model()
    diff = compare_models(base, base)
    text = format_model_diff(diff, "left", "right")
    assert "No differences found." in text


def test_cli_diff_reports_model_changes(tmp_path):
    left = _base_model()
    right = _modified_model()
    left_dir = tmp_path / "left"
    right_dir = tmp_path / "right"
    write_model(left, left_dir)
    write_model(right, right_dir)

    runner = CliRunner()
    result = runner.invoke(cli, ["diff", str(left_dir), str(right_dir), "--max-items", "5"])
    assert result.exit_code == 0
    assert "Commodities: +1 / -1 / ~1" in result.output
    assert "Processes: +1 / -1 / ~1" in result.output
    assert "Parameters: +1 / -1 / ~1" in result.output
