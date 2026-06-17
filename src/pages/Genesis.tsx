import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Play, X, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HeroVideo } from "@/components/shared/HeroVideo";

const MILESTONES = [
  {
    year: "AGE 19",
    title: "The Turn",
    desc: "An athlete from Stellenbosch, Eugene broke his back in a car accident at 19. What followed was a year and eight months across hospitals and rehabilitation centres, and surgery on both hips."
  },
  {
    year: "THE CLIMB",
    title: "Virgin Active",
    desc: "Taken in by Turfhall Cheshire Home after three years recovering from a pressure sore, Eugene got the first learnership he interviewed for — a Virgin Active call centre role. He posted the highest sales in his first month and went on to open the Virgin Active club at Table Bay Mall."
  },
  {
    year: "12 YEARS",
    title: "Built in Tech",
    desc: "Twelve years building operations infrastructure and remote teams for companies across South Africa, the UK, and the US — the exact recruitment systems that would later become Virtuabled."
  },
  {
    year: "2026",
    title: "Virtuabled Launches",
    desc: "After watching a qualified friend stay locked out, Eugene pointed those tools at his own people. Virtuabled places professionals with disabilities into real, permanent roles — aligned to South Africa's Employment Equity targets natively."
  }
];

export default function Genesis() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0B132B] text-zinc-100 relative overflow-hidden">
      {/* Spinal column video — the lived-experience centerpiece (right half of hero) */}
      <div className="absolute top-0 right-0 w-1/2 h-[88vh] hidden lg:block" aria-hidden>
        <HeroVideo src="/images/hero-spine.mp4" poster="/images/hero-spine.jpg" tint="#14B8A6" scrim={false} className="w-full h-full" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0B132B] to-transparent pointer-events-none z-[3]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B132B] to-transparent pointer-events-none z-[3]" />
      </div>
      {/* Background flare */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Accessible Video Lightbox Overlay Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <div className="relative w-full max-w-4xl aspect-video bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-850 shadow-2xl">
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors border border-zinc-800"
              >
                <X size={20} />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/T9p3fI7lSo8?autoplay=1" 
                title="Eugene Hefer — Virgin Active, Table Bay Mall"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Breadcrumb />

        {/* Narrative Epicenter Hero block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-16"
        >
          <span className="text-brand-amber font-mono font-bold tracking-widest uppercase text-[10px] mb-4 block px-3.5 py-1.5 bg-brand-amber/10 border border-brand-amber/20 w-max rounded-sm">
            Platform Proven Origins
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-light text-white tracking-tight leading-none mb-6">
            Our <span className="font-medium italic text-brand-teal">Genesis</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed">
The lived experience behind the platform — told straight, in the founder's own words.
          </p>
        </motion.div>

        {/* Executive Copy Strip */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-zinc-800/80 mb-16" id="genesis-executive">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 shrink-0">
              <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
                Founding Story
              </span>
              <h2 className="text-white font-bold text-xl uppercase tracking-wider">
                Built by Experience
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-zinc-300 font-light text-sm leading-relaxed">
                Virtuabled is not an abstract software project. It was forged out of the lived experience of our founder, Eugene Hefer. After a car accident at 19 broke his back, Eugene experienced firsthand the gap between high-level capability and a corporate world that wasn't built for his body. He climbed out through a Virgin Active learnership — opening the club at Table Bay Mall — then spent twelve years building recruitment systems and remote teams in tech. We built this platform because we lived the problem, and engineered the solution.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Chronological Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16 h-full">
          
          {/* Interactive Timeline Track on Left */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FF9F1C] uppercase flex items-center gap-1.5">
                  <Clock size={12} /> Timeline Tracker
                </span>
                <span className="text-[10px] bg-brand-amber/10 text-brand-amber font-mono border border-brand-amber/20 px-2 py-0.5 rounded">
                  Chronological Record
                </span>
              </div>

              <div className="space-y-6 relative pl-6 border-l border-zinc-850">
                {MILESTONES.map((mile, mIdx) => {
                  const isActive = mIdx === activeStep;
                  return (
                    <motion.button
                      key={mile.year}
                      type="button"
                      onClick={() => setActiveStep(mIdx)}
                      initial={{ opacity: 0, x: mIdx % 2 === 0 ? -24 : 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: mIdx * 0.12, duration: 0.4 }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 outline-none relative flex gap-4 ${
                        isActive 
                          ? "bg-brand-amber/10 border-brand-amber text-white shadow-lg" 
                          : "bg-zinc-950/40 border-zinc-850 text-zinc-405 hover:border-zinc-700 hover:bg-zinc-900/30"
                      }`}
                      id={`genesis-step-${mile.year}`}
                    >
                      {/* Circle dot marker */}
                      <span className={`absolute -left-[31px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors ${
                        isActive ? "bg-brand-amber border-slate-950" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                      }`} />
                      
                      <div className="font-mono text-xs font-bold text-brand-amber mt-0.5">{mile.year}</div>
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-wider text-white">{mile.title}</h4>
                        <p className="text-[11px] text-zinc-450 mt-1 font-light leading-relaxed">{mile.desc.slice(0, 80)}...</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-zinc-405 font-light">
              <p>
                * CLICK ON TIMELINE BLOCKS TO EXPAND AND REVIEW CORRESPONDING VERIFIED MILESTONES
              </p>
            </div>
          </div>

          {/* Active Detail Display Panel with Virgin Active Lightbox Launch Trigger on Right */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 flex flex-col justify-between relative overflow-hidden text-left">
            
            {/* Background glowing light */}
            <div className="absolute inset-0 bg-[#FF9F1C]/[0.01] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-brand-amber uppercase tracking-widest px-2.5 py-1 bg-brand-amber/10 border border-brand-amber/20 rounded-md inline-block">
                    Chapter — {MILESTONES[activeStep].year}
                  </span>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider font-display">
                    {MILESTONES[activeStep].title}
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm font-light leading-relaxed">
                  {MILESTONES[activeStep].desc}
                </p>

                {/* Founder photo — shown on the Virgin Active milestone */}
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-2xl overflow-hidden border border-zinc-800/60 mt-2"
                  >
                    <img
                      src="/images/eugene-virgin-active.jpg"
                      alt="Eugene Hefer at Virgin Active Table Bay Mall"
                      className="w-full object-cover object-top max-h-52"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <p className="absolute bottom-3 left-4 text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
                      Virgin Active · Table Bay Mall
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Launch Documentary button */}
            <div className="mt-8 pt-6 border-t border-zinc-850 space-y-4">
              <span className="text-[9px] font-mono text-zinc-550 uppercase block">
                STATUTORY VERIFICATION RESOURCES
              </span>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="w-full py-4 bg-brand-teal hover:bg-teal-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 select-none"
                id="doc-launch-btn"
              >
                <Play size={14} fill="currentColor" /> Watch the Virgin Active story
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
