import Image from "next/image";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { saas } from "@/content/saas";
import { FOUNDERS } from "@/lib/founders";
import { cn } from "@/lib/cn";

/**
 * /build-your-saas ⑧, the signed call with Oleh's and Nazar's portraits
 * (doc 09): a dark card on paper, like /operators' close with Nazar.
 */
export function SaasClose() {
  const { title, line } = saas.close;
  const { cta } = saas.hero;

  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <div className="fade grid items-center gap-8 rounded-[32px] bg-ink p-7 text-paper sm:p-10 md:grid-cols-[auto_1fr] md:gap-12 md:p-14">
          <div className="flex">
            {(["oleh", "nazar"] as const).map((id, k) => (
              <div
                key={id}
                className={cn(
                  "relative size-24 overflow-hidden rounded-full bg-ink-soft ring-4 ring-ink md:size-36",
                  k > 0 && "-ml-6 md:-ml-8",
                )}
              >
                <Image
                  src={FOUNDERS[id].photo}
                  alt={`${FOUNDERS[id].name}, ${FOUNDERS[id].title}`}
                  fill
                  sizes="144px"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
          <div>
            <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
              {title}
            </h2>
            <p className="mt-5 max-w-[44ch] font-serif text-2xl italic leading-snug text-paper/85">
              “{line}”{" "}
              <span className="whitespace-nowrap font-sans text-sm not-italic text-paper/60">
                {FOUNDERS.oleh.first} & {FOUNDERS.nazar.first}
              </span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <BookTrigger
                booking="founderReview"
                placement="saas-close"
                className="group flex w-full items-center justify-between gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-left text-ink transition-colors duration-200 hover:bg-lime active:scale-[0.97] sm:inline-flex sm:w-auto"
              >
                <span className="text-base font-semibold leading-snug">
                  {cta.label}
                </span>
                <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </BookTrigger>
              <span className="text-[15px] text-paper/60">{cta.by}.</span>
            </div>
          </div>
        </div>
      </Container>
    </Stage>
  );
}
