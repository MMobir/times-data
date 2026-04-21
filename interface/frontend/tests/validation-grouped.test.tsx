import { render, screen, waitFor } from "@testing-library/react";
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
      touched_entities: ["sess-grouped"],
      dirty: false,
      session_id: "sess-grouped",
      model_path: "/tmp/model-grouped",
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
    validate: vi.fn(),
    importDd: vi.fn(),
    exportDd: vi.fn(),
    diff: vi.fn(),
    openResults: vi.fn(),
    getWikiCategories: vi.fn(),
    getWikiEntry: vi.fn(),
    getWikiParameter: vi.fn(),
    getWikiConcept: vi.fn(),
    getWikiFaq: vi.fn().mockResolvedValue({
      slug: "missing-output",
      type: "faq",
      title: "Process missing output flow",
      body_markdown:
        "# Process is missing an output flow\n\nAdd at least one output commodity so the process can balance.",
      frontmatter: {}
    }),
    searchWiki: vi.fn().mockResolvedValue({ hits: [] }),
    validateGrouped: vi.fn().mockResolvedValue({
      session_id: "sess-grouped",
      counts: { errors: 1, warnings: 1, total: 2 },
      groups: [
        {
          category: "schema",
          level: "error",
          message_count: 1,
          sample_messages: [
            {
              message: "Process PP_COAL has no output flow.",
              entity: "PP_COAL",
              hint: "Add at least one output commodity to balance the process."
            }
          ],
          faq_links: [
            { slug: "missing-output", title: "Process missing output flow" }
          ]
        },
        {
          category: "structural",
          level: "warning",
          message_count: 1,
          sample_messages: [
            {
              message: "Commodity COAL is unused by any process.",
              entity: "COAL",
              hint: "Remove it or wire it into a process."
            }
          ],
          faq_links: [
            { slug: "unused-commodity", title: "Unused commodity warning" }
          ]
        }
      ]
    }),
    listWiki: vi.fn(),
    diagnoseLst: vi.fn()
  }) as ApiClientContract;

describe("Smart validation page", () => {
  beforeEach(() => {
    sessionStore.clear();
    clearWikiCache();
    vi.clearAllMocks();
  });

  it("renders grouped validation cards and opens a FAQ link", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.type(screen.getByLabelText("Model path"), "/tmp/model-grouped");
    await user.click(screen.getByRole("button", { name: /Open session/i }));
    await waitFor(() => expect(api.openSession).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("tab", { name: /Validation/i }));
    await user.click(screen.getByRole("button", { name: /Run validate/i }));
    await waitFor(() => expect(api.validateGrouped).toHaveBeenCalledWith("sess-grouped"));

    const list = await screen.findByTestId("validation-grouped-list");
    expect(list).toHaveTextContent("schema");
    expect(list).toHaveTextContent("structural");
    expect(list).toHaveTextContent("Process PP_COAL has no output flow.");
    expect(list).toHaveTextContent("Commodity COAL is unused by any process.");

    expect(screen.getByText("errors: 1")).toBeInTheDocument();
    expect(screen.getByText("warnings: 1")).toBeInTheDocument();
    expect(screen.getByText("total: 2")).toBeInTheDocument();

    const faqLink = screen.getByTestId("validation-faq-missing-output");
    expect(faqLink).toHaveTextContent("Process missing output flow");
    await user.click(faqLink);

    await waitFor(() => expect(api.getWikiFaq).toHaveBeenCalledWith("missing-output"));
    const title = await screen.findByTestId("wiki-popover-title");
    expect(title).toHaveTextContent("Process missing output flow");
  });
});
