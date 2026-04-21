import { BookOpen, FileText, FlaskConical, Stethoscope, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";

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
import { useWikiViewer } from "../components/wiki/WikiViewerContext";
import type { ApiClientContract, InfeasibilityReport } from "../lib/api";

interface DiagnosePageProps {
  apiClient: ApiClientContract;
  onError: (error: unknown) => void;
  onSuccess: (text: string) => void;
}

type Mode = "text" | "path";

const SAMPLE_LST = `**** SOLVE      EQ_OBJ                          USING LP FROM LIBINCLUDE
**** REPORT SUMMARY :        0     NONOPT
                             1 INFEASIBLE  (INFES = 1.500e+00)
                             0  UNBOUNDED
**** INFEASIBILITIES
---- EQE_COMBAL  Commodity balance
EQE_COMBAL(R1,2030,ELC,ANNUAL)..  ==L==  -1.5 ****  INFES = 1.5 ****
---- ERRORS
**** SOLVER STATUS     1 NORMAL COMPLETION
**** MODEL STATUS      4 INFEASIBLE
**** OBJECTIVE VALUE             1234.5678
`;

function statusBadge(status: string): "destructive" | "warning" | "success" | "muted" {
  const s = status.toUpperCase();
  if (s === "INFEASIBLE" || s === "ERROR") return "destructive";
  if (s === "OPTIMAL") return "success";
  if (s === "UNKNOWN") return "warning";
  return "muted";
}

export function DiagnosePage({ apiClient, onError, onSuccess }: DiagnosePageProps) {
  const wiki = useWikiViewer();
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [path, setPath] = useState("");
  const [report, setReport] = useState<InfeasibilityReport | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const args: { text?: string; path?: string } = {};
    if (mode === "text") {
      const trimmed = text.trim();
      if (!trimmed) {
        onError(new Error("Paste LST contents before translating."));
        return;
      }
      args.text = trimmed;
    } else {
      const trimmed = path.trim();
      if (!trimmed) {
        onError(new Error("Provide a path to an .lst file."));
        return;
      }
      args.path = trimmed;
    }
    setSubmitting(true);
    try {
      const next = await apiClient.diagnoseLst(args);
      setReport(next);
      onSuccess(`Diagnose complete: ${next.status}.`);
    } catch (error) {
      onError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const tryEmpty = useMemo(() => report === null, [report]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="size-4 text-primary" /> Diagnose
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={mode === "text" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("text")}
            >
              <FileText className="size-4" /> Paste LST text
            </Button>
            <Button
              variant={mode === "path" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("path")}
            >
              <FileText className="size-4" /> LST file path
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {mode === "text" ? (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="diagnose-text">LST text</Label>
              <textarea
                id="diagnose-text"
                aria-label="LST text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste the contents of an .lst file from a TIMES solve…"
                className="min-h-48 rounded-md border border-input bg-background p-3 font-mono text-xs leading-relaxed text-foreground shadow-sm focus-ring"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="diagnose-path">LST file path</Label>
              <Input
                id="diagnose-path"
                aria-label="LST file path"
                value={path}
                onChange={(event) => setPath(event.target.value)}
                placeholder="/path/to/run.lst"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button onClick={handleSubmit} disabled={submitting}>
              <Wand2 className="size-4" />
              {submitting ? "Translating…" : "Translate"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMode("text");
                setText(SAMPLE_LST);
              }}
            >
              <FlaskConical className="size-4" /> Try sample
            </Button>
            {report ? (
              <span className="text-xs text-muted-foreground">
                Status: <Badge variant={statusBadge(report.status)}>{report.status}</Badge>
              </span>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {report ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Solve summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Status
                </span>
                <Badge variant={statusBadge(report.status)} className="self-start text-sm">
                  {report.status}
                </Badge>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Objective
                </span>
                <span className="font-mono text-sm">
                  {report.objective !== null ? report.objective : "—"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md border border-border bg-muted/30 p-2">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Infeasible eqs.
                  </div>
                  <div className="text-base font-semibold">
                    {report.infeasible_equations.length}
                  </div>
                </div>
                <div className="rounded-md border border-border bg-muted/30 p-2">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Errors
                  </div>
                  <div className="text-base font-semibold">{report.errors.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Infeasible equations</CardTitle>
            </CardHeader>
            <CardContent>
              {report.infeasible_equations.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equation</TableHead>
                      <TableHead>Args</TableHead>
                      <TableHead>Hint</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.infeasible_equations.map((eq, index) => (
                      <TableRow key={`${eq.equation}-${index}`}>
                        <TableCell className="font-mono text-xs">{eq.equation}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {eq.args.map((arg) => (
                              <Badge key={arg} variant="muted" className="font-mono text-[10px]">
                                {arg}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{eq.hint}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No infeasible equations detected.</p>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-sm">Errors</CardTitle>
            </CardHeader>
            <CardContent>
              {report.errors.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">Code</TableHead>
                      <TableHead>Hint</TableHead>
                      <TableHead>Raw</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.errors.map((err, index) => (
                      <TableRow key={`${err.code}-${index}`}>
                        <TableCell className="font-mono text-xs">{err.code}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{err.hint}</TableCell>
                        <TableCell className="font-mono text-[10px] text-muted-foreground">
                          {err.raw}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No solver errors detected.</p>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-sm">FAQ links</CardTitle>
            </CardHeader>
            <CardContent>
              {report.faq_links.length ? (
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {report.faq_links.map((link) => (
                    <li key={link.slug}>
                      <button
                        type="button"
                        onClick={() => wiki.openWiki({ kind: "faq", slug: link.slug })}
                        data-testid={`diagnose-faq-${link.slug}`}
                        className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-left text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <BookOpen className="size-4 text-primary" />
                        <span className="flex flex-col">
                          <span className="font-medium">{link.title}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            faq / {link.slug}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No FAQ links suggested.</p>
              )}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {tryEmpty ? (
        <EmptyState
          icon={Stethoscope}
          title="No diagnosis yet"
          description="Paste an .lst file or point to a path. Use 'Try sample' to see how Diagnose translates an INFEASIBLE solve."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMode("text");
                setText(SAMPLE_LST);
              }}
            >
              <FlaskConical className="size-4" /> Try sample
            </Button>
          }
        />
      ) : null}
    </div>
  );
}
