import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Map } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HeroImage } from "@/components/shared/HeroImage";

const HUBS = [
  {
    id: "gauteng-hub",
    name: "Gauteng",
    partner: "Spinal & Mobility Focus",
    x: "55%",
    y: "35%",
    focus: "Spinal cord injury · Mobility disability · Vocational rehabilitation",
    description: "South Africa's largest economic hub and the densest pool of qualified professionals re-entering work after spinal or mobility-related rehabilitation. Sourcing centres on candidates leaving vocational programmes ready for permanent, office or remote roles."
  },
  {
    id: "cape-town-hub",
    name: "Western Cape",
    partner: "Deaf & Acquired Disability Focus",
    x: "22%",
    y: "82%",
    focus: "Deaf and hard of hearing · Acquired disability · Residential rehabilitation",
    description: "Sourcing across the Western Cape's vocational networks and residential rehabilitation homes, where candidates complete professional training before placement. Strong representation of Deaf and hard-of-hearing professionals."
  },
  {
    id: "durban-hub",
    name: "KwaZulu-Natal",
    partner: "Neurodiversity Focus",
    x: "72%",
    y: "58%",
    focus: "Deafness · Autism spectrum · Neurodiversity",
    description: "Focus on Deaf professionals and neurodiverse talent entering formal employment for the first time — candidates whose capability is consistently underestimated by conventional hiring."
  },
  {
    id: "eastern-cape-hub",
    name: "Eastern Cape",
    partner: "Graduate Re-entry Focus",
    x: "52%",
    y: "78%",
    focus: "Physical disability · Post-injury re-entry · Graduate candidates",
    description: "Targets graduates exiting spinal and physical rehabilitation who hold tertiary or vocational qualifications and are ready for permanent placement, often into remote-first roles."
  }
];

