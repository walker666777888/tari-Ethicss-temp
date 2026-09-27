import type { CSSProperties } from "react";

/** Stagger for [data-reveal] / [data-rule] elements. */
export function delay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
