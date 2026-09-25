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
    summary:
      "We moved a London-founded boutique fitness franchise off a white-label platform onto their own app, back office and payments, across 10+ locations.",
    seoTitle: "UN1T Case Study: From White-Label to Their Own Gym App",
    seoDescription:
      "How a global gym franchise moved off a white-label fitness platform onto its own member app and franchise CRM in 12 weeks: 10+ locations, every payment in one system.",
    services: [
      "Member app: iOS & Android",
      "Franchise CRM & back office",
      "Payments, royalties & payouts",
      "Multi-location data model",
    ],
    stats: [
      { value: 10, suffix: "+", label: "locations on one platform they own" },
      { value: 12, lime: true, label: "weeks to rebuild the platform from scratch" },
    ],
    facts: [
      ["Client", "UN1T, a London-founded boutique fitness franchise"],
      ["Locations", "10+, on one data model"],
      ["Platforms", "iOS & Android member app, back office"],
      ["Stack", "React Native (Expo), TypeScript, Supabase"],
      ["Our role", "Full build and migration"],
    ],
    author: "founderNazar",
    publishedAt: "2026-07-14",
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
      "A coaching platform we co-founded and co-own with a working coach: two native apps and a web dashboard, live in the App Store and Google Play.",
    seoTitle: "Jimmy Coach Case Study: Building an Online Coaching App",
    seoDescription:
      "An online coaching app we co-founded and built end to end: two native apps and web with programs, community, messaging and Stripe. 100+ coaches in month one.",
    services: [
      "Two native apps: client & coach",
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
      ["Build", "Client app + coach app (native) + web dashboard"],
      ["Stack", "React Native (Expo), Supabase, Next.js, Stripe"],
      ["Our role", "Co-founders, co-owners and builders"],
    ],
    author: "founderOleh",
    publishedAt: "2026-07-14",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export const caseSlugs = CASES.map((c) => c.slug);
