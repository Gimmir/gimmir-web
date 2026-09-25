import { MarkerStroke } from "@/components/blocks/inline-headline";
import { MonoMarquee } from "@/components/blocks/mono-marquee";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

/**
 * ② The whole company in two sentences at one size: the premise in a
 * quiet tone, the conclusion in full, "own it" marked. The mechanics pass
 * underneath.
 */
export function Manifesto() {
  const { lead, line, marquee } = home.manifesto;
  const [before, marked] = line;
  const leadWords = wordCount(lead);
  const beforeWords = wordCount(before);
  const markDelay = (leadWords + beforeWords + wordCount(marked)) * 40 + 700;

  return (
    <Stage
      as="section"
      data-tone="ink"
      threshold={0.35}
      className="bg-ink text-paper"
    >
      <Container className="py-28 md:py-40">
        <p className="fade text-[15px] font-medium text-paper/50">
          What we believe
        </p>
        {/* a sentence per block: the tone never changes mid-line */}
        <h2 className="display mt-8 text-[clamp(2.5rem,1rem+4.6vw,6rem)] leading-[1.02] md:mt-10">
          <span className="block text-paper/40">
            <RiseText text={lead} />
          </span>
          <span className="block">
            <RiseText text={before} start={leadWords} />{" "}
            <span className="relative inline-block whitespace-nowrap">
              <RiseText text={marked} start={leadWords + beforeWords} />
              <MarkerStroke delay={markDelay} bottom="-0.08em" />
            </span>
          </span>
        </h2>
      </Container>
      <MonoMarquee items={marquee} />
    </Stage>
  );
}
