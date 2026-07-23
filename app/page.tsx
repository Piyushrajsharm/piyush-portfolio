import { siteConfig } from "@/config/site";
import { AboutSection } from "@/sections/about-section";
import { CertificationsSection } from "@/sections/certifications-section";
import { ContactSection } from "@/sections/contact-section";
import { ExperienceTimelineSection } from "@/sections/experience-timeline-section";
import { FooterSection } from "@/sections/footer-section";
import { HeroSection } from "@/sections/hero-section";
import { ProjectsSection } from "@/sections/projects-section";
import { ResumeSection } from "@/sections/resume-section";
import { SkillsSection } from "@/sections/skills-section";
import { TestimonialsSection } from "@/sections/testimonials-section";

export default function Home() {
  const portfolio = siteConfig.portfolio;

  return (
    <main id="main">
      <HeroSection portfolio={portfolio} />
      <AboutSection portfolio={portfolio} />
      <SkillsSection skills={portfolio.skills} />
      <ProjectsSection projects={portfolio.projects} />
      <ExperienceTimelineSection timeline={portfolio.timeline} />
      <ResumeSection portfolio={portfolio} />
      <CertificationsSection certifications={portfolio.certifications} />
      <TestimonialsSection testimonials={portfolio.testimonials} />
      <ContactSection portfolio={portfolio} />
      <FooterSection portfolio={portfolio} />
    </main>
  );
}
