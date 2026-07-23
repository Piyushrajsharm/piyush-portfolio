"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  BriefcaseBusiness,
  Download,
  GitBranch,
  Mail,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AmbientMusic } from "@/components/audio/ambient-music";
import {
  DigitalPresenterStage,
  type PresenterChapter
} from "@/components/presenter/digital-presenter-stage";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StatusDock } from "@/components/widgets/status-dock";
import { type PortfolioData } from "@/config/site";
import { incrementLocalMetric } from "@/lib/analytics";

type VoiceState = "idle" | "playing" | "paused";

function AnimatedWord({ word, index }: { word: string; index: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 18,
        delay: 0.28 + index * 0.06
      }}
    >
      {word}
    </motion.span>
  );
}

export function HeroSection({ portfolio }: { portfolio: PortfolioData }) {
  const { person } = portfolio;
  const chapters = portfolio.presenterChapters as PresenterChapter[];
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id ?? "intro");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [subtitle, setSubtitle] = useState(chapters[0]?.script ?? person.narration);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const subtitleTimer = useRef<number | null>(null);

  const currentRole = person.roles[roleIndex % person.roles.length];
  const activeChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === activeChapterId) ?? chapters[0],
    [activeChapterId, chapters]
  );

  // Initialize HTML5 Audio Element for user's attached voice file
  useEffect(() => {
    const audio = new Audio("/ratan_tts_audio.mp3");
    audio.volume = 0.9;
    audio.onended = () => {
      clearSubtitleTimer();
      setSubtitle(activeChapter.script);
      setVoiceState("idle");
    };
    audio.onerror = () => {
      // Audio fallback to speech synthesis if file not supported
    };
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setRoleIndex((index) => index + 1), 2400);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setSubtitle(activeChapter.script);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    clearSubtitleTimer();
    setVoiceState("idle");
  }, [activeChapter]);

  useEffect(() => {
    return () => {
      clearSubtitleTimer();
      if (audioRef.current) audioRef.current.pause();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function clearSubtitleTimer() {
    if (subtitleTimer.current) window.clearInterval(subtitleTimer.current);
    subtitleTimer.current = null;
  }

  function runSubtitles(script: string) {
    clearSubtitleTimer();
    const lines = script
      .split(".")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `${line}.`);
    let index = 0;
    setSubtitle(lines[0] ?? script);
    subtitleTimer.current = window.setInterval(() => {
      index += 1;
      if (index >= lines.length) {
        clearSubtitleTimer();
        return;
      }
      setSubtitle(lines[index]);
    }, 3300);
  }

  function speak(replay = false) {
    if (!activeChapter) return;

    if (audioRef.current) {
      if (voiceState === "paused" && !replay) {
        const p = audioRef.current.play();
        if (p && typeof p.then === "function") {
          p.then(() => {
            runSubtitles(activeChapter.script);
            setVoiceState("playing");
          }).catch((_e) => {
            fallbackSpeechSynthesis(replay);
          });
        }
        return;
      }

      if (replay) {
        audioRef.current.currentTime = 0;
      }

      const p = audioRef.current.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          runSubtitles(activeChapter.script);
          setVoiceState("playing");
        }).catch((_e) => {
          fallbackSpeechSynthesis(replay);
        });
      }
      return;
    }

    fallbackSpeechSynthesis(replay);
  }

  function fallbackSpeechSynthesis(replay = false) {
    if (voiceState === "paused" && !replay && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      runSubtitles(activeChapter.script);
      setVoiceState("playing");
      return;
    }

    if (!("speechSynthesis" in window)) {
      setSubtitle(activeChapter.script);
      setVoiceState("idle");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeChapter.script);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice =
      voices.find((voice) => /natural|aria|jenny|google|english|india/i.test(voice.name)) ??
      voices[0] ??
      null;
    utterance.volume = 0.9;
    utterance.rate = 0.93;
    utterance.pitch = 0.94;
    utterance.onend = () => {
      clearSubtitleTimer();
      setSubtitle(activeChapter.script);
      setVoiceState("idle");
    };
    utterance.onerror = () => {
      clearSubtitleTimer();
      setVoiceState("idle");
    };
    utteranceRef.current = utterance;
    runSubtitles(activeChapter.script);
    setVoiceState("playing");
    window.speechSynthesis.speak(utterance);
  }

  function pause() {
    if (audioRef.current && voiceState === "playing") {
      audioRef.current.pause();
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
    clearSubtitleTimer();
    setVoiceState("paused");
  }

  function nextChapter() {
    const currentIndex = chapters.findIndex((chapter) => chapter.id === activeChapter.id);
    const next = chapters[(currentIndex + 1) % chapters.length];
    setActiveChapterId(next.id);
  }

  function scrollToActiveTarget() {
    document.querySelector(activeChapter.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const titlePrefix = "Meet a 3D digital host explaining ";
  const titleWords = titlePrefix.split(" ");

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pb-16 pt-24 md:px-6 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-7xl text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 110, damping: 18, delay: 0.15 }}
          className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 bg-white/[0.08] px-3 py-2 text-sm text-cyan-100 backdrop-blur-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Piyush is presenting live
        </motion.div>

        {/* Staggered Title */}
        <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-semibold leading-tight text-balance md:text-7xl">
          {titleWords.map((word, index) => (
            <span key={index}>
              <AnimatedWord word={word} index={index} />{" "}
            </span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
              delay: 0.28 + titleWords.length * 0.06
            }}
            className="text-shimmer"
          >
            {person.name}&apos;s portfolio.
          </motion.span>
        </h1>

        {/* Role cycling */}
        <div className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-medium text-cyan-200">{currentRole}</span> · {person.tagline}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.52 }}
        className="relative mx-auto mt-8 max-w-7xl"
      >
        <DigitalPresenterStage
          chapters={chapters}
          activeChapter={activeChapter}
          speaking={voiceState === "playing"}
          onSelectChapter={(chapter) => setActiveChapterId(chapter.id)}
        />

        <div className="absolute right-4 top-4 w-[calc(100%-2rem)] max-w-md md:right-6 md:top-6">
          <div className="glass-panel p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase text-cyan-100">{activeChapter.label}</p>
                <h2 className="mt-1 text-xl font-semibold text-balance">{activeChapter.headline}</h2>
              </div>
              <span
                className="mt-1 h-3 w-3 rounded-full shadow-glow animate-glow-breathe"
                style={{ backgroundColor: activeChapter.accent }}
                aria-hidden="true"
              />
            </div>
            <p
              className="mt-4 min-h-24 rounded-[8px] border border-white/10 bg-black/30 px-3 py-3 text-left text-sm leading-6 text-muted-foreground"
              aria-live="polite"
            >
              {subtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={() => (voiceState === "playing" ? pause() : speak(false))}
                aria-label={voiceState === "playing" ? "Pause presenter narration" : "Play presenter narration"}
              >
                {voiceState === "playing" ? (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
                {voiceState === "paused" ? "Resume" : voiceState === "playing" ? "Pause" : "Play"}
              </Button>
              <Button variant="secondary" onClick={() => speak(true)} aria-label="Replay presenter narration">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Replay
              </Button>
              <Button variant="outline" onClick={nextChapter} aria-label="Move to next presenter chapter">
                <SkipForward className="h-4 w-4" aria-hidden="true" />
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_.72fr]">
          <div className="glass-panel flex flex-wrap items-center justify-center gap-3 p-4 md:justify-start">
            {[
              { href: person.resumeUrl, download: true, icon: Download, label: "Download Resume", className: "bg-white text-black hover:bg-cyan-100", onClick: () => incrementLocalMetric("resume-downloads"), delay: 0 },
              { href: "#projects", icon: TerminalSquare, label: "Projects", delay: 0.05 },
              { href: "#contact", icon: Mail, label: "Contact", delay: 0.1 },
              { href: person.socials.linkedin, external: true, icon: BriefcaseBusiness, label: "LinkedIn", ariaLabel: "Open LinkedIn profile", delay: 0.15 },
              { href: person.socials.github, external: true, icon: GitBranch, label: "GitHub", ariaLabel: "Open GitHub profile", delay: 0.2 }
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <motion.div
                  key={btn.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.7 + btn.delay }}
                >
                  <MagneticButton
                    href={btn.href}
                    download={btn.download}
                    external={btn.external}
                    className={btn.className}
                    onClick={btn.onClick}
                    ariaLabel={btn.ariaLabel}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {btn.label}
                  </MagneticButton>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.95 }}
            >
              <Button variant="secondary" onClick={scrollToActiveTarget}>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                Open {activeChapter.label}
              </Button>
            </motion.div>
          </div>
          <AmbientMusic tracks={portfolio.ambientTracks} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.72 }}
        className="mx-auto mt-8 max-w-7xl"
      >
        <StatusDock
          githubUsername={person.githubUsername}
          leetcodeUsername={person.leetcodeUsername}
          resumeUrl={person.resumeUrl}
        />
      </motion.div>

      <a
        href="#about"
        className="focus-ring absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-[8px] border border-white/15 bg-white/[0.08] p-3 text-muted-foreground backdrop-blur-2xl transition hover:text-foreground md:block group"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        <span className="absolute inset-x-0 -bottom-4 h-8 bg-gradient-to-b from-cyan-200/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 blur-sm" aria-hidden="true" />
      </a>
    </section>
  );
}
