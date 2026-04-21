import type { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import dagre from "dagre";
import {
  Boxes,
  Cpu,
  Download,
  ExternalLink,
  Layers,
  Search,
  Workflow
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Position,
  type Edge,
  type Node,
  type NodeMouseHandler
} from "reactflow";
import "reactflow/dist/style.css";

import { EmptyState } from "../components/EmptyState";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { ParameterDoctorButton } from "../components/wiki/ParameterDoctorButton";
import type {
  ApiClientContract,
  Commodity,
  ParameterRow,
  Process
} from "../lib/api";
import { useSessionState } from "../state/sessionStore";
import { useWorkspace, type SelectedEntity } from "../state/workspaceContext";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface ItemsDetailsPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

type ListTab = "process" | "commodity";

const NODE_WIDTH = 170;
const NODE_HEIGHT = 56;

const TS_LEVEL_DEFAULT = "ANNUAL";

interface CubeRow {
  id: string;
  parameter: string;
  region: string;
  year: string;
  process: string;
  commodity: string;
  currency: string;
  value: number;
  other: Record<string, unknown>;
  original: ParameterRow;
}

const RESERVED_INDEX_KEYS = new Set([
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

function pickIndex(indexes: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = indexes[key];
    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }
  return "";
}

function paramToRow(row: ParameterRow, idx: number): CubeRow {
  const other: Record<string, unknown> = {};
  Object.entries(row.indexes).forEach(([key, value]) => {
    if (!RESERVED_INDEX_KEYS.has(key)) {
      other[key] = value;
    }
  });
  return {
    id: `${row.parameter}|${idx}|${JSON.stringify(row.indexes)}`,
    parameter: row.parameter,
    region: pickIndex(row.indexes, "r", "region"),
    year: pickIndex(row.indexes, "datayear", "year"),
    process: pickIndex(row.indexes, "p", "process"),
    commodity: pickIndex(row.indexes, "c", "commodity"),
    currency: pickIndex(row.indexes, "cur", "currency"),
    value: row.value,
    other,
    original: row
  };
}

function layoutGraph(nodes: Node[], edges: Edge[]): Node[] {
  if (!nodes.length) return nodes;
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", nodesep: 24, ranksep: 80 });
  g.setDefaultEdgeLabel(() => ({}));
  nodes.forEach((node) => {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });
  dagre.layout(g);
  return nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      position: pos
        ? { x: pos.x - NODE_WIDTH / 2, y: pos.y - NODE_HEIGHT / 2 }
        : { x: 0, y: 0 }
    };
  });
}

function entityMatchesParameter(entity: SelectedEntity, row: ParameterRow): boolean {
  if (!entity) return false;
  for (const value of Object.values(row.indexes)) {
    if (typeof value === "string" && value === entity.name) {
      return true;
    }
  }
  return false;
}

