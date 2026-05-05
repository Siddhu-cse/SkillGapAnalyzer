"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Map, TrendingUp, Rocket, Zap, Database, Cpu, Globe, Code } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { FeatureCard } from "@/components/ui/FeatureCard";

export default function Home() {
  const [selectedGlobalSkill, setSelectedGlobalSkill] = useState<string | null>("Generative AI");

  const features = [
    { title: "Architectural Gap Analysis", description: "Deep-level scanning against elite industry benchmarks.", icon: <Brain className="w-6 h-6" /> },
    { title: "Strategic Prediction", description: "See market shifts before they occur with AI forecasting.", icon: <TrendingUp className="w-6 h-6" /> },
    { title: "Roadmap Orchestration", description: "Surgically precise learning paths for rapid mastery.", icon: <Map className="w-6 h-6" /> },
  ];

  const trendingSkills = [
    "Generative AI", "Prompt Engineering", "System Design", "Rust", "Web3", 
    "Machine Learning", "Cloud Architecture", "Cybersecurity", "Data Engineering", "DevOps"
  ];

  const globalSkillData: Record<string, { desc: string; importance: string; icon: React.ReactNode }> = {
    "Generative AI": {
      icon: <Cpu className="w-6 h-6" />,
      desc: "Neural networks capable of creating content, code, and synthetic data.",
      importance: "The core engine of the next industrial revolution."
    },
    "Prompt Engineering": {
      icon: <Code className="w-6 h-6" />,
      desc: "Structured communication with LLMs to maximize output precision.",
      importance: "The essential bridge between human intent and machine execution."
    },
    "System Design": {
      icon: <Database className="w-6 h-6" />,
      desc: "Architectural foundation of scalable distributed systems.",
      importance: "Required for senior leadership in engineering organizations."
    },
    "Rust": {
      icon: <Zap className="w-6 h-6" />,
      desc: "Memory-safe, high-performance systems programming language.",
      importance: "Replacing C++ for mission-critical infrastructure."
    },
    "Web3": {
      icon: <Globe className="w-6 h-6" />,
      desc: "Decentralized web powered by permissionless protocols.",
      importance: "Enabling new ownership models in digital economies."
    },
    "Machine Learning": {
      icon: <Brain className="w-6 h-6" />,
      desc: "Statistical models and algorithms that improve through experience.",
      importance: "Driving decision-making across all modern professional domains."
    },
    "Cloud Architecture": {
      icon: <Database className="w-6 h-6" />,
      desc: "Design and orchestration of cloud-based computational resources.",
      importance: "The infrastructure skeleton of the global internet."
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <Hero />
      
      <section className="py-24 relative overflow-hidden border-y border-[var(--foreground)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-[10px] font-black text-[var(--color-neon-cyan)] uppercase tracking-[0.5em] mb-12">Global Skill Diagnostic Suite</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <FeatureCard key={i} title={feature.title} description={feature.description} icon={feature.icon} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Hub */}
      <section className="py-32 relative overflow-hidden bg-[var(--foreground)]/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Market <span className="text-gradient">Intelligence</span> Discovery</h2>
                <p className="text-[var(--foreground)]/40 text-xl max-w-lg leading-relaxed">Explore the definitive profiles of high-impact industry shifts.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {trendingSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedGlobalSkill(skill)}
                    className={`px-6 py-5 rounded-[2rem] glass-panel border transition-all duration-300 text-left ${
                      selectedGlobalSkill === skill 
                        ? "border-[var(--color-neon-cyan)] bg-[var(--color-neon-cyan)]/10 text-[var(--foreground)] shadow-lg" 
                        : "border-[var(--foreground)]/5 text-[var(--foreground)]/40 hover:border-[var(--foreground)]/20"
                    }`}
                  >
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Trend Active</div>
                    <div className="font-bold">{skill}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-32 min-h-[450px]">
              <AnimatePresence mode="wait">
                {selectedGlobalSkill && globalSkillData[selectedGlobalSkill] ? (
                  <motion.div 
                    key={selectedGlobalSkill} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }} 
                    className="glass-panel p-12 rounded-[4rem] border border-[var(--color-neon-purple)]/20 shadow-2xl"
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] flex items-center justify-center shadow-lg text-white">
                        {globalSkillData[selectedGlobalSkill].icon}
                      </div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter">{selectedGlobalSkill}</h3>
                    </div>
                    <p className="text-[var(--foreground)]/80 text-2xl leading-relaxed mb-10 font-medium">
                      {globalSkillData[selectedGlobalSkill].desc}
                    </p>
                    <div className="p-8 rounded-3xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 space-y-4">
                      <div className="text-[10px] uppercase font-black text-[var(--color-neon-cyan)] tracking-[0.4em]">Architect&apos;s Strategy</div>
                      <p className="text-[var(--foreground)]/60 text-lg italic leading-relaxed">
                        {globalSkillData[selectedGlobalSkill].importance}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center glass-panel p-20 rounded-[4rem] border-dashed border-[var(--foreground)]/10 opacity-30">
                    <div className="text-center">
                      <Rocket className="w-16 h-16 mx-auto mb-6" />
                      <p className="text-xl">Select a trend to architect intelligence</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 glass-panel p-20 rounded-[4rem] border border-[var(--foreground)]/5">
          <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tighter">Ready to <span className="text-gradient">Evolve</span>?</h2>
          <p className="text-[var(--foreground)]/50 text-xl mb-12 max-w-xl mx-auto">Join 10,000+ career architects closing their gaps with precision intelligence.</p>
          <Link href="/analyze">
            <Button size="lg" className="px-16 py-10 text-2xl rounded-3xl font-black uppercase tracking-widest shadow-xl">Initialize Diagnostic</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
