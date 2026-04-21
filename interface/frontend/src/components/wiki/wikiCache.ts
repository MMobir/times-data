import type { ApiClientContract, WikiEntry } from "../../lib/api";

export type WikiTarget =
  | { kind: "parameter"; name: string }
  | { kind: "concept"; slug: string }
  | { kind: "faq"; slug: string }
  | { kind: "entry"; slug: string };

export function targetKey(target: WikiTarget): string {
  switch (target.kind) {
    case "parameter":
      return `parameter:${target.name.toLowerCase()}`;
    case "concept":
      return `concept:${target.slug.toLowerCase()}`;
    case "faq":
      return `faq:${target.slug.toLowerCase()}`;
    case "entry":
      return `entry:${target.slug.toLowerCase()}`;
  }
}

const entryCache = new Map<string, WikiEntry>();
const inflight = new Map<string, Promise<WikiEntry>>();

export function peekWikiCache(target: WikiTarget): WikiEntry | undefined {
  return entryCache.get(targetKey(target));
}

export function clearWikiCache(): void {
  entryCache.clear();
  inflight.clear();
}

export async function fetchWiki(
  api: ApiClientContract,
  target: WikiTarget
): Promise<WikiEntry> {
  const key = targetKey(target);
  const cached = entryCache.get(key);
  if (cached) {
    return cached;
  }
  const existing = inflight.get(key);
  if (existing) {
    return existing;
  }
  let promise: Promise<WikiEntry>;
  switch (target.kind) {
    case "parameter":
      promise = api.getWikiParameter(target.name);
      break;
    case "concept":
      promise = api.getWikiConcept(target.slug);
      break;
    case "faq":
      promise = api.getWikiFaq(target.slug);
      break;
    case "entry":
      promise = api.getWikiEntry(target.slug);
      break;
  }
  const settled = promise
    .then((entry) => {
      entryCache.set(key, entry);
      inflight.delete(key);
      return entry;
    })
    .catch((error) => {
      inflight.delete(key);
      throw error;
    });
  inflight.set(key, settled);
  return settled;
}
