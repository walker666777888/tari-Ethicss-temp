import { clientLogos, contact, stats } from "@/content/landing";
import { ArrowRight } from "./icons";
import { delay } from "./reveal";
import { Rosette } from "./Rosette";
import { Wordmark } from "./Wordmark";
import { Mark } from "./Mark";

/** Renders only once real client names or figures are supplied in content/landing.ts. */
export function Proof() {
  if (clientLogos.length === 0 && stats.length === 0) return null;
  return (
    <section aria-label="Organisations using TARI" className="border-t border-rule py-16">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        {stats.length > 0 && (
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[0.9rem] text-ink-soft">{s.label}</dt>
                <dd className="font-display mt-1 text-[2.2rem] font-semibold tabular">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {clientLogos.length > 0 && (
          <ul className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-6">
            {clientLogos.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <li key={logo.name}><img src={logo.src} alt={logo.name} className="h-8 w-auto opacity-80" /></li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section aria-labelledby="closing-title" className="relative isolate overflow-hidden bg-field text-on-field">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[26rem] left-1/2 -z-10 h-[56rem] w-[56rem] -translate-x-1/2">
        <Rosette className="rosette-turn h-full w-full text-brass-bright/[0.13]" />
      </div>
      <div className="mx-auto max-w-[1320px] px-5 py-28 text-center sm:px-8 sm:py-40">
        <h2
          id="closing-title"
          data-print
          className="font-registry mx-auto text-[clamp(1.9rem,4.4vw,4.1rem)] font-bold leading-[1.04]"
        >
          <span className="block">Put your ethics line</span>
          <span className="block text-brass-bright">on the record.</span>
        </h2>
        <p data-reveal style={delay(100)} className="text-pretty mx-auto mt-7 max-w-[34rem] text-[1.08rem] leading-[1.7] text-on-field-soft">
          See a report travel from a phone call to a closed case, and who can see it at every step.
        </p>
        <div data-reveal style={delay(200)} className="mt-11 flex justify-center">
          <a
            href={`mailto:${contact.connectEmail}`}
            className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-3 rounded-full bg-brass-bright pl-7 pr-2 text-[0.98rem] font-semibold text-field transition-[background-color,transform] duration-300 ease-[var(--ease-out)] hover:bg-brass-lift active:scale-[0.98]"
          >
            Connect with us
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-field text-brass-bright transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5">
              <ArrowRight size={17} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-field text-on-field">
      <div className="mx-auto max-w-[1320px] border-t border-field-rule px-5 pb-10 pt-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[24rem]">
            <Wordmark tone="field" />
            <p className="mt-5 text-[0.92rem] leading-[1.65] text-on-field-soft">
              <Mark tone="field">Whistleblower</Mark> hotline, reporting link and case management, run by Thought Arbitrage Consulting.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-1 text-[0.92rem]">
            <a href="#features" className="py-2 text-on-field-soft transition-colors hover:text-on-field">Features</a>
            <a href="#how-it-works" className="py-2 text-on-field-soft transition-colors hover:text-on-field">How it works</a>
            <a href="#safeguards" className="py-2 text-on-field-soft transition-colors hover:text-on-field">Safeguards</a>
          </nav>
        </div>
        <p className="mt-14 border-t border-field-rule pt-6 text-[0.8rem] text-on-field-soft">
          © 2026 Thought Arbitrage Consulting. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
