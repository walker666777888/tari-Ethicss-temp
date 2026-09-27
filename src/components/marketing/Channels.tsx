"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { sampleCase } from "@/content/landing";
import { Mail, Phone } from "./icons";
import { delay } from "./reveal";
import { Mark } from "./Mark";

const JOIN_PATHS = ["M250 0 C250 110 500 70 500 176", "M750 0 C750 110 500 70 500 176"];

export function Channels() {
  const joinRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: joinRef, offset: ["start 0.85", "end 0.55"] });
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const length = useTransform(eased, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" className="relative border-t border-rule py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2
            data-print
            className="font-display text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] lg:col-span-6"
          >
            Two ways in. One record.
          </h2>
          <p
            data-reveal
            style={delay(100)}
            className="text-pretty max-w-[36rem] self-end text-[1.06rem] leading-[1.7] text-ink-soft lg:col-span-5 lg:col-start-8"
          >
            <Mark>Whistleblowers</Mark> report the way they are comfortable with: they call, or they write. Both
            routes arrive in the same place, and neither one ever asks the <Mark>whistleblower</Mark> to sign up or
            log in.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 md:gap-8 lg:mt-20">
          <Channel
            icon={<Phone size={22} />}
            lead="The hotline answers, records and queues every call."
            body="Callers reach an available investigator with both numbers masked, or leave a message. Every call is recorded and waits in a review queue for your compliance admin."
            d={0}
          />
          <Channel
            icon={<Mail size={22} />}
            lead="The inbox is read by a person and entered by hand."
            body="Reports sent to your organisation's dedicated address are read by your compliance admin, who opens the case and keeps the original message as evidence."
            d={120}
          />
        </div>

        <div ref={joinRef} className="relative mx-auto mt-2 hidden h-44 max-w-[1320px] md:block" aria-hidden="true">
          <svg viewBox="0 0 1000 176" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M250 0 C250 110 500 70 500 176" className="stroke-rule" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 5" />
            <path d="M750 0 C750 110 500 70 500 176" className="stroke-rule" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 5" />
            {JOIN_PATHS.map((d) =>
              reduce ? (
                <path key={d} d={d} className="stroke-field" fill="none" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
              ) : (
                <m.path
                  key={d}
                  d={d}
                  className="stroke-field"
                  fill="none"
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: length }}
                />
              ),
            )}
          </svg>
        </div>

        <div className="mx-auto mt-5 flex max-w-[44rem] flex-col items-center text-center md:mt-0">
          <div data-stamp className="registry-stamp" aria-label={`Case opened, ${sampleCase.number}`}>
            <span className="font-seal text-[0.66rem] font-bold">Case opened</span>
            <span className="font-mono text-[1.05rem] font-semibold tracking-tight">{sampleCase.number}</span>
          </div>
          <p data-reveal className="text-pretty mt-7 text-[1.06rem] leading-[1.7] text-ink-soft">
            Nothing becomes a case on its own. A named compliance admin reviews every call and every
            email, then opens the case or links the call to one that already exists.
          </p>
        </div>
      </div>
    </section>
  );
}

function Channel({
  icon,
  lead,
  body,
  d,
}: {
  icon: ReactNode;
  lead: string;
  body: string;
  d: number;
}) {
  return (
    <article data-reveal style={delay(d)} className="border-t-2 border-ink pt-7">
      <h3 className="font-display flex items-start gap-4 text-[1.5rem] font-medium leading-[1.18] tracking-[-0.02em] sm:text-[1.8rem]">
        <span className="mt-[0.3em] shrink-0 text-field">{icon}</span>
        <span className="text-balance">{lead}</span>
      </h3>
      <p className="text-pretty mt-4 max-w-[32rem] pl-[2.4rem] text-[1rem] leading-[1.7] text-ink-soft">{body}</p>
    </article>
  );
}
