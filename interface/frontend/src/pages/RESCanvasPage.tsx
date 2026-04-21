import dagre from "dagre";
import { Network, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Position,
  type Edge,
  type Node,
  type NodeMouseHandler
} from "reactflow";
import "reactflow/dist/style.css";

import { EmptyState } from "../components/EmptyState";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import type { ApiClientContract, ModelGraphResponse } from "../lib/api";
import { useSessionState } from "../state/sessionStore";
import { useWorkspace } from "../state/workspaceContext";

interface RESCanvasPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

const NODE_WIDTH = 180;
const NODE_HEIGHT = 56;

function layoutGraph(nodes: Node[], edges: Edge[]): Node[] {
  if (!nodes.length) {
    return nodes;
  }
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", nodesep: 32, ranksep: 80 });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return nodes.map((node) => {
    const position = g.node(node.id);
    return {
      ...node,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      position: position
        ? { x: position.x - NODE_WIDTH / 2, y: position.y - NODE_HEIGHT / 2 }
        : { x: 0, y: 0 }
    };
  });
}

function buildNodes(graph: ModelGraphResponse, query: string): Node[] {
  const lower = query.trim().toLowerCase();
  const commodityNodes: Node[] = graph.nodes.commodities.map((c) => {
    const matches = lower ? c.name.toLowerCase().includes(lower) : true;
    return {
      id: `c:${c.name}`,
      type: "default",
      data: {
        label: (
          <div className="flex flex-col gap-0.5 text-left">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-success">
              commodity
            </span>
            <span className="truncate text-sm font-semibold text-foreground">{c.name}</span>
            <span className="text-[11px] text-muted-foreground">
              {c.type}
              {c.unit ? ` • ${c.unit}` : ""}
            </span>
          </div>
        )
      },
      position: { x: 0, y: 0 },
      style: {
        width: NODE_WIDTH,
        background: "hsl(145 55% 96%)",
        border: matches ? "2px solid hsl(145 55% 32%)" : "1px solid hsl(145 25% 75%)",
        borderRadius: 12,
        padding: 10,
        opacity: lower && !matches ? 0.35 : 1
      }
    };
  });

  const processNodes: Node[] = graph.nodes.processes.map((p) => {
    const matches = lower ? p.name.toLowerCase().includes(lower) : true;
    return {
      id: `p:${p.name}`,
      type: "default",
      data: {
        label: (
          <div className="flex flex-col gap-0.5 text-left">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
              process
            </span>
            <span className="truncate text-sm font-semibold text-foreground">{p.name}</span>
            <span className="text-[11px] text-muted-foreground">{p.process_type}</span>
          </div>
        )
      },
      position: { x: 0, y: 0 },
      style: {
        width: NODE_WIDTH,
        background: "hsl(215 70% 96%)",
        border: matches ? "2px solid hsl(215 80% 38%)" : "1px solid hsl(215 30% 75%)",
        borderRadius: 12,
        padding: 10,
        opacity: lower && !matches ? 0.35 : 1
      }
    };
  });

  return [...commodityNodes, ...processNodes];
}

function buildEdges(graph: ModelGraphResponse): Edge[] {
  return graph.edges.map((e, idx) => {
    const isInput = e.direction === "input";
    const source = isInput ? `c:${e.from}` : `p:${e.from}`;
    const target = isInput ? `p:${e.to}` : `c:${e.to}`;
    return {
      id: `e-${idx}-${e.from}-${e.to}-${e.direction}`,
      source,
      target,
      animated: false,
      style: {
        stroke: isInput ? "hsl(215 80% 50%)" : "hsl(145 55% 40%)",
        strokeWidth: 1.4
      }
    };
  });
}

export function RESCanvasPage({ apiClient, onError, onSuccess }: RESCanvasPageProps) {
  const session = useSessionState();
  const workspace = useWorkspace();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const graph = workspace.graph;

  useEffect(() => {
    if (session.sessionId && !graph && !loading) {
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.sessionId]);

  const load = async () => {
    if (!session.sessionId) return;
    setLoading(true);
    try {
      const payload = await apiClient.getGraph(session.sessionId);
      workspace.setGraph(payload);
      onSuccess("Graph loaded.");
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const { nodes, edges } = useMemo(() => {
    if (!graph) return { nodes: [] as Node[], edges: [] as Edge[] };
    const baseNodes = buildNodes(graph, query);
    const baseEdges = buildEdges(graph);
    return { nodes: layoutGraph(baseNodes, baseEdges), edges: baseEdges };
  }, [graph, query]);

  const counts = useMemo(() => {
    if (!graph) return null;
    return {
      commodities: graph.nodes.commodities.length,
      processes: graph.nodes.processes.length,
      edges: graph.edges.length
    };
  }, [graph]);

  const onNodeClick: NodeMouseHandler = (_event, node) => {
    const [kindShort, ...rest] = node.id.split(":");
    const name = rest.join(":");
    if (kindShort === "c") {
      workspace.selectEntity({ kind: "commodity", name });
    } else if (kindShort === "p") {
      workspace.selectEntity({ kind: "process", name });
    }
  };

  if (!session.sessionId) {
    return (
      <EmptyState
        icon={Network}
        title="No session is open"
        description="Open a model from the sidebar to render its reference energy system."
      />
    );
  }

  return (
    <Card className="flex h-[calc(100vh-220px)] min-h-[480px] flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <div className="flex items-center gap-3">
          <CardTitle className="flex items-center gap-2">
            <Network className="size-4 text-primary" /> Reference Energy System
          </CardTitle>
          {counts ? (
            <div
              className="flex items-center gap-2 text-xs text-muted-foreground"
              data-testid="graph-counts"
            >
              <Badge variant="success">commodities: {counts.commodities}</Badge>
              <Badge variant="default">processes: {counts.processes}</Badge>
              <Badge variant="outline">edges: {counts.edges}</Badge>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search graph"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search nodes…"
              className="h-8 w-56 pl-7 text-sm"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={load}
            disabled={loading}
            aria-label="Refresh graph"
          >
            <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
            Refresh graph
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative flex-1 overflow-hidden p-0">
        {graph ? (
          <div className="absolute inset-0">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={onNodeClick}
              fitView
              proOptions={{ hideAttribution: true }}
            >
              <MiniMap pannable zoomable className="!rounded-md !border !border-border" />
              <Controls position="bottom-left" />
              <Background gap={18} color="hsl(215 18% 88%)" />
            </ReactFlow>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading graph…
          </div>
        )}
      </CardContent>
    </Card>
  );
}
