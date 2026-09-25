import Image from "next/image";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { operators } from "@/content/operators";
import { FOUNDERS } from "@/lib/founders";

/**
 * /operators ⑧, the signed call: Nazar's portrait, his line in serif, the
 * free platform check and who it suits best. A dark card on paper, so the
 * page doesn't run ink into the footer.
 */
export function OperatorsClose() {
  const { title, line, fit } = operators.close;
  const { cta } = operators.hero;
  const nazar = FOUNDERS.nazar;

  return (
    <Stage as="section" data-tone="paper">
      <Container className="pb-20 md:pb-28">
        <div className="fade grid items-center gap-8 rounded-[32px] bg-ink p-7 text-paper sm:p-10 md:grid-cols-[auto_1fr] md:gap-12 md:p-14">
          <div className="relative size-28 overflow-hidden rounded-full bg-ink-soft md:size-44">
            <Image
              src={nazar.photo}
              alt={`${nazar.name}, ${nazar.title}`}
              fill
              sizes="176px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
              {title}
            </h2>
            <p className="mt-5 max-w-[40ch] font-serif text-2xl leading-snug italic text-paper/85">
              “{line}”{" "}
              <span className="whitespace-nowrap font-sans text-sm not-italic text-paper/60">
                {nazar.first}, {nazar.title.split(",")[0]}
              </span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <BookTrigger
                booking="costCheck"
                placement="operators-close"
                className="group flex w-full items-center justify-between gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-left text-ink transition-colors duration-200 hover:bg-lime active:scale-[0.97] sm:inline-flex sm:w-auto"
              >
                <span className="text-base font-semibold leading-snug">
                  {cta.label}
                </span>
                <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </BookTrigger>
              <span className="text-[15px] text-paper/60">{fit}</span>
            </div>
          </div>
        </div>
      </Container>
    </Stage>
  );
}
