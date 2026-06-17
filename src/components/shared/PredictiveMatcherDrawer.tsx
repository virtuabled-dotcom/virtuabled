import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, BarChart3, Users, FileText, Check, Search, Sparkles, ArrowRight, BrainCircuit, Lightbulb, Keyboard } from 'lucide-react';

interface PredictiveMatcherDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyProfile?: (skills: string[], suggestedTitle: string) => void;
}

const ALL_SKILL_OPTIONS = [
  "TypeScript", "React", "Node.js", "CI/CD Protocols", 
  "SQL Analytics", "Python/Pandas", "PowerBI & Excel", "Data Modeler",
  "CRM Overlays", "SLA Monitoring", "Ticketing Systems", "Client Relations",
  "B-BBEE Reporting", "ESG Audit Tools", "Labour Regulations", "Document Processing",
  "Web Accessibility (a11y)", "Manual Auditing", "React Testing Library", "WAI-ARIA",
  "SIEM Tools", "Network Security", "Vulnerability Assessment"
];

const PRESET_CAREERS = [
  {
    id: "fs-dev",
    category: "tech",
    title: "Full-Stack Software Engineer",
    skills: ["TypeScript", "React", "Node.js", "CI/CD Protocols"],
    accommodations: "Voice-activated macros, customized high-contrast screen reader layouts, custom shortcut keypads.",
    impact: "Creates robust responsive interfaces and secure server routes under rigorous enterprise SLAs.",
    icon: Cpu,
    demand: "Critical Partner Demand",
  },
  {
    id: "data-analyst",
    category: "data",
    title: "Data Specialist & BI Analyst",
    skills: ["SQL Analytics", "Python/Pandas", "PowerBI & Excel", "Data Modeler"],
    accommodations: "Ergonomic workspace interfaces, customized screen zoom ratios, voice-to-text assists.",
    impact: "Unlocks high-value analytics insight and supports mission-critical data warehouse migrations.",
    icon: BarChart3,
    demand: "High Partner Demand",
  },
  {
    id: "bpo-agent",
    category: "ops",
    title: "Operations Support Professional",
    skills: ["CRM Overlays", "SLA Monitoring", "Ticketing Systems", "Client Relations"],
    accommodations: "Real-time speech-to-text caption translations, text-to-speech assistive tools, calibrated headsets.",
    impact: "Ensures flawless multi-channel support with high CSAT, satisfying corporate service indices.",
    icon: Users,
    demand: "Steady Stream Demand",
  },
  {
    id: "compliance-admin",
    category: "compliance",
    title: "Compliance Database Auditor",
    skills: ["B-BBEE Reporting", "ESG Audit Tools", "Labour Regulations", "Document Processing"],
    accommodations: "Focus enhancement interfaces, step-by-step document readers, customized rest cycles.",
    impact: "Tracks audit results, compiling aggregate ESG compliance reports securely.",
    icon: FileText,
    demand: "High Compliance Demand",
  },
  {
    id: "qa-engineer",
    category: "tech",
    title: "Accessibility QA Architect",
    skills: ["Web Accessibility (a11y)", "Manual Auditing", "React Testing Library", "WAI-ARIA"],
    accommodations: "Braille terminal overlays, dynamic voice-guided DOM explorers, tactile workspace tools.",
    impact: "Validates digital application compliance ratios to pass statutory Level-AA compliance audits.",
    icon: Cpu,
    demand: "Expanding Niche Demand",
  }
];

