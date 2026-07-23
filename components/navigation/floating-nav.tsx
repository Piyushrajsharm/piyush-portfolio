"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Command, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};

export function FloatingNav({ navigation }: { navigation: NavItem[] }) {
  const { theme, toggleTheme } = useTheme();
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > 180 && latest > previous);
    setScrolled(latest > 100);
  });

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navigation]);

  return (
    <AnimatePresence>
      {!hidden ? (
        <motion.header
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -22 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2"
        >
          <nav
            aria-label="Primary navigation"
            className={cn(
              "glass-panel flex items-center justify-between gap-2 overflow-hidden transition-all duration-300",
              scrolled ? "px-2 py-1.5 backdrop-blur-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border-white/20" : "px-2.5 py-2"
            )}
          >
            {/* Scroll Progress Bar at Top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 origin-left"
              style={{ scaleX }}
            />

            <Link href="#home" className="focus-ring flex items-center gap-2 rounded-lg px-2 py-1 transition-transform hover:scale-105">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-xs font-semibold text-cyan-200 shadow-[0_0_10px_rgba(103,232,249,0.2)]">
                PR
              </span>
              <span className="hidden text-sm font-semibold text-foreground xs:block tracking-tight">Piyush</span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navigation.map((item) => {
                const itemActive = active === item.href.replace("#", "");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "focus-ring relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground",
                      itemActive && "text-foreground font-medium"
                    )}
                  >
                    {itemActive ? (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-lg border border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_15px_rgba(103,232,249,0.15)]"
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      />
                    ) : null}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Command button with ⌘K badge */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("portfolio-command-open"))}
                className="focus-ring group flex h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.08] px-2.5 text-xs text-muted-foreground transition hover:border-cyan-400/40 hover:bg-white/[0.14] hover:text-foreground"
                aria-label="Open command palette"
                title="Command palette (Ctrl+K)"
              >
                <Command className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
                <span className="hidden sm:inline font-mono text-[10px] uppercase text-cyan-200/80 bg-white/10 px-1.5 py-0.5 rounded">⌘K</span>
              </button>

              <Button
                variant="icon"
                size="icon"
                aria-label="Toggle color theme"
                title="Theme"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 text-amber-200" aria-hidden="true" /> : <Moon className="h-4 w-4 text-cyan-200" aria-hidden="true" />}
              </Button>
            </div>
          </nav>
        </motion.header>
      ) : null}
    </AnimatePresence>
  );
}
