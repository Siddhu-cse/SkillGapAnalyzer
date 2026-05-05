"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Target, Globe, Activity } from "lucide-react";
import { useState } from "react";

interface TrendData {
  skill: string;
  demand: number;
  growth: number;
  status: "Hype" | "Utility" | "Foundational";
  description: string;
}

export default function MarketPulsePage() {
  const [trends] = useState<TrendData[]>([
    { skill: "Generative AI", demand: 98, growth: 120, status: "Hype", description: "Exponential demand for LLM orchestration and RAG architectures." },
    { skill: "Rust", demand: 85, growth: 45, status: "Utility", description: "Rising as the standard for high-performance systems and memory safety." },
    { skill: "System Design", demand: 92, growth: 15, status: "Foundational", description: "Critical for scaling distributed cloud-native applications." },
    { skill: "Web3/Solidity", demand: 65, growth: -20, status: "Utility", description: "Market correction in progress; focus shifted to L2 and ZK-proofs." },
    { skill: "Cybersecurity", demand: 88, growth: 30, status: "Foundational", description: "Constant demand increase due to rising state-sponsored threats." },
  ]);

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Visual background elements */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-neon-purple)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-neon-blue)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 mb-4">
            <Globe className="w-3 h-3 text-[var(--color-neon-cyan)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-neon-cyan)]">Live Global Pulse</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
            Market <span className="text-gradient">Intelligence</span>
          </h1>
          <p className="text-[var(--foreground)]/40 text-xl max-w-2xl mx-auto leading-relaxed">
            Real-time benchmarking of the global professional landscape. Identify the shifts before they become mainstream.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Trend Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[var(--foreground)]/20 mb-8 flex items-center gap-3">
              <TrendingUp className="w-4 h-4" />
              Active Trajectories
            </h2>
            {trends.map((trend, i) => (
              <motion.div 
                key={trend.skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-[2.5rem] border border-[var(--foreground)]/10 hover:border-[var(--color-neon-cyan)]/30 transition-all group relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row justify-between gap-8 items-center relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black uppercase tracking-tight">{trend.skill}</h3>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                        trend.status === "Hype" ? "bg-orange-500/10 border-orange-500/30 text-orange-600" :
                        trend.status === "Utility" ? "bg-[var(--color-neon-cyan)]/10 border-[var(--color-neon-cyan)]/30 text-[var(--color-neon-cyan)]" :
                        "bg-purple-500/10 border-purple-500/30 text-purple-600"
                      }`}>
                        {trend.status}
                      </span>
                    </div>
                    <p className="text-[var(--foreground)]/40 text-sm leading-relaxed max-w-lg">
                      {trend.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-12 shrink-0">
                    <div className="text-center">
                      <div className="text-3xl font-black text-[var(--foreground)]">{trend.demand}%</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-[var(--foreground)]/20 mt-1">Market Demand</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-xl font-black flex items-center justify-center gap-1 ${trend.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                        {trend.growth > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {Math.abs(trend.growth)}%
                      </div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-[var(--foreground)]/20 mt-1">YoY Growth</div>
                    </div>
                  </div>
                </div>

                {/* Background Sparkline Simulation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--foreground)]/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${trend.demand}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${trend.growth > 0 ? "bg-green-500/30" : "bg-red-500/30"}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Side Intelligence Panel */}
          <div className="space-y-8">
            <div className="glass-panel p-10 rounded-[3rem] border border-[var(--color-neon-purple)]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target className="w-32 h-32" />
              </div>
              <h2 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                <Zap className="w-5 h-5 text-[var(--color-neon-purple)]" />
                Strategic Shift
              </h2>
              <p className="text-sm text-[var(--foreground)]/60 leading-relaxed mb-8">
                The market is pivoting from &quot;Feature Completion&quot; to &quot;Orchestration Efficiency.&quot; Skills in AI integration and memory-safe systems are no longer optional—they are foundational.
              </p>
              <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
                <div className="text-[8px] font-black text-[var(--color-neon-purple)] uppercase tracking-widest mb-2">Architect&apos;s Warning</div>
                <p className="text-xs text-[var(--foreground)] italic leading-relaxed">&quot;Those who do not master AI orchestration by Q4 2025 will be architecturally irrelevant.&quot;</p>
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] border border-[var(--foreground)]/10">
              <h2 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                <Activity className="w-5 h-5 text-[var(--color-neon-cyan)]" />
                Global Rejection Rate
              </h2>
              <div className="text-5xl font-black mb-2 text-red-500">72%</div>
              <p className="text-xs text-[var(--foreground)]/40 leading-relaxed">
                Average rejection rate for roles requiring &apos;System Design&apos; when candidates lack &apos;Distributed Systems&apos; verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
