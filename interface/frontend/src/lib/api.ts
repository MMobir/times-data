export type ChangeMeta = {
  changed: boolean;
  changed_count: number;
  touched_entities: string[];
  dirty: boolean;
};

export type OpenSessionResponse = ChangeMeta & {
  session_id: string;
  model_path: string;
  summary: Record<string, unknown>;
};

export type SessionStateResponse = ChangeMeta & {
  session_id: string;
  model_path: string | null;
};

export type Commodity = {
  name: string;
  type: string;
  description: string;
  unit: string;
  timeslice_level: string;
  balance_type: string;
};

export type ProcessFlow = {
  commodity: string;
  group: string;
  efficiency: number | null;
  emission_factor: number | null;
  share: number | null;
};

export type Process = {
  name: string;
  description: string;
  process_type: string;
  inputs: ProcessFlow[];
  outputs: ProcessFlow[];
  regions: string[];
  primary_group: string;
};

export type ParameterRow = {
  parameter: string;
  indexes: Record<string, unknown>;
  value: number;
};

export type PatchPreviewRow = ParameterRow & {
  old_value: number | null;
  changed: boolean;
};

export type ValidationMessage = {
  level: string;
  category: string;
  message: string;
  entity: string;
  hint: string;
};

export type ValidationResponse = {
  session_id: string;
  errors: ValidationMessage[];
  warnings: ValidationMessage[];
  counts: Record<string, number>;
};

export type DDImportResponse = ChangeMeta & {
  session_id: string;
  imported_files: string[];
  summary: Record<string, unknown>;
  model_path: string | null;
};

export type DDExportResponse = {
  session_id: string;
  output_path: string;
  files: string[];
};

export type DiffEntityChange = {
  name: string;
  fields: Record<string, [unknown, unknown]>;
};

export type DiffParameterChange = {
  parameter: string;
  indexes: Record<string, unknown>;
  old_value: number | null;
  new_value: number | null;
};

export type DiffResponse = {
  has_changes: boolean;
  added_commodities: string[];
  removed_commodities: string[];
  changed_commodities: DiffEntityChange[];
  added_processes: string[];
  removed_processes: string[];
  changed_processes: DiffEntityChange[];
  added_parameters: DiffParameterChange[];
  removed_parameters: DiffParameterChange[];
  changed_parameters: DiffParameterChange[];
};

export type ResultsTableMetadata = {
  name: string;
  path: string;
  format: string;
  columns: string[];
  row_count: number;
};

export type ResultsOpenResponse = {
  results_path: string;
  tables: ResultsTableMetadata[];
};

export type ModelGraphResponse = {
  summary: Record<string, unknown>;
  config: Record<string, unknown>;
  nodes: {
    commodities: Commodity[];
    processes: Process[];
  };
  edges: Array<{ from: string; to: string; direction: string }>;
};

export type WikiCategoriesResponse = {
  categories: Record<string, number>;
};

export type WikiEntry = {
  slug: string;
  type: string;
  title: string;
  body_markdown: string;
  frontmatter: Record<string, unknown>;
};

export type WikiHit = {
  slug: string;
  type: string;
  title: string;
  snippet: string;
  score: number;
};

export type WikiSearchResponse = {
  hits: WikiHit[];
};

export type WikiListItem = {
  slug: string;
  type: string;
  title: string;
  indexes: string[] | null;
  category: string | null;
  default_ie: string | null;
  description: string | null;
};

export type WikiListResponse = {
  hits: WikiListItem[];
  total: number;
};

export type FaqLink = {
  slug: string;
  title: string;
};

export type GroupedValidationSampleMessage = {
  message: string;
  entity: string;
  hint: string;
  level?: string;
  category?: string;
};

export type GroupedValidationGroup = {
  category: string;
  level: string;
  message_count: number;
  sample_messages: GroupedValidationSampleMessage[];
  faq_links: FaqLink[];
};

export type GroupedValidationResponse = {
  session_id: string;
  counts: Record<string, number>;
  groups: GroupedValidationGroup[];
};

export type InfeasibleEquation = {
  raw: string;
  equation: string;
  args: string[];
  hint: string;
};

export type LstError = {
  raw: string;
  code: string;
  hint: string;
};

export type InfeasibilityReport = {
  status: "OPTIMAL" | "INFEASIBLE" | "ERROR" | "UNKNOWN" | string;
  objective: number | null;
  infeasible_equations: InfeasibleEquation[];
  errors: LstError[];
  faq_links: FaqLink[];
};

