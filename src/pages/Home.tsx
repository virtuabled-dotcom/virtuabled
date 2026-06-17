import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BarChart3, Building2, Users, ChevronLeft, ChevronRight, Quote, FileText, Cpu, Send, HeartHandshake, Sparkles, Award, X, Briefcase, GraduationCap, CheckCircle2, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { TiltCard } from "@/components/shared/TiltCard";
import { HeroVideo } from "@/components/shared/HeroVideo";

// Full-bleed cinematic brand section — the North Star statement over a rendered loop.
function BrandDoorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section ref={ref} className="relative h-[80vh] min-h-[520px] overflow-hidden bg-black flex items-center justify-center">
      {/* Parallax video layer */}
      <motion.div style={{ y }} className="absolute inset-0 -top-[8%] h-[116%]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-workspace.jpeg"
          className="w-full h-full object-cover"
        >
          <source src="/assets/brand-door.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic gradient scrims for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* Statement */}
      <motion.div style={{ y: textY }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white uppercase font-mono tracking-[0.25em] text-[10px] font-bold inline-block mb-6 backdrop-blur-sm">
          The Movement
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-white leading-[1.05] tracking-tight">
          Same person. More walls.<br />
          <span className="font-semibold italic text-brand-teal font-sans">We remove them.</span>
        </h2>
        <p className="mt-8 text-base md:text-lg text-zinc-200 font-light leading-relaxed max-w-2xl mx-auto font-sans">
          The only real difference between an able-bodied person and a disabled person is that the able-bodied person has more options available to them. We exist to close that gap.
        </p>
        <div className="mt-10">
          <Link
            to="/why-we-do-it"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/95 hover:bg-white text-slate-950 font-mono font-bold uppercase text-xs tracking-widest transition-all shadow-2xl"
          >
            Why We Built This <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    id: 1,
    type: "candidate",
    quote: "I spent 18 months applying for senior data analyst roles. The rejections stopped the day Virtuabled matched my adapted screen-reader workflow directly with a bank's technical requirements. I was deployed in 4 days.",
    author: "Sarah Botha",
    role: "Senior Data Analyst",
    meta: "Placed via Vetted Placements",
    videoThumbnail: "/images/testimonial-sarah.jpeg",
    subtitles: [
      { id: 1, text: "Applying for roles can feel like an endless uphill battle." },
      { id: 2, text: "But Virtuabled mapped my custom screen-reader directly into their tech stack." },
      { id: 3, text: "I was successfully matched and on-boarded into a senior role within 4 days." }
    ]
  },
  {
    id: 2,
    type: "employer",
    quote: "Virtuabled's Turnkey Operations solved an impossible structural problem for our JHB office. We couldn't physically adapt our heritage building, but their remote inclusive infrastructure gave us compliance and an elite operational team instantly.",
    author: "Marcus van Zyl",
    role: "Chief Operating Officer",
    meta: "Tier 1 Logistics Partner",
    videoThumbnail: "/images/testimonial-marcus.jpeg",
    subtitles: [
      { id: 1, text: "We reached a legal dead-end with physical access audits." },
      { id: 2, text: "Virtuabled's remote turnkey systems bypassed our heritage site limitations completely." },
      { id: 3, text: "We achieved compliance metrics while unleashing elite professional output." }
    ]
  },
  {
    id: 3,
    type: "candidate",
    quote: "Neurodivergent accommodations aren't a 'perk', they are what allows me to architect enterprise software without burning out. This platform didn't just find me a job, it found an ecosystem built for my exact operational cadence.",
    author: "David N.",
    role: "Lead Software Architect",
    meta: "Placed via Vetted Placements",
    videoThumbnail: "/images/testimonial-david.jpeg",
    subtitles: [
      { id: 1, text: "Constant office stimulation is a massive drag on developer focus." },
      { id: 2, text: "Here, my custom soundscape overlays and silent cycles are standard." },
      { id: 3, text: "I can write clean code at my peak performance window." }
    ]
  }
];

const CAREER_PATHS = [
  {
    id: "fs-dev",
    category: "tech",
    title: "Full-Stack Software Engineer",
    skills: ["TypeScript", "React", "Node.js", "CI/CD Protocols"],
    accommodations: "Voice-activated macros, customized high-contrast screen reader layouts, custom shortcut keypads.",
    impact: "Creates robust responsive interfaces and secure server routes under rigorous enterprise SLAs.",
    icon: "Cpu"
  },
  {
    id: "data-analyst",
    category: "data",
    title: "Data Specialist & BI Analyst",
    skills: ["SQL Analytics", "Python/Pandas", "PowerBI & Excel", "Data Modeler"],
    accommodations: "Ergonomic workspace interfaces, customized screen zoom ratios, voice-to-text assists.",
    impact: "Unlocks high-value analytics insight and supports mission-critical data warehouse migrations.",
    icon: "BarChart3"
  },
  {
    id: "bpo-agent",
    category: "ops",
    title: "Operations Support Professional",
    skills: ["CRM Overlays", "SLA Monitoring", "Ticketing Systems", "Client Relations"],
    accommodations: "Real-time speech-to-text caption translations, text-to-speech assistive tools, calibrated headsets.",
    impact: "Ensures flawless multi-channel support with high CSAT, satisfying corporate service indices.",
    icon: "Users"
  },
  {
    id: "compliance-admin",
    category: "compliance",
    title: "Compliance Database Auditor",
    skills: ["B-BBEE Reporting", "ESG Audit Tools", "Labour Regulations", "Document Processing"],
    accommodations: "Focus enhancement interfaces, step-by-step document readers, customized rest cycles.",
    impact: "Tracks audit results, compiling aggregate ESG compliance reports securely.",
    icon: "FileText"
  }
];

