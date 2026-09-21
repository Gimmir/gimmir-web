"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

import { BOOKINGS, type BookingId } from "@/lib/booking";
import { CAL_UI } from "@/lib/cal";

/**
 * One inline Cal.com embed, on its own namespace (never the global
 * `founder-review` popup namespace `<CalProvider>` owns). A dedicated
 * namespace per embed keeps each booker's config and lifecycle independent.
 * Mounted only while its tab is active, so the two calls never both load an
 * iframe.
 */
export function CalEmbed({
  booking,
  namespace,
}: {
  booking: BookingId;
  namespace: string;
}) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace });
      cal("ui", CAL_UI);
    })();
  }, [namespace]);

  return (
    <div className="h-[520px] w-full overflow-hidden rounded-2xl border border-line bg-surface sm:h-[640px]">
      <Cal
        namespace={namespace}
        calLink={BOOKINGS[booking].calLink}
        config={{ layout: "month_view", theme: "light" }}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
      />
    </div>
  );
}
