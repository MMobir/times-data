from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app, session_store
from times_data.io import write_model
from times_data.model import Commodity, CommodityType, FlowSpec, Model, ModelConfig, Process


def _build_model(name: str, ncap_cost: float) -> Model:
    model = Model(
        config=ModelConfig(
            name=name,
            regions=["R1"],
            start_year=2020,
            periods=[2020, 2030],
            currencies=["MEUR"],
        )
    )
    model.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ"))
    model.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    model.add_process(Process("PP", inputs=[FlowSpec("COAL")], outputs=[FlowSpec("ELC")]))
    model.add_parameter("NCAP_COST", ncap_cost, r="R1", datayear=2020, p="PP", cur="MEUR")
    return model


def _open_session(client: TestClient, model_dir: str) -> str:
    opened = client.post("/session/open", json={"model_path": model_dir})
    assert opened.status_code == 200
    return opened.json()["session_id"]


def test_validate_export_diff_and_import(tmp_path):
    session_store.clear()
    left_dir = tmp_path / "left"
    right_dir = tmp_path / "right"
    write_model(_build_model("left", 1000), left_dir)
    write_model(_build_model("right", 1500), right_dir)

    client = TestClient(app)
    session_id = _open_session(client, str(left_dir))

    validate = client.post("/model/validate", json={"session_id": session_id})
    assert validate.status_code == 200
    assert "counts" in validate.json()
    assert validate.json()["counts"]["errors"] == 0

    export_dir = tmp_path / "dd-out"
    exported = client.post(
        "/dd/export",
        json={"session_id": session_id, "output_path": str(export_dir)},
    )
    assert exported.status_code == 200
    assert len(exported.json()["files"]) >= 2

    imported = client.post(
        "/dd/import",
        json={"dd_paths": [str(export_dir)]},
    )
    assert imported.status_code == 200
    assert imported.json()["changed"] is True
    assert imported.json()["summary"]["processes"] >= 1

    diff = client.post(
        "/model/diff",
        json={"left_model_path": str(left_dir), "right_model_path": str(right_dir)},
    )
    assert diff.status_code == 200
    assert diff.json()["has_changes"] is True
    assert len(diff.json()["changed_parameters"]) >= 1
    session_store.clear()
