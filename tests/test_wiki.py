from __future__ import annotations

from times_data.wiki import WikiIndex, get_default_index


def test_loader_finds_expected_category_volumes():
    index = WikiIndex()
    counts = index.list_categories()
    assert counts.get("parameter", 0) >= 200
    assert counts.get("set", 0) >= 100
    assert counts.get("index", 0) >= 30
    assert counts.get("concept", 0) >= 10
    assert counts.get("faq", 0) >= 5


def test_get_parameter_ncap_cost_resolves():
    index = WikiIndex()
    entry = index.get_parameter("NCAP_COST")
    assert entry is not None
    assert entry.type == "parameter"
    assert "Investment cost" in entry.body_markdown


def test_get_parameter_accepts_hyphenated_form():
    index = WikiIndex()
    assert index.get_parameter("ncap-cost") is not None


def test_get_concept_resolves_known_slug():
    index = WikiIndex()
    entry = index.get_concept("reference-energy-system")
    assert entry is not None
    assert entry.type == "concept"


def test_search_infeasibility_returns_hits():
    index = WikiIndex()
    hits = index.search("infeasibility")
    assert len(hits) >= 1


def test_search_ncap_cost_returns_parameter_top():
    index = WikiIndex()
    hits = index.search("ncap_cost")
    assert hits, "expected at least one hit"
    top = hits[0]
    assert top.type == "parameter"
    assert "NCAP_COST" in top.title


def test_default_index_singleton():
    assert get_default_index() is get_default_index()
