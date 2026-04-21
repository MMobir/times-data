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
      touched_entities: ["sess-graph"],
      dirty: false,
      session_id: "sess-graph",
      model_path: "/tmp/model-graph",
      summary: { commodities: 2, processes: 1, parameters: 0 }
    }),
    saveSession: vi.fn(),
    closeSession: vi.fn(),
    getGraph: vi.fn().mockResolvedValue({
      summary: { commodities: 2, processes: 1, parameters: 0 },
      config: {},
      nodes: {
        commodities: [
          {
            name: "ELC",
            type: "NRG",
            description: "",
            unit: "PJ",
            timeslice_level: "ANNUAL",
            balance_type: ""
          },
          {
            name: "GAS",
            type: "NRG",
            description: "",
            unit: "PJ",
            timeslice_level: "ANNUAL",
            balance_type: ""
          }
        ],
        processes: [
          {
            name: "PP",
            description: "",
            process_type: "STD",
            inputs: [],
            outputs: [],
            regions: [],
            primary_group: ""
          }
        ]
      },
      edges: [
        { from: "GAS", to: "PP", direction: "input" },
        { from: "PP", to: "ELC", direction: "output" }
      ]
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
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("RES canvas", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("renders graph status counters once a session is open", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-graph");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(api.getGraph).toHaveBeenCalledWith("sess-graph"));

    const counters = await screen.findByTestId("graph-counts");
    expect(counters).toHaveTextContent("commodities: 2");
    expect(counters).toHaveTextContent("processes: 1");
    expect(counters).toHaveTextContent("edges: 2");
  });
});
