import type { Metadata } from "next";

import { Hero } from "@/components/how-we-work/hero";
import { FearsSection } from "@/components/how-we-work/fears";
import { HowItRunsSection } from "@/components/how-we-work/runs";
import { PrinciplesSection } from "@/components/how-we-work/principles";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { Marquee } from "@/components/ui/marquee";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Outsourcing without the part everyone hates. The founders are in every engagement, you own your code and IP from day one, and you talk directly to the engineers building your product.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "Founders in every project",
          "IP yours from day one",
          "Direct access to seniors",
          "We push back",
          "Built to scale",
          "QA is our job",
        ]}
      />
      <FearsSection />
      <HowItRunsSection />
      <PrinciplesSection />
      <FinalCtaPanel
        eyebrow="Talk to the founders"
        title="Talk to the founders, not a sales team."
        intro="The fastest way to know if we are the right team is to talk to the people who would actually build with you."
        buttonLabel="Book a founder review call"
        buttonHref="/the-review"
      />
    </>
  );
}
