"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

/**
 * Records the offer's two CTAs and the UN1T App Store link without each
 * button having to know about analytics: one delegated click listener.
 * "Work out my numbers" is any link to /franchise/numbers, "Book 30
 * minutes" is any franchise-call booking button, and the section is the
 * nearest section's id (or "unknown"). Renders nothing.
 */
export function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("a[href], [data-booking]");
      if (!el) return;
      const page = window.location.pathname;
      const section = el.closest("section")?.id || "unknown";
      const href = el.getAttribute("href") ?? "";

      if (href.includes("apps.apple.com")) {
        trackEvent("app_store_click", { page });
      } else if (href.startsWith("/franchise/numbers")) {
        trackEvent("cta_click", { cta: "numbers", section, page });
      } else if (el.dataset.booking === "franchiseCall") {
        trackEvent("cta_click", { cta: "book", section, page });
      }
    };
    // capture: CalProvider stops the booking click from propagating
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
