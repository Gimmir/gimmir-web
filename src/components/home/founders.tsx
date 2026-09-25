import { BookTrigger } from "@/components/blocks/book-trigger";
import { Faces } from "@/components/blocks/inline-headline";
import { Stage } from "@/components/motion/stage";
import { RiseText, RiseWord, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, LinkedIn } from "@/components/ui/icons";
import { home } from "@/content/home";
import { FOUNDERS } from "@/lib/founders";

/**
 * ⑨ The founders, on ink, in the hero's language: the heading carries
 * their faces ("You work with [face] Nazar and [face] Oleh, directly."),
 * and under it one column each: name and title, one line in their own
 * voice (serif, the way people speak on this site), a call signed with
 * their name and their LinkedIn. "[face] Nazar and [face] Oleh," never
 * breaks (from 360px up), so the two faces always sit side by side on one
 * line instead of stacking at the start of two.
 */
export function Founders() {
  const { label, headline, people } = home.founders;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const [a, b] = people.map((p) => FOUNDERS[p.id]);
  const n = wordCount(headline.before);

  return (
    <Stage
      as="section"
      data-tone="ink"
      className="relative border-t border-line-dark bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <h2
          className="mt-8 text-[clamp(1.625rem,0.7rem+3.9vw,4.25rem)] font-extrabold leading-[1.1] tracking-[-0.035em] [font-stretch:108%]"
          style={{ "--face-ring": "var(--color-ink)" } as React.CSSProperties}
        >
          <RiseText text={headline.before} />{" "}
          <span className="min-[360px]:whitespace-nowrap">
            <RiseWord i={n}>
              <Faces ids={[a.id]} />
            </RiseWord>{" "}
            <RiseWord i={n + 1}>{a.first}</RiseWord>{" "}
            <RiseWord i={n + 2}>and</RiseWord>{" "}
            <RiseWord i={n + 3}>
              <Faces ids={[b.id]} />
            </RiseWord>{" "}
            <RiseWord i={n + 4}>{b.first},</RiseWord>
          </span>{" "}
          <RiseText text={headline.after} start={n + 5} />
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
