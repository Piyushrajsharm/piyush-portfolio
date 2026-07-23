"use client";

import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, Database, LineChart, PieChart, Activity } from "lucide-react";

const iconMap = [BarChart3, BrainCircuit, Database, LineChart, PieChart];

export function ProjectVisual({ index, title }: { index: number; title: string }) {
  const Icon = iconMap[index % iconMap.length];
  const bars = [42, 68, 34, 84, 58, 76, 52];

  return (
    <div className="scan-line relative h-52 overflow-hidden rounded-xl border border-white/15 bg-[#07070a] p-4 shadow-2xl">
      {/* Background radial gradient & grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,195,255,.25),transparent_40%),linear-gradient(135deg,rgba(167,139,250,.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Top Header */}
      <div className="relative flex items-center justify-between z-10">
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-200">
            <Activity className="h-3 w-3 animate-pulse text-cyan-400" />
            LIVE SPEC // 0{index + 1}
          </span>
          <p className="mt-1 max-w-44 text-sm font-semibold text-white tracking-tight line-clamp-1">{title}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-[0_0_15px_rgba(103,232,249,0.2)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      {/* Animated Visual Bars */}
      <div className="relative mt-6 grid grid-cols-7 items-end gap-2 z-10 h-20">
        {bars.map((height, barIndex) => (
          <motion.span
            key={barIndex}
            className="rounded-t-sm bg-gradient-to-t from-cyan-500/40 via-cyan-300 to-white shadow-[0_0_8px_rgba(103,232,249,0.4)]"
            initial={{ height: 10, opacity: 0.25 }}
            whileInView={{ height: `${height}%`, opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              height: [`${height}%`, `${Math.min(100, height + (barIndex % 2 === 0 ? 12 : -12))}%`, `${height}%`]
            }}
            transition={{
              height: { duration: 2.5 + barIndex * 0.3, repeat: Infinity, ease: "easeInOut" },
              default: { type: "spring", stiffness: 110, damping: 18, delay: barIndex * 0.04 }
            }}
          />
        ))}
      </div>

      {/* HUD Cards Skeleton */}
      <div className="relative mt-3 grid grid-cols-3 gap-2 z-10">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-7 rounded-md border border-white/10 bg-white/[0.04] flex items-center justify-center">
            <div className="h-1.5 w-8 rounded-full bg-cyan-300/30" />
          </div>
        ))}
      </div>

      {/* Corner HUD accent dots */}
      <div className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
      <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-violet-400/60" />
      <div className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
      <div className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-violet-400/60" />
    </div>
  );
}
