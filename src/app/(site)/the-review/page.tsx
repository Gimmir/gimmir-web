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
import { sanityFetch } from "@/sanity/lib/live";
import { REVIEW_QUERY, REVIEW_SEO_QUERY } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: REVIEW_SEO_QUERY, stega: false });
  return {
    title: data?.seo?.metaTitle ?? undefined,
    description: data?.seo?.metaDescription ?? undefined,
    alternates: { canonical: "/the-review" },
  };
}

export default async function TheReviewPage() {
  const { data } = await sanityFetch({ query: REVIEW_QUERY });
  if (!data) return null;

  return (
    <>
      <Hero data={data} />
      <Marquee items={data.marquee ?? []} />
      <ProblemSection data={data} />
      <WhatItIsSection data={data} />
      <DeliverablesSection data={data} />
      <FoundersSection data={data} />
      <ProcessSection data={data} />
      <PricingSection data={data} />
      <FitSection data={data} />
      <ProofSection data={data} />
      <FaqSection data={data} />
      <FinalCta data={data} />
    </>
  );
}
