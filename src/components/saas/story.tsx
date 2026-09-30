"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { saas } from "@/content/saas";
import { cn } from "@/lib/cn";

type Chapter = (typeof saas.story.chapters)[number];

/** Chapter one, before the product: the coach's business in three tools. */
export function Chaos() {
  const card =
    "absolute rounded-2xl bg-paper p-4 text-[13px] text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]";
  return (
    <div className="relative h-[340px] w-full max-w-[420px]">
      <div className={cn(card, "left-0 top-4 w-[62%] -rotate-[5deg]")}>
        <p className="flex items-center justify-between font-semibold">
          Chats
          <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] text-paper">
            Unread
          </span>
        </p>
        {[
          "Can we move Thursday?",
          "Sent my check-in",
          "Which program am I on?",
        ].map((t) => (
          <p
            key={t}
            className="mt-2 w-fit rounded-xl rounded-bl-sm bg-paper-2 px-3 py-1.5"
          >
            {t}
          </p>
        ))}
      </div>
      <div className={cn(card, "right-0 top-24 w-[58%] rotate-[4deg]")}>
        <p className="font-semibold">clients_FINAL_v3.xlsx</p>
        <div className="mt-3 grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }, (_, k) => (
            <span
              key={k}
              className={cn(
                "h-3 rounded-[3px]",
                k < 4 ? "bg-ink/70" : "bg-paper-2",
              )}
            />
          ))}
        </div>
      </div>
      <div className={cn(card, "bottom-2 left-[14%] w-[54%] -rotate-[2deg]")}>
        <p className="flex items-center gap-2 font-semibold">
          <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] text-paper">
            PDF
          </span>
          Program_week_7.pdf
        </p>
        <p className="mt-2 text-muted">Sent to every client, one by one</p>
      </div>
    </div>
  );
}

function Visual({ c, big }: { c: Chapter; big?: boolean }) {
  if (c.visual === "chaos") return <Chaos />;
  return (
    <div
      className={cn(
        "relative aspect-[1242/2688] overflow-hidden rounded-[28px] ring-1 ring-paper/10",
        big ? "h-[min(64vh,640px)]" : "mx-auto w-[62%] max-w-[260px]",
      )}
    >
      <Image
        src={c.visual}
        alt={"alt" in c ? c.alt : ""}
        fill
        sizes={big ? "300px" : "62vw"}
        className="object-cover"
      />
    </div>
  );
}

/**
 * /build-your-saas ②, how Jimmy Coach started, one screen a chapter (doc
 * 09's scroll narrative, no scroll-jacking): on wide screens the lines
 * scroll past a pinned picture that changes with the chapter you're on;
 * on phones each line carries its own picture.
 */
export function SaasStory() {
  const { label, chapters, link } = saas.story;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <ol className="lg:col-span-6">
            {chapters.map((c, i) => (
              <li
                key={c.line}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="flex flex-col justify-center border-b border-line-dark py-14 last:border-b-0 lg:min-h-[78vh] lg:border-b-0 lg:py-0"
              >
                <span
                  className={cn(
                    "font-mono text-[12px] uppercase tracking-[0.04em] transition-colors duration-300",
                    i === active ? "text-lime" : "text-paper/45",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(chapters.length).padStart(2, "0")}
                </span>
                <p className="mt-4 max-w-[18ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.5rem)] italic leading-[1.1]">
                  {c.line}
                </p>
                <div className="mt-10 lg:hidden">
                  <Visual c={c} />
                </div>
              </li>
            ))}
          </ol>
          <div aria-hidden className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[12vh] flex h-[76vh] items-center justify-center">
              {chapters.map((c, i) => (
                <div
                  key={c.line}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(.23,1,.32,1)] motion-reduce:transition-none",
                    i === active
                      ? "opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0",
                  )}
                >
                  <Visual c={c} big />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link
          href={link.href}
          className="group mt-6 inline-flex items-center gap-3 text-lg font-semibold lg:mt-0"
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
