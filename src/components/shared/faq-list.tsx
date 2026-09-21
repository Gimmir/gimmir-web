"use client";

import { useId, useState } from "react";

import { Plus } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export type FaqItem = {
  key: string;
  question?: string | null;
  answer?: string | null;
};

/** Accessible accordion of questions and answers. All panels start closed. */
export function FaqList({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const trigger = `${uid}-trigger-${i}`;
        const panel = `${uid}-panel-${i}`;
        return (
          <Reveal key={item.key} delay={(i % 5) * 50}>
            <div className="border-b border-line first:border-t">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  id={trigger}
                  className="group flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-ink">
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
                id={panel}
                role="region"
                aria-labelledby={trigger}
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
  );
}
