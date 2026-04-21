import { Info, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "../../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { WikiEntry } from "../../lib/api";

import { fetchWiki, peekWikiCache, type WikiTarget } from "./wikiCache";
import { useWikiViewer } from "./WikiViewerContext";

interface ParameterDoctorButtonProps {
  parameter: string;
  className?: string;
  ariaLabel?: string;
}

export function ParameterDoctorButton({
  parameter,
  className,
  ariaLabel
}: ParameterDoctorButtonProps) {
  return (
    <DoctorButton
      target={{ kind: "parameter", name: parameter }}
      className={className}
      ariaLabel={ariaLabel ?? `Open wiki for ${parameter}`}
      testId={`parameter-doctor-${parameter}`}
    />
  );
}

interface DoctorButtonProps {
  target: WikiTarget;
  className?: string;
  ariaLabel: string;
  testId?: string;
}

export function DoctorButton({ target, className, ariaLabel, testId }: DoctorButtonProps) {
  const viewer = useWikiViewer();
  const [hovered, setHovered] = useState(false);
  const [preview, setPreview] = useState<WikiEntry | null>(peekWikiCache(target) ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hovered) return;
    const cached = peekWikiCache(target);
    if (cached) {
      setPreview(cached);
      return;
    }
    setLoading(true);
    setError(null);
    let cancelled = false;
    fetchWiki(viewer.apiClient, target)
      .then((entry) => {
        if (cancelled) return;
        setPreview(entry);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Wiki entry not found.");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hovered, target, viewer.apiClient]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          data-testid={testId}
          onMouseEnter={() => setHovered(true)}
          onFocus={() => setHovered(true)}
          onClick={(event) => {
            event.stopPropagation();
            viewer.openWiki(target);
          }}
          className={cn(
            "inline-flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-ring",
            className
          )}
        >
          <Info className="size-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" align="start" className="max-w-sm p-3">
        {loading ? (
          <span className="flex items-center gap-2 text-xs">
            <Loader2 className="size-3 animate-spin" /> Loading…
          </span>
        ) : error ? (
          <span className="text-xs text-destructive">{error}</span>
        ) : preview ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-xs font-semibold">
              <span>{preview.title}</span>
              <span className="rounded bg-muted px-1 py-px font-mono text-[10px] uppercase text-muted-foreground">
                {preview.type}
              </span>
            </div>
            {Array.isArray(preview.frontmatter.indexes) && preview.frontmatter.indexes.length ? (
              <div className="text-[11px] text-muted-foreground">
                <span className="font-semibold">indexes:</span>{" "}
                <span className="font-mono">
                  {(preview.frontmatter.indexes as unknown[]).join(", ")}
                </span>
              </div>
            ) : null}
            <p className="text-[11px] text-muted-foreground">
              {preview.body_markdown.replace(/\s+/g, " ").slice(0, 240)}
              {preview.body_markdown.length > 240 ? "…" : ""}
            </p>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-primary">
              Open full doc →
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Hover to preview wiki entry.</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
