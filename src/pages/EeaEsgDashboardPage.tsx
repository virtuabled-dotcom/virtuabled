import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, AlertTriangle, ShieldCheck, FileText, ChevronRight, Download, BarChart2 } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useGoogleSheetData } from "../utils/googleSheets";
import { HeroImage } from "@/components/shared/HeroImage";

export default function EeaEsgDashboardPage() {
  const [activeSegment, setActiveSegment] = useState<string>("provincial");
  const [isCalculated, setIsCalculated] = useState(false);
  const { data: sheetData } = useGoogleSheetData();

  // Numbers count up simulation
  const [complianceScore, setComplianceScore] = useState(0);
  const [finesAvoided, setFinesAvoided] = useState(0);
  const [totalWorkforceRepresented, setTotalWorkforceRepresented] = useState(0);

  const targetScore = sheetData.complianceTargetsAchieved ? Math.min(sheetData.complianceTargetsAchieved, 100) : 94;
  const targetFines = sheetData.professionalsPlaced ? sheetData.professionalsPlaced * 150000 : 2400000;
  const targetRep = sheetData.totalCandidates || 1700;

  useEffect(() => {
    if (isCalculated) {
      setComplianceScore(0);
      setFinesAvoided(0);
      setTotalWorkforceRepresented(0);

      let scoreTimer = setInterval(() => {
        setComplianceScore(prev => {
          if (prev >= targetScore) { clearInterval(scoreTimer); return targetScore; }
          return prev + 2;
        });
      }, 30);

      let fineTimer = setInterval(() => {
        setFinesAvoided(prev => {
          if (prev >= targetFines) { clearInterval(fineTimer); return targetFines; }
          const step = Math.ceil(targetFines / 24);
          const next = prev + step;
          return next >= targetFines ? targetFines : next;
        });
      }, 40);

      let representationTimer = setInterval(() => {
        setTotalWorkforceRepresented(prev => {
          if (prev >= targetRep) { clearInterval(representationTimer); return targetRep; }
          const step = Math.ceil(targetRep / 35);
          const next = prev + step;
          return next >= targetRep ? targetRep : next;
        });
      }, 25);

      return () => {
        clearInterval(scoreTimer);
        clearInterval(fineTimer);
        clearInterval(representationTimer);
      };
    }
  }, [isCalculated, targetScore, targetFines, targetRep]);

  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/Man_in_wheelchair_headshot_202606121934 (2).jpeg" tint="#F59E0B" />
      <div className="pt-32 pb-24 min-h-screen bg-[#0B132B] text-zinc-100 relative z-10">
      {/* Decorative Blur BGs */}
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
            Statutory Risk Intelligence
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mb-6">
            EEA ESG <span className="font-medium italic text-brand-teal">Compliance Dashboard</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
            Real-time data visualization transforming compliance tracking from a reactive annual headache into a proactive strategic asset.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Strategic Ledger
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                Proactive Compliance Forecasting at Scale
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                Transparency is the foundation of corporate governance. The EEA ESG Dashboard provides Chief Risk Officers and HR Directors with real-time analytics tracking your 2030 Employment Equity trajectories. Monitor workforce parity indexes, calculate operational risk profiles, and visualize diversity metrics through an automated ledger designed for immediate presentation to boards, stakeholders, and statutory auditors.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Interactive Dashboard Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="dashboard-layout">
          
          {/* Controls on Left */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80">
            <div>
              <span className="text-[9px] font-mono font-bold text-brand-teal tracking-widest uppercase block mb-4">
                Interactive Forecaster
              </span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
                Simulate Risk Trajectories
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-6">
                Determine your company's alignment score by toggling the simulation matching algorithm below.
              </p>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setIsCalculated(true)}
                  className="w-full py-4 bg-brand-teal hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg text-center select-none"
                >
                  Run Compliance Simulator
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCalculated(false);
                    setComplianceScore(0);
                    setFinesAvoided(0);
                    setTotalWorkforceRepresented(0);
                  }}
                  className="w-full py-3 bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 font-mono text-xs uppercase tracking-widest rounded-xl transition-colors text-center"
                >
                  Reset Calculator
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-850 space-y-4">
              <div className="flex gap-3 items-start text-xs text-zinc-400 font-light">
                <ShieldCheck size={16} className="text-brand-amber shrink-0 mt-0.5" />
                <p>
                  Calculations comply strictly with Chapter III of South Africa's gazetted Employment Equity Amendment Act.
                </p>
              </div>
            </div>
          </div>

          {/* Results Vis on Right */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono font-bold text-brand-amber tracking-widest uppercase flex items-center gap-1">
                  <BarChart2 size={12} /> Trajectory Forecast Table
                </span>
                <span className="text-[9px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-850">
                  Target: 2030 Trajectories
                </span>
              </div>

              {/* Statistics Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">
                    Equitable Trajectory Index
                  </span>
                  <div className="text-3xl font-display font-light text-brand-teal">
                    {complianceScore}%
                  </div>
                  <span className="text-[9px] text-zinc-400 block mt-1">Target Threshold: 90%</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">
                    Potential Penalties Avoided
                  </span>
                  <div className="text-3xl font-display font-light text-brand-amber">
                    {finesAvoided > 0 ? `ZAR ${(finesAvoided / 1000000).toFixed(1)}M` : 'ZAR 0.0'}
                  </div>
                  <span className="text-[9px] text-zinc-400 block mt-1">Based on active workforce</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">
                    Represented Workforce Count
                  </span>
                  <div className="text-3xl font-display font-light text-white">
                    {totalWorkforceRepresented > 0 ? `${totalWorkforceRepresented.toLocaleString()}+` : '0'}
                  </div>
                  <span className="text-[9px] text-zinc-400 block mt-1">Linked database talent</span>
                </div>
              </div>

              {/* Custom SVG Interactive Bar Graph representing South African Corporate Trajectories */}
              <div className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-850 max-h-[220px] flex flex-col justify-end space-y-4">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block">
                  Provincial Vs National Target Parity
                </span>

                <div className="flex justify-between items-end h-28 pt-4">
                  {[
                    { label: "Gauteng", value: 45, projected: 85 },
                    { label: "Western Cape", value: 35, projected: 78 },
                    { label: "KwaZulu-Natal", value: 50, projected: 91 },
                    { label: "Eastern Cape", value: 20, projected: 68 },
                    { label: "National Target", value: 65, projected: 95 }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 group/bar relative">
                      {/* Interactive Amber Overlay Tooltip on Hover */}
                      <div className="absolute bottom-full mb-2 bg-[#FF9F1C] text-slate-950 text-[9px] font-mono font-bold py-1 px-2 rounded opacity-0 pointer-events-none group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-10">
                        Projected 2030: {bar.projected}% | Fines avoided: ZAR 1.2M
                      </div>

                      <div className="w-full max-w-[24px] flex gap-1 items-end h-20">
                        {/* Current Bar */}
                        <motion.div 
                          className="w-2.5 bg-zinc-800 rounded-t-sm"
                          animate={{ height: isCalculated ? `${bar.value}%` : '5%' }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                        />
                        {/* Optimised Projected Bar */}
                        <motion.div 
                          className="w-2.5 bg-brand-teal rounded-t-sm"
                          animate={{ height: isCalculated ? `${bar.projected}%` : '5%' }}
                          transition={{ duration: 1, delay: idx * 0.15 }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-zinc-500 mt-2 block">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[10px] text-zinc-500 font-mono">
                DATA INTEGRITY LOCKED BY HEFERON CERTIFICATE #005089
              </span>
              <button
                type="button"
                onClick={() => alert("Board presentation PDF successfully generated!")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-white select-none shadow"
              >
                <Download size={14} className="text-brand-amber animate-pulse" /> Board Report.PDF
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
    </div>
  );
}