export type ApiClientContract = {
  openSession(modelPath: string): Promise<OpenSessionResponse>;
  saveSession(sessionId: string, modelPath?: string): Promise<SessionStateResponse>;
  closeSession(sessionId: string): Promise<SessionStateResponse>;
  getGraph(sessionId: string): Promise<ModelGraphResponse>;
  listCommodities(sessionId: string): Promise<{ session_id: string; items: Commodity[] }>;
  createCommodity(payload: {
    sessionId: string;
    name: string;
    type: string;
    description?: string;
    unit?: string;
    timesliceLevel?: string;
    balanceType?: string;
  }): Promise<ChangeMeta>;
  deleteCommodity(sessionId: string, commodityName: string): Promise<ChangeMeta>;
  updateCommodity(payload: {
    sessionId: string;
    name: string;
    type?: string;
    description?: string;
    unit?: string;
    timesliceLevel?: string;
    balanceType?: string;
  }): Promise<ChangeMeta>;
  listProcesses(sessionId: string): Promise<{ session_id: string; items: Process[] }>;
  createProcess(payload: {
    sessionId: string;
    name: string;
    description?: string;
    processType?: string;
    inputCommodity?: string;
    outputCommodity?: string;
  }): Promise<ChangeMeta>;
  deleteProcess(sessionId: string, processName: string): Promise<ChangeMeta>;
  updateProcess(payload: {
    sessionId: string;
    name: string;
    description?: string;
    processType?: string;
    inputs?: Array<{ commodity: string; group?: string }>;
    outputs?: Array<{ commodity: string; group?: string }>;
  }): Promise<ChangeMeta>;
  listParameters(sessionId: string, parameter?: string): Promise<{ session_id: string; items: ParameterRow[] }>;
  upsertParameter(payload: { sessionId: string; parameter: string; indexes: Record<string, unknown>; value: number }): Promise<ChangeMeta>;
  previewPatch(sessionId: string, row: ParameterRow): Promise<{ session_id: string; rows: PatchPreviewRow[] } & ChangeMeta>;
  applyPatch(sessionId: string, row: ParameterRow): Promise<{ session_id: string; rows: PatchPreviewRow[] } & ChangeMeta>;
  validate(sessionId: string): Promise<ValidationResponse>;
  importDd(ddPaths: string[], modelPath?: string): Promise<DDImportResponse>;
  exportDd(sessionId: string, outputPath: string): Promise<DDExportResponse>;
  diff(leftModelPath: string, rightModelPath: string): Promise<DiffResponse>;
  openResults(resultsPath: string): Promise<ResultsOpenResponse>;
  getWikiCategories(): Promise<WikiCategoriesResponse>;
  getWikiEntry(slug: string): Promise<WikiEntry>;
  getWikiParameter(name: string): Promise<WikiEntry>;
  getWikiConcept(slug: string): Promise<WikiEntry>;
  getWikiFaq(slug: string): Promise<WikiEntry>;
  searchWiki(query: string, opts?: { limit?: number; types?: string[] }): Promise<WikiSearchResponse>;
  listWiki(opts: {
    types: string[];
    limit?: number;
    offset?: number;
    query?: string;
  }): Promise<WikiListResponse>;
  validateGrouped(sessionId: string): Promise<GroupedValidationResponse>;
  diagnoseLst(args: { text?: string; path?: string }): Promise<InfeasibilityReport>;
};

type RequestOptions = RequestInit & {
  query?: Record<string, string | undefined>;
};

