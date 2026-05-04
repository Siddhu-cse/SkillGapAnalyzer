"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="glass-panel p-6 rounded-2xl group transition-all duration-300 hover:shadow-[0_0_30px_rgba(176,38,255,0.15)]"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-neon-purple)]/20 to-[var(--color-neon-blue)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <div className="text-[var(--color-neon-blue)] group-hover:text-[var(--color-neon-cyan)] transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
        {title}
      </h3>
      <p className="text-white/60 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
