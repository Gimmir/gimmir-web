import { shown, UN1T } from "@/content/proof";

// UN1T's figures live in proof.ts; a pending claim never reaches a page.
const un1tStudios = shown(UN1T.studios) as number;
const un1tFee = shown(UN1T.platformFeePerStudio) as number;
const un1tMembers = shown(UN1T.members) as string;
const un1tQuote = shown(UN1T.quote) as { text: string; name: string; org: string };

export type CaseStat = {
  value?: number;
  suffix?: string;
  text?: string;
  label: string;
  lime?: boolean;
};

export type CaseStudy = {
  slug: string;
  name: string;
  logo: string;
  tag: string;
  /** Card theme on the index/home grid. */
  dark: boolean;
  /** Bespoke page (UN1T, Jimmy) vs the shared template. */
  variant: "custom" | "standard";
  industry: string;
  /** One–two sentence summary used on cards and previews. */
  summary: string;
  /** Keyword-targeted <title> (without the "· Gimmir" suffix). */
  seoTitle: string;
  /** Keyword-targeted meta description (~150–160 chars). */
  seoDescription: string;
  services: string[];
  stats: CaseStat[];
  /** The at-a-glance panel under the hero. */
  facts: Array<[label: string, value: string]>;
  /** Founder who tells the story (schema.org Article author). */
  author: "founderNazar" | "founderOleh";
  /** First published on the site, ISO date. */
  publishedAt: string;
  /** Last substantive update, ISO date (schema dateModified, sitemap lastmod). */
  updatedAt?: string;
  /** Client quote; only set once the client has approved the exact words. */
  quote?: { text: string; name: string; role: string };
  /** Structured narrative — drives the standard template. */
  story?: {
    challenge: string;
    approach: string[];
    outcome: string;
  };
};

export const CASES: CaseStudy[] = [
  {
    slug: "un1t",
    name: "UN1T",
    logo: "/design/un1t-logo.png",
    tag: "Boutique franchise",
    dark: true,
    variant: "custom",
    industry: "Boutique fitness franchise",
    summary: `UN1T's ${un1tStudios} studios ran on Glofox at about £${un1tFee} a studio a month. We built HQ its own member app, so HQ now earns a fee on every studio payment.`,
    seoTitle: "UN1T Case Study: A Franchise HQ That Earns From Its Own App",
    seoDescription: `How a ${un1tStudios}-studio fitness franchise left Glofox for its own member app, and now earns a fee on every studio payment. Built by Gimmir for UN1T.`,
    services: [
      "Member app: iOS & Android",
      "Franchise CRM & back office",
      "Payments with HQ's fee",
      "Daily workout from HQ to every studio",
    ],
    stats: [
      { value: un1tStudios, label: "studios on one platform they own" },
      { text: un1tMembers, lime: true, label: "members" },
    ],
    facts: [
      ["Client", "UN1T, a London-founded boutique fitness franchise"],
      ["Studios", `${un1tStudios}, on one data model`],
      ["Platforms", "iOS & Android member app, back office"],
      ["Before", `Glofox, at about £${un1tFee} a studio a month`],
      ["Our role", "Full build and migration"],
    ],
    quote: {
      text: un1tQuote.text,
      name: un1tQuote.name,
      role: un1tQuote.org,
    },
    author: "founderNazar",
    publishedAt: "2026-07-14",
    updatedAt: "2026-10-20",
  },
  {
    slug: "jimmy-coach",
    name: "Jimmy Coach",
    logo: "/design/jimmy-coach-logo.png",
    tag: "Co-founded",
    dark: false,
    variant: "custom",
    industry: "Coaching platform",
    summary:
      "A coaching platform co-founded and co-owned with a working coach: one native app for iOS and Android, and a web dashboard, live in the App Store and Google Play.",
    seoTitle: "Jimmy Coach: Online Coaching App Case Study",
    seoDescription:
      "An online coaching app co-founded and built end to end: one iOS and Android app plus a web dashboard, and 200+ coaches two months after launch.",
    services: [
      "One native app: client & coach",
      "Web dashboard & Stripe billing",
      "Community, courses & messaging",
      "Built from zero to launch",
    ],
    stats: [
      { value: 100, suffix: "+", label: "active coaches" },
      { value: 300, suffix: "+", label: "first-month users" },
    ],
    facts: [
      ["Product", "Jimmy Coach, a coaching platform"],
      ["Co-founded with", "Quentin Randis, Hyrox & CrossFit coach (250+ clients)"],
      ["Build", "One iOS & Android app (client and coach) + web dashboard"],
      ["Stack", "React Native (Expo), Supabase, Next.js, Stripe"],
      ["Our role", "Co-founders, co-owners and builders"],
    ],
    author: "founderNazar",
    publishedAt: "2026-07-14",
    updatedAt: "2026-09-30",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export const caseSlugs = CASES.map((c) => c.slug);
