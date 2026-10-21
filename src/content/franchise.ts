/**
 * /franchise's page-level copy: its meta and the two calls to action other
 * pages reuse (the UN1T case links back here). The chapters' own copy lives
 * in `content/franchise-page/*`; every price and figure comes from
 * `offer.ts` and `proof.ts`.
 */

import { OFFER } from "@/content/offer";
import { BOOKINGS } from "@/lib/booking";

const POUNDS = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** A price as set in the offer, exact ("£12,000"); sums use `formatMoney`. */
export const gbp = (value: number) => POUNDS.format(value);

export const franchise = {
  meta: {
    // the layout's title template adds "· Gimmir"
    title: "Your franchise app: turn platform fees into HQ income",
    description: `Franchisees pay Mindbody or Glofox every month. With your own app that money comes to HQ, plus a fee on every payment. ${gbp(OFFER.setupFee)} fixed, ready in ${OFFER.readyWeeks} weeks.`,
  },

  cta: {
    numbers: { label: "Work out my numbers", href: "/franchise#numbers" },
    call: { label: BOOKINGS.franchiseCall.label },
  },
} as const;
