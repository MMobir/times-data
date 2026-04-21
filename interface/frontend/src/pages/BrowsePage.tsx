import type { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { RefreshCw, Search, TableProperties } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ParameterDoctorButton } from "../components/wiki/ParameterDoctorButton";
import type { ApiClientContract, ParameterRow } from "../lib/api";
import { useSessionState } from "../state/sessionStore";
import { useWorkspace } from "../state/workspaceContext";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface BrowsePageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

interface BrowseRow {
  id: string;
  parameter: string;
  region: string;
  year: string;
  process: string;
  commodity: string;
  currency: string;
  value: number;
  other: string;
  original: ParameterRow;
}

const RESERVED_KEYS = new Set([
  "r",
  "region",
  "datayear",
  "year",
  "p",
  "process",
  "c",
  "commodity",
  "cur",
  "currency"
]);

const GROUP_BY_OPTIONS = [
  { value: "none", label: "None" },
  { value: "parameter", label: "Parameter" },
  { value: "region", label: "Region" },
  { value: "year", label: "Year" },
  { value: "process", label: "Process" },
  { value: "commodity", label: "Commodity" }
] as const;

type GroupByValue = (typeof GROUP_BY_OPTIONS)[number]["value"];

function pick(indexes: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = indexes[key];
    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }
  return "";
}

function paramRow(row: ParameterRow, idx: number): BrowseRow {
  const other: Record<string, unknown> = {};
  Object.entries(row.indexes).forEach(([key, value]) => {
    if (!RESERVED_KEYS.has(key)) {
      other[key] = value;
    }
  });
  return {
    id: `${row.parameter}|${idx}|${JSON.stringify(row.indexes)}`,
    parameter: row.parameter,
    region: pick(row.indexes, "r", "region"),
    year: pick(row.indexes, "datayear", "year"),
    process: pick(row.indexes, "p", "process"),
    commodity: pick(row.indexes, "c", "commodity"),
    currency: pick(row.indexes, "cur", "currency"),
    value: row.value,
    other: Object.keys(other).length ? JSON.stringify(other) : "",
    original: row
  };
}

