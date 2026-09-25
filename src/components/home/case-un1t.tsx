import Link from "next/link";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { home } from "@/content/home";

/**
 * ③ Proof, full screen, dark: the story on the left, the number on the
 * right. No product screens until UN1T clears them.
 */
export function CaseUn1t() {
  const c = home.un1t;
  const titleWords = wordCount(c.title);
  const after = titleWords * 40 + 500;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      data-tone="ink"
      threshold={0.3}
      className="relative overflow-hidden border-t border-line-dark bg-ink text-paper"
    >
      <Container className="relative grid min-h-[100svh] content-center gap-x-10 gap-y-16 py-28 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:self-center">
          <p className="fade flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-paper/50">
            <span>{c.label}</span>
            <span aria-hidden className="h-px w-8 bg-paper/30" />
            <span className="text-paper/80">UN1T</span>
          </p>
          <h2 className="display mt-8 text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={c.title} />
          </h2>
          <p
            className="fade mt-8 max-w-[46ch] text-lg leading-relaxed text-paper/70 md:text-xl"
            style={d(after)}
          >
            {c.story}
          </p>
          <ul
            className="fade mt-8 flex flex-wrap gap-2"
            style={d(after + 80)}
          >
            {c.meta.map((m) => (
              <li
                key={m}
                className="rounded-full border border-line-dark px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/65"
              >
                {m}
              </li>
            ))}
          </ul>
          <Link
            href={c.link.href}
            className="fade group mt-12 inline-flex items-center gap-3 text-lg font-semibold text-paper"
            style={d(after + 160)}
          >
            <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-paper">
              {c.link.label}
            </span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <OutlineStat
            value={c.stat.value}
            label={c.stat.label}
            delay={300}
            className="mx-auto max-w-[560px] lg:mr-0"
          />
          <p
            className="fade mx-auto mt-14 flex max-w-[560px] items-baseline gap-4 border-t border-line-dark pt-6 lg:mr-0"
            style={d(2500)}
          >
            <span className="display text-5xl text-paper">{c.side.value}</span>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-paper/60">
              {c.side.label}
            </span>
          </p>
        </div>
      </Container>
    </Stage>
  );
}
