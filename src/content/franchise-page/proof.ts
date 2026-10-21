import { OFFER } from "@/content/offer";

/**
 * /franchise chapter 05, "Live work" (Oleh's landing artboard). Copy as
 * drawn; every figure and chat comes from `src/content/proof.ts`.
 */
export const LIVE_WORK = {
  kicker: "05 · Live work",
  title: "Two products we built and run. Download them.",
  un1t: {
    kicker: "Case 01 · UN1T",
    headline: "From separate studios to one network on its own software.",
    storeLabel: "UN1T on the App Store",
    siteLabel: "un1t.com",
    siteHref: "https://un1t.com/",
    membersLabel: "members",
    studiosLabel: "studios",
    photoAlt: "UN1T members after a session",
  },
  jimmy: {
    kicker: "Case 02 · Jimmy Coach",
    headline: "We don't only build software. We run it as owners.",
    text: "Co-founded with a coach: one app for clients and coaches, a web dashboard and payments built in.",
    mrrLabel: "a month, recurring",
    storeLabel: "Jimmy on the App Store",
    siteLabel: "jimmycoach.com",
    siteHref: "https://jimmycoach.com/en",
    dashboardAlt: "Jimmy's coach dashboard",
    bannerAlt: "Jimmy Coach",
  },
  bridge: {
    lead: "Here's how yours gets built.",
    mark: `${OFFER.readyWeeks} weeks, side by side.`,
  },
} as const;
