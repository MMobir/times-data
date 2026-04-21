import { FolderOpen, Save, X } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useSessionState } from "../../state/sessionStore";

export interface SidebarProps {
  workspaceModelPath: string;
  setWorkspaceModelPath: (value: string) => void;
  workspaceSavePath: string;
  setWorkspaceSavePath: (value: string) => void;
  onOpenSession: () => void | Promise<void>;
  onSaveSession: () => void | Promise<void>;
  onCloseSession: () => void | Promise<void>;
}

export function Sidebar({
  workspaceModelPath,
  setWorkspaceModelPath,
  workspaceSavePath,
  setWorkspaceSavePath,
  onOpenSession,
  onSaveSession,
  onCloseSession
}: SidebarProps) {
  const session = useSessionState();
  const hasSession = Boolean(session.sessionId);
  const summary = session.summary;

  return (
    <aside className="flex w-72 shrink-0 flex-col gap-3 border-r border-border bg-muted/30 p-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="size-4 text-primary" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="workspace-model-path">Model path</Label>
            <Input
              id="workspace-model-path"
              aria-label="Model path"
              value={workspaceModelPath}
              onChange={(event) => setWorkspaceModelPath(event.target.value)}
              placeholder="/path/to/model"
            />
          </div>
          <Button onClick={onOpenSession} className="w-full">
            Open session
          </Button>

          <Separator />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="workspace-save-path">Save path (optional)</Label>
            <Input
              id="workspace-save-path"
              aria-label="Save path"
              value={workspaceSavePath}
              onChange={(event) => setWorkspaceSavePath(event.target.value)}
              placeholder="/path/to/model"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onSaveSession}
              disabled={!hasSession}
            >
              <Save className="size-4" />
              Save session
            </Button>
            <Button
              variant="ghost"
              className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onCloseSession}
              disabled={!hasSession}
            >
              <X className="size-4" />
              Close session
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Session</span>
            <span className="truncate font-medium">{session.sessionId ?? "none"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Model</span>
            <span className="max-w-[140px] truncate font-medium" title={session.modelPath}>
              {session.modelPath || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Dirty</span>
            {session.dirty ? (
              <Badge variant="warning">Unsaved edits</Badge>
            ) : (
              <Badge variant="muted">Clean</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {summary ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(summary).map(([key, value]) => (
              <div
                key={key}
                className="rounded-md border border-border bg-background/50 px-2 py-1.5"
              >
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {key.replaceAll("_", " ")}
                </div>
                <div className="text-sm font-semibold">
                  {typeof value === "number" ? value : String(value)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </aside>
  );
}
