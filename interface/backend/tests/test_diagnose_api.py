from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app


SNIPPET = """\
GAMS Run for TIMES Demo
Row 'EQ_COMBAL('R0N','IMPELC','ACT',2020,2200)' infeasible
Row 'EQ_FOO('R0N','XXX')' infeasible
**** $338
Error 170 Domain violation in symbol PRC_MAP
**** OBJECTIVE VALUE: 12345.6789
"""


def _assert_report_shape(payload: dict) -> None:
    assert {"status", "objective", "infeasible_equations", "errors", "faq_links"}.issubset(
        payload.keys()
    )
    assert isinstance(payload["infeasible_equations"], list)
    assert isinstance(payload["errors"], list)
    assert isinstance(payload["faq_links"], list)


def test_diagnose_lst_via_text():
    client = TestClient(app)
    response = client.post("/diagnose/lst", json={"text": SNIPPET})
    assert response.status_code == 200
    payload = response.json()
    _assert_report_shape(payload)
    assert payload["status"] == "INFEASIBLE"
    assert any(eq["equation"] == "EQ_COMBAL" for eq in payload["infeasible_equations"])
    assert any(err["code"] == "170" for err in payload["errors"])
    assert payload["objective"] == 12345.6789


def test_diagnose_lst_via_path(tmp_path):
    lst_file = tmp_path / "snippet.lst"
    lst_file.write_text(SNIPPET, encoding="utf-8")
    client = TestClient(app)
    response = client.post("/diagnose/lst", json={"path": str(lst_file)})
    assert response.status_code == 200
    payload = response.json()
    _assert_report_shape(payload)
    assert payload["status"] == "INFEASIBLE"


def test_diagnose_lst_requires_text_or_path():
    client = TestClient(app)
    response = client.post("/diagnose/lst", json={})
    assert response.status_code == 400


def test_diagnose_lst_missing_path_returns_404(tmp_path):
    client = TestClient(app)
    missing = tmp_path / "nope.lst"
    response = client.post("/diagnose/lst", json={"path": str(missing)})
    assert response.status_code == 404
