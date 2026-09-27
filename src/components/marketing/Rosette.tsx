// Guilloche rosette, the fine interlaced linework printed on stamp paper and cheques.
// Computed once on the server; ships as static SVG.

type Band = { base: number; amp: number; petals: number; strands: number };

const BANDS: Band[] = [
  { base: 300, amp: 26, petals: 18, strands: 14 },
  { base: 222, amp: 20, petals: 14, strands: 12 },
  { base: 150, amp: 16, petals: 10, strands: 10 },
  { base: 86, amp: 11, petals: 7, strands: 8 },
];

function bandPaths({ base, amp, petals, strands }: Band) {
  const steps = 360;
  const paths: string[] = [];
  for (let s = 0; s < strands; s++) {
    const phase = (s / strands) * Math.PI * 2;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const r = base + amp * Math.sin(petals * t + phase);
      const x = (r * Math.cos(t)).toFixed(1);
      const y = (r * Math.sin(t)).toFixed(1);
      d += `${i === 0 ? "M" : "L"}${x} ${y}`;
    }
    paths.push(d + "Z");
  }
  return paths;
}

const PATHS = BANDS.flatMap(bandPaths);

export function Rosette({ className = "", strokeWidth = 0.6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="-340 -340 680 680"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {PATHS.map((d, i) => (
        <path key={i} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
