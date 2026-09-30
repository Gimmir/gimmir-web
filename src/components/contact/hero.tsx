import { InlineHeadline } from "@/components/blocks/inline-headline";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { contact } from "@/content/contact";

/**
 * /contact ①: the promise as a sentence with the two founders' faces in
 * it (the home hero's hand). No CTA of its own; the doors sit right below,
 * under the same backdrop (the page draws it behind both).
 */
export function Hero() {
  const { headline, sub } = contact.hero;
  return (
    <Stage as="section" eager id="top" data-tone="paper" className="relative">
      <Container className="relative pb-12 pt-32 md:pb-16 md:pt-40">
        <h1 className="max-w-[18ch] text-[clamp(2.3rem,0.8rem+4.6vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.038em] [font-stretch:106%]">
          <InlineHeadline tokens={headline} />
        </h1>
        <p
          className="fade mt-7 max-w-[46ch] text-lg leading-relaxed text-muted md:mt-9 md:text-xl"
          style={{ "--d": "900ms" } as React.CSSProperties}
        >
          {sub}
        </p>
      </Container>
    </Stage>
  );
}
