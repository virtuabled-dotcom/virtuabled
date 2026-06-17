import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Search, FileText, CheckCircle2, 
  MapPin, BrainCircuit, ArrowRight, X, User, 
  Briefcase, Lock, Sparkles, Filter, 
  Settings, Mail, ChevronRight, LayoutDashboard,
  Bell, Info, RefreshCw, Bookmark, Star, Play
} from 'lucide-react';
import { ESGImpactDashboard } from '@/components/shared/ESGImpactDashboard';
import { useToast } from "@/components/shared/Toast";
import { cn } from '@/lib/utils';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CandidateDetailModal } from '@/components/portal/CandidateDetailModal';
import { SheetsSyncWidget } from '@/components/SheetsSyncWidget';
import { AnalyticsDashboard } from '@/components/portal/AnalyticsDashboard';
import {
  useLocalStore,
  useSession,
  type ComplianceItem,
  type FacilitiesState,
} from '@/utils/localStore';

const DEFAULT_COMPLIANCE_ITEMS: ComplianceItem[] = [
  { id: '1', title: 'Diversity Quota Reached (EEA)', completed: false },
  { id: '2', title: 'Wheelchair Accessibility Audit Passed', completed: true },
  { id: '3', title: 'Screen Reader Software Licenses Procured', completed: true },
  { id: '4', title: 'ASL Interpreter Services Contracted', completed: false },
  { id: '5', title: 'Sensory Policy Published', completed: false },
];

const DEFAULT_FACILITIES: FacilitiesState = {
  'Cape Town HQ': {
    wheelchair: true, restrooms: true, screen_reader: true, braille: true, asl: true,
    captioning: true, visual_alarms: true, quiet_rooms: true, ergonomic: true, flexible: true,
  },
  'Johannesburg': {
    wheelchair: false, restrooms: true, screen_reader: false, braille: false, asl: false,
    captioning: true, visual_alarms: false, quiet_rooms: true, ergonomic: false, flexible: true,
  },
  'Durban': {
    wheelchair: true, restrooms: true, screen_reader: true, braille: false, asl: false,
    captioning: true, visual_alarms: true, quiet_rooms: false, ergonomic: true, flexible: false,
  },
  'Pretoria': {
    wheelchair: true, restrooms: false, screen_reader: false, braille: true, asl: true,
    captioning: false, visual_alarms: true, quiet_rooms: false, ergonomic: false, flexible: true,
  },
};

const ShimmerBlock = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-zinc-800/60 rounded-lg", className)} />
);

