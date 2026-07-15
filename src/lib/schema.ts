import { stegaClean } from "next-sanity";

import type { CaseStudy } from "@/lib/cases";
import { BRAND, SITE_URL } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import type { FOUNDERS_QUERY_RESULT } from "@/sanity/types";

/**
 * schema.org builders for the site's JSON-LD blocks. All Sanity-sourced
 * strings pass through `stegaClean` so Visual Editing's invisible characters
 * never leak into structured data.
 */

const ORG_ID = `${SITE_URL}/#organization`;

type Founder = FOUNDERS_QUERY_RESULT[number];

function personNode(f: Founder, role?: string) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/founders#${f._id}`,
    name: stegaClean(f.name) ?? undefined,
    jobTitle: role,
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
        url: SITE_URL,
        logo: `${SITE_URL}/logo/Logo-Gimmir.svg`,
        description: stegaClean(opts.description) ?? undefined,
        email: stegaClean(opts.email) ?? undefined,
        knowsAbout: [
          "Sport and fitness software",
          "Member and booking platforms",
          "Fitness franchise platforms",
          "Coaching apps",
          "iOS and Android apps",
        ],
        founder: founders.map((f) => ({
          "@id": `${SITE_URL}/founders#${f._id}`,
        })),
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

/** CreativeWork for a case study page. */
export function caseStudyWork(data: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/work/${data.slug}#case-study`,
    name: `${data.name} — Case study`,
    url: `${SITE_URL}/work/${data.slug}`,
    about: data.industry,
    abstract: data.summary,
    image: `${SITE_URL}${data.logo}`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
