import { stegaClean } from "next-sanity";

import { CASES, type CaseStudy } from "@/lib/cases";
import {
  CURRENCY,
  OFFERS,
  OPERATOR_LADDER,
  FOUNDER_LADDER,
  ONGOING,
  type Offer,
  type OfferId,
} from "@/lib/offers";
import { BRAND, SITE_URL } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import type { FOUNDERS_QUERY_RESULT } from "@/sanity/types";

/**
 * schema.org builders for the site's JSON-LD blocks. All Sanity-sourced
 * strings pass through `stegaClean` so Visual Editing's invisible characters
 * never leak into structured data.
 */

const ORG_ID = `${SITE_URL}/#organization`;

/** Stable @id for a founder's Person node, keyed by their Sanity _id. */
export const personId = (founderId: string) =>
  `${SITE_URL}/founders#${founderId}`;

type Founder = FOUNDERS_QUERY_RESULT[number];

/** What each founder is the authority on (schema.org `knowsAbout`). */
const FOUNDER_KNOWS_ABOUT: Record<string, string[]> = {
  founderNazar: [
    "Product strategy",
    "Fitness franchise platforms",
    "Membership and booking platforms",
    "Platform migration",
  ],
  founderOleh: [
    "Software architecture",
    "React Native",
    "Expo",
    "TypeScript",
    "Supabase",
    "Next.js",
    "Stripe",
    "Apple HealthKit",
    "Android Health Connect",
  ],
};

function personNode(f: Founder, role?: string) {
  return {
    "@type": "Person",
    "@id": personId(f._id),
    name: stegaClean(f.name) ?? undefined,
    jobTitle: role,
    knowsAbout: FOUNDER_KNOWS_ABOUT[f._id],
    url: `${SITE_URL}/founders`,
    image: f.photo
      ? urlFor(f.photo).width(800).height(800).fit("crop").url()
      : undefined,
    sameAs: f.linkedinUrl ? [stegaClean(f.linkedinUrl)] : undefined,
    worksFor: { "@id": ORG_ID },
  };
}

/** Organization + WebSite + founder Person nodes, for the home page. */
export function organizationGraph(
  founders: FOUNDERS_QUERY_RESULT,
  opts: { email?: string | null; description?: string | null },
) {
  const roles: Record<string, string> = {
    founderNazar: "Founder",
    founderOleh: "CTO",
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BRAND,
        legalName: "Gimmir LLC",
        address: {
          "@type": "PostalAddress",
          addressRegion: "DE",
          addressCountry: "US",
        },
        url: SITE_URL,
        logo: `${SITE_URL}/logo/Logo-Gimmir.svg`,
        description: stegaClean(opts.description) ?? undefined,
        email: stegaClean(opts.email) ?? undefined,
        contactPoint: opts.email
          ? {
              "@type": "ContactPoint",
              contactType: "sales",
              email: stegaClean(opts.email),
              url: `${SITE_URL}/contact`,
              availableLanguage: "English",
            }
          : undefined,
        knowsAbout: [
          "Sport and fitness software",
          "Member and booking platforms",
          "Fitness franchise platforms",
          "Coaching apps",
          "Wellness and prevention apps",
          "Apple HealthKit and Android Health Connect integrations",
          "iOS and Android apps",
        ],
        founder: founders.map((f) => ({ "@id": personId(f._id) })),
        hasOfferCatalog: offerCatalog(),
      },
      ...founders.map((f) => personNode(f, roles[f._id])),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** BreadcrumbList from an ordered list of (name, path) pairs. */
export function breadcrumbs(items: Array<[name: string, path: string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: stegaClean(name),
      item: `${SITE_URL}${path}`,
    })),
  };
}

/** FAQPage mirroring the visible Q&A on /the-review. */
export function faqPage(
  items: Array<{ question?: string | null; answer?: string | null }>,
) {
  const qa = items.filter((i) => i.question && i.answer);
  if (qa.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((i) => ({
      "@type": "Question",
      name: stegaClean(i.question),
      acceptedAnswer: { "@type": "Answer", text: stegaClean(i.answer) },
    })),
  };
}

/** Person nodes for the founders page. */
export function foundersGraph(
  cards: Array<{ role?: string | null; founder: Founder | null }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": cards
      .filter((c) => c.founder)
      .map((c) => personNode(c.founder!, stegaClean(c.role) ?? undefined)),
  };
}

/**
 * Article for a case study page (schema.org has no CaseStudy type; Article
 * is the one Google understands), written by the founder who led it.
 */
export function caseStudyArticle(data: CaseStudy) {
  const url = `${SITE_URL}/work/${data.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#case-study`,
    headline: data.seoTitle,
    description: data.seoDescription,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}${data.logo}`,
    datePublished: data.publishedAt,
    about: { "@type": "Thing", name: data.name, description: data.industry },
    author: { "@id": personId(data.author) },
    publisher: { "@id": ORG_ID },
  };
}

/** ItemList of every case study, for the /work index. */
export function caseStudyList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: CASES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/work/${c.slug}`,
      name: c.name,
    })),
  };
}

/** One schema.org Offer from `lib/offers.ts`; ranges become a PriceSpecification. */
function offerNode(offer: Offer, path: string) {
  const base = {
    "@type": "Offer",
    name: offer.name,
    description: offer.summary,
    url: `${SITE_URL}${path}`,
    availability: "https://schema.org/InStock",
  };
  if (typeof offer.price === "number") {
    return { ...base, price: String(offer.price), priceCurrency: CURRENCY };
  }
  const [minPrice, maxPrice] = offer.price;
  return {
    ...base,
    priceSpecification: {
      "@type": offer.per ? "UnitPriceSpecification" : "PriceSpecification",
      minPrice,
      maxPrice,
      priceCurrency: CURRENCY,
      ...(offer.per ? { unitText: offer.per.toUpperCase() } : {}),
    },
  };
}

/**
 * A Service page's offer: what the page sells, with its fixed-price offers.
 * Not a Google rich result; it's for entity and AI-answer understanding.
 */
export function serviceSchema({
  id,
  name,
  description,
  path,
  offers,
}: {
  id: string;
  name: string;
  description: string;
  path: string;
  /** Priced offers; V2 pages leave them out (no prices on the site). */
  offers?: OfferId[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#${id}`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    ...(offers?.length
      ? { offers: offers.map((o) => offerNode(OFFERS[o], path)) }
      : {}),
  };
}

/** Every offer, grouped by audience, for the Organization node. */
export function offerCatalog() {
  const group = (name: string, ids: OfferId[]) => ({
    "@type": "OfferCatalog",
    name,
    itemListElement: ids.map((o) => offerNode(OFFERS[o], "/pricing")),
  });
  return {
    "@type": "OfferCatalog",
    name: "Gimmir pricing",
    itemListElement: [
      group("For fitness operators", OPERATOR_LADDER),
      group("For product & health founders", FOUNDER_LADDER),
      group("Ongoing", ONGOING),
    ],
  };
}

/** AboutPage for /founders, pointing at the founder Person nodes. */
export function aboutPage(founderIds: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/founders#page`,
    url: `${SITE_URL}/founders`,
    about: { "@id": ORG_ID },
    mainEntity: founderIds.map((id) => ({ "@id": personId(id) })),
  };
}

/** ContactPage for /contact. */
export function contactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#page`,
    url: `${SITE_URL}/contact`,
    about: { "@id": ORG_ID },
  };
}
