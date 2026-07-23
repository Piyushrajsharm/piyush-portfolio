"use client";

import { motion } from "framer-motion";
import { Brain, Flame, GraduationCap, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { type PortfolioData } from "@/config/site";

export function AboutSection({ portfolio }: { portfolio: PortfolioData }) {
  const cards = [
    { title: "Who I am", items: portfolio.about.interests, icon: Brain },
    { title: "Strengths", items: portfolio.about.strengths, icon: Sparkles },
    { title: "What motivates me", items: portfolio.about.motivators, icon: Flame }
  ];

  return (
    <SectionShell
      id="about"
      eyebrow="About me"
      title="A data mind with a product-level sense of presentation."
      description="This section is designed to answer the recruiter question quickly: how does Piyush think, learn, and turn effort into useful work?"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <GlassPanel className="p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-[8px] border border-white/15 bg-white/[0.08]">
              <GraduationCap className="h-5 w-5 text-cyan-200" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Career direction</p>
              <h3 className="text-xl font-semibold">{portfolio.person.headline}</h3>
            </div>
          </div>
          <div className="mt-7 space-y-5">
            {portfolio.about.summary.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 110, damping: 20, delay: index * 0.08 }}
                className="text-base leading-8 text-muted-foreground"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </GlassPanel>

        <div className="grid gap-6">
          <div className="grid gap-3 xs:grid-cols-2">
            {portfolio.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.05 }}
                className="glass-panel p-4"
              >
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.08 }}
              className="glass-panel p-5"
            >
              <Icon className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.items.map((item) => (
                  <span key={item} className="rounded-[8px] border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}
