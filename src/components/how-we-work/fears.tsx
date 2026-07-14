"use client";

import { useState } from "react";

import { Container } from "@/components/ui/container";
import { Check, X } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";

const FEARS = [
  {
    fear: "Senior on the sales call, juniors on the project.",
    answer:
      "The founders, Nazar and Oleh, are in every engagement, from the first call through delivery. You meet the people who actually build, and they stay your point of contact. No bait and switch.",
  },
  {
    fear: "They delivered, then disappeared.",
    answer:
      "We build products to live and grow, not to hand off and vanish. We stay through launch and scale, and we design the architecture so your next change is a change, not a rewrite.",
  },
  {
    fear: "I don’t really own what they built.",
    answer:
      "Code, IP, repositories, and accounts are yours from day one. Not at the end. Not on final payment. Day one. You are never locked in to us.",
  },
  {
    fear: "I can never reach the actual developers.",
    answer:
      "No manager wall, no telephone game. You talk directly to the engineers writing your code, with real overlap hours and a direct line, not a ticket that gets answered tomorrow.",
  },
  {
    fear: "We were in different timezones and lost half a day on every question.",
    answer:
      "We work with deliberate overlap with your hours and treat async communication as a skill, not an excuse. You are never sitting a full day waiting on an answer.",
  },
  {
    fear: "Every sprint we fixed the same bugs and rebuilt the same things.",
    answer:
      "We scope honestly and we push back. If a feature or a plan will hurt you later, we tell you before we build it. You are paying for judgment, not just hours.",
  },
  {
    fear: "QA was basically me.",
    answer:
      "Quality is our job, not yours. Testing and review are part of how we ship, not a surprise you discover is missing after launch.",
  },
];

const strikeActive =
  "text-ink/45 [text-decoration-line:line-through] [text-decoration-thickness:2px] decoration-lime";

export function FearsSection() {
  const [sel, setSel] = useState(0);
  const active = FEARS[sel] ?? FEARS[0];

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
                The fears you have are the right ones.{" "}
                <span className="font-serif font-normal italic">
                  Here is how we kill each.
                </span>
              </>
            }
          />
        </Reveal>

        {/* desktop — explorer */}
        <div className="mt-14 hidden gap-6 md:grid md:grid-cols-[1.05fr_1fr] md:items-start md:gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <ol className="flex flex-col gap-1.5">
            {FEARS.map((f, i) => {
              const on = i === sel;
              return (
                <li key={i}>
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
                    How we kill it
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
          {FEARS.map((f, i) => {
            const on = i === sel;
            return (
              <div key={i} className="border-b border-line first:border-t">
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
