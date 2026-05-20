import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";

const blocks = [
  { t: "Input Image", d: "RGB cover image entering the pipeline.", i: "01" },
  { t: "Y-Channel Extraction", d: "YCbCr conversion isolates the luminance for HVS-aware embedding.", i: "02" },
  { t: "DWT Frequency Transform", d: "Discrete Wavelet decomposition into LL, LH, HL, HH sub-bands.", i: "03" },
  { t: "Frequency Tensor Formation", d: "Multi-band tensor stack feeds the transformer analyzer.", i: "04" },
  { t: "Swin Transformer Analyzer", d: "Hierarchical shifted-window attention learns texture complexity.", i: "05" },
  { t: "Texture Complexity Map", d: "Per-region complexity scores rank embedding suitability.", i: "06" },
  { t: "Interval Type-2 Fuzzy Controller", d: "Uncertainty-aware reasoning across complexity, energy, edges.", i: "07" },
  { t: "Adaptive Capacity Allocation", d: "Per-pixel bpp budget driven by FOU-aware defuzzification.", i: "08" },
  { t: "GAN Generator", d: "Synthesizes the stego frequency tensor with adversarial loss.", i: "09" },
  { t: "Stego Image Creation", d: "Inverse DWT reconstructs a perceptually identical cover.", i: "10" },
  { t: "Extractor Network", d: "Dedicated decoder reverses the embedding under noise.", i: "11" },
  { t: "Secret Recovery", d: "Bit-perfect message restoration with BER monitoring.", i: "12" },
];

export function Architecture() {
  return (
    <Section id="architecture">
      <SectionHeader
        eyebrow="System Architecture"
        title={<>The <span className="text-gradient">Pipeline</span>, End-to-End</>}
        desc="Twelve stages of frequency-domain reasoning — each block hover-reactive, each connection animated."
      />

      <div className="relative">
        {/* center spine */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--electric)]/50 to-transparent md:block" />

        <div className="space-y-10">
          {blocks.map((b, i) => (
            <motion.div
              key={b.i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              <div className={`group glass relative overflow-hidden rounded-2xl p-6 transition-all hover:border-[var(--electric)]/60 hover:shadow-[var(--shadow-glow)] [direction:ltr] ${i % 2 === 1 ? "md:col-start-2" : ""}`}>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--electric)]/0 blur-3xl transition-all group-hover:bg-[var(--electric)]/30" />
                <div className="relative flex items-start gap-4">
                  <div className="font-mono text-3xl text-gradient">{b.i}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{b.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
                  </div>
                </div>
              </div>

              {/* center node */}
              <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block">
                <div className="relative h-4 w-4">
                  <div className="absolute inset-0 animate-ping rounded-full bg-[var(--cyan)]/40" />
                  <div className="absolute inset-0 rounded-full" style={{ background: "var(--grad-cyber)" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
