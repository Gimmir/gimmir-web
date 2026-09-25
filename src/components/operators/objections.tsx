import { Accordion } from "@/components/blocks/accordion";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { operators } from "@/content/operators";

/** /operators ⑦, the four objections operators raise first, answered. */
export function OperatorsObjections() {
  const { title, items } = operators.objections;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-28 lg:grid-cols-12">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02] lg:col-span-5">
          <RiseText text={title} />
        </h2>
        <div
          className="fade lg:col-span-7"
          style={{ "--d": `${after}ms` } as React.CSSProperties}
        >
          <Accordion items={items} />
        </div>
      </Container>
    </Stage>
  );
}
