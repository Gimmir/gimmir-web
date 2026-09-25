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
      {
        label: "UN1T",
        detail: "10+ locations",
        logo: "/design/un1t-logo.png",
        href: "/work/un1t",
      },
      {
        label: "Jimmy Coach",
        detail: "co-founded",
        logo: "/design/jimmy-coach-logo.png",
        href: "/work/jimmy-coach",
      },
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
        values: [
          "Rises per location or user",
          "Rises per hour",
          "Fixed per milestone",
        ],
      },
      { label: "Your brand", values: ["Their template", "Yours", "Yours"] },
      {
        label: "Your data",
        values: ["Their system", "Yours, if you ask", "Yours"],
      },
      {
        label: "What you see",
        values: ["Nothing", "A demo at the end", "Every step"],
      },
    ],
  },

  // doc 09 ⑥ as "9" and a list (Nazar's pick, 2026-09-25). The NDA lines
  // are the anonymous wording from Portfolio v4 (no names, logos, numbers
  // or links); the omni-channel scope is still unconfirmed there.
  build: {
    label: "What we build",
    stat: { value: "9", label: "products shipped, 4 in fitness" },
    rows: [
      {
        title: "Franchise & multi-location platforms",
        product: "UN1T",
        href: "/work/un1t",
        body: "Member app and franchise CRM on one system: head office sees every member at every site.",
      },
      {
        title: "Coaching, community & progress",
        product: "Jimmy Coach",
        href: "/work/jimmy-coach",
        body: "Client app, coach app and web dashboard. Co-founded, co-owned, live in both stores.",
      },
      {
        title: "Connected-device companion apps",
        body: "A companion app for a European connected-fitness brand: device connectivity and game-based workouts.",
      },
      {
        title: "Two-sided marketplaces & product ecosystems",
        body: "A European services marketplace plus invoicing, time tracking and hiring, all on shared data.",
      },
      {
        title: "SaaS & omni-channel platforms",
        body: "An omni-channel-as-a-service platform for an AI startup: web app and backend.",
      },
      {
        title: "Communities & fan engagement",
        body: "A gamified fan-engagement platform for a US entertainment-tech startup, built from scratch.",
      },
    ],
    link: { label: "All mechanics", href: "/what-we-build" },
  },

  // doc 09 ⑦. Card lines reuse claims already on the site (offer ladder,
  // trust answers, Care); the UI fragments are illustrations, no amounts
  // and no uptime figures.
  get: {
    title: "What you get.",
    cards: [
      {
        id: "code",
        title: "Your code, day one",
        body: "Code, repos and accounts in your name from the first commit.",
      },
      {
        id: "milestones",
        title: "Fixed price per milestone",
        body: "Priced and delivered against milestones you approve.",
      },
      {
        id: "founders",
        title: "Founders on your project",
        body: "You work with Nazar and Oleh directly, backed by a senior team we've shipped with before.",
      },
      {
        id: "steps",
        title: "You see every step",
        body: "Every step shown as it's built, with a runbook at every milestone.",
      },
      {
        id: "after",
        title: "We stay after launch",
        body: "Ongoing build and maintenance once you're live.",
      },
    ],
  },

  // doc 09 ⑨. Heading from the live founders page; each line is the last
  // sentence of their approved bio (Sanity), turned into the first person.
  founders: {
    label: "Nazar & Oleh",
    // Nazar's pick (V1): the live heading with the two of you in it
    headline: [
      "You work with",
      { faces: ["nazar"] },
      "Nazar and",
      { faces: ["oleh"] },
      "Oleh, directly.",
    ],
    people: [
      {
        id: "nazar",
        line: "I'm the one who pressure-tests your product thinking and your plan.",
        cta: {
          label: "Talk to Nazar",
          note: "fitness brands",
          booking: "costCheck",
        },
      },
      {
        id: "oleh",
        line: "I own the technical judgment: how it's built, and whether it will scale.",
        cta: {
          label: "Talk to Oleh",
          note: "product & tech",
          booking: "founderReview",
        },
      },
    ],
  },
} as const;
