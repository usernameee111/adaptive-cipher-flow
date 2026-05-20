import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "./Section";

const stages = [
  "Y-Channel Extraction",
  "DWT Frequency Transform",
  "Swin Texture Analysis",
  "Fuzzy Capacity Allocation",
  "GAN Stego Synthesis",
  "Secret Recovery",
];

function Heatmap({ seed = 1, color = "265" }: { seed?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const w = c.width = 200, h = c.height = 140;
    const img = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const v = Math.sin((x + seed * 30) * 0.04) * Math.cos((y + seed * 10) * 0.05) +
                  Math.sin((x * y) * 0.0006 + seed) * 0.5;
        const n = (v + 1.5) / 3;
        const i = (y * w + x) * 4;
        img.data[i] = 80 + n * 160;
        img.data[i + 1] = 100 + n * 80;
        img.data[i + 2] = 200 + n * 55;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [seed]);
  return <canvas ref={ref} className="h-full w-full rounded-lg" style={{ filter: `hue-rotate(${color}deg) saturate(1.4)` }} />;
}

function Panel({ title, children, tag }: { title: string; children: React.ReactNode; tag?: string }) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{title}</div>
        {tag && <div className="rounded-md bg-[var(--electric)]/15 px-1.5 py-0.5 font-mono text-[9px] text-[var(--cyan)]">{tag}</div>}
      </div>
      <div className="relative aspect-[10/7] overflow-hidden rounded-lg bg-black/40">
        {children}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[var(--electric)]/30 to-transparent animate-scan" />
      </div>
    </div>
  );
}

export function Simulation() {
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(-1);
  const [payload, setPayload] = useState(2.4);
  const [secret, setSecret] = useState("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG");
  const [metrics, setMetrics] = useState({ psnr: 0, ssim: 0, acc: 0 });

  useEffect(() => {
    if (!running) return;
    setStage(0);
    setMetrics({ psnr: 0, ssim: 0, acc: 0 });
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i >= stages.length) {
        clearInterval(t);
        setRunning(false);
        setMetrics({ psnr: 47.8 + Math.random() * 1.5, ssim: 0.988 + Math.random() * 0.008, acc: 98.6 + Math.random() * 1.2 });
        return;
      }
      setStage(i);
    }, 700);
    return () => clearInterval(t);
  }, [running]);

  return (
    <Section id="simulation">
      <SectionHeader
        eyebrow="Interactive Laboratory"
        title={<>Run the <span className="text-gradient">AI Pipeline</span> Live</>}
        desc="A full visualization of the adaptive embedding flow — from frequency decomposition to GAN-driven concealment and extractor recovery."
      />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Control panel */}
        <div className="glass-strong space-y-5 rounded-3xl p-6">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Cover Image</label>
            <div className="mt-2 flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/30 text-sm text-muted-foreground">
              cover_512.png · 512×512
            </div>
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Secret Message</label>
            <textarea
              value={secret} onChange={(e) => setSecret(e.target.value)}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/40 p-3 text-sm font-mono outline-none focus:border-[var(--electric)]"
              rows={3}
            />
            <div className="mt-1 text-right font-mono text-[10px] text-muted-foreground">{secret.length} chars · {secret.length * 8} bits</div>
          </div>
          <div>
            <label className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Payload Strength</span>
              <span className="text-[var(--cyan)]">{payload.toFixed(2)} bpp</span>
            </label>
            <input
              type="range" min={0.5} max={4} step={0.1} value={payload}
              onChange={(e) => setPayload(parseFloat(e.target.value))}
              className="mt-3 w-full accent-[var(--electric)]"
            />
          </div>
          <button
            onClick={() => setRunning(true)} disabled={running}
            className="group relative w-full overflow-hidden rounded-xl py-3.5 font-medium disabled:opacity-60"
            style={{ background: "var(--grad-primary)" }}
          >
            <span className="relative z-10">{running ? "Running pipeline…" : "Run AI Simulation"}</span>
          </button>

          {/* Stage progress */}
          <div className="space-y-2 pt-2">
            {stages.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full transition-all ${i <= stage ? "bg-[var(--cyan)] shadow-[0_0_12px_var(--cyan)]" : "bg-white/15"}`} />
                <span className={`font-mono text-xs ${i <= stage ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i === stage && running && (
                  <span className="ml-auto font-mono text-[10px] text-[var(--cyan)]">processing</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visualization grid */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Panel title="Original Cover" tag="RGB"><Heatmap seed={1} color="0" /></Panel>
            <Panel title="DWT Sub-bands" tag="LL·LH·HL·HH"><Heatmap seed={3} color="40" /></Panel>
            <Panel title="Swin Complexity" tag="Attention"><Heatmap seed={5} color="100" /></Panel>
            <Panel title="Fuzzy Capacity Map" tag="IT2-FLS"><Heatmap seed={7} color="160" /></Panel>
            <Panel title="Stego Image" tag="GAN-out"><Heatmap seed={2} color="0" /></Panel>
            <Panel title="Difference ×40" tag="δ"><Heatmap seed={9} color="280" /></Panel>
          </div>

          {/* Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { l: "PSNR", v: metrics.psnr, u: "dB", max: 50 },
              { l: "SSIM", v: metrics.ssim, u: "", max: 1 },
              { l: "Extraction Acc.", v: metrics.acc, u: "%", max: 100 },
            ].map((m) => (
              <div key={m.l} className="glass rounded-2xl p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{m.l}</div>
                <div className="mt-1 font-mono text-3xl text-gradient">
                  {m.v.toFixed(m.max === 1 ? 3 : 2)}<span className="text-sm text-muted-foreground">{m.u}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(m.v / m.max) * 100}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "var(--grad-cyber)" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {metrics.acc > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="glass-strong rounded-2xl p-5"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--cyan)]">Extracted Secret</div>
                <div className="mt-2 break-all font-mono text-sm text-foreground/90">{secret}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
