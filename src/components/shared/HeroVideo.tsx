import React, { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  /** Path to the looping hero video (muted, autoplay). */
  src: string;
  /** Still shown while loading and for reduced-motion / no-autoplay clients. */
  poster: string;
  /** Optional accent glow colour behind the media. */
  tint?: string;
  /** Classes on the wrapper. */
  className?: string;
  /** Render a bottom scrim for text legibility (default true). */
  scrim?: boolean;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * HeroVideo — a looping, muted, auto-playing video hero with a static poster
 * fallback for reduced-motion clients. The media is slightly overscanned and
 * pinned to the top-left so any bottom-right corner artefact is clipped, and a
 * bottom scrim keeps overlaid copy legible.
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({
  src,
  poster,
  tint,
  className,
  scrim = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    // Some browsers need an explicit play() after mount.
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [reduced]);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} aria-hidden>
      {tint && (
        <div
          className="absolute inset-0 z-0 opacity-30 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 45%, ${tint}, transparent 70%)` }}
        />
      )}

      {reduced ? (
        <img
          src={poster}
          alt=""
          className="relative z-[1] w-full h-full object-cover object-left-top scale-[1.06] origin-top-left"
        />
      ) : (
        <video
          ref={videoRef}
          className="relative z-[1] w-full h-full object-cover object-left-top scale-[1.06] origin-top-left"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {scrim && (
        <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-[#0B132B] via-[#0B132B]/20 to-transparent" />
      )}
    </div>
  );
};

export default HeroVideo;
