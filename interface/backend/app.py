from __future__ import annotations

from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from interface.backend.schemas import (
    ChangeMeta,
    CloseSessionRequest,
    CommoditiesResponse,
    CommodityDeletePayload,
    CommodityPayload,
    CommodityUpdatePayload,
    DDExportRequest,
    DDExportResponse,
    DDImportRequest,
    DDImportResponse,
    DiffRequest,
    DiffResponse,
    OpenSessionRequest,
    OpenSessionResponse,
    ParametersResponse,
    ParameterDeletePayload,
    ParameterPayload,
    PatchApplyResponse,
    PatchPreviewResponse,
    PatchRequest,
    ProcessDeletePayload,
    ProcessPayload,
    ProcessesResponse,
    ProcessUpdatePayload,
    ResultsOpenRequest,
    ResultsOpenResponse,
    SaveSessionRequest,
    SessionStateResponse,
    ValidateRequest,
    ValidationResponse,
    DiagnoseLstRequest,
    GroupedValidationRequest,
    GroupedValidationResponse,
    InfeasibilityReportModel,
    WikiCategoriesResponse,
    WikiEntryResponse,
    WikiListRequest,
    WikiListResponse,
    WikiSearchRequest,
    WikiSearchResponse,
)
from interface.backend.services import dd_service, diff_service, entity_service, parameter_service
from interface.backend.services.model_service import (
    get_model_graph,
    list_commodities,
    list_parameters,
    list_processes,
    open_session_from_model_path,
    save_session,
)
from interface.backend.services.results_service import open_results
from interface.backend.services.validation_service import grouped_validation, validate_model
from interface.backend.services import wiki_service
from interface.backend.session_store import SessionStore
from times_data.diagnose import parse_lst_text, parse_lst_file

