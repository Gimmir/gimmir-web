import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function CaseBackLink({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/work"
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium transition-colors",
        onDark ? "text-paper/55 hover:text-lime" : "text-muted hover:text-ink",
      )}
    >
      <ArrowRight className="size-4 -translate-x-0 rotate-180 transition-transform group-hover:-translate-x-0.5" />
      <span className={onDark ? undefined : "link-mark"}>All case studies</span>
    </Link>
  );
}

/** The forward link from a case study to the page for its audience. */
export function CaseAudienceLink({
  href,
  label,
  onDark = false,
}: {
  href: string;
  label: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium transition-colors",
        onDark ? "text-paper/55 hover:text-lime" : "text-muted hover:text-ink",
      )}
    >
      <span className={onDark ? undefined : "link-mark"}>{label}</span>
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Where a live product can be seen: its site and its store pages. */
export function ProductLinks({
  links,
  className,
  style,
}: {
  links: readonly { label: string; href: string; aria: string }[];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <ul
      className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}
      style={style}
    >
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.aria}
            className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink"
          >
            <span className="link-mark">{l.label}</span>
            <ArrowUpRight className="size-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The at-a-glance panel under a case study hero. */
export function QuickFacts({
  facts,
  onDark = false,
  className,
}: {
  facts: Array<[label: string, value: string]>;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-x-10 gap-y-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-3",
        onDark ? "border-paper/15" : "border-line",
        className,
      )}
    >
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt
            className={cn(
              "font-mono text-xs uppercase tracking-widest",
              onDark ? "text-lime" : "text-muted",
            )}
          >
            {label}
          </dt>
          <dd
            className={cn(
              "mt-2 text-lg leading-snug",
              onDark ? "text-paper/85" : "font-semibold text-ink",
            )}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A client's words; renders nothing until an approved quote exists. */
export function CaseQuote({
  quote,
  className,
}: {
  quote?: { text: string; name: string; role: string };
  className?: string;
}) {
  if (!quote) return null;
  return (
    <figure
      className={cn("max-w-[60ch] border-l-[5px] border-lime pl-6", className)}
    >
      <blockquote className="font-serif text-2xl italic leading-snug text-ink md:text-3xl">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm text-muted">
        {quote.name}, {quote.role}
      </figcaption>
    </figure>
  );
}
