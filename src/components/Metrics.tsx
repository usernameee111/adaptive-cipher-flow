import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Section, SectionHeader } from "./Section";

function Counter({ to, decimals = 1, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));
  useEffect(() => {
    if (inView) animate(mv, to, { duration: 1.8, ease: "easeOut" });
  }, [inView, to, mv]);
  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

function Radial({ value, label }: { value: number; label: string }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <div className="glass relative flex flex-col items-center rounded-2xl p-6">
      <svg width="140" height="140" className="-rotate-90">
        <defs>
          <linearGradient id={`r-${label}`} x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.18 200)" />
            <stop offset="100%" stopColor="oklch(0.68 0.25 310)" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="70" cy="70" r={r} stroke={`url(#r-${label})`} strokeWidth="10" fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (value / 100) * c }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <div className="font-mono text-3xl text-gradient"><Counter to={value} decimals={1} suffix="%" /></div>
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function Metrics() {
  return (
    <Section id="metrics">
      <SectionHeader
        eyebrow="Performance Dashboard"
        title={<>Benchmarks That <span className="text-gradient">Speak</span></>}
        desc="Measured across BOSSBase, BOWS2 and ImageNet-1k cover sets."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid grid-cols-2 gap-4">
          <Radial value={99.4} label="Extraction" />
          <Radial value={97.8} label="Robustness" />
          <Radial value={94.6} label="Imperceptibility" />
          <Radial value={92.1} label="GAN Convergence" />
        </div>
        <div className="glass-strong rounded-3xl p-8">
          <div className="grid grid-cols-2 gap-6">
            {[
              { l: "PSNR (avg)", v: 48.7, u: "dB", d: 2 },
              { l: "SSIM (avg)", v: 0.992, u: "", d: 3 },
              { l: "Adaptive Payload", v: 3.2, u: "bpp", d: 1 },
              { l: "BER under JPEG-75", v: 0.4, u: "%", d: 2 },
              { l: "Inference", v: 38, u: " ms", d: 0 },
              { l: "Training", v: 14, u: "h · A100", d: 0 },
            ].map((m) => (
              <div key={m.l}>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{m.l}</div>
                <div className="mt-1 font-mono text-4xl text-gradient">
                  <Counter to={m.v} decimals={m.d} suffix={m.u} />
                </div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "90%" }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                    className="h-full" style={{ background: "var(--grad-cyber)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
