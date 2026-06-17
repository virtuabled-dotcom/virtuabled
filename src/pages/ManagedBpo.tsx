import React from "react";
import { HeroImage } from "@/components/shared/HeroImage";
import { motion } from "framer-motion";
import { Box, Layers, PlayCircle, Shield, ArrowLeft, RefreshCw, Server, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { WorkspaceTopology, PillarSignal } from "../components/shared/MotionGraphics";
import { Breadcrumb } from "../components/shared/Breadcrumb";

export default function ManagedBpo() {
  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/Man_leaning_against_office_wall_202606121934.jpeg" tint="#14B8A6" />
      <div className="pt-32 pb-24 min-h-screen bg-brand-ink text-zinc-100 relative z-10">
      {/* Background radial effects */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-coral/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-brand-teal font-bold tracking-widest uppercase text-xs mb-4 block px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 w-max rounded-md">Enterprise Delivery</span>
          <h1 className="text-4xl md:text-7xl font-display font-light leading-none tracking-tight mb-6 text-white">
            Managed <span className="font-medium italic text-brand-teal">BPO.</span>
          </h1>
          <p className="text-zinc-400 font-light text-xl leading-relaxed max-w-3xl">
            A frictionless, fully managed enterprise outsourcing model. We source elite disabled professionals, supply bespoke technology, and deliver flawless business output.
          </p>
        </motion.div>

        {/* Framing against traditional BPOs */}
        <div className="mb-20 p-8 border border-zinc-800 bg-[#070707] rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-brand-coral">
            <Shield size={20} />
            <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-[#aaa]">Shattering Legacy Models</h3>
          </div>
          <h2 className="text-2xl font-light text-white font-display leading-tight">
            Designed for Performance, Built for Statutory Compliance.
          </h2>
          <p className="text-zinc-350 text-sm font-light leading-relaxed">
            The typical Recruitment Agency operates on a simple billing multiplier. They dump unvetted candidates into your offices, leaving your staff to struggle with complex hardware accommodations, remote licensing filters, and compliance legislation setups.
          </p>
          <p className="text-zinc-455 text-xs font-light leading-relaxed">
            Virtuabled operates the complete reverse. We act as a fully managed delivery engine. We acquire the hardware, configure Virtuabled's custom assistive software tailored for visual, motor, developmental, and sensory conditions, handle the candidate's home connectivity requirements, and support them daily. Your enterprise receives top-tier operational outputs—while seamlessly fulfilling and tracking your strict ESG / Employment Equity targets.
          </p>
        </div>

        {/* The Turnkey Infrastructure Cycle + Interactive WorkspaceTopology map */}
        <div className="border-t border-zinc-800 pt-16 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: The 3 phases */}
            <div className="lg:col-span-6 space-y-6">
              <div className="mb-6">
                <span className="text-[10px] font-mono text-brand-teal uppercase tracking-widest font-bold bg-brand-teal/10 px-2 py-0.5 rounded border border-brand-teal/20">
                  Operations Pipeline
                </span>
                <h3 className="text-2xl font-display text-white font-light mt-2">
                  The Managed Turnkey Flow:
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed font-sans">
                  We cover the complete cycle from sourcing to configuration, ensuring your operations receive seamless deliverables with 100% legislative compliance.
                </p>
              </div>

              {/* Box 1 */}
              <div className="p-6 bg-[#090909] border border-zinc-900 rounded-2xl relative flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal shrink-0">
                  <Layers size={18} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1 font-sans">1. Specialized Sourcing & Audit</h4>
                  <p className="text-zinc-550 text-xs font-light leading-relaxed font-sans">
                    Virtuabled searches its pre-vetted database of high-caliber disabled specialists. We audit their technical skills and accommodation goals to align with your project targets perfectly.
                  </p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="p-6 bg-[#090909] border border-zinc-900 rounded-2xl relative flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal shrink-0">
                  <Box size={18} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1 font-sans">2. Virtuabled Workspace Equipping</h4>
                  <p className="text-zinc-550 text-xs font-light leading-relaxed font-sans">
                    Virtuabled constructs a tailored local computer workspace preset with appropriate braille, sip-and-puff, eye-tracking, or cognitive-reduced software overlays.
                  </p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="p-6 bg-[#090909] border border-zinc-900 rounded-2xl relative flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal shrink-0">
                  <RefreshCw size={18} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1 font-sans">3. Managed Production Delivery</h4>
                  <p className="text-zinc-550 text-xs font-light leading-relaxed font-sans">
                    We manage daily SLAs, clocking, connectivity uptime, and remote workflow operations. You sign off on the monthly deliverables—not the mechanical administrative overheads.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Live WorkspaceTopology display */}
            <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
              <WorkspaceTopology />
            </div>

          </div>
        </div>

        {/* The Virtuabled 4 Focus Pillars in Action */}
        <div className="border-t border-zinc-800 pt-16">
          <div className="mb-10">
            <span className="text-brand-amber text-xs font-mono font-bold uppercase tracking-widest">Technological Precision</span>
            <h4 className="text-2xl font-display text-white mt-1">Our Integrated Technology Standards</h4>
            <p className="text-zinc-400 text-xs font-light mt-2 leading-relaxed">
              We leverage Virtuabled's deep research and development to target the exact barrier points of 4 disabilities, replacing traditional call center blocks with highly structured virtual micro-terminals:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-light mb-10">
            <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
              <h5 className="font-semibold text-white">Visual Environments</h5>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
                Adapting standard enterprise CRM and layout platforms so screen readers navigate fields accurately without dropping sessions.
              </p>
            </div>
            <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
              <h5 className="font-semibold text-white">Physical Adaptations</h5>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
                Using sip-and-puff signal translation matrices. This allows paralyzed candidates to execute keystrokes at equivalent SLA speed.
              </p>
            </div>
            <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
              <h5 className="font-semibold text-white">Neurodivergent Presets</h5>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
                Clutter filters and noise reduction setups, helping professionals suffering from severe ADHD or cognitive loads output extreme focus.
              </p>
            </div>
            <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
              <h5 className="font-semibold text-white">Aural Transcriptions</h5>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
                Sub-second closed-caption video overlay integrations, helping deaf candidates participate in standard agile meetings seamlessly.
              </p>
            </div>
          </div>

          {/* Active Parameter Equalizer Monitoring wave */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping" />
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">Telemetry Target Calibration Output</span>
            </div>
            <PillarSignal />
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-brand-teal/10 to-transparent border-t border-zinc-800 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-light text-white">Ready to run a remote-first disability BPO?</h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">Let us handle the workspace, onboarding, and compliance. You get the output.</p>
          <a href="https://cal.com/heferon-eugene/30min" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-colors">
            Book a BPO Consultation
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}
