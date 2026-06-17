import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, Database, Settings, ShieldCheck, CheckCircle, Smartphone, Cpu, HelpCircle, Laptop } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SolutionDeepDive } from "@/components/shared/SolutionDeepDive";
import { HeroImage } from "@/components/shared/HeroImage";

const PRESETS = [
  {
    id: "sip-puff",
    name: "Sip-and-Puff Custom Config",
    focus: "Physical Mobility / Paralysis",
    tech: "Intellicue OS + Adaptive Air Switches",
    throughput: "35 WPM / Precision Zero-Latency",
    hardware: "Custom Pneumatic Switch & Micro-mount",
    latency: "4 ms",
  },
  {
    id: "high-contrast",
    name: "High-Contrast OS Override",
    focus: "Visual Accommodation / Low Vision",
    tech: "VoiceOver custom profile + NVDA layouts",
    throughput: "98% accuracy on complex code schemas",
    hardware: "Ultra-wide 400-nit localized matrix",
    latency: "0 ms virtual",
  },
  {
    id: "cognitive-focus",
    name: "Cognitive Shield Profile",
    focus: "Neurodivergence / ADHD / Autism",
    tech: "Virtuabled Focus Clutter Shield + Smart Timer",
    throughput: "+45% sprint focus continuation",
    hardware: "Active ANC soundscapes integration",
    latency: "Adaptive tuning",
  },
  {
    id: "voice-dictation",
    name: "Sub-vocal Speech Engine",
    focus: "Motor Restricted / Voice Inputs",
    tech: "Elmarie Voice Parser v4 + Cleft-adjust",
    throughput: "90 WPM dictation & script drafting",
    hardware: "Tactile cardiod array neck mount",
    latency: "12 ms transcription",
  }
];

