"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, X, Trash2, ArrowRight, UserCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Tell me about your background",
  "What are your top SQL & Power BI skills?",
  "Show me your top projects",
  "How can I contact or hire you?"
];

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 **Hi! I'm Piyush Raj Sharma.** Welcome to my portfolio! Ask me anything about my skills, projects, analytical background, or how we can work together."
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  async function sendMessage(textToSend?: string) {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: query
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      const botMessage: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: data.content || "I am currently unable to generate a response."
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          content: "Sorry, I had trouble connecting. Feel free to reach out to me directly at **piyushrajsharma969@gmail.com**!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearMessages() {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "👋 **Hi! I'm Piyush Raj Sharma.** Welcome to my portfolio! Ask me anything about my skills, projects, analytical background, or how we can work together."
      }
    ]);
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-5 right-5 z-40"
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="group focus-ring flex items-center gap-2.5 rounded-full border border-cyan-400/40 bg-slate-950/90 px-4 py-3 text-white shadow-[0_0_30px_rgba(103,232,249,0.3)] backdrop-blur-2xl transition-all hover:scale-105 hover:border-cyan-300 hover:bg-slate-900"
          aria-label="Chat directly with Piyush AI"
        >
          <div className="grid h-7 w-7 place-items-center rounded-full bg-cyan-400/20 text-cyan-200">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Chat with Piyush</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </motion.div>

      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="fixed bottom-20 right-4 z-50 flex h-[530px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#07070f]/95 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-[0_0_10px_rgba(103,232,249,0.2)] font-bold text-xs">
                  PR
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                    Piyush Raj Sharma
                    <UserCheck className="h-3.5 w-3.5 text-cyan-300" />
                  </h3>
                  <p className="flex items-center gap-1 text-[10px] text-cyan-200/80 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online · Direct Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearMessages}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
                  title="Clear chat history"
                  aria-label="Clear chat history"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close chat assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-slate-950 font-medium shadow-md"
                        : "border border-white/10 bg-white/[0.05] text-slate-100 shadow-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-xs text-cyan-200 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 animate-spin text-cyan-300" />
                    Piyush is typing...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {messages.length < 3 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-cyan-200/90 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all flex items-center gap-1"
                  >
                    {s}
                    <ArrowRight className="h-2.5 w-2.5" />
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="border-t border-white/10 bg-white/[0.02] p-3 flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Piyush a question..."
                className="h-9 text-xs border-white/15 bg-white/[0.05] focus-ring"
              />
              <Button type="submit" size="sm" disabled={loading || !input.trim()} className="h-9 px-3">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
