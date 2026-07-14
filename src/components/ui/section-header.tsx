import { cn } from "@/lib/cn";

export function SectionHeader({
  index,
  title,
  intro,
  onDark = false,
  align = "left",
  className,
  titleMax = "max-w-[22ch]",
  introMax = "max-w-2xl",
}: {
  index?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
  titleMax?: string;
  introMax?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-baseline gap-3.5",
          align === "center" && "justify-center",
        )}
      >
        {index ? (
          <span
            className={cn(
              "font-serif text-lg italic sm:text-xl",
              onDark ? "text-faint" : "text-muted",
            )}
          >
            {index}
          </span>
        ) : null}
        <h2 className={cn("display text-display", titleMax)}>{title}</h2>
      </div>
      {intro ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            introMax,
            onDark ? "text-paper/70" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
