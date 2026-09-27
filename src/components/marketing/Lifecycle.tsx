"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { sampleCase, stages, type AuditEntry } from "@/content/landing";
import { Lock } from "./icons";

export function Lifecycle() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.55", "end 0.55"] });
  const rail = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            setActive(i);
          }
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const log = stages.slice(0, active + 1).flatMap((s) => s.log);

  return (
    <section
      aria-labelledby="lifecycle-title"
      className="relative bg-field text-on-field"
    >
      <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2
            id="lifecycle-title"
            data-print
            className="font-display text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] lg:col-span-7"
          >
            From first call to closure, nothing leaves the record.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Sticky docket, desktop only. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2.5rem)]">
              <StickyDocket active={active} log={log} />
            </div>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-field-rule">
              <m.div
                className="h-full w-full origin-top bg-brass-bright"
                style={{ scaleY: reduce ? 1 : rail }}
              />
            </div>

            <ol ref={listRef} className="relative">
              {stages.map((stage, i) => (
                <li
                  key={stage.status}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="relative pb-16 pl-12 last:pb-0 lg:min-h-[min(62vh,640px)] lg:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-out)] ${
                      i <= active
                        ? "scale-100 border-brass-bright bg-brass-bright"
                        : "scale-90 border-field-rule bg-field"
                    }`}
                  />
                  <div data-step-dim={i !== active} className="transition-opacity duration-500 ease-[var(--ease-out)]">
                    <h3 className="font-display text-[1.65rem] font-medium leading-[1.15] tracking-[-0.02em] sm:text-[2.1rem]">
                      {stage.title}
                    </h3>
                    <p className="text-pretty mt-4 max-w-[34rem] text-[1.04rem] leading-[1.7] text-on-field-soft">
                      {stage.body}
                    </p>
                    <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.78rem] text-on-field-soft">
                      <span>
                        status: <span className="text-brass-bright">{stage.status.toLowerCase()}</span>
                      </span>
                      <span>by: {stage.who.toLowerCase()}</span>
                    </p>

                    {/* Inline log on small screens, where there is no sticky docket. */}
                    <ul className="mt-5 space-y-1 border-l border-field-rule pl-4 font-mono text-[0.74rem] leading-[1.6] lg:hidden">
                      {stage.log.map((e) => (
                        <li key={e.time + e.action} className="text-on-field-soft">
                          <span className="tabular">{e.time}</span>{" "}
                          <span className="text-on-field">{e.action}</span> {e.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyDocket({ active, log }: { active: number; log: AuditEntry[] }) {
  return (
    <div className="relative rounded-[6px] border border-field-rule bg-field-raise p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)]">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[1.3rem] font-medium tracking-tight text-on-field">{sampleCase.number}</p>
        <p className="text-[0.8rem] text-on-field-soft">{sampleCase.category}</p>
      </div>

      <ol className="mt-6 grid grid-cols-5 gap-1.5" aria-label="Case status">
        {stages.map((s, i) => (
          <li key={s.status} aria-current={i === active ? "step" : undefined}>
            <span
              className={`block h-1 rounded-full transition-colors duration-500 ${
                i <= active ? "bg-brass-bright" : "bg-field-rule"
              }`}
            />
            <span
              className={`mt-2 block truncate text-[0.72rem] transition-colors duration-500 ${
                i === active ? "font-semibold text-on-field" : "text-on-field-soft"
              }`}
            >
              {s.status}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-7 flex items-center justify-between border-t border-field-rule pt-4">
        <p className="font-seal text-[0.66rem] font-semibold text-on-field-soft">Audit trail</p>
        <p className="inline-flex items-center gap-1.5 text-[0.72rem] text-on-field-soft">
          <Lock size={13} />
          {log.length} entries, none editable
        </p>
      </div>

      <ol className="mt-3 min-h-[18.5rem] font-mono text-[0.76rem] leading-[1.5]" aria-live="polite">
        {log.map((e) => (
          <li
            key={e.time + e.action}
            className="log-in grid grid-cols-[4.8rem_1fr] gap-3 border-b border-dashed border-field-rule py-2 last:border-0"
          >
            <span className="tabular text-on-field-soft">{e.time}</span>
            <span className="min-w-0">
              <span className="text-brass-bright">{e.action}</span>{" "}
              <span className="text-on-field-soft">{e.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex h-[4.25rem] items-center justify-end border-t border-field-rule pt-4">
        <div
          aria-hidden={active < stages.length - 1}
          data-on={active >= stages.length - 1}
          className="registry-stamp registry-stamp--field closed-stamp"
        >
          <span className="font-seal text-[0.66rem] font-bold">Closed</span>
          <span className="font-mono text-[0.8rem] font-semibold">Record retained</span>
        </div>
      </div>
    </div>
  );
}
