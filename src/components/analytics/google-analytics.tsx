import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js). The measurement id is public by nature, so it
 * lives here rather than in env — one less variable to forget on the host.
 * Skipped outside production so local dev doesn't pollute the property.
 * SPA navigations are tracked by GA4's enhanced measurement (history events).
 */
const GA_MEASUREMENT_ID = "G-M4E53LK5ET";

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
