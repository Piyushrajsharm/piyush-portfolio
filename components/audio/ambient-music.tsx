"use client";

import { Music, Pause, Play, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useLocalStorage } from "@/hooks/use-local-storage";

type AmbientTrack = {
  id: string;
  name: string;
  mood: string;
};

type AudioNodes = {
  context: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

const trackFrequencies: Record<string, number[]> = {
  aurora: [110, 165, 220],
  signal: [132, 198, 264],
  focus: [82.41, 123.47, 164.81]
};

export function AmbientMusic({ tracks }: { tracks: AmbientTrack[] }) {
  const [enabled, setEnabled] = useLocalStorage("piyush-ambient-enabled", false);
  const [volume, setVolume] = useLocalStorage("piyush-ambient-volume", 0.16);
  const [trackId, setTrackId] = useLocalStorage("piyush-ambient-track", tracks[0]?.id ?? "aurora");
  const nodesRef = useRef<AudioNodes | null>(null);
  const volumeRef = useRef(volume);
  const trackRef = useRef(trackId);

  const stop = useCallback(() => {
    nodesRef.current?.oscillators.forEach((oscillator) => oscillator.stop());
    nodesRef.current?.context.close().catch(() => undefined);
    nodesRef.current = null;
  }, []);

  const start = useCallback(() => {
    if (nodesRef.current || typeof window === "undefined") return;
    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 780;
    gain.gain.value = volumeRef.current;
    filter.connect(gain);
    gain.connect(context.destination);

    const oscillators = (trackFrequencies[trackRef.current] ?? trackFrequencies.aurora).map((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      const oscillatorGain = context.createGain();
      oscillatorGain.gain.value = 0.18 / (index + 1);
      oscillator.connect(oscillatorGain);
      oscillatorGain.connect(filter);
      oscillator.start();
      return oscillator;
    });

    nodesRef.current = { context, gain, oscillators };
  }, []);

  useEffect(() => {
    volumeRef.current = volume;
    if (!nodesRef.current) return;
    nodesRef.current.gain.gain.setTargetAtTime(volume, nodesRef.current.context.currentTime, 0.02);
  }, [volume]);

  useEffect(() => {
    trackRef.current = trackId;
  }, [trackId]);

  useEffect(() => {
    if (enabled) start();
    if (!enabled) stop();
  }, [enabled, start, stop]);

  useEffect(() => {
    if (!enabled) return;
    stop();
    const timeout = window.setTimeout(start, 20);
    return () => window.clearTimeout(timeout);
  }, [enabled, start, stop, trackId]);

  useEffect(() => () => stop(), [stop]);

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium">
            <Music className="h-4 w-4 text-cyan-200" aria-hidden="true" />
            Ambient sound
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Off by default. Your preference is remembered.</p>
        </div>
        <Button
          variant={enabled ? "default" : "secondary"}
          size="sm"
          onClick={() => setEnabled(!enabled)}
          aria-label={enabled ? "Pause ambient music" : "Play ambient music"}
        >
          {enabled ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {enabled ? "Pause" : "Music"}
        </Button>
      </div>

      <div className="mt-4 grid gap-3">
        <div className="flex flex-wrap gap-2">
          {tracks.map((track) => (
            <button
              key={track.id}
              className={`focus-ring rounded-[8px] border px-3 py-2 text-left text-xs transition ${
                track.id === trackId
                  ? "border-cyan-200/45 bg-cyan-200/12 text-cyan-100"
                  : "border-white/10 bg-white/[0.04] text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setTrackId(track.id)}
            >
              <span className="block font-medium">{track.name}</span>
              <span className="block">{track.mood}</span>
            </button>
          ))}
        </div>
        <label className="grid gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            Music volume
          </span>
          <Slider value={[volume]} min={0} max={0.35} step={0.01} onValueChange={([next]) => setVolume(next)} />
        </label>
      </div>
    </div>
  );
}
