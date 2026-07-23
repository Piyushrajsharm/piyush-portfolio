"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type TiltGlassPanelProps = {
  children: ReactNode;
  className?: string;
  holo?: boolean;
  tiltStrength?: number;
  as?: "div" | "article";
};

export function TiltGlassPanel({
  children,
  className,
  holo = false,
  tiltStrength = 10,
  as: Tag = "div"
}: TiltGlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 24, mass: 0.4 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 24, mass: 0.4 });
  const highlightX = useMotionValue(50);
  const highlightY = useMotionValue(50);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - centerX) / (rect.width / 2);
    const deltaY = (event.clientY - centerY) / (rect.height / 2);

    rotateX.set(-deltaY * tiltStrength);
    rotateY.set(deltaX * tiltStrength);
    highlightX.set(((event.clientX - rect.left) / rect.width) * 100);
    highlightY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    highlightX.set(50);
    highlightY.set(50);
  }

  const MotionTag = Tag === "article" ? motion.article : motion.div;

  return (
    <div className="glass-panel-tilt">
      <MotionTag
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className={cn(
          holo ? "glass-panel-holo" : "glass-panel",
          "relative overflow-hidden",
          className
        )}
      >
        {/* Specular highlight that follows cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.12) 0%, transparent 50%)`,
            borderRadius: "inherit"
          }}
          aria-hidden="true"
        />
        <div className="relative z-20">{children}</div>
      </MotionTag>
    </div>
  );
}
