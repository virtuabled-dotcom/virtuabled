import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Building, ChevronLeft, ChevronRight, CheckCircle, Download, HelpCircle, AlertTriangle } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SolutionDeepDive } from "@/components/shared/SolutionDeepDive";
import { HeroImage } from "@/components/shared/HeroImage";

const AUDIT_STEPS = [
  {
    step: 1,
    category: "Physical Access Structures",
    title: "Doorway and Entrance Clearances",
    question: "Do your primary security turnstiles and office entrance doors measure at least 850mm wide to accommodate motor-controlled wheelchair entries?",
    options: [
      { value: "fully", label: "Yes, fully compliant (>850mm)" },
      { value: "partially", label: "Partially, some secondary entrances restricted" },
      { value: "non", label: "No clear accessible lanes available" }
    ]
  },
  {
    step: 2,
    category: "Vertical Systemic Navigation",
    title: "Elevator Controls & Braille Overlays",
    question: "Are office elevators equipped with tactile Braille keycaps and an audible verbal floor announcer?",
    options: [
      { value: "fully", label: "Yes, fully audio-visual adapted" },
      { value: "partial", label: "Keys have raised text but no voice announcer" },
      { value: "non", label: "Standard silent elevators with flat digital buttons" }
    ]
  },
  {
    step: 3,
    category: "Digital Intranet & WCAG 2.1 Alignment",
    title: "Screen Reader Intranet Interconnectivity",
    question: "Does your company intranet and core Jira/GSuite configurations support full screen-reader label parsing?",
    options: [
      { value: "fully", label: "Fully tested and compliant with custom overlays" },
      { value: "partial", label: "Standard GSuite works, but internal tooling fails" },
      { value: "non", label: "No baseline WCAG validation is completed" }
    ]
  }
];

