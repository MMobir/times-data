import type { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { List, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import type { ApiClientContract, Commodity, Process } from "../lib/api";
import { useSessionState } from "../state/sessionStore";
import { useWorkspace } from "../state/workspaceContext";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface ItemsListPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

type ItemKind = "process" | "commodity" | "commodity_group" | "user_constraint";

interface ItemRow {
  id: string;
  kind: ItemKind;
  name: string;
  description: string;
  regions: string;
  sector: string;
  units: string;
  pcg: string;
  tsLevel: string;
  vintage: string;
}

const TYPE_FILTERS: Array<{ value: "all" | ItemKind; label: string; disabledIfEmpty?: boolean }> = [
  { value: "all", label: "All" },
  { value: "process", label: "Process" },
  { value: "commodity", label: "Commodity" },
  { value: "commodity_group", label: "Commodity Group", disabledIfEmpty: true },
  { value: "user_constraint", label: "User Constraint", disabledIfEmpty: true }
];

function commodityToRow(commodity: Commodity): ItemRow {
  return {
    id: `c:${commodity.name}`,
    kind: "commodity",
    name: commodity.name,
    description: commodity.description,
    regions: "",
    sector: commodity.type,
    units: commodity.unit,
    pcg: "—",
    tsLevel: commodity.timeslice_level,
    vintage: "—"
  };
}

function processToRow(process: Process): ItemRow {
  const sector = process.process_type;
  const units = "PJ";
  const inputs = process.inputs.map((flow) => flow.commodity).join(", ");
  const outputs = process.outputs.map((flow) => flow.commodity).join(", ");
  const description = process.description ||
    [inputs ? `inputs: ${inputs}` : "", outputs ? `outputs: ${outputs}` : ""]
      .filter(Boolean)
      .join(" • ");
  return {
    id: `p:${process.name}`,
    kind: "process",
    name: process.name,
    description,
    regions: process.regions.join(", "),
    sector,
    units,
    pcg: process.primary_group || "—",
    tsLevel: "ANNUAL",
    vintage: "no"
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

export function ItemsListPage({ apiClient, onError, onSuccess }: ItemsListPageProps) {
  const session = useSessionState();
  const workspace = useWorkspace();
  const gridApiRef = useRef<GridApi<ItemRow> | null>(null);

  const [typeFilter, setTypeFilter] = useState<"all" | ItemKind>("all");
  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [setFilter, setSetFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.setGridOption("quickFilterText", search);
    }
  }, [search]);

  const load = async () => {
    if (!session.sessionId) return;
    try {
      const [commoditiesPayload, processesPayload] = await Promise.all([
        apiClient.listCommodities(session.sessionId),
        apiClient.listProcesses(session.sessionId)
      ]);
      workspace.setCommodities(commoditiesPayload.items);
      workspace.setProcesses(processesPayload.items);
      onSuccess(
        `Loaded ${commoditiesPayload.items.length} commodities and ${processesPayload.items.length} processes.`
      );
    } catch (error) {
      onError(error);
    }
  };

  useEffect(() => {
    if (
      session.sessionId &&
      workspace.commodities.length === 0 &&
      workspace.processes.length === 0
    ) {
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.sessionId]);

  const allRows = useMemo<ItemRow[]>(() => {
    const rows: ItemRow[] = [
      ...workspace.processes.map(processToRow),
      ...workspace.commodities.map(commodityToRow)
    ];
    return rows;
  }, [workspace.commodities, workspace.processes]);

  const allRegions = useMemo<string[]>(() => {
    const set = new Set<string>();
    workspace.processes.forEach((p) => p.regions.forEach((r) => set.add(r)));
    return Array.from(set).sort();
  }, [workspace.processes]);

  const counts = useMemo(() => {
    const total: Record<ItemKind, number> = {
      process: 0,
      commodity: 0,
      commodity_group: 0,
      user_constraint: 0
    };
    allRows.forEach((row) => {
      total[row.kind] += 1;
    });
    return total;
  }, [allRows]);

  const filteredRows = useMemo<ItemRow[]>(() => {
    return allRows.filter((row) => {
      if (typeFilter !== "all" && row.kind !== typeFilter) return false;
      if (regionFilter.length) {
        const rowRegions = row.regions
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean);
        if (!regionFilter.some((r) => rowRegions.includes(r))) return false;
      }
      if (setFilter) {
        if (!wildcardMatch(row.sector, setFilter) && !wildcardMatch(row.kind, setFilter)) {
          return false;
        }
      }
      if (search) {
        const matchesName = wildcardMatch(row.name, search);
        const matchesDesc = wildcardMatch(row.description, search);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    });
  }, [allRows, typeFilter, regionFilter, setFilter, search]);

  const columnDefs = useMemo<ColDef<ItemRow>[]>(
    () => [
      {
        headerName: "Type",
        field: "kind",
        width: 120,
        cellRenderer: (params: ICellRendererParams<ItemRow>) => {
          const row = params.data;
          if (!row) return null;
          const variant: "default" | "success" | "muted" | "warning" =
            row.kind === "process"
              ? "default"
              : row.kind === "commodity"
                ? "success"
                : row.kind === "commodity_group"
                  ? "warning"
                  : "muted";
          return (
            <Badge variant={variant} className="uppercase">
              {row.kind.replace("_", " ")}
            </Badge>
          );
        }
      },
      { headerName: "Region(s)", field: "regions", width: 120, sortable: true },
      { headerName: "Sector / Set", field: "sector", width: 130, sortable: true },
      {
        headerName: "Name",
        field: "name",
        minWidth: 160,
        sortable: true,
        cellClass: "font-mono"
      },
      { headerName: "Description", field: "description", flex: 1, minWidth: 220 },
      { headerName: "Units", field: "units", width: 100, sortable: true },
      { headerName: "PCG", field: "pcg", width: 110, sortable: true },
      { headerName: "TS-Lvl", field: "tsLevel", width: 110, sortable: true },
      { headerName: "Vintage", field: "vintage", width: 100, sortable: true }
    ],
    []
  );

  const defaultColDef = useMemo<ColDef<ItemRow>>(
    () => ({
      resizable: true,
      filter: true,
      sortable: true
    }),
    []
  );

  const onGridReady = (event: GridReadyEvent<ItemRow>) => {
    gridApiRef.current = event.api;
    if (search) {
      event.api.setGridOption("quickFilterText", search);
    }
  };

  const onRowClicked = (params: { data?: ItemRow }) => {
    const row = params.data;
    if (!row) return;
    if (row.kind === "process") {
      workspace.selectEntity({ kind: "process", name: row.name }, { switchToInspector: false });
      workspace.setActiveTab("details");
    } else if (row.kind === "commodity") {
      workspace.selectEntity({ kind: "commodity", name: row.name }, { switchToInspector: false });
      workspace.setActiveTab("details");
    }
  };

  const toggleRegion = (region: string) => {
    setRegionFilter((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  if (!session.sessionId) {
    return (
      <EmptyState
        icon={List}
        title="No session is open"
        description="Open a model from the sidebar to browse the model's items list."
      />
    );
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex flex-col gap-3 space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <List className="size-4 text-primary" /> Items List
            <Badge variant="muted">{filteredRows.length} of {allRows.length}</Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search items"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name/description (use *)"
                className="h-8 w-64 pl-7 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" onClick={load}>
              <RefreshCw className="size-4" />
              Reload
            </Button>
          </div>
        </div>
        <div
          className="sticky top-0 z-10 flex flex-wrap items-center gap-3 rounded-md border border-border bg-card/80 px-3 py-2 text-xs"
          data-testid="items-filter-bar"
        >
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-muted-foreground">Type:</span>
            {TYPE_FILTERS.map((entry) => {
              const empty =
                entry.value === "commodity_group"
                  ? counts.commodity_group === 0
                  : entry.value === "user_constraint"
                    ? counts.user_constraint === 0
                    : false;
              const disabled = entry.disabledIfEmpty && empty;
              const active = typeFilter === entry.value;
              return (
                <button
                  key={entry.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => setTypeFilter(entry.value)}
                  aria-pressed={active}
                  className={`rounded-full border px-2 py-0.5 transition-colors ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {entry.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <span className="text-muted-foreground">Regions:</span>
            {allRegions.length === 0 ? (
              <span className="italic text-muted-foreground">none declared</span>
            ) : (
              allRegions.map((region) => {
                const active = regionFilter.includes(region);
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    aria-pressed={active}
                    className={`rounded-full border px-2 py-0.5 transition-colors ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {region}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex flex-1 items-center gap-2">
            <span className="text-muted-foreground">Set membership:</span>
            <Input
              aria-label="Set membership filter"
              value={setFilter}
              onChange={(event) => setSetFilter(event.target.value)}
              placeholder="e.g. NRG, STD (supports *)"
              className="h-7 w-48 text-xs"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="ag-theme-quartz ag-theme-times h-[560px] w-full">
          <AgGridReact<ItemRow>
            rowData={filteredRows}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={(params) => params.data.id}
            onGridReady={onGridReady}
            onRowClicked={onRowClicked}
            animateRows
            rowSelection={{ mode: "singleRow" }}
          />
        </div>
        {filteredRows.length ? (
          <table className="sr-only" data-testid="items-shadow-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Sector</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  data-testid={`items-row-${row.id}`}
                  onClick={() => onRowClicked({ data: row })}
                >
                  <td>{row.kind}</td>
                  <td>{row.name}</td>
                  <td>{row.sector}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No items match the current filters.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
