import { MarkerStroke } from "@/components/blocks/inline-headline";
import { ChapterBridge } from "@/components/franchise/chapters";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { OFFER } from "@/content/offer";
import { JIMMY, shown, UN1T } from "@/content/proof";

type Stat = { num: string; label: string };

/**
 * The strip under the hero: four proof numbers, all read from the claims
 * files. A claim still waiting on sign-off drops out of the strip.
 */
function stats(): Stat[] {
  const studios = shown(UN1T.studios);
  const members = shown(UN1T.members);
  const mrr = shown(JIMMY.mrr);
  const list: Array<Stat | null> = [
    studios === null ? null : { num: `${studios} studios`, label: "UN1T studios on one system" },
    members === null ? null : { num: members, label: "UN1T members on the app we built" },
    { num: `${OFFER.readyWeeks} weeks`, label: "from deposit to ready, in writing" },
    mrr === null ? null : { num: mrr, label: "a month at Jimmy Coach, which we co-founded" },
  ];
  return list.filter((s): s is Stat => s !== null);
}

/** Bridge 01: the statement, then node 01 down to "The money". */
export function LpHeroBridge() {
  return (
    <Stage>
      <ChapterBridge
        statement={
          <>
            Right now, your studios pay for someone else&apos;s app.{" "}
            <span className="relative inline-block">
              Every month.
              <MarkerStroke delay={500} bottom="-0.06em" />
            </span>
          </>
        }
        next="money"
        number="01"
      />
    </Stage>
  );
}

/** The four proof numbers, then bridge 01 (`LpHeroBridge`). */
export function LpStats() {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  return (
    <>
      <Stage as="section" aria-label="Proof in numbers">
        <Container>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] border-y border-line p-0">
            {stats().map((s, i) => (
              <li key={s.label} className="fade py-6 pr-5" style={d(i * 90)}>
                <p className="m-0 text-[40px] leading-none font-extrabold tracking-[-0.035em]">
                  {s.num}
                </p>
                <p className="mt-2 text-sm leading-normal text-muted">{s.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Stage>
      <LpHeroBridge />
    </>
  );
}
