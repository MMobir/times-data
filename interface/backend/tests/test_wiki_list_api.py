from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app


def test_wiki_list_parameters_returns_many_hits():
    client = TestClient(app)
    response = client.post("/wiki/list", json={"types": ["parameter"]})
    assert response.status_code == 200
    payload = response.json()
    assert "hits" in payload
    assert "total" in payload
    assert payload["total"] >= 200, payload["total"]
    assert len(payload["hits"]) == payload["total"]
    by_title = {hit["title"]: hit for hit in payload["hits"]}
    assert "NCAP_COST" in by_title
    ncap_cost = by_title["NCAP_COST"]
    assert ncap_cost["type"] == "parameter"
    assert ncap_cost["indexes"] is not None
    assert "r" in ncap_cost["indexes"]
    assert "datayear" in ncap_cost["indexes"]
    assert "p" in ncap_cost["indexes"]
    assert ncap_cost["category"] is not None
    assert "User" in ncap_cost["category"] or "user" in ncap_cost["category"].lower()
    assert ncap_cost["description"]


def test_wiki_list_supports_pagination_and_query():
    client = TestClient(app)
    full = client.post("/wiki/list", json={"types": ["parameter"]}).json()
    paged = client.post(
        "/wiki/list",
        json={"types": ["parameter"], "limit": 10, "offset": 0},
    ).json()
    assert paged["total"] == full["total"]
    assert len(paged["hits"]) == 10
    assert paged["hits"] == full["hits"][:10]

    query = client.post(
        "/wiki/list",
        json={"types": ["parameter"], "query": "ncap_cost"},
    ).json()
    assert query["total"] >= 1
    assert any("NCAP_COST" in hit["title"] for hit in query["hits"])


def test_wiki_list_filters_by_multiple_types():
    client = TestClient(app)
    payload = client.post(
        "/wiki/list",
        json={"types": ["set", "index"], "limit": 50},
    ).json()
    assert payload["total"] >= 0
    for hit in payload["hits"]:
        assert hit["type"] in {"set", "index"}
