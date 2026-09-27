import { certification } from "@/content/landing";
import { CaseDocket } from "./CaseDocket";
import { ArrowRight } from "./icons";
import { Rosette } from "./Rosette";
import { delay } from "./reveal";
import { Mark } from "./Mark";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+2.5rem)] sm:pt-[calc(var(--nav-h)+4rem)]">
      <Rosette
        className="rosette-turn pointer-events-none absolute -right-[22rem] -top-[14rem] -z-10 h-[52rem] w-[52rem] text-field/[0.07] lg:-right-[12rem]"
      />

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <h1
          className="font-registry text-[clamp(2rem,4.3vw,3.9rem)] font-bold leading-[1.02] text-ink"
        >
          <span className="print-line block" style={delay(80)}>Every concern heard.</span>
          <span className="print-line block text-field" style={delay(300)}>Every case on the record.</span>
        </h1>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1320px] items-start gap-14 px-5 pb-20 sm:mt-14 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-5 lg:pt-4">
          <p
            data-hero
            style={delay(520)}
            className="text-pretty max-w-[34rem] text-[1.08rem] leading-[1.65] text-ink-soft sm:text-[1.18rem]"
          >
            TARI runs your organisation&apos;s <Mark>whistleblower</Mark> hotline and reporting inbox, and gives
            your compliance team one secure place to take each report from first call to closure.
          </p>

          <div
            data-hero
            style={delay(640)}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <button
              type="button"
              className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-3 rounded-full bg-field pl-7 pr-2 text-[0.98rem] font-medium text-on-field shadow-[0_12px_24px_-12px_rgba(13,59,46,0.6)] transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-out)] hover:bg-field-raise hover:shadow-[0_16px_30px_-12px_rgba(13,59,46,0.65)] active:scale-[0.98]"
            >
              Book a walkthrough
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brass-bright text-field transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5">
                <ArrowRight size={17} />
              </span>
            </button>
            <a
              href="#raise-a-concern"
              className="inline-flex items-center gap-2 py-2 text-[0.98rem] font-medium text-ink underline decoration-rule-strong transition-[text-decoration-color] duration-200 hover:decoration-ink"
            >
              Need to raise a concern?
            </a>
          </div>

          <ul
            data-hero
            style={delay(760)}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6 text-[0.86rem] text-ink-soft"
          >
            <li><span className="font-semibold text-ink">Whistleblower</span> hotline, India</li>
            <li>Dedicated reporting inbox</li>
            {certification.show && <li>{certification.name} audited</li>}
          </ul>
          {/* Unlayered .registry-stamp sets display, so visibility lives on a wrapper. */}
          <div aria-hidden="true" className="mt-14 ml-3 hidden lg:block">
            <div className="registry-stamp hero-stamp">
              <span className="font-registry text-[1.35rem] font-bold leading-none">Whistleblower</span>
              <span className="font-seal text-[0.66rem] font-semibold">Hotline and case register</span>
            </div>
          </div>
        </div>

        <div
          data-hero
          style={delay(420)}
          className="lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7"
        >
          <CaseDocket />
        </div>
      </div>
    </section>
  );
}
