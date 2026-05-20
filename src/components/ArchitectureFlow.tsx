import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "./Section";

type Stage = {
  i: string;
  t: string;
  short: string;
  d: string;
  tech: string[];
  io: string;
};

const stages: Stage[] = [
  { i: "01", t: "Input Image", short: "RGB cover", d: "The original RGB cover image enters the pipeline. No pixels are altered yet.", tech: ["RGB · 256×256×3", "uint8 → float32", "Normalized [0,1]"], io: "→ tensor (3,256,256)" },
  { i: "02", t: "DWT Transform", short: "Frequency domain", d: "Discrete Wavelet Transform splits the luminance channel into LL, LH, HL, HH sub-bands.", tech: ["Haar / Daubechies-4", "1-level decomposition", "Sub-bands LL·LH·HL·HH"], io: "→ tensor (4,128,128)" },
  { i: "03", t: "Swin Transformer", short: "Hierarchical attention", d: "Shifted-window self-attention learns multi-scale texture features across the frequency tensor.", tech: ["4 hierarchical stages", "W-MSA + SW-MSA", "ImageNet-22k pretrained"], io: "→ features (768,8,8)" },
  { i: "04", t: "Complexity Analysis", short: "Per-region scoring", d: "Decoder head projects features back to a per-pixel texture complexity heatmap.", tech: ["Linear projection", "Sigmoid output", "Edge & variance fusion"], io: "→ map (256,256)" },
  { i: "05", t: "Interval Type-2 Fuzzy Logic", short: "Uncertainty reasoning", d: "27 fuzzy rules reason over texture, edge energy and local variance using Type-2 membership functions.", tech: ["IT2 membership", "FOU propagation", "27-rule Mamdani"], io: "→ fuzzy set" },
  { i: "06", t: "Capacity Allocation", short: "Adaptive bpp map", d: "Karnik–Mendel type reduction defuzzifies the fuzzy set into a per-region capacity in bits-per-pixel.", tech: ["KM iterations", "Centroid defuzz", "Bounded [0, 4] bpp"], io: "→ capacity (256,256)" },
  { i: "07", t: "Stego Generator", short: "U-Net + ResAttn", d: "The generator fuses cover, payload bits and the capacity map into a stego frequency tensor.", tech: ["U-Net backbone", "Residual attention", "Skip connections"], io: "→ stego tensor (4,128,128)" },
  { i: "08", t: "GAN Optimization", short: "Adversarial loop", d: "A PatchGAN discriminator enforces statistical indistinguishability between cover and stego frequencies.", tech: ["PatchGAN 70×70", "Spectral Norm", "BCE + R1"], io: "← gradient signal" },
  { i: "09", t: "Stego Image", short: "Inverse DWT", d: "Inverse DWT reconstructs an RGB image perceptually identical to the cover.", tech: ["IDWT", "Range clipping", "Quality validation"], io: "→ RGB (3,256,256)" },
  { i: "10", t: "Payload Extraction", short: "Noise-robust decoder", d: "The extractor network recovers the secret bits even after channel noise, JPEG compression and blur.", tech: ["Joint training", "Noise layer", "BER < 0.5%"], io: "→ binary payload" },
];

export function ArchitectureFlow() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="architecture">
      <SectionHeader
        eyebrow="System Architecture"
        title={<>The <span className="text-gradient">Frequency-Domain</span> Pipeline</>}
        desc="Ten cinematic stages — hover any block to surface its technical details, tensor shapes, and role inside the adaptive embedding loop."
      />

      <div className="relative">
        {/* glowing spine */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-[var(--electric)]/60 to-transparent" />
          <motion.div
            initial={{ y: "-10%" }} animate={{ y: "110%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 h-24 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, oklch(0.82 0.18 200), transparent)" }}
          />
        </div>

        <div className="space-y-8">
          {stages.map((s, i) => {
            const right = i % 2 === 1;
            const isActive = active === i;
            return (
              <motion.div
                key={s.i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.04 }}
                className={`relative grid items-center gap-6 md:grid-cols-2`}
              >
                <div className={right ? "md:col-start-2" : ""}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    onHoverStart={() => setActive(i)}
                    onHoverEnd={() => setActive(null)}
                    className="group glass relative overflow-hidden rounded-2xl p-6 transition-all hover:border-[var(--cyan)]/50 hover:shadow-[var(--shadow-glow)]"
                  >
                    {/* moving particles */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      {Array.from({ length: 3 }).map((_, p) => (
                        <motion.div
                          key={p}
                          initial={{ x: -20, y: 20 + p * 30, opacity: 0 }}
                          animate={{ x: 400, opacity: [0, 1, 0] }}
                          transition={{ duration: 3 + p, repeat: Infinity, delay: p * 0.8, ease: "linear" }}
                          className="absolute h-1 w-1 rounded-full bg-[var(--cyan)]"
                          style={{ boxShadow: "0 0 8px var(--cyan)" }}
                        />
                      ))}
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div className="font-mono text-4xl text-gradient">{s.i}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{s.t}</h3>
                          <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[var(--cyan)]">{s.short}</span>
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {s.tech.map((t) => (
                                  <span key={t} className="rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] text-foreground/80">
                                    {t}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-3 font-mono text-[10px] text-[var(--cyan)]">{s.io}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--electric)]/0 blur-3xl transition-all group-hover:bg-[var(--electric)]/30" />
                  </motion.div>
                </div>

                {/* center node */}
                <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block">
                  <div className="relative h-5 w-5">
                    <div className="absolute inset-0 animate-ping rounded-full bg-[var(--cyan)]/40" />
                    <div className="absolute inset-0 rounded-full" style={{ background: "var(--grad-cyber)" }} />
                    <div className="absolute inset-1 rounded-full bg-background" />
                  </div>
                </div>

                {/* arrow to next */}
                {i < stages.length - 1 && (
                  <div className="pointer-events-none absolute left-1/2 top-full hidden h-8 -translate-x-1/2 md:block">
                    <svg width="20" height="32" viewBox="0 0 20 32">
                      <motion.path d="M10 0 L10 28 M4 22 L10 28 L16 22" stroke="oklch(0.72 0.22 265)" strokeWidth="1.5" fill="none"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
