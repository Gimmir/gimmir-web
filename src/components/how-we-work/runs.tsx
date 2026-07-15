"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";
import type { HOW_WE_WORK_QUERY_RESULT } from "@/sanity/types";

export function HowItRunsSection({
  data,
}: {
  data: NonNullable<HOW_WE_WORK_QUERY_RESULT>;
}) {
  const steps = data.runsSteps ?? [];
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [spine, setSpine] = useState({ top: 0, height: 0, fill: 0 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      const c = wrapRef.current;
      const badges = badgeRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (!c || badges.length < 2) return;

      const cTop = c.getBoundingClientRect().top;
      const centers = badges.map((b) => {
        const r = b.getBoundingClientRect();
        return r.top + r.height / 2 - cTop;
      });
      const top = centers[0];
      const bottom = centers[centers.length - 1];

      // activation line sits a little below the viewport middle
      const line = window.innerHeight * 0.6 - cTop;
      const fill = Math.max(0, Math.min(bottom - top, line - top));
      const count = centers.filter((y) => y <= line).length;

      setSpine({ top, height: bottom - top, fill });
      setActive(count);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:items-start md:gap-16">
          <div className="md:sticky md:top-28">
            <Reveal>
              <SectionHeader
                index="02"
                titleMax="max-w-[14ch]"
                title={
                  <>
                    {data.runsHeading}
                    {data.runsAccent ? (
                      <>
                        {" "}
                        <span className="font-serif font-normal italic">
                          {data.runsAccent}
                        </span>
                      </>
                    ) : null}
                  </>
                }
              />
            </Reveal>
          </div>

          <div ref={wrapRef} className="relative">
            {/* track */}
            <span
              aria-hidden
              className="absolute left-7 w-[2px] bg-line md:left-8"
              style={{ top: spine.top, height: spine.height }}
            />
            {/* progress fill */}
            <span
              aria-hidden
              className="absolute left-7 w-[2px] bg-lime md:left-8"
              style={{ top: spine.top, height: spine.fill }}
            />

            <ol className="space-y-10 md:space-y-12">
              {steps.map((s, i) => {
                const on = i < active;
                return (
                  <li
                    key={s._key}
                    className="relative flex items-start gap-5 md:gap-8"
                  >
                    <span
                      ref={(el) => {
                        badgeRefs.current[i] = el;
                      }}
                      className={cn(
                        "relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full font-mono text-base font-bold ring-4 ring-paper transition-colors duration-300 ease-out md:size-16",
                        on
                          ? "bg-lime text-ink"
                          : "border border-line bg-surface text-ink/40",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-2.5 md:pt-3.5">
                      <h3 className="text-xl font-bold tracking-tight md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                        {s.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