app = FastAPI(title="times-data backend", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
session_store = SessionStore()


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


def _session_or_404(session_id: str):
    try:
        return session_store.get(session_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


def _apply_mutation(session_id: str, mutation_meta: dict[str, Any]) -> dict[str, Any]:
    record = _session_or_404(session_id)
    if mutation_meta.get("changed"):
        session_store.mark_dirty(session_id, True)
        record = _session_or_404(session_id)
    return {
        "changed": mutation_meta.get("changed", False),
        "changed_count": mutation_meta.get("changed_count", 0),
        "touched_entities": mutation_meta.get("touched_entities", []),
        "dirty": record.dirty,
    }


@app.post("/session/open", response_model=OpenSessionResponse)
def session_open(req: OpenSessionRequest) -> OpenSessionResponse:
    try:
        session_id, model_path, summary = open_session_from_model_path(session_store, req.model_path)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return OpenSessionResponse(
        changed=True,
        changed_count=1,
        touched_entities=[session_id],
        dirty=False,
        session_id=session_id,
        model_path=model_path,
        summary=summary,
    )


@app.post("/session/save", response_model=SessionStateResponse)
def session_save(req: SaveSessionRequest) -> SessionStateResponse:
    try:
        was_dirty, model_path = save_session(session_store, req.session_id, req.model_path)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return SessionStateResponse(
        changed=was_dirty,
        changed_count=1 if was_dirty else 0,
        touched_entities=[req.session_id] if was_dirty else [],
        dirty=False,
        session_id=req.session_id,
        model_path=model_path,
    )


@app.post("/session/close", response_model=SessionStateResponse)
def session_close(req: CloseSessionRequest) -> SessionStateResponse:
    changed = session_store.close(req.session_id)
    return SessionStateResponse(
        changed=changed,
        changed_count=1 if changed else 0,
        touched_entities=[req.session_id] if changed else [],
        dirty=False,
        session_id=req.session_id,
        model_path=None,
    )


@app.get("/model/graph")
def model_graph(session_id: str = Query(...)) -> dict[str, Any]:
    record = _session_or_404(session_id)
    return get_model_graph(record.model)


@app.get("/model/commodities", response_model=CommoditiesResponse)
def model_commodities(session_id: str = Query(...)) -> CommoditiesResponse:
    record = _session_or_404(session_id)
    return CommoditiesResponse(session_id=session_id, items=list_commodities(record.model))


@app.post("/model/commodities", response_model=ChangeMeta)
def create_commodity(req: CommodityPayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    try:
        mutation = entity_service.create_commodity(record.model, req.model_dump())
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.patch("/model/commodities/{commodity_name}", response_model=ChangeMeta)
def update_commodity(commodity_name: str, req: CommodityUpdatePayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    try:
        mutation = entity_service.update_commodity(record.model, commodity_name, req.model_dump())
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    if not mutation.get("exists"):
        raise HTTPException(status_code=404, detail=f"Commodity '{commodity_name}' not found.")
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.delete("/model/commodities/{commodity_name}", response_model=ChangeMeta)
def delete_commodity(commodity_name: str, req: CommodityDeletePayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    mutation = entity_service.delete_commodity(record.model, commodity_name)
    if not mutation["changed"]:
        raise HTTPException(status_code=404, detail=f"Commodity '{commodity_name}' not found.")
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.get("/model/processes", response_model=ProcessesResponse)
def model_processes(session_id: str = Query(...)) -> ProcessesResponse:
    record = _session_or_404(session_id)
    return ProcessesResponse(session_id=session_id, items=list_processes(record.model))


@app.post("/model/processes", response_model=ChangeMeta)
def create_process(req: ProcessPayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    try:
        mutation = entity_service.create_process(record.model, req.model_dump())
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.patch("/model/processes/{process_name}", response_model=ChangeMeta)
def update_process(process_name: str, req: ProcessUpdatePayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    try:
        mutation = entity_service.update_process(record.model, process_name, req.model_dump())
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    if not mutation.get("exists"):
        raise HTTPException(status_code=404, detail=f"Process '{process_name}' not found.")
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.delete("/model/processes/{process_name}", response_model=ChangeMeta)
def delete_process(process_name: str, req: ProcessDeletePayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    mutation = entity_service.delete_process(record.model, process_name)
    if not mutation["changed"]:
        raise HTTPException(status_code=404, detail=f"Process '{process_name}' not found.")
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.get("/model/parameters", response_model=ParametersResponse)
def model_parameters(
    session_id: str = Query(...),
    parameter: str | None = Query(default=None),
) -> ParametersResponse:
    record = _session_or_404(session_id)
    return ParametersResponse(session_id=session_id, items=list_parameters(record.model, parameter))


@app.post("/model/parameters", response_model=ChangeMeta)
def create_parameter(req: ParameterPayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    mutation = parameter_service.upsert_parameter(record.model, req.model_dump())
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.patch("/model/parameters", response_model=ChangeMeta)
def update_parameter(req: ParameterPayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    mutation = parameter_service.patch_parameter(record.model, req.model_dump())
    if not mutation.get("exists"):
        raise HTTPException(status_code=404, detail="Parameter row not found.")
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.delete("/model/parameters", response_model=ChangeMeta)
def delete_parameter(req: ParameterDeletePayload) -> ChangeMeta:
    record = _session_or_404(req.session_id)
    mutation = parameter_service.delete_parameter(record.model, req.model_dump())
    if not mutation["changed"]:
        raise HTTPException(status_code=404, detail="No matching parameter rows found.")
    return ChangeMeta(**_apply_mutation(req.session_id, mutation))


@app.post("/model/patch/preview", response_model=PatchPreviewResponse)
def model_patch_preview(req: PatchRequest) -> PatchPreviewResponse:
    record = _session_or_404(req.session_id)
    preview = parameter_service.preview_patch(
        record.model,
        [row.model_dump() for row in req.rows],
    )
    return PatchPreviewResponse(
        session_id=req.session_id,
        changed=preview["changed"],
        changed_count=preview["changed_count"],
        touched_entities=preview["touched_entities"],
        dirty=record.dirty,
        rows=preview["rows"],
    )


@app.post("/model/patch/apply", response_model=PatchApplyResponse)
def model_patch_apply(req: PatchRequest) -> PatchApplyResponse:
    record = _session_or_404(req.session_id)
    applied = parameter_service.apply_patch(
        record.model,
        [row.model_dump() for row in req.rows],
    )
    mutation = _apply_mutation(req.session_id, applied)
    return PatchApplyResponse(
        session_id=req.session_id,
        changed=mutation["changed"],
        changed_count=mutation["changed_count"],
        touched_entities=mutation["touched_entities"],
        dirty=mutation["dirty"],
        rows=applied["rows"],
    )


@app.post("/model/validate", response_model=ValidationResponse)
def model_validate(req: ValidateRequest) -> ValidationResponse:
    record = _session_or_404(req.session_id)
    data = validate_model(record.model)
    return ValidationResponse(session_id=req.session_id, **data)


@app.post("/dd/import", response_model=DDImportResponse)
def dd_import(req: DDImportRequest) -> DDImportResponse:
    try:
        model, imported_files = dd_service.import_model_from_dd(req.dd_paths)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    model_path = Path(req.model_path) if req.model_path else None
    record = session_store.open(model, model_path=model_path)
    return DDImportResponse(
        changed=True,
        changed_count=1,
        touched_entities=[record.session_id],
        dirty=False,
        session_id=record.session_id,
        imported_files=imported_files,
        summary=model.summary(),
        model_path=str(model_path) if model_path else None,
    )


@app.post("/dd/export", response_model=DDExportResponse)
def dd_export(req: DDExportRequest) -> DDExportResponse:
    record = _session_or_404(req.session_id)
    try:
        exported = dd_service.export_model_to_dd(record.model, req.output_path)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return DDExportResponse(session_id=req.session_id, **exported)


@app.post("/model/diff", response_model=DiffResponse)
def model_diff(req: DiffRequest) -> DiffResponse:
    try:
        payload = diff_service.diff_models(req.model_dump(), session_store)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return DiffResponse(**payload)


@app.post("/results/open", response_model=ResultsOpenResponse)
def results_open(req: ResultsOpenRequest) -> ResultsOpenResponse:
    try:
        payload = open_results(req.results_path)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return ResultsOpenResponse(**payload)


@app.get("/wiki/categories", response_model=WikiCategoriesResponse)
def wiki_categories() -> WikiCategoriesResponse:
    return WikiCategoriesResponse(**wiki_service.categories_payload())


@app.get("/wiki/entry/{slug}", response_model=WikiEntryResponse)
def wiki_entry(slug: str) -> WikiEntryResponse:
    payload = wiki_service.entry_payload(slug)
    if payload is None:
        raise HTTPException(status_code=404, detail=f"Wiki entry '{slug}' not found.")
    return WikiEntryResponse(**payload)


@app.get("/wiki/parameter/{name}", response_model=WikiEntryResponse)
def wiki_parameter(name: str) -> WikiEntryResponse:
    payload = wiki_service.parameter_payload(name)
    if payload is None:
        raise HTTPException(status_code=404, detail=f"Parameter '{name}' not found in wiki.")
    return WikiEntryResponse(**payload)


@app.get("/wiki/concept/{slug}", response_model=WikiEntryResponse)
def wiki_concept(slug: str) -> WikiEntryResponse:
    payload = wiki_service.concept_payload(slug)
    if payload is None:
        raise HTTPException(status_code=404, detail=f"Concept '{slug}' not found in wiki.")
    return WikiEntryResponse(**payload)


@app.get("/wiki/faq/{slug}", response_model=WikiEntryResponse)
def wiki_faq(slug: str) -> WikiEntryResponse:
    payload = wiki_service.faq_payload(slug)
    if payload is None:
        raise HTTPException(status_code=404, detail=f"FAQ '{slug}' not found in wiki.")
    return WikiEntryResponse(**payload)


@app.post("/wiki/search", response_model=WikiSearchResponse)
def wiki_search(req: WikiSearchRequest) -> WikiSearchResponse:
    payload = wiki_service.search_payload(
        query=req.query,
        limit=req.limit,
        types=req.types,
    )
    return WikiSearchResponse(**payload)


@app.post("/wiki/list", response_model=WikiListResponse)
def wiki_list(req: WikiListRequest) -> WikiListResponse:
    payload = wiki_service.list_payload(
        types=req.types or None,
        limit=req.limit,
        offset=req.offset,
        query=req.query,
    )
    return WikiListResponse(**payload)


@app.post("/validation/grouped", response_model=GroupedValidationResponse)
def validation_grouped(req: GroupedValidationRequest) -> GroupedValidationResponse:
    record = _session_or_404(req.session_id)
    payload = grouped_validation(record.model)
    return GroupedValidationResponse(session_id=req.session_id, **payload)


@app.post("/diagnose/lst", response_model=InfeasibilityReportModel)
def diagnose_lst(req: DiagnoseLstRequest) -> InfeasibilityReportModel:
    if not req.text and not req.path:
        raise HTTPException(status_code=400, detail="Provide either 'text' or 'path'.")
    if req.path:
        path = Path(req.path)
        if not path.exists() or not path.is_file():
            raise HTTPException(status_code=404, detail=f"LST file not found: {req.path}")
        try:
            report = parse_lst_file(path)
        except Exception as exc:  # noqa: BLE001
            raise HTTPException(status_code=400, detail=str(exc)) from exc
    else:
        report = parse_lst_text(req.text or "")
    return InfeasibilityReportModel(**report.to_dict())


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("interface.backend.app:app", host="127.0.0.1", port=8000, reload=False)
