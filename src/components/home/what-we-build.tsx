import Link from "next/link";
import { Fragment } from "react";

import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * ⑥ What we build, on ink, as one sentence: every kind of software a chip
 * you can follow, the two public cases lime and named, and the counts
 * under it. Each chip carries its own comma, so a line never starts with
 * one.
 */
export function WhatWeBuild() {
  const { label, lead, items, facts, link } = home.build;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const last = items.length - 1;
  const after = 160 + items.length * 70;

  return (
    <Stage as="section" data-tone="ink" className="relative bg-ink text-paper">
      <Container className="py-20 md:py-32">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>

        <p className="display mt-8 max-w-[1150px] text-[clamp(1.75rem,1rem+2.9vw,3.6rem)] leading-[1.32] md:mt-10">
          <span className="fade inline-block" style={d(60)}>
            {lead}
          </span>{" "}
          {items.map((it, n) => (
            <Fragment key={it.label}>
              {n === last && (
                <>
                  <span className="fade inline-block" style={d(120 + n * 70)}>
                    and
                  </span>{" "}
                </>
              )}
              <span
                className="fade inline-block whitespace-nowrap"
                style={d(120 + n * 70)}
              >
                <Link
                  href={it.href}
                  className={cn(
                    "inline-flex items-center gap-[0.3em] rounded-full border px-[0.45em] pb-[0.06em] pt-[0.02em] transition-[background-color,border-color] duration-200",
                    "product" in it
                      ? "border-lime bg-lime text-ink hover:border-lime-deep hover:bg-lime-deep"
                      : "border-line-dark hover:border-paper/50 hover:bg-paper/5",
                  )}
                >
                  {it.label}
                  {"product" in it && (
                    <span className="text-[0.42em] font-semibold tracking-normal [font-stretch:100%]">
                      {it.product}
                    </span>
                  )}
                </Link>
                {n === last ? "." : n === last - 1 ? "" : ","}
              </span>{" "}
            </Fragment>
          ))}
        </p>

        <ul
          className="fade mt-12 flex flex-wrap gap-x-10 gap-y-4 md:mt-16"
          style={d(after)}
        >
          {facts.map((f) => (
            <li key={f.label} className="flex items-baseline gap-3">
              <span className="display text-5xl">{f.value}</span>
              <span className="text-[15px] text-paper/70">{f.label}</span>
            </li>
          ))}
        </ul>

        <Link
          href={link.href}
          className="fade group mt-12 inline-flex items-center gap-3 text-lg font-semibold"
          style={d(after + 80)}
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
