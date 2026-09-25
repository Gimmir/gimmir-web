import { Fragment } from "react";
import Image from "next/image";

import { HUGS_PREVIOUS, RiseWord, wordCount } from "@/components/motion/words";
import { cn } from "@/lib/cn";
import { FOUNDERS, type FounderId } from "@/lib/founders";

/** Products that can sit inside a sentence as their real app icons. */
const APPS = {
  un1t: { name: "UN1T", icon: "/design/un1t-logo.png" },
  jimmy: { name: "Jimmy Coach", icon: "/design/jimmy-coach-logo.png" },
} as const;
export type AppId = keyof typeof APPS;

/**
 * A headline written as a sentence with objects inside it: plain text,
 * founders' faces, real product icons, and one `mark`ed word that gets
 * the lime marker stroke (the one lime thing on the screen).
 */
export type HeadlineToken =
  | string
  | { faces: readonly FounderId[] }
  | { apps: readonly AppId[] }
  | { mark: string; after?: string };

/**
 * The marker stroke under a word: a filled, tapered swipe (so it can
 * stretch to any word without distorting a line width), wiped on left to
 * right once the words have risen.
 */
export function MarkerStroke({
  delay = 0,
  bottom = "-0.16em",
}: {
  delay?: number;
  /**
   * Offset of the swipe from the word box's bottom. The box grows with the
   * line height, so looser lines pass a smaller offset to keep the swipe
   * hugging the baseline (0.06em to 0.24em below it).
   */
  bottom?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 24"
      preserveAspectRatio="none"
      className="wipe pointer-events-none absolute -left-[0.04em] h-[0.32em] w-[calc(100%+0.1em)]"
      style={
        { bottom, "--d": `${delay}ms`, "--dur": "760ms" } as React.CSSProperties
      }
    >
      <path
        d="M2.5 17.8C38 10.4 104 7.2 197.2 9.6c1.5.1 1.6 2.4.1 2.6C112 14.8 50 17.6 4.4 22.4 1.4 22.7.2 18.5 2.5 17.8Z"
        fill="var(--color-lime)"
      />
    </svg>
  );
}

function Faces({ ids }: { ids: readonly FounderId[] }) {
  return (
    <span className="inline-flex h-[0.9em] -translate-y-[0.08em] items-center px-[0.06em] align-middle">
      <span className="sr-only">
        {ids.map((id) => FOUNDERS[id].first).join(" and ")}
      </span>
      {ids.map((id, n) => {
        const f = FOUNDERS[id];
        return (
          <span
            key={id}
            data-name={`${f.first} · ${f.title.split(",")[0]}`}
            className={cn(
              "face-tip relative inline-block size-[0.9em] rounded-full ring-[0.05em] ring-paper",
              n > 0 && "-ml-[0.22em]",
            )}
            style={{ zIndex: ids.length - n }}
          >
            <span className="absolute inset-0 overflow-hidden rounded-full bg-paper-2">
              <Image
                src={f.photo}
                alt=""
                fill
                loading="eager"
                sizes="140px"
                className="object-cover object-top"
              />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Real app icons, fanned slightly like cards on a table. */
function AppIcons({ ids }: { ids: readonly AppId[] }) {
  const tilt = ["-rotate-[6deg]", "rotate-[5deg]", "-rotate-[2deg]"];
  return (
    <span className="inline-flex h-[0.9em] -translate-y-[0.08em] items-center px-[0.08em] align-middle">
      <span className="sr-only">{ids.map((id) => APPS[id].name).join(" and ")}</span>
      {ids.map((id, n) => (
        <span
          key={id}
          data-name={APPS[id].name}
          className={cn(
            "face-tip relative inline-block size-[0.8em] rounded-[0.2em] shadow-[0_0.06em_0.18em_-0.06em_rgba(21,20,14,0.45)] ring-[0.04em] ring-paper",
            tilt[n % tilt.length],
            n > 0 && "-ml-[0.16em]",
          )}
          style={{ zIndex: ids.length - n }}
        >
          <span className="absolute inset-0 overflow-hidden rounded-[0.2em]">
            <Image
              src={APPS[id].icon}
              alt=""
              fill
              loading="eager"
              sizes="120px"
              className="object-cover"
            />
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Renders the tokens as rising words for a <Stage>. Returns the sentence
 * inline, so the caller picks the heading tag and size.
 */
export function InlineHeadline({
  tokens,
  start = 0,
}: {
  tokens: readonly HeadlineToken[];
  start?: number;
}) {
  let i = start;
  const total =
    start +
    tokens.reduce<number>(
      (n, t) =>
        n +
        (typeof t === "string"
          ? wordCount(t)
          : "mark" in t
            ? wordCount(t.mark)
            : 1),
      0,
    );
  // the marker lands just after the last word has settled
  const markDelay = total * 40 + 420;

  return (
    <>
      {tokens.map((t, n) => {
        const space =
          n === 0 || (typeof t === "string" && HUGS_PREVIOUS.test(t))
            ? null
            : " ";

        if (typeof t === "string") {
          const words = t.split(/\s+/).filter(Boolean);
          return (
            <Fragment key={n}>
              {space}
              {words.map((w, k) => (
                <Fragment key={k}>
                  {k > 0 ? " " : null}
                  <RiseWord i={i++}>{w}</RiseWord>
                </Fragment>
              ))}
            </Fragment>
          );
        }

        if ("mark" in t) {
          const words = t.mark.split(/\s+/).filter(Boolean);
          return (
            <Fragment key={n}>
              {space}
              {/* the marked words and any punctuation after them never part */}
              <span className="whitespace-nowrap">
                <span className="relative inline-block">
                  {words.map((w, k) => (
                    <Fragment key={k}>
                      {k > 0 ? " " : null}
                      <RiseWord i={i++}>{w}</RiseWord>
                    </Fragment>
                  ))}
                  <MarkerStroke delay={markDelay} bottom="-0.08em" />
                </span>
                {t.after ? <RiseWord i={i - 1}>{t.after}</RiseWord> : null}
              </span>
            </Fragment>
          );
        }

        return (
          <Fragment key={n}>
            {space}
            <RiseWord i={i++}>
              {"faces" in t ? <Faces ids={t.faces} /> : <AppIcons ids={t.apps} />}
            </RiseWord>
          </Fragment>
        );
      })}
    </>
  );
}
