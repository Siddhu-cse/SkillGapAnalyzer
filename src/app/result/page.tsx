"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, BookOpen, TrendingUp, Briefcase, Zap, Loader2, Info, ExternalLink, Users, Star, MessageSquare, Target, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

interface SkillDetail {
  explanation: string;
  importance: string;
  resources: Array<{ name: string; url: string }>;
}

interface InterviewQuestion {
  question: string;
  context: string;
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  repoType: string;
}

interface AnalysisResult {
  score: number;
  rejectionProbability?: number;
  summary: string;
  missingSkills: string[];
  presentSkills: string[];
  softSkills?: {
    missing: string[];
    present: string[];
  };
  skillDetails?: Record<string, SkillDetail>;
  trendingSkills: string[];
  marketPulse?: Record<string, "Hype" | "Utility" | "Foundational">;
  suggestedRoles: string[];
  courses: Array<{ title: string; platform: string; type: string; link?: string }>;
  projects?: Project[];
  interviewQuestions?: InterviewQuestion[];
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("skillgap_result");
    if (!data) {
      router.push("/analyze");
      return;
    }
    try {
      const parsed = JSON.parse(data);
      setResult(parsed);
      if (parsed.missingSkills?.length > 0) setSelectedSkill(parsed.missingSkills[0]);
    } catch (e) {
      router.push("/analyze");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 animate-spin text-[var(--color-neon-blue)]" />
      </div>
    );
  }

  const { score, rejectionProbability, summary, missingSkills, presentSkills, trendingSkills, marketPulse, suggestedRoles, courses, projects, skillDetails, softSkills, interviewQuestions } = result;

  const getSkillDetail = (skillName: string): SkillDetail => {
    if (skillDetails && skillDetails[skillName]) return skillDetails[skillName];
    return {
      explanation: `${skillName} is a core requirement identified in the market benchmark for your target role.`,
      importance: `High strategic value for senior-level orchestration.`,
      resources: [
        { name: "Expert Search", url: `https://www.google.com/search?q=learn+${encodeURIComponent(skillName)}` },
        { name: "Docs/Youtube", url: `https://www.youtube.com/results?search_query=learn+${encodeURIComponent(skillName)}` }
      ]
    };
  };

  const currentDetail = selectedSkill ? getSkillDetail(selectedSkill) : null;

  return (
    <div className="min-h-screen py-12 relative overflow-hidden bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Market Benchmark Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10 border-b-2 border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[var(--color-neon-cyan)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-neon-cyan)]">Career Architecture Blueprint</span>
            </div>
            <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Market <span className="text-gradient">Benchmark</span> Result</h1>
            <p className="text-white/60 text-xl italic font-medium leading-relaxed">"{summary}"</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Score Gauge */}
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" />
                <motion.circle cx="64" cy="64" r="56" stroke="var(--color-neon-cyan)" strokeWidth="10" fill="none" strokeDasharray="351.8" initial={{ strokeDashoffset: 351.8 }} animate={{ strokeDashoffset: 351.8 - (351.8 * score) / 100 }} transition={{ duration: 2 }} strokeLinecap="round" />
              </svg>
              <div className="text-4xl font-black flex flex-col items-center">
                <span>{score}</span>
                <span className="text-[8px] opacity-40 uppercase tracking-widest mt-1">Readiness</span>
              </div>
            </div>
            
            {/* Rejection Probability Gauge (If available) */}
            {rejectionProbability !== undefined && (
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="rgba(239,68,68,0.1)" strokeWidth="10" fill="none" />
                  <motion.circle cx="64" cy="64" r="56" stroke="rgb(239, 68, 68)" strokeWidth="10" fill="none" strokeDasharray="351.8" initial={{ strokeDashoffset: 351.8 }} animate={{ strokeDashoffset: 351.8 - (351.8 * rejectionProbability) / 100 }} transition={{ duration: 2, delay: 0.5 }} strokeLinecap="round" />
                </svg>
                <div className="text-4xl font-black flex flex-col items-center text-red-500">
                  <span>{rejectionProbability}%</span>
                  <span className="text-[8px] opacity-60 uppercase tracking-widest mt-1 text-red-400 text-center leading-tight">Rejection<br/>Risk</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Skills Delta Matrix */}
          <div className="lg:col-span-8 space-y-10">
            <div className="glass-panel p-10 rounded-[2.5rem] border-l-4 border-[var(--color-neon-purple)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target className="w-32 h-32" />
              </div>
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-[var(--color-neon-purple)]" />
                Skills Delta Visualization
              </h2>
              <div className="grid md:grid-cols-2 gap-10 relative z-10">
                <div>
                  <h3 className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Market Gaps
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {missingSkills.map(s => (
                      <button key={s} onClick={() => setSelectedSkill(s)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedSkill === s ? "bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-white/5 border-white/10 text-white/50 hover:border-red-500/30"}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-green-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Your Identity
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {presentSkills.map(s => (
                      <button key={s} onClick={() => setSelectedSkill(s)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedSkill === s ? "bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]" : "bg-white/5 border-white/10 text-white/50 hover:border-green-500/30"}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Curated Learning Pathways */}
            <div className="glass-panel p-10 rounded-[2.5rem]">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[var(--color-neon-cyan)]" />
                Curated Learning Pathways
              </h2>
              <div className="grid gap-4">
                {courses.map((course, i) => (
                  <a key={i} href={course.link?.startsWith('http') ? course.link : `https://www.youtube.com/results?search_query=${encodeURIComponent(course.title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-[var(--color-neon-cyan)]/5 hover:border-[var(--color-neon-cyan)]/30 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl font-black text-white/40 group-hover:text-[var(--color-neon-cyan)]">{i + 1}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${course.platform.toLowerCase() === 'udemy' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                            {course.platform}
                          </span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-white/20">High ROI</span>
                        </div>
                        <h4 className="font-bold text-lg group-hover:text-white transition-colors">{course.title}</h4>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/10 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Portfolio Killer Projects */}
            {projects && projects.length > 0 && (
              <div className="glass-panel p-10 rounded-[2.5rem] border-t-4 border-[var(--color-neon-blue)]">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-[var(--color-neon-blue)]" />
                  Portfolio Killer Projects
                </h2>
                <div className="grid gap-6">
                  {projects.map((project, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--color-neon-blue)]/50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold text-white">{project.title}</h4>
                        <span className="px-3 py-1 rounded-full bg-[var(--color-neon-blue)]/20 text-[var(--color-neon-blue)] text-[10px] font-black uppercase tracking-widest border border-[var(--color-neon-blue)]/30">
                          {project.repoType}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 mb-6 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-white/80">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Insight Panel */}
          <div className="lg:col-span-4 space-y-10">
            <AnimatePresence mode="wait">
              {selectedSkill && currentDetail ? (
                <motion.div key={selectedSkill} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-10 rounded-[2.5rem] border-2 border-[var(--color-neon-cyan)]/20 sticky top-24">
                  <h2 className="text-2xl font-black mb-6 uppercase text-gradient">{selectedSkill}</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">Architect Insight</h4>
                      <p className="text-sm text-white/80 leading-relaxed">{currentDetail.explanation}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Mastery Resources</h4>
                      <div className="space-y-2">
                        {currentDetail.resources.map((r, idx) => (
                          <a key={idx} href={r.url.startsWith('http') ? r.url : `https://${r.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                            <span className="text-xs font-bold text-white/60 group-hover:text-white">{r.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-20 group-hover:opacity-100" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="glass-panel p-8 rounded-[2.5rem]">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white/60">
                <TrendingUp className="w-5 h-5" />
                Market Pulse
              </h2>
              <div className="flex flex-col gap-3">
                {trendingSkills.map(s => {
                  const pulse = marketPulse?.[s];
                  let pulseColor = "text-white/30 border-white/10";
                  if (pulse === "Hype") pulseColor = "text-orange-400 border-orange-400/30 bg-orange-400/10";
                  if (pulse === "Utility") pulseColor = "text-[var(--color-neon-cyan)] border-[var(--color-neon-cyan)]/30 bg-[var(--color-neon-cyan)]/10";
                  if (pulse === "Foundational") pulseColor = "text-purple-400 border-purple-400/30 bg-purple-400/10";

                  return (
                    <button key={s} onClick={() => setSelectedSkill(s)} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-left">
                      <span className="text-xs font-bold text-white/80">{s}</span>
                      {pulse && (
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded border ${pulseColor}`}>
                          {pulse}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mock Interview Section */}
        {interviewQuestions && interviewQuestions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-12 rounded-[3.5rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-neon-blue)]/20 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-[var(--color-neon-blue)]" />
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Mock Interview <span className="text-gradient">Intelligence</span></h2>
                <p className="text-white/40">Surgical preparation for your target role</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {interviewQuestions.map((iq, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group">
                  <div className="text-[10px] font-black text-[var(--color-neon-cyan)] uppercase tracking-[0.3em] mb-4">Benchmark Question 0{i + 1}</div>
                  <h4 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-[var(--color-neon-cyan)] transition-colors">{iq.question}</h4>
                  <div className="flex gap-3">
                    <div className="mt-1"><Info className="w-4 h-4 text-white/30" /></div>
                    <p className="text-sm text-white/50 italic leading-relaxed">{iq.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
