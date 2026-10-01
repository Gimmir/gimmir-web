import Image from "next/image";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { BookTrigger } from "@/components/blocks/book-trigger";
import { FaqSection } from "@/components/blocks/faq-section";
import { InlineHeadline } from "@/components/blocks/inline-headline";
import { withMentions } from "@/components/blocks/mention";
import { Container } from "@/components/ui/container";
import { ArrowRight, Check, X } from "@/components/ui/icons";
import {
  CaseAudienceLink,
  CaseBackLink,
  CaseQuote,
  ProductLinks,
} from "@/components/work/parts";
import { jimmy } from "@/content/jimmy";
import type { CaseStudy } from "@/lib/cases";
import { FOUNDERS } from "@/lib/founders";
import { person } from "@/lib/people";
import { cn } from "@/lib/cn";

/* /work/jimmy-coach, V2 (doc 09 §3.6): a founder story, not a vendor
   case. The request (Jimmy's own before/after) → the decision to invest →
   the product (client app, coach mode, web dashboard) → three decisions as
   owners → what we got wrong, with its fix → the numbers with their date →
   Quentin's words once approved → the call signed by Nazar (Jimmy is his;
   Oleh wasn't part of it). Every picture is a real product screen. */

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

type Screen = { src: string; alt: string; width: number; height: number };

// the phone screens come in their device frame, with transparent corners,
// so their shadow follows the frame instead of a box
const PHONE_SHADOW = "drop-shadow-[0_24px_30px_rgba(21,20,14,0.22)]";

function Shot({
  screen,
  sizes,
  priority,
  className,
}: {
  screen: Screen;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={screen.src}
      alt={screen.alt}
      width={screen.width}
      height={screen.height}
      sizes={sizes}
      priority={priority}
      className={cn("h-auto w-full", className)}
    />
  );
}

function Label({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "fade text-[15px] font-medium",
        dark ? "text-paper/50" : "text-faint",
      )}
    >
      {children}
    </p>
  );
}

