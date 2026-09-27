import { certification } from "@/content/landing";
import { CaseDocket } from "./CaseDocket";
import { Rosette } from "./Rosette";
import { delay } from "./reveal";
import { Mark } from "./Mark";
import { ShinyButton } from "@/components/ui/shiny-button";
import { contact } from "@/content/landing";

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
            TARI runs your organisation&apos;s <Mark>whistleblower</Mark> hotline and secure reporting link, and gives
            your compliance team one secure place to take each report from first call to closure.
          </p>

          <div
            data-hero
            style={delay(640)}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <ShinyButton label="Connect with us" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.connectEmail}`} newTab />
          </div>

          <ul
            data-hero
            style={delay(760)}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6 text-[0.86rem] text-ink-soft"
          >
            <li><span className="font-semibold text-ink">Whistleblower</span> hotline, India</li>
            <li>Dedicated reporting link</li>
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
