"use client";

import { useState, type ReactNode } from "react";
import { ExternalLink, GitBranch, Layers, Lightbulb, Target, Timer, X, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProjectVisual } from "@/components/project-visual";
import { type Project } from "@/config/site";

export function ProjectModal({
  project,
  index,
  children
}: {
  project: Project;
  index: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="w-full cursor-pointer"
      >
        {children}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="cyan">
                  {tech}
                </Badge>
              ))}
            </div>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>{project.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 p-6 pt-0 md:grid-cols-[.9fr_1.1fr] md:p-8 md:pt-0">
            <ProjectVisual index={index} title={project.title} />
            <div className="grid gap-4">
              <ModalBlock icon={Target} title="Problem" text={project.challenge} />
              <ModalBlock icon={Lightbulb} title="Approach" text={project.solution} />
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Layers className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                  Key Features
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <span key={feature} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 p-6 md:p-8">
            <div className="grid gap-3 md:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-bold text-cyan-200">{metric}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Measured outcome signal</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href={project.repository} external className="bg-white text-black">
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                GitHub Repository
              </MagneticButton>
              {project.liveDemo && project.liveDemo !== "#projects" ? (
                <MagneticButton href={project.liveDemo} external>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo
                </MagneticButton>
              ) : null}
              <MagneticButton onClick={() => setOpen(false)}>
                <Timer className="h-4 w-4" aria-hidden="true" />
                Timeline: {project.timeline}
              </MagneticButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ModalBlock({
  icon: Icon,
  title,
  text
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <p className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4 text-cyan-200" aria-hidden="true" />
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
