import type { Metadata } from "next";

import { Hero } from "@/components/founders/hero";
import { StorySection } from "@/components/founders/story";
import { BelieveSection } from "@/components/founders/believe";
import { PeopleSection } from "@/components/founders/people";
import { StudioSection } from "@/components/founders/studio";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { sanityFetch } from "@/sanity/lib/live";
import { FOUNDERS_PAGE_QUERY, FOUNDERS_PAGE_SEO_QUERY } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: FOUNDERS_PAGE_SEO_QUERY,
    stega: false,
  });

  return {
    title: data?.seo?.metaTitle ?? undefined,
    description: data?.seo?.metaDescription ?? undefined,
    alternates: { canonical: "/founders" },
  };
}

export default async function FoundersPage() {
  const { data } = await sanityFetch({ query: FOUNDERS_PAGE_QUERY });
  if (!data) return null;

  return (
    <>
      <Hero data={data} />
      <StorySection data={data} />
      <BelieveSection data={data} />
      <PeopleSection data={data} />
      <StudioSection data={data} />
      <FinalCtaPanel
        eyebrow={data.finalCtaEyebrow!}
        title={data.finalCtaHeading}
        intro={data.finalCtaIntro!}
        buttonLabel={data.finalCtaButtonLabel!}
      />
    </>
  );
}
