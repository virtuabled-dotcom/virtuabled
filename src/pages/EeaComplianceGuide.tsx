import React, { useState } from "react";
import { HeroImage } from "@/components/shared/HeroImage";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Scale, BarChart3, AlertTriangle, ShieldCheck, 
  HelpCircle, Sparkles, FileSpreadsheet, ArrowRight, BookOpen, 
  Search, Eye, Landmark, Globe 
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export default function EeaComplianceGuide() {
  const [activeTab, setActiveTab] = useState<"mandates" | "penalties" | "eea2-eea4" | "strategy">("mandates");
  const [numEmployees, setNumEmployees] = useState(150);
  const [isDesignated, setIsDesignated] = useState(true);

  // Compute stats or thresholds for South Africa
  // Over 50 employees makes you a "Designated Employer" under the new Employment Equity Amendment Bill.
  const isDesignatedEmployer = numEmployees >= 50;

  return (
    <div className="relative overflow-hidden" id="eea-compliance-guide-page">
      <HeroImage src="/images/Black_woman_in_wheelchair_202606121934.jpeg" tint="#F59E0B" />
      <div className="pt-32 pb-24 min-h-screen bg-[#070D19] text-zinc-100 relative z-10">
      {/* Search Engine Optimization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "S.A. Employment Equity Act (EEA) Disability Compliance & Reporting Guide",
          "description": "The ultimate South African corporate guide to EEA2, EEA4 submissions, disability quotas, and designated employer mandates.",
          "publisher": {
            "@type": "Organization",
            "name": "Virtuabled"
          }
        })}
      </script>

      {/* Decorative Lights */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Breadcrumb />

        {/* Narrative SEO Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <span className="text-brand-teal font-mono font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block px-3.5 py-1.5 bg-brand-teal/10 border border-brand-teal/20 w-max rounded-sm">
            South Africa Legislative Standard
          </span>
          <h1 className="text-4xl md:text-6.5xl font-display font-light text-white tracking-tight leading-none mb-6">
            Employment Equity Act <br />
            <span className="font-semibold text-brand-teal">Disability Reporting (EEA2)</span>
          </h1>
          <p className="text-zinc-300 font-light text-lg md:text-xl leading-relaxed max-w-3xl">
            A comprehensive executive handbook for achieving the Department of Labour's 3% disability representation quota, simplifying legislative complexity, and scaling inclusive business channels.
          </p>
        </motion.div>

        {/* SEO Keyword Core Metrics Bench */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" aria-label="SEO Core Metrics Summary">
          <div className="p-6 rounded-2xl bg-[#091223] border border-white/[0.04] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Primary Quota Target</span>
              <span className="text-3xl font-display font-bold text-[#14b8a6] mt-2 block">3.0%</span>
            </div>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light">
              National Department of Employment and Labour (DEL) recommended guideline for workforce representation of people with disabilities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091223] border border-white/[0.04] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Designation Threshold</span>
              <span className="text-3xl font-display font-bold text-indigo-400 mt-2 block">50+ Employees</span>
            </div>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light">
              Employers with 50 or more staff must submit mandatory annual EEA2 progress forms and EEA4 income differential schemas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091223] border border-white/[0.04] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Non-Compliance Penalty</span>
              <span className="text-3xl font-display font-bold text-brand-amber mt-2 block">Up to R2.7m</span>
            </div>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light">
              Penalties range from R1.5 million or up to 10% of an organization's annual turnover for failure to meet equity quotas without reasonable justification.
            </p>
          </div>
        </section>

        {/* Dynamic Legislative Threshold Calculator */}
        <section className="mb-16 p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider block">Interactive Diagnostic</span>
              <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-tight text-white leading-tight">
                Are you a designated employer subject to EEA penalties?
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                As per the Employment Equity Amendment Bill, designation requirements depend strictly on workforce headcount regardless of annual turnover. Adjust the headcount indicator below:
              </p>

              {/* Slider head */}
              <div className="space-y-4 bg-zinc-950/80 p-5 rounded-2xl border border-zinc-850 mt-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">HEADCOUNT SCALE:</span>
                  <span className="text-brand-teal font-extrabold text-base">{numEmployees} employees</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="300"
                  value={numEmployees}
                  onChange={(e) => setNumEmployees(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                  id="headcount-scale-range"
                />
              </div>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-950/55 border border-white/[0.03] space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDesignatedEmployer ? "bg-[#fb923c]/15 text-[#fb923c]" : "bg-zinc-800 text-zinc-400"}`}>
                  <Landmark size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-300">Headcount Classification</h4>
                  <p className="text-white font-bold text-sm tracking-wide uppercase mt-0.5">
                    {isDesignatedEmployer ? "Designated Employer (Mandated)" : "Non-Designated Specialist"}
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/[0.04]" />

              <div className="space-y-2 text-xs font-light text-zinc-350">
                {isDesignatedEmployer ? (
                  <>
                    <p className="flex items-start gap-2">
                      <span className="text-brand-amber font-mono font-extrabold shrink-0">➜</span>
                      <span><strong>State Requirement:</strong> You must compile and register annual EEA2 and EEA4 returns via the online Department of Labour gateway before the statutory January cut-off limit.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-brand-amber font-mono font-extrabold shrink-0">➜</span>
                      <span><strong>Suggested Actions:</strong> Actively integrate at least {Math.ceil(numEmployees * 0.03)} computer-equipped, adapted professionals with disabilities to satisfy the 3% compliance threshold securely.</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-start gap-2">
                      <span className="text-brand-teal font-mono font-extrabold shrink-0">✔</span>
                      <span>You are exempted from statutory reporting. However, voluntary registration boosts your B-BBEE rating significantly under Code 300, scoring up to 10 points for training spent.</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Interactive Deep-Dive Module */}
        <section className="mb-16">
          <div className="flex flex-wrap gap-2 border-b border-white/[0.05] pb-4 mb-8">
            <button
              onClick={() => setActiveTab("mandates")}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === "mandates" 
                  ? "bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-brand-teal" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Legislative Mandates
            </button>
            <button
              onClick={() => setActiveTab("penalties")}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === "penalties" 
                  ? "bg-[#fb923c]/15 border border-[#fb923c]/30 text-brand-amber" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Non-Compliance Penalties
            </button>
            <button
              onClick={() => setActiveTab("eea2-eea4")}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === "eea2-eea4" 
                  ? "bg-indigo-500/15 border border-indigo-500/30 text-indigo-400" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              EEA2 vs EEA4 Reports
            </button>
            <button
              onClick={() => setActiveTab("strategy")}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === "strategy" 
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Virtuabled Formula
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-3xl bg-[#091223] border border-white/[0.04] min-h-[300px] flex flex-col justify-between"
            >
              {activeTab === "mandates" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-brand-teal">
                    <Scale size={24} />
                    <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Section 20 (Mandated Employment Equity Plans)</h3>
                  </div>
                  <p className="text-sm font-light text-zinc-300 leading-relaxed max-w-4xl">
                    By South African law, all designated employers are mandated to prepare and implement an Employment Equity Plan that states specific numerical targets for increasing the representivity of underrepresented groups, specifically people with disabilities. Sourcing, screening, and placement should not represent a seasonal emergency, but rather a structured pipeline.
                  </p>
                  <p className="text-xs font-mono text-zinc-500 max-w-4xl leading-relaxed">
                    Key compliance area: Workplace accommodations must be reported in full. Simply listing a remote candidate isn't sufficient; employers must prove active configuration of spatial, cognitive, and sensory adapters to avoid audit rejection.
                  </p>
                </div>
              )}

              {activeTab === "penalties" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#fb923c]">
                    <AlertTriangle size={24} />
                    <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">The Cost of Exclusionary Practices</h3>
                  </div>
                  <p className="text-sm font-light text-zinc-300 leading-relaxed max-w-4xl">
                    Failure to compile and execute an approved Employment Equity (EE) plan carries severe legal repercussions. Fines are structured progressively. If an audit locates structural or hiring exclusions with no reasonable effort to accommodate, courts have the jurisdiction to issue penalties starting at R1.5 million up to 10% of global turnover.
                  </p>
                  <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-xs text-zinc-400 leading-relaxed">
                    <strong>Administrative Burden:</strong> Beyond the initial financial penalty, non-compliant corporations face systemic blacklists from municipal and governmental tenders, rendering private procurement opportunities inaccessible.
                  </div>
                </div>
              )}

              {activeTab === "eea2-eea4" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <FileSpreadsheet size={24} />
                    <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Demystifying Reporting Specifications</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">EEA2: Workforce Profile & Movements</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        This schedule maps exact demographic count, categorized under occupational levels (Top Management down to semi-skilled), identifying hires, promotions, terminations, and staff with disabilities.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">EEA4: Income Differential Disclosure</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        Tracks remuneration distributions and structural wage gaps. Reminding companies to demonstrate equal pay for equal value of work among employees, with specific audits for visual or motor-impaired workers in matching brackets.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "strategy" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <ShieldCheck size={24} />
                    <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">Seamless Alignment With Virtuabled</h3>
                  </div>
                  <h4 className="text-white text-sm font-bold uppercase tracking-wider">The Automated Compliance Safeguard</h4>
                  <p className="text-sm font-light text-zinc-300 leading-relaxed max-w-4xl">
                    Virtuabled doesn't just send candidates—it is a full-stack execution layer. Our system generates custom physical accessibility profiles and lists exact assistive tech hardware details. These profiles integrate as clean, compliant entries directly matching the fields required by Department of Labour audit structures, removing the manual overhead from typical and exhausting reporting cycles.
                  </p>
                </div>
              )}

              <div className="pt-6 border-t border-white/[0.04] mt-6 flex justify-end">
                <a 
                  href="#compliance-inquiry-box"
                  onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById("consultation");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#14b8a6] hover:text-white transition-all"
                >
                  <span>Connect with a compliance executive</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Informative Grid Segment on DEL Audits */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl border border-white/[0.05] bg-gradient-to-b from-[#091223] to-[#0A0E1A]">
            <h3 className="text-white text-lg font-bold uppercase tracking-wider mb-3">
              Department of Labour Audits
            </h3>
            <p className="text-zinc-400 text-xs font-light leading-relaxed mb-4">
              Inspectors routinely request evidence that reasonable accommodations have been implemented in good faith. Our Facility Audits and Predictive Matcher provide documentation templates and digital models that satisfy compliance requirements, proving proactive structural transformation.
            </p>
            <ul className="space-y-2 text-xs font-mono text-zinc-500">
              <li className="flex items-center gap-2">
                <span className="text-[#14b8a6]">✔</span> Verified ergonomic specifications
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#14b8a6]">✔</span> Documented hardware and screen overrides
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#14b8a6]">✔</span> Quantifiable skills spends reports
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl border border-white/[0.05] bg-[#091223] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-bold text-indigo-400 tracking-wider block uppercase mb-2">
                Corporate SEO Strategy
              </span>
              <h3 className="text-white text-lg font-bold uppercase tracking-wider">
                Why Inclusive Workspaces Excel
              </h3>
              <p className="text-zinc-400 text-xs font-light leading-relaxed mt-2">
                Organizations employing workers with disabilities report a 28% increase in overall revenue and up to double the net income margins than typical industry competition. Inclusion is an operational advantage, not a charitable initiative.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/[0.04]">
              <p className="text-[10px] font-mono text-zinc-500">
                SEO Focus Index: "Employment Equity Act (EEA)", "EEA2 Reporting Africa", "Disability Representation Stats S.A."
              </p>
            </div>
          </div>
        </section>

        {/* Quick Consultation CTA */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-[#14b8a6]/10 to-indigo-500/10 border border-[#14b8a6]/20 text-center space-y-6" id="compliance-inquiry-box">
          <Sparkles className="mx-auto text-brand-teal animate-pulse" size={32} />
          <h3 className="text-white text-xl md:text-3xl font-display font-light uppercase tracking-tight">
            Protect your business with integrated compliance strategy
          </h3>
          <p className="text-zinc-300 font-light text-sm max-w-2xl mx-auto leading-relaxed">
            Don't risk legal rejections or maximum compliance penalties. Speak to our strategic legal advisors to align your current B-BBEE Scorecard with optimized disability hiring models.
          </p>
          <div>
            <a 
              href="/for-employers"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#f59e0b] hover:bg-[#fb923c] text-slate-950 font-bold font-mono text-xs uppercase tracking-widest transition-all"
            >
              Optimize Our Compliance Now
            </a>
          </div>
        </section>

      </div>
    </div>
    </div>
  );
}
