"use client";

import { useId, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, prefersReducedMotion, getServerReducedMotionSnapshot);
}

interface ShinyButtonProps {
  label?: string;
  href?: string;
  newTab?: boolean;
  onClick?: () => void;
  className?: string;
  fillColor?: string;
  fillColorDeep?: string;
  insetColor?: string;
  labelColor?: string;
  accentColor?: string;
  accentSoftColor?: string;
  sweepDuration?: number;
  easeDuration?: number;
  arcWidth?: number;
  cornerRadius?: number;
  showSpeckle?: boolean;
  showSheen?: boolean;
  showArrow?: boolean;
  speckleOpacity?: number;
}

// Defaults use the site's green palette: deep field-green fill with an emerald sweep.
export function ShinyButton({
  label = "Get Started",
  href,
  newTab = false,
  onClick,
  className = "",
  fillColor = "#15533f",
  fillColorDeep = "#0a3024",
  insetColor = "rgba(127, 224, 173, 0.18)",
  labelColor = "#f1f6f2",
  accentColor = "#34c486",
  accentSoftColor = "#a6ecc6",
  sweepDuration = 3,
  easeDuration = 0.8,
  arcWidth = 5,
  cornerRadius = 32,
  showSpeckle = true,
  showSheen = true,
  showArrow = false,
  speckleOpacity = 0.22,
}: ShinyButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const instanceId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const scope = `gleam-edge-${instanceId}`;
  const Tag = href ? "a" : "button";

  const css = `
    @property --gradient-angle-${instanceId} { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
    @property --gradient-angle-offset-${instanceId} { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
    @property --gradient-percent-${instanceId} { syntax: "<percentage>"; initial-value: ${arcWidth}%; inherits: false; }
    @property --gradient-shine-${instanceId} { syntax: "<color>"; initial-value: white; inherits: false; }

    .${scope} {
      --gleam-base: ${fillColor};
      --gleam-deep: ${fillColorDeep};
      --gleam-inset: ${insetColor};
      --gleam-label: ${labelColor};
      --gleam-accent: ${accentColor};
      --gleam-accent-soft: ${accentSoftColor};
      --animation: gradient-angle-${instanceId} linear infinite;
      --duration: ${sweepDuration}s;
      --shadow-size: 2px;
      --transition: ${easeDuration}s cubic-bezier(0.25, 1, 0.5, 1);

      isolation: isolate;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      outline-offset: 4px;
      display: inline-flex;
      align-items: center;
      gap: 0.9rem;
      padding: ${showArrow ? "0.45rem 0.45rem 0.45rem 1.9rem" : "1.25rem 2.5rem"};
      font-size: 1.125rem;
      line-height: 1.2;
      font-weight: 500;
      letter-spacing: 0.005em;
      -webkit-font-smoothing: antialiased;
      border: 1px solid transparent;
      border-radius: ${cornerRadius}px;
      color: var(--gleam-label);
      background:
        linear-gradient(180deg, var(--gleam-base), var(--gleam-deep)) padding-box,
        conic-gradient(
          from calc(var(--gradient-angle-${instanceId}) - var(--gradient-angle-offset-${instanceId})),
          transparent,
          var(--gleam-accent) var(--gradient-percent-${instanceId}),
          var(--gradient-shine-${instanceId}) calc(var(--gradient-percent-${instanceId}) * 2),
          var(--gleam-accent) calc(var(--gradient-percent-${instanceId}) * 3),
          transparent calc(var(--gradient-percent-${instanceId}) * 4)
        ) border-box;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.14),
        inset 0 0 0 1px var(--gleam-inset),
        0 1px 2px rgba(10, 48, 36, 0.25),
        0 10px 24px -10px rgba(10, 48, 36, 0.55),
        0 22px 44px -22px rgba(10, 48, 36, 0.45);
      transition: var(--transition);
      transition-property:
        --gradient-angle-offset-${instanceId},
        --gradient-percent-${instanceId},
        --gradient-shine-${instanceId},
        box-shadow,
        transform;
    }

    .${scope}::before,
    .${scope}::after,
    .${scope} .gleam-label::before {
      content: "";
      pointer-events: none;
      position: absolute;
      inset-inline-start: 50%;
      inset-block-start: 50%;
      translate: -50% -50%;
      z-index: -1;
    }

    .${scope}:hover {
      transform: translateY(-1px);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.18),
        inset 0 0 0 1px var(--gleam-inset),
        0 2px 4px rgba(10, 48, 36, 0.25),
        0 16px 32px -12px rgba(10, 48, 36, 0.6),
        0 0 0 6px rgba(52, 196, 134, 0.08);
    }
    .${scope}:active { transform: translateY(0) scale(0.985); transition-duration: 0.12s; }
    .${scope}:focus-visible { outline: 2px solid var(--gleam-accent); outline-offset: 4px; }

    .${scope} .gleam-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 999px;
      color: var(--gleam-deep);
      background: linear-gradient(180deg, #ffffff, #d9efe2);
      box-shadow: inset 0 -1px 0 rgba(10, 48, 36, 0.12), 0 2px 6px -2px rgba(0, 0, 0, 0.35);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${scope}:is(:hover, :focus-visible) .gleam-icon { transform: translateX(3px); }

    .${scope}::before {
      --size: calc(100% - var(--shadow-size) * 3);
      --position: 2px;
      --space: calc(var(--position) * 2);
      width: var(--size);
      height: var(--size);
      background: radial-gradient(circle at var(--position) var(--position), white calc(var(--position) / 4), transparent 0) padding-box;
      background-size: var(--space) var(--space);
      background-repeat: space;
      mask-image: conic-gradient(from calc(var(--gradient-angle-${instanceId}) + 45deg), black, transparent 10% 90%, black);
      border-radius: inherit;
      opacity: ${showSpeckle ? speckleOpacity : 0};
      z-index: -1;
    }

    .${scope}::after {
      --animation: shimmer-${instanceId} linear infinite;
      width: 100%;
      aspect-ratio: 1;
      background: linear-gradient(-50deg, transparent, var(--gleam-accent), transparent);
      mask-image: radial-gradient(circle at bottom, transparent 40%, black);
      opacity: ${showSheen ? 0.35 : 0};
    }

    .${scope} .gleam-label, .${scope} .gleam-icon { z-index: 1; }

    .${scope} .gleam-label::before {
      --size: calc(100% + 1rem);
      width: var(--size);
      height: var(--size);
      box-shadow: inset 0 -1ex 2rem 4px color-mix(in srgb, var(--gleam-accent) 55%, transparent);
      opacity: 0;
      transition: opacity var(--transition);
      animation: calc(var(--duration) * 1.5) breathe-${instanceId} linear infinite;
    }

    .${scope},
    .${scope}::before,
    .${scope}::after {
      animation:
        var(--animation) var(--duration),
        var(--animation) calc(var(--duration) / 0.4) reverse paused;
      animation-composition: add;
    }

    .${scope}:is(:hover, :focus-visible) {
      --gradient-percent-${instanceId}: 20%;
      --gradient-angle-offset-${instanceId}: 95deg;
      --gradient-shine-${instanceId}: var(--gleam-accent-soft);
    }

    .${scope}:is(:hover, :focus-visible),
    .${scope}:is(:hover, :focus-visible)::before,
    .${scope}:is(:hover, :focus-visible)::after {
      animation-play-state: running;
    }

    .${scope}:is(:hover, :focus-visible) .gleam-label::before { opacity: 1; }

    @keyframes gradient-angle-${instanceId} { to { --gradient-angle-${instanceId}: 360deg; } }
    @keyframes shimmer-${instanceId} { to { rotate: 360deg; } }
    @keyframes breathe-${instanceId} { from, to { scale: 1; } 50% { scale: 1.2; } }

    @media (prefers-reduced-motion: reduce) {
      .${scope},
      .${scope}::before,
      .${scope}::after,
      .${scope} .gleam-label::before { animation: none !important; }

      .${scope}:is(:hover, :focus-visible),
      .${scope}:is(:hover, :focus-visible)::before,
      .${scope}:is(:hover, :focus-visible)::after { animation-play-state: paused !important; }

      .${scope}:is(:hover, :focus-visible) .gleam-label::before { opacity: 0; }

      .${scope}, .${scope} .gleam-icon { transition: none; }
      .${scope}:hover, .${scope}:is(:hover, :focus-visible) .gleam-icon { transform: none; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <Tag
        {...(href
          ? { href, ...(newTab && { target: "_blank", rel: "noopener noreferrer" }) }
          : { type: "button" as const })}
        className={`${scope} ${className}`}
        onClick={onClick}
        data-reduced-motion={reducedMotion ? "true" : undefined}
      >
        <span className="gleam-label">{label}</span>
        {showArrow && (
          <span className="gleam-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </span>
        )}
      </Tag>
    </>
  );
}

export default ShinyButton;
