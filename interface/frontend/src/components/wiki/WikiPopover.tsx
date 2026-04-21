import { BookOpen, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "../ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "../ui/sheet";
import type { WikiEntry } from "../../lib/api";

import { MarkdownBody } from "./MarkdownBody";
import { fetchWiki, peekWikiCache, type WikiTarget } from "./wikiCache";
import { useWikiViewer } from "./WikiViewerContext";

function targetLabel(target: WikiTarget): string {
  switch (target.kind) {
    case "parameter":
      return `parameter / ${target.name}`;
    case "concept":
      return `concept / ${target.slug}`;
    case "faq":
      return `faq / ${target.slug}`;
    case "entry":
      return target.slug;
  }
}

export function WikiPopover() {
  const viewer = useWikiViewer();
  const { target, open, closeWiki, apiClient, openWiki } = viewer;

  const [entry, setEntry] = useState<WikiEntry | null>(target ? peekWikiCache(target) ?? null : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!target || !open) {
      return;
    }
    const cached = peekWikiCache(target);
    if (cached) {
      setEntry(cached);
      setError(null);
      setLoading(false);
      return;
    }
    setEntry(null);
    setLoading(true);
    setError(null);
    let cancelled = false;
    fetchWiki(apiClient, target)
      .then((next) => {
        if (cancelled) return;
        setEntry(next);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [target, open, apiClient]);

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) closeWiki();
      }}
    >
      <SheetContent side="right" className="overflow-y-auto sm:max-w-2xl lg:max-w-3xl">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Badge variant="default">
              <BookOpen className="size-3" /> wiki
            </Badge>
            <SheetTitle data-testid="wiki-popover-title">
              {entry?.title ?? (target ? targetLabel(target) : "Wiki entry")}
            </SheetTitle>
          </div>
          <SheetDescription>
            {target ? (
              <span className="font-mono text-[11px]">{targetLabel(target)}</span>
            ) : (
              "Select a wiki entry to read full documentation."
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 p-4" data-testid="wiki-popover-body">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading wiki entry…
            </div>
          ) : null}
          {error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          {entry ? (
            <>
              <FrontmatterPreview frontmatter={entry.frontmatter} />
              <MarkdownBody
                source={entry.body_markdown}
                onWikiLink={(slug) => openWiki({ kind: "entry", slug })}
              />
            </>
          ) : null}
          {!loading && !entry && !error ? (
            <p className="text-sm text-muted-foreground">No content available.</p>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function FrontmatterPreview({ frontmatter }: { frontmatter: Record<string, unknown> }) {
  const indexes = frontmatter.indexes;
  const type = frontmatter.type;
  const aliases = frontmatter.aliases;
  if (!indexes && !type && !aliases) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1 rounded-md border border-border bg-muted/30 p-2 text-xs text-muted-foreground">
      {type ? (
        <div>
          <span className="font-semibold uppercase tracking-wide">type:</span>{" "}
          <span className="font-mono">{String(type)}</span>
        </div>
      ) : null}
      {indexes ? (
        <div>
          <span className="font-semibold uppercase tracking-wide">indexes:</span>{" "}
          <span className="font-mono">
            {Array.isArray(indexes) ? indexes.join(", ") : String(indexes)}
          </span>
        </div>
      ) : null}
      {aliases && Array.isArray(aliases) && aliases.length ? (
        <div>
          <span className="font-semibold uppercase tracking-wide">aliases:</span>{" "}
          <span className="font-mono">{aliases.join(", ")}</span>
        </div>
      ) : null}
    </div>
  );
}
