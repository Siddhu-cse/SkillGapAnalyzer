"use client";

import Link from "next/link";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] flex items-center justify-center shadow-[0_0_15px_rgba(176,38,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,225,255,0.6)] transition-shadow duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-gradient transition-all duration-300">
              SkillGap
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/market" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Market Pulse
            </Link>
            <Link href="/analyze" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Product
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              How it Works
            </Link>
            <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center">
            <Link href="/analyze">
              <Button size="sm">Start Analysis</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
