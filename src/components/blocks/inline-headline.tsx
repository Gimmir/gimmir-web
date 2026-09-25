import { Fragment } from "react";
import Image from "next/image";

import { HUGS_PREVIOUS, RiseWord, wordCount } from "@/components/motion/words";
import { cn } from "@/lib/cn";
import { FOUNDERS, type FounderId } from "@/lib/founders";

export type InlineIcon = "app" | "pulse";

/**
 * A headline written as a sentence with objects inside it: plain text,
 * founders' faces, small icon tiles, and one `mark`ed word that gets the
 * lime marker stroke (the one lime thing on the screen).
 */
export type HeadlineToken =
  | string
  | { faces: readonly FounderId[] }
  | { icon: InlineIcon }
  | { mark: string; after?: string };

/**
 * The marker stroke under a word: a filled, tapered swipe (so it can
 * stretch to any word without distorting a line width), wiped on left to
 * right once the words have risen.
 */
export function MarkerStroke({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 24"
      preserveAspectRatio="none"
      className="wipe pointer-events-none absolute -bottom-[0.16em] -left-[0.04em] h-[0.32em] w-[calc(100%+0.1em)]"
      style={{ "--d": `${delay}ms`, "--dur": "760ms" } as React.CSSProperties}
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
    <span className="inline-flex h-[0.84em] translate-y-[0.04em] items-center px-[0.06em] align-middle">
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
              "face-tip relative inline-block size-[0.84em] rounded-full ring-[0.05em] ring-paper",
              n > 0 && "-ml-[0.2em]",
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

function IconTile({ name }: { name: InlineIcon }) {
  return (
    <span
      aria-hidden
      className="inline-flex size-[0.8em] translate-y-[0.02em] items-center justify-center rounded-[0.2em] bg-ink align-middle text-paper"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[0.46em]"
      >
        {name === "app" ? (
          <>
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <path d="M3 9h18M7.5 13.5h4M7.5 16.5h7" />
          </>
        ) : (
          <path d="M2.5 12.5h4l2.2-5.5 4.3 11 2.6-7h5.9" />
        )}
      </svg>
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
                  <MarkerStroke delay={markDelay} />
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
              {"faces" in t ? <Faces ids={t.faces} /> : <IconTile name={t.icon} />}
            </RiseWord>
          </Fragment>
        );
      })}
    </>
  );
}
