import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { Logomark } from "@/components/ui/logomark";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

/** The lime dot of the margin notes, here marking our answer. */
function Dot() {
  return (
    <span
      aria-hidden
      className="mt-[0.55em] size-2 shrink-0 rounded-full bg-lime ring-1 ring-lime/40"
    />
  );
}

/**
 * ⑤ The enemy, on paper: three ways to get your software, side by side.
 * Our column is the one dark card in the table, a lime dot on each
 * answer; the other two stay plain. A real table on wide screens; on
 * phones each question becomes its own block with the three answers.
 */
export function Compare() {
  const { title, columns, rows } = home.compare;
  const [rent, agency, ours] = columns;
  const after = wordCount(title) * 40 + 400;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const cell = "border-t border-line py-6 pr-8 align-top text-[17px]";
  const our = "bg-ink px-8 py-6 align-top text-[17px] font-semibold text-paper";

  return (
    <Stage
      as="section"
      data-tone="paper"
      className="relative border-t border-line"
    >
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>

        {/* wide screens: one table, our column a dark card */}
        <table
          className="fade mt-14 hidden w-full border-separate border-spacing-0 text-left md:mt-16 md:table"
          style={d(after)}
        >
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[23%]" />
            <col className="w-[23%]" />
            <col className="w-[28%]" />
          </colgroup>
          <thead>
            <tr>
              <td />
              {[rent, agency].map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="pb-6 pr-8 align-bottom text-lg font-semibold"
                >
                  {c}
                </th>
              ))}
              <th
                scope="col"
                className="rounded-t-[24px] bg-ink px-8 pb-6 pt-8 align-bottom text-lg font-semibold text-paper"
              >
                <span className="flex items-center gap-3">
                  <Logomark className="size-7" />
                  {ours}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, n) => {
              const last = n === rows.length - 1;
              return (
                <tr key={r.label}>
                  <th scope="row" className={cn(cell, "font-semibold")}>
                    {r.label}
                  </th>
                  <td className={cell}>{r.values[0]}</td>
                  <td className={cell}>{r.values[1]}</td>
                  <td
                    className={cn(
                      our,
                      "border-t border-line-dark",
                      last && "rounded-b-[24px] pb-8",
                    )}
                  >
                    <span className="flex gap-3">
                      <Dot />
                      {r.values[2]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* phones: a block per question */}
        <div className="mt-12 flex flex-col gap-10 md:hidden">
          {rows.map((r, n) => (
            <div
              key={r.label}
              className="fade border-t border-line pt-6"
              style={d(after + n * 70)}
            >
              <p className="text-lg font-semibold">{r.label}</p>
              <dl className="mt-4 flex flex-col gap-3 text-[15px]">
                {[rent, agency].map((c, i) => (
                  <div key={c} className="flex justify-between gap-6">
                    <dt className="text-muted">{c}</dt>
                    <dd className="text-right">{r.values[i]}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-6 rounded-2xl bg-ink px-4 py-3.5 text-paper">
                  <dt className="flex items-center gap-2.5 font-semibold">
                    <Logomark className="size-5" />
                    {ours}
                  </dt>
                  <dd className="text-right font-semibold">{r.values[2]}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Container>
    </Stage>
  );
}
