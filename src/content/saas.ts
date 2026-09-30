/**
 * /build-your-saas, V2 (doc 09 §3.3): buyer B, founders building or owning
 * a SaaS, in Nazar and Oleh's voice. Facts only where the site already has
 * them: Jimmy's coach had 250+ clients, 100+ coaches in the first month,
 * co-founded and co-owned. Quentin OK'd being named (2026-09-30). No
 * prices and no budget floor on the page.
 */
import type { HeadlineToken } from "@/components/blocks/inline-headline";

export const saas = {
  meta: {
    title: "Turn Your Business into a SaaS You Own",
    description:
      "You know your business. Nazar and Oleh turn it into a SaaS you own, the way they did for themselves with Jimmy Coach: code, accounts and roadmap in your name.",
  },

  hero: {
    // doc 09's [▢] after "SaaS" is the Jimmy icon: the one we built for us
    headline: [
      "You know your business. We know how to turn it into a SaaS",
      { apps: ["jimmy"] },
      "because we did it for",
      { mark: "ourselves", after: "." },
    ] satisfies HeadlineToken[],
    sub: "For founders building or owning a SaaS.",
    cta: {
      label: "Book a founder review",
      // the faces say who; the line stays one line on a phone
      by: "Free, 30 minutes",
    },
  },

  // doc 09 §3.3 ②, told in three numbers (Nazar's pick, 2026-09-30)
  story: {
    label: "How Jimmy Coach started",
    title: "We did it for ourselves first.",
    // the promise the three numbers prove
    sub: "So when we build yours, we build it like owners, not by the hour.",
    items: [
      {
        value: "250+",
        line: "clients, and Quentin was running them all on WhatsApp, spreadsheets and PDFs.",
        tag: "01 · The request",
      },
      {
        value: "1",
        line: "SaaS we built as his co-founders, on Nazar's own money. No invoice, all the risk.",
        tag: "02 · The bet",
      },
      {
        value: "200+",
        line: "coaches on Jimmy two months after launch.",
        tag: "03 · Today",
      },
    ],
    link: { label: "Read the story", href: "/work/jimmy-coach" },
  },

  // doc 09 §3.3 ③, each situation drawn and answered (Nazar's pick o3,
  // 2026-09-30). DRAFT answers, for Nazar to edit.
  fit: {
    title: "Is this you?",
    items: [
      {
        id: "shelf",
        line: "Off-the-shelf software doesn’t fit.",
        answer:
          "Then we build the one that fits how you already work, in your name.",
      },
      {
        id: "patch",
        line: "You’re already patching your own tool.",
        answer:
          "Good, your patches are the spec. We review what you have, then fix it or rebuild it.",
      },
      {
        id: "audience",
        line: "You have an audience but no technical co-founder.",
        answer:
          "That’s where Quentin was with 250+ clients. You bring the audience, we build the product.",
      },
    ],
  },

  // three big steps (Nazar's pick o3, 2026-09-30). DRAFT: lede and the
  // "You get" lines, for Nazar to edit.
  start: {
    id: "diagnostic",
    title: "How we start.",
    lede: "Every project starts the same way.",
    steps: [
      {
        name: "The Review",
        time: "1–2 weeks",
        lead: "nazar",
        body: "A diagnostic of your architecture, code and plan, with a written report.",
        gets: "a report you can hand to your team or your board.",
      },
      {
        name: "Fix Sprint or V1",
        time: "2 weeks, or by milestone",
        body: "We fix the highest-risk issues ourselves, or build the real thing in your name.",
        gets: "code and accounts in your name from the first commit.",
      },
      {
        name: "Care",
        time: "Monthly",
        body: "Ongoing build and maintenance once you’re live.",
        gets: "a product that keeps moving after launch.",
      },
    ],
    link: { label: "How a build runs, start to launch", href: "/how-we-work" },
  },

  own: {
    title: "What you own.",
    cards: [
      {
        id: "code",
        title: "Code & IP",
        body: "Code, repos and IP in your name from the first commit.",
      },
      {
        id: "docs",
        title: "Architecture docs",
        body: "A runbook at every milestone, so any competent team can pick it up.",
      },
      {
        id: "accounts",
        title: "Your accounts",
        body: "App Store, Stripe and cloud accounts are yours, not ours.",
      },
      {
        id: "roadmap",
        title: "Your roadmap",
        body: "What gets built next is your call.",
      },
    ],
  },

  // an honest filter (Nazar's pick o3, 2026-09-30): what passes, what
  // stops and why. DRAFT: lede, chips and advice, for Nazar to edit.
  notFor: {
    title: "Who it’s not for.",
    lede: "An honest filter, before you book.",
    filter: "Our filter",
    pass: ["Coaching app", "Member app", "Marketplace", "B2B SaaS"],
    to: { title: "We build it.", line: "In your name, from the first commit." },
    stopped: "Stopped at the filter",
    items: [
      {
        chip: "Idea, no budget",
        line: "Ideas without a budget for a first release.",
        advice: "Test it with a no-code prototype first.",
      },
      {
        chip: "Clinical device",
        line: "Regulated clinical products.",
        advice: "Wellness, yes. Clinical, no.",
      },
    ],
  },

  close: {
    title: "Tell us what you're building.",
    line: "We'll tell you honestly how we'd approach it, and whether we're the right team for it.",
  },
} as const;
