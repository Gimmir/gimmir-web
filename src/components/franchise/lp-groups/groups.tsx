import { BookTrigger } from "@/components/blocks/book-trigger";
import { Kicker } from "@/components/franchise/kicker";
import { Mark } from "@/components/franchise/lp-numbers/shared";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, Check } from "@/components/ui/icons";
import { GROUPS_COPY as C } from "@/content/franchise-page/groups";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const card =
  "flex flex-col gap-1 rounded-[24px] bg-surface p-6 ring-1 ring-line sm:p-7";
const row = "flex gap-3 border-b border-line py-3 text-[15px]";

/**
 * /franchise gym groups: for groups that own 5 to 50 sites, one system
 * rebuilt for them with the code included.
 */
export function LpGroups() {
  const after = wordCount(`${C.title.lead} ${C.title.mark}`) * 40 + 300;

  return (
    <Stage
      as="section"
      id="groups"
      data-tone="paper"
      className="scroll-mt-[84px] pt-32"
    >
      <Container className="flex flex-col items-center gap-12">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-[18px] text-center">
          <Kicker>{C.kicker}</Kicker>
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={C.title.lead} />{" "}
            <Mark>
              <RiseText
                text={C.title.mark}
                start={wordCount(C.title.lead)}
              />
            </Mark>
          </h2>
          <p
            className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted"
            style={d(after)}
          >
            {C.lead}
          </p>
        </div>

        <div
          className="fade grid w-full max-w-[980px] gap-4 md:grid-cols-2"
          style={d(after + 120)}
        >
          <div className={card}>
            <h3 className="m-0 mb-2 text-[22px] font-bold">{C.get.title}</h3>
            <ul className="m-0 flex list-none flex-col p-0">
              {C.get.items.map((item) => (
                <li key={item} className={`${row} font-semibold`}>
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-ink text-lime"
                  >
                    <Check className="size-[11px]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={card}>
            <h3 className="m-0 mb-2 text-[22px] font-bold">{C.how.title}</h3>
            <ol className="m-0 flex list-none flex-col p-0">
              {C.how.steps.map((step, i) => (
                <li key={step} className={row}>
                  <strong className="w-6 shrink-0 tabular-nums">{i + 1}</strong>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <BookTrigger
              booking="franchiseCall"
              placement="groups"
              className="group mt-5 inline-flex min-h-[52px] cursor-pointer items-center gap-3.5 self-start rounded-full bg-ink pr-2 pl-6 text-base font-semibold whitespace-nowrap text-paper transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] hover:bg-ink-soft motion-reduce:transition-none"
            >
              {C.how.cta}
              <span
                aria-hidden
                className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-lime text-ink"
              >
                <ArrowRight className="size-4" />
              </span>
            </BookTrigger>
          </div>
        </div>
      </Container>
    </Stage>
  );
}
