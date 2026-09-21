import type { FaqItem } from "@/components/shared/faq-list";

/**
 * The two answers a careful buyer checks first. Shared by /operators and
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
