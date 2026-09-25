import Link from "next/link";

import { BuildList } from "@/components/home/build-list";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { home } from "@/content/home";

/**
 * ⑥ What we build, on ink: six kinds of software as big rows, each a link
 * with its tag (public case or under NDA). With a pointer, a card follows
 * the cursor and shows the row: a drawing, or Jimmy's screen.
 */
export function WhatWeBuild() {
  const { label, rows, link } = home.build;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="ink" className="relative bg-ink text-paper">
      <Container className="py-20 md:py-32">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <BuildList rows={rows} delay={120} />
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
