"""Tests for the TIMES parameter/set/index schema."""

from times_data.schema import PARAMETER_REGISTRY, SET_REGISTRY, INDEX_REGISTRY


def test_parameter_count():
    assert len(PARAMETER_REGISTRY) == 288


def test_set_count():
    assert len(SET_REGISTRY) >= 170


def test_index_count():
    assert len(INDEX_REGISTRY) >= 35


def test_parameter_lookup():
    p = PARAMETER_REGISTRY["ncap_cost"]
    assert p.name == "NCAP_COST"
    assert "r" in p.indexes
    assert "datayear" in p.indexes
    assert "p" in p.indexes
    assert "cur" in p.indexes


def test_parameter_has_description():
    for name, pdef in PARAMETER_REGISTRY.items():
        assert pdef.description, f"Parameter {pdef.name} has no description"


def test_act_bnd_indexes():
    p = PARAMETER_REGISTRY["act_bnd"]
    assert p.indexes == ("r", "datayear", "p", "s", "bd")
    assert p.default_ie == "MIG"


def test_flo_func_has_six_indexes():
    p = PARAMETER_REGISTRY["flo_func"]
    assert len(p.indexes) == 6, f"FLO_FUNC should have 6 indexes, got {len(p.indexes)}"


def test_g_drate_uses_allyear():
    p = PARAMETER_REGISTRY["g_drate"]
    assert "allyear" in p.indexes
    assert "datayear" not in p.indexes
