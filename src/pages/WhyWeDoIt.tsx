import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, HelpCircle, Layers, CheckCircle2, Star, ShieldAlert } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HeroVideo } from "@/components/shared/HeroVideo";

const SPHERES = [
  {
    id: "sph-1",
    index: "01",
    title: "Visual & Blind Assistance",
    brief: "Adaptations targeting low-vision and blind professionals.",
    detail: "Customized screen-reader layouts (NVDA/VoiceOver profiles), auditory-feedback signal processors, and high-contrast terminal system overrides. These empower visual cohorts to parse complex server logic, databases, and code syntax at elite enterprise levels."
  },
  {
    id: "sph-2",
    index: "02",
    title: "Motor & Wheelchair Adaptation",
    brief: "Digital mappings for non-linear movement and motor restriction.",
    detail: "Direct pneumatic airflow (Sip-and-Puff) breath triggers, ocular tracking mapping overlays, and highly adapted voice dictation setups (Elmarie Voice Engines). This translates high-level engineering creativity into active, zero-latency digital outputs."
  },
  {
    id: "sph-3",
    index: "03",
    title: "Neurodeviant Cognitive Profile",
    brief: "Clutter-free workspaces for ADHD, Sensory, and Autism spectrums.",
    detail: "Distraction-free focus shield layouts, screen hue modifications, and customized smart timers that drastically limit sensory spikes. This supports a calm, optimized development environment to sustain deep analytical flow."
  },
  {
    id: "sph-4",
    index: "04",
    title: "Hearing & Speech adaptation",
    brief: "Visual feedback overlays for audible alert channels.",
    detail: "Sub-second digital live captions, soundwave-mapped sensory cues for system anomalies, and active transcription pipelines. This ensures hearing or speaking barriers disappear completely within Slack, Teams and Jira workflows."
  }
];

export default function WhyWeDoIt() {
  const [selectedSphere, setSelectedSphere] = useState<typeof SPHERES[0] | null>(SPHERES[0]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0B132B] text-zinc-100 relative overflow-hidden">
      {/* Wheelchair professional cinematic video — full-bleed hero */}
      <div className="absolute inset-0 z-0">
        <HeroVideo
          src="/images/why we do it hero.mp4"
          poster="/images/people/sarah-botha.jpeg"
          scrim={false}
          className="w-full h-full"
        />
        {/* Gradient scrims for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/75 to-[#0B132B]/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-[#0B132B]/50 pointer-events-none" />
      </div>
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
            Core Belief Manifesto
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-light text-white tracking-tight leading-none mb-6">
            Why We <span className="font-medium italic text-brand-teal font-sans">Do It</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
            Eliminating physical and digital spatial convenience screening parameters globally.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16" id="whywedoit-manifesto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Sourcing Axioms
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                The Fundamental Sourcing Axiom
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                We operate on an absolute, non-negotiable truth: <strong className="text-white font-medium">the only difference between an abled professional and a disabled professional is opportunity.</strong> When a corporate system assumes that everyone must work on the exact same laptop and in the exact same chair, it doesn't filter for skill—it filters for spatial convenience. We exist to vaporize that physical barrier and align corporate recruitment with pure intellectual capability.
              </p>
            </div>
          </div>
        </div>

        {/* Spheres Showcase segment */}
        <div className="pt-8 border-t border-zinc-850" id="spheres-showcase-grid">
          <div className="max-w-3xl mb-12">
            <span className="text-[#FF9F1C] font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
              Assistive Architecture Overview
            </span>
            <h2 className="text-2xl md:text-4.5xl font-display font-light text-white leading-tight">
              Engineering for <span className="font-medium italic text-[#FF9F1C] font-sans">Four Focus Dimensions</span>
            </h2>
            <p className="text-zinc-400 font-light text-sm leading-relaxed mt-2">
              Our workspace adapters target four key physical spectrum barriers, integrating completely with enterprise cloud gateways natively.
            </p>
          </div>

          {/* Interactive grid side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* List Selection on Left */}
            <div className="lg:col-span-6 space-y-4">
              {SPHERES.map((sph, sIdx) => {
                const isSelected = selectedSphere?.id === sph.id;
                return (
                  <motion.button
                    key={sph.id}
                    type="button"
                    onClick={() => setSelectedSphere(sph)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sIdx * 0.1, duration: 0.38 }}
                    className={`w-full flex text-left p-5 rounded-2xl border transition-all duration-300 outline-none relative hover:-translate-y-0.5 ${
                      isSelected 
                        ? "bg-[#14B8A6]/10 border-brand-teal text-white shadow-lg" 
                        : "bg-zinc-950/40 border-zinc-850 text-zinc-405 hover:border-zinc-700 hover:bg-zinc-900/30"
                    }`}
                    id={`sphere-btn-${sph.id}`}
                  >
                    <span className="mr-4 mt-0.5 font-mono text-xs font-bold text-brand-teal bg-brand-teal/5 border border-brand-teal/10 w-6 h-6 rounded flex items-center justify-center shrink-0">
                      {sph.index}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-xs uppercase font-bold tracking-wider">{sph.title}</h4>
                      <p className="text-[11px] text-zinc-450 font-light mt-1 leading-relaxed">{sph.brief}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Selected detail panel display on Right with distinct hover elements */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between relative overflow-hidden text-left shadow-xl">
              <AnimatePresence mode="wait">
                {selectedSphere ? (
                  <motion.div
                    key={selectedSphere.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-brand-teal uppercase tracking-widest px-2.5 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-md inline-block">
                        Dimension category {selectedSphere.index}
                      </span>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-wider font-display">
                        {selectedSphere.title}
                      </h3>
                    </div>

                    <p className="text-zinc-300 text-sm font-light leading-relaxed">
                      {selectedSphere.detail}
                    </p>

                    <div className="p-4 bg-zinc-950/60 border border-zinc-850 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-brand-amber uppercase block">
                        Target Integration
                      </span>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Custom configured off-site and deployed fully pre-loaded inside candidate workstations directly matching standard enterprise compliance parameters natively.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center text-center font-mono text-zinc-500 text-xs"
                  >
                    SELECT A SPECTRUM CATEGORY TO INSPECT MAPPED ADAPTERS
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-[#060B13] border-t border-zinc-800 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-light text-white">Join the movement</h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">Read the full story behind why Virtuabled exists — then be part of what comes next.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/genesis" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-teal text-brand-teal font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-brand-teal hover:text-[#0a0a0a] transition-colors">
              Read the Genesis
            </a>
            <a href="/apply" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-colors">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
