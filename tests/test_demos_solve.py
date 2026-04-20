"""
Integration tests: verify DD round-trip produces exact objective matches
on official TIMES DemoS models.

Requires: GAMS installed, TIMES source code at /tmp/TIMES_model
Skips gracefully if not available.
"""

import subprocess
import pytest
from pathlib import Path

from times_data.io import import_dd
from times_data.compiler import compile_dd

DEMOS_DD = Path(__file__).parent.parent.parent / "demos" / "dd"
TIMES_SRC = Path("/tmp/TIMES_model")
GAMS_PATH = Path("/Library/Frameworks/GAMS.framework/Resources/gams")
REQUIRED_TIMES_FILES = ("initsys.mod", "initmty.mod", "maindrv.mod")


def _has_complete_times_source() -> bool:
    return TIMES_SRC.exists() and all((TIMES_SRC / f).exists() for f in REQUIRED_TIMES_FILES)

SKIP_MSG = (
    "GAMS or complete TIMES source not available "
    "(need /tmp/TIMES_model with initsys.mod, initmty.mod, maindrv.mod)"
)
requires_gams = pytest.mark.skipif(
    not GAMS_PATH.exists() or not _has_complete_times_source(),
    reason=SKIP_MSG,
)


def _solve_dd(dd_dir: Path, name: str, ts_file: str, dd_files: list[str],
              milestones: str = "") -> tuple[str, str]:
    """Solve DD files through GAMS, return (status, objective)."""
    dd_includes = "\n".join(f"$BATINCLUDE {f}" for f in dd_files)
    ms_line = f"SET MILESTONYR / {milestones} /;" if milestones else ""
    end_file = dd_dir / "END_GAMS"
    lst = dd_dir / f"{name}.lst"

    # Avoid stale status/results from previous solves in reused folders.
    if end_file.exists():
        end_file.unlink()
    if lst.exists():
        lst.unlink()

    run_content = f"""\
$TITLE TIMES -- {name}
OPTION RESLIM=50000, PROFILE=1, SOLVEOPT=REPLACE;
OPTION ITERLIM=999999, LIMROW=0, LIMCOL=0, SOLPRINT=OFF;
$OFFLISTING
option LP=CBC;
$SET REDUCE YES
$SET DSCAUTO YES
$SET VDA YES
$SET DEBUG NO
$SET DUMPSOL NO
$SET SOLVE_NOW YES
$SET XTQA YES
$SET VAR_UC YES
$SET OBJ MOD
$SET SOLVEDA YES
OPTION BRATIO=1;
$ONMULTI
$BATINCLUDE {ts_file}
$SET BOTIME 1950
$BATINCLUDE initsys.mod
$BATINCLUDE initmty.mod
{dd_includes}
{ms_line}
$SET RUN_NAME {name}
$ BATINCLUDE maindrv.mod mod
"""
    run_file = dd_dir / f"{name}.RUN"
    run_file.write_text(run_content)

    subprocess.run(
        [str(GAMS_PATH), str(run_file), f"idir1={dd_dir}", f"idir2={TIMES_SRC}",
         "ps=0", f"gdx={dd_dir / name}", f"O={dd_dir / name}.lst"],
        capture_output=True, text=True, timeout=120, cwd=str(dd_dir),
    )

    if not lst.exists():
        return "NO_LST", ""

    lst_text = lst.read_text()
    license_markers = [
        "exceeds the demo license",
        "community license",
        "license limits",
        "license too small",
    ]
    lst_lower = lst_text.lower()
    if any(marker in lst_lower for marker in license_markers):
        return "LICENSE", ""

    status = end_file.read_text().strip() if end_file.exists() else "UNKNOWN"
    obj = ""
    for line in lst_text.split("\n"):
        if "OBJECTIVE VALUE" in line:
            obj = line.split()[-1]
            break

    return ("OPTIMAL" if "Optimal" in status else "ERROR"), obj


@requires_gams
@pytest.mark.parametrize("demo", ["DemoS_001", "DemoS_002", "DemoS_003", "DemoS_004",
                                    "DemoS_005", "DemoS_006", "DemoS_007"])
def test_demo_objective_matches(demo, tmp_path):
    """Verify times-data round-trip produces exact objective match."""
    dd_dir = DEMOS_DD / demo
    if not dd_dir.exists():
        pytest.skip(f"DD files not found for {demo}")

    # Baseline: solve xl2times DD directly
    bl_status, bl_obj = _solve_dd(dd_dir, f"{demo}_bl", "ts.dd",
                                   ["output.dd", "milestonyr.dd"])

    if bl_status == "LICENSE":
        pytest.skip(f"{demo} exceeds active GAMS community/demo license limits")
    assert bl_status == "OPTIMAL", f"Baseline failed: {bl_status}"

    # Round-trip: import -> compile -> solve
    dd_files = sorted(dd_dir.glob("*.dd"))
    model = import_dd(dd_files)
    model.config.name = demo

    td_dir = tmp_path / "td"
    compile_dd(model, td_dir)

    milestones = ",".join(str(y) for y in model.config.periods)
    td_status, td_obj = _solve_dd(td_dir, demo, f"{demo}_TS.DD", ["BASE.DD"], milestones)

    assert td_status == "OPTIMAL", f"times-data round-trip failed: {td_status}"
    assert bl_obj == td_obj, f"Objective mismatch: baseline={bl_obj}, times-data={td_obj}"
