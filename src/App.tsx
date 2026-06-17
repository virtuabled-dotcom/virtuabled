/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, Component, ErrorInfo, ReactNode } from "react";
import { SmoothScrollProvider } from "@/providers/SmoothScroll";
import { SchemaContextProvider } from "@/utils/SchemaProvider";
import { ToastProvider } from "@/components/shared/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ElmarieWidget } from "@/components/layout/ElmarieWidget";
import { FloatingShare } from "@/components/shared/FloatingShare";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Employers from "@/pages/Employers";
import EmployerPortal from "@/pages/EmployerPortal";
import Apply from "@/pages/Apply";
import Blog from "@/pages/Blog";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Accessibility from "@/pages/Accessibility";
import WhyWeDoIt from "@/pages/WhyWeDoIt";
import Genesis from "@/pages/Genesis";
import ManagedBpo from "@/pages/ManagedBpo";
import HowItWorks from "@/pages/HowItWorks";

import PredictiveMatcherPage from "@/pages/PredictiveMatcherPage";
import EeaEsgDashboardPage from "@/pages/EeaEsgDashboardPage";
import VettedPlacements from "@/pages/VettedPlacements";
import TurnkeyOperations from "@/pages/TurnkeyOperations";
import ThePipeline from "@/pages/ThePipeline";
import ComplianceHub from "@/pages/ComplianceHub";
import BbbEeTargets from "@/pages/BbbEeTargets";
import FacilityAudits from "@/pages/FacilityAudits";
import EeaComplianceGuide from "@/pages/EeaComplianceGuide";
import SkillsDevelopment from "@/pages/SkillsDevelopment";
import ReasonableAccommodation from "@/pages/ReasonableAccommodation";

