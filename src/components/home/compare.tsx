import { GRAIN } from "@/components/home/hero-backdrop";
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

type GlyphKind = "lock" | "hourglass" | "key";

/**
 * Each way to get software, drawn in the same thin hand as UN1T's "12" and
 * the manifesto's key: renting locks you in, an agency bills the hours,
 * with us you hold the key. Drawn once the table has settled.
 */
function Glyph({
  kind,
  delay,
  className,
}: {
  kind: GlyphKind;
  delay: number;
  className?: string;
}) {
  const draw = (d: number, dur = 1100) =>
    ({ "--d": `${d}ms`, "--dur": `${dur}ms` }) as React.CSSProperties;
  const line = { pathLength: 1, className: "draw" } as const;

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("block overflow-visible", className)}
    >
      {kind === "lock" && (
        <>
          <path
            d="M35 46V34a15 15 0 0 1 30 0v12"
            {...line}
            style={draw(delay)}
          />
          <path
            d="M30 46h40a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6V52a6 6 0 0 1 6-6Z"
            {...line}
            style={draw(delay + 150)}
          />
          <circle
            cx="50"
            cy="61"
            r="4"
            {...line}
            style={draw(delay + 700, 500)}
          />
          <path d="M50 65v8" {...line} style={draw(delay + 900, 400)} />
        </>
      )}
      {kind === "hourglass" && (
        <>
          <path d="M28 14h44M28 86h44" {...line} style={draw(delay)} />
          <path
            d="M33 14c0 24 16 28 16 36s-16 12-16 36"
            {...line}
            style={draw(delay + 150)}
          />
          <path
            d="M67 14c0 24-16 28-16 36s16 12 16 36"
            {...line}
            style={draw(delay + 150)}
          />
          <path
            d="M41 31c5 4 13 4 18 0"
            {...line}
            style={draw(delay + 700, 500)}
          />
          <path d="M50 55v17" {...line} style={draw(delay + 850, 400)} />
          <path
            d="M39 84c4-8 18-8 22 0"
            {...line}
            style={draw(delay + 950, 500)}
          />
        </>
      )}
      {kind === "key" && (
        <g transform="rotate(-8 30 50)">
          <circle
            cx="30"
            cy="50"
            r="7"
            fill="var(--color-lime)"
            stroke="none"
            className="fade"
            style={{ "--d": `${delay + 900}ms` } as React.CSSProperties}
          />
          <path
            d="M49.36 45H90V55H86V66H79V55H73V62H67V55H49.36A20 20 0 1 1 49.36 45Z"
            {...line}
            style={draw(delay, 1300)}
          />
          <circle
            cx="30"
            cy="50"
            r="7"
            {...line}
            style={draw(delay + 400, 600)}
          />
        </g>
      )}
    </svg>
  );
}

/**
 * ⑤ The enemy, on paper: three ways to get your software, side by side,
 * each with its drawn glyph. Our column is the one dark card, a lime dot
 * on each answer and lime light behind it; the other two stay plain. A
 * real table on wide screens; on phones each question becomes its own
 * block with the three answers.
 */
export function Compare() {
  const { title, columns, rows } = home.compare;
  const [rent, agency, ours] = columns;
  const glyphs: GlyphKind[] = ["lock", "hourglass", "key"];
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const cell = "border-t border-line py-6 pr-8 align-top text-[17px]";
  const our = "bg-ink px-8 py-6 align-top text-[17px] font-semibold text-paper";

  return (
    <Stage
      as="section"
      data-tone="paper"
      className="relative overflow-hidden border-t border-line"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            GRAIN,
            "radial-gradient(ellipse 34% 52% at 82% 60%, rgba(201,242,61,0.2) 0%, rgba(201,242,61,0.07) 50%, rgba(201,242,61,0) 78%)",
          ].join(", "),
          backgroundSize: "180px 180px, 100% 100%",
        }}
      />
      <Container className="relative py-20 md:py-28">
        {/* phones: the title stands alone; wide screens: it heads the table */}
        <h2 className="display text-[length:var(--text-title)] leading-[1.02] md:sr-only">
          <RiseText text={title} />
        </h2>

        {/* wide screens: one table, our column a dark card */}
        <table className="hidden w-full border-separate border-spacing-0 text-left md:table">
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[23%]" />
            <col className="w-[23%]" />
            <col className="w-[28%]" />
          </colgroup>
          <thead>
            <tr>
              <td className="pb-6 pr-10 align-bottom">
                <p
                  aria-hidden
                  className="display text-[clamp(2rem,0.8rem+2.6vw,3.4rem)] leading-[1.02]"
                >
                  <RiseText text={title} />
                </p>
              </td>
              {[rent, agency].map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className="pb-6 pr-8 align-bottom text-lg font-semibold"
                >
                  <Glyph
                    kind={glyphs[i]}
                    delay={after + 200 + i * 220}
                    className="mb-6 size-24 lg:size-32"
                  />
                  {c}
                </th>
              ))}
              <th
                scope="col"
                className="rounded-t-[24px] bg-ink px-8 pb-6 pt-8 align-bottom text-xl font-semibold text-paper"
              >
                <Glyph
                  kind="key"
                  delay={after + 640}
                  className="mb-6 size-24 lg:size-32"
                />
                <span className="flex items-center gap-3">
                  <Logomark className="size-8" />
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

        {/* phones: the three ways as a legend, then a block per question */}
        <ul
          aria-hidden
          className="fade mt-12 grid grid-cols-3 gap-3 md:hidden"
          style={d(after)}
        >
          {columns.map((c, i) => (
            <li
              key={c}
              className={cn(
                "flex flex-col gap-3 rounded-2xl p-3 text-[13px] font-semibold leading-snug",
                i === 2 ? "bg-ink text-paper" : "border border-line",
              )}
            >
              <Glyph
                kind={glyphs[i]}
                delay={after + 200 + i * 220}
                className="size-12"
              />
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-10 md:hidden">
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
