import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const glyphProps = {
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-full w-full",
} as const;

/* judgment — a balance / scales */
function GlyphScales() {
  return (
    <svg {...glyphProps}>
      <path d="M50 20 V72" />
      <path d="M36 76 H64" />
      <path d="M22 34 H78" />
      <circle cx="50" cy="17" r="3.5" />
      <path d="M22 34 L15 52 M22 34 L29 52" />
      <path d="M13 52 Q22 63 31 52" />
      <path d="M78 34 L71 52 M78 34 L85 52" />
      <path d="M69 52 Q78 63 87 52" />
    </svg>
  );
}

/* survive growth — a rising trend that holds */
function GlyphGrowth() {
  return (
    <svg {...glyphProps}>
      <path d="M18 78 H84" />
      <path d="M22 66 L42 54 L56 60 L82 28" />
      <path d="M66 28 H82 V44" />
    </svg>
  );
}

/* specific beats generic — a target */
function GlyphTarget() {
  return (
    <svg {...glyphProps}>
      <circle cx="50" cy="50" r="30" />
      <circle cx="50" cy="50" r="19" />
      <circle cx="50" cy="50" r="8" />
      <circle cx="50" cy="50" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* truth — a compass pointing true */
function GlyphCompass() {
  return (
    <svg {...glyphProps}>
      <circle cx="50" cy="50" r="30" />
      <path d="M50 30 L59 50 L50 70 L41 50 Z" />
      <circle cx="50" cy="50" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* you own everything — a key */
function GlyphKey() {
  return (
    <svg {...glyphProps}>
      <circle cx="30" cy="50" r="13" />
      <path d="M43 50 H82" />
      <path d="M70 50 V61 M82 50 V59" />
    </svg>
  );
}

const BELIEFS = [
  {
    title: "Judgment over hours.",
    desc: "You are not buying time. You are buying decisions that hold up two years from now.",
    Glyph: GlyphScales,
  },
  {
    title: "We build to survive growth.",
    desc: "Anyone can ship a demo. We build the version that still works after you scale, add locations, and raise.",
    Glyph: GlyphGrowth,
  },
  {
    title: "Specific beats generic.",
    desc: "We build for sport and fitness, because we have shipped real products there. We would rather be the obvious choice for a few than a maybe for everyone.",
    Glyph: GlyphTarget,
  },
  {
    title: "The truth, even when it costs us.",
    desc: "We will tell you to cut a feature, change a plan, or not hire us, if that is the honest call.",
    Glyph: GlyphCompass,
  },
];

const FINALE = {
  title: "You own everything.",
  desc: "Your code, your IP, your accounts, yours from day one.",
};

export function BelieveSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="02" title="What we believe." />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {BELIEFS.map((b, i) => (
            <Reveal key={i} delay={(i % 2) * 70} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-shadow duration-300 ease-out hover:shadow-[0_22px_48px_-28px_rgba(21,20,14,0.32)] md:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-4 size-40 text-ink/[0.09] transition-[color,transform] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:text-lime/70 md:size-44"
                >
                  <b.Glyph />
                </div>

                <div className="relative flex flex-1 flex-col">
                  <span className="display text-[3.25rem] leading-none text-lime md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-[42ch] leading-relaxed text-muted">
                    {b.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative mt-5 overflow-hidden rounded-2xl bg-lime p-8 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-3 -top-5 size-44 text-ink/[0.13] md:size-52"
            >
              <GlyphKey />
            </div>

            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
              <div>
                <span className="display text-[3.25rem] leading-none text-ink/30 md:text-6xl">
                  05
                </span>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  {FINALE.title}
                </h3>
              </div>
              <p className="max-w-sm text-lg leading-relaxed text-ink/80 md:text-right">
                {FINALE.desc}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
