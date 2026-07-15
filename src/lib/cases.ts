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
    tag: "Global franchise",
    dark: true,
    variant: "custom",
    industry: "Boutique fitness franchise",
    summary:
      "We moved a global fitness franchise off a third-party platform onto their own app and back office — full control over every location.",
    seoTitle: "UN1T Case Study — Own Gym App Instead of White-Label",
    seoDescription:
      "How a global gym franchise moved off a white-label fitness platform onto its own custom app and back office — 10+ locations, tens of thousands saved monthly.",
    services: [
      "Member app — iOS & Android",
      "Back office & operations",
      "Payments, fees & payouts",
      "Multi-location data model",
    ],
    stats: [
      { value: 10, suffix: "+", label: "franchises run on it" },
      { text: "$10Ks", lime: true, label: "saved monthly in payment fees" },
    ],
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
      "A coaching platform we co-founded and built end to end — live and growing fast in its first month after launch.",
    seoTitle: "Jimmy Coach Case Study — Online Coaching App",
    seoDescription:
      "An online coaching app we co-founded and built end to end — programs, community, messaging and payments, with 100+ active coaches in the first month.",
    services: [
      "Product & platform, end to end",
      "Coach & client apps",
      "Built from zero to launch",
    ],
    stats: [
      { value: 100, suffix: "+", label: "active coaches" },
      { value: 300, suffix: "+", label: "first-month users" },
    ],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export const caseSlugs = CASES.map((c) => c.slug);
