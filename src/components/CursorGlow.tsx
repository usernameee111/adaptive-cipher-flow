import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-40 mix-blend-screen"
      style={{ background: "radial-gradient(circle, oklch(0.72 0.22 265 / 0.4), transparent 60%)" }}
    />
  );
}
