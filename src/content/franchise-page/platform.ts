/**
 * /franchise, "What you get" (Oleh's landing artboard, 2 Nov): six things
 * the network runs on, as a bento grid of illustrated cards. The
 * illustrations are drawn in code (lp-platform/illustrations).
 */
export const PLATFORM = {
  kicker: "What you get",
  title: "Six things your network runs on.",
  marked: "All in your name.",
  lead: "One system for HQ, every studio, every coach and every member.",
  tiles: [
    {
      title: "Your app. Your brand.",
      body: "Members find a class, book it and pay in 2 taps, in an app with your name in the App Store.",
    },
    {
      title: "They pay. Everyone gets paid.",
      body: "Each payment lands in the studio's own Stripe account. What each studio pays you, and your fee on every payment, reach you without anyone chasing.",
    },
    {
      title: "Members stay longer.",
      body: "A 30 to 90-day onboarding flow welcomes, nudges and checks in, so fewer members leave in the months they usually do.",
    },
    {
      title: "Every studio on one screen.",
      body: "Revenue, members, retention and late payers across the network, live, every morning.",
    },
    {
      title: "One way of training, everywhere.",
      body: "HQ writes the session once. It runs on every studio's screens and in every coach's app.",
    },
    {
      title: "Ask your network anything.",
      body: "Optional AI agents find members about to leave, draft the coach's note and wait for your OK.",
    },
  ],
  band: {
    title: "All of it, in your brand, in 12 weeks.",
    placement: "platform-band",
  },
} as const;
