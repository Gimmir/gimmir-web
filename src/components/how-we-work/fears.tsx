"use client";

import { useState } from "react";

import { Container } from "@/components/ui/container";
import { Check, X } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";
import type { HOW_WE_WORK_QUERY_RESULT } from "@/sanity/types";

const strikeActive =
  "text-ink/45 [text-decoration-line:line-through] [text-decoration-thickness:2px] decoration-lime";

export function FearsSection({
  data,
}: {
  data: NonNullable<HOW_WE_WORK_QUERY_RESULT>;
}) {
  const fears = data.fears ?? [];
  const [sel, setSel] = useState(0);
  const active = fears[sel] ?? fears[0];

  if (!active) return null;

  return (
    <section
      id="fears"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            titleMax="max-w-[30ch]"
            title={
              <>
                {data.fearsHeading}
                {data.fearsAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.fearsAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        {/* desktop — explorer */}
        <div className="mt-14 hidden gap-6 md:grid md:grid-cols-[1.05fr_1fr] md:items-start md:gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <ol className="flex flex-col gap-1.5">
            {fears.map((f, i) => {
              const on = i === sel;
              return (
                <li key={f._key}>
                  <button
                    type="button"
                    onClick={() => setSel(i)}
                    aria-pressed={on}
                    className={cn(
                      "relative flex w-full items-center gap-3.5 overflow-hidden rounded-xl border px-4 py-4 text-left transition-[background-color,border-color,box-shadow] duration-200 ease-out",
                      on
                        ? "border-line bg-surface shadow-[0_14px_34px_-24px_rgba(21,20,14,0.4)]"
                        : "border-transparent hover:bg-paper-2/60",
                    )}
                  >
                    {on && (
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-1 bg-lime"
                      />
                    )}
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                        on
                          ? "bg-lime text-ink"
                          : "border border-ink/15 text-ink/40",
                      )}
                    >
                      {on ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-lg italic leading-snug transition-colors duration-200",
                        on ? "text-ink" : "text-ink/70",
                      )}
                    >
                      {f.fear}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="md:sticky md:top-28">
            <div className="rounded-2xl border border-line bg-surface p-8 md:p-9">
              <div
                key={sel}
                className="[animation:answer-in_340ms_var(--ease-out)]"
              >
                <p
                  className={cn(
                    "font-serif text-xl italic leading-snug md:text-2xl",
                    strikeActive,
                  )}
                >
                  “{active.fear}”
                </p>
                <div aria-hidden className="my-6 h-px w-full bg-line" />
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-lime text-ink">
                    <Check className="size-4" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {data.fearsAnswerLabel}
                  </span>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-ink md:text-xl">
                  {active.answer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* mobile — accordion */}
        <div className="mt-12 md:hidden">
          {fears.map((f, i) => {
            const on = i === sel;
            return (
              <div key={f._key} className="border-b border-line first:border-t">
                <button
                  type="button"
                  onClick={() => setSel(on ? -1 : i)}
                  aria-expanded={on}
                  className="flex w-full items-start gap-3.5 py-5 text-left"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                      on ? "bg-lime text-ink" : "border border-ink/15 text-ink/40",
                    )}
                  >
                    {on ? <Check className="size-4" /> : <X className="size-3.5" />}
                  </span>
                  <span
                    className={cn(
                      "font-serif text-xl italic leading-snug transition-colors duration-200",
                      on ? strikeActive : "text-ink/80",
                    )}
                  >
                    “{f.fear}”
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pl-[42px] leading-relaxed text-muted">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
