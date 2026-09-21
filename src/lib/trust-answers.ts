import type { FaqItem } from "@/components/shared/faq-list";

/**
 * The answers a careful buyer checks first. Shared by /operators and
 * /how-we-work so the wording never drifts between pages.
 */
export const DISAPPEAR_ANSWER: FaqItem = {
  key: "disappear",
  question: "What happens if Gimmir disappears?",
  answer:
    "Nothing breaks. Repositories, cloud accounts and app-store listings are in your name from day one, and you get a runbook at every milestone. Any competent team can pick it up.",
};

export const CONTRACT_ANSWER: FaqItem = {
  key: "contract",
  question: "Who do we contract with?",
  answer:
    "Gimmir LLC, a Delaware (US) company, under US law. Every engineer assigns their IP to that company before touching your code, and it passes to you in the contract. The team works from the EU.",
};

export const TWO_FOUNDERS_ANSWER: FaqItem = {
  key: "two-founders",
  question: "It's just two founders. What if you're unavailable?",
  answer:
    "You work with Nazar and Oleh directly, backed by a core team of ten senior engineers and designers we've shipped with before. Your code and accounts are in your name, and we keep runbooks so nothing lives only in one head. We take on few projects at a time on purpose, and if we can't give yours the right people, we'll say so on the first call.",
};

export const UNAVAILABLE_ANSWER: FaqItem = {
  key: "founder-unavailable",
  question: "What if one founder becomes unavailable mid-project?",
  answer:
    "The other founder and the senior team carry on. Your accounts, code and runbooks mean nothing is locked in one person's head.",
};

export const TAKEOVER_ANSWER: FaqItem = {
  key: "takeover",
  question: "Can we hire our own team later and take over?",
  answer:
    "Yes. Everything is in your name and documented so any team can pick it up. No lock-in is the point.",
};

export const NOT_OUTSOURCED_ANSWER: FaqItem = {
  key: "not-outsourced",
  // copy-check-ignore: the buyer's own word, answered with a no
  question: "Do you outsource the work?",
  answer:
    "No. The work is done by us and a small senior team we've shipped with before: people we know and trust, not strangers.",
};
