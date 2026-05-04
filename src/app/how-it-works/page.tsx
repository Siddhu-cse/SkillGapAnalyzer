"use client";

import { motion } from "framer-motion";
import { Scan, Cpu, Rocket, ArrowRight, Sparkles, Binary, Layout, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HowItWorks() {
  const steps = [
    {
      title: "Diagnostic Initialization",
      desc: "Securely upload your professional identity. Our engine parses binary PDF structures into a high-fidelity semantic map, capturing 100% of your current technical DNA.",
      icon: <Scan className="w-8 h-8 text-[var(--color-neon-blue)]" />,
      glow: "rgba(0, 225, 255, 0.3)",
      delay: 0.1
    },
    {
      title: "Semantic Cross-Reference",
      desc: "Our Elite Architect agent cross-references your map against target Job Descriptions and real-time market trends, identifying the surgical 'Delta' between you and your goal.",
      icon: <Binary className="w-8 h-8 text-[var(--color-neon-purple)]" />,
      glow: "rgba(176, 38, 255, 0.3)",
      delay: 0.2
    },
    {
      title: "Mastery Orchestration",
      desc: "Receive your AI-curated Roadmap and Interview Intelligence. We don't just show the gap—we build the bridge to your new market value.",
      icon: <Rocket className="w-8 h-8 text-yellow-400" />,
      glow: "rgba(255, 204, 0, 0.3)",
      delay: 0.3
    }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-black text-white">
      {/* Hyper-Glow Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-neon-purple)]/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-neon-blue)]/20 rounded-full blur-[150px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-neon-cyan)]" />
            <span className="text-xs font-black uppercase tracking-widest text-[var(--color-neon-cyan)]">The Next Era of Growth</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter"
          >
            How it <span className="text-gradient">Works</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            Our architecture replaces guesswork with high-fidelity diagnostics. Explore the three-step journey to mastery.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: step.delay }}
              className="relative group"
            >
              {/* Animated Glow Border */}
              <div 
                className="absolute -inset-0.5 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: step.glow }}
              />
              
              <div className="relative glass-panel p-10 h-full rounded-[3rem] border border-white/10 hover:border-white/20 transition-all flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">{step.title}</h2>
                <p className="text-white/40 leading-relaxed mb-8 flex-1">
                  {step.desc}
                </p>
                <div className="w-12 h-1 bg-white/10 rounded-full group-hover:bg-[var(--color-neon-cyan)] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Integration Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-32 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] rounded-[4rem] blur-2xl opacity-20" />
          <div className="relative glass-panel p-16 rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
            <div className="max-w-xl relative z-10">
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Ready to <span className="text-gradient">Architect</span> Your Future?</h2>
              <p className="text-white/60 text-lg mb-10 leading-relaxed">
                Stop guessing your skill level. Start your precision diagnostic now and build your bridge to mastery.
              </p>
              <Link href="/analyze">
                <Button size="lg" className="px-12 py-8 text-lg rounded-2xl group">
                  Start Analysis
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative w-full md:w-[400px] h-[300px] flex items-center justify-center">
              {/* Abstract Visual Tech Map */}
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <div className="relative">
                <Layout className="w-32 h-32 text-[var(--color-neon-blue)]/20 animate-pulse" />
                <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-[var(--color-neon-cyan)]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
