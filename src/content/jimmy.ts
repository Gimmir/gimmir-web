/**
 * /work/jimmy-coach, V2 (doc 09 §3.6): told as a founder story, not a
 * vendor case. Facts are the site's (Quentin, 250+ clients, two native
 * apps + web, 100+ coaches and 300+ users in the first month) and Nazar's
 * voice file (the coach's own AI, session resume, the Stripe → Slack
 * webhook). Quentin OK'd being named (2026-09-30). Blocks marked DRAFT
 * are my wording for Nazar to correct: the three decisions, what we got
 * wrong, and the sessions figure with its date.
 */
export const jimmy = {
  hero: {
    title: "From a coach’s request to a SaaS we co-own.",
    sub: "A coaching platform we co-founded and co-own with a working coach: two native apps and a web dashboard, live in the App Store and Google Play.",
  },

  origin: {
    label: "The request",
    title: "A coach with 250+ clients asked us for his own app.",
    body: "Quentin Randis coaches Hyrox and CrossFit. He was running it across WhatsApp, spreadsheets and PDFs, and losing clients in the gaps.",
  },

  invest: {
    label: "The decision",
    title: "We saw every coach’s problem, so we invested.",
    body: "Instead of billing Quentin by the hour, we put our own money in, co-founded Jimmy Coach with him and built it as owners.",
    quote: {
      text: "I don't just build SaaS for clients, I put my own money into one.",
      by: "nazar",
    },
  },

  product: {
    label: "The product",
    title: "Two native apps and a web dashboard.",
    cards: [
      {
        id: "client",
        tag: "Native app · iOS & Android",
        title: "The client app",
        body: "Where members train, every day: today's workout in clear blocks with timers and video cues, chat with the coach, streaks and PRs, under the coach's own brand.",
        screen: "/screens-all/frame-1.jpg",
      },
      {
        id: "coach",
        tag: "Native app · iOS & Android",
        title: "The coach app",
        body: "The business in a pocket: program workouts, answer clients and watch payments come in, from the gym floor, not a laptop.",
      },
      {
        id: "dashboard",
        tag: "Web",
        title: "The dashboard",
        body: "The heavy lifting: workout and course builders, client management, Stripe subscriptions and revenue, in one place instead of five tools.",
      },
    ],
  },

  // DRAFT: Nazar to confirm or replace all three (grounded in
  // jimmycoach.com: connected AI, "five things", weekly releases)
  decisions: {
    label: "Three decisions we made as owners",
    items: [
      {
        title: "The coach's AI, not ours.",
        body: "Jimmy connects to the coach's own Claude, ChatGPT or Perplexity instead of selling an AI tier on top.",
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

  // DRAFT: Nazar to confirm or replace both
  wrong: {
    label: "What we got wrong",
    items: [
      {
        title: "Closing the app lost the workout.",
        body: "Our first client app didn't resume a session. Now it opens on the exact block and set, with the real elapsed time on the timer.",
      },
      {
        title: "We expected programs to be built from scratch.",
        body: "Coaches wanted to bring the ones they already had. Now they screenshot a program from another tool and Claude rebuilds it in Jimmy.",
      },
    ],
  },

  numbers: {
    label: "The numbers",
    // DRAFT: add the launch month once Nazar gives it
    date: "In the first month after launch",
    stat: { value: "100+", label: "coaches on Jimmy in its first month" },
    side: [
      { value: "300+", label: "users" },
      // DRAFT: from Nazar's notes (30 days after launch); confirm it's public
      { value: "601", label: "training sessions logged" },
    ],
  },
} as const;
