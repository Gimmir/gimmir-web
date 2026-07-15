import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { FOUNDERS_PAGE_QUERY_RESULT } from "@/sanity/types";

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

const GLYPHS = [GlyphScales, GlyphGrowth, GlyphTarget, GlyphCompass];

export function BelieveSection({
  data,
}: {
  data: NonNullable<FOUNDERS_PAGE_QUERY_RESULT>;
}) {
  const items = data.believeItems ?? [];

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            title={
              <>
                {data.believeHeading}
                {data.believeAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.believeAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((b, i) => {
            const Glyph = GLYPHS[i % GLYPHS.length];
            return (
              <Reveal key={b._key} delay={(i % 2) * 70} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-shadow duration-300 ease-out hover:shadow-[0_22px_48px_-28px_rgba(21,20,14,0.32)] md:p-9">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-4 -top-4 size-40 text-ink/[0.09] transition-[color,transform] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:text-lime/70 md:size-44"
                  >
                    <Glyph />
                  </div>

                  <div className="relative flex flex-1 flex-col">
                    <span className="display text-[3.25rem] leading-none text-lime md:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 text-2xl font-bold tracking-tight">
                      {b.title}
                    </h3>
                    <p className="mt-3 max-w-[42ch] leading-relaxed text-muted">
                      {b.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
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
                  {data.believeFinaleTitle}
                </h3>
              </div>
              <p className="max-w-sm text-lg leading-relaxed text-ink/80 md:text-right">
                {data.believeFinaleBody}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
