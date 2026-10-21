"use client";

import { useFranchise } from "@/components/franchise/franchise-context";
import { Phone } from "@/components/franchise/phone";

import styles from "./lp-hero.module.css";

const PAYMENT = 60;
const FADE = "transition-[background-color,box-shadow,color] duration-300";

/** The little line icons in the front phone's tab bar. */
function TabIcon({ stroke, children }: { stroke: string; children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/**
 * The hero's two app screens (checkout behind, home in front) and three
 * floating cards, drawn in code with sample data. Everything that is the
 * member app's own colour repaints from the visitor's brand; the
 * "to HQ" share follows the model's fee rate. Decorative, so hidden from
 * assistive tech.
 */
export function HeroPhones() {
  const { brand, model } = useFranchise();
  const c = brand.color;
  const hqShare = `£${(PAYMENT * model.values.feeRate).toFixed(2)}`;
  const paint = { background: c, color: "#fff" } as const;

  return (
    <div aria-hidden className="relative mx-auto h-[700px] w-full max-w-[480px]">
      <div className="absolute inset-[80px_0_10px_0] rounded-[40px] bg-paper-2" />

      {/* back phone: checkout */}
      <Phone
        size="back"
        screen="#fff"
        className="absolute top-[130px] left-0 z-[1] -rotate-6 shadow-[0_40px_70px_-40px_rgba(21,20,14,0.55)] max-[560px]:hidden"
      >
        <div className="px-4 pt-11 pb-2.5 text-center text-sm font-bold">Checkout</div>
        <div className={`mx-3.5 mt-1.5 rounded-[18px] p-4 ${FADE}`} style={paint}>
          <div className="text-[11px] font-semibold opacity-85">{brand.name}</div>
          <div className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">Unlimited</div>
          <div className="mt-0.5 text-[11px] opacity-85">Every class, every studio</div>
          <div className="mt-[18px] text-xl font-extrabold">
            £60 <span className="text-[11px] font-semibold opacity-85">a month</span>
          </div>
        </div>
        <div className="flex flex-col gap-[9px] px-4 py-3.5 text-xs">
          <div className="flex justify-between">
            <span className="text-[#6b6b6b]">Unlimited membership</span>
            <strong>£60.00</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b6b6b]">Home studio</span>
            <strong>Leeds</strong>
          </div>
          <div className="flex justify-between border-t border-[#eee] pt-[9px]">
            <strong>Due today</strong>
            <strong>£60.00</strong>
          </div>
        </div>
        <div className="mx-3.5 mt-auto mb-3.5 flex flex-col gap-2">
          <div className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-black text-base font-semibold text-white">
            <svg aria-hidden viewBox="0 0 24 24" className="size-[15px]" fill="#fff">
              <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z" />
            </svg>
            Pay
          </div>
          <div className="text-center text-[10.5px] text-[#6b6b6b]">
            Paid to {brand.name} Leeds · secured by Stripe
          </div>
        </div>
      </Phone>

      {/* front phone: home */}
      <Phone size="front" className="absolute top-12 right-2 z-[2]">
        <div className={`px-[18px] pt-[46px] pb-[54px] ${FADE}`} style={paint}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex size-7 items-center justify-center rounded-lg bg-white text-sm font-extrabold ${FADE}`}
                style={{ color: c }}
              >
                {brand.initial}
              </span>
              <strong className="text-[15px] tracking-[-0.01em]">{brand.name}</strong>
            </div>
            <span className="inline-flex size-[30px] items-center justify-center rounded-full bg-white/25 text-xs font-bold">
              S
            </span>
          </div>
          <div className="mt-4 text-xs opacity-85">Good morning, Sophie</div>
          <div className="mt-0.5 text-[22px] font-extrabold tracking-[-0.02em]">
            3 classes this week
          </div>
        </div>
        <div className="relative mx-3 -mt-10 rounded-[20px] bg-white p-3.5 shadow-[0_14px_28px_-18px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between gap-2.5">
            <div>
              <div className="text-[10px] font-bold tracking-[0.08em] text-[#6b6b6b]">
                NEXT CLASS
              </div>
              <div className="mt-0.5 text-[30px] leading-[1.1] font-extrabold tracking-[-0.03em]">
                07:00
              </div>
              <div className="text-xs font-bold">Strength · Leeds</div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#6b6b6b]">
                <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-[#E9E6DD] text-[9px] font-bold text-ink">
                  D
                </span>
                with Coach Dean
              </div>
            </div>
            <svg viewBox="0 0 64 64" className="size-16 shrink-0" aria-hidden>
              <circle cx="32" cy="32" r="22" fill="none" stroke="#EDEBE4" strokeWidth="7" />
              <circle
                cx="32"
                cy="32"
                r="22"
                fill="none"
                stroke={c}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="103.7 138.2"
                transform="rotate(-90 32 32)"
                style={{ transition: "stroke 300ms" }}
              />
              <text x="32" y="36.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#15140E">
                3/4
              </text>
            </svg>
          </div>
          <div
            className={`mt-3 flex h-[38px] items-center justify-center rounded-xl text-[13px] font-bold ${FADE}`}
            style={paint}
          >
            Check in
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="flex items-baseline justify-between">
            <strong className="text-[13px]">Book a class</strong>
            <span className="text-[11px] text-[#6b6b6b]">Leeds</span>
          </div>
          <div className="grid grid-cols-5 gap-[5px]">
            {[
              ["MON", "26"],
              ["TUE", "27"],
              ["WED", "28"],
              ["THU", "29"],
              ["FRI", "30"],
            ].map(([day, n], i) => (
              <div
                key={day}
                className={`rounded-[10px] py-1.5 text-center ${FADE} ${i === 0 ? "" : "bg-white"}`}
                style={i === 0 ? paint : undefined}
              >
                <div className={`text-[9px] ${i === 0 ? "opacity-85" : "text-[#6b6b6b]"}`}>
                  {day}
                </div>
                <div className="text-[13px] font-extrabold">{n}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2.5 rounded-[14px] bg-white p-2.5">
            <div className="w-[38px] text-xs font-extrabold">12:30</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold">Conditioning</div>
              <div className="mt-1.5 h-1 overflow-hidden rounded bg-[#EDEBE4]">
                <span
                  className={`block h-full w-[60%] rounded ${FADE}`}
                  style={{ background: c }}
                />
              </div>
              <div className="mt-1 text-[10px] text-[#6b6b6b]">Coach Amy · 6 spots left</div>
            </div>
            <span
              className={`rounded-full px-[11px] py-1.5 text-[11px] font-bold whitespace-nowrap ${FADE}`}
              style={paint}
            >
              Book
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-[14px] bg-white p-2.5">
            <div className="w-[38px] text-xs font-extrabold">18:30</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold">Mobility</div>
              <div className="mt-1.5 h-1 overflow-hidden rounded bg-[#EDEBE4]">
                <span className="block h-full w-full rounded bg-[#C9C5B9]" />
              </div>
              <div className="mt-1 text-[10px] text-[#6b6b6b]">Full · 3 on the waitlist</div>
            </div>
            <span className="rounded-full bg-paper-2 px-[11px] py-1.5 text-[11px] font-bold">
              Join
            </span>
          </div>
        </div>
        <div className="flex justify-around border-t border-[#EEECE6] bg-white px-1 pt-2 pb-4 text-[10px] font-semibold text-[#6b6b6b]">
          <span className={`flex flex-col items-center gap-[3px] ${FADE}`} style={{ color: c }}>
            <TabIcon stroke={c}>
              <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
            </TabIcon>
            Home
          </span>
          <span className="flex flex-col items-center gap-[3px]">
            <TabIcon stroke="#8a8a8e">
              <rect x="4" y="5" width="16" height="15" rx="3" />
              <path d="M4 10h16M9 3v4M15 3v4" />
            </TabIcon>
            Book
          </span>
          <span className="flex flex-col items-center gap-[3px]">
            <TabIcon stroke="#8a8a8e">
              <path d="M5 20v-8M12 20V5M19 20v-5" />
            </TabIcon>
            Progress
          </span>
          <span className="flex flex-col items-center gap-[3px]">
            <TabIcon stroke="#8a8a8e">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </TabIcon>
            Shop
          </span>
        </div>
      </Phone>

      {/* floating cards */}
      <div className={`${styles.float} absolute top-0 -right-2 z-[4] w-[284px] max-w-[86%]`}>
        <div
          className={`${styles.toast} flex items-start gap-2.5 rounded-[18px] bg-white/[0.97] px-3.5 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]`}
        >
          <span
            className={`inline-flex size-9 shrink-0 items-center justify-center rounded-[9px] font-extrabold ${FADE}`}
            style={paint}
          >
            {brand.initial}
          </span>
          <div className="min-w-0 text-[13px] leading-[1.35]">
            <div className="flex justify-between gap-2.5">
              <strong className="truncate">{brand.name}</strong>
              <span className="text-[#6b6b6b]">now</span>
            </div>
            Your 07:00 class is tomorrow. 2 spots left.
          </div>
        </div>
      </div>
      <div
        className={`${styles.float2} absolute bottom-[54px] -left-4 z-[4] max-[560px]:hidden`}
      >
        <div className="flex items-center gap-3 rounded-3xl bg-surface px-3.5 py-3 shadow-[inset_0_0_0_1px_var(--color-line),0_20px_40px_-22px_rgba(21,20,14,0.45)]">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-lime font-extrabold">
            £
          </span>
          <div className="text-[13px] leading-[1.35]">
            <strong>Payment received</strong>
            <div className="text-muted">Sophie · £60.00 · Leeds</div>
          </div>
          <span className="rounded-full bg-ink px-2.5 py-[5px] text-xs font-bold whitespace-nowrap text-lime">
            +{hqShare} to HQ
          </span>
        </div>
      </div>
      <div
        className={`${styles.float} absolute right-[-24px] bottom-[170px] z-[4] max-[560px]:hidden`}
        style={{ animationDelay: "1.4s" }}
      >
        <div className="flex items-center gap-2.5 rounded-3xl bg-surface px-3.5 py-3 shadow-[inset_0_0_0_1px_var(--color-line),0_20px_40px_-22px_rgba(21,20,14,0.45)]">
          <span className={styles.live} />
          <div className="text-[13px] leading-[1.35]">
            <strong>Day 30 check-in sent</strong>
            <div className="text-muted">Coach Dean to Sophie</div>
          </div>
        </div>
      </div>
    </div>
  );
}
