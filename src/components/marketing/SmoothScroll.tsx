"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

// Sections land flush under the fixed nav (--nav-h: 72px).
const ANCHOR_OFFSET = -72;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  // Land on the right spot once layout has settled: the top on a plain load or reload,
  // or the linked section when the URL carries a hash.
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const lenis = lenisRef.current?.lenis;
        const target = location.hash ? document.querySelector<HTMLElement>(decodeURIComponent(location.hash)) : null;
        if (target) {
          const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY + ANCHOR_OFFSET);
          window.scrollTo(0, top);
          lenis?.scrollTo(top, { immediate: true, force: true });
        } else {
          window.scrollTo(0, 0);
          lenis?.scrollTo(0, { immediate: true, force: true });
        }
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  // In-page links: one owner for the offset, so sections land flush under the fixed nav.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href") ?? "";
      const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;
      e.preventDefault();
      const lenis = lenisRef.current?.lenis;
      const top = target.getBoundingClientRect().top + window.scrollY + ANCHOR_OFFSET;
      if (lenis) lenis.scrollTo(Math.max(0, top), { duration: 1.2 });
      else window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      history.pushState(null, "", hash);
      if (target.id === "main") target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    // Reveal observer: one shared IntersectionObserver for every [data-reveal] and [data-rule].
    const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal], [data-rule], [data-stamp], [data-print]")];
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    // A fully clipped [data-print] heading has no visible area, so the observer would never
    // see it. Watch its container instead and mark the heading when that arrives.
    const owners = new Map<Element, HTMLElement[]>();
    for (const el of targets) {
      const watch = el.hasAttribute("data-print") ? (el.parentElement ?? el) : el;
      owners.set(watch, [...(owners.get(watch) ?? []), el]);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          owners.get(entry.target)?.forEach((el) => el.classList.add("is-in"));
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    owners.forEach((_, el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.11,
        wheelMultiplier: 0.95,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
