from __future__ import annotations

from pathlib import Path

from times_data.diagnose import parse_lst_file, parse_lst_text


SNIPPET = """\
GAMS 45.7.0 Run for TIMES Demo
Row 'EQ_COMBAL('R0N','IMPELC','ACT',2020,2200)' infeasible
Row 'EQ_FOO('R0N','XXX')' infeasible
**** $338
Error 170 Domain violation in symbol PRC_MAP
**** OBJECTIVE VALUE: 12345.6789
"""


def test_parse_lst_text_handles_synthetic_snippet():
    report = parse_lst_text(SNIPPET)
    assert report.status == "INFEASIBLE"
    assert len(report.infeasible_equations) == 2

    by_eq = {eq.equation: eq for eq in report.infeasible_equations}
    combal = by_eq["EQ_COMBAL"]
    assert combal.args == ["R0N", "IMPELC", "ACT", "2020", "2200"]
    assert "Commodity balance" in combal.hint

    foo = by_eq["EQ_FOO"]
    assert foo.args == ["R0N", "XXX"]
    assert foo.hint  # generic hint, non-empty

    error_codes = {err.code for err in report.errors}
    assert "170" in error_codes
    assert "$338" in error_codes
    assert isinstance(report.faq_links, list)


def test_parse_lst_text_extracts_objective():
    report = parse_lst_text(SNIPPET)
    assert report.objective == 12345.6789


def test_parse_lst_file_round_trip(tmp_path: Path):
    lst_path = tmp_path / "snippet.lst"
    lst_path.write_text(SNIPPET, encoding="utf-8")
    report = parse_lst_file(lst_path)
    assert report.status == "INFEASIBLE"
    assert any(eq.equation == "EQ_COMBAL" for eq in report.infeasible_equations)


def test_parse_lst_text_optimal_marker():
    text = "MODEL STATUS: 1 OPTIMAL\n**** OBJECTIVE VALUE: 100.0\n"
    report = parse_lst_text(text)
    assert report.status == "OPTIMAL"
    assert report.objective == 100.0
    assert report.infeasible_equations == []


def test_parse_lst_text_empty_returns_unknown():
    report = parse_lst_text("")
    assert report.status == "UNKNOWN"
    assert report.infeasible_equations == []
    assert report.errors == []
