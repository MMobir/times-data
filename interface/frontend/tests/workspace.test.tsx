import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/app/App";
import type { ApiClientContract } from "../src/lib/api";
import { sessionStore } from "../src/state/sessionStore";

const createMockApi = (overrides: Partial<ApiClientContract> = {}): ApiClientContract =>
  ({
    openSession: vi.fn().mockResolvedValue({
      changed: true,
      changed_count: 1,
      touched_entities: ["sess-1"],
      dirty: false,
      session_id: "sess-1",
      model_path: "/tmp/model-a",
      summary: { commodities: 2, processes: 1, parameters: 1 }
    }),
    saveSession: vi.fn().mockResolvedValue({
      changed: false,
      changed_count: 0,
      touched_entities: [],
      dirty: false,
      session_id: "sess-1",
      model_path: "/tmp/model-a"
    }),
    closeSession: vi.fn().mockResolvedValue({
      changed: true,
      changed_count: 1,
      touched_entities: ["sess-1"],
      dirty: false,
      session_id: "sess-1",
      model_path: null
    }),
    getGraph: vi.fn().mockResolvedValue({
      summary: { commodities: 0, processes: 0, parameters: 0 },
      config: {},
      nodes: { commodities: [], processes: [] },
      edges: []
    }),
    listCommodities: vi.fn(),
    createCommodity: vi.fn(),
    deleteCommodity: vi.fn(),
    updateCommodity: vi.fn(),
    listProcesses: vi.fn(),
    createProcess: vi.fn(),
    deleteProcess: vi.fn(),
    updateProcess: vi.fn(),
    listParameters: vi.fn(),
    upsertParameter: vi.fn(),
    previewPatch: vi.fn(),
    applyPatch: vi.fn(),
    validate: vi.fn(),
    importDd: vi.fn(),
    exportDd: vi.fn(),
    diff: vi.fn(),
    openResults: vi.fn(),
    getWikiCategories: vi.fn(),
    getWikiEntry: vi.fn(),
    getWikiParameter: vi.fn(),
    getWikiConcept: vi.fn(),
    getWikiFaq: vi.fn(),
    searchWiki: vi.fn(),
    validateGrouped: vi.fn(),
    listWiki: vi.fn(),
    diagnoseLst: vi.fn(),
    ...overrides
  }) as ApiClientContract;

describe("workspace open flow", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("opens a model session and updates UI state", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-a");
    await user.click(screen.getByRole("button", { name: /Open session/i }));

    await waitFor(() => {
      expect(api.openSession).toHaveBeenCalledWith("/tmp/model-a");
    });

    expect(screen.getByTestId("session-status")).toHaveTextContent("session: sess-1");
    expect(screen.getByText("Opened session sess-1")).toBeInTheDocument();
  });
});
