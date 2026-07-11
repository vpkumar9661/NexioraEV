"use client";

import React, { useState } from "react";
import { Send, MessageSquare, Trash2, Bot, User } from "lucide-react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWorkspaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onClear: () => void;
  isStreaming: boolean;
}

export function ChatWorkspace({
  messages,
  onSendMessage,
  onClear,
  isStreaming
}: ChatWorkspaceProps) {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <section id="chat" className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-white font-sans">Conversation Workspace</h2>
          <p className="text-xs text-muted-foreground/60 mt-0.5">Prompt the AI Command Center to run battery optimization models or outline courses study roadmaps.</p>
        </div>
        <button
          onClick={onClear}
          className="p-2 rounded-xl border border-white/5 bg-white/2 text-muted-foreground hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Clear history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="rounded-[24px] border border-white/5 bg-black/50 overflow-hidden flex flex-col h-[400px]">
        {/* Messages list */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground/30 text-xs gap-3">
              <MessageSquare className="w-10 h-10 text-muted-foreground/15" />
              <span>Prompt the copilot to start diagnosing BMS balance shunts or drag ranges WLTP estimates.</span>
            </div>
          ) : (
            messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs leading-relaxed max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${
                  m.role === "user" 
                    ? "bg-[#7C4DFF]/15 border-[#7C4DFF]/30 text-[#7C4DFF]"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                }`}>
                  {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Bubble */}
                <div className={`p-4 rounded-2xl border ${
                  m.role === "user"
                    ? "bg-[#7C4DFF]/5 border-[#7C4DFF]/15 text-white"
                    : "bg-[#131722]/60 border-white/5 text-muted-foreground/90"
                }`}>
                  <p>{m.content}</p>
                </div>
              </div>
            ))
          )}

          {isStreaming && (
            <div className="flex gap-3 text-xs items-center opacity-50">
              <div className="w-7 h-7 rounded-lg border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span className="text-muted-foreground">Streaming advisor diagnostics...</span>
            </div>
          )}
        </div>

        {/* Input panel bottom */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-[#0F172A]/50 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Will solid-state cells replace lithium-ion?"
            className="flex-1 px-4 py-2 rounded-xl border border-white/10 bg-[#07090e] font-bold text-white text-xs focus:outline-none focus:border-[#7C4DFF] placeholder:text-muted-foreground/20"
          />
          <button
            type="submit"
            disabled={isStreaming}
            className="px-4 py-2 rounded-xl bg-[#7C4DFF] text-white hover:bg-[#7C4DFF]/90 transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
export type { ChatWorkspaceProps };
