import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, Award, Users, Shield, Cpu, Calculator, 
  Eye, EyeOff, Building2, BrainCircuit, Sparkles, TrendingUp, 
  ArrowRight, ExternalLink, HelpCircle, GraduationCap, Scale,
  HeartHandshake
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PredictiveMatcherDrawer } from "@/components/shared/PredictiveMatcherDrawer";

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveSub, setMobileActiveSub] = useState<string | null>(null);
  const [isHighContrast, setIsHighContrast] = useState(() => {
    return localStorage.getItem("high-contrast") === "true";
  });
  const [isMatcherOpen, setIsMatcherOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLDivElement>(null);

  // High contrast handler
  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add("high-contrast");
      localStorage.setItem("high-contrast", "true");
    } else {
      document.documentElement.classList.remove("high-contrast");
      localStorage.setItem("high-contrast", "false");
    }
  }, [isHighContrast]);

  const toggleHighContrast = () => setIsHighContrast(!isHighContrast);

  // Close menus when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileActiveSub(null);
  }, [location.pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation support: Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeDropdown = () => setActiveDropdown(null);

  return (
    <header 
      ref={navbarRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300",
        "bg-[#070D19]/90 border-b border-white/[0.04] shadow-[0_10px_30px_rgba(3,7,18,0.4)] backdrop-blur-md",
        "hover:bg-[#091223]/95"
      )}
      id="main-app-header"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand/Logo - Premium Contrast Lockup */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/50 rounded-xl p-1"
          onClick={() => {
            setIsMobileMenuOpen(false);
            closeDropdown();
          }}
          id="nav-logo-lockup"
          aria-label="Virtuabled home"
        >
          {/* Glassmorphic Brand Icon — VA Ligature */}
          <span className="relative w-11 h-11 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-300 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* VA Ligature Mark (Recommended redesign) */}
              {/* Left V and right A strokes in teal */}
              <path d="M14 26 L36 74 L58 26 L80 74" stroke="#18B0AD" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Orange crossbar (the live connection) */}
              <path d="M44 56 L72 56" stroke="#F79532" strokeWidth="11" strokeLinecap="round"/>
              {/* Orange spark at apex (the payoff moment) */}
              <circle cx="58" cy="24" r="7.5" fill="#F79532"/>
            </svg>
          </span>

          <span className="flex flex-col items-start justify-center">
            <span className="text-lg md:text-xl font-display font-light text-white uppercase tracking-tight leading-none block">
              <span className="font-semibold text-white">Virtu</span>
              <span className="text-brand-teal font-black select-none">abled</span>
            </span>
            <span className="text-[7.5px] md:text-[8px] font-mono leading-none font-bold uppercase tracking-[0.24em] text-zinc-400 group-hover:text-brand-teal transition-colors pt-1 select-none">
              Where Disability Meets Opportunity
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Link Cluster with Sophisticated Mega Menu */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4" aria-label="Main Navigation">
          
          {/* Menu Option 1: SOLUTIONS [Advanced Mega Menu Column Structure] */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              id="desktop-menu-solutions"
              aria-expanded={activeDropdown === "solutions"}
              aria-haspopup="true"
              aria-controls="solutions-mega-grid"
              className={cn(
                "flex items-center gap-1.5 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors h-20 outline-none cursor-pointer border-b-2 border-transparent focus:text-brand-teal focus:border-brand-teal",
                (activeDropdown === "solutions" || location.pathname.startsWith("/solutions")) 
                  ? "text-brand-teal border-brand-teal" 
                  : "text-zinc-300 hover:text-white"
              )}
            >
              Solutions
              <ChevronDown size={12} className={cn("transition-transform duration-200", activeDropdown === "solutions" && "rotate-180")} />
            </button>

            <AnimatePresence>
              {activeDropdown === "solutions" && (
                <motion.div 
                  id="solutions-mega-grid"
                  role="menu"
                  aria-labelledby="desktop-menu-solutions"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-[45%] xl:-translate-x-1/2 top-20 w-[min(90vw,1200px)] bg-[#0A101D] border border-white/[0.06] shadow-[0_30px_70px_rgba(0,0,0,0.9)] rounded-3xl p-8 grid grid-cols-4 gap-8 backdrop-blur-xl z-[60] text-left"
                >
                  {/* Category Column 1: Interactive Engines */}
                  <div className="space-y-4 p-3 rounded-3xl border border-transparent hover:border-white/[0.03] hover:bg-white/[0.01] transition-all duration-300 ease-in-out group/col1" role="presentation">
                    <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#14b8a6] border-b border-[#14b8a6]/20 pb-1.5 block uppercase transition-all duration-300 ease-in-out group-hover/col1:border-[#14b8a6] group-hover/col1:text-brand-teal group-hover/col1:pl-1">
                      Interactive Engines
                    </span>
                    <div className="space-y-2">
                      <Link
                        to="/solutions/predictive-matcher"
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none focus:ring-1 focus:ring-[#14b8a6]/50"
                      >
                        <div className="p-2 bg-[#14b8a6]/10 text-brand-teal rounded-xl border border-[#14b8a6]/20 group-hover/item:scale-105 group-hover/col1:bg-[#14b8a6]/20 transition-all duration-300 ease-in-out shrink-0">
                          <BrainCircuit size={16} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ease-in-out group-hover/item:text-brand-teal">
                            Predictive Matcher <Sparkles size={11} className="text-brand-amber animate-pulse" />
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 group-hover/item:text-zinc-300 transition-all duration-300 ease-in-out leading-relaxed">
                            AI-powered candidate-to-role matching in under 7 minutes. CV in, shortlist out.
                          </p>
                        </div>
                      </Link>

                      <Link 
                        to="/solutions/eea-esg-dashboard" 
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none focus:ring-1 focus:ring-[#14b8a6]/50"
                      >
                        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 group-hover/item:scale-105 group-hover/col1:bg-indigo-500/20 transition-all duration-300 ease-in-out shrink-0">
                          <Calculator size={16} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-indigo-400">EEA ESG Dashboard</h4>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 group-hover/item:text-zinc-300 transition-all duration-300 ease-in-out leading-relaxed">
                            Check compliance ratios, calculate demographics, and safeguard against penalties.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Category Column 2: Inclusive Workforce staffing options */}
                  <div className="space-y-4 p-3 rounded-3xl border border-transparent hover:border-white/[0.03] hover:bg-white/[0.01] transition-all duration-300 ease-in-out group/col2" role="presentation">
                    <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#818cf8] border-b border-[#818cf8]/20 pb-1.5 block uppercase transition-all duration-300 ease-in-out group-hover/col2:border-[#818cf8] group-hover/col2:text-indigo-400 group-hover/col2:pl-1">
                      Workforce Placements
                    </span>
                    <div className="space-y-2">
                      <Link 
                        to="/solutions/vetted-placements" 
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none focus:ring-1 focus:ring-[#818cf8]/50"
                      >
                        <div className="p-2 bg-zinc-800/50 text-zinc-300 rounded-xl border border-white/5 group-hover/item:scale-105 group-hover/col2:bg-zinc-800/80 transition-all duration-300 ease-in-out shrink-0">
                          <Users size={16} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-[#818cf8]">Vetted Placements</h4>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 group-hover/item:text-zinc-300 transition-all duration-300 ease-in-out leading-relaxed">
                            Qualified professionals with disabilities, fully vetted and ready to place.
                          </p>
                        </div>
                      </Link>

                      <Link 
                        to="/solutions/turnkey-operations" 
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none focus:ring-1 focus:ring-[#818cf8]/50"
                      >
                        <div className="p-2 bg-zinc-800/50 text-zinc-300 rounded-xl border border-white/5 group-hover/item:scale-105 group-hover/col2:bg-zinc-800/80 transition-all duration-300 ease-in-out shrink-0">
                          <Cpu size={16} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-[#818cf8]">Turnkey Operations</h4>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 group-hover/item:text-zinc-300 transition-all duration-300 ease-in-out leading-relaxed">
                            Fully managed remote workspace: hardware, connectivity, and team onboarding.
                          </p>
                        </div>
                      </Link>

                      <Link 
                        to="/solutions/the-pipeline" 
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none focus:ring-1 focus:ring-[#818cf8]/50"
                      >
                        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 group-hover/item:scale-105 group-hover/col2:bg-indigo-300/20 transition-all duration-300 ease-in-out shrink-0">
                          <TrendingUp size={16} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-indigo-450">The Pipeline</h4>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 group-hover/item:text-zinc-300 transition-all duration-300 ease-in-out leading-relaxed">
                            Direct sourcing across South Africa's regional vocational and rehabilitation networks.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Category Column 3: Enterprise Compliance */}
                  <div className="space-y-4 p-3 rounded-3xl border border-transparent hover:border-white/[0.03] hover:bg-white/[0.01] transition-all duration-300 ease-in-out group/col3" role="presentation">
                    <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#fb923c] border-b border-[#fb923c]/20 pb-1.5 block uppercase transition-all duration-300 ease-in-out group-hover/col3:border-[#fb923c] group-hover/col3:text-[#fb923c] group-hover/col3:pl-1">
                      Enterprise Compliance
                    </span>
                    <div className="space-y-2">
                      <Link
                        to="/solutions/compliance-hub"
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none focus:ring-1 focus:ring-[#fb923c]/50"
                      >
                        <div className="p-2 bg-[#14b8a6]/10 text-brand-teal rounded-xl border border-[#14b8a6]/20 group-hover/item:scale-105 group-hover/col3:bg-[#14b8a6]/20 transition-all duration-300 ease-in-out shrink-0">
                          <Calculator size={16} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-brand-teal">Compliance Hub</h4>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 group-hover/item:text-zinc-300 transition-all duration-300 ease-in-out leading-relaxed">
                            Track EEA deadlines, workforce reports, and demographic milestones.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/bbbee-ee-targets"
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none focus:ring-1 focus:ring-[#fb923c]/50"
                      >
                        <div className="p-2 bg-orange-500/10 text-brand-amber rounded-xl border border-orange-500/20 group-hover/item:scale-105 group-hover/col3:bg-orange-500/20 transition-all duration-300 ease-in-out shrink-0">
                          <Shield size={16} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-brand-amber">B-BBEE Scorecard</h4>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 group-hover/item:text-zinc-300 transition-all duration-300 ease-in-out leading-relaxed">
                            Calculate your disability weighting toward the 3% EEA target.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/eea-compliance-guide"
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none focus:ring-1 focus:ring-[#fb923c]/50"
                      >
                        <div className="p-2 bg-teal-500/10 text-brand-teal rounded-xl border border-teal-500/20 group-hover/item:scale-105 group-hover/col3:bg-teal-500/20 transition-all duration-300 ease-in-out shrink-0">
                          <Scale size={16} />
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-brand-teal">EEA Compliance Guide</h4>
                          <p className="text-[11px] text-zinc-400 font-light mt-1.5 group-hover/item:text-zinc-300 transition-all duration-300 ease-in-out leading-relaxed">
                            EEA2 and EEA4 reporting: obligations, timelines, and penalties.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Category Column 4: Workplace & Development */}
                  <div className="flex flex-col gap-3 group/col4 transition-all duration-300 ease-in-out" role="presentation">
                    <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03] relative overflow-hidden transition-all duration-300 ease-in-out">
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none group-hover/col4:bg-brand-amber/20 transition-all duration-300 ease-in-out" />
                      <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-[0.2em] block uppercase mb-2 group-hover/col4:text-brand-amber transition-all duration-300 ease-in-out">
                        Workplace
                      </span>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wide">
                        Every Barrier Removed
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-light mt-2 group-hover/col4:text-zinc-300 transition-all duration-300 ease-in-out">
                        From the physical audit to day one — access, accommodation, and retention handled end-to-end.
                      </p>
                      <div className="pt-3 border-t border-white/[0.04] mt-3">
                        <Link
                          to="/genesis"
                          onClick={closeDropdown}
                          role="menuitem"
                          className="flex items-center justify-between text-[10px] font-mono text-brand-teal hover:text-white transition-all duration-300 ease-in-out uppercase font-bold group/link"
                        >
                          <span>Read the founder's story</span>
                          <ArrowRight size={12} className="transform group-hover/link:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/solutions/facility-audits"
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none"
                      >
                        <div className="p-1.5 bg-zinc-800/50 text-zinc-300 rounded-lg border border-white/5 shrink-0 group-hover/item:scale-105 transition-all duration-300 ease-in-out">
                          <Building2 size={14} />
                        </div>
                        <div>
                          <h4 className="text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-zinc-300">Facility Audits</h4>
                          <p className="text-[10px] text-zinc-500 font-light mt-0.5">Ramps, workstations, and emergency routes assessed.</p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/skills-development"
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none"
                      >
                        <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20 shrink-0 group-hover/item:scale-105 transition-all duration-300 ease-in-out">
                          <GraduationCap size={14} />
                        </div>
                        <div>
                          <h4 className="text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-indigo-400">Skills Development</h4>
                          <p className="text-[10px] text-zinc-500 font-light mt-0.5">SDL spend aligned to disability inclusion targets.</p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/reasonable-accommodation"
                        onClick={closeDropdown}
                        role="menuitem"
                        className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 ease-in-out group/item focus:outline-none"
                      >
                        <div className="p-1.5 bg-amber-500/10 text-brand-amber rounded-lg border border-amber-500/20 shrink-0 group-hover/item:scale-105 transition-all duration-300 ease-in-out">
                          <HeartHandshake size={14} />
                        </div>
                        <div>
                          <h4 className="text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ease-in-out group-hover/item:text-brand-amber">Reasonable Accommodations</h4>
                          <p className="text-[10px] text-zinc-500 font-light mt-0.5">S.A. Code of Good Practice, applied.</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu Option 2: OUR STORY [Dropdown Layout] */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("story")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              id="desktop-menu-story"
              aria-expanded={activeDropdown === "story"}
              aria-haspopup="true"
              aria-controls="story-dropdown"
              className={cn(
                "flex items-center gap-1.5 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors h-20 outline-none cursor-pointer border-b-2 border-transparent focus:text-brand-teal focus:border-brand-teal",
                activeDropdown === "story" ? "text-brand-teal border-brand-teal" : "text-zinc-300 hover:text-white"
              )}
            >
              Our Story
              <ChevronDown size={12} className={cn("transition-transform duration-200", activeDropdown === "story" && "rotate-180")} />
            </button>

            <AnimatePresence>
              {activeDropdown === "story" && (
                <motion.div 
                  id="story-dropdown"
                  role="menu"
                  aria-labelledby="desktop-menu-story"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-[2px] w-80 bg-[#0A101D] border border-white/[0.06] shadow-2xl rounded-2xl p-4 space-y-1 backdrop-blur-md z-[60] text-left"
                >
                  <Link 
                    to="/about" 
                    onClick={closeDropdown}
                    role="menuitem"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all group focus:outline-none"
                  >
                    <Users size={16} className="text-brand-teal mt-0.5" />
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wide">About Us</h4>
                      <p className="text-[10px] text-zinc-400 font-light mt-1 group-hover:text-zinc-300">How Virtuabled works and the founder behind it.</p>
                    </div>
                  </Link>

                  <Link 
                    to="/genesis" 
                    onClick={closeDropdown}
                    role="menuitem"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all group focus:outline-none"
                  >
                    <Award size={16} className="text-brand-amber mt-0.5" />
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wide">Our Origin Story</h4>
                      <p className="text-[10px] text-zinc-400 font-light mt-1 group-hover:text-zinc-300">Eugene Hefer's lived experience, and why Virtuabled exists today.</p>
                    </div>
                  </Link>

                  <Link 
                    to="/why-we-do-it" 
                    onClick={closeDropdown}
                    role="menuitem"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all group focus:outline-none"
                  >
                    <Shield size={16} className="text-brand-teal mt-0.5" />
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wide">Why We Do It</h4>
                      <p className="text-[10px] text-zinc-400 font-light mt-1 group-hover:text-zinc-300">Eradicating corporate compliance hurdles and workplace isolation.</p>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu Option 3: PORTAL ACCESS [Dropdown Layout] */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("portal")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              id="desktop-menu-portal"
              aria-expanded={activeDropdown === "portal"}
              aria-haspopup="true"
              aria-controls="portal-dropdown"
              className={cn(
                "flex items-center gap-1.5 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors h-20 outline-none cursor-pointer border-b-2 border-transparent focus:text-brand-teal focus:border-brand-teal",
                activeDropdown === "portal" ? "text-brand-teal border-brand-teal" : "text-zinc-300 hover:text-white"
              )}
            >
              Portal Access
              <ChevronDown size={12} className={cn("transition-transform duration-200", activeDropdown === "portal" && "rotate-180")} />
            </button>

            <AnimatePresence>
              {activeDropdown === "portal" && (
                <motion.div 
                  id="portal-dropdown"
                  role="menu"
                  aria-labelledby="desktop-menu-portal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-[2px] w-72 bg-[#0A101D] border border-white/[0.06] shadow-2xl rounded-2xl p-4 space-y-1.5 backdrop-blur-md z-[60] text-left"
                >
                  <Link 
                    to="/apply" 
                    onClick={closeDropdown}
                    role="menuitem"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all group focus:outline-none"
                  >
                    <Users size={16} className="text-[#14b8a6] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wide">Candidate Channel</h4>
                      <p className="text-[10px] text-zinc-400 font-light mt-1 group-hover:text-zinc-300">Submit resumes, access skills modules, and view open pools.</p>
                    </div>
                  </Link>

                  <Link 
                    to="/employer-portal" 
                    onClick={closeDropdown}
                    role="menuitem"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all group focus:outline-none"
                  >
                    <Building2 size={16} className="text-[#f59e0b] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wide">Employer Dashboard</h4>
                      <p className="text-[10px] text-zinc-400 font-light mt-1 group-hover:text-zinc-300">Evaluate regional candidate pipelines and active physical audits.</p>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Far Right Action Buttons (High contrast toggle & Primary CTA) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Custom Sliding Toggle Switch */}
          <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.08] rounded-full p-1 shadow-inner relative z-10" id="accessible-toggle-control-desktop">
            <button
              onClick={() => setIsHighContrast(false)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[10px] font-mono leading-none tracking-wider uppercase font-extrabold transition-all duration-300 relative select-none cursor-pointer",
                !isHighContrast ? "text-[#050C1A]" : "text-zinc-400 hover:text-white"
              )}
              aria-label="Classic Dark Mode"
            >
              {!isHighContrast && (
                <motion.span
                  layoutId="activeThemePillDesktop"
                  className="absolute inset-0 bg-brand-teal rounded-full z-0 shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 25 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <EyeOff size={11} /> Dark
              </span>
            </button>
            <button
              onClick={() => setIsHighContrast(true)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[10px] font-mono leading-none tracking-wider uppercase font-extrabold transition-all duration-300 relative select-none cursor-pointer",
                isHighContrast ? "text-black" : "text-zinc-400 hover:text-white"
              )}
              aria-label="High Contrast AAA Mode"
            >
              {isHighContrast && (
                <motion.span
                  layoutId="activeThemePillDesktop"
                  className="absolute inset-0 bg-brand-amber rounded-full z-0 shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 25 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Eye size={11} /> Contrast AAA
              </span>
            </button>
          </div>

          <Link 
            to="/for-employers"
            onClick={() => {
              setTimeout(() => {
                const el = document.getElementById("consultation");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="px-6 py-2.5 rounded-full bg-[#f59e0b] hover:bg-[#fb923c] text-[#050C1A] font-bold text-xs font-mono uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_25px_rgba(245,158,11,0.25)] border border-[#f59e0b]/50 inline-flex items-center gap-2 focus:ring-2 focus:ring-[#f59e0b]/50"
          >
            Optimize Our Compliance
          </Link>
        </div>

        {/* Responsive Drawer Toggle & High Contrast for Mobile devices */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Mobile Sliding Toggle Switch */}
          <div className="flex items-center bg-white/[0.02] border border-white/[0.08] rounded-full p-0.5 shadow-inner" id="accessible-toggle-control-mobile">
            <button
              onClick={() => setIsHighContrast(false)}
              className={cn(
                "p-1.5 rounded-full text-[9px] font-mono leading-none font-bold transition-all relative cursor-pointer",
                !isHighContrast ? "text-slate-950 bg-brand-teal" : "text-zinc-400 hover:text-white"
              )}
              aria-label="Activate Dark Mode"
              title="Dark Mode"
            >
              <EyeOff size={11} className="relative z-10" />
            </button>
            <button
              onClick={() => setIsHighContrast(true)}
              className={cn(
                "p-1.5 rounded-full text-[9px] font-mono leading-none font-bold transition-all relative cursor-pointer",
                isHighContrast ? "text-black bg-[#f59e0b]" : "text-zinc-400 hover:text-white"
              )}
              aria-label="Activate High Contrast AAA Mode"
              title="High Contrast mode"
            >
              <Eye size={11} className="relative z-10" />
            </button>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/80 hover:text-white p-2 outline-none focus:ring-2 focus:ring-teal-500/50 rounded-xl"
            aria-label="Toggle navigation drawer"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer Accordion Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden w-full bg-[#070D19] border-t border-white/[0.04] overflow-hidden backdrop-blur-2xl"
          >
            <div className="p-6 space-y-6">
              
              {/* Core site sections - Quick links with custom mobile dividers */}
              <div className="flex flex-col space-y-1">
                <Link 
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#14b8a6] text-xs font-mono font-bold uppercase tracking-widest py-2"
                >
                  Home Layout
                </Link>
              </div>

              {/* solutions section - Accordion layout */}
              <div className="space-y-2">
                <button 
                  onClick={() => setMobileActiveSub(mobileActiveSub === "solutions" ? null : "solutions")}
                  aria-expanded={mobileActiveSub === "solutions"}
                  className="w-full flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 py-3 border-b border-white/[0.04]"
                >
                  <span>Solutions Suite</span>
                  <ChevronDown size={14} className={cn("transition-transform duration-200", mobileActiveSub === "solutions" && "rotate-180")} />
                </button>
                
                {mobileActiveSub === "solutions" && (
                  <div className="pl-4 space-y-5 pt-2 pb-2">
                    
                    {/* Subcategory 1 */}
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#14b8a6] tracking-[0.2em] block uppercase mb-2">Interactive Engines</span>
                      <div className="space-y-2 border-l border-[#14b8a6]/20 pl-3">
                        <Link 
                          to="/solutions/predictive-matcher"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          Predictive Matcher
                        </Link>
                        <Link 
                          to="/solutions/eea-esg-dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          EEA ESG Dashboard
                        </Link>
                      </div>
                    </div>

                    {/* Subcategory 2 */}
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#818cf8] tracking-[0.2em] block uppercase mb-2">Workforce Placements</span>
                      <div className="space-y-2 border-l border-[#818cf8]/20 pl-3">
                        <Link 
                          to="/solutions/vetted-placements" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          Vetted Placements
                        </Link>
                        <Link 
                          to="/solutions/turnkey-operations" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          Turnkey Operations
                        </Link>
                        <Link 
                          to="/solutions/the-pipeline"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          The Pipeline
                        </Link>
                      </div>
                    </div>

                    {/* Subcategory 3 */}
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#fb923c] tracking-[0.2em] block uppercase mb-2">Enterprise Compliance</span>
                      <div className="space-y-2 border-l border-[#fb923c]/20 pl-3">
                        <Link 
                          to="/solutions/compliance-hub" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          Compliance Hub
                        </Link>
                        <Link 
                          to="/solutions/bbbee-ee-targets" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          B-BBEE Scorecard targets
                        </Link>
                        <Link 
                          to="/solutions/facility-audits" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          Facility Audits
                        </Link>
                        <Link 
                          to="/solutions/eea-compliance-guide" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          EEA Compliance Guide
                        </Link>
                        <Link 
                          to="/solutions/skills-development" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          Skills Development
                        </Link>
                        <Link 
                          to="/solutions/reasonable-accommodation" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-zinc-400 text-xs hover:text-white py-1"
                        >
                          Reasonable Accommodations
                        </Link>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* story section - Accordion layout */}
              <div className="space-y-2">
                <button 
                  onClick={() => setMobileActiveSub(mobileActiveSub === "story" ? null : "story")}
                  aria-expanded={mobileActiveSub === "story"}
                  className="w-full flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 py-3 border-b border-white/[0.04]"
                >
                  <span>Our Story</span>
                  <ChevronDown size={14} className={cn("transition-transform duration-200", mobileActiveSub === "story" && "rotate-180")} />
                </button>
                
                {mobileActiveSub === "story" && (
                  <div className="pl-4 space-y-3 pt-2 pb-2 border-l border-white/5 ml-1">
                    <Link 
                      to="/about" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-zinc-400 text-xs hover:text-white py-1"
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/genesis" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-zinc-400 text-xs hover:text-white py-1"
                    >
                      Our Genesis Story
                    </Link>
                    <Link 
                      to="/why-we-do-it" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-zinc-400 text-xs hover:text-white py-1"
                    >
                      Why We Do It
                    </Link>
                  </div>
                )}
              </div>

              {/* portal section - Accordion layout */}
              <div className="space-y-2">
                <button 
                  onClick={() => setMobileActiveSub(mobileActiveSub === "portal" ? null : "portal")}
                  aria-expanded={mobileActiveSub === "portal"}
                  className="w-full flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 py-3 border-b border-white/[0.04]"
                >
                  <span>Portal Access</span>
                  <ChevronDown size={14} className={cn("transition-transform duration-200", mobileActiveSub === "portal" && "rotate-180")} />
                </button>
                
                {mobileActiveSub === "portal" && (
                  <div className="pl-4 space-y-3 pt-2 pb-2 border-l border-white/5 ml-1">
                    <Link 
                      to="/apply" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-zinc-400 text-xs hover:text-white py-1"
                    >
                      Candidate Portal
                    </Link>
                    <Link 
                      to="/employer-portal" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-zinc-400 text-xs hover:text-white py-1"
                    >
                      Employer Portal
                    </Link>
                  </div>
                )}
              </div>

              {/* Primary Call to Action buttons on mobile devices */}
              <div className="pt-6 flex flex-col gap-3">
                <Link 
                  to="/for-employers"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById("consultation");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }}
                  className="w-full text-center py-3 rounded-full bg-[#f59e0b] text-[#050C1A] font-bold text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-[0_4px_12px_rgba(245,158,11,0.2)]"
                >
                  Optimize Our Compliance
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legacy predictive matching slider drawer */}
      <PredictiveMatcherDrawer isOpen={isMatcherOpen} onClose={() => setIsMatcherOpen(false)} />
    </header>
  );
}
