from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field


class ChangeMeta(BaseModel):
    changed: bool
    changed_count: int = 0
    touched_entities: list[str] = Field(default_factory=list)
    dirty: bool = False


class OpenSessionRequest(BaseModel):
    model_path: str


class OpenSessionResponse(ChangeMeta):
    session_id: str
    model_path: str
    summary: dict[str, Any]


class SaveSessionRequest(BaseModel):
    session_id: str
    model_path: str | None = None


class CloseSessionRequest(BaseModel):
    session_id: str


class SessionStateResponse(ChangeMeta):
    session_id: str
    model_path: str | None = None


class CommodityPayload(BaseModel):
    session_id: str
    name: str
    type: str
    description: str = ""
    unit: str = ""
    timeslice_level: str = "ANNUAL"
    balance_type: str = ""


class CommodityUpdatePayload(BaseModel):
    session_id: str
    type: str | None = None
    description: str | None = None
    unit: str | None = None
    timeslice_level: str | None = None
    balance_type: str | None = None


class CommodityDeletePayload(BaseModel):
    session_id: str


class CommodityView(BaseModel):
    name: str
    type: str
    description: str
    unit: str
    timeslice_level: str
    balance_type: str


class CommoditiesResponse(BaseModel):
    session_id: str
    items: list[CommodityView]


class FlowSpecPayload(BaseModel):
    commodity: str
    group: str = ""
    efficiency: float | None = None
    emission_factor: float | None = None
    share: float | None = None


class ProcessPayload(BaseModel):
    session_id: str
    name: str
    description: str = ""
    process_type: str = "STD"
    inputs: list[FlowSpecPayload] = Field(default_factory=list)
    outputs: list[FlowSpecPayload] = Field(default_factory=list)
    regions: list[str] = Field(default_factory=list)
    primary_group: str = ""


class ProcessUpdatePayload(BaseModel):
    session_id: str
    description: str | None = None
    process_type: str | None = None
    inputs: list[FlowSpecPayload] | None = None
    outputs: list[FlowSpecPayload] | None = None
    regions: list[str] | None = None
    primary_group: str | None = None


class ProcessDeletePayload(BaseModel):
    session_id: str


class ProcessView(BaseModel):
    name: str
    description: str
    process_type: str
    inputs: list[FlowSpecPayload]
    outputs: list[FlowSpecPayload]
    regions: list[str]
    primary_group: str


class ProcessesResponse(BaseModel):
    session_id: str
    items: list[ProcessView]


class ParameterPayload(BaseModel):
    session_id: str
    parameter: str
    indexes: dict[str, Any] = Field(default_factory=dict)
    value: float


class ParameterDeletePayload(BaseModel):
    session_id: str
    parameter: str
    indexes: dict[str, Any] = Field(default_factory=dict)


class ParameterView(BaseModel):
    parameter: str
    indexes: dict[str, Any]
    value: float


class ParametersResponse(BaseModel):
    session_id: str
    items: list[ParameterView]


class PatchRow(BaseModel):
    parameter: str
    indexes: dict[str, Any] = Field(default_factory=dict)
    value: float


class PatchPreviewRow(PatchRow):
    old_value: float | None = None
    changed: bool = False


class PatchRequest(BaseModel):
    session_id: str
    rows: list[PatchRow]


class PatchPreviewResponse(ChangeMeta):
    session_id: str
    rows: list[PatchPreviewRow]


class PatchApplyResponse(ChangeMeta):
    session_id: str
    rows: list[PatchPreviewRow]


class ValidateRequest(BaseModel):
    session_id: str


class ValidationMessageView(BaseModel):
    level: str
    category: str
    message: str
    entity: str = ""
    hint: str = ""


class ValidationResponse(BaseModel):
    session_id: str
    errors: list[ValidationMessageView]
    warnings: list[ValidationMessageView]
    counts: dict[str, int]


class DDImportRequest(BaseModel):
    dd_paths: list[str]
    model_path: str | None = None


class DDImportResponse(ChangeMeta):
    session_id: str
    imported_files: list[str]
    summary: dict[str, Any]
    model_path: str | None = None


class DDExportRequest(BaseModel):
    session_id: str
    output_path: str


class DDExportResponse(BaseModel):
    session_id: str
    output_path: str
    files: list[str]


class DiffRequest(BaseModel):
    left_model_path: str | None = None
    right_model_path: str | None = None
    left_session_id: str | None = None
    right_session_id: str | None = None


class DiffEntityChange(BaseModel):
    name: str
    fields: dict[str, tuple[Any, Any]]


class DiffParameterChange(BaseModel):
    parameter: str
    indexes: dict[str, Any]
    old_value: float | None
    new_value: float | None


class DiffResponse(BaseModel):
    has_changes: bool
    added_commodities: list[str]
    removed_commodities: list[str]
    changed_commodities: list[DiffEntityChange]
    added_processes: list[str]
    removed_processes: list[str]
    changed_processes: list[DiffEntityChange]
    added_parameters: list[DiffParameterChange]
    removed_parameters: list[DiffParameterChange]
    changed_parameters: list[DiffParameterChange]


class ResultsOpenRequest(BaseModel):
    results_path: str


class ResultsTableMetadata(BaseModel):
    name: str
    path: str
    format: str
    columns: list[str]
    row_count: int


class ResultsOpenResponse(BaseModel):
    results_path: str
    tables: list[ResultsTableMetadata]


class WikiCategoriesResponse(BaseModel):
    categories: dict[str, int]


class WikiEntryResponse(BaseModel):
    slug: str
    type: str
    title: str
    body_markdown: str
    frontmatter: dict[str, Any] = Field(default_factory=dict)


class WikiSearchRequest(BaseModel):
    query: str
    limit: int = 10
    types: list[str] | None = None


class WikiSearchHit(BaseModel):
    slug: str
    type: str
    title: str
    snippet: str
    score: float


class WikiSearchResponse(BaseModel):
    hits: list[WikiSearchHit]


class WikiListRequest(BaseModel):
    types: list[str] = Field(default_factory=list)
    limit: int | None = None
    offset: int | None = None
    query: str | None = None


class WikiListItem(BaseModel):
    slug: str
    type: str
    title: str
    indexes: list[str] | None = None
    category: str | None = None
    default_ie: str | None = None
    description: str | None = None


class WikiListResponse(BaseModel):
    hits: list[WikiListItem]
    total: int


class FAQLink(BaseModel):
    slug: str
    title: str


class GroupedValidationRequest(BaseModel):
    session_id: str


class GroupedValidationSampleMessage(BaseModel):
    message: str
    entity: str = ""
    hint: str = ""


class GroupedValidationGroup(BaseModel):
    category: str
    level: str
    message_count: int
    sample_messages: list[GroupedValidationSampleMessage]
    faq_links: list[FAQLink] = Field(default_factory=list)


class GroupedValidationResponse(BaseModel):
    session_id: str
    counts: dict[str, int]
    groups: list[GroupedValidationGroup]


class DiagnoseLstRequest(BaseModel):
    text: str | None = None
    path: str | None = None


class InfeasibleEquation(BaseModel):
    raw: str
    equation: str
    args: list[str]
    hint: str


class LstError(BaseModel):
    raw: str
    code: str
    hint: str


class InfeasibilityReportModel(BaseModel):
    status: str
    objective: float | None = None
    infeasible_equations: list[InfeasibleEquation] = Field(default_factory=list)
    errors: list[LstError] = Field(default_factory=list)
    faq_links: list[FAQLink] = Field(default_factory=list)
