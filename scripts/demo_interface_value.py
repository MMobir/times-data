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


def _assert_ok(response, step: str) -> dict:
    if response.status_code != 200:
        raise SystemExit(f"{step} failed ({response.status_code}): {response.text}")
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
        baseline_dir = root / "baseline-model"
        candidate_dir = root / "candidate-model"
        dd_out = root / "dd-export"
        results_csv = root / "results.csv"
        results_csv.write_text("metric,value\nOBJ,123.4\n", encoding="utf-8")

        write_model(_build_model("baseline", 1000), baseline_dir)
        write_model(_build_model("candidate", 1500), candidate_dir)

        print("\n1) Open model session")
        opened = _assert_ok(
            client.post("/session/open", json={"model_path": str(baseline_dir)}),
            "session open",
        )
        session_id = opened["session_id"]
        print(f"   Session ID: {session_id}")
        print(f"   Summary: {opened['summary']}")

        print("\n2) Make deterministic edits (commodity + process + parameter)")
        _assert_ok(
            client.post(
                "/model/commodities",
                json={"session_id": session_id, "name": "H2", "type": "NRG", "unit": "PJ"},
            ),
            "commodity create",
        )
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
        print("   Applied model edits in-session without touching raw DD text.")

        print("\n3) Preview and apply patch")
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
        print(f"   Preview changed_count: {preview['changed_count']}")
        _assert_ok(
            client.post(
                "/model/patch/apply",
                json={"session_id": session_id, "rows": preview["rows"]},
            ),
            "patch apply",
        )
        print("   Patch applied with explicit before/after values.")

        print("\n4) Validate before export")
        validation = _assert_ok(
            client.post("/model/validate", json={"session_id": session_id}),
            "validate",
        )
        print(
            f"   Validation counts -> errors: {validation['counts']['errors']}, "
            f"warnings: {validation['counts']['warnings']}"
        )
        print("   Benefit: catches model issues before GAMS solve cycle.")

        print("\n5) Diff against another model version")
        diff = _assert_ok(
            client.post(
                "/model/diff",
                json={
                    "left_model_path": str(baseline_dir),
                    "right_model_path": str(candidate_dir),
                },
            ),
            "model diff",
        )
        print(
            "   Diff summary -> "
            f"changed_parameters: {len(diff['changed_parameters'])}, "
            f"added_processes: {len(diff['added_processes'])}"
        )
        print("   Benefit: transparent model-to-model change review.")

        print("\n6) Export to DD")
        exported = _assert_ok(
            client.post(
                "/dd/export",
                json={"session_id": session_id, "output_path": str(dd_out)},
            ),
            "dd export",
        )
        print(f"   Exported {len(exported['files'])} file(s) to: {exported['output_path']}")

        print("\n7) Open results metadata")
        results = _assert_ok(
            client.post("/results/open", json={"results_path": str(results_csv)}),
            "results open",
        )
        table = results["tables"][0]
        print(f"   Results table '{table['name']}' columns: {table['columns']}, rows: {table['row_count']}")
        print("   Benefit: quick schema-level inspection before deeper analysis.")

        _assert_ok(client.post("/session/close", json={"session_id": session_id}), "session close")

    session_store.clear()
    print("\nDone: interface value walkthrough completed successfully.")


if __name__ == "__main__":
    main()
