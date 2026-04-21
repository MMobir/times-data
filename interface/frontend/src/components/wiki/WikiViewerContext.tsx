import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type { ApiClientContract } from "../../lib/api";

import type { WikiTarget } from "./wikiCache";

interface WikiViewerState {
  target: WikiTarget | null;
  open: boolean;
  paletteOpen: boolean;
  apiClient: ApiClientContract;
  openWiki: (target: WikiTarget) => void;
  closeWiki: () => void;
  togglePalette: (next?: boolean) => void;
}

const WikiViewerContext = createContext<WikiViewerState | undefined>(undefined);

export function WikiViewerProvider({
  apiClient,
  children
}: {
  apiClient: ApiClientContract;
  children: ReactNode;
}) {
  const [target, setTarget] = useState<WikiTarget | null>(null);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openWiki = useCallback((next: WikiTarget) => {
    setTarget(next);
    setOpen(true);
    setPaletteOpen(false);
  }, []);

  const closeWiki = useCallback(() => {
    setOpen(false);
  }, []);

  const togglePalette = useCallback((next?: boolean) => {
    setPaletteOpen((prev) => (typeof next === "boolean" ? next : !prev));
  }, []);

  const value = useMemo<WikiViewerState>(
    () => ({
      target,
      open,
      paletteOpen,
      apiClient,
      openWiki,
      closeWiki,
      togglePalette
    }),
    [target, open, paletteOpen, apiClient, openWiki, closeWiki, togglePalette]
  );

  return <WikiViewerContext.Provider value={value}>{children}</WikiViewerContext.Provider>;
}

export function useWikiViewer(): WikiViewerState {
  const ctx = useContext(WikiViewerContext);
  if (!ctx) {
    throw new Error("useWikiViewer must be used inside a WikiViewerProvider");
  }
  return ctx;
}
