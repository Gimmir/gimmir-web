import { useSyncExternalStore } from "react";

/**
 * Where a visitor came from, read from the link they arrived on, e.g.
 * /franchise?landing=true&source=linkedin, or the usual utm_* tags.
 *
 * Nothing is stored on the device: the landing page is one page with
 * in-page anchors, so the query stays in the address bar for the visit,
 * and every reader takes it from there. It goes to the funnel events and
 * into the Cal.com booking as UTM values, which Cal keeps on the booking
 * for the host to see.
 */

export type LeadSource = {
  /** `source`, or `utm_source` when there is no `source`. */
  source: string | null;
  medium: string | null;
  campaign: string | null;
  term: string | null;
  content: string | null;
  /** Arrived on the landing version (no site header). */
  landing: boolean;
};

// values land in analytics and in the booking: short, plain tokens only
const clean = (v: string | null) => {
  const t = v?.trim().toLowerCase().slice(0, 64) ?? "";
  return /^[a-z0-9._-]+$/.test(t) ? t : null;
};

export function readLeadSource(search: string): LeadSource {
  const q = new URLSearchParams(search);
  return {
    source: clean(q.get("source")) ?? clean(q.get("utm_source")),
    medium: clean(q.get("utm_medium")),
    campaign: clean(q.get("utm_campaign")),
    term: clean(q.get("utm_term")),
    content: clean(q.get("utm_content")),
    landing: q.get("landing") === "true",
  };
}

/** The current page's lead source; empty on the server. */
export function currentLeadSource(): LeadSource {
  return readLeadSource(
    typeof window === "undefined" ? "" : window.location.search,
  );
}

/** Extra props for every funnel event; nothing when the visit has no tags. */
export function leadEventProps(
  lead = currentLeadSource(),
): Record<string, string> {
  const props: Record<string, string> = {};
  if (lead.source) props.lead_source = lead.source;
  if (lead.medium) props.lead_medium = lead.medium;
  if (lead.campaign) props.lead_campaign = lead.campaign;
  if (lead.landing) props.landing = "true";
  return props;
}

/** UTM keys for a Cal.com embed config; Cal saves them on the booking. */
export function calLeadConfig(lead: LeadSource): Record<string, string> {
  const config: Record<string, string> = {};
  if (lead.source) config.utm_source = lead.source;
  if (lead.medium) config.utm_medium = lead.medium;
  if (lead.campaign) config.utm_campaign = lead.campaign;
  if (lead.term) config.utm_term = lead.term;
  if (lead.content) config.utm_content = lead.content;
  if (lead.landing) config.utm_content ??= "landing";
  return config;
}

const noop = () => () => {};

/**
 * The query string, for rendering: "" on the server and during hydration,
 * then the real one, so markup that depends on it never mismatches.
 */
export function useSearch(): string {
  return useSyncExternalStore(
    noop,
    () => window.location.search,
    () => "",
  );
}
