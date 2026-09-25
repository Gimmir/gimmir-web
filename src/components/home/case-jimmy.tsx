import Image from "next/image";
import Link from "next/link";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { GRAIN } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { home } from "@/content/home";
import { FOUNDERS } from "@/lib/founders";

/**
 * ④ Proof, on paper, after UN1T on ink: the title across the page, one
 * sentence a line; below it the number drawn in ink with its margin note
 * (the same hand as UN1T's "12" and the manifesto's key), and beside it
 * how it started, in Nazar's words, in serif.
 */
export function CaseJimmy() {
  const c = home.jimmy;
  const by = FOUNDERS[c.quote.by];
  const [first, second] = c.title;
  const firstWords = wordCount(first);
  const after = (firstWords + wordCount(second)) * 40 + 500;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="paper" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            GRAIN,
            "radial-gradient(ellipse 44% 50% at 28% 72%, rgba(201,242,61,0.16) 0%, rgba(201,242,61,0.06) 50%, rgba(201,242,61,0) 78%)",
          ].join(", "),
          backgroundSize: "180px 180px, 100% 100%",
        }}
      />
      <Container className="relative py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-faint">
          {c.label} · <span className="text-ink/85">{c.name}</span>
        </p>
        <h2 className="display mt-8 text-[length:var(--text-title)] leading-[1.02]">
          <span className="block">
            <RiseText text={first} />
          </span>
          <span className="block">
            <RiseText text={second} start={firstWords} />
          </span>
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <OutlineStat
              value={c.stat.value}
              label={c.stat.label}
              tone="paper"
              layout="wide"
              delay={300}
            />
            <p
              className="fade mt-12 flex items-baseline gap-4 border-t border-line pt-6"
              style={d(2500)}
            >
              <span className="display text-5xl">{c.side.value}</span>
              <span className="text-[15px] text-muted">{c.side.label}</span>
            </p>
          </div>

          <div className="lg:col-span-5">
            <figure className="fade" style={d(after)}>
              <blockquote className="font-serif text-[22px] leading-snug italic text-ink/85 md:text-2xl">
                “{c.quote.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-paper-2 ring-2 ring-paper">
                  <Image
                    src={by.photo}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </span>
                <span className="text-sm text-faint">
                  {by.first}, {by.also}
                </span>
              </figcaption>
            </figure>
            <ul
              className="fade mt-8 flex flex-wrap gap-2"
              style={d(after + 80)}
            >
              {c.meta.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-muted"
                >
                  {m}
                </li>
              ))}
            </ul>
            <Link
              href={c.link.href}
              className="fade group mt-10 inline-flex items-center gap-3 text-lg font-semibold"
              style={d(after + 160)}
            >
              <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-ink">
                {c.link.label}
              </span>
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </Stage>
  );
}
