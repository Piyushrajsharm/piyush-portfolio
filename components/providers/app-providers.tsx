"use client";

import { type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { AnimatedBackground } from "@/components/background/animated-background";
import { CommandPalette } from "@/components/command/command-palette";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { ReadingProgress } from "@/components/navigation/reading-progress";
import { ScrollToTop } from "@/components/navigation/scroll-to-top";
import { PremiumLoader } from "@/components/premium-loader";
import { AIChatWidget } from "@/components/widgets/ai-chat-widget";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ServiceWorkerProvider } from "@/components/providers/service-worker-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ServiceWorkerProvider />
      <LenisProvider>
        <AnimatedBackground />
        <ReadingProgress />
        <FloatingNav navigation={siteConfig.portfolio.navigation} />
        <CommandPalette portfolio={siteConfig.portfolio} />
        <PremiumLoader name={siteConfig.portfolio.person.name} />
        {children}
        <AIChatWidget />
        <ScrollToTop />
      </LenisProvider>
    </ThemeProvider>
  );
}
