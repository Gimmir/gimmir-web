"use client";

import { useId, useState } from "react";

import { Plus } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type AccordionItem = { key: string; question: string; answer: string };

/**
 * V2 questions and answers: big rows, one open at a time. The answer
 * opens by animating the row's grid track (0fr to 1fr), so the height is
 * never measured in script and nothing jumps.
 */
export function Accordion({
  items,
  className,
}: {
  items: readonly AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const trigger = `${uid}-t-${i}`;
        const panel = `${uid}-p-${i}`;
        return (
          <div key={item.key} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                id={trigger}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <span className="text-xl font-bold tracking-[-0.01em] md:text-2xl">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color] duration-200",
                    isOpen
                      ? "border-lime bg-lime"
                      : "border-line group-hover:border-ink/40",
                  )}
                >
                  <Plus
                    className={cn(
                      "size-5 transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)]",
                      isOpen && "rotate-45",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={trigger}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.23,1,.32,1)] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-7 text-lg leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
