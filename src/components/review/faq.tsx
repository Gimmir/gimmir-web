"use client";

import { useState } from "react";

import { Container } from "@/components/ui/container";
import { Plus } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    q: "Will you just tell me to rebuild everything?",
    a: "No. We tell you the minimum that actually matters, in priority order. Sometimes the honest answer is “this is solid, here are the three things to watch.”",
  },
  {
    q: "Do I have to build with you afterward?",
    a: "No. The roadmap is yours to keep and act on however you want. If you do build with us, the review fee is credited.",
  },
  {
    q: "Is my code and IP safe?",
    a: "Yes. We sign an NDA before we see anything, and you own everything, start to finish.",
  },
  {
    q: "Who actually does the review?",
    a: "The founders, Nazar and Oleh. Not a junior, not an outsourced analyst.",
  },
  {
    q: "How long does it take?",
    a: "One to two weeks from kickoff to the roadmap walkthrough.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="08" title="Questions, answered straight." />
        </Reveal>

        <div className="mt-12">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={(i % 5) * 50}>
                <div className="border-b border-line first:border-t">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="group flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "text-lg font-semibold transition-colors duration-200",
                          isOpen ? "text-ink" : "text-ink group-hover:text-ink",
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-90",
                          isOpen ? "bg-lime" : "group-hover:bg-paper-2",
                        )}
                      >
                        <Plus
                          className={cn(
                            "size-5 transition-transform duration-300 ease-[var(--ease-out)]",
                            isOpen && "rotate-45",
                          )}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={cn(
                          "max-w-[68ch] pb-6 text-lg leading-relaxed text-muted transition-opacity duration-300 ease-[var(--ease-out)]",
                          isOpen ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
