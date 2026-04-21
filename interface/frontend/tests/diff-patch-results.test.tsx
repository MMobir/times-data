import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/app/App";
import type { ApiClientContract } from "../src/lib/api";
import { sessionStore } from "../src/state/sessionStore";

const createMockApi = (): ApiClientContract =>
  ({
    openSession: vi.fn().mockResolvedValue({
      changed: true,
      changed_count: 1,
      touched_entities: ["sess-diff"],
      dirty: false,
      session_id: "sess-diff",
      model_path: "/tmp/model-a",
      summary: { commodities: 2, processes: 1, parameters: 1 }
    }),
    saveSession: vi.fn(),
    closeSession: vi.fn(),
    getGraph: vi.fn().mockResolvedValue({
      summary: {},
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
    previewPatch: vi.fn().mockResolvedValue({
      session_id: "sess-diff",
      changed: true,
      changed_count: 1,
      touched_entities: ["NCAP_COST"],
      dirty: false,
      rows: [
        {
          parameter: "NCAP_COST",
          indexes: { r: "R1", datayear: 2030 },
          old_value: 700,
          value: 900,
          changed: true
        }
      ]
    }),
    applyPatch: vi.fn(),
    validate: vi.fn(),
    importDd: vi.fn(),
    exportDd: vi.fn(),
    diff: vi.fn().mockResolvedValue({
      has_changes: true,
      added_commodities: [],
      removed_commodities: ["COAL"],
      changed_commodities: [],
      added_processes: ["NEW_PP"],
      removed_processes: [],
      changed_processes: [],
      added_parameters: [],
      removed_parameters: [],
      changed_parameters: [
        {
          parameter: "NCAP_COST",
          indexes: { r: "R1", p: "PP", datayear: 2020 },
          old_value: 1000,
          new_value: 1200
        }
      ]
    }),
    openResults: vi.fn().mockResolvedValue({
      results_path: "/tmp/results",
      tables: [
        {
          name: "summary",
          path: "/tmp/results/summary.csv",
          format: "csv",
          columns: ["metric", "value"],
          row_count: 3
        }
      ]
    }),
    getWikiCategories: vi.fn(),
    getWikiEntry: vi.fn(),
    getWikiParameter: vi.fn(),
    getWikiConcept: vi.fn(),
    getWikiFaq: vi.fn(),
    searchWiki: vi.fn(),
    validateGrouped: vi.fn(),
    listWiki: vi.fn(),
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("diff patch and results flows", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("runs diff, previews patch, and opens results metadata", async () => {
    const api = createMockApi();
    const user = userEvent.setup();
    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-a");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /Diff/i }));
    await user.type(screen.getByLabelText("Left model path"), "/tmp/model-a");
    await user.type(screen.getByLabelText("Right model path"), "/tmp/model-b");
    await user.click(screen.getByRole("button", { name: /Run diff/i }));
    await waitFor(() => expect(api.diff).toHaveBeenCalledWith("/tmp/model-a", "/tmp/model-b"));
    expect(screen.getByText(/"changed_parameters": 1/)).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /Patch/i }));
    await user.click(screen.getByRole("button", { name: /Preview patch/i }));
    await waitFor(() => expect(api.previewPatch).toHaveBeenCalledWith("sess-diff", expect.any(Object)));
    expect(screen.getByText("700")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /Results/i }));
    await user.type(screen.getByLabelText("Results path"), "/tmp/results");
    await user.click(screen.getByRole("button", { name: /Open results/i }));
    await waitFor(() => expect(api.openResults).toHaveBeenCalledWith("/tmp/results"));
    expect(screen.getByText("summary")).toBeInTheDocument();
  });
});
