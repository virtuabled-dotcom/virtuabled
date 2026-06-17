import React from "react";

/**
 * HeroAuroraBackdrop — drop-in animated backdrop behind a page hero.
 * A brand aurora still with a slow CSS "Ken-Burns" drift so every page has
 * motion without a per-page video. Absolutely positioned, non-interactive,
 * capped height, navy scrim for legibility. `tint` overlays a per-page accent.
 * The drift is disabled under prefers-reduced-motion (see index.css).
 */
export const HeroAuroraBackdrop: React.FC<{ tint?: string; className?: string }> = ({
  tint = "#14B8A6",
  className = "",
}) => (
  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[70vh] pointer-events-none overflow-hidden ${className}`} aria-hidden>
    <img
      src="/images/hero-flow.jpg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-60 animate-aurora-drift"
    />
    {/* per-page accent wash */}
    <div
      className="absolute inset-0 opacity-25 mix-blend-screen"
      style={{ background: `radial-gradient(60% 60% at 50% 30%, ${tint}, transparent 70%)` }}
    />
    {/* legibility scrims */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/40 via-[#0B132B]/70 to-[#0B132B]" />
  </div>
);

export default HeroAuroraBackdrop;
