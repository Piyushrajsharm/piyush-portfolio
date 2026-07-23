"use client";

import { motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, CheckCircle, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { TiltGlassPanel } from "@/components/ui/tilt-glass-panel";
import { type PortfolioData } from "@/config/site";

type Certification = PortfolioData["certifications"][number];

export function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollBy(direction: number) {
    if (!railRef.current) return;
    const cardWidth = 340;
    railRef.current.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
    const nextIndex = Math.max(0, Math.min(certifications.length - 1, activeIndex + direction));
    setActiveIndex(nextIndex);
  }

  return (
    <SectionShell
      id="certifications"
      eyebrow="Certifications & Verification"
      title="Verified skill proof with room to expand."
      description="A quick scan of certificates in Data Analytics, SQL, Power BI, and Python."
    >
      <div className="mb-6 flex items-center justify-between">
        {/* Active counter badge */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <ShieldCheck className="h-4 w-4 text-cyan-300" />
          <span>VERIFIED CARDS: {certifications.length}</span>
        </div>

        {/* Carousel controls */}
        <div className="flex gap-2">
          <Button variant="icon" size="icon" aria-label="Previous certificate" onClick={() => scrollBy(-1)}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="icon" size="icon" aria-label="Next certificate" onClick={() => scrollBy(1)}>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Scroll Rail */}
      <div
        ref={railRef}
        className="flex snap-x gap-5 overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Certificate carousel"
      >
        {certifications.map((certificate, index) => (
          <motion.div
            key={`${certificate.title}-${certificate.year}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.05 }}
            className="min-w-[290px] snap-start md:min-w-[340px]"
          >
            <TiltGlassPanel holo={index % 2 === 0} className="h-full p-6 flex flex-col justify-between" as="article">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-[0_0_15px_rgba(103,232,249,0.2)]">
                    <Award className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                <p className="text-xs uppercase tracking-wider text-cyan-200 font-semibold">{certificate.issuer}</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{certificate.title}</h3>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-mono text-cyan-100">
                  Issued: {certificate.year}
                </span>
                <span className="text-[11px] text-muted-foreground">Completion Badge</span>
              </div>
            </TiltGlassPanel>
          </motion.div>
        ))}
      </div>

      {/* Carousel Progress Dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {certifications.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-cyan-300 shadow-[0_0_8px_#67e8f9]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </SectionShell>
  );
}
