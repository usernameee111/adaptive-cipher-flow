import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";

const problems = [
  "Fixed payload embedding",
  "Weak texture awareness",
  "Visible artifacts under analysis",
  "Low robustness to attacks",
  "Poor adaptive concealment",
];
const solutions = [
  "Transformer-based texture understanding",
  "Adaptive frequency-domain embedding",
  "Uncertainty-aware fuzzy decision systems",
  "GAN-driven concealment optimization",
  "Per-region capacity allocation",
];

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeader
        eyebrow="The Research Problem"
        title={<>Beyond <span className="text-gradient">Classical</span> Steganography</>}
        desc="Existing systems treat every pixel equally. We don't."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass relative rounded-3xl p-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-destructive">The Problem</div>
          <h3 className="mt-2 text-2xl font-semibold">Traditional systems plateau.</h3>
          <ul className="mt-6 space-y-3">
            {problems.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-destructive" />{p}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass-strong relative rounded-3xl p-8 shadow-[var(--shadow-glow)]">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">Our Solution</div>
          <h3 className="mt-2 text-2xl font-semibold text-gradient">Intelligence per pixel.</h3>
          <ul className="mt-6 space-y-3">
            {solutions.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: "var(--grad-cyber)" }} />{p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
