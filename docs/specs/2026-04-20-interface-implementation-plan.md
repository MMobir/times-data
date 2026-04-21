# Local Interface (FastAPI + React) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a local-first interface for TIMES modelers to perform model CRUD, validation, DD roundtrip, diff, scenario patching, and read-only results browsing through `times-data`.

**Architecture:** Build a thin FastAPI backend that wraps existing `times_data` domain logic and a React frontend that consumes typed APIs. Keep all model semantics in Python services to prevent frontend/backend divergence and preserve deterministic behavior.

**Tech Stack:** Python 3.11+, FastAPI, Pydantic, pytest, React + TypeScript + Vite, Playwright (UI smoke), GitHub Actions.

---

## File Structure (target)

### Backend
- Create: `interface/backend/app.py` — API bootstrap + route wiring.
- Create: `interface/backend/session_store.py` — in-memory session lifecycle.
- Create: `interface/backend/schemas.py` — API request/response models.
- Create: `interface/backend/services/model_service.py` — open/save/reset.
- Create: `interface/backend/services/entity_service.py` — process/commodity CRUD + flows.
- Create: `interface/backend/services/parameter_service.py` — query/upsert/delete + patch preview/apply.
- Create: `interface/backend/services/validation_service.py` — grouped validation payload.
- Create: `interface/backend/services/dd_service.py` — import/export wrappers.
- Create: `interface/backend/services/diff_service.py` — model compare wrapper.
- Create: `interface/backend/services/results_service.py` — read-only results metadata/tables.
- Create: `interface/backend/tests/test_*.py` — endpoint + service tests.

### Frontend
- Create: `interface/frontend/package.json`
- Create: `interface/frontend/vite.config.ts`
- Create: `interface/frontend/src/main.tsx`
- Create: `interface/frontend/src/app/router.tsx`
- Create: `interface/frontend/src/lib/api.ts`
- Create: `interface/frontend/src/state/sessionStore.ts`
- Create: `interface/frontend/src/pages/*`:
  - `workspace`
  - `graph`
  - `parameters`
  - `entities`
  - `validation`
  - `diff`
  - `patch`
  - `results`
- Create: `interface/frontend/tests/*` — component + integration tests.

### Repository integration
- Modify: `README.md` — interface setup and run docs.
- Modify: `.github/workflows/ci.yml` — add interface backend/frontend gates.
- Create: `scripts/smoke_interface.py` — local API smoke.
- Create: `scripts/smoke_frontend.sh` — frontend build + smoke run.

---

### Task 1: Backend foundation and session model

**Files:**
- Create: `interface/backend/app.py`
- Create: `interface/backend/session_store.py`
- Create: `interface/backend/schemas.py`
- Test: `interface/backend/tests/test_session_api.py`

- [ ] **Step 1: Write the failing test**

```python
def test_open_and_save_session(client, sample_model_dir):
    opened = client.post("/session/open", json={"model_path": str(sample_model_dir)})
    assert opened.status_code == 200
    session_id = opened.json()["session_id"]
    saved = client.post("/session/save", json={"session_id": session_id})
    assert saved.status_code == 200
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 -m pytest interface/backend/tests/test_session_api.py::test_open_and_save_session -v`  
Expected: FAIL with route not found.

- [ ] **Step 3: Write minimal implementation**

```python
@app.post("/session/open")
def session_open(req: OpenSessionRequest) -> OpenSessionResponse:
    model = read_model(Path(req.model_path))
    return session_store.open(model, req.model_path)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python3 -m pytest interface/backend/tests/test_session_api.py::test_open_and_save_session -v`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add interface/backend/app.py interface/backend/session_store.py interface/backend/schemas.py interface/backend/tests/test_session_api.py
