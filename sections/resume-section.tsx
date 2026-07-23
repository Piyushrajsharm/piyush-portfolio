"use client";

import { motion } from "framer-motion";
import { Download, Eye, FileText, CheckCircle2, Award, Code } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { type PortfolioData } from "@/config/site";
import { incrementLocalMetric, readLocalMetric } from "@/lib/analytics";

export function ResumeSection({ portfolio }: { portfolio: PortfolioData }) {
  const [downloads, setDownloads] = useState(0);

  useEffect(() => {
    setDownloads(readLocalMetric("resume-downloads"));
  }, []);

  function trackDownload() {
    setDownloads(incrementLocalMetric("resume-downloads"));
  }

  return (
    <SectionShell
      id="resume"
      eyebrow="Resume & Credentials"
      title="A glass resume preview ready for recruiter review."
      description="Download the full PDF version or view the interactive online summary."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Clean Glass Resume Preview (No Flip) */}
        <GlassPanel className="p-6 relative overflow-hidden border-cyan-400/20 shadow-2xl">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-cyan-200 font-mono">
              Curriculum Vitae · Page 1 of 1
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="h-3 w-3" />
              Recruiter Ready
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.95] p-6 text-slate-900 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Candidate Overview</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{portfolio.person.fullName}</h3>
                <p className="mt-1 text-xs font-semibold text-cyan-700">{portfolio.person.headline} · AI Enthusiast · Problem Solver</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                PR
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {[
                portfolio.person.tagline,
                "Core Stack: SQL · Python · Power BI · Excel · Machine Learning · Pandas",
                "Featured Work: Executive Sales Dashboard, AI Resume Reviewer, Movie Recommendation Engine"
              ].map((line, i) => (
                <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 font-medium">
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {portfolio.stats.slice(1, 4).map((stat) => (
                <div key={stat.label} className="rounded-lg bg-slate-100 p-2.5 text-center">
                  <p className="text-base font-bold text-slate-900">{stat.value}{stat.suffix}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>

        {/* Actions & Analytics */}
        <GlassPanel className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-[0_0_15px_rgba(103,232,249,0.2)]">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">Resume Actions</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Download the complete PDF format or explore the online interactive format.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button asChild onClick={trackDownload} className="shadow-[0_0_20px_rgba(103,232,249,0.3)]">
                <a href={portfolio.person.resumeUrl} download>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download PDF
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link href={portfolio.person.onlineResumeUrl}>
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  View Online
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium font-mono">Resume Downloads on this device</p>
              <p className="mt-1 text-2xl font-bold text-cyan-200">{downloads}</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </GlassPanel>
      </div>
    </SectionShell>
  );
}
