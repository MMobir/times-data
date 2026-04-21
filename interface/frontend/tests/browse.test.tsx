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
      touched_entities: ["sess-browse"],
      dirty: false,
      session_id: "sess-browse",
      model_path: "/tmp/model-browse",
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
    listParameters: vi.fn().mockResolvedValue({
      session_id: "sess-browse",
      items: [
        {
          parameter: "NCAP_COST",
          indexes: { r: "R1", datayear: 2030, p: "PP_GAS" },
          value: 100
        },
        {
          parameter: "NCAP_COST",
          indexes: { r: "R2", datayear: 2030, p: "PP_WIND" },
          value: 200
        },
        {
          parameter: "ACT_BND",
          indexes: { r: "R1", datayear: 2040, p: "PP_GAS" },
          value: 50
        },
        {
          parameter: "ACT_BND",
          indexes: { r: "R2", datayear: 2040, p: "PP_WIND" },
          value: 25
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

describe("Browse page", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("filters parameter rows by region and toggles grouping by Parameter", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-browse");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /Browse/i }));
    await waitFor(() => expect(api.listParameters).toHaveBeenCalledWith("sess-browse"));

    let shadow = await screen.findByTestId("browse-shadow-table");
    expect(within(shadow).getAllByText("R1").length).toBe(2);
    expect(within(shadow).getAllByText("R2").length).toBe(2);

    await user.click(screen.getByRole("button", { name: /Filter region R1/i }));

    await waitFor(() => {
      shadow = screen.getByTestId("browse-shadow-table");
      expect(within(shadow).queryByText("R2")).not.toBeInTheDocument();
    });
    expect(within(shadow).getAllByText("R1").length).toBe(2);

    const groupParameter = screen.getByRole("button", { name: /^Parameter$/ });
    await user.click(groupParameter);
    expect(groupParameter.getAttribute("aria-pressed")).toBe("true");
  });
});
