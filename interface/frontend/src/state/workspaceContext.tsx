import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type {
  Commodity,
  ModelGraphResponse,
  ParameterRow,
  Process,
  ValidationResponse
} from "../lib/api";

export type SelectedEntity =
  | { kind: "commodity"; name: string }
  | { kind: "process"; name: string }
  | null;

export type WorkspaceData = {
  graph: ModelGraphResponse | null;
  setGraph: (g: ModelGraphResponse | null) => void;
  commodities: Commodity[];
  setCommodities: (items: Commodity[]) => void;
  processes: Process[];
  setProcesses: (items: Process[]) => void;
  parameters: ParameterRow[];
  setParameters: (items: ParameterRow[]) => void;
  validation: ValidationResponse | null;
  setValidation: (v: ValidationResponse | null) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  selected: SelectedEntity;
  selectEntity: (entity: SelectedEntity, options?: { switchToInspector?: boolean }) => void;
  closeInspector: () => void;
  inspectorOpen: boolean;
  setInspectorOpen: (open: boolean) => void;
  reset: () => void;
};

const WorkspaceContext = createContext<WorkspaceData | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [graph, setGraph] = useState<ModelGraphResponse | null>(null);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [parameters, setParameters] = useState<ParameterRow[]>([]);
  const [validation, setValidation] = useState<ValidationResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>("graph");
  const [selected, setSelected] = useState<SelectedEntity>(null);
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  const selectEntity = useCallback<WorkspaceData["selectEntity"]>((entity, options) => {
    setSelected(entity);
    if (entity && options?.switchToInspector !== false) {
      setInspectorOpen(true);
    }
  }, []);

  const closeInspector = useCallback(() => {
    setInspectorOpen(false);
  }, []);

  const reset = useCallback(() => {
    setGraph(null);
    setCommodities([]);
    setProcesses([]);
    setParameters([]);
    setValidation(null);
    setSelected(null);
    setInspectorOpen(false);
  }, []);

  const value = useMemo<WorkspaceData>(
    () => ({
      graph,
      setGraph,
      commodities,
      setCommodities,
      processes,
      setProcesses,
      parameters,
      setParameters,
      validation,
      setValidation,
      activeTab,
      setActiveTab,
      selected,
      selectEntity,
      closeInspector,
      inspectorOpen,
      setInspectorOpen,
      reset
    }),
    [
      graph,
      commodities,
      processes,
      parameters,
      validation,
      activeTab,
      selected,
      selectEntity,
      closeInspector,
      inspectorOpen
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceData {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used inside a WorkspaceProvider.");
  }
  return ctx;
}
