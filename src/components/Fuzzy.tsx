import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";

function MembershipCurves() {
  const w = 600, h = 240;
  const gauss = (x: number, mu: number, sig: number) => Math.exp(-Math.pow((x - mu) / sig, 2));
  const points = (mu: number, sig: number) => {
    let d = "";
    for (let x = 0; x <= w; x += 4) {
      const y = h - gauss(x / w * 10 - 5, mu, sig) * (h - 20) - 10;
      d += (x === 0 ? "M" : "L") + x + "," + y + " ";
    }
    return d;
  };
  // FOU band (interval type-2): outer & inner
  const band = (mu: number, sigOuter: number, sigInner: number) => {
    let d = "";
    for (let x = 0; x <= w; x += 4) {
      const y = h - gauss(x / w * 10 - 5, mu, sigOuter) * (h - 20) - 10;
      d += (x === 0 ? "M" : "L") + x + "," + y + " ";
    }
    for (let x = w; x >= 0; x -= 4) {
      const y = h - gauss(x / w * 10 - 5, mu, sigInner) * (h - 20) - 10;
      d += "L" + x + "," + y + " ";
    }
    return d + "Z";
  };

  const sets = [
    { mu: -2.5, color: "oklch(0.82 0.18 200)" },
    { mu: 0, color: "oklch(0.72 0.22 265)" },
    { mu: 2.5, color: "oklch(0.68 0.25 310)" },
  ];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
      <defs>
        {sets.map((s, i) => (
          <linearGradient key={i} id={`g${i}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0.05" />
          </linearGradient>
        ))}
      </defs>
      {/* grid */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1="0" x2={w} y1={i * h / 4} y2={i * h / 4} stroke="oklch(1 0 0 / 0.06)" />
      ))}
      {sets.map((s, i) => (
        <g key={i}>
          <motion.path
            d={band(s.mu, 1.4, 0.8)} fill={`url(#g${i})`}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.2 }}
          />
          <motion.path
            d={points(s.mu, 1.4)} fill="none" stroke={s.color} strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.2 }}
          />
          <motion.path
            d={points(s.mu, 0.8)} fill="none" stroke={s.color} strokeWidth="2"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.2 + 0.2 }}
          />
        </g>
      ))}
      {["LOW", "MEDIUM", "HIGH"].map((l, i) => (
        <text key={l} x={(i + 0.5) * w / 3} y={h - 6} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="oklch(0.72 0.04 260)">{l}</text>
      ))}
    </svg>
  );
}

export function Fuzzy() {
  return (
    <Section id="fuzzy">
      <SectionHeader
        eyebrow="Interval Type-2 Fuzzy Logic"
        title={<>Reasoning Under <span className="text-gradient">Uncertainty</span></>}
        desc="Footprint-of-Uncertainty membership functions handle ambiguity that crisp logic and type-1 fuzzy systems collapse away."
      />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass-strong rounded-3xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Membership Functions · FOU</div>
            <div className="flex gap-3 font-mono text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--cyan)]" /> Lower</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--electric)]" /> Upper</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--neon)]" /> FOU</span>
            </div>
          </div>
          <div className="aspect-[5/2] rounded-xl bg-black/40 p-4">
            <MembershipCurves />
          </div>
        </div>
        <div className="space-y-4">
          {[
            { t: "Inputs", d: "Texture complexity, frequency energy, edge density." },
            { t: "Rules", d: "27 IF-THEN rules over LOW/MED/HIGH antecedents." },
            { t: "Type-Reduction", d: "Karnik-Mendel iterative reduction to crisp bpp." },
            { t: "Output", d: "Per-pixel adaptive capacity ∈ [0.5, 4.0] bpp." },
          ].map((c, i) => (
            <motion.div key={c.t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--cyan)]">{c.t}</div>
              <div className="mt-1 text-sm text-foreground/90">{c.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
