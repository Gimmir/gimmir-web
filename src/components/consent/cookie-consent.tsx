"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Clarity } from "@/components/analytics/clarity";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "gimmir-consent-v1";
/** Fired by the footer "Cookie settings" link to reopen the banner. */
export const CONSENT_REOPEN_EVENT = "gimmir:cookie-settings";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Cookie consent: Google Analytics and Microsoft Clarity load only after the
 * visitor accepts (Vercel Analytics is cookieless and stays on regardless).
 * The choice persists in localStorage; the footer link reopens the banner.
 */
export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  // "open" mounts the card, which then plays its entrance as a CSS
  // animation on mount (no second state flip that React could batch into
  // the same frame); "closing" plays the shorter exit before unmounting.
  const [phase, setPhase] = useState<"hidden" | "open" | "closing">("hidden");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Read the stored choice off the initial render pass (keeps the effect
    // purely a subscription; state updates happen in callbacks).
    const init = requestAnimationFrame(() => {
      const saved = readChoice();
      setChoice(saved);
      // Let the hero finish its entrance before the card slides in.
      if (!saved) timer = setTimeout(() => setPhase("open"), 1600);
    });

    const reopen = () => setPhase("open");
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => {
      cancelAnimationFrame(init);
      if (timer) clearTimeout(timer);
      window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
    };
  }, []);

  const decide = (value: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // storage unavailable: the banner will return next visit
    }
    setChoice(value);
    setPhase("closing");
    setTimeout(() => setPhase("hidden"), 240);
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <GoogleAnalytics />
          <Clarity />
        </>
      )}

      {phase !== "hidden" && (
        <aside
          aria-label="Cookie consent"
          data-state={phase}
          className="cookie-card fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[380px]"
        >
          <div className="relative overflow-hidden rounded-[24px] bg-ink p-5 text-paper shadow-[0_30px_70px_-30px_rgba(21,20,14,0.7)] ring-1 ring-paper/10 sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 size-52 rounded-full bg-lime/20 blur-[70px]"
            />
            <div className="relative">
              <p className="text-[15px] font-semibold">
                Cookies, only for analytics
              </p>
              <p className="mt-2 text-sm leading-relaxed text-paper/65">
                Google Analytics and Microsoft Clarity show us how the site is
                used. No marketing cookies, nothing sold.{" "}
                <Link
                  href="/privacy"
                  className="text-paper underline decoration-paper/40 underline-offset-4 transition-colors hover:decoration-paper"
                >
                  Privacy policy
                </Link>
              </p>
              <div className="mt-5 flex gap-2.5">
                <Button
                  variant="lime"
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={() => decide("granted")}
                >
                  Accept
                </Button>
                <Button
                  variant="outlineLight"
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={() => decide("denied")}
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
