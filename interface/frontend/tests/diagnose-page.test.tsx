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
    getWikiParameter: vi.fn(),
    getWikiConcept: vi.fn(),
    getWikiFaq: vi.fn(),
    searchWiki: vi.fn().mockResolvedValue({ hits: [] }),
    validateGrouped: vi.fn(),
    listWiki: vi.fn(),
    diagnoseLst: vi.fn().mockResolvedValue({
      status: "INFEASIBLE",
      objective: 1234.5,
      infeasible_equations: [
        {
          raw: "EQE_COMBAL(R1,2030,ELC,ANNUAL)..  ==L==  -1.5",
          equation: "EQE_COMBAL",
          args: ["R1", "2030", "ELC", "ANNUAL"],
          hint: "A commodity balance is not satisfiable. Check supply/demand for ELC in R1."
        }
      ],
      errors: [
        {
          raw: "**** Exec Error 1234",
          code: "EXEC_1234",
          hint: "Solver could not converge."
        }
      ],
      faq_links: [
        { slug: "infeasible-solve", title: "Why is my model infeasible?" },
        { slug: "commodity-balance", title: "Commodity balance equations" }
      ]
    })
  }) as ApiClientContract;

describe("Diagnose page", () => {
  beforeEach(() => {
    sessionStore.clear();
    clearWikiCache();
    vi.clearAllMocks();
  });

  it("renders infeasibility tables and FAQ links from /diagnose/lst", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.click(screen.getByRole("tab", { name: /Diagnose/i }));
    await user.type(screen.getByLabelText("LST text"), "INFEASIBLE solve sample");
    await user.click(screen.getByRole("button", { name: /^Translate/i }));

    await waitFor(() => expect(api.diagnoseLst).toHaveBeenCalledTimes(1));

    expect(await screen.findByText("EQE_COMBAL")).toBeInTheDocument();
    expect(screen.getByText("R1")).toBeInTheDocument();
    expect(screen.getByText("ELC")).toBeInTheDocument();
    expect(screen.getByText("EXEC_1234")).toBeInTheDocument();
    expect(screen.getByText("Solver could not converge.")).toBeInTheDocument();

    const faqOne = screen.getByTestId("diagnose-faq-infeasible-solve");
    expect(faqOne).toBeInTheDocument();
    expect(faqOne).toHaveTextContent("Why is my model infeasible?");
    expect(within(faqOne).getByText("faq / infeasible-solve")).toBeInTheDocument();
    expect(screen.getByTestId("diagnose-faq-commodity-balance")).toBeInTheDocument();
  });
});
