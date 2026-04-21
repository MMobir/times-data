from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app, session_store
from times_data.io import write_model
from times_data.model import Commodity, CommodityType, FlowSpec, Model, ModelConfig, Process


def _build_model() -> Model:
    model = Model(
        config=ModelConfig(
            name="param-test",
            regions=["R1"],
            start_year=2020,
            periods=[2020, 2030],
            currencies=["MEUR"],
        )
    )
    model.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ"))
    model.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    model.add_process(Process("WIND", outputs=[FlowSpec("ELC")]))
    model.add_process(Process("PP", inputs=[FlowSpec("COAL")], outputs=[FlowSpec("ELC")]))
    model.add_parameter("NCAP_COST", 1200, r="R1", datayear=2020, p="WIND", cur="MEUR")
    return model


def _open_session(client: TestClient, model_dir: str) -> str:
    opened = client.post("/session/open", json={"model_path": model_dir})
    assert opened.status_code == 200
    return opened.json()["session_id"]


def test_parameter_crud(tmp_path):
    session_store.clear()
    model_dir = tmp_path / "model"
    write_model(_build_model(), model_dir)
    client = TestClient(app)
    session_id = _open_session(client, str(model_dir))

    created = client.post(
        "/model/parameters",
        json={
            "session_id": session_id,
            "parameter": "NCAP_COST",
            "indexes": {"r": "R1", "datayear": 2030, "p": "PP", "cur": "MEUR"},
            "value": 1800,
        },
    )
    assert created.status_code == 200
    assert created.json()["changed"] is True

    updated = client.patch(
        "/model/parameters",
        json={
            "session_id": session_id,
            "parameter": "NCAP_COST",
            "indexes": {"r": "R1", "datayear": 2030, "p": "PP", "cur": "MEUR"},
            "value": 1700,
        },
    )
    assert updated.status_code == 200
    assert updated.json()["changed_count"] == 1

    listed = client.get(
        "/model/parameters",
        params={"session_id": session_id, "parameter": "NCAP_COST"},
    )
    assert listed.status_code == 200
    assert any(row["value"] == 1700 for row in listed.json()["items"])

    deleted = client.request(
        "DELETE",
        "/model/parameters",
        json={
            "session_id": session_id,
            "parameter": "NCAP_COST",
            "indexes": {"r": "R1", "datayear": 2030, "p": "PP", "cur": "MEUR"},
        },
    )
    assert deleted.status_code == 200
    assert deleted.json()["changed"] is True
    session_store.clear()


def test_patch_preview_and_apply(tmp_path):
    session_store.clear()
    model_dir = tmp_path / "model"
    write_model(_build_model(), model_dir)
    client = TestClient(app)
    session_id = _open_session(client, str(model_dir))

    preview = client.post(
        "/model/patch/preview",
        json={
            "session_id": session_id,
            "rows": [
                {
                    "parameter": "NCAP_COST",
                    "indexes": {"r": "R1", "datayear": 2030, "p": "WIND", "cur": "MEUR"},
                    "value": 900,
                }
            ],
        },
    )
    assert preview.status_code == 200
    assert preview.json()["changed_count"] == 1
    assert preview.json()["dirty"] is False

    apply = client.post(
        "/model/patch/apply",
        json={
            "session_id": session_id,
            "rows": preview.json()["rows"],
        },
    )
    assert apply.status_code == 200
    assert apply.json()["changed"] is True
    assert apply.json()["dirty"] is True
    session_store.clear()
