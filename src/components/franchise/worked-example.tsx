import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { franchise } from "@/content/franchise";

import { Ctas } from "./ctas";

/**
 * /franchise ③, a worked example on ink: the sum for a 7-studio franchise
 * (summed by `calcHqIncome` in the content file), the year and the payback
 * under it, then the numbers button.
 */
export function FranchiseWorkedExample() {
  const { title, monthLabel, rows, total, summary, caveat } = franchise.example;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      id="worked-example"
      data-tone="ink"
      className="relative bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <h2 className="display max-w-[20ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <div
          className="fade mt-12 max-w-[820px] md:mt-16"
          style={d(after)}
        >
          <table className="w-full border-collapse text-left">
            <caption className="pb-4 text-left text-sm font-semibold text-paper/50">
              {monthLabel}
            </caption>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-line-dark">
                  <th scope="row" className="py-5 pr-4 align-top font-normal">
                    <span className="block text-lg font-bold md:text-xl">
                      {r.label}
                    </span>
                    <span className="mt-1 block text-[15px] text-paper/60">
                      {r.sum}
                    </span>
                  </th>
                  <td className="whitespace-nowrap py-5 text-right align-top text-xl font-bold tabular-nums md:text-2xl">
                    {r.value}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-paper/40">
                <th
                  scope="row"
                  className="py-6 pr-4 text-left align-baseline text-lg font-bold md:text-xl"
                >
                  {total.label}
                </th>
                <td className="display whitespace-nowrap py-6 text-right align-baseline text-[length:var(--text-display)] leading-none tabular-nums">
                  {total.value}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="fade mt-10 max-w-[56ch] md:mt-12" style={d(after + 120)}>
          <p className="text-xl font-semibold leading-snug md:text-2xl">
            {summary}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-paper/70">{caveat}</p>
        </div>
        <div className="fade mt-10" style={d(after + 200)}>
          <Ctas placement="franchise-example" onDark />
        </div>
      </Container>
    </Stage>
  );
}
