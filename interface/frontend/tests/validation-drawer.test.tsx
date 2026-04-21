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
      touched_entities: ["sess-validate"],
      dirty: false,
      session_id: "sess-validate",
      model_path: "/tmp/model-validate",
      summary: {}
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
    previewPatch: vi.fn(),
    applyPatch: vi.fn(),
    validate: vi.fn().mockResolvedValue({
      session_id: "sess-validate",
      errors: [
        {
          level: "error",
          category: "schema",
          message: "Process PP_COAL has no output flow.",
          entity: "PP_COAL",
          hint: "Add at least one output commodity to balance the process."
        }
      ],
      warnings: [
        {
          level: "warning",
          category: "soft-check",
          message: "Commodity COAL is unused by any process.",
          entity: "COAL",
          hint: "Remove it or wire it into a process."
        }
      ],
      counts: { errors: 1, warnings: 1 }
    }),
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
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("Validation tab", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("renders error and warning rows after running validation", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-validate");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /Validation/i }));
    await user.click(screen.getByRole("checkbox", { name: /Detailed view toggle/i }));
    await user.click(screen.getByRole("button", { name: /Run validate/i }));
    await waitFor(() => expect(api.validate).toHaveBeenCalledWith("sess-validate"));

    expect(screen.getByText("Process PP_COAL has no output flow.")).toBeInTheDocument();
    expect(screen.getByText("Commodity COAL is unused by any process.")).toBeInTheDocument();
    expect(screen.getByText("errors: 1")).toBeInTheDocument();
    expect(screen.getByText("warnings: 1")).toBeInTheDocument();
  });
});
