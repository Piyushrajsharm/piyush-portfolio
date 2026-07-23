"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  download?: boolean;
  external?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

export function MagneticButton({
  href,
  children,
  className,
  download,
  external,
  onClick,
  ariaLabel
}: MagneticButtonProps) {
  const [ripple, setRipple] = useState({ x: 50, y: 50, key: 0 });
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 18, mass: 0.35 });
  const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 18, mass: 0.35 });

  function handleMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.22);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipple({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      key: Date.now()
    });
    onClick?.();
  }

  const classes = cn(
    "focus-ring relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-[8px] border border-white/15 bg-white/[0.09] px-5 text-sm font-medium text-white shadow-glass-inset backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-white/[0.14]",
    className
  );

  const inner = (
    <>
      <span
        key={ripple.key}
        className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[8px] bg-cyan-200/20 opacity-0 animate-[ripple_650ms_ease-out]"
        style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (!href) {
    return (
      <motion.button
        type="button"
        style={{ x, y }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={classes}
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {inner}
    </motion.a>
  );
}
