import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

type PostHogLike = { capture?: (event: string, props?: Props) => void };

type Gtag = (...args: unknown[]) => void;

/**
 * Events that also go to GA4 (the offer plan's conversion events). GA4 only
 * exists after analytics consent, and never gets a name, email or brand:
 * callers pass labels, buckets and paths only.
 */
const GA4_EVENTS = new Set([
  "cta_click",
  "calc_start",
  "calc_result",
  "numbers_requested",
  "call_booked",
  "app_store_click",
  "guide_requested",
]);

/**
 * One call for every funnel event (door_click, cta_click, hover_case,
 * nda_card_open, booking_started, booking_completed, buildlog_read_75).
 * Goes to Vercel Analytics always, to PostHog once it is loaded (it is
 * only loaded with a key and cookie consent), and to GA4 for the events
 * in GA4_EVENTS when gtag is loaded.
 */
export function trackEvent(name: string, props?: Props) {
  try {
    track(name, props);
  } catch {
    // analytics must never break a click
  }
  const ph = (window as unknown as { posthog?: PostHogLike }).posthog;
  ph?.capture?.(name, props);
  if (GA4_EVENTS.has(name)) {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    gtag?.("event", name, props);
  }
}
