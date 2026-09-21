import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function CaseBackLink({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/work"
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium transition-colors",
        onDark ? "text-paper/55 hover:text-paper" : "text-muted hover:text-ink",
      )}
    >
      <ArrowRight className="size-4 -translate-x-0 rotate-180 transition-transform group-hover:-translate-x-0.5" />
      All case studies
    </Link>
  );
}