// Error Boundary to catch runtime errors with a beautiful fallback screen
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public state: State;

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 text-center text-zinc-100">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-teal via-indigo-500 to-brand-amber" />
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6 animate-fade-in">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-display font-light text-white uppercase tracking-tight">System Interrupted</h1>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                An unexpected workspace exception occurred. Don't worry, your data and portal progress are safe.
              </p>
            </div>

            {this.state.error && (
              <pre className="text-[10px] font-mono text-zinc-500 bg-black/40 p-3 rounded-lg border border-zinc-850 overflow-x-auto text-left max-h-32">
                {this.state.error.toString()}
              </pre>
            )}

            <div className="pt-2">
              <a
                href="/"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-teal text-slate-950 font-bold text-xs font-mono uppercase tracking-widest hover:bg-teal-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Return to Home Workspace
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// RouteSEOUpdater Component - Dynamically updates meta tags and page titles for accurate SEO indexation
function RouteSEOUpdater() {
  const location = useLocation();

  useEffect(() => {
    const seoData: Record<string, { title: string; description: string; keywords: string }> = {
      "/": {
        title: "Virtuabled — South Africa's Disability Talent Network | EE Compliant Placements",
        description: "Founded by Eugene Hefer, Virtuabled closes South Africa's 3% disability EE gap by placing qualified professionals with disabilities at designated employers — pre-screened talent, B-BBEE aligned, all sectors.",
        keywords: "Employment Equity Act, B-BBEE scorecard, 3% disability target, reasonable accommodation, disability talent network, qualified disabled professionals, EE compliance South Africa, disability inclusion"
      },
      "/about": {
        title: "About Virtuabled — Why We Exist | Disability Employment Movement",
        description: "Virtuabled was founded by Eugene Hefer — a paraplegic entrepreneur who lived the problem the platform solves. Read the founder's story and why this is a structural solution, not charity.",
        keywords: "Eugene Hefer, Virtuabled founder, disability employment, lived experience, EE compliance South Africa, disability talent network"
      },
      "/services": {
        title: "Compliance Services & Assistive Workstation Integration - Virtuabled",
        description: "Explore our compliance offerings: technical facility accessibility audits, customized physical/digital workstation designs, and end-to-end recruitment pipelines.",
        keywords: "workplace adapter, assistive tech integration, technical facility audits, digital accommodation designs, 3% EE compliance support"
      },
      "/for-employers": {
        title: "Enterprise Placements & B-BBEE Scorecard Optimization - Virtuabled",
        description: "Enable 3% disability target compliance and claim maximum B-BBEE Scorecard points natively. Connect with our pre-screened pipeline of elite professionals.",
        keywords: "enterprise disability hires, Skills Development Code 300, BEE points audit, learnership claims, South African corporate recruiting"
      },
      "/employer-portal": {
        title: "Employer Integration Portal - Virtuabled",
        description: "Enterprise workspace to manage active accommodated placements, review physical/digital workstation audits, and track synchronized Google Sheets compliance metrics.",
        keywords: "employer dashboard, active candidate metrics, B-BBEE points claim logs, workspace audit checklists, real-time sync"
      },
      "/blog": {
        title: "Disability Placement, Inclusion & Compliance Insights - Virtuabled",
        description: "Industry-leading guides on the South African Employment Equity Act, B-BBEE scorecard structures, reasonable accommodation standards, and remote inclusive culture.",
        keywords: "EEA compliance blogs, skills spend advice, remote hiring guides, disability employment policy"
      },
      "/apply": {
        title: "Vetted Candidate Placement Network Entrance - Virtuabled",
        description: "Are you a professional with physical disabilities looking for remote roles? Access top South African corporate careers, fully-funded workspace accommodations, and peer mentorship.",
        keywords: "disability remote jobs, tech roles, assistive layouts, remote administrative clerk, computer careers physical disabilities"
      },
      "/privacy": {
        title: "Privacy & Data Security Standards - Virtuabled",
        description: "Our commitment to POPIA compliance and corporate data security. How we protect candidate medical records, disclosure files, and enterprise network setups.",
        keywords: "POPIA compliance, candidate privacy, corporate NDAs, secure workstation infrastructure"
      },
      "/terms": {
        title: "Terms of Service Agreement - Virtuabled",
        description: "Official legal terms, operational boundaries, and licensing rules for Virtuabled services, remote desks, and enterprise networks.",
        keywords: "commercial terms, remote desks SLA, corporate service agreement"
      },
      "/accessibility": {
        title: "Standards-Based Digital Accessibility Commitment - Virtuabled",
        description: "Our ongoing dedication to WCAG 2.1 level AA specifications across all customer-facing portfolios, ensuring full screen-reader and keyboard compatibility.",
        keywords: "WCAG 2.1 AA, screen reader, keyboard navigation, a11y compliance, high contrast presets"
      },
      "/why-we-do-it": {
        title: "Why We Do It: Resolving Professional Exclusion - Virtuabled",
        description: "Bridging the representation gap for South African specialists with disabilities in high-value sectors — the only real difference is access, and access is fixable.",
        keywords: "representation gap, remote job opportunities, corporate equity, economic independence"
      },
      "/genesis": {
        title: "Our Genesis — The Founder's Story | Virtuabled",
        description: "From a car accident at 19 and three years on the streets to opening a Virgin Active club and twelve years in tech — the lived experience behind Virtuabled, in Eugene Hefer's own words.",
        keywords: "Eugene Hefer story, Virgin Active, disability entrepreneur, Virtuabled origins, lived experience"
      },
      "/managed-bpo": {
        title: "Managed Turnkey remote BPO Operations - Virtuabled",
        description: "Scale your remote contact center or back-office with fully managed, highly skilled teams utilizing proprietary adaptive workspaces.",
        keywords: "disability contact center, managed services Africa, accommodated call center, inclusive remote BPO"
      },
      "/how-it-works": {
        title: "How It Works: Overcoming Workspace Barriers - Virtuabled",
        description: "Our structured methodology: candidate discovery, digital desk customization, on-site/off-site technical audits, and POPIA-compliant integration.",
        keywords: "corporate onboarding pipeline, POPIA disclosure, workspace adapters setup"
      },
      "/solutions/predictive-matcher": {
        title: "Predictive Workspace Matcher Engine - Virtuabled",
        description: "Match specific physical adaptations to job task matrices accurately to optimize retention and comfort.",
        keywords: "predictive accommodation engine, occupational profile, desk adjustments audit"
      },
      "/solutions/eea-esg-dashboard": {
        title: "EEA ESG Compliance Dashboard - Virtuabled",
        description: "Track physical facilities compliance, workforce diversity ratio, and B-BBEE scorecard points contribution securely.",
        keywords: "ESG score reporting, BEE points dashboard, active audit metrics"
      },
      "/solutions/vetted-placements": {
        title: "Vetted Placements Talent Matrix - Virtuabled",
        description: "Pre-screened, corporate-ready South African candidates with physical disabilities prepared for high-tech roles.",
        keywords: "vetted tech candidates, administrative talent database, adaptive specialists pool"
      },
      "/solutions/turnkey-operations": {
        title: "Turnkey Offsite Managed Operations - Virtuabled",
        description: "Ready-to-deploy, fully accommodated workforce centers focusing on back-office operations and customer support.",
        keywords: "turnkey customer service, offsite inclusive BPO, managed services South Africa"
      },
      "/solutions/the-pipeline": {
        title: "The Sourcing Discovery Pipeline - Virtuabled",
        description: "How we source, pre-vett, and prepare professionals across South Africa for direct corporate inclusion.",
        keywords: "disability outreach networks, learnership readiness training, corporate talent channels"
      },
      "/solutions/compliance-hub": {
        title: "Digital Workspace Compliance Hub - Virtuabled",
        description: "Regulatory tracking systems aligning with S.A. 3% Employment Equity rules and the B-BBEE Codes.",
        keywords: "Employment Equity Act reporting, BEE tracker, compliance assurance"
      },
      "/solutions/bbbee-ee-targets": {
        title: "B-BBEE Scorecard Point Optimizer - Virtuabled",
        description: "Map and leverage up to 12 scorecard points comfortably under the Skills Development spend framework.",
        keywords: "B-BBEE Code 300 compliance, disability spend scorecard, learnsership points"
      },
      "/solutions/facility-audits": {
        title: "Technical Physical & Digital Facility Audits - Virtuabled",
        description: "Expert evaluation of corporate infrastructure to meet SANS 10400-S norms and digital accessibility guidelines.",
        keywords: "SANS 10400-S, digital accessibility compliance, WCAG audits, facility review"
      },
      "/solutions/eea-compliance-guide": {
        title: "Employment Equity Act (EEA) Disability Guide - Virtuabled",
        description: "Detailed regulatory reporting assistance for South African employers aiming to avoid compliance penalties.",
        keywords: "EEA reporting forms, Department of Labour guidelines, workforce disability targets"
      },
      "/solutions/skills-development": {
        title: "B-BBEE Code 300 Skills Spend Optimization - Virtuabled",
        description: "Strategically optimize inclusive training spend using certified remote and hybrid learnership streams.",
        keywords: "Code 300, skills development execution, BEE learnership compliance"
      },
      "/solutions/reasonable-accommodation": {
        title: "S.A. Reasonable Accommodation Code & Workspace Adapters - Virtuabled",
        description: "Full configuration guidelines for assistive computer devices, high-contrast layouts, and customized chairs.",
        keywords: "assistive equipment list, Department of Labour code, workspace accommodations South Africa"
      }
    };

    const path = location.pathname;
    const currentSeo = seoData[path] || seoData["/"];

    // Update document title
    document.title = currentSeo.title;

    // Dynamically update/create meta description tag
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', currentSeo.description);

    // Dynamically update/create meta keywords tag
    let keyMeta = document.querySelector('meta[name="keywords"]');
    if (!keyMeta) {
      keyMeta = document.createElement('meta');
      keyMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keyMeta);
    }
    keyMeta.setAttribute('content', currentSeo.keywords);
  }, [location]);

  return null;
}

