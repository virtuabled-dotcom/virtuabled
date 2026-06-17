import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quote, ShieldCheck, FileText, HelpCircle, ArrowRight, 
  ChevronDown, Cpu, Download, Landmark, FileDown, CheckCircle, 
  Activity, Users, Sparkles
} from "lucide-react";

interface KPIType {
  label: string;
  value: string;
}

interface SuccessStoryType {
  title: string;
  clientType: string;
  challenge: string;
  solution: string;
  kpis: KPIType[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

interface WhitePaperType {
  title: string;
  abstract: string;
  methodology: string[];
  technicalStack: string[];
  architectureNote: string;
}

interface FAQType {
  question: string;
  answer: string;
}

interface SolutionDeepDiveProps {
  pageId: string;
  solutionName: string;
  successStory: SuccessStoryType;
  whitePaper: WhitePaperType;
  faqs: FAQType[];
}

export function SolutionDeepDive({ 
  pageId, 
  solutionName, 
  successStory, 
  whitePaper, 
  faqs 
}: SolutionDeepDiveProps) {
  const [activeTab, setActiveTab] = useState<"case-study" | "white-paper" | "faqs">("case-study");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [downloadRequested, setDownloadRequested] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestEmail.includes("@")) {
      setDownloadRequested(true);
    }
  };

  return (
    <section 
      className="mt-20 pt-16 border-t border-zinc-850 relative" 
      id={`${pageId}-solution-deep-dive`}
      aria-label={`Deep-Dive Section: ${solutionName}`}
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] font-mono text-brand-teal tracking-[0.2em] uppercase font-bold px-3 py-1 bg-brand-teal/5 border border-brand-teal/10 rounded-full">
          Solution Deep-Dive
        </span>
        <h2 className="text-2xl md:text-3.5xl font-display font-light text-white mt-4 uppercase tracking-tight">
          Enterprise <span className="font-semibold text-brand-teal">Technical & Compliance Deep-Dive</span>
        </h2>
        <p className="text-zinc-400 font-light text-xs mt-2 font-sans">
          Review our empirical verification reports, architectural standards, and operational guidelines for {solutionName}.
        </p>
      </div>

