import Image from "next/image";

import { cn } from "@/lib/cn";

/** Quentin Randis, Jimmy Coach's co-founder: named with his OK
 *  (2026-09-30); photo and link from Nazar (2026-10-01). */
const QUENTIN = {
  photo: "/photo/quentin.jpg",
  instagram: "https://www.instagram.com/quentinrandis",
};

const NAME = /(Quentin Randis|Quentin)/;

/**
 * Copy stays a plain string (it is also FAQPage text); where Quentin is
 * named in it, this swaps in his face and his name, linked to his
 * Instagram.
 */
export function withMentions(
  text: string,
  { onDark = false }: { onDark?: boolean } = {},
): React.ReactNode {
  const parts = text.split(NAME);
  if (parts.length === 1) return text;
  return parts.map((part, n) =>
    n % 2 === 1 ? <Mention key={n} name={part} onDark={onDark} /> : part,
  );
}

function Mention({ name, onDark }: { name: string; onDark: boolean }) {
  return (
    <a
      href={QUENTIN.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on Instagram`}
      className={cn(
        "group whitespace-nowrap",
        onDark && "transition-colors duration-200 hover:text-lime",
      )}
    >
      <span className="relative mr-[0.25em] inline-block size-[1.15em] overflow-hidden rounded-full bg-paper-2 align-[-0.26em] ring-1 ring-current/15">
        <Image
          src={QUENTIN.photo}
          alt=""
          fill
          sizes="64px"
          className="object-cover"
        />
      </span>
      <span
        className={cn(
          "underline underline-offset-[0.18em]",
          onDark ? "decoration-paper/35" : "link-mark decoration-ink/25",
        )}
      >
        {name}
      </span>
    </a>
  );
}
