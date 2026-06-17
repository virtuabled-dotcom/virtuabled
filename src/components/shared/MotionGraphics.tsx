import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 1. HuntingRadar:
 * Represents Virtuabled's active outer-hunting search loop.
 * Renders an orbital grid scanning console with a rotating radar sweep and glowing matched nodes.
 */
export function HuntingRadar() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const targets = [
    { id: "t1", cx: 120, cy: 90, role: "AWS Engineer", acc: "Screen-Reader Custom", color: "#14b8a6" },
    { id: "t2", cx: 280, cy: 110, role: "Java Architect", acc: "ADHD Shield Environment", color: "#f43f5e" },
    { id: "t3", cx: 190, cy: 220, role: "UX Designer", acc: "Voice & Switch Input Software", color: "#f59e0b" },
    { id: "t4", cx: 340, cy: 190, role: "Financial Modeler", acc: "Eye-Tracking Keying", color: "#14b8a6" },
  ];

  return (
    <div className="relative w-full border border-zinc-800 bg-[#070707] rounded-3xl p-6 overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.03)] group" id="hunting-radar-panel">
      {/* Absolute Header Overlay */}
      <div className="absolute top-4 left-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Active Radar Loop v1.07</span>
      </div>

      <div className="relative h-[280px] w-full flex items-center justify-center">
        <svg viewBox="0 0 450 300" className="w-full h-full max-w-[450px]">
          {/* Radial Grid lines */}
          <circle cx="225" cy="150" r="140" fill="none" stroke="#27272a" strokeWidth="0.5" strokeDasharray="3 3"/>
          <circle cx="225" cy="150" r="100" fill="none" stroke="#27272a" strokeWidth="0.5" />
          <circle cx="225" cy="150" r="60" fill="none" stroke="#27272a" strokeWidth="0.5" strokeDasharray="4 2"/>
          <circle cx="225" cy="150" r="20" fill="none" stroke="#3f3f46" strokeWidth="0.5" />

          {/* Crosshairs */}
          <line x1="225" y1="5" x2="225" y2="295" stroke="#18181b" strokeWidth="1" />
          <line x1="5" y1="150" x2="445" y2="150" stroke="#18181b" strokeWidth="1" />

          {/* Sweeper beam */}
          <motion.g style={{ transformOrigin: "225px 150px" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            {/* Gradient definition for radar sweep */}
            <defs>
              <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 225 150 L 365 150 A 140 140 0 0 0 324.01 51.01 Z" fill="url(#radarSweep)" />
            <line x1="225" y1="150" x2="365" y2="150" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </motion.g>

          {/* Core Hub */}
          <circle cx="225" cy="150" r="5" fill="#14b8a6" />
          <motion.circle cx="225" cy="150" r="12" fill="none" stroke="#14b8a6" strokeWidth="1"
            animate={{ scale: [1, 2, 1], opacity: [0.7, 0.1, 0.7] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />

          {/* Targets */}
          {targets.map((tgt) => (
            <g key={tgt.id} className="cursor-pointer"
               onMouseEnter={() => setHoveredNode(tgt.id)}
               onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.circle cx={tgt.cx} cy={tgt.cy} r="6" fill={tgt.color} 
                animate={{ r: hoveredNode === tgt.id ? 8 : 5 }}
                transition={{ duration: 0.2 }}
              />
              <motion.circle cx={tgt.cx} cy={tgt.cy} r="14" fill="none" stroke={tgt.color} strokeWidth="0.75"
                animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ repeat: Infinity, duration: 2.5 + Math.random(), ease: "easeOut" }}
              />
              {/* Connector lines if hovered */}
              {hoveredNode === tgt.id && (
                <motion.line x1="225" y1="150" x2={tgt.cx} y2={tgt.cy} stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* Hover Information overlay card */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-4 right-4 bg-zinc-950/95 border border-zinc-800 p-3 rounded-xl shadow-lg max-w-[200px]"
            >
              {(() => {
                const node = targets.find((t) => t.id === hoveredNode);
                if (!node) return null;
                return (
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase text-brand-teal tracking-wider font-bold">Node Locked</div>
                    <div className="text-xs font-semibold text-white truncate">{node.role}</div>
                    <div className="text-[9px] text-zinc-400 leading-tight">Acc: {node.acc}</div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
        <div>ORBITAL ANGLE CALCULATED</div>
        <div className="text-brand-coral font-bold uppercase animate-pulse">Scanning live remote job boards</div>
      </div>
    </div>
  );
}

/**
 * 2. WorkspaceTopology:
 * An interactive high-fidelity connecting system web mapping
 * the integration of the Customer SLA, Virtuabled (Human), Virtuabled Tech Suite, and Candidate.
 */
export function WorkspaceTopology() {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  // Define four nodes surrounding a central core
  const nodes = [
    { id: "candidate", name: "I. Adaptive Candidate", x: 60, y: 140, details: "Raw competence audited with continuous workplace psychological support layers dynamically mapped.", color: "#14b8a6" },
    { id: "heferon", name: "II. Tech R&D Engine", x: 225, y: 50, details: "Custom firmware & workspace wrappers custom-molded to physical & sensory parameters.", color: "#f59e0b" },
    { id: "enterprise", name: "III. Corporate Client (SLA)", x: 390, y: 140, details: "Enterprise-grade production outcomes synced with statutory 3% Employment Equity rules.", color: "#f43f5e" },
    { id: "virtuabled", name: "IV. Virtuabled Human Ops", x: 225, y: 230, details: "Daily touchpoint monitoring, administrative backup, legislative reports, and client account support.", color: "#14b8a6" },
  ];

  return (
    <div className="relative w-full border border-zinc-800 bg-[#070707] rounded-3xl p-6 overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.02)]" id="topology-graph">
      
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-widest text-brand-coral uppercase font-bold">Workspace Parity Circuitry</span>
        <span className="text-[9px] font-mono text-zinc-650">Click Nodes to inspect</span>
      </div>

      <div className="h-[280px] w-full flex items-center justify-center">
        <svg viewBox="0 0 450 280" className="w-full h-full max-w-[450px]">
          {/* Subtle connecting circuits */}
          <g opacity="0.3">
            {/* outer diamond loops */}
            <line x1="60" y1="140" x2="225" y2="50" stroke="#52525b" strokeWidth="1" />
            <line x1="225" y1="50" x2="390" y2="140" stroke="#52525b" strokeWidth="1" />
            <line x1="390" y1="140" x2="225" y2="230" stroke="#52525b" strokeWidth="1" />
            <line x1="225" y1="230" x2="60" y2="140" stroke="#52525b" strokeWidth="1" />
            
            {/* inner star paths */}
            <line x1="60" y1="140" x2="225" y2="140" stroke="#14b8a6" strokeWidth="1.25" strokeDasharray="2 3" />
            <line x1="225" y1="50" x2="225" y2="140" stroke="#f59e0b" strokeWidth="1.25" strokeDasharray="2 3" />
            <line x1="390" y1="140" x2="225" y2="140" stroke="#f43f5e" strokeWidth="1.25" strokeDasharray="2 3" />
            <line x1="225" y1="230" x2="225" y2="140" stroke="#14b8a6" strokeWidth="1.25" strokeDasharray="2 3" />
          </g>

          {/* Moving particles traveling across lines */}
          <motion.circle r="3" fill="#14b8a6"
            animate={{
              cx: [60, 225, 390],
              cy: [140, 50, 140],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          <motion.circle r="3.5" fill="#f43f5e"
            animate={{
              cx: [390, 225, 60],
              cy: [140, 230, 140],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Integration Core */}
          <g>
            <circle cx="225" cy="140" r="14" fill="#0d0d0d" stroke="#27272a" strokeWidth="1" />
            <circle cx="225" cy="140" r="8" fill="#14b8a6" opacity="0.8" />
            <motion.circle cx="225" cy="140" r="22" fill="none" stroke="#14b8a6" strokeWidth="0.5"
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.05, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          {/* Surrounding Nodes */}
          {nodes.map((node) => (
            <g key={node.id} className="cursor-pointer" onClick={() => setActiveSegment(node.id)}>
              {/* Highlight background glowing ring if active */}
              {activeSegment === node.id && (
                <motion.circle cx={node.x} cy={node.y} r="25" fill="none" stroke={node.color} strokeWidth="1"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <circle cx={node.x} cy={node.y} r="16" fill="#0c0c0e" stroke={node.color} strokeWidth="1.5" />
              <circle cx={node.x} cy={node.y} r="6" fill={node.color} />
              
              {/* Labels centered nicely beside nodes */}
              <text x={node.x} y={node.y - 20} textAnchor="middle" fill="#ffffff" fontSize="8.5" fontFamily="monospace" fontWeight="semibold">
                {node.name.split(". ")[1]}
              </text>
            </g>
          ))}
        </svg>

        {/* Dynamic Topology Node Detail box */}
        <div className="absolute inset-x-6 top-[210px] bg-zinc-950/90 border border-zinc-800 p-3 rounded-2xl min-h-[58px] transition-all">
          {activeSegment ? (
            <div>
              <div className="text-[10px] font-mono text-brand-teal uppercase tracking-widest font-bold">
                {nodes.find((n) => n.id === activeSegment)?.name}
              </div>
              <p className="text-[10px] text-zinc-400 font-light leading-relaxed mt-0.5">
                {nodes.find((n) => n.id === activeSegment)?.details}
              </p>
            </div>
          ) : (
            <div className="text-center py-1">
              <span className="text-[10px] text-zinc-550 font-mono">
                [ Click on any surrounding node above to test telemetry signal ]
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 3. PillarSignal:
 * Focus meters showing parameters. Uses Framer motion to create a real-time responsive
 * soundwave or dynamic compliance visual equalizer.
 */
export function PillarSignal() {
  const pillars = [
    { title: "I. Visual", accent: "#14b8a6", status: "STABLE", val: [70, 45, 90, 60, 80, 50, 75] },
    { title: "II. Motor", accent: "#f43f5e", status: "PROCESSED", val: [40, 85, 55, 95, 70, 60, 80] },
    { title: "III. Sensory", accent: "#f59e0b", status: "SHIELDED", val: [80, 60, 40, 75, 50, 90, 65] },
    { title: "IV. Aural", accent: "#14b8a6", status: "SINKING", val: [50, 70, 90, 40, 85, 75, 60] }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full" id="pillar-signals-panel">
      {pillars.map((pil, idx) => (
        <div key={idx} className="bg-[#090909] border border-zinc-850 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono text-zinc-450 uppercase tracking-wider font-bold">{pil.title}</span>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-white/5 bg-black text-white/80">{pil.status}</span>
          </div>

          <div className="h-16 flex items-end justify-center gap-1 mb-3">
            {pil.val.map((height, hIdx) => (
              <motion.div
                key={hIdx}
                className="w-1.5 rounded-t"
                style={{ backgroundColor: pil.accent }}
                initial={{ height: "10%" }}
                animate={{ height: [`${height}%`, `${height - 30}%`, `${height}%`] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2 + hIdx * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest text-center mt-1 border-t border-zinc-900 pt-2 flex items-center justify-center gap-1">
            <span className="w-1 h-1 rounded-full bg-current animate-pulse" style={{ color: pil.accent }} />
            {pil.accent === "#14b8a6" ? "Telematic Node-OK" : "Adapters Operational"}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 4. WorkflowStream:
 * Multi-layered data processing visual flow. Visualizes NLP parsing,
 * sorting taxonomy data dynamically from input to verified node paths.
 */
export function WorkflowStream() {
  return (
    <div className="relative w-full border border-zinc-800 bg-[#070707] rounded-3xl p-6 overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.01)]" id="workflow-data-stream">
      <div className="absolute top-4 left-6 flex items-center gap-1.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 font-bold">NLP Ingestion Diagnostic Stream</span>
      </div>

      <div className="h-[120px] w-full flex items-center justify-center relative mt-6">
        {/* Connection pipeline nodes */}
        <div className="flex w-full items-center justify-between px-6 z-10">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#0e0e11] border border-zinc-800 flex items-center justify-center text-brand-coral text-xs font-mono font-bold shadow-sm">
              RAW
            </div>
            <span className="text-[9px] font-mono text-zinc-550 mt-1.5">CV Intake</span>
          </div>

          <div className="flex-1 h-px bg-zinc-800 relative mx-3">
            <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-teal"
              animate={{ left: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <motion.div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-coral"
              animate={{ left: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1.5 }}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#0e0e11] border border-zinc-850 flex items-center justify-center text-brand-amber text-xs font-mono font-semibold shadow-sm animate-pulse">
              NLP
            </div>
            <span className="text-[9px] font-mono text-zinc-550 mt-1.5">Parser Wrapper</span>
          </div>

          <div className="flex-1 h-px bg-zinc-800 relative mx-3">
            <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-amber"
              animate={{ left: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-xl bg-[#0e0e11] border border-brand-teal/30 flex items-center justify-center text-brand-teal text-xs font-mono font-bold shadow-md">
              SYNC
            </div>
            <span className="text-[9px] font-mono text-zinc-550 mt-1.5">Molded Profile</span>
          </div>
        </div>

        {/* Glowing grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      </div>

      <div className="border-t border-zinc-900 pt-3 flex justify-between items-center text-[9px] font-mono text-zinc-600">
        <div>LATENCY: 12MS</div>
        <div>FLOW STATUS: HEALTHY</div>
      </div>
    </div>
  );
}