// Reusable Wrapper for animated route entries (Smooth Page-In)
function PageWrapper({ children }: { children: React.ReactNode; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

// Sub-app content wrapper enabling use of useLocation hooks
function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0B132B] text-zinc-100 font-sans selection:bg-brand-teal/30 selection:text-teal-200 flex flex-col">
      {/* Skip Navigation Link for Screen Reader Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-brand-teal focus:text-slate-950 focus:px-4 focus:py-2 focus:rounded-xl focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:shadow-2xl focus:border-2 focus:border-white"
      >
        Skip to Main Content
      </a>
      <Navbar />
      <RouteSEOUpdater />
      <main id="main-content" className="flex-1 flex flex-col pt-20">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageWrapper key={location.pathname}><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper key={location.pathname}><About /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper key={location.pathname}><Services /></PageWrapper>} />
            <Route path="/for-employers" element={<PageWrapper key={location.pathname}><Employers /></PageWrapper>} />
            <Route path="/employer-portal" element={<PageWrapper key={location.pathname}><EmployerPortal /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper key={location.pathname}><Blog /></PageWrapper>} />
            <Route path="/apply" element={<PageWrapper key={location.pathname}><Apply /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper key={location.pathname}><Privacy /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper key={location.pathname}><Terms /></PageWrapper>} />
            <Route path="/accessibility" element={<PageWrapper key={location.pathname}><Accessibility /></PageWrapper>} />
            <Route path="/why-we-do-it" element={<PageWrapper key={location.pathname}><WhyWeDoIt /></PageWrapper>} />
            <Route path="/genesis" element={<PageWrapper key={location.pathname}><Genesis /></PageWrapper>} />
            <Route path="/managed-bpo" element={<PageWrapper key={location.pathname}><ManagedBpo /></PageWrapper>} />
            <Route path="/how-it-works" element={<PageWrapper key={location.pathname}><HowItWorks /></PageWrapper>} />
            
            <Route path="/solutions/predictive-matcher" element={<PageWrapper key={location.pathname}><PredictiveMatcherPage /></PageWrapper>} />
            <Route path="/solutions/eea-esg-dashboard" element={<PageWrapper key={location.pathname}><EeaEsgDashboardPage /></PageWrapper>} />
            <Route path="/solutions/vetted-placements" element={<PageWrapper key={location.pathname}><VettedPlacements /></PageWrapper>} />
            <Route path="/solutions/turnkey-operations" element={<PageWrapper key={location.pathname}><TurnkeyOperations /></PageWrapper>} />
            <Route path="/solutions/the-pipeline" element={<PageWrapper key={location.pathname}><ThePipeline /></PageWrapper>} />
            <Route path="/solutions/compliance-hub" element={<PageWrapper key={location.pathname}><ComplianceHub /></PageWrapper>} />
            <Route path="/solutions/bbbee-ee-targets" element={<PageWrapper key={location.pathname}><BbbEeTargets /></PageWrapper>} />
            <Route path="/solutions/facility-audits" element={<PageWrapper key={location.pathname}><FacilityAudits /></PageWrapper>} />
            <Route path="/solutions/eea-compliance-guide" element={<PageWrapper key={location.pathname}><EeaComplianceGuide /></PageWrapper>} />
            <Route path="/solutions/skills-development" element={<PageWrapper key={location.pathname}><SkillsDevelopment /></PageWrapper>} />
            <Route path="/solutions/reasonable-accommodation" element={<PageWrapper key={location.pathname}><ReasonableAccommodation /></PageWrapper>} />
            <Route path="*" element={<PageWrapper key={location.pathname}><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ElmarieWidget />
      <FloatingShare />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        <SchemaContextProvider>
          <ToastProvider>
            <Router>
              <AppContent />
            </Router>
          </ToastProvider>
        </SchemaContextProvider>
      </SmoothScrollProvider>
    </ErrorBoundary>
  );
}
