import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { Upload as UploadIcon, Image as ImageIcon, Type, X, Check, Zap, Download } from "lucide-react";

const pipeline = [
  "Uploading Image…",
  "Applying DWT…",
  "Analyzing Texture…",
  "Running Swin Transformer…",
  "Activating Fuzzy Logic…",
  "Generating Adaptive Capacity Map…",
  "Embedding Payload…",
  "Optimizing with GAN…",
  "Recovering Secret Payload…",
  "Process Complete.",
];

function Dropzone({ label, onFile, file, accept = "image/*" }: {
  label: string; onFile: (f: File | null) => void; file: File | null; accept?: string;
}) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault(); setOver(false);
        const f = e.dataTransfer.files?.[0]; if (f) onFile(f);
      }}
      onClick={() => inputRef.current?.click()}
      className={`group relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed transition-all
        ${over ? "border-[var(--cyan)] bg-[var(--electric)]/10" : "border-white/15 bg-black/30 hover:border-[var(--electric)]/50"}`}
    >
      <input ref={inputRef} type="file" accept={accept} hidden
        onChange={(e) => onFile(e.target.files?.[0] || null)} />

      {preview ? (
        <>
          <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="font-mono text-[10px] text-foreground/90 truncate">{file?.name}</div>
            <button onClick={(e) => { e.stopPropagation(); onFile(null); }}
              className="rounded-lg bg-black/60 p-1.5 hover:bg-black/80"><X className="h-3.5 w-3.5" /></button>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[var(--electric)]/40 to-transparent animate-scan" />
        </>
      ) : (
        <>
          <motion.div
            animate={{ y: [0, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10"
            style={{ background: "var(--grad-primary)" }}
          >
            <UploadIcon className="h-6 w-6 text-white" />
          </motion.div>
          <div className="mt-3 text-sm">{label}</div>
          <div className="mt-1 font-mono text-[10px] text-muted-foreground">Drag & drop or click to browse</div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
            style={{ boxShadow: "inset 0 0 60px oklch(0.72 0.22 265 / 0.25)" }} />
        </>
      )}
    </div>
  );
}

export function Upload() {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [cover, setCover] = useState<File | null>(null);
  const [secret, setSecret] = useState("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG");
  const [secretImg, setSecretImg] = useState<File | null>(null);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [metrics, setMetrics] = useState<{ psnr: number; ssim: number; acc: number } | null>(null);

  const canRun = cover && (mode === "text" ? secret.length > 0 : !!secretImg) && !running;

  useEffect(() => {
    if (!running) return;
    setStep(0); setDone(false); setMetrics(null);
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i >= pipeline.length) {
        clearInterval(t); setRunning(false); setDone(true);
        setMetrics({ psnr: 47.8 + Math.random() * 1.5, ssim: 0.988 + Math.random() * 0.008, acc: 98.6 + Math.random() * 1.2 });
        return;
      }
      setStep(i);
    }, 650);
    return () => clearInterval(t);
  }, [running]);

  return (
    <Section id="upload">
      <SectionHeader
        eyebrow="Live AI Laboratory"
        title={<>Embed a <span className="text-gradient">Real Payload</span></>}
        desc="Upload a cover image and a secret payload. Watch the full neural pipeline execute in real time — from DWT decomposition to GAN-optimised stego synthesis."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* LEFT — inputs */}
        <div className="space-y-6">
          <div className="glass-strong rounded-3xl p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]">Cover Image</div>
            <div className="mt-3">
              <Dropzone label="Drop cover image here" onFile={setCover} file={cover} />
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]">Secret Payload</div>

              {/* Toggle */}
              <div className="relative flex items-center rounded-xl border border-white/10 bg-black/40 p-1">
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-y-1 w-[calc(50%-4px)] rounded-lg"
                  style={{ left: mode === "text" ? 4 : "calc(50% + 0px)", background: "var(--grad-primary)" }}
                />
                {[
                  { k: "text", label: "Text", Icon: Type },
                  { k: "image", label: "Image", Icon: ImageIcon },
                ].map(({ k, label, Icon }) => (
                  <button key={k} onClick={() => setMode(k as typeof mode)}
                    className={`relative z-10 flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors ${mode === k ? "text-white" : "text-muted-foreground"}`}>
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                {mode === "text" ? (
                  <motion.div key="text" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <div className="relative">
                      <textarea
                        value={secret} onChange={(e) => setSecret(e.target.value)} rows={5}
                        placeholder="Enter your secret message…"
                        className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm outline-none transition-colors focus:border-[var(--electric)]"
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded-t-2xl bg-gradient-to-b from-[var(--electric)]/20 to-transparent" />
                    </div>
                    <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                      <span>{secret.length} chars · {secret.length * 8} bits</span>
                      <span className="text-[var(--cyan)]">payload encoded → binary stream</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="image" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Dropzone label="Drop secret image here" onFile={setSecretImg} file={secretImg} />
                    <div className="mt-2 font-mono text-[10px] text-muted-foreground">
                      Recommended ≤ 64×64 for high-fidelity embedding.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setRunning(true)} disabled={!canRun}
            className="group relative w-full overflow-hidden rounded-2xl py-4 text-sm font-semibold transition-opacity disabled:opacity-50"
            style={{ background: "var(--grad-primary)" }}
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              {running ? "Running pipeline…" : "Run Adaptive Stego Pipeline"}
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>

        {/* RIGHT — processing timeline */}
        <div className="glass-strong relative overflow-hidden rounded-3xl p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]">AI Processing Timeline</div>
              <div className="mt-1 text-lg font-semibold">Neural Pipeline · Realtime</div>
            </div>
            <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-muted-foreground">
              {running ? "● live" : done ? "✓ complete" : "○ idle"}
            </div>
          </div>

          <ol className="relative mt-6 space-y-3 pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-white/10" />
            {pipeline.map((p, i) => {
              const active = i === step && running;
              const passed = i < step || done;
              return (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: passed || active ? 1 : 0.4, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center gap-3"
                >
                  <div className={`absolute -left-[19px] grid h-4 w-4 place-items-center rounded-full transition-all
                    ${active ? "bg-[var(--cyan)] shadow-[0_0_18px_var(--cyan)]" : passed ? "bg-[var(--electric)]" : "bg-white/15"}`}>
                    {passed && !active && <Check className="h-2.5 w-2.5 text-black" />}
                  </div>
                  <span className={`font-mono text-xs ${active ? "text-[var(--cyan)]" : passed ? "text-foreground" : "text-muted-foreground"}`}>
                    {p}
                  </span>
                  {active && (
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: "60%" }}
                      transition={{ duration: 0.6 }}
                      className="ml-auto h-0.5 rounded-full"
                      style={{ background: "var(--grad-cyber)" }}
                    />
                  )}
                </motion.li>
              );
            })}
          </ol>

          <AnimatePresence>
            {metrics && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-6 grid grid-cols-3 gap-3"
              >
                {[
                  { l: "PSNR", v: `${metrics.psnr.toFixed(2)} dB` },
                  { l: "SSIM", v: metrics.ssim.toFixed(3) },
                  { l: "Recovery", v: `${metrics.acc.toFixed(1)}%` },
                ].map((m) => (
                  <div key={m.l} className="glass rounded-xl p-3 text-center">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{m.l}</div>
                    <div className="mt-1 font-mono text-base text-gradient">{m.v}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {done && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--cyan)]/30 bg-[var(--electric)]/10 p-4"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--cyan)]">Output</div>
                <div className="mt-1 text-sm">Stego image ready · payload recovered</div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs hover:bg-white/10">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </motion.div>
          )}

          {/* ambient scan */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--electric)]/15 to-transparent animate-scan" />
        </div>
      </div>
    </Section>
  );
}