export class ApiClient implements ApiClientContract {
  constructor(private readonly baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000") {}

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { query, headers, ...init } = options;
    const params = new URLSearchParams();
    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value);
      }
    });
    const querySuffix = params.toString() ? `?${params.toString()}` : "";
    const response = await fetch(`${this.baseUrl}${path}${querySuffix}`, {
      ...init,
      headers: {
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...headers
      }
    });
    if (!response.ok) {
      let detail = `Request failed with status ${response.status}`;
      try {
        const payload = (await response.json()) as { detail?: string };
        if (payload.detail) {
          detail = payload.detail;
        }
      } catch {
        // no-op
      }
      throw new Error(detail);
    }
    return (await response.json()) as T;
  }

  openSession(modelPath: string): Promise<OpenSessionResponse> {
    return this.request("/session/open", {
      method: "POST",
      body: JSON.stringify({ model_path: modelPath })
    });
  }

  saveSession(sessionId: string, modelPath?: string): Promise<SessionStateResponse> {
    const payload: Record<string, unknown> = { session_id: sessionId };
    if (modelPath) {
      payload.model_path = modelPath;
    }
    return this.request("/session/save", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  closeSession(sessionId: string): Promise<SessionStateResponse> {
    return this.request("/session/close", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId })
    });
  }

  getGraph(sessionId: string): Promise<ModelGraphResponse> {
    return this.request("/model/graph", { query: { session_id: sessionId } });
  }

  listCommodities(sessionId: string): Promise<{ session_id: string; items: Commodity[] }> {
    return this.request("/model/commodities", { query: { session_id: sessionId } });
  }

  createCommodity(payload: {
    sessionId: string;
    name: string;
    type: string;
    description?: string;
    unit?: string;
    timesliceLevel?: string;
    balanceType?: string;
  }): Promise<ChangeMeta> {
    return this.request("/model/commodities", {
      method: "POST",
      body: JSON.stringify({
        session_id: payload.sessionId,
        name: payload.name,
        type: payload.type,
        description: payload.description ?? "",
        unit: payload.unit ?? "",
        timeslice_level: payload.timesliceLevel ?? "ANNUAL",
        balance_type: payload.balanceType ?? ""
      })
    });
  }

  deleteCommodity(sessionId: string, commodityName: string): Promise<ChangeMeta> {
    return this.request(`/model/commodities/${encodeURIComponent(commodityName)}`, {
      method: "DELETE",
      body: JSON.stringify({ session_id: sessionId })
    });
  }

  updateCommodity(payload: {
    sessionId: string;
    name: string;
    type?: string;
    description?: string;
    unit?: string;
    timesliceLevel?: string;
    balanceType?: string;
  }): Promise<ChangeMeta> {
    const body: Record<string, unknown> = { session_id: payload.sessionId };
    if (payload.type !== undefined) body.type = payload.type;
    if (payload.description !== undefined) body.description = payload.description;
    if (payload.unit !== undefined) body.unit = payload.unit;
    if (payload.timesliceLevel !== undefined) body.timeslice_level = payload.timesliceLevel;
    if (payload.balanceType !== undefined) body.balance_type = payload.balanceType;
    return this.request(`/model/commodities/${encodeURIComponent(payload.name)}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  }

  listProcesses(sessionId: string): Promise<{ session_id: string; items: Process[] }> {
    return this.request("/model/processes", { query: { session_id: sessionId } });
  }

  createProcess(payload: {
    sessionId: string;
    name: string;
    description?: string;
    processType?: string;
    inputCommodity?: string;
    outputCommodity?: string;
  }): Promise<ChangeMeta> {
    const inputs = payload.inputCommodity ? [{ commodity: payload.inputCommodity }] : [];
    const outputs = payload.outputCommodity ? [{ commodity: payload.outputCommodity }] : [];
    return this.request("/model/processes", {
      method: "POST",
      body: JSON.stringify({
        session_id: payload.sessionId,
        name: payload.name,
        description: payload.description ?? "",
        process_type: payload.processType ?? "STD",
        inputs,
        outputs
      })
    });
  }

  deleteProcess(sessionId: string, processName: string): Promise<ChangeMeta> {
    return this.request(`/model/processes/${encodeURIComponent(processName)}`, {
      method: "DELETE",
      body: JSON.stringify({ session_id: sessionId })
    });
  }

  updateProcess(payload: {
    sessionId: string;
    name: string;
    description?: string;
    processType?: string;
    inputs?: Array<{ commodity: string; group?: string }>;
    outputs?: Array<{ commodity: string; group?: string }>;
  }): Promise<ChangeMeta> {
    const body: Record<string, unknown> = { session_id: payload.sessionId };
    if (payload.description !== undefined) body.description = payload.description;
    if (payload.processType !== undefined) body.process_type = payload.processType;
    if (payload.inputs !== undefined) body.inputs = payload.inputs;
    if (payload.outputs !== undefined) body.outputs = payload.outputs;
    return this.request(`/model/processes/${encodeURIComponent(payload.name)}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  }

  listParameters(sessionId: string, parameter?: string): Promise<{ session_id: string; items: ParameterRow[] }> {
    return this.request("/model/parameters", {
      query: { session_id: sessionId, parameter }
    });
  }

  upsertParameter(payload: { sessionId: string; parameter: string; indexes: Record<string, unknown>; value: number }): Promise<ChangeMeta> {
    return this.request("/model/parameters", {
      method: "POST",
      body: JSON.stringify({
        session_id: payload.sessionId,
        parameter: payload.parameter,
        indexes: payload.indexes,
        value: payload.value
      })
    });
  }

  previewPatch(sessionId: string, row: ParameterRow): Promise<{ session_id: string; rows: PatchPreviewRow[] } & ChangeMeta> {
    return this.request("/model/patch/preview", {
      method: "POST",
      body: JSON.stringify({
        session_id: sessionId,
        rows: [row]
      })
    });
  }

  applyPatch(sessionId: string, row: ParameterRow): Promise<{ session_id: string; rows: PatchPreviewRow[] } & ChangeMeta> {
    return this.request("/model/patch/apply", {
      method: "POST",
      body: JSON.stringify({
        session_id: sessionId,
        rows: [row]
      })
    });
  }

  validate(sessionId: string): Promise<ValidationResponse> {
    return this.request("/model/validate", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId })
    });
  }

  importDd(ddPaths: string[], modelPath?: string): Promise<DDImportResponse> {
    const payload: Record<string, unknown> = { dd_paths: ddPaths };
    if (modelPath) {
      payload.model_path = modelPath;
    }
    return this.request("/dd/import", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  exportDd(sessionId: string, outputPath: string): Promise<DDExportResponse> {
    return this.request("/dd/export", {
      method: "POST",
      body: JSON.stringify({
        session_id: sessionId,
        output_path: outputPath
      })
    });
  }

  diff(leftModelPath: string, rightModelPath: string): Promise<DiffResponse> {
    return this.request("/model/diff", {
      method: "POST",
      body: JSON.stringify({
        left_model_path: leftModelPath,
        right_model_path: rightModelPath
      })
    });
  }

  openResults(resultsPath: string): Promise<ResultsOpenResponse> {
    return this.request("/results/open", {
      method: "POST",
      body: JSON.stringify({ results_path: resultsPath })
    });
  }

  getWikiCategories(): Promise<WikiCategoriesResponse> {
    return this.request("/wiki/categories");
  }

  getWikiEntry(slug: string): Promise<WikiEntry> {
    return this.request(`/wiki/entry/${encodeURIComponent(slug)}`);
  }

  getWikiParameter(name: string): Promise<WikiEntry> {
    return this.request(`/wiki/parameter/${encodeURIComponent(name)}`);
  }

  getWikiConcept(slug: string): Promise<WikiEntry> {
    return this.request(`/wiki/concept/${encodeURIComponent(slug)}`);
  }

  getWikiFaq(slug: string): Promise<WikiEntry> {
    return this.request(`/wiki/faq/${encodeURIComponent(slug)}`);
  }

  searchWiki(query: string, opts: { limit?: number; types?: string[] } = {}): Promise<WikiSearchResponse> {
    const body: Record<string, unknown> = { query };
    if (opts.limit !== undefined) body.limit = opts.limit;
    if (opts.types !== undefined) body.types = opts.types;
    return this.request("/wiki/search", {
      method: "POST",
      body: JSON.stringify(body)
    });
  }

  listWiki(opts: {
    types: string[];
    limit?: number;
    offset?: number;
    query?: string;
  }): Promise<WikiListResponse> {
    const body: Record<string, unknown> = { types: opts.types };
    if (opts.limit !== undefined) body.limit = opts.limit;
    if (opts.offset !== undefined) body.offset = opts.offset;
    if (opts.query !== undefined) body.query = opts.query;
    return this.request("/wiki/list", {
      method: "POST",
      body: JSON.stringify(body)
    });
  }

  validateGrouped(sessionId: string): Promise<GroupedValidationResponse> {
    return this.request("/validation/grouped", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId })
    });
  }

  diagnoseLst(args: { text?: string; path?: string }): Promise<InfeasibilityReport> {
    const body: Record<string, unknown> = {};
    if (args.text !== undefined) body.text = args.text;
    if (args.path !== undefined) body.path = args.path;
    return this.request("/diagnose/lst", {
      method: "POST",
      body: JSON.stringify(body)
    });
  }
}

export const api = new ApiClient();
