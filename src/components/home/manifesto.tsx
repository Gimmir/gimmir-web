import { DrawnKey } from "@/components/blocks/drawn-key";
import { MarkerStroke } from "@/components/blocks/inline-headline";
import { MonoMarquee } from "@/components/blocks/mono-marquee";
import { GRAIN } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

/**
 * ② The belief in one colour, set like the UN1T title, "own it." marked
 * like the hero's "deepest", and beside it a key drawn in the same hand as
 * UN1T's "12": one thin outline, a lime disc in its bow and a curve out to
 * what owning it means. The mechanics pass underneath, as UN1T's second
 * stat sits under its rule.
 *
 * Paper, with the hero's grain; its warm shade carries across the seam
 * (mirrored at the top left) and a hairline marks the new screen.
 */
export function Manifesto() {
  const { lines, key, marquee } = home.manifesto;
  const starts = lines.map((_, n) =>
    lines.slice(0, n).reduce((sum, l) => sum + wordCount(l), 0),
  );
  const last = lines.length - 1;
  // the marker swipes once the last word has risen
  const markDelay = (starts[last] + wordCount(lines[last])) * 40 + 700;

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
            "radial-gradient(ellipse 40% 50% at 72% 44%, rgba(201,242,61,0.16) 0%, rgba(201,242,61,0.06) 50%, rgba(201,242,61,0) 78%)",
            "radial-gradient(ellipse 45% 55% at 0% 0%, rgba(228,224,214,0.85) 0%, rgba(228,224,214,0.35) 45%, rgba(228,224,214,0) 75%)",
          ].join(", "),
          backgroundSize: "180px 180px, 100% 100%, 100% 100%",
        }}
      />
      <Container className="relative grid items-center gap-x-16 gap-y-12 py-24 md:py-36 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          {lines.map((line, n) =>
            n === last ? (
              <span key={line} className="block">
                <span className="relative inline-block whitespace-nowrap">
                  <RiseText text={line} start={starts[n]} />
                  <MarkerStroke delay={markDelay} bottom="-0.08em" />
                </span>
              </span>
            ) : (
              <span key={line} className="block">
                <RiseText text={line} start={starts[n]} />
              </span>
            ),
          )}
        </h2>
        <DrawnKey
          label={key}
          delay={400}
          className="w-full max-w-[560px] lg:ml-auto"
        />
      </Container>
      <MonoMarquee items={marquee} tone="paper" className="relative" />
    </Stage>
  );
}
