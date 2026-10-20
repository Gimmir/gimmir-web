/**
 * Home page copy (V2). Facts follow the portfolio rules: 9 products shipped,
 * 4 in fitness, 1 co-owned. UN1T and Jimmy figures come from proof.ts and
 * never from a typed number there; a pending claim doesn't render.
 */
import type { HeadlineToken } from "@/components/blocks/inline-headline";
import { JIMMY, PRODUCTS_SHIPPED, shown, UN1T } from "@/content/proof";

const un1tStudios = shown(UN1T.studios);
const un1tMembers = shown(UN1T.members);
const jimmyMrr = shown(JIMMY.mrr);
const jimmyClients = shown(JIMMY.clients);

/** "$12,000+" as "$12k+": short enough to draw as the case's big number. */
const compactUsd = (v: string) =>
  v.replace(/^\$(\d+),000(\+?)$/, (_, n, plus) => `$${n}k${plus}`);

export const home = {
  meta: {
    // Leads with the franchise offer (Oleh's offer plan, 20 Oct 2026); the
    // SaaS-founder position stays in the hero.
    title: "Gimmir: your franchise's own app, booking and payments",
    description:
      "Franchisees pay a platform every month. With your own app that money comes to HQ, plus a fee on every payment. Built for UN1T, a 10-studio franchise.",
  },

  hero: {
    chips: [
      {
        label: "UN1T",
        detail: [
          un1tStudios && `${un1tStudios} studios`,
          un1tMembers && `${un1tMembers} members`,
        ]
          .filter(Boolean)
          .join(", "),
        logo: "/design/un1t-logo.png",
        href: "/work/un1t",
      },
      {
        label: "Jimmy Coach",
        detail: jimmyMrr
          ? `${compactUsd(jimmyMrr)} a month in revenue`
          : "co-founded",
        logo: "/design/jimmy-coach-logo.png",
        href: "/work/jimmy-coach",
      },
      {
        label: `${PRODUCTS_SHIPPED} products`,
        detail: "shipped",
        grid: true,
        href: "/work",
      },
    ],
    headline: [
      "We",
      { faces: ["nazar", "oleh"], sr: "(Nazar and Oleh)" },
      "build SaaS that founders",
      { mark: "own", after: "," },
      "and show you how it’s done.",
      { apps: ["un1t", "jimmy"] },
      "Fitness is where we go deepest.",
    ] satisfies HeadlineToken[],
    doors: [
      {
        id: "franchise",
        label: "I run a franchise",
        href: "/franchise",
      },
      { id: "saas", label: "I’m building a SaaS", href: "/build-your-saas" },
    ],
    // under the doors: why a franchise would click the first one
    pitch: "Your franchisees pay a platform. With your own app, that money comes to HQ.",
    note: { quote: "Book a call with us, not a sales rep.", by: "nazar" },
  },

  manifesto: {
    // one sentence per pair of lines, set as four lines at every width;
    // the last line gets the lime marker
    lines: ["Your business", "runs on software.", "You should", "own it."],
    // the note on the drawn key: the same claim as /pricing and /franchise
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
    meta: [
      "Fitness franchise",
      un1tStudios && `${un1tStudios} studios`,
      "Member app + franchise CRM",
    ].filter((m): m is string => Boolean(m)),
    title: "UN1T's HQ now earns a fee on every studio payment.",
    story:
      "Each studio ran on a rented platform and its own stack of tools. We built one member app and franchise CRM that UN1T owns, so head office sees every member and every payment.",
    link: { label: "Read the case", href: "/work/un1t" },
    stat: { value: String(un1tStudios ?? ""), label: "studios on one system" },
    side: { value: un1tMembers ?? "", label: "members" },
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
    meta: ["Coaching platform", "Co-founded", "iOS & Android app + web"],
    link: { label: "Read the story", href: "/work/jimmy-coach" },
    stat: {
      value: compactUsd(jimmyMrr ?? ""),
      label: "a month in recurring revenue",
    },
    // coach and client counts wait for sign-off (proof.ts): no line until then
    side: jimmyClients
      ? { value: String(jimmyClients), label: "clients on Jimmy" }
      : null,
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
          "One fixed set-up, then a plan your tech fee covers",
        ],
      },
      {
        label: "Who earns from your members' payments",
        values: ["Vendor", "–", "You"],
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
        href: "/franchise",
        body: "Member app and franchise CRM on one system: head office sees every member at every site.",
      },
      {
        title: "Coaching, community & progress",
        product: "Jimmy Coach",
        href: "/work/jimmy-coach",
        body: "One app for clients and coaches, and a web dashboard. Co-founded, co-owned, live in both stores.",
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
    link: { label: "All nine products", href: "/work" },
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
    // Nazar's pick (V1): the live heading with the two of you in it,
    // "You work with [face] Nazar and [face] Oleh, directly."
    headline: { before: "You work with", after: "directly." },
    // Oleh first: the franchise call is the main road in
    people: [
      {
        id: "oleh",
        line: "I own the technical judgment: how it's built, and whether it will scale.",
        cta: {
          label: "Talk to Oleh",
          note: "franchises",
          booking: "franchiseCall",
        },
      },
      {
        id: "nazar",
        line: "I'm the one who pressure-tests your product thinking and your plan.",
        cta: {
          label: "Talk to Nazar",
          note: "SaaS founders",
          booking: "founderReview",
        },
      },
    ],
    link: { label: "More about us", href: "/about" },
  },
} as const;
