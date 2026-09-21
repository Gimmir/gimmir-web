import type { Metadata } from "next";

import { AfterReviewSection } from "@/components/review/after-review";
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
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, faqPage, serviceSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";
import { FinalCta } from "@/components/review/final-cta";
import { Marquee } from "@/components/ui/marquee";
import { sanityFetch } from "@/sanity/lib/live";
import { REVIEW_QUERY, REVIEW_SEO_QUERY } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: REVIEW_SEO_QUERY, stega: false });
  return {
    title: data?.seo?.metaTitle ?? undefined,
    description: data?.seo?.metaDescription ?? undefined,
    alternates: { canonical: "/the-review" },
    ...socialMetadata({
      title: data?.seo?.metaTitle ?? "The Review",
      description: data?.seo?.metaDescription,
      path: "/the-review",
    }),
  };
}

export default async function TheReviewPage() {
  const { data } = await sanityFetch({ query: REVIEW_QUERY });
  if (!data) return null;

  const faqLd = faqPage(data.faqItems ?? []);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["The Review", "/the-review"],
        ])}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={serviceSchema({
          id: "the-review",
          name: "The Review: technical due diligence",
          description:
            "A founder-led architecture, code and plan review for funded fitness and health products, with a written report and a prioritized plan.",
          path: "/the-review",
          offers: ["reviewCall", "review", "fixSprint", "build", "care"],
        })}
      />
      <Hero data={data} />
      <Marquee items={data.marquee ?? []} />
      <ProblemSection data={data} />
      <WhatItIsSection data={data} />
      <DeliverablesSection data={data} />
      <FoundersSection data={data} />
      <ProcessSection data={data} />
      <PricingSection data={data} />
      <AfterReviewSection />
      <FitSection data={data} />
      <ProofSection data={data} />
      <FaqSection data={data} />
      <FinalCta data={data} />
    </>
  );
}
