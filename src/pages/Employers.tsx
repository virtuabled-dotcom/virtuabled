import React, { useState, useEffect } from "react";
import { HeroImage } from "@/components/shared/HeroImage";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { AlertTriangle, Clock, Target, CreditCard, ArrowRight, CheckCircle2, Download, ChevronRight, Calculator, Mic } from "lucide-react";
import { useToast } from "@/components/shared/Toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const successData = [
  { name: 'Quarter 1', "Reduced Hiring Costs": 15, "Increased Operational Efficiency": 5 },
  { name: 'Quarter 2', "Reduced Hiring Costs": 25, "Increased Operational Efficiency": 12 },
  { name: 'Quarter 3', "Reduced Hiring Costs": 40, "Increased Operational Efficiency": 22 },
  { name: 'Quarter 4', "Reduced Hiring Costs": 65, "Increased Operational Efficiency": 35 },
];

const ASSESSMENT_STEPS = [
  {
    title: "Physical Ingress",
    question: "Does your primary office location have step-free access and automated entrance doors?",
  },
  {
    title: "Sanitary Facilities",
    question: "Do you have designated, compliant wheelchair-accessible restrooms on all operating floors?",
  },
  {
    title: "Digital Infrastructure",
    question: "Are your core internal operating systems compatible with basic screen reader technologies?",
  },
  {
    title: "Work Flexibility",
    question: "Does your company policy explicitly support asynchronous or remote-first working arrangements?",
  },
  {
    title: "Emergency Protocols",
    question: "Are there visual emergency fire alarms and designated refuge points for physically disabled staff?",
  }
];

