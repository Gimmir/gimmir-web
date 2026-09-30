import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { saas } from "@/content/saas";
import { cn } from "@/lib/cn";

/* /build-your-saas ⑦, who it's not for, drawn as an honest filter: the
   kinds of product we build run through it in lime into "We build it";
   the two we don't stop at it, get struck through, and say why.

   Desktop is one plan in a 1200 × 440 box stretched across the row (the
   height stays 440, so only x scales). Phones read top to bottom: what
   passes, the filter, where it lands, then what stopped. Each dashed lime
   line is revealed through a mask whose solid stroke draws in (a dashed
   path can't draw itself: its dashes are the dasharray). */

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

// desktop rows (chip tops, px); a chip is 40 tall, so its line runs at +20
const PASS_Y = [20, 84, 148, 212];
const STOP_Y = [300, 380];
// where the lines start (just past the widest chip), stop (the filter at
// 48%) and land (the card's left edge at 72%, its middle at 136)
const FROM = 190;
const GATE = 572;
const LAND: [number, number] = [860, 136];

const passPath = (y: number) =>
  `M${FROM} ${y + 20}C520 ${y + 20} 700 ${y + 20} ${LAND[0]} ${LAND[1]}`;

// phones: two streams from the chip columns (25% and 75%) into the middle
const PHONE_PATHS = [
  "M90 0C90 55 180 50 180 110",
  "M270 0C270 55 180 50 180 110",
];

const DASH = {
  fill: "none",
  stroke: "var(--color-lime)",
  strokeWidth: 1.4,
  strokeDasharray: "4 6",
} as const;

function Chip({
  label,
  stopped,
  strikeAt,
  className,
  style,
}: {
  label: string;
  stopped?: boolean;
  strikeAt?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn(
        "fade whitespace-nowrap rounded-full px-4 py-2.5 text-[15px] font-semibold leading-[1.25] ring-1 ring-line-dark",
        stopped ? "text-paper/50" : "bg-ink-soft",
        className,
      )}
      style={style}
    >
      <span className="relative">
        {label}
        {stopped && (
          <span
            aria-hidden
            className="wipe absolute inset-x-0 top-[55%] h-[1.5px] bg-paper/60"
            style={at(strikeAt ?? 0, 400)}
          />
        )}
      </span>
    </span>
  );
}

