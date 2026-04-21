from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app, session_store


def test_open_results_metadata_file(tmp_path):
    session_store.clear()
    results_file = tmp_path / "results.csv"
    results_file.write_text("region,year,value\nR1,2020,10\nR1,2030,12\n", encoding="utf-8")

    client = TestClient(app)
    response = client.post("/results/open", json={"results_path": str(results_file)})
    assert response.status_code == 200
    payload = response.json()
    assert payload["results_path"] == str(results_file)
    assert len(payload["tables"]) == 1
    assert payload["tables"][0]["columns"] == ["region", "year", "value"]
    assert payload["tables"][0]["row_count"] == 2


def test_open_results_metadata_directory(tmp_path):
    session_store.clear()
    csv_file = tmp_path / "summary.csv"
    tsv_file = tmp_path / "flows.tsv"
    csv_file.write_text("metric,value\nobj,123\n", encoding="utf-8")
    tsv_file.write_text("process\tflow\nPP\t100\n", encoding="utf-8")

    client = TestClient(app)
    response = client.post("/results/open", json={"results_path": str(tmp_path)})
    assert response.status_code == 200
    payload = response.json()
    assert len(payload["tables"]) == 2
    names = sorted([table["name"] for table in payload["tables"]])
    assert names == ["flows", "summary"]
