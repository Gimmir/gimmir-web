/**
 * Every number and claim the site may make about UN1T and Jimmy Coach, in
 * one place, so pages can't drift apart again (Oleh's offer plan, 20 Oct
 * 2026, "Approved claims only"). Pages read from here; they never type a
 * figure by hand.
 *
 * A claim with status "pending" is waiting on Oleh's or Nazar's sign-off and
 * must not render: use `shown()` and drop the line when it returns null.
 */

export type ClaimStatus = "approved" | "pending";

export type Claim<T> = {
  value: T;
  status: ClaimStatus;
  /** Who signs it off, or where the figure comes from. */
  source: string;
};

/** The claim's value, or null while it waits for sign-off. */
export function shown<T>(claim: Claim<T>): T | null {
  return claim.status === "approved" ? claim.value : null;
}

export const UN1T = {
  name: "UN1T",
  studios: {
    value: 10,
    status: "approved",
    source: "BRIEF.md §4",
  } satisfies Claim<number>,
  members: {
    value: "3,000+",
    status: "approved",
    source: "BRIEF.md §4",
  } satisfies Claim<string>,
  /** What each studio paid Glofox a month. Never shown as an exact saving. */
  platformFeePerStudio: {
    value: 250,
    status: "approved",
    source: "Case study and offer page only, always \"about\"",
  } satisfies Claim<number>,
  appStore: {
    id: "1571083836",
    url: "https://apps.apple.com/gb/app/un1t-training/id1571083836",
  },
  /** Word for word, attributed to Rob at UN1T. */
  quote: {
    value: {
      text: "Thank you. Always appreciative of your work and commitment to UN1T.",
      name: "Rob",
      org: "UN1T",
    },
    status: "approved",
    source: "BRIEF.md §4",
  } satisfies Claim<{ text: string; name: string; org: string }>,
  /** The UN1T case only, until Oleh confirms it can be public. */
  healthIntegrations: {
    value: "Apple Health and Health Connect built in",
    status: "pending",
    source: "Oleh",
  } satisfies Claim<string>,
} as const;

export const JIMMY = {
  name: "Jimmy Coach",
  /** Approved anywhere. Oleh confirms today's figure and the currency. */
  mrr: {
    value: "$12,000+",
    status: "approved",
    source: "BRIEF.md §4",
  } satisfies Claim<string>,
  /** "…5 months after launch": only once Oleh confirms both numbers. */
  mrrTimeline: {
    value: "5 months after launch",
    status: "pending",
    source: "Oleh",
  } satisfies Claim<string>,
  coaches: {
    value: 0,
    status: "pending",
    source: "Nazar fills, Oleh signs off",
  } satisfies Claim<number>,
  clients: {
    value: 0,
    status: "pending",
    source: "Nazar fills, Oleh signs off",
  } satisfies Claim<number>,
  liveSince: {
    value: "May 2026",
    status: "approved",
    source: "App Store listing, 15 May 2026",
  } satisfies Claim<string>,
} as const;

/** Gimmir's own track record; on /work and the home strip, never on fitness pages. */
export const PRODUCTS_SHIPPED = 9;
