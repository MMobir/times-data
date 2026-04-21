import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, options: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
    ...options
  }).format(value);
}

export function classifyValueDelta(
  before: number | null | undefined,
  after: number | null | undefined
): { absolute: number | null; relative: number | null } {
  if (before === null || before === undefined || after === null || after === undefined) {
    return { absolute: null, relative: null };
  }
  const absolute = after - before;
  const relative = before === 0 ? null : (absolute / Math.abs(before)) * 100;
  return { absolute, relative };
}
