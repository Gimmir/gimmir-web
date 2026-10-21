import { ChapterBridge } from "@/components/franchise/chapters";
import { Kicker } from "@/components/franchise/kicker";
import { Mark, pounds } from "@/components/franchise/lp-numbers/shared";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { NETWORK_DEFAULTS } from "@/content/offer";
import { UN1T } from "@/content/proof";
import { cn } from "@/lib/cn";

import { MoneyLeaves } from "./money-leaves";

/**
 * /franchise 01, where the money goes (Oleh's artboard): the live yearly
 * figure that leaves the network for its platform, then the same network
 * drawn twice, today and with its own app. Only the figure is a client
 * island; the two cards are fixed copy. Ends on the bridge to 02.
 */

const MEMBER_PAYS = `${pounds(NETWORK_DEFAULTS.bill)} a month`;
const STUDIO_PAYS = `${pounds(UN1T.platformFeePerStudio.value)} a month`;

type Row = { label: string; value: string; marked?: boolean };

const TODAY: Row[] = [
  { label: "Member pays", value: MEMBER_PAYS },
  { label: "Studio pays the platform", value: STUDIO_PAYS },
  { label: "Fee on payments", value: "the platform's" },
  { label: "Brand in the App Store", value: "the platform's" },
  { label: "New features", value: "when the platform ships them" },
];

const WITH_APP: Row[] = [
  { label: "Member pays", value: MEMBER_PAYS },
  { label: "Studio pays HQ a tech fee", value: "to HQ", marked: true },
  { label: "A fee on every payment", value: "to HQ", marked: true },
  { label: "Brand in the App Store", value: "yours", marked: true },
  { label: "New features", value: "built when you ask", marked: true },
];

const rowClass =
  "flex justify-between gap-3 rounded-2xl p-4 text-[15px] leading-[1.4]";

function Rows({
  rows,
  total,
  totalClass,
}: {
  rows: Row[];
  total: { label: string; value: string };
  totalClass: string;
}) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {rows.map((r) => (
        <li key={r.label} className={cn(rowClass, "bg-paper")}>
          <span>{r.label}</span>
          <strong
            className={cn("text-right", r.value.length <= 16 && "whitespace-nowrap")}
          >
            {r.marked ? <Mark>{r.value}</Mark> : r.value}
          </strong>
        </li>
      ))}
      <li className={cn(rowClass, totalClass)}>
        <strong>{total.label}</strong>
        <strong className="text-right">{total.value}</strong>
      </li>
    </ul>
  );
}

const lbl = "text-[13px] font-semibold tracking-[0.06em] uppercase";

export function LpMoney() {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <>
      <Stage
        as="section"
        id="money"
        data-tone="paper"
        className="scroll-mt-[84px] pt-8 pb-10"
      >
        <Container className="flex flex-col gap-11">
          <div className="fade mx-auto flex max-w-[900px] flex-col items-center gap-2.5 text-center">
            <Kicker>01 · Where the money goes</Kicker>
            <MoneyLeaves />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="fade flex flex-col gap-[18px] rounded-3xl bg-paper-2 p-6 sm:p-7"
              style={d(120)}
            >
              <h3 className={cn(lbl, "m-0 text-muted")}>Today</h3>
              <Rows
                rows={TODAY}
                total={{ label: "HQ gets", value: "royalty only" }}
                totalClass="bg-transparent shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
              />
            </div>
            <div
              className="fade flex flex-col gap-[18px] rounded-3xl bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line),0_30px_70px_-36px_rgba(21,20,14,0.3)] sm:p-7"
              style={d(220)}
            >
              <h3 className={cn(lbl, "m-0 text-ink")}>With your own app</h3>
              <Rows
                rows={WITH_APP}
                total={{ label: "HQ gets", value: "royalty + 2 new income lines" }}
                totalClass="bg-lime"
              />
            </div>
          </div>
        </Container>
      </Stage>

      <ChapterBridge
        statement={
          <>
            What would it be for your network? <Mark>3 short steps.</Mark>
          </>
        }
        next="numbers"
        number="02"
      />
    </>
  );
}
