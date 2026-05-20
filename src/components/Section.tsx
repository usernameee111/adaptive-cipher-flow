import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: ReactNode; desc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--cyan)]">{eyebrow}</div>
      <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-balance text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-32 px-6 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
