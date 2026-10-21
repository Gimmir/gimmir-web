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

/**
 * Chat testimonials shown as WhatsApp and iMessage threads on /franchise
 * (Oleh's artboard). Nazar confirmed on 21 Oct 2026 that Rob and Emma
 * agreed to their messages being shown; the words are theirs, as sent.
 * Quentin's quote is still to come, so his thread is pending.
 */
export type ChatMessage = { text: string; time?: string; from: "them" | "us" };

export type ChatThread = {
  id: string;
  name: string;
  initials: string;
  org: string;
  /** Role at the company; null until known (never "[ROLE]" on the page). */
  role: string | null;
  app: "WhatsApp" | "iMessage";
  messages: ChatMessage[];
};

export const CHATS = {
  rob: {
    value: {
      id: "rob",
      name: "Rob Smyth",
      initials: "RS",
      org: "UN1T",
      role: null,
      app: "WhatsApp",
      messages: [
        { from: "us", text: "Here is the link for the web app", time: "22:53" },
        { from: "them", text: "Thank you. Always appreciative of your work and commitment to UN1T", time: "23:16" },
        { from: "them", text: "This is just the beginning.", time: "23:17" },
        { from: "them", text: "Big plans to grow this software/app across the globe.", time: "23:17" },
        { from: "them", text: "There is a great team between all of us and I believe we will go far.", time: "23:19" },
      ],
    },
    status: "approved",
    source: "Nazar, 21 Oct 2026: Rob agreed",
  } satisfies Claim<ChatThread>,
  emma: {
    value: {
      id: "emma",
      name: "Emma Crick",
      initials: "EC",
      org: "UN1T",
      role: null,
      app: "WhatsApp",
      messages: [
        { from: "us", text: "Everything you asked for has been implemented. Please take another pass.", time: "14:27" },
        { from: "them", text: "The above sounds sensible to me. Then we can work out what the next chunk of work needs to look like.", time: "16:03" },
        { from: "them", text: "Thank you! I know you've gone above and beyond to get this over the line", time: "16:06" },
        { from: "us", text: "Looking forward to see people use the apps in full", time: "16:07" },
        { from: "them", text: "Me too!!", time: "16:07" },
      ],
    },
    status: "approved",
    source: "Nazar, 21 Oct 2026: Emma agreed",
  } satisfies Claim<ChatThread>,
  quentin: {
    value: {
      id: "quentin",
      name: "Quentin",
      initials: "Q",
      org: "Jimmy Coach",
      role: "Coach on Jimmy",
      app: "iMessage",
      messages: [{ from: "us", text: "How has Jimmy changed things for you?" }],
    },
    status: "pending",
    source: "Quentin's quote, in his words",
  } satisfies Claim<ChatThread>,
} as const;

export const JIMMY_APP_STORE =
  "https://apps.apple.com/us/app/jimmy-coach/id6746717819";
