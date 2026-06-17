import React, { useState } from "react";
import { HeroImage } from "@/components/shared/HeroImage";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HeartHandshake, Sparkles, Building2, Eye, ShieldCheck, 
  ArrowRight, Landmark, Layers, HelpCircle, Activity, 
  Cpu, Video, CheckCircle2 
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

const EXAMPLES = [
  {
    id: "ex-visual",
    category: "Visual Cohorts",
    title: "Screen Reader & Contrast Mappings",
    benefit: "Empowers low-vision or blind software professionals.",
    accommodations: [
      "Custom voice speed calibration profiles (e.g. NVDA up to 600 words per minute).",
      "Dynamic ARIA-compliant software dashboards supporting fully key-driven navigational workflows.",
      "Custom high-contrast color themes and audio feedback systems."
    ]
  },
  {
    id: "ex-motor",
    category: "Motor Cohorts",
    title: "Alternative Inputs & Breath Triggers",
    benefit: "Enables physical dexterity independence.",
    accommodations: [
      "Pneumatic sip-and-puff (or speech-input) physical control mapping.",
      "High accuracy ocular tracking control layers on code editor interfaces.",
      "Fully customized shortcut inputs preventing heavy wrist tension or reliance on standard mouse layouts."
    ]
  },
  {
    id: "ex-sensory",
    category: "Sensory & Cognitive",
    title: "Neurodivergent Focus Shield Enclaves",
    benefit: "Enhances cognitive longevity and safeguards autism spectrums.",
    accommodations: [
      "Clutter-proof dark interfaces with zero visual blinking indicators.",
      "Flexible, customized rest cycles with automated smart micro-breaks.",
      "Support for isolated work hours and asynchronous slack structures."
    ]
  }
];

