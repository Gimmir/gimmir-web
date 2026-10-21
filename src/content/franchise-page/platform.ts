/**
 * /franchise, chapter 03 (the platform): the six steps of the scroll story,
 * in Oleh's order. Each step has a scene drawn beside it (lp-platform/scenes).
 */
export const PLATFORM = {
  kicker: "03 · The platform",
  lead: "Keep scrolling. The screens change as you read.",
  steps: [
    {
      title: "Your app. Your brand.",
      body: "Members find a class, book it and pay in 2 taps, in an app with your name in the App Store.",
      chips: ["Classes", "Waitlists", "Class packs", "Any studio"],
    },
    {
      title: "They pay. Everyone gets paid.",
      body: "Each payment lands in the studio's own Stripe account. Your fee and every studio's tech fee reach HQ by themselves.",
      chips: ["Apple Pay", "Stripe per studio", "Tech fee", "Auto lock"],
    },
    {
      title: "Members stay longer.",
      body: "A 30 to 90-day onboarding flow welcomes, nudges and checks in, so fewer members leave in the months they usually do.",
      chips: ["Onboarding", "Coach check-ins", "At-risk flags", "Failed payments"],
    },
    {
      title: "Every studio on one screen.",
      body: "Revenue, members, retention and late payers across the network, live, every morning.",
      chips: ["Revenue", "Retention", "Late payers", "Exports"],
    },
    {
      title: "One way of training, everywhere.",
      body: "HQ writes the session once. It runs on every studio's screens and in every coach's app.",
      chips: ["Session plans", "Coach app", "Studio screens"],
    },
    {
      title: "Ask your network anything.",
      body: "Optional AI agents find members about to leave, draft the coach's note and wait for your OK.",
      chips: ["Optional AI agents", "Your rules"],
    },
  ],
  bridge: {
    statement: "That's the highlights. Here's the whole flow, in order.",
    number: "04",
  },
} as const;
