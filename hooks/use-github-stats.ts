"use client";

import { useEffect, useState } from "react";

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl?: string;
  profileUrl?: string;
};

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(Boolean(username));

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" }
        });
        if (!response.ok) throw new Error("GitHub profile unavailable");
        const data = (await response.json()) as {
          public_repos: number;
          followers: number;
          following: number;
          avatar_url?: string;
          html_url?: string;
        };
        setStats({
          publicRepos: data.public_repos,
          followers: data.followers,
          following: data.following,
          avatarUrl: data.avatar_url,
          profileUrl: data.html_url
        });
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [username]);

  return { stats, loading };
}
