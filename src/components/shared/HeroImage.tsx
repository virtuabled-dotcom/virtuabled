import React from "react";

/**
 * HeroImage — full-width hero photograph band behind a page hero.
 *
 * Drop-in replacement for HeroAuroraBackdrop: it occupies the same top-band
 * slot, but shows a real photograph prominently instead of the faint aurora.
 * Crucially it is ALWAYS visible at every breakpoint (no `hidden lg:block`),
 * spans the full viewport width, and uses left-weighted + bottom navy scrims so
 * overlaid heading copy stays legible while the subject reads clearly on the
 * right. The image fades into the page background at the bottom so the content
 * below sits clean.
 */
export const HeroImage: React.FC<{
  /** Path under /public, e.g. "/images/foo.jpeg". */
  src: string;
  /** Per-page accent wash colour. */
  tint?: string;
  /** object-position utility (default object-top for portraits). */
  position?: string;
  /** Band height utility (default h-[78vh]). */
  heightClass?: string;
  className?: string;
}> = ({
  src,
  tint = "#14B8A6",
  position = "object-top",
  heightClass = "h-[78vh]",
  className = "",
}) => (
  <div
    className={`absolute top-0 left-1/2 -translate-x-1/2 w-screen ${heightClass} pointer-events-none overflow-hidden ${className}`}
    aria-hidden
  >
    <img
      src={src}
      alt=""
      className={`absolute inset-0 w-full h-full object-cover ${position} scale-[1.03]`}
    />
    {/* per-page accent wash, weighted toward the subject side */}
    <div
      className="absolute inset-0 opacity-20 mix-blend-screen"
      style={{ background: `radial-gradient(60% 60% at 70% 30%, ${tint}, transparent 70%)` }}
    />
    {/* left-weighted scrim so heading copy stays legible */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/70 to-[#0B132B]/20" />
    {/* fade the image into the page background at the bottom */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B132B]/25 to-[#0B132B]" />
  </div>
);

export default HeroImage;
