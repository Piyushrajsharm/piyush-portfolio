import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Resume",
  description: `Online resume preview for ${siteConfig.portfolio.person.fullName}.`
};

export default function ResumePage() {
  const { person, skills, projects, timeline } = siteConfig.portfolio;

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="noise-layer" aria-hidden="true" />
      <article className="mx-auto max-w-4xl glass-panel p-6 md:p-10">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase text-cyan-200">Resume Preview</p>
            <h1 className="mt-3 text-4xl font-semibold">{person.fullName}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{person.tagline}</p>
          </div>
          <Button asChild>
            <a href={person.resumeUrl} download>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PDF
            </a>
          </Button>
        </div>

        <section className="grid gap-6 py-8 md:grid-cols-[1fr_.85fr]">
          <div>
            <h2 className="text-xl font-semibold">Experience Direction</h2>
            <div className="mt-4 space-y-4">
              {timeline.map((item) => (
                <div key={item.title} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-cyan-200">{item.year} · {item.type}</p>
                  <h3 className="mt-2 font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Core Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.slice(0, 12).map((skill) => (
                  <span key={skill.name} className="rounded-[8px] border border-white/10 bg-white/[0.06] px-3 py-2 text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Selected Projects</h2>
              <div className="mt-4 space-y-3">
                {projects.slice(0, 4).map((project) => (
                  <Link
                    key={project.id}
                    href={`/#projects`}
                    className="group flex items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span>{project.title}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-cyan-200" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </article>
    </main>
  );
}