export default function ThePipeline() {

  const [activeHub, setActiveHub] = useState<typeof HUBS[0] | null>(HUBS[0]);

  // Sync state if activeHub points to a stale structure
  const currentHub = HUBS.find(h => h.id === activeHub?.id) || HUBS[0];

  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/Editorial_photograph_of_a_South_202606121050.jpeg" tint="#14B8A6" />
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
            Community Discovery Engines
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mb-6">
            The <span className="font-medium italic text-brand-teal font-sans">Pipeline</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
            Showcasing our deep integration with premier vocational, medical, and rehabilitation networks.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Target Discovery
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                Rooted within Premier Professional Development Networks
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                Virtuabled does not source talent from passive public boards. We build relationships directly with South Africa's vocational training and rehabilitation networks across every province, reaching qualified professionals at the point they are ready to re-enter work — not months later on a generic job site. The result is a resilient, regional pipeline of candidates whose capability is real and whose access needs are already understood.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive South African Hub Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Mapped SVG Canvas (Interactive Map of South Africa mockup) */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-8 min-h-[460px] flex flex-col justify-between relative overflow-hidden select-none">
            
            {/* Outline Header */}
            <div className="flex justify-between items-center mb-4 border-b border-zinc-850 pb-4">
              <span className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest flex items-center gap-1">
                <Map size={14} className="text-brand-teal" /> Interactive S.A. Regional Hubs
              </span>
              <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
                Active Discovery Pulses
              </span>
            </div>

            {/* South Africa Province Map */}
            <div className="relative flex-1 flex items-center justify-center border border-zinc-900/60 rounded-2xl bg-zinc-950 overflow-hidden">
              <svg
                viewBox="0 0 400 320"
                className="w-full max-h-[300px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="South Africa sourcing hub map"
              >
                {/* SA outer boundary */}
                <path
                  d="M 38,24 L 378,24 L 385,52 L 387,112 C 386,142 376,170 356,198 L 328,244 C 304,270 276,288 244,297 C 216,305 188,306 160,298 C 128,287 100,268 78,248 C 54,226 38,198 34,166 C 30,132 30,76 38,24 Z"
                  fill="#0d1626"
                  stroke="#14B8A6"
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                />
                {/* Lesotho enclave */}
                <ellipse cx="248" cy="204" rx="17" ry="13" fill="#0B132B" stroke="#14B8A6" strokeWidth="0.8" strokeOpacity="0.2"/>
                {/* Province interior lines (subtle) */}
                {/* Limpopo southern border ~y=108 */}
                <line x1="38" y1="108" x2="387" y2="108" stroke="#14B8A6" strokeWidth="0.4" strokeOpacity="0.15" strokeDasharray="5 5"/>
                {/* Northern Cape / Free State / North West east border ~x=155 */}
                <line x1="155" y1="24" x2="155" y2="108" stroke="#14B8A6" strokeWidth="0.4" strokeOpacity="0.12" strokeDasharray="5 5"/>
                {/* Gauteng box */}
                <rect x="215" y="108" width="50" height="42" rx="2" fill="#14B8A6" fillOpacity="0.04" stroke="#14B8A6" strokeWidth="0.5" strokeOpacity="0.2"/>
                {/* Free State / N.Cape border ~x=155, y=108 to ~220,240 */}
                <line x1="155" y1="108" x2="178" y2="244" stroke="#14B8A6" strokeWidth="0.4" strokeOpacity="0.12" strokeDasharray="5 5"/>
                {/* KZN / E.Cape border */}
                <line x1="295" y1="165" x2="328" y2="244" stroke="#14B8A6" strokeWidth="0.4" strokeOpacity="0.12" strokeDasharray="5 5"/>
                {/* Province labels */}
                <text x="60" y="72" fill="#374151" fontSize="7.5" fontFamily="monospace" fontWeight="bold">N. CAPE</text>
                <text x="228" y="72" fill="#374151" fontSize="7.5" fontFamily="monospace" fontWeight="bold">LIMPOPO</text>
                <text x="218" y="125" fill="#374151" fontSize="6.5" fontFamily="monospace" fontWeight="bold">GP</text>
                <text x="305" y="138" fill="#374151" fontSize="6.5" fontFamily="monospace" fontWeight="bold">MPU</text>
                <text x="162" y="185" fill="#374151" fontSize="7" fontFamily="monospace" fontWeight="bold">FREE STATE</text>
                <text x="308" y="195" fill="#374151" fontSize="7" fontFamily="monospace" fontWeight="bold">KZN</text>
                <text x="58" y="265" fill="#374151" fontSize="7" fontFamily="monospace" fontWeight="bold">W. CAPE</text>
                <text x="192" y="268" fill="#374151" fontSize="7" fontFamily="monospace" fontWeight="bold">E. CAPE</text>
              </svg>

              {/* Hub pins — positioned over the map */}
              {HUBS.map((hub) => {
                const isActive = activeHub?.id === hub.id;
                const initial = hub.name.charAt(0);
                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub)}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 p-1.5 cursor-pointer outline-none focus:ring-2 focus:ring-brand-teal/50 rounded-full"
                    style={{ left: hub.x, top: hub.y }}
                    id={`hub-pin-${hub.id}`}
                    aria-label={`Select ${hub.name} hub`}
                    aria-pressed={isActive}
                  >
                    <span className="relative flex h-6 w-6">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                        isActive ? "bg-brand-amber" : "bg-brand-teal"
                      }`} />
                      <span className={`relative inline-flex rounded-full h-6 w-6 border-2 items-center justify-center text-[9px] font-mono font-black ${
                        isActive
                          ? "bg-brand-amber border-amber-300 text-slate-950"
                          : "bg-brand-teal border-teal-300 text-slate-950"
                      }`}>
                        {initial}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">
                Click a hub to explore the sourcing partnership
              </span>
              <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-teal inline-block" /> Active</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-amber inline-block" /> Selected</span>
              </div>
            </div>
          </div>

          {/* Hub Summary Panel overlay display card on right */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {currentHub ? (
                <motion.div
                  key={currentHub.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 text-left"
                >
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-brand-teal uppercase tracking-widest px-2.5 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-md inline-block">
                      {currentHub.partner}
                    </span>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                      {currentHub.name}
                    </h3>
                  </div>

                  <div className="p-4 bg-zinc-950/60 border border-zinc-850 rounded-xl">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-2 flex items-center gap-1">
                      <MapPin size={10} className="text-brand-teal" /> Disability Focus Areas
                    </span>
                    <p className="text-[11px] text-brand-teal font-mono font-medium leading-relaxed">{currentHub.focus}</p>
                  </div>

                  <div className="p-4 bg-zinc-950/20 border border-zinc-850/60 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-400 block">
                      Sourcing Partnership
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                      {currentHub.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/for-employers"
                      className="w-full py-4 bg-brand-teal hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg select-none flex items-center justify-center"
                    >
                      Partner with this Network
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-center font-mono text-zinc-550 text-xs uppercase tracking-widest">
                  SELECT A DISTRICT HUB TO MAP CAPABILITIES
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
    </div>
  );
}