const getPathIcon = (iconName: string) => {
  switch (iconName) {
    case "Cpu": return Cpu;
    case "BarChart3": return BarChart3;
    case "Users": return Users;
    case "FileText": return FileText;
    default: return Briefcase;
  }
};

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isCareerPathsOpen, setIsCareerPathsOpen] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("all");

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [videoVolume, setVideoVolume] = useState(80);

  useEffect(() => {
    setIsVideoPlaying(false);
    setVideoProgress(0);
  }, [currentTestimonial]);

  useEffect(() => {
    if (!isVideoPlaying) return;

    const interval = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 100) {
          setIsVideoPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  const activeSubtitle = (() => {
    const subs = TESTIMONIALS[currentTestimonial]?.subtitles || [];
    if (subs.length === 0) return "";
    if (videoProgress < 33) return subs[0].text;
    if (videoProgress < 66) return subs[1].text;
    return subs[2]?.text || subs[1]?.text || subs[0].text;
  })();

  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevTestimonial();
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      nextTestimonial();
      e.preventDefault();
    } else if (e.key === " ") {
      setIsVideoPlaying(prev => !prev);
      e.preventDefault();
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="w-full">
      
      {/* Section 1: The Premium Hero Chapter — the DNA video is the hero */}
      <section className="relative min-h-[95vh] flex flex-col justify-center pt-28 pb-20 overflow-hidden bg-[#0A0E1A]">
        {/* DNA strand video — the main hero backdrop (reduced-motion shows poster) */}
        <div className="absolute inset-0 z-0">
          <HeroVideo src="/images/hero-dna.mp4" poster="/images/hero-strand.jpg" scrim={false} className="w-full h-full" />
          {/* legibility scrims — darken the left (for copy) and the bottom */}
          <div className="absolute inset-0 bg-[#0A0E1A]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E1A] via-[#0A0E1A]/95 to-[#0A0E1A]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-[#0A0E1A]/50" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-[10px] font-bold uppercase tracking-[0.25em]"
              >
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
                <span>Real Human Stories & Real Careers</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-tight leading-[1.1] text-white"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}
              >
Same person. More walls. <span className="font-semibold italic text-brand-teal font-sans">We remove them.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base md:text-lg text-zinc-200 font-sans font-light leading-relaxed max-w-2xl"
              >
                Founded by Eugene Hefer — a paraplegic entrepreneur who lived the problem this platform solves — we help South African organizations close their 3% Employment Equity disability gap by placing qualified professionals into real, permanent roles, with onboarding and 30/60/90-day retention support. We walk with candidates and companies alike.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link 
                  to="/for-employers"
                  onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById("consultation");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold uppercase text-xs tracking-widest transition-all hover:scale-103 active:scale-97 rounded-full text-center shadow-[0_0_20px_rgba(245,158,11,0.25)] border border-amber-500"
                >
                  Partner with Us
                </Link>
                <a 
                  href="#the-network"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("the-network");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-4 border border-brand-teal text-white hover:bg-brand-teal/10 font-mono font-bold uppercase text-xs tracking-widest transition-colors rounded-full text-center"
                >
                  Explore Talent Profiles
                </a>
              </motion.div>
            </div>

            {/* Right Column: floating telemetry directly over the DNA (no box) */}
            <div className="lg:col-span-5 relative hidden lg:block min-h-[360px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0"
              >
                <div className="absolute left-0 top-6 bg-zinc-950/70 border border-white/10 rounded-xl px-3 py-1.5 font-mono text-[10px] text-zinc-300 backdrop-blur-sm">
                  <span className="text-zinc-500">Skills Match:</span> <span className="text-brand-teal font-bold">CV → role</span>
                </div>
                <div className="absolute right-0 bottom-16 bg-zinc-950/70 border border-white/10 rounded-xl px-3 py-1.5 font-mono text-[10px] text-zinc-300 backdrop-blur-sm">
                  <span className="text-zinc-500">Retention:</span> <span className="text-amber-400 font-bold">30·60·90</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 text-center pointer-events-none">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400">More walls. We remove them.</span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Translucent metrics strip across the hero bottom (replaces the boxed card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 w-full max-w-3xl bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-md px-6 py-4 flex flex-wrap items-center gap-x-10 gap-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold">Our Proven Onboarding Record</span>
              <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-bold ml-1">Optimum</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <div className="text-lg font-display text-white font-bold leading-none">2.5M+</div>
              <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1">South Africans with disabilities</div>
            </div>
            <div>
              <div className="text-lg font-display text-brand-teal font-bold leading-none">3.0% Target</div>
              <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Statutory EE target (2030)</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Credibility & Global Endorsement */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded bg-slate-200 border border-slate-350 text-slate-700 uppercase font-mono tracking-widest text-[10px] font-bold inline-block">
                Why It's Credible
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-black leading-tight tracking-tight text-slate-900">
                Built from lived experience. <span className="font-medium italic text-indigo-650">Run like operations.</span>
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-sans font-light leading-relaxed">
                Founder Eugene Hefer climbed out of homelessness through a Virgin Active learnership, opened the club at Table Bay Mall, and spent twelve years building remote teams in tech before pointing those tools at his own people. Virtuabled isn't charity or compliance theatre — it's a placement engine built by someone who was locked out and engineered the way back in.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2 text-indigo-650">
                <Award size={20} />
                <span className="font-mono font-bold tracking-widest uppercase text-[10px]">Built by lived experience</span>
              </div>
              <p className="text-xs text-slate-500 italic font-sans leading-relaxed">
                "We remove the physical, geographical, and systemic barriers in front of qualified professionals — and let capability do the rest."
              </p>
              <Link to="/genesis" className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1">
                Read the founder's story →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Live Vetted Pros Metrics Ticker Bar */}
      <section className="relative z-20 bg-zinc-950 border-y border-zinc-805 py-6 overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.05)]">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <span className="w-2 h-2 rounded-full col-span-1" />
            <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-bold">Virtuabled Workspace Matching & Active Talents</h3>
          </div>
          <span className="text-[10px] font-mono text-[#818cf8] bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded uppercase font-bold animate-pulse">
            Syncing Live Nodes
          </span>
        </div>

        <div className="flex whitespace-nowrap overflow-x-auto scrollbar-none py-2 gap-8 px-6">
          <div className="flex gap-8 items-center animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            {[
              { role: "Senior Java Architect", count: "142 Pros", acc: "Neurodivergent focus layouts", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
              { role: "Data Protection Officer", count: "89 Pros", acc: "Accessible CRM overlays", color: "border-indigo-400/30 text-indigo-300 bg-indigo-400/5" },
              { role: "AWS Solutions Engineer", count: "115 Pros", acc: "Custom screen-reader configs", color: "border-indigo-300/30 text-indigo-200 bg-indigo-300/5" },
              { role: "Senior Financial Modeler", count: "96 Pros", acc: "Sip-and-puff custom hardware", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
              { role: "B2B SaaS GTM Strategist", count: "74 Pros", acc: "Dictation-optimized interfaces", color: "border-indigo-400/30 text-indigo-300 bg-indigo-400/5" },
              { role: "Senior UX Designer", count: "128 Pros", acc: "Screen readers & high-contrast custom inputs", color: "border-indigo-300/30 text-indigo-200 bg-indigo-300/5" },
              { role: "Technical Sourcing Partner", count: "102 Pros", acc: "ASL interpretation hubs", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
              { role: "Information Security Lead", count: "83 Pros", acc: "Sensory-reduced workstation layouts", color: "border-indigo-400/30 text-indigo-300 bg-indigo-400/5" }
            ].map((metric, idx) => (
              <div key={idx} className={`inline-flex flex-col min-w-[280px] p-4.5 rounded-xl border ${metric.color} shadow-sm backdrop-blur-sm transition-all hover:scale-102`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-white">{metric.role}</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-black/40 rounded border border-white/5">{metric.count}</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-light flex items-center gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Accommodations: {metric.acc}
                </div>
              </div>
            ))}
          </div>
          {/* Duplicate loop to allow seamless marquee scrolling */}
          <div className="flex gap-8 items-center animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]" aria-hidden="true">
            {[
              { role: "Senior Java Architect", count: "142 Pros", acc: "Neurodivergent focus layouts", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
              { role: "Data Protection Officer", count: "89 Pros", acc: "Accessible CRM overlays", color: "border-indigo-400/30 text-indigo-300 bg-indigo-400/5" },
              { role: "AWS Solutions Engineer", count: "115 Pros", acc: "Custom screen-reader configs", color: "border-indigo-300/30 text-indigo-200 bg-indigo-300/5" },
              { role: "Senior Financial Modeler", count: "96 Pros", acc: "Sip-and-puff custom hardware", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
              { role: "B2B SaaS GTM Strategist", count: "74 Pros", acc: "Dictation-optimized interfaces", color: "border-indigo-400/30 text-indigo-300 bg-indigo-400/5" },
              { role: "Senior UX Designer", count: "128 Pros", acc: "Screen readers & high-contrast custom inputs", color: "border-indigo-300/30 text-indigo-200 bg-indigo-300/5" },
              { role: "Technical Sourcing Partner", count: "102 Pros", acc: "ASL interpretation hubs", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
              { role: "Information Security Lead", count: "83 Pros", acc: "Sensory-reduced workstation layouts", color: "border-indigo-400/30 text-indigo-300 bg-indigo-400/5" }
            ].map((metric, idx) => (
              <div key={`dup-${idx}`} className={`inline-flex flex-col min-w-[280px] p-4.5 rounded-xl border ${metric.color} shadow-sm backdrop-blur-sm transition-all hover:scale-102`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-white">{metric.role}</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-black/40 rounded border border-white/5">{metric.count}</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-light flex items-center gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Accommodations: {metric.acc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Mandate: The Core Philosophy (Alternating Dark Slate Background `#0F172A`) */}
      <section className="relative z-20 py-25 bg-[#0F172A] border-y border-slate-800 text-white overflow-hidden">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 uppercase font-mono tracking-widest text-[10px] font-bold inline-block">
                The Core Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-light leading-snug tracking-tight text-white mb-4">
                Believing in the Power of the <span className="font-medium italic text-indigo-400">Right Environment.</span>
              </h2>
              <p className="text-slate-300 text-lg font-light leading-relaxed font-sans">
                We believe capability is everywhere — the system is not built to find it. Our mission is to match qualified disabled professionals with employers who are ready to hire, cut the process from months to days, and stay with both sides through the first ninety days.
              </p>
              <p className="text-slate-400 text-base font-light leading-relaxed font-sans">
                No compliance theatre. Real placements. Remote or on-site.
              </p>
            </div>

            <div className="lg:col-span-4 p-8 bg-[#0a0f1d] border border-slate-800 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.2)] space-y-6 text-center lg:text-left relative">
              <div className="absolute right-4 top-4 text-indigo-400 opacity-25 font-mono text-xs font-bold">EST. 2026</div>
              <div className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 leading-none">Real</div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">Integration Assessment</div>
              <p className="text-xs text-slate-400 font-light leading-relaxed pt-2">
                "With custom-tailored remote setups, specialists with physical disabilities consistently outperform — proving that the right environment, not lowered expectations, unlocks elite talent."
              </p>
              <div className="text-[10px] font-mono text-indigo-400 font-medium uppercase tracking-[0.1em]">
                — Disability Employment Advocacy, South Africa
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section B: South Africa’s Most Exclusive Talent Pipeline (Sourcing Solution - Light Background) */}
      <section id="the-network" className="bg-[#F8FAFC] py-24 border-b border-slate-100 scroll-mt-20 text-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 uppercase font-mono tracking-widest text-[10px] font-bold inline-block mb-4">
              How We Source
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-slate-900 mb-6">
              South Africa’s Specialist <span className="font-medium italic text-indigo-600">Disability Talent Network.</span>
            </h2>
            <p className="text-slate-600 font-light text-base md:text-lg leading-relaxed font-sans">
              Placing qualified professionals with disabilities into permanent roles takes more than a job board. We work directly with South Africa’s leading vocational, rehabilitation, and disability-sector organisations to source and pre-screen the talent pool we represent:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Disability Org Card */}
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_25px_rgba(15,23,42,0.03)] hover:translate-y-[-4px] transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold font-mono text-sm mb-6 shadow-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Disability Organizations</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed font-sans">
                Active partnerships with peer-led disability organizations and advocacy networks across South Africa, giving us direct access to skilled professionals.
              </p>
            </div>

            {/* Spinal Units & Medical Card */}
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_25px_rgba(15,23,42,0.03)] hover:translate-y-[-4px] transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold font-mono text-sm mb-6 shadow-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Spinal Units & Medical</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed font-sans">
                Direct integration with spinal rehabilitation units, clinics, and occupational therapy networks to support qualified professionals transitioning back into the workforce.
              </p>
            </div>

            {/* Universities & Educational Institutes Card */}
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_25px_rgba(15,23,42,0.03)] hover:translate-y-[-4px] transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold font-mono text-sm mb-6 shadow-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Universities & Educational Institutes</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed font-sans">
                Collaborative pipelines with leading South African universities, vocational institutes, and educational disability units to engage elite, qualified talents at the start of their careers.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsCareerPathsOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold uppercase text-[11px] tracking-wider transition-all rounded-full border border-indigo-500/10 shadow-lg hover:shadow-indigo-500/10 hover:scale-103 active:scale-97 cursor-pointer"
            >
              <Briefcase size={14} />
              <span>View Career Paths</span>
            </button>
          </div>

        </div>
      </section>

      {/* Meet the Talent */}
      <section className="bg-[#070A14] py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal uppercase font-mono tracking-widest text-[10px] font-bold inline-block mb-4">
              Meet the Talent
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-white mb-4">
              Same Person. <span className="font-medium italic text-brand-teal font-sans">More Capability.</span>
            </h2>
            <p className="text-zinc-400 font-light max-w-2xl mx-auto text-sm md:text-base font-sans leading-relaxed">
              Qualified. Vetted. Ready to work. Meet the South African professionals that traditional hiring systems keep filtering out.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Sipho M.", title: "Full-Stack Engineer", img: "/images/Man_in_wheelchair_headshot_202606121934.jpeg", tag: "Technology" },
              { name: "Naledi K.", title: "Financial Analyst", img: "/images/Woman_in_white_blouse_blazer_202606121934.jpeg", tag: "Finance" },
              { name: "Thabo V.", title: "Marketing Manager", img: "/images/people/thabo-molefe.jpeg", tag: "Creative" },
              { name: "Priya N.", title: "Compliance Lead", img: "/images/Woman_in_business_casual_202606121934.jpeg", tag: "Legal" },
              { name: "Lungelo D.", title: "Civil Engineer", img: "/images/Man_on_construction_site_202606121934.jpeg", tag: "Engineering" },
              { name: "Amara S.", title: "Data Scientist", img: "/images/Black_woman_in_blazer_202606121934.jpeg", tag: "Data & BI" },
            ].map((person) => (
              <TiltCard key={person.name} max={10} className="group rounded-2xl">
                <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-brand-teal/40 transition-all duration-300">
                  <img
                    src={person.img}
                    alt={`${person.name} — ${person.title}`}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                    <div className="text-[8px] font-mono font-bold uppercase tracking-widest text-brand-teal mb-1">{person.tag}</div>
                    <div className="text-white font-bold text-sm leading-tight">{person.name}</div>
                    <div className="text-zinc-400 text-[11px] font-light font-sans mt-0.5">{person.title}</div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-brand-teal/40 text-white hover:bg-brand-teal/10 hover:border-brand-teal font-mono font-bold uppercase text-xs tracking-widest transition-all"
            >
              View Full Talent Network <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: The Solutions Matrix */}
      <section className="py-24 text-white bg-[#0A0E1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-md mb-4 inline-block">Enterprise Models</span>
            <h2 className="text-3xl md:text-5xl font-display font-light mb-4 text-white">Fulfilling Placements, <span className="font-semibold italic text-brand-teal font-sans">Real Opportunities.</span></h2>
            <p className="text-zinc-400 max-w-3xl mx-auto text-base font-light font-sans leading-relaxed">We believe in real empowerment, not compliance box-checking. Every match on our platform represents our commitment to building supportive, lasting career connections that help both the candidate and the business grow.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* TRACK 1: VETTED PLACEMENTS (TEAL ACCENT) */}
            <div className="flex flex-col justify-between p-8 md:p-12 rounded-3xl bg-[#0F1527]/75 backdrop-blur-md border-2 border-brand-teal/40 hover:border-brand-teal/80 shadow-[0_0_30px_rgba(20,184,166,0.05)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-[40px] pointer-events-none" />
              
              <div>
                <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono font-bold text-brand-teal bg-brand-teal/10 border border-brand-teal/20 rounded inline-block mb-6">
                  Option 1
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-light text-white mb-4">Vetted Placements</h3>
                <p className="text-zinc-450 text-sm font-sans font-light leading-relaxed mb-8">
                  Scale your internal capabilities permanently by tapping into a pre-screened network of qualified professionals with disabilities, drawn from a national talent pool of 2.5M+ South Africans.
                </p>
                
                {/* Feature Comparison Rows */}
                <div className="space-y-6 border-t border-white/5 pt-6 mb-10">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block mb-1">Ideal For</span>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      Corporations looking to permanently expand internal diverse teams with direct payroll integration.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block mb-1">Sourcing Pipeline</span>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      Seamless, proactive integration into our pre-screened network of qualified South African professionals with disabilities.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block mb-1">Compliance Target</span>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      Direct and measurable contribution to your specialized permanent workforce equity ratios instantly.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/services#hire" className="inline-flex items-center gap-2 text-brand-teal font-mono font-bold uppercase tracking-widest text-xs hover:text-white transition-colors pt-4 border-t border-white/5 w-full">
                  Explore Vetted Solutions <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* TRACK 2: MANAGED BPO (GLOWING AMBER ACCENT) */}
            <div className="flex flex-col justify-between p-8 md:p-12 rounded-3xl bg-[#0F1527]/75 backdrop-blur-md border-2 border-amber-500/20 hover:border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.02)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded inline-block">
                    Option 2
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-light text-white mb-4">Managed BPO</h3>
                <p className="text-zinc-450 text-sm font-sans font-light leading-relaxed mb-8">
                  Your function runs through our managed team. The candidates are Virtuabled employees — you get the output without the HR overhead. Remote or on-site. Scales monthly.
                </p>

                {/* Feature Comparison Rows */}
                <div className="space-y-6 border-t border-white/5 pt-6 mb-10">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block mb-1">Ideal For</span>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      Businesses that want the output of a specialist team without taking on employment, training, or accommodation obligations.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block mb-1">How It Works</span>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      Pre-screened Virtuabled staff placed into your function, managed day-to-day by our team. You receive SLA-backed output and a direct EE contribution.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block mb-1">Compliance Target</span>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      A measurable 3% EE audit trajectory combined with certified training claims and structured corporate mentorship.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/managed-bpo" className="inline-flex items-center gap-2 text-amber-400 font-mono font-bold uppercase tracking-widest text-xs hover:text-white transition-colors pt-4 border-t border-white/5 w-full">
                  Explore Managed BPO <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How the System Works Section (Alternating Light background `#F8FAFC`) */}
      <section className="bg-[#F8FAFC] py-24 border-b border-slate-200 text-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-brand-teal uppercase font-mono tracking-widest text-[10px] font-bold inline-block mb-4">
              Our Walkthrough
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-[#1E293B] mb-4">How We Guide <span className="italic font-medium text-brand-teal">Candidates & Employers.</span></h2>
            <p className="text-slate-600 font-light max-w-2xl mx-auto">We guide both sides — candidates through voice-assisted profiling, employers through a shortlist in days — and stay present through the first ninety days.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-150 relative z-10 group hover:border-[#14B8A6] hover:bg-white transition-all shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
              <div className="text-5xl font-display font-black text-slate-100 absolute top-4 right-6 group-hover:text-teal-50 transition-colors">01</div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-4 mt-8">Voice-Guided Onboarding</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed font-sans">
                From day one, Elmarie — our built-in, voice-enabled guide — walks candidates through their profile, CV upload, and role matching. No form is a barrier.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white border border-slate-150 relative z-10 group hover:border-[#14B8A6] hover:bg-white transition-all shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
              <div className="text-5xl font-display font-black text-slate-100 absolute top-4 right-6 group-hover:text-teal-50 transition-colors">02</div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-4 mt-8">Skills-First Matching</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed font-sans">
                We look at what a candidate can do, not what's on a standard CV. Skills are verified, roles are matched, and a shortlist reaches the employer within days — not months.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white border border-slate-150 relative z-10 group hover:border-[#14B8A6] hover:bg-white transition-all shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
              <div className="text-5xl font-display font-black text-slate-100 absolute top-4 right-6 group-hover:text-teal-50 transition-colors">03</div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-4 mt-8">Structured Professional Placement</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed font-sans">
                When businesses connect through our portal, they find deeply compatible professionals eager to contribute. We bridge structural gaps, ensuring real career growth, mutual learning, and long-term mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section (Alternating Deeper Dark/Slate Background `#0F172A` with popped brand colors) */}
      <section className="bg-zinc-950 py-24 relative overflow-hidden text-white border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-[#818cf8] font-bold tracking-widest uppercase text-xs mb-4 block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md w-max mx-auto">What Makes Us Different</span>
            <h2 className="text-3xl md:text-5xl font-display font-light mb-6 text-white">
              Transcending the Limitations of <span className="text-indigo-400 font-semibold italic">Traditional Recruitment.</span>
            </h2>
            <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed font-sans">
              Traditional Applicant Tracking Systems (ATS) and legacy agencies are structurally blind to adapted workflows, inadvertently locking out elite talent. Virtuabled replaces passive, broken filtering cycles with an active, predictive matching engine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-[#0c0c14] border border-slate-800 p-8 rounded-2xl relative group hover:border-[#818cf8]/40 transition-all shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <FileText size={22} />
              </div>
              <span className="text-xs font-mono text-[#555] mb-2 block uppercase tracking-wider">Phase I</span>
              <h3 className="text-lg font-medium text-white mb-3">Genuine Competency Review</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed font-sans">
                A candidate shares their professional story. Our accessibility specialists review and map experience, highlighting unique capabilities and identifying exact physical setup adaptations needed.
              </p>
              <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-indigo-500/40">
                <ArrowRight size={18} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0c0c14] border border-slate-800 p-8 rounded-2xl relative group hover:border-[#818cf8]/40 transition-all shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <Cpu size={22} />
              </div>
              <span className="text-xs font-mono text-[#555] mb-2 block uppercase tracking-wider">Phase II</span>
              <h3 className="text-lg font-medium text-white mb-3">Ergonomic Match Planning</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed font-sans">
                Our specialists match candidates to tailored roles, verifying that physical workspace designs, assistive hardware, and systemic team accommodations are perfectly aligned.
              </p>
              <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-indigo-500/40">
                <ArrowRight size={18} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0c0c14] border border-slate-800 p-8 rounded-2xl relative group hover:border-indigo-400/40 transition-all shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-6">
                <Sparkles size={22} />
              </div>
              <span className="text-xs font-mono text-[#555] mb-2 block uppercase tracking-wider">Phase III</span>
              <h3 className="text-lg font-medium text-white mb-3">Proactive Sourcing Advocacy</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed font-sans">
                Instead of waiting for vacant positions to be posted, our specialists reach out directly to verified corporate partners, unlocking adapted, enterprise-ready placement opportunities.
              </p>
              <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-indigo-500/40">
                <ArrowRight size={18} />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0c0c14] border border-slate-800 p-8 rounded-2xl relative group hover:border-indigo-400/40 transition-all shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-6">
                <Send size={22} />
              </div>
              <span className="text-xs font-mono text-[#555] mb-2 block uppercase tracking-wider">Phase IV</span>
              <h3 className="text-lg font-medium text-white mb-3">Seamless Workplace Readiness</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed font-sans">
                We pair candidates and employers, delivering fully customized assistive hardware kits, software scripts, and on-the-ground workstation layouts on Day 1.
              </p>
            </div>

          </div>

          {/* Core Goal & Promise */}
          <div className="mt-16 bg-gradient-to-r from-indigo-500/5 via-indigo-400/5 to-[#0b0c14] border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-inner mb-20">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <HeartHandshake className="text-indigo-400" size={32} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-display text-white mb-2">Our Absolute Covenant</h3>
              <p className="text-zinc-300 font-light text-base leading-relaxed font-sans">
                No person with a physical, sensory, or neurodivergent disability should be relegated to permanent exclusion due to physical, geographical, or systematic hiring barriers. Our platform is meticulously engineered to force the corporate world to acknowledge capability first, removing every excuse, and actively supporting every candidate who struggles to find employment.
              </p>
            </div>
          </div>

          {/* Competitor Strategic Matrix Section */}
          <div className="mt-24 border-t border-slate-800 pt-20">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-indigo-350 font-mono font-bold tracking-widest uppercase text-xs mb-4 block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md w-max mx-auto">Strategic Alignment</span>
              <h2 className="text-3xl md:text-5xl font-display font-light mb-6 text-white">
                Overcoming the <span className="text-brand-coral font-medium">Passive Barriers</span> of Traditional Models.
              </h2>
              <p className="text-zinc-400 font-light text-base leading-relaxed font-sans">
                Most pipelines treat disabled talent as a static compliance check or a fleeting accommodation project. <strong className="text-white font-medium">Virtuabled completely transforms the equation.</strong> We compare our active delivery models directly against standard, passive recruitment services.
              </p>
            </div>

            {/* Side by Side Matrix */}
            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#070912] shadow-2xl mb-12">
              <table className="w-full text-left border-collapse table-auto min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/40">
                    <th className="p-5 text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">Matching Dimension</th>
                    <th className="p-5 text-xs font-mono uppercase tracking-widest text-[#888] font-bold">Standard BPOs & Agencies</th>
                    <th className="p-5 text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">Typical Passive Job Boards</th>
                    <th className="p-5 text-xs font-mono uppercase tracking-widest text-[#14b8a6] font-bold bg-[#14b8a6]/5 border-x border-slate-800">Virtuabled Active Placement</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-zinc-300 font-light font-sans">
                  <tr className="border-b border-slate-800 hover:bg-white/[0.01] transition-colors">
                    <td className="p-5 font-semibold text-white font-mono uppercase text-indigo-400">I. Candidate Placement Mode</td>
                    <td className="p-5 text-zinc-500">
                      Passive incoming matching. Expect candidate to navigate hostile interface frameworks.
                    </td>
                    <td className="p-5 text-zinc-500">
                      Static jobs board listing. Resume directory sits dormant waiting for incoming employer clicks.
                    </td>
                    <td className="p-5 text-indigo-300 bg-indigo-500/5 border-x border-slate-800 font-semibold leading-relaxed">
                      🚀 ACTIVE OUTER HUNT: Engine automatically reads CV, models target roles, maps public feeds, and reverse-outreaches corporate hiring teams.
                    </td>
                  </tr>
                  
                  <tr className="border-b border-slate-800 hover:bg-white/[0.01] transition-colors">
                    <td className="p-5 font-semibold text-white font-mono uppercase text-indigo-400">II. Accommodation Integration</td>
                    <td className="p-5 text-zinc-500">
                      Zero. Up to the hiring company to figure out hardware, software, and physical adaptations on their own.
                    </td>
                    <td className="p-5 text-zinc-500">
                      None. Simple platform directory with no custom setups or technical workplace adjustments.
                    </td>
                    <td className="p-5 text-[#818cf8] bg-indigo-500/5 border-x border-slate-800 font-semibold leading-relaxed">
                      🎯 TURNKEY ENVIRONMENT: Custom tactile, visual, braille screen reads & voice setups matched and configured directly by Virtuabled before onboarding.
                    </td>
                  </tr>

                  <tr className="border-b border-slate-800 hover:bg-white/[0.01] transition-colors">
                    <td className="p-5 font-semibold text-white font-mono uppercase text-indigo-400">III. Sourcing & Candidate Fees</td>
                    <td className="p-5 text-zinc-500">
                      Extract high margins from candidates or charging ongoing system fees without sustainable support.
                    </td>
                    <td className="p-5 text-zinc-500">
                      No candidate charges, but heavy focus on basic enterprise job advertisement placements.
                    </td>
                    <td className="p-5 text-indigo-200 bg-indigo-500/5 border-x border-slate-800 font-semibold leading-relaxed">
                      🛡️ ZERO CANDIDATE SURCHARGES: Sourcing remains permanently free. We target multi-million BBEEE/Compliance penalties to fund inclusive workspace systems.
                    </td>
                  </tr>

                  <tr className="border-b border-slate-800 hover:bg-white/[0.01] transition-colors">
                    <td className="p-5 font-semibold text-white font-mono uppercase text-indigo-400">IV. Workplace Delivery Model</td>
                    <td className="p-5 text-zinc-500">
                      Pure on-premise assumptions. Ignores geographical and mobility physical bottlenecks entirely.
                    </td>
                    <td className="p-5 text-zinc-500">
                      General remote/onsite job posts. No engineering support for complex remote workspaces.
                    </td>
                    <td className="p-5 text-indigo-300 bg-indigo-500/5 border-x border-slate-800 font-semibold leading-relaxed">
                      💻 FULLY MANAGED BPO: Enterprise purchases business output while we manage the remote workspace hardware and client-side setup workflows.
                    </td>
                  </tr>

                  <tr className="border-b border-slate-800 hover:bg-white/[0.01] transition-colors">
                    <td className="p-5 font-semibold text-white font-mono uppercase text-indigo-400">V. Compliance Assurance</td>
                    <td className="p-5 text-zinc-500">
                      Provide standard payroll tax receipts with no systematic compliance guarantees.
                    </td>
                    <td className="p-5 text-zinc-500">
                      Simple portal posting without verification of EEOC score targets or BBEEE quotas.
                    </td>
                    <td className="p-5 text-indigo-200 bg-indigo-500/5 border-x border-slate-800 font-semibold leading-relaxed">
                      📉 STATUTORY DECLARED ASSURANCE: Real-time calculation maps candidate integration parameters against the official 3% equity target directly.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Overcoming the 10 Legacy Competitor Frameworks */}
            <h3 className="text-lg font-display text-white font-medium mb-6 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-indigo-500 rounded" /> Resolving the 10 Traditional Systemic Bottlenecks:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "1. Typical Passive Job Boards", flaw: "Passive resume directory listing boards featuring static search structures. Candidates remain hidden in flat database rows without proactive outbound integration, hunt mechanics or adaptive workstation configuration." },
                { name: "2. Legacy Call Center BPOs", flaw: "High-volume call-routing generalists enforcing restrictive physical office footprints, preventing adapted neurodivergent inclusion." },
                { name: "3. Compliance Paper Mills", flaw: "Sell static statutory certificate packets on paper without placing or training a single professional candidate." },
                { name: "4. Legacy Corporate Headhunters", flaw: "Rely strictly on traditional, non-inclusive keyword ATS parses that aggressively filter out adapted non-linear candidate resumes." },
                { name: "5. Charity Programs", flaw: "Approach placement as corporate social pity checkboxes, resulting in astronomical attrition rates and poor workforce quality." },
                { name: "6. On-Premise Sourcing Agencies", flaw: "Enforce physical in-office presence metrics, completely locking out gifted physical or mobility-restricted candidates." },
                { name: "7. Manual Accommodation Advisors", flaw: "Charge exorbitant consultation fees for manual site surveys that drag placements out for quarters while legal fines pile up." },
                { name: "8. Retainer Tokenism Firms", flaw: "Charge enterprises deep quarterly retainer fees to source solitary token hires rather than supporting continuous integration." },
                { name: "9. Non-Vetted Candidate Aggregators", flaw: "Spit mass unvetted CV folders into enterprise email queues, causing instant administrative fatigue and candidate rejections." },
                { name: "10. Bureaucratic Government Agencies", flaw: "Run decades-old physical registry catalogs lacking any algorithmic profiling or modern adaptive workforce setups." }
              ].map((comp, idx) => (
                <div key={idx} className="bg-[#05060c] border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-[#818cf8]/40 hover:scale-102 transition-all">
                  <div className="absolute top-0 right-0 p-2 text-zinc-700 font-bold font-mono text-[9px]">C-{(idx+1)}</div>
                  <h4 className="text-[#818cf8] font-bold text-xs mb-1.5 font-mono uppercase tracking-wide">{comp.name}</h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed group-hover:text-zinc-200 transition-colors font-sans">
                    {comp.flaw}
                  </p>
                  <div className="mt-4 text-[9px] font-mono font-bold text-indigo-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /> STATUS: OPTIMIZED BY VIRTUABLED PLACEMENT ENGINE
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* Section 4: Driven by Brilliance. Vetted by Performance. */}
      <section className="bg-[#F8FAFC] py-24 border-b border-slate-200 text-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Telemetry Overlays */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl border border-slate-150 group">
              <img 
                src="/images/driven-brilliance.jpeg"
                alt="South African professional at her executive workspace"
                className="w-full h-[520px] object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
              />
              {/* Dark subtle overlay for contrast */}
              <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
              
              {/* Telemetry Overlays */}
              <div className="absolute top-6 left-6 bg-brand-teal text-slate-950 font-mono text-[9px] font-bold px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(20,184,166,0.35)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                ACTIVE PERFORMANCE TRACKING
              </div>

              <div className="absolute bottom-6 right-6 bg-[#0B132B]/95 border border-white/10 text-white font-mono text-[9px] p-4 rounded-2xl shadow-2xl space-y-1.5 backdrop-blur-md max-w-[200px]">
                <div className="text-[10px] font-bold text-brand-teal border-b border-white/10 pb-1 mb-1">TELEMETRY MONITOR</div>
                <div className="flex justify-between gap-4"><span className="text-zinc-400">THROUGHPUT:</span> <span className="text-brand-teal font-bold">OPTIMUM</span></div>
                <div className="flex justify-between gap-4"><span className="text-zinc-400">LATENCY:</span> <span className="text-white font-bold">12ms</span></div>
                <div className="flex justify-between gap-4"><span className="text-zinc-400">COMPLIANCE:</span> <span className="text-brand-amber font-bold">WCAG 2.1 AA</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy Section */}
          <div className="space-y-6">
            <span className="px-3 py-1 bg-teal-50 border border-teal-200 text-brand-teal uppercase font-mono tracking-widest text-[10px] font-bold inline-block rounded">
              Performance First
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-[#1E293B] leading-[1.15]">
              Driven by Brilliance.<br/>
              <span className="text-brand-teal font-medium italic select-none font-sans">Vetted by Performance.</span>
            </h2>
            <p className="text-base text-slate-600 font-sans font-light leading-relaxed">
              Our professionals do not look for concessions; they seek an unobstructed arena to perform. By delivering tailor-made digital interfaces, specialized screen-reader layouts, and adaptive workflow frameworks, Virtuabled ensures that brilliance is the only metric that matters.
            </p>
            <div className="pt-4">
               <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E293B] hover:bg-[#0B132B] text-[#F8FAFC] font-mono uppercase tracking-wider text-xs font-bold transition-all shadow-md">
                 Read Our DNA <ArrowRight size={16} />
               </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Why We Do It (Mission Statement - Dark slate background) */}
      <section className="bg-[#0a0d14] border-y border-slate-800 py-24 relative overflow-hidden text-center text-white">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Quote size={48} className="text-[#818cf8]/25 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-display font-light mb-8 text-white leading-tight mt-4">
            Why We Do It: <br /> <span className="font-medium italic text-indigo-400">Re-engineering Corporate Access.</span>
          </h2>
          <p className="text-xl text-zinc-300 font-light leading-relaxed mb-8 font-sans">
            The narrative of disability in the corporate world is fundamentally broken. It has been framed as a charitable accommodation rather than an operational advantage. Our mission is to prove that inclusive environments don't just solve ESG and EE compliance mandates—they build fiercely loyal, highly specialized, and ruthlessly efficient teams.
          </p>
          <Link to="/about" className="text-indigo-400 font-bold uppercase text-xs font-mono tracking-widest hover:text-white transition-colors">
            Discover the Origins
          </Link>
        </div>
      </section>

      {/* Cinematic Brand Statement — rendered video loop */}
      <BrandDoorSection />

      {/* Success Stories Carousel & Video testimonials (Alternating Light background `#F8FAFC`) */}
      <section 
        className="bg-[#F8FAFC] py-24 border-b border-slate-100 text-slate-900 outline-none"
        onKeyDown={handleCarouselKeyDown}
        tabIndex={0}
        aria-label="Success Stories Carousel. Use left and right arrow keys to switch stories, and spacebar to toggle play/pause of the video testimonial."
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 uppercase font-mono tracking-widest text-[10px] font-bold inline-block mb-4">
              Multimedia Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light text-slate-900 mb-4">
              Operational <span className="italic font-medium text-indigo-600">Validation.</span>
            </h2>
            <p className="text-slate-500 font-light max-w-xl mx-auto text-sm">
              Watch real candidate videos and read testimonials from our integrated enterprise partners.
            </p>
            <div className="hidden md:flex justify-center items-center gap-1.5 text-[10px] font-mono text-slate-400 mt-2">
              <span className="px-1.5 py-0.5 bg-slate-200/60 rounded text-slate-500 font-bold border border-slate-300">Tab</span>
              <span>to focus controls</span>
              <span className="ml-2 px-1.5 py-0.5 bg-slate-200/60 rounded text-slate-500 font-bold border border-slate-300">Spacebar</span>
              <span>plays video</span>
              <span className="ml-2 px-1.5 py-0.5 bg-slate-200/60 rounded text-slate-500 font-bold border border-slate-300">← / →</span>
              <span>switches stories</span>
            </div>
          </div>

          <div className="relative bg-white/85 backdrop-blur-lg border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-[0_10px_40px_rgba(15,23,42,0.03)] overflow-hidden min-h-[460px] flex items-center">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Carousel navigation buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-3 md:left-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-500 hover:text-indigo-600 hover:scale-105 shadow-sm cursor-pointer"
              aria-label="Previous Testimonial Story"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-3 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-500 hover:text-indigo-600 hover:scale-105 shadow-sm cursor-pointer"
              aria-label="Next Testimonial Story"
            >
              <ChevronRight size={20} />
            </button>

            {/* Inner Content Grid */}
            <div className="w-full max-w-4xl mx-auto relative z-10 px-8 flex flex-col lg:flex-row items-center gap-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                >
                  {/* Visual Video Testimonial Placeholder Player */}
                  <div className="w-full lg:w-1/2 aspect-video lg:aspect-square lg:h-[300px] rounded-2xl bg-slate-900 overflow-hidden relative border border-slate-800 shadow-lg group/video">
                    {/* Thumbnail Image */}
                    <img 
                      src={TESTIMONIALS[currentTestimonial].videoThumbnail} 
                      alt={`Video preview for ${TESTIMONIALS[currentTestimonial].author}`} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${isVideoPlaying ? 'scale-102 opacity-80' : 'scale-100 opacity-90'}`}
                    />

                    {/* Dark gradient for controls readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 opacity-100 pointer-events-none" />

                    {/* Live indicator or Play prompt */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 rounded bg-slate-950/70 border border-white/10 backdrop-blur-sm">
                      <span className={`w-2 h-2 rounded-full ${isVideoPlaying ? 'bg-red-500 animate-ping' : 'bg-zinc-500'}`} />
                      <span className="text-[9px] font-mono font-bold text-white tracking-widest uppercase">
                        {isVideoPlaying ? "SIMULATED STREAM" : "STATION TESTIMONIAL"}
                      </span>
                    </div>

                    {/* Captions Display overlay */}
                    {captionsEnabled && isVideoPlaying && activeSubtitle && (
                      <div className="absolute bottom-16 left-4 right-4 text-center z-10 pointer-events-none">
                        <span className="px-3 py-1.5 bg-black/85 text-white border border-white/5 font-sans font-normal text-xs rounded shadow-lg inline-block leading-relaxed max-w-[90%]">
                          {activeSubtitle}
                        </span>
                      </div>
                    )}

                    {/* Big Intermedia Play button overlay */}
                    {!isVideoPlaying && (
                      <button 
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-indigo-650/90 border border-white/20 flex items-center justify-center text-white hover:bg-indigo-600 hover:scale-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(79,70,229,0.4)] cursor-pointer group-hover/video:bg-indigo-600 ring-2 ring-transparent focus:ring-white focus:outline-none"
                        aria-label={`Play testimonial video for ${TESTIMONIALS[currentTestimonial].author}`}
                      >
                        <Play size={26} className="ml-1" />
                      </button>
                    )}

                    {/* Bottom Custom Play Controls Dashboard */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-950/90 border-t border-white/10 flex flex-col gap-2 backdrop-blur-sm">
                      {/* Timeline bar */}
                      <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-100" 
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>

                      {/* Control buttons bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Play/Pause control */}
                          <button
                            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                            className="bg-transparent border-none text-white hover:text-indigo-400 p-1 focus:outline-none focus:text-indigo-400 transition-colors cursor-pointer"
                            aria-label={isVideoPlaying ? "Pause Video" : "Play Video"}
                          >
                            {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
                          </button>

                          {/* Time display */}
                          <span className="text-[10px] font-mono text-zinc-400 select-none">
                            {isVideoPlaying ? `0:0${Math.floor(videoProgress * 0.09)}` : "0:00"} / 0:09
                          </span>
                        </div>

                        {/* Right tools (Volume & Captions) */}
                        <div className="flex items-center gap-3">
                          {/* Volume simulator */}
                          <button
                            onClick={() => setVideoVolume(prev => prev === 0 ? 80 : 0)}
                            className="bg-transparent border-none text-white hover:text-indigo-400 p-1 focus:outline-none focus:text-indigo-400 transition-colors cursor-pointer flex items-center gap-1"
                            aria-label={videoVolume === 0 ? "Unmute sound" : "Mute sound"}
                          >
                            {videoVolume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            <span className="text-[9px] font-mono text-zinc-400 font-bold hidden sm:inline">{videoVolume}%</span>
                          </button>

                          {/* Caption toggle */}
                          <button
                            onClick={() => setCaptionsEnabled(!captionsEnabled)}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${captionsEnabled ? 'bg-indigo-650 text-white border border-indigo-500' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}
                            aria-label={captionsEnabled ? "Disable Captions" : "Enable Captions"}
                          >
                            CC {captionsEnabled ? "ON" : "OFF"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Written Copy Section */}
                  <div className="flex-1 space-y-4 text-left">
                    <Quote size={32} className="text-indigo-200 font-semibold shrink-0" />
                    
                    <p className="text-base md:text-lg font-light text-slate-800 leading-relaxed font-sans italic">
                      "{TESTIMONIALS[currentTestimonial].quote}"
                    </p>

                    <div className="pt-2 border-t border-slate-150 flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h4 className="text-md font-bold text-slate-900 mb-0.5">
                          {TESTIMONIALS[currentTestimonial].author}
                        </h4>
                        <p className="text-indigo-600 text-xs font-mono font-bold">
                          {TESTIMONIALS[currentTestimonial].role}
                        </p>
                      </div>

                      <span className="text-[10px] uppercase tracking-wider text-[#555] font-bold border border-slate-200/80 bg-slate-50 px-3 py-1 rounded-lg">
                        {TESTIMONIALS[currentTestimonial].meta}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Dashboard (Deep slate background - high-contrast pop visualizers) */}
      <section className="bg-[#0a0d14] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0c0f1a] border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient audit-scan motion layer */}
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none mix-blend-screen"
            >
              <source src="/assets/audit-scan.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0f1a] via-[#0c0f1a]/85 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 right-12 opacity-[0.03] select-none pointer-events-none">
              <BarChart3 size={300} />
            </div>

            <div className="relative z-10 w-full lg:w-2/3">
              <span className="px-3 py-1 bg-indigo-500/15 text-[#818cf8] text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-md border border-[#818cf8]/20 mb-6 inline-block">Live Benchmark</span>
              <h2 className="text-3xl md:text-4xl font-display font-light tracking-tight mb-4 text-white">Enterprise ESG Compliance Tracker</h2>
              <p className="text-zinc-400 font-light mb-10 font-sans">Visualize the gap in enterprise disability inclusion. The legal target was raised to 3% (effective 2025, running to August 2030). Current national representation sits at roughly 1.3% — the gap is the story.</p>

              <div className="space-y-8">
                {/* Tracker items */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-mono font-bold text-[#818cf8] uppercase tracking-widest">Legal Target (EE, 2025–2030)</span>
                    <span className="text-xl font-light text-[#818cf8]">3.0%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Current National Average</span>
                    <span className="text-xl font-light text-zinc-350">~1.3%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '43%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-[#cbd5e1]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-slate-800">
                 <Link to="/for-employers" className="inline-flex items-center gap-2 text-indigo-400 text-xs uppercase font-mono tracking-widest font-bold hover:text-white transition-colors">
                   Close Your Gap <ArrowRight size={16} />
                 </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* View Career Paths Modal */}
      <AnimatePresence>
        {isCareerPathsOpen && (
          <div className="fixed inset-0 z-[200] overflow-y-auto" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCareerPathsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Box wrapper to handle centering & scroll */}
            <div className="flex min-h-screen items-center justify-center p-4 md:p-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                className="relative w-full max-w-4xl bg-[#090D1A] rounded-3xl border border-white/[0.08] shadow-2xl p-6 md:p-8 overflow-hidden text-left"
              >
                {/* Background glow effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setIsCareerPathsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/5 transition-all outline-none cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Header */}
                <div className="mb-6 pr-12">
                  <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-md mb-3 inline-block">
                    Talent Network Roadmap
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-light text-white">
                    Corporate Access <span className="font-semibold italic text-brand-teal font-sans">Career Paths.</span>
                  </h3>
                  <p className="text-zinc-400 mt-2 text-sm font-light font-sans max-w-2xl leading-relaxed">
                    Explore high-value structural roles where specialized talent operates with customized, pre-adapted workspace software.
                  </p>
                </div>

                {/* Category Selector Tab Menu */}
                <div className="flex flex-wrap gap-2 pb-6 border-b border-white/[0.06] mb-6">
                  {[
                    { id: "all", label: "All Career Tracks" },
                    { id: "tech", label: "Technology" },
                    { id: "data", label: "Data & BI" },
                    { id: "ops", label: "Operations" },
                    { id: "compliance", label: "ESG & Compliance" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedSkillCategory(tab.id)}
                      className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                        selectedSkillCategory === tab.id
                          ? "bg-[#14b8a6] text-white shadow-md shadow-[#14b8a6]/15 border border-[#14b8a6]/10"
                          : "bg-white/[0.02] border border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Accessible Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {CAREER_PATHS.filter(path => selectedSkillCategory === "all" || path.category === selectedSkillCategory).map((path) => {
                      const PathIcon = getPathIcon(path.icon);
                      return (
                        <motion.div
                          layout
                          key={path.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.02] transition-colors relative group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0">
                              <PathIcon size={18} />
                            </div>
                            <div className="space-y-4 flex-1">
                              <div>
                                <h4 className="text-white text-base font-bold font-sans tracking-tight">
                                  {path.title}
                                </h4>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {path.skills.map((skill, index) => (
                                    <span key={index} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[10px] text-zinc-400 font-mono">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-3 border-t border-white/[0.04] space-y-2">
                                <div>
                                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">Custom Accommodations</span>
                                  <p className="text-xs text-zinc-400 leading-relaxed font-light mt-0.5">
                                    {path.accommodations}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-[10px] font-mono text-brand-teal font-bold uppercase tracking-wider block">Enterprise Impact</span>
                                  <p className="text-xs text-zinc-300 leading-relaxed font-normal mt-0.5">
                                    {path.impact}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Footer Section inside modal */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-zinc-500 font-light font-sans text-center sm:text-left">
                    All candidates are pre-Adapted using standard Virtuabled workstation overlays.
                  </p>
                  <Link
                    to="/apply"
                    onClick={() => setIsCareerPathsOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-mono font-bold uppercase text-[10px] tracking-widest transition-all shadow-md cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>Launch Candidate Application</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