git commit -m "feat(interface): add backend session foundation"
```

---

### Task 2: Model graph and entity CRUD endpoints

**Files:**
- Create: `interface/backend/services/entity_service.py`
- Modify: `interface/backend/app.py`
- Test: `interface/backend/tests/test_entity_api.py`

- [ ] **Step 1: Write failing CRUD tests**

```python
def test_create_update_delete_commodity(client, opened_session_id):
    create = client.post("/model/commodities", json={"session_id": opened_session_id, "name": "H2", "type": "NRG"})
    assert create.status_code == 200
    update = client.patch("/model/commodities/H2", json={"session_id": opened_session_id, "unit": "PJ"})
    assert update.status_code == 200
    delete = client.delete("/model/commodities/H2", json={"session_id": opened_session_id})
    assert delete.status_code == 200
```

- [ ] **Step 2: Run test to verify failure**

Run: `python3 -m pytest interface/backend/tests/test_entity_api.py::test_create_update_delete_commodity -v`  
Expected: FAIL (missing endpoint).

- [ ] **Step 3: Implement entity service + routes**

```python
def create_commodity(model: Model, req: CreateCommodityRequest) -> ChangeResponse:
    model.add_commodity(Commodity(name=req.name, ctype=CommodityType(req.type), unit=req.unit or ""))
    return ChangeResponse(changed=True, changed_count=1, touched_entities=[req.name], dirty=True)
```

- [ ] **Step 4: Re-run entity tests**

Run: `python3 -m pytest interface/backend/tests/test_entity_api.py -v`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add interface/backend/services/entity_service.py interface/backend/app.py interface/backend/tests/test_entity_api.py
git commit -m "feat(interface): add entity CRUD endpoints"
```

---

### Task 3: Parameter table API and scenario patch preview/apply

**Files:**
- Create: `interface/backend/services/parameter_service.py`
- Modify: `interface/backend/app.py`
- Test: `interface/backend/tests/test_parameter_api.py`

- [ ] **Step 1: Write failing parameter tests**

```python
def test_patch_preview_and_apply(client, opened_session_id):
    preview = client.post("/model/patch/preview", json={"session_id": opened_session_id, "rows": [{"parameter":"NCAP_COST","indexes":{"r":"R1","datayear":2030,"p":"WIND","cur":"MEUR"},"value":900}]})
    assert preview.status_code == 200
    assert preview.json()["changed_count"] >= 1
    apply = client.post("/model/patch/apply", json={"session_id": opened_session_id, "rows": preview.json()["rows"]})
    assert apply.status_code == 200
```

- [ ] **Step 2: Run test and verify failure**

Run: `python3 -m pytest interface/backend/tests/test_parameter_api.py::test_patch_preview_and_apply -v`  
Expected: FAIL

- [ ] **Step 3: Implement minimal parameter and patch handlers**

```python
def preview_patch(model: Model, rows: list[PatchRow]) -> PatchPreviewResponse:
    # compute diff against current parameter values without mutating model
    ...
```

- [ ] **Step 4: Re-run parameter tests**

Run: `python3 -m pytest interface/backend/tests/test_parameter_api.py -v`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add interface/backend/services/parameter_service.py interface/backend/app.py interface/backend/tests/test_parameter_api.py
git commit -m "feat(interface): add parameter and patch APIs"
```

---

### Task 4: Validation, DD roundtrip, and diff endpoints

**Files:**
- Create: `interface/backend/services/validation_service.py`
- Create: `interface/backend/services/dd_service.py`
- Create: `interface/backend/services/diff_service.py`
- Modify: `interface/backend/app.py`
- Test: `interface/backend/tests/test_validation_dd_diff_api.py`

- [ ] **Step 1: Write failing integration-style endpoint tests**

```python
def test_validate_export_diff(client, opened_session_id, other_model_dir, tmp_path):
    val = client.post("/model/validate", json={"session_id": opened_session_id})
    assert val.status_code == 200
    exp = client.post("/dd/export", json={"session_id": opened_session_id, "output_path": str(tmp_path / "dd")})
    assert exp.status_code == 200
    d = client.post("/model/diff", json={"left_model_path": str(other_model_dir), "right_model_path": str(other_model_dir)})
    assert d.status_code == 200
