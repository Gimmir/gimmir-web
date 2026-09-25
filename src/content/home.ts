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
      { label: "9 products", detail: "shipped", grid: true, href: "/work" },
    ],
    headline: [
      "We",
      { faces: ["nazar", "oleh"] },
      "build SaaS that founders",
      { mark: "own", after: "," },
      "and show you how it’s done.",
      { apps: ["un1t", "jimmy"] },
      "Fitness is where we go deepest.",
    ] satisfies HeadlineToken[],
    doors: [
      { id: "operators", label: "I run a fitness brand", href: "/operators" },
      { id: "saas", label: "I’m building a SaaS", href: "/build-your-saas" },
    ],
    note: { quote: "Book a call with us, not a sales rep.", by: "nazar" },
  },

  manifesto: {
    // one sentence per pair of lines, set as four lines at every width;
    // the last line gets the lime marker
    lines: ["Your business", "runs on software.", "You should", "own it."],
    // the note on the drawn key: the same claim as /pricing and /operators
    key: "Code, repos and accounts in your name from day one",
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

  jimmy: {
    label: "Case 02",
    name: "Jimmy Coach",
    // doc 09 ④, without its dash
    title: ["A coach asked us for software.", "We saw a market and invested."],
    // approved by Nazar 2026-09-25
    quote: {
      text: "Coaches were running their business across WhatsApp, spreadsheets and PDFs, and losing clients in the gaps. So we co-founded Jimmy with one of them and built it as owners, not by the hour.",
      by: "nazar",
    },
    meta: ["Coaching platform", "Co-founded", "Client app + coach app + web"],
    link: { label: "Read the story", href: "/work/jimmy-coach" },
    stat: { value: "100+", label: "coaches on Jimmy in its first month" },
    side: { value: "300+", label: "users in the first month" },
  },

  // doc 09 ⑤. "Every step" drops the doc's "(build log)" until the build
  // log is public (P2).
  compare: {
    title: "Three ways to get your software.",
    columns: ["Rent a platform", "Agency by the hour", "Gimmir"],
    rows: [
      {
        label: "Who owns the code",
        values: ["Vendor", "Often unclear", "You, from day one"],
      },
      {
        label: "Cost as you grow",
        values: ["Rises per location or user", "Rises per hour", "Fixed per milestone"],
      },
      { label: "Your brand", values: ["Their template", "Yours", "Yours"] },
      { label: "Your data", values: ["Their system", "Yours, if you ask", "Yours"] },
      {
        label: "What you see",
        values: ["Nothing", "A demo at the end", "Every step"],
      },
    ],
  },
} as const;
