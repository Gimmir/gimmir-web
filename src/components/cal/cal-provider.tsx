"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

import type { BookingId } from "@/lib/booking";
import { recordBooking } from "@/lib/booking-analytics";
import { CAL_NAMESPACE, CAL_UI } from "@/lib/cal";

/**
 * Loads the Cal.com embed once and applies the namespace UI config. Renders
 * nothing: the triggers are any elements carrying the Cal data attributes
 * (see <Button cal>), which Cal wires up via event delegation. It also
 * records completed popup bookings, attributed to the last booking button
 * clicked (its `data-booking`).
 */
export function CalProvider() {
  useEffect(() => {
    let lastBooking: BookingId | "unknown" = "unknown";
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-booking]",
      );
      if (trigger?.dataset.booking) {
        lastBooking = trigger.dataset.booking as BookingId;
      }
    };
    const onBooked = () => recordBooking(lastBooking, "popup");

    document.addEventListener("click", onClick, true);
    const calReady = getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
      cal("ui", CAL_UI);
      cal("on", { action: "bookingSuccessfulV2", callback: onBooked });
      return cal;
    });

    return () => {
      document.removeEventListener("click", onClick, true);
      calReady.then((cal) =>
        cal("off", { action: "bookingSuccessfulV2", callback: onBooked }),
      );
    };
  }, []);

  return null;
}
