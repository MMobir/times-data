import { render, screen, waitFor, within } from "@testing-library/react";
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
      touched_entities: ["sess-crud"],
      dirty: false,
      session_id: "sess-crud",
      model_path: "/tmp/model-crud",
      summary: { commodities: 1, processes: 1, parameters: 0 }
    }),
    saveSession: vi.fn(),
    closeSession: vi.fn(),
    getGraph: vi.fn().mockResolvedValue({
      summary: {},
      config: {},
      nodes: { commodities: [], processes: [] },
      edges: []
    }),
    listCommodities: vi.fn().mockResolvedValue({
      session_id: "sess-crud",
      items: [
        {
          name: "H2",
          type: "NRG",
          description: "",
          unit: "PJ",
          timeslice_level: "ANNUAL",
          balance_type: ""
        }
      ]
    }),
    createCommodity: vi.fn().mockResolvedValue({
      changed: true,
      changed_count: 1,
      touched_entities: ["H2"],
      dirty: true
    }),
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
      session_id: "sess-crud",
      errors: [],
      warnings: [
        {
          level: "warning",
          category: "soft-check",
          message: "Potentially sparse process mapping.",
          entity: "H2",
          hint: "Review flow balance for newly added commodity."
        }
      ],
      counts: { errors: 0, warnings: 1 }
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

describe("entity CRUD and validation flow", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("creates a commodity and runs validation", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-crud");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /Entities/i }));

    await user.clear(screen.getByLabelText("Commodity name"));
    await user.type(screen.getByLabelText("Commodity name"), "H2");
    await user.click(screen.getByRole("button", { name: /Create commodity/i }));

    await waitFor(() => {
      expect(api.createCommodity).toHaveBeenCalledWith({
        sessionId: "sess-crud",
        name: "H2",
        type: "NRG",
        unit: "PJ"
      });
    });

    const main = screen.getByTestId("app-main");
    expect(within(main).getByRole("cell", { name: "H2" })).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /Validation/i }));
    await user.click(screen.getByRole("checkbox", { name: /Detailed view toggle/i }));
    await user.click(screen.getByRole("button", { name: /Run validate/i }));
    await waitFor(() => expect(api.validate).toHaveBeenCalledWith("sess-crud"));
    expect(
      screen.getByText("Review flow balance for newly added commodity.")
    ).toBeInTheDocument();
  });
});
