import type {
  CellEditingStoppedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  RowSelectedEvent
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Plus, RefreshCw, Save, Search, Sigma, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { Badge } from "../components/ui/badge";
import { ParameterDoctorButton } from "../components/wiki/ParameterDoctorButton";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../components/ui/sheet";
import type { ApiClientContract, ParameterRow } from "../lib/api";
import { sessionStore, useSessionState } from "../state/sessionStore";
import { useWorkspace } from "../state/workspaceContext";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface ParametersPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

interface Row {
  id: string;
  parameter: string;
  region: string;
  year: string | number;
  process: string;
  commodity: string;
  currency: string;
  value: number;
  other: Record<string, unknown>;
  original: ParameterRow;
}

const INDEX_KEYS = new Set([
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

function rowKey(row: ParameterRow): string {
  return `${row.parameter}|${JSON.stringify(row.indexes)}`;
}

function pick(indexes: Record<string, unknown>, ...keys: string[]): string | number {
  for (const key of keys) {
    if (indexes[key] !== undefined && indexes[key] !== null) {
      const v = indexes[key];
      return typeof v === "number" || typeof v === "string" ? v : String(v);
    }
  }
  return "";
}

function toRows(items: ParameterRow[]): Row[] {
  return items.map((item) => {
    const other: Record<string, unknown> = {};
    Object.entries(item.indexes).forEach(([key, value]) => {
      if (!INDEX_KEYS.has(key)) {
        other[key] = value;
      }
    });
    return {
      id: rowKey(item),
      parameter: item.parameter,
      region: String(pick(item.indexes, "r", "region")),
      year: pick(item.indexes, "datayear", "year"),
      process: String(pick(item.indexes, "p", "process")),
      commodity: String(pick(item.indexes, "c", "commodity")),
      currency: String(pick(item.indexes, "cur", "currency")),
      value: item.value,
      other,
      original: item
    };
  });
}

export function ParametersPage({ apiClient, onError, onSuccess }: ParametersPageProps) {
  const session = useSessionState();
  const workspace = useWorkspace();
  const [filter, setFilter] = useState("");
  const [quickFilter, setQuickFilter] = useState("");
  const [pendingEdits, setPendingEdits] = useState<Record<string, ParameterRow>>({});
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [draftParameter, setDraftParameter] = useState("NCAP_COST");
  const [draftIndexes, setDraftIndexes] = useState('{"r":"R1","datayear":2030}');
  const [draftValue, setDraftValue] = useState("1000");
  const gridApiRef = useRef<GridApi<Row> | null>(null);

  const rows = useMemo(() => toRows(workspace.parameters), [workspace.parameters]);

  const dynamicColumns = useMemo(() => {
    const keys = new Set<string>();
    rows.forEach((r) => Object.keys(r.other).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [rows]);

  const columnDefs = useMemo<ColDef<Row>[]>(() => {
    const dynamicCols: ColDef<Row>[] = dynamicColumns.map((key) => ({
      headerName: key,
      field: `other.${key}` as keyof Row & string,
      valueGetter: (params) => params.data?.other[key] ?? "",
      filter: "agTextColumnFilter",
      sortable: true,
      minWidth: 110
    }));
    return [
      {
        headerName: "Parameter",
        field: "parameter",
        pinned: "left",
        minWidth: 180,
        filter: "agTextColumnFilter",
        sortable: true,
        cellRenderer: (params: ICellRendererParams<Row>) => {
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
      { headerName: "Region", field: "region", filter: true, sortable: true, minWidth: 100 },
      { headerName: "Year", field: "year", filter: true, sortable: true, minWidth: 100 },
      { headerName: "Process", field: "process", filter: true, sortable: true, minWidth: 130 },
      {
        headerName: "Commodity",
        field: "commodity",
        filter: true,
        sortable: true,
        minWidth: 130
      },
      { headerName: "Currency", field: "currency", filter: true, sortable: true, minWidth: 100 },
      ...dynamicCols,
      {
        headerName: "Value",
        field: "value",
        sortable: true,
        editable: true,
        cellEditor: "agNumberCellEditor",
        type: "numericColumn",
        minWidth: 120,
        cellRenderer: (params: ICellRendererParams<Row>) => {
          const row = params.data;
          if (!row) return null;
          const edited = pendingEdits[row.id];
          const isDirty = edited && edited.value !== row.original.value;
          return (
            <span className={isDirty ? "font-semibold text-primary" : undefined}>
              {params.value}
            </span>
          );
        }
      }
    ];
  }, [dynamicColumns, pendingEdits]);

  const defaultColDef = useMemo<ColDef<Row>>(
    () => ({
      resizable: true,
      filter: true,
      floatingFilter: false,
      flex: 1
    }),
    []
  );

  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.setGridOption("quickFilterText", quickFilter);
    }
  }, [quickFilter]);

  const load = async () => {
    if (!session.sessionId) return;
    try {
      const payload = await apiClient.listParameters(
        session.sessionId,
        filter.trim() || undefined
      );
      workspace.setParameters(payload.items);
      setPendingEdits({});
      onSuccess(`Loaded ${payload.items.length} parameters.`);
    } catch (error) {
      onError(error);
    }
  };

  const onGridReady = (event: GridReadyEvent<Row>) => {
    gridApiRef.current = event.api;
    if (quickFilter) {
      event.api.setGridOption("quickFilterText", quickFilter);
    }
  };

  const onCellEditingStopped = (event: CellEditingStoppedEvent<Row>) => {
    const row = event.data;
    if (!row) return;
    const newValue = Number(event.newValue);
    if (!Number.isFinite(newValue)) return;
    if (newValue === row.original.value) {
      const next = { ...pendingEdits };
      delete next[row.id];
      setPendingEdits(next);
      return;
    }
    setPendingEdits((prev) => ({
      ...prev,
      [row.id]: {
        parameter: row.parameter,
        indexes: row.original.indexes,
        value: newValue
      }
    }));
  };

  const applyChanges = async () => {
    if (!session.sessionId) return;
    const edits = Object.values(pendingEdits);
    if (!edits.length) {
      onSuccess("No pending edits.");
      return;
    }
    try {
      let lastDirty = false;
      for (const edit of edits) {
        const result = await apiClient.applyPatch(session.sessionId, edit);
        sessionStore.applyChange(result);
        lastDirty = result.dirty;
      }
      onSuccess(`Applied ${edits.length} parameter change${edits.length === 1 ? "" : "s"}.`);
      void lastDirty;
      await load();
    } catch (error) {
      onError(error);
    }
  };

  const onRowSelected = (event: RowSelectedEvent<Row>) => {
    const selected = event.api.getSelectedRows().map((r) => r.id);
    setSelectedRowIds(selected);
  };

  const onRowDoubleClicked = (params: { data?: Row }) => {
    if (!params.data) return;
    const row = params.data;
    if (row.commodity) {
      workspace.selectEntity({ kind: "commodity", name: row.commodity });
    } else if (row.process) {
      workspace.selectEntity({ kind: "process", name: row.process });
    }
  };

  const deleteSelected = async () => {
    if (!session.sessionId) return;
    if (!selectedRowIds.length) return;
    const toDelete = workspace.parameters.filter((p) => selectedRowIds.includes(rowKey(p)));
    try {
      for (const row of toDelete) {
        const result = await apiClient.applyPatch(session.sessionId, {
          parameter: row.parameter,
          indexes: row.indexes,
          value: 0
        });
        sessionStore.applyChange(result);
      }
      onSuccess(`Zeroed ${toDelete.length} parameter row(s).`);
      await load();
    } catch (error) {
      onError(error);
    }
  };

  const submitDraft = async () => {
    if (!session.sessionId) return;
    try {
      const indexes = JSON.parse(draftIndexes.trim() || "{}") as Record<string, unknown>;
      const value = Number(draftValue);
      if (!Number.isFinite(value)) {
        throw new Error("Parameter value must be numeric.");
      }
      const mutation = await apiClient.upsertParameter({
        sessionId: session.sessionId,
        parameter: draftParameter.trim(),
        indexes,
        value
      });
      sessionStore.applyChange(mutation);
      setAddOpen(false);
      onSuccess("Parameter row added.");
      await load();
    } catch (error) {
      onError(error);
    }
  };

  const dirtyCount = Object.keys(pendingEdits).length;

  if (!session.sessionId) {
    return (
      <EmptyState
        icon={Sigma}
        title="No session is open"
        description="Open a model from the sidebar to browse and edit parameter rows."
      />
    );
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex flex-col gap-3 space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <Sigma className="size-4 text-primary" /> Parameters
            {dirtyCount ? (
              <Badge variant="warning" data-testid="parameters-dirty">
                {dirtyCount} unsaved edit{dirtyCount === 1 ? "" : "s"}
              </Badge>
            ) : null}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Quick filter parameters"
                value={quickFilter}
                onChange={(event) => setQuickFilter(event.target.value)}
                placeholder="Quick filter…"
                className="h-8 w-56 pl-7 text-sm"
              />
            </div>
            <Input
              aria-label="Filter parameter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Server-side parameter filter (e.g. NCAP_COST)"
              className="h-8 w-72"
            />
            <Button variant="outline" size="sm" onClick={load}>
              <RefreshCw className="size-4" />
              Load parameters
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="size-4" /> Add row
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={deleteSelected}
              disabled={!selectedRowIds.length}
            >
              <Trash2 className="size-4" /> Delete
            </Button>
            <Button
              size="sm"
              variant="default"
              onClick={applyChanges}
              disabled={!dirtyCount}
              data-testid="apply-parameter-changes"
            >
              <Save className="size-4" /> Apply changes
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="ag-theme-quartz ag-theme-times h-[540px] w-full">
          <AgGridReact<Row>
            rowData={rows}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={(params) => params.data.id}
            onGridReady={onGridReady}
            onCellEditingStopped={onCellEditingStopped}
            onRowSelected={onRowSelected}
            onRowDoubleClicked={onRowDoubleClicked}
            rowSelection={{
              mode: "multiRow",
              checkboxes: true,
              headerCheckbox: true,
              enableClickSelection: false
            }}
            animateRows
            stopEditingWhenCellsLoseFocus
          />
        </div>
        {rows.length ? (
          <table className="sr-only" data-testid="parameters-shadow-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Indexes</th>
                <th>Process</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <ParameterDoctorButton parameter={row.parameter} />
                    {row.parameter}
                  </td>
                  <td>{JSON.stringify(row.original.indexes)}</td>
                  <td>{row.process}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No parameters loaded yet. Use "Load parameters" to fetch rows from the active session.
          </p>
        )}
      </CardContent>

      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add parameter row</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="draft-parameter">Parameter</Label>
              <Input
                id="draft-parameter"
                aria-label="Parameter name"
                value={draftParameter}
                onChange={(event) => setDraftParameter(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="draft-indexes">Indexes (JSON)</Label>
              <Input
                id="draft-indexes"
                aria-label="Parameter indexes"
                value={draftIndexes}
                onChange={(event) => setDraftIndexes(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="draft-value">Value</Label>
              <Input
                id="draft-value"
                aria-label="Parameter value"
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
              />
            </div>
          </div>
          <SheetFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitDraft}>Upsert parameter row</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
