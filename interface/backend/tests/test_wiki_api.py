from __future__ import annotations

from fastapi.testclient import TestClient

from interface.backend.app import app


def test_wiki_categories_returns_counts():
    client = TestClient(app)
    response = client.get("/wiki/categories")
    assert response.status_code == 200
    payload = response.json()
    assert "categories" in payload
    categories = payload["categories"]
    assert isinstance(categories, dict)
    assert len(categories) >= 1
    assert categories.get("parameter", 0) > 0


def test_wiki_parameter_lookup_is_case_insensitive():
    client = TestClient(app)
    response = client.get("/wiki/parameter/NCAP_COST")
    assert response.status_code == 200
    payload = response.json()
    assert "NCAP_COST" in payload["title"]
    assert payload["type"] == "parameter"
    assert payload["body_markdown"]


def test_wiki_search_infeasibility_returns_hits():
    client = TestClient(app)
    response = client.post("/wiki/search", json={"query": "infeasibility"})
    assert response.status_code == 200
    payload = response.json()
    assert "hits" in payload
    assert len(payload["hits"]) >= 1


def test_wiki_search_with_type_filter():
    client = TestClient(app)
    response = client.post(
        "/wiki/search",
        json={"query": "calibration", "limit": 5, "types": ["faq"]},
    )
    assert response.status_code == 200
    hits = response.json()["hits"]
    if hits:
        assert all(hit["type"] == "faq" for hit in hits)


def test_wiki_entry_returns_404_for_unknown_slug():
    client = TestClient(app)
    response = client.get("/wiki/entry/this-slug-does-not-exist-xyz")
    assert response.status_code == 404
