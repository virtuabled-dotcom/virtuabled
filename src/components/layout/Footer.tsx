import React, { useState } from 'react';
import { Mail, Send, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Email required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Invalid email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#060B13] border-t border-slate-900 py-20 px-6 lg:px-12 relative z-20 text-slate-350">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06] mb-12">
        
        {/* Column 1: The Brand */}
        <div className="lg:col-span-3 space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Transparent SVG Logo icon with subtle backdrop-blur and glassmorphic frame */}
            <span className="relative w-11 h-11 p-1.5 rounded-xl bg-white/[0.03] backdrop-blur-[4px] border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.15)] group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-300 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footer-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                  <radialGradient id="footer-sun-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="40%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </radialGradient>
                  <filter id="footer-glow-filter" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Silhouette - clean vector representation of human profile matching image */}
                <circle cx="50" cy="40" r="14" fill="url(#footer-body-grad)" />
                <path d="M 26,76 C 26,61 36,56 50,56 C 64,56 74,61 74,76 Z" fill="url(#footer-body-grad)" />
                
                {/* Orbit Ellipse & Bodies tilted at -15 deg */}
                <g transform="translate(50, 56) rotate(-15)">
                  <ellipse cx="0" cy="0" rx="38" ry="15" stroke="#14b8a6" strokeWidth="2.5" fill="none" className="opacity-95" />
                  
                  {/* Glowing Sun (Big sphere) */}
                  <circle cx="27" cy="-10" r="7" fill="url(#footer-sun-glow)" filter="url(#footer-glow-filter)" />
                  
                  {/* Tiny Gold Dots */}
                  <circle cx="-37" cy="-2" r="3" fill="#fbbf24" />
                  <circle cx="29" cy="10" r="3" fill="#fbbf24" />
                </g>
              </svg>
            </span>
            <div>
              <span className="text-xl font-display font-light text-white tracking-widest block uppercase">
                <span className="font-semibold text-white">Virtu</span>
                <span className="text-brand-teal font-extrabold">abled</span>
              </span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase block">Where Disability Meets Opportunity</span>
            </div>
          </Link>
          <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed max-w-sm">
            Engineering the future of corporate access across South Africa. Bridging the gap between elite performance and social transformation.
          </p>
        </div>

        {/* Column 2: Solutions */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs">Solutions</h4>
          <ul className="space-y-3 text-sm font-sans font-light">
            <li><Link to="/for-employers" className="hover:text-brand-teal transition-colors">Vetted Placements</Link></li>
            <li><Link to="/for-employers" className="hover:text-brand-teal transition-colors">Turnkey Operations</Link></li>
            <li><Link to="/for-employers" className="hover:text-brand-teal transition-colors">Compliance Hub</Link></li>
            <li><Link to="/how-it-works" className="hover:text-brand-teal transition-colors">Technical Specs</Link></li>
          </ul>
        </div>

        {/* Column 3: Portals */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs">Portals</h4>
          <ul className="space-y-3 text-sm font-sans font-light">
            <li><Link to="/employer-portal" className="hover:text-brand-teal transition-colors">Employer Portal</Link></li>
            <li><Link to="/apply" className="hover:text-brand-teal transition-colors">Candidate Apply</Link></li>
            <li><Link to="/accessibility" className="hover:text-brand-teal transition-colors">Accessibility Statement</Link></li>
            <li><Link to="/privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Our Story */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs">Our Story</h4>
          <ul className="space-y-3 text-sm font-sans font-light">
            <li><Link to="/about" className="hover:text-brand-teal transition-colors">About Us</Link></li>
            <li><Link to="/genesis" className="hover:text-brand-teal transition-colors">The Genesis</Link></li>
            <li><Link to="/why-we-do-it" className="hover:text-brand-teal transition-colors">Why We Do It</Link></li>
            <li><Link to="/blog" className="hover:text-brand-teal transition-colors">Company Blog</Link></li>
          </ul>
        </div>

        {/* Column 5: Stay Connected */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs flex items-center gap-2">
            <Mail size={14} className="text-brand-teal" /> Stay Connected
          </h4>
          <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed">
            Stay matched with corporate solutions and the latest South African B-BBEE and inclusive hiring dynamics.
          </p>

          <div className="space-y-1.5 text-xs font-sans">
            <a href="mailto:hello@virtuabled.com?subject=Enquiry" className="flex items-center gap-2 text-zinc-300 hover:text-brand-teal transition-colors">
              <Mail size={12} className="text-brand-teal shrink-0" /> hello@virtuabled.com
              <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-wider">CVs &amp; enquiries</span>
            </a>
            <a href="mailto:partners@virtuabled.com?subject=Partnership Enquiry" className="flex items-center gap-2 text-zinc-300 hover:text-brand-amber transition-colors">
              <Mail size={12} className="text-brand-amber shrink-0" /> partners@virtuabled.com
              <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-wider">NPOs &amp; business</span>
            </a>
          </div>

          <div id="newsletter-form-container">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="newsletter-input-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="space-y-2.5"
                >
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="address@domain.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="bg-black/40 border border-white/10 text-zinc-100 placeholder:text-zinc-650 rounded-xl px-4 py-3 text-xs w-full focus:outline-none focus:border-brand-teal/50 transition-colors font-mono"
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-amber-500 font-mono text-[9px] uppercase tracking-wider font-bold">
                      {errorMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-amber-500 text-slate-950 uppercase font-mono tracking-widest text-[10px] font-bold py-3 px-4 rounded-xl hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Send size={11} /> Stay Connected
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="newsletter-success-alert"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-brand-teal/5 border border-brand-teal/25 p-4 rounded-xl"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal inline-block animate-ping mr-2" />
                  <span className="font-mono text-[10px] text-brand-teal font-bold uppercase tracking-wider">
                    Indexed Successfully
                  </span>
                  <p className="text-[10px] text-zinc-405 leading-relaxed font-sans font-light mt-1">
                    Your details are verified. Welcome to our elite network.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-8 font-mono">
          <span>Enterprise Secure Ecosystem</span>
          <span>&middot;</span>
          <a href="mailto:hello@virtuabled.com" className="hover:text-white transition-colors">Contact Support</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/company/virtuabled" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-teal transition-colors" title="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="https://www.facebook.com/virtuabled" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-teal transition-colors" title="Facebook">
            <Facebook size={16} />
          </a>
          <a href="https://www.instagram.com/virtuabled" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-teal transition-colors" title="Instagram">
            <Instagram size={16} />
          </a>
        </div>

        <p className="text-center md:text-right font-mono text-[10px] uppercase tracking-widest font-bold">
          Virtuabled Pty Ltd &copy; {new Date().getFullYear()} &middot; Enterprise Workspace Solutions.
        </p>
      </div>
    </footer>
  );
}
