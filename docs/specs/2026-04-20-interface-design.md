# times-data Interface Design (Local-first, Hosted-later)

## Goal

Deliver a trustworthy interface for TIMES modelers to create, modify, delete, inspect, validate, diff, and round-trip models through `times-data`, with a local-first runtime and no solve orchestration in v1.

## Product Principles

- **No silent behavior**: every mutation is explicit and auditable.
- **One source of truth**: backend wraps existing `times_data` logic; no duplicate domain logic in UI.
- **Deterministic operations**: import/export/diff/validation must be reproducible.
- **Actionable diagnostics**: modeler-facing errors with clear fix guidance.
- **Local-first usability**: runs without accounts or cloud dependencies.

## Scope

### In v1

- Model workspace open/save on local filesystem
- RES graph visualization (process/commodity network)
- Parameter table view + edit
- Commodity/process CRUD
- Validation panel (actionable)
- DD import/export workflow
- Model diff view (between two model folders)
- Scenario patch apply (parameter deltas, preview + apply)
- Read-only results viewer for existing result files (minimal table browser)

### Out of scope for v1

- GAMS solve orchestration and run management
- Multi-user real-time collaboration
- Auth/accounts/permissions
- Hosted production deployment

## Architecture

## High-level

- **Frontend**: React SPA
- **Backend**: FastAPI service
- **Domain**: existing `times_data` modules for I/O, validation, compiler, diff
- **Storage**: local model directories (YAML model workspace + DD outputs)

Frontend talks only to backend APIs. Backend owns model loading/saving and returns structured DTOs for UI.

## Backend module boundaries

- `interface/backend/app.py`
  - app bootstrap, routes registration, health endpoint
- `interface/backend/session_store.py`
  - in-memory session map:
    - `session_id`
    - loaded `Model`
    - workspace path
    - dirty flag
- `interface/backend/services/model_service.py`
  - open/save/reset model workspace
- `interface/backend/services/entity_service.py`
  - commodity/process CRUD + flow updates
- `interface/backend/services/parameter_service.py`
  - query/filter parameter rows; upsert/delete; patch preview/apply
- `interface/backend/services/validation_service.py`
  - call `validate_all`, shape category-level output
- `interface/backend/services/dd_service.py`
  - import-dd/export-dd wrappers; artifact metadata
- `interface/backend/services/diff_service.py`
  - call `compare_models`, structured + text summary payload
- `interface/backend/services/results_service.py`
  - v1 read-only results file/table listing adapter

## Frontend module boundaries

- `interface/frontend/src/app/*`
  - app shell, route setup, layout
- `interface/frontend/src/state/sessionStore.ts`
  - session id, dirty state, selected model path
- `interface/frontend/src/lib/api.ts`
  - typed API client
- `interface/frontend/src/pages/workspace/*`
  - open/save/reset
- `interface/frontend/src/pages/graph/*`
  - RES graph panel
- `interface/frontend/src/pages/parameters/*`
  - parameter table browser/editor
- `interface/frontend/src/pages/entities/*`
  - commodity/process editor forms
- `interface/frontend/src/pages/validation/*`
  - validation output and fix hints
- `interface/frontend/src/pages/diff/*`
  - model comparison screen
- `interface/frontend/src/pages/patch/*`
  - patch preview/apply
- `interface/frontend/src/pages/results/*`
  - read-only results table explorer

## API Contract (v1)

All mutation endpoints return structured change metadata:

```json
{
  "changed": true,
  "changed_count": 3,
  "touched_entities": ["COAL_PP", "NCAP_COST"],
  "dirty": true
}
```

### Session + workspace

- `POST /session/open`
  - input: `{ "model_path": "..." }`
  - output: `{ "session_id": "...", "summary": {...}, "dirty": false }`
- `POST /session/save`
  - input: `{ "session_id": "..." }`
  - output: `{ "saved_path": "...", "dirty": false }`
- `POST /session/close`
  - input: `{ "session_id": "..." }`
  - output: `{ "closed": true }`

### Graph + entities

- `GET /model/graph?session_id=...`
- `GET /model/commodities?session_id=...`
- `POST /model/commodities`
- `PATCH /model/commodities/{name}`
- `DELETE /model/commodities/{name}`

- `GET /model/processes?session_id=...`
- `POST /model/processes`
- `PATCH /model/processes/{name}`
- `DELETE /model/processes/{name}`

### Parameters

- `GET /model/parameters?session_id=...&parameter=...&r=...`
- `POST /model/parameters` (add/upsert one row)
- `PATCH /model/parameters` (update one row)
- `DELETE /model/parameters`
- `POST /model/patch/preview`
- `POST /model/patch/apply`

### Validation + DD + diff + results

- `POST /model/validate`
- `POST /dd/import`
- `POST /dd/export`
- `POST /model/diff`
- `POST /results/open` (v1 read-only metadata + table listing)

## UX behavior contracts

- Unsaved-change indicator always visible once model is mutated.
- Save warns on validation errors unless user explicitly confirms forced save.
- Export is blocked on validation errors; warnings are shown, not blocking.
- Destructive actions (delete commodity/process, bulk parameter delete) require confirmation.
- Diff view can compare current workspace vs another model path.

## Data integrity contracts

- Model graph operations in UI must mirror Python API semantics.
- Parameter index keys are never silently dropped.
- Import/export operations surface generated file list and sizes.
- Patch apply supports preview mode first; apply requires explicit confirm.

## Error handling

- Backend returns structured errors:
  - `code`
  - `message`
  - `hint`
  - `field` (optional)
- UI renders inline actionable feedback and preserves user context (no full-page error resets).

## Verification strategy

### Must-pass for v1 release

1. Backend API tests:
   - CRUD, validation, patch preview/apply, diff, import/export
2. UI integration smoke:
   - open -> edit -> validate -> save -> export
3. Existing project quality gates:
   - `python3 -m ruff check . --select E9,F63,F7,F82`
   - `python3 -m pytest tests/ -v`
   - `python3 scripts/smoke_release.py`
4. Interface quality gates:
   - backend tests pass in CI
   - frontend build + tests pass in CI
   - local end-to-end smoke pass documented

## Adoption success criteria

- A modeler can run and use v1 locally in under 10 minutes from clone.
- Common edits (cost updates, process add/remove, validation fixes, DD export) are achievable without CLI.
- UI and CLI produce consistent model outcomes for equivalent operations.

## Risks and mitigations

- **Risk**: UI diverges from domain rules
  - **Mitigation**: keep domain logic in backend services only
- **Risk**: large model UI performance
  - **Mitigation**: server-side filtering/pagination for parameter table and graph subsets
- **Risk**: filesystem path differences across OS
  - **Mitigation**: path normalization utilities and OS-targeted smoke tests

## Roadmap after v1

- Solve orchestration panel (run config + logs)
- Hosted mode (auth + projects)
- Collaboration features (review comments, approvals)
