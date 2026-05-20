import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";

const team = [
  { name: "Researcher One", role: "Lead · Architecture & GAN", initials: "R1" },
  { name: "Researcher Two", role: "Fuzzy Logic & Optimization", initials: "R2" },
  { name: "Researcher Three", role: "Transformers & Training", initials: "R3" },
  { name: "Researcher Four", role: "Evaluation & Robustness", initials: "R4" },
];
const supervisors = [
  { name: "Prof. Supervisor", role: "Principal Supervisor", initials: "PS" },
  { name: "Dr. Co-Supervisor", role: "Co-Supervisor", initials: "DS" },
];

function Card({ p, big = false }: { p: { name: string; role: string; initials: string }; big?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="glass group relative overflow-hidden rounded-3xl p-6 text-center"
    >
      <div className={`relative mx-auto ${big ? "h-32 w-32" : "h-28 w-28"}`}>
        <div className="absolute inset-0 animate-spin-slow rounded-full opacity-70" style={{ background: "conic-gradient(from 0deg, var(--cyan), var(--electric), var(--neon), var(--magenta), var(--cyan))" }} />
        <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-background font-mono text-2xl text-gradient">
          {p.initials}
        </div>
      </div>
      <h4 className="mt-5 text-base font-semibold">{p.name}</h4>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.role}</div>
      <div className="mt-4 flex justify-center gap-2">
        {["in", "gh"].map((s) => (
          <a key={s} href="#" className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 font-mono text-[10px] uppercase text-muted-foreground transition-colors hover:border-[var(--electric)] hover:text-foreground">{s}</a>
        ))}
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <Section id="team">
      <SectionHeader eyebrow="The Team" title={<>Behind the <span className="text-gradient">Research</span></>} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((p) => <Card key={p.name} p={p} />)}
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-2xl">
        {supervisors.map((p) => <Card key={p.name} p={p} big />)}
      </div>
    </Section>
  );
}
