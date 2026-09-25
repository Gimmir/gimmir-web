import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

type PostHogLike = { capture?: (event: string, props?: Props) => void };

/**
 * One call for every funnel event (door_click, cta_click, hover_case,
 * nda_card_open, booking_started, booking_completed, buildlog_read_75).
 * Goes to Vercel Analytics always, and to PostHog once it is loaded (it is
 * only loaded with a key and cookie consent).
 */
export function trackEvent(name: string, props?: Props) {
  try {
    track(name, props);
  } catch {
    // analytics must never break a click
  }
  const ph = (window as unknown as { posthog?: PostHogLike }).posthog;
  ph?.capture?.(name, props);
}
