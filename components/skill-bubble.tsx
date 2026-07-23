"use client";

import { motion } from "framer-motion";
import { type CSSProperties, useState } from "react";
import { TiltGlassPanel } from "@/components/ui/tilt-glass-panel";
import { type Skill } from "@/config/site";

const categoryColors: Record<string, { gradient: string; accent: string }> = {
  Analytics: { gradient: "from-cyan-400/10 to-cyan-600/5", accent: "#67e8f9" },
  Programming: { gradient: "from-violet-400/10 to-violet-600/5", accent: "#a78bfa" },
  AI: { gradient: "from-emerald-400/10 to-emerald-600/5", accent: "#6ee7b4" },
  "Data Science": { gradient: "from-blue-400/10 to-blue-600/5", accent: "#60a5fa" },
  Visualization: { gradient: "from-amber-400/10 to-amber-600/5", accent: "#fbbf24" },
  Frontend: { gradient: "from-rose-400/10 to-rose-600/5", accent: "#fb7185" },
  Workflow: { gradient: "from-slate-400/10 to-slate-600/5", accent: "#94a3b8" }
};

function getLevel(proficiency: number): string {
  if (proficiency >= 85) return "Expert";
  if (proficiency >= 75) return "Advanced";
  if (proficiency >= 65) return "Intermediate";
  return "Learning";
}

export function SkillBubble({ skill, index }: { skill: Skill; index: number }) {
  const colors = categoryColors[skill.category] ?? categoryColors.Analytics;
  const level = getLevel(skill.proficiency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 130, damping: 18, delay: index * 0.025 }}
    >
      <TiltGlassPanel holo={index < 5} className={`group min-h-48 p-4 bg-gradient-to-br ${colors.gradient}`} as="article">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase" style={{ color: colors.accent }}>{skill.category}</p>
            <h3 className="mt-2 text-xl font-semibold">{skill.name}</h3>
            <span className="mt-1 inline-block rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              {level}
            </span>
          </div>
          <div
            className="radial-progress grid h-16 w-16 place-items-center rounded-full text-xs font-semibold text-white transition-all duration-500"
            style={
              {
                "--value": skill.proficiency,
                "--progress-color": colors.accent
              } as CSSProperties
            }
            aria-label={`${skill.name} proficiency ${skill.proficiency} percent`}
          >
            {skill.proficiency}%
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">{skill.description}</p>
        <div className="mt-5 h-1.5 overflow-hidden rounded-[8px] bg-white/10">
          <motion.div
            className="h-full rounded-[8px]"
            style={{
              background: `linear-gradient(90deg, ${colors.accent}66, ${colors.accent}, ${colors.accent}66)`
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.12 }}
          />
        </div>
      </TiltGlassPanel>
    </motion.div>
  );
}
