from __future__ import annotations

from pathlib import Path
import sys
from tempfile import TemporaryDirectory

from fastapi.testclient import TestClient

REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from interface.backend.app import app, session_store
from times_data.io import write_model
from times_data.model import Commodity, CommodityType, FlowSpec, Model, ModelConfig, Process


def _assert_ok(response, context: str) -> dict:
    if response.status_code != 200:
        raise SystemExit(
            f"{context} failed ({response.status_code}): {response.text}"
        )
    return response.json()


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


def main() -> None:
    session_store.clear()
    client = TestClient(app)

    with TemporaryDirectory() as tmp:
        root = Path(tmp)
        left_dir = root / "left-model"
        right_dir = root / "right-model"
        dd_out = root / "dd-out"
        results_csv = root / "results.csv"
        results_csv.write_text("metric,value\nOBJ,123.4\n", encoding="utf-8")

        write_model(_build_model("left", 1000), left_dir)
        write_model(_build_model("right", 1500), right_dir)

        opened = _assert_ok(
            client.post("/session/open", json={"model_path": str(left_dir)}),
            "session open",
        )
        session_id = opened["session_id"]

        graph = _assert_ok(
            client.get("/model/graph", params={"session_id": session_id}),
            "graph fetch",
        )
        if graph["summary"]["processes"] < 1:
            raise SystemExit("graph summary check failed")

        created_commodity = _assert_ok(
            client.post(
                "/model/commodities",
                json={
                    "session_id": session_id,
                    "name": "H2",
                    "type": "NRG",
                    "unit": "PJ",
                },
            ),
            "commodity create",
        )
        if not created_commodity["changed"]:
            raise SystemExit("commodity create did not report change")

        _assert_ok(
            client.post(
                "/model/processes",
                json={
                    "session_id": session_id,
                    "name": "ELEC_TO_H2",
                    "process_type": "STD",
                    "inputs": [{"commodity": "ELC"}],
                    "outputs": [{"commodity": "H2"}],
                },
            ),
            "process create",
        )

        _assert_ok(
            client.post(
                "/model/parameters",
                json={
                    "session_id": session_id,
                    "parameter": "NCAP_COST",
                    "indexes": {"r": "R1", "datayear": 2030, "p": "ELEC_TO_H2", "cur": "MEUR"},
                    "value": 900.0,
                },
            ),
            "parameter upsert",
        )

        preview = _assert_ok(
            client.post(
                "/model/patch/preview",
                json={
                    "session_id": session_id,
                    "rows": [
                        {
                            "parameter": "NCAP_COST",
                            "indexes": {"r": "R1", "datayear": 2030, "p": "ELEC_TO_H2", "cur": "MEUR"},
                            "value": 950.0,
                        }
                    ],
                },
            ),
            "patch preview",
        )
        if preview["changed_count"] != 1:
            raise SystemExit("patch preview changed_count check failed")

        _assert_ok(
            client.post(
                "/model/patch/apply",
                json={
                    "session_id": session_id,
                    "rows": preview["rows"],
                },
            ),
            "patch apply",
        )

        validated = _assert_ok(
            client.post("/model/validate", json={"session_id": session_id}),
            "validate",
        )
        if "errors" not in validated or "warnings" not in validated:
            raise SystemExit("validation response shape check failed")

        exported = _assert_ok(
            client.post("/dd/export", json={"session_id": session_id, "output_path": str(dd_out)}),
            "dd export",
        )
        if len(exported["files"]) < 2:
            raise SystemExit("dd export did not produce expected files")

        imported = _assert_ok(
            client.post("/dd/import", json={"dd_paths": [str(dd_out)]}),
            "dd import",
        )
        imported_session_id = imported["session_id"]

        diff = _assert_ok(
            client.post(
                "/model/diff",
                json={"left_model_path": str(left_dir), "right_model_path": str(right_dir)},
            ),
            "model diff",
        )
        if not diff["has_changes"]:
            raise SystemExit("model diff did not detect expected changes")

        results = _assert_ok(
            client.post("/results/open", json={"results_path": str(results_csv)}),
            "results open",
        )
        if len(results["tables"]) != 1:
            raise SystemExit("results metadata table count check failed")

        _assert_ok(client.post("/session/save", json={"session_id": session_id}), "session save")
        _assert_ok(
            client.post("/session/close", json={"session_id": imported_session_id}),
            "imported session close",
        )
        _assert_ok(client.post("/session/close", json={"session_id": session_id}), "session close")

    session_store.clear()
    print("Interface smoke flow passed.")


if __name__ == "__main__":
    main()
