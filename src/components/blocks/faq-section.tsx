import { Accordion, type AccordionItem } from "@/components/blocks/accordion";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

/**
 * Questions a page's reader asks first, answered in short, self-contained
 * paragraphs (the kind an AI answer can quote): the title on the left, the
 * accordion on the right. The page emits the same items as FAQPage.
 * `divided` draws a hairline on top, for when a paper section sits above.
 */
export function FaqSection({
  title,
  items,
  divided = false,
}: {
  title: string;
  items: readonly AccordionItem[];
  divided?: boolean;
}) {
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage
      as="section"
      data-tone="paper"
      className={cn(divided && "border-t border-line")}
    >
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
