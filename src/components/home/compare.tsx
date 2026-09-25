import { Dot, Glyph, type GlyphKind } from "@/components/home/compare-art";
import { CompareOnPhone } from "@/components/home/compare-phone";
import { GRAIN } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { Logomark } from "@/components/ui/logomark";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * ⑤ The enemy, on paper: three ways to get your software, side by side,
 * each with its drawn glyph. Our column is the one dark card, a lime dot
 * on each answer and lime light behind it; the other two stay plain. A
 * real table on wide screens; on phones, two columns: ours and whichever
 * of theirs you pick.
 */
export function Compare() {
  const { title, columns, rows } = home.compare;
  const [rent, agency, ours] = columns;
  const glyphs: GlyphKind[] = ["lock", "hourglass", "key"];
  const after = wordCount(title) * 40 + 300;
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

        {/* phones: us against one of them at a time, switched by a tap */}
        <CompareOnPhone columns={columns} rows={rows} delay={after} />
      </Container>
    </Stage>
  );
}
