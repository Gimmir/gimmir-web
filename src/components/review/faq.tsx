"use client";

import { useState } from "react";

import { Container } from "@/components/ui/container";
import { Plus } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function FaqSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = data.faqItems ?? [];

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="08"
            title={
              <>
                {data.faqHeading}
                {data.faqAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.faqAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        <div className="mt-12">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item._key} delay={(i % 5) * 50}>
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
                        {item.question}
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
                        {item.answer}
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
