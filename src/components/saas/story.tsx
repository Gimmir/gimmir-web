import Link from "next/link";

import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { saas } from "@/content/saas";

/**
 * /build-your-saas ②, how Jimmy Coach started, in three numbers drawn in
 * lime outline (the site's "12" hand): the coach's 250+ clients, the one
 * app Nazar paid for and co-owns, the 200+ coaches two months in, a
 * dashed line running through them. The full story is one link away.
 */
export function SaasStory() {
  const { label, title, items, link } = saas.story;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <h2 className="display mt-6 text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>

        <div className="relative mt-14 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-6">
          <svg
            aria-hidden
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="fade pointer-events-none absolute inset-x-0 -top-12 hidden h-10 w-full overflow-visible md:block"
            style={d(after + 500)}
          >
            <path
              d="M60 30C300 -10 520 50 700 20S1000 -10 1150 28"
              fill="none"
              stroke="var(--color-lime)"
              strokeWidth={1.4}
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {items.map((it, i) => (
            <div key={it.tag} className="fade" style={d(after + i * 140)}>
              <p
                aria-hidden
                className="display text-[clamp(5rem,3rem+6vw,9.5rem)] leading-[0.85] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.4px_var(--color-lime)]"
              >
                {it.value}
              </p>
              <p className="mt-5 max-w-[17ch] font-serif text-[clamp(1.3rem,1rem+0.8vw,1.75rem)] italic leading-[1.25]">
                <span className="sr-only">{it.value} </span>
                {it.line}
              </p>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.04em] text-paper/45">
                {it.tag}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={link.href}
          className="fade group mt-14 inline-flex items-center gap-3 text-lg font-semibold md:mt-16"
          style={d(after + 600)}
        >
          <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-lime group-hover:text-lime">
            {link.label}
          </span>
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Container>
    </Stage>
  );
}