      {/* Mode Selectors */}
      <div className="flex border-b border-zinc-850 max-w-3xl mx-auto mb-12" role="tablist">
        <button
          onClick={() => setActiveTab("case-study")}
          className={`flex-1 pb-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors relative focus:outline-none ${
            activeTab === "case-study" ? "text-[#14b8a6]" : "text-zinc-500 hover:text-zinc-350"
          }`}
          role="tab"
          aria-selected={activeTab === "case-study"}
        >
          {activeTab === "case-study" && (
            <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#14b8a6]" />
          )}
          Customer Case Study
        </button>
        <button
          onClick={() => setActiveTab("white-paper")}
          className={`flex-1 pb-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors relative focus:outline-none ${
            activeTab === "white-paper" ? "text-brand-amber" : "text-zinc-500 hover:text-zinc-350"
          }`}
          role="tab"
          aria-selected={activeTab === "white-paper"}
        >
          {activeTab === "white-paper" && (
            <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-amber" />
          )}
          White-Paper Abstract
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          className={`flex-1 pb-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors relative focus:outline-none ${
            activeTab === "faqs" ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-350"
          }`}
          role="tab"
          aria-selected={activeTab === "faqs"}
        >
          {activeTab === "faqs" && (
            <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-400" />
          )}
          Solution FAQs
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* Case Study Tab content */}
          {activeTab === "case-study" && (
            <motion.div
              key="case-study"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              {/* KPIs & Client Context */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="bg-zinc-950/60 p-6 rounded-3xl border border-zinc-850">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider mb-1">
                    Verified Client Status
                  </span>
                  <HeadingTag className="text-white text-base font-bold uppercase tracking-wider block mb-4">
                    {successStory.clientType}
                  </HeadingTag>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-brand-teal uppercase block">The Challenge:</span>
                      <p className="text-xs text-zinc-400 font-light font-sans mt-0.5 leading-relaxed">
                        {successStory.challenge}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-brand-teal uppercase block">Our Response:</span>
                      <p className="text-xs text-zinc-300 font-light font-sans mt-0.5 leading-relaxed">
                        {successStory.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scorecard KPIs */}
                <div className="grid grid-cols-2 gap-4">
                  {successStory.kpis.map((kpi, index) => (
                    <div key={index} className="p-4 bg-brand-teal/5 border border-brand-teal/20 rounded-2xl text-center">
                      <span className="text-2xl font-display font-black text-brand-teal block">{kpi.value}</span>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block mt-1">{kpi.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Story Narrative and Quote */}
              <div className="lg:col-span-7 bg-[#091223] p-8 rounded-3xl border border-white/[0.04] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#fb923c] font-mono uppercase tracking-widest block mb-1">
                    Empirical Success Story
                  </span>
                  <h3 className="text-lg md:text-xl font-bold uppercase text-white font-sans tracking-tight mb-4 leading-snug">
                    {successStory.title}
                  </h3>
                  <p className="text-zinc-300 text-xs font-light font-sans leading-relaxed mb-6">
                    By partnering with Virtuabled's fully remote tech hub, this organization successfully resolved high skills-spend requirements while deploying a robust, accessible workspace interface. This neutralized the threat of heavy labor compliance sanctions and improved corporate performance.
                  </p>
                </div>

                <div className="p-5 bg-zinc-950/40 border border-zinc-850 rounded-2xl relative">
                  <Quote className="absolute top-4 right-4 text-zinc-750" size={32} />
                  <p className="text-zinc-300 text-xs italic font-light leading-relaxed mb-4 relative z-10 pr-6 font-sans">
                    "{successStory.quote.text}"
                  </p>
                  <div>
                    <span className="text-xs font-bold text-white block uppercase tracking-wide">{successStory.quote.author}</span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{successStory.quote.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* White Paper Tab Content */}
          {activeTab === "white-paper" && (
            <motion.div
              key="white-paper"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-[#091223] rounded-3xl border border-white/[0.04] p-8 md:p-10 space-y-8"
              id="whitepaper-abstract-panel"
            >
              <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-6 border-b border-white/[0.04] pb-6">
                <div>
                  <span className="text-[10px] text-brand-amber font-mono uppercase tracking-widest block">
                    Technical Specifications
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold uppercase text-white font-sans tracking-tight mt-1">
                    {whitePaper.title}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                    PUBLICATION ID: VR-SPEC-2026-v4.1
                  </span>
                </div>

                <span className="px-3 py-1 bg-brand-amber/15 text-brand-amber text-[9px] font-mono border border-brand-amber/35 rounded uppercase">
                  Peer-Reviewed Audit Level
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Abstract Text */}
                <div className="md:col-span-8 space-y-4">
                  <h4 className="text-xs uppercase font-mono font-extrabold text-[#fb923c] tracking-wider">
                    Executive Abstract
                  </h4>
                  <p className="text-zinc-300 text-xs md:text-sm font-light leading-relaxed font-sans">
                    {whitePaper.abstract}
                  </p>
                  
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-850 mt-6">
                    <span className="text-[10px] font-mono text-zinc-400 block font-bold uppercase mb-1">
                      Architectural Execution Notes:
                    </span>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                      {whitePaper.architectureNote}
                    </p>
                  </div>
                </div>

                {/* Technical parameters Sidebar */}
                <div className="md:col-span-4 bg-zinc-950/70 p-5 rounded-2xl border border-zinc-850 space-y-5">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-450 block uppercase mb-2">
                       Analytical Methodology
                    </span>
                    <ul className="space-y-2">
                      {whitePaper.methodology.map((m, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-[10px] font-light text-zinc-350 font-sans">
                          <CheckCircle size={12} className="text-brand-teal shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-zinc-905">
                    <span className="text-[9px] font-mono text-zinc-450 block uppercase mb-2">
                       Systems Integration
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {whitePaper.technicalStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-mono text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock PDF download generator action block */}
              <div className="pt-6 border-t border-white/[0.04]">
                {downloadRequested ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="p-4 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-center"
                  >
                    <p className="text-xs font-mono text-brand-teal">
                      ✔ SECURE TRANSFER PATHWAY MET - Complete PDF abstract brief dispatched to email safely.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDownloadSubmit} className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-zinc-950/60 p-4 rounded-xl border border-zinc-850">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                      <FileDown size={16} className="text-brand-amber" />
                      <span className="font-light">Get complete PDF technical document:</span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <input 
                        type="email" 
                        required
                        placeholder="executive-officer@domain.co.za"
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-white focus:outline-none focus:border-brand-amber"
                        id="document-request-email"
                      />
                      <button 
                        type="submit" 
                        className="px-4 py-1.5 bg-brand-amber hover:bg-amber-400 text-slate-950 font-mono font-bold text-[10px] uppercase rounded"
                      >
                        Request Specification Brief
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {/* FAQs Tab Content */}
          {activeTab === "faqs" && (
            <motion.div
              key="faqs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
              id="frequently-asked-accordions"
            >
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className="bg-[#091223] rounded-2xl border border-white/[0.04] overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                    >
                      <span className="text-white text-sm font-bold uppercase tracking-wider font-sans">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-400" : ""}`} 
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-white/[0.02] text-xs leading-relaxed text-zinc-350 font-sans font-light">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}

// Helper to keep headings standard in React
function HeadingTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}