export default function FacilityAudits() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentStep = AUDIT_STEPS[currentStepIdx];

  const handleSelectOption = (val: string) => {
    setAnswers(prev => ({ ...prev, [currentStep.step]: val }));
  };

  const handleNext = () => {
    if (currentStepIdx < AUDIT_STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const hasAnsweredCurrent = answers[currentStep.step] !== undefined;

  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/Cinematic,_high-contrast_corporate_office_interior_202606121049.jpeg" tint="#14B8A6" />
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
            Onsite & Virtual Reviews
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mb-6">
            Facility <span className="font-medium italic text-brand-teal font-sans">Audits</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
            Evaluating digital and physical environments to map barrier assessments.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Environment Mapping
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                Comprehensive Environment Accessibility Mapping
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                True inclusion begins by identifying invisible operational boundaries. Virtuabled’s Facility Audits section maps your current physical offices and digital network frameworks against global WCAG standards and local building regulations. Identify accessibility gaps, review immediate structural modifications, and download boardroom-ready PDF action reports designed to optimize your workplace infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-step Question Grid Wizard with slide horizontal animation */}
        <div className="max-w-3xl mx-auto bg-slate-900/60 border border-zinc-800/80 rounded-3xl p-8 relative overflow-hidden" id="audits-flow-wizard">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-6"
              >
                {/* Horizontal Progress Steps Bar Indicator */}
                <div className="flex justify-between items-center text-xs font-mono mb-4 border-b border-zinc-850 pb-4">
                  <span className="text-brand-teal uppercase font-bold flex items-center gap-1.5 font-mono">
                    <Building size={14} /> Step {currentStep.step} of {AUDIT_STEPS.length}
                  </span>
                  <span className="text-zinc-550 shrink-0">
                    Category: {currentStep.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    {currentStep.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {currentStep.question}
                  </p>
                </div>

                {/* Option Selector Grid */}
                <div className="space-y-3.5 my-6">
                  {currentStep.options.map((opt) => {
                    const isSelected = answers[currentStep.step] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectOption(opt.value)}
                        className={`w-full flex text-left p-4 rounded-xl border transition-all text-xs uppercase tracking-wider font-mono font-bold select-none outline-none ${
                          isSelected 
                            ? "bg-brand-teal/10 border-brand-teal text-white shadow-[0_2px_15px_rgba(20,184,166,0.08)]" 
                            : "bg-zinc-950/40 border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/30"
                        }`}
                        id={`opt-btn-${opt.value}`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation triggers */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-850">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStepIdx === 0}
                    className={`flex items-center gap-1 text-xs font-mono uppercase font-bold tracking-wider select-none outline-none ${
                      currentStepIdx === 0 ? "text-zinc-650 cursor-not-allowed" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!hasAnsweredCurrent}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1 select-none outline-none transition-all ${
                      hasAnsweredCurrent 
                        ? "bg-brand-teal text-slate-950 hover:bg-teal-400 shadow-md" 
                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    }`}
                  >
                    {currentStepIdx === AUDIT_STEPS.length - 1 ? "Submit Audit" : "Next"} <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-brand-teal/10 border border-brand-teal/30 text-brand-teal flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <CheckCircle size={32} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                    Infrastructure Mapping Submitted
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Your baseline physical and virtual audit parameters have been processed against national gazetted frameworks.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => alert("Digital assessment report downloaded successfully!")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
                  >
                    <Download size={14} /> Download Boardroom Action Report.PDF
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Facility & Digital Audits Deep Dive context block */}
        <SolutionDeepDive 
          pageId="facility-audits"
          solutionName="Facility & Digital Infrastructure Audits"
          successStory={{
            title: "Universal Access Retrofitting for a Multi-Storey Retail Workspace",
            clientType: "Large scale Gauteng Commerce Corporate Office",
            challenge: "Struggled with inadequate corridor sizing, visual wayfinding alerts, and inaccessible software dashboard frames causing low-comfort scores.",
            solution: "Deployed our automated physical auditing matrix and retrofitted WCAG 2.1 screen accessibility tags simultaneously with zero down-time.",
            kpis: [
              { label: "Physical barriers cleared", value: "100%" },
              { label: "WCAG 2.1 Alignment", value: "Level AA" },
              { label: "Fine Exposure Risk", value: "0%" },
              { label: "Office Mobility score", value: "+85%" }
            ],
            quote: {
              text: "Virtuabled's hybrid audit solved both our physical and digital bottlenecks. It transformed our compliance audit from a nerve-wracking exercise into a straightforward verification.",
              author: "Annelize de Beer",
              role: "Chief Operations Specialist"
            }
          }}
          whitePaper={{
            title: "Physical & Digital Co-Existence: Hybrid Auditing Methodologies for Inclusive Workplace Design",
            abstract: "This white-paper abstract outlines an exhaustive systemic model for auditing modern corporate office environments. By uniting South African building regulation standards (SANS 10400-S) with international digital accessibility structures (WCAG 2.1), we formulate a single, unified 'Inclusion Coefficient' to prioritize refurbishment projects under strict budget constraints.",
            architectureNote: "Connects with IoT spatial detectors and generates CAD-aligned layout models to simplify construction and engineering planning.",
            methodology: [
               "SANS 10400-S physical barrier mapping models",
               "Dynamic DOM audit automation algorithms",
               "Predictive cost-of-refurbishment modeling"
            ],
            technicalStack: [
              "SANS 10400-S Rules",
              "WCAG 2.1 AA Standards",
              "React / Framer-Motion",
              "POPIA-compliant IoT"
            ]
          }}
          faqs={[
            {
              question: "How long does a typical physical and digital facility accessibility audit take?",
              answer: "Our hybrid modeling program takes under 5 working days. The initial baseline dashboard can be populated via our automated self-audit wizard in less than 30 minutes."
            },
            {
              question: "Does meeting SANS 10400-S building regulations guarantee global digital compliance?",
              answer: "No. SANS 10400-S targets physical spatial environments like ramps and doorway clearances. Digital environments require strict WCAG 2.1 guidelines which we verify separately via automated token inspection."
            },
            {
              question: "Can the capital spent on office retrofitting be deducted under tax frameworks?",
              answer: "Yes. All customized office adaptations, tactile labels, and screen alterations often qualify under spatial capital allowances and Section 12H training guidelines."
            }
          ]}
        />

      </div>
    </div>
    </div>
  );
}
