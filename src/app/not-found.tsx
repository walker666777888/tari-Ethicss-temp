import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/marketing/icons";
import { Rosette } from "@/components/marketing/Rosette";
import { Wordmark } from "@/components/marketing/Wordmark";
import { delay } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "No record on file | TARI Ethics",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <Rosette className="rosette-turn pointer-events-none absolute -right-[20rem] -top-[16rem] -z-10 h-[48rem] w-[48rem] text-field/[0.07]" />

      <header className="mx-auto flex h-[var(--nav-h)] w-full max-w-[1320px] items-center px-5 sm:px-8">
        <Link href="/" className="-m-2 rounded p-2" aria-label="TARI Ethics, home">
          <Wordmark />
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-5 pb-24 sm:px-8">
        <div className="registry-stamp hero-stamp self-start">
          <span className="font-registry text-[1.2rem] font-bold leading-none">Not on file</span>
          <span className="font-mono text-[0.78rem] font-semibold">Error 404</span>
        </div>

        <h1 className="font-registry mt-12 text-[clamp(2rem,6vw,4.6rem)] font-bold leading-[1.02] text-ink">
          <span className="print-line block">No record</span>
          <span className="print-line block text-field" style={delay(220)}>
            on file.
          </span>
        </h1>
        <p className="text-pretty mt-8 max-w-[34rem] text-[1.08rem] leading-[1.7] text-ink-soft">
          This page is not in the register. The link may be mistyped, or the page may have moved.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href="/"
            className="group inline-flex h-[3.25rem] items-center gap-3 rounded-full bg-field pl-7 pr-2 text-[0.98rem] font-medium text-on-field transition-[background-color] duration-300 hover:bg-field-raise"
          >
            Back to the start
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brass-bright text-field transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5">
              <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
