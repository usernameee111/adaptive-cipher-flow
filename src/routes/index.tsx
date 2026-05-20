import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/BackgroundFX";
import { CursorGlow } from "@/components/CursorGlow";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Simulation } from "@/components/Simulation";
import { Architecture } from "@/components/Architecture";
import { Fuzzy } from "@/components/Fuzzy";
import { Models } from "@/components/Models";
import { Metrics } from "@/components/Metrics";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adaptive Frequency-Domain Steganography · AI Research" },
      { name: "description", content: "AI-powered steganographic framework using Swin Transformers, Interval Type-2 Fuzzy Logic, GANs and Wavelet Frequency Analysis." },
      { property: "og:title", content: "Adaptive Frequency-Domain Steganography" },
      { property: "og:description", content: "Swin Transformers · IT2 Fuzzy Logic · GAN · DWT — a futuristic AI research project." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden text-foreground">
      <BackgroundFX />
      <CursorGlow />
      <Nav />
      <Hero />
      <Problem />
      <Simulation />
      <Architecture />
      <Fuzzy />
      <Models />
      <Metrics />
      <Team />
      <Footer />
    </main>
  );
}
