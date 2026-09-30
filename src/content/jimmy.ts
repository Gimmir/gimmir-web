/**
 * /work/jimmy-coach, V2 (doc 09 §3.6): told as a founder story, not a
 * vendor case, in Nazar's voice: Jimmy is his own product, paid for with
 * his own money; Oleh wasn't part of it. Facts from Nazar (2026-09-30):
 * one iOS & Android app (coaches log in to a coach mode) plus a web
 * dashboard; AI through MCP (Claude, ChatGPT, Perplexity, or any AI via a
 * custom MCP); launched July 2026, 100+ coaches in the first month, each
 * bringing 2–3 clients, the biggest with 20–40, 200+ coaches two months
 * in; all public. Quentin OK'd being named; his quote is still to come.
 */
export const jimmy = {
  hero: {
    title: "From a coach’s request to a SaaS we co-own.",
    sub: "A coaching platform co-founded and co-owned with a working coach: one native app for iOS and Android, and a web dashboard, live in both stores.",
  },

  origin: {
    label: "The request",
    title: "A coach with 250+ clients asked us for his own app.",
    body: "Quentin Randis coaches Hyrox and CrossFit. He was running it across WhatsApp, spreadsheets and PDFs, and losing clients in the gaps.",
  },

  invest: {
    label: "The decision",
    title: "So I put my own money in.",
    body: "Instead of billing Quentin by the hour, I co-founded Jimmy Coach with him and paid for it myself. I've been through every cycle a founder goes through, building, raising, launching and taking it to market, and that's the experience you get when we build yours.",
    quote: {
      text: "I don't just build SaaS for clients, I put my own money into one.",
      by: "nazar",
    },
  },

  product: {
    label: "The product",
    title: "One app for iOS and Android, and a web dashboard.",
    cards: [
      {
        id: "client",
        tag: "Native app · iOS & Android",
        title: "For clients",
        body: "Where members train, every day: today's workout in clear blocks with timers and video cues, chat with the coach, community, streaks and PRs.",
        screen: "/screens-all/frame-1.jpg",
      },
      {
        id: "coach",
        tag: "Same app · coach login",
        title: "For coaches",
        body: "Log in as a coach and the same app turns into your controls: clients, programs, messages and payments, from the gym floor.",
      },
      {
        id: "dashboard",
        tag: "Web",
        title: "The dashboard",
        body: "Control of everything: workout and course builders, clients, Stripe subscriptions and revenue, in one place instead of five tools.",
      },
    ],
  },

  // confirmed by Nazar (2026-09-30)
  decisions: {
    label: "Three decisions we made as owners",
    items: [
      {
        title: "The coach's AI, not ours.",
        body: "Jimmy works with the coach's own Claude, ChatGPT or Perplexity through MCP, and a custom MCP connects any other AI. Importing a program costs the coach nothing beyond their own AI subscription.",
      },
      {
        title: "Five things, done well.",
        body: "Workouts, community, messaging, payments and courses. Jimmy isn't a feature factory; it does five things and stops there.",
      },
      {
        title: "Built in the open, with coaches.",
        body: "A release every week, a public roadmap coaches vote on, and the founders on Discord to answer them.",
      },
    ],
  },

  // confirmed by Nazar (2026-09-30)
  wrong: {
    label: "What we got wrong",
    items: [
      {
        title: "Closing the app lost the workout.",
        body: "Our first client app didn't resume a session. Now it opens on the exact block and set, with the real elapsed time on the timer.",
      },
      {
        title: "Our first Workout Builder wasn't comfortable enough.",
        body: "We rebuilt it again and again. We listened to every coach in the beta, let them vote, and shipped what helped, until it became one of the best workout builders on the market.",
      },
    ],
  },

  numbers: {
    label: "The numbers",
    date: "Launched July 2026 · as of September 2026",
    stat: { value: "200+", label: "coaches on Jimmy two months after launch" },
    side: [
      {
        value: "100+",
        label: "coaches in the first month, each bringing 2–3 clients",
      },
      { value: "20–40", label: "clients each for the biggest coaches" },
    ],
  },

  close: {
    title: "Building your own SaaS?",
    line: "I've been through every cycle with Jimmy. Tell me what you're building.",
  },
} as const;
