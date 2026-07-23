"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Sparkles } from "lucide-react";
import { ProjectModal } from "@/components/project-modal";
import { ProjectVisual } from "@/components/project-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { TiltGlassPanel } from "@/components/ui/tilt-glass-panel";
import { type Project } from "@/config/site";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <SectionShell
      id="projects"
      eyebrow="Case Studies & Proof of Work"
      title="Projects presented like product launches, not assignment cards."
      description="Each project opens into a comprehensive interactive modal detailing problem statements, technical architecture, data signals, and metrics."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 110, damping: 20, delay: index * 0.05 }}
          >
            <TiltGlassPanel holo={index < 3} className="h-full overflow-hidden p-3" as="article">
              <ProjectVisual index={index} title={project.title} />
              <div className="p-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant={index % 2 ? "purple" : "cyan"}>{project.kicker}</Badge>
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-muted-foreground transition hover:border-cyan-400/40 hover:text-white"
                    aria-label={`Open ${project.title} repository`}
                  >
                    <GitBranch className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-balance tracking-tight">{project.title}</h3>
                <p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{project.description}</p>

                {/* Tech Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-cyan-400/20">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <ProjectModal project={project} index={index}>
                    <Button variant="secondary" className="w-full gap-1.5 text-xs font-medium px-2">
                      <ArrowUpRight className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                      Case Study
                    </Button>
                  </ProjectModal>
                  <Button asChild variant="outline" className="w-full gap-1.5 text-xs font-medium px-2 border-white/15 hover:border-cyan-400/40 hover:bg-white/10">
                    <a href={project.repository} target="_blank" rel="noreferrer">
                      <GitBranch className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                      GitHub Repo
                    </a>
                  </Button>
                </div>
              </div>
            </TiltGlassPanel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
