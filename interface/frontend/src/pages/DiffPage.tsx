import { ArrowLeftRight, GitCompare, Minus, Plus, RefreshCw } from "lucide-react";
import { useState, type ReactNode } from "react";

import { EmptyState } from "../components/EmptyState";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import type {
  ApiClientContract,
  DiffEntityChange,
  DiffParameterChange,
  DiffResponse
} from "../lib/api";
import { classifyValueDelta, formatNumber } from "../lib/utils";

interface DiffPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

interface DiffSummary {
  added_commodities: number;
  removed_commodities: number;
  changed_commodities: number;
  added_processes: number;
  removed_processes: number;
  changed_processes: number;
  added_parameters: number;
  removed_parameters: number;
  changed_parameters: number;
}

function summarize(diff: DiffResponse): DiffSummary {
  return {
    added_commodities: diff.added_commodities.length,
    removed_commodities: diff.removed_commodities.length,
    changed_commodities: diff.changed_commodities.length,
    added_processes: diff.added_processes.length,
    removed_processes: diff.removed_processes.length,
    changed_processes: diff.changed_processes.length,
    added_parameters: diff.added_parameters.length,
    removed_parameters: diff.removed_parameters.length,
    changed_parameters: diff.changed_parameters.length
  };
}

function NameList({ names, tone }: { names: string[]; tone: "added" | "removed" }) {
  if (!names.length) {
    return <p className="text-sm text-muted-foreground">No entries.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">Δ</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {names.map((name) => (
          <TableRow key={name}>
            <TableCell>
              <Badge variant={tone === "added" ? "success" : "destructive"}>
                {tone === "added" ? <Plus className="size-3" /> : <Minus className="size-3" />}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">{name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function EntityChangesTable({ changes }: { changes: DiffEntityChange[] }) {
  if (!changes.length) {
    return <p className="text-sm text-muted-foreground">No entries.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Entity</TableHead>
          <TableHead>Field</TableHead>
          <TableHead>Before</TableHead>
          <TableHead>After</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {changes.flatMap((change) =>
          Object.entries(change.fields).map(([field, [before, after]]) => (
            <TableRow key={`${change.name}-${field}`}>
              <TableCell className="font-medium">{change.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{field}</TableCell>
              <TableCell className="font-mono text-xs">{String(before)}</TableCell>
              <TableCell className="font-mono text-xs">{String(after)}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function ParameterChangesTable({
  changes,
  variant
}: {
  changes: DiffParameterChange[];
  variant: "added" | "removed" | "changed";
}) {
  if (!changes.length) {
    return <p className="text-sm text-muted-foreground">No entries.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Parameter</TableHead>
          <TableHead>Indexes</TableHead>
          {variant !== "added" ? <TableHead>Before</TableHead> : null}
          {variant !== "removed" ? <TableHead>After</TableHead> : null}
          {variant === "changed" ? <TableHead>Δ</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {changes.map((row, index) => {
          const delta = classifyValueDelta(row.old_value, row.new_value);
          return (
            <TableRow key={`${row.parameter}-${index}`}>
              <TableCell className="font-medium">{row.parameter}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {JSON.stringify(row.indexes)}
              </TableCell>
              {variant !== "added" ? (
                <TableCell className="font-mono text-xs">
                  {row.old_value === null ? "—" : formatNumber(row.old_value)}
                </TableCell>
              ) : null}
              {variant !== "removed" ? (
                <TableCell className="font-mono text-xs">
                  {row.new_value === null ? "—" : formatNumber(row.new_value)}
                </TableCell>
              ) : null}
              {variant === "changed" ? (
                <TableCell>
                  {delta.absolute !== null ? (
                    <Badge variant={delta.absolute >= 0 ? "success" : "destructive"}>
                      {delta.absolute >= 0 ? "+" : ""}
                      {formatNumber(delta.absolute)}
                      {delta.relative !== null
                        ? ` (${delta.relative >= 0 ? "+" : ""}${formatNumber(delta.relative, {
                            maximumFractionDigits: 1
                          })}%)`
                        : ""}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              ) : null}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function DiffPage({ apiClient, onError, onSuccess }: DiffPageProps) {
  const [leftPath, setLeftPath] = useState("");
  const [rightPath, setRightPath] = useState("");
  const [diffData, setDiffData] = useState<DiffResponse | null>(null);

  const runDiff = async () => {
    try {
      if (!leftPath.trim() || !rightPath.trim()) {
        throw new Error("Both model directories are required.");
      }
      const payload = await apiClient.diff(leftPath.trim(), rightPath.trim());
      setDiffData(payload);
      onSuccess("Diff complete.");
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="size-4 text-primary" /> Diff models
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[1fr_auto_1fr_auto]">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="diff-left">Left model path</Label>
            <Input
              id="diff-left"
              aria-label="Left model path"
              value={leftPath}
              onChange={(event) => setLeftPath(event.target.value)}
              placeholder="/path/to/baseline"
            />
          </div>
          <div className="hidden items-end justify-center xl:flex">
            <ArrowLeftRight className="mb-2 size-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="diff-right">Right model path</Label>
            <Input
              id="diff-right"
              aria-label="Right model path"
              value={rightPath}
              onChange={(event) => setRightPath(event.target.value)}
              placeholder="/path/to/scenario"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={runDiff} className="w-full md:w-auto">
              <RefreshCw className="size-4" /> Run diff
            </Button>
          </div>
        </CardContent>
      </Card>

      {diffData ? (
        <DiffResultsView diff={diffData} />
      ) : (
        <EmptyState
          icon={GitCompare}
          title="No diff yet"
          description="Provide two model directories above and run diff to compare commodities, processes, and parameters."
        />
      )}
    </div>
  );
}

function DiffResultsView({ diff }: { diff: DiffResponse }) {
  const summary = summarize(diff);
  return (
    <Tabs defaultValue="commodities" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="commodities">
            Commodities
            <Badge variant="muted" className="ml-1">
              {summary.added_commodities + summary.removed_commodities + summary.changed_commodities}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="processes">
            Processes
            <Badge variant="muted" className="ml-1">
              {summary.added_processes + summary.removed_processes + summary.changed_processes}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="parameters">
            Parameters
            <Badge variant="muted" className="ml-1">
              {summary.added_parameters + summary.removed_parameters + summary.changed_parameters}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <pre
          aria-label="Diff summary"
          className="rounded-md border border-border bg-muted/40 px-3 py-1 font-mono text-[11px] leading-tight text-muted-foreground"
        >
          {`"changed_parameters": ${summary.changed_parameters}`}
        </pre>
      </div>

      <TabsContent value="commodities" className="mt-0">
        <DiffSection
          added={<NameList names={diff.added_commodities} tone="added" />}
          removed={<NameList names={diff.removed_commodities} tone="removed" />}
          changed={<EntityChangesTable changes={diff.changed_commodities} />}
        />
      </TabsContent>

      <TabsContent value="processes" className="mt-0">
        <DiffSection
          added={<NameList names={diff.added_processes} tone="added" />}
          removed={<NameList names={diff.removed_processes} tone="removed" />}
          changed={<EntityChangesTable changes={diff.changed_processes} />}
        />
      </TabsContent>

      <TabsContent value="parameters" className="mt-0">
        <DiffSection
          added={<ParameterChangesTable changes={diff.added_parameters} variant="added" />}
          removed={<ParameterChangesTable changes={diff.removed_parameters} variant="removed" />}
          changed={<ParameterChangesTable changes={diff.changed_parameters} variant="changed" />}
        />
      </TabsContent>
    </Tabs>
  );
}

function DiffSection({
  added,
  removed,
  changed
}: {
  added: ReactNode;
  removed: ReactNode;
  changed: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Plus className="size-4 text-success" /> Added
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">{added}</CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Minus className="size-4 text-destructive" /> Removed
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">{removed}</CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <ArrowLeftRight className="size-4 text-primary" /> Changed
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">{changed}</CardContent>
      </Card>
    </div>
  );
}
