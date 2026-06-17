import React, { useRef, useState } from "react";
import { HeroImage } from "@/components/shared/HeroImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Users, Building2, Zap, ShieldCheck, Cpu, LayoutDashboard, 
  Target, Award, Sparkles, Scale, Percent, Landmark, 
  BarChart3, Quote, ArrowRight, ShieldAlert, ChevronDown, BookOpen, Download, Check 
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SchemaProvider } from "@/components/shared/SchemaProvider";
import { MetricCard, ChartDataPoint } from "@/components/shared/MetricCard";
import { FAQAccordion } from "@/components/shared/FAQAccordion";

// Define structured compliance data for high-contrast cards
const COMPLIANCE_CARDS = [
  {
    icon: <Scale className="text-brand-teal" size={24} />,
    title: "EE Quota Balance",
    metric: "3.0% Goal",
    desc: "Achieve state-mandated national representation targets to immunize your enterprise from rising DEL penalties.",
    badge: "Act 55 Compliance",
    themeColor: "from-brand-teal/20 via-brand-teal/5 to-transparent",
    borderColor: "hover:border-brand-teal/50"
  },
  {
    icon: <Landmark className="text-brand-amber" size={24} />,
    title: "SARS Section 12H",
    metric: "R120,000",
    desc: "Secure high-value tax write-offs split seamlessly into Commencement and Completion tax rebates.",
    badge: "Direct Tax Deduction",
    themeColor: "from-brand-amber/20 via-brand-amber/5 to-transparent",
    borderColor: "hover:border-brand-amber/50"
  },
  {
    icon: <Award className="text-indigo-400" size={24} />,
    title: "B-BBEE Code 300",
    metric: "+14.5 Pts",
    desc: "Eliminate the catastrophic 'Drop-One-Level' priority element penalty with certified training points.",
    badge: "Scorecard Booster",
    themeColor: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    borderColor: "hover:border-indigo-500/50"
  },
  {
    icon: <BarChart3 className="text-emerald-400" size={24} />,
    title: "Deployment Stability",
    metric: "98.4%",
    desc: "Deploy highly adapted teams who maintain peerless retention indices over standard localized recruits.",
    badge: "Operational ROI",
    themeColor: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderColor: "hover:border-emerald-500/50"
  }
];

