"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Database, Network, Shield, Zap, Rocket, Search } from "lucide-react";

export default function AboutPage() {
  const phases = [
    {
      id: "01",
      title: "Identity Extraction",
      desc: "Our engine utilizes a specialized parsing layer to extract raw semantic data from your professional profile (PDF). We don't just read words; we identify your core professional DNA.",
      icon: <Database className="w-6 h-6 text-[var(--color-neon-purple)]" />
    },
    {
      id: "02",
      title: "Semantic Alignment",
      desc: "Using high-precision Large Language Models (LLMs), we perform a logical cross-reference between your profile and the target Job Description. This identifies the 'Delta'—the true gap between your current state and your goal.",
      icon: <Network className="w-6 h-6 text-[var(--color-neon-blue)]" />
    },
    {
      id: "03",
      title: "Market Intelligence",
      desc: "The system scans current industry benchmarks to ensure your learning roadmap isn't just generic—it's optimized for the highest-ROI skills currently trending in the global market.",
      icon: <Search className="w-6 h-6 text-[var(--color-neon-cyan)]" />
    },
    {
      id: "04",
      title: "Strategy Orchestration",
      desc: "Finally, our 'Elite Career Architect' agent synthesizes all data to generate your personalized Roadmap, Skill Intelligence Profile, and Interview Simulation questions.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />
    }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-black text-white">
      {/* Visual background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-neon-blue)]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter">
            Intelligence <br/>
            <span className="text-gradient">Architecture</span>
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            SkillGap isn't a simple resume scanner. It is a precision diagnostic engine built to bridge the gap between human potential and elite professional roles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-10 rounded-[3rem] border border-white/5 hover:border-[var(--color-neon-cyan)]/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                  {phase.icon}
                </div>
                <div className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors font-mono">
                  {phase.id}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">{phase.title}</h2>
              <p className="text-white/40 leading-relaxed">
                {phase.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-32 p-16 rounded-[4rem] glass-panel border-2 border-white/5 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 italic">"The future of professional growth isn't guessing. It's engineering."</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] mx-auto mb-6" />
            <p className="text-white/30 uppercase tracking-[0.3em] font-black text-xs">SkillGap Development Suite v1.0</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
