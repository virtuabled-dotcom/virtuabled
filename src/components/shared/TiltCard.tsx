import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. Default 8. */
  max?: number;
  /** Optional glare highlight that follows the cursor. Default true. */
  glare?: boolean;
}

/**
 * A lightweight 3D tilt wrapper built on framer-motion.
 * - Reacts to mouse position with a perspective rotateX/rotateY.
 * - Springs back to flat on leave.
 * - Disabled for touch devices and when the user prefers reduced motion.
 * No extra dependencies — pure framer-motion (already in the bundle).
 */
export const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", max = 8, glare = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [interactive] = useState(() => {
    if (typeof window === "undefined") return false;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return fine && !reduced;
  });

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]: string[]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.12), transparent 45%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (!interactive) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
};
