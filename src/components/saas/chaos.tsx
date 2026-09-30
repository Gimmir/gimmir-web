import { cn } from "@/lib/cn";

/** Before the product: a coach's business in three tools, drawn. */
export function Chaos() {
  const card =
    "absolute rounded-2xl bg-paper p-4 text-[13px] text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]";
  return (
    <div className="relative h-[340px] w-full max-w-[420px]">
      <div className={cn(card, "left-0 top-4 w-[62%] -rotate-[5deg]")}>
        <p className="flex items-center justify-between font-semibold">
          Chats
          <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] text-paper">
            Unread
          </span>
        </p>
        {[
          "Can we move Thursday?",
          "Sent my check-in",
          "Which program am I on?",
        ].map((t) => (
          <p
            key={t}
            className="mt-2 w-fit rounded-xl rounded-bl-sm bg-paper-2 px-3 py-1.5"
          >
            {t}
          </p>
        ))}
      </div>
      <div className={cn(card, "right-0 top-24 w-[58%] rotate-[4deg]")}>
        <p className="font-semibold">clients_FINAL_v3.xlsx</p>
        <div className="mt-3 grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }, (_, k) => (
            <span
              key={k}
              className={cn(
                "h-3 rounded-[3px]",
                k < 4 ? "bg-ink/70" : "bg-paper-2",
              )}
            />
          ))}
        </div>
      </div>
      <div className={cn(card, "bottom-2 left-[14%] w-[54%] -rotate-[2deg]")}>
        <p className="flex items-center gap-2 font-semibold">
          <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] text-paper">
            PDF
          </span>
          Program_week_7.pdf
        </p>
        <p className="mt-2 text-muted">Sent to every client, one by one</p>
      </div>
    </div>
  );
}
