"use client";

import { useEffect, useRef, useState } from "react";

import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { about } from "@/content/about";
import { cn } from "@/lib/cn";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * /about ⑤, what we believe (Nazar's pick o3, 2026-09-30): the heading and
 * a big outline counter hold still on the left while the five beliefs
 * scroll past on the right; the one crossing the middle of the screen is
 * lit, the rest wait in grey, and the counter's last digit (lime) turns
 * over to its number. Phones and no-JS get the plain list, all lit.
 */
export function AboutBelieve() {
  const { title, items } = about.believe;
  const after = wordCount(title) * 40 + 300;
  const [active, setActive] = useState(0);
  // the grey only switches on once the observer runs: no JS, all lit
  const [live, setLive] = useState(false);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // a thin band across the middle of the viewport: whichever belief
    // crosses it is the one being read
    const io = new IntersectionObserver(
      (entries) => {
        setLive(true);
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = refs.current.indexOf(e.target as HTMLLIElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    for (const el of refs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = pad(active + 1);

  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          {/* the counter: "0" stays, the last digit turns over */}
          <div
            aria-hidden
            className="fade display mt-8 hidden text-[clamp(9rem,4rem+10vw,16rem)] leading-[0.8] tracking-[-0.05em] lg:flex"
            style={d(after)}
          >
            <span className="text-transparent [-webkit-text-stroke:2px_var(--color-ink)]">
              {n[0]}
            </span>
            <span className="overflow-x-visible overflow-y-clip pb-[0.06em]">
              <span
                key={n}
                className="inline-block animate-[stage-rise_600ms_var(--ease-out)_both] text-lime [-webkit-text-stroke:2px_var(--color-ink)] motion-reduce:animate-none"
              >
                {n[1]}
              </span>
            </span>
          </div>
          <p
            aria-hidden
            className="fade mt-4 hidden font-mono text-[12px] uppercase tracking-[0.04em] text-faint lg:block"
            style={d(after + 100)}
          >
            of {pad(items.length)}
          </p>
        </div>

        <ol className="lg:col-span-7">
          {items.map((it, i) => (
            <li
              key={it.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={cn(
                "border-t border-line py-8 transition-opacity duration-500 ease-[cubic-bezier(.23,1,.32,1)] first:border-t-0 first:pt-0 md:py-10 lg:first:pt-2",
                live && i !== active && "lg:opacity-30",
              )}
            >
              <div className="fade" style={d(after + i * 90)}>
                <span className="font-mono text-[12px] text-faint">
                  {pad(i + 1)}
                </span>
                <h3 className="display mt-3 text-[clamp(1.8rem,1rem+2vw,3rem)] leading-[1.05]">
                  {it.title}
                </h3>
                <p className="mt-4 max-w-[34ch] font-serif text-[clamp(1.2rem,1rem+0.5vw,1.45rem)] italic leading-snug text-muted">
                  {it.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Stage>
  );
}
