import { MarkerStroke } from "@/components/blocks/inline-headline";
import { MonoMarquee } from "@/components/blocks/mono-marquee";
import { GRAIN } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * ② A poster on paper. The premise is spoken, in serif, the way the
 * founders talk on the rest of the site; the conclusion is set in the
 * heaviest sans, and "own it." runs the width of the page with the lime
 * marker under it (the one lime thing on this screen). No cards, no
 * boxes: the type is the design. The mechanics pass underneath.
 *
 * The hero's warm shade carries across the seam (mirrored at the top
 * left) and a hairline marks the new screen.
 */
export function Manifesto() {
  const { lead, line, marquee } = home.manifesto;
  const [before, marked] = line;
  const beforeWords = wordCount(before);
  const markDelay = 420 + (beforeWords + wordCount(marked)) * 40 + 900;

  return (
    <Stage
      as="section"
      id="believe"
      data-tone="paper"
      className="relative overflow-hidden border-t border-line"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            GRAIN,
            "radial-gradient(ellipse 45% 55% at 0% 0%, rgba(228,224,214,0.85) 0%, rgba(228,224,214,0.35) 45%, rgba(228,224,214,0) 75%)",
          ].join(", "),
          backgroundSize: "180px 180px, 100% 100%",
        }}
      />
      <Container className="relative pb-20 pt-20 md:pb-28 md:pt-32">
        <p className="fade text-[15px] font-medium text-faint">
          What we believe
        </p>

        <h2 className="mt-10 md:mt-16">
          <span
            className="fade block text-balance font-serif text-[clamp(1.75rem,1rem+2.6vw,3.75rem)] leading-[1.08] tracking-[-0.01em] text-muted italic"
            style={d(120)}
          >
            {lead}
          </span>
          <span
            className="display mt-4 block text-[clamp(2rem,1rem+3.4vw,4.5rem)] leading-[1.02] md:mt-6"
            style={d(420)}
          >
            <RiseText text={before} />
          </span>
          {/* poster size: the phrase spans the page at every width */}
          <span
            className="mega relative -ml-[0.04em] mt-1 inline-block whitespace-nowrap text-[clamp(4.5rem,26.5vw-0.75rem,20.5rem)] md:mt-2"
            style={d(620)}
          >
            <RiseText text={marked} start={beforeWords} />
            <MarkerStroke delay={markDelay} bottom="-0.12em" height="0.24em" />
          </span>
        </h2>
      </Container>
      <MonoMarquee items={marquee} tone="paper" className="relative" />
    </Stage>
  );
}
