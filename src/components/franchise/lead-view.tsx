"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

/**
 * One "landing_view" when someone opens the landing version, so visits by
 * source (?source=linkedin) can be counted beside the calls they book.
 * The source itself rides on the event (see lib/lead-source.ts).
 */
export function LeadView() {
  useEffect(() => {
    // Vercel Analytics mounts after the page and drops events sent before
    // it exists, so wait for it (up to 5s), then send once
    let tries = 0;
    const t = window.setInterval(() => {
      const ready =
        typeof (window as unknown as { va?: unknown }).va === "function";
      if (ready || ++tries >= 50) {
        window.clearInterval(t);
        trackEvent("landing_view", { page: window.location.pathname });
      }
    }, 100);
    return () => window.clearInterval(t);
  }, []);
  return null;
}
