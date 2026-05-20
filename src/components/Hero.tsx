import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

function NeuralWeb() {
  const ref = useRef<SVGSVGElement>(null);
  return (
    <svg ref={ref} viewBox="0 0 800 600" className="absolute inset-0 h-full w-full opacity-40">
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.18 200)" />
          <stop offset="100%" stopColor="oklch(0.68 0.25 310)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 40 }).map((_, i) => {
        const x1 = (i * 53) % 800, y1 = (i * 97) % 600;
        const x2 = (i * 211) % 800, y2 = (i * 173) % 600;
        return (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#line)" strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0.2] }}
            transition={{ duration: 4 + (i % 5), delay: i * 0.05, repeat: Infinity, repeatType: "reverse" }}
          />
        );
      })}
    </svg>
  );
}

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = titleRef.current; if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-32">
      <NeuralWeb />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cyan)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cyan)]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Research · Graduation Project · 2026
          </span>
        </motion.div>

        <motion.h1
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="text-glow text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          Adaptive Frequency-Domain
          <br />
          <span className="text-gradient">Steganography</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 max-w-3xl text-balance text-lg text-muted-foreground md:text-xl"
        >
          An AI-powered steganographic framework using <span className="text-foreground">Swin Transformers</span>,
          <span className="text-foreground"> Interval Type-2 Fuzzy Logic</span>,
          <span className="text-foreground"> GANs</span>, and
          <span className="text-foreground"> Wavelet Frequency Analysis</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#simulation" className="group relative overflow-hidden rounded-xl px-7 py-3.5 font-medium shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
             style={{ background: "var(--grad-primary)" }}>
            <span className="relative z-10 flex items-center gap-2">
              Launch Simulation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </span>
          </a>
          <a href="#architecture" className="glass rounded-xl px-7 py-3.5 font-medium transition-all hover:border-[var(--electric)]/60">
            Explore Architecture
          </a>
        </motion.div>

        {/* Holographic stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
        >
          {[
            { v: "48.7", u: "dB", l: "PSNR" },
            { v: "0.992", u: "", l: "SSIM" },
            { v: "99.4", u: "%", l: "Extraction" },
            { v: "3.2", u: "bpp", l: "Adaptive Payload" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-4">
              <div className="font-mono text-2xl text-gradient">
                {s.v}<span className="text-sm text-muted-foreground">{s.u}</span>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-2 w-1 rounded-full bg-[var(--cyan)]" />
        </div>
      </motion.div>
    </section>
  );
}
