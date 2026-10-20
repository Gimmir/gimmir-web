/**
 * /work/un1t, rewritten around money (Oleh's offer plan, 20 Oct 2026): HQ
 * now earns a fee on every studio payment. Every figure and the quote come
 * from proof.ts; a claim that is still pending never renders. Never here:
 * the stack, "white-label", a royalty claim outside the objection, the old
 * "12 weeks", an exact saving, or the App Store ratings.
 */
import { shown, UN1T } from "@/content/proof";

const studios = shown(UN1T.studios);
const members = shown(UN1T.members);
const platformFee = shown(UN1T.platformFeePerStudio);
const quote = shown(UN1T.quote);
const health = shown(UN1T.healthIntegrations);

export const un1t = {
  hero: {
    title: "UN1T's HQ now earns a fee on every studio payment.",
    /** Studios and members as drawn text; the App Store link is the third. */
    stats: [
      studios !== null && `${studios} studios`,
      members !== null && `${members} members`,
    ].filter((s): s is string => Boolean(s)),
    appStore: {
      label: "Its own app on the App Store",
      href: UN1T.appStore.url,
    },
    /** The drawn figure beside the headline, and the OG card's. */
    stat: { value: String(studios ?? ""), label: "studios" },
  },

  before: {
    label: "Before",
    title: "Where UN1T started.",
    body: `${studios ?? "Its"} studios on Glofox${platformFee !== null ? ` at about £${platformFee} a studio a month` : ""}, an old in-house system nobody could support, and a half-built app from a previous vendor that couldn't launch.`,
  },

  built: {
    label: "What we built",
    title: "Their own app, with HQ's fee in every payment.",
    cards: [
      {
        id: "app",
        title: "Member app",
        body: "Their own app, on the App Store. Members buy memberships and book classes in it.",
      },
      {
        id: "payments",
        title: "Payments with HQ's fee",
        body: "HQ's fee is taken automatically on every payment.",
      },
      {
        id: "workout",
        title: "The daily workout",
        body: "The same workout is pushed from HQ to every studio, including the screens on the studio floor.",
      },
      {
        id: "wellhub",
        title: "Wellhub bookings",
        body: "Wellhub bookings come straight in.",
      },
    ],
    /** Pending until Oleh confirms it can be public: null drops the line. */
    health,
  },

  changed: {
    label: "What changed for HQ",
    title: "HQ now earns the fee its studios used to pay a vendor.",
    line: "The Glofox bill is going as the studios move across.",
  },

  objection: {
    label: "The objection it answers",
    body: "UN1T's franchisees pay HQ a royalty and, on top of it, a fee on every payment. That's the answer to “my franchisees won't accept a new fee”.",
  },

  quote,

  close: {
    title: "Yours looks like this, in your brand.",
  },
} as const;
