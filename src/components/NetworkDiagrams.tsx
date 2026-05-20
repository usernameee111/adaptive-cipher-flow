// Inline SVG diagrams used in the Networks showcase + fullscreen modal.
// Each diagram is self-contained, animated, and scales with its container.

type DiagProps = { animated?: boolean };

const layerGrad = "url(#layerGrad)";
const edgeStroke = "url(#edgeStroke)";

function Defs() {
  return (
    <defs>
      <linearGradient id="layerGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.82 0.18 200)" />
        <stop offset="50%" stopColor="oklch(0.72 0.22 265)" />
        <stop offset="100%" stopColor="oklch(0.68 0.25 310)" />
      </linearGradient>
      <linearGradient id="edgeStroke" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="oklch(0.82 0.18 200 / 0.8)" />
        <stop offset="100%" stopColor="oklch(0.68 0.25 310 / 0.8)" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  );
}

function Block({ x, y, w, h, label, sub }: { x: number; y: number; w: number; h: number; label: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={layerGrad} opacity={0.15} stroke={edgeStroke} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 4 : 0)} textAnchor="middle" fill="white" fontSize={11} fontFamily="JetBrains Mono">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fill="oklch(0.72 0.04 260)" fontSize={9} fontFamily="JetBrains Mono">{sub}</text>}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, animated }: { x1: number; y1: number; x2: number; y2: number; animated?: boolean }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={edgeStroke} strokeWidth={1.5} markerEnd="url(#arr)" />
      {animated && (
        <circle r={2.5} fill="oklch(0.82 0.18 200)" filter="url(#glow)">
          <animateMotion dur="2.4s" repeatCount="indefinite" path={`M ${x1} ${y1} L ${x2} ${y2}`} />
        </circle>
      )}
    </g>
  );
}

function ArrowMarker() {
  return (
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="oklch(0.72 0.22 265)" />
    </marker>
  );
}

export function SwinDiagram({ animated = true }: DiagProps) {
  return (
    <svg viewBox="0 0 720 360" className="h-full w-full">
      <Defs /><ArrowMarker />
      {/* Patches */}
      <g>
        {Array.from({ length: 16 }).map((_, i) => {
          const c = i % 4, r = Math.floor(i / 4);
          return <rect key={i} x={20 + c * 18} y={120 + r * 18} width={16} height={16} rx={2} fill={layerGrad} opacity={0.25 + (i % 5) * 0.1} />;
        })}
      </g>
      <text x={56} y={102} textAnchor="middle" fontSize={10} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">Patch Embed 4×4</text>
      <text x={56} y={216} textAnchor="middle" fontSize={9} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">H×W×3</text>

      <Arrow x1={102} y1={155} x2={140} y2={155} animated={animated} />

      {/* Stages */}
      {[
        { x: 150, label: "Stage 1", sub: "C ·  H/4 × W/4", blocks: 2 },
        { x: 290, label: "Stage 2", sub: "2C · H/8 × W/8", blocks: 2 },
        { x: 430, label: "Stage 3", sub: "4C · H/16 × W/16", blocks: 6 },
        { x: 570, label: "Stage 4", sub: "8C · H/32 × W/32", blocks: 2 },
      ].map((s, i, a) => (
        <g key={s.x}>
          <Block x={s.x} y={120} w={110} h={70} label={s.label} sub={s.sub} />
          <text x={s.x + 55} y={208} textAnchor="middle" fontSize={9} fill="oklch(0.82 0.18 200)" fontFamily="JetBrains Mono">
            ×{s.blocks} Swin Blocks
          </text>
          <text x={s.x + 55} y={224} textAnchor="middle" fontSize={8} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">
            W-MSA → SW-MSA
          </text>
          {i < a.length - 1 && <Arrow x1={s.x + 110} y1={155} x2={a[i + 1].x} y2={155} animated={animated} />}
        </g>
      ))}

      {/* Output head */}
      <Arrow x1={680} y1={155} x2={680} y2={260} animated={animated} />
      <Block x={600} y={260} w={120} h={50} label="Complexity Map" sub="H × W" />

      <text x={360} y={30} textAnchor="middle" fontSize={14} fill="white" fontFamily="Space Grotesk" fontWeight="600">
        Swin Transformer · Hierarchical Shifted-Window Attention
      </text>
      <text x={360} y={50} textAnchor="middle" fontSize={10} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">
        Input: 256×256×3   →   Output: 256×256 texture complexity tensor
      </text>
    </svg>
  );
}