function wildcardMatch(value: string, pattern: string): boolean {
  if (!pattern) return true;
  const lower = value.toLowerCase();
  const p = pattern.toLowerCase();
  if (!p.includes("*")) {
    return lower.includes(p);
  }
  const escaped = p.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`).test(lower);
}

export function BrowsePage({ apiClient, onError, onSuccess }: BrowsePageProps) {
  const session = useSessionState();
  const workspace = useWorkspace();
  const gridApiRef = useRef<GridApi<BrowseRow> | null>(null);

  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<string[]>([]);
  const [paramFilter, setParamFilter] = useState<string[]>([]);
  const [paramSearch, setParamSearch] = useState("");
  const [processPattern, setProcessPattern] = useState("");
  const [commodityPattern, setCommodityPattern] = useState("");
  const [groupBy, setGroupBy] = useState<GroupByValue>("none");

  const sessionId = session.sessionId;

  const load = async () => {
    if (!sessionId) return;
    try {
      const payload = await apiClient.listParameters(sessionId);
      workspace.setParameters(payload.items);
      onSuccess(`Loaded ${payload.items.length} parameter rows.`);
    } catch (error) {
      onError(error);
    }
  };

  useEffect(() => {
    if (sessionId && workspace.parameters.length === 0) {
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const allRows = useMemo<BrowseRow[]>(
    () => workspace.parameters.map((row, idx) => paramRow(row, idx)),
    [workspace.parameters]
  );

  const allRegions = useMemo<string[]>(() => {
    const set = new Set<string>();
    allRows.forEach((row) => row.region && set.add(row.region));
    return Array.from(set).sort();
  }, [allRows]);

  const allYears = useMemo<string[]>(() => {
    const set = new Set<string>();
    allRows.forEach((row) => row.year && set.add(row.year));
    return Array.from(set).sort();
  }, [allRows]);

  const allParameters = useMemo<string[]>(() => {
    const set = new Set<string>();
    allRows.forEach((row) => set.add(row.parameter));
    return Array.from(set).sort();
  }, [allRows]);

  const visibleParameterChoices = useMemo(() => {
    const needle = paramSearch.trim().toLowerCase();
    const filtered = needle
      ? allParameters.filter((p) => p.toLowerCase().includes(needle))
      : allParameters;
    return filtered.slice(0, 50);
  }, [allParameters, paramSearch]);

  const filteredRows = useMemo<BrowseRow[]>(() => {
    return allRows.filter((row) => {
      if (regionFilter.length && !regionFilter.includes(row.region)) return false;
      if (yearFilter.length && !yearFilter.includes(row.year)) return false;
      if (paramFilter.length && !paramFilter.includes(row.parameter)) return false;
      if (processPattern && !wildcardMatch(row.process, processPattern)) return false;
      if (commodityPattern && !wildcardMatch(row.commodity, commodityPattern)) return false;
      return true;
    });
  }, [allRows, regionFilter, yearFilter, paramFilter, processPattern, commodityPattern]);

  const valueSum = useMemo<number>(() => {
    return filteredRows.reduce((acc, row) => acc + (Number.isFinite(row.value) ? row.value : 0), 0);
  }, [filteredRows]);

  const columnDefs = useMemo<ColDef<BrowseRow>[]>(
    () => [
      {
        headerName: "Parameter",
        field: "parameter",
        rowGroup: groupBy === "parameter",
        hide: groupBy === "parameter",
        minWidth: 180,
        cellRenderer: (params: ICellRendererParams<BrowseRow>) => {
          const row = params.data;
          if (!row) return null;
          return (
            <span className="inline-flex items-center gap-1.5">
              <ParameterDoctorButton parameter={row.parameter} />
              <span className="font-mono">{row.parameter}</span>
            </span>
          );
        }
      },
      {
        headerName: "Region",
        field: "region",
        rowGroup: groupBy === "region",
        hide: groupBy === "region",
        width: 110
      },
      {
        headerName: "Year",
        field: "year",
        rowGroup: groupBy === "year",
        hide: groupBy === "year",
        width: 110
      },
      {
        headerName: "Process",
        field: "process",
        rowGroup: groupBy === "process",
        hide: groupBy === "process",
        width: 140
      },
      {
        headerName: "Commodity",
        field: "commodity",
        rowGroup: groupBy === "commodity",
        hide: groupBy === "commodity",
        width: 140
      },
      { headerName: "Currency", field: "currency", width: 110 },
      {
        headerName: "Other indexes",
        field: "other",
        flex: 1,
        minWidth: 200,
        cellClass: "font-mono text-xs"
      },
      {
        headerName: "Value",
        field: "value",
        type: "numericColumn",
        cellClass: "text-right font-mono",
        width: 130,
        valueFormatter: (params) =>
          typeof params.value === "number" ? params.value.toLocaleString() : ""
      }
    ],
    [groupBy]
  );

  const defaultColDef = useMemo<ColDef<BrowseRow>>(
    () => ({
      resizable: true,
      filter: true,
      sortable: true
    }),
    []
  );

  const onGridReady = (event: GridReadyEvent<BrowseRow>) => {
    gridApiRef.current = event.api;
  };

  const onRowDoubleClicked = (params: { data?: BrowseRow }) => {
    const row = params.data;
    if (!row) return;
    if (row.process) {
      workspace.selectEntity({ kind: "process", name: row.process });
    } else if (row.commodity) {
      workspace.selectEntity({ kind: "commodity", name: row.commodity });
    }
  };

  const toggleSetMember = (
    value: string,
    state: string[],
    setter: (next: string[]) => void
  ) => {
    setter(state.includes(value) ? state.filter((v) => v !== value) : [...state, value]);
  };

  if (!sessionId) {
    return (
      <EmptyState
        icon={TableProperties}
        title="No session is open"
        description="Open a model from the sidebar to browse the parameter data cube."
      />
    );
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex flex-col gap-3 space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <TableProperties className="size-4 text-primary" /> Browse
            <Badge variant="muted">{filteredRows.length} of {allRows.length}</Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={load}>
              <RefreshCw className="size-4" /> Reload parameters
            </Button>
          </div>
        </div>
        <div
          className="sticky top-0 z-10 flex flex-wrap items-center gap-3 rounded-md border border-border bg-card/80 px-3 py-2 text-xs"
          data-testid="browse-filter-bar"
        >
          <FilterChips
            label="Region"
            options={allRegions}
            selection={regionFilter}
            onToggle={(value) => toggleSetMember(value, regionFilter, setRegionFilter)}
          />
          <FilterChips
            label="Year"
            options={allYears}
            selection={yearFilter}
            onToggle={(value) => toggleSetMember(value, yearFilter, setYearFilter)}
          />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Attribute:</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search attributes"
                value={paramSearch}
                onChange={(event) => setParamSearch(event.target.value)}
                placeholder="Search…"
                className="h-7 w-40 pl-7 text-xs"
              />
            </div>
            <div className="flex max-w-[420px] flex-wrap gap-1">
              {visibleParameterChoices.length === 0 ? (
                <span className="italic text-muted-foreground">no attributes</span>
              ) : (
                visibleParameterChoices.map((p) => {
                  const active = paramFilter.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleSetMember(p, paramFilter, setParamFilter)}
                      aria-pressed={active}
                      className={`rounded-full border px-2 py-0.5 text-[11px] ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })
              )}
            </div>
          </div>
          <Input
            aria-label="Process pattern"
            value={processPattern}
            onChange={(event) => setProcessPattern(event.target.value)}
            placeholder="Process * pattern"
            className="h-7 w-44 text-xs"
          />
          <Input
            aria-label="Commodity pattern"
            value={commodityPattern}
            onChange={(event) => setCommodityPattern(event.target.value)}
            placeholder="Commodity * pattern"
            className="h-7 w-44 text-xs"
          />
          <div className="ml-auto flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
            <span className="px-2 text-muted-foreground">Group by</span>
            {GROUP_BY_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setGroupBy(value)}
                aria-pressed={groupBy === value}
                className={`rounded px-2 py-0.5 ${
                  groupBy === value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-[11px] italic text-muted-foreground">
          Tip: drag a column header onto the row group panel of the grid to add custom groups, or
          pick from the segmented control above.
        </p>
        <div className="ag-theme-quartz ag-theme-times h-[560px] w-full">
          <AgGridReact<BrowseRow>
            rowData={filteredRows}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={(params) => params.data.id}
            onGridReady={onGridReady}
            onRowDoubleClicked={onRowDoubleClicked}
            animateRows
            groupDisplayType="groupRows"
            rowGroupPanelShow="never"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filteredRows.length} rows after filter</span>
          <span>
            sum of value: <span className="font-mono">{valueSum.toLocaleString()}</span>
          </span>
        </div>
        {filteredRows.length ? (
          <table className="sr-only" data-testid="browse-shadow-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Region</th>
                <th>Year</th>
                <th>Process</th>
                <th>Commodity</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} data-testid={`browse-row-${row.id}`}>
                  <td>{row.parameter}</td>
                  <td>{row.region}</td>
                  <td>{row.year}</td>
                  <td>{row.process}</td>
                  <td>{row.commodity}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </CardContent>
    </Card>
  );
}

interface FilterChipsProps {
  label: string;
  options: string[];
  selection: string[];
  onToggle: (value: string) => void;
}

function FilterChips({ label, options, selection, onToggle }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="text-muted-foreground">{label}:</span>
      {options.length === 0 ? (
        <span className="italic text-muted-foreground">none</span>
      ) : (
        options.map((value) => {
          const active = selection.includes(value);
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              aria-label={`Filter ${label.toLowerCase()} ${value}`}
              onClick={() => onToggle(value)}
              className={`rounded-full border px-2 py-0.5 ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              {value}
            </button>
          );
        })
      )}
    </div>
  );
}
