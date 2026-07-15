import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { ProofSection } from "@/components/home/proof";
import { WhoSection } from "@/components/home/who";
import { ServicesSection } from "@/components/home/services";
import { FoundersSection } from "@/components/home/founders";
import { TrustSection } from "@/components/home/trust";
import { ReviewCtaSection } from "@/components/home/review-cta";
import { FinalCta } from "@/components/home/final-cta";
import { Marquee } from "@/components/ui/marquee";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationGraph } from "@/lib/schema";
import { sanityFetch } from "@/sanity/lib/live";
import {
  FOUNDERS_QUERY,
  HOME_QUERY,
  HOME_SEO_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_SEO_QUERY, stega: false });

  return {
    title: data?.seo?.metaTitle ? { absolute: data.seo.metaTitle } : undefined,
    description: data?.seo?.metaDescription ?? undefined,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [{ data }, { data: founders }, { data: settings }] = await Promise.all([
    sanityFetch({ query: HOME_QUERY }),
    sanityFetch({ query: FOUNDERS_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);

  if (!data) return null;

  return (
    <>
      <JsonLd
        data={organizationGraph(founders, {
          email: settings?.contactEmail,
          description: settings?.description,
        })}
      />
      <Hero data={data} />
      <Marquee items={data.marquee ?? []} />
      <ProofSection data={data} />
      <WhoSection data={data} />
      <ServicesSection data={data} />
      <FoundersSection data={data} />
      <TrustSection data={data} />
      <ReviewCtaSection data={data} />
      <FinalCta data={data} />
    </>
  );
}
