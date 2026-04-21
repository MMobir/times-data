import type { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { BookOpen, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useWikiViewer } from "../components/wiki/WikiViewerContext";
import type { ApiClientContract, WikiListItem } from "../lib/api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface AttributesPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

type AttributeType = "parameter" | "set" | "index";
type DomainFilter = "all" | "user_input" | "internal" | "result";

const DOMAIN_OPTIONS: Array<{ value: DomainFilter; label: string; match: (item: WikiListItem) => boolean }> = [
  { value: "all", label: "All", match: () => true },
  {
    value: "user_input",
    label: "User Input",
    match: (item) => /user/i.test(item.category ?? "")
  },
  {
    value: "internal",
    label: "Derived (Internal)",
    match: (item) => /internal|derived/i.test(item.category ?? "")
  },
  {
    value: "result",
    label: "Result",
    match: (item) => /result/i.test(item.category ?? "")
  }
];

interface AttributeRow {
  id: string;
  slug: string;
  name: string;
  indexes: string;
  category: string;
  defaultIE: string;
  description: string;
  raw: WikiListItem;
}

function listItemToRow(item: WikiListItem): AttributeRow {
  const description = item.description ?? "";
  return {
    id: `${item.type}:${item.slug}`,
    slug: item.slug,
    name: item.title,
    indexes: item.indexes ? item.indexes.join(", ") : "",
    category: item.category ?? "",
    defaultIE: item.default_ie ?? "",
    description: description.length > 240 ? `${description.slice(0, 239)}…` : description,
    raw: item
  };
}

export function AttributesPage({ apiClient, onError, onSuccess }: AttributesPageProps) {
  const wikiViewer = useWikiViewer();
  const gridApiRef = useRef<GridApi<AttributeRow> | null>(null);

  const [type, setType] = useState<AttributeType>("parameter");
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState<DomainFilter>("all");
  const [items, setItems] = useState<WikiListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async (nextType: AttributeType = type) => {
    setLoading(true);
    try {
      const response = await apiClient.listWiki({ types: [nextType] });
      setItems(response.hits);
      onSuccess(`Loaded ${response.hits.length} ${nextType} entries from the wiki.`);
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.setGridOption("quickFilterText", search);
    }
  }, [search]);

  const filteredRows = useMemo<AttributeRow[]>(() => {
    const matcher = DOMAIN_OPTIONS.find((d) => d.value === domain) ?? DOMAIN_OPTIONS[0];
    const needle = search.trim().toLowerCase();
    return items
      .filter((item) => {
        if (!matcher.match(item)) return false;
        if (!needle) return true;
        return (
          item.title.toLowerCase().includes(needle) ||
          item.slug.toLowerCase().includes(needle)
        );
      })
      .map(listItemToRow);
  }, [items, domain, search]);

  const columnDefs = useMemo<ColDef<AttributeRow>[]>(
    () => [
      {
        headerName: "Name",
        field: "name",
        pinned: "left",
        minWidth: 180,
        sortable: true,
        cellClass: "font-mono",
        cellRenderer: (params: ICellRendererParams<AttributeRow>) => {
          const row = params.data;
          if (!row) return null;
          return (
            <button
              type="button"
              onClick={() =>
                wikiViewer.openWiki(
                  type === "parameter"
                    ? { kind: "parameter", name: row.name }
                    : { kind: "entry", slug: row.slug }
                )
              }
              className="text-primary hover:underline"
            >
              {row.name}
            </button>
          );
        }
      },
      {
        headerName: "Indexes",
        field: "indexes",
        minWidth: 200,
        sortable: true,
        cellClass: "font-mono text-xs"
      },
      {
        headerName: "Category",
        field: "category",
        width: 160,
        sortable: true
      },
      {
        headerName: "Default I/E",
        field: "defaultIE",
        width: 130,
        sortable: true
      },
      {
        headerName: "Description",
        field: "description",
        flex: 1,
        minWidth: 280
      }
    ],
    [type, wikiViewer]
  );

  const defaultColDef = useMemo<ColDef<AttributeRow>>(
    () => ({
      resizable: true,
      filter: true,
      sortable: true
    }),
    []
  );

  const onGridReady = (event: GridReadyEvent<AttributeRow>) => {
    gridApiRef.current = event.api;
    if (search) {
      event.api.setGridOption("quickFilterText", search);
    }
  };

  const onRowClicked = (params: { data?: AttributeRow }) => {
    const row = params.data;
    if (!row) return;
    wikiViewer.openWiki(
      type === "parameter"
        ? { kind: "parameter", name: row.name }
        : { kind: "entry", slug: row.slug }
    );
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex flex-col gap-3 space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="size-4 text-primary" /> Attributes
            <Badge variant="muted">{filteredRows.length} of {items.length}</Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search attributes"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name…"
                className="h-8 w-64 pl-7 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => void load(type)} disabled={loading}>
              <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
              Reload
            </Button>
          </div>
        </div>
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-3 rounded-md border border-border bg-card/80 px-3 py-2 text-xs">
          <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
            <span className="px-2 text-muted-foreground">Type</span>
            {(["parameter", "set", "index"] satisfies AttributeType[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                aria-pressed={type === value}
                className={`rounded px-2 py-0.5 capitalize ${
                  type === value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-muted-foreground">Domain:</span>
            {DOMAIN_OPTIONS.map((option) => {
              const active = domain === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDomain(option.value)}
                  aria-pressed={active}
                  className={`rounded-full border px-2 py-0.5 ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="ag-theme-quartz ag-theme-times h-[560px] w-full">
          <AgGridReact<AttributeRow>
            rowData={filteredRows}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={(params) => params.data.id}
            onGridReady={onGridReady}
            onRowClicked={onRowClicked}
            animateRows
          />
        </div>
        {filteredRows.length ? (
          <table className="sr-only" data-testid="attributes-shadow-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Indexes</th>
                <th>Category</th>
                <th>Default I/E</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  data-testid={`attributes-row-${row.slug}`}
                  onClick={() => onRowClicked({ data: row })}
                >
                  <td>
                    <button
                      type="button"
                      data-testid={`attributes-open-${row.slug}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onRowClicked({ data: row });
                      }}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td>{row.indexes}</td>
                  <td>{row.category}</td>
                  <td>{row.defaultIE}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            {loading ? "Loading wiki entries…" : "No attributes match the current filters."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
