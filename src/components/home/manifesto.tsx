import { MarkerStroke } from "@/components/blocks/inline-headline";
import { MonoMarquee } from "@/components/blocks/mono-marquee";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

/**
 * ② The whole company in two lines, a screen to itself: the premise quiet,
 * the conclusion huge, "own it" marked. The mechanics pass underneath.
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
      className="flex min-h-[100svh] flex-col bg-ink text-paper"
    >
      <Container className="flex flex-1 flex-col justify-center py-28 md:py-36">
        <p className="fade font-mono text-xs uppercase tracking-[0.22em] text-paper/45">
          What we believe
        </p>
        <p className="display mt-10 text-[length:var(--text-title)] text-paper/50">
          <RiseText text={lead} />
        </p>
        <h2 className="mega mt-4 text-[length:var(--text-mega)] md:mt-6">
          <RiseText text={before} start={leadWords} />{" "}
          <span className="relative inline-block whitespace-nowrap">
            <RiseText text={marked} start={leadWords + beforeWords} />
            <MarkerStroke delay={markDelay} />
          </span>
        </h2>
      </Container>
      <MonoMarquee items={marquee} />
    </Stage>
  );
}
