"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Camera, Check, Copy, GitBranch, Mail, MapPin, Send, Sparkles, CheckCircle2, type LucideIcon } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { TiltGlassPanel } from "@/components/ui/tilt-glass-panel";
import { Input } from "@/components/ui/input";
import { SectionShell } from "@/components/ui/section-shell";
import { Textarea } from "@/components/ui/textarea";
import { type PortfolioData } from "@/config/site";

export function ContactSection({ portfolio }: { portfolio: PortfolioData }) {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const { person } = portfolio;

  function copyEmail() {
    navigator.clipboard.writeText(person.email).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 5000);
  }

  return (
    <SectionShell
      id="contact"
      eyebrow="Get In Touch"
      title="A polished final step for recruiters and collaborators."
      description="For analytics roles, project reviews, collaborations, or mentorship conversations."
    >
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <TiltGlassPanel holo className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-[0_0_15px_rgba(103,232,249,0.2)]">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                Available for Roles
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white">Let&apos;s connect</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Open to internship opportunities, data analytics positions, AI research projects, and technical dialogues.
            </p>

            <div className="mt-6 space-y-3">
              <ContactLink icon={Mail} label={person.email} href={`mailto:${person.email}`} />
              <ContactLink icon={BriefcaseBusiness} label="LinkedIn Profile" href={person.socials.linkedin} />
              <ContactLink icon={GitBranch} label="GitHub Repositories" href={person.socials.github} />
              <ContactLink icon={Camera} label="Instagram" href={person.socials.instagram} />
              <ContactLink icon={MapPin} label={person.location} href="#contact" />
            </div>
          </div>

          <Button variant="secondary" className="mt-8 gap-2 shadow-[0_0_15px_rgba(103,232,249,0.15)]" onClick={copyEmail}>
            {copied ? <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Email Copied to Clipboard!" : "Copy Direct Email"}
          </Button>
        </TiltGlassPanel>

        {/* Interactive Form with Success Celebration */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
          className="glass-panel relative overflow-hidden p-6 md:p-8 flex flex-col justify-between"
        >
          {/* Confetti / Success Celebration Overlay */}
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center backdrop-blur-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/20 border border-emerald-400 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)]"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h4 className="mt-4 text-2xl font-bold text-white">Message Transmitted!</h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Thank you for reaching out. Piyush will review your communication shortly.
                </p>
                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FloatingField id="name" label="Your name">
                <Input id="name" name="name" placeholder=" " required autoComplete="name" className="focus-ring border-white/15 bg-white/[0.04]" />
              </FloatingField>
              <FloatingField id="email" label="Email address">
                <Input id="email" name="email" type="email" placeholder=" " required autoComplete="email" className="focus-ring border-white/15 bg-white/[0.04]" />
              </FloatingField>
            </div>
            <FloatingField id="subject" label="Subject">
              <Input id="subject" name="subject" placeholder=" " required className="focus-ring border-white/15 bg-white/[0.04]" />
            </FloatingField>
            <FloatingField id="message" label="Your message">
              <Textarea id="message" name="message" placeholder=" " required className="focus-ring min-h-32 border-white/15 bg-white/[0.04]" />
            </FloatingField>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button type="submit" className="gap-2 shadow-[0_0_25px_rgba(103,232,249,0.3)]">
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Message
            </Button>
            <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
              <Sparkles className="h-3 w-3 text-cyan-300" />
              Instant Response Ready
            </span>
          </div>
        </motion.form>
      </div>
    </SectionShell>
  );
}

function FloatingField({
  id,
  label,
  className,
  children
}: {
  id: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`group relative block ${className ?? ""}`} htmlFor={id}>
      {children}
      <span className="pointer-events-none absolute left-4 top-3 text-sm text-muted-foreground transition-all group-focus-within:top-1 group-focus-within:text-[11px] group-focus-within:text-cyan-200 group-has-[:not(:placeholder-shown)]:top-1 group-has-[:not(:placeholder-shown)]:text-[11px]">
        {label}
      </span>
    </label>
  );
}

function ContactLink({
  icon: Icon,
  label,
  href
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="focus-ring flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-muted-foreground transition hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-white"
    >
      <Icon className="h-4.5 w-4.5 text-cyan-300" aria-hidden="true" />
      {label}
    </a>
  );
}
