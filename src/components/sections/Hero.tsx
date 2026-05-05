"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Network, Cpu, Database, Binary, Brain, Code, Shield, Sparkles, Target } from "lucide-react";

export function Hero() {
  const innerNodes = [
    { icon: <Network size={20} />, delay: 0, color: "text-[var(--color-neon-purple)]" },
    { icon: <Database size={20} />, delay: 2, color: "text-[var(--color-neon-blue)]" },
    { icon: <Binary size={20} />, delay: 4, color: "text-[var(--color-neon-cyan)]" }
  ];

  const outerNodes = [
    { icon: <Brain size={20} />, delay: 1, color: "text-[var(--color-neon-purple)]" },
    { icon: <Code size={20} />, delay: 3, color: "text-[var(--color-neon-blue)]" },
    { icon: <Shield size={20} />, delay: 5, color: "text-[var(--color-neon-cyan)]" },
    { icon: <Target size={20} />, delay: 7, color: "text-[var(--foreground)]" }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--background)] transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-neon-purple)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-neon-blue)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[var(--foreground)]">
              Understand your{" "}
              <span className="text-gradient">true skill level</span>{" "}
              before the world does.
            </h1>
            <p className="text-xl text-[var(--foreground)]/70 mb-8 max-w-2xl leading-relaxed">
              Harness the power of high-precision LLMs to map your professional trajectory. Identify hidden skill gaps, predict career market shifts, and build a surgically precise roadmap to mastery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/analyze">
                <Button size="lg" className="w-full sm:w-auto shadow-lg">
                  Analyze Your Profile
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto border-[var(--foreground)]/10 hover:bg-[var(--foreground)]/5 transition-colors">
                  See How It Works
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center h-[600px]"
          >
            {/* Background Decorative Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px] rounded-full border border-[var(--foreground)]/5 border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[350px] h-[350px] rounded-full border border-[var(--foreground)]/5 border-dashed"
            />

            {/* Center Node */}
            <motion.div
              animate={{ 
                boxShadow: ["0 0 20px rgba(176,38,255,0.2)", "0 0 60px rgba(0,225,255,0.3)", "0 0 20px rgba(176,38,255,0.2)"] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 rounded-full glass-panel flex items-center justify-center z-20 relative bg-[var(--background)] shadow-2xl"
            >
              <Cpu className="w-12 h-12 text-[var(--color-neon-cyan)] animate-pulse" />
              {/* Outer spinning glow ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8px] rounded-full border-t-2 border-b-2 border-[var(--color-neon-purple)]/30"
              />
            </motion.div>

            {/* Inner Orbit (3 nodes) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {innerNodes.map((node, i) => (
                <motion.div
                  key={`inner-${i}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: node.delay }}
                  className="absolute w-[320px] h-[320px] rounded-full flex items-start justify-center origin-center"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: node.delay }}
                    className="w-12 h-12 -mt-6 rounded-full glass-panel flex items-center justify-center border-[var(--foreground)]/10"
                  >
                    <div className={node.color}>{node.icon}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Outer Orbit (4 nodes) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {outerNodes.map((node, i) => (
                <motion.div
                  key={`outer-${i}`}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: node.delay }}
                  className="absolute w-[520px] h-[520px] rounded-full flex items-start justify-center origin-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: node.delay }}
                    className="w-14 h-14 -mt-7 rounded-full glass-panel flex items-center justify-center border-[var(--foreground)]/10"
                  >
                    <div className={node.color}>{node.icon}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Floating Particles/Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3 + i, 
                  repeat: Infinity, 
                  delay: i * 0.5 
                }}
                className="absolute text-[var(--color-neon-cyan)]/30 pointer-events-none"
                style={{ 
                  left: `${20 + i * 15}%`, 
                  top: `${30 + (i % 3) * 20}%` 
                }}
              >
                <Sparkles size={12 + i * 2} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
