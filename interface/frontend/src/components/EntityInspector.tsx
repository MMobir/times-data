import { ArrowDownLeft, ArrowUpRight, Info, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Separator } from "./ui/separator";
import { ParameterDoctorButton } from "./wiki/ParameterDoctorButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "./ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import type {
  ApiClientContract,
  Commodity,
  ParameterRow,
  Process,
  ProcessFlow,
  ValidationMessage
} from "../lib/api";
import { sessionStore, useSessionState } from "../state/sessionStore";
import { useWorkspace } from "../state/workspaceContext";

interface EntityInspectorProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

export function EntityInspector({ apiClient, onError, onSuccess }: EntityInspectorProps) {
  const session = useSessionState();
  const workspace = useWorkspace();
  const { selected, inspectorOpen, setInspectorOpen } = workspace;

  const commodity = useMemo<Commodity | null>(() => {
    if (!selected || selected.kind !== "commodity") return null;
    return workspace.commodities.find((c) => c.name === selected.name) ?? null;
  }, [selected, workspace.commodities]);

  const process = useMemo<Process | null>(() => {
    if (!selected || selected.kind !== "process") return null;
    return workspace.processes.find((p) => p.name === selected.name) ?? null;
  }, [selected, workspace.processes]);

  const relatedParameters = useMemo<ParameterRow[]>(() => {
    if (!selected) return [];
    return workspace.parameters.filter((row) => {
      const indexes = row.indexes;
      const candidates = ["c", "commodity", "p", "process"];
      return candidates.some((key) => {
        const value = indexes[key];
        return typeof value === "string" && value === selected.name;
      });
    });
  }, [selected, workspace.parameters]);

  const relatedValidation = useMemo<ValidationMessage[]>(() => {
    if (!selected || !workspace.validation) return [];
    return [...workspace.validation.errors, ...workspace.validation.warnings].filter(
      (m) => m.entity === selected.name
    );
  }, [selected, workspace.validation]);

  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("NRG");
  const [processType, setProcessType] = useState("STD");
  const [processDescription, setProcessDescription] = useState("");

  const [newFlowCommodity, setNewFlowCommodity] = useState("");
  const [newFlowDirection, setNewFlowDirection] = useState<"input" | "output">("output");

  useEffect(() => {
    if (commodity) {
      setDescription(commodity.description);
      setUnit(commodity.unit);
      setType(commodity.type || "NRG");
    }
  }, [commodity]);

  useEffect(() => {
    if (process) {
      setProcessType(process.process_type || "STD");
      setProcessDescription(process.description);
    }
  }, [process]);

  if (!selected) return null;

  const saveCommodity = async () => {
    if (!session.sessionId || !commodity) return;
    try {
      const mutation = await apiClient.updateCommodity({
        sessionId: session.sessionId,
        name: commodity.name,
        type,
        unit,
        description
      });
      sessionStore.applyChange(mutation);
      onSuccess(`Commodity ${commodity.name} updated.`);
      const refreshed = await apiClient.listCommodities(session.sessionId);
      workspace.setCommodities(refreshed.items);
    } catch (error) {
      onError(error);
    }
  };

  const saveProcess = async () => {
    if (!session.sessionId || !process) return;
    try {
      const mutation = await apiClient.updateProcess({
        sessionId: session.sessionId,
        name: process.name,
        description: processDescription,
        processType
      });
      sessionStore.applyChange(mutation);
      onSuccess(`Process ${process.name} updated.`);
      const refreshed = await apiClient.listProcesses(session.sessionId);
      workspace.setProcesses(refreshed.items);
    } catch (error) {
      onError(error);
    }
  };

  const updateProcessFlows = async (newInputs: ProcessFlow[], newOutputs: ProcessFlow[]) => {
    if (!session.sessionId || !process) return;
    try {
      const mutation = await apiClient.updateProcess({
        sessionId: session.sessionId,
        name: process.name,
        inputs: newInputs.map((flow) => ({ commodity: flow.commodity, group: flow.group })),
        outputs: newOutputs.map((flow) => ({ commodity: flow.commodity, group: flow.group }))
      });
      sessionStore.applyChange(mutation);
      const refreshed = await apiClient.listProcesses(session.sessionId);
      workspace.setProcesses(refreshed.items);
      onSuccess(`Process ${process.name} flows updated.`);
    } catch (error) {
      onError(error);
    }
  };

  const addFlow = () => {
    if (!process || !newFlowCommodity.trim()) return;
    const next: ProcessFlow = {
      commodity: newFlowCommodity.trim(),
      group: "",
      efficiency: null,
      emission_factor: null,
      share: null
    };
    if (newFlowDirection === "input") {
      void updateProcessFlows([next, ...process.inputs], process.outputs);
    } else {
      void updateProcessFlows(process.inputs, [next, ...process.outputs]);
    }
    setNewFlowCommodity("");
  };

  const removeFlow = (commodityName: string, direction: "input" | "output") => {
    if (!process) return;
    if (direction === "input") {
      void updateProcessFlows(
        process.inputs.filter((i) => i.commodity !== commodityName),
        process.outputs
      );
    } else {
      void updateProcessFlows(
        process.inputs,
        process.outputs.filter((o) => o.commodity !== commodityName)
      );
    }
  };

  return (
    <Sheet open={inspectorOpen} onOpenChange={setInspectorOpen}>
      <SheetContent
        side="right"
        className="overflow-y-auto"
        data-testid="entity-inspector"
      >
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Badge variant={selected.kind === "process" ? "default" : "success"}>
              {selected.kind}
            </Badge>
            <SheetTitle>{selected.name}</SheetTitle>
          </div>
          <SheetDescription>
            Inspect, edit, and trace usage of this entity across the open model.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 p-4">
          {commodity ? (
            <section className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Commodity details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="commodity-edit-type">Type</Label>
                  <Select
                    id="commodity-edit-type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    <option value="NRG">NRG</option>
                    <option value="MAT">MAT</option>
                    <option value="DEM">DEM</option>
                    <option value="ENV">ENV</option>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="commodity-edit-unit">Unit</Label>
                  <Input
                    id="commodity-edit-unit"
                    value={unit}
                    onChange={(event) => setUnit(event.target.value)}
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <Label htmlFor="commodity-edit-description">Description</Label>
                  <Input
                    id="commodity-edit-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>
              <Button size="sm" onClick={saveCommodity} className="self-start">
                <Save className="size-4" /> Save commodity
              </Button>
            </section>
          ) : null}

          {process ? (
            <section className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Process details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="process-edit-type">Process type</Label>
                  <Input
                    id="process-edit-type"
                    value={processType}
                    onChange={(event) => setProcessType(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="process-edit-description">Description</Label>
                  <Input
                    id="process-edit-description"
                    value={processDescription}
                    onChange={(event) => setProcessDescription(event.target.value)}
                  />
                </div>
              </div>
              <Button size="sm" onClick={saveProcess} className="self-start">
                <Save className="size-4" /> Save process
              </Button>

              <Separator />

              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Inputs / outputs
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <FlowList
                  title="Inputs"
                  icon={<ArrowDownLeft className="size-4 text-success" />}
                  flows={process.inputs}
                  onRemove={(name) => removeFlow(name, "input")}
                />
                <FlowList
                  title="Outputs"
                  icon={<ArrowUpRight className="size-4 text-primary" />}
                  flows={process.outputs}
                  onRemove={(name) => removeFlow(name, "output")}
                />
              </div>
              <div className="flex flex-wrap items-end gap-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="add-flow-commodity">Commodity</Label>
                  <Input
                    id="add-flow-commodity"
                    aria-label="New flow commodity"
                    value={newFlowCommodity}
                    onChange={(event) => setNewFlowCommodity(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="add-flow-direction">Direction</Label>
                  <Select
                    id="add-flow-direction"
                    value={newFlowDirection}
                    onChange={(event) =>
                      setNewFlowDirection(event.target.value as "input" | "output")
                    }
                  >
                    <option value="input">input</option>
                    <option value="output">output</option>
                  </Select>
                </div>
                <Button size="sm" onClick={addFlow} disabled={!newFlowCommodity.trim()}>
                  <Plus className="size-4" /> Add flow
                </Button>
              </div>
            </section>
          ) : null}

          <Separator />

          <section className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Related parameters{" "}
              <Badge variant="muted" className="ml-1">
                {relatedParameters.length}
              </Badge>
            </h4>
            {relatedParameters.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Indexes</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relatedParameters.map((row, index) => (
                    <TableRow key={`${row.parameter}-${index}`}>
                      <TableCell className="font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <ParameterDoctorButton parameter={row.parameter} />
                          {row.parameter}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {JSON.stringify(row.indexes)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                No parameters reference this entity. Load parameters from the Parameters tab to populate this view.
              </p>
            )}
          </section>

          <Separator />

          <section className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Validation messages{" "}
              <Badge variant="muted" className="ml-1">
                {relatedValidation.length}
              </Badge>
            </h4>
            {relatedValidation.length ? (
              <ul className="flex flex-col gap-2">
                {relatedValidation.map((m, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-2 text-sm"
                  >
                    <Badge
                      variant={m.level === "error" ? "destructive" : "warning"}
                      className="shrink-0"
                    >
                      {m.level}
                    </Badge>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{m.message}</span>
                      <span className="text-xs text-muted-foreground">{m.hint}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="size-4" /> No validation messages for this entity.
              </p>
            )}
          </section>
        </div>

        <SheetFooter>
          <Button
            variant="ghost"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => {
              if (!session.sessionId) return;
              if (commodity) {
                void apiClient
                  .deleteCommodity(session.sessionId, commodity.name)
                  .then((mutation) => {
                    sessionStore.applyChange(mutation);
                    workspace.setCommodities(
                      workspace.commodities.filter((c) => c.name !== commodity.name)
                    );
                    workspace.closeInspector();
                    onSuccess(`Commodity ${commodity.name} deleted.`);
                  })
                  .catch(onError);
              } else if (process) {
                void apiClient
                  .deleteProcess(session.sessionId, process.name)
                  .then((mutation) => {
                    sessionStore.applyChange(mutation);
                    workspace.setProcesses(
                      workspace.processes.filter((p) => p.name !== process.name)
                    );
                    workspace.closeInspector();
                    onSuccess(`Process ${process.name} deleted.`);
                  })
                  .catch(onError);
              }
            }}
          >
            <Trash2 className="size-4" /> Delete entity
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function FlowList({
  title,
  icon,
  flows,
  onRemove
}: {
  title: string;
  icon: React.ReactNode;
  flows: ProcessFlow[];
  onRemove: (name: string) => void;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-2">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        {icon}
        {title}
      </div>
      {flows.length ? (
        <ul className="flex flex-col gap-1">
          {flows.map((flow) => (
            <li
              key={flow.commodity}
              className="flex items-center justify-between gap-2 rounded-sm bg-muted/40 px-2 py-1 text-sm"
            >
              <span className="font-medium">{flow.commodity}</span>
              <Button
                size="icon"
                variant="ghost"
                className="size-6 text-destructive hover:bg-destructive/10"
                onClick={() => onRemove(flow.commodity)}
                aria-label={`Remove ${flow.commodity}`}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-1 text-xs text-muted-foreground">No flows.</p>
      )}
    </div>
  );
}
