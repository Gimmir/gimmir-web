"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

import { useFranchise } from "@/components/franchise/franchise-context";
import {
  daysLeftText,
  useDaysLeft,
} from "@/components/franchise/urgency-bar";
import { PROCESS } from "@/content/franchise-page/process";
import { OFFER } from "@/content/offer";
import { FOUNDERS } from "@/lib/founders";

const noop = () => () => {};

/** "21 January 2027": today plus the build, on the visitor's own clock. */
function readyDate(): string {
  const t = new Date();
  t.setDate(t.getDate() + OFFER.readyWeeks * 7);
  return t.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * The date the app is ready if they start this week. Worked out on the
 * client (null on the server), so the HTML never states a stale date.
 */
export function ReadyDate() {
  const date = useSyncExternalStore(noop, readyDate, () => null);
  return <>{date ?? PROCESS.ready.fallback}</>;
}

/** "12 days left" for the bridge to the offer; nothing until the client knows. */
export function DaysLeftMark() {
  const days = useDaysLeft();
  if (days === null) return null;
  return (
    <>
      {" "}
      <span className="bg-[linear-gradient(transparent_58%,var(--color-lime)_58%,var(--color-lime)_92%,transparent_92%)] px-0.5">
        {daysLeftText(days)}.
      </span>
    </>
  );
}

/**
 * The shared channel, drawn in code: "{brand} × Gimmir" with the visitor's
 * brand name, and an example of the weekly update from both founders.
 */
export function ChannelMock({ delay = 0 }: { delay?: number }) {
  const { brand } = useFranchise();
  const c = PROCESS.channel;

  return (
    <figure
      className="fade m-0 grid grid-cols-[124px_minmax(0,1fr)] overflow-hidden rounded-[24px] bg-surface ring-1 ring-line"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <figcaption className="sr-only">
        Example of a shared channel: {brand.name} × Gimmir, weekly update from{" "}
        {FOUNDERS.oleh.name} and {FOUNDERS.nazar.name}
      </figcaption>
      <div
        aria-hidden
        className="flex flex-col gap-2 bg-[#3F0E40] px-3 py-4 text-[13px] text-white"
      >
        <strong className="text-sm break-words">{brand.name} × Gimmir</strong>
        {c.list.map((ch) => (
          <span
            key={ch}
            className={
              ch === "# build"
                ? "rounded-md bg-[#1164A3] px-1.5 py-[3px]"
                : "opacity-80"
            }
          >
            {ch}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-3.5 p-4 text-sm leading-[1.45]">
        <div className="text-xs font-bold text-muted">{c.title}</div>
        {c.messages.map((m) => {
          const f = FOUNDERS[m.who];
          return (
            <div key={m.who} className="flex gap-2.5">
              <Image
                src={f.photo}
                alt=""
                width={34}
                height={34}
                className="size-[34px] shrink-0 rounded-lg object-cover"
              />
              <div>
                <strong>{f.name}</strong>{" "}
                <span className="text-xs text-[#6b6b6b]">{m.time}</span>
                <div>{m.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
