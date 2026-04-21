import { BarChart3, FolderOpen } from "lucide-react";
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
import type { ApiClientContract, ResultsOpenResponse } from "../lib/api";

interface ResultsPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

export function ResultsPage({ apiClient, onError, onSuccess }: ResultsPageProps) {
  const [resultsPath, setResultsPath] = useState("");
  const [results, setResults] = useState<ResultsOpenResponse | null>(null);

  const openResults = async () => {
    try {
      if (!resultsPath.trim()) {
        throw new Error("Results path is required.");
      }
      const payload = await apiClient.openResults(resultsPath.trim());
      setResults(payload);
      onSuccess(`Loaded ${payload.tables.length} result table(s).`);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-4 text-primary" /> Results
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="results-path">Results path</Label>
            <Input
              id="results-path"
              aria-label="Results path"
              value={resultsPath}
              onChange={(event) => setResultsPath(event.target.value)}
              placeholder="/path/to/results"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={openResults} className="w-full md:w-auto">
              <FolderOpen className="size-4" /> Open results
            </Button>
          </div>
        </CardContent>
      </Card>

      {results ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              Tables
              <Badge variant="muted">{results.tables.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.tables.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Columns</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.tables.map((table) => (
                    <TableRow key={table.path}>
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{table.format}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{table.row_count}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {table.columns.join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">No tables found at this path.</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          icon={BarChart3}
          title="No results loaded"
          description="Provide a results directory above to inspect available tables."
        />
      )}
    </div>
  );
}
