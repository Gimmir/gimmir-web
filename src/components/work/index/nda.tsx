import Link from "next/link";

import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { work } from "@/content/work";

/**
 * /work ③, `#nda`: the seven we can't show, as text on ink, each under
 * its number drawn in lime outline with the site's thin curve (the hand
 * of the "12" and the "9"), grouped the way doc 09 asks. Next to the one Enterprise card: the honesty note in serif and
 * the way to hear more. Then GAMMA5, the site we also built, in one line.
 */
export function WorkNda() {
  const { id, title, groups, note, cta } = work.nda;
  const { also } = work;
  const [first, second] = title;
  const after = (wordCount(first) + wordCount(second)) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  // cards settle in reading order across the groups
  const first0 = groups.map((_, gi) =>
    groups.slice(0, gi).reduce((sum, g) => sum + g.items.length, 0),
  );
  const n = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <Stage
      as="section"
      id={id}
      data-tone="ink"
      className="scroll-mt-20 bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <span className="block">
            <RiseText text={first} />
          </span>
          <span className="block">
            <RiseText text={second} start={wordCount(first)} />
          </span>
        </h2>

        <div className="mt-12 grid items-start gap-x-3.5 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, gi) => (
            <div key={g.name} className="flex flex-col gap-3.5">
              <p
                className="fade flex items-baseline justify-between border-t border-line-dark pt-3 font-mono text-[12px] uppercase tracking-[0.04em] text-paper/55"
                style={d(after + gi * 80)}
              >
                <span>{g.name}</span>
                <span className="text-lime">{g.items.length}</span>
              </p>
              {g.items.map((it, k) => {
                const at = after + 120 + (first0[gi] + k) * 70;
                return (
                  <article
                    key={it.label}
                    className="fade overflow-hidden rounded-[22px] bg-ink-soft ring-1 ring-line-dark"
                    style={d(at)}
                  >
                    <div
                      aria-hidden
                      className="flex h-[108px] items-start justify-between px-5 pt-4 md:h-[120px]"
                    >
                      <span className="display text-[4.5rem] leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.2px_var(--color-lime)] md:text-[5.25rem]">
                        {String(first0[gi] + k + 1).padStart(2, "0")}
                      </span>
                      <svg
                        viewBox="0 0 90 70"
                        className="mt-3 h-[62px] w-[80px] overflow-visible"
                        style={
                          {
                            "--d": `${at + 200}ms`,
                            "--dur": "700ms",
                          } as React.CSSProperties
                        }
                      >
                        <path
                          d="M4 8C60 8 70 40 84 62"
                          pathLength={1}
                          fill="none"
                          stroke="var(--color-lime)"
                          strokeWidth={1.4}
                          strokeLinecap="round"
                          className="draw"
                        />
                        <circle
                          cx="84"
                          cy="62"
                          r="3.5"
                          fill="var(--color-lime)"
                          className="fade"
                          style={
                            { "--d": `${at + 800}ms` } as React.CSSProperties
                          }
                        />
                      </svg>
                    </div>
                    <div className="px-5 pb-6 pt-4">
                      <h3 className="font-mono text-[12px] uppercase tracking-[0.04em] text-paper/50">
                        {it.label}
                        {"region" in it && it.region ? ` · ${it.region}` : ""}
                      </h3>
                      <p className="mt-2.5 text-[15.5px] leading-relaxed text-paper/85">
                        {it.text}
                      </p>
                    </div>
                  </article>
                );
              })}
              {gi === groups.length - 1 && (
                <div
                  className="fade flex min-h-[210px] flex-col justify-between gap-6 rounded-[22px] border-[1.5px] border-dashed border-lime/45 p-6"
                  style={d(after + 120 + n * 70)}
                >
                  <p className="font-serif text-[22px] italic leading-snug">
                    {note}
                  </p>
                  <Link
                    href={cta.href}
                    className="group inline-flex w-fit items-center gap-3 rounded-full bg-paper py-1.5 pl-5 pr-1.5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-lime active:scale-[0.97]"
                  >
                    {cta.label}
                    <span className="flex size-9 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <p
          className="fade mt-16 border-t border-line-dark pt-6 text-[15px] text-paper/60 md:mt-20"
          style={d(after + 200 + n * 70)}
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-paper/45">
            {also.label}
          </span>
          <span className="mx-3 text-paper/25">·</span>
          <a
            href={also.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-paper transition-colors hover:text-lime"
          >
            {also.text}
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </p>
      </Container>
    </Stage>
  );
}
