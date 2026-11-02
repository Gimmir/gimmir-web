import { CookieSettingsLink } from "@/components/consent/cookie-settings-link";
import { Container } from "@/components/ui/container";
import { Logomark } from "@/components/ui/logomark";
import { CONTACT_EMAIL, FOOTER } from "@/content/site";

/**
 * The landing pages' footer: who we are and the legal links, nothing that
 * leads back into the site. Legal pages open in a new tab, so the offer
 * stays where it was.
 */
export function LandingFooter() {
  const year = new Date().getFullYear();
  const link = "transition-colors hover:text-lime";

  return (
    <footer data-tone="ink" className="bg-ink text-paper">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <Logomark className="size-6" />
          Gimmir
        </span>
        <p className="m-0 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm text-paper/55">
          <span>
            © {year} {FOOTER.company}
          </span>
          <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
            {CONTACT_EMAIL}
          </a>
          {FOOTER.legal.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener"
              className={link}
            >
              {l.label}
            </a>
          ))}
          <CookieSettingsLink className={link} />
        </p>
      </Container>
    </footer>
  );
}
