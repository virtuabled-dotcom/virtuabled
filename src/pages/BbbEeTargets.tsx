import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Milestone, Sparkles, HelpCircle, TrendingUp, AlertCircle, ShieldAlert } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SolutionDeepDive } from "@/components/shared/SolutionDeepDive";
import { HeroImage } from "@/components/shared/HeroImage";

export default function BbbEeTargets() {
  const [hiresCount, setHiresCount] = useState(2);

  // Compute live scorecard estimates based on slider
  const computeLevel = (count: number) => {
    if (count <= 1) return 5;
    if (count === 2) return 4;
    if (count === 3) return 3;
    if (count === 4) return 2;
    return 1;
  };

  const currentLevel = 5;
  const projectedLevel = computeLevel(hiresCount);
  const totalPointsSecured = 65 + hiresCount * 8.5;

  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/bbbee-ee-targets-hero.jpeg" tint="#F59E0B" />
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
            B-BBEE Weighting Forecaster
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mb-6">
            B-BBEE & EE <span className="font-medium italic text-brand-teal font-sans">Targets</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
            Transforming standard compliance risks into clear, point-scoring corporate scorecards.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Scorecard Strategy
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                Strategic Scorecard Optimization
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                Meet your Employment Equity mandates while maximizing your B-BBEE scorecard returns. Virtuabled assists your transformation team in structuring hiring initiatives so they contribute directly toward your Skills Development and Socio-Economic Development point quotas. Protect your business from non-compliance overheads while unlocking new procurement avenues through optimized tier status tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive weight balances side-by-side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
          {/* Slider controls on left */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-bold tracking-widest text-brand-teal uppercase block mb-4">
                Interactive Forecaster
              </span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
                Hires Weight Adjustment
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-8">
                Slide the weight indicator to adjust your target number of specialized candidates and observe projected returns instantly.
              </p>

              {/* Hires Slider */}
              <div className="space-y-6 bg-zinc-950/80 p-6 rounded-2xl border border-zinc-850">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">TARGET ANNUAL PLACEMENTS:</span>
                  <span className="text-brand-teal font-bold text-base">{hiresCount} Professionals</span>
                </div>

                <input 
                  type="range" 
                  min="0" 
                  max="5"
                  value={hiresCount}
                  onChange={(e) => setHiresCount(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                  id="hires-count-slider"
                />

                <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                  <span>0 (No change)</span>
                  <span>5 (Max trajectory)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-850 flex gap-3 text-xs text-zinc-400 font-light">
              <ShieldAlert size={18} className="text-brand-amber shrink-0 mt-0.5" />
              <p>
                Hires qualify simultaneously toward Skills Development expenditure criteria, ensuring deep multi-quota point scoring.
              </p>
            </div>
          </div>

          {/* Side-by-Side Comparison Model on Right */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-850 mb-6">
                <span className="text-xs uppercase tracking-widest text-zinc-450 font-mono flex items-center gap-1.5 font-bold">
                  <Scale size={14} className="text-brand-teal" /> Status Trajectory Comparison
                </span>
                <span className="text-[10px] text-zinc-550 font-mono">
                  LIVE SIMULATION
                </span>
              </div>

              {/* Grid Side-by-side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                {/* Current standing */}
                <div className="p-6 rounded-2xl bg-zinc-950/45 border border-zinc-900 flex flex-col justify-between min-h-[140px]">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-550 uppercase">Current Standing Layout</span>
                    <h4 className="text-white font-bold text-base tracking-wider mt-1 uppercase">Without Virtuabled</h4>
                  </div>
                  <div className="pt-4 mt-4 border-t border-zinc-900/40">
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Projected B-BBEE Level</span>
                    <span className="text-2xl font-light text-zinc-500 font-display">Level {currentLevel}</span>
                  </div>
                </div>

                {/* Optimised Virtuabled Trajectory */}
                <div className="p-6 rounded-2xl bg-[#14B8A6]/5 border border-brand-teal flex flex-col justify-between min-h-[140px] relative">
                  <div className="absolute top-2 right-2">
                    <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-brand-teal uppercase font-bold">Optimised Standing</span>
                    <h4 className="text-white font-bold text-base tracking-wider mt-1 uppercase">With Virtuabled</h4>
                  </div>
                  <div className="pt-4 mt-4 border-t border-brand-teal/20">
                    <span className="text-[9px] font-mono text-brand-teal block uppercase font-bold">Optimised Status Level</span>
                    <span className="text-2xl font-semibold text-brand-amber font-display">Level {projectedLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification & Metrics */}
            <div className="mt-8 pt-6 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left font-mono text-[10px] text-zinc-500">
                <span>EST: SECURED VALUE DISCRIMINANT POINTS: </span>
                <span className="text-white font-bold">{totalPointsSecured.toFixed(1)} Points</span>
              </div>
              <button
                type="button"
                onClick={() => alert(`Strategic forecast saved! Current target level: Level ${projectedLevel}`)}
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-white select-none shadow"
              >
                Save Scorecard Target Strategy
              </button>
            </div>
          </div>

        </div>

        {/* B-BBEE Scorecard Deep Dive block */}
        <SolutionDeepDive 
          pageId="bbbee-targets"
          solutionName="B-BBEE and EE Scorecard Optimization"
          successStory={{
            title: "Securing Level 3 Status with Managed remote BPO Integration",
            clientType: "Leading South African Business Solutions Provider",
            challenge: "Faced high risk of dropping to Level 5 due to failing the Priority Element sub-minimum on Skills Development (Code 300).",
            solution: "Virtuabled launched a structured remote learnership program that simultaneously satisfied both the representation quotas and the expenditure benchmarks.",
            kpis: [
              { label: "B-BBEE Tier Secured", value: "Level 3" },
              { label: "Scorecard Points", value: "+14.5 pts" },
              { label: "Capital Saved", value: "R2.4 Million" },
              { label: "Learner Retention", value: "90%" }
            ],
            quote: {
              text: "Without Virtuabled, verifying medical certificates and ensuring daily attendance tracking for the SANAS audit would have overwhelmed us. They automated the entire audit file.",
              author: "Patricia van Niekerk",
              role: "Employment Equity Chairperson"
            }
          }}
          whitePaper={{
            title: "Scorecard Calculus: Mitigating Priority Element Penalties under Generic B-BBEE Codes",
            abstract: "This legislative abstract outlines a mathematical model designed for South African transformation directors. We model the financial risks associated with the automatic 'Drop-One-Level' penalty in priority elements. We demonstrate that allocating portion of the skills-spend budget specifically toward adapted virtual candidates mitigates overall compliance risks at a fraction of the cost-of-capital compared to traditional broad-based training grants.",
            architectureNote: "Integrates with SANAS empirical requirements and compiles EEA2 / EEA4 demographic sheets dynamically in compliance with the Employment Equity Amendment Bill of 2023.",
            methodology: [
               "Scorecard risk-coefficient modelling",
               "Direct tax shield integration models",
               "SANAS-compliant medical-verification validation mapping"
            ],
            technicalStack: [
              "NQF Learnership Matrix",
               "SANAS Code 300 Rules",
               "SARS Section 12H Shields",
              "EEA2 / EEA4 Templates"
            ]
          }}
          faqs={[
            {
              question: "What is the specific penalty for failing to meet the 40% priority sub-minimum for Skills Development?",
              answer: "Your consolidated B-BBEE contributor status is automatically downgraded by one full level (e.g., from Level 3 to Level 4) regardless of excellent performance in other scorecard elements."
            },
            {
              question: "How does Virtuabled secure valid compliance folders for verification audits?",
              answer: "We maintain highly secure, POPIA-compliant directories storing certified medical practitioner declarations and completed Form EEA1 documents. This ensures you can export clean, verified audit folders instantly."
            },
            {
              question: "Can we claim both Skills Development Spend and Employment Equity quota points for the same candidate?",
              answer: "Yes, absolutely! Candidates trained under registered, registered learnership models qualify simultaneously towards numerical representation quotas and Skills Development leviable expenditure, offering maximum corporate return."
            }
          ]}
        />

      </div>
    </div>
    </div>
  );
}
