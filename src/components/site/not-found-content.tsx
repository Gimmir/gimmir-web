import Image from "next/image";
import Link from "next/link";

import { InlineHeadline } from "@/components/blocks/inline-headline";
import { OutlineStat } from "@/components/blocks/outline-stat";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { notFound } from "@/content/not-found";
import { BOOK_DOORS } from "@/content/site";
import { cn } from "@/lib/cn";
import { FOUNDERS } from "@/lib/founders";

/**
 * The 404 body: the line on the left, the "404" drawn in the site's hand
 * on the right with its note in the margin, then the two ways in as doors
 * (brands filled, founders outlined, as on /contact) and the rest as links.
 */
export function NotFoundContent() {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" eager data-tone="paper" className="relative">
      <HeroBackdrop />
      <Container className="relative pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p className="fade text-[15px] font-medium text-muted" style={d(0)}>
              {notFound.label}
            </p>
            <h1 className="mt-5 text-[clamp(2.6rem,0.8rem+5vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.04em] [font-stretch:106%]">
              <InlineHeadline tokens={notFound.headline} />
            </h1>
            <p
              className="fade mt-7 max-w-[44ch] text-lg leading-relaxed text-muted md:text-xl"
              style={d(700)}
            >
              {notFound.lede}
            </p>
          </div>
          <OutlineStat
            value={notFound.stat.value}
            label={notFound.stat.note}
            tone="paper"
            layout="trio"
            voice
            delay={400}
            className="max-w-[560px] lg:max-w-none"
          />
        </div>

        <div className="mt-12 grid gap-3.5 md:mt-16 md:grid-cols-2">
          {BOOK_DOORS.map((door, i) => {
            const filled = i === 0;
            const { label, href } = notFound.doors[door.id];
            return (
              <div key={door.id} className="fade" style={d(900 + i * 120)}>
                <Link
                  href={href}
                  className={cn(
                    "group flex h-full min-h-[128px] items-center justify-between gap-5 rounded-[26px] p-5 transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(.23,1,.32,1)] hover:bg-lime hover:text-ink active:scale-[0.99] md:p-6",
                    filled
                      ? "bg-ink text-paper"
                      : "bg-surface text-ink ring-1 ring-line hover:ring-lime",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="flex shrink-0">
                      {door.faces.map((id, k) => (
                        <span
                          key={id}
                          className={cn(
                            "relative size-13 overflow-hidden rounded-full bg-paper-2 ring-[3px] transition-[box-shadow] duration-300 group-hover:ring-lime",
                            k > 0 && "-ml-3.5",
                            filled ? "ring-ink" : "ring-surface",
                          )}
                        >
                          <Image
                            src={FOUNDERS[id].photo}
                            alt=""
                            fill
                            sizes="52px"
                            className="object-cover object-top"
                          />
                        </span>
                      ))}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-sm font-semibold transition-colors duration-300 group-hover:text-ink/60",
                          filled ? "text-paper/60" : "text-muted",
                        )}
                      >
                        {label}
                      </span>
                      <span className="mt-1 block text-[clamp(1.3rem,1rem+0.8vw,1.75rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
                        {door.title}
                      </span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-ink group-hover:text-paper",
                      filled ? "bg-paper text-ink" : "bg-ink text-paper",
                    )}
                  >
                    <ArrowRight className="size-5" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        <nav
          aria-label="More of the site"
          className="fade mt-8 flex flex-wrap gap-x-7 gap-y-3 text-base font-semibold"
          style={d(1150)}
        >
          {notFound.links.map((l) => (
            <Link key={l.href} href={l.href} className="link-mark">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </Stage>
  );
}
