"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { TiltGlassPanel } from "@/components/ui/tilt-glass-panel";
import { type PortfolioData } from "@/config/site";

type Testimonial = PortfolioData["testimonials"][number];

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <SectionShell
      id="testimonials"
      eyebrow="Feedback & Recommendations"
      title="Signals of clarity, analytical rigor, and polish."
      description="Peer, mentor, and portfolio reviews highlighting problem-solving approach and attention to detail."
      className="py-16 md:py-20"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.08 }}
          >
            <TiltGlassPanel holo={index === 1} className="h-full p-6 flex flex-col justify-between" as="article">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 + index * 0.1 }}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                  >
                    <Quote className="h-5 w-5" aria-hidden="true" />
                  </motion.div>

                  {/* 5-Star rating visualization */}
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-7 text-muted-foreground italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-400 font-bold text-slate-950 text-xs flex items-center justify-center shadow-[0_0_10px_rgba(103,232,249,0.3)]">
                  {testimonial.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                  <p className="text-xs text-cyan-200/70 font-mono">{testimonial.role}</p>
                </div>
              </div>
            </TiltGlassPanel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
