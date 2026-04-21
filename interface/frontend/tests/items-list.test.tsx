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
      touched_entities: ["sess-items"],
      dirty: false,
      session_id: "sess-items",
      model_path: "/tmp/model-items",
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
    listCommodities: vi.fn().mockResolvedValue({
      session_id: "sess-items",
      items: [
        {
          name: "ELC",
          type: "NRG",
          description: "Electricity",
          unit: "PJ",
          timeslice_level: "ANNUAL",
          balance_type: ""
        },
        {
          name: "GAS",
          type: "NRG",
          description: "Natural gas",
          unit: "PJ",
          timeslice_level: "ANNUAL",
          balance_type: ""
        }
      ]
    }),
    createCommodity: vi.fn(),
    deleteCommodity: vi.fn(),
    updateCommodity: vi.fn(),
    listProcesses: vi.fn().mockResolvedValue({
      session_id: "sess-items",
      items: [
        {
          name: "PP_GAS",
          description: "Gas-fired power plant",
          process_type: "STD",
          inputs: [{ commodity: "GAS", group: "", efficiency: null, emission_factor: null, share: null }],
          outputs: [{ commodity: "ELC", group: "", efficiency: null, emission_factor: null, share: null }],
          regions: ["R1"],
          primary_group: ""
        }
      ]
    }),
    createProcess: vi.fn(),
    deleteProcess: vi.fn(),
    updateProcess: vi.fn(),
    listParameters: vi.fn().mockResolvedValue({
      session_id: "sess-items",
      items: []
    }),
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
    listWiki: vi.fn(),
    validateGrouped: vi.fn(),
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("Items List page", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("renders all model items with type badges and cascades a clicked row to Items Details", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-items");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /^Items$/i }));

    await waitFor(() => expect(api.listCommodities).toHaveBeenCalledWith("sess-items"));
    await waitFor(() => expect(api.listProcesses).toHaveBeenCalledWith("sess-items"));

    const shadow = await screen.findByTestId("items-shadow-table");
    expect(within(shadow).getByText("PP_GAS")).toBeInTheDocument();
    expect(within(shadow).getByText("ELC")).toBeInTheDocument();
    expect(within(shadow).getByText("GAS")).toBeInTheDocument();
    const processRow = within(shadow).getByTestId("items-row-p:PP_GAS");
    expect(within(processRow).getByText("process")).toBeInTheDocument();

    await user.click(processRow);

    const detailsTab = await screen.findByRole("tab", { name: /Details/i });
    await waitFor(() => expect(detailsTab.getAttribute("data-state")).toBe("active"));

    const declarationCard = await screen.findByTestId("items-details-declaration-card");
    expect(within(declarationCard).getByTestId("items-details-name")).toHaveTextContent("PP_GAS");
  });
});
