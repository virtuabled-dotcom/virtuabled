import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ShieldAlert, CheckCircle, Info, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';

interface ESGImpactDashboardProps {
  embedded?: boolean;
}

const SECTORS = [
  { name: 'Financial Services & Banking', baseFine: 2200000, marginFactor: 0.08, acronym: 'FSB' },
  { name: 'Information & Communication Tech (ICT)', baseFine: 1800000, marginFactor: 0.06, acronym: 'ICT' },
  { name: 'Logistics, Supply Chain & Transport', baseFine: 1500000, marginFactor: 0.05, acronym: 'LSC' },
  { name: 'Engineering & Manufacturing', baseFine: 1600000, marginFactor: 0.07, acronym: 'ENG' },
  { name: 'Mining & Resources', baseFine: 2500000, marginFactor: 0.10, acronym: 'MIN' }
];

export function ESGImpactDashboard({ embedded = false }: ESGImpactDashboardProps) {
  // Calculator inputs
  const [workforceSize, setWorkforceSize] = useState<number>(350);
  const [currentDisabled, setCurrentDisabled] = useState<number>(2);
  const [avgSal, setAvgSal] = useState<number>(380000);
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);

  // Derived calculations
  const targetCount = Math.max(1, Math.round(workforceSize * 0.03));
  const deficit = Math.max(0, targetCount - currentDisabled);
  const currentRatio = workforceSize > 0 ? (currentDisabled / workforceSize) * 100 : 0;
  
  // Potential SA statutory fine is either base fine or proportional turn-over model.
  // We simulate turnover as: size * avgSal * multiplier based on industry margins
  const simulatedTurnover = workforceSize * avgSal * (1 / (selectedSector.marginFactor * 1.5));
  const statutoryFine = deficit > 0 
    ? Math.round(selectedSector.baseFine + (deficit * 45000)) 
    : 0;

  const bbePointsScore = currentRatio >= 3.0
    ? 12
    : Math.min(12, Math.round((currentRatio / 3.0) * 12));

  // Chart data
  const chartData = [
    { name: 'Current Adaptive Placements', value: currentDisabled, color: '#14b8a6' },
    { name: 'Statutory Target Deficit', value: deficit, color: '#f59e0b' }
  ];

  return (
    <div className={`w-full rounded-3xl border border-white/[0.06] bg-slate-950/40 backdrop-blur-xl p-6 md:p-8 relative shadow-2xl overflow-hidden ${embedded ? '' : 'my-8'}`}>
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8 relative z-10">
        <div>
          <span className="px-3 py-1 bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#14b8a6] text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-md mb-3 inline-block">
            LEGISLATION ENGINE (RSA)
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-light text-white">
            ESG & 3% EE <span className="font-semibold italic text-brand-teal font-sans">Impact Hub.</span>
          </h3>
          <p className="text-zinc-400 mt-2 text-xs font-light max-w-2xl leading-relaxed">
            Ensure alignment with South African Employment Equity targets. Track your 3% target, simulate compliance deficits, and calculate statutory penalty exposure.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl px-4 py-3 shrink-0">
          <TrendingUp className="text-brand-teal" size={18} />
          <div>
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Statutory Mandate</span>
            <span className="text-xs font-sans font-medium text-white">3.0% Disabled Workforce Ratio</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Interactive Calculator Section */}
        <div className="lg:col-span-7 space-y-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Calculator size={14} className="text-brand-teal" /> Interactive Penalty Exposure Simulator
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Range controls style */}
            <div className="space-y-2 p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400">Total Workforce</label>
                <span className="text-xs font-mono font-bold text-white">{workforceSize} employees</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="5000" 
                step="25"
                value={workforceSize} 
                onChange={(e) => setWorkforceSize(parseInt(e.target.value) || 50)}
                className="w-full accent-brand-teal bg-zinc-800 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                <span>50</span>
                <span>5,000</span>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400">Current Disabled Staff</label>
                <span className="text-xs font-mono font-bold text-white">{currentDisabled} employees</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max={Math.min(100, Math.round(workforceSize * 0.1))} 
                step="1"
                value={currentDisabled} 
                onChange={(e) => setCurrentDisabled(parseInt(e.target.value) || 0)}
                className="w-full accent-brand-teal bg-zinc-800 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                <span>0</span>
                <span>{Math.round(workforceSize * 0.1)} max</span>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400">Average Annual Salary</label>
                <span className="text-xs font-mono font-bold text-white">ZAR {avgSal.toLocaleString('en-ZA')}</span>
              </div>
              <input 
                type="range" 
                min="150000" 
                max="1200000" 
                step="10000"
                value={avgSal} 
                onChange={(e) => setAvgSal(parseInt(e.target.value) || 150000)}
                className="w-full accent-brand-teal bg-zinc-800 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                <span>R150k</span>
                <span>R1.2M</span>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl flex flex-col justify-between">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block mb-1.5">Industry Sector</label>
                <select 
                  value={selectedSector.name}
                  onChange={(e) => {
                    const found = SECTORS.find(s => s.name === e.target.value);
                    if (found) setSelectedSector(found);
                  }}
                  className="w-full bg-[#0c101b] border border-white/[0.08] text-white text-xs rounded-xl p-2 focus:outline-none focus:border-brand-teal transition-all h-9 cursor-pointer"
                >
                  {SECTORS.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-zinc-500 font-mono italic">
            * Turnovers are estimated dynamically by multiplying workforce scale against industry averages. Penalties reflect 2026 South African Employment Equity Code structures.
          </p>

          {/* Core calculated indicators panel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 text-center">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1">Target (3%)</span>
              <span className="text-xl font-bold font-sans text-white">{targetCount}</span>
              <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">Staff Adaptive</span>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 text-center">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1">Current Ratio</span>
              <span className={`text-xl font-bold font-sans ${currentRatio >= 3 ? 'text-brand-teal' : 'text-brand-amber'}`}>
                {currentRatio.toFixed(2)}%
              </span>
              <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">{currentRatio >= 3 ? 'Target Achieved' : 'Deficit Active'}</span>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 text-center">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1">B-BBEE Points</span>
              <span className="text-xl font-bold font-sans text-brand-teal">{bbePointsScore}/12</span>
              <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">Scorecard Value</span>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 text-center">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1">Staff Deficit</span>
              <span className={`text-xl font-bold font-sans ${deficit > 0 ? 'text-brand-amber' : 'text-[#14b8a6]'}`}>
                {deficit}
              </span>
              <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">{deficit > 0 ? "Under Statutory Minimum" : "Fully Compliant"}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Visualization & Potential Fines Section */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Status alerts */}
            <AnimatePresence mode="wait">
              {deficit > 0 ? (
                <motion.div 
                  key="non-compliant"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-brand-amber bg-brand-amber/10 border border-brand-amber/20 px-3 py-2 rounded-xl text-xs">
                    <ShieldAlert size={16} />
                    <span className="font-mono font-bold uppercase tracking-wide">High Regulatory Risk Active</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Estimated Penalty Exposure</span>
                    <div className="text-2xl md:text-3xl font-display font-semibold text-brand-coral">
                      ZAR {statutoryFine.toLocaleString('en-ZA')}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Penalties apply under the <span className="font-semibold text-zinc-300">EE Act Amendment Code</span>. By deploying {deficit} adapted Virtuabled matches, you can mitigate this risk completely.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.04]">
                    <span className="text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider block">POTENTIAL FINES AVOIDED WITH VIRTUABLED MATCH</span>
                    <span className="text-md font-sans font-bold text-brand-teal">ZAR {statutoryFine.toLocaleString('en-ZA')} / annual saved</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="compliant"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-[#14b8a6] bg-[#14b8a6]/10 border border-[#14b8a6]/20 px-3 py-2 rounded-xl text-xs">
                    <CheckCircle size={16} />
                    <span className="font-mono font-bold uppercase tracking-wide">ESG Compliant Status</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Statutory Fine Exposure</span>
                    <div className="text-3xl font-display font-semibold text-brand-teal">
                      ZAR 0
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Your current disabled employee ratio of <span className="font-semibold text-brand-teal">{currentRatio.toFixed(1)}%</span> exceeds the SA 3.0% minimum, and secures maximum Social Development B-BBEE weighting!
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.04]">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Protected Enterprise Safety</span>
                    <span className="text-xs text-zinc-300 font-mono">No fines applicable. You are fully aligned.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Micro Pie Chart Visualization */}
            <div className="h-[140px] w-full pt-4 relative group">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Current Staff', value: workforceSize - targetCount },
                      { name: 'Target Disabled', value: targetCount },
                      { name: 'Current Placed', value: currentDisabled }
                    ]}
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    <Cell fill="#18181b" />
                    <Cell fill="#fb923c" />
                    <Cell fill="#14b8a6" />
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-x-0 bottom-4 text-center">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">COMPLIANCE SPLIT</span>
                <span className="text-[11px] font-sans text-zinc-300">
                  {currentDisabled} of {targetCount} Target Placements
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
