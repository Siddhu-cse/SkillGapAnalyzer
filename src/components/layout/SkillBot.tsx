"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Bot, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function SkillBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "I am your Skill Intelligence Assistant. Analyze your profile to get personalized gap-closing strategies." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [persona, setPersona] = useState<"brutal" | "supportive">("brutal");
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customMessage?: string) => {
    const userMessage = customMessage || input.trim();
    if (!userMessage || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Pull context from session storage
    const analysisData = sessionStorage.getItem("skillgap_result");
    const context = analysisData ? JSON.parse(analysisData) : null;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, { role: "user", content: userMessage }],
          context: context, // Pass the skill analysis context to the AI
          persona: persona  // Pass the chosen persona
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || "Chat failed");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Chat Interaction Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Apologies, I'm experiencing a sync issue. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: `Intelligence Sync Error: ${errorMessage}. Please try again.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[400px] h-[600px] bg-[#0A0A0A] border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[var(--color-neon-purple)]/20 to-[var(--color-neon-blue)]/20 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center relative">
                  <Bot className="w-6 h-6 text-[var(--color-neon-cyan)]" />
                  {isInterviewMode && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black flex items-center justify-center"
                    >
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    {isInterviewMode ? "Shadow Interview" : "Skill Intelligence"}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    {!isInterviewMode && (
                      <>
                        <button 
                          onClick={() => setPersona("brutal")}
                          className={`text-[8px] px-2 py-0.5 rounded-full border transition-all ${persona === "brutal" ? "bg-red-500/20 border-red-500 text-red-500" : "border-white/20 text-white/40 hover:border-white/40"}`}
                        >
                          BRUTAL
                        </button>
                        <button 
                          onClick={() => setPersona("supportive")}
                          className={`text-[8px] px-2 py-0.5 rounded-full border transition-all ${persona === "supportive" ? "bg-green-500/20 border-green-500 text-green-500" : "border-white/20 text-white/40 hover:border-white/40"}`}
                        >
                          SUPPORTIVE
                        </button>
                      </>
                    )}
                    {isInterviewMode && (
                      <span className="text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                        Evaluation Active
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-[var(--color-neon-blue)] text-white ml-4 shadow-[0_4px_15px_rgba(0,225,255,0.2)]" 
                      : "bg-white/5 border border-white/10 text-white/80 mr-4"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-neon-cyan)]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-2 bg-black flex gap-2 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => { 
                  if (isInterviewMode) {
                    setIsInterviewMode(false);
                    setMessages(prev => [...prev, { role: "assistant", content: "Shadow Interview terminated. Returning to diagnostic mode." }]);
                  } else {
                    setIsInterviewMode(true);
                    setPersona("brutal");
                    handleSend("Challenge me with a technical question based on my gaps.");
                  }
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase transition-colors ${
                  isInterviewMode 
                    ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20" 
                    : "bg-[var(--color-neon-purple)]/10 border-[var(--color-neon-purple)]/30 text-[var(--color-neon-purple)] hover:bg-[var(--color-neon-purple)]/20"
                }`}
              >
                {isInterviewMode ? "Terminate Interview" : "Start Shadow Interview"}
              </button>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-black">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about your skill gaps..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-neon-cyan)]/50 transition-colors"
                />
                <button 
                  onClick={() => handleSend()}
                  className="absolute right-2 p-3 rounded-xl bg-[var(--color-neon-cyan)] text-black hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] flex items-center justify-center shadow-[0_0_30px_rgba(0,225,255,0.3)] hover:shadow-[0_0_50px_rgba(0,225,255,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        <Sparkles className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
