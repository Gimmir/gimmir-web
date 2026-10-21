import { OFFER } from "@/content/offer";
import { formatMoney } from "@/lib/franchise-calc";

/**
 * /franchise chapter 06, "How we build" (Oleh's landing artboard). The
 * slot payment and the 12 weeks come from the offer, so they can't drift.
 */
const slot = OFFER.payments[0];

export const PROCESS = {
  kicker: "06 · How we build",
  title: `${OFFER.readyWeeks} weeks, side by side. You see every step.`,
  lead: "No demo at the end. A shared channel, a weekly call, and the app on your phone from week 3.",
  steps: [
    { label: "Week 0", text: `${formatMoney(slot.amount)} ${slot.when}` },
    { label: "Weeks 1 to 2", text: "Your brand, plans and prices set up" },
    { label: "Weeks 3 to 10", text: "Built with you, tested in one studio" },
    { label: "Weeks 11 to 12", text: "Every member moved, apps in the stores" },
  ],
  ready: {
    /** Shown until the client has worked out the date. */
    fallback: `In ${OFFER.readyWeeks} weeks`,
    text: "Ready, if you start this week. Your fee flows from the first payment.",
  },
  channel: {
    list: ["# general", "# build", "# launch"],
    title: "# build · example of your weekly update",
    messages: [
      {
        who: "oleh",
        time: "Fri 16:02",
        text: "Week 6 done: waitlists and class packs live in the test app. Leeds tries it Monday. Build on your phones: link pinned.",
      },
      {
        who: "nazar",
        time: "Fri 16:10",
        text: "Next week: moving Leeds members over. Call Tuesday 10:00 as usual.",
      },
    ],
  },
  post: {
    connection: "· 1st",
    headline: "I put fitness franchises on their own app · Co-Founder & CTO @ Gimmir",
    network: "LinkedIn",
    text: "We built an app for Hyrox and CrossFit coaches. It brings in $12,000+ every month. And that's not the part I'm proudest of…",
    imageAlt: "Jimmy Coach dashboard in the post",
    footer: "We build in public",
    cta: "Follow on LinkedIn",
  },
  bridge: {
    lead: "Only",
    tail: "networks get founding terms.",
  },
} as const;
