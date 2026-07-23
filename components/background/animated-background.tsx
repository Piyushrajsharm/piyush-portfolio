"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () => import("@/components/background/particle-field").then((module) => module.ParticleField),
  {
    ssr: false,
    loading: () => null
  }
);

export function AnimatedBackground() {
  return (
    <>
      <div className="noise-layer" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden" aria-hidden="true">
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
        <div className="absolute bottom-24 left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-200/20 to-transparent" />
        <div className="absolute inset-x-0 top-1/3 h-72 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,.035),transparent)] blur-2xl" />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[-2] hidden opacity-70 md:block" aria-hidden="true">
        <ParticleField />
      </div>
    </>
  );
}
