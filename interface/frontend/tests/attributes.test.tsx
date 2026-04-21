import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/app/App";
import { clearWikiCache } from "../src/components/wiki/wikiCache";
import type { ApiClientContract } from "../src/lib/api";
import { sessionStore } from "../src/state/sessionStore";

const createMockApi = (): ApiClientContract =>
  ({
    openSession: vi.fn(),
    saveSession: vi.fn(),
    closeSession: vi.fn(),
    getGraph: vi.fn(),
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
    getWikiParameter: vi.fn().mockResolvedValue({
      slug: "ncap-cost",
      type: "parameter",
      title: "NCAP_COST",
      body_markdown: "Investment costs of new installed capacity.",
      frontmatter: { indexes: ["r", "datayear", "p", "cur"] }
    }),
    getWikiConcept: vi.fn(),
    getWikiFaq: vi.fn(),
    searchWiki: vi.fn(),
    listWiki: vi.fn().mockResolvedValue({
      total: 3,
      hits: [
        {
          slug: "ncap-cost",
          type: "parameter",
          title: "NCAP_COST",
          indexes: ["r", "datayear", "p", "cur"],
          category: "User Input",
          default_ie: "STD",
          description: "Investment costs of new installed capacity according to the installation year."
        },
        {
          slug: "act-bnd",
          type: "parameter",
          title: "ACT_BND",
          indexes: ["r", "datayear", "p", "s", "bd"],
          category: "User Input",
          default_ie: "STD",
          description: "Bound on the activity of a process."
        },
        {
          slug: "flo-func",
          type: "parameter",
          title: "FLO_FUNC",
          indexes: ["r", "datayear", "p", "cg1", "cg2", "s"],
          category: "User Input",
          default_ie: "STD",
          description: "A key parameter describing the basic operation of or within a process."
        }
      ]
    }),
    validateGrouped: vi.fn(),
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("Attributes page", () => {
  beforeEach(() => {
    sessionStore.clear();
    clearWikiCache();
    vi.clearAllMocks();
  });

  it("lists wiki parameter entries and opens the wiki popover when a row is clicked", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.click(screen.getByRole("tab", { name: /Attributes/i }));

    await waitFor(() =>
      expect(api.listWiki).toHaveBeenCalledWith({ types: ["parameter"] })
    );

    const shadow = await screen.findByTestId("attributes-shadow-table");
    expect(within(shadow).getByText("NCAP_COST")).toBeInTheDocument();
    expect(within(shadow).getByText("ACT_BND")).toBeInTheDocument();
    expect(within(shadow).getByText("FLO_FUNC")).toBeInTheDocument();

    await user.click(within(shadow).getByTestId("attributes-open-ncap-cost"));

    await waitFor(() => expect(api.getWikiParameter).toHaveBeenCalledWith("NCAP_COST"));

    const title = await screen.findByTestId("wiki-popover-title");
    expect(title).toHaveTextContent("NCAP_COST");
  });
});
