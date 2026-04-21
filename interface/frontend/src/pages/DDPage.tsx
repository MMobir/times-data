import { Download, FileInput, Upload } from "lucide-react";
import { useState } from "react";

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
import type { ApiClientContract, DDExportResponse } from "../lib/api";
import { sessionStore, useSessionState } from "../state/sessionStore";

interface DDPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

export function DDPage({ apiClient, onError, onSuccess }: DDPageProps) {
  const session = useSessionState();
  const [ddImportPaths, setDdImportPaths] = useState("");
  const [ddImportModelPath, setDdImportModelPath] = useState("");
  const [ddExportPath, setDdExportPath] = useState("");
  const [exportResult, setExportResult] = useState<DDExportResponse | null>(null);

  const importDd = async () => {
    try {
      const rawPaths = ddImportPaths
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      if (!rawPaths.length) {
        throw new Error("Provide at least one DD file or directory path.");
      }
      const imported = await apiClient.importDd(rawPaths, ddImportModelPath.trim() || undefined);
      sessionStore.setOpened({
        changed: imported.changed,
        changed_count: imported.changed_count,
        touched_entities: imported.touched_entities,
        dirty: imported.dirty,
        session_id: imported.session_id,
        model_path: imported.model_path ?? "",
        summary: imported.summary
      });
      onSuccess(`Imported DD into session ${imported.session_id}.`);
    } catch (error) {
      onError(error);
    }
  };

  const exportDd = async () => {
    if (!session.sessionId) return;
    try {
      if (!ddExportPath.trim()) {
        throw new Error("DD export output path is required.");
      }
      const exported = await apiClient.exportDd(session.sessionId, ddExportPath.trim());
      setExportResult(exported);
      onSuccess(`Exported ${exported.files.length} DD file(s) to ${exported.output_path}.`);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Upload className="size-4 text-primary" /> Import DD
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dd-import-paths">DD paths (comma-separated files or folders)</Label>
            <Input
              id="dd-import-paths"
              aria-label="DD import paths"
              value={ddImportPaths}
              onChange={(event) => setDdImportPaths(event.target.value)}
              placeholder="/path/to/dd-dir,/path/to/BASE.DD"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dd-import-model-path">Model output path (optional)</Label>
            <Input
              id="dd-import-model-path"
              aria-label="DD import model path"
              value={ddImportModelPath}
              onChange={(event) => setDdImportModelPath(event.target.value)}
              placeholder="/path/to/new-model-dir"
            />
          </div>
          <Button onClick={importDd}>
            <FileInput className="size-4" /> Import DD
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Download className="size-4 text-primary" /> Export DD
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dd-export-path">DD export output path</Label>
            <Input
              id="dd-export-path"
              aria-label="DD export output path"
              value={ddExportPath}
              onChange={(event) => setDdExportPath(event.target.value)}
              placeholder="/path/to/dd-build"
            />
          </div>
          <Button onClick={exportDd} disabled={!session.sessionId}>
            <Download className="size-4" /> Export DD
          </Button>
          {exportResult ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Output</span>
                <span className="font-medium">{exportResult.output_path}</span>
                <Badge variant="muted">{exportResult.files.length} file(s)</Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exportResult.files.map((file) => (
                    <TableRow key={file}>
                      <TableCell className="font-mono text-xs">{file}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
