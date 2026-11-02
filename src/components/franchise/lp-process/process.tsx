import Image from "next/image";

import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { PROCESS } from "@/content/franchise-page/process";
import { JIMMY, shown } from "@/content/proof";

import { ChannelMock, ReadyLine } from "./process-client";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const CARD = "rounded-[24px] bg-surface ring-1 ring-line";
const LIFT =
  "shadow-[0_0_0_1px_rgba(21,20,14,0.06),0_24px_48px_-28px_rgba(21,20,14,0.4)] transition-[rotate,translate] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:translate-y-[-4px] [@media(hover:hover)]:hover:rotate-0";
const ICON_BOX =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-lime text-ink";

const ICONS = {
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 1 1 21 11.5z" />,
  call: (
    <>
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </>
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </>
  ),
} as const;

/** Desktop grid placement and colours of each plan bar (12 weeks). */
const BARS = [
  { col: "min-[900px]:col-[1/3]", fill: "bg-ink", text: "text-paper", sub: "text-line-strong" },
  { col: "min-[900px]:col-[3/11]", fill: "bg-lime", text: "text-ink", sub: "text-ink/75" },
  {
    col: "min-[900px]:col-[11/13]",
    fill: "bg-surface ring-[1.5px] ring-ink ring-inset",
    text: "text-ink",
    sub: "text-muted",
  },
] as const;
const PAY_STYLE = [
  "min-[900px]:col-[1/5]",
  "min-[900px]:col-[6/10]",
  "min-[900px]:col-[10/13] min-[900px]:items-end min-[900px]:text-right",
] as const;

/**
 * /franchise How we build: the twelve weeks as a plan, the calls behind
 * them, what the visitor sees each week and who builds it.
 */
