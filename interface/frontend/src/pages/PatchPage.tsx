import { CheckCircle2, Eye, Layers, Save, Sigma } from "lucide-react";
import { useState } from "react";

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
import type { ApiClientContract, ParameterRow, PatchPreviewRow } from "../lib/api";
import { sessionStore, useSessionState } from "../state/sessionStore";

interface PatchPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

export function PatchPage({ apiClient, onError, onSuccess }: PatchPageProps) {
  const session = useSessionState();
  const [patchParameter, setPatchParameter] = useState("NCAP_COST");
  const [patchIndexes, setPatchIndexes] = useState('{"r":"R1","datayear":2030}');
  const [patchValue, setPatchValue] = useState("900");
  const [previewRows, setPreviewRows] = useState<PatchPreviewRow[]>([]);

  const buildRow = (): ParameterRow => {
    const value = Number(patchValue);
    if (!Number.isFinite(value)) {
      throw new Error("Patch value must be numeric.");
    }
    const indexes = JSON.parse(patchIndexes.trim() || "{}") as Record<string, unknown>;
    return {
      parameter: patchParameter.trim(),
      indexes,
      value
    };
  };

  const previewPatch = async () => {
    if (!session.sessionId) return;
    try {
      const payload = await apiClient.previewPatch(session.sessionId, buildRow());
      setPreviewRows(payload.rows);
      onSuccess("Patch preview generated.");
    } catch (error) {
      onError(error);
    }
  };

  const applyPatch = async () => {
    if (!session.sessionId) return;
    try {
      const payload = await apiClient.applyPatch(session.sessionId, buildRow());
      sessionStore.applyChange(payload);
      setPreviewRows(payload.rows);
      onSuccess("Patch applied.");
    } catch (error) {
      onError(error);
    }
  };

  if (!session.sessionId) {
    return (
      <EmptyState
        icon={Layers}
        title="No session is open"
        description="Open a model from the sidebar to preview and apply parameter patches."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Layers className="size-4 text-primary" /> Patch parameter
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="patch-parameter">Parameter</Label>
            <Input
              id="patch-parameter"
              aria-label="Patch parameter"
              value={patchParameter}
              onChange={(event) => setPatchParameter(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5 lg:col-span-2">
            <Label htmlFor="patch-indexes">Indexes (JSON)</Label>
            <Input
              id="patch-indexes"
              aria-label="Patch indexes"
              value={patchIndexes}
              onChange={(event) => setPatchIndexes(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="patch-value">Value</Label>
            <Input
              id="patch-value"
              aria-label="Patch value"
              value={patchValue}
              onChange={(event) => setPatchValue(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:col-span-4">
            <Button variant="outline" onClick={previewPatch}>
              <Eye className="size-4" /> Preview patch
            </Button>
            <Button onClick={applyPatch}>
              <Save className="size-4" /> Apply patch
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sigma className="size-4 text-muted-foreground" /> Preview / apply result
          </CardTitle>
        </CardHeader>
        <CardContent>
          {previewRows.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Indexes</TableHead>
                  <TableHead>Old value</TableHead>
                  <TableHead>New value</TableHead>
                  <TableHead>Changed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewRows.map((row, index) => (
                  <TableRow key={`${row.parameter}-${index}`}>
                    <TableCell className="font-medium">{row.parameter}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {JSON.stringify(row.indexes)}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {row.old_value === null ? "null" : row.old_value}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{row.value}</TableCell>
                    <TableCell>
                      {row.changed ? (
                        <Badge variant="success">
                          <CheckCircle2 className="size-3" /> {String(row.changed)}
                        </Badge>
                      ) : (
                        <Badge variant="muted">{String(row.changed)}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              Run "Preview patch" to inspect the change before applying it.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
