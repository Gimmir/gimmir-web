import Script from "next/script";

/**
 * Microsoft Clarity — heatmaps + session recordings. Loads only when
 * NEXT_PUBLIC_CLARITY_PROJECT_ID is set, so local/dev and unconfigured
 * environments stay clean. The id is sanitized to alphanumerics before it is
 * interpolated into the inline tag.
 */
export function Clarity() {
  const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.replace(
    /[^a-z0-9]/gi,
    "",
  );
  if (!id) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`}
    </Script>
  );
}