export function LpProcess() {
  const c = PROCESS;
  const post = c.post;
  const after = wordCount(c.title) * 40 + 300;
  // The post names the monthly figure: only while that claim is approved.
  const mrr = shown(JIMMY.mrr);
  const walls = [-2, 1.5, -1] as const;

  return (
    <Stage as="section" id="process" data-tone="paper" className="scroll-mt-[84px] pt-32">
      <Container className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3.5 text-center">
          <Kicker>{c.kicker}</Kicker>
          <h2 className="display text-[length:var(--text-title)] leading-[1.04]">
            <RiseText text={c.title} />
          </h2>
          <p className="fade m-0 max-w-[560px] text-lg leading-[1.55] text-muted" style={d(after)}>
            {c.lead}
          </p>
        </div>

        {/* The plan */}
        <Stage
          as="div"
          className={`${CARD} flex flex-col gap-5 p-5 shadow-[0_30px_70px_-36px_rgba(21,20,14,0.3)] sm:p-8`}
        >
          <div className="fade flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2" style={d(0)}>
            <h3 className="m-0 text-lg font-extrabold tracking-[-0.01em]">{c.plan.title}</h3>
            <p className="m-0 text-sm leading-[1.5] text-muted">
              <ReadyLine />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 min-[900px]:grid-cols-12 min-[900px]:gap-x-1 min-[900px]:gap-y-3">
            {c.plan.weeks.map((w) => (
              <span
                key={w}
                aria-hidden
                className="hidden text-center text-[11px] font-semibold text-faint min-[900px]:block"
              >
                {w}
              </span>
            ))}
            {c.plan.bars.map((b, i) => (
              <div
                key={b.id}
                className={`relative flex min-w-0 flex-col gap-0.5 px-3.5 py-3 ${BARS[i].col} ${BARS[i].text}`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 origin-left rounded-xl transition-transform duration-300 ease-[var(--ease-out)] motion-reduce:transition-none motion-reduce:scale-x-100! [[data-stage=pending]_&]:scale-x-0 ${BARS[i].fill}`}
                  style={{ transitionDelay: `${i * 110}ms` }}
                />
                <b className="relative text-sm leading-[1.3]">{b.title}</b>
                <span className={`relative text-[13px] leading-[1.4] ${BARS[i].sub}`}>{b.text}</span>
              </div>
            ))}
            {c.plan.payments.map((p, i) => (
              <div
                key={p.title}
                className={`fade flex min-w-0 flex-col gap-0.5 border-l-2 border-ink pl-3 min-[900px]:border-t-2 min-[900px]:border-l-0 min-[900px]:pt-3 min-[900px]:pl-0 ${PAY_STYLE[i]}`}
                style={d(500 + i * 90)}
              >
                <b className="text-sm">{p.title}</b>
                <span className="text-[13px] leading-[1.4] text-muted">{p.text}</span>
              </div>
            ))}
          </div>
          <p className="fade m-0 text-sm leading-[1.5] text-muted" style={d(800)}>
            {c.plan.note}
          </p>
        </Stage>

        {/* Calls and the post */}
        <Stage as="div" className="flex flex-col gap-8 pt-8 pb-4">
          <div className="fade flex flex-col gap-2 text-center" style={d(0)}>
            <h3 className="display m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.15] tracking-[-0.025em]">
              {c.calls.title}
            </h3>
            <p className="m-0 text-[15px] text-muted">{c.calls.note}</p>
          </div>
          <div
            role="region"
            aria-label="Calls and posts from our builds"
            tabIndex={0}
            className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-1 py-6 [scrollbar-width:none] min-[900px]:grid min-[900px]:snap-none min-[900px]:grid-cols-4 min-[900px]:gap-6 min-[900px]:overflow-visible min-[900px]:p-0 [&::-webkit-scrollbar]:hidden"
          >
            {c.calls.photos.map((p, i) => (
              <div
                key={p.src}
                className="fade max-[899px]:w-[min(300px,78%)] max-[899px]:shrink-0 max-[899px]:snap-center"
                style={d(120 + i * 90)}
              >
                <figure
                  className={`m-0 flex flex-col gap-2.5 rounded-2xl bg-surface px-2.5 pt-2.5 pb-3.5 ${LIFT}`}
                  style={{ rotate: `${walls[i]}deg` }}
                >
                  <Image
                    src={p.src}
                    alt={p.caption}
                    width={2000}
                    height={1178}
                    sizes="(min-width: 900px) 25vw, 72vw"
                    className="block h-[250px] w-full rounded-[10px] bg-line object-cover"
                  />
                  <figcaption className="px-1 text-[13px] leading-[1.4] text-muted">
                    {p.caption}
                  </figcaption>
                </figure>
              </div>
            ))}
            <div className="fade max-[899px]:w-[min(320px,82%)] max-[899px]:shrink-0 max-[899px]:snap-center" style={d(390)}>
              <figure
                className={`m-0 flex rotate-2 flex-col gap-3 rounded-[24px] bg-surface p-5 ${LIFT}`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={post.photo}
                    alt={post.name}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                  <div className="text-[13px] leading-[1.35] text-[#666]">
                    <strong className="text-[15px] text-ink">{post.name}</strong>{" "}
                    {post.connection}
                    <div>{post.headline}</div>
                    <div>{post.network}</div>
                  </div>
                </div>
                {mrr !== null ? (
                  <p className="m-0 text-[15px] leading-normal">{post.text(mrr)}</p>
                ) : null}
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  width={2000}
                  height={1188}
                  sizes="(min-width: 900px) 25vw, 78vw"
                  className="block h-[150px] w-full rounded-lg bg-line object-cover object-[left_top]"
                />
                <div className="flex flex-wrap items-center justify-between gap-x-3 border-t border-line pt-2.5 text-[13px] text-[#666]">
                  <span>{post.footer}</span>
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-semibold text-[#0A66C2] no-underline [@media(hover:hover)]:hover:underline"
                  >
                    {post.cta}
                  </a>
                </div>
              </figure>
            </div>
          </div>
        </Stage>

        {/* Every week, and the channel */}
        <Stage as="div" className="grid items-stretch gap-4 md:grid-cols-2">
          <div className={`fade ${CARD} flex flex-col gap-[18px] p-5 sm:p-7`} style={d(0)}>
            <h3 className="m-0 text-lg font-extrabold tracking-[-0.01em]">{c.weekly.title}</h3>
            {c.weekly.items.map((it) => (
              <div key={it.title} className="flex items-start gap-3">
                <span className={ICON_BOX}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {ICONS[it.icon]}
                  </svg>
                </span>
                <div>
                  <div className="text-[15px] leading-[1.3] font-bold">{it.title}</div>
                  <div className="mt-0.5 text-[13px] leading-[1.45] text-muted">{it.text}</div>
                </div>
              </div>
            ))}
            <div className="mt-auto flex flex-col gap-3.5 border-t border-line pt-4">
              <div className="text-xs font-semibold tracking-[0.06em] text-muted uppercase">
                {c.weekly.team.label}
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-3.5">
                {c.weekly.team.people.map((p) => (
                  <div key={p.name} className="flex items-center gap-2.5">
                    <Image
                      src={p.photo}
                      alt={p.name}
                      width={44}
                      height={44}
                      className="size-11 shrink-0 rounded-xl bg-line object-cover"
                    />
                    <div>
                      <div className="text-sm font-bold">{p.name}</div>
                      <div className="text-[13px] leading-[1.45] text-muted">{p.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="fade" style={d(120)}>
            <ChannelMock />
          </div>
        </Stage>
      </Container>
    </Stage>
  );
}
