import { MarkerStroke } from "@/components/blocks/inline-headline";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { operators } from "@/content/operators";

/**
 * /operators ⑥, the guarantee as one line on ink, "you don't pay."
 * marked in lime.
 */
export function OperatorsGuarantee() {
  const { before, mark } = operators.guarantee;
  const n = wordCount(before);
  const markDelay = (n + wordCount(mark)) * 40 + 700;

  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <p className="display max-w-[24ch] text-[length:var(--text-title)] leading-[1.08]">
          <RiseText text={before} />{" "}
          <span className="relative inline-block whitespace-nowrap">
            <RiseText text={mark} start={n} />
            <MarkerStroke delay={markDelay} bottom="-0.1em" />
          </span>
        </p>
      </Container>
    </Stage>
  );
}
