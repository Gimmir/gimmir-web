import { BookTrigger } from "@/components/blocks/book-trigger";
import { InlineHeadline } from "@/components/blocks/inline-headline";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight, LinkedIn } from "@/components/ui/icons";
import { home } from "@/content/home";
import { FOUNDERS } from "@/lib/founders";

/**
 * ⑨ The founders, on ink, in the hero's language: the heading carries
 * their faces ("You work with [face] Nazar and [face] Oleh, directly."),
 * and under it one column each: name and title, one line in their own
 * voice (serif, the way people speak on this site), a call signed with
 * their name and their LinkedIn.
 */
export function Founders() {
  const { label, headline, people } = home.founders;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      data-tone="ink"
      className="relative border-t border-line-dark bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <h2
          className="mt-8 max-w-[18ch] text-[clamp(2.1rem,1rem+3.6vw,4.5rem)] font-extrabold leading-[1.06] tracking-[-0.035em] [font-stretch:108%]"
          style={{ "--face-ring": "var(--color-ink)" } as React.CSSProperties}
        >
          <InlineHeadline tokens={headline} />
        </h2>

        <ul className="mt-14 grid gap-x-10 gap-y-12 md:mt-16 md:grid-cols-2">
          {people.map((p, i) => {
            const f = FOUNDERS[p.id];
            return (
              <li
                key={p.id}
                className="fade border-t border-line-dark pt-6"
                style={d(700 + i * 120)}
              >
                <p className="text-[15px] text-paper/60">
                  {f.name} · {f.title}
                </p>
                <p className="mt-3 max-w-[30ch] font-serif text-2xl leading-snug italic text-paper/90 md:text-[1.7rem]">
                  “{p.line}”
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <BookTrigger
                    booking={p.cta.booking}
                    placement={`home-founders-${p.id}`}
                    className="group inline-flex items-center gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-ink transition-colors duration-200 hover:bg-lime active:scale-[0.97]"
                  >
                    <span className="text-base font-semibold">
                      {p.cta.label}
                    </span>
                    <span className="text-sm text-ink/60">({p.cta.note})</span>
                    <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight className="size-4" />
                    </span>
                  </BookTrigger>
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
              </li>
            );
          })}
        </ul>
      </Container>
    </Stage>
  );
}
