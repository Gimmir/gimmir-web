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
      by: "Free, 30 minutes, with Oleh & Nazar",
    },
  },

  // doc 09 §3.3 ②, one screen per chapter
  story: {
    label: "How Jimmy Coach started",
    chapters: [
      {
        line: "Quentin, a coach with 250+ clients, couldn't find good software.",
        visual: "chaos",
      },
      {
        line: "He asked us to build his own.",
        visual: "/screens-all/frame-5.jpg",
        alt: "Jimmy Coach: a personal program with weekly progress and upcoming workouts",
      },
      {
        line: "We saw it was every coach's problem.",
        visual: "/screens-all/frame-2.jpg",
        alt: "Jimmy Coach: a workout broken into warm-up, power, strength and conditioning blocks",
      },
      {
        line: "Nazar put his own money in and co-founded Jimmy Coach.",
        visual: "/screens-all/frame-3.jpg",
        alt: "Jimmy Coach: logging reps, weights and coach’s notes during a live session",
      },
      {
        line: "200+ coaches two months after launch.",
        visual: "/screens-all/frame-6.jpg",
        alt: "Jimmy Coach: a client’s progress, steps and weight over time",
      },
    ],
    link: { label: "Read the story", href: "/work/jimmy-coach" },
  },

  fit: {
    title: "Is this you?",
    items: [
      "Off-the-shelf software doesn't fit.",
      "You're already patching your own tool.",
      "You have an audience but no technical co-founder.",
    ],
  },

  start: {
    id: "diagnostic",
    title: "How we start.",
    steps: [
      {
        name: "The Review",
        time: "1–2 weeks",
        lead: "oleh",
        body: "A diagnostic led by Oleh: architecture, code and plan, with a written report.",
      },
      {
        name: "Fix Sprint or V1",
        time: "2 weeks, or by milestone",
        body: "We fix the highest-risk issues ourselves, or build the real thing in your name.",
      },
      {
        name: "Care",
        time: "Monthly",
        body: "Ongoing build and maintenance once you're live.",
      },
    ],
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

  notFor: {
    title: "Who it's not for.",
    items: [
      "Ideas without a budget for a first release.",
      "Regulated clinical products.",
    ],
  },

  close: {
    title: "Tell us what you're building.",
    line: "We'll tell you honestly how we'd approach it, and whether we're the right team for it.",
  },
} as const;
