import { Fragment } from "react";

/** Punctuation that hugs the token before it instead of following a space. */
export const HUGS_PREVIOUS = /^[,.;:!?)]/;

/**
 * One rising word (or inline object) for a <Stage>: an inline-block that
 * clips its own line box, with the content sliding up from below it. `i`
 * is the word's place in the sequence (40ms apart).
 */
export function RiseWord({
  i,
  children,
  className,
}: {
  i: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={className ? `rw ${className}` : "rw"}>
      <span className="rwi" style={{ "--i": i } as React.CSSProperties}>
        {children}
      </span>
    </span>
  );
}

/**
 * Text split into rising words, numbered from `start`. Spaces stay real
 * text between the words, so the line still wraps (and balances) naturally.
 */
export function RiseText({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((w, n) => (
        <Fragment key={n}>
          {n > 0 ? " " : null}
          <RiseWord i={start + n}>{w}</RiseWord>
        </Fragment>
      ))}
    </>
  );
}

export const wordCount = (text: string) =>
  text.split(/\s+/).filter(Boolean).length;
