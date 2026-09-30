/**
 * /work/jimmy-coach, V2 (doc 09 §3.6): told as a founder story, not a
 * vendor case, in Nazar's voice: Jimmy is his own product, paid for with
 * his own money; Oleh wasn't part of it. Facts from Nazar (2026-09-30):
 * one iOS & Android app (coaches log in to a coach mode) plus a web
 * dashboard; AI through MCP (Claude, ChatGPT, Perplexity, or any AI via a
 * custom MCP); launched July 2026, 100+ coaches in the first month, each
 * bringing 2–3 clients, the biggest with 20–40, 200+ coaches two months
 * in; all public. Quentin OK'd being named; his quote is still to come.
 * Screens are the real product, from Nazar (2026-10-01), in public/jimmy.
 */

const PHONE = { width: 489, height: 1018 };
const BROWSER = { width: 2055, height: 1262 };

export const jimmy = {
  hero: {
    title: "From a coach’s request to a SaaS we co-own.",
    sub: "A coaching platform co-founded and co-owned with a working coach: one native app for iOS and Android, and a web dashboard, live in both stores.",
    screens: [
      {
        src: "/jimmy/coach-clients.png",
        alt: "Jimmy Coach in coach mode: the client list, with inactive and overdue clients flagged",
        ...PHONE,
      },
      {
        src: "/jimmy/client-home.png",
        alt: "Jimmy Coach: the client home screen with today’s workout, steps and weight",
        ...PHONE,
      },
      {
        src: "/jimmy/client-rest-timer.png",
        alt: "Jimmy Coach: a workout in progress, with the rest timer",
        ...PHONE,
      },
    ],
  },

  // the live product, with the URLs jimmy-web-app's own store badges use
  links: [
    {
      label: "jimmycoach.com",
      href: "https://jimmycoach.com",
      aria: "Jimmy Coach’s website",
    },
    {
      label: "App Store",
      href: "https://apps.apple.com/us/app/jimmy-coach/id6746717819",
      aria: "Jimmy Coach on the App Store",
    },
    {
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.jimmycoach.jimmy",
      aria: "Jimmy Coach on Google Play",
    },
  ],

  origin: {
    label: "The request",
    title: "A coach with 250+ clients asked us for his own app.",
    body: "Quentin Randis coaches Hyrox and CrossFit. He was running it across WhatsApp, spreadsheets and PDFs, and losing clients in the gaps.",
    // from Jimmy's own site
    screens: [
      {
        src: "/jimmy/without-jimmy.png",
        alt: "Without Jimmy: client messages on WhatsApp, a training spreadsheet, manual payments and scheduling by hand",
        width: 756,
        height: 775,
      },
      {
        src: "/jimmy/with-jimmy.png",
        alt: "With Jimmy: messaging, the workout builder, Stripe payments and scheduling in one place",
        width: 756,
        height: 775,
      },
    ],
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
        screens: [
          {
            src: "/jimmy/client-swap.png",
            alt: "Jimmy Coach: swapping an exercise mid-workout, with a video for each move",
            ...PHONE,
          },
          {
            src: "/jimmy/client-chat.png",
            alt: "Jimmy Coach: a client’s chat with their coach",
            ...PHONE,
          },
        ],
      },
      {
        id: "coach",
        tag: "Same app · coach login",
        title: "For coaches",
        body: "Log in as a coach and the same app turns into your controls: clients, programs, messages and payments, from the gym floor.",
        screens: [
          {
            src: "/jimmy/coach-client-overview.png",
            alt: "Jimmy Coach in coach mode: one client’s program, overdue payment and week",
            ...PHONE,
          },
          {
            src: "/jimmy/coach-client-activity.png",
            alt: "Jimmy Coach in coach mode: a client’s workouts, set by set",
            ...PHONE,
          },
        ],
      },
      {
        id: "dashboard",
        tag: "Web",
        title: "The dashboard",
        body: "Control of everything: workout and course builders, clients, Stripe subscriptions and revenue, in one place instead of five tools.",
        screens: [
          {
            src: "/jimmy/dashboard.png",
            alt: "The Jimmy Coach web dashboard: clients, active programs, monthly revenue and who needs attention",
            ...BROWSER,
          },
        ],
        // DRAFT (2026-10-01): the demo club's figures are small, so the
        // caption says whose they are
        caption: "One coach’s dashboard: their clients, programs and revenue.",
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
    // decision 01, as Jimmy's own site tells it
    screen: {
      src: "/jimmy/connected-ai.png",
      alt: "jimmycoach.com: Jimmy connects to the coach’s own Claude, ChatGPT or Perplexity",
      ...BROWSER,
    },
    caption: "01 · live on jimmycoach.com", // DRAFT (2026-10-01)
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
    // the fix for the first item, as it looks today
    screen: {
      src: "/jimmy/live-activity.png",
      alt: "A Jimmy Coach workout on the iPhone lock screen: the block and the time elapsed",
      ...PHONE,
    },
    // DRAFT (2026-10-01)
    caption:
      "Lock the phone mid-session and the workout stays on the lock screen: the block you’re on and the time elapsed.",
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

  // the case in two quotable answers (approved by Nazar, 2026-10-01),
  // also FAQPage
  faq: {
    title: "Jimmy Coach, in short.",
    items: [
      {
        key: "what",
        question: "What's in an online coaching app like Jimmy Coach?",
        answer:
          "Five things, done well: workouts, community, messaging, payments and courses. Clients train in one app for iOS and Android, coaches switch the same app into coach mode, and a web dashboard builds programs and tracks Stripe subscriptions and revenue. 200+ coaches were on it two months after launch.",
      },
      {
        key: "who",
        question: "Who built Jimmy Coach?",
        answer:
          "Nazar co-founded it with Quentin Randis, a Hyrox and CrossFit coach with 250+ clients, and paid for it himself instead of billing by the hour. Gimmir built it and co-owns it.",
      },
    ],
  },

  close: {
    title: "Building your own SaaS?",
    line: "I've been through every cycle with Jimmy. Tell me what you're building.",
  },
} as const;
