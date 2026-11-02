import { GROUPS, OFFER } from "@/content/offer";

/** Copy for the gym-groups chapter (Oleh's artboard, 2 Nov 2026). */
export const GROUPS_COPY = {
  kicker: `Gym groups · ${GROUPS.minSites} to ${GROUPS.maxSites} sites · ${GROUPS.regions}`,
  title: {
    lead: "Own your sites?",
    mark: "Own the system too.",
  },
  lead: "We rebuild your platform and your member app as one system. Code included.",
  get: {
    title: "What you get",
    items: [
      "Everything you use today, in one system",
      "Your own Stripe account",
      "Your data, readable",
      "A developer on your requests",
      "The full source, yours for good",
    ],
  },
  how: {
    title: "How it works",
    steps: [
      "We go through your live system. You write no spec.",
      "One fixed price. No change orders.",
      `Paid in ${OFFER.payments.length} parts, by date.`,
      "One site first, your old system alongside.",
    ],
    cta: "Book 30 minutes",
  },
} as const;
