import Link from "next/link";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { home } from "@/content/home";
import { operators } from "@/content/operators";

/**
 * /operators ③, UN1T full-bleed on ink: the home's case (title, story,
 * the drawn "12") told a little longer for operators, then the network
 * before and after in one strip.
 */
export function OperatorsUn1t() {
  const c = home.un1t;
  const { label, more, before, after } = operators.un1t;
  const titleWords = wordCount(c.title);
  const t = titleWords * 40 + 500;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      data-tone="ink"
      className="relative overflow-hidden bg-ink text-paper"
    >
      <Container className="py-20 md:py-32">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:self-center">
            <p className="fade text-[15px] font-medium text-paper/50">
              {label}
            </p>
            <h2 className="display mt-8 text-[length:var(--text-title)] leading-[1.02]">
              <RiseText text={c.title} />
            </h2>
            <p
              className="fade mt-8 max-w-[46ch] text-lg leading-relaxed text-paper/70 md:text-xl"
              style={d(t)}
            >
              {c.story}
            </p>
            <p
              className="fade mt-5 max-w-[46ch] text-lg leading-relaxed text-paper/70 md:text-xl"
              style={d(t + 60)}
            >
              {more}
            </p>
            <Link
              href={c.link.href}
              className="fade group mt-10 inline-flex items-center gap-3 text-lg font-semibold"
              style={d(t + 140)}
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
              className="max-w-[560px] lg:ml-auto"
            />
          </div>
        </div>

        {/* the network, before and after */}
        <div
          className="fade mt-16 grid items-center gap-6 rounded-[28px] border border-line-dark p-6 md:mt-20 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:p-8"
          style={d(t + 300)}
        >
          <div>
            <p className="text-[13px] font-semibold text-paper/50">
              {before.label}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {before.items.map((it) => (
                <li
                  key={it}
                  className="rounded-full border border-line-dark px-3.5 py-1.5 text-[15px] text-paper/60"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <span
            aria-hidden
            className="flex size-11 items-center justify-center justify-self-start rounded-full bg-lime text-ink md:justify-self-center"
          >
            <ArrowRight className="size-5 rotate-90 md:rotate-0" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-lime">{after.label}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {after.items.map((it) => (
                <li
                  key={it}
                  className="flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-[15px] font-medium text-ink"
                >
                  <span className="size-1.5 rounded-full bg-lime ring-1 ring-ink/20" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Stage>
  );
}
