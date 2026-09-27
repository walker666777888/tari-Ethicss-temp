export function Wordmark({ tone = "ink" }: { tone?: "ink" | "field" }) {
  const word = tone === "ink" ? "text-ink" : "text-on-field";
  return (
    <span className={`font-seal text-[0.82rem] font-semibold ${word}`}>
      TARI <span className="font-medium opacity-70">Ethics</span>
    </span>
  );
}
