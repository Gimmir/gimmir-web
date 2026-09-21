import type { Metadata } from "next";

import { Hero } from "@/components/how-we-work/hero";
import { FearsSection } from "@/components/how-we-work/fears";
import { HowItRunsSection } from "@/components/how-we-work/runs";
import { PricingPhilosophySection } from "@/components/how-we-work/pricing-philosophy";
import { PrinciplesSection } from "@/components/how-we-work/principles";
import {
  STRAIGHT_ANSWERS,
  StraightAnswersSection,
} from "@/components/how-we-work/straight-answers";
import { TwoPersonSection } from "@/components/how-we-work/two-person";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { JsonLd } from "@/components/seo/json-ld";
import { Marquee } from "@/components/ui/marquee";
import { breadcrumbs, faqPage } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { HOW_WE_WORK_QUERY, HOW_WE_WORK_SEO_QUERY } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: HOW_WE_WORK_SEO_QUERY,
    stega: false,
  });

  return {
    title: data?.seo?.metaTitle ?? undefined,
    description: data?.seo?.metaDescription ?? undefined,
    alternates: { canonical: "/how-we-work" },
    ...socialMetadata({
      title: data?.seo?.metaTitle ?? "How we work",
      description: data?.seo?.metaDescription,
      path: "/how-we-work",
    }),
  };
}

export default async function HowWeWorkPage() {
  const { data } = await sanityFetch({ query: HOW_WE_WORK_QUERY });

  if (!data) return null;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["How we work", "/how-we-work"],
        ])}
      />
      <JsonLd data={faqPage(STRAIGHT_ANSWERS)!} />
      <Hero data={data} />
      <Marquee items={data.marquee ?? []} />
      <HowItRunsSection data={data} />
      <PrinciplesSection data={data} />
      <TwoPersonSection data={data} />
      <PricingPhilosophySection data={data} />
      <FearsSection data={data} />
      <StraightAnswersSection />
      <FinalCtaPanel
        eyebrow={data.finalCtaEyebrow!}
        title={data.finalCtaHeading}
        intro={data.finalCtaIntro!}
        bookings={["costCheck", "founderReview"]}
      />
    </>
  );
}