export function FuzzyDiagram({ animated = true }: DiagProps) {
  return (
    <svg viewBox="0 0 720 360" className="h-full w-full">
      <Defs /><ArrowMarker />
      <text x={360} y={30} textAnchor="middle" fontSize={14} fill="white" fontFamily="Space Grotesk" fontWeight="600">
        Interval Type-2 Fuzzy Logic Controller
      </text>

      {/* Inputs */}
      {["Texture", "Edge Energy", "Local Variance"].map((l, i) => (
        <g key={l}>
          <Block x={20} y={80 + i * 80} w={130} h={50} label={l} sub="crisp input" />
          <Arrow x1={150} y1={105 + i * 80} x2={210} y2={180} animated={animated} />
        </g>
      ))}

      {/* Fuzzifier */}
      <Block x={210} y={155} w={120} h={60} label="Fuzzifier" sub="IT2 MFs · FOU" />

      <Arrow x1={330} y1={185} x2={370} y2={185} animated={animated} />

      {/* Inference */}
      <Block x={370} y={140} w={140} h={90} label="Inference Engine" sub="Mamdani · 27 rules" />

      <Arrow x1={510} y1={185} x2={550} y2={185} animated={animated} />

      {/* Type reducer */}
      <Block x={550} y={155} w={130} h={60} label="Type Reducer" sub="KM iterations" />

      {/* FOU illustration */}
      <g transform="translate(370,260)">
        <path d="M0,40 Q40,0 80,30 Q120,55 160,15" stroke="oklch(0.82 0.18 200)" fill="none" strokeWidth={1.5} />
        <path d="M0,55 Q40,15 80,45 Q120,70 160,30" stroke="oklch(0.68 0.25 310)" fill="none" strokeWidth={1.5} />
        <path d="M0,40 Q40,0 80,30 Q120,55 160,15 L160,30 Q120,70 80,45 Q40,15 0,55 Z" fill="oklch(0.72 0.22 265 / 0.18)" />
        <text x={80} y={80} textAnchor="middle" fontSize={9} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">Footprint of Uncertainty</text>
      </g>

      <Arrow x1={615} y1={215} x2={615} y2={280} animated={animated} />
      <Block x={555} y={280} w={130} h={45} label="Defuzzifier" sub="capacity (bpp)" />
    </svg>
  );
}

export function GeneratorDiagram({ animated = true }: DiagProps) {
  return (
    <svg viewBox="0 0 720 360" className="h-full w-full">
      <Defs /><ArrowMarker />
      <text x={360} y={30} textAnchor="middle" fontSize={14} fill="white" fontFamily="Space Grotesk" fontWeight="600">
        Adaptive Stego Generator · U-Net + Residual Attention
      </text>

      {/* Encoder */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`e${i}`}>
          <Block x={40 + i * 80} y={140 - i * 10} w={64} h={40 + i * 18} label={`Enc ${i + 1}`} />
          {i < 3 && <Arrow x1={104 + i * 80} y1={160} x2={120 + i * 80} y2={160} animated={animated} />}
        </g>
      ))}
      {/* Bottleneck */}
      <Block x={360} y={150} w={80} h={70} label="Bottleneck" sub="Res-Attn" />
      <Arrow x1={336} y1={160} x2={360} y2={185} animated={animated} />
      <Arrow x1={440} y1={185} x2={464} y2={160} animated={animated} />

      {/* Decoder */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`d${i}`}>
          <Block x={464 + i * 60} y={130 + i * 6} w={56} h={70 - i * 10} label={`Dec ${4 - i}`} />
          {i < 3 && <Arrow x1={520 + i * 60} y1={160} x2={524 + i * 60} y2={160} animated={animated} />}
        </g>
      ))}

      {/* Skip connections */}
      {[0, 1, 2].map((i) => (
        <path key={`sk${i}`} d={`M ${72 + i * 80} 140 C ${200 + i * 30} 60, ${520 + i * 60} 60, ${492 + i * 60} 130`}
          stroke="oklch(0.82 0.18 200 / 0.5)" strokeDasharray="3 3" fill="none" />
      ))}

      <text x={70} y={260} fontSize={10} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">Input: cover ⊕ payload ⊕ capacity map (256×256×8)</text>
      <text x={70} y={278} fontSize={10} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">Output: stego frequency tensor (256×256×4)</text>
      <text x={70} y={296} fontSize={10} fill="oklch(0.82 0.18 200)" fontFamily="JetBrains Mono">Loss: L1 + perceptual + adversarial + capacity-weighted MSE</text>
    </svg>
  );
}