export default function ReasonableAccommodation() {
  const [selectedExample, setSelectedExample] = useState<string>("ex-visual");

  const currentExampleInfo = EXAMPLES.find((ex) => ex.id === selectedExample) || EXAMPLES[0];

  return (
    <div className="relative overflow-hidden" id="reasonable-accommodation-page">
      <HeroImage src="/images/Man_with_wheelchair_headshot_202606121934.jpeg" tint="#F59E0B" />
      <div className="pt-32 pb-24 min-h-screen bg-[#070D19] text-zinc-100 relative z-10">
      {/* Search Engine Optimization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "South Africa Reasonable Accommodation & Disability Workspace Integration",
          "description": "How South African organizations must satisfy disability mandates. Learn about sensory, physical, and cognitive workspace adapters.",
          "publisher": {
            "@type": "Organization",
            "name": "Virtuabled"
          }
        })}
      </script>

      {/* Decorative Lights */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Breadcrumb />

        {/* Narrative SEO Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <span className="text-brand-teal font-mono font-bold tracking-[0.25em] uppercase text-[10px] mb-4 block px-3.5 py-1.5 bg-brand-teal/10 border border-brand-teal/20 w-max rounded-sm">
            Legislative Best Practice Guidelines
          </span>
          <h1 className="text-4xl md:text-6.5xl font-display font-light text-white tracking-tight leading-none mb-6">
            Reasonable <br />
            <span className="font-semibold text-brand-teal">Accommodation Code</span>
          </h1>
          <p className="text-zinc-300 font-light text-lg md:text-xl leading-relaxed max-w-3xl">
            A deep-dive review of South Africa's statutory Code of Good Practice on Employment of People with Disabilities, outlining legal parameters and practical workspace adapter solutions.
          </p>
        </motion.div>

        {/* Informative S.A. Context Strip */}
        <section className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                S.A. CODE DEFINITION
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                What is reasonable accommodation?
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed font-sans">
                As per Section 54 of South Africa's Employment Equity Act, reasonable accommodation refers to any modification or adjustment to a job, or to the workspace layout, that will enable a person with a disability to enjoy equal employment opportunities. The law specifies that designated employers must handle these requirements up to the threshold of "unjustifiable hardship"—the tipping point where modifications would cripple a business financially.
              </p>
            </div>
          </div>
        </section>

        {/* Showcase Accommodation spectrum mapping */}
        <section className="mb-16">
          <div className="max-w-3xl mb-12">
            <span className="text-[#FF9F1C] font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
              Accommodation matrix
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-light text-white leading-tight">
              A Closer Look at <span className="font-medium italic text-[#14b8a6] font-sans">Adaptive Mappings</span>
            </h2>
            <p className="text-zinc-400 font-light text-sm leading-relaxed mt-2 font-sans">
              True accessibility goes far beyond adding office wheelchair lanes. See how Virtuabled maps advanced accommodations for corporate professionals:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* List Selection on Left */}
            <div className="lg:col-span-5 space-y-4">
              {EXAMPLES.map((ex) => {
                const isSelected = selectedExample === ex.id;
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setSelectedExample(ex.id)}
                    className={`w-full flex text-left p-5 rounded-2xl border transition-all duration-300 outline-none relative hover:-translate-y-0.5 ${
                      isSelected 
                        ? "bg-[#14B8A6]/10 border-brand-teal text-white shadow-lg" 
                        : "bg-zinc-950/40 border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/30"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">{ex.category}</span>
                      <span className="text-sm font-bold text-white mt-1 uppercase tracking-wider">{ex.title}</span>
                      <span className="text-xs text-zinc-400 mt-1 font-light leading-relaxed font-sans">{ex.benefit}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Content view on Right */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedExample}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 rounded-3xl bg-[#091223] border border-white/[0.04] h-full flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono text-[#FF9F1C] font-semibold tracking-wider block uppercase">
                        Spec & Accommodation Lists
                      </span>
                      <h3 className="text-white font-display text-xl md:text-2xl font-bold mt-2 uppercase tracking-wide">
                        {currentExampleInfo.title}
                      </h3>
                      <p className="text-zinc-400 text-xs font-light font-sans mt-1">
                        {currentExampleInfo.benefit}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/[0.04]">
                      {currentExampleInfo.accommodations.map((acc, index) => (
                        <div key={index} className="flex gap-3 items-start text-xs leading-relaxed font-light text-zinc-300 font-sans">
                          <CheckCircle2 size={16} className="text-[#14b8a6] shrink-0 mt-0.5" />
                          <span>{acc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.04] mt-6 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-zinc-500">
                      Standard compliance level: MET
                    </span>
                    <a 
                      href="/for-employers"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-brand-teal hover:text-white transition-colors"
                    >
                      <span>Explore recruitment solutions</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Detailed Accommodation Law Audit Steps */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-[#091223] border border-white/[0.04] space-y-4">
            <h3 className="text-white text-lg font-bold uppercase tracking-wider font-display">
              The 'Unjustifiable Hardship' Rule
            </h3>
            <p className="text-zinc-300 text-xs leading-relaxed font-light font-sans">
              Code of Good Practice section 6.11 outlines that "unjustifiable hardship" occurs only if accommodation involves significant, systemic disruption or costs that would exceed the operational solvency margins of an organization. 
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed font-light font-sans">
              Furthermore, standard medical aids, normal prescription eyewear, or portable personal equipment do not fall within corporate accommodation budgets—only spatial adaptations and workstation integration layouts.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#091223] border border-white/[0.04] flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-white text-lg font-bold uppercase tracking-wider font-display">
                Pragmatic Digital Audits
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-light font-sans">
                Our team assists transformation departments in conducting rigorous audits. We document both digital platforms accessibility constraints (supporting WCAG 2.1 compliance norms) and physical accessibility barriers.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.04]">
              <p className="text-[10px] font-mono text-zinc-500">
                SEO Search Indices: "Reasonable Accommodation South Africa", "Employment of People with Disabilities Code", "Workspace physical access rules"
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Consultation Banner */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-teal-500/10 to-[#14b8a6]/5 border border-white/[0.06] text-center space-y-6">
          <Cpu className="mx-auto text-brand-teal animate-spin-slow" size={32} />
          <h3 className="text-white text-xl md:text-3xl font-display font-light uppercase tracking-tight">
            Deploy professional reasonable accommodations instantly
          </h3>
          <p className="text-zinc-300 font-light text-sm max-w-2xl mx-auto leading-relaxed">
            From NVDA terminal modifications to voice-operated workstation layers, we deploy hardware and software profiles tailored directly with security SLAs.
          </p>
          <div>
            <a 
              href="/for-employers"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#f59e0b] hover:bg-[#fb923c] text-slate-950 font-bold font-mono text-xs uppercase tracking-widest transition-all"
            >
              Get accessibility audit
            </a>
          </div>
        </section>

      </div>
    </div>
    </div>
  );
}
