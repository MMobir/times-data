import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/app/App";
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
    diff: vi.fn().mockResolvedValue({
      has_changes: true,
      added_commodities: ["H2"],
      removed_commodities: [],
      changed_commodities: [],
      added_processes: [],
      removed_processes: [],
      changed_processes: [],
      added_parameters: [],
      removed_parameters: [],
      changed_parameters: [
        {
          parameter: "NCAP_COST",
          indexes: { r: "R1", p: "PP", datayear: 2030 },
          old_value: 1000,
          new_value: 1200
        }
      ]
    }),
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

describe("Diff view", () => {
  beforeEach(() => {
    sessionStore.clear();
    vi.clearAllMocks();
  });

  it("renders changed parameters in a structured 'Changed' table", async () => {
    const api = createMockApi();
    const user = userEvent.setup();

    render(<App apiClient={api} />);

    await user.click(screen.getByRole("tab", { name: /Diff/i }));
    await user.type(screen.getByLabelText("Left model path"), "/tmp/baseline");
    await user.type(screen.getByLabelText("Right model path"), "/tmp/scenario");
    await user.click(screen.getByRole("button", { name: /Run diff/i }));

    await waitFor(() => expect(api.diff).toHaveBeenCalledWith("/tmp/baseline", "/tmp/scenario"));

    expect(await screen.findByText("H2")).toBeInTheDocument();
    expect(screen.getByText(/"changed_parameters": 1/)).toBeInTheDocument();

    const innerParametersTabs = screen.getAllByRole("tab", { name: /Parameters/i });
    const innerParamsTab = innerParametersTabs[innerParametersTabs.length - 1];
    await user.click(innerParamsTab);

    expect(await screen.findByText("NCAP_COST")).toBeInTheDocument();
    expect(screen.getByText(/\+200/)).toBeInTheDocument();
  });
});
