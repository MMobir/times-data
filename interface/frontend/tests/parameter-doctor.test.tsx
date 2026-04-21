import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/app/App";
import { clearWikiCache } from "../src/components/wiki/wikiCache";
import type { ApiClientContract } from "../src/lib/api";
import { sessionStore } from "../src/state/sessionStore";

const createMockApi = (): ApiClientContract =>
  ({
    openSession: vi.fn().mockResolvedValue({
      changed: true,
      changed_count: 1,
      touched_entities: ["sess-doctor"],
      dirty: false,
      session_id: "sess-doctor",
      model_path: "/tmp/model-doctor",
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
      session_id: "sess-doctor",
      items: [
        {
          parameter: "NCAP_COST",
          indexes: { r: "R1", datayear: 2030, p: "PP_GAS" },
          value: 1234
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
    getWikiParameter: vi.fn().mockResolvedValue({
      slug: "ncap_cost",
      type: "parameter",
      title: "NCAP_COST — investment cost",
      body_markdown:
        "# NCAP_COST\n\nInvestment cost per unit of new capacity.\n\nUsed by VAR_NCAP variables across all regions.\n",
      frontmatter: { type: "parameter", indexes: ["r", "datayear", "p"] }
    }),
    getWikiConcept: vi.fn(),
    getWikiFaq: vi.fn(),
    searchWiki: vi.fn().mockResolvedValue({ hits: [] }),
    validateGrouped: vi.fn(),
    listWiki: vi.fn(),
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("Parameter Doctor", () => {
  beforeEach(() => {
    sessionStore.clear();
    clearWikiCache();
    vi.clearAllMocks();
  });

  it("opens the wiki sheet for a parameter when the info icon is clicked", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-doctor");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /Parameters/i }));
    await user.click(screen.getByRole("button", { name: /Load parameters/i }));

    const shadowTable = await screen.findByTestId("parameters-shadow-table");
    const doctorButtons = within(shadowTable).getAllByTestId("parameter-doctor-NCAP_COST");
    await user.click(doctorButtons[0]);

    await waitFor(() => expect(api.getWikiParameter).toHaveBeenCalledWith("NCAP_COST"));

    const title = await screen.findByTestId("wiki-popover-title");
    expect(title).toHaveTextContent("NCAP_COST — investment cost");
    const body = await screen.findByTestId("wiki-popover-body");
    expect(body).toHaveTextContent("Investment cost per unit of new capacity.");
  });
});
