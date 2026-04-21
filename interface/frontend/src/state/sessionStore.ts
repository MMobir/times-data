import { useSyncExternalStore } from "react";

import type { ChangeMeta, OpenSessionResponse, SessionStateResponse } from "../lib/api";

export type SessionState = {
  sessionId: string | null;
  modelPath: string;
  dirty: boolean;
  summary: Record<string, unknown> | null;
};

const defaultState: SessionState = {
  sessionId: null,
  modelPath: "",
  dirty: false,
  summary: null
};

class SessionStore {
  private state: SessionState = defaultState;
  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.state;

  private publish() {
    this.listeners.forEach((listener) => listener());
  }

  setOpened(payload: OpenSessionResponse) {
    this.state = {
      sessionId: payload.session_id,
      modelPath: payload.model_path,
      dirty: payload.dirty,
      summary: payload.summary
    };
    this.publish();
  }

  setSaved(payload: SessionStateResponse) {
    this.state = {
      ...this.state,
      modelPath: payload.model_path ?? this.state.modelPath,
      dirty: payload.dirty
    };
    this.publish();
  }

  applyChange(meta: ChangeMeta) {
    this.state = {
      ...this.state,
      dirty: meta.dirty
    };
    this.publish();
  }

  clear() {
    this.state = defaultState;
    this.publish();
  }
}

export const sessionStore = new SessionStore();

export const useSessionState = () =>
  useSyncExternalStore(sessionStore.subscribe, sessionStore.getSnapshot, sessionStore.getSnapshot);
