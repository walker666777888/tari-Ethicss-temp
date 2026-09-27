import { contact, nextSteps } from "@/content/landing";
import { CopyValue } from "./CopyValue";
import { Mail, Phone } from "./icons";
import type { ReactNode } from "react";
import { delay } from "./reveal";
import { Mark } from "./Mark";

export function RaiseConcern() {
  return (
    <section id="raise-a-concern" aria-labelledby="raise-title" className="border-t border-rule py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <h2
              id="raise-title"
              data-print
              className="font-display text-balance text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            >
              Need to raise a concern?
            </h2>
            <p data-reveal style={delay(100)} className="text-pretty mt-6 max-w-[30rem] text-[1.06rem] leading-[1.7] text-ink-soft">
              Whether it is a quiet worry or serious wrongdoing, if your organisation uses TARI you can{" "}
              <Mark>blow the whistle</Mark> by phone or by email. You don&apos;t need an account, and you will never be
              asked to log in anywhere.
            </p>

            <div className="mt-10 space-y-3">
              <ContactLine
                href={contact.hotlineHref}
                icon={<Phone size={20} />}
                label="Call the hotline"
                copyLabel="hotline number"
                value={contact.hotline}
                d={160}
              />
              <ContactLine
                href={`mailto:${contact.reportingEmail}`}
                icon={<Mail size={20} />}
                label="Write to your reporting address"
                copyLabel="reporting address"
                value={contact.reportingEmail}
                d={220}
              />
            </div>
            {contact.isPlaceholder && (
              <p className="mt-4 text-[0.8rem] text-brass-ink">
                Placeholder details. Your organisation&apos;s own number and address will appear here.
              </p>
            )}
          </div>

          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <h3 data-reveal className="font-display text-[1.25rem] font-semibold tracking-[-0.01em] lg:pt-4">
              What happens next
            </h3>
            <ol className="mt-6">
              {nextSteps.map((step, i) => (
                <li
                  key={step.title}
                  data-reveal
                  style={delay(80 + i * 90)}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-rule py-6 last:border-b"
                >
                  <span className="font-mono text-[0.9rem] text-brass-ink tabular">{i + 1}.</span>
                  <div>
                    <p className="font-display text-[1.15rem] font-medium tracking-[-0.01em]">{step.title}</p>
                    <p className="text-pretty mt-2 text-[1rem] leading-[1.7] text-ink-soft">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p data-reveal className="mt-8 text-[0.92rem] leading-[1.6] text-ink-mute">
              If someone is in immediate danger, call the national emergency number{" "}
              <a href="tel:112" className="font-medium text-ink underline decoration-rule-strong hover:decoration-ink">
                112
              </a>{" "}
              first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLine({
  href,
  icon,
  label,
  copyLabel,
  value,
  d,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  copyLabel: string;
  value: string;
  d: number;
}) {
  return (
    <div
      data-reveal
      style={delay(d)}
      className="group flex items-center gap-3 rounded-[6px] border border-rule-strong bg-sheet py-3 pl-3 pr-3 transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:border-field hover:shadow-[0_14px_30px_-20px_rgba(11,31,24,0.5)] sm:py-4 sm:pl-4"
    >
      <a href={href} className="flex min-w-0 flex-1 items-center gap-4 rounded-[4px] p-1 sm:p-2">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-field text-on-field">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-[0.84rem] text-ink-mute">{label}</span>
          <span className="block break-all font-mono text-[1.02rem] font-medium text-ink sm:text-[1.12rem]">{value}</span>
        </span>
      </a>
      <CopyValue value={value} label={copyLabel} />
    </div>
  );
}
