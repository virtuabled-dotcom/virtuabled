import React from "react";
import { HeroImage } from "@/components/shared/HeroImage";
import { motion } from "framer-motion";
import { FileText, Cpu, Search, Send, ArrowLeft, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { HuntingRadar, WorkflowStream } from "../components/shared/MotionGraphics";
import { Breadcrumb } from "../components/shared/Breadcrumb";
import { FaqSection } from "../components/shared/FaqSection";

export default function HowItWorks() {
  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/Man_working_in_home_office_202606121927.jpeg" tint="#14B8A6" />
      <div className="pt-32 pb-24 min-h-screen bg-brand-ink text-zinc-100 relative z-10">
      {/* Background flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 animate-fade-in"
        >
          <span className="text-brand-coral font-bold tracking-widest uppercase text-xs mb-4 block px-3 py-1 bg-brand-coral/10 border border-brand-coral/20 w-max rounded-md">The Operational Sequence</span>
          <h1 className="text-4xl md:text-7xl font-display font-light leading-none tracking-tight mb-6 text-white">
            How It <span className="font-medium italic text-brand-coral">Works.</span>
          </h1>
          <p className="text-zinc-400 font-light text-xl leading-relaxed max-w-3xl">
            Our active-hunting engine reverse-engineers candidate placements instead of demanding that individuals with disabilities adapt to broken systems.
          </p>
        </motion.div>

        {/* Traditional Passive Failure Explanation */}
        <div className="mb-20 p-8 border border-zinc-800 bg-[#070707] rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-brand-amber">
            <ShieldAlert size={20} />
            <h3 className="text-xs uppercase font-mono font-bold tracking-widest">The Structural Blind Spot</h3>
          </div>
          <h2 className="text-xl md:text-2xl font-light text-white font-display">
            Why Typical Recruitment Agencies and Job Boards Fail the Disabled Community.
          </h2>
          <p className="text-zinc-300 text-sm font-light leading-relaxed">
            The standard approach to diversity hiring is passive. A company posts a role to a static bulletin board, or a recruitment agency receives a candidate resume and deposits it into an automated applicant tracking software (ATS). These traditional filters are optimized for standard physical setups, meaning non-linear CV paths or candidates who indicate specialized remote hardware needs are instantly discarded as high risk.
          </p>
          <p className="text-zinc-450 text-xs font-light leading-relaxed font-mono text-brand-teal">
            Virtuabled operates the absolute opposite mechanism:
          </p>
        </div>

        {/* Dual column: Operational Sequence + Motion Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          
          {/* Left Column: The 4 Phases */}
          <div className="lg:col-span-7 space-y-12 relative">
            <div className="absolute left-[31px] top-8 bottom-8 w-px bg-zinc-800 hidden md:block" />

            {/* Phase 1 */}
            <div className="flex flex-col md:flex-row gap-8 relative items-start">
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 border border-brand-teal/30 text-brand-teal flex items-center justify-center font-display font-bold text-lg shrink-0 z-10 backdrop-blur-md">
                01
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-teal font-bold bg-brand-teal/10 border border-brand-teal/20 px-2.5 py-0.5 rounded">
                  CV NLP Ingestion
                </span>
                <h3 className="text-xl font-medium text-white font-display">Intelligent Profile Structuring</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  When a candidate submits their raw portfolio, Virtuabled's machine learning models read, clean, and map the text. Instead of discarding non-linear paths, the code normalizes professional achievements, outputting an accessibility-indexed, clean operational summary file.
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="flex flex-col md:flex-row gap-8 relative items-start">
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 border border-brand-teal/30 text-brand-teal flex items-center justify-center font-display font-bold text-lg shrink-0 z-10 backdrop-blur-md">
                02
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#999] bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded">
                  Accommodation Modeling
                </span>
                <h3 className="text-xl font-medium text-white font-display">Technological Adaptability Mapping</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  The parsed dataset is measured against four focus groups (visual, physical, sensory, and vocal). Virtuabled's modeling framework automatically structures the required remote computer workstation adaptations (including tactile, voice-dictated, or visual scale presets).
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="flex flex-col md:flex-row gap-8 relative items-start">
              <div className="w-16 h-16 rounded-2xl bg-brand-coral/10 border border-brand-coral/30 text-brand-coral flex items-center justify-center font-display font-bold text-lg shrink-0 z-10 backdrop-blur-md">
                03
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-coral font-bold bg-brand-coral/10 border border-brand-coral/20 px-2.5 py-0.5 rounded animate-pulse">
                  Active External Hunt
                </span>
                <h3 className="text-xl font-medium text-white font-display">Targeted Opportunity Scraping</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Rather than waiting passively for clicks, our automated tracking crawlers scan enterprise job portals, public feeds, and database partners. The engine hunts for roles matching the candidate's exact engineering skill parameters, and flags potential matches instantly.
                </p>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="flex flex-col md:flex-row gap-8 relative items-start">
              <div className="w-16 h-16 rounded-2xl bg-brand-coral/10 border border-brand-coral/30 text-brand-coral flex items-center justify-center font-display font-bold text-lg shrink-0 z-10 backdrop-blur-md">
                04
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-coral font-bold bg-brand-coral/10 border border-brand-coral/20 px-2.5 py-0.5 rounded">
                  Empathetic Outreach
                </span>
                <h3 className="text-xl font-medium text-white font-display">Ready-To-Deploy Placement Proposals</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Virtuabled's human advocates step in. We contact corporate hiring managers directly with a ready-to-deploy proposal: "We have an elite technical professional for your role, set up in accessibility-enabled software tuned to their disability. Compliance integration is 100% managed."
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual SVG Motion Graphics */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-brand-teal uppercase tracking-widest font-bold bg-brand-teal/10 px-2.5 py-1 rounded w-max block border border-brand-teal/20">
                Active Telemetry HUD
              </span>
              <h3 className="text-lg font-display text-white font-medium">Tracking Algorithms</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed font-sans">
                Observe how Virtuabled's proprietary scraping and parsing pipelines automate remote placement workflows synchronously on our network.
              </p>
            </div>

            <WorkflowStream />
            <HuntingRadar />
          </div>

        </div>

        {/* Parity statement reminder */}
        <div className="mt-16 bg-gradient-to-r from-brand-teal/5 to-transparent border-t border-b border-zinc-805 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-12 h-12 rounded-full border border-brand-teal bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg font-display mb-1">Our Core Covenant</h4>
              <p className="text-xs text-zinc-450 leading-relaxed font-light">
                Given balanced access to technological workspaces, the output of a professional candidate with disabilities achieves absolute parity with any abled practitioner. We exist to create this opportunity equilibrium daily.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion FAQ Component */}
        <FaqSection />

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-brand-teal/10 to-transparent border border-zinc-800 rounded-2xl py-14 px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-light text-white">Start your compliance journey today</h2>
          <p className="text-zinc-400 text-sm font-light">From EE audit to first placement — the full pipeline, handled.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/apply" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-colors">
              Apply as a Candidate
            </a>
            <a href="/employer-portal" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white/5 transition-colors">
              Request Employer Access
            </a>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
