import { Boxes, Cpu, Plus, RefreshCw, Trash2 } from "lucide-react";
import { type FormEvent, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select } from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";
import type { ApiClientContract } from "../lib/api";
import { sessionStore, useSessionState } from "../state/sessionStore";
import { useWorkspace } from "../state/workspaceContext";

interface EntitiesPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

export function EntitiesPage({ apiClient, onError, onSuccess }: EntitiesPageProps) {
  const session = useSessionState();
  const workspace = useWorkspace();

  const [commodityName, setCommodityName] = useState("");
  const [commodityType, setCommodityType] = useState("NRG");
  const [commodityUnit, setCommodityUnit] = useState("PJ");

  const [processName, setProcessName] = useState("");
  const [processInputCommodity, setProcessInputCommodity] = useState("");
  const [processOutputCommodity, setProcessOutputCommodity] = useState("");

  const hasSession = Boolean(session.sessionId);

  const loadCommodities = async () => {
    if (!session.sessionId) return;
    try {
      const payload = await apiClient.listCommodities(session.sessionId);
      workspace.setCommodities(payload.items);
      onSuccess(`Loaded ${payload.items.length} commodities.`);
    } catch (error) {
      onError(error);
    }
  };

  const loadProcesses = async () => {
    if (!session.sessionId) return;
    try {
      const payload = await apiClient.listProcesses(session.sessionId);
      workspace.setProcesses(payload.items);
      onSuccess(`Loaded ${payload.items.length} processes.`);
    } catch (error) {
      onError(error);
    }
  };

  const createCommodity = async (event: FormEvent) => {
    event.preventDefault();
    if (!session.sessionId) return;
    try {
      if (!commodityName.trim()) {
        throw new Error("Commodity name is required.");
      }
      const mutation = await apiClient.createCommodity({
        sessionId: session.sessionId,
        name: commodityName.trim(),
        type: commodityType,
        unit: commodityUnit.trim()
      });
      sessionStore.applyChange(mutation);
      setCommodityName("");
      await loadCommodities();
      onSuccess("Commodity created.");
    } catch (error) {
      onError(error);
    }
  };

  const removeCommodity = async (name: string) => {
    if (!session.sessionId) return;
    try {
      const mutation = await apiClient.deleteCommodity(session.sessionId, name);
      sessionStore.applyChange(mutation);
      await loadCommodities();
      onSuccess(`Commodity ${name} deleted.`);
    } catch (error) {
      onError(error);
    }
  };

  const createProcess = async (event: FormEvent) => {
    event.preventDefault();
    if (!session.sessionId) return;
    try {
      if (!processName.trim()) {
        throw new Error("Process name is required.");
      }
      const mutation = await apiClient.createProcess({
        sessionId: session.sessionId,
        name: processName.trim(),
        inputCommodity: processInputCommodity.trim() || undefined,
        outputCommodity: processOutputCommodity.trim() || undefined
      });
      sessionStore.applyChange(mutation);
      setProcessName("");
      setProcessInputCommodity("");
      setProcessOutputCommodity("");
      await loadProcesses();
      onSuccess("Process created.");
    } catch (error) {
      onError(error);
    }
  };

  const removeProcess = async (name: string) => {
    if (!session.sessionId) return;
    try {
      const mutation = await apiClient.deleteProcess(session.sessionId, name);
      sessionStore.applyChange(mutation);
      await loadProcesses();
      onSuccess(`Process ${name} deleted.`);
    } catch (error) {
      onError(error);
    }
  };

  if (!session.sessionId) {
    return (
      <EmptyState
        icon={Boxes}
        title="No session is open"
        description="Open a model from the sidebar to create and edit commodities and processes."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Boxes className="size-4 text-success" /> Commodities
            <Badge variant="muted">{workspace.commodities.length}</Badge>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={loadCommodities} disabled={!hasSession}>
            <RefreshCw className="size-4" />
            Load commodities
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form className="grid grid-cols-1 gap-2 sm:grid-cols-4" onSubmit={createCommodity}>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="commodity-name">Commodity name</Label>
              <Input
                id="commodity-name"
                aria-label="Commodity name"
                value={commodityName}
                onChange={(event) => setCommodityName(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="commodity-type">Type</Label>
              <Select
                id="commodity-type"
                aria-label="Commodity type"
                value={commodityType}
                onChange={(event) => setCommodityType(event.target.value)}
              >
                <option value="NRG">NRG</option>
                <option value="MAT">MAT</option>
                <option value="DEM">DEM</option>
                <option value="ENV">ENV</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="commodity-unit">Unit</Label>
              <Input
                id="commodity-unit"
                aria-label="Commodity unit"
                value={commodityUnit}
                onChange={(event) => setCommodityUnit(event.target.value)}
              />
            </div>
            <div className="sm:col-span-4">
              <Button type="submit" disabled={!hasSession} className="w-full sm:w-auto">
                <Plus className="size-4" /> Create commodity
              </Button>
            </div>
          </form>

          {workspace.commodities.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workspace.commodities.map((item) => (
                  <TableRow
                    key={item.name}
                    className="cursor-pointer"
                    onClick={() =>
                      workspace.selectEntity({ kind: "commodity", name: item.name })
                    }
                  >
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={(event) => {
                          event.stopPropagation();
                          void removeCommodity(item.name);
                        }}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              No commodities loaded. Use "Load commodities" to fetch the current list.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Cpu className="size-4 text-primary" /> Processes
            <Badge variant="muted">{workspace.processes.length}</Badge>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={loadProcesses} disabled={!hasSession}>
            <RefreshCw className="size-4" />
            Load processes
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form className="grid grid-cols-1 gap-2 sm:grid-cols-3" onSubmit={createProcess}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="process-name">Process name</Label>
              <Input
                id="process-name"
                aria-label="Process name"
                value={processName}
                onChange={(event) => setProcessName(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="process-input">Input commodity</Label>
              <Input
                id="process-input"
                aria-label="Input commodity"
                value={processInputCommodity}
                onChange={(event) => setProcessInputCommodity(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="process-output">Output commodity</Label>
              <Input
                id="process-output"
                aria-label="Output commodity"
                value={processOutputCommodity}
                onChange={(event) => setProcessOutputCommodity(event.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Button type="submit" disabled={!hasSession} className="w-full sm:w-auto">
                <Plus className="size-4" /> Create process
              </Button>
            </div>
          </form>

          {workspace.processes.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workspace.processes.map((item) => (
                  <TableRow
                    key={item.name}
                    className="cursor-pointer"
                    onClick={() => workspace.selectEntity({ kind: "process", name: item.name })}
                  >
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.process_type}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.description || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={(event) => {
                          event.stopPropagation();
                          void removeProcess(item.name);
                        }}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              No processes loaded. Use "Load processes" to fetch the current list.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
