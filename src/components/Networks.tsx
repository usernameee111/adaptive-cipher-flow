import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { networkDiagrams } from "./NetworkDiagrams";
import { Maximize2, X, Plus, Minus, RotateCcw, Brain, Sparkles, Cpu, Shield, KeyRound } from "lucide-react";

type NetKey = keyof typeof networkDiagrams;

const networks: Array<{
  key: NetKey;
  title: string;
  tag: string;
  desc: string;
  icon: typeof Brain;
  highlights: string[];
  shapes: { input: string; output: string };
  accent: string;
}> = [
  {
    key: "swin",
    title: "Swin Transformer · Texture Analyzer",
    tag: "Backbone",
    desc: "Hierarchical shifted-window self-attention extracts multi-scale texture complexity from the frequency-domain cover, producing per-pixel embeddability scores.",
    icon: Brain,
    highlights: ["4-stage hierarchy", "W-MSA + SW-MSA", "Linear complexity", "ImageNet-22k pretrained"],
    shapes: { input: "256 × 256 × 3", output: "256 × 256 (complexity map)" },
    accent: "200",
  },
  {
    key: "fuzzy",
    title: "Interval Type-2 Fuzzy Controller",
    tag: "Reasoning",
    desc: "Uncertainty-aware reasoning across texture, edge energy and variance. The footprint of uncertainty propagates through Karnik–Mendel type reduction.",
    icon: Sparkles,
    highlights: ["27 fuzzy rules", "Mamdani inference", "KM type reduction", "FOU-aware defuzzifier"],
    shapes: { input: "3 crisp signals", output: "capacity (bpp) per region" },
    accent: "265",
  },
  {
    key: "generator",
    title: "Adaptive Stego Generator",
    tag: "Embedding",
    desc: "U-Net with residual attention bottleneck synthesises the stego frequency tensor, conditioned on the cover, payload bits and fuzzy capacity map.",
    icon: Cpu,
    highlights: ["U-Net + Res-Attn", "Skip connections", "Capacity-weighted MSE", "Adversarial loss"],
    shapes: { input: "256 × 256 × 8", output: "256 × 256 × 4 stego tensor" },
    accent: "295",
  },
  {
    key: "discriminator",
    title: "GAN Discriminator",
    tag: "Adversary",
    desc: "PatchGAN 70×70 critic with spectral normalisation. Forces the generator to produce statistically indistinguishable stego frequencies.",
    icon: Shield,
    highlights: ["PatchGAN 70×70", "Spectral Norm", "R1 regularisation", "BCE adversarial"],
    shapes: { input: "256 × 256 × 3", output: "30 × 30 real/fake map" },
    accent: "340",
  },
  {
    key: "extractor",
    title: "Payload Extractor Network",
    tag: "Decoder",
    desc: "Noise-robust decoder trained jointly with the generator. Survives JPEG compression, blur, and additive noise to recover the secret bits.",
    icon: KeyRound,
    highlights: ["Noise layer training", "DWT frontend", "6× residual stack", "BER < 0.5%"],
    shapes: { input: "256 × 256 × 3 (stego)", output: "binary payload vector" },
    accent: "160",
  },
];

function ZoomPan({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const dragging = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/40">
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onWheel={(e) => {
          e.preventDefault();
          const d = e.deltaY < 0 ? 1.1 : 0.9;
          setScale((s) => Math.max(0.5, Math.min(5, s * d)));
        }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          dragging.current = { x: e.clientX, y: e.clientY, tx, ty };
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          setTx(dragging.current.tx + (e.clientX - dragging.current.x));
          setTy(dragging.current.ty + (e.clientY - dragging.current.y));
        }}
        onPointerUp={() => (dragging.current = null)}
      >
        <div
          className="h-full w-full origin-center transition-transform"
          style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})`, transitionDuration: dragging.current ? "0ms" : "120ms" }}
        >
          {children}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-xl border border-white/10 bg-black/60 p-1 backdrop-blur">
        <button onClick={() => setScale((s) => Math.min(5, s * 1.2))} className="rounded-lg p-2 hover:bg-white/10"><Plus className="h-4 w-4" /></button>
        <button onClick={() => setScale((s) => Math.max(0.5, s * 0.83))} className="rounded-lg p-2 hover:bg-white/10"><Minus className="h-4 w-4" /></button>
        <button onClick={() => { setScale(1); setTx(0); setTy(0); }} className="rounded-lg p-2 hover:bg-white/10"><RotateCcw className="h-4 w-4" /></button>
        <span className="px-2 font-mono text-[10px] text-muted-foreground">{(scale * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

export function Networks() {
  const [openKey, setOpenKey] = useState<NetKey | null>(null);
  const open = networks.find((n) => n.key === openKey);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenKey(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Section id="networks">
      <SectionHeader
        eyebrow="Neural Architectures"
        title={<>Deep <span className="text-gradient">Neural Architecture</span> Visualization</>}
        desc="Five specialised networks orchestrate the adaptive frequency-domain embedding. Click any card to inspect its full architecture."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {networks.map((n, i) => {
          const Diag = networkDiagrams[n.key];
          const Icon = n.icon;
          return (
            <motion.button
              key={n.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              onClick={() => setOpenKey(n.key)}
              className="glass group relative overflow-hidden rounded-3xl p-6 text-left transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: `conic-gradient(from 0deg, transparent, oklch(0.72 0.22 ${n.accent} / 0.5), transparent 40%)` }} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 6, -6, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{ background: `linear-gradient(135deg, oklch(0.72 0.22 ${n.accent} / 0.3), oklch(0.68 0.25 310 / 0.3))` }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </motion.div>
                    <div className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--cyan)]">
                      {n.tag}
                    </div>
                  </div>
                  <Maximize2 className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-[var(--cyan)]" />
                </div>

                <h3 className="mt-4 text-lg font-semibold">{n.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{n.desc}</p>

                <div className="mt-4 aspect-[16/8] overflow-hidden rounded-xl border border-white/10 bg-black/40">
                  <div className="relative h-full w-full">
                    <Diag animated />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[var(--electric)]/30 to-transparent animate-scan" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {n.highlights.map((h) => (
                    <div key={h} className="rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1.5 font-mono text-[10px] text-muted-foreground">
                      • {h}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>in: <span className="text-foreground/80">{n.shapes.input}</span></span>
                  <span>out: <span className="text-foreground/80">{n.shapes.output}</span></span>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-xs text-foreground"
                  style={{ background: "var(--grad-primary)" }}>
                  <Maximize2 className="h-3.5 w-3.5" /> Expand fullscreen
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            onClick={() => setOpenKey(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong relative flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]">{open.tag}</div>
                  <h3 className="mt-1 text-xl font-semibold">{open.title}</h3>
                </div>
                <button onClick={() => setOpenKey(null)} className="rounded-xl border border-white/10 p-2 hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 p-5">
                <ZoomPan>
                  {(() => { const Diag = networkDiagrams[open.key]; return <Diag animated />; })()}
                </ZoomPan>
              </div>
              <div className="grid gap-3 border-t border-white/10 p-5 md:grid-cols-3">
                <div className="glass rounded-xl p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Input</div>
                  <div className="mt-1 font-mono text-sm">{open.shapes.input}</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Output</div>
                  <div className="mt-1 font-mono text-sm">{open.shapes.output}</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Highlights</div>
                  <div className="mt-1 text-xs text-muted-foreground">{open.highlights.join(" · ")}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
