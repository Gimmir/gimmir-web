import { FaqSection } from "@/components/blocks/faq-section";
import { operators } from "@/content/operators";

/** /operators ⑦, the questions operators raise first, answered. */
export function OperatorsObjections() {
  const { title, items } = operators.objections;
  return <FaqSection title={title} items={items} />;
}
