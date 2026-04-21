import { Activity, CircleDot, Database, Search } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useWikiViewer } from "../wiki/WikiViewerContext";
import { useSessionState } from "../../state/sessionStore";

export interface TopBarProps {
  graphSummary: { commodities: number; processes: number; edges: number } | null;
}

export function TopBar({ graphSummary }: TopBarProps) {
  const session = useSessionState();
  const status = session.sessionId ? "Connected" : "Idle";
  const wiki = useWikiViewer();

  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-card/80 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
          <Database className="size-4" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">TIMES Data IDE</span>
          <span className="text-[11px] text-muted-foreground">
            Programmatic modelling layer
          </span>
        </div>
      </div>

      <Separator orientation="vertical" className="h-7" />

      <div
        className="flex min-w-0 items-center gap-2 text-sm"
        data-testid="session-status"
      >
        <span className="text-muted-foreground">session: </span>
        <span className="truncate font-medium">{session.sessionId ?? "none"}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">model path: </span>
        <span className="truncate font-medium">{session.modelPath || "not set"}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">dirty: </span>
        <span className="font-medium">{String(session.dirty)}</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => wiki.togglePalette(true)}
          aria-label="Search wiki"
          data-testid="wiki-search-trigger"
          className="gap-2"
        >
          <Search className="size-3.5" />
          <span className="hidden sm:inline">Search wiki</span>
          <kbd className="hidden rounded border border-border bg-muted px-1 text-[10px] font-mono text-muted-foreground sm:inline">
            ⌘K
          </kbd>
        </Button>
        {graphSummary ? (
          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            <Badge variant="outline">{graphSummary.commodities} commodities</Badge>
            <Badge variant="outline">{graphSummary.processes} processes</Badge>
            <Badge variant="outline">{graphSummary.edges} edges</Badge>
          </div>
        ) : null}
        <Badge variant={session.sessionId ? "success" : "muted"}>
          <CircleDot className="size-3" />
          {status}
        </Badge>
        {session.dirty ? (
          <Badge variant="warning">
            <Activity className="size-3" /> Unsaved
          </Badge>
        ) : null}
      </div>
    </header>
  );
}
