"use client";

import { CONSENT_REOPEN_EVENT } from "./cookie-consent";

/** Footer link that reopens the cookie banner so the choice can be changed. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
      className="transition-colors hover:text-ink"
    >
      Cookie settings
    </button>
  );
}
