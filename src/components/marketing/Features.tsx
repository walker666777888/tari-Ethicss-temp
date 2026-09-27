"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { features, sampleCase } from "@/content/landing";
import { Lock, Mail, Phone } from "./icons";
import { delay } from "./reveal";
import { Mark } from "./Mark";

/**
 * Desktop: the section pins and the feature files slide sideways as the page scrolls.
 * Below lg, or with reduced motion, the files simply stack.
 */
export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [gutterPx, setGutterPx] = useState(0);

  // Travel is derived from the pinned layout (card width, gap, gutters), not measured,
  // because the unpinned grid has no overflow to measure.
  useEffect(() => {
    const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const measure = () => {
      const vw = document.documentElement.clientWidth;
      if (reduce || vw < 1024) return setDistance(0);
      const card = (vw >= 1280 ? 28 : 26) * rem();
      const gap = 1.25 * rem();
      const gutter = Math.max(2 * rem(), (vw - 1320) / 2 + 2 * rem());
      const n = features.length;
      setGutterPx(Math.round(gutter));
      setDistance(Math.max(0, Math.round(n * card + (n - 1) * gap + 2 * gutter - vw)));
    };
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 72px", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 34, mass: 0.35 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const pinned = distance > 0;

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="features-title"
      className="relative border-t border-rule"
      style={pinned ? { height: `calc(100vh - var(--nav-h) + ${distance}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-[var(--nav-h)] flex h-[calc(100vh-var(--nav-h))] flex-col justify-center overflow-hidden" : ""}>
        <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 ${pinned ? "" : "pt-24 sm:pt-32"}`}>
          <div className="grid gap-6 lg:grid-cols-12">
            <h2
              id="features-title"
              data-print
              className="font-display text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] lg:col-span-6"
            >
              Everything a case needs, in one register.
            </h2>
            <p
              data-reveal
              style={delay(100)}
              className="text-pretty max-w-[34rem] self-end text-[1.06rem] leading-[1.7] text-ink-soft lg:col-span-5 lg:col-start-8"
            >
              Five capabilities for <Mark>whistleblower</Mark> case management, built around one rule: whatever
              happens on a case is recorded, and only the right people can see it.
            </p>
          </div>
        </div>

        <m.div
          style={pinned ? { x, paddingLeft: gutterPx, paddingRight: gutterPx } : undefined}
          className={`mt-12 flex gap-5 px-5 sm:px-8 lg:mt-16 ${
            pinned
              ? "w-max"
              : "mx-auto max-w-[1320px] flex-col pb-24 sm:pb-32 md:grid md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {features.map((f, i) => (
            <FeatureFile key={f.key} index={i} title={f.title} body={f.body} pinned={pinned}>
              <Specimen kind={f.key} />
            </FeatureFile>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function FeatureFile({
  index,
  title,
  body,
  pinned,
  children,
}: {
  index: number;
  title: string;
  body: string;
  pinned: boolean;
  children: ReactNode;
}) {
  return (
    <article
      data-reveal
      style={delay(index * 70)}
      className={`group relative flex flex-col ${pinned ? "w-[26rem] shrink-0 xl:w-[28rem]" : ""}`}
    >
      {/* Folder tab */}
      <div aria-hidden="true" className="ml-5 h-3 w-24 rounded-t-[5px] bg-paper-sunk shadow-[inset_0_1px_0_var(--rule)]" />
      <div className="flex flex-1 flex-col rounded-[6px] rounded-tl-none bg-sheet p-6 shadow-[0_1px_0_var(--rule),0_28px_50px_-38px_rgba(11,31,24,0.45)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:shadow-[0_1px_0_var(--rule),0_36px_60px_-36px_rgba(11,31,24,0.5)] sm:p-7">
        <div className="rounded-[4px] border border-rule bg-paper p-4">{children}</div>
        <h3 className="font-display mt-7 text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.02em]">{title}</h3>
        <p className="text-pretty mt-3 text-[0.98rem] leading-[1.68] text-ink-soft">{body}</p>
      </div>
    </article>
  );
}

/** Small working specimens of each capability, drawn from the sample case. Illustrative data. */
function Specimen({ kind }: { kind: string }) {
  switch (kind) {
    case "intake":
      return (
        <ul className="space-y-2.5 text-[0.82rem]">
          <SpecRow i={0} icon={<Phone size={16} />} label="Hotline" value="Call recorded" />
          <SpecRow i={1} icon={<Mail size={16} />} label="Reporting inbox" value="Report received" />
          <li style={idx(2)} className="spec-line flex items-center justify-between border-t border-dashed border-rule pt-2.5 text-[0.76rem] text-ink-mute">
            <span>both routes</span>
            <span className="text-field">one register</span>
          </li>
        </ul>
      );
    case "triage":
      return (
        <div className="text-[0.8rem]">
          <div className="flex items-center justify-between">
            <span className="font-medium text-ink">Unlinked calls</span>
            <span className="rounded-full bg-brass/15 px-2 py-0.5 text-[0.72rem] font-medium text-brass-ink">3 to review</span>
          </div>
          <ul className="mt-3 space-y-1.5 font-mono text-[0.74rem]">
            {[
              ["10:42", "6:12", "admin notified"],
              ["09:15", "2:48", "admin notified"],
              ["08:03", "voicemail", "admin notified"],
            ].map(([t, d, s], i) => (
              <li key={t} style={idx(i)} className="spec-line grid grid-cols-[3rem_4.6rem_1fr] border-b border-dashed border-rule pb-1.5 last:border-0">
                <span className="tabular text-ink-mute">{t}</span>
                <span className="text-ink">{d}</span>
                <span className="text-right font-sans text-[0.76rem] text-field">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "correspondence":
      return (
        <div className="space-y-2 text-[0.8rem]">
          <div className="flex items-center justify-between rounded-[4px] bg-sheet px-3 py-2">
            <span className="text-ink-mute">Caller</span>
            <MaskedNumber raw="+91 00000 00042" masked="+91 ••••• ••••42" />
          </div>
          <div className="flex justify-center text-[0.74rem] font-medium text-brass-ink">Numbers masked both ways</div>
          <div className="flex items-center justify-between rounded-[4px] bg-sheet px-3 py-2">
            <span className="text-ink-mute">Investigator</span>
            <MaskedNumber raw="+91 00000 00007" masked="+91 ••••• ••••07" />
          </div>
        </div>
      );
    case "audit":
      return (
        <div>
          <div className="flex items-center justify-between text-[0.8rem]">
            <span className="font-medium text-ink">{sampleCase.number}</span>
            <span className="inline-flex items-center gap-1 text-[0.72rem] text-ink-mute">
              <Lock size={12} /> append only
            </span>
          </div>
          <ul className="mt-3 space-y-1.5 font-mono text-[0.72rem]">
            {[
              ["11:15:44", "recording.played"],
              ["11:20:10", "evidence.viewed"],
              ["11:21:02", "signed_url.issued"],
            ].map(([t, a], i) => (
              <li key={t} style={idx(i)} className="spec-line flex justify-between gap-3 border-b border-dashed border-rule pb-1.5 last:border-0">
                <span className="tabular text-ink-mute">{t}</span>
                <span className="text-field">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "analytics":
      return (
        <div className="text-[0.78rem]">
          {[
            ["Open", 12, 60],
            ["In progress", 7, 35],
            ["Closed this month", 9, 45],
          ].map(([label, n, w], i) => (
            <div key={label as string} className="mb-2.5 last:mb-0">
              <div className="flex justify-between">
                <span className="text-ink-soft">{label}</span>
                <span className="tabular font-mono text-ink">{n}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-paper-sunk">
                <div className="h-full" style={{ width: `${w}%` }}>
                  <div className="spec-bar h-full w-full rounded-full bg-field" style={idx(i)} />
                </div>
              </div>
            </div>
          ))}
          <p className="mt-3 text-[0.68rem] text-ink-mute">Sample figures</p>
        </div>
      );
    default:
      return null;
  }
}

function SpecRow({ i, icon, label, value }: { i: number; icon: ReactNode; label: string; value: string }) {
  return (
    <li style={idx(i)} className="spec-line flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-ink">
        <span className="text-field">{icon}</span>
        {label}
      </span>
      <span className="inline-flex items-center gap-1.5 text-[0.76rem] text-ink-mute">
        <span className="h-1.5 w-1.5 rounded-full bg-field" aria-hidden="true" />
        {value}
      </span>
    </li>
  );
}

const idx = (i: number) => ({ "--i": i }) as CSSProperties;

/** Shows the digits, then masks them: the bridge hides each side's number. */
function MaskedNumber({ raw, masked }: { raw: string; masked: string }) {
  return (
    <span className="mask-swap font-mono text-ink">
      <span className="mask-raw" aria-hidden="true">{raw}</span>
      <span className="mask-dots">{masked}</span>
    </span>
  );
}
