"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function PremiumLoader({ name }: { name: string }) {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reducedMotion ? 250 : 1150);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-[8px] border border-white/15 bg-white/[0.08] text-sm font-semibold shadow-glow">
              PR
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Preparing {name}&apos;s digital introduction</p>
            <div className="mx-auto mt-4 h-px w-44 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-200 via-white to-violet-300"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
