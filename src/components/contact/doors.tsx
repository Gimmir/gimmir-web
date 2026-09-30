import Image from "next/image";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { BOOK_DOORS } from "@/content/site";
import { FOUNDERS } from "@/lib/founders";
import { cn } from "@/lib/cn";

/**
 * /contact ②, doc 09's two big doors with faces: the fitness-brand call
 * with Nazar (filled), the SaaS call with Oleh and Nazar (outlined), as
 * the home's doors are. A door opens its Cal.com booking; both go lime on
 * hover. `#operators` and `#founders` still land on the right door.
 */
export function Doors() {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="paper" className="relative">
      <Container className="grid gap-4 pb-12 md:grid-cols-2 md:pb-16">
        {BOOK_DOORS.map((door, i) => {
          const filled = i === 0;
          const { anchor, note } =
            contact.doors[door.id as keyof typeof contact.doors];
          return (
            <div
              key={door.id}
              id={anchor}
              className="fade scroll-mt-24"
              style={d(200 + i * 120)}
            >
              <BookTrigger
                booking={door.booking}
                placement="contact-door"
                className={cn(
                  "group flex h-full min-h-[380px] w-full flex-col justify-between gap-10 rounded-[32px] p-7 text-left transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(.23,1,.32,1)] hover:bg-lime hover:text-ink active:scale-[0.99] md:min-h-[440px] md:p-10",
                  filled
                    ? "bg-ink text-paper"
                    : "bg-surface text-ink ring-1 ring-line hover:ring-lime",
                )}
              >
                <span className="flex items-center">
                  {door.faces.map((id, k) => (
                    <span
                      key={id}
                      className={cn(
                        "relative size-24 overflow-hidden rounded-full bg-paper-2 ring-4 transition-[box-shadow] duration-300 group-hover:ring-lime md:size-28",
                        // two founders are two equals, side by side
                        k > 0 && "-ml-6 md:-ml-8",
                        filled ? "ring-ink" : "ring-surface",
                      )}
                    >
                      <Image
                        src={FOUNDERS[id].photo}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover object-top"
                      />
                    </span>
                  ))}
                </span>

                <span className="flex items-end justify-between gap-6">
                  <span className="min-w-0">
                    <span className="display block text-[clamp(2rem,1rem+2.4vw,3.25rem)] leading-[1.02]">
                      {door.title}
                    </span>
                    <span
                      className={cn(
                        "mt-4 block text-lg transition-colors duration-300 group-hover:text-ink/75",
                        filled ? "text-paper/70" : "text-muted",
                      )}
                    >
                      {door.detail}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-[15px] transition-colors duration-300 group-hover:text-ink/60",
                        filled ? "text-paper/50" : "text-faint",
                      )}
                    >
                      {note}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex size-14 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-ink group-hover:text-paper",
                      filled ? "bg-paper text-ink" : "bg-ink text-paper",
                    )}
                  >
                    <ArrowRight className="size-5" />
                  </span>
                </span>
              </BookTrigger>
            </div>
          );
        })}
      </Container>
    </Stage>
  );
}
