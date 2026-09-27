"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { certification, safeguards } from "@/content/landing";
import { Check, Lock, Seal } from "./icons";
import { delay } from "./reveal";

type Safeguard = (typeof safeguards)[number];

/**
 * A control register: an index of safeguards on the left, and a docket sheet on the right that
 * shows the selected control doing its job. Below lg the sheet opens inline under its entry.
 */
export function Safeguards() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const current = safeguards[active];

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = safeguards.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % safeguards.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + safeguards.length) % safeguards.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="safeguards" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2
            data-print
            className="font-display text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] lg:col-span-6"
          >
            Built so the record holds.
          </h2>
          <p
            data-reveal
            style={delay(100)}
            className="text-pretty max-w-[34rem] self-end text-[0.98rem] leading-[1.7] text-ink-soft lg:col-span-5 lg:col-start-8"
          >
            Six controls, enforced by the database and the storage layer rather than by screens and
            buttons. Select one to see it at work.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Safeguards"
            className="lg:col-span-5"
          >
            {safeguards.map((item, i) => {
              const on = i === active;
              return (
                <div key={item.key} data-reveal style={delay(60 + i * 60)} className="border-t border-rule-strong last:border-b">
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${base}-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`${base}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`group grid w-full cursor-pointer grid-cols-[1.75rem_1fr_auto] items-center gap-3 rounded-[4px] px-3 py-4 text-left transition-[background-color,box-shadow] duration-300 ease-[var(--ease-out)] sm:py-[1.1rem] ${
                      on
                        ? "bg-sheet shadow-[0_1px_0_var(--rule),0_18px_32px_-26px_rgba(11,31,24,0.45)]"
                        : "hover:bg-paper-sunk/70"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-300 ${
                        on ? "border-brass-ink bg-brass-bright text-field" : "border-rule-strong text-ink-mute group-hover:text-ink"
                      }`}
                    >
                      <Lock size={13} />
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`font-display block text-[1rem] font-medium leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-[1.06rem] ${
                          on ? "text-ink" : "text-ink-soft group-hover:text-ink"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-[0.74rem] text-ink-mute">{item.tag}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`text-[0.74rem] font-medium tabular transition-opacity duration-300 ${on ? "text-brass-ink opacity-100" : "text-ink-mute opacity-0 group-hover:opacity-100"}`}
                    >
                      {on ? "Open" : "View"}
                    </span>
                  </button>

                  {/* Small screens: the sheet opens under its entry. */}
                  {on && (
                    <div className="px-1 pb-5 pt-1 lg:hidden">
                      <ControlSheet item={item} index={i} inline />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${base}-panel`}
            aria-labelledby={`${base}-tab-${active}`}
            className="hidden lg:col-span-7 lg:block"
          >
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <ControlSheet item={current} index={active} />
            </div>
          </div>
        </div>

        {certification.show && (
          <div
            data-reveal
            className="mt-14 flex flex-col gap-5 rounded-[6px] bg-paper-sunk p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-8"
          >
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brass/50 text-brass-ink">
              <Seal size={28} />
            </span>
            <div>
              <p className="font-display text-[1.2rem] font-semibold tracking-[-0.01em]">{certification.name}</p>
              <p className="mt-1 text-[0.98rem] text-ink-soft">{certification.line}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ControlSheet({ item, index, inline = false }: { item: Safeguard; index: number; inline?: boolean }) {
  return (
    <article key={item.key} className="perforated rounded-[6px] bg-sheet pt-3 shadow-[0_30px_60px_-34px_rgba(11,31,24,0.4),0_2px_6px_-2px_rgba(11,31,24,0.1)]">
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="font-seal text-[0.66rem] font-semibold text-ink-mute">
            Control {index + 1} of {safeguards.length}
          </p>
          <span className="rounded-full border border-field/35 px-2.5 py-0.5 text-[0.72rem] font-medium text-field">
            {item.tag}
          </span>
        </div>
        <h3 className={`log-in font-display mt-4 text-[1.3rem] font-semibold leading-[1.2] tracking-[-0.015em] sm:text-[1.45rem] ${inline ? "sr-only" : ""}`}>
          {item.title}
        </h3>
        <p className="log-in text-pretty mt-2.5 max-w-[34rem] text-[0.92rem] leading-[1.65] text-ink-soft" style={stagger(1)}>
          {item.body}
        </p>
        <div className="mt-6 rounded-[4px] border border-rule bg-paper p-4 sm:p-5">
          <Specimen kind={item.key} />
        </div>
        <p className="mt-3 text-[0.72rem] text-ink-mute">Illustrative example.</p>
      </div>
    </article>
  );
}

const stagger = (i: number) => ({ animationDelay: `${i * 90}ms` }) as CSSProperties;

function Line({ i, children, tone = "ink" }: { i: number; children: ReactNode; tone?: "ink" | "refused" | "ok" }) {
  const color = tone === "refused" ? "text-brass-ink" : tone === "ok" ? "text-field" : "text-ink-soft";
  return (
    <li style={stagger(i + 2)} className={`log-in flex items-start gap-2.5 border-b border-dashed border-rule py-2 last:border-0 ${color}`}>
      {children}
    </li>
  );
}

function Mark({ tone }: { tone: "refused" | "ok" }) {
  return (
    <span aria-hidden="true" className="mt-[0.15em] shrink-0">
      {tone === "ok" ? <Check size={13} strokeWidth={2.2} /> : <Lock size={13} />}
    </span>
  );
}

function Specimen({ kind }: { kind: string }) {
  const mono = "font-mono text-[0.74rem] leading-[1.5] sm:text-[0.76rem]";
  switch (kind) {
    case "access":
      return (
        <ul className={mono}>
          <Line i={0}>
            <span className="tabular text-ink-mute">14:02</span>
            <span>A. Menon opens RPT-2026-0142</span>
          </Line>
          <Line i={1} tone="ok">
            <Mark tone="ok" />
            <span>allowed, assigned to this case</span>
          </Line>
          <Line i={2}>
            <span className="tabular text-ink-mute">14:03</span>
            <span>A. Menon opens RPT-2026-0139</span>
          </Line>
          <Line i={3} tone="refused">
            <Mark tone="refused" />
            <span>refused by database, not assigned</span>
          </Line>
        </ul>
      );
    case "audit":
      return (
        <ul className={mono}>
          <Line i={0}>
            <span className="tabular text-ink-mute">10:50:02</span>
            <span>case.assigned to A. Menon</span>
          </Line>
          <Line i={1} tone="refused">
            <Mark tone="refused" />
            <span>UPDATE audit_logs refused</span>
          </Line>
          <Line i={2} tone="refused">
            <Mark tone="refused" />
            <span>DELETE audit_logs refused</span>
          </Line>
          <Line i={3} tone="ok">
            <Mark tone="ok" />
            <span>new entries only ever append</span>
          </Line>
        </ul>
      );
    case "recordings":
      return (
        <ul className={mono}>
          <Line i={0}>
            <span className="text-ink-mute">audio</span>
            <span>held by telephony provider</span>
          </Line>
          <Line i={1}>
            <span className="text-ink-mute">stored</span>
            <span className="break-all">sha256 9f2c 41e0 b7a3 … e41a</span>
          </Line>
          <Line i={2}>
            <span className="text-ink-mute">played</span>
            <span className="break-all">sha256 9f2c 41e0 b7a3 … e41a</span>
          </Line>
          <Line i={3} tone="ok">
            <Mark tone="ok" />
            <span>fingerprints match, unaltered</span>
          </Line>
        </ul>
      );
    case "links":
      return <ExpiringLink mono={mono} />;
    case "webhooks":
      return (
        <ul className={mono}>
          <Line i={0}>
            <span className="tabular text-ink-mute">09:14</span>
            <span>call record, signature valid</span>
          </Line>
          <Line i={1} tone="ok">
            <Mark tone="ok" />
            <span>accepted into the call queue</span>
          </Line>
          <Line i={2}>
            <span className="tabular text-ink-mute">09:21</span>
            <span>call record, no signature</span>
          </Line>
          <Line i={3} tone="refused">
            <Mark tone="refused" />
            <span>rejected, logged as security event</span>
          </Line>
        </ul>
      );
    case "named":
      return (
        <ul className="text-[0.82rem]">
          {[
            ["AM", "A. Menon", "Investigator", "Invoice trail requested from procurement."],
            ["RI", "R. Iyer", "Compliance admin", "Severity raised to high."],
          ].map(([initials, name, role, text], i) => (
            <li key={name} style={stagger(i + 2)} className="log-in flex gap-3 border-b border-dashed border-rule py-2.5 last:border-0">
              <span className="font-seal inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-field text-[0.66rem] font-bold text-field">
                {initials}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.78rem] text-ink-mute">
                  <span className="font-semibold text-ink">{name}</span>, {role}
                </span>
                <span className="mt-0.5 block text-ink-soft">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

/** A signed link that visibly counts down to expiry while its control is open. */
function ExpiringLink({ mono }: { mono: string }) {
  const [left, setLeft] = useState(15 * 60);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(t);
  }, []);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <ul className={mono}>
      <Line i={0}>
        <span className="text-ink-mute">file</span>
        <span>vendor_invoice_0381.pdf</span>
      </Line>
      <Line i={1}>
        <span className="text-ink-mute">link</span>
        <span className="break-all">…/evidence/0381?token=••••••</span>
      </Line>
      <Line i={2} tone="ok">
        <Mark tone="ok" />
        <span>
          expires in <span className="tabular font-semibold">{mm}:{ss}</span>, issue logged
        </span>
      </Line>
      <Line i={3}>
        <span className="text-ink-mute">bucket</span>
        <span>private, no public access</span>
      </Line>
    </ul>
  );
}
