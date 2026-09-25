import Image from "next/image";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, LinkedIn } from "@/components/ui/icons";
import { home } from "@/content/home";
import { FOUNDERS } from "@/lib/founders";

/**
 * ⑨ The founders, on ink: two large portraits side by side, each with a
 * name, a title, one sentence in their own voice (serif, the way people
 * speak on this site) and a call signed with their name.
 */
export function Founders() {
  const { label, title, people } = home.founders;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      data-tone="ink"
      className="relative border-t border-line-dark bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <h2 className="display mt-8 text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>

        <ul className="mt-12 grid gap-x-10 gap-y-16 md:mt-16 md:grid-cols-2">
          {people.map((p, i) => {
            const f = FOUNDERS[p.id];
            return (
              <li
                key={p.id}
                className="fade flex w-full max-w-[520px] flex-col"
                style={d(after + i * 140)}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-ink-soft">
                  <Image
                    src={f.photo}
                    alt={`${f.name}, ${f.title}`}
                    fill
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="display text-4xl">{f.name}</h3>
                    <p className="mt-2 text-[15px] text-paper/60">{f.title}</p>
                  </div>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.first} on LinkedIn`}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-dark text-paper/80 transition-colors duration-200 hover:border-paper/50 hover:text-paper"
                  >
                    <LinkedIn className="size-[18px]" />
                  </a>
                </div>
                <p className="mt-5 max-w-[34ch] font-serif text-2xl leading-snug italic text-paper/90">
                  “{p.line}”
                </p>
                <BookTrigger
                  booking={p.cta.booking}
                  placement={`home-founders-${p.id}`}
                  className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-ink transition-colors duration-200 hover:bg-lime active:scale-[0.97]"
                >
                  <span className="text-base font-semibold">{p.cta.label}</span>
                  <span className="text-sm text-ink/60">({p.cta.note})</span>
                  <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="size-4" />
                  </span>
                </BookTrigger>
              </li>
            );
          })}
        </ul>
      </Container>
    </Stage>
  );
}
