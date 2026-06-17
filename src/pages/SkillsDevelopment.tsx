import React, { useState } from "react";
import { HeroImage } from "@/components/shared/HeroImage";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Percent, Coins, HelpCircle, Sparkles, Receipt, ArrowRight, 
  GraduationCap, TrendingUp, Landmark, Calculator, BookOpen, 
  Scale, ShieldAlert 
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export default function SkillsDevelopment() {
  const [payrollAmount, setPayrollAmount] = useState(15); // R15 Million standard payroll
  const [disabledTrainingSpend, setDisabledTrainingSpend] = useState(120); // R120k spend

  // Target requirement under Code 300 is 0.3% of annual payroll spend (Leviable Amount) on Black people with disabilities.
  const targetRequirement = (payrollAmount * 1000000) * 0.003;
  const currentRatio = (disabledTrainingSpend * 1000) / (payrollAmount * 1000000);
  const percentOfTarget = Math.min(100, Math.round(((disabledTrainingSpend * 1000) / targetRequirement) * 100));

  return (
    <div className="relative overflow-hidden" id="skills-development-spend-page">
      <HeroImage src="/images/Woman_in_business_casual_202606121934.jpeg" tint="#F59E0B" />
      <div className="pt-32 pb-24 min-h-screen bg-[#070D19] text-zinc-100 relative z-10">
      {/* Search Engine Optimization Structured Data for B-BBEE Code 300 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "B-BBEE Code 300 & Skills Development Spend for People with Disabilities",
          "description": "South African guide to maximizing Skills Development points under the B-BBEE scorecard. Explore Section 12H SARS tax rebates and compliant learnerships.",
          "publisher": {
            "@type": "Organization",
            "name": "Virtuabled"
          }
        })}
      </script>

      {/* Decorative Lights */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-amber/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Breadcrumb />

        {/* Narrative SEO Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <span className="text-brand-amber font-mono font-bold tracking-[0.25em] uppercase text-[10px] mb-4 block px-3.5 py-1.5 bg-brand-amber/10 border border-brand-amber/20 w-max rounded-sm">
            B-BBEE Code 300 Optimization
          </span>
          <h1 className="text-4xl md:text-6.5xl font-display font-light text-white tracking-tight leading-none mb-6">
            Skills Development <br />
            <span className="font-semibold text-brand-amber">spend & SARS Rebates</span>
          </h1>
          <p className="text-zinc-300 font-light text-lg md:text-xl leading-relaxed max-w-3xl">
            Maximize your corporate scorecard return by training black South African professionals with disabilities. Secure bonus compliance weighting points while utilizing Sars Section 12H learnership tax deductions.
          </p>
        </motion.div>

        {/* Core Stats / SARS Incentives */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" aria-label="Sars Tax Incentives and Point Quotas">
          <div className="p-6 rounded-2xl bg-[#091223] border border-white/[0.04] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Section 12H Rebate</span>
              <span className="text-3xl font-display font-bold text-brand-teal mt-2 block">Up to R120,000</span>
            </div>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light font-sans">
              SARS tax allowance deduction per disabled learner per year. Covers R60,000 on commencement and an additional R60,000 on successful completion of registered training models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091223] border border-white/[0.04] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Code 300 target</span>
              <span className="text-3xl font-display font-bold text-brand-amber mt-2 block">0.3% of Payroll</span>
            </div>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light font-sans">
              Leviable amount target allocated under B-BBEE rules specifically for training black individuals with disabilities to secure full point ratings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091223] border border-white/[0.04] flex flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Max Scorecard Points</span>
              <span className="text-3xl font-display font-bold text-indigo-400 mt-2 block">6 + 4 Bonus Points</span>
            </div>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light font-sans">
              A substantial portion of the general Skills element is locked specifically behind disability representation targets, in addition to direct employment management bonuses.
            </p>
          </div>
        </section>

        {/* Live Quotient Calculator */}
        <section className="mb-16 p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 relative overflow-hidden" id="skills-estimator-widget">
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-amber/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-mono text-brand-amber font-bold uppercase tracking-wider block">Point Forecaster</span>
                <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-tight text-white mt-1">
                  Compliance Spend Estimator
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mt-2 font-sans">
                  The law recommends designated entities spend at least 0.3% of annual payroll profiles training disabled workforce members. Use the interactive meters below to view compliance estimates:
                </p>
              </div>

              {/* Slider 1: annual payroll */}
              <div className="space-y-4 bg-zinc-950/80 p-5 rounded-2xl border border-zinc-850">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-500">ANNUAL PAYROLL (LEVIABLE VALUE):</span>
                  <span className="text-white font-extrabold text-xs">R{payrollAmount} Million</span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="50"
                  value={payrollAmount}
                  onChange={(e) => setPayrollAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#fb923c]"
                  id="payroll-slider"
                />
              </div>

              {/* Slider 2: spend */}
              <div className="space-y-4 bg-zinc-950/80 p-5 rounded-2xl border border-zinc-850">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-500">ANNUAL DISABILITY TRAINING SPEND:</span>
                  <span className="text-brand-teal font-extrabold text-xs">R{disabledTrainingSpend}k / year</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="200"
                  value={disabledTrainingSpend}
                  onChange={(e) => setDisabledTrainingSpend(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                  id="training-spend-slider"
                />
              </div>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-950/55 border border-white/[0.03] space-y-4">
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                <span className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest">Required Target Spend</span>
                <span className="text-white font-mono text-sm font-bold">R{targetRequirement.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                <span className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest">Current Projected Spend</span>
                <span className="text-brand-teal font-mono text-sm font-bold">R{(disabledTrainingSpend * 1000).toLocaleString()}</span>
              </div>

              {/* Progress bar and rating */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-zinc-500">SCORECARD QUOTA ACHIEVED:</span>
                  <span className={percentOfTarget >= 100 ? "text-brand-teal font-bold" : "text-brand-amber font-bold"}>
                    {percentOfTarget}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${percentOfTarget >= 100 ? "bg-brand-teal" : "bg-brand-amber"}`}
                    style={{ width: `${percentOfTarget}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs font-light text-zinc-400 mt-4 leading-relaxed">
                {percentOfTarget >= 100 ? (
                  <p className="text-[#14b8a6]">
                    <strong>Target Met:</strong> You are fully matching B-BBEE compliance point requirements for sub-category 300! Learners remain eligible to trigger R120k SARS offsets.
                  </p>
                ) : (
                  <p>
                    <strong>Point Deficiency Identified:</strong> You are currently R{(targetRequirement - disabledTrainingSpend * 1000).toLocaleString()} short of achieving maximal weighting points. Let's redirect this spend compliantly under our Vetted Placements.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed B-BBEE Points Structure */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#091223] border border-white/[0.04] space-y-6">
            <h3 className="text-white text-lg font-bold uppercase tracking-wider font-display">
              B-BBEE Code 300 points roadmap
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Skills Development is a priority element under the generic codes. Reaching target scoring requires strict documentation evidence representing:
            </p>

            <div className="space-y-4 text-xs font-light text-zinc-350">
              <div className="p-4 bg-zinc-950/40 rounded-xl border border-white/[0.02]">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">0.3% Leviable Amount</h4>
                <p className="text-zinc-400">Target spend allocated specifically to train black South African candidates with physical, sensory or mental cognitive conditions.</p>
              </div>

              <div className="p-4 bg-zinc-950/40 rounded-xl border border-white/[0.02]">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Empirical Verification Details</h4>
                <p className="text-zinc-400">Verification agencies require a valid Form EEA1 (Declaration of Disability Status) and certified medical certification from a registered practitioner to endorse entries.</p>
              </div>
            </div>
          </div>

          {/* SARS 12H Rebates Deep-Dive */}
          <div className="p-8 rounded-3xl bg-[#091223] border border-white/[0.04] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-teal">
                <Receipt size={20} />
                <h3 className="text-white text-lg font-bold uppercase tracking-wider font-display">
                  Sars Section 12H Incentives
                </h3>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">
                South African legislative tax codes allow significant cash incentives to compensate organizations that launch certified learnerships specifically structured to integrate disabled candidates:
              </p>
              <ul className="space-y-3 pt-2 text-xs text-zinc-350">
                <li className="flex items-start gap-2">
                  <span className="text-[#14b8a6] font-mono">➡</span>
                  <span><strong>Commencement Allowance:</strong> Claim a statutory R60,000 deduction on payroll tax assessments upon registering each eligible disabled learner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#14b8a6] font-mono">➡</span>
                  <span><strong>Completion Allowance:</strong> Claim an additional R60,000 deduction immediately on successful completion of the curriculum structure.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-[10px] text-indigo-300 font-mono">
              SEO Focus Keys: "B-BBEE Code 300 skills development", "SARS Section 12H tax allowance", "Socio-economic planning SA"
            </div>
          </div>
        </section>

        {/* Virtuabled Advisory Tracking */}
        <section className="p-8 rounded-3xl bg-[#0A101D] border border-white/[0.06] mb-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-mono text-[#14b8a6] tracking-widest uppercase block">Virtuabled Workspace Integration</span>
            <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-white">
              We compile compliance logs with audit readiness
            </h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Tracking training spends, medical logs, EEA1 forms, and learner progress requires massive administrative hours. Virtuabled alleviates this overhead. Our dedicated compliance platform tracks compliance spends, maintains secure, POPIA-validated medical declarations, and exports audit dossiers instantly with one-click convenience.
            </p>
          </div>
        </section>

        {/* Compliance CTA banner */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-[#14b8a6]/10 border border-white/[0.06] text-center space-y-6">
          <GraduationCap className="mx-auto text-brand-amber animate-bounce" size={32} />
          <h3 className="text-white text-2xl md:text-3xl font-display font-light uppercase tracking-tight">
            Stop losing B-BBEE priority scorecard points
          </h3>
          <p className="text-zinc-300 font-light text-sm max-w-2xl mx-auto leading-relaxed">
            Configure learnership networks and hire adapted candidates through a single integrated portal. Protect your B-BBEE Level Status.
          </p>
          <div>
            <a 
              href="/for-employers"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#f59e0b] hover:bg-[#fb923c] text-slate-950 font-bold font-mono text-xs uppercase tracking-widest transition-all"
            >
              Consult compliance auditor
            </a>
          </div>
        </section>

      </div>
    </div>
    </div>
  );
}