// Reusable Success Story component with beautiful parallax scroll animations
function SuccessStoryParallax({ 
  client, 
  title, 
  quote, 
  author, 
  role, 
  kpis, 
  bgGradient 
}: { 
  client: string; 
  title: string; 
  quote: string; 
  author: string; 
  role: string; 
  kpis: { label: string; value: string }[];
  bgGradient: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create beautiful, non-blocking background offset scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  return (
    <div 
      ref={containerRef} 
      className="relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 p-8 md:p-14 mb-20 shadow-2xl"
    >
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className={`absolute inset-0 bg-gradient-to-br ${bgGradient} blur-[10px] mix-blend-color-dodge pointer-events-none z-0`}
      />

      <div className="absolute inset-0 bg-[#070708]/90 z-2" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase">
            <Sparkles size={12} className="text-brand-teal" /> Dynamic Success Case
          </span>
          <span className="text-xs uppercase font-mono font-bold text-brand-teal block">{client}</span>
          <h4 className="text-xl md:text-3xl font-display font-semibold tracking-tight text-white leading-tight uppercase">
            {title}
          </h4>

          <div className="p-6 rounded-2xl bg-[#090b10]/60 border border-zinc-800/50 relative">
            <Quote className="absolute top-4 right-4 text-zinc-700/45" size={32} />
            <p className="text-zinc-350 text-xs italic font-light leading-relaxed pr-6 mb-4 font-sans">
              "{quote}"
            </p>
            <div>
              <span className="text-xs font-bold text-white block uppercase tracking-wide">{author}</span>
              <span className="text-[10px] font-mono text-zinc-550 uppercase">{role}</span>
            </div>
          </div>
        </div>

        {/* Verification KPIs Column */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {kpis.map((kpi, idx) => (
            <div 
              key={idx} 
              className="p-5 bg-zinc-900/60 border border-zinc-850 rounded-2xl text-center flex flex-col justify-center hover:border-zinc-700 transition-colors"
            >
              <span className="text-2xl md:text-3.5xl font-display font-black text-brand-teal block">
                {kpi.value}
              </span>
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mt-1.5 leading-snug">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How are placements validated for B-BBEE and Skills Development points?",
      a: "Every engagement coordinates directly with SANAS-accredited verification agencies under Code Series 300 guidelines. We maintain comprehensive attendance logs, certified medical declarations (Form EEA1), and digital proof of delivery for physical workspace equipment."
    },
    {
      q: "What security measures do the offsite sandboxes implement?",
      a: "All professional remote cells are engineered with robust, isolation-grade hardware firewalls, end-to-end encrypted VPN tunnels, and integrated POPIA-compliant authentication monitors that protect confidential client databases."
    },
    {
      q: "How quickly can an enterprise deploy an adapted remote cell?",
      a: "Our standard matching and shortlisting cycle takes under 15 working days from first contact. This covers candidate screening, skills verification, and presenting a vetted shortlist ready for interview."
    }
  ];

  return (
    <div className="relative overflow-hidden" id="solutions-executive-panel">
      <HeroImage src="/images/Woman_with_forearm_crutches_202606121934.jpeg" tint="#14B8A6" />
      <div className="min-h-screen bg-[#070D19] text-zinc-100 pt-32 pb-24 font-sans relative z-10">
      
      {/* Search Engine Optimization JSON-LD Product & Solutions Schema */}
      <SchemaProvider 
        type="Product"
        productData={{
          name: "Virtuabled Enterprise Deployment Tracks",
          description: "Premier corporate placement solutions connecting vetted, adapted disabled professionals with leading designated South African enterprises.",
          brand: "Virtuabled",
          offers: {
            price: "Enquire via Consultation",
            priceCurrency: "ZAR",
            category: "Enterprise Workforce Placement & Managed BPO Solutions"
          },
          aggregateRating: {
            ratingValue: "4.95",
            reviewCount: "64"
          }
        }}
      />

      {/* Ambiance Soft lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-teal/5 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-brand-amber/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Breadcrumb />

        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto mb-20 relative mt-4">
          <span className="text-brand-teal font-mono font-bold tracking-[0.25em] uppercase text-[10px] mb-4 block px-3.5 py-1.5 bg-brand-teal/10 border border-brand-teal/20 w-max mx-auto rounded-sm">
            Strategic Solutions Portfolio
          </span>
          <h1 className="text-4xl md:text-6.5xl font-display font-light leading-none tracking-tight mb-6 text-white">
            Compliance via <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-white to-brand-amber font-medium italic">Operational Excellence</span>
          </h1>
          <p className="text-zinc-300 font-light text-base md:text-lg max-w-3.2xl mx-auto leading-relaxed">
            Our dual deployment models are structurally calibrated to align corporate performance requirements with strict South African legislative mandates. We match, deploy, and support with ultimate efficiency.
          </p>
        </div>

        {/* Refactored Section 1: High-Contrast Compliance Metrics Section */}
        <section className="mb-24" aria-label="Compliance Metrics Overview">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[9px] font-mono text-brand-amber uppercase tracking-[0.2em] font-bold">
              SARS & SANAS Alignment Metrics
            </span>
            <h2 className="text-2xl md:text-4.2xl font-display font-light text-white uppercase mt-2">
              The Cost-of-Compliance <span className="font-semibold text-brand-teal">Optimization</span>
            </h2>
            <p className="text-zinc-400 font-light text-xs mt-1">
              Each solution placement generates simultaneous audit shields across national business guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              id="ee-quota"
              title="EE Quota Balance"
              metricLabel="Act 55 Compliance"
              metricValue="3.0% Goal"
              description="Achieve state-mandated national representation targets to immunize your enterprise from rising DEL penalties."
              chartType="pie"
              data={[
                { label: "Current National Avg", value: 1.3, displayValue: "~1.3%", fillColor: "#EF4444" },
                { label: "Statutory Target", value: 3.0, displayValue: "3.0%", fillColor: "#EAB308" }
              ]}
              tableSummary="A summary of corporate employment equity representation. The national statutory target is 3.0% (raised from 2% in 2025), while current national workforce representation sits at roughly 1.3% — the gap Virtuabled is built to close."
            />

            <MetricCard 
              id="sars-section"
              title="SARS Section 12H"
              metricLabel="Direct Tax Deduction"
              metricValue="R120,005"
              description="Secure high-value tax write-offs split seamlessly into Commencement and Completion tax rebates."
              chartType="bar"
              data={[
                { label: "Commence", value: 60000, displayValue: "R60,000", fillColor: "#6366F1" },
                { label: "Complete", value: 60005, displayValue: "R60,005", fillColor: "#14B8A6" },
                { label: "Combined", value: 120005, displayValue: "R120,005", fillColor: "#EAB308" }
              ]}
              tableSummary="Tax rebate values under SARS Section 12H. Shows R60,000 allowance on Commencement, R60,005 on Completion, accumulating to an aggregate tax allowance of R120,005 per disabled learner."
            />

            <MetricCard 
              id="bbbee-code"
              title="B-BBEE Code 300"
              metricLabel="Scorecard Booster"
              metricValue="+14.5 Pts"
              description="Eliminate the catastrophic 'Drop-One-Level' priority element penalty with certified training points."
              chartType="area"
              data={[
                { label: "Sub-Min", value: 6.0, displayValue: "6.0 Pts" },
                { label: "Disability Target", value: 12.0, displayValue: "12.0 Pts" },
                { label: "Virtuabled Run", value: 14.5, displayValue: "14.5 Pts" }
              ]}
              tableSummary="B-BBEE Scorecard Priority Element points progression. Sub-minimum requirements sit at 6.0 Pts, the target score is 12.0 Pts, and Virtuabled solutions deliver an average yield of 14.5 Pts."
            />

            <MetricCard 
              id="retention-opt"
              title="Deployment Stability"
              metricLabel="Operational ROI"
              metricValue="98.4%"
              description="Deploy highly adapted teams who maintain peerless retention indices over standard localized recruits."
              chartType="area"
              data={[
                { label: "M3 Ret.", value: 99.1, displayValue: "99.1%" },
                { label: "M6 Ret.", value: 98.7, displayValue: "98.7%" },
                { label: "M12 Ret.", value: 98.4, displayValue: "98.4%" }
              ]}
              tableSummary="Employee retention rate across 12-month cycles with Virtuabled workspace customization. Shows stability starting at 99.1% in month 3, 98.7% in month 6, and a peerless 98.4% in month 12."
            />
          </div>
        </section>

        {/* Refactored Section 2: Vetted Placements Track */}
        <section id="hire" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-brand-teal/20 bg-brand-teal/10 text-brand-teal text-[10px] font-bold tracking-[0.2em] uppercase">
              Deployment Track A
            </span>
            <h2 className="text-3xl md:text-5.2xl font-display font-light tracking-tight text-white uppercase">
              Vetted <span className="font-semibold text-brand-teal">Placements</span>
            </h2>
            <p className="text-base text-zinc-350 font-light leading-relaxed">
              Designed for designated employers with existing accessible spatial nodes and experienced HR partners. We operate as the supreme pipeline to South Africa's highly specialized disabled engineering and administrative professionals.
            </p>

            <div className="grid gap-4 mt-8">
              {[
                { 
                  title: "Cognitive Skill Capacity Matching", 
                  desc: "We completely reject pity hiring models. Your open roles are scrutinized by our proprietary matching protocols and mapped strictly on technical competency profiles.", 
                  icon: <Cpu size={20} className="text-brand-teal" /> 
                },
                { 
                  title: "Instant Turnaround Capacity", 
                  desc: "Bypass standard multi-month hiring overheads. Access pre-screened developers, legal clerks, and customer helpdesks ready for onboarding.", 
                  icon: <Zap size={20} className="text-brand-teal" /> 
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-4 p-5 rounded-xl bg-zinc-950/40 border border-zinc-800 hover:border-zinc-750 transition-colors"
                >
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg h-max shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wide">{item.title}</h4>
                    <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href="/employer-portal" 
                className="inline-flex items-center gap-2 text-brand-teal text-xs uppercase tracking-[0.15em] font-mono font-bold hover:text-white transition-colors cursor-pointer group"
              >
                <span>Initiate Matching Protocol</span> 
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 p-8 md:p-12 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-teal/10 blur-[90px] pointer-events-none rounded-full" />
            
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center border border-brand-teal/20 mb-6">
              <Users size={28} className="text-brand-teal" />
            </div>

            <h3 className="text-lg md:text-xl font-display font-light text-white mb-2 uppercase">
              The Vetted Talent Pipeline
            </h3>
            <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6 font-sans">
              Enterprises gain secure credentials to browse and interact dynamically with local, fully compliant tech architects and billing analysts.
            </p>

            <div className="space-y-4 border-t border-zinc-900 pt-6">
               <div className="flex items-center gap-3 text-xs text-zinc-300">
                 <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-brand-teal font-mono text-[10px] font-bold">✓</div>
                 <span>Ocular and speech macro accommodation setup included</span>
               </div>
               <div className="flex items-center gap-3 text-xs text-zinc-300">
                 <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-brand-teal font-mono text-[10px] font-bold">✓</div>
                 <span>Valid Form EEA1 medical confirmation audit files generated</span>
               </div>
            </div>
          </motion.div>
        </section>

        {/* PARALLAX SUCCESS STORY #1 */}
        <SuccessStoryParallax 
          client="Verified S.A. Retail Bank Case"
          title="Assisting Tier-1 Banking Infrastructure under Ocular Terminal setups"
          quote="Virtuabled modeled our AWS terminals and accessibility coordinates perfectly beforehand. The adapted talent onboarded with extreme competency and no hardware friction, avoiding critical implementation bottlenecks."
          author="Dumisani Khumalo"
          role="Director of Spatial Infrastructure Systems"
          kpis={[
            { label: "B-BBEE Quotas", value: "Fully Secured" },
            { label: "Onboard SLA", value: "48 Hours" },
            { label: "Tax Rebates", value: "SARS Claimed" },
            { label: "System Accuracy", value: "98.4%" }
          ]}
          bgGradient="from-brand-teal/30 via-transparent to-zinc-950"
        />

        {/* Refactored Section 3: Turnkey BPO Operations Track */}
        <section id="outsource" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 p-8 md:p-12 shadow-2xl order-2 lg:order-1"
          >
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-amber/10 blur-[90px] pointer-events-none rounded-full" />
            
            <div className="w-14 h-14 rounded-2xl bg-brand-amber/10 flex items-center justify-center border border-brand-amber/20 mb-6">
              <Building2 size={28} className="text-brand-amber" />
            </div>

            <h3 className="text-lg md:text-xl font-display font-light text-white mb-2 uppercase">
              Total Output Ownership SLA
            </h3>
            <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6 font-sans">
              Deploy fully off-site work cells. Virtuabled absorbs the spatial construction liabilities, hardware procurement costs, and day-to-day HR tracking overheads. 
            </p>

            <div className="space-y-4 border-t border-zinc-900 pt-6">
               <div className="flex items-center gap-3 text-xs text-zinc-300">
                 <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-brand-amber font-mono text-[10px] font-bold">✓</div>
                 <span>Operational in under 15 working days</span>
               </div>
               <div className="flex items-center gap-3 text-xs text-zinc-300">
                 <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-brand-amber font-mono text-[10px] font-bold">✓</div>
                 <span>Offsite, fully managed secure VPN connections</span>
               </div>
            </div>
          </motion.div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-brand-amber/20 bg-brand-amber/10 text-brand-amber text-[10px] font-bold tracking-[0.2em] uppercase">
              Deployment Track B
            </span>
            <h2 className="text-3xl md:text-5.2xl font-display font-light tracking-tight text-white uppercase">
              Turnkey <span className="font-semibold text-brand-amber">Operations</span>
            </h2>
            <p className="text-base text-zinc-350 font-light leading-relaxed">
              Designed to optimize transformation budgets for enterprises without the spatial accessibility parameters or HR capability to foster adaptive workspaces natively. We construct, house, and operationalize the entire cell off-site.
            </p>

            <div className="grid gap-4 mt-8">
              {[
                { 
                  title: "Pre-Adapted Virtual Workplaces", 
                  desc: "Every remote cell is constructed with advanced ocular mouse pointers, screen VoiceOver synthetics, and POPIA-compliant security pathways before launch.", 
                  icon: <LayoutDashboard size={20} className="text-brand-amber" /> 
                },
                { 
                  title: "Comprehensive B-BBEE Audit Support", 
                  desc: "Virtuabled provides real-time audit files containing qualified medical declarations and attendance logs securely to your SANAS verification agent.", 
                  icon: <ShieldCheck size={20} className="text-brand-amber" /> 
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-4 p-5 rounded-xl bg-zinc-950/40 border border-zinc-800 hover:border-zinc-755 transition-colors"
                >
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg h-max shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wide">{item.title}</h4>
                    <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARALLAX SUCCESS STORY #2 */}
        <SuccessStoryParallax 
          client="Verified S.A. Business Solutions Provider"
          title="Level 3 Scoring Secured via Structured Off-site Learnerships"
          quote="We risked losing key public sector supply contracts due to B-BBEE level slip margins. Virtuabled launched an offsite-managed development track that instantly satisfied numeric representation quotas and preserved our score."
          author="Patricia van Niekerk"
          role="Chief Employment Equity Committee Chair"
          kpis={[
            { label: "B-BBEE Contributor", value: "Level 3" },
            { label: "Scorecard delta", value: "+14.5 pts" },
            { label: "SARS 12H rebates", value: "R1.2M Claimed" },
            { label: "Class Retention", value: "90% Stability" }
          ]}
          bgGradient="from-brand-amber/30 via-transparent to-zinc-950"
        />

        {/* Deep-Dive Technical Detail and FAQ Accordion */}
        <div id="services-deep-dive" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 border-t border-zinc-800 pt-16">
          
          {/* Left: Technical White-Paper Abstract */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[10px] font-mono text-brand-amber font-bold tracking-widest uppercase bg-brand-amber/10 border border-brand-amber/20 px-2.5 py-1 rounded w-max block">
              Architectural Abstract
            </span>
            <h3 className="text-xl md:text-2xl font-display text-white font-light uppercase">
              Technical Specification
            </h3>
            <p className="text-zinc-300 font-light text-xs leading-relaxed">
              Our architectural white-paper details the secure workspace sandbox infrastructure deployed automatically to each candidate's household. It explains hardware isolation setups, WCAG 2.1 screen overrides, and modern B-BBEE verification codes.
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
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest block">
              Interactive FAQ Accordion
            </span>
            <h3 className="text-xl md:text-2xl font-display text-white mt-1 font-light mb-6 uppercase">
              Solutions Frequently Asked Questions
            </h3>

            <div className="space-y-4" id="services-interactive-panel">
              <FAQAccordion 
                accordionId="services"
                items={faqs.map((faq, index) => ({
                  id: `srv-faq-${index}`,
                  q: faq.q,
                  a: faq.a,
                }))}
              />
            </div>
          </div>

        </div>

        {/* Final CTA Visual */}
        <div className="mt-32 text-center rounded-3xl p-12 bg-gradient-to-b from-[#091223] to-zinc-950 border border-zinc-850 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/5 blur-[100px] pointer-events-none rounded-full" />
          
          <span className="text-brand-teal font-mono font-bold tracking-[0.25em] uppercase text-[9px] mb-4 block">
            Executive Integration
          </span>
          <h2 className="text-3xl md:text-5.5xl font-display font-light text-white mb-6 relative z-10 uppercase">
            Scale with an <span className="italic font-medium text-brand-teal">adapted workforce</span>
          </h2>
          <p className="text-zinc-400 font-light max-w-2xl mx-auto mb-8 relative z-10 text-xs md:text-sm leading-relaxed font-sans">
            Transform your transformation budget from a compliance write-off into a high-performance workspace tool. Connect directly with our operational engineers to map your corporate requirements.
          </p>
          <a 
            href="/for-employers" 
            className="relative z-10 inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-teal text-[#0a0a0a] text-xs font-mono font-bold uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all rounded-xl"
            id="solutions-cta-action"
          >
            <span>Request Consult Meeting</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </div>
    </div>
  );
}
