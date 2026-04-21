import { render, screen, waitFor } from "@testing-library/react";
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
    getWikiEntry: vi.fn().mockResolvedValue({
      slug: "what-is-times",
      type: "concept",
      title: "What is TIMES",
      body_markdown: "TIMES is an energy systems modelling framework.",
      frontmatter: {}
    }),
    getWikiParameter: vi.fn(),
    getWikiConcept: vi.fn().mockResolvedValue({
      slug: "what-is-times",
      type: "concept",
      title: "What is TIMES",
      body_markdown: "TIMES is an energy systems modelling framework.",
      frontmatter: {}
    }),
    getWikiFaq: vi.fn(),
    searchWiki: vi.fn().mockResolvedValue({
      hits: [
        {
          slug: "what-is-times",
          type: "concept",
          title: "What is TIMES",
          snippet: "TIMES is an energy systems modelling framework.",
          score: 0.92
        },
        {
          slug: "ncap_cost",
          type: "parameter",
          title: "NCAP_COST",
          snippet: "Investment cost per unit of new capacity.",
          score: 0.81
        },
        {
          slug: "infeasible-solve",
          type: "faq",
          title: "Why is my model infeasible?",
          snippet: "Common causes of infeasibility in TIMES solves.",
          score: 0.7
        }
      ]
    }),
    validateGrouped: vi.fn(),
    listWiki: vi.fn(),
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("Wiki command palette", () => {
  beforeEach(() => {
    sessionStore.clear();
    clearWikiCache();
    vi.clearAllMocks();
  });

  it("opens via Cmd+K, groups results, and Enter opens the first hit", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.keyboard("{Meta>}k{/Meta}");

    const input = await screen.findByLabelText("Search the TIMES wiki");
    await user.type(input, "times");

    await waitFor(() => expect(api.searchWiki).toHaveBeenCalled(), { timeout: 2000 });

    const results = await screen.findByTestId("wiki-cmdk-results");
    expect(results).toHaveTextContent("Concepts");
    expect(results).toHaveTextContent("Parameters");
    expect(results).toHaveTextContent("FAQ");
    expect(results).toHaveTextContent("What is TIMES");
    expect(results).toHaveTextContent("NCAP_COST");

    await user.keyboard("{Enter}");

    await waitFor(() => expect(api.getWikiConcept).toHaveBeenCalledWith("what-is-times"));

    const title = await screen.findByTestId("wiki-popover-title");
    expect(title).toHaveTextContent("What is TIMES");
  });
});