function Landing({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { to } = saas.notFor;
  return (
    <div
      className={cn(
        "fade rounded-[24px] bg-paper p-[22px] text-ink",
        className,
      )}
      style={style}
    >
      <p className="display text-2xl leading-none">{to.title}</p>
      <p className="mt-2 text-sm text-muted">{to.line}</p>
    </div>
  );
}

function Why({ line, advice }: { line: string; advice: string }) {
  return (
    <>
      <p className="text-[15px] font-semibold leading-snug">{line}</p>
      <p className="mt-1 font-serif text-lg italic leading-snug text-paper/70">
        {advice}
      </p>
    </>
  );
}

export function SaasNotFor() {
  const { title, lede, filter, pass, stopped, items } = saas.notFor;
  const t = wordCount(title) * 40 + 300;
  // the beats: chips settle, the filter appears, lines run, words land
  const chipAt = (i: number) => t + i * 60;
  const gateAt = t + 250;
  const passAt = (i: number) => t + 450 + i * 100;
  const landAt = t + 1200;
  const stopAt = (k: number) => t + 500 + k * 150;
  const strikeAt = (k: number) => t + 1100 + k * 150;
  const whyAt = (k: number) => t + 1250 + k * 150;

  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade font-serif text-2xl italic leading-snug text-paper/70"
            style={at(t - 200)}
          >
            {lede}
          </p>
        </div>

        {/* desktop: one plan */}
        <div className="relative mt-16 hidden h-[440px] lg:block">
          <svg
            aria-hidden
            viewBox="0 0 1200 440"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              {PASS_Y.map((y, i) => (
                <mask
                  key={y}
                  id={`saas-pass-${i}`}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={1200}
                  height={440}
                >
                  <path
                    d={passPath(y)}
                    pathLength={1}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={14}
                    className="draw"
                    style={at(passAt(i), 900)}
                  />
                </mask>
              ))}
            </defs>
            {PASS_Y.map((y, i) => (
              <path
                key={y}
                d={passPath(y)}
                {...DASH}
                mask={`url(#saas-pass-${i})`}
              />
            ))}
            {STOP_Y.map((y, k) => (
              <path
                key={y}
                d={`M${FROM} ${y + 20}H${GATE}`}
                pathLength={1}
                fill="none"
                stroke="var(--color-paper)"
                strokeOpacity={0.3}
                strokeWidth={1.4}
                className="draw"
                style={at(stopAt(k), 600)}
              />
            ))}
          </svg>

          {pass.map((label, i) => (
            <Chip
              key={label}
              label={label}
              className="absolute left-0"
              style={{ ...at(chipAt(i)), top: PASS_Y[i] }}
            />
          ))}
          {items.map((it, k) => (
            <Chip
              key={it.chip}
              label={it.chip}
              stopped
              strikeAt={strikeAt(k)}
              className="absolute left-0"
              style={{ ...at(chipAt(pass.length + k)), top: STOP_Y[k] }}
            />
          ))}

          {/* the filter */}
          <div
            aria-hidden
            className="fade absolute bottom-0 left-[48%] top-2 w-0.5"
            style={{
              ...at(gateAt),
              backgroundImage:
                "repeating-linear-gradient(rgba(246,244,238,0.7) 0 10px, transparent 10px 18px)",
            }}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.04em] text-paper/50">
              {filter}
            </span>
          </div>

          {items.map((it, k) => (
            <div
              key={it.line}
              className="fade absolute left-[52%] w-[44%]"
              style={{ ...at(whyAt(k)), top: STOP_Y[k] - 2 }}
            >
              <Why line={it.line} advice={it.advice} />
            </div>
          ))}

          <Landing
            className="absolute right-0 top-[92px] w-[28%]"
            style={at(landAt)}
          />
        </div>

        {/* phones and tablets: top to bottom */}
        <div className="mt-12 lg:hidden">
          <ul className="grid grid-cols-2 justify-items-center gap-2.5">
            {pass.map((label, i) => (
              <li key={label} className="contents">
                <Chip label={label} style={at(chipAt(i))} />
              </li>
            ))}
          </ul>
          <div className="relative h-[110px]">
            <svg
              aria-hidden
              viewBox="0 0 360 110"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <defs>
                {PHONE_PATHS.map((d, i) => (
                  <mask
                    key={d}
                    id={`saas-pass-m-${i}`}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={360}
                    height={110}
                  >
                    <path
                      d={d}
                      pathLength={1}
                      fill="none"
                      stroke="#fff"
                      strokeWidth={14}
                      className="draw"
                      style={at(passAt(i), 900)}
                    />
                  </mask>
                ))}
              </defs>
              {PHONE_PATHS.map((d, i) => (
                <path key={d} d={d} {...DASH} mask={`url(#saas-pass-m-${i})`} />
              ))}
            </svg>
            {/* the filter, across the streams */}
            <div
              aria-hidden
              className="fade absolute inset-x-0 top-1/2 flex items-center"
              style={at(gateAt)}
            >
              <span className="h-0.5 flex-1 [background-image:repeating-linear-gradient(90deg,rgba(246,244,238,0.7)_0_10px,transparent_10px_18px)]" />
              <span className="bg-ink pl-3 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/50">
                {filter}
              </span>
            </div>
          </div>
          <Landing className="text-center" style={at(landAt)} />

          <p
            className="fade mt-10 font-mono text-[11px] uppercase tracking-[0.04em] text-paper/50"
            style={at(stopAt(0))}
          >
            {stopped}
          </p>
          <ul className="mt-4 flex flex-col gap-6">
            {items.map((it, k) => (
              <li key={it.chip}>
                <Chip
                  label={it.chip}
                  stopped
                  strikeAt={strikeAt(k)}
                  className="inline-block"
                  style={at(stopAt(k))}
                />
                <div className="fade mt-3" style={at(whyAt(k))}>
                  <Why line={it.line} advice={it.advice} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Stage>
  );
}
