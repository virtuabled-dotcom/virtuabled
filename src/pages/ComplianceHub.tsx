import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Plus, Trash, Check, CheckSquare, ClipboardList, Info, HelpCircle } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HeroImage } from "@/components/shared/HeroImage";

interface TaskItem {
  id: string;
  quarter: "q1" | "q2" | "q3" | "q4";
  task: string;
  completed: boolean;
}

const INITIAL_TASKS: TaskItem[] = [
  { id: "task-1", quarter: "q1", task: "Perform baseline accessibility audits on digital portals", completed: true },
  { id: "task-2", quarter: "q1", task: "Register Employment Equity representatives with Department of Labor", completed: true },
  { id: "task-3", quarter: "q2", task: "Structure Socio-Economic Development (SED) funding plans", completed: false },
  { id: "task-4", quarter: "q2", task: "Benchmark internal workstations against WCAG 2.1 specifications", completed: false },
  { id: "task-5", quarter: "q3", task: "Map specialized workstation software licencing layers offsite", completed: false },
  { id: "task-6", quarter: "q4", task: "Compile and present statutory EE report to CRO and Board", completed: false }
];

export default function ComplianceHub() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/compliance-hub-hero.jpeg" tint="#F59E0B" />
      <div className="pt-32 pb-24 min-h-screen bg-[#0B132B] text-zinc-100 relative z-10">
      {/* Decorative Blur BG */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-brand-amber/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Breadcrumb />

        {/* Narrative Epicenter Hero block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-16"
        >
          <span className="text-brand-amber font-mono font-bold tracking-widest uppercase text-[10px] mb-4 block px-3.5 py-1.5 bg-brand-amber/10 border border-brand-amber/20 w-max rounded-sm">
            Operational Governance
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mb-6">
            Compliance <span className="font-medium italic text-brand-teal font-sans">Hub</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
            The primary organizational checklist tool and initial corporate strategy map.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Centralized Governance
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                Centralized Governance for Diversity and Equity
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                True compliance requires an organized approach. The Compliance Hub serves as your enterprise command center for aligning corporate growth with statutory equity guidelines. Track your organizational standing, review upcoming legal deadlines, assign operational accountability, and cross-reference your internal structures with the latest gazetted legislative adjustments smoothly.
              </p>
            </div>
          </div>
        </div>

        {/* Checklist and Progress Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Progress / Checklist Panel - solid high-contrast white panels configured for low vision screen readability as requested */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-850">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <ClipboardList size={14} className="text-brand-teal" /> Statutory Quarters Ledger
              </span>
              <span className="text-[10px] text-zinc-550 font-mono">* ACCESSIBLE CHECKBOX ATTACHMENTS</span>
            </div>

            {/* Quarters Grid of white drop-shadowed panels */}
            {(["q1", "q2", "q3", "q4"] as const).map((q) => {
              const qTasks = tasks.filter(t => t.quarter === q);
              return (
                <div key={q} className="p-6 rounded-2xl bg-white text-slate-950 border border-slate-200 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#14B8A6]" />
                  <div className="flex justify-between items-center mb-4 pl-3">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Quarter: {q.toUpperCase()} Audit Priorities
                    </span>
                    <span className="text-[10px] text-brand-teal bg-[#14B8A6]/10 px-2 py-0.5 rounded font-mono font-bold uppercase">
                      Required Section
                    </span>
                  </div>

                  <div className="space-y-3.5 pl-3">
                    {qTasks.map((t) => (
                      <div key={t.id} className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id={`chk-${t.id}`}
                          checked={t.completed}
                          onChange={() => toggleTask(t.id)}
                          className="w-4 h-4 rounded border-slate-300 text-[#14B8A6] focus:ring-[#14B8A6] mt-0.5 shrink-0 cursor-pointer"
                        />
                        <label 
                          htmlFor={`chk-${t.id}`}
                          className={`text-xs font-sans leading-relaxed select-none cursor-pointer ${
                            t.completed 
                              ? "line-through text-slate-400 font-light" 
                              : "text-slate-800 font-medium"
                          }`}
                        >
                          {t.task}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Progress Panel */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 sticky top-24">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF9F1C] uppercase block mb-4">
              Real-time Tracker status
            </span>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
              Linear Progress Monitor
            </h3>
            <p className="text-xs text-zinc-400 font-light mb-6">
              Checking off quarterly tasks fills your dynamic corporate compliance scorecard ledger.
            </p>

            {/* Interactive Linear Tracker Bar in Vibrant Teal */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">COMPLETED STEPS:</span>
                <span className="text-brand-teal font-bold">{completedCount} / {totalCount}</span>
              </div>

              {/* Bar Container */}
              <div className="w-full h-3.5 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#14B8A6] to-[#00B4D8]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-zinc-500 pt-2">
                <span>ESTIMATED PENALTIES INDEX:</span>
                <span className={`font-bold uppercase ${progressPercent >= 50 ? "text-brand-teal" : "text-brand-amber animate-pulse"}`}>
                  {progressPercent >= 100 ? "ZAR 0 SECURED" : `ZAR ${(6 - completedCount) * 400000} LIABILITY`}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-850 text-xs text-zinc-400 font-light space-y-4">
              <div className="flex gap-2 items-start">
                <Info size={16} className="text-brand-amber shrink-0 mt-0.5" />
                <p>
                  Statutory deadlines typically lock on December 15th annually. Reach 100% compliance early to secure complete auditing protection.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    </div>
  );
}
