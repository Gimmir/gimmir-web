import { Accordion, type AccordionItem } from "@/components/blocks/accordion";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { contact } from "@/content/contact";

export const CONTACT_FAQ_ITEMS: AccordionItem[] = [
  {
    key: "what-happens",
    question: "What happens on the call?",
    answer:
      "We listen first. You tell us what you’re building or what’s costing you; we tell you honestly whether and how we can help.",
  },
  {
    key: "nda",
    question: "Will you sign an NDA?",
    answer: "Yes, if you need one. Just ask when you book.",
  },
  {
    key: "neither-fits",
    question: "What if neither call fits?",
    answer:
      "Email us. If you’re building something outside fitness and wellness, tell us what it is and we’ll be honest about fit.",
  },
];

/** /contact ③, what people ask before they book, as the V2 accordion. */
export function ContactFaq() {
  const { title } = contact.faq;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper" className="border-t border-line">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-28 lg:grid-cols-12">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02] lg:col-span-5">
          <RiseText text={title} />
        </h2>
        <div
          className="fade lg:col-span-7"
          style={{ "--d": `${after}ms` } as React.CSSProperties}
        >
          <Accordion items={CONTACT_FAQ_ITEMS} />
        </div>
      </Container>
    </Stage>
  );
}
