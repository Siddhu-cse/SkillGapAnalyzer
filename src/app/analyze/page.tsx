"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Search, Plus, X, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function AnalyzePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [roleSearch, setRoleSearch] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [manualSkills, setManualSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const addSkill = () => {
    if (newSkill.trim() && !manualSkills.includes(newSkill.trim())) {
      setManualSkills([...manualSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setManualSkills(manualSkills.filter(s => s !== skill));
  };

  const startAnalysis = async () => {
    if (!file || !roleSearch) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", roleSearch); // Passing the role title as the JD context
    if (targetCompany) formData.append("targetCompany", targetCompany);
    formData.append("manualSkills", JSON.stringify(manualSkills));

    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) {
        if (data.error.includes("No API Key")) {
          alert("⚠️ Missing API Key: Please configure your GROQ_API_KEY in the Render dashboard (Environment settings) or .env.local file.");
        } else {
          alert(data.error);
        }
        return;
      }
      sessionStorage.setItem("skillgap_result", JSON.stringify(data));
      router.push("/result");
    } catch {
      alert("Diagnostic failed. The Career Architect is currently offline or the profile is unreadable.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-black text-white">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-neon-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <Sparkles className="w-3 h-3 text-[var(--color-neon-cyan)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-neon-cyan)]">Self-Audit Module</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Initialize <span className="text-gradient">Diagnostic</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Research your target role and benchmark your professional DNA against real-time market requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Role & Identity */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Role Search & Target Company */}
            <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 space-y-6">
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Target Career Path
                </h2>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="e.g. Senior Full Stack Engineer"
                    value={roleSearch}
                    onChange={(e) => setRoleSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-[var(--color-neon-cyan)] transition-colors outline-none text-white font-medium"
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Target Company (Optional)
                </h2>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="e.g. Google, Stripe, OpenAI"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-[var(--color-neon-purple)] transition-colors outline-none text-white font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Manual Skill Audit */}
            <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Skill Overrides
              </h2>
              <div className="flex gap-2 mb-4">
                <input 
                  type="text"
                  placeholder="Add skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
                />
                <button onClick={addSkill} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {manualSkills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-[var(--color-neon-blue)]/10 border border-[var(--color-neon-blue)]/20 text-[10px] font-bold text-[var(--color-neon-blue)] flex items-center gap-2">
                    {s}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => removeSkill(s)} />
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Profile Upload */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-10 rounded-[3rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center group hover:border-[var(--color-neon-cyan)]/30 transition-all cursor-pointer relative overflow-hidden"
          >
            <input 
              type="file" 
              onChange={handleFileUpload} 
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
              accept=".pdf,.docx"
            />
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-[var(--color-neon-blue)]" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {file ? file.name : "Upload Skill Profile"}
            </h3>
            <p className="text-white/30 text-sm mb-6">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF or DOCX format"}
            </p>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">
              Drop file to initialize
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Button 
            size="lg" 
            disabled={!file || !roleSearch || isAnalyzing}
            onClick={startAnalysis}
            className="px-20 py-10 text-2xl rounded-3xl font-black uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(0,225,255,0.2)] disabled:opacity-20"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Orchestrating...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                Run Diagnostic
                <ArrowRight className="w-6 h-6" />
              </div>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
