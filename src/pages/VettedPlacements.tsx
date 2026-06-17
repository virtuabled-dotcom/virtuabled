import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, CheckCircle, ChevronDown, Laptop, Star, Tag, X, Code, Shield, BookOpen, Download, Check } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SchemaProvider } from "@/components/shared/SchemaProvider";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { HeroImage } from "@/components/shared/HeroImage";

const CANDIDATES = [
  {
    id: "cand-1",
    role: "Senior Java Architect",
    skills: ["Java 17", "Spring Boot", "AWS Lambda", "PostgreSQL"],
    specialties: ["Visual Accommodation", "High-Contrast Screen Configuration"],
    workspace: {
      software: "Intellicue OS Visual Overlay v4.2, VoiceOver NVDA Integration",
      hardware: "40-inch High-Brightness (400 nits) IPS Flat Monitor",
      support: "98% accuracy validated on complex database architecture templates"
    }
  },
  {
    id: "cand-2",
    role: "Data Protection Officer",
    skills: ["GDPR Compliance", "Python", "Risk Scoring", "Statutory Auditing"],
    specialties: ["Physical Mobility Integration", "Sip-and-Puff Controls"],
    workspace: {
      software: "Sub-vocal Speech Dictation Engine, Pneumatic signal compiler",
      hardware: "Ergonomic Pneumatic Breath Switch & Adjustable Arm Support",
      support: "90 WPM dictation throughput speed achieved with zero wrist friction"
    }
  },
  {
    id: "cand-3",
    role: "Full-Stack Engineer",
    skills: ["React.js", "TypeScript", "Node.js (Express)", "Tailwind"],
    specialties: ["Low Sensory Spectrum Profile", "Cognitive Shield Filter"],
    workspace: {
      software: "Virtuabled Focus Clutter Filter, Adaptive Contrast Overlay",
      hardware: "Active ANC Soundscapes Headset and Dimmable Workspace Lighting",
      support: "45% focus escalation metric logged in continuous Agile cycles"
    }
  },
  {
    id: "cand-4",
    role: "Financial Modeling Director",
    skills: ["Financial Analysis", "M&A", "Python", "SQL Ledgers"],
    specialties: ["Vocal Assistive Interface", "Speech-to-Text Calibrator"],
    workspace: {
      software: "Elmarie Voice Interface v3 Translation System",
      hardware: "Tactile high-sensitivity cardioid array collar array",
      support: "Day-One active operational spreadsheet deployment parity"
    }
  }
];

