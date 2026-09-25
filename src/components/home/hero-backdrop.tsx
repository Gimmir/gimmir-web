/** Fine paper grain: fractal noise in ink at a whisper of alpha. */
const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 0 0.05 0 0 0 0.065 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
)}")`;

/**
 * Atmosphere behind the hero: soft lime light from the top right, a warm
 * shade low on the left and a trace of paper grain. All of it is one
 * static background (plain gradients, no blur filters, no blend modes), so
 * the headline animating over it costs the phone nothing to composite.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: [
          GRAIN,
          "radial-gradient(ellipse 48% 62% at 92% 4%, rgba(201,242,61,0.34) 0%, rgba(201,242,61,0.16) 38%, rgba(201,242,61,0.05) 62%, rgba(201,242,61,0) 80%)",
          "radial-gradient(ellipse 45% 55% at 0% 100%, rgba(228,224,214,0.85) 0%, rgba(228,224,214,0.35) 45%, rgba(228,224,214,0) 75%)",
        ].join(", "),
        backgroundSize: "180px 180px, 100% 100%, 100% 100%",
      }}
    />
  );
}
