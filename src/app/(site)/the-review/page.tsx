import type { Metadata } from "next";

import { Hero } from "@/components/review/hero";
import { ProblemSection } from "@/components/review/problem";
import { WhatItIsSection } from "@/components/review/what-it-is";
import { DeliverablesSection } from "@/components/review/deliverables";
import { FoundersSection } from "@/components/review/founders";
import { ProcessSection } from "@/components/review/process";
import { PricingSection } from "@/components/review/pricing";
import { FitSection } from "@/components/review/fit";
import { ProofSection } from "@/components/review/proof";
import { FaqSection } from "@/components/review/faq";
import { FinalCta } from "@/components/review/final-cta";
import { Marquee } from "@/components/ui/marquee";

export const metadata: Metadata = {
  title: "The Review",
  description:
    "A two-week expert review of whether your sport or fitness product is built to scale. The founders behind UN1T and Jimmy Coach hand you a clear roadmap.",
  alternates: { canonical: "/the-review" },
};

export default function TheReviewPage() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "Memberships & billing",
          "Payments at scale",
          "Booking under load",
          "Multi-location data",
          "Security & DD",
          "AI where it pays",
        ]}
      />
      <ProblemSection />
      <WhatItIsSection />
      <DeliverablesSection />
      <FoundersSection />
      <ProcessSection />
      <PricingSection />
      <FitSection />
      <ProofSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
