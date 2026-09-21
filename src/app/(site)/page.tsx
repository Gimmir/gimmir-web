import type { Metadata } from "next";

import { RouteSelector } from "@/components/home/doors";
import { FaqSection } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { FoundersSection } from "@/components/home/founders";
import { Hero } from "@/components/home/hero";
import { OffersSnapshot } from "@/components/home/offers-snapshot";
import { ProblemSection } from "@/components/home/problem";
import { ProofSection } from "@/components/home/proof";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPage, organizationGraph } from "@/lib/schema";
import { BRAND, socialMetadata } from "@/lib/seo";
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
    ...socialMetadata({
      title: data?.seo?.metaTitle ?? BRAND,
      description: data?.seo?.metaDescription,
      path: "/",
      image: "/opengraph-image",
    }),
  };
}

export default async function HomePage() {
  const [{ data }, { data: founders }, { data: settings }] = await Promise.all([
    sanityFetch({ query: HOME_QUERY }),
    sanityFetch({ query: FOUNDERS_QUERY, stega: false }),
    sanityFetch({ query: SETTINGS_QUERY, stega: false }),
  ]);

  if (!data) return null;

  const faqLd = faqPage(data.faqItems ?? []);

  return (
    <>
      <JsonLd
        data={organizationGraph(founders, {
          email: settings?.contactEmail,
          description: settings?.description,
        })}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <Hero data={data} />
      <RouteSelector />
      <ProblemSection data={data} />
      <ProofSection data={data} />
      <FoundersSection data={data} />
      <OffersSnapshot heading={data.offersHeading} intro={data.offersIntro} />
      <FaqSection data={data} />
      <FinalCta data={data} />
    </>
  );
}
