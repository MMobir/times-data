from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app, session_store
from times_data.io import write_model
from times_data.model import Commodity, CommodityType, FlowSpec, Model, ModelConfig, Process


def _build_model() -> Model:
    model = Model(
        config=ModelConfig(
            name="entity-test",
            regions=["R1"],
            start_year=2020,
            periods=[2020, 2030],
            currencies=["MEUR"],
        )
    )
    model.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ"))
    model.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    model.add_process(Process("PP", inputs=[FlowSpec("COAL")], outputs=[FlowSpec("ELC")]))
    return model


def _open_session(client: TestClient, model_dir: str) -> str:
    opened = client.post("/session/open", json={"model_path": model_dir})
    assert opened.status_code == 200
    return opened.json()["session_id"]


def test_create_update_delete_commodity(tmp_path):
    session_store.clear()
    model_dir = tmp_path / "model"
    write_model(_build_model(), model_dir)
    client = TestClient(app)
    session_id = _open_session(client, str(model_dir))

    create = client.post(
        "/model/commodities",
        json={"session_id": session_id, "name": "H2", "type": "NRG", "unit": "PJ"},
    )
    assert create.status_code == 200
    assert create.json()["changed"] is True
    assert create.json()["dirty"] is True

    update = client.patch(
        "/model/commodities/H2",
        json={"session_id": session_id, "description": "Hydrogen"},
    )
    assert update.status_code == 200
    assert update.json()["changed_count"] == 1

    listed = client.get("/model/commodities", params={"session_id": session_id})
    assert listed.status_code == 200
    names = [item["name"] for item in listed.json()["items"]]
    assert "H2" in names

    delete = client.request(
        "DELETE",
        "/model/commodities/H2",
        json={"session_id": session_id},
    )
    assert delete.status_code == 200
    assert delete.json()["changed"] is True
    session_store.clear()


def test_create_update_delete_process_and_graph(tmp_path):
    session_store.clear()
    model_dir = tmp_path / "model"
    write_model(_build_model(), model_dir)
    client = TestClient(app)
    session_id = _open_session(client, str(model_dir))

    create = client.post(
        "/model/processes",
        json={
            "session_id": session_id,
            "name": "GAS_PP",
            "process_type": "STD",
            "inputs": [{"commodity": "COAL"}],
            "outputs": [{"commodity": "ELC"}],
        },
    )
    assert create.status_code == 200
    assert create.json()["changed"] is True

    update = client.patch(
        "/model/processes/GAS_PP",
        json={
            "session_id": session_id,
            "description": "Gas plant",
            "regions": ["R1"],
        },
    )
    assert update.status_code == 200
    assert update.json()["changed"] is True

    listed = client.get("/model/processes", params={"session_id": session_id})
    assert listed.status_code == 200
    names = [item["name"] for item in listed.json()["items"]]
    assert "GAS_PP" in names

    graph = client.get("/model/graph", params={"session_id": session_id})
    assert graph.status_code == 200
    assert graph.json()["summary"]["processes"] >= 2

    delete = client.request(
        "DELETE",
        "/model/processes/GAS_PP",
        json={"session_id": session_id},
    )
    assert delete.status_code == 200
    assert delete.json()["changed"] is True
    session_store.clear()
