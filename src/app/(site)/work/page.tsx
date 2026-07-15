import type { Metadata } from "next";

import { CaseGrid } from "@/components/shared/case-cards";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";

const WORK_DESCRIPTION =
  "The sport and fitness products we have built and shipped as owners — the UN1T franchise platform and Jimmy Coach — with the numbers behind them.";

export const metadata: Metadata = {
  title: "Case studies",
  description: WORK_DESCRIPTION,
  alternates: { canonical: "/work" },
  ...socialMetadata({
    title: "Case studies",
    description: WORK_DESCRIPTION,
    path: "/work",
  }),
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Home", "/"], ["Case studies", "/work"]])} />
      <section id="top" className="relative overflow-hidden">
        <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
          <Reveal eager>
            <Pill>Case studies</Pill>
          </Reveal>

          <Reveal eager delay={60}>
            <h1 className="display mt-8 text-[2rem] leading-[1.12] sm:text-hero sm:leading-[0.98]">
              Real fitness products,
              <br />
              <Mark>not promises.</Mark>
            </h1>
          </Reveal>

          <Reveal eager delay={140}>
            <p className="mt-10 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">
              We do not show mockups. These are platforms we built and shipped as
              owners, still live and still scaling — with the numbers behind
              them.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <CaseGrid priority />
        </Container>
      </section>

      <FinalCtaPanel
        eyebrow="Let’s talk"
        title="Let’s look at what you are building."
        intro="Tell us what you are working on. We will tell you honestly how we would approach it — and whether we are the right team for it."
        buttonLabel="Book a founder review call"
      />
    </>
  );
}
