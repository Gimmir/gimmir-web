import type { ChatThread } from "@/content/proof";

const BUBBLE =
  "fade max-w-[84%] px-2.5 pt-2 pb-1.5 text-[14.5px] leading-[1.4] shadow-[0_1px_0_rgba(0,0,0,0.08)]";

/**
 * A WhatsApp conversation drawn in code (Oleh's artboard): the words are
 * the thread's own, as sent, with their times. Decorative-but-readable: a
 * figure named for who it is with. Bubbles settle in one after another
 * inside a <Stage> (`.fade`, 60ms apart).
 */
export function WhatsAppThread({
  thread,
  delay = 0,
}: {
  thread: ChatThread;
  /** ms before the first bubble settles. */
  delay?: number;
}) {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const who = thread.role ? `${thread.org} · ${thread.role}` : thread.org;

  return (
    <figure
      className="fade m-0 overflow-hidden rounded-[24px] bg-[#EFEAE2] text-[#111b21] ring-1 ring-line"
      style={d(delay)}
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
          <div className="text-xs text-[#54656f]">{who}</div>
        </div>
        <span className="ml-auto text-[11px] font-semibold text-[#54656f]">
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
            style={d(delay + 120 + i * 60)}
          >
            {m.text}
            {m.time ? (
              <span className="mt-0.5 block text-right text-[11px] text-[#54656f]">
                {m.time}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </figure>
  );
}
