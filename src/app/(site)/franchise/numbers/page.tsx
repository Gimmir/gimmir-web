import type { Metadata } from "next";

import { Calculator } from "@/components/calculator/calculator";
import { Container } from "@/components/ui/container";
import { calculator } from "@/content/calculator";
import { socialMetadata } from "@/lib/seo";

const { title, description } = calculator.meta;
const PATH = "/franchise/numbers";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  ...socialMetadata({ title, description, path: PATH }),
};

// The HQ income calculator: the lead magnet, result shown at once with no
// gate. The "send me this in writing" form comes in stage 2.
export default function NumbersPage() {
  const { headline, sub } = calculator.hero;

  return (
    <section id="calculator" data-tone="paper">
      <Container className="pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-40">
        <h1 className="max-w-[18ch] text-[clamp(2.3rem,0.8rem+4.4vw,4.6rem)] font-extrabold leading-[1.04] tracking-[-0.038em] [font-stretch:106%]">
          {headline}
        </h1>
        <p className="mt-6 text-lg text-muted md:text-xl">{sub}</p>
        <div className="mt-10 md:mt-14">
          <Calculator />
        </div>
      </Container>
    </section>
  );
}
