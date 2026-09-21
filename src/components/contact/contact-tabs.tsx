"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";

import { CalEmbed } from "@/components/contact/cal-embed";
import { cn } from "@/lib/cn";
import { BOOKINGS, type BookingId } from "@/lib/booking";
import { FOUNDERS, hostNames } from "@/lib/founders";

type TabId = "operators" | "founders";

const TAB_ORDER: TabId[] = ["operators", "founders"];
const DEFAULT_TAB: TabId = "operators";

const TABS: Record<
  TabId,
  {
    bookingId: BookingId;
    /** Cal namespace for this tab's inline embed, distinct from the global
     * popup namespace ("founder-review") the header/CalProvider use. */
    namespace: string;
    cardTitle: string;
    heading: string;
    body: string;
  }
> = {
  operators: {
    bookingId: "costCheck",
    namespace: "contact-cost-check",
    cardTitle: "I run a fitness business",
    heading: "Platform cost check",
    body: "For operators and franchisors with 8+ locations. Bring your last platform invoice and processing statement. You leave with a rough annual number and an honest view on whether owning your platform pays off.",
  },
  founders: {
    bookingId: "founderReview",
    namespace: "contact-founder-review",
    cardTitle: "I’m building a fitness or health product",
    heading: "Founder review call",
    body: "For funded fitness and health founders. A CTO-level first look at your product, code or plan, with straight answers on what holds up and what to fix first.",
  },
};

function isTabId(value: string): value is TabId {
  return value === "operators" || value === "founders";
}

/**
 * The booking hub: two tabs (one per audience/call), each opening onto its
 * own lazily-mounted inline Cal.com embed. The active tab is mirrored in the
 * URL hash so `/contact#founders` deep-links straight to the right call.
 */
export function ContactTabs() {
  const uid = useId();
  const [active, setActive] = useState<TabId>(DEFAULT_TAB);
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isTabId(hash)) setActive(hash);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  /** Switch tabs and keep the URL hash in sync, without a scroll jump. */
  const activate = useCallback((id: TabId) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const handleTabClick = (id: TabId) => {
    activate(id);
    track("contact_tab_select", { tab: id });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    ) {
      return;
    }
    event.preventDefault();
    const dir = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = TAB_ORDER[(index + dir + TAB_ORDER.length) % TAB_ORDER.length];
    activate(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a call"
        className="grid grid-cols-2 gap-3 sm:gap-4"
      >
        {TAB_ORDER.map((id, index) => {
          const tab = TABS[id];
          const booking = BOOKINGS[tab.bookingId];
          const isActive = active === id;
          return (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[id] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${id}`}
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "group flex flex-col justify-between gap-3 rounded-2xl border p-5 text-left transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[.98] sm:p-7",
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-surface text-ink hover:border-ink",
              )}
            >
              <span className="text-[15px] font-bold leading-snug tracking-tight sm:text-xl">
                {tab.cardTitle}
              </span>
              <span
                className={cn(
                  "text-[13px] leading-snug sm:text-base",
                  isActive ? "text-paper/65" : "text-muted",
                )}
              >
                {tab.heading} &middot; {booking.minutes} min &middot; with{" "}
                {hostNames(booking.hosts)}
              </span>
            </button>
          );
        })}
      </div>

      {TAB_ORDER.map((id) => {
        const tab = TABS[id];
        const booking = BOOKINGS[tab.bookingId];
        const isActive = active === id;
        return (
          <div
            key={id}
            role="tabpanel"
            id={`${uid}-panel-${id}`}
            aria-labelledby={`${uid}-tab-${id}`}
            hidden={!isActive}
            className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12 md:mt-10"
          >
            <div>
              <h2 className="display text-2xl sm:text-3xl">{tab.heading}</h2>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">
                {tab.body}
              </p>
              <div className="mt-7 flex flex-col gap-4">
                {booking.hosts.map((hostId) => {
                  const founder = FOUNDERS[hostId];
                  return (
                    <div key={hostId} className="flex items-center gap-3">
                      <Image
                        src={founder.photo}
                        alt={founder.name}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-full object-cover object-top"
                      />
                      <div className="text-sm leading-tight">
                        <div className="font-semibold text-ink">
                          {founder.name}
                        </div>
                        <div className="text-muted">{founder.role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {isActive ? (
              <CalEmbed booking={tab.bookingId} namespace={tab.namespace} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
