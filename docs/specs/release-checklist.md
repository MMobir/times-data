# times-data Release Checklist

Use this checklist before creating any tag/release.

## 1) Environment and install checks

- [ ] Fresh clone works from GitHub.
- [ ] Install command works:
  - Mac/Linux: `python3 -m pip install -e .`
  - Windows: `py -m pip install -e .`
- [ ] CLI is reachable:
  - `times-data --help`
  - Fallback: `python3 -m times_data.cli.main --help` / `py -m times_data.cli.main --help`

## 2) Test and lint gates

- [ ] Dev deps install:
  - Mac/Linux: `python3 -m pip install -e ".[dev]"`
  - Windows: `py -m pip install -e ".[dev]"`
- [ ] Critical lint passes: `python3 -m ruff check . --select E9,F63,F7,F82` (or `py -m ruff ...` on Windows)
- [ ] Test suite passes: `python3 -m pytest tests/ -v` (or `py -m pytest tests/ -v` on Windows)
- [ ] Integration tests behavior is expected (pass where possible, skip gracefully if GAMS/TIMES source unavailable).

## 3) Functional smoke tests (required)

- [ ] From-scratch path:
  1. `times-data new DemoQuick --regions REG1 --periods 2020,2030`
  2. `times-data validate DemoQuick/`
  3. `times-data export-dd DemoQuick/ -o DemoQuick-build/`
- [ ] DD import path:
  1. `times-data import-dd <dd-folder> -o imported-model --name ImportedModel`
  2. `times-data info imported-model/`
  3. `times-data validate imported-model/`
  4. `times-data export-dd imported-model/ -o imported-build/`

## 4) Documentation checks

- [ ] README commands are copy-paste runnable.
- [ ] README clearly states two entry paths: from-scratch Python and DD import.
- [ ] README clearly states current scope and limitations.
- [ ] Known license constraints are described precisely (community/commercial scope wording).

## 5) Model trust checks

- [ ] No silent behavior changes in import/export.
- [ ] Demo-model objective parity claims are still true for supported license scope.
- [ ] Any changed validation behavior is documented with examples.

## 6) Release packaging checks

- [ ] `git status` is clean after all checks.
- [ ] Release notes include:
  - what changed
  - migration notes (if any)
  - known limitations
  - verification evidence summary
- [ ] Tag only after all checklist items are complete.
