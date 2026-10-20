import { Calculators } from "@/components/calculator/calculators";
import { Stage } from "@/components/motion/stage";
import { RiseText } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { calculator } from "@/content/calculator";

/**
 * /franchise ②, right under the hero: what the current system costs a year
 * and the payback (calculator 1), what keeping members longer adds
 * (calculator 2, an accordion), and the retention engine behind it.
 */
export function FranchiseCalculators() {
  const { eyebrow, title, bridge, lead } = calculator.cost;

  return (
    <Stage
      as="section"
      id="calculator"
      data-tone="paper"
      className="relative scroll-mt-20 bg-paper-2"
    >
      <Container className="py-16 md:py-24">
        <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
          {eyebrow}
        </p>
        <h2 className="display mt-4 max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed">{bridge}</p>
        <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-muted">{lead}</p>
        <div className="mt-12 md:mt-16">
          <Calculators />
        </div>
      </Container>
    </Stage>
  );
}
