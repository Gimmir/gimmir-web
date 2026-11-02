"use client";

import { useEffect, useRef, useState } from "react";

import { FLOW, FLOW_INTRO } from "@/content/franchise-page/flow";
import { cn } from "@/lib/cn";

import { ACTOR_FILL } from "./actor";
import { FLOW_SCREENS } from "./screens";

const LAST = FLOW.length - 1;
const PANEL_ID = "flow-panel";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** A part of the panel settling in when its stage mounts (CSS transition from @starting-style). */
const ENTER =
  "transition-[opacity,translate] duration-[260ms] ease-[var(--ease-out)] starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none";
const delay = (ms: number) => ({ transitionDelay: `${ms}ms` });

const ICON_BTN =
  "inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[background-color,color,transform,opacity] duration-150 ease-[var(--ease-out)] active:scale-[0.97] enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-35 motion-reduce:transition-none";

const PRIMARY_BTN =
  "group inline-flex h-[52px] items-center gap-3 rounded-full bg-ink pr-2 pl-6 text-[15px] font-semibold text-paper no-underline transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] hover:bg-ink-soft motion-reduce:transition-none";

function Arrow({ dir = "right" }: { dir?: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={dir === "right" ? "M3 8h10M9 4l4 4-4 4" : "M13 8H3M7 4L3 8l4 4"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TickDot() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
      <circle cx="9" cy="9" r="9" fill="var(--color-ink)" />
      <path
        d="M5 9.2l2.6 2.6L13 6.6"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDisc() {
  return (
    <span className="inline-flex size-9 items-center justify-center rounded-full bg-lime text-ink">
      <span className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none">
        <Arrow />
      </span>
    </span>
  );
}

/**
 * The explorer: a tablist of the six stages over one white panel (copy on
 * the left, the stage's illustrated screen on the right). Tabs follow the
 * WAI-ARIA pattern (roving tabindex, arrows/Home/End select as they move).
 * The six screens stay mounted and cross-fade; the copy remounts per stage
 * so its parts settle in one after another.
 */
export function FlowExplorer() {
  const [at, setAt] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const s = FLOW[at];

  // Keep the active tab in view in the mobile strip.
  useEffect(() => {
    const sc = scroller.current;
    const tab = tabs.current[at];
    if (!sc || !tab || sc.scrollWidth <= sc.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sc.scrollTo({
      left: tab.offsetLeft - (sc.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [at]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const to =
      e.key === "ArrowRight"
        ? (at + 1) % FLOW.length
        : e.key === "ArrowLeft"
          ? (at + LAST) % FLOW.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? LAST
              : null;
    if (to === null) return;
    e.preventDefault();
    setAt(to);
    tabs.current[to]?.focus();
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className="fade flex flex-wrap items-center justify-between gap-3"
        style={d(500)}
      >
        <p className="m-0 flex items-center gap-2 text-sm font-semibold">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9 11V5a2 2 0 0 1 4 0v5" />
            <path d="M13 10V8a2 2 0 0 1 4 0v3" />
            <path d="M17 11a2 2 0 0 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3l-2.6-4.3a1.8 1.8 0 0 1 3-2L9 14" />
          </svg>
          {FLOW_INTRO.hint}
        </p>
        <div className="flex items-center gap-2">
          <span className="mr-1 text-sm text-muted" aria-hidden>
            Stage {at + 1} of {FLOW.length}
          </span>
          <button
            type="button"
            className={ICON_BTN}
            aria-label={`Previous stage${at > 0 ? `: ${FLOW[at - 1].short}` : ""}`}
            disabled={at === 0}
            onClick={() => setAt(at - 1)}
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            className={ICON_BTN}
            aria-label={`Next stage${at < LAST ? `: ${FLOW[at + 1].short}` : ""}`}
            disabled={at === LAST}
            onClick={() => setAt(at + 1)}
          >
            <Arrow />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="fade snap-x snap-mandatory overflow-x-auto rounded-[16px] bg-paper-2 shadow-[inset_0_0_0_1px_var(--color-line)] [scrollbar-width:none] min-[901px]:overflow-visible [&::-webkit-scrollbar]:hidden"
        style={d(580)}
      >
        <div
          role="tablist"
          aria-label="Stages of the flow"
          onKeyDown={onKeyDown}
          className="relative flex w-max gap-1 p-1 min-[901px]:grid min-[901px]:w-full min-[901px]:grid-cols-6"
        >
          <span
            aria-hidden
            className="absolute top-1 bottom-1 left-1 w-[148px] rounded-[12px] bg-surface shadow-[0_1px_2px_rgba(21,20,14,0.08),0_6px_16px_-10px_rgba(21,20,14,0.35)] transition-transform duration-[250ms] ease-[var(--ease-out)] motion-reduce:transition-none min-[901px]:w-[calc((100%-28px)/6)]"
            style={{ transform: `translateX(calc(${at} * (100% + 4px)))` }}
          />
          {FLOW.map((t, i) => {
            const on = i === at;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${t.id}-tab`}
                aria-selected={on}
                aria-controls={PANEL_ID}
                tabIndex={on ? 0 : -1}
                onClick={() => setAt(i)}
                className="relative z-10 flex min-h-14 w-[148px] shrink-0 snap-center items-center gap-2.5 rounded-[12px] border-0 bg-transparent px-2.5 py-2 text-left text-ink transition-[background-color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97] not-aria-selected:hover:bg-surface/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none min-[901px]:w-auto"
              >
                <span
                  className={cn(
                    "inline-flex size-[30px] shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                    ACTOR_FILL[t.actor],
                  )}
                >
                  {t.num}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span
                    className={cn(
                      "text-sm leading-tight font-bold transition-colors duration-150",
                      on ? "text-ink" : "text-ink/75",
                    )}
                  >
                    {t.short}
                  </span>
                  <span className="text-xs leading-tight text-muted">{t.who}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={`${s.id}-tab`}
        className="fade grid gap-[clamp(20px,3vw,40px)] rounded-[24px] bg-surface p-[clamp(18px,2.6vw,32px)] shadow-[inset_0_0_0_1px_var(--color-line),0_30px_60px_-44px_rgba(21,20,14,0.35)] min-[901px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
        style={d(660)}
      >
        <div className="flex min-w-0 flex-col gap-[18px]">
          <div key={s.id} className="flex flex-col gap-[18px]">
            <span
              className={cn(
                ENTER,
                "inline-flex h-7 items-center self-start rounded-full px-3 text-[13px] font-bold",
                ACTOR_FILL[s.actor],
              )}
            >
              {s.who}
            </span>
            <h3
              className={cn(ENTER, "display m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.05]")}
              style={delay(30)}
            >
              {s.title}
            </h3>
            <p
              className={cn(ENTER, "m-0 -mt-2 text-[17px] leading-[1.5] text-muted")}
              style={delay(60)}
            >
              {s.desc}
            </p>
            <p
              className={cn(
                ENTER,
                "m-0 inline-flex items-center gap-2 self-start rounded-[12px] bg-lime px-3 py-2 text-sm font-bold",
              )}
              style={delay(90)}
            >
              <TickDot />
              {s.highlight}
            </p>
            <ol className="m-0 grid list-none gap-x-6 gap-y-4 border-t border-line p-0 pt-5 min-[640px]:grid-cols-2">
              {s.steps.map((it, i) => (
                <li
                  key={it.n}
                  className={cn(ENTER, "flex items-start gap-3")}
                  style={delay(120 + i * 40)}
                >
                  <span
                    className={cn(
                      "inline-flex h-[30px] min-w-10 shrink-0 items-center justify-center rounded-[10px] px-2 text-[13px] font-extrabold",
                      ACTOR_FILL[s.actor],
                    )}
                  >
                    {it.n}
                  </span>
                  <div className="min-w-0">
                    <div className="text-base leading-[1.3] font-bold">{it.title}</div>
                    <div className="mt-[3px] text-sm leading-[1.5] text-muted">
                      {it.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-auto pt-2">
            {at < LAST ? (
              <button
                type="button"
                className={PRIMARY_BTN}
                onClick={() => setAt(at + 1)}
              >
                Next: {FLOW[at + 1].short}
                <ArrowDisc />
              </button>
            ) : (
              <a href="#book" className={PRIMARY_BTN}>
                Book 30 minutes
                <ArrowDisc />
              </a>
            )}
          </div>
        </div>

        <div
          aria-hidden
          className="grid min-h-[300px] overflow-hidden rounded-[20px] bg-paper-2 shadow-[inset_0_0_0_1px_var(--color-line)] min-[901px]:self-stretch"
        >
          {FLOW_SCREENS.map((Screen, i) => (
            <div
              key={FLOW[i].id}
              data-on={i === at}
              className="invisible col-start-1 row-start-1 flex translate-y-2 items-center justify-center p-3 opacity-0 blur-[2px] transition-[opacity,translate,filter,visibility] duration-[240ms] ease-[var(--ease-out)] data-[on=true]:visible data-[on=true]:translate-y-0 data-[on=true]:opacity-100 data-[on=true]:blur-none motion-reduce:transition-none sm:p-5"
            >
              <Screen />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
