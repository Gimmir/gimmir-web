/**
 * /franchise chapter "Proof" (Oleh's landing artboard, 2 Nov). Copy as
 * drawn; every figure and chat comes from `src/content/proof.ts`.
 */
export const LIVE_WORK = {
  kicker: "Proof",
  title: { lead: "Not a pitch deck.", mark: "It's live." },
  lead: "We built UN1T's app. Download it before you talk to us.",
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
  chats: {
    title: "Straight from our WhatsApp with UN1T.",
    note: "Unedited.",
  },
  jimmy: {
    kicker: "Case 02 · Jimmy Coach",
    headline: "We run software as owners, too.",
    /** The sentence before the figure; the figure is added only while approved. */
    text: "A coaching app we co-founded with a coach and built.",
    storeLabel: "Jimmy on the App Store",
    siteLabel: "jimmycoach.com",
    siteHref: "https://jimmycoach.com/en",
    dashboardAlt: "Jimmy's coach dashboard",
  },
  band: {
    title: "You've seen the app. Now see it with your numbers.",
    note: "30 minutes with the founders. UN1T live on screen. Your numbers in writing.",
    placement: "proof-band",
  },
} as const;

/** "Over $12,000 a month, recurring." from the approved "$12,000+". */
export function jimmyMrrSentence(mrr: string | null): string {
  return mrr === null
    ? ""
    : ` Over ${mrr.replace(/\+$/, "")} a month, recurring.`;
}
