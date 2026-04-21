import { AlertTriangle, BookOpen, ListChecks, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";
import { useWikiViewer } from "../components/wiki/WikiViewerContext";
import { cn } from "../lib/utils";
import type {
  ApiClientContract,
  GroupedValidationResponse,
  ValidationMessage,
  WikiHit
} from "../lib/api";
import { useSessionState } from "../state/sessionStore";
import { useWorkspace } from "../state/workspaceContext";

interface ValidationPageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

function levelVariant(level: string): "destructive" | "warning" | "muted" {
  if (level.toLowerCase() === "error") return "destructive";
  if (level.toLowerCase() === "warning") return "warning";
  return "muted";
}

const LOOKUP_SCORE_THRESHOLD = 0.45;

export function ValidationPage({ apiClient, onError, onSuccess }: ValidationPageProps) {
  const session = useSessionState();
  const workspace = useWorkspace();
  const wiki = useWikiViewer();

  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [grouped, setGrouped] = useState<GroupedValidationResponse | null>(null);
  const [groupFilter, setGroupFilter] = useState<"all" | "errors" | "warnings">("all");
  const [detailedView, setDetailedView] = useState(false);
  const [running, setRunning] = useState(false);

  const validation = workspace.validation;

  const runValidation = async () => {
    if (!session.sessionId) return;
    setRunning(true);
    let anySuccess = false;
    try {
      const groupedPayload = await apiClient.validateGrouped(session.sessionId);
      setGrouped(groupedPayload);
      anySuccess = true;
    } catch (error) {
      // Grouped endpoint may be unavailable; silently fall back to detailed view.
      void error;
      setGrouped(null);
    }
    try {
      const payload = await apiClient.validate(session.sessionId);
      workspace.setValidation(payload);
      anySuccess = true;
    } catch (error) {
      if (!anySuccess) {
        onError(error);
      }
    }
    setRunning(false);
    if (anySuccess) {
      onSuccess("Validation complete.");
    }
  };

  const messages = useMemo<ValidationMessage[]>(() => {
    if (!validation) return [];
    return [...validation.errors, ...validation.warnings];
  }, [validation]);

  const filtered = useMemo(() => {
    return messages.filter((m) => {
      if (levelFilter !== "all" && m.level.toLowerCase() !== levelFilter) {
        return false;
      }
      if (categoryFilter && !m.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [messages, levelFilter, categoryFilter]);

  const errorCount = grouped?.counts.errors ?? validation?.counts.errors ?? 0;
  const warningCount = grouped?.counts.warnings ?? validation?.counts.warnings ?? 0;
  const totalCount =
    grouped?.counts.total ?? errorCount + warningCount;

  const filteredGroups = useMemo(() => {
    if (!grouped) return [];
    return grouped.groups.filter((group) => {
      if (groupFilter === "errors" && group.level.toLowerCase() !== "error") return false;
      if (groupFilter === "warnings" && group.level.toLowerCase() !== "warning") return false;
      return true;
    });
  }, [grouped, groupFilter]);

  const showGrouped = !detailedView && grouped !== null;

  if (!session.sessionId) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="No session is open"
        description="Open a model from the sidebar to validate its commodities, processes, and parameters."
      />
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col gap-3 space-y-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="size-4 text-primary" /> Validation
          </CardTitle>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="destructive">errors: {errorCount}</Badge>
              <Badge variant="warning">warnings: {warningCount}</Badge>
              <Badge variant="muted">total: {totalCount}</Badge>
            </div>
            <Button size="sm" onClick={runValidation} disabled={running}>
              <ShieldCheck className="size-4" /> Run validate
            </Button>
            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={detailedView}
                onChange={(event) => setDetailedView(event.target.checked)}
                aria-label="Detailed view toggle"
                data-testid="validation-detailed-toggle"
                className="size-3.5"
              />
              Detailed view
            </label>
          </div>
        </div>
        {showGrouped ? (
          <div className="flex flex-wrap items-center gap-1">
            {(["all", "errors", "warnings"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setGroupFilter(key)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                  groupFilter === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {key === "all" ? "All" : key === "errors" ? "Errors" : "Warnings"}
              </button>
            ))}
          </div>
        ) : validation ? (
          <div className="flex flex-wrap items-center gap-2">
            <Select
              aria-label="Filter validation level"
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value)}
              className="h-8 w-32 text-sm"
            >
              <option value="all">All levels</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
            </Select>
            <Input
              aria-label="Filter validation category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              placeholder="Filter by category…"
              className="h-8 w-64"
            />
          </div>
        ) : null}
      </CardHeader>
      <CardContent>
        {showGrouped ? (
          <GroupedValidationView
            groups={filteredGroups}
            totalCount={totalCount}
            onOpenFaq={(slug) => wiki.openWiki({ kind: "faq", slug })}
          />
        ) : validation ? (
          <DetailedValidationView
            messages={filtered}
            apiClient={apiClient}
            onSelectEntity={(entity) => {
              const knownProcess = workspace.processes.some((p) => p.name === entity);
              if (knownProcess) {
                workspace.selectEntity({ kind: "process", name: entity });
              } else if (entity) {
                workspace.selectEntity({ kind: "commodity", name: entity });
              }
            }}
            onOpenWiki={(target) => wiki.openWiki(target)}
          />
        ) : (
          <EmptyState
            icon={ShieldCheck}
            title="Validation has not been run"
            description="Run validation to surface errors, warnings, and inconsistencies in the open model."
          />
        )}
      </CardContent>
    </Card>
  );
}

function GroupedValidationView({
  groups,
  totalCount,
  onOpenFaq
}: {
  groups: GroupedValidationResponse["groups"];
  totalCount: number;
  onOpenFaq: (slug: string) => void;
}) {
  if (!groups.length) {
    if (totalCount === 0) {
      return (
        <EmptyState
          icon={ShieldCheck}
          title="No validation issues"
          description="The active model passes all schema and structural checks."
        />
      );
    }
    return (
      <div className="flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
        <AlertTriangle className="size-4" />
        No groups match the current filter.
      </div>
    );
  }
  return (
    <div
      className="grid grid-cols-1 gap-3 lg:grid-cols-2"
      data-testid="validation-grouped-list"
    >
      {groups.map((group, index) => (
        <Card
          key={`${group.category}-${group.level}-${index}`}
          className="border-border"
          data-testid={`validation-group-${group.category}`}
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <div className="flex items-center gap-2">
              <Badge variant={levelVariant(group.level)}>{group.level}</Badge>
              <CardTitle className="text-sm">{group.category}</CardTitle>
            </div>
            <Badge variant="muted">{group.message_count}</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <ul className="flex flex-col gap-2">
              {group.sample_messages.map((sample, idx) => (
                <li
                  key={`${sample.message}-${idx}`}
                  className="rounded-md border border-border bg-muted/30 p-2 text-xs"
                >
                  <div className="font-medium text-foreground">{sample.message}</div>
                  {sample.entity ? (
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      entity: <span className="font-mono">{sample.entity}</span>
                    </div>
                  ) : null}
                  {sample.hint ? (
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{sample.hint}</div>
                  ) : null}
                </li>
              ))}
            </ul>
            {group.faq_links.length ? (
              <div className="flex flex-wrap gap-2">
                {group.faq_links.map((link) => (
                  <button
                    key={link.slug}
                    type="button"
                    onClick={() => onOpenFaq(link.slug)}
                    data-testid={`validation-faq-${link.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <BookOpen className="size-3 text-primary" />
                    {link.title}
                  </button>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DetailedValidationView({
  messages,
  apiClient,
  onSelectEntity,
  onOpenWiki
}: {
  messages: ValidationMessage[];
  apiClient: ApiClientContract;
  onSelectEntity: (entity: string) => void;
  onOpenWiki: (target: { kind: "parameter"; name: string } | { kind: "entry"; slug: string }) => void;
}) {
  if (!messages.length) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
        <AlertTriangle className="size-4" />
        No messages match the current filters.
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Level</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Hint</TableHead>
          <TableHead className="w-32 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((item, index) => (
          <DetailedRow
            key={`${item.level}-${item.entity}-${index}`}
            message={item}
            apiClient={apiClient}
            onSelectEntity={onSelectEntity}
            onOpenWiki={onOpenWiki}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function DetailedRow({
  message,
  apiClient,
  onSelectEntity,
  onOpenWiki
}: {
  message: ValidationMessage;
  apiClient: ApiClientContract;
  onSelectEntity: (entity: string) => void;
  onOpenWiki: (target: { kind: "parameter"; name: string } | { kind: "entry"; slug: string }) => void;
}) {
  const [lookup, setLookup] = useState<WikiHit | null>(null);

  useEffect(() => {
    let cancelled = false;
    const candidate = extractParameterCandidate(message.message);
    if (!candidate) {
      setLookup(null);
      return;
    }
    apiClient
      .searchWiki(candidate, { limit: 3 })
      .then((response) => {
        if (cancelled) return;
        const top = response.hits[0];
        if (top && top.score >= LOOKUP_SCORE_THRESHOLD) {
          setLookup(top);
        } else {
          setLookup(null);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setLookup(null);
      });
    return () => {
      cancelled = true;
    };
  }, [message.message, apiClient]);

  return (
    <TableRow>
      <TableCell>
        <Badge variant={levelVariant(message.level)}>{message.level}</Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">{message.category}</TableCell>
      <TableCell className="font-medium">{message.entity || "—"}</TableCell>
      <TableCell>{message.message}</TableCell>
      <TableCell className="text-sm text-muted-foreground">{message.hint}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          {lookup ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                if (lookup.type === "parameter" || lookup.type === "set") {
                  onOpenWiki({ kind: "parameter", name: lookup.slug });
                } else {
                  onOpenWiki({ kind: "entry", slug: lookup.slug });
                }
              }}
              data-testid={`validation-lookup-${lookup.slug}`}
            >
              <BookOpen className="size-3.5" /> Look up
            </Button>
          ) : null}
          <Button
            size="sm"
            variant="ghost"
            disabled={!message.entity}
            onClick={() => onSelectEntity(message.entity)}
          >
            Open entity
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function extractParameterCandidate(message: string): string | null {
  const match = message.match(/parameter\s+([A-Z][A-Z0-9_]{2,})/i);
  if (match) return match[1];
  const fallback = message.match(/\b([A-Z]{3,}_[A-Z][A-Z0-9_]+)\b/);
  return fallback ? fallback[1] : null;
}
