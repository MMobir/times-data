from __future__ import annotations

import subprocess
import sys
from pathlib import Path
from tempfile import TemporaryDirectory


def run(*args: str, cwd: Path) -> None:
    cmd = [sys.executable, "-m", "times_data.cli.main", *args]
    completed = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    if completed.returncode != 0:
        print(f"FAILED: {' '.join(cmd)}", file=sys.stderr)
        print(completed.stdout, file=sys.stderr)
        print(completed.stderr, file=sys.stderr)
        raise SystemExit(completed.returncode)


def main() -> None:
    with TemporaryDirectory() as tmp:
        workdir = Path(tmp)

        run("--help", cwd=workdir)
        run("new", "DemoQuick", "--regions", "REG1", "--periods", "2020,2030", cwd=workdir)
        run("info", "DemoQuick", cwd=workdir)
        run("validate", "DemoQuick", cwd=workdir)
        run("export-dd", "DemoQuick", "-o", "DemoQuick-build", cwd=workdir)

        expected = {
            workdir / "DemoQuick-build" / "BASE.DD",
            workdir / "DemoQuick-build" / "DemoQuick.RUN",
            workdir / "DemoQuick-build" / "DemoQuick_TS.DD",
        }
        missing = [str(p) for p in expected if not p.exists()]
        if missing:
            print("Smoke test failed: missing generated files:", file=sys.stderr)
            for item in missing:
                print(f" - {item}", file=sys.stderr)
            raise SystemExit(1)

    print("Smoke release flow passed.")


if __name__ == "__main__":
    main()
