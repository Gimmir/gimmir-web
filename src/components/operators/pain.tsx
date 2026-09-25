import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { operators } from "@/content/operators";

import { PainCheck } from "./pain-check";

/**
 * /operators ②, "Sound familiar?": the three pains as drawn cards the
 * operator ticks, and a bar that counts them and offers the free check.
 */
export function OperatorsPain() {
  const { title, lead } = operators.pain;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="paper" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade font-serif text-2xl italic leading-snug md:pb-2 md:text-[1.75rem]"
            style={{ "--d": `${after}ms` } as React.CSSProperties}
          >
            {lead}
          </p>
        </div>
        <PainCheck after={after + 150} />
      </Container>
    </Stage>
  );
}
