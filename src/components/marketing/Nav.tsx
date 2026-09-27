"use client";

import { useLenis } from "lenis/react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { nav } from "@/content/landing";
import { Close, Menu } from "./icons";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const lenis = useLenis();
  const [active, setActive] = useState<string | null>(null);
  const [rule, setRule] = useState<{ x: number; w: number } | null>(null);
  const primaryRef = useRef<HTMLElement>(null);

  // Scroll spy: the section crossing the middle band of the viewport owns the nav rule.
  useEffect(() => {
    const ids = [...nav.map((n) => n.href.slice(1)), "raise-a-concern"];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const top = () => window.scrollY < window.innerHeight * 0.5 && setActive(null);
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);

  // Measure the active link so the rule can travel to it with a transform.
  useEffect(() => {
    const place = () => {
      const link = active ? primaryRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
      setRule(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
    };
    const frame = requestAnimationFrame(place);
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", place);
    };
  }, [active]);

  // Lenis drives native scroll, so a passive scroll listener stays in sync with it.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out)] ${
        solid ? "bg-paper/92 shadow-[0_1px_0_var(--rule)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[var(--nav-h)] max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="-m-2 rounded p-2" aria-label="TARI Ethics, back to top">
          <Wordmark />
        </a>

        <nav ref={primaryRef} aria-label="Primary" className="relative hidden items-center gap-7 lg:flex xl:gap-9">
          <span
            aria-hidden="true"
            className="nav-rule pointer-events-none absolute -bottom-2 left-0 h-[1.5px] w-px bg-ink"
            style={
              {
                transform: rule ? `translateX(${rule.x}px) scaleX(${rule.w})` : "scaleX(0)",
                opacity: rule ? 1 : 0,
              } as CSSProperties
            }
          />
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href.slice(1) ? "location" : undefined}
              className="text-[0.92rem] text-ink-soft transition-colors duration-200 hover:text-ink aria-[current]:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#raise-a-concern"
            aria-current={active === "raise-a-concern" ? "location" : undefined}
            className="text-[0.92rem] font-medium text-brass-ink transition-colors duration-200 hover:text-ink"
          >
            Raise a concern
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-10 cursor-pointer items-center rounded-full border border-rule-strong px-5 text-[0.9rem] font-medium text-ink transition-[background-color,border-color] duration-200 hover:border-ink hover:bg-sheet sm:inline-flex"
          >
            Staff login
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        data-open={open}
        inert={!open}
        className="menu-sheet absolute inset-x-0 top-full border-t border-rule bg-paper px-5 pb-8 pt-4 shadow-[0_24px_40px_-24px_rgba(11,31,24,0.35)] lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[...nav, { href: "#raise-a-concern", label: "Raise a concern" }].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ "--i": i } as CSSProperties}
              className="menu-item font-display border-b border-rule py-4 text-[1.35rem] font-medium tracking-[-0.01em] text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          style={{ "--i": nav.length + 1 } as CSSProperties}
          className="menu-item mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full border border-rule-strong text-[0.95rem] font-medium text-ink"
        >
          Staff login
        </button>
      </div>
    </header>
  );
}
