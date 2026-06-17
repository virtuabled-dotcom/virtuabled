import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Server, Star, BookOpen, Download, Check, Users, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SchemaProvider } from "@/components/shared/SchemaProvider";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { HeroImage } from "@/components/shared/HeroImage";

export default function ManagedBpo() {
  const [streamActive, setStreamActive] = useState(false);

  const faqs = [
    {
      q: "How does Managed BPO impact our B-BBEE scorecard?",
      a: "We place and manage qualified professionals with disabilities, and the skills-development and assistive-software training spend behind each placement is recognisable under Skills Development Expenditure (B-BBEE Code Series 300). You gain real headcount against your Employment Equity disability target plus claimable scorecard contribution — without capital outlay on premises or equipment.",
    },
    {
      q: "Is remote work secure for corporate VPN networks?",
      a: "Yes. Our professionals connect through end-to-end encrypted VPN tunnels with secure identity access tokens and least-privilege access, conforming to corporate ISO 27001 IT protocols. Security lives in software and access policy — there is no third-party hardware on your network.",
    },
    {
      q: "Who manages the BPO team day-to-day?",
      a: "Virtuabled. Every professional is sourced, vetted, placed and managed by us — recruitment, onboarding, performance reviews, and HR included. You receive SLA-backed output and a direct contribution to your EE disability target, with zero employment overhead on your side.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Schema Injection for Product */}
      <SchemaProvider
        type="Product"
        productData={{
          name: "Virtuabled Managed BPO",
          description: "Fully managed business process outsourcing delivered by qualified professionals with disabilities. Virtuabled sources, places and manages the staff and provides assistive software catered to each person's disability — you receive SLA-backed output and EE compliance.",
          brand: "Virtuabled",
          offers: {
            price: "100% Tax Claims Eligible",
            priceCurrency: "ZAR",
          },
        }}
      />
      <HeroImage src="/images/Cinematic_professional_portrait_photograph_of_202606121049.jpeg" tint="#14B8A6" />
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
              Fully Managed Outsourcing
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mb-6">
              Managed <span className="font-medium italic text-brand-teal font-sans">BPO</span>
            </h1>
            <p className="text-zinc-300 font-light text-xl leading-relaxed">
              Your Track 2 solution: a dedicated remote team of qualified professionals with disabilities — sourced, placed and managed by Virtuabled, equipped with assistive software catered to each person's condition.
            </p>
          </motion.div>

          {/* Executive Copy Strip */}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 shrink-0">
                <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                  Frictionless Outsource
                </span>
                <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                  People + Assistive Software. Fully Managed.
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-zinc-300 font-light text-sm leading-relaxed">
                  Two things make a placement work: the right person and software that adapts to how they work. Virtuabled provides both. We source and manage elite remote professionals with disabilities and layer in assistive software — screen readers, dictation, cognitive-focus and captioning configurations — tuned to each individual. Your enterprise receives high-performance operational output and statutory compliance, with no premises to retrofit and no equipment to procure. You simply buy the results.
                </p>
              </div>
            </div>
          </div>

          {/* Dual-Column Split Screen Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Column A: Corporate Side */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between min-h-[360px] text-center items-center">
              <div className="space-y-4 w-full">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-400 mx-auto shadow-inner">
                  <Server size={32} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Enterprise Client</span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mt-1">Enterprise Cloud Gateway</h3>
                </div>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Secure corporate repository receiving operational deliverables remotely — no premises changes, no equipment on site.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-850 w-full space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                  <span>WORK MODEL:</span>
                  <span className="text-white">REMOTE-FIRST</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                  <span>ON-SITE OVERHEAD:</span>
                  <span className="text-brand-teal font-bold uppercase">ZERO</span>
                </div>
              </div>
            </div>

            {/* Connective Channel in the Middle */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-6">
              <div className="relative w-full h-8 flex items-center justify-center">
                <div className="absolute left-0 right-0 h-0.5 bg-zinc-800" />
                <motion.div
                  className="absolute h-1 rounded-full cursor-pointer shadow-lg w-16"
                  animate={{
                    left: streamActive ? ["10%", "85%"] : ["85%", "10%"],
                    backgroundColor: streamActive ? ["#F59E0B", "#F59E0B"] : ["#14B8A6", "#14B8A6"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  onClick={() => setStreamActive(!streamActive)}
                  id="interactive-stream"
                />
              </div>
              <button
                onClick={() => setStreamActive(!streamActive)}
                className="mt-4 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white hover:border-white transition-all font-mono text-[9px] uppercase font-bold"
              >
                Toggle Pipeline Stream
              </button>
              <span className="text-[8px] font-mono text-zinc-500 uppercase block mt-2 text-center">
                {streamActive ? "glowing amber beam: ACTIVE SECURE UPTIME" : "teal stream: PASSIVE DATA FLOW"}
              </span>
            </div>

            {/* Column B: Virtuabled Managed Ecosystem */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between min-h-[360px] text-center items-center">
              <div className="space-y-4 w-full">
                <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal mx-auto shadow-lg">
                  <Cpu size={32} className="animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-brand-teal uppercase tracking-widest font-bold">Virtuabled Managed Team</span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mt-1">People &amp; Software Layer</h3>
                </div>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Qualified professionals with disabilities, managed by us and supported with assistive software licensing frameworks tuned to each person.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-850 w-full space-y-2">
                <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                  <span>ASSISTIVE SOFTWARE:</span>
                  <span className="text-white">PER-PERSON CONFIG</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                  <span>ACCESSIBILITY STANDARD:</span>
                  <span className="text-brand-amber font-bold">WCAG 2.1 AA</span>
                </div>
              </div>
            </div>
          </div>

          {/* What we provide / what stays with you */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <div className="p-7 rounded-3xl bg-brand-teal/5 border border-brand-teal/20">
              <div className="flex items-center gap-2.5 mb-4">
                <Users size={18} className="text-brand-teal" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">What Virtuabled Provides</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-300 font-light font-sans">
                <li className="flex items-start gap-2.5"><Check size={13} className="text-brand-teal mt-0.5 shrink-0" /> Sourcing, vetting and placement of qualified professionals with disabilities</li>
                <li className="flex items-start gap-2.5"><Check size={13} className="text-brand-teal mt-0.5 shrink-0" /> Full day-to-day management — onboarding, HR, performance, SLAs</li>
                <li className="flex items-start gap-2.5"><Check size={13} className="text-brand-teal mt-0.5 shrink-0" /> Assistive software catered to each disability (screen readers, dictation, focus layouts, captioning, voice control)</li>
                <li className="flex items-start gap-2.5"><Check size={13} className="text-brand-teal mt-0.5 shrink-0" /> B-BBEE / EE compliance documentation and audit support</li>
              </ul>
            </div>
            <div className="p-7 rounded-3xl bg-zinc-950/60 border border-zinc-800">
              <div className="flex items-center gap-2.5 mb-4">
                <MonitorSmartphone size={18} className="text-zinc-400" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">What Stays With You</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-400 font-light font-sans">
                <li className="flex items-start gap-2.5"><Check size={13} className="text-zinc-600 mt-0.5 shrink-0" /> Your own systems, devices and corporate tooling — we plug our people and software into them</li>
                <li className="flex items-start gap-2.5"><Check size={13} className="text-zinc-600 mt-0.5 shrink-0" /> No premises to retrofit and no equipment to procure — the work is remote</li>
                <li className="flex items-start gap-2.5"><Check size={13} className="text-zinc-600 mt-0.5 shrink-0" /> Sign-off on monthly deliverables, not administrative overhead</li>
              </ul>
            </div>
          </div>

          {/* High-Contrast Compliance Metrics Data Cards */}
          <div id="compliance-metrics-panel" className="mt-20 border-t border-zinc-800 pt-16">
            <div className="mb-10 text-center lg:text-left">
              <span className="text-[10px] font-mono text-brand-teal uppercase tracking-widest font-bold bg-brand-teal/10 px-2.5 py-1 rounded w-max border border-brand-teal/20 inline-block">
                Operational Statistics
              </span>
              <h2 className="text-2xl md:text-3.5xl font-display text-white mt-3 font-light">
                High-Contrast Compliance Metrics
              </h2>
              <p className="text-zinc-400 text-xs font-light leading-relaxed mt-2 max-w-2xl">
                Track real-world statutory benchmarks unlocked through Virtuabled's fully remote, fully managed BPO teams, configured for direct regional auditing structures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.4 }}
                className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl relative overflow-hidden group hover:border-brand-teal/40 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full blur-2xl group-hover:scale-150 transition-all pointer-events-none" />
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" /> B-BBEE Code Series 300
                </div>
                <div className="text-3xl md:text-4.5xl font-mono text-white font-bold tracking-tight mb-2">
                  100%
                </div>
                <div className="text-xs font-semibold text-brand-teal mb-2 uppercase tracking-wide">
                  Tax Claimable Expenditure
                </div>
                <p className="text-zinc-455 text-[11px] leading-relaxed font-light">
                  Skills-development and assistive-software training spend behind each placement counts directly under corporate Skills Development Spend.
                </p>
              </motion.div>

              {/* Metric Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl relative overflow-hidden group hover:border-[#818cf8]/40 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all pointer-events-none" />
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Operational SLA
                </div>
                <div className="text-3xl md:text-4.5xl font-mono text-white font-bold tracking-tight mb-2">
                  99.9%
                </div>
                <div className="text-xs font-semibold text-indigo-400 mb-2 uppercase tracking-wide">
                  Uptime SLA target
                </div>
                <p className="text-zinc-455 text-[11px] leading-relaxed font-light">
                  Managed scheduling, coverage planning and redundancy across the team keep professional output dependable in every season.
                </p>
              </motion.div>

              {/* Metric Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl relative overflow-hidden group hover:border-[#fb923c]/40 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all pointer-events-none" />
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" /> Employment Equity Targets
                </div>
                <div className="text-3xl md:text-4.5xl font-mono text-white font-bold tracking-tight mb-2">
                  3.0%
                </div>
                <div className="text-xs font-semibold text-brand-amber mb-2 uppercase tracking-wide">
                  Statutory EE target (2025–2030)
                </div>
                <p className="text-zinc-455 text-[11px] leading-relaxed font-light">
                  Reach your statutory national target through real remote placements — no local construction or physical retrofitting required.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Success Story Callout with Parallax Depth Effects */}
          <div id="solutions-success-stories" className="mt-20 border-t border-zinc-800 pt-16">
            <div className="relative w-full rounded-3xl bg-zinc-950 border border-zinc-800 p-8 md:p-12 overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
              <div className="absolute top-[-20%] left-[-10%] w-[450px] h-[450px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 group-hover:translate-x-12 group-hover:translate-y-6" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 group-hover:-translate-x-12 group-hover:-translate-y-6" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-[9px] font-mono text-brand-amber bg-brand-amber/10 border border-brand-amber/20 px-2 py-0.5 rounded uppercase font-bold tracking-widest inline-block">
                    Illustrative Scenario
                  </span>
                  <h3 className="text-2xl md:text-3.5xl font-display text-white font-light tracking-tight">
                    How a Financial Hub Could <span className="font-medium text-brand-teal">Turn Audit Exposure</span> Into Local SLA Performance
                  </h3>
                  <p className="text-zinc-300 font-light text-sm leading-relaxed">
                    Picture a multi-national brokerage facing Department of Employment and Labour (DEL) audit exposure at its South African headquarters, where physically retrofitting office structures presents major construction dead-ends.
                  </p>
                  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
                    <Star className="text-brand-amber shrink-0 mt-0.5" size={16} fill="#f59e0b" />
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">
                      With Managed BPO, that firm could bypass building limitations entirely — skilled database specialists sourced and managed remotely, each working in assistive software tuned to their disability, moving from below 1% toward the 3% statutory target without local retrofitting. <span className="text-zinc-500 not-italic">(Illustrative — not a placement claim. Virtuabled is newly launched; real case studies will be published as placements clear probation.)</span>
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#0e0e11] border border-zinc-850 p-6 rounded-3xl relative overflow-hidden group/card shadow-xl">
                  <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-brand-teal to-indigo-500" />
                  <h4 className="text-white font-bold text-xs font-mono uppercase tracking-widest mb-6">Audited Placements:</h4>
                  <div className="space-y-4 font-mono">
                    <div className="border-b border-zinc-900 pb-3 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] text-zinc-500 block">DEL STATUS</span>
                        <span className="text-zinc-200 text-xs font-bold font-sans uppercase">Fully Compliant</span>
                      </div>
                      <span className="text-brand-teal text-lg font-bold">100%</span>
                    </div>
                    <div className="border-b border-zinc-900 pb-3 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] text-zinc-500 block">SKILLS DIRECT POINT EXTENSION</span>
                        <span className="text-zinc-200 text-xs font-sans">Formula 300 Spend</span>
                      </div>
                      <span className="text-brand-amber text-lg font-bold">+12pts</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] text-zinc-500 block">SLA OUTCOMES RECONCILED</span>
                        <span className="text-zinc-200 text-xs font-sans">Remote Operations</span>
                      </div>
                      <span className="text-white text-lg font-bold">Passed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deep-Dive Technical Detail and FAQ Accordion */}
          <div id="solutions-deep-dive" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 border-t border-zinc-800 pt-16">
            {/* Left: Technical White-Paper Abstract */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono text-brand-amber font-bold tracking-widest uppercase bg-brand-amber/10 border border-brand-amber/20 px-2.5 py-1 rounded w-max block">
                Architectural Abstract
              </span>
              <h3 className="text-xl md:text-2xl font-display text-white font-light">
                Technical Specification
              </h3>
              <p className="text-zinc-300 font-light text-xs leading-relaxed">
                Our white-paper details the secure software and access framework behind every placement — encrypted remote connectivity, WCAG 2.1 assistive-software overrides, and modern B-BBEE verification codes.
              </p>

              <div className="p-6 bg-zinc-950/40 border border-zinc-850 rounded-2xl space-y-4">
                <h4 className="text-white font-medium text-xs uppercase font-mono tracking-wider flex items-center gap-2">
                  <BookOpen size={14} className="text-brand-teal" /> Key Chapters:
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400 font-light font-sans">
                  <li className="flex items-start gap-2.5">
                    <Check size={12} className="text-brand-teal mt-0.5 shrink-0" />
                    <span><strong>1. Secure Access Engineering:</strong> Mitigating corporate VPN risks for remote professionals.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={12} className="text-brand-teal mt-0.5 shrink-0" />
                    <span><strong>2. Cognitive Layout Standards:</strong> Assistive-software clutter-filtering guidelines.</span>
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

              <div className="space-y-4" id="solutions-interactive-panel">
                <FAQAccordion
                  accordionId="managed-bpo"
                  items={faqs.map((faq, index) => ({
                    id: `bpo-faq-${index}`,
                    q: faq.q,
                    a: faq.a,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-brand-teal/10 to-transparent border-t border-zinc-800 py-20 px-6 mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-display font-light text-white">Ready to run a remote-first disability BPO?</h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">We provide the people and the assistive software, and we manage the team. You get compliant, SLA-backed output.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://cal.com/heferon-eugene/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-colors">
                Book a BPO Consultation
              </a>
              <Link to="/for-employers"
                className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-700 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:border-white transition-colors">
                Explore the Compliance Suite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
