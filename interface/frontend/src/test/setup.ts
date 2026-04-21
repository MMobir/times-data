import "@testing-library/jest-dom/vitest";

class ResizeObserverMock {
  observe(): void {
    // no-op
  }
  unobserve(): void {
    // no-op
  }
  disconnect(): void {
    // no-op
  }
}

class IntersectionObserverMock {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe(): void {
    // no-op
  }
  unobserve(): void {
    // no-op
  }
  disconnect(): void {
    // no-op
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

type GlobalWithObservers = typeof globalThis & {
  ResizeObserver?: typeof ResizeObserverMock;
  IntersectionObserver?: typeof IntersectionObserverMock;
};

const globalWithObservers = globalThis as GlobalWithObservers;
if (typeof globalWithObservers.ResizeObserver === "undefined") {
  globalWithObservers.ResizeObserver = ResizeObserverMock;
}
if (typeof globalWithObservers.IntersectionObserver === "undefined") {
  globalWithObservers.IntersectionObserver = IntersectionObserverMock;
}

if (typeof window !== "undefined") {
  if (!window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false
      })
    });
  }
  if (typeof window.HTMLElement !== "undefined") {
    const proto = window.HTMLElement.prototype as unknown as {
      hasPointerCapture?: (id: number) => boolean;
      releasePointerCapture?: (id: number) => void;
      setPointerCapture?: (id: number) => void;
      scrollIntoView?: () => void;
    };
    if (!proto.hasPointerCapture) {
      proto.hasPointerCapture = () => false;
    }
    if (!proto.releasePointerCapture) {
      proto.releasePointerCapture = () => {};
    }
    if (!proto.setPointerCapture) {
      proto.setPointerCapture = () => {};
    }
    if (!proto.scrollIntoView) {
      proto.scrollIntoView = () => {};
    }
  }
}
