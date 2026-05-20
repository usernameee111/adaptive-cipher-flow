import { motion } from "framer-motion";

const links = [
  { href: "#upload", label: "Upload" },
  { href: "#networks", label: "Networks" },
  { href: "#architecture", label: "Architecture" },
  { href: "#simulation", label: "Simulation" },
  { href: "#metrics", label: "Metrics" },
  { href: "#team", label: "Team" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="glass-strong flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-md bg-[var(--grad-cyber)]" style={{ background: "var(--grad-cyber)" }} />
            <div className="absolute inset-[2px] rounded-[5px] bg-background grid place-items-center font-mono text-[10px] text-gradient">AFS</div>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">AdaptiveFreqStego</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#upload" className="group relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium" style={{ background: "var(--grad-primary)" }}>
          <span className="relative z-10">Launch</span>
          <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
        </a>
      </nav>
    </motion.header>
  );
}
