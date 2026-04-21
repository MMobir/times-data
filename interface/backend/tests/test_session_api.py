from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app, session_store
from times_data.io import write_model
from times_data.model import Commodity, CommodityType, FlowSpec, Model, ModelConfig, Process


def _build_model() -> Model:
    model = Model(
        config=ModelConfig(
            name="session-test",
            regions=["R1"],
            start_year=2020,
            periods=[2020, 2030],
            currencies=["MEUR"],
        )
    )
    model.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ"))
    model.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    model.add_process(Process("PP", inputs=[FlowSpec("COAL")], outputs=[FlowSpec("ELC")]))
    model.add_parameter("NCAP_COST", 1000, r="R1", datayear=2020, p="PP", cur="MEUR")
    return model


def _open_session(client: TestClient, model_path: str) -> str:
    opened = client.post("/session/open", json={"model_path": model_path})
    assert opened.status_code == 200
    return opened.json()["session_id"]


def test_open_and_save_session(tmp_path):
    session_store.clear()
    model_dir = tmp_path / "model"
    write_model(_build_model(), model_dir)
    client = TestClient(app)

    opened = client.post("/session/open", json={"model_path": str(model_dir)})
    assert opened.status_code == 200
    assert opened.json()["changed"] is True
    session_id = opened.json()["session_id"]

    saved = client.post("/session/save", json={"session_id": session_id})
    assert saved.status_code == 200
    assert saved.json()["dirty"] is False
    session_store.clear()


def test_close_session(tmp_path):
    session_store.clear()
    model_dir = tmp_path / "model"
    write_model(_build_model(), model_dir)
    client = TestClient(app)

    session_id = _open_session(client, str(model_dir))
    closed = client.post("/session/close", json={"session_id": session_id})
    assert closed.status_code == 200
    assert closed.json()["changed"] is True
    assert closed.json()["changed_count"] == 1

    missing = client.get("/model/graph", params={"session_id": session_id})
    assert missing.status_code == 404
    session_store.clear()


def test_cors_preflight_for_session_open():
    session_store.clear()
    client = TestClient(app)

    response = client.options(
        "/session/open",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
