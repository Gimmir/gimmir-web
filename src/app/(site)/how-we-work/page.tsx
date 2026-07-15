import type { Metadata } from "next";

import { Hero } from "@/components/how-we-work/hero";
import { FearsSection } from "@/components/how-we-work/fears";
import { HowItRunsSection } from "@/components/how-we-work/runs";
import { PrinciplesSection } from "@/components/how-we-work/principles";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { JsonLd } from "@/components/seo/json-ld";
import { Marquee } from "@/components/ui/marquee";
import { breadcrumbs } from "@/lib/schema";
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
        data={breadcrumbs([["Home", "/"], ["How we work", "/how-we-work"]])}
      />
      <Hero data={data} />
      <Marquee items={data.marquee ?? []} />
      <FearsSection data={data} />
      <HowItRunsSection data={data} />
      <PrinciplesSection data={data} />
      <FinalCtaPanel
        eyebrow={data.finalCtaEyebrow!}
        title={data.finalCtaHeading}
        intro={data.finalCtaIntro!}
        buttonLabel={data.finalCtaButtonLabel!}
      />
    </>
  );
}
