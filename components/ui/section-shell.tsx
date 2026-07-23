"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, eyebrow, title, description, children, className }: SectionShellProps) {
  const words = title.split(" ");

  return (
    <section id={id} className={cn("relative px-4 py-20 md:px-6 md:py-28", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl md:mb-14">
          {/* Eyebrow with glowing dot indicator */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#67e8f9]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200 font-mono">{eyebrow}</p>
          </motion.div>

          {/* Title with Word-by-Word Stagger Reveal */}
          <h2 className="mt-3 text-3xl font-semibold text-balance md:text-5xl tracking-tight leading-tight">
            {words.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 18,
                  delay: index * 0.04
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: words.length * 0.04 + 0.1 }}
              className="mt-4 text-base leading-8 text-muted-foreground md:text-lg"
            >
              {description}
            </motion.p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
