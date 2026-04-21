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
      touched_entities: ["sess-params"],
      dirty: false,
      session_id: "sess-params",
      model_path: "/tmp/model-params",
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
      session_id: "sess-params",
      items: [
        {
          parameter: "NCAP_COST",
          indexes: { r: "R1", datayear: 2030, p: "PP_GAS" },
          value: 1234
        },
        {
          parameter: "ACT_BND",
          indexes: { r: "R2", datayear: 2040, p: "PP_WIND" },
          value: 56
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
    validateGrouped: vi.fn(),
    listWiki: vi.fn(),
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("Parameters grid", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("loads parameter rows and exposes them in the grid", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-params");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /Parameters/i }));
    await user.click(screen.getByRole("button", { name: /Load parameters/i }));

    await waitFor(() => expect(api.listParameters).toHaveBeenCalledWith("sess-params", undefined));

    const shadowTable = await screen.findByTestId("parameters-shadow-table");
    expect(within(shadowTable).getByText("NCAP_COST")).toBeInTheDocument();
    expect(within(shadowTable).getByText("ACT_BND")).toBeInTheDocument();
    expect(within(shadowTable).getByText("PP_GAS")).toBeInTheDocument();
  });
});
