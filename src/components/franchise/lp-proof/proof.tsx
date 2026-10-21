import Image from "next/image";

import { ChapterBridge } from "@/components/franchise/chapters";
import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { LIVE_WORK } from "@/content/franchise-page/proof";
import { CHATS, JIMMY, JIMMY_APP_STORE, shown, UN1T } from "@/content/proof";
import { APPS } from "@/lib/apps";

import { AppStoreButton, SiteLink } from "./app-store-button";
import { WhatsAppThread } from "./whatsapp-thread";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="display text-[26px] leading-none font-extrabold tracking-[-0.035em]">
        {value}
      </div>
      <div className="mt-1 text-xs leading-[1.5] text-muted">{label}</div>
    </div>
  );
}

const CARD =
  "fade flex flex-col gap-3.5 rounded-[24px] bg-surface p-6 ring-1 ring-line sm:p-7";
const HEADLINE = "m-0 text-2xl leading-[1.15] font-extrabold tracking-[-0.02em]";
const STATS = "grid grid-cols-2 gap-2.5 border-y border-line py-3";

/**
 * /franchise ⑤, Live work (chapter "proof"): the two products Gimmir built
 * and runs. Stats, chats and the Jimmy figure come from `src/content/proof`
 * and render only while approved; a pending claim leaves its slot out.
 */
export function LpProof() {
  const c = LIVE_WORK;
  const studios = shown(UN1T.studios);
  const members = shown(UN1T.members);
  const mrr = shown(JIMMY.mrr);
  const threads = [shown(CHATS.rob), shown(CHATS.emma)].filter(
    (t) => t !== null,
  );
  const after = wordCount(c.title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const un1tStats = [
    studios !== null ? { value: String(studios), label: c.un1t.studiosLabel } : null,
    members !== null ? { value: members, label: c.un1t.membersLabel } : null,
  ].filter((s) => s !== null);

  return (
    <>
      <Stage as="section" id="proof" data-tone="paper" className="relative">
        <Container className="flex flex-col gap-7 py-20 md:py-28">
          <div className="mx-auto flex max-w-[860px] flex-col items-center gap-4 text-center">
            <Kicker>{c.kicker}</Kicker>
            <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
              <RiseText text={c.title} />
            </h2>
          </div>

          <div className="mt-3 flex flex-col gap-4">
            <div className={CARD} style={d(after)}>
              <div className="flex items-center gap-3">
                <Image
                  src={APPS.un1t.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-[12px]"
                />
                <Kicker>{c.un1t.kicker}</Kicker>
              </div>
              <h3 className={HEADLINE}>{c.un1t.headline}</h3>
              {un1tStats.length > 0 ? (
                <div className={STATS}>
                  {un1tStats.map((s) => (
                    <Stat key={s.label} {...s} />
                  ))}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2.5">
                <AppStoreButton href={UN1T.appStore.url}>{c.un1t.storeLabel}</AppStoreButton>
                <SiteLink href={c.un1t.siteHref}>{c.un1t.siteLabel}</SiteLink>
              </div>
            </div>

            {threads.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {threads.map((t, i) => (
                  <WhatsAppThread key={t.id} thread={t} delay={after + 120 + i * 100} />
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-2">
            <div className={CARD} style={d(after + 100)}>
              <div className="flex items-center gap-3">
                <Image
                  src={APPS.jimmy.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-[12px]"
                />
                <Kicker>{c.jimmy.kicker}</Kicker>
              </div>
              <h3 className={HEADLINE}>{c.jimmy.headline}</h3>
              <p className="m-0 text-base leading-normal text-muted">{c.jimmy.text}</p>
              {mrr !== null ? (
                <div className={STATS}>
                  <Stat value={mrr} label={c.jimmy.mrrLabel} />
                </div>
              ) : null}
              <div className="mt-auto flex flex-wrap gap-2.5 pt-1">
                <AppStoreButton href={JIMMY_APP_STORE}>{c.jimmy.storeLabel}</AppStoreButton>
                <SiteLink href={c.jimmy.siteHref}>{c.jimmy.siteLabel}</SiteLink>
              </div>
            </div>
            <div
              className="fade overflow-hidden rounded-[24px] bg-line ring-1 ring-line"
              style={d(after + 200)}
            >
              <Image
                src="/jimmy/dashboard.png"
                alt={c.jimmy.dashboardAlt}
                width={2055}
                height={1262}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="block h-full min-h-[240px] w-full object-cover object-left-top"
              />
            </div>
          </div>
        </Container>
      </Stage>
      <ChapterBridge
        number="06"
        next="process"
        statement={
          <>
            {c.bridge.lead}{" "}
            <span className="bg-[linear-gradient(transparent_58%,var(--color-lime)_58%,var(--color-lime)_92%,transparent_92%)] px-0.5">
              {c.bridge.mark}
            </span>
          </>
        }
      />
    </>
  );
}
