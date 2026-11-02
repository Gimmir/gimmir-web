import Image from "next/image";

import type { ChatThread } from "@/content/proof";

const BUBBLE =
  "fade max-w-[84%] px-2.5 pt-2 pb-1.5 text-[14.5px] leading-[1.4] shadow-[0_1px_0_rgba(0,0,0,0.08)]";

/** "UN1T", or "UN1T · Owner" once a real role is known (never "[ROLE]"). */
function whoLine(thread: ChatThread): string {
  const role = thread.role?.trim();
  return role && !/^\[.*\]$/.test(role) ? `${thread.org} · ${role}` : thread.org;
}

/**
 * A WhatsApp conversation drawn in code (Oleh's artboard): the words are
 * the thread's own, as sent, with their times. A figure named for who it
 * is with. Bubbles settle in one after another inside a <Stage> (`.fade`,
 * 60ms apart); the card itself tilts slightly and straightens on hover.
 */
export function WhatsAppThread({
  thread,
  tilt,
  delay = 0,
}: {
  thread: ChatThread;
  /** Resting angle, so a pair of cards leans in opposite ways. */
  tilt: "left" | "right";
  /** ms before the first bubble settles. */
  delay?: number;
}) {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <div className="fade" style={d(delay)}>
      <figure
        className={`m-0 overflow-hidden rounded-[24px] bg-[#EFEAE2] bg-[radial-gradient(rgba(17,27,33,0.07)_1px,transparent_1px)] bg-[length:14px_14px] text-[#111b21] shadow-[0_0_0_1px_rgba(21,20,14,0.06),0_24px_48px_-28px_rgba(21,20,14,0.4)] transition-[rotate,translate] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:translate-y-[-4px] [@media(hover:hover)]:hover:rotate-0 ${
          tilt === "left" ? "-rotate-[1.5deg]" : "rotate-[1.5deg]"
        }`}
      >
        <figcaption className="sr-only">
          {thread.app} from {thread.name}, {thread.org}
        </figcaption>
        <div
          aria-hidden
          className="flex items-center gap-3 border-b border-[#e9edef] bg-white px-4 py-3"
        >
          <span className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#DFE5E7] text-sm font-bold text-[#54656f]">
            {thread.initials}
          </span>
          <div className="min-w-0">
            <div className="text-[15px] font-semibold">{thread.name}</div>
            <div className="text-xs text-[#667781]">{whoLine(thread)}</div>
          </div>
          <span className="ml-auto text-[11px] font-semibold text-[#667781]">
            {thread.app}
          </span>
        </div>
        <ul className="m-0 flex list-none flex-col gap-1.5 p-4">
          {thread.messages.map((m, i) => (
            <li
              key={i}
              className={
                m.from === "us"
                  ? `${BUBBLE} self-end rounded-[10px_0_10px_10px] bg-[#D9FDD3]`
                  : `${BUBBLE} self-start rounded-[0_10px_10px_10px] bg-white`
              }
              style={d(delay + 160 + i * 70)}
            >
              {m.text}
              {m.time ? (
                <span className="mt-0.5 block text-right text-[11px] text-[#667781]">
                  {m.time}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}

/** Quentin's iMessage card, drawn the same way. Rendered only once his quote is approved. */
export function IMessageThread({ thread }: { thread: ChatThread }) {
  return (
    <figure className="m-0 flex flex-col overflow-hidden rounded-[24px] bg-white text-black shadow-[0_0_0_1px_rgba(21,20,14,0.06),0_24px_48px_-28px_rgba(21,20,14,0.4)]">
      <figcaption className="sr-only">
        {thread.app} from {thread.name}, {thread.org}
      </figcaption>
      <div
        aria-hidden
        className="flex items-center gap-2.5 border-b border-[#E5E5EA] bg-[#F7F7F7] px-4 py-3"
      >
        <Image
          src="/photo/quentin.jpg"
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-semibold">{thread.name}</div>
          <div className="text-[11px] text-[#6b6b6b]">
            {thread.role ? `${thread.role} · ${thread.app}` : thread.app}
          </div>
        </div>
      </div>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-4">
        {thread.messages.map((m, i) => (
          <li
            key={i}
            className={
              m.from === "us"
                ? "max-w-[80%] self-end rounded-[18px] bg-[#0A84FF] px-3.5 py-[9px] text-sm leading-[1.35] text-white"
                : "max-w-[80%] self-start rounded-[18px] bg-[#E9E9EB] px-3.5 py-[9px] text-sm leading-[1.35] text-black"
            }
          >
            {m.text}
          </li>
        ))}
      </ul>
    </figure>
  );
}
