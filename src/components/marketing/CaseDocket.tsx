"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { heroLog, sampleCase } from "@/content/landing";
import { Check, Lock } from "./icons";

const STEP_MS = 900;
const START_MS = 1300;

export function CaseDocket() {
  // Lines past `count` are hidden only under the .js flag, so visitors without JS see the full record.
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    if (reduce) {
      timers.push(window.setTimeout(() => setCount(heroLog.length), 0));
      return () => timers.forEach(clearTimeout);
    }
    heroLog.forEach((_, i) => {
      timers.push(window.setTimeout(() => setCount(i + 1), START_MS + i * STEP_MS));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Delight: visitors can test the record. Verifying ticks each entry; trying to change one is refused.
  const [verified, setVerified] = useState(-1);
  const [verifying, setVerifying] = useState(false);
  const [refused, setRefused] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const complete = count >= heroLog.length;

  const verify = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRefused(null);
    setVerifying(true);
    setVerified(-1);
    setNote("Checking each entry against its fingerprint.");
    heroLog.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setVerified(i), 180 + i * 160));
    });
    timers.current.push(
      window.setTimeout(() => {
        setVerifying(false);
        setNote(`${heroLog.length} of ${heroLog.length} entries verified. Nothing has been changed or removed.`);
      }, 260 + heroLog.length * 160),
    );
  };

  // One tab stop for the whole trail; arrow keys move between entries.
  const [focusIdx, setFocusIdx] = useState(0);
  const entryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onEntryKey = (e: KeyboardEvent, i: number) => {
    const last = heroLog.length - 1;
    const next =
      e.key === "ArrowDown" ? Math.min(last, i + 1) : e.key === "ArrowUp" ? Math.max(0, i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setFocusIdx(next);
    entryRefs.current[next]?.focus();
  };

  const tryEdit = (i: number) => {
    if (verifying) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRefused(null);
    // Re-trigger the refusal on repeat clicks of the same entry.
    requestAnimationFrame(() => setRefused(i));
    setNote(`The ${heroLog[i].time} entry is permanent. A correction would be added as a new entry.`);
  };

  const shown = count;
  const assigned = shown >= 3;
  const status = shown < 2 ? "Unlinked call" : assigned ? "Assigned" : "New";

  return (
    <figure
      className="relative"
      aria-label="Sample case record, showing how a hotline call becomes a case with an audit trail"
    >
      <div className="relative">
      {/* Sheet stacked behind, like a docket in a file. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-5 -bottom-2.5 top-6 rounded-[6px] bg-paper-sunk shadow-[0_1px_0_var(--rule-strong)]"
      />
      <div className="perforated relative rounded-[6px] bg-sheet pt-3 shadow-[0_30px_60px_-30px_rgba(11,31,24,0.35),0_2px_6px_-2px_rgba(11,31,24,0.12)]">
        <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-seal text-[0.64rem] font-semibold text-ink-mute">Case file</p>
              <p className="mt-1 font-mono text-[1.35rem] font-medium tracking-tight text-ink sm:text-[1.6rem]">
                {sampleCase.number}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.78rem] font-medium transition-colors duration-500 ${
                assigned
                  ? "border-field/25 bg-field text-on-field"
                  : "border-brass/40 bg-brass/10 text-brass-ink"
              }`}
              aria-live="polite"
            >
              <span className="live-dot relative h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
              {status}
            </span>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-rule py-4 text-[0.82rem] sm:grid-cols-3">
            <Field label="Source" value={sampleCase.source} />
            <Field label="Received" value={sampleCase.received} />
            <Field label="Severity" value={sampleCase.severity} emphasis />
            <Field label="Category" value={sampleCase.category} />
            <Field label="Department" value={sampleCase.department} />
            <Field
              label="Investigator"
              value={assigned ? sampleCase.investigator : "Not assigned"}
              muted={!assigned}
            />
          </dl>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="font-seal text-[0.64rem] font-semibold text-ink-mute">Audit trail</p>
            <div className="flex items-center gap-3">
              <p className="hidden items-center gap-1.5 text-[0.72rem] text-ink-mute sm:inline-flex">
                <Lock size={13} />
                Append only
              </p>
              <button
                type="button"
                onClick={verify}
                disabled={!complete || verifying}
                className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-field/35 px-3.5 sm:h-8 sm:px-3 text-[0.74rem] font-medium text-field transition-[background-color,color,opacity] duration-200 hover:bg-field hover:text-on-field disabled:cursor-default disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-field"
              >
                <Check size={13} strokeWidth={2} />
                {verifying ? "Verifying" : "Verify record"}
              </button>
            </div>
          </div>

          <ol className="mt-2.5 space-y-0 font-mono text-[0.72rem] leading-[1.5] sm:text-[0.76rem]">
            {heroLog.map((entry, i) => (
              <li
                key={entry.action}
                data-on={i < shown}
                data-docket-line
                className="border-b border-dashed border-rule transition-[opacity,transform] duration-700 ease-[var(--ease-out)] last:border-0"
              >
                <button
                  type="button"
                  ref={(el) => {
                    entryRefs.current[i] = el;
                  }}
                  tabIndex={i === focusIdx ? 0 : -1}
                  onFocus={() => setFocusIdx(i)}
                  onKeyDown={(e) => onEntryKey(e, i)}
                  onClick={() => tryEdit(i)}
                  disabled={!complete}
                  aria-label={`Entry ${i + 1} of ${heroLog.length}, ${entry.time}, ${entry.action} ${entry.detail}. Press Enter to try to change it; arrow keys move between entries.`}
                  data-refused={refused === i}
                  className="docket-entry grid w-full cursor-pointer grid-cols-[4.6rem_1fr_1rem] gap-3 rounded-[3px] py-1.5 text-left transition-colors duration-200 hover:bg-paper disabled:cursor-default disabled:hover:bg-transparent sm:grid-cols-[5.2rem_1fr_1rem]"
                >
                  <span className="tabular text-ink-mute">{entry.time}</span>
                  <span className="min-w-0">
                    <span className="text-field">{entry.action}</span>{" "}
                    <span className="text-ink-soft">{entry.detail}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    data-ok={verified >= i}
                    className="verify-tick mt-[0.15em] text-field"
                  >
                    {refused === i ? <Lock size={13} /> : <Check size={13} strokeWidth={2.2} />}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p
            aria-live="polite"
            data-show={complete}
            className="docket-note mt-3 min-h-[2.4em] border-t border-rule pt-3 text-[0.78rem] leading-[1.45] text-ink-soft"
          >
            {note ?? "Select an entry to try to change it, or verify the whole record."}
          </p>
        </div>
      </div>
      </div>
      <figcaption className="mt-6 pl-1 text-[0.78rem] text-ink-mute">
        Sample record. Names and details are illustrative.
      </figcaption>
    </figure>
  );
}

function Field({
  label,
  value,
  emphasis,
  muted,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.7rem] text-ink-mute">{label}</dt>
      <dd
        className={`mt-0.5 font-medium leading-snug transition-colors duration-500 ${
          emphasis ? "text-brass-ink" : muted ? "text-ink-mute" : "text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
