from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app, session_store
from times_data.io import write_model
from times_data.model import Commodity, CommodityType, FlowSpec, Model, ModelConfig, Process


def _build_model() -> Model:
    model = Model(
        config=ModelConfig(
            name="grouped",
            regions=["R1"],
            start_year=2020,
            periods=[2020, 2030],
            currencies=["MEUR"],
        )
    )
    model.add_commodity(Commodity("ELC", CommodityType.NRG, unit="PJ"))
    model.add_commodity(Commodity("COAL", CommodityType.NRG, unit="PJ"))
    # Process with no inputs/outputs declared yet — likely produces warnings.
    model.add_process(Process("PP", inputs=[FlowSpec("COAL")], outputs=[FlowSpec("ELC")]))
    model.add_parameter("NCAP_COST", 1000.0, r="R1", datayear=2020, p="PP", cur="MEUR")
    return model


def test_validation_grouped_returns_groups(tmp_path):
    session_store.clear()
    model_dir = tmp_path / "model"
    write_model(_build_model(), model_dir)

    client = TestClient(app)
    opened = client.post("/session/open", json={"model_path": str(model_dir)})
    assert opened.status_code == 200
    session_id = opened.json()["session_id"]

    response = client.post("/validation/grouped", json={"session_id": session_id})
    assert response.status_code == 200
    payload = response.json()

    assert payload["session_id"] == session_id
    assert "counts" in payload
    counts = payload["counts"]
    assert {"errors", "warnings", "total"}.issubset(counts.keys())

    groups = payload["groups"]
    assert isinstance(groups, list)

    if counts["total"] > 0:
        assert len(groups) >= 1
        for group in groups:
            assert {"category", "level", "message_count", "sample_messages", "faq_links"}.issubset(
                group.keys()
            )
            assert group["level"] in {"error", "warning"}
            assert group["message_count"] >= 1
            assert isinstance(group["sample_messages"], list)
            assert len(group["sample_messages"]) <= 5
            assert isinstance(group["faq_links"], list)
            for link in group["faq_links"]:
                assert {"slug", "title"}.issubset(link.keys())

        levels = [g["level"] for g in groups]
        if "error" in levels and "warning" in levels:
            assert levels.index("error") < levels.index("warning")

    session_store.clear()
