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
  // null = deciding whether to show; the banner enters via a CSS transition
  // armed one frame after mount ("open" flips a data attribute).
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Read the stored choice off the initial render pass (keeps the effect
    // purely a subscription; state updates happen in callbacks).
    const init = requestAnimationFrame(() => {
      const saved = readChoice();
      setChoice(saved);
      if (!saved) {
        // Let the hero entrance finish before the banner slides in.
        timer = setTimeout(() => {
          setVisible(true);
          raf = requestAnimationFrame(() => setOpen(true));
        }, 1200);
      }
    });

    const reopen = () => {
      setVisible(true);
      raf = requestAnimationFrame(() => setOpen(true));
    };
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => {
      cancelAnimationFrame(init);
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
    };
  }, []);

  const decide = (value: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // storage unavailable — the banner will return next visit
    }
    setChoice(value);
    setOpen(false); // slide out…
    setTimeout(() => setVisible(false), 240); // …then unmount
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <GoogleAnalytics />
          <Clarity />
        </>
      )}

      {visible && (
        <aside
          aria-label="Cookie consent"
          data-open={open || undefined}
          className="fixed bottom-4 left-4 right-4 z-[70] translate-y-4 opacity-0 transition-[transform,opacity] duration-[360ms] ease-[cubic-bezier(.23,1,.32,1)] data-open:translate-y-0 data-open:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-[opacity] sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-sm"
        >
          <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-paper shadow-[0_24px_60px_-24px_rgba(21,20,14,0.55)]">
            {/* atmosphere, echoing the CTA panels */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(246,244,238,0.05)_1px,transparent_1.5px)] [background-size:22px_22px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 size-44 rounded-full bg-lime/25 blur-[70px]"
            />

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-widest text-lime">
                Cookies
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#c9c6bc]">
                We use analytics cookies (Google Analytics, Microsoft Clarity)
                to understand how the site is used. No marketing cookies,
                nothing sold.{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-paper underline underline-offset-4 transition-colors hover:text-lime"
                >
                  Privacy policy
                </Link>
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Button
                  variant="lime"
                  size="sm"
                  onClick={() => decide("granted")}
                >
                  Accept
                </Button>
                <Button
                  variant="outlineLight"
                  size="sm"
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
