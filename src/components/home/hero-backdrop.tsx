/** Fine paper grain: fractal noise tinted ink, multiplied onto the paper. */
const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 0 0.05 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
)}")`;

/**
 * Atmosphere behind the hero: soft lime light from the top right, a warm
 * shade low on the left, and a trace of paper grain. No shapes, no
 * imagery, no extra height, nothing that competes with a line of text.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-[18%] -top-[35%] h-[95%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(201,242,61,0.42),rgba(201,242,61,0.12)_55%,transparent)] blur-2xl" />
      <div className="absolute -bottom-[40%] -left-[15%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(228,224,214,0.9),transparent)] blur-2xl" />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{ backgroundImage: GRAIN }}
      />
    </div>
  );
}
