import { Kicker } from "@/components/franchise/kicker";
import { Mark, PillLink } from "@/components/franchise/lp-numbers/shared";
import { Stage } from "@/components/motion/stage";
import { RiseText } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

import { MoneyFigure } from "./money-figure";

/**
 * /franchise "the money" (Oleh's artboard v2): what the network pays its
 * booking software every month, as one live yearly figure, then the same
 * network drawn twice, today and with its own app. Only the figure is a
 * client island; the two cards are fixed copy.
 */

type Row = { label: string; value: string };

const TODAY: Row[] = [
  { label: "Each studio pays", value: "Mindbody, Glofox…" },
  { label: "The fee on payments", value: "the platform keeps it" },
];

const WITH_APP: Row[] = [
  { label: "Each studio pays", value: "you" },
  { label: "The fee on payments", value: "yours, if you want it" },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Compare({
  title,
  rows,
  total,
  className,
  totalClass,
  titleClass,
  style,
}: {
  title: string;
  rows: Row[];
  total: string;
  className: string;
  totalClass: string;
  titleClass: string;
  style: React.CSSProperties;
}) {
  return (
    <div className={cn("fade rounded-3xl p-6", className)} style={style}>
      <h3
        className={cn(
          "m-0 mb-1.5 text-[13px] font-semibold tracking-[0.06em] uppercase",
          titleClass,
        )}
      >
        {title}
      </h3>
      <ul className="m-0 flex list-none flex-col p-0 text-[15px] leading-[1.4]">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex justify-between gap-3 border-b border-ink/10 px-0.5 py-3.5"
          >
            <span className="text-muted">{r.label}</span>
            <strong className="text-right">{r.value}</strong>
          </li>
        ))}
        <li className={cn("mt-2.5 flex justify-between gap-3 rounded-xl px-4 py-3.5", totalClass)}>
          <strong>You get</strong>
          <strong className="text-right">{total}</strong>
        </li>
      </ul>
    </div>
  );
}

export function LpMoney() {
  return (
    <Stage
      as="section"
      id="money"
      data-tone="paper"
      className="scroll-mt-[84px] pt-32"
    >
      <Container className="flex flex-col items-center gap-12">
        <div className="flex max-w-[760px] flex-col items-center gap-[18px] text-center">
          <Kicker className="fade">The money</Kicker>
          <h2 className="display m-0 text-[clamp(34px,3.8vw,52px)] leading-[1.04] tracking-[-0.035em] text-balance">
            <RiseText text="You built the brand." />
            <br />
            <Mark>
              <RiseText text="Someone else gets paid." start={4} />
            </Mark>
          </h2>
          <p
            className="fade m-0 max-w-[560px] text-lg leading-[1.55] text-muted"
            style={d(300)}
          >
            Every studio in your network pays its booking software, every month. Not you.
          </p>
        </div>

        <div className="fade" style={d(380)}>
          <MoneyFigure />
        </div>

        <div className="grid w-full max-w-[840px] gap-4 md:grid-cols-2">
          <Compare
            title="Today"
            rows={TODAY}
            total="a royalty"
            className="bg-paper-2"
            titleClass="text-muted"
            totalClass="shadow-[inset_0_0_0_1px_rgba(21,20,14,0.2)]"
            style={d(120)}
          />
          <Compare
            title="With your own app"
            rows={WITH_APP}
            total="a royalty + 2 new incomes"
            className="bg-surface shadow-[inset_0_0_0_1px_var(--color-line),0_30px_70px_-36px_rgba(21,20,14,0.3)]"
            titleClass="text-ink"
            totalClass="bg-lime"
            style={d(220)}
          />
        </div>

        <div className="fade flex flex-wrap justify-center gap-3" style={d(300)}>
          <PillLink href="#proof">See what we built</PillLink>
          <a
            href="#numbers"
            className="inline-flex min-h-[52px] items-center rounded-full px-6 text-base font-semibold text-ink ring-[1.5px] ring-ink transition-[background-color,transform] duration-200 ease-[var(--ease-out)] ring-inset active:scale-[.97] [@media(hover:hover)]:hover:bg-paper-2"
          >
            Work out my number
          </a>
        </div>
      </Container>
    </Stage>
  );
}
