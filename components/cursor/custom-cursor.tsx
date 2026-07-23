"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 420, damping: 36, mass: 0.18 });
  const y = useSpring(useMotionValue(0), { stiffness: 420, damping: 36, mass: 0.18 });
  const trailX = useSpring(useMotionValue(0), { stiffness: 120, damping: 24, mass: 0.4 });
  const trailY = useSpring(useMotionValue(0), { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(pointerFine && !reducedMotion);

    function move(event: PointerEvent) {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      x.set(event.clientX - 6);
      y.set(event.clientY - 6);
      trailX.set(event.clientX - 18);
      trailY.set(event.clientY - 18);
    }

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [trailX, trailY, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      <motion.span
        className="absolute h-3 w-3 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(103,232,249,.9)]"
        style={{ x, y }}
      />
      <motion.span
        className="absolute h-9 w-9 rounded-full border border-cyan-100/25 bg-cyan-100/5 blur-[1px]"
        style={{ x: trailX, y: trailY }}
      />
    </div>
  );
}
