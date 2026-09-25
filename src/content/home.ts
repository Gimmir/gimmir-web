/**
 * Home page copy (V2). Facts follow the portfolio rules: 9 products shipped,
 * 4 in fitness, 1 co-owned; UN1T took 12 weeks; no prices, no $ figures.
 */
import type { HeadlineToken } from "@/components/blocks/inline-headline";

export const home = {
  meta: {
    title: "Gimmir: SaaS founders own · Fitness first",
    description:
      "Nazar and Oleh build SaaS that founders own, from the first commit, and show every step. Nine products shipped, four in fitness, one we co-own.",
  },

  hero: {
    chips: [
      { label: "UN1T", detail: "10+ locations", logo: "/design/un1t-logo.png", href: "/work/un1t" },
      { label: "Jimmy Coach", detail: "co-founded", logo: "/design/jimmy-coach-logo.png", href: "/work/jimmy-coach" },
      { label: "9 products", detail: "shipped", href: "/work" },
    ],
    headline: [
      "We build SaaS that founders",
      { mark: "own", after: "," },
      "and show you how it’s done.",
    ] satisfies HeadlineToken[],
    sub: "Fitness is where we go deepest: member apps, coaching platforms and back offices, in your name from day one.",
    doors: [
      { id: "operators", label: "I run a fitness brand", href: "/operators" },
      { id: "saas", label: "I’m building a SaaS", href: "/build-your-saas" },
    ],
    caption: "Book a call with us, not a sales rep.",
  },

  manifesto: {
    lead: "Your business runs on software.",
    // the marked word gets the marker stroke
    line: ["You should", "own it."],
    marquee: [
      "Member apps",
      "Bookings",
      "Payments & payouts",
      "Coaching",
      "Community",
      "Connected devices",
      "Marketplaces",
      "Subscriptions",
      "Multi-location data",
    ],
  },

  un1t: {
    label: "Case 01",
    meta: ["Fitness franchise", "10+ locations", "Member app + franchise CRM"],
    title: "From separate studios to one network on its own software.",
    story:
      "Each studio ran on a rented platform and its own stack of tools. We built one member app and franchise CRM that UN1T owns, so head office sees every member and every payment.",
    link: { label: "Read the case", href: "/work/un1t" },
    stat: {
      value: "12",
      label: "weeks to move a 10+ location franchise onto software it owns",
    },
    side: { value: "10+", label: "locations on one system" },
  },
} as const;