export function DiscriminatorDiagram({ animated = true }: DiagProps) {
  return (
    <svg viewBox="0 0 720 360" className="h-full w-full">
      <Defs /><ArrowMarker />
      <text x={360} y={30} textAnchor="middle" fontSize={14} fill="white" fontFamily="Space Grotesk" fontWeight="600">
        GAN Discriminator · PatchGAN 70×70
      </text>

      <Block x={20} y={150} w={110} h={60} label="Input" sub="256×256×3" />
      {[
        { label: "Conv 4×4 / s2", sub: "64ch" },
        { label: "Conv 4×4 / s2", sub: "128ch · BN" },
        { label: "Conv 4×4 / s2", sub: "256ch · BN" },
        { label: "Conv 4×4 / s1", sub: "512ch · BN" },
      ].map((b, i) => (
        <g key={b.label + i}>
          <Arrow x1={130 + i * 120} y1={180} x2={150 + i * 120} y2={180} animated={animated} />
          <Block x={150 + i * 120} y={150} w={110} h={60} label={b.label} sub={b.sub} />
        </g>
      ))}
      <Arrow x1={620} y1={180} x2={650} y2={180} animated={animated} />
      <Block x={620} y={230} w={80} h={50} label="30×30 map" sub="real / fake" />
      <Arrow x1={660} y1={210} x2={660} y2={230} animated={animated} />

      <text x={360} y={310} textAnchor="middle" fontSize={10} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">
        LeakyReLU(0.2) · Spectral Norm · BCE + R1 regularization
      </text>
    </svg>
  );
}

export function ExtractorDiagram({ animated = true }: DiagProps) {
  return (
    <svg viewBox="0 0 720 360" className="h-full w-full">
      <Defs /><ArrowMarker />
      <text x={360} y={30} textAnchor="middle" fontSize={14} fill="white" fontFamily="Space Grotesk" fontWeight="600">
        Payload Extractor Network · Noise-Robust Decoder
      </text>

      <Block x={20} y={150} w={120} h={60} label="Stego Image" sub="256×256×3" />
      <Arrow x1={140} y1={180} x2={170} y2={180} animated={animated} />

      <Block x={170} y={150} w={110} h={60} label="Noise Layer" sub="JPEG · blur · crop" />
      <Arrow x1={280} y1={180} x2={310} y2={180} animated={animated} />

      <Block x={310} y={150} w={120} h={60} label="DWT" sub="frequency bands" />
      <Arrow x1={430} y1={180} x2={460} y2={180} animated={animated} />

      <Block x={460} y={140} w={130} h={80} label="Conv Stack" sub="6× residual" />
      <Arrow x1={590} y1={180} x2={620} y2={180} animated={animated} />

      <Block x={620} y={150} w={80} h={60} label="Sigmoid" sub="bits" />

      <g transform="translate(170,260)">
        <rect width={430} height={50} rx={8} fill={layerGrad} opacity={0.1} />
        <text x={215} y={20} textAnchor="middle" fontSize={10} fill="oklch(0.82 0.18 200)" fontFamily="JetBrains Mono">
          Trained jointly with Generator (adversarial + reconstruction)
        </text>
        <text x={215} y={38} textAnchor="middle" fontSize={9} fill="oklch(0.72 0.04 260)" fontFamily="JetBrains Mono">
          BER &lt; 0.5% under AWGN(σ=2) · JPEG(Q=75) · Gaussian Blur(3×3)
        </text>
      </g>
    </svg>
  );
}

export const networkDiagrams = {
  swin: SwinDiagram,
  fuzzy: FuzzyDiagram,
  generator: GeneratorDiagram,
  discriminator: DiscriminatorDiagram,
  extractor: ExtractorDiagram,
} as const;
