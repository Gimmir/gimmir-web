"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

import { useFranchise } from "@/components/franchise/franchise-context";
import { PROCESS } from "@/content/franchise-page/process";
import { OFFER } from "@/content/offer";

const noop = () => () => {};

/** Today plus the build, on the visitor's own clock: "21 January 2027". */
const readyNow = () =>
  new Date(Date.now() + OFFER.readyWeeks * 7 * 86_400_000).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

/**
 * "Start this week: your app is out by 21 January 2027". The date is worked
 * out on the client (null on the server), so the HTML never states a stale
 * date; until then it says "in 12 weeks".
 */
export function ReadyLine() {
  const date = useSyncExternalStore(noop, readyNow, () => null);
  return (
    <>
      {PROCESS.plan.readyPrefix}{" "}
      {date === null ? (
        PROCESS.plan.readyFallback
      ) : (
        <>
          by <strong className="text-ink">{date}</strong>
        </>
      )}
    </>
  );
}

const AVATAR = "size-8 shrink-0 rounded-lg bg-line object-cover";

/**
 * The shared channel, drawn in code: "{brand} × Gimmir" with the visitor's
 * brand name and colour, and an example week from both founders.
 */
export function ChannelMock() {
  const { brand } = useFranchise();
  const c = PROCESS.channel;

  return (
    <figure className="m-0 grid h-full min-h-[320px] grid-cols-[112px_minmax(0,1fr)] overflow-hidden rounded-[24px] bg-surface ring-1 ring-line">
      <figcaption className="sr-only">
        Example of a shared channel: {brand.name} × Gimmir, a week of updates
        from {c.messages[0].name} and {c.messages[1].name}
      </figcaption>
      <div
        aria-hidden
        className="flex flex-col gap-2 bg-[#3F0E40] px-3 py-4 text-[13px] text-white"
      >
        <strong className="text-[13px] leading-[1.25] break-words">
          {brand.name} × Gimmir
        </strong>
        {c.list.map((ch) => (
          <span
            key={ch}
            className={
              ch === c.active ? "rounded-md bg-[#1164A3] px-1.5 py-[3px]" : "opacity-80"
            }
          >
            {ch}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-4 bg-surface p-4 text-sm leading-[1.45]">
        <div className="text-xs font-bold text-muted">{c.title}</div>
        {c.messages.map((m) => (
          <div key={m.name} className="flex gap-2.5">
            <Image src={m.photo} alt="" width={32} height={32} className={AVATAR} />
            <div className="min-w-0">
              <strong>{m.name}</strong>{" "}
              <span className="text-xs text-[#616061]">{m.time}</span>
              <div>{m.text}</div>
            </div>
          </div>
        ))}
        <div className="flex gap-2.5">
          <span
            aria-hidden
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: brand.color }}
          >
            {brand.initial}
          </span>
          <div className="min-w-0">
            <strong>{brand.name} HQ</strong>{" "}
            <span className="text-xs text-[#616061]">{c.visitor.time}</span>
            <div>{c.visitor.text}</div>
          </div>
        </div>
      </div>
    </figure>
  );
}