export default function PredictiveMatcherPage() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);
    const timers = [
      setTimeout(() => setSimulationStep(2), 1000),
      setTimeout(() => setSimulationStep(3), 2000),
      setTimeout(() => setSimulationStep(4), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(0);
  };

  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/Professional_headshot_of_a_South_202606121055.jpeg" tint="#14B8A6" />
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
          <span className="text-brand-amber font-mono font-bold tracking-widest uppercase text-[10px] mb-4 xl:mb-6 block px-3.5 py-1.5 bg-brand-amber/10 border border-brand-amber/20 w-max rounded-sm">
            Interactive Synergy Tool
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mb-6">
            Predictive <span className="font-medium italic text-brand-teal">Matcher</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
            Moving beyond archaic keyword matching to active technological and systemic environmental synergy modeling.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Philosophical Axis
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                Precision Placement via Environmental Architecture
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                Traditional Applicant Tracking Systems (ATS) actively screen out elite talent by filtering for traditional physical infrastructure capabilities. Virtuabled’s Predictive Matcher reverses this paradigm. Our engine models a professional’s specialized workspace configurations—ranging from custom screen-reader layouts to advanced assistive voice interfaces—and cross-references them instantly with your enterprise technical environment. We ensure capability is matched with compatibility, delivering Day-One operational alignment.
              </p>
            </div>
          </div>
        </div>

        {/* The Matrix Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch" id="matrix-dashboard">
          
          {/* LEFT SIDE: Custom Candidate Workstation Presets */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-teal uppercase flex items-center gap-1.5">
                  <Settings size={12} className="animate-spin-slow" /> Preset Workstations
                </span>
                <span className="text-[10px] bg-brand-teal/10 text-brand-teal font-mono border border-brand-teal/20 px-2 py-0.5 rounded">
                  Matrix Source
                </span>
              </div>

              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
                Candidate Workstations
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-8">
                Select a workstation config to model its direct capability parameters against corporate databases.
              </p>

              {/* Selector Cards */}
              <div className="space-y-4">
                {PRESETS.map((preset) => {
                  const isSelected = preset.id === selectedPreset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPreset(preset);
                        resetSimulation();
                      }}
                      className={`w-full flex text-left p-4 rounded-2xl border transition-all duration-300 outline-none ${
                        isSelected 
                          ? "bg-[#14B8A6]/10 border-brand-teal text-white shadow-[0_4px_20px_rgba(20,184,166,0.1)]" 
                          : "bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/30"
                      }`}
                      id={`preset-btn-${preset.id}`}
                    >
                      <div className="mr-4 mt-0.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          isSelected ? "bg-brand-teal/20 border-brand-teal text-white" : "bg-zinc-900 border-zinc-800"
                        }`}>
                          <Laptop size={14} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold uppercase tracking-wider">{preset.name}</h4>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping" />}
                        </div>
                        <p className="text-[11px] font-mono text-zinc-400 mt-1">{preset.focus}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Workstation Details */}
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">
                Configured Output Metrics
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Adaptive Tech</span>
                  <span className="text-xs text-white font-medium block">{selectedPreset.tech}</span>
                </div>
                <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Standard Speed</span>
                  <span className="text-xs text-brand-teal font-medium block font-mono">{selectedPreset.throughput}</span>
                </div>
                <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Assistive Hardware</span>
                  <span className="text-xs text-white font-medium block">{selectedPreset.hardware}</span>
                </div>
                <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Sync Latency</span>
                  <span className="text-xs text-brand-amber font-medium block font-mono">{selectedPreset.latency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Mock Corporate Cloud Database Map & Simulated Connections */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none" />

            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-amber uppercase flex items-center gap-1.5">
                  <Database size={12} /> Target Cloud Network
                </span>
                <span className="text-[10px] bg-brand-amber/10 text-brand-amber font-mono border border-brand-amber/20 px-2 py-0.5 rounded">
                  AWS/Azure Sync Active
                </span>
              </div>

              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
                Enterprise Environment Mapping
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-8">
                Connect and sync the adaptive preset parameters with the corporate virtualized workspace to check capabilities.
              </p>

              {/* Simulation Stage */}
              <div className="bg-zinc-950/80 border border-zinc-850 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center relative">
                
                {/* Vectors & Sparkles (Simulated with motion divs) */}
                <div className="w-full flex items-center justify-between mb-6 relative">
                  
                  {/* Candidate Node */}
                  <div className="z-10 text-center relative">
                    <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal mx-auto shadow-lg">
                      <BrainCircuit size={20} />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 block mt-2 uppercase">Local WS Node</span>
                  </div>

                  {/* Connective Glow Lines */}
                  <div className="flex-1 h-0.5 bg-zinc-800 mx-4 relative overflow-hidden">
                    {/* Glowing flow beams depending on simulation state */}
                    {isSimulating && simulationStep >= 1 && (
                      <motion.div 
                        className="absolute top-0 bottom-0 bg-gradient-to-r from-brand-teal via-brand-amber to-brand-teal"
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        style={{ width: "40%" }}
                      />
                    )}
                  </div>

                  {/* Cloud Node */}
                  <div className="z-10 text-center relative">
                    <div className="w-12 h-12 rounded-xl bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber mx-auto shadow-lg">
                      <Database size={20} />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 block mt-2 uppercase">Corporate Cloud</span>
                  </div>
                </div>

                {/* Simulated Steps Status */}
                <div className="w-full space-y-2 mt-4 text-left">
                  {!isSimulating ? (
                    <div className="text-center py-4">
                      <button
                        onClick={startSimulation}
                        className="px-6 py-3 bg-brand-teal hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg select-none"
                      >
                        Initiate Architecture Sync
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5 font-mono text-[11px] text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${simulationStep >= 1 ? 'bg-brand-teal animate-pulse' : 'bg-zinc-800'}`} />
                        <span>Extracting workstation preset: <strong className="text-white">{selectedPreset.name}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${simulationStep >= 2 ? 'bg-brand-teal animate-pulse' : 'bg-zinc-800'}`} />
                        <span>Analyzing workplace hardware matrix parameters...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${simulationStep >= 3 ? 'bg-brand-teal' : 'bg-zinc-800'}`} />
                        <span>Aligning custom environmental dependencies with Active Directory...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Panel: Dynamic Equilibrium Meter */}
            <div className="mt-8 pt-6 border-t border-zinc-850">
              {isSimulating && simulationStep >= 4 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-brand-amber/15 border border-brand-amber/30 text-center space-y-2 relative"
                >
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-amber animate-ping" />
                  </div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-brand-amber font-bold">
                    Equilibrium Status
                  </h4>
                  <p className="text-lg text-white font-display font-light">
                    100% Competency Equilibrium Achieved
                  </p>
                  <p className="text-[10px] text-zinc-400 font-light">
                    This workspace is fully aligned visually, physically, and technically to prevent entry attrition.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={resetSimulation}
                      className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg text-[9px] font-mono text-zinc-350 uppercase"
                    >
                      Clear Sync
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 text-center font-mono text-[10px] text-zinc-500">
                  AWAITING PARAMETER MATRIX SYNCHRONIZATION
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Predictive Matcher Deep Dive content block */}
        <SolutionDeepDive 
          pageId="predictive-matcher"
          solutionName="Predictive Matcher Engine"
          successStory={{
            title: "Transitioning a National S.A. Bank to Assistive AWS Developer Terminals",
            clientType: "Tier-1 S.A. Retail Banking Group",
            challenge: "Faced immediate Employment Equity mandates requiring the integration of adapted engineering talent into secure AWS terminal setups.",
            solution: "Virtuabled modeled the candidate screen readers and alternative inputs dynamically, pre-empting all terminal-emulator security policies.",
            kpis: [
              { label: "B-BBEE Quota Points", value: "Full Points" },
              { label: "Developer Accuracy", value: "98.4%" },
              { label: "Direct Tax Savings", value: "R480,000 / yr" },
              { label: "Candidate Attrition", value: "0%" }
            ],
            quote: {
              text: "Virtuabled modeled our technical stack beforehand, predicting exactly which assistive setups were compliant with our AWS security policies. It avoided months of IT friction.",
              author: "Dumisani Khumalo",
              role: "Head of Infrastructure Transformation"
            }
          }}
          whitePaper={{
            title: "Synergetic Space Mapping: Environmental Modelling for Remote Assistive Systems",
            abstract: "This specification abstract outlines a unified event-driven semantic protocol mediating between client-side assistive control structures (e.g. eye-track micro-grid coordinate layers) and standard server-side terminal protocols. By modeling user input as highly structured events, our compiler eliminates hardware compatibility errors and bridges enterprise IT security restrictions.",
            architectureNote: "Integrates safely with Active Directory infrastructure and manages secure OAuth 2.0 authentication pathways behind isolated proxy layers.",
            methodology: [
               "Ocular vector calibration matching algorithms",
               "NVDA screen parser automation & custom macro bridges",
               "Bi-directional interactive terminal echo buffers"
            ],
            technicalStack: [
              "OAuth 2.0 Identity Proxy",
              "WebSockets Virtual Terminals",
               "NVDA Custom Hooks",
              "Active Directory Integration"
            ]
          }}
          faqs={[
            {
              question: "Is candidate productivity output guaranteed to match standard unadapted engineering teams?",
              answer: "Yes, fully. By optimizing assistive layouts and macro shortcuts beforehand to match developer ocular speed calibration profiles, any physical latency is completely corrected. This guarantees equivalent or superior output from day one."
            },
            {
              question: "How does the workspace synchronization integrate with our secure corporate firewalls?",
              answer: "The Virtuabled workspace interface operates purely as a secure proxy layer, transferring keyboard/ocular input streams via secure, encrypted WebSockets. No corporate databases, API endpoints, or user credentials are exposed outside your sandbox."
            },
            {
              question: "Can we claim workstation customization costs under SARS Section 12H rebates?",
              answer: "Yes. All customized ocular track rigs, sip-and-puff calibration, and virtual console configuration packages are fully compliant and deductible under both Skills Development spend and Section 12H guidelines."
            }
          ]}
        />

      </div>
    </div>
    </div>
  );
}
