"use client";

import { useEffect, useRef, useState } from "react";

/** Copies a contact detail and presses a small "Copied" stamp beside it. */
export function CopyValue({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(false);
    requestAnimationFrame(() => setCopied(true));
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <span className="relative inline-flex shrink-0 items-center">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="relative z-10 inline-flex h-10 cursor-pointer items-center rounded-full border border-rule-strong bg-sheet px-4 text-[0.8rem] font-medium text-ink transition-[border-color,background-color] duration-200 hover:border-field hover:bg-paper"
      >
        Copy
      </button>
      <span
        data-on={copied}
        aria-hidden="true"
        className="registry-stamp copy-stamp absolute -top-3 right-1 z-20 bg-sheet"
      >
        <span className="font-seal text-[0.66rem] font-bold">Copied</span>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied` : ""}
      </span>
    </span>
  );
}
