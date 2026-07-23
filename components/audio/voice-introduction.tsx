"use client";

import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type VoiceIntroductionProps = {
  text: string;
};

type VoiceState = "idle" | "playing" | "paused" | "complete";

export function VoiceIntroduction({ text }: VoiceIntroductionProps) {
  const [state, setState] = useState<VoiceState>("idle");
  const [volume, setVolume] = useState(0.85);
  const [rate, setRate] = useState(1.0);
  const [subtitle, setSubtitle] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const subtitleTimer = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio("/ratan_tts_audio.mp3");
    audio.volume = volume;
    audio.playbackRate = rate;
    audio.onended = () => {
      clearSubtitleTimer();
      setState("complete");
      setSubtitle(subtitles.at(-1) ?? text);
    };
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate]);

  const subtitles = useMemo(
    () =>
      text
        .split(".")
        .map((segment) => segment.trim())
        .filter(Boolean)
        .map((segment) => `${segment}.`),
    [text]
  );

  function clearSubtitleTimer() {
    if (subtitleTimer.current) window.clearInterval(subtitleTimer.current);
    subtitleTimer.current = null;
  }

  function startSubtitles() {
    clearSubtitleTimer();
    let index = 0;
    setSubtitle(subtitles[0] ?? text);
    subtitleTimer.current = window.setInterval(() => {
      index += 1;
      if (index >= subtitles.length) {
        clearSubtitleTimer();
        return;
      }
      setSubtitle(subtitles[index]);
    }, 3300);
  }

  function play(replay = false) {
    if (audioRef.current) {
      if (state === "paused" && !replay) {
        const p = audioRef.current.play();
        if (p && typeof p.then === "function") {
          p.then(() => {
            startSubtitles();
            setState("playing");
          }).catch((_e) => fallbackSpeechSynthesis(replay));
        }
        return;
      }

      if (replay) {
        audioRef.current.currentTime = 0;
      }

      const p = audioRef.current.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          startSubtitles();
          setState("playing");
        }).catch((_e) => fallbackSpeechSynthesis(replay));
      }
      return;
    }

    fallbackSpeechSynthesis(replay);
  }

  function fallbackSpeechSynthesis(replay = false) {
    if (!("speechSynthesis" in window)) {
      setSubtitle(text);
      setState("complete");
      return;
    }

    if (state === "paused" && !replay) {
      window.speechSynthesis.resume();
      startSubtitles();
      setState("playing");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice =
      voices.find((voice) => /natural|aria|jenny|google|english/i.test(voice.name)) ?? voices[0] ?? null;
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = 0.92;
    utterance.onend = () => {
      clearSubtitleTimer();
      setState("complete");
      setSubtitle(subtitles.at(-1) ?? text);
    };
    utterance.onerror = () => {
      clearSubtitleTimer();
      setState("idle");
    };
    utteranceRef.current = utterance;
    startSubtitles();
    setState("playing");
    window.speechSynthesis.speak(utterance);
  }

  function pause() {
    if (audioRef.current && state === "playing") {
      audioRef.current.pause();
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
    clearSubtitleTimer();
    setState("paused");
  }

  useEffect(() => {
    return () => {
      clearSubtitleTimer();
      if (audioRef.current) audioRef.current.pause();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="glass-panel p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={state === "playing" ? "secondary" : "default"}
          onClick={() => (state === "playing" ? pause() : play(false))}
          aria-label={state === "playing" ? "Pause introduction narration" : "Play introduction narration"}
        >
          {state === "playing" ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {state === "playing" ? "Pause" : state === "paused" ? "Resume" : "Play Voice Narration"}
        </Button>
        <Button variant="outline" onClick={() => play(true)} aria-label="Replay introduction narration">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Replay
        </Button>
      </div>

      <p className="mt-4 min-h-12 rounded-[8px] border border-white/10 bg-black/20 px-3 py-2 text-sm leading-6 text-muted-foreground">
        {subtitle || "Subtitles appear here after you press play."}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            Voice volume
          </span>
          <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={([next]) => setVolume(next)} />
        </label>
        <label className="grid gap-2 text-xs text-muted-foreground">
          <span>Playback speed · {rate.toFixed(2)}x</span>
          <Slider value={[rate]} min={0.72} max={1.18} step={0.01} onValueChange={([next]) => setRate(next)} />
        </label>
      </div>
    </div>
  );
}
