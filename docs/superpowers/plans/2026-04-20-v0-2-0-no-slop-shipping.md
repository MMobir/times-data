# times-data v0.2.0 No-Slop Shipping Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a release that TIMES modelers can trust for daily use without hidden behavior, onboarding friction, or regressions.

**Architecture:** Keep `times-data` as a deterministic data layer (model graph + validation + DD compiler), then harden reliability through strict release gates, clearer diagnostics, and repeatable test evidence. Focus on practical quality over feature breadth.

**Tech Stack:** Python 3.11+, Click CLI, PyYAML, pytest, ruff, GitHub Actions.

---

## Shipping Principles (non-negotiable)

- Determinism over convenience: identical inputs produce identical outputs.
- No silent coercions: every assumption/default must be documented or logged.
- Fast failure with clear remediation: error messages must tell modelers what to change.
- Evidence before claims: every release includes test artifacts and environment matrix.
- Small increments: each release should reduce risk and increase trust.

## v0.2.0 Exit Criteria (must all pass)

1. Fresh install works on Windows/Mac/Linux with documented commands.
2. `times-data new`, `validate`, `import-dd`, `export-dd`, and `info` all pass smoke tests.
3. DemoS regression suite remains green for supported license scope (unit tests pass; integration tests skip gracefully where expected).
4. Docs include beginner-safe install/test commands and troubleshooting.
5. CI enforces lint + tests on pull requests.
6. Release notes include known limitations (explicitly including GAMS license scope).

---

## Task 1: Harden release gates and automate them

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `scripts/smoke_release.sh`
- Modify: `README.md`
- Test: `tests/test_io.py`, `tests/test_model.py`, `tests/test_validation.py`

- [ ] **Step 1: Add CI workflow for lint + tests**
- [ ] **Step 2: Add release smoke script for CLI flow (`new -> validate -> export`)**
- [ ] **Step 3: Run smoke script locally and confirm success**
- [ ] **Step 4: Ensure README links smoke commands and expected output**
- [ ] **Step 5: Commit**

**Acceptance checks:**
- `python3 -m pytest tests/ -v` passes (integration tests skip if no GAMS/TIMES source).
- `ruff check .` passes.
- CI runs on PR and main pushes.

---

## Task 2: Improve validation clarity for modelers (not programmers)

**Files:**
- Modify: `times_data/validation/schema_check.py`
- Modify: `times_data/validation/structural.py`
- Modify: `times_data/cli/main.py`
- Create: `tests/test_validation_messages.py`
- Modify: `README.md`

- [ ] **Step 1: Add failing tests for message clarity and actionable guidance**
- [ ] **Step 2: Update validation messages to include entity + fix hint**
- [ ] **Step 3: Add grouped error summary in CLI output**
- [ ] **Step 4: Re-run validation test suite**
- [ ] **Step 5: Commit**

**Acceptance checks:**
- Every error includes: what failed, where, and likely fix.
- CLI output remains concise for large models (no unreadable dumps).

---

## Task 3: Add reproducibility metadata for trust and audit

**Files:**
- Modify: `times_data/compiler/dd_compiler.py`
- Create: `times_data/compiler/manifest.py`
- Create: `tests/test_manifest.py`
- Modify: `README.md`

- [ ] **Step 1: Add failing test for export manifest generation**
- [ ] **Step 2: Emit `MANIFEST.json` on export (tool version, python version, input model summary, generated files + hashes)**
- [ ] **Step 3: Document manifest usage in README**
- [ ] **Step 4: Re-run full test suite**
- [ ] **Step 5: Commit**

**Acceptance checks:**
- `export-dd` always emits deterministic metadata.
- Hashes change only when exported content changes.

---

## Task 4: Build model diff/change summary (high-value adoption feature)

**Files:**
- Create: `times_data/diff/model_diff.py`
- Create: `times_data/cli/diff_cmd.py`
- Modify: `times_data/cli/main.py`
- Create: `tests/test_model_diff.py`
- Modify: `README.md`

- [ ] **Step 1: Add failing tests for commodity/process/parameter delta detection**
- [ ] **Step 2: Implement structured diff engine**
- [ ] **Step 3: Add `times-data diff <model_a> <model_b>` CLI**
- [ ] **Step 4: Add concise human-readable report output**
- [ ] **Step 5: Commit**

**Acceptance checks:**
- Diff output clearly reports added/removed/changed entities.
- Handles large parameter tables without timing out.

---

## Task 5: Release process and user-facing trust signals

**Files:**
- Create: `docs/specs/release-checklist.md`
- Create: `docs/specs/known-limitations.md`
- Create: `CHANGELOG.md`
- Modify: `README.md`

- [ ] **Step 1: Document release checklist with explicit gates**
- [ ] **Step 2: Document known limitations and non-goals**
- [ ] **Step 3: Add changelog discipline for every release**
- [ ] **Step 4: Add contribution/testing guidance for external modelers**
- [ ] **Step 5: Commit**

**Acceptance checks:**
- No release without completed checklist and linked test evidence.
- Known limitations page prevents over-promising.

---

## v0.2.0 GitHub Issue Backlog (ready to create)

P0 (ship blockers):
- `ci: add cross-platform lint/test workflow`
- `release: add smoke script for CLI onboarding flow`
- `docs: beginner-safe install and test commands with troubleshooting`
- `release: publish explicit known limitations and license scope`

P1 (adoption):
- `validation: improve actionable error messages`
- `compiler: emit manifest with hashes and environment metadata`
- `cli: add model diff command for daily modeling workflow`

P2 (after v0.2.0):
- `scenarios: add patch-based scenario editing workflow`
- `doctor: add environment diagnostics command`

---

## Definition of Done for "not slop"

- A new user can clone, install, run CLI, and run tests using only README.
- A modeler can diagnose failures from CLI output without reading source code.
- A maintainer can reproduce export artifacts with manifest evidence.
- A contributor can open a PR and get deterministic CI feedback.
- Release notes clearly state what works, what is experimental, and what is out of scope.