export function ItemsDetailsPage({ apiClient, onError, onSuccess }: ItemsDetailsPageProps) {
  const session = useSessionState();
  const workspace = useWorkspace();
  const gridApiRef = useRef<GridApi<CubeRow> | null>(null);

  const [listTab, setListTab] = useState<ListTab>("process");
  const [listSearch, setListSearch] = useState("");
  const [cubeQuickFilter, setCubeQuickFilter] = useState("");
  const [groupBy, setGroupBy] = useState<"none" | "parameter" | "year" | "region">("none");

  const sessionId = session.sessionId;
  const selected = workspace.selected;

  const ensureLoaded = async () => {
    if (!sessionId) return;
    try {
      const tasks: Promise<unknown>[] = [];
      if (workspace.commodities.length === 0) {
        tasks.push(
          apiClient
            .listCommodities(sessionId)
            .then((payload) => workspace.setCommodities(payload.items))
        );
      }
      if (workspace.processes.length === 0) {
        tasks.push(
          apiClient
            .listProcesses(sessionId)
            .then((payload) => workspace.setProcesses(payload.items))
        );
      }
      if (workspace.parameters.length === 0) {
        tasks.push(
          apiClient
            .listParameters(sessionId)
            .then((payload) => workspace.setParameters(payload.items))
        );
      }
      if (tasks.length) {
        await Promise.all(tasks);
        onSuccess("Loaded model details.");
      }
    } catch (error) {
      onError(error);
    }
  };

  useEffect(() => {
    void ensureLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.setGridOption("quickFilterText", cubeQuickFilter);
    }
  }, [cubeQuickFilter]);

  const focusedProcess = useMemo<Process | null>(() => {
    if (!selected || selected.kind !== "process") return null;
    return workspace.processes.find((p) => p.name === selected.name) ?? null;
  }, [selected, workspace.processes]);

  const focusedCommodity = useMemo<Commodity | null>(() => {
    if (!selected || selected.kind !== "commodity") return null;
    return workspace.commodities.find((c) => c.name === selected.name) ?? null;
  }, [selected, workspace.commodities]);

  const filteredList = useMemo(() => {
    const needle = listSearch.trim().toLowerCase();
    if (listTab === "process") {
      return workspace.processes
        .filter((p) => !needle || p.name.toLowerCase().includes(needle))
        .map((p) => ({ kind: "process" as const, name: p.name, sub: p.process_type }));
    }
    return workspace.commodities
      .filter((c) => !needle || c.name.toLowerCase().includes(needle))
      .map((c) => ({ kind: "commodity" as const, name: c.name, sub: c.type }));
  }, [listTab, listSearch, workspace.processes, workspace.commodities]);

  const flowGraph = useMemo<{ nodes: Node[]; edges: Edge[] }>(() => {
    if (!selected) return { nodes: [], edges: [] };

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const focusId = `${selected.kind === "process" ? "p" : "c"}:${selected.name}`;
    nodes.push({
      id: focusId,
      type: "default",
      data: {
        label: (
          <div className="flex flex-col gap-0.5 text-left">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
              {selected.kind}
            </span>
            <span className="truncate text-sm font-semibold text-foreground">{selected.name}</span>
          </div>
        )
      },
      position: { x: 0, y: 0 },
      style: {
        width: NODE_WIDTH,
        background: "hsl(215 70% 92%)",
        border: "2px solid hsl(215 80% 38%)",
        borderRadius: 12,
        padding: 8
      }
    });

    if (focusedProcess) {
      focusedProcess.inputs.forEach((flow) => {
        const id = `c:${flow.commodity}`;
        nodes.push({
          id,
          type: "default",
          data: {
            label: (
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-success">
                  commodity
                </span>
                <span className="truncate text-sm font-semibold">{flow.commodity}</span>
              </div>
            )
          },
          position: { x: 0, y: 0 },
          style: {
            width: NODE_WIDTH,
            background: "hsl(145 55% 96%)",
            border: "1px solid hsl(145 25% 70%)",
            borderRadius: 12,
            padding: 8
          }
        });
        edges.push({
          id: `e-in-${flow.commodity}`,
          source: id,
          target: focusId,
          style: { stroke: "hsl(215 80% 50%)", strokeWidth: 1.4 }
        });
      });
      focusedProcess.outputs.forEach((flow) => {
        const id = `c:${flow.commodity}`;
        if (!nodes.some((n) => n.id === id)) {
          nodes.push({
            id,
            type: "default",
            data: {
              label: (
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-success">
                    commodity
                  </span>
                  <span className="truncate text-sm font-semibold">{flow.commodity}</span>
                </div>
              )
            },
            position: { x: 0, y: 0 },
            style: {
              width: NODE_WIDTH,
              background: "hsl(145 55% 96%)",
              border: "1px solid hsl(145 25% 70%)",
              borderRadius: 12,
              padding: 8
            }
          });
        }
        edges.push({
          id: `e-out-${flow.commodity}`,
          source: focusId,
          target: id,
          style: { stroke: "hsl(145 55% 40%)", strokeWidth: 1.4 }
        });
      });
    } else if (focusedCommodity) {
      const producers: Process[] = [];
      const consumers: Process[] = [];
      workspace.processes.forEach((p) => {
        if (p.outputs.some((flow) => flow.commodity === focusedCommodity.name)) {
          producers.push(p);
        }
        if (p.inputs.some((flow) => flow.commodity === focusedCommodity.name)) {
          consumers.push(p);
        }
      });
      producers.forEach((p) => {
        const id = `p:${p.name}`;
        nodes.push({
          id,
          type: "default",
          data: {
            label: (
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                  process
                </span>
                <span className="truncate text-sm font-semibold">{p.name}</span>
              </div>
            )
          },
          position: { x: 0, y: 0 },
          style: {
            width: NODE_WIDTH,
            background: "hsl(215 70% 96%)",
            border: "1px solid hsl(215 30% 70%)",
            borderRadius: 12,
            padding: 8
          }
        });
        edges.push({
          id: `e-prod-${p.name}`,
          source: id,
          target: focusId,
          style: { stroke: "hsl(145 55% 40%)", strokeWidth: 1.4 }
        });
      });
      consumers.forEach((p) => {
        const id = `p:${p.name}`;
        if (!nodes.some((n) => n.id === id)) {
          nodes.push({
            id,
            type: "default",
            data: {
              label: (
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                    process
                  </span>
                  <span className="truncate text-sm font-semibold">{p.name}</span>
                </div>
              )
            },
            position: { x: 0, y: 0 },
            style: {
              width: NODE_WIDTH,
              background: "hsl(215 70% 96%)",
              border: "1px solid hsl(215 30% 70%)",
              borderRadius: 12,
              padding: 8
            }
          });
        }
        edges.push({
          id: `e-cons-${p.name}`,
          source: focusId,
          target: id,
          style: { stroke: "hsl(215 80% 50%)", strokeWidth: 1.4 }
        });
      });
    }

    return { nodes: layoutGraph(nodes, edges), edges };
  }, [selected, focusedProcess, focusedCommodity, workspace.processes]);

  const cubeRows = useMemo<CubeRow[]>(() => {
    if (!selected) return [];
    return workspace.parameters
      .filter((row) => entityMatchesParameter(selected, row))
      .map((row, idx) => paramToRow(row, idx));
  }, [selected, workspace.parameters]);

  const dynamicCubeColumns = useMemo<string[]>(() => {
    const keys = new Set<string>();
    cubeRows.forEach((row) => Object.keys(row.other).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [cubeRows]);

  const cubeColumnDefs = useMemo<ColDef<CubeRow>[]>(() => {
    const dynamicCols: ColDef<CubeRow>[] = dynamicCubeColumns.map((key) => ({
      headerName: key,
      field: `other.${key}` as keyof CubeRow & string,
      valueGetter: (params) => params.data?.other[key] ?? "",
      filter: "agTextColumnFilter",
      sortable: true,
      minWidth: 110
    }));
    const cols: ColDef<CubeRow>[] = [
      {
        headerName: "Parameter",
        field: "parameter",
        pinned: "left",
        minWidth: 200,
        rowGroup: groupBy === "parameter",
        hide: groupBy === "parameter",
        cellRenderer: (params: ICellRendererParams<CubeRow>) => {
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
        width: 110,
        rowGroup: groupBy === "region",
        hide: groupBy === "region"
      },
      {
        headerName: "Year",
        field: "year",
        width: 100,
        rowGroup: groupBy === "year",
        hide: groupBy === "year"
      },
      { headerName: "Process", field: "process", width: 140 },
      { headerName: "Commodity", field: "commodity", width: 140 },
      { headerName: "Currency", field: "currency", width: 110 },
      ...dynamicCols,
      {
        headerName: "Value",
        field: "value",
        type: "numericColumn",
        width: 130,
        valueFormatter: (params) =>
          typeof params.value === "number" ? params.value.toLocaleString() : ""
      }
    ];
    return cols;
  }, [dynamicCubeColumns, groupBy]);

  const cubeDefaultColDef = useMemo<ColDef<CubeRow>>(
    () => ({
      resizable: true,
      filter: true,
      sortable: true
    }),
    []
  );

  const exportCsv = () => {
    if (!gridApiRef.current) return;
    const csv = gridApiRef.current.getDataAsCsv();
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `parameter-cube-${selected?.name ?? "export"}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const onCubeGridReady = (event: GridReadyEvent<CubeRow>) => {
    gridApiRef.current = event.api;
    if (cubeQuickFilter) {
      event.api.setGridOption("quickFilterText", cubeQuickFilter);
    }
  };

  const cascadeToNode: NodeMouseHandler = (_event, node) => {
    const [kind, ...rest] = node.id.split(":");
    const name = rest.join(":");
    if (!name) return;
    if (kind === "p") {
      workspace.selectEntity({ kind: "process", name }, { switchToInspector: false });
    } else if (kind === "c") {
      workspace.selectEntity({ kind: "commodity", name }, { switchToInspector: false });
    }
  };

  if (!sessionId) {
    return (
      <EmptyState
        icon={Workflow}
        title="No session is open"
        description="Open a model from the sidebar to inspect items in detail."
      />
    );
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <CardTitle className="flex items-center gap-2">
          <Workflow className="size-4 text-primary" /> Items Details
        </CardTitle>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="muted">{workspace.processes.length} processes</Badge>
          <Badge variant="muted">{workspace.commodities.length} commodities</Badge>
          <Badge variant="muted">{workspace.parameters.length} parameter rows</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid h-[calc(100vh-280px)] min-h-[640px] grid-cols-1 gap-3 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside
          className="flex min-h-0 flex-col gap-2 rounded-md border border-border bg-card/40 p-2"
          data-testid="items-details-list"
        >
          <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 text-xs">
            {([
              { value: "process", label: "Process", icon: Cpu },
              { value: "commodity", label: "Commodity", icon: Boxes }
            ] satisfies Array<{ value: ListTab; label: string; icon: typeof Cpu }>).map(
              ({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setListTab(value)}
                  aria-pressed={listTab === value}
                  className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-1 ${
                    listTab === value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-3" />
                  {label}
                </button>
              )
            )}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search items details list"
              value={listSearch}
              onChange={(event) => setListSearch(event.target.value)}
              placeholder="Search…"
              className="h-8 pl-7 text-sm"
            />
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto text-sm">
            {filteredList.length ? (
              filteredList.map((item) => {
                const active = selected?.kind === item.kind && selected?.name === item.name;
                return (
                  <li key={`${item.kind}:${item.name}`}>
                    <button
                      type="button"
                      onClick={() =>
                        workspace.selectEntity(
                          { kind: item.kind, name: item.name },
                          { switchToInspector: false }
                        )
                      }
                      onDoubleClick={() =>
                        workspace.selectEntity(
                          { kind: item.kind, name: item.name },
                          { switchToInspector: false }
                        )
                      }
                      data-testid={`details-list-item-${item.name}`}
                      className={`flex w-full items-center justify-between gap-2 rounded px-2 py-1 text-left text-xs ${
                        active
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="truncate font-mono">{item.name}</span>
                      <span className="shrink-0 text-[10px] uppercase text-muted-foreground">
                        {item.sub}
                      </span>
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-2 py-1 text-xs italic text-muted-foreground">
                No items in this list.
              </li>
            )}
          </ul>
        </aside>

        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-3">
          <section
            className="grid gap-3 rounded-md border border-border bg-card/30 p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
            data-testid="items-details-declaration"
          >
            {selected ? (
              <>
                <div
                  className="flex flex-col gap-2 text-sm"
                  data-testid="items-details-declaration-card"
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={selected.kind === "process" ? "default" : "success"}
                      className="uppercase"
                    >
                      {selected.kind}
                    </Badge>
                    <span
                      className="font-mono text-base font-semibold"
                      data-testid="items-details-name"
                    >
                      {selected.name}
                    </span>
                  </div>
                  <DeclarationRow
                    process={focusedProcess}
                    commodity={focusedCommodity}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => workspace.setInspectorOpen(true)}
                    className="self-start"
                  >
                    <ExternalLink className="size-3.5" />
                    Open inspector
                  </Button>
                </div>
                <div
                  className="relative h-[300px] w-full overflow-hidden rounded-md border border-border bg-background"
                  data-testid="items-details-graph"
                >
                  <ReactFlow
                    nodes={flowGraph.nodes}
                    edges={flowGraph.edges}
                    onNodeClick={cascadeToNode}
                    fitView
                    proOptions={{ hideAttribution: true }}
                  >
                    <Background gap={16} color="hsl(215 18% 90%)" />
                  </ReactFlow>
                  <ul className="sr-only" data-testid="items-details-neighbors">
                    {flowGraph.nodes
                      .filter((n) => {
                        const focusId = `${selected.kind === "process" ? "p" : "c"}:${selected.name}`;
                        return n.id !== focusId;
                      })
                      .map((node) => {
                        const [kind, ...rest] = node.id.split(":");
                        const name = rest.join(":");
                        return (
                          <li key={node.id}>
                            <button
                              type="button"
                              data-testid={`details-neighbor-${name}`}
                              onClick={() =>
                                workspace.selectEntity(
                                  {
                                    kind: kind === "p" ? "process" : "commodity",
                                    name
                                  },
                                  { switchToInspector: false }
                                )
                              }
                            >
                              {kind === "p" ? "process" : "commodity"} {name}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </>
            ) : (
              <div className="col-span-2 py-8 text-center text-sm text-muted-foreground">
                Pick a process or commodity from the list to view its declaration and RES neighbourhood.
              </div>
            )}
          </section>

          <section className="flex min-h-0 flex-col gap-2 rounded-md border border-border bg-card/30 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Layers className="size-4 text-primary" />
                <span className="font-semibold">Parameter cube</span>
                <Badge variant="muted">{cubeRows.length} rows</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Input
                  aria-label="Filter parameter cube"
                  value={cubeQuickFilter}
                  onChange={(event) => setCubeQuickFilter(event.target.value)}
                  placeholder="Quick filter…"
                  className="h-7 w-44 text-xs"
                />
                <label className="flex items-center gap-1">
                  Group by
                  <Select
                    aria-label="Group parameter cube by"
                    value={groupBy}
                    onChange={(event) =>
                      setGroupBy(event.target.value as typeof groupBy)
                    }
                    className="h-7 w-32 text-xs"
                  >
                    <option value="none">None</option>
                    <option value="parameter">Parameter</option>
                    <option value="year">Year</option>
                    <option value="region">Region</option>
                  </Select>
                </label>
                <Button variant="outline" size="sm" onClick={exportCsv}>
                  <Download className="size-3.5" />
                  CSV
                </Button>
              </div>
            </div>
            <div className="ag-theme-quartz ag-theme-times min-h-0 flex-1">
              <AgGridReact<CubeRow>
                rowData={cubeRows}
                columnDefs={cubeColumnDefs}
                defaultColDef={cubeDefaultColDef}
                onGridReady={onCubeGridReady}
                animateRows
                groupDisplayType="groupRows"
              />
            </div>
            {cubeRows.length ? (
              <table className="sr-only" data-testid="cube-shadow-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Process</th>
                    <th>Commodity</th>
                    <th>Region</th>
                    <th>Year</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {cubeRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.parameter}</td>
                      <td>{row.process}</td>
                      <td>{row.commodity}</td>
                      <td>{row.region}</td>
                      <td>{row.year}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-xs text-muted-foreground">
                No parameter rows reference this item. Load parameters to populate the cube.
              </p>
            )}
          </section>
        </div>
      </CardContent>
    </Card>
  );
}

interface DeclarationRowProps {
  process: Process | null;
  commodity: Commodity | null;
}

function DeclarationRow({ process, commodity }: DeclarationRowProps) {
  if (process) {
    return (
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <Term label="Type" value={process.process_type} />
        <Term label="Description" value={process.description || "—"} />
        <Term label="Region(s)" value={process.regions.join(", ") || "—"} />
        <Term label="Primary group" value={process.primary_group || "—"} />
        <Term label="Inputs" value={process.inputs.map((f) => f.commodity).join(", ") || "—"} />
        <Term label="Outputs" value={process.outputs.map((f) => f.commodity).join(", ") || "—"} />
        <Term label="TS-level" value={TS_LEVEL_DEFAULT} />
        <Term label="Vintage" value="no" />
      </dl>
    );
  }
  if (commodity) {
    return (
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <Term label="Type" value={commodity.type} />
        <Term label="Description" value={commodity.description || "—"} />
        <Term label="Unit" value={commodity.unit || "—"} />
        <Term label="TS-level" value={commodity.timeslice_level || TS_LEVEL_DEFAULT} />
        <Term label="Balance" value={commodity.balance_type || "—"} />
      </dl>
    );
  }
  return (
    <p className="text-xs italic text-muted-foreground">
      Item details will appear once available in the workspace.
    </p>
  );
}

function Term({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="truncate font-mono">{value}</dd>
    </>
  );
}
