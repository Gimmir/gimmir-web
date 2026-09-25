import Link from "next/link";

import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * ⑥ What we build, on ink: six kinds of software as big rows, each a link
 * with its tag (public case or under NDA). On hover the title leans in and
 * the arrow fills lime; nothing else.
 */
export function WhatWeBuild() {
  const { label, rows, link } = home.build;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="ink" className="relative bg-ink text-paper">
      <Container className="py-20 md:py-32">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <ul className="mt-10 md:mt-14">
          {rows.map((r, i) => (
            <li
              key={r.title}
              className="fade border-t border-line-dark last:border-b"
              style={d(120 + i * 70)}
            >
              <Link
                href={r.href}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 py-6 md:grid-cols-[1fr_auto_auto] md:py-7"
              >
                <span className="display text-[clamp(1.75rem,0.9rem+2.6vw,3.5rem)] leading-[1.04] transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:translate-x-3">
                  {r.title}
                </span>
                <span className="col-start-2 row-start-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-line-dark transition-[background-color,border-color,color] duration-200 group-hover:border-lime group-hover:bg-lime group-hover:text-ink md:col-start-3">
                  <ArrowRight className="size-[18px]" />
                </span>
                <span
                  className={cn(
                    "col-span-2 w-fit whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] md:col-span-1 md:col-start-2 md:row-start-1",
                    "product" in r
                      ? "border-lime/50 text-lime"
                      : "border-line-dark text-paper/70",
                  )}
                >
                  {"product" in r ? `Public case · ${r.product}` : "Under NDA"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={link.href}
          className="fade group mt-12 inline-flex items-center gap-3 text-lg font-semibold"
          style={d(120 + rows.length * 70)}
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