export default function VettedPlacements() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [inquirySentFor, setInquirySentFor] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How do you verify candidate technical capabilities remotely?",
      a: "Every candidate inside our Vetted Placements index undergoes standard peer-reviewed skill assessments and an intensive 48-hour workspace mock integration simulation, guaranteeing immediate operational competency."
    },
    {
      q: "Are recruitment placements fully compliant with South African labor law?",
      a: "Absolutely. All candidates are integrated under compliant corporate contracts and sector-specific fair salary standards, satisfying DEL policies and Employment Equity Act provisions."
    },
    {
      q: "Can our organization transit a remote specialist to an onsite office?",
      a: "Yes. All software profiles and specialized ergonomic hardware devices delivered to the candidate's residence are fully portable and can represent the basis of physical, onsite workspace retrofitting."
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Schema Injection for Product */}
      <SchemaProvider
        type="Product"
        productData={{
          name: "Virtuabled Vetted Placements",
          description: "Hire highly skilled disabled specialists pre-matched with dedicated virtual workspaces and assistive hardware integrations.",
          brand: "Virtuabled",
          offers: {
            price: "Flexible placement packages",
            priceCurrency: "ZAR"
          }
        }}
      />
      <HeroImage src="/images/Black_woman_in_blazer_202606121934.jpeg" tint="#14B8A6" />
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
            Staffing Services
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mb-6">
            Vetted <span className="font-medium italic text-brand-teal">Placements</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
            Your dedicated Track 1 portal for permanent enterprise hiring.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Permanent Integration
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                Elite Talent. Direct Enterprise Integration
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                Secure world-class technical talent permanently inside your corporate infrastructure. Our Vetted Placements channel gives you access to pre-screened, qualified professionals with disabilities across Software Engineering, Data Analytics, Project Management, and Financial Modeling — drawn from a national talent pool of 2.5M+ South Africans. Every candidate is pre-vetted for technical excellence and matched with the precise assistive environment required to maximize their intellectual capability.
              </p>
            </div>
          </div>
        </div>

        {/* Anonymous Capability Cards Grid */}
        <div className="space-y-4 mb-12">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-850">
            <span className="text-xs uppercase tracking-widest text-zinc-550 font-mono flex items-center gap-1.5 font-bold">
              <Users size={14} className="text-brand-teal animate-pulse" /> Anonymous Talent Matrix
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              Click cards to expand workspace parameters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CANDIDATES.map((cand) => {
              const isExpanded = activeCard === cand.id;
              return (
                <div 
                  key={cand.id}
                  onClick={() => setActiveCard(isExpanded ? null : cand.id)}
                  className={`p-6 rounded-3xl bg-slate-900/60 border hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                    isExpanded 
                      ? "border-brand-teal bg-[#14B8A6]/5 ring-1 ring-brand-teal/40" 
                      : "border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/30"
                  }`}
                  id={`cand-card-${cand.id}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                        Professional ID: {cand.id.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                        {cand.role}
                      </h3>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-[9px] font-mono uppercase font-bold">
                      Pre-vetted
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cand.skills.map((skill, si) => (
                      <span key={si} className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-850 text-[10px] font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Specialty Badges (Vibrant Teal custom badge) */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cand.specialties.map((spec, sidx) => (
                      <span 
                        key={sidx}
                        className="px-2.5 py-1 rounded-full border border-[#14B8A6]/45 bg-[#14B8A6]/10 text-brand-teal font-mono uppercase text-[9px] font-bold flex items-center gap-1 shrink-0"
                      >
                        <Tag size={10} /> {spec}
                      </span>
                    ))}
                  </div>

                  {/* Detailed workspace parameters layout */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-6 pt-6 border-t border-zinc-800 space-y-4 text-left"
                      >
                        <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-mono font-bold block mb-2">
                          MAPPED ACOMODATION FRAMEWORK
                        </span>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block mb-1">Bespoke Software Overlay</span>
                            <p className="text-xs text-white leading-relaxed">{cand.workspace.software}</p>
                          </div>
                          
                          <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block mb-1">Adaptive Assistive Hardware</span>
                            <p className="text-xs text-white leading-relaxed">{cand.workspace.hardware}</p>
                          </div>

                          <div className="p-3 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                            <span className="text-[9px] text-zinc-500 font-mono uppercase block mb-1">Compliance Performance Metric</span>
                            <p className="text-xs text-brand-amber font-mono">{cand.workspace.support}</p>
                          </div>
                        </div>

                        <div className="pt-2">
                          {inquirySentFor === cand.id ? (
                            <div className="p-3 bg-brand-teal/10 border border-brand-teal/20 rounded-xl text-center">
                              <span className="text-xs text-brand-teal font-mono uppercase font-bold">✓ Workspace Request Secured</span>
                              <p className="text-[10px] text-zinc-400 mt-1">Virtuabled's Placement Desk will issue this candidate portfolio bundle.</p>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInquirySentFor(cand.id);
                              }}
                              className="w-full py-2.5 bg-brand-amber hover:bg-amber-400 text-slate-950 text-center text-xs uppercase tracking-widest font-mono font-bold rounded-xl transition-all cursor-pointer"
                            >
                              Inquire Placement Portfolio
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* High-Contrast Compliance Metrics Data Cards */}
        <div id="vetted-compliance-metrics" className="mt-20 border-t border-zinc-800 pt-16">
          <div className="mb-10 text-center lg:text-left">
            <span className="text-[10px] font-mono text-brand-teal uppercase tracking-widest font-bold bg-brand-teal/10 px-2.5 py-1 rounded w-max border border-brand-teal/20 inline-block">
              Talent Metrics
            </span>
            <h2 className="text-2xl md:text-3.5xl font-display text-white mt-3 font-light">
              Compliance Placements Performance
            </h2>
            <p className="text-zinc-400 text-xs font-light leading-relaxed mt-2 max-w-2xl">
              Track statutory placement success margins unlocked through Virtuabled's active and managed applicant networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric Card 1 */}
            <div className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl relative overflow-hidden group hover:border-brand-teal/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full blur-2xl group-hover:scale-150 transition-all pointer-events-none" />
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" /> Placement Index
              </div>
              <div className="text-3xl md:text-4.5xl font-mono text-white font-bold tracking-tight mb-2">
                450+
              </div>
              <div className="text-xs font-semibold text-brand-teal mb-2 uppercase tracking-wide">
                Active Tech Specialists
              </div>
              <p className="text-zinc-455 text-[11px] leading-relaxed font-light">
                Disabled professionals pre-screened in critical disciplines like Software Architecture, Data Privacy, and Complex Financial Operations.
              </p>
            </div>

            {/* Metric Card 2 */}
            <div className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl relative overflow-hidden group hover:border-[#818cf8]/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all pointer-events-none" />
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> SLA Response
              </div>
              <div className="text-3xl md:text-4.5xl font-mono text-white font-bold tracking-tight mb-2">
                14-Day
              </div>
              <div className="text-xs font-semibold text-indigo-400 mb-2 uppercase tracking-wide">
                Integration Cycle Delivery
              </div>
              <p className="text-zinc-455 text-[11px] leading-relaxed font-light">
                From initial profiling to a verified shortlist and B-BBEE compliance documentation — all within 14 working days.
              </p>
            </div>

            {/* Metric Card 3 */}
            <div className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl relative overflow-hidden group hover:border-[#fb923c]/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all pointer-events-none" />
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" /> Stability
              </div>
              <div className="text-3xl md:text-4.5xl font-mono text-white font-bold tracking-tight mb-2">
                30·60·90
              </div>
              <div className="text-xs font-semibold text-brand-amber mb-2 uppercase tracking-wide">
                Day retention check-ins
              </div>
              <p className="text-zinc-455 text-[11px] leading-relaxed font-light">
                Our tailored assistive workplace frameworks and active mental wellness support channels translate into elite professional consistency.
              </p>
            </div>
          </div>
        </div>

        {/* Success Story Callout with Parallax Depth Effects */}
        <div id="vetted-success-stories" className="mt-20 border-t border-zinc-800 pt-16">
          <div className="relative w-full rounded-3xl bg-zinc-950 border border-zinc-800 p-8 md:p-12 overflow-hidden shadow-2xl group">
            {/* Parallax Layer Effect Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            <div className="absolute top-[-20%] left-[-10%] w-[450px] h-[450px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 group-hover:translate-x-12 group-hover:translate-y-6" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 group-hover:-translate-x-12 group-hover:-translate-y-6" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[9px] font-mono text-brand-amber bg-brand-amber/10 border border-brand-amber/20 px-2 py-0.5 rounded uppercase font-bold tracking-widest inline-block">
                  Case Study Highlight
                </span>
                <h3 className="text-2xl md:text-3.5xl font-display text-white font-light tracking-tight">
                  How Cape Systems <span className="font-medium text-brand-teal">Sourced 3 Senior Engineers</span> in Two Weeks Outside Local Limits
                </h3>
                <p className="text-zinc-300 font-light text-sm leading-relaxed">
                  Cape Systems required high-level Java Architects with specialized skill certifications. Local local recruiters drew blanks because of physical commute boundaries. Virtuabled sourced 3 senior developers with visual and sensory disabilities in rural regions, retrofitting completely compliant remote workspaces.
                </p>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
                  <Star className="text-brand-amber shrink-0 animate-pulse mt-0.5" size={16} fill="#f59e0b" />
                  <p className="text-zinc-400 font-light text-xs italic leading-relaxed">
                    "Virtuabled's Vetted Placements bypassed local commute bottlenecks completely. They delivered calibrated equipment and software overlays. The engineers hit full operational sprint on day one, dramatically reducing our backlog while fulfilling Employment Equity goals."
                  </p>
                </div>
              </div>

              {/* Parallax Floating High-Contrast Metrics Display */}
              <div className="lg:col-span-4 bg-[#0e0e11] border border-zinc-850 p-6 rounded-3xl relative overflow-hidden group/card shadow-xl">
                <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-brand-teal to-indigo-500" />
                <h4 className="text-white font-bold text-xs font-mono uppercase tracking-widest mb-6">Audited Placements:</h4>
                <div className="space-y-4 font-mono">
                  <div className="border-b border-zinc-900 pb-3 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">EE CONTRIBUTION</span>
                      <span className="text-zinc-200 text-xs font-bold font-sans uppercase">Critical Disciplinary</span>
                    </div>
                    <span className="text-brand-teal text-lg font-bold">100%</span>
                  </div>
                  <div className="border-b border-zinc-900 pb-3 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">B-BBEE RECOGNIZED</span>
                      <span className="text-zinc-200 text-xs font-sans">SLA Direct Claim</span>
                    </div>
                    <span className="text-brand-amber text-lg font-bold">+18pts</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">SLA ACCURACY LOGGED</span>
                      <span className="text-zinc-200 text-xs font-sans">Day-One Parity</span>
                    </div>
                    <span className="text-white text-lg font-bold">Passed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deep-Dive Technical Detail and FAQ Accordion */}
        <div id="vetted-deep-dive" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 border-t border-zinc-800 pt-16">
          
          {/* Left: Technical White-Paper Abstract */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono text-brand-amber font-bold tracking-widest uppercase bg-brand-amber/10 border border-brand-amber/20 px-2.5 py-1 rounded w-max block">
              Architectural Abstract
            </span>
            <h3 className="text-xl md:text-2xl font-display text-white font-light">
              Technical Specification
            </h3>
            <p className="text-zinc-300 font-light text-xs leading-relaxed">
              Our placement engineering white-paper details the secure sandbox infrastructure deployed automatically to each candidate's household. It explains hardware isolation setups, WCAG 2.1 screen overrides, and modern B-BBEE verification codes.
            </p>

            <div className="p-6 bg-zinc-950/40 border border-zinc-850 rounded-2xl space-y-4">
              <h4 className="text-white font-medium text-xs uppercase font-mono tracking-wider flex items-center gap-2">
                <BookOpen size={14} className="text-brand-teal" /> Key Chapters:
              </h4>
              <ul className="space-y-2 text-xs text-zinc-400 font-light font-sans">
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-brand-teal mt-0.5 shrink-0" />
                  <span><strong>1. Isolation Engineering:</strong> Mitigating corporate VPN risks inside adapted home networks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-brand-teal mt-0.5 shrink-0" />
                  <span><strong>2. Cognitive Layout Standards:</strong> Screen clutter filtering guidelines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-brand-teal mt-0.5 shrink-0" />
                  <span><strong>3. Claim Authorization:</strong> Documentation rules under Skills Spend Code Series 300.</span>
                </li>
              </ul>
              <div className="pt-2">
                <button className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
                  <Download size={12} /> Download Technical Brief (PDF)
                </button>
              </div>
            </div>
          </div>

          {/* Right: FAQ Accordions */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest block">
              Interactive FAQ Accordion
            </span>
            <h3 className="text-xl md:text-2xl font-display text-white mt-1 font-light mb-6">
              Solutions Frequently Asked Questions
            </h3>

            <div className="space-y-4" id="vetted-interactive-panel">
              <FAQAccordion 
                accordionId="vetted"
                items={faqs.map((faq, index) => ({
                  id: `vet-faq-${index}`,
                  q: faq.q,
                  a: faq.a,
                }))}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
    </div>
  );
}
