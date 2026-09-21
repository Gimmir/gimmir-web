"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { TrackedCta } from "@/components/analytics/tracked-cta";
import { Button } from "@/components/ui/button";
import { Logomark } from "@/components/ui/logomark";
import { useHeaderTheme } from "@/components/site/header-theme";
import { BOOKINGS, bookingForPath } from "@/lib/booking";
import { cn } from "@/lib/cn";
import type { NAVIGATION_QUERY_RESULT } from "@/sanity/types";

type Nav = NonNullable<NAVIGATION_QUERY_RESULT>;

export function Header({ nav }: { nav: Nav | null }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { dark } = useHeaderTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Light header content while sitting over a dark hero (before scroll / menu).
  const light = dark && !scrolled && !open;

  const links = nav?.headerLinks ?? [];
  const ctaLabel = nav?.headerCtaLabel ?? "Book a call";
  // Operator and founder pages book their own call; pages that serve both
  // audiences send visitors to /contact to choose.
  const booking = bookingForPath(pathname);
  const cta = (
    placement: string,
    props: Pick<
      React.ComponentProps<typeof Button>,
      "className" | "size" | "variant"
    >,
  ) =>
    booking ? (
      <TrackedCta
        cal={booking}
        event="book_cta_click"
        eventProps={{ booking, placement }}
        {...props}
        onClick={() => setOpen(false)}
      >
        {BOOKINGS[booking].header}
      </TrackedCta>
    ) : (
      <Button href="/contact" {...props} onClick={() => setOpen(false)}>
        {ctaLabel}
      </Button>
    );
  const isActive = (href: string) =>
    href !== "/" &&
    !href.startsWith("#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  // On-page anchors (#top) only work on the home page; elsewhere prefix "/".
  const resolve = (anchor: string) =>
    anchor.startsWith("#") ? (onHome ? anchor : `/${anchor}`) : anchor;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* mobile menu panel — a sibling of the header so it is positioned against
          the viewport (the header's backdrop-blur would otherwise make it the
          containing block and shrink this to the bar). */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-10 pt-24 transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)] lg:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((item) => (
            <Link
              key={item._key}
              href={resolve(item.anchor ?? "#")}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.anchor ?? "") ? "page" : undefined}
              className="display border-b border-line py-4 text-[30px] leading-none aria-[current=page]:text-ink/45"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {cta("mobile-menu", { className: "mt-8 self-start" })}
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-300",
          scrolled || open
            ? "border-b border-line bg-paper/85 py-3 backdrop-blur-md"
            : "border-b border-transparent py-[18px]",
        )}
      >
        {/* scroll progress */}
        <div
          ref={progressRef}
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-lime"
          aria-hidden
        />

        {/* bar */}
        <div className="relative mx-auto flex max-w-[1280px] items-center justify-between gap-5 px-5 md:px-10">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 text-[22px] font-extrabold tracking-tight transition-colors",
              light ? "text-paper" : "text-ink",
            )}
          >
            <Logomark
              className={cn("size-7", light ? "text-paper" : "text-ink")}
            />
            Gimmir
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-5 lg:flex xl:gap-9"
          >
            {links.map((item) => (
              <Link
                key={item._key}
                href={resolve(item.anchor ?? "#")}
                aria-current={isActive(item.anchor ?? "") ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap text-[15px] font-medium transition-colors",
                  light
                    ? "text-paper/70 hover:text-paper aria-[current=page]:text-paper"
                    : "text-muted hover:text-ink aria-[current=page]:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            {cta("header", {
              size: "sm",
              className: "whitespace-nowrap",
              variant: light ? "outlineLight" : "solid",
            })}
          </div>

          <button
            type="button"
            className="-mr-2 flex size-11 touch-manipulation items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-[14px] w-6">
              <span
                className={cn(
                  "absolute left-0 block h-[2px] w-6 transition-all duration-300",
                  light ? "bg-paper" : "bg-ink",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 block h-[2px] w-6 transition-all duration-300",
                  light ? "bg-paper" : "bg-ink",
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "",
                )}
              />
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
