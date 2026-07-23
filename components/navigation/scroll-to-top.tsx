"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp, Command } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 720));

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button
        variant="icon"
        size="icon"
        aria-label="Open command palette"
        title="Command palette"
        className="shadow-glow"
        onClick={() => window.dispatchEvent(new CustomEvent("portfolio-command-open"))}
      >
        <Command className="h-4 w-4" aria-hidden="true" />
      </Button>
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <Button
              variant="icon"
              size="icon"
              aria-label="Scroll to top"
              title="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
