import type { Metadata } from "next";

import { CaseStudySection } from "@/components/health/case-study";
import { HEALTH_FAQ_ITEMS, HealthFaq } from "@/components/health/faq";
import { Hero } from "@/components/health/hero";
import { Market } from "@/components/health/market";
import { Pillars } from "@/components/health/pillars";
import { Scope } from "@/components/health/scope";
import { JsonLd } from "@/components/seo/json-ld";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { breadcrumbs, faqPage, serviceSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

const TITLE = "Wellness & Prevention App Development";
const DESCRIPTION =
  "Wellness and prevention apps for sleep, nutrition, women's health, longevity and mental wellbeing. Privacy-first, HealthKit and Health Connect ready. Not clinical software.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/health" },
  ...socialMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/health",
  }),
};

export default function HealthPage() {
  const faqLd = faqPage(HEALTH_FAQ_ITEMS);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["Health & wellness", "/health"],
        ])}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={serviceSchema({
          id: "wellness-apps",
          name: "Wellness and prevention app development",
          description:
            "Wellness and prevention apps (sleep, nutrition, women's health, longevity, metabolic and mental wellbeing) with privacy by design and HealthKit / Health Connect integrations. Not regulated clinical software.",
          path: "/health",
          offers: ["reviewCall", "review", "build"],
        })}
      />
      <Hero />
      <Scope />
      <Market />
      <Pillars />
      <CaseStudySection />
      <HealthFaq />
      <FinalCtaPanel
        eyebrow="Building in wellness?"
        title="Let's look at what you're building."
        intro="A CTO-level first call with Nazar and Oleh. If your idea crosses into clinical territory, we'll tell you, and point you to the right people."
        bookings={["founderReview"]}
      />
    </>
  );
}