const AnimatedAmount = ({ value }: { value: number }) => {
  const animatedValue = useMotionValue(0);
  
  useEffect(() => {
    const controls = animate(animatedValue, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [value, animatedValue]);

  const formatted = useTransform(animatedValue, (latest) => 
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(latest)
  );

  return <motion.span>{formatted}</motion.span>;
};

export default function Employers() {
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [turnover, setTurnover] = useState<number>(50000000);
  const [contraventions, setContraventions] = useState<number>(0);

  const calculateFine = () => {
    const percentage = [0.02, 0.04, 0.06, 0.08, 0.10][contraventions] || 0.02;
    const fixedMin = [1500000, 1800000, 2100000, 2400000, 2700000][contraventions] || 1500000;
    const calculated = turnover * percentage;
    return Math.max(calculated, fixedMin);
  }

  const handleAnswer = (answer: boolean) => {
    setAnswers(prev => ({ ...prev, [currentStep]: answer }));
    if (currentStep < ASSESSMENT_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    goals: ''
  });
  const [listeningField, setListeningField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.companyName.trim()) return;

    // Open the visitor's email client addressed to the partnerships inbox.
    const subject = `Partnership / EE consultation — ${formData.companyName}`;
    const body =
      `Name: ${formData.fullName}\n` +
      `Company / Organisation: ${formData.companyName}\n\n` +
      `Goals / Employment Equity targets:\n${formData.goals || "(not specified)"}\n`;
    window.location.href = `mailto:partners@virtuabled.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showToast(
      "Opening your email",
      "success",
      "We've drafted your enquiry to partners@virtuabled.com — just hit send."
    );
    setFormData({ fullName: '', companyName: '', goals: '' });
  };

  const startListening = (field: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListeningField(field);
    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setFormData(prev => ({ ...prev, [field]: prev[field as keyof typeof prev] ? prev[field as keyof typeof prev] + ' ' + speechResult : speechResult }));
    };
    recognition.onspeechend = () => recognition.stop();
    recognition.onend = () => setListeningField(null);
    recognition.onerror = () => setListeningField(null);

    recognition.start();
  };

  const handleDownloadReport = () => {
    // Mock download action
    const score = Object.values(answers).filter(Boolean).length;
    const content = `Facility Accessibility Report\nScore: ${score}/5\nStatus: ${score >= 3 ? 'Actionable' : 'Critical Intervention Required'}\n\nPlease consult Virtuabled for deployment track configuration.`;
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "accessibility_audit_report.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/people/mandla-nkosi.jpeg" tint="#F59E0B" />
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 font-bold tracking-widest text-xs uppercase mb-6">
          <AlertTriangle size={16} /> Urgent Compliance Notice
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-light leading-[1.05] tracking-tight mb-6 text-white">
          Your Employment Equity gap <br/> <span className="text-red-400 font-medium italic">has a deadline.</span>
        </h1>
        <p className="text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
          Meeting South Africa's 3% Employment Equity target shouldn't feel like a rigid compliance headache. We work hand-in-hand with employers to turn state compliance goals into measurable, sustainable hires.
        </p>
      </motion.div>

      {/* The Law Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {[
          { icon: Target, title: "The 3% Mandate", desc: "Designated employers (50+ staff) must work toward 3% representation of persons with disabilities across all occupational levels — raised from 2% in 2025, with national average still near 1.3%. This is the benchmark the Department of Labour measures you against." },
          { icon: Clock, title: "Immediate Implementation", desc: "Five-year EE plans must be submitted by August 2025. Implementation commences September 1, 2025. Time is running out." },
          { icon: CreditCard, title: "Severe Penalties", desc: "Non-compliance triggers maximum fines of R1.5 Million or 2% of annual turnover, plus disqualification from government tenders." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-zinc-900 border border-white/5 relative overflow-hidden"
          >
            <item.icon className="text-brand-teal mb-6" size={40} />
            <h3 className="text-2xl font-display font-bold mb-3">{item.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Real placements — human proof band */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden border border-zinc-800/80 mb-24 min-h-[320px] flex items-end"
      >
        <img
          src="/images/people/workstation.jpeg"
          alt="A data analyst working at a dual-monitor accessible workstation in Cape Town"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/70 to-transparent" />
        <div className="relative z-10 p-8 md:p-12 max-w-xl">
          <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-3">
            Real Roles · Real People
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-light text-white leading-tight">
            Compliance is the floor. <span className="font-medium italic text-brand-teal">Capability is the point.</span>
          </h3>
          <p className="text-zinc-300 font-light text-sm leading-relaxed mt-3">
            Every placement is a qualified professional doing real work — not a headcount to satisfy an audit. Hit the target by hiring people who move your business forward.
          </p>
        </div>
      </motion.div>

      {/* Risk Visualization */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-8 md:p-12 rounded-3xl border border-red-500/20 bg-gradient-to-b from-[#1a0f0f] to-[#0a0505] mb-24 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
        <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight mb-12 text-white relative z-10">The Cost of Inaction</h2>
        
        <div className="space-y-4 relative z-10">
          {[
            { step: "Status Quo", cost: "0%", desc: "No disability representation in workforce.", color: "bg-zinc-700" },
            { step: "Missed Deadline (Aug 2025)", cost: "Failure to Submit Plan", desc: "Immediate legal non-compliance flag.", color: "bg-brand-amber" },
            { step: "Department Audit (2026+)", cost: "Labour Court Referral", desc: "Public scrutiny and operational disruption.", color: "bg-brand-coral" },
            { step: "Maximum Penalty Applied", cost: "R1,500,000", desc: "Or 2% of Annual Turnover + Loss of Tenders.", color: "bg-red-500" }
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 bg-black/40 p-6 rounded-2xl border border-white/5"
            >
              <div className="flex-1">
                <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">Phase {i + 1}</div>
                <div className="text-xl font-bold">{row.step}</div>
                <div className="text-sm text-zinc-400 mt-1">{row.desc}</div>
              </div>
              <div className="sm:text-right">
                <div className={`inline-block px-4 py-2 rounded-full font-bold text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] ${row.color}`}>
                  {row.cost}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Success Metrics */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-8 md:p-12 rounded-3xl border border-white/5 bg-[#0d0d0d] mb-24 relative overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight mb-4 text-white relative z-10">Partner Success Metrics</h2>
        <p className="text-zinc-400 font-light mb-12 max-w-2xl relative z-10 font-sans leading-relaxed">Our placements prove that when professionals with disabilities are matched with the right role and the right hardware, they deliver measurable results from week one — for themselves and their teams.</p>

        <div className="h-[400px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={successData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 300 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" tickFormatter={(value) => `${value}%`} tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 300 }} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff', fontSize: 14 }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontSize: 12, color: '#a1a1aa', fontWeight: 300 }} />
              <Bar dataKey="Reduced Hiring Costs" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="Increased Operational Efficiency" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabular data alternative for Screen Readers */}
        <div className="sr-only">
          <h3>Screen-readable Alternative: Partner Success Metrics Data</h3>
          <table>
            <thead>
              <tr>
                <th>Quarter</th>
                <th>Reduced Hiring Costs (%)</th>
                <th>Increased Operational Efficiency (%)</th>
              </tr>
            </thead>
            <tbody>
              {successData.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row["Reduced Hiring Costs"]}%</td>
                  <td>{row["Increased Operational Efficiency"]}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Self-Assessment Tool */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-8 md:p-12 rounded-3xl border border-brand-teal/20 bg-gradient-to-br from-[#0a0f0d] to-[#0a0a0a] mb-24 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="flex flex-col lg:flex-row gap-12 relative z-10">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-display font-light tracking-tight mb-4 text-white">Facility Audit</h2>
            <p className="text-zinc-400 font-light mb-8 text-sm font-sans leading-relaxed">
              Explore your team's current workspace layout. This 5-point accessibility check highlights the specific physical and digital adjustments needed to make the environment work for your future candidates.
            </p>
            {/* Progress indicators */}
            <div className="flex gap-2">
              {ASSESSMENT_STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                    isCompleted || i < currentStep 
                      ? "bg-brand-teal" 
                      : i === currentStep 
                        ? "bg-brand-teal/40" 
                        : "bg-gray-800"
                  }`} 
                />
              ))}
            </div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-4">
              {isCompleted ? "Audit Complete" : `Step ${currentStep + 1} of ${ASSESSMENT_STEPS.length}`}
            </div>
          </div>

          <div className="lg:w-2/3 bg-[#0d0d0d] border border-gray-800 rounded-2xl p-8 relative min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isCompleted ? (
                <motion.div 
                  key="question"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="inline-block px-3 py-1 rounded-sm border border-gray-700 bg-zinc-900 text-zinc-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                    {ASSESSMENT_STEPS[currentStep].title}
                  </span>
                  <h3 className="text-2xl text-white font-medium mb-8 leading-snug">
                    {ASSESSMENT_STEPS[currentStep].question}
                  </h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleAnswer(true)}
                      className="flex-1 py-4 bg-brand-teal/10 border border-brand-teal/30 hover:bg-brand-teal hover:text-black transition-colors rounded-xl text-brand-teal font-bold uppercase tracking-widest text-xs"
                    >
                      Yes, Confirmed
                    </button>
                    <button 
                      onClick={() => handleAnswer(false)}
                      className="flex-1 py-4 bg-gray-900 border border-gray-800 hover:border-gray-600 transition-colors rounded-xl text-zinc-400 hover:text-white font-bold uppercase tracking-widest text-xs"
                    >
                      No / Unsure
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-brand-teal" size={32} />
                  </div>
                  <h3 className="text-3xl text-white font-display font-light mb-2">Audit Captured</h3>
                  <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">
                    Your preliminary facility score is {Object.values(answers).filter(Boolean).length}/5. You can now download a high-level summary report for your executive team.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={handleDownloadReport}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-[#0a0a0a] text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors rounded-lg"
                    >
                      <Download size={16} /> Download PDF Report
                    </button>
                    <button 
                      onClick={() => {
                        setIsCompleted(false);
                        setCurrentStep(0);
                        setAnswers({});
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-gray-800 text-zinc-300 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors rounded-lg"
                    >
                      Retake Audit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* ESG Compliance Calculator */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-8 md:p-12 rounded-3xl border border-gray-800 bg-[#0a0f0d] mb-24 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center"
      >
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="lg:w-1/2 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 font-bold uppercase tracking-widest text-[10px] rounded-sm">
            <Calculator size={14} /> Compliance Exposure
          </div>
          <h2 className="text-3xl font-display font-light text-white tracking-tight">ESG & EE Fine Estimator</h2>
          <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-md font-sans">
            To build a resilient future under South African employment equity benchmarks, calculate your statutory risk profile here. Then, find out how we can meet these indicators together, on schedule, through customized workspace designs.
          </p>
        </div>

        <div className="lg:w-1/2 w-full relative z-10 bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8">
           <div className="space-y-6">
             <div className="space-y-3">
               <label htmlFor="turnover-estimator-input" className="text-[10px] font-bold text-white uppercase tracking-widest block">Annual Turnover (ZAR)</label>
               <input 
                 id="turnover-estimator-input"
                 type="number" 
                 min="0"
                 step="1000000"
                 value={turnover}
                 onChange={(e) => setTurnover(Number(e.target.value))}
                 className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-teal transition-colors font-mono"
                 placeholder="e.g. 50000000"
               />
               <span className="text-xs text-zinc-500 font-mono block">Format: ~{(turnover / 1000000).toFixed(1)} Million ZAR</span>
             </div>
             
             <div className="space-y-3">
               <label htmlFor="previous-contraventions-input" className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center justify-between">
                 Previous Contraventions
                 <span className="text-brand-teal text-xs border border-brand-teal/20 bg-brand-teal/10 px-2 py-0.5 rounded">{contraventions}</span>
               </label>
               <input 
                 id="previous-contraventions-input"
                 type="range" 
                 min="0" 
                 max="4" 
                 value={contraventions}
                 onChange={(e) => setContraventions(Number(e.target.value))}
                 className="w-full accent-brand-teal cursor-pointer"
                 aria-valuemin={0}
                 aria-valuemax={4}
                 aria-valuenow={contraventions}
                 aria-valuetext={`${contraventions} previous contraventions`}
               />
               <div className="flex justify-between text-[10px] text-zinc-500 font-mono px-1">
                 <span>0 (None)</span>
                 <span>1</span>
                 <span>2</span>
                 <span>3</span>
                 <span>4+</span>
               </div>
             </div>

             <div className="pt-6 border-t border-gray-800 mt-6" aria-live="polite" aria-atomic="true">
               <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                 Estimated Maximum Penalty
                 <span className="text-white bg-red-500 px-2 py-0.5 rounded text-[9px]">High Risk</span>
               </div>
               <div className="text-4xl md:text-5xl font-display font-light text-white tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>
                 <AnimatedAmount value={calculateFine()} />
               </div>
               <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed font-light">
                 *Calculated as the greater of a fixed punitive amount (ranging from R1.5M to R2.7M) or a percentage (2% to 10%) of total annual turnover, per Schedule 1 of the Employment Equity Act. Note: Additional penalties such as disqualification from government tenders are not monetized here.
               </p>
             </div>
           </div>
        </div>
      </motion.section>

      {/* Get in Touch */}
      <motion.section
        id="consultation"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="scroll-mt-24 p-8 md:p-12 rounded-3xl border border-gray-800 bg-[#0a0a0a] mb-12 relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight mb-4 text-white">Get in Touch</h2>
            <p className="text-[#94A3B8] font-light font-sans max-w-lg mx-auto leading-relaxed">
              Have questions about workstation adaptions, B-BBEE credits, or matching candidates? Write us a message. Eugene, Elmarie, and our supportive local advisors will walk you through every step.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white uppercase tracking-widest block">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-[#0d0d0d] border border-gray-800 rounded-md px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors" 
                    placeholder="Jane Doe" 
                    required 
                  />
                  <button type="button" onClick={() => startListening('fullName')} className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${listeningField === 'fullName' ? 'text-brand-coral animate-pulse' : 'text-zinc-500 hover:text-brand-teal'}`}>
                    <Mic size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white uppercase tracking-widest block">Company Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full bg-[#0d0d0d] border border-gray-800 rounded-md px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors" 
                    placeholder="Acme Corp" 
                    required 
                  />
                  <button type="button" onClick={() => startListening('companyName')} className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${listeningField === 'companyName' ? 'text-brand-coral animate-pulse' : 'text-zinc-500 hover:text-brand-teal'}`}>
                    <Mic size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center justify-between">
                  Inclusion Goals & Needs
                  <button type="button" onClick={() => startListening('goals')} className={`flex items-center gap-1.5 transition-colors ${listeningField === 'goals' ? 'text-brand-coral animate-pulse' : 'text-zinc-500 hover:text-brand-teal'}`}>
                    <Mic size={14} /> <span className="text-[9px]">Voice Input</span>
                  </button>
                </label>
              <textarea 
                rows={4} 
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                className="w-full bg-[#0d0d0d] border border-gray-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors resize-none" 
                placeholder="Tell us about your 2030 compliance targets and current operational needs..." 
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <button type="submit" className="w-full sm:flex-1 py-4 border border-brand-teal bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest hover:bg-white hover:border-white transition-all rounded-sm flex items-center justify-center gap-2">
                Request Partner Consultation <ArrowRight size={16} />
              </button>
              <a href="/employer-portal" className="w-full sm:flex-1 py-4 border border-gray-700 bg-[#0d0d0d] text-zinc-300 font-bold uppercase text-xs tracking-widest hover:border-brand-teal hover:text-brand-teal transition-all rounded-sm flex items-center justify-center gap-2">
                Access Partner Portal
              </a>
            </div>
          </form>
        </div>
      </motion.section>
      </div>
    </div>
  );
}
