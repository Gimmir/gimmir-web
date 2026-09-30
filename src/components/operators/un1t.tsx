import Link from "next/link";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, Check, X } from "@/components/ui/icons";
import { home } from "@/content/home";
import { operators } from "@/content/operators";

/**
 * /operators ③, UN1T full-bleed on ink: the home's case (title, story,
 * the drawn "12") told a little longer for operators, then the network
 * before and after as two panels, the after one on lime.
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
              <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-lime group-hover:text-lime">
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

        {/* the network, before and after: what they left, dashed and
            crossed out, beside what they own now, on lime */}
        <div className="mt-16 grid gap-3 md:mt-20 md:grid-cols-2 md:gap-4">
          <div
            className="fade flex flex-col rounded-[28px] border-[1.5px] border-dashed border-paper/20 p-6 sm:p-8 md:min-h-[320px]"
            style={d(t + 300)}
          >
            <p className="text-sm font-semibold text-paper/50">
              {before.label}
            </p>
            <ul className="mt-7 flex flex-col gap-3.5 md:mt-auto">
              {before.items.map((it) => (
                <li
                  key={it}
                  className="display flex items-center gap-3.5 text-[clamp(1.5rem,0.8rem+1.8vw,2.6rem)] leading-[1.05] text-paper/40"
                >
                  <span
                    aria-hidden
                    className="flex size-[30px] shrink-0 items-center justify-center rounded-full border border-line-dark text-paper/50"
                  >
                    <X className="size-3" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="fade relative flex flex-col overflow-hidden rounded-[28px] bg-lime p-6 text-ink sm:p-8 md:min-h-[320px]"
            style={d(t + 420)}
          >
            <span
              aria-hidden
              className="display pointer-events-none absolute -right-3 -top-6 select-none text-[clamp(8rem,4rem+10vw,12.5rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(21_20_14/0.22)]"
            >
              UN1T
            </span>
            <p className="relative text-sm font-semibold">{after.label}</p>
            <ul className="relative mt-7 flex flex-col gap-3.5 md:mt-auto">
              {after.items.map((it) => (
                <li
                  key={it}
                  className="display flex items-center gap-3.5 text-[clamp(1.5rem,0.8rem+1.8vw,2.6rem)] leading-[1.05]"
                >
                  <span
                    aria-hidden
                    className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-ink text-lime"
                  >
                    <Check className="size-3.5" />
                  </span>
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
