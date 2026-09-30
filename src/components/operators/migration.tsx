import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { operators } from "@/content/operators";

import { MigrationRoute } from "./migration-route";

/**
 * /operators ⑤, migration step by step: the six steps as one drawn route
 * that fills lime as you read (MigrationRoute), with how long the whole
 * thing takes said up front, under the title. No prices.
 */
export function OperatorsMigration() {
  const { title, note } = operators.migration;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="paper" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <p
          className="fade mt-5 max-w-[34ch] font-serif text-2xl italic leading-snug md:mt-6 md:max-w-none md:text-[1.75rem]"
          style={{ "--d": `${after}ms` } as React.CSSProperties}
        >
          {note}
        </p>
        <MigrationRoute after={after + 150} />
      </Container>
    </Stage>
  );
}
