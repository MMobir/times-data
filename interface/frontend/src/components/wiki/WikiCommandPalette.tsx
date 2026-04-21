import { Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "../../lib/utils";
import type { WikiHit } from "../../lib/api";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "../ui/dialog";

import type { WikiTarget } from "./wikiCache";
import { useWikiViewer } from "./WikiViewerContext";

const FILTERS: Array<{ key: string; label: string; types: string[] | undefined }> = [
  { key: "all", label: "All", types: undefined },
  { key: "concept", label: "Concepts", types: ["concept"] },
  { key: "parameter", label: "Parameters", types: ["parameter", "set"] },
  { key: "faq", label: "FAQ", types: ["faq"] },
  { key: "topic", label: "Topics", types: ["topic"] }
];

const TYPE_LABEL: Record<string, string> = {
  concept: "Concepts",
  parameter: "Parameters",
  set: "Parameters",
  faq: "FAQ",
  topic: "Topics",
  entry: "Other"
};

function targetForHit(hit: WikiHit): WikiTarget {
  switch (hit.type) {
    case "parameter":
    case "set":
      return { kind: "parameter", name: hit.slug };
    case "concept":
      return { kind: "concept", slug: hit.slug };
    case "faq":
      return { kind: "faq", slug: hit.slug };
    default:
      return { kind: "entry", slug: hit.slug };
  }
}

export function WikiCommandPalette() {
  const viewer = useWikiViewer();
  const { paletteOpen, togglePalette, apiClient, openWiki } = viewer;

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [hits, setHits] = useState<WikiHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const modifier = event.metaKey || event.ctrlKey;
      if (modifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        togglePalette();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePalette]);

  useEffect(() => {
    if (paletteOpen) {
      const handle = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(handle);
    }
    setQuery("");
    setHits([]);
    setActiveIndex(0);
    return undefined;
  }, [paletteOpen]);

  const types = useMemo(() => FILTERS.find((entry) => entry.key === filter)?.types, [filter]);

  useEffect(() => {
    if (!paletteOpen) return;
    const trimmed = query.trim();
    if (!trimmed) {
      setHits([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    let cancelled = false;
    const handle = window.setTimeout(() => {
      apiClient
        .searchWiki(trimmed, { limit: 25, types })
        .then((response) => {
          if (cancelled) return;
          setHits(response.hits);
          setActiveIndex(0);
          setLoading(false);
        })
        .catch(() => {
          if (cancelled) return;
          setHits([]);
          setLoading(false);
        });
    }, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [query, types, apiClient, paletteOpen]);

  const grouped = useMemo(() => {
    const map = new Map<string, WikiHit[]>();
    hits.forEach((hit) => {
      const groupKey = TYPE_LABEL[hit.type] ?? "Other";
      const existing = map.get(groupKey) ?? [];
      existing.push(hit);
      map.set(groupKey, existing);
    });
    const order: string[] = [];
    hits.forEach((hit) => {
      const groupKey = TYPE_LABEL[hit.type] ?? "Other";
      if (!order.includes(groupKey)) order.push(groupKey);
    });
    return order.map((key) => ({ key, hits: map.get(key) ?? [] }));
  }, [hits]);

  const flatHits = useMemo(() => grouped.flatMap((group) => group.hits), [grouped]);

  const handleOpen = (hit: WikiHit) => {
    togglePalette(false);
    openWiki(targetForHit(hit));
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, Math.max(flatHits.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = flatHits[activeIndex];
      if (target) handleOpen(target);
    }
  };

  return (
    <Dialog
      open={paletteOpen}
      onOpenChange={(next) => togglePalette(next)}
    >
      <DialogContent className="top-[10%] max-w-2xl overflow-hidden p-0" hideClose>
        <DialogTitle className="sr-only">Wiki search</DialogTitle>
        <DialogDescription className="sr-only">
          Search the TIMES wiki for parameters, concepts, FAQ entries, and topics.
        </DialogDescription>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            aria-label="Search the TIMES wiki"
            placeholder="Search wiki: parameters, concepts, FAQ…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {loading ? <Loader2 className="size-4 animate-spin text-muted-foreground" /> : null}
        </div>
        <div className="flex flex-wrap gap-1 border-b border-border bg-muted/30 px-3 py-2">
          {FILTERS.map((entry) => (
            <button
              key={entry.key}
              type="button"
              onClick={() => setFilter(entry.key)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                filter === entry.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <div className="max-h-[420px] overflow-y-auto p-2" data-testid="wiki-cmdk-results">
          {!query.trim() ? (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">
              Start typing to search the TIMES wiki.
            </p>
          ) : !loading && !flatHits.length ? (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">
              No matches for "{query.trim()}".
            </p>
          ) : (
            grouped.map((group) => (
              <section key={group.key} className="mb-2">
                <h4 className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.key}
                </h4>
                <ul className="flex flex-col gap-1">
                  {group.hits.map((hit) => {
                    const flatIndex = flatHits.indexOf(hit);
                    const active = flatIndex === activeIndex;
                    return (
                      <li key={`${hit.type}:${hit.slug}`}>
                        <button
                          type="button"
                          onClick={() => handleOpen(hit)}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          data-testid={`wiki-cmdk-hit-${hit.slug}`}
                          className={cn(
                            "flex w-full flex-col items-start gap-0.5 rounded-md px-2 py-1.5 text-left transition-colors",
                            active
                              ? "bg-primary/10 text-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{hit.title}</span>
                            <Badge variant="muted" className="text-[10px] uppercase">
                              {hit.type}
                            </Badge>
                          </div>
                          {hit.snippet ? (
                            <span className="line-clamp-2 text-xs text-muted-foreground">
                              {hit.snippet}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