function Hero({ data }: { data: CaseStudy }) {
  const { headline, people, sub, screens } = jimmy.hero;
  return (
    <Stage as="section" eager data-tone="paper" className="relative">
      <Container className="grid gap-14 pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36 lg:min-h-[92svh] lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <div className="fade" style={d(0)}>
            <CaseBackLink />
          </div>
          <p
            className="fade mt-10 flex flex-wrap items-center gap-3"
            style={d(80)}
          >
            <Image
              src={data.logo}
              alt=""
              width={44}
              height={44}
              priority
              className="size-11 rounded-xl object-cover"
            />
            <span className="text-xl font-extrabold tracking-tight">
              {data.name}
            </span>
            <span className="rounded-full border border-line px-3 py-1 text-[13px] text-muted">
              {data.tag}
            </span>
          </p>
          <h1 className="display mt-8 text-[clamp(2.4rem,1rem+3.4vw,4.25rem)] leading-[1.0]">
            <InlineHeadline tokens={headline} />
          </h1>
          {/* the two faces in the headline, named */}
          <ul className="fade mt-8 flex flex-wrap gap-3" style={d(500)}>
            {people.map(({ id, line }) => {
              const p = person(id);
              return (
                <li
                  key={id}
                  className="flex items-center gap-3 rounded-[18px] bg-surface py-2.5 pl-2.5 pr-4 ring-1 ring-line"
                >
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-paper-2">
                    <Image
                      src={p.photo}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover object-top"
                    />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[15px] font-bold">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-muted">
                      {line}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p
            // no fade: on a phone this is the largest thing on screen, and
            // a fade from zero (run on the GPU) isn't counted as shown until
            // the whole hero has played, which held LCP back by seconds
            className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl"
          >
            {sub}
          </p>
          <ProductLinks
            links={jimmy.links}
            className="fade mt-8"
            style={d(300)}
          />
        </div>
        <div
          className="fade relative mx-auto flex w-full max-w-[600px] items-center justify-center lg:col-span-5"
          style={d(400)}
        >
          {screens.map((s, n) => (
            <div
              key={s.src}
              className={cn(
                "relative",
                n === 1 ? "z-10 w-[38%]" : "w-[31%]",
                n === 0 && "-mr-[6%] -rotate-[5deg] translate-y-[6%]",
                n === 2 && "-ml-[6%] rotate-[5deg] translate-y-[6%]",
              )}
            >
              <Shot
                screen={s}
                priority={n === 1}
                sizes="(min-width: 1024px) 230px, 38vw"
                className={PHONE_SHADOW}
              />
            </div>
          ))}
        </div>
      </Container>
    </Stage>
  );
}

/** The tools in the before and after panels, in the site's thin line. */
const TOOL_ICONS: Record<string, React.ReactNode> = {
  chat: (
    <path d="M5 5.5h14a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2h-7l-4.5 3.2V17H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" />
  ),
  grid: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M3.5 14.5h17M9.5 4v16" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7.5L19 7.5V21H7Z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  dumbbell: <path d="M6.5 7.5v9M17.5 7.5v9M3.5 10v4M20.5 10v4M6.5 12h11" />,
  people: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M15.5 14.6c2.8 0 5 1.6 5 4.4" />
    </>
  ),
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10 9.5 4.5 2.5-4.5 2.5Z" />
    </>
  ),
};

function ToolIcon({ name }: { name: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      {TOOL_ICONS[name]}
    </svg>
  );
}

function Origin() {
  const { label, title, body, before, after } = jimmy.origin;
  const t = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Label dark>{label}</Label>
            <h2 className="display mt-6 text-[length:var(--text-title)] leading-[1.02]">
              <RiseText text={title} />
            </h2>
          </div>
          <p
            className="fade max-w-[46ch] text-lg leading-relaxed text-paper/70 md:text-xl lg:col-span-5"
            style={d(t)}
          >
            {withMentions(body, { onDark: true })}
          </p>
        </div>

        {/* before and after, as on UN1T: the tools he left, dashed and
            crossed out, beside the one app he co-owns, on lime */}
        <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2 md:gap-4">
          <div
            className="fade rounded-[28px] border-[1.5px] border-dashed border-paper/20 p-6 sm:p-8"
            style={d(t + 150)}
          >
            <p className="text-sm font-semibold text-paper/50">
              {before.label}
            </p>
            <h3 className="display mt-3 text-[clamp(1.5rem,1rem+1.2vw,2.1rem)] leading-[1.05] text-paper/85">
              {before.title}
            </h3>
            <ul className="mt-7 flex flex-col gap-2.5">
              {before.items.map((it) => (
                <li
                  key={it.tool}
                  className="flex items-center gap-3.5 rounded-2xl bg-paper/5 px-4 py-3.5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-paper/8 text-paper/55">
                    <ToolIcon name={it.icon} />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <s className="block font-bold text-paper/70 decoration-paper/50">
                      {it.tool}
                    </s>
                    <span className="mt-1 block text-sm text-paper/50">
                      {it.note}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto flex size-[30px] shrink-0 items-center justify-center rounded-full border border-line-dark text-paper/50"
                  >
                    <X className="size-3" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="fade rounded-[28px] bg-lime p-6 text-ink sm:p-8"
            style={d(t + 270)}
          >
            <p className="text-sm font-semibold">{after.label}</p>
            <h3 className="display mt-3 text-[clamp(1.5rem,1rem+1.2vw,2.1rem)] leading-[1.05]">
              {after.title}
            </h3>
            <ul className="mt-7 flex flex-col gap-2.5">
              {after.items.map((it) => (
                <li
                  key={it.tool}
                  className="flex items-center gap-3.5 rounded-2xl bg-white/55 px-4 py-3.5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-ink text-lime">
                    <ToolIcon name={it.icon} />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block font-bold">{it.tool}</span>
                    <span className="mt-1 block text-sm text-ink/65">
                      {it.note}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto flex size-[30px] shrink-0 items-center justify-center rounded-full bg-ink text-lime"
                  >
                    <Check className="size-3.5" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Stage>
  );
}

/** A row of facts on one of the two decision cards. */
function Facts({
  rows,
  termClassName,
  valueClassName,
}: {
  rows: readonly { term: string; value: string }[];
  termClassName?: string;
  valueClassName?: string;
}) {
  return (
    <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 pt-8 text-[15px] sm:text-base">
      {rows.map(({ term, value }) => (
        <div key={term} className="contents">
          <dt className={termClassName}>{term}</dt>
          <dd className={cn("font-semibold", valueClassName)}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The stamp on a decision card: in the flow on a phone, pinned to the
 *  top corner from sm up. Last in the DOM so it reads after the title. */
const STAMP =
  "order-first mb-4 self-start rounded-[10px] px-3 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.06em] sm:absolute sm:right-7 sm:top-7 sm:mb-0";

function Invest() {
  const { label, title, body, quote, invoice, cofounders } = jimmy.invest;
  const by = FOUNDERS[quote.by];
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Label>{label}</Label>
          <h2 className="display mt-6 text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade mt-8 max-w-[48ch] text-lg leading-relaxed text-muted md:text-xl"
            style={d(after)}
          >
            {withMentions(body)}
          </p>
        </div>
        <figure className="fade self-end lg:col-span-5" style={d(after + 150)}>
          <blockquote className="font-serif text-[clamp(1.6rem,1rem+1.4vw,2.25rem)] italic leading-snug">
            “{quote.text}”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted">
            <span className="relative size-9 overflow-hidden rounded-full bg-paper-2">
              <Image
                src={by.photo}
                alt=""
                fill
                sizes="72px"
                className="object-cover object-top"
              />
            </span>
            {by.first}, {by.also}
          </figcaption>
        </figure>

        {/* the invoice he never sent, beside what he did instead */}
        <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:col-span-12 lg:mt-6">
          <div
            className="fade relative flex min-h-[300px] flex-col rounded-[28px] bg-surface p-6 text-faint ring-1 ring-line sm:p-8"
            style={d(after + 300)}
          >
            <div className="sm:pr-32">
              <p className="text-sm font-semibold">{invoice.label}</p>
              <h3 className="display mt-3 text-[clamp(1.5rem,1rem+1.2vw,2.1rem)] leading-[1.05] text-ink/45">
                {invoice.title}
              </h3>
            </div>
            <p
              className={cn(
                STAMP,
                "-rotate-[8deg] border-2 border-ink/15 text-faint",
              )}
            >
              {invoice.stamp}
            </p>
            <Facts
              rows={invoice.rows}
              valueClassName="line-through decoration-ink/30"
            />
          </div>

          <div
            className="fade relative flex min-h-[300px] flex-col rounded-[28px] bg-ink p-6 text-paper sm:p-8"
            style={d(after + 420)}
          >
            <div className="sm:pr-32">
              <p className="text-sm font-semibold text-paper/60">
                {cofounders.label}
              </p>
              <h3 className="display mt-3 text-[clamp(1.5rem,1rem+1.2vw,2.1rem)] leading-[1.05]">
                {cofounders.title}
              </h3>
            </div>
            <p className={cn(STAMP, "rotate-[6deg] bg-lime text-ink")}>
              {cofounders.stamp}
            </p>
            <div className="mt-5 flex">
              {cofounders.faces.map((id, n) => (
                <span
                  key={id}
                  className={cn(
                    "relative size-12 overflow-hidden rounded-full bg-ink-soft ring-[3px] ring-ink",
                    n > 0 && "-ml-3",
                  )}
                >
                  <Image
                    src={person(id).photo}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </span>
              ))}
            </div>
            <Facts rows={cofounders.rows} termClassName="text-paper/60" />
          </div>
        </div>
      </Container>
    </Stage>
  );
}

type ProductCard = (typeof jimmy.product.cards)[number];

function CardText({ card }: { card: ProductCard }) {
  return (
    <>
      <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-faint">
        {card.tag}
      </p>
      <h3 className="mt-3 text-2xl font-bold tracking-[-0.01em] md:text-3xl">
        {card.title}
      </h3>
    </>
  );
}

/** Two phones in a tile, the second a step lower, both running off the
 *  bottom edge. */
function PhoneRow({ card, flip }: { card: ProductCard; flip?: boolean }) {
  return (
    <Stage className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div className={cn("fade lg:col-span-4", flip && "lg:order-2")}>
        <CardText card={card} />
        <p className="mt-3 max-w-[40ch] text-lg leading-relaxed text-muted">
          {card.body}
        </p>
      </div>
      <div
        className="fade relative aspect-[6/5] overflow-hidden rounded-[24px] bg-paper-2 ring-1 ring-line sm:aspect-[3/2] lg:col-span-8"
        style={d(150)}
      >
        <div className="absolute inset-x-0 top-0 flex justify-center gap-[5%] px-6 pt-10 md:pt-14">
          {card.screens.map((s, i) => (
            <div
              key={s.src}
              className={cn(
                "w-[40%] max-w-[250px]",
                i === 1 && "mt-10 md:mt-16",
              )}
            >
              <Shot
                screen={s}
                sizes="(min-width: 1024px) 250px, 40vw"
                className={PHONE_SHADOW}
              />
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

function DashboardRow({ card }: { card: ProductCard }) {
  return (
    <Stage>
      <div className="fade grid gap-x-10 gap-y-3 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-4">
          <CardText card={card} />
        </div>
        <p className="max-w-[56ch] text-lg leading-relaxed text-muted lg:col-span-8">
          {card.body}
        </p>
      </div>
      <figure className="fade mt-8" style={d(150)}>
        <div className="rounded-[24px] bg-paper-2 p-2 ring-1 ring-line sm:p-4 md:p-6">
          {card.screens.map((s) => (
            <Shot
              key={s.src}
              screen={s}
              sizes="(min-width: 1280px) 1180px, 94vw"
            />
          ))}
        </div>
        {"caption" in card && (
          <figcaption className="mt-3 text-sm text-faint">
            {card.caption}
          </figcaption>
        )}
      </figure>
    </Stage>
  );
}

function Product() {
  const { label, title, cards } = jimmy.product;
  const [client, coach, dashboard] = cards;
  return (
    <section data-tone="paper" className="border-t border-line bg-paper-2/60">
      <Container className="py-20 md:py-28">
        <Stage>
          <Label>{label}</Label>
          <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
        </Stage>
        <div className="mt-12 grid gap-16 md:mt-16 md:gap-24">
          <PhoneRow card={client} />
          <PhoneRow card={coach} flip />
          <DashboardRow card={dashboard} />
        </div>
      </Container>
    </section>
  );
}

function Decisions() {
  const { label, items, screen, caption } = jimmy.decisions;
  return (
    <section data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <Stage>
          <h2 className="display max-w-[16ch] text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={label} />
          </h2>
          <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
            {items.map((it, i) => (
              <li
                key={it.title}
                className="fade flex flex-col gap-6 rounded-[24px] bg-ink-soft p-6 ring-1 ring-line-dark md:p-7"
                style={d(wordCount(label) * 40 + 300 + i * 90)}
              >
                <span className="display text-[3.5rem] leading-[0.85] text-transparent [-webkit-text-stroke:1.2px_var(--color-lime)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.01em]">
                    {it.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-paper/70">
                    {it.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Stage>
        <Stage as="figure" className="mt-4 md:mt-6">
          <div className="fade rounded-[24px] bg-ink-soft p-2 ring-1 ring-line-dark sm:p-4 md:p-6">
            <Shot screen={screen} sizes="(min-width: 1280px) 1180px, 94vw" />
          </div>
          <figcaption
            className="fade mt-3 font-mono text-[12px] uppercase tracking-[0.04em] text-lime"
            style={d(150)}
          >
            {caption}
          </figcaption>
        </Stage>
      </Container>
    </section>
  );
}

function Wrong() {
  const { label, items, screen, caption } = jimmy.wrong;
  const after = wordCount(label) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-28 lg:grid-cols-12">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02] lg:col-span-5">
          <RiseText text={label} />
        </h2>
        <ul className="lg:col-span-7 lg:row-span-2">
          {items.map((it, i) => (
            <li
              key={it.title}
              className="fade border-t border-line py-7 last:border-b"
              style={d(after + i * 90)}
            >
              <h3 className="text-xl font-bold tracking-[-0.01em] md:text-2xl">
                {it.title}
              </h3>
              <p className="mt-2 max-w-[60ch] text-lg leading-relaxed text-muted">
                {it.body}
              </p>
            </li>
          ))}
        </ul>
        <figure
          className="fade flex items-end gap-5 lg:col-span-5 lg:row-start-2 lg:gap-6"
          style={d(after + items.length * 90 + 150)}
        >
          <div className="w-[46%] max-w-[230px] shrink-0">
            <Shot
              screen={screen}
              sizes="(min-width: 1024px) 230px, 46vw"
              className={PHONE_SHADOW}
            />
          </div>
          <figcaption className="max-w-[30ch] pb-6 text-sm leading-relaxed text-muted">
            {caption}
          </figcaption>
        </figure>
      </Container>
    </Stage>
  );
}

function Numbers({ data }: { data: CaseStudy }) {
  const { label, date, stat, side } = jimmy.numbers;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <Label dark>{label}</Label>
          <OutlineStat
            value={stat.value}
            label={stat.label}
            layout="wide"
            delay={300}
            className="mt-6 max-w-[620px]"
          />
        </div>
        <div className="lg:col-span-5">
          <p
            className="fade font-mono text-[12px] uppercase tracking-[0.04em] text-lime"
            style={d(900)}
          >
            {date}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6">
            {side.map((s, i) => (
              <div
                key={s.label}
                className="fade border-t border-line-dark pt-4"
                style={d(1000 + i * 90)}
              >
                <p className="display text-[clamp(2.5rem,1.5rem+2vw,3.5rem)] leading-none">
                  {s.value}
                </p>
                <p className="mt-2 text-paper/65">{s.label}</p>
              </div>
            ))}
          </div>
          <CaseQuote
            quote={data.quote}
            className="mt-12 [&_blockquote]:text-paper"
          />
        </div>
      </Container>
    </Stage>
  );
}

/** The call, signed by Nazar alone: Jimmy is his founder story. */
function Close() {
  const { title, line } = jimmy.close;
  const nazar = FOUNDERS.nazar;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <div className="fade grid items-center gap-8 rounded-[32px] bg-ink p-7 text-paper sm:p-10 md:grid-cols-[auto_1fr] md:gap-12 md:p-14">
          <div className="relative size-28 overflow-hidden rounded-full bg-ink-soft md:size-44">
            <Image
              src={nazar.photo}
              alt={`${nazar.name}, ${nazar.also}`}
              fill
              sizes="176px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
              {title}
            </h2>
            <p className="mt-5 max-w-[40ch] font-serif text-2xl italic leading-snug text-paper/85">
              “{line}”{" "}
              <span className="whitespace-nowrap font-sans text-sm not-italic text-paper/60">
                {nazar.first}, {nazar.also}
              </span>
            </p>
            <BookTrigger
              booking="founderReview"
              placement="jimmy-close"
              className="group mt-8 flex w-full items-center justify-between gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-left text-ink transition-colors duration-200 hover:bg-lime active:scale-[0.97] sm:inline-flex sm:w-auto"
            >
              <span className="text-base font-semibold leading-snug">
                Book a founder review
              </span>
              <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="size-4" />
              </span>
            </BookTrigger>
            <div className="mt-6">
              <CaseAudienceLink
                href="/build-your-saas"
                label="Turn your business into a SaaS you own"
                onDark
              />
            </div>
          </div>
        </div>
      </Container>
    </Stage>
  );
}

export function JimmyCaseStudy({ data }: { data: CaseStudy }) {
  return (
    <article>
      <Hero data={data} />
      <Origin />
      <Invest />
      <Product />
      <Decisions />
      <Wrong />
      <Numbers data={data} />
      <FaqSection title={jimmy.faq.title} items={jimmy.faq.items} />
      <Close />
    </article>
  );
}
