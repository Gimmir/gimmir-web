import Image from "next/image";

import { CtaBand } from "@/components/franchise/cta-band";
import { Kicker } from "@/components/franchise/kicker";
import { Mark } from "@/components/franchise/lp-numbers/shared";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { jimmyMrrSentence, LIVE_WORK } from "@/content/franchise-page/proof";
import { CHATS, JIMMY, JIMMY_APP_STORE, shown, UN1T } from "@/content/proof";
import { GUESTS } from "@/lib/people";

import { SiteLink, StoreBadge } from "./app-store-button";
import {
  IMessageContact,
  IMessageThread,
  WhatsAppThread,
} from "./whatsapp-thread";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="display text-[22px] leading-none font-extrabold tracking-[-0.035em]">
        {value}
      </div>
      <div className="mt-1 text-xs leading-[1.5] text-muted">{label}</div>
    </div>
  );
}

const TILT =
  "transition-[rotate,translate] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:translate-y-[-4px] [@media(hover:hover)]:hover:rotate-0";

/**
 * /franchise Proof: UN1T's app and chats, then Jimmy as a product we own.
 * Stats, chats and the Jimmy figure come from `src/content/proof` and
 * render only while approved; a pending claim leaves its slot out.
 */
export function LpProof() {
  const c = LIVE_WORK;
  const studios = shown(UN1T.studios);
  const members = shown(UN1T.members);
  const mrr = shown(JIMMY.mrr);
  const threads = [shown(CHATS.rob), shown(CHATS.emma)].filter(
    (t) => t !== null,
  );
  const quentin = shown(CHATS.quentin);
  const after = wordCount(`${c.title.lead} ${c.title.mark}`) * 40 + 300;
  const un1tStats = [
    studios !== null
      ? { value: String(studios), label: c.un1t.studiosLabel }
      : null,
    members !== null ? { value: members, label: c.un1t.membersLabel } : null,
  ].filter((s) => s !== null);

  return (
    <>
      <Stage
        as="section"
        id="proof"
        data-tone="paper"
        className="scroll-mt-[84px] pt-32"
      >
        <Container className="flex flex-col gap-12">
          <div className="mx-auto flex max-w-[1040px] flex-col items-center gap-[18px] text-center">
            <Kicker>{c.kicker}</Kicker>
            <h2 className="display text-[length:var(--text-title)] leading-[1.04]">
              <RiseText text={c.title.lead} />{" "}
              <Mark>
                <RiseText text={c.title.mark} start={wordCount(c.title.lead)} />
              </Mark>
            </h2>
            <p
              className="fade m-0 max-w-[560px] text-lg leading-[1.55] text-muted"
              style={d(after)}
            >
              {c.lead}
            </p>
          </div>

          <Stage as="div" className="relative mt-3">
            <div className="fade" style={d(0)}>
              <Image
                src="/franchise/un1t-members.webp"
                alt={c.un1t.photoAlt}
                width={2000}
                height={882}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="block h-[clamp(340px,44vw,560px)] w-full rounded-[32px] bg-line object-cover"
              />
            </div>
            <div
              className="fade relative mx-4 -mt-16 flex flex-col gap-3.5 rounded-[20px] bg-surface p-[22px] shadow-[inset_0_0_0_1px_var(--color-line),0_30px_60px_-30px_rgba(21,20,14,0.45)] sm:p-[26px] min-[901px]:absolute min-[901px]:bottom-6 min-[901px]:left-6 min-[901px]:mx-0 min-[901px]:mt-0 min-[901px]:w-[min(460px,calc(100%-48px))]"
              style={d(150)}
            >
              <Kicker>{c.un1t.kicker}</Kicker>
              <h3 className="display m-0 text-2xl leading-[1.15] tracking-[-0.02em]">
                {c.un1t.headline}
              </h3>
              {un1tStats.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5 border-y border-line py-3">
                  {un1tStats.map((s) => (
                    <Stat key={s.label} {...s} />
                  ))}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2.5">
                <StoreBadge
                  store="apple"
                  href={UN1T.appStore.url}
                  label={c.un1t.storeLabel}
                />
                <StoreBadge
                  store="play"
                  href={UN1T.playStore.url}
                  label={c.un1t.playLabel}
                />
                <SiteLink href={c.un1t.siteHref}>{c.un1t.siteLabel}</SiteLink>
              </div>
            </div>
          </Stage>

          {threads.length > 0 ? (
            <Stage as="div" className="flex flex-col items-center gap-7 pt-4">
              <div
                className="fade flex flex-col gap-2 text-center"
                style={d(0)}
              >
                <h3 className="display m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.15] tracking-[-0.025em]">
                  {c.chats.title}
                </h3>
                <p className="m-0 text-[15px] text-muted">{c.chats.note}</p>
              </div>
              <div className="grid w-full max-w-[940px] items-start gap-8 md:grid-cols-2">
                {threads.map((t, i) => (
                  <WhatsAppThread
                    key={t.id}
                    thread={t}
                    tilt={i % 2 === 0 ? "left" : "right"}
                    delay={120 + i * 100}
                  />
                ))}
              </div>
            </Stage>
          ) : null}

          <Stage
            as="div"
            className="grid items-center gap-10 pt-8 md:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
          >
            <div className="flex flex-col gap-3.5">
              <div className="fade" style={d(0)}>
                <Kicker>{c.jimmy.kicker}</Kicker>
              </div>
              <h3
                className="fade display m-0 text-[clamp(26px,3vw,32px)] leading-[1.1] tracking-[-0.025em]"
                style={d(60)}
              >
                {c.jimmy.headline}
              </h3>
              <p
                className="fade m-0 text-base leading-normal text-muted"
                style={d(120)}
              >
                {c.jimmy.text}
                {jimmyMrrSentence(mrr)}
              </p>
              <div
                className="fade mt-1.5 flex flex-wrap gap-2.5"
                style={d(180)}
              >
                <StoreBadge
                  store="apple"
                  href={JIMMY_APP_STORE}
                  label={c.jimmy.storeLabel}
                />
                <StoreBadge
                  store="play"
                  href={c.jimmy.playHref}
                  label={c.jimmy.playLabel}
                />
                <SiteLink href={c.jimmy.siteHref}>{c.jimmy.siteLabel}</SiteLink>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="fade ml-auto w-full lg:w-[86%]" style={d(100)}>
                <Image
                  src="/franchise/jimmy-dashboard.webp"
                  alt={c.jimmy.dashboardAlt}
                  width={2000}
                  height={1328}
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                  className={`block h-[clamp(220px,28vw,300px)] w-full rotate-[1.5deg] rounded-[20px] bg-line object-cover object-top shadow-[0_0_0_1px_rgba(21,20,14,0.06),0_24px_48px_-28px_rgba(21,20,14,0.4)] ${TILT}`}
                />
              </div>
              {/* Quentin, named and pictured with his OK; his own words join
                  as an iMessage once he has sent them (CHATS.quentin) */}
              <div
                className="fade relative z-10 -mt-12 w-[88%] sm:w-[68%]"
                style={d(220)}
              >
                <div className={`-rotate-2 ${TILT}`}>
                  {quentin !== null ? (
                    <IMessageThread thread={quentin} />
                  ) : (
                    <IMessageContact
                      name={GUESTS.quentin.name}
                      photo={GUESTS.quentin.photo}
                      role={c.jimmy.quentinRole}
                      note={c.jimmy.quentinNote}
                    />
                  )}
                </div>
              </div>
            </div>
          </Stage>
        </Container>
      </Stage>
      <CtaBand
        className="mt-28"
        title={c.band.title}
        note={c.band.note}
        placement={c.band.placement}
      />
    </>
  );
}
