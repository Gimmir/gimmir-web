"use client";

import { useId, useState } from "react";

import { FEATURE_GROUPS, FEATURE_TOTAL } from "@/content/franchise-page/flow";
import { cn } from "@/lib/cn";

import { TONE_DOT } from "./actor";

/**
 * "See all 42, by area": the whole list, six groups, opening under the
 * button. Closed it is `visibility: hidden`, so nothing in it can be
 * tabbed to; the height opens as a grid track (the site's accordion
 * pattern), and not at all for reduced motion.
 */
export function FullList() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full bg-transparent px-6 text-base font-semibold text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-paper-2 active:scale-[0.97]"
      >
        {open ? "Hide the full list" : `See all ${FEATURE_TOTAL}, by area`}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn(
            "size-4 transition-transform duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
            open && "rotate-180",
          )}
        >
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={panelId}
        className={cn(
          "grid w-full motion-reduce:transition-none",
          open
            ? "grid-rows-[1fr] opacity-100 visible [transition:grid-template-rows_550ms_var(--ease-out),opacity_350ms_ease,visibility_0s_linear_0s]"
            : "grid-rows-[0fr] opacity-0 invisible [transition:grid-template-rows_550ms_var(--ease-out),opacity_350ms_ease,visibility_0s_linear_550ms]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-x-8 gap-y-9 rounded-[28px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-10 md:grid-cols-2 lg:grid-cols-3">
            {FEATURE_GROUPS.map((g) => (
              <section key={g.id} aria-labelledby={`${panelId}-${g.id}`}>
                <h4
                  id={`${panelId}-${g.id}`}
                  className="m-0 flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.06em] text-muted uppercase"
                >
                  <span
                    aria-hidden
                    className={cn("size-2.5 shrink-0 rounded-full", TONE_DOT[g.tone])}
                  />
                  {g.title}
                </h4>
                <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                  {g.items.map((item) => (
                    <li key={item} className="text-[15px] leading-[1.4]">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
