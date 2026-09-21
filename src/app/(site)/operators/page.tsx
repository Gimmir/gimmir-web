import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudySection } from "@/components/operators/case-study";
import { Fit } from "@/components/operators/fit";
import { OperatorsFaq, OPERATORS_FAQ_ITEMS } from "@/components/operators/faq";
import { OperatorsFinalCta } from "@/components/operators/final-cta";
import { Hero } from "@/components/operators/hero";
import { OfferLadder } from "@/components/operators/offer-ladder";
import { RentingCost } from "@/components/operators/renting-cost";
import { RevenueLine } from "@/components/operators/revenue-line";
import { breadcrumbs, faqPage, platformTeardownService } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

const TITLE =
  "Own Your Fitness Platform — for Operators & Franchisors with 8+ Sites · Gimmir";
const DESCRIPTION =
  "For fitness operators and franchisors with 8+ locations: what you pay to rent your booking platform, what owning it costs, and how we moved a 10+ site franchise onto its own app and back office.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: "/operators" },
    ...socialMetadata({
      title: "Own Your Fitness Platform — for Operators & Franchisors",
      description: DESCRIPTION,
      path: "/operators",
    }),
  };
}

export default function OperatorsPage() {
  const faqLd = faqPage(OPERATORS_FAQ_ITEMS);

  return (
    <>
      <JsonLd data={breadcrumbs([["Home", "/"], ["For operators", "/operators"]])} />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd data={platformTeardownService()} />
      <Hero />
      <RentingCost />
      <RevenueLine />
      <Fit />
      <OfferLadder />
      <CaseStudySection />
      <OperatorsFaq />
      <OperatorsFinalCta />
    </>
  );
}
