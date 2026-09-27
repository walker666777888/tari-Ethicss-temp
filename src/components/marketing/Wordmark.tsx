export function Wordmark({ tone = "ink" }: { tone?: "ink" | "field" }) {
  const ring = tone === "ink" ? "text-field" : "text-brass-bright";
  const word = tone === "ink" ? "text-ink" : "text-on-field";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" className={ring}>
        <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="10.5" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.2 1.6" />
        <path d="M11 11.5h10M16 11.5v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
      </svg>
      <span className={`font-seal text-[0.82rem] font-semibold ${word}`}>
        TARI <span className="font-medium opacity-70">Ethics</span>
      </span>
    </span>
  );
}
