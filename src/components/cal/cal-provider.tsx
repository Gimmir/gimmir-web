"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

import type { BookingId } from "@/lib/booking";
import { recordBooking } from "@/lib/booking-analytics";
import { CAL_NAMESPACE, CAL_UI } from "@/lib/cal";

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

/**
 * Loads the Cal.com embed and applies the namespace UI config. Renders
 * nothing: the triggers are any elements carrying the Cal data attributes
 * (see <BookTrigger>, <Button cal>), which Cal wires up via event
 * delegation. It also records completed popup bookings, attributed to the
 * last booking button clicked (its `data-booking`).
 *
 * The embed loads once the page is idle (or on the first tap), not on
 * mount: its script would otherwise compete with the hero entrance for the
 * main thread and make it stutter on phones. Booking clicks are handled
 * here and opened through the API as soon as the embed is ready.
 */
export function CalProvider() {
  useEffect(() => {
    let lastBooking: BookingId | "unknown" = "unknown";
    let loading: Promise<CalApi> | null = null;
    const onBooked = () => recordBooking(lastBooking, "popup");

    const load = () =>
      (loading ??= getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
        cal("ui", CAL_UI);
        cal("on", { action: "bookingSuccessfulV2", callback: onBooked });
        return cal;
      }));

    // Every booking click opens the popup through the API, whether or not
    // the embed has finished loading: Cal's own click delegation attaches
    // a beat after its script, and a tap in that gap was simply lost.
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cal-link]",
      );
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      if (trigger.dataset.booking) {
        lastBooking = trigger.dataset.booking as BookingId;
      }
      const calLink = trigger.dataset.calLink ?? "";
      let config: Record<string, string> | undefined;
      try {
        config = JSON.parse(trigger.dataset.calConfig ?? "{}");
      } catch {
        config = undefined;
      }
      void load().then((cal) => cal("modal", { calLink, config }));
    };
    document.addEventListener("click", onClick, true);

    const onIntent = () => void load();
    window.addEventListener("pointerdown", onIntent, { once: true, passive: true });
    // Safari has no requestIdleCallback: fall back to a short timeout.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(() => void load(), { timeout: 4000 })
      : setTimeout(() => void load(), 2500);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pointerdown", onIntent);
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle);
      void loading?.then((cal) =>
        cal("off", { action: "bookingSuccessfulV2", callback: onBooked }),
      );
    };
  }, []);

  return null;
}
