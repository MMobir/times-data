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
      touched_entities: ["sess-details"],
      dirty: false,
      session_id: "sess-details",
      model_path: "/tmp/model-details",
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
      session_id: "sess-details",
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
      session_id: "sess-details",
      items: [
        {
          name: "PP_GAS",
          description: "Gas-fired power plant",
          process_type: "STD",
          inputs: [
            {
              commodity: "GAS",
              group: "",
              efficiency: null,
              emission_factor: null,
              share: null
            }
          ],
          outputs: [
            {
              commodity: "ELC",
              group: "",
              efficiency: null,
              emission_factor: null,
              share: null
            }
          ],
          regions: ["R1"],
          primary_group: ""
        }
      ]
    }),
    createProcess: vi.fn(),
    deleteProcess: vi.fn(),
    updateProcess: vi.fn(),
    listParameters: vi.fn().mockResolvedValue({
      session_id: "sess-details",
      items: [
        {
          parameter: "NCAP_COST",
          indexes: { r: "R1", datayear: 2030, p: "PP_GAS", cur: "USD" },
          value: 1234
        },
        {
          parameter: "ACT_BND",
          indexes: { r: "R1", datayear: 2040, p: "PP_GAS" },
          value: 99
        },
        {
          parameter: "NCAP_COST",
          indexes: { r: "R1", datayear: 2030, p: "OTHER", cur: "USD" },
          value: 7
        }
      ]
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

describe("Items Details page", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("focuses a process, shows its RES neighborhood and parameter cube, and cascades on a neighbor", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-details");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /Details/i }));

    await waitFor(() => expect(api.listProcesses).toHaveBeenCalledWith("sess-details"));
    await waitFor(() => expect(api.listCommodities).toHaveBeenCalledWith("sess-details"));
    await waitFor(() => expect(api.listParameters).toHaveBeenCalledWith("sess-details"));

    await user.click(await screen.findByTestId("details-list-item-PP_GAS"));

    const declarationCard = await screen.findByTestId("items-details-declaration-card");
    expect(within(declarationCard).getByTestId("items-details-name")).toHaveTextContent("PP_GAS");
    expect(within(declarationCard).getByText(/Gas-fired power plant/)).toBeInTheDocument();

    const neighbors = await screen.findByTestId("items-details-neighbors");
    expect(within(neighbors).getByTestId("details-neighbor-GAS")).toBeInTheDocument();
    expect(within(neighbors).getByTestId("details-neighbor-ELC")).toBeInTheDocument();

    const cube = await screen.findByTestId("cube-shadow-table");
    expect(within(cube).getAllByText("NCAP_COST").length).toBeGreaterThan(0);
    expect(within(cube).getByText("ACT_BND")).toBeInTheDocument();
    expect(within(cube).queryByText("OTHER")).not.toBeInTheDocument();

    await user.click(within(neighbors).getByTestId("details-neighbor-ELC"));

    await waitFor(() => {
      const updatedCard = screen.getByTestId("items-details-declaration-card");
      expect(within(updatedCard).getByTestId("items-details-name")).toHaveTextContent("ELC");
      expect(within(updatedCard).getByText(/Electricity/)).toBeInTheDocument();
    });
  });
});
