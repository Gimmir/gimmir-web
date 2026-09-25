import Link from "next/link";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * ⑥ What we build, on ink: the "9" drawn in lime with its margin note (the
 * same hand as UN1T's "12"), and beside it the six kinds of software in a
 * compact list, each with one line on what we built. The two public cases
 * link to their stories; NDA work is described, never shown.
 */
export function WhatWeBuild() {
  const { label, stat, rows, link } = home.build;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="ink" className="relative bg-ink text-paper">
      <Container className="grid gap-x-14 gap-y-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-5">
          <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
          <OutlineStat
            value={stat.value}
            label={stat.label}
            layout="single"
            delay={200}
            className="mt-10 max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]"
          />
          <Link
            href={link.href}
            className="fade group mt-12 hidden w-fit items-center gap-3 text-lg font-semibold lg:mt-auto lg:inline-flex"
            style={d(900)}
          >
            <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-paper">
              {link.label}
            </span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="lg:col-span-7 lg:pt-10">
          {rows.map((r, i) => {
            const row = (
              <>
                <h3 className="col-span-2 text-lg font-bold leading-snug tracking-[-0.01em] md:col-span-1 md:text-xl">
                  {r.title}
                </h3>
                <span
                  className={cn(
                    "col-span-2 row-start-2 w-fit self-start whitespace-nowrap rounded-full border px-3 py-1 text-[12.5px] transition-colors duration-200 md:col-span-1 md:col-start-2 md:row-start-1",
                    "product" in r
                      ? "border-lime/50 text-lime group-hover:border-lime group-hover:bg-lime group-hover:text-ink"
                      : "border-line-dark text-paper/70",
                  )}
                >
                  {"product" in r ? `Public case · ${r.product}` : "Under NDA"}
                </span>
                <p className="col-span-2 text-[15px] leading-relaxed text-paper/70 md:col-span-1">
                  {r.body}
                </p>
              </>
            );
            const grid =
              "grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 py-4 md:py-5";
            return (
              <li
                key={r.title}
                className="fade border-t border-line-dark last:border-b"
                style={d(300 + i * 70)}
              >
                {"href" in r ? (
                  <Link href={r.href} className={cn("group", grid)}>
                    {row}
                  </Link>
                ) : (
                  <div className={grid}>{row}</div>
                )}
              </li>
            );
          })}
        </ul>

        <Link
          href={link.href}
          className="fade group inline-flex w-fit items-center gap-3 text-lg font-semibold lg:hidden"
          style={d(900)}
        >
          <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-paper">
            {link.label}
          </span>
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Container>
    </Stage>
  );
}
