"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, BriefcaseBusiness, GraduationCap, Sparkles } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { TiltGlassPanel } from "@/components/ui/tilt-glass-panel";
import { type PortfolioData } from "@/config/site";

type TimelineItem = PortfolioData["timeline"][number];

const iconByType = {
  Achievement: Award,
  Projects: BriefcaseBusiness,
  Courses: BookOpen,
  Education: GraduationCap
};

export function ExperienceTimelineSection({ timeline }: { timeline: TimelineItem[] }) {
  return (
    <SectionShell
      id="timeline"
      eyebrow="Timeline & Growth"
      title="A learning path shaped around practical output."
      description="A timeline of education, projects, learning milestones, and analytical growth."
    >
      <div className="relative mx-auto max-w-4xl">
        {/* Animated Vertical Line */}
        <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-violet-400/0 md:block">
          <motion.div
            className="h-16 w-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]"
            animate={{ y: ["0%", "800%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="space-y-6">
          {timeline.map((item, index) => {
            const Icon = iconByType[item.type as keyof typeof iconByType] ?? Award;
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: isEven ? -28 : 28, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 110, damping: 18, delay: index * 0.08 }}
                className="relative grid gap-4 md:grid-cols-[3rem_1fr]"
              >
                {/* Icon Marker */}
                <div className="z-10 grid h-11 w-11 place-items-center rounded-xl border border-cyan-400/40 bg-slate-950 text-cyan-200 shadow-[0_0_15px_rgba(103,232,249,0.25)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Content Card with Holographic Border */}
                <TiltGlassPanel holo={index === 0} className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100 shadow-[0_0_10px_rgba(103,232,249,0.15)]">
                      {item.year}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-violet-300" />
                      {item.type}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold text-white tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </TiltGlassPanel>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
