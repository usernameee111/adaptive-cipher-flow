import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";

const models = [
  { name: "Swin Transformer", role: "Texture Analyzer", spec: "4 stages · window 7 · 88M params", desc: "Hierarchical shifted-window attention over frequency tensors." },
  { name: "Generator", role: "Stego Synthesizer", spec: "U-Net++ · 32M params", desc: "Adversarially trained to embed within perceptual budget." },
  { name: "Discriminator", role: "Adversary", spec: "PatchGAN · 4M params", desc: "Drives the generator toward imperceptible outputs." },
  { name: "Extractor", role: "Decoder", spec: "ResNet-50 backbone", desc: "Recovers the bitstream under noise and compression." },
  { name: "IT2 Fuzzy Engine", role: "Capacity Controller", spec: "27 rules · KM reducer", desc: "Allocates per-pixel embedding budget." },
  { name: "Wavelet Module", role: "Frequency Decomposer", spec: "Haar / db4 · 3 levels", desc: "Forward & inverse DWT, fully differentiable." },
];

export function Models() {
  return (
    <Section id="models">
      <SectionHeader
        eyebrow="AI Models"
        title={<>Six Networks, <span className="text-gradient">One Goal</span></>}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {models.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group glass relative overflow-hidden rounded-2xl p-6"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                 style={{ background: "var(--grad-cyber)" }} />
            <div className="relative">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--cyan)]">{m.role}</div>
              <h3 className="mt-1 text-xl font-semibold">{m.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{m.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] text-muted-foreground">{m.spec}</span>
                <span className="font-mono text-[10px] text-[var(--cyan)]">ACTIVE</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
