"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillBubble } from "@/components/skill-bubble";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { type Skill } from "@/config/site";
import { Sparkles, Layers } from "lucide-react";

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  // Positions for interactive constellation nodes
  const nodePositions = [
    { x: 15, y: 25 },
    { x: 45, y: 15 },
    { x: 75, y: 30 },
    { x: 25, y: 65 },
    { x: 55, y: 55 },
    { x: 82, y: 70 },
    { x: 35, y: 40 },
    { x: 65, y: 80 },
    { x: 10, y: 78 }
  ];

  return (
    <SectionShell
      id="skills"
      eyebrow="Skills & Mastery"
      title="A floating map of tools, analysis habits, and AI curiosity."
      description="Hover each card for 3D depth and holographic edges. Filter by domain or explore the connected skill constellation below."
    >
      <GlassPanel className="mb-8 overflow-hidden p-6 relative">
        <div className="grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Skill Constellation
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-balance">
              Analytics core connected to AI and frontend craft.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {skills.length} core competencies mapped across data pipelines, visualization, machine learning, and modern web interfaces.
            </p>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4">
            {/* Grid texture */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:36px_36px]" />

            {/* Constellation SVG Lines */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-40">
              <line x1="15%" y1="25%" x2="45%" y2="15%" stroke="#67e8f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="45%" y1="15%" x2="75%" y2="30%" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="15%" y1="25%" x2="35%" y2="40%" stroke="#67e8f9" strokeWidth="1" />
              <line x1="35%" y1="40%" x2="55%" y2="55%" stroke="#6ee7b4" strokeWidth="1" />
              <line x1="55%" y1="55%" x2="75%" y2="30%" stroke="#a78bfa" strokeWidth="1" />
              <line x1="35%" y1="40%" x2="25%" y2="65%" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="55%" y1="55%" x2="82%" y2="70%" stroke="#fbbf24" strokeWidth="1" />
              <line x1="25%" y1="65%" x2="65%" y2="80%" stroke="#fb7185" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="25%" y1="65%" x2="10%" y2="78%" stroke="#67e8f9" strokeWidth="1" />
            </svg>

            {/* Constellation Nodes */}
            {skills.slice(0, 9).map((skill, index) => {
              const pos = nodePositions[index] || { x: 50, y: 50 };
              return (
                <motion.div
                  key={skill.name}
                  className="absolute cursor-pointer rounded-lg border border-white/20 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white shadow-glass-inset backdrop-blur-xl transition-colors hover:border-cyan-300 hover:bg-cyan-500/20"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`
                  }}
                  animate={{
                    y: [0, -6, 0],
                    boxShadow: [
                      "0 0 10px rgba(103,232,249,0.1)",
                      "0 0 20px rgba(103,232,249,0.3)",
                      "0 0 10px rgba(103,232,249,0.1)"
                    ]
                  }}
                  transition={{
                    duration: 3.5 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </GlassPanel>

      {/* Category Filter Pills */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
          <Layers className="h-3.5 w-3.5" />
          Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`focus-ring rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedCategory === cat
                ? "border border-cyan-300/60 bg-cyan-400/15 text-cyan-100 shadow-[0_0_15px_rgba(103,232,249,0.25)]"
                : "border border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/20 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <SkillBubble key={skill.name} skill={skill} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionShell>
  );
}
