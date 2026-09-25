import { FaceStack } from "@/components/blocks/face-stack";
import { MonoMarquee } from "@/components/blocks/mono-marquee";
import { GRAIN } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * The sheet's surface: daylight from the top left, a soft lime light
 * behind the card, and the hero's grain. One static background: nothing
 * to composite while the words rise.
 */
function ManifestoBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: [
          GRAIN,
          "radial-gradient(ellipse 42% 52% at 84% 62%, rgba(201,242,61,0.26) 0%, rgba(201,242,61,0.12) 40%, rgba(201,242,61,0.04) 64%, rgba(201,242,61,0) 80%)",
          "radial-gradient(ellipse 55% 60% at 0% 0%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0) 75%)",
        ].join(", "),
        backgroundSize: "180px 180px, 100% 100%, 100% 100%",
      }}
    />
  );
}

/**
 * The lime highlighter behind "own it.": a filled, slightly uneven band
 * (the one lime thing on this screen), swiped on left to right after the
 * words have risen. Sits under the lower half of the letters.
 */
function Highlight({ delay }: { delay: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 40"
      preserveAspectRatio="none"
      className="wipe pointer-events-none absolute -left-[0.07em] bottom-[0.1em] -z-10 h-[0.44em] w-[calc(100%+0.14em)]"
      style={{ "--d": `${delay}ms`, "--dur": "820ms" } as React.CSSProperties}
    >
      <path
        d="M4.2 9.6C52 5.8 118 4.4 195.6 7.4c2.6.1 4 2.4 3.8 5l-1.1 18.6c-.1 2.3-2 4-4.3 4C128 35.6 64 36.8 5.6 38.4 2.9 38.5.8 36.3 1 33.6L1.4 12.6c.1-1.6 1.2-2.9 2.8-3Z"
        fill="var(--color-lime)"
      />
    </svg>
  );
}

/** A tick in an ink disc, drawn once the card has landed. */
function Tick({ delay }: { delay: number }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
      <svg aria-hidden viewBox="0 0 24 24" className="size-3.5" fill="none">
        <path
          d="M5 12.5l4.2 4.2L19 7"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw"
          style={
            { "--d": `${delay}ms`, "--dur": "420ms" } as React.CSSProperties
          }
        />
      </svg>
    </span>
  );
}

/**
 * What "own it" means in practice, as a small record on the table: every
 * asset ticked off in the client's name, signed by the two founders.
 */
function Deed({ delay }: { delay: number }) {
  const { label, title, items, note, by } = home.manifesto.deed;
  return (
    // the entrance lives on the wrapper, so the card's own tilt can still
    // ease on hover (the stage's transition would override it)
    <div className="fade w-full max-w-[400px]" style={d(delay)}>
      <figure className="rounded-[24px] bg-surface p-6 shadow-[0_1px_0_rgba(21,20,14,0.04),0_32px_64px_-32px_rgba(21,20,14,0.28)] ring-1 ring-line transition-[rotate,translate] duration-300 ease-[cubic-bezier(.23,1,.32,1)] sm:p-7 lg:rotate-[2.5deg] lg:hover:-translate-y-1 lg:hover:rotate-0">
        <p className="text-[13px] font-medium text-faint">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-[-0.02em]">{title}</p>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {items.map((item, n) => (
            <li
              key={item}
              className="flex items-center justify-between gap-4 py-3.5 text-[15px] font-medium"
            >
              {item}
              <Tick delay={delay + 380 + n * 140} />
            </li>
          ))}
        </ul>
        <figcaption className="mt-5 flex items-center gap-3">
          <FaceStack ids={by} size={30} ring="surface" />
          <span className="min-w-0">
            <span className="block text-balance font-serif text-lg leading-snug italic text-ink/80">
              {note}
            </span>
            <span className="mt-0.5 block text-[13px] text-faint">
              Nazar & Oleh
            </span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

/**
 * ② The whole company in two sentences at one size: the premise quiet, the
 * conclusion in full with "own it" highlighted, and beside it what owning
 * it means on day one. The mechanics pass underneath.
 */
export function Manifesto() {
  const { lead, line, marquee } = home.manifesto;
  const [before, marked] = line;
  const leadWords = wordCount(lead);
  const beforeWords = wordCount(before);
  const words = leadWords + beforeWords + wordCount(marked);
  const markDelay = words * 40 + 700;

  return (
    <Stage
      as="section"
      id="believe"
      data-tone="paper"
      className="px-2 pb-2 sm:px-3 sm:pb-3"
    >
      {/* a sheet laid on the page: a new screen without going dark */}
      <div className="relative flex flex-col overflow-hidden rounded-[28px] bg-paper-2 sm:rounded-[40px] lg:min-h-[calc(100svh-0.75rem)]">
        <ManifestoBackdrop />
        <Container className="relative grid flex-1 content-center items-center gap-x-10 gap-y-14 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="fade text-[15px] font-medium text-faint">
              What we believe
            </p>
            {/* a sentence per block: the tone never changes mid-line */}
            <h2 className="display mt-8 text-[clamp(2.5rem,0.9rem+4.4vw,5.75rem)] leading-[1.02] md:mt-10">
              <span className="block text-faint">
                <RiseText text={lead} />
              </span>
              <span className="block">
                <RiseText text={before} start={leadWords} />{" "}
                <span className="relative isolate inline-block whitespace-nowrap">
                  <RiseText text={marked} start={leadWords + beforeWords} />
                  <Highlight delay={markDelay} />
                </span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Deed delay={markDelay + 200} />
          </div>
        </Container>
        <MonoMarquee items={marquee} tone="paper" className="relative" />
      </div>
    </Stage>
  );
}