const AccessibleTooltip = ({ children, content }: { children: React.ReactNode, content: string | React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="group relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div 
        tabIndex={0} 
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-full cursor-help"
      >
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full mb-2 z-[999] w-64 p-3 bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] text-xs text-zinc-300 font-sans normal-case tracking-normal cursor-default select-none pointer-events-none"
          >
            {content}
            <div className="absolute top-full left-1/2 -mt-px -translate-x-1/2 border-4 border-transparent border-t-zinc-950"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const COMPLIANCE_TOOLTIPS: Record<string, string> = {
  '1': "EEA Alignment: Bypasses standard statutory fines under the South African Employment Equity Act while maximizing B-BBEE scorecard points.",
  '2': "Physical Integrity: Decreases site liability risks and fosters seamless transition loops for wheelchair-configured software specialists.",
  '3': "Digital Access: Procures system overlays and screen-reader licenses to prevent software bottlenecks and remote server delays.",
  '4': "Sprint Synergy: Contracted verbal translators and sign-language networks secure real-time inclusion for complex collaborative sprints.",
  '5': "Sustained Attrition: Specialized focus policies protect neurodivergent flow-state levels, lowering recruitment cost overheads."
};

// --- MOCK DATA ---
const CANDIDATES = [
  {
    id: 1,
    name: 'Sarah Botha',
    role: 'Senior Data Analyst',
    location: 'Cape Town, RSA',
    matchScore: 94,
    skills: ['Python', 'SQL', 'Tableau', 'Predictive Modeling'],
    requirements: ['Wheelchair Accessible', 'Accessible Restrooms', 'Step-free Access'],
    avatar: 'SB',
    avatarImg: '/images/people/sarah-botha.jpeg',
    bio: 'Experienced statistical analyst passionate about mining datasets. Sarah specializes in creating resilient predictive analytics models and visual interactive executive dashboards in Cape Town.',
    experience: '6 Years',
    education: 'BSc Computer Science & Statistics, UCT',
    contactEmail: 'sarah.botha@enterprise-talent.co.za',
    contactPhone: '+27 21 555 4321',
    captions: [
      { time: 1, text: "Sanibonani! I'm Sarah. I'm a Senior Data Analyst based in beautiful Cape Town." },
      { time: 6, text: "I specialize in SQL architecture, Python models, and business intelligence." },
      { time: 12, text: "Having a physical mobility disability means I love working in wheelchair-ready offices." },
      { time: 18, text: "I've structured enterprise-grade systems that shaved off hours of computing cycles." },
      { time: 24, text: "I look forward to joining your operations and engineering team!" }
    ]
  },
  {
    id: 2,
    name: 'Mandla Nkosi',
    role: 'Frontend Engineer',
    location: 'Johannesburg, RSA',
    matchScore: 88,
    skills: ['React', 'TypeScript', 'Tailwind', 'Accessibility (a11y)'],
    requirements: ['Screen Reader Compatible Software', 'Braille Signage'],
    avatar: 'MN',
    avatarImg: '/images/people/mandla-nkosi.jpeg',
    bio: 'Dedicated web interface designer specializing in accessible user experiences. Mandla implements WCAG compliant pixel-perfect apps using standard React and Tailwind ecosystems.',
    experience: '4 Years',
    education: 'National Diploma in Software Development, Wits',
    contactEmail: 'mandla.nkosi@inclusivedev.za',
    contactPhone: '+27 11 405 9182',
    captions: [
      { time: 1, text: "Dumela! My name is Mandla. I build user interfaces that empower every human." },
      { time: 7, text: "I code in React, TypeScript, and focus heavily on global WCAG accessibility specs." },
      { time: 13, text: "As a visually impaired specialist, I use JAWS and NVDA screen readers daily." },
      { time: 19, text: "I ensure our HTML semantics are robust and completely screen-reader compliant." },
      { time: 25, text: "Let's build web platforms together that leave nobody behind. Ngiyabonga!" }
    ]
  },
  {
    id: 3,
    name: 'David van Wyk',
    role: 'Project Manager',
    location: 'Remote',
    matchScore: 91,
    skills: ['Agile', 'Scrum', 'Risk Management', 'Stakeholder Comms'],
    requirements: ['ASL Interpreter Access', 'Captioning Tools', 'Visual Emergency Alarms'],
    avatar: 'DW',
    avatarImg: '/images/people/david-vanwyk.jpeg',
    bio: 'Certified Scrum Master with over 8 years in digital agency delivery. David excels at coordinate loops, sprint backlogs, risk boards, and inclusive communication channels.',
    experience: '8 Years',
    education: 'BCom Information Systems, UNISA',
    contactEmail: 'david.vanwyk@pmhub.co.za',
    contactPhone: '+27 12 703 1111',
    captions: [
      { time: 1, text: "Hello there! I am David. For 8 years, I've managed complex Agile project structures." },
      { time: 7, text: "I remove blockers, refine backlogs, and streamline product delivery pipelines." },
      { time: 13, text: "I use captioning systems and instant communication loops to coordinate deaf sprints." },
      { time: 20, text: "I thrive on risk mitigation, keeping stakeholders happy, and team synergy." },
      { time: 26, text: "I am ready to handle your next digital transformation. Thank you!" }
    ]
  },
  {
    id: 4,
    name: 'Chloe Pillay',
    role: 'UX Designer',
    location: 'Durban, RSA',
    matchScore: 76,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    requirements: ['Quiet Workspaces', 'Flexible Working Hours', 'Ergonomic Equipment'],
    avatar: 'CP',
    avatarImg: '/images/people/chloe-pillay.jpeg',
    bio: 'Product visualizer with a deep understanding of human cognitive psychology. Chloe crafts wireframes and elaborate systems of design for mobile and web environments in Durban.',
    experience: '3 Years',
    education: 'BA Creative Brand Communications, Vega Durban',
    contactEmail: 'chloe.pillay@pixels.co.za',
    contactPhone: '+27 31 888 2341',
    captions: [
      { time: 1, text: "Hi, I'm Chloe! I'm a UX designer and design systems specialist in Durban." },
      { time: 7, text: "I translate complex user flows into clean, structured, and beautiful Figma layouts." },
      { time: 13, text: "As a neurodivergent creative, I collaborate best in quiet sensory workspaces." },
      { time: 19, text: "I build interactive, comprehensive design systems that speed up front-end engineering." },
      { time: 25, text: "I look forward to discussing how we can refine your customer journey!" }
    ]
  },
  {
    id: 5,
    name: 'Thabo Molefe',
    role: 'Python Backend Specialist',
    location: 'Pretoria, RSA',
    matchScore: 82,
    skills: ['Python', 'Django', 'REST API', 'PostgreSQL'],
    requirements: ['Wheelchair Accessible', 'Accessible Restrooms', 'Step-free Access'],
    avatar: 'TM',
    avatarImg: '/images/people/thabo-molefe.jpeg',
    bio: 'Backend systems architect. Thabo configures secure RESTful API layers, manages Postgres index optimizations, and implements concurrent processing pipelines.',
    experience: '5 Years',
    education: 'BSc Computer Science, University of Pretoria',
    contactEmail: 'thabo.molefe@backend.co.za',
    contactPhone: '+27 12 342 9003',
    captions: [
      { time: 1, text: "Guten Tag and hello! I am Thabo. I am a backend systems specialist in Pretoria." },
      { time: 7, text: "I structure secure, highly-optimized Django and FastAPI web services." },
      { time: 13, text: "I work remotely with voice-control and screen-reader software tuned to how I code." },
      { time: 19, text: "I build robust, low-latency API layers and connect high-load PostgreSQL storage." },
      { time: 25, text: "Let's connect your frontend to a rock-solid server architecture!" }
    ]
  },
  {
    id: 6,
    name: 'Fatima Patel',
    role: 'DevOps Engineer',
    location: 'Durban, RSA',
    matchScore: 85,
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD Pipelines'],
    requirements: ['Captioning Tools', 'Visual Emergency Alarms'],
    avatar: 'FP',
    avatarImg: '/images/people/fatima-patel.jpeg',
    bio: 'Infrastructure and cloud release expert. Fatima builds self-healing cloud clusters, automates complex delivery pipelines, and optimizes cloud spending.',
    experience: '4 Years',
    education: 'National Diploma in IT, DUT',
    contactEmail: 'fatima.patel@cloudinfra.za',
    contactPhone: '+27 31 445 9988',
    captions: [
      { time: 1, text: "Assalamu Alaikum! I am Fatima, a DevOps cloud engineer in sunny Durban." },
      { time: 7, text: "I containerize web software with Docker and manage microservices on AWS." },
      { time: 13, text: "I leverage visual alarms and captioning tools to bypass environmental hearing limits." },
      { time: 19, text: "I automate delivery pipelines, speeding up client product release frequency safely." },
      { time: 25, text: "Let's automate and scale up your server operations securely!" }
    ]
  }
];

const DIVERSITY_DATA = [
  { month: 'Jan', "Neurodivergent": 12, "Visually Impaired": 5, "Mobility": 8, "Hearing": 3 },
  { month: 'Feb', "Neurodivergent": 15, "Visually Impaired": 7, "Mobility": 10, "Hearing": 5 },
  { month: 'Mar', "Neurodivergent": 20, "Visually Impaired": 12, "Mobility": 15, "Hearing": 8 },
  { month: 'Apr', "Neurodivergent": 28, "Visually Impaired": 16, "Mobility": 22, "Hearing": 14 },
];

const EFFICIENCY_DATA = [
  { quarter: 'Q1', "Cost Savings (%)": 5, "Retention Rate (%)": 82 },
  { quarter: 'Q2', "Cost Savings (%)": 12, "Retention Rate (%)": 86 },
  { quarter: 'Q3', "Cost Savings (%)": 18, "Retention Rate (%)": 89 },
  { quarter: 'Q4', "Cost Savings (%)": 25, "Retention Rate (%)": 94 },
];

const getHeatmapColor = (value: number) => {
  if (value >= 80) return 'bg-brand-teal text-[#0a0a0a] border-brand-teal/20';
  if (value >= 50) return 'bg-brand-amber/80 text-[#0a0a0a] border-brand-amber/20';
  return 'bg-brand-coral/80 text-white border-brand-coral/20';
};

const ACCESSIBILITY_FEATURES = [
  { id: 'wheelchair', label: 'Wheelchair Ramps & Step-free Access' },
  { id: 'restrooms', label: 'Accessible Restrooms' },
  { id: 'screen_reader', label: 'Screen Reader Software Licenses' },
  { id: 'braille', label: 'Braille Signage & Labels' },
  { id: 'asl', label: 'ASL Interpreters (On-site or Remote)' },
  { id: 'captioning', label: 'Captioning/Transcription Tools' },
  { id: 'visual_alarms', label: 'Visual Emergency Alarms' },
  { id: 'quiet_rooms', label: 'Quiet Workspaces / Sensory Rooms' },
  { id: 'ergonomic', label: 'Adaptive Ergonomic Equipment' },
  { id: 'flexible', label: 'Flexible / Asynchronous Working Hours' }
];

export default function EmployerPortal() {
  const { showToast } = useToast();
  const { session, login, logout } = useSession();
  const isLoggedIn = !!session;
  const [activeTab, setActiveTab] = useState<'dashboard' | 'facilities' | 'jobs' | 'candidates' | 'preferences' | 'compliance'>('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // B-BBEE Scorecard points simulator parameters
  const [skillsDevFunding, setSkillsDevFunding] = useState(150000); // in ZAR funded
  const [procurementSpend, setProcurementSpend] = useState(85000); // in ZAR procurement from Virtuabled
  
  // ATS Sync Status Configuration
  const [selectedATS, setSelectedATS] = useState<'workday' | 'successfactors' | 'greenhouse' | 'lever'>('greenhouse');
  const [atsApiKey, setAtsApiKey] = useState("************************");
  const [atsSubdomain, setAtsSubdomain] = useState("acme-sa-talent");
  const [atsAutoSync, setAtsAutoSync] = useState(true);
  const [atsLogs, setAtsLogs] = useState<string[]>([
    "System Initialized. Awaiting manual trigger or scheduled cron indexer..."
  ]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [ariaStatus, setAriaStatus] = useState("");
  
  const [preferences, setPreferences] = useState({
    density: 'comfortable',
    fontSize: 'normal'
  });

  const [notifications, setNotifications] = useState<{id: number, text: string}[]>([]);

  // Trigger loading effect on tab change to show shimmers
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setNotifications(prev => [...prev, { id: Date.now(), text: "New Match: Candidate 'Chloe Pillay' meets 100% of your current sensory and ergonomic requirements." }]);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const [searchQuery, setSearchQuery] = useState('');

  // Compliance state (persisted locally)
  const [complianceItems, setComplianceItems] = useLocalStore<ComplianceItem[]>(
    'virtuabled_compliance',
    DEFAULT_COMPLIANCE_ITEMS
  );

  const toggleComplianceItem = (id: string) => {
    setComplianceItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };
    
  // Selected physical office branch
  const [selectedBranch, setSelectedBranch] = useState<string>('Cape Town HQ');

  // Branch-specific Facilities State (persisted locally)
  const [facilities, setFacilities] = useLocalStore<FacilitiesState>(
    'virtuabled_facilities',
    DEFAULT_FACILITIES
  );

  // Dynamic OFFICE_HEATMAP calculation
  const OFFICE_HEATMAP = React.useMemo(() => {
    const branches = ['Cape Town HQ', 'Johannesburg', 'Durban', 'Pretoria'];
    
    return branches.map(loc => {
      const branchFac = facilities[loc] || {};
      
      const mobilityCount = ['wheelchair', 'restrooms', 'ergonomic'].filter(f => branchFac[f]).length;
      const wheelchair = Math.round((mobilityCount / 3) * 100);
      
      const visualCount = ['screen_reader', 'braille'].filter(f => branchFac[f]).length;
      const visuallyImpaired = Math.round((visualCount / 2) * 100);
      
      const neuroCount = ['quiet_rooms', 'flexible'].filter(f => branchFac[f]).length;
      const neurodivergent = Math.round((neuroCount / 2) * 100);
      
      const hearingCount = ['asl', 'captioning', 'visual_alarms'].filter(f => branchFac[f]).length;
      const deaf = Math.round((hearingCount / 3) * 100);
      
      const overallScore = Math.round((wheelchair + visuallyImpaired + neurodivergent + deaf) / 4);
      
      return {
        location: loc,
        wheelchair,
        visuallyImpaired,
        neurodivergent,
        deaf,
        score: overallScore
      };
    });
  }, [facilities]);

  // Candidate watchlist state (Shortlisting ids) — persisted locally
  const [shortlistedIds, setShortlistedIds] = useLocalStore<number[]>('virtuabled_shortlist', [1, 3]);

  // Selected Candidate for WCAG detail modal view
  const [selectedCandidate, setSelectedCandidate] = useState<typeof CANDIDATES[0] | null>(null);

  // Active filter in Talent Database: 'all' | 'shortlisted'
  const [candidateListFilter, setCandidateListFilter] = useState<'all' | 'shortlisted'>('all');

  const filteredCandidates = CANDIDATES.filter(candidate => {
    if (candidateListFilter === 'shortlisted' && !shortlistedIds.includes(candidate.id)) {
      return false;
    }
    const query = searchQuery.toLowerCase();
    return candidate.name.toLowerCase().includes(query) || 
           candidate.role.toLowerCase().includes(query) || 
           candidate.skills.some(s => s.toLowerCase().includes(query)) ||
           candidate.requirements.some(r => r.toLowerCase().includes(query));
  });

  // Jobs State
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedCandidates, setMatchedCandidates] = useState<typeof CANDIDATES | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    if (!login(email, password)) {
      showToast(
        "Demo access only",
        "error",
        "Use the prefilled demo credentials to explore the portal."
      );
      return;
    }
    showToast(
      "Demo access granted",
      "success",
      "You're in. Everything you change here is saved in this browser only."
    );
  };

  const toggleFacility = (id: string) => {
    setFacilities(prev => {
      const branchData = prev[selectedBranch] || {};
      return {
        ...prev,
        [selectedBranch]: {
          ...branchData,
          [id]: !branchData[id]
        }
      };
    });
    // Reset matches when facilities change
    if (matchedCandidates) setMatchedCandidates(null);
  };

  const getRequiredFeatureIds = (reqList: string[]): string[] => {
    const featureMap: Record<string, string> = {
      'Wheelchair Accessible': 'wheelchair',
      'Step-free Access': 'wheelchair',
      'Accessible Restrooms': 'restrooms',
      'Screen Reader Compatible Software': 'screen_reader',
      'Braille Signage': 'braille',
      'ASL Interpreter Access': 'asl',
      'Captioning Tools': 'captioning',
      'Visual Emergency Alarms': 'visual_alarms',
      'Quiet Workspaces': 'quiet_rooms',
      'Ergonomic Equipment': 'ergonomic',
      'Flexible Working Hours': 'flexible'
    };
    return reqList.map(r => featureMap[r]).filter(Boolean);
  };

  const handleMatchJobs = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    setMatchedCandidates(null);
    
    // Simulate structured parsing and capability matching using local skill search & facility check
    setTimeout(() => {
      const descLower = jobDescription.toLowerCase();
      
      const scored = CANDIDATES.map(candidate => {
        // Tech skills matching
        let skillMatches = 0;
        candidate.skills.forEach(skill => {
          if (descLower.includes(skill.toLowerCase())) {
            skillMatches += 1;
          }
        });
        
        // Base match by role keywords
        let roleMatches = 0;
        const roleWords = candidate.role.toLowerCase().split(' ');
        roleWords.forEach(word => {
          if (word.length > 3 && descLower.includes(word)) {
            roleMatches += 1;
          }
        });

        // score calibration
        let baseScore = 55 + (skillMatches * 15) + (roleMatches * 15);
        if (baseScore > 99) baseScore = 99;
        if (baseScore < 30) baseScore = 30 + Math.floor(Math.random() * 20);

        // Check chosen branch's active features
        const branchFacilities = facilities[selectedBranch] || {};
        const reqIds = getRequiredFeatureIds(candidate.requirements);
        const missingFeatures: string[] = [];
        
        reqIds.forEach(id => {
          if (!branchFacilities[id]) {
            missingFeatures.push(id);
          }
        });

        const accommodationApproved = missingFeatures.length === 0;
        const finalScore = accommodationApproved ? baseScore : Math.max(35, baseScore - 15);

        return {
          ...candidate,
          matchScore: finalScore,
          accommodationApproved,
          missingFeatures: missingFeatures.map(id => {
            const feat = ACCESSIBILITY_FEATURES.find(f => f.id === id);
            return feat ? feat.label : id;
          })
        };
      });

      const sorted = scored.sort((a, b) => b.matchScore - a.matchScore);
      setMatchedCandidates(sorted);
      setIsAnalyzing(false);
      showToast(
        "Match Synthesis Complete",
        "success",
        `Vetted candidates successfully mapped against ${selectedBranch}'s environment.`
      );
    }, 2000);
  };

  // ── REQUEST ACCESS GATE ─────────────────────────────────────────────────────
  // Portal access is by approval only. Employers submit a request; the team
  // reviews and contacts them directly. Full auth system coming in a future phase.
  const [reqForm, setReqForm] = React.useState({
    companyName: '', fullName: '', workEmail: '', phone: '',
    employeeCount: '', primaryNeed: ''
  });
  const [reqSubmitting, setReqSubmitting] = React.useState(false);
  const [reqDone, setReqDone] = React.useState(false);
  const [reqError, setReqError] = React.useState('');

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqForm.companyName || !reqForm.fullName || !reqForm.workEmail) {
      setReqError('Please fill in Company, Name and Work Email.');
      return;
    }
    setReqSubmitting(true);
    setReqError('');
    try {
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqForm),
      });
      if (!res.ok) throw new Error('send failed');
      setReqDone(true);
    } catch {
      setReqError('Something went wrong. Please email us directly at partners@virtuabled.com');
    } finally {
      setReqSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-amber/3 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-[#0a0a0a]/90 backdrop-blur-md border border-gray-800/80 rounded-3xl p-8 md:p-10 relative z-10 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {reqDone ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h1 className="text-3xl font-display font-light text-white tracking-tight mb-3">Request Received</h1>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                We'll review your request and get back to you at <strong className="text-white">{reqForm.workEmail}</strong> within 24 hours.
              </p>
              <p className="text-xs text-zinc-600 font-mono">In the meantime — <a href="mailto:partners@virtuabled.com" className="text-brand-teal hover:underline">partners@virtuabled.com</a></p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal mb-5">
                  <Building2 size={28} />
                </div>
                <h1 className="text-3xl font-display font-light text-white tracking-tight mb-2">Employer Portal</h1>
                <p className="text-sm text-zinc-400 font-light">Access is by approval. Submit your details and we'll be in touch within 24 hours.</p>
              </div>

              <form onSubmit={handleRequestAccess} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white">Company Name *</label>
                    <input type="text" value={reqForm.companyName} onChange={e => setReqForm(p => ({...p, companyName: e.target.value}))}
                      className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
                      placeholder="Acme Corp" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white">Your Name *</label>
                    <input type="text" value={reqForm.fullName} onChange={e => setReqForm(p => ({...p, fullName: e.target.value}))}
                      className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
                      placeholder="Jane Smith" required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white">Work Email *</label>
                  <div className="relative group/input">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/input:text-brand-teal transition-colors" />
                    <input type="email" value={reqForm.workEmail} onChange={e => setReqForm(p => ({...p, workEmail: e.target.value}))}
                      className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
                      placeholder="jane@company.com" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white">Phone</label>
                    <input type="tel" value={reqForm.phone} onChange={e => setReqForm(p => ({...p, phone: e.target.value}))}
                      className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
                      placeholder="+27 xx xxx xxxx" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white">Employees</label>
                    <select value={reqForm.employeeCount} onChange={e => setReqForm(p => ({...p, employeeCount: e.target.value}))}
                      className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors">
                      <option value="">Select range</option>
                      <option>1–50</option>
                      <option>51–200</option>
                      <option>201–500</option>
                      <option>501–2000</option>
                      <option>2000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white">Primary Need</label>
                  <select value={reqForm.primaryNeed} onChange={e => setReqForm(p => ({...p, primaryNeed: e.target.value}))}
                    className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors">
                    <option value="">Select one</option>
                    <option>B-BBEE / EEA Compliance</option>
                    <option>Candidate Placement</option>
                    <option>Managed BPO Operations</option>
                    <option>Both compliance and placement</option>
                  </select>
                </div>

                {reqError && (
                  <p className="text-amber-400 font-mono text-[11px] uppercase tracking-wider">{reqError}</p>
                )}

                <button type="submit" disabled={reqSubmitting}
                  className="w-full py-4 bg-brand-teal hover:bg-[#14b8a6] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0a0a] rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                  {reqSubmitting ? 'Sending…' : <><span>Request Access</span> <ArrowRight size={15} /></>}
                </button>

                <p className="text-center text-xs text-zinc-600">
                  Already approved? Email <a href="mailto:partners@virtuabled.com" className="text-brand-teal hover:underline">partners@virtuabled.com</a>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  /* ── PORTAL DASHBOARD (invite-only — rendered when real auth is live) ─────── */
  // eslint-disable-next-line no-unreachable
  if (false) return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-2">
        <div className="mb-8 px-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">Enterprise Portal</h2>
          <p className="text-xs text-brand-teal mt-1">Acme Corp Operations</p>
        </div>

        <button 
          onClick={() => setActiveTab('dashboard')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left",
            activeTab === 'dashboard' ? "bg-white/10 text-white font-medium" : "text-zinc-400 hover:text-white hover:bg-white/5"
          )}
        >
          <LayoutDashboard size={18} />
          Overview & Heatmap
        </button>

        <button 
          onClick={() => setActiveTab('facilities')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left",
            activeTab === 'facilities' ? "bg-white/10 text-white font-medium" : "text-zinc-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Building2 size={18} />
          Facility Accessibility
        </button>

        <button 
          onClick={() => setActiveTab('jobs')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left",
            activeTab === 'jobs' ? "bg-brand-teal/10 text-brand-teal font-medium border border-brand-teal/20" : "text-zinc-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Briefcase size={18} />
          Role Fit Optimizer
        </button>

        <button 
          onClick={() => setActiveTab('candidates')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left",
            activeTab === 'candidates' ? "bg-white/10 text-white font-medium" : "text-zinc-400 hover:text-white hover:bg-white/5"
          )}
        >
          <User size={18} />
          Candidate Database
        </button>

        <button 
          onClick={() => setActiveTab('compliance')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left",
            activeTab === 'compliance' ? "bg-brand-teal/10 text-brand-teal font-medium border border-brand-teal/20" : "text-zinc-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Sparkles size={18} />
          EE Online & Integration Preview
        </button>

        <div className="pt-4 mt-4 border-t border-gray-800 space-y-2">
          <button
            onClick={() => setActiveTab('preferences')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left",
              activeTab === 'preferences' ? "bg-white/10 text-white font-medium" : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Settings size={18} />
            Preferences
          </button>
          <button
            onClick={() => {
              logout();
              showToast("Signed out", "info", "Your demo session was ended on this device.");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left text-zinc-400 hover:text-rose-400 hover:bg-rose-500/5"
          >
            <Lock size={18} />
            Log out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 bg-[#0a0a0a] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden relative",
        preferences.density === 'compact' ? "p-6 md:p-6" : "p-6 md:p-10",
        preferences.fontSize === 'large' ? "[&_p]:text-base [&_h2]:text-3xl [&_h3]:text-xl" : ""
      )}>
        
        {/* Floating Notifications */}
        <div className="absolute top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
          <AnimatePresence>
            {notifications.map(note => (
              <motion.div 
                key={note.id}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0d0d0d] border border-brand-teal/50 p-4 rounded-xl shadow-2xl flex items-start gap-3 w-80 pointer-events-auto"
              >
                <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center shrink-0 text-brand-teal mt-0.5">
                  <Bell size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium leading-snug">{note.text}</p>
                </div>
                <button 
                  onClick={() => removeNotification(note.id)}
                  className="text-zinc-500 hover:text-white transition-colors p-1"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            isLoading ? (
              <motion.div
                key="dashboard-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 w-full"
              >
                <div>
                  <ShimmerBlock className="h-8 w-48 mb-2" />
                  <ShimmerBlock className="h-4 w-96 max-w-full" />
                </div>
                
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <ShimmerBlock className="h-6 w-56" />
                    <ShimmerBlock className="h-5 w-20" />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-4 pb-2 border-b border-gray-800">
                      <ShimmerBlock className="h-4 w-24" />
                      <ShimmerBlock className="h-4 w-16" />
                      <ShimmerBlock className="h-4 w-16" />
                      <ShimmerBlock className="h-4 w-16" />
                      <ShimmerBlock className="h-4 w-16" />
                      <ShimmerBlock className="h-4 w-28" />
                    </div>
                    {[1, 2, 3].map(n => (
                      <div key={n} className="grid grid-cols-6 gap-4 py-2 items-center">
                        <ShimmerBlock className="h-5 w-32" />
                        <ShimmerBlock className="h-6 w-12" />
                        <ShimmerBlock className="h-6 w-12" />
                        <ShimmerBlock className="h-6 w-12" />
                        <ShimmerBlock className="h-6 w-12" />
                        <div className="flex items-center gap-3">
                          <ShimmerBlock className="h-5 w-10" />
                          <ShimmerBlock className="h-2 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
                    <ShimmerBlock className="h-6 w-52" />
                    <div className="space-y-4">
                      {[1, 2, 3].map(n => (
                        <div key={n} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <ShimmerBlock className="h-5 w-5 rounded" />
                            <ShimmerBlock className="h-4 w-44" />
                          </div>
                          <ShimmerBlock className="h-4 w-4 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
                    <ShimmerBlock className="h-6 w-48" />
                    <div className="h-56 bg-zinc-900/30 border border-zinc-850 rounded-xl flex items-center justify-center">
                      <ShimmerBlock className="w-[85%] h-36" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-display font-light text-white mb-2">Network Overview</h2>
                  <p className="text-zinc-400 font-light text-sm">
                    A high-level view of your current physical accessibility compliance across various office locations, cross-referenced with your active talent matching requirements.
                  </p>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8">
                   <div className="flex items-center justify-between mb-8">
                     <h3 className="text-lg text-white font-medium">Facility Accessibility Heatmap</h3>
                     <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest border border-gray-700 bg-zinc-900 px-2 py-1 rounded">Live Data</span>
                   </div>

                   <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm whitespace-nowrap">
                       <thead>
                         <tr className="border-b border-gray-800">
                           <th className="pb-4 font-normal text-zinc-500 font-mono text-xs uppercase tracking-widest">Location</th>
                           <th className="pb-4 font-normal text-zinc-505 font-mono text-xs uppercase tracking-widest">
                             <div className="flex items-center gap-1.5">
                               Mobility 
                               <AccessibleTooltip content="Evaluates step-free ingress, elevator operational status, and compliant wheelchair-accessible facilities.">
                                 <Info size={14} className="text-zinc-400 hover:text-white" />
                               </AccessibleTooltip>
                             </div>
                           </th>
                           <th className="pb-4 font-normal text-zinc-505 font-mono text-xs uppercase tracking-widest">
                             <div className="flex items-center gap-1.5">
                               Visual
                               <AccessibleTooltip content="Evaluates screen-reader compatibility of internal tools and overall digital infrastructure for the visually impaired.">
                                 <Info size={14} className="text-zinc-400 hover:text-white" />
                               </AccessibleTooltip>
                             </div>
                           </th>
                           <th className="pb-4 font-normal text-zinc-505 font-mono text-xs uppercase tracking-widest">
                             <div className="flex items-center gap-1.5">
                               Neurodivergent
                               <AccessibleTooltip content="Measures availability of sensory-friendly quiet rooms, flexible policies, and reduced-stimulation work zones.">
                                 <Info size={14} className="text-zinc-400 hover:text-white" />
                               </AccessibleTooltip>
                             </div>
                           </th>
                           <th className="pb-4 font-normal text-zinc-505 font-mono text-xs uppercase tracking-widest">
                             <div className="flex items-center gap-1.5">
                               Hearing
                               <AccessibleTooltip content="Assesses visual emergency alarm systems and availability of ASL/Captioning tools for internal meetings.">
                                 <Info size={14} className="text-zinc-400 hover:text-white" />
                               </AccessibleTooltip>
                             </div>
                           </th>
                           <th className="pb-4 font-normal text-zinc-505 font-mono text-xs uppercase tracking-widest">Overall Score</th>
                         </tr>
                       </thead>
                       <tbody>
                         {OFFICE_HEATMAP.map((office, idx) => (
                           <tr key={idx} className="border-b border-gray-800/50 hover:bg-[#121212] transition-colors">
                             <td className="py-4 text-white font-medium flex items-center gap-2">
                               <MapPin size={14} className="text-brand-teal" /> {office.location}
                             </td>
                             <td className="py-4">
                                <span className={cn("px-2 py-1 rounded border font-mono text-xs", getHeatmapColor(office.wheelchair))}>{office.wheelchair}%</span>
                             </td>
                             <td className="py-4">
                                <span className={cn("px-2 py-1 rounded border font-mono text-xs", getHeatmapColor(office.visuallyImpaired))}>{office.visuallyImpaired}%</span>
                             </td>
                             <td className="py-4">
                                <span className={cn("px-2 py-1 rounded border font-mono text-xs", getHeatmapColor(office.neurodivergent))}>{office.neurodivergent}%</span>
                             </td>
                             <td className="py-4">
                                <span className={cn("px-2 py-1 rounded border font-mono text-xs", getHeatmapColor(office.deaf))}>{office.deaf}%</span>
                             </td>
                             <td className="py-4">
                                <div className="flex items-center gap-3">
                                   <span className="font-mono text-white">{office.score}%</span>
                                   <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                      <div className="h-full bg-brand-teal" style={{ width: `${office.score}%` }} />
                                   </div>
                                </div>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                </div>


              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                       <h3 className="text-lg text-white font-medium">Compliance & Standards Tracking</h3>
                       <p className="text-xs text-zinc-500 mt-1">Interactive checklist for diversity goals and accessibility</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                    {complianceItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between group/item py-0.5">
                        <div className="flex items-start gap-4">
                          <button 
                            onClick={() => toggleComplianceItem(item.id)}
                            className={cn("w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors border", item.completed ? "bg-brand-teal border-brand-teal text-[#0a0a0a]" : "bg-[#0a0a0a] border-gray-600 hover:border-gray-500")}
                          >
                            {item.completed && <CheckCircle2 size={14} strokeWidth={3} />}
                          </button>
                          <span className={cn("text-sm transition-colors", item.completed ? "text-zinc-550 line-through font-light" : "text-white font-light")}>
                            {item.title}
                          </span>
                        </div>
                        <AccessibleTooltip content={COMPLIANCE_TOOLTIPS[item.id] || "Operational risk mitigation feature."}>
                          <Info size={13} className="text-zinc-500 hover:text-zinc-300 transition-colors" />
                        </AccessibleTooltip>
                      </div>
                    ))}
                    <div className="pt-4 mt-2 border-t border-gray-800">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <span>Compliance Score</span>
                          <AccessibleTooltip content="Enterprise Safeguards: Maintaining high compliance metrics mitigates operational regulatory risk, protects B-BBEE statuses, and avoids statutory audit penalties.">
                            <Info size={13} className="text-zinc-500 hover:text-zinc-300 transition-colors" />
                          </AccessibleTooltip>
                        </div>
                        <span className="font-mono text-brand-teal font-bold">{Math.round((complianceItems.filter(i => i.completed).length / complianceItems.length) * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-brand-teal transition-all duration-500" style={{ width: `${(complianceItems.filter(i => i.completed).length / complianceItems.length) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                       <h3 className="text-lg text-white font-medium">Diversity Hiring Metrics</h3>
                       <p className="text-xs text-zinc-500 mt-1">Cumulative placements by accommodation type</p>
                     </div>
                  </div>
                  <div className="h-72 w-full">
                    {/* Screen Reader Table Fallback */}
                    <table className="sr-only">
                      <caption>Diversity Placements Cumulative Metrics by Month</caption>
                      <thead>
                        <tr>
                          <th scope="col">Month</th>
                          <th scope="col">Neurodivergent</th>
                          <th scope="col">Visually Impaired</th>
                          <th scope="col">Mobility</th>
                          <th scope="col">Hearing</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DIVERSITY_DATA.map((row) => (
                          <tr key={row.month}>
                            <th scope="row">{row.month}</th>
                            <td>{row.Neurodivergent}</td>
                            <td>{row["Visually Impaired"]}</td>
                            <td>{row.Mobility}</td>
                            <td>{row.Hearing}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DIVERSITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#27272a', borderRadius: '8px' }}
                          itemStyle={{ color: '#e4e4e7', fontSize: '12px' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#a1a1aa' }} />
                        <Bar dataKey="Neurodivergent" stackId="a" fill="#14b8a6" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Mobility" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Visually Impaired" stackId="a" fill="#f43f5e" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Hearing" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                       <h3 className="text-lg text-white font-medium">Operational Efficiency Gains</h3>
                       <p className="text-xs text-zinc-500 mt-1">Cost savings & retention impact</p>
                     </div>
                     <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest border border-brand-teal/20 bg-brand-teal/10 px-2 py-1 rounded">Q4 Projected</span>
                  </div>
                  <div className="h-72 w-full">
                    {/* Screen Reader Table Fallback */}
                    <table className="sr-only">
                      <caption>Operational Efficiency Gains by Quarter (Cost Savings and Retention)</caption>
                      <thead>
                        <tr>
                          <th scope="col">Quarter</th>
                          <th scope="col">Cost Savings (%)</th>
                          <th scope="col">Retention Rate (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {EFFICIENCY_DATA.map((row) => (
                          <tr key={row.quarter}>
                            <th scope="row">{row.quarter}</th>
                            <td>{row["Cost Savings (%)"]}%</td>
                            <td>{row["Retention Rate (%)"]}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={EFFICIENCY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorRet" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="quarter" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#27272a', borderRadius: '8px' }}
                          itemStyle={{ color: '#e4e4e7', fontSize: '12px' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#a1a1aa' }} />
                        <Area type="monotone" dataKey="Retention Rate (%)" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRet)" />
                        <Area type="monotone" dataKey="Cost Savings (%)" stroke="#14b8a6" fillOpacity={1} fill="url(#colorCost)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Active Placement Analytics Dashboard section */}
              <div className="mt-8">
                <AnalyticsDashboard />
              </div>

              {/* Mounted ESG Impact Dashboard */}
              <div className="mt-8">
                <ESGImpactDashboard embedded={true} />
              </div>
            </motion.div>
          ))}

          {/* FACILITIES TAB */}
          {activeTab === 'facilities' && (
            <motion.div
              key="facilities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-light text-white mb-2">Facility & System Adaptability</h2>
                  <p className="text-zinc-400 font-light text-sm">
                    Configure the accessibility features currently available at your physical locations or within your digital infrastructure. 
                    Our matching engine strictly cross-references these capabilities with candidate requirements.
                  </p>
                </div>
              </div>

              {/* Branch Selector Switch */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#090e1a] border border-zinc-800">
                <div>
                  <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                    <Building2 size={16} className="text-brand-teal" />
                     Audit Location Branch
                  </h3>
                  <p className="text-zinc-500 text-xs mt-0.5">Select a physical corporate office site to configure target assets.</p>
                </div>
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => {
                      setSelectedBranch(e.target.value);
                      showToast(`Switched Audit Context`, "info", `Loading asset checklists for ${e.target.value}.`);
                    }}
                    className="bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-mono font-bold uppercase select-none focus:outline-none focus:border-brand-teal transition-colors cursor-pointer"
                  >
                    {['Cape Town HQ', 'Johannesburg', 'Durban', 'Pretoria'].map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-xl border border-zinc-800 bg-[#0d0d0d] relative overflow-hidden">
                      <ShimmerBlock className="w-5 h-5 rounded shrink-0 animate-pulse bg-zinc-800/80" />
                      <div className="flex-1 space-y-2">
                        <ShimmerBlock className="h-3 w-3/4 animate-pulse bg-zinc-800/80" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ACCESSIBILITY_FEATURES.map((feature) => {
                    const branchData = facilities[selectedBranch] || {};
                    const isActive = branchData[feature.id];
                    return (
                      <button
                        key={feature.id}
                        onClick={() => toggleFacility(feature.id)}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border transition-all text-left",
                          isActive 
                            ? "bg-brand-teal/5 border-brand-teal/30 shadow-[0_4px_16px_rgba(20,184,166,0.05)]" 
                            : "bg-[#0d0d0d] border-gray-800 hover:border-gray-600"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors border",
                          isActive ? "bg-brand-teal border-brand-teal text-[#0a0a0a]" : "border-gray-600"
                        )}>
                          {isActive && <CheckCircle2 size={14} strokeWidth={3} />}
                        </div>
                        <span className={cn("text-sm font-light leading-snug", isActive ? "text-white" : "text-zinc-400")}>
                          {feature.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* JOBS & ROLE FIT TAB */}
          {activeTab === 'jobs' && (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-light text-white mb-2">Upload Role & Match</h2>
                <p className="text-zinc-400 font-light text-sm">
                  Paste your job description. Our Virtuabled matching engine will map the required skills against our talent pool, 
                  automatically filtering for candidates whose physical or systemic requirements match your specific facility accommodations.
                </p>
              </div>

              <div className="relative">
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description here (e.g. 'Looking for a Senior React Developer with experience in state management, responsive design, and agile workflows...')"
                  className="w-full h-64 bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 text-sm text-zinc-300 font-light focus:outline-none focus:border-brand-teal resize-none transition-colors"
                />
              </div>

              <button 
                onClick={handleMatchJobs}
                disabled={!jobDescription.trim() || isAnalyzing}
                className={cn(
                  "w-full py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-all",
                  isAnalyzing 
                    ? "bg-gray-800 text-gray-500 cursor-wait" 
                    : jobDescription.trim() 
                      ? "bg-brand-teal text-[#0a0a0a] hover:bg-white" 
                      : "bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed"
                )}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-500 border-t-transparent animate-spin" />
                    Analyzing Requirements...
                  </>
                ) : (
                  <>
                    <BrainCircuit size={18} />
                    Run Professional Adaptation Matcher
                  </>
                )}
              </button>

              {/* MATCH RESULTS */}
              {matchedCandidates && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-6 border-t border-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Matched Candidates</h3>
                      <p className="text-xs text-brand-teal mt-1">Filtered by skills, location, and your facility accessibility capability.</p>
                    </div>
                    <div className="text-xs text-zinc-400 font-mono tracking-widest">{matchedCandidates.length} RESULTS</div>
                  </div>

                  <div className="space-y-4">
                    {matchedCandidates.map((candidate) => (
                      <div key={candidate.id} className={cn("p-6 rounded-xl bg-gradient-to-r from-[#0d0d0d] to-[#121212] border flex flex-col xl:flex-row xl:items-start gap-8 group transition-all relative overflow-hidden", candidate.matchScore >= 90 ? "border-brand-teal/50 animate-[pulse_3s_ease-in-out_infinite] hover:animate-none" : "border-gray-800 hover:border-brand-teal/30")}>
                        {/* Quick View Decorator */}
                        <div className="absolute top-0 right-0 px-3 py-1 bg-brand-teal/10 border-b border-l border-brand-teal/20 rounded-bl-lg text-[10px] font-bold tracking-widest uppercase text-brand-teal">
                          Quick View
                        </div>
                        
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-14 h-14 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold tracking-widest border border-brand-teal/20 text-sm shrink-0 overflow-hidden">
                            {candidate.avatarImg ? (
                              <img src={candidate.avatarImg} alt={candidate.name} className="w-full h-full object-cover" />
                            ) : candidate.avatar}
                          </div>
                          <div className="w-full">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-white font-medium text-lg">{candidate.name}</h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-gray-700">{candidate.location}</span>
                            </div>
                            <p className="text-sm text-brand-teal font-medium mb-3">{candidate.role}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {candidate.skills.slice(0, 4).map(skill => (
                                <span key={skill} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-black border border-gray-800 text-zinc-300 rounded-md">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            <div className="bg-[#0a0a0a] rounded-lg p-3 border border-gray-800/50">
                              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">Accessibility Validated Fit:</span>
                              <div className="flex flex-wrap gap-2">
                                {candidate.requirements.map(req => {
                                  const getBadgeStyle = (req: string) => {
                                    if (req.includes('Screen Reader')) return 'text-brand-coral border-brand-coral/20 bg-brand-coral/5';
                                    if (req.includes('Wheelchair')) return 'text-brand-teal border-brand-teal/20 bg-brand-teal/5';
                                    return 'text-zinc-300 border-gray-700 bg-zinc-900';
                                  };
                                  return (
                                    <div key={req} className={cn("flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-mono", getBadgeStyle(req))}>
                                      <CheckCircle2 size={12} className="shrink-0" />
                                      <span>{req} Ready</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="xl:w-56 flex-shrink-0 flex flex-col justify-between self-stretch">
                          <div>
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-1.5">
                                Compatibility Match Score
                                <AccessibleTooltip content="Calculated by matching candidate's skills against role requirements and cross-referencing requested accommodations with your facility audit.">
                                  <Info size={12} className="text-zinc-500 hover:text-white" />
                                </AccessibleTooltip>
                              </span>
                              <span className="text-2xl font-light text-white leading-none">{candidate.matchScore}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-black rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-brand-teal transition-all duration-1000" 
                                style={{ width: `${candidate.matchScore}%` }} 
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 mt-6 xl:mt-0">
                            <button 
                              onClick={() => setSelectedCandidate(candidate)}
                              className="px-4 py-2.5 rounded-lg border border-[#4c1d95] bg-[#4c1d95]/20 text-indigo-300 text-xs uppercase tracking-widest font-mono font-bold hover:bg-[#4c1d95] transition-colors shrink-0 cursor-pointer"
                            >
                              Profile & Subtitles
                            </button>
                            <button 
                              onClick={() => {
                                const isShortlisted = shortlistedIds.includes(candidate.id);
                                setShortlistedIds(prev => 
                                  isShortlisted
                                    ? prev.filter(id => id !== candidate.id) 
                                    : [...prev, candidate.id]
                                );
                                showToast(
                                  isShortlisted ? "Removed from Shortlist" : "Saved",
                                  isShortlisted ? "info" : "success",
                                  `${candidate.name} is saved in pipeline.`
                                );
                              }}
                              className={cn(
                                "flex-1 xl:flex-none px-5 py-2.5 rounded-lg border text-xs uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer",
                                shortlistedIds.includes(candidate.id)
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20"
                                  : "border-brand-teal/30 bg-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-black"
                              )}
                            >
                              {shortlistedIds.includes(candidate.id) ? "Saved Portfolio" : "Bookmark Shortlist"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* CANDIDATE DATABASE TAB */}
          {activeTab === 'candidates' && (
            isLoading ? (
              <motion.div
                key="candidates-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 w-full"
              >
                <div>
                  <ShimmerBlock className="h-8 w-44 mb-2" />
                  <ShimmerBlock className="h-4 w-96 max-w-full" />
                </div>
                
                <div className="relative mb-6">
                  <ShimmerBlock className="h-12 w-full rounded-xl" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="rounded-xl bg-[#0d0d0d] border border-gray-800 p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <ShimmerBlock className="w-10 h-10 rounded-full" />
                        <div className="space-y-2">
                          <ShimmerBlock className="h-4 w-32" />
                          <ShimmerBlock className="h-3 w-40" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <ShimmerBlock className="h-3.5 w-24" />
                        <div className="space-y-1.5">
                          <ShimmerBlock className="h-2 w-16" />
                          <div className="flex gap-2">
                            <ShimmerBlock className="h-5 w-16" />
                            <ShimmerBlock className="h-5 w-20" />
                            <ShimmerBlock className="h-5 w-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="candidates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn("space-y-8", preferences.density === 'compact' && "space-y-6")}
              >
                <div>
                  <h2 className="text-2xl font-display font-light text-white mb-2">Talent Network</h2>
                  <p className="text-zinc-400 font-light text-sm">
                    Browse the Virtuabled vetted talent pool. To see which candidates match your physical infrastructure, 
                    run a search via the Role Fit Optimizer tab.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                  {/* Select filters */}
                  <div className="flex gap-2 sm:shrink-0">
                    <button 
                      onClick={() => setCandidateListFilter('all')}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer",
                        candidateListFilter === 'all' 
                          ? "bg-brand-teal text-[#050C1A]" 
                          : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white"
                      )}
                    >
                      Vetted Network ({CANDIDATES.length})
                    </button>
                    <button 
                      onClick={() => setCandidateListFilter('shortlisted')}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-colors flex items-center gap-2 cursor-pointer",
                        candidateListFilter === 'shortlisted' 
                          ? "bg-brand-teal text-[#050C1A]" 
                          : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white"
                      )}
                    >
                      <Bookmark size={12} className={cn(candidateListFilter === 'shortlisted' ? "fill-[#050C1A]" : "text-zinc-400")} />
                      Shortlist Pipeline ({shortlistedIds.length})
                    </button>
                  </div>

                  <div className="relative w-full sm:max-w-xs">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by role, skills or workspace..."
                      className="w-full bg-[#0d0d0d] border border-gray-800 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-teal transition-colors" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {filteredCandidates.length === 0 ? (
                  <div className="col-span-2 text-center py-16 text-zinc-550 text-xs font-mono bg-zinc-950/20 rounded-2xl border border-zinc-800 border-dashed">
                    No matching profiles found inside your viewport selection.
                  </div>
                ) : (
                  filteredCandidates.map((candidate) => {
                    const isShortlisted = shortlistedIds.includes(candidate.id);
                    return (
                      <div 
                        key={candidate.id} 
                        onClick={() => setSelectedCandidate(candidate)}
                        className={cn(
                          "rounded-2xl border bg-zinc-950/40 relative overflow-hidden group flex flex-col justify-between cursor-pointer hover:-translate-y-0.5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-teal/[0.02]", 
                          isShortlisted 
                            ? "border-brand-teal/40 bg-brand-teal/[0.01]" 
                            : "border-zinc-800 hover:border-zinc-650",
                          preferences.density === 'compact' ? "p-4" : "p-6"
                        )}
                      >
                        {/* Shone-through Glow if shortlisted */}
                        {isShortlisted && (
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-2xl pointer-events-none" />
                        )}

                        <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white text-xs border border-zinc-850 font-mono font-bold overflow-hidden">
                                {candidate.avatarImg ? (
                                  <img src={candidate.avatarImg} alt={candidate.name} className="w-full h-full object-cover" />
                                ) : candidate.avatar}
                              </div>
                              <div className="text-left">
                                <h4 className="text-white text-sm font-medium flex items-center gap-1.5 leading-snug">
                                  {candidate.name}
                                  {isShortlisted && <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-teal" />}
                                </h4>
                                <span className="text-zinc-400 text-xs font-mono">{candidate.role}</span>
                              </div>
                           </div>
                           
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               setShortlistedIds(prev => 
                                 isShortlisted
                                   ? prev.filter(id => id !== candidate.id) 
                                   : [...prev, candidate.id]
                               );
                               showToast(
                                 isShortlisted ? "Removed from Shortlist" : "Vanguard Saved",
                                 isShortlisted ? "info" : "success",
                                 `${candidate.name} updated in your pipeline portfolio.`
                               );
                             }}
                             className="p-2 cursor-pointer rounded-lg bg-zinc-900/60 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors relative z-20"
                             aria-label="Toggle candidate watchlist shortlist"
                           >
                             <Bookmark size={13} className={cn(isShortlisted && "fill-brand-teal text-brand-teal")} />
                           </button>
                        </div>
                        
                        <div className="space-y-4 text-left relative z-10">
                           <p className="text-zinc-400 text-xs line-clamp-2 font-light leading-relaxed">
                             {candidate.bio}
                           </p>
                           
                           <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-sans tracking-tight">
                             <MapPin size={11} className="text-brand-teal shrink-0" /> {candidate.location}
                           </div>
                           
                           <div className="pt-3 border-t border-zinc-900">
                             <span className="text-[8px] uppercase tracking-widest text-[#93c5fd] font-bold block mb-2 font-mono">Expertise Fit</span>
                             <div className="flex flex-wrap gap-1.5">
                               {candidate.skills.slice(0, 3).map(skill => (
                                 <span key={skill} className="text-[10px] px-2 py-0.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded font-mono">
                                   {skill}
                                 </span>
                               ))}
                               {candidate.skills.length > 3 && (
                                 <span className="text-[9px] px-1.5 py-0.5 border border-transparent text-zinc-500 font-mono">
                                   +{candidate.skills.length - 3}
                                 </span>
                               )}
                             </div>
                           </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          ))}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-light text-white mb-2">Display Preferences</h2>
                <p className="text-zinc-400 font-light text-sm">
                  Customize the density and sizing of your portal dashboard to accommodate your workflow requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg text-white font-medium mb-4">Layout Density</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setPreferences(prev => ({ ...prev, density: 'comfortable' }))}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl border transition-colors",
                        preferences.density === 'comfortable' ? "bg-white/10 border-white text-white" : "bg-[#0a0a0a] border-gray-800 text-zinc-400 hover:border-gray-600"
                      )}
                    >
                      <span className="font-medium">Comfortable</span>
                      {preferences.density === 'comfortable' && <CheckCircle2 size={16} className="text-brand-teal" />}
                    </button>
                    <button 
                      onClick={() => setPreferences(prev => ({ ...prev, density: 'compact' }))}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl border transition-colors",
                        preferences.density === 'compact' ? "bg-white/10 border-white text-white" : "bg-[#0a0a0a] border-gray-800 text-zinc-400 hover:border-gray-600"
                      )}
                    >
                      <span className="font-medium">Compact</span>
                      {preferences.density === 'compact' && <CheckCircle2 size={16} className="text-brand-teal" />}
                    </button>
                  </div>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg text-white font-medium mb-4">Typography Sizing</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setPreferences(prev => ({ ...prev, fontSize: 'normal' }))}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl border transition-colors",
                        preferences.fontSize === 'normal' ? "bg-white/10 border-white text-white" : "bg-[#0a0a0a] border-gray-800 text-zinc-400 hover:border-gray-600"
                      )}
                    >
                      <span className="font-medium">Standard</span>
                      {preferences.fontSize === 'normal' && <CheckCircle2 size={16} className="text-brand-teal" />}
                    </button>
                    <button 
                      onClick={() => setPreferences(prev => ({ ...prev, fontSize: 'large' }))}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl border transition-colors",
                        preferences.fontSize === 'large' ? "bg-white/10 border-white text-white" : "bg-[#0a0a0a] border-gray-800 text-zinc-400 hover:border-gray-600"
                      )}
                    >
                      <span className="font-medium text-lg">Increased Legibility</span>
                      {preferences.fontSize === 'large' && <CheckCircle2 size={16} className="text-brand-teal" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* COMPLIANCE & ATS INTEGRATION ENGINE TAB */}
          {activeTab === 'compliance' && (
            <motion.div
              key="compliance"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 w-full"
            >
              {/* Header Zone */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-light text-white mb-2">Compliance Hub & Integration Engine</h2>
                  <p className="text-zinc-400 font-light text-sm max-w-xl">
                    Deploy native integrations to corporate ATS pipelines, export formatted records for Department of Employment and Labour site audits, and simulate B-BBEE points.
                  </p>
                </div>
                
                {/* Export button */}
                <button 
                  onClick={() => {
                    // Generate actual CSV content
                    const headers = [
                      "Employer_EE_No",
                      "EEA2_Section",
                      "Job_Category_Code",
                      "Race_Gender_Code",
                      "Disability_Accommodated",
                      "Province_Code",
                      "Staff_Count",
                      "Annual_Salary_Bracket"
                    ];
                    
                    const rows = [
                      ["EE198273", "Section C", "01 - Senior Management", "A-M", "Yes - Wheelchair Ingress", "WC", "1", "R850k-1M"],
                      ["EE198273", "Section C", "02 - Professionally Qualified", "I-F", "Yes - Screen Reader Compatible", "GP", "2", "R600k-850k"],
                      ["EE198273", "Section C", "03 - Skilled Technical", "C-M", "Yes - Visual Fire Alarms", "KZN", "1", "R450k-600k"],
                      ["EE198273", "Section D", "04 - Semi-Skilled", "A-F", "Yes - Quiet Workspace Policy", "WC", "3", "R250k-450k"],
                    ];

                    const csvContent = "data:text/csv;charset=utf-8," 
                      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
                      
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "DEL_EE_Online_Disability_Bulk_Upload_EEA2_EE4.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setAriaStatus("South African Department of Employment and Labour EE Online CSV bulk-upload package exported successfully.");
                  }}
                  className="px-5 py-3.5 bg-brand-teal hover:bg-white text-slate-950 text-xs uppercase tracking-widest font-mono font-bold rounded-xl transition-all duration-300 self-start md:self-center flex items-center gap-2 cursor-pointer shrink-0 shadow-lg"
                >
                  <FileText size={14} /> Export EE Online Package (CSV)
                </button>
              </div>

              {/* B-BBEE SCORECARD SIMULATOR */}
              <div className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-teal/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="max-w-xl mb-8">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-teal/10 border border-brand-teal/30 text-brand-teal text-[9px] font-mono uppercase rounded mb-3">
                    Scorecard Estimator
                  </span>
                  <h3 className="text-lg font-medium text-white">SA B-BBEE Scorecard Point Simulator</h3>
                  <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
                    Under the South African Amended B-BBEE Codes of Good Practice, sponsorships specifically addressing accommodations and targeted disabled learning placements (Category B & C) unlock up to <b>12 points</b> under Skills Development, and <b>5 points</b> under Socio-Economic Development (SED).
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Left Column: Interactive parameters */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Skills Development spending range */}
                    <div className="space-y-3 bg-zinc-950/40 p-4 border border-zinc-900 rounded-2xl">
                      <div className="flex justify-between items-center">
                        <label htmlFor="bb-skills-dev-slider" className="text-xs font-bold text-white uppercase tracking-wider">
                          Skills Development Funding spending (Disabled Categories B & C)
                        </label>
                        <span className="font-mono text-brand-teal text-xs font-semibold bg-brand-teal/10 border border-brand-teal/20 px-2 py-0.5 rounded">
                          R {(skillsDevFunding).toLocaleString()}
                        </span>
                      </div>
                      <input 
                        id="bb-skills-dev-slider"
                        type="range"
                        min="0"
                        max="500000"
                        step="25000"
                        value={skillsDevFunding}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSkillsDevFunding(val);
                          setAriaStatus(`Skills development funding adjusted to R${val.toLocaleString()}. Simulated points: ${Math.min(12, (val / 250000) * 12).toFixed(1)}`);
                        }}
                        className="w-full accent-brand-teal cursor-pointer"
                        aria-valuemin={0}
                        aria-valuemax={500000}
                        aria-valuenow={skillsDevFunding}
                        aria-valuetext={`R ${skillsDevFunding} skills dev spend`}
                      />
                      <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                        <span>R 0</span>
                        <span>R 150,000 (Target standard)</span>
                        <span>R 500,000+</span>
                      </div>
                    </div>

                    {/* Socio-Economic Development spend */}
                    <div className="space-y-3 bg-zinc-950/40 p-4 border border-zinc-900 rounded-2xl">
                      <div className="flex justify-between items-center">
                        <label htmlFor="bb-sed-slider" className="text-xs font-bold text-white uppercase tracking-wider">
                          Socio-Economic Development (SED) / Procurement Contribution
                        </label>
                        <span className="font-mono text-brand-teal text-xs font-semibold bg-brand-teal/10 border border-brand-teal/20 px-2 py-0.5 rounded">
                          R {(procurementSpend).toLocaleString()}
                        </span>
                      </div>
                      <input 
                        id="bb-sed-slider"
                        type="range"
                        min="0"
                        max="200000"
                        step="10000"
                        value={procurementSpend}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setProcurementSpend(val);
                          setAriaStatus(`Socio-Economic recruitment spend adjusted to R${val.toLocaleString()}. Simulated points: ${Math.min(5, (val / 100000) * 5).toFixed(1)}`);
                        }}
                        className="w-full accent-brand-teal cursor-pointer"
                        aria-valuemin={0}
                        aria-valuemax={200000}
                        aria-valuenow={procurementSpend}
                        aria-valuetext={`R ${procurementSpend} procurement spend`}
                      />
                      <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                        <span>R 0</span>
                        <span>R 80,000 (Compliant threshold)</span>
                        <span>R 200,000+</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visualizer panel of total points */}
                  <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-6 text-center space-y-4" aria-live="polite" aria-atomic="true">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">Simulated Score Breakdown</span>
                    
                    <div className="space-y-1">
                      <div className="text-5xl md:text-6xl font-display font-light text-brand-teal tracking-tight">
                        {(Math.min(12, (skillsDevFunding / 250000) * 12) + Math.min(5, (procurementSpend / 100000) * 5)).toFixed(1)}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wide">Total Earned B-BBEE Points</span>
                    </div>

                    <div className="pt-4 border-t border-gray-800 text-left text-xs space-y-2 text-zinc-300">
                      <div className="flex justify-between">
                        <span className="font-light">Skills Development (Cat. B/C):</span>
                        <span className="font-mono font-bold text-white">{Math.min(12, (skillsDevFunding / 250000) * 12).toFixed(1)} / 12.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-light">Socio-Economic Development (SED):</span>
                        <span className="font-mono font-bold text-white">{Math.min(5, (procurementSpend / 100000) * 5).toFixed(1)} / 5.0</span>
                      </div>
                      <div className="pt-2 border-t border-gray-800/50 text-[10px] text-zinc-500 leading-normal font-light">
                        *By securing compliance with Virtuabled placements, you unlock crucial procurement thresholds allowing access to Tier 1 government tender panels.
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* GOOGLE SHEETS LIVE INTEGRATION ENGINE */}
              <SheetsSyncWidget showToast={showToast} />

              {/* ATS ENTERPRISE CONNECTOR HUB */}
              <div className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-6 md:p-8 relative">
                <div className="max-w-xl mb-8">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-mono uppercase rounded mb-3">
                    Integration Preview
                  </span>
                  <h3 className="text-lg font-medium text-white">Corporate ATS Integration Preview</h3>
                  <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
                    A preview of how approved, vetted candidate pools would sync into your systems of record. This is a simulated connector — no external system is contacted.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Left panel Config Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="ats-platform-select" className="text-[10px] font-bold text-white uppercase tracking-widest block">ATS Provider</label>
                        <select 
                          id="ats-platform-select"
                          value={selectedATS}
                          onChange={(e) => setSelectedATS(e.target.value as any)}
                          className="w-full bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-brand-teal"
                        >
                          <option value="greenhouse font-sans">Greenhouse ATS</option>
                          <option value="workday">Workday Recruiting</option>
                          <option value="successfactors">SAP SuccessFactors</option>
                          <option value="lever">Lever Pipeline</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="ats-subdomain-input" className="text-[10px] font-bold text-white uppercase tracking-widest block">Tenant Domain</label>
                        <input 
                          id="ats-subdomain-input"
                          type="text" 
                          value={atsSubdomain}
                          onChange={(e) => setAtsSubdomain(e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-brand-teal font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="ats-apikey-input" className="text-[10px] font-bold text-white uppercase tracking-widest block">API Authentication Key / Credentials</label>
                      <input 
                        id="ats-apikey-input"
                        type="password" 
                        value={atsApiKey}
                        onChange={(e) => setAtsApiKey(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-brand-teal font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
                      <div>
                        <span className="text-xs font-medium text-white block">Automatic Live Candidate Sync</span>
                        <span className="text-[10px] text-zinc-500 font-light block">Sync immediately when candidates match accommodation milestones</span>
                      </div>
                      <button 
                        onClick={() => setAtsAutoSync(!atsAutoSync)}
                        className={`w-10 h-6 rounded-full transition-colors relative border ${atsAutoSync ? 'bg-brand-teal border-brand-teal' : 'bg-transparent border-gray-600'}`}
                      >
                        <span className={`absolute top-0.5 w-4 font-bold h-4 rounded-full bg-white transition-all ${atsAutoSync ? 'left-5' : 'left-0.5'}`} />
                      </button>
                    </div>

                    <button 
                      onClick={() => {
                        setIsSyncing(true);
                        setAtsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Triggered manual bulk candidate synchronization...`]);
                        
                        setTimeout(() => {
                          setAtsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Secure TLS connection handshake established with: ${selectedATS.toUpperCase()} / production.`]);
                        }, 800);
                        setTimeout(() => {
                          setAtsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Mapping accommodations schemas: Physical Ingress -> Target Accommodations fields.`]);
                        }, 1600);
                        setTimeout(() => {
                          setAtsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Sync Successful: Mapped 'Sarah Botha' -> Candidate WD-${Math.floor(100000 + Math.random() * 900000)}.`]);
                        }, 2400);
                        setTimeout(() => {
                          setAtsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Sync Successful: Mapped 'Mandla Nkosi' -> Candidate WD-${Math.floor(100000 + Math.random() * 900000)}.`]);
                        }, 3200);
                        setTimeout(() => {
                          setAtsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Database Sync complete. Mapped records successfully loaded inside corporate software.`]);
                          setIsSyncing(false);
                          setAriaStatus("Corporate applicant tracking system candidates sync process finished successfully.");
                        }, 4000);
                      }}
                      disabled={isSyncing}
                      className={`w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                        isSyncing ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-xl'
                      }`}
                    >
                      {isSyncing ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" /> Synchronizing Pipelines...
                        </>
                      ) : (
                        <>
                          <RefreshCw size={14} /> Synchronize Matched Candidates Now
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right panel: Log console terminal */}
                  <div className="bg-black/80 border border-gray-800 rounded-2xl p-4 flex flex-col h-[280px]">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Secure Socket System Logs</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-teal inline-block animate-ping" />
                    </div>
                    
                    <div className="flex-1 overflow-y-auto font-mono text-[10px] text-zinc-400 space-y-2 leading-relaxed pr-1 select-none whitespace-pre-wrap text-left">
                      {atsLogs.map((log, idx) => (
                        <div key={idx} className={log.includes("Success") ? "text-brand-teal" : log.includes("Triggered") ? "text-white font-semibold" : "text-zinc-500"}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* Candidate Detailed Review & Intro streams Overlay */}
          <AnimatePresence>
            {selectedCandidate && (
              <CandidateDetailModal 
                candidate={selectedCandidate}
                isShortlisted={shortlistedIds.includes(selectedCandidate.id)}
                onToggleShortlist={() => {
                  const already = shortlistedIds.includes(selectedCandidate.id);
                  setShortlistedIds(prev => 
                    already 
                      ? prev.filter(id => id !== selectedCandidate.id) 
                      : [...prev, selectedCandidate.id]
                  );
                  showToast(
                    already ? "Removed from Shortlist" : "Vanguard Saved",
                    already ? "info" : "success",
                    `${selectedCandidate.name} updated in your pipeline portfolio.`
                  );
                }}
                onClose={() => setSelectedCandidate(null)}
              />
            )}
          </AnimatePresence>

        </AnimatePresence>
      </div>
    </div>
  );
}