export function PredictiveMatcherDrawer({ isOpen, onClose, onApplyProfile }: PredictiveMatcherDrawerProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [typedSkill, setTypedSkill] = useState("");

  // Handle ESC close key command
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = typedSkill.trim();
    if (!clean) return;
    if (!selectedSkills.includes(clean)) {
      setSelectedSkills(prev => [...prev, clean]);
    }
    setTypedSkill("");
  };

  const clearSkills = () => setSelectedSkills([]);

  // Calculate scores for each preset career path
  const scores = PRESET_CAREERS.map(career => {
    if (selectedSkills.length === 0) {
      return { ...career, score: 0 };
    }
    // Calculate matching overlap
    const matchedCount = career.skills.filter(s => selectedSkills.includes(s)).length;
    // Jaccard-like score percentage
    const score = Math.round((matchedCount / career.skills.length) * 100);
    return { ...career, score };
  }).sort((a, b) => b.score - a.score);

  const bestMatch = scores[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[200] cursor-pointer"
          />

          {/* Slide-In Drawer Box */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#070b13]/95 border-l border-white/[0.08] shadow-2xl z-[201] flex flex-col backdrop-blur-xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Predictive Role Matching tool"
          >
            {/* Header section with radial glow */}
            <div className="p-6 border-b border-white/[0.06] relative shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#14b8a6]/5 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="text-brand-teal" size={20} />
                  <span className="text-[10px] font-mono tracking-wider font-bold text-brand-teal uppercase">Adaptive Profiler v1.2</span>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/5 transition-all outline-none cursor-pointer focus:ring-1 focus:ring-brand-teal"
                  aria-label="Close drawer"
                >
                  <X size={16} />
                </button>
              </div>

              <h3 className="text-xl font-display text-white font-light mt-3">
                Predictive <span className="font-semibold italic text-brand-teal font-sans">Role Matcher.</span>
              </h3>
              <p className="text-zinc-400 text-xs font-light mt-1.5 leading-relaxed">
                Toggle your skill profile beneath. Our profile matching engine will instantly suggest high-demand career paths and pre-adapted workspace profiles.
              </p>
            </div>

            {/* Scrollable Workspace */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-left">
              
              {/* Skill select area */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider font-bold">
                  <span className="text-zinc-400">Step 1: Select Your Current Skills</span>
                  {selectedSkills.length > 0 && (
                    <button onClick={clearSkills} className="text-brand-amber cursor-pointer hover:underline">
                      Clear Selection
                    </button>
                  )}
                </div>

                {/* Grid chips */}
                <div className="flex flex-wrap gap-1.5">
                  {ALL_SKILL_OPTIONS.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-2.5 py-1.5 text-[10px] font-mono font-medium rounded-xl transition-all cursor-pointer border ${
                          isSelected 
                            ? "bg-brand-teal border-brand-teal/20 text-[#000] font-semibold" 
                            : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {isSelected && <Check size={10} className="inline mr-1 stroke-[3px]" />}
                        {skill}
                      </button>
                    );
                  })}
                </div>

                {/* Custom input */}
                <form onSubmit={addCustomSkill} className="relative mt-2">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search or add custom skill..."
                    value={typedSkill}
                    onChange={(e) => setTypedSkill(e.target.value)}
                    className="w-full bg-[#0c101b] border border-white/[0.08] rounded-xl pl-9 pr-20 py-2 text-xs text-white placeholder:text-zinc-650 focus:outline-none focus:border-brand-teal font-mono transition-colors h-9"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[9px] text-white font-mono rounded cursor-pointer transition-colors"
                  >
                    + ADD
                  </button>
                </form>
              </div>

              {/* Dynamic Matching Outputs */}
              <div className="space-y-4 pt-2">
                <div className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400">
                  Step 2: Real-time Platform Match Results
                </div>

                {selectedSkills.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/[0.04] text-center space-y-3">
                    <Lightbulb className="text-zinc-600 mx-auto" size={24} />
                    <p className="text-xs text-zinc-500 font-light max-w-xs mx-auto">
                      Select skill chips or add custom proficiencies above to trigger the algorithmic matching simulation.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Scores view */}
                    {scores.map((path, idx) => {
                      const PathIcon = path.icon;
                      const hasScore = path.score > 0;
                      return (
                        <motion.div
                          layout
                          key={path.id}
                          className={`p-4 rounded-xl border transition-all ${
                            idx === 0 && hasScore 
                              ? "bg-white/[0.02] border-brand-teal/20" 
                              : "bg-white/[0.01] border-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3">
                              <div className={`p-2 rounded-lg shrink-0 ${
                                idx === 0 && hasScore 
                                  ? "bg-[#14b8a6]/10 text-brand-teal border border-[#14b8a6]/20" 
                                  : "bg-white/[0.02] text-zinc-400 border border-white/[0.04]"
                              }`}>
                                <PathIcon size={16} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{path.title}</h4>
                                <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase block mt-0.5 tracking-widest">{path.demand}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className={`text-sm font-mono font-bold ${
                                hasScore ? "text-brand-teal" : "text-zinc-600"
                              }`}>
                                {path.score}% Match
                              </span>
                            </div>
                          </div>

                          {/* Skill overlaps highlight */}
                          {hasScore && (
                            <div className="mt-3 pt-3 border-t border-white/[0.04] space-y-2.5">
                              <div>
                                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-widest block">Matched Overlap</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {path.skills.map(sk => {
                                    const matched = selectedSkills.includes(sk);
                                    return (
                                      <span 
                                        key={sk} 
                                        className={`px-1.5 py-0.5 rounded text-[8px] font-mono border ${
                                          matched 
                                            ? "bg-[#14b8a6]/10 border-brand-teal/25 text-brand-teal" 
                                            : "bg-white/[0.01] border-white/[0.04] text-zinc-650"
                                        }`}
                                      >
                                        {sk}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>

                              <div>
                                <span className="text-[8px] font-mono text-brand-amber font-semibold uppercase tracking-wider block">Calibrated Workstation Accommodations</span>
                                <p className="text-[10px] text-zinc-400 leading-relaxed font-light font-sans mt-0.5">
                                  {path.accommodations}
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Tray */}
            <div className="p-6 border-t border-white/[0.06] bg-slate-950/80 backdrop-blur-md shrink-0 space-y-3">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 justify-center">
                <Keyboard size={10} className="text-zinc-600" />
                <span>ESC key exits drawer</span>
              </div>

              <button
                disabled={selectedSkills.length === 0}
                onClick={() => {
                  if (onApplyProfile && bestMatch && bestMatch.score > 0) {
                    onApplyProfile(selectedSkills, bestMatch.title);
                  }
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-brand-teal disabled:bg-zinc-800 disabled:text-zinc-500 text-slate-950 hover:bg-[#14b8a6] hover:shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:scale-101 transition-all font-mono font-bold uppercase text-[10px] tracking-widest inline-flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Deploy Matches to Application</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
