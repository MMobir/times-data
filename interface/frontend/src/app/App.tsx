import {
  BarChart3,
  BookOpen,
  Boxes,
  GitCompare,
  Layers,
  List,
  ListChecks,
  Network,
  Sigma,
  Stethoscope,
  TableProperties,
  TerminalSquare,
  Workflow
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";

import { EntityInspector } from "../components/EntityInspector";
import { Sidebar } from "../components/shell/Sidebar";
import { TopBar } from "../components/shell/TopBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { TooltipProvider } from "../components/ui/tooltip";
import { WikiCommandPalette } from "../components/wiki/WikiCommandPalette";
import { WikiPopover } from "../components/wiki/WikiPopover";
import { WikiViewerProvider } from "../components/wiki/WikiViewerContext";
import { api, type ApiClientContract } from "../lib/api";
import { AttributesPage } from "../pages/AttributesPage";
import { BrowsePage } from "../pages/BrowsePage";
import { DDPage } from "../pages/DDPage";
import { DiagnosePage } from "../pages/DiagnosePage";
import { DiffPage } from "../pages/DiffPage";
import { EntitiesPage } from "../pages/EntitiesPage";
import { ItemsDetailsPage } from "../pages/ItemsDetailsPage";
import { ItemsListPage } from "../pages/ItemsListPage";
import { ParametersPage } from "../pages/ParametersPage";
import { PatchPage } from "../pages/PatchPage";
import { RESCanvasPage } from "../pages/RESCanvasPage";
import { ResultsPage } from "../pages/ResultsPage";
import { ValidationPage } from "../pages/ValidationPage";
import { sessionStore } from "../state/sessionStore";
import { useWorkspace, WorkspaceProvider } from "../state/workspaceContext";

type Notice = { tone: "success" | "error"; text: string } | null;

const TAB_CONFIG: Array<{ value: string; label: string; icon: typeof Network }> = [
  { value: "graph", label: "Graph", icon: Network },
  { value: "items", label: "Items", icon: List },
  { value: "details", label: "Details", icon: Workflow },
  { value: "browse", label: "Browse", icon: TableProperties },
  { value: "attributes", label: "Attributes", icon: BookOpen },
  { value: "parameters", label: "Parameters", icon: Sigma },
  { value: "entities", label: "Entities", icon: Boxes },
  { value: "validation", label: "Validation", icon: ListChecks },
  { value: "diagnose", label: "Diagnose", icon: Stethoscope },
  { value: "diff", label: "Diff", icon: GitCompare },
  { value: "patch", label: "Patch", icon: Layers },
  { value: "results", label: "Results", icon: BarChart3 },
  { value: "dd", label: "DD I/O", icon: TerminalSquare }
];

export function App({ apiClient = api }: { apiClient?: ApiClientContract }) {
  return (
    <TooltipProvider delayDuration={150}>
      <WikiViewerProvider apiClient={apiClient}>
        <WorkspaceProvider>
          <Toaster position="bottom-right" richColors closeButton />
          <AppInner apiClient={apiClient} />
          <WikiPopover />
          <WikiCommandPalette />
        </WorkspaceProvider>
      </WikiViewerProvider>
    </TooltipProvider>
  );
}

function AppInner({ apiClient }: { apiClient: ApiClientContract }) {
  const workspace = useWorkspace();
  const [notice, setNotice] = useState<Notice>(null);

  const [workspaceModelPath, setWorkspaceModelPath] = useState("");
  const [workspaceSavePath, setWorkspaceSavePath] = useState("");

  const onError = useCallback((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    setNotice({ tone: "error", text: message });
    toast.error(message);
  }, []);

  const onSuccess = useCallback((text: string) => {
    setNotice({ tone: "success", text });
    toast.success(text);
  }, []);

  const openSession = async () => {
    if (!workspaceModelPath.trim()) {
      onError(new Error("Model path is required."));
      return;
    }
    try {
      const opened = await apiClient.openSession(workspaceModelPath.trim());
      sessionStore.setOpened(opened);
      setWorkspaceSavePath(opened.model_path);
      workspace.reset();
      onSuccess(`Opened session ${opened.session_id}`);
    } catch (error) {
      onError(error);
    }
  };

  const saveSession = async () => {
    const sessionId = sessionStore.getSnapshot().sessionId;
    if (!sessionId) {
      onError(new Error("Open a session before using model operations."));
      return;
    }
    try {
      const saved = await apiClient.saveSession(sessionId, workspaceSavePath.trim() || undefined);
      sessionStore.setSaved(saved);
      onSuccess("Session saved.");
    } catch (error) {
      onError(error);
    }
  };

  const closeSession = async () => {
    const sessionId = sessionStore.getSnapshot().sessionId;
    if (!sessionId) return;
    try {
      await apiClient.closeSession(sessionId);
      sessionStore.clear();
      workspace.reset();
      onSuccess("Session closed.");
    } catch (error) {
      onError(error);
    }
  };

  const graphSummary = useMemo(() => {
    const graph = workspace.graph;
    if (!graph) return null;
    return {
      commodities: graph.nodes.commodities.length,
      processes: graph.nodes.processes.length,
      edges: graph.edges.length
    };
  }, [workspace.graph]);

  return (
    <div className="flex h-screen min-h-screen flex-col bg-background text-foreground">
      <TopBar graphSummary={graphSummary} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          workspaceModelPath={workspaceModelPath}
          setWorkspaceModelPath={setWorkspaceModelPath}
          workspaceSavePath={workspaceSavePath}
          setWorkspaceSavePath={setWorkspaceSavePath}
          onOpenSession={openSession}
          onSaveSession={saveSession}
          onCloseSession={closeSession}
        />
        <main
          className="min-w-0 flex-1 overflow-auto p-4 lg:p-6"
          data-testid="app-main"
        >
          <Tabs
            value={workspace.activeTab}
            onValueChange={workspace.setActiveTab}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-3">
              <TabsList className="flex h-auto flex-wrap">
                {TAB_CONFIG.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger key={value} value={value}>
                    <Icon className="size-3.5" />
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="graph">
              <RESCanvasPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="items">
              <ItemsListPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="details">
              <ItemsDetailsPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="browse">
              <BrowsePage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="attributes">
              <AttributesPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="parameters">
              <ParametersPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="entities">
              <EntitiesPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="validation">
              <ValidationPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="diagnose">
              <DiagnosePage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="diff">
              <DiffPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="patch">
              <PatchPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="results">
              <ResultsPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
            <TabsContent value="dd">
              <DDPage apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
            </TabsContent>
          </Tabs>

          {notice ? (
            <p
              className={
                notice.tone === "error"
                  ? "mt-3 text-sm text-destructive"
                  : "mt-3 text-sm text-success"
              }
              role={notice.tone === "error" ? "alert" : "status"}
            >
              {notice.text}
            </p>
          ) : null}
        </main>
      </div>
      <EntityInspector apiClient={apiClient} onError={onError} onSuccess={onSuccess} />
    </div>
  );
}