```

- [ ] **Step 2: Run test and verify failure**

Run: `python3 -m pytest interface/backend/tests/test_validation_dd_diff_api.py::test_validate_export_diff -v`  
Expected: FAIL

- [ ] **Step 3: Implement service wrappers around existing domain functions**

```python
def validate_model(model: Model) -> ValidationResponse:
    msgs = validate_all(model)
    return shape_validation_response(msgs)
```

- [ ] **Step 4: Re-run endpoint suite**

Run: `python3 -m pytest interface/backend/tests/test_validation_dd_diff_api.py -v`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add interface/backend/services/validation_service.py interface/backend/services/dd_service.py interface/backend/services/diff_service.py interface/backend/app.py interface/backend/tests/test_validation_dd_diff_api.py
git commit -m "feat(interface): add validation dd and diff endpoints"
```

---

### Task 5: Results read-only endpoint (minimal v1)

**Files:**
- Create: `interface/backend/services/results_service.py`
- Modify: `interface/backend/app.py`
- Test: `interface/backend/tests/test_results_api.py`

- [ ] **Step 1: Write failing results tests**

```python
def test_open_results_metadata(client, sample_results_file):
    r = client.post("/results/open", json={"results_path": str(sample_results_file)})
    assert r.status_code == 200
    assert "tables" in r.json()
```

- [ ] **Step 2: Run and verify failure**

Run: `python3 -m pytest interface/backend/tests/test_results_api.py::test_open_results_metadata -v`  
Expected: FAIL

- [ ] **Step 3: Implement minimal adapter**

```python
def open_results(path: Path) -> ResultsMetadataResponse:
    # v1: list available tables/columns from supported file format
    ...
```

- [ ] **Step 4: Re-run results tests**

