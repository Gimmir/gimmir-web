import { stegaClean } from "next-sanity";

import { CASES, type CaseStudy } from "@/lib/cases";
import { FOUNDERS } from "@/lib/founders";
import { BRAND, SITE_URL } from "@/lib/seo";

/**
 * schema.org builders for the site's JSON-LD blocks. All Sanity-sourced
 * strings pass through `stegaClean` so Visual Editing's invisible characters
 * never leak into structured data.
 */

const ORG_ID = `${SITE_URL}/#organization`;

/** Stable @id for a founder's Person node, keyed by their Sanity _id. */
export const personId = (founderId: string) => `${SITE_URL}/about#${founderId}`;

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

/** A founder's Person node, from the fixed identity in `lib/founders`. */
function founderPerson(f: (typeof FOUNDERS)[keyof typeof FOUNDERS]) {
  return {
    "@type": "Person",
    "@id": personId(f.sanityId),
    name: f.name,
    jobTitle: f.title,
    knowsAbout: FOUNDER_KNOWS_ABOUT[f.sanityId],
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}${f.photo}`,
    sameAs: [f.linkedin],
    worksFor: { "@id": ORG_ID },
  };
}

/**
 * Organization + WebSite + the founders' Person nodes, for the home page
 * (doc 09 §6: founders as Person, `knowsAbout` the stack and the domains;
 * no Offer with a price).
 */
export function organizationGraph(opts: {
  email: string;
  description: string;
}) {
  const founders = Object.values(FOUNDERS);
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
        sameAs: [
          "https://www.linkedin.com/company/gimmir",
          "https://github.com/gimmir",
        ],
        logo: `${SITE_URL}/logo/Logo-Gimmir.svg`,
        description: opts.description,
        email: opts.email,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: opts.email,
          url: `${SITE_URL}/contact`,
          availableLanguage: "English",
        },
        knowsAbout: [
          "SaaS product development",
          "Sport and fitness software",
          "Member and booking platforms",
          "Fitness franchise platforms",
          "Coaching apps",
          "Wellness and prevention apps",
          "iOS and Android apps",
          "React Native",
          "Next.js",
          "Supabase",
          "Stripe",
        ],
        founder: founders.map((f) => ({ "@id": personId(f.sanityId) })),
      },
      ...founders.map(founderPerson),
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

/** FAQPage mirroring the visible Q&A on a page. */
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

/** Person nodes for the /about page, built from the fixed founder identity. */
export function aboutGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": Object.values(FOUNDERS).map(founderPerson),
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
    dateModified: data.updatedAt ?? data.publishedAt,
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

/**
 * A Service page's offer: what the page sells. No prices (site rule).
 * Not a Google rich result; it's for entity and AI-answer understanding.
 */
export function serviceSchema({
  id,
  name,
  description,
  path,
}: {
  id: string;
  name: string;
  description: string;
  path: string;
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
  };
}

/** AboutPage for /about, pointing at the founder Person nodes. */
export function aboutPage() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#page`,
    url: `${SITE_URL}/about`,
    about: { "@id": ORG_ID },
    mainEntity: [
      { "@id": personId(FOUNDERS.nazar.sanityId) },
      { "@id": personId(FOUNDERS.oleh.sanityId) },
    ],
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
