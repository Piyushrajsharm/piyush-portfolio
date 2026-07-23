"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { Copy, ExternalLink, Moon, Search, Sun, X, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { type PortfolioData } from "@/config/site";

export function CommandPalette({ portfolio }: { portfolio: PortfolioData }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, contrast, toggleContrast } = useTheme();

  useEffect(() => {
    const openPalette = () => setOpen(true);
    window.addEventListener("portfolio-command-open", openPalette);
    return () => window.removeEventListener("portfolio-command-open", openPalette);
  }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const projectItems = useMemo(
    () => portfolio.projects.slice(0, 8).map((project) => ({ label: project.title, value: `Project: ${project.title}` })),
    [portfolio.projects]
  );

  function navigateTo(hash: string) {
    setOpen(false);
    window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 30);
  }

  function copyEmail() {
    navigator.clipboard.writeText(portfolio.person.email).catch(() => undefined);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[75] bg-black/60 backdrop-blur-xl" />
        <Dialog.Content className="glass-panel fixed left-1/2 top-[14vh] z-[76] w-[calc(100vw-1.5rem)] max-w-2xl -translate-x-1/2 overflow-hidden p-0 shadow-2xl">
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Command className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-4 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              <Command.Input
                autoFocus
                placeholder="Search sections, projects, actions..."
                className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                className="focus-ring grid h-9 w-9 place-items-center rounded-[8px] border border-white/10 bg-white/[0.06] text-muted-foreground"
                aria-label="Close command palette"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              <Command.Empty className="px-4 py-8 text-center text-sm text-muted-foreground">
                No result. Try “projects”, “resume”, or “contact”.
              </Command.Empty>

              <Command.Group heading="Navigate">
                {portfolio.navigation.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={item.label}
                    onSelect={() => navigateTo(item.href)}
                    className="flex cursor-pointer items-center gap-3 rounded-[8px] px-3 py-3 text-sm data-[selected=true]:bg-white/[0.08]"
                  >
                    <Zap className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Projects">
                {projectItems.map((item) => (
                  <Command.Item
                    key={item.value}
                    value={item.value}
                    onSelect={() => navigateTo("#projects")}
                    className="flex cursor-pointer items-center gap-3 rounded-[8px] px-3 py-3 text-sm data-[selected=true]:bg-white/[0.08]"
                  >
                    <ExternalLink className="h-4 w-4 text-violet-200" aria-hidden="true" />
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Actions">
                <Command.Item
                  value="Copy email"
                  onSelect={copyEmail}
                  className="flex cursor-pointer items-center gap-3 rounded-[8px] px-3 py-3 text-sm data-[selected=true]:bg-white/[0.08]"
                >
                  <Copy className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                  Copy email
                </Command.Item>
                <Command.Item
                  value="Toggle theme"
                  onSelect={toggleTheme}
                  className="flex cursor-pointer items-center gap-3 rounded-[8px] px-3 py-3 text-sm data-[selected=true]:bg-white/[0.08]"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4 text-amber-200" aria-hidden="true" /> : <Moon className="h-4 w-4 text-cyan-200" aria-hidden="true" />}
                  Switch to {theme === "dark" ? "light" : "dark"} mode
                </Command.Item>
                <Command.Item
                  value="Toggle high contrast"
                  onSelect={toggleContrast}
                  className="flex cursor-pointer items-center gap-3 rounded-[8px] px-3 py-3 text-sm data-[selected=true]:bg-white/[0.08]"
                >
                  <Zap className="h-4 w-4 text-emerald-200" aria-hidden="true" />
                  {contrast ? "Disable" : "Enable"} high contrast
                </Command.Item>
              </Command.Group>
            </Command.List>
            <div className="border-t border-white/10 px-4 py-3 text-xs text-muted-foreground">
              Tip: press Ctrl+K anytime.
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