Run: `python3 -m pytest interface/backend/tests/test_results_api.py -v`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add interface/backend/services/results_service.py interface/backend/app.py interface/backend/tests/test_results_api.py
git commit -m "feat(interface): add minimal read-only results endpoint"
```

---

### Task 6: Frontend shell, API client, and workspace screens

**Files:**
- Create: `interface/frontend/*` scaffold (Vite + TS)
- Create: `interface/frontend/src/lib/api.ts`
- Create: `interface/frontend/src/state/sessionStore.ts`
- Create: `interface/frontend/src/pages/workspace/*`
- Test: `interface/frontend/tests/workspace.spec.ts`

- [ ] **Step 1: Create failing frontend test**

```ts
test("opens model path and shows summary", async ({ page }) => {
  await page.goto("/");
  await page.fill("[data-testid=model-path]", "/tmp/my-model");
  await page.click("[data-testid=open-model]");
  await expect(page.getByText("Model:")).toBeVisible();
});
```

- [ ] **Step 2: Run frontend test to verify failure**

Run: `cd interface/frontend && npm test -- workspace.spec.ts`  
Expected: FAIL (no app/routes yet).

- [ ] **Step 3: Implement app shell + workspace open/save**

```ts
const openModel = async () => {
  const res = await api.openSession(modelPath);
  sessionStore.setSession(res.session_id, res.summary);
};
```

- [ ] **Step 4: Re-run workspace test**

Run: `cd interface/frontend && npm test -- workspace.spec.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add interface/frontend
git commit -m "feat(interface): add frontend shell and workspace flow"
```

---

### Task 7: Frontend feature pages (graph, parameters, entities, validation)

**Files:**
- Create: `interface/frontend/src/pages/graph/*`
- Create: `interface/frontend/src/pages/parameters/*`
- Create: `interface/frontend/src/pages/entities/*`
- Create: `interface/frontend/src/pages/validation/*`
- Test: `interface/frontend/tests/crud-validation.spec.ts`

- [ ] **Step 1: Write failing end-user flow test**

```ts
test("adds commodity and sees validation update", async ({ page }) => {
  await page.goto("/");
  // open workspace, add commodity, run validate
  await expect(page.getByText("0 error(s)")).toBeVisible();
});
```

- [ ] **Step 2: Run test and verify failure**

Run: `cd interface/frontend && npm test -- crud-validation.spec.ts`  
Expected: FAIL

- [ ] **Step 3: Implement pages + interactions**

```ts
await api.createCommodity({ session_id, name, type, unit });
await refreshValidation();
```

- [ ] **Step 4: Re-run tests**

Run: `cd interface/frontend && npm test -- crud-validation.spec.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add interface/frontend/src/pages interface/frontend/tests/crud-validation.spec.ts
git commit -m "feat(interface): add graph parameter entity and validation pages"
```

---

### Task 8: Frontend diff, scenario patch, and results view

**Files:**
- Create: `interface/frontend/src/pages/diff/*`
- Create: `interface/frontend/src/pages/patch/*`
- Create: `interface/frontend/src/pages/results/*`
- Test: `interface/frontend/tests/diff-patch-results.spec.ts`

- [ ] **Step 1: Write failing tests**

```ts
test("shows model diff and applies patch preview", async ({ page }) => {
  await page.goto("/");
  // run diff, preview patch, apply patch, verify changed row
  await expect(page.getByText("Parameters:")).toBeVisible();
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `cd interface/frontend && npm test -- diff-patch-results.spec.ts`  
Expected: FAIL

- [ ] **Step 3: Implement pages**

```ts
const preview = await api.previewPatch({ session_id, rows });
setPreview(preview);
```

- [ ] **Step 4: Re-run tests**

Run: `cd interface/frontend && npm test -- diff-patch-results.spec.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add interface/frontend/src/pages/diff interface/frontend/src/pages/patch interface/frontend/src/pages/results interface/frontend/tests/diff-patch-results.spec.ts
git commit -m "feat(interface): add diff patch and results pages"
```

---

### Task 9: Repository integration, CI gates, and release docs

**Files:**
- Modify: `.github/workflows/ci.yml`
- Create: `scripts/smoke_interface.py`
- Create: `scripts/smoke_frontend.sh`
- Modify: `README.md`
- Modify: `docs/specs/release-checklist.md`

- [ ] **Step 1: Add failing CI check script tests (local)**

```bash
python3 scripts/smoke_interface.py
./scripts/smoke_frontend.sh
```

Expected: FAIL before scripts exist.

- [ ] **Step 2: Implement smoke scripts and CI jobs**

```bash
python3 -m pytest interface/backend/tests -v
cd interface/frontend && npm ci && npm run test && npm run build
```

- [ ] **Step 3: Update README with local run instructions**

```bash
# terminal 1
python3 interface/backend/app.py
# terminal 2
cd interface/frontend && npm run dev
```

- [ ] **Step 4: Run full verification**

Run:

```bash
python3 -m ruff check . --select E9,F63,F7,F82
python3 -m pytest tests/ -v
python3 -m pytest interface/backend/tests -v
python3 scripts/smoke_release.py
python3 scripts/smoke_interface.py
./scripts/smoke_frontend.sh
```

Expected: all pass (or documented skips only).

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/ci.yml scripts/smoke_interface.py scripts/smoke_frontend.sh README.md docs/specs/release-checklist.md
git commit -m "chore(interface): add CI gates smoke checks and interface docs"
```

---

## Plan Self-Review

### Spec coverage

- Local-first architecture: covered in Tasks 1, 6, 9.
- CRUD + parameter editing: covered in Tasks 2, 3, 7.
- Validation, DD roundtrip, diff: covered in Tasks 4, 8.
- Scenario patching: covered in Tasks 3, 8.
- Results read-only view: covered in Tasks 5, 8.
- Heavily verifiable workflow: explicit checks in every task + Task 9 full gate.

### Placeholder scan

- No TBD/TODO placeholders.
- Each task includes concrete files, commands, and pass/fail expectations.

### Consistency check

- Backend API surface in design maps to task files and tests.
- Frontend page modules map directly to required feature list.
- Quality gates align with existing repository release process.

---

## Execution Order and Stop Conditions

Follow tasks in order. Do not proceed if:
- task-level tests are failing, or
- smoke checks regress existing CLI behavior, or
- API responses lose deterministic change metadata.

A task is complete only when:
- its tests pass,
- no existing quality gate regresses,
- and the task commit is created.
