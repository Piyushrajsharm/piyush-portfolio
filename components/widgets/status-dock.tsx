"use client";

import { CloudSun, Code2, Download, GitBranch, MapPin, Timer, Users, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGitHubStats } from "@/hooks/use-github-stats";
import { compactNumber } from "@/lib/utils";

type StatusDockProps = {
  githubUsername: string;
  leetcodeUsername: string;
  resumeUrl: string;
};

export function StatusDock({ githubUsername, leetcodeUsername, resumeUrl }: StatusDockProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visits, setVisits] = useState(1);
  const [weather, setWeather] = useState("Loading");
  const [userLocation, setUserLocation] = useState("Delhi, India");
  const { stats, loading } = useGitHubStats(githubUsername);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const stored = Number(window.localStorage.getItem("piyush-visitor-count") ?? "0") + 1;
    window.localStorage.setItem("piyush-visitor-count", String(stored));
    setVisits(stored);

    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Automatic Location & Weather Detection
  useEffect(() => {
    const controller = new AbortController();

    async function detectLocationAndWeather() {
      try {
        // First try IP-based location lookup
        const ipRes = await fetch("https://ipapi.co/json/", { signal: controller.signal });
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          if (ipData.city && ipData.country_name) {
            setUserLocation(`${ipData.city}, ${ipData.country_name}`);
          }
          if (ipData.latitude && ipData.longitude) {
            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${ipData.latitude}&longitude=${ipData.longitude}&current=temperature_2m,weather_code&timezone=auto`,
              { signal: controller.signal }
            );
            if (weatherRes.ok) {
              const weatherData = await weatherRes.json();
              if (typeof weatherData.current?.temperature_2m === "number") {
                setWeather(`${Math.round(weatherData.current.temperature_2m)}°C`);
                return;
              }
            }
          }
        }

        // Fallback weather for Delhi
        const defaultWeatherRes = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.20&current=temperature_2m,weather_code&timezone=auto",
          { signal: controller.signal }
        );
        if (defaultWeatherRes.ok) {
          const data = await defaultWeatherRes.json();
          if (typeof data.current?.temperature_2m === "number") {
            setWeather(`${Math.round(data.current.temperature_2m)}°C`);
          }
        }
      } catch {
        setWeather("Live");
      }
    }

    detectLocationAndWeather();
    return () => controller.abort();
  }, []);

  const timeLabel = useMemo(
    () => (mounted && time ? time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "--:--"),
    [mounted, time]
  );

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <StatusItem icon={Timer} label="Current time" value={timeLabel} />
      <StatusItem icon={CloudSun} label="Weather" value={weather} />
      <StatusItem icon={Users} label="Visitor count" value={String(visits)} />
      <StatusItem
        icon={GitBranch}
        label="GitHub"
        value={loading ? "Syncing" : stats ? `${compactNumber(stats.publicRepos)} repos` : "Ready"}
      />
      <div className="glass-panel col-span-full overflow-hidden p-4 xl:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-medium">
            <GitBranch className="h-4 w-4 text-cyan-200" aria-hidden="true" />
            Contribution graph
          </p>
          <span className="text-xs text-muted-foreground">@{githubUsername}</span>
        </div>
        <img
          src={`https://ghchart.rshah.org/2dc3ff/${githubUsername}`}
          alt={`GitHub contribution graph for ${githubUsername}`}
          width={720}
          height={110}
          className="mt-4 h-auto w-full rounded-[8px] border border-white/10 bg-white/[0.04] p-2"
          loading="lazy"
        />
      </div>
      <div className="glass-panel col-span-full grid gap-3 p-4 xl:col-span-2">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Code2 className="h-4 w-4 text-violet-200" aria-hidden="true" />
          Practice signals
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <StatusMini label="LeetCode" value={leetcodeUsername ? "Profile ready" : "Add username"} />
          <StatusMini label="Analytics" value="10+ builds" />
          <StatusMini label="Location" value={userLocation} icon={MapPin} />
        </div>
        <Button asChild variant="secondary" size="sm" className="justify-self-start">
          <a href={resumeUrl} download>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download resume
          </a>
        </Button>
      </div>
    </div>
  );
}

function StatusItem({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-panel p-4">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-4 w-4 text-cyan-200" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}

function StatusMini({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-3">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        {Icon ? <Icon className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" /> : null}
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
