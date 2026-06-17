import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Milestone, HelpCircle, FileText, Send, CheckCircle2, AlertCircle, 
  ChevronRight, ChevronDown, ChevronUp, Briefcase, Clock, 
  Laptop, ShieldAlert, Check, Plus, Headphones, Keyboard, 
  MapPin, Eye, ExternalLink, Calendar, Search, Heart, MessageSquare,
  Bell, Trash2, X, Award, Lock, Layers, PenTool, Download, UploadCloud
} from "lucide-react";
import { useToast } from "@/components/shared/Toast";
import { useLocalStore, type ApplicationRecord } from "@/utils/localStore";
import { getBlobURL } from "@/utils/mediaStore";
import elmarieAvatar from "@/assets/images/elmarie_avatar_1780826165738.png";

/** A submitted-application card showing the candidate's photo + playable intro video. */
function ApplicationCard({ app }: { app: ApplicationRecord }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const playVideo = async () => {
    if (videoUrl || !app.videoBlobId) return;
    setLoading(true);
    try {
      const url = await getBlobURL(app.videoBlobId);
      setVideoUrl(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-brand-teal/30 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-900 border border-zinc-700 shrink-0 flex items-center justify-center">
          {app.photoDataUrl ? (
            <img src={app.photoDataUrl} alt={app.fullName || "Profile"} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[11px] font-mono text-zinc-500">{(app.fullName || "?").charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className="text-[10px] font-mono font-bold text-brand-teal bg-brand-teal/10 border border-brand-teal/20 px-2 py-0.5 rounded">{app.id}</span>
            <span className="text-[10px] font-mono text-zinc-500">{new Date(app.submittedAt).toLocaleDateString()}</span>
          </div>
          <div className="text-sm text-white font-medium">{app.role || "Role not specified"}</div>
          {app.fullName && <div className="text-xs text-zinc-400 font-light">{app.fullName}</div>}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{app.status}</span>
            {app.videoRecorded && app.videoBlobId && !videoUrl && (
              <button
                type="button"
                onClick={playVideo}
                className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
              >
                {loading ? "Loading…" : `▶ Play intro · ${app.videoDurationSec ?? 0}s`}
              </button>
            )}
            {app.videoRecorded && !app.videoBlobId && (
              <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                Video intro · {app.videoDurationSec ?? 0}s
              </span>
            )}
          </div>
        </div>
      </div>
      {videoUrl && (
        <video src={videoUrl} controls autoPlay playsInline className="w-full mt-3 rounded-xl border border-zinc-800" />
      )}
    </div>
  );
}

// Placement Stage Type
export type PlacementStage = "interviewing" | "onboarding" | "active";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  description: string;
  accessibilityNeed: string;
  status: "Open" | "In Review" | "SLA Resolved" | "Assigned";
  slaTime: string;
  createdAt: string;
}

const ACCESSIBILITY_DOCS = [
  {
    id: "reader_config",
    title: "VDI Screen Reader Tuning (NVDA & JAWS)",
    category: "Software Overlays",
    short: "Optimize speech latency and word pronunciation tables on virtual desktop infrastructures.",
    content: `When working inside Virtuabled's sandboxed virtual desktop interfaces (VDI), standard screen reader output might experience minor audio rendering lag depending on regional packet routing. 

To achieve optimal 0ms response latency, execute these configurations:
1. Under VDI Options, set Audio Transmission Codec to "High Fidelity (PCM Linear)".
2. In NVDA Settings -> Speech, change the Synthesizer output rate to matched 16-bit 44.1kHz.
3. Pronunciation Override Table: For compiled terminals, map the special character "#" to word "hash" and "_" to "underscore" to boost read speeds by up to 22%.
4. Turn off standard layout formatting descriptions during live backend debugging sessions to minimize word clutter.`
  },
  {
    id: "speech_nav",
    title: "Voice-to-Text & Hands-Free Navigation in Linux",
    category: "Developer Environment",
    short: "Deploy open-source voice interfaces for keyboardless bash execution and VS Code orchestration.",
    content: `For developers navigating systemic physical boundaries, we support direct Linux Bash control via custom voice configurations:
1. Initialize the Talon Voice or Whisper-local dictation script loaded on your Virtuabled safe-sandbox router.
2. High-Frequency Shortcuts: Speak words like "slurp" to highlight block scopes or "zap" to drop execution threads.
3. VS Code Customizations: Install the "Voice Navigation" extension bundle pre-routed in your profile packages to support voice-activated line jumps, file searches, and breakpoint toggles.
4. Ensure your high-accuracy directional boundary microphone is positioned exactly 5cm below your chin at a 45-degree angle to filter out laptop fan noise.`
  },
  {
    id: "accommodation_rights",
    title: "Reasonable Accommodation — Your Rights & How to Request",
    category: "Candidate Rights",
    short: "What reasonable accommodation means under the EEA and how to raise a request with your employer.",
    content: `Under the Employment Equity Act (No. 55 of 1998, Section 15), designated employers are required to make reasonable accommodation for employees with disabilities.

What this means in practice:
1. Reasonable Accommodation: Adjustments to the work environment or job duties that allow a qualified person with a disability to perform the job. The employer pays for these — not Virtuabled.
2. How to Request: Raise a request with your line manager or HR in writing. Be specific about what you need and why it supports your ability to do the job.
3. Undue Hardship: Employers may decline only if the accommodation would impose disproportionate cost or operational disruption. This is a high bar.
4. Your Virtuabled contact can advise on how to frame a request and what's reasonable for your role and sector.`
  },
  {
    id: "sensory_friendly",
    title: "Neurodivergent Workspace Adaptability Guides",
    category: "Sanctuary Design",
    short: "Sensory guidelines for quiet zone allocations, customized schedules, and visual focus shields.",
    content: `To accommodate different processing styles, our remote and physical environments support extensive customization:
1. Low-Stimulus Virtual Desk: Apply our dark dark-room CSS config that mutes bright fluorescent color palettes and disables unnecessary sliding UI animations.
2. Sensory Workspace Setup: If working on-premise, your dashboard highlights approved Quiet Sanctuary Rooms fitted with noise-canceling acoustics and low-frequency LED setups.
3. Asynchronous Meeting Protocol: Request transcripts for any video sessions automatically. Our platform converts live meeting frames into written Markdown summaries with key actionable takeaways highlighted on your profile page.`
  }
];

export function CandidateDashboard() {
  const { showToast } = useToast();
  const [applications] = useLocalStore<ApplicationRecord[]>("virtuabled_applications", []);
  const [activeStage, setActiveStage] = useState<PlacementStage>("interviewing");
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [docSearch, setDocSearch] = useState("");

  // 1. Unified Real-time Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: "ntf-1",
      title: "Urgent Action Required",
      text: "Please sign your Permanent Placement Contract in the Document Locker to finalize your Senior Analytics Architect position.",
      type: "urgent" as const,
      read: false,
      date: "10 mins ago"
    },
    {
      id: "ntf-2",
      title: "Role Match Ready",
      text: "Your profile has been matched to 3 open roles. Review your shortlist in the Opportunities tab and confirm your preferred start date.",
      type: "success" as const,
      read: false,
      date: "3 hours ago"
    },
    {
      id: "ntf-3",
      title: "VDI Sandbox Credentials Ready",
      text: "Cape Town hub isolated cloud container provisioned successfully. Terminal security credentials can be previewed in step 4.",
      type: "info" as const,
      read: true,
      date: "Yesterday"
    },
    {
      id: "ntf-4",
      title: "Interview Request Received",
      text: "Johannesburg Corporate Syndicate booked discussion slot on 15 June with live speech-to-text translators.",
      type: "warning" as const,
      read: true,
      date: "2 days ago"
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // 2. Comprehensive Chronological Activity Feed State
  const [activities, setActivities] = useState<{ id: string; title: string; category: string; description: string; time: string; status: string }[]>([
    {
      id: "act-1",
      title: "Comprehensive Profile Synced",
      category: "Profile" as const,
      description: "Speech and visual accessibility preferences mapped to South Africa National Treasury database.",
      time: "Today, 10:15 AM",
      status: "completed" as const
    },
    {
      id: "act-2",
      title: "VDI Sandbox Latency Calibrated",
      category: "System" as const,
      description: "0ms local NVDA synthetic override tables successfully set in secure container environment.",
      time: "Today, 08:00 AM",
      status: "completed" as const
    },
    {
      id: "act-3",
      title: "CV Reviewed & Skills Verified",
      category: "Profile" as const,
      description: "Your CV and skills have been reviewed. Three role matches identified — shortlist sent to matched employers.",
      time: "Yesterday, 04:30 PM",
      status: "completed" as const
    },
    {
      id: "act-4",
      title: "Permanent Employment Contract Staged",
      category: "Document" as const,
      description: "Senior Analytics Architect contract pushed to secure Document Locker. Pending electronic sign-off.",
      time: "Yesterday, 11:20 AM",
      status: "in_progress" as const
    },
    {
      id: "act-5",
      title: "Tier-1 Technical Competency Match",
      category: "Interview" as const,
      description: "Passed automated baseline audit with 96% accessibility scoring metric.",
      time: "3 days ago",
      status: "completed" as const
    }
  ]);

  // 3. Skill Verification Module State & Form State
  const [skills, setSkills] = useState([
    {
      id: "skl-1",
      name: "NVDA & JAWS screen readers (VDI latency optimized)",
      category: "Assistive Tech",
      proficiency: "Expert",
      status: "Verified",
      verifier: "South African Braille Board Approval (ID: VER-7019)",
      date: "Approved 2026-03-12"
    },
    {
      id: "skl-2",
      name: "Talon Voice Navigation Custom Command Sets",
      category: "Hands-Free Software",
      proficiency: "Expert",
      status: "Verified",
      verifier: "Disability Resource Center Certification",
      date: "Approved 2026-04-05"
    },
    {
      id: "skl-3",
      name: "Microsoft 365 — Excel, Word, Teams",
      category: "Productivity",
      proficiency: "Advanced",
      status: "Verified",
      verifier: "Microsoft Certification",
      date: "Approved 2026-05-20"
    }
  ]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCat, setNewSkillCat] = useState("Assistive Tech");
  const [newSkillProf, setNewSkillProf] = useState("Advanced");
  const [newSkillProofFileName, setNewSkillProofFileName] = useState("");
  const [skillSubmitting, setSkillSubmitting] = useState(false);

  // 4. Secure Document Locker Component State
  const [contracts, setContracts] = useState([
    {
      id: "doc-01",
      title: "SA Employment Equity (EE) Consent & B-BBEE Annexure",
      type: "Compliance Agreement",
      date: "2026-06-08",
      status: "Signed & Certified",
      signer: "John Doe (Verified via Digicert)",
      signDate: "2026-06-08, 02:44 PM",
      fileUrl: "B-BBEE_Disclosure_EE_Signed.pdf",
      textPreview: ""
    },
    {
      id: "doc-02",
      title: "Candidate Placement & Retention Agreement",
      type: "Placement Agreement",
      date: "2026-06-09",
      status: "Signed & Certified",
      signer: "John Doe (Verified via Digicert)",
      signDate: "2026-06-09, 10:15 AM",
      fileUrl: "Placement_Retention_Agreement_Signed.pdf",
      textPreview: ""
    },
    {
      id: "doc-03",
      title: "Senior Analytics Architect Permanent Placement Agreement",
      type: "Permanent Placement Contract",
      date: "2026-06-10",
      status: "Pending Signature",
      signer: null as string | null,
      signDate: null as string | null,
      fileUrl: "Senior_Analytics_Architect_Placement_Draft.pdf",
      textPreview: `This Permanent Employment Placement Agreement is entered into by and between Virtuabled Enterprise Portal (Pty) Ltd, acting on behalf of the employer partner (the "Employer") and the candidate (the "Employee").

1. POSITION
The Employee shall hold the position of Senior Analytics Architect.
Start date, reporting line, and remote/on-site arrangement to be confirmed at offer stage.

2. COMPENSATION & B-BBEE COMPLIANCE
Basic salary and South Africa Employment Equity (EE) targets will be fully documented. The Employee's placement counts toward the employer's Section 15 EE plan disability target (3%, effective 1 Sep 2025 – 31 Aug 2030).

3. REASONABLE ACCOMMODATION
Any reasonable accommodation required by the Employee must be arranged directly between the Employee and the Employer in accordance with the Employment Equity Act No. 55 of 1998. Virtuabled will advise where requested but does not procure or supply equipment on behalf of either party.`
    }
  ]);
  const [signingDocId, setSigningDocId] = useState<string | null>(null);
  const [signerFullName, setSignerFullName] = useState("");
  const [consentCheck, setConsentCheck] = useState(false);
  const [typedSignStyle, setTypedSignStyle] = useState<"standard" | "fancy" | "slant">("fancy");
  const [isSigningLive, setIsSigningLive] = useState(false);

  // Calendar, training blocking, and workshop states
  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: "cal-ev-1",
      title: "Interview availability: Morning Slots",
      date: "2026-06-12",
      time: "09:00 - 12:00",
      type: "Availability",
      status: "Active",
      description: "Marked as ready for virtual meetings with screen-reader captioning overrides"
    },
    {
      id: "cal-ev-2",
      title: "Skills Focus: Hands-Free Linux Workflow Calibration",
      date: "2026-06-15",
      time: "14:00 - 15:30",
      type: "Training Block",
      status: "Scheduled",
      description: "Quiet focus slot allocated for mastering local Talon voice scripts"
    },
    {
      id: "cal-ev-3",
      title: "Enterprise Seminar: Inclusive remote-first careers in SA",
      date: "2026-06-18",
      time: "10:00 - 11:30",
      type: "Workshop",
      status: "Registered",
      description: "Fireside discussion on corporate remote cells with Eugene Hefer"
    }
  ]);

  const [availableWorkshops, setAvailableWorkshops] = useState([
    {
      id: "wk-1",
      title: "Advanced WAI-ARIA Screen Reader Tuning (NVDA/JAWS)",
      date: "2026-06-20",
      time: "11:00 - 12:30",
      instructor: "Eugene Hefer",
      registered: false
    },
    {
      id: "wk-2",
      title: "Mental Wellbeing in Remote Workspaces & Sensory Focus",
      date: "2026-06-22",
      time: "15:00 - 16:00",
      instructor: "Siphokazi Nkosi (Occupational Therapist)",
      registered: false
    },
    {
      id: "wk-3",
      title: "SA Labor Legislation & Disability Capital Allowances",
      date: "2026-06-25",
      time: "10:00 - 11:30",
      instructor: "Virtuabled Compliance Desk",
      registered: false
    }
  ]);

  const [newCalTitle, setNewCalTitle] = useState("");
  const [newCalDate, setNewCalDate] = useState("");
  const [newCalTime, setNewCalTime] = useState("");
  const [newCalType, setNewCalType] = useState("Availability");
  const [newCalDesc, setNewCalDesc] = useState("");
  
  // Simulated support tickets state
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TKT-3104",
      subject: "VDI Screen Reader Lag Calibration",
      category: "Software Overlays",
      description: "Speech output is laggy (estimated 150ms delay) when typing in the cloud terminal.",
      accessibilityNeed: "Requires JAWS VDI optimization settings",
      status: "In Review",
      slaTime: "Estimated resolution: 18 mins",
      createdAt: "Today, 09:30 AM"
    },
    {
      id: "TKT-2980",
      subject: "Ergonomic Desk Delivery Schedule",
      category: "Hardware Logistics",
      description: "Requesting tracking details for the motorized sit-stand desk designated for Johannesburg site.",
      accessibilityNeed: "Spinal support physical setup",
      status: "Assigned",
      slaTime: "Estimated resolution: 1 hour",
      createdAt: "Yesterday"
    }
  ]);

  // Support ticket form state
  const [subj, setSubj] = useState("");
  const [cat, setCat] = useState("Software Overlays");
  const [desc, setDesc] = useState("");
  const [accNeed, setAccNeed] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subj.trim() || !desc.trim()) {
      showToast("Validation Error", "error", "Please provide a subject and description.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newTicket: SupportTicket = {
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: subj,
        category: cat,
        description: desc,
        accessibilityNeed: accNeed || "Standard Support Trigger",
        status: "Open",
        slaTime: "SLA Queue: Engineer reviewing in 15 mins",
        createdAt: "Just now"
      };

      setTickets(prev => [newTicket, ...prev]);

      // Append to activities feed!
      setActivities(prev => [{
        id: `act-tkt-${Date.now()}`,
        title: `Ticket Filed: ${newTicket.id}`,
        category: "System" as const,
        description: `Disability desk friction logged: "${subj}" under category "${cat}".`,
        time: "Just now",
        status: "in_progress" as const
      }, ...prev]);

      // Add to notifications!
      setNotifications(prev => [{
        id: `ntf-tkt-${Date.now()}`,
        title: "Disability Ticket Pipeline Active",
        text: `Urgent ticket ${newTicket.id} with subject "${subj}" transmitted to SLA expert groups.`,
        type: "warning" as const,
        read: false,
        date: "Just now"
      }, ...prev]);

      setIsSubmitting(false);
      setSubj("");
      setDesc("");
      setAccNeed("");
      showToast(
        "Support Ticket Raised",
        "success",
        `Ticket ${newTicket.id} received. Our accessibility specialists will engage within 15 minutes.`
      );
    }, 1200);
  };

  const handleVerifySkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) {
      showToast("Validation Error", "error", "Please provide a skill, proficiency level or certification name.");
      return;
    }
    setSkillSubmitting(true);
    setTimeout(() => {
      const newSkill = {
        id: `skl-${Math.floor(1000 + Math.random() * 9000)}`,
        name: newSkillName,
        category: newSkillCat,
        proficiency: newSkillProf,
        status: "Pending Audit",
        verifier: "Virtuabled Verification SLA (Pending Audit)",
        date: "Submitted just now"
      };
      setSkills(prev => [newSkill, ...prev]);
      
      // Append to activities feed!
      const newAct = {
        id: `act-skl-${Date.now()}`,
        title: "Professional Certification Logged",
        category: "Profile" as const,
        description: `Lodged proficiency level "${newSkillProf}" for "${newSkillName}" with virtual proof attachments.`,
        time: "Just now",
        status: "in_progress" as const
      };
      setActivities(prev => [newAct, ...prev]);

      // Add to notifications!
      const newNtf = {
        id: `ntf-skl-${Date.now()}`,
        title: "Skill Verification Enqueued",
        text: `Your proficiency verification request for "${newSkillName}" was logged for priority specialist assessment.`,
        type: "success" as const,
        read: false,
        date: "Just now"
      };
      setNotifications(prev => [newNtf, ...prev]);

      setSkillSubmitting(false);
      setNewSkillName("");
      setNewSkillProofFileName("");
      showToast("Skill Successfully Added", "success", "Your certification record has been queued for validation.");
    }, 1200);
  };

  const handleRegisterWorkshop = (workshopId: string) => {
    setAvailableWorkshops(prev => prev.map(w => {
      if (w.id === workshopId) {
        if (w.registered) return w;
        
        // Append to calendar events
        const newEvent = {
          id: `cal-ev-wk-${Date.now()}`,
          title: `Workshop: ${w.title}`,
          date: w.date,
          time: w.time,
          type: "Workshop",
          status: "Registered",
          description: `Led by ${w.instructor}`
        };
        setCalendarEvents(c => [...c, newEvent]);

        // Append to activity feed
        const newAct = {
          id: `act-wk-${Date.now()}`,
          title: "Workshop Registered",
          category: "Profile" as const,
          description: `Successfully booked "${w.title}" professional development workshop.`,
          time: "Just now",
          status: "completed" as const
        };
        setActivities(acts => [newAct, ...acts]);

        showToast("Workshop Registered", "success", `Successfully added "${w.title}" to your compliance calendar.`);
        return { ...w, registered: true };
      }
      return w;
    }));
  };

  const handleRemoveCalendarEvent = (eventId: string) => {
    setCalendarEvents(prev => prev.filter(e => e.id !== eventId));
    showToast("Event Deleted", "info", "Time block or availability removed from your workspace calendar.");
  };

  const handleCreateCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCalTitle || !newCalDate || !newCalTime) {
      showToast("Fields Missing", "warning", "Please provide a title, date, and time slot.");
      return;
    }

    const newEvent = {
      id: `cal-custom-${Date.now()}`,
      title: newCalTitle,
      date: newCalDate,
      time: newCalTime,
      type: newCalType,
      status: newCalType === "Availability" ? "Active" : "Scheduled",
      description: newCalDesc || "Custom scheduled time block logged successfully."
    };

    setCalendarEvents(prev => [...prev, newEvent]);

    // Append to activities
    const newAct = {
      id: `act-cal-${Date.now()}`,
      title: `${newCalType} Block Added`,
      category: "System" as const,
      description: `Logged custom ${newCalType.toLowerCase()} on ${newCalDate}.`,
      time: "Just now",
      status: "completed" as const
    };
    setActivities(acts => [newAct, ...acts]);

    // Reset Form state
    setNewCalTitle("");
    setNewCalDate("");
    setNewCalTime("");
    setNewCalDesc("");

    showToast("Calendar Synced", "success", "Custom professional schedule parameters logged.");
  };

  const handleExportPDF = () => {
    // Generate styled print contents
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      // Fallback text download
      const reportBody = `
========================================================================
VIRTUABLE SOUTH AFRICA - EMPLOYMENT EQUITY ACCREDITATION CERTIFICATE
========================================================================
Generated on: ${new Date().toISOString().split('T')[0]}
Candidate ID: VRT-CANDIDATE-901B
Status: Compliance Active
Regional Alignment: Cape Town Hub & National Treasury Database

------------------------------------------------------------------------
PART 1: VERIFIED ASSISTIVE CAPABILITIES & ACCREDITATIONS
------------------------------------------------------------------------
${skills.map((s, idx) => `${idx + 1}. [${s.status.toUpperCase()}] ${s.name}
   Category: ${s.category}
   Proficiency: ${s.proficiency}
   Audited By: ${s.verifier}
   Date: ${s.date}`).join('\n\n')}

------------------------------------------------------------------------
PART 2: CHRONOLOGICAL ACTIVITY AUDIT BUFFER
------------------------------------------------------------------------
${activities.map((a, idx) => `${idx + 1}. [${a.time}] ${a.title}
   Type: ${a.category} | Status: ${a.status.toUpperCase()}
   Description: ${a.description}`).join('\n\n')}

========================================================================
Verification Authority: Virtuabled Compliance Desk, Virtuabled SA
Copyright (c) ${new Date().getFullYear()} Virtuabled. All rights reserved.
========================================================================
`;
      const blob = new Blob([reportBody], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Virtuabled_EE_Compliance_Audit_Report.txt";
      link.click();
      showToast("Compliance Export Generated", "success", "Popup blocked, downloaded formatted text audit report.");
      return;
    }

    const skillsHtml = skills.map(s => `
      <div style="margin-bottom: 16px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 8px; background: #fafafa;">
        <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #14b8a6; font-family: monospace;">${s.category} &bull; ${s.status}</div>
        <div style="font-size: 14px; font-weight: bold; color: #18181b; margin-top: 4px;">${s.name}</div>
        <div style="font-size: 12px; color: #52525b; margin-top: 4px;">Proficiency: <strong>${s.proficiency}</strong></div>
        <div style="font-size: 11px; color: #71717a; font-family: monospace; margin-top: 4px;">Verifier: ${s.verifier} | ${s.date}</div>
      </div>
    `).join('');

    const activitiesHtml = activities.map(a => `
      <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #f4f4f5;">
        <table style="width: 100%;">
          <tr>
            <td style="font-size: 13px; font-weight: bold; color: #18181b;">${a.title}</td>
            <td style="text-align: right; font-size: 11px; color: #71717a; font-family: monospace;">${a.time}</td>
          </tr>
        </table>
        <div style="font-size: 12px; color: #52525b; margin-top: 4px;">${a.description}</div>
        <div style="display: inline-block; margin-top: 4px; font-size: 10px; font-family: monospace; padding: 2px 6px; background: #e0f2fe; color: #0369a1; border-radius: 4px; text-transform: uppercase; font-weight: bold;">${a.category}</div>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Employment Equity Compliance Certificate - Virtuabled</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #27272a; padding: 40px; background: #ffffff; line-height: 1.5; }
          .container { max-width: 800px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid #14b8a6; padding-bottom: 24px; margin-bottom: 30px; }
          .title { font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; text-transform: uppercase; margin: 0; }
          .subtitle { font-size: 14px; color: #52525b; margin-top: 8px; font-weight: 300; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #0f172a; border-bottom: 1px solid #e4e4e7; padding-bottom: 8px; margin-bottom: 16px; }
          .footer { margin-top: 60px; border-top: 1px solid #e4e4e7; padding-top: 20px; text-align: center; font-size: 11px; color: #71717a; line-height: 1.6; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">VIRTUABLE SOUTH AFRICA</h1>
            <div class="subtitle">Employment Equity Compliance & Assistive Competency Record</div>
            <div style="font-family: monospace; font-size: 11px; color: #71717a; margin-top: 12px;">Certificate Hash: SHA256-VRT-${Date.now()}-COMPLIANT</div>
          </div>
          
          <table style="width: 100%; margin-bottom: 30px; font-size: 13px; color: #3f3f46; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 150px;">Candidate Profile:</td>
              <td style="padding: 6px 0;">John Doe (VRT-CANDIDATE-901B)</td>
              <td style="padding: 6px 0; font-weight: bold; width: 120px; text-align: right;">Generated On:</td>
              <td style="padding: 6px 0; text-align: right;">${new Date().toISOString().split('T')[0]}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">EE Status:</td>
              <td style="padding: 6px 0; color: #14b8a6; font-weight: bold;">Verified Compliant Code 100</td>
              <td style="padding: 6px 0; font-weight: bold; text-align: right;">Sponsorship Node:</td>
              <td style="padding: 6px 0; text-align: right;">RSA Regional Sandbox</td>
            </tr>
          </table>

          <div>
            <h2 class="section-title">Verified Assistive Competencies</h2>
            ${skillsHtml}
          </div>

          <div style="margin-top: 30px;">
            <h2 class="section-title">Verified History & Action Logs</h2>
            ${activitiesHtml}
          </div>

          <div class="footer">
            <strong>Verification Authority:</strong> Virtuabled Compliance Desk, Virtuabled SA.<br>
            Validated against the Skills Development Act and B-BBEE target point compliance.<br>
            <em>South Africa's Disability Talent Network.</em>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
    showToast("PDF Print Panel Opened", "success", "Your printable Employment Equity portfolio is staging.");
  };

  const handleSignDocument = (docId: string) => {
    if (!signerFullName.trim()) {
      showToast("Validation Error", "error", "Please type your legal full name to digitally sign the document.");
      return;
    }
    if (!consentCheck) {
      showToast("Verification Checklist", "error", "Please agree to the B-BBEE verification consent and data transmission authorization.");
      return;
    }
    
    setIsSigningLive(true);
    setTimeout(() => {
      setContracts(prev => prev.map(doc => {
        if (doc.id === docId) {
          return {
            ...doc,
            status: "Signed & Certified",
            signer: `${signerFullName} (Verified via Secure Cloud Key)`,
            signDate: "Just now"
          };
        }
        return doc;
      }));

      // Find the document title
      const docObj = contracts.find(d => d.id === docId);

      // Append to activities feed!
      const newAct = {
        id: `act-sign-${Date.now()}`,
        title: "Document Executed",
        category: "Document" as const,
        description: `Successfully signed and recorded "${docObj?.title}" under secure compliance vaults.`,
        time: "Just now",
        status: "completed" as const
      };
      setActivities(prev => [newAct, ...prev]);

      // Add to notifications!
      const newNtf = {
        id: `ntf-sign-${Date.now()}`,
        title: "Compliance Document Secured",
        text: `"${docObj?.title}" was successfully signed using synthetic multi-factor cryptography.`,
        type: "success" as const,
        read: false,
        date: "Just now"
      };
      setNotifications(prev => [newNtf, ...prev]);

      setIsSigningLive(false);
      setSigningDocId(null);
      setSignerFullName("");
      setConsentCheck(false);
      showToast("Document Digitally Staged & Signed", "success", "Your placement agreement has been recorded, syncing point allocation parameters across partners.");
    }, 1500);
  };

  const handleActionClick = (actionName: string) => {
    showToast(
      "Action Triggered",
      "success",
      `Active tracker launched for: "${actionName}". Connecting sandbox services...`
    );
  };

  // Filter docs based on search
  const filteredDocs = ACCESSIBILITY_DOCS.filter(doc => 
    doc.title.toLowerCase().includes(docSearch.toLowerCase()) ||
    doc.short.toLowerCase().includes(docSearch.toLowerCase()) ||
    doc.category.toLowerCase().includes(docSearch.toLowerCase())
  );

  return (
    <div className="space-y-10 text-left" id="candidate-live-dashboard">

      {/* Dashboard Top Header & Real-time Notification Bell */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-zinc-900 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-white flex items-center gap-2">
            Workspace Command Slate
            <span className="text-xs font-mono px-2 py-0.5 border border-brand-teal/20 bg-brand-teal/5 text-brand-teal rounded font-bold uppercase tracking-wider">Active Secure Node</span>
          </h2>
          <p className="text-zinc-400 text-xs mt-1">Verify credentials, review document contracts, and monitor placement pipelines built for diverse structural abilities.</p>
        </div>

        {/* Real-time Notification Bell Toggle and Export Action */}
        <div className="relative self-stretch md:self-auto flex items-center justify-end gap-3">
          <button 
            onClick={handleExportPDF}
            className="cursor-pointer px-4 py-2.5 bg-zinc-955 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-850 hover:border-zinc-700 rounded-xl transition-all flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider"
            title="Export 'Activity Feed' and 'Skill Verification' history as a structured PDF"
          >
            <Download size={14} className="text-brand-teal" />
            Export Portfolio
          </button>

          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`cursor-pointer px-4 py-2.5 rounded-xl border transition-all text-zinc-300 hover:text-white flex items-center gap-2.5 ${showNotifications ? 'bg-zinc-900 border-brand-teal text-white shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'bg-zinc-955 border-zinc-850 hover:border-zinc-700'}`}
            title="Notification Center"
          >
            <div className="relative">
              <Bell size={18} className={notifications.filter(n => !n.read).length > 0 ? "animate-bounce" : ""} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse border border-zinc-950" />
              )}
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase">Alerts Center</span>
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {/* Floater dropdown: Fly-out alerts panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-[#090e18] border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50 text-left space-y-3.5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                    <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">Live Activity Warnings</h4>
                  </div>
                  <div className="flex gap-2 text-[10px] font-mono">
                    <button 
                      onClick={() => {
                        setNotifications(prev => prev.map(n => ({...n, read: true})));
                        showToast("All Notifications Read", "info", "Cleared alert counters.");
                      }}
                      className="text-zinc-400 hover:text-brand-teal transition-colors cursor-pointer"
                    >
                      Mark all read
                    </button>
                    <span className="text-zinc-800">|</span>
                    <button 
                      onClick={() => {
                        setNotifications([]);
                        showToast("Notifications Cleared", "info", "Notification layout is clean.");
                      }}
                      className="text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-zinc-500 text-xs font-mono">
                      Secure alert buffer is currently quiet.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`p-3 rounded-xl border text-xs transition-all relative group ${n.read ? 'bg-zinc-950/40 border-zinc-900 opacity-70' : 'bg-zinc-955 border-zinc-800 shadow-md'}`}
                      >
                        <div className="flex justify-between items-start gap-1 pb-1">
                          <span className="flex items-center gap-1.5 font-bold">
                            <span className={`w-1.5 h-1.5 rounded-full ${n.type === 'urgent' ? 'bg-rose-500' : n.type === 'warning' ? 'bg-amber-400' : n.type === 'success' ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                            <span className={`${n.type === 'urgent' ? 'text-rose-400 font-mono text-[10px] uppercase font-bold' : 'text-white font-mono text-[10px] uppercase font-semibold'}`}>{n.title}</span>
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500 shrink-0">{n.date}</span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-relaxed break-all">{n.text}</p>
                        
                        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900/50 mt-1">
                          {!n.read && (
                            <button
                              onClick={() => {
                                setNotifications(prev => prev.map(item => item.id === n.id ? {...item, read: true} : item));
                              }}
                              className="text-[9px] font-mono text-brand-teal hover:underline cursor-pointer"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setNotifications(prev => prev.filter(item => item.id !== n.id));
                            }}
                            className="text-[9px] font-mono text-zinc-500 hover:text-rose-400 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Simulation Stage Controller */}
      <div className="p-4 bg-[#080d19]/80 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-xs font-mono font-bold uppercase text-brand-teal tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" /> Live Tracker Controls
          </h4>
          <p className="text-zinc-400 text-[11px] mt-0.5">Toggle states to simulate your progress and view stage-specific workflows.</p>
        </div>
        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-805 w-full sm:w-auto">
          {(["interviewing", "onboarding", "active"] as const).map((stage) => (
            <button
              key={stage}
              onClick={() => {
                setActiveStage(stage);
                showToast(
                  "Dashboard Simulated",
                  "info",
                  `Now viewing workspace configurations for placement stage: "${stage.toUpperCase()}".`
                );
              }}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeStage === stage ? "bg-brand-teal text-[#050C1A] shadow-lg" : "text-zinc-500 hover:text-white"}`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8/12 spacing): Placement Status Widget & Milestone Progress */}
        <div className="lg:col-span-7 space-y-8">

          {/* MY SUBMITTED APPLICATIONS (persisted locally) */}
          <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <FileText size={16} className="text-brand-teal" />
                <h3 className="text-base font-display font-medium text-white tracking-tight">My Submitted Applications</h3>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{applications.length} on this device</span>
            </div>

            {applications.length === 0 ? (
              <p className="text-sm text-zinc-500 font-light leading-relaxed py-2">
                No applications submitted yet — use the <span className="text-brand-teal font-medium">Setup Wizard</span> tab to create your profile. It saves right here.
              </p>
            ) : (
              <div className="space-y-3">
                {applications.map(app => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
                <p className="text-[10px] text-zinc-600 font-mono pt-1">Stored locally on this device.</p>
              </div>
            )}
          </div>

          {/* HIGH-VISIBILTY PLACEMENT STATUS WIDGET */}
          <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient visual gradient based on stage */}
            {activeStage === "interviewing" && (
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            )}
            {activeStage === "onboarding" && (
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
            )}
            {activeStage === "active" && (
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5 mb-5">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] block font-bold">Current Placement Status</span>
                <div className="flex items-center gap-2.5 mt-1">
                  <h3 className="text-xl font-display font-medium text-white tracking-tight capitalize">
                    {activeStage === "interviewing" && "Executive Interview Match"}
                    {activeStage === "onboarding" && "Workspace Adaptation Onboarding"}
                    {activeStage === "active" && "Active Workspace Placement"}
                  </h3>
                  <span className={`inline-block w-2.5 h-2.5 rounded-full animate-ping ${activeStage === 'interviewing' ? 'bg-amber-400' : activeStage === 'onboarding' ? 'bg-violet-400' : 'bg-brand-teal'}`} />
                </div>
              </div>

              {/* Precise Status Badge */}
              <div className="px-3.5 py-1.5 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 select-none shrink-0"
                style={{
                  backgroundColor: activeStage === "interviewing" ? "rgba(245, 158, 11, 0.05)" : activeStage === "onboarding" ? "rgba(139, 92, 246, 0.05)" : "rgba(20, 184, 166, 0.05)",
                  borderColor: activeStage === "interviewing" ? "rgba(245, 158, 11, 0.2)" : activeStage === "onboarding" ? "rgba(139, 92, 246, 0.2)" : "rgba(20, 184, 166, 0.2)",
                  color: activeStage === "interviewing" ? "#f59e0b" : activeStage === "onboarding" ? "#a78bfa" : "#14b8a6"
                }}
              >
                <Briefcase size={12} />
                {activeStage === "interviewing" && "Interviewing Stage"}
                {activeStage === "onboarding" && "Onboarding & Adaptation"}
                {activeStage === "active" && "Active Placement Desk"}
              </div>
            </div>

            {/* Stage Description Context */}
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
              {activeStage === "interviewing" && (
                "Technical competency audits successfully passed. Your optimized accessibility requirements have been cross-referenced. You have 2 pending video discussions scheduled with Tier-1 corporate partners who comply fully with your physical/technical support needs."
              )}
              {activeStage === "onboarding" && (
                "Congratulations! Corporate match locked with Cape Town HQ regional hub. We are actively distributing your physical ergonomic equipment adjustments and staging your hardware-isolated remote cloud container. Next step is auditing the final connectivity."
              )}
              {activeStage === "active" && (
                "You are successfully placed as a Senior Analytics Architect. Your workspace accommodations are fully managed, and B-BBEE compliance point logs are synced directly to your account. Access our remote secure workspace below."
              )}
            </p>

            {/* Contextual Actionable Links */}
            <div>
              <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block font-bold mb-3">Actionable Workspaces / Links</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeStage === "interviewing" && (
                  <>
                    <button
                      onClick={() => handleActionClick("Launch Technical Mentor Prep")}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-750 transition-all text-xs text-white text-left font-mono group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Headphones size={15} className="text-amber-400" />
                        <span>Mock Interview Prep</span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-550 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleActionClick("Launch Adaptation Audit Simulator")}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-750 transition-all text-xs text-white text-left font-mono group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Keyboard size={15} className="text-amber-400" />
                        <span>Adaptation Simulator</span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-550 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}

                {activeStage === "onboarding" && (
                  <>
                    <button
                      onClick={() => handleActionClick("Verify Hardware Shipment")}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-750 transition-all text-xs text-white text-left font-mono group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Laptop size={15} className="text-violet-400" />
                        <span>Track Physical Shipments</span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-550 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleActionClick("Review Cloud Sandbox Connection")}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-750 transition-all text-xs text-white text-left font-mono group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldAlert size={15} className="text-violet-400" />
                        <span>VDI Security Sandbox</span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-550 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}

                {activeStage === "active" && (
                  <>
                    <button
                      onClick={() => handleActionClick("Secure Sandbox VDI Terminal")}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-brand-teal/5 to-transparent hover:from-brand-teal/10 hover:to-transparent border border-brand-teal/20 hover:border-brand-teal/40 transition-all text-xs text-white text-left font-mono group cursor-pointer shadow-[0_4px_16px_rgba(20,184,166,0.03)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Laptop size={15} className="text-brand-teal" />
                        <span className="font-bold text-brand-teal">Launch VDI Workspace</span>
                      </div>
                      <ExternalLink size={14} className="text-brand-teal font-bold" />
                    </button>

                    <button
                      onClick={() => handleActionClick("Compliance Point Logs")}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-750 transition-all text-xs text-white text-left font-mono group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={15} className="text-brand-teal" />
                        <span>B-BBEE Compliance Logs</span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-550 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* VISUAL CAREER MILESTONE PROGRESS BAR */}
          <div className="bg-[#0b0c13] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-lg text-white font-medium flex items-center gap-2">
                <Milestone size={18} className="text-brand-teal" />
                Career Milestone Progress
              </h3>
              <p className="text-zinc-400 text-xs font-light mt-1">Your real-time journey through onboarding, physical adaptations, and actual placements.</p>
            </div>

            {/* Milestone Path */}
            <div className="space-y-6 pl-2 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-850">
              
              {/* Milestone 1 */}
              <div className="flex gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-brand-teal/20 border border-brand-teal text-brand-teal flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-[0_0_12px_rgba(20,184,166,0.15)]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <div className="space-y-1 mt-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">1. Multimodal Profile Sync</h4>
                    <span className="text-[9px] bg-brand-teal/10 border border-brand-teal/20 text-brand-teal px-1.5 py-0.5 rounded font-mono uppercase font-bold">Done</span>
                  </div>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    Personal specifications, CV ingestion, and speech/visual accommodation profiles completely validated under Virtuabled parameters.
                  </p>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="flex gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-brand-teal/20 border border-brand-teal text-brand-teal flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-[0_0_12px_rgba(20,184,166,0.15)]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <div className="space-y-1 mt-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">2. Competency & Mock Audit</h4>
                    <span className="text-[9px] bg-brand-teal/10 border border-brand-teal/20 text-brand-teal px-1.5 py-0.5 rounded font-mono uppercase font-bold">Done</span>
                  </div>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    Passed the 48-hour advanced workspace capability simulation. Screen readers, keyboard hooks, and environmental parameters scored at 96% operational comfort.
                  </p>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="flex gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all duration-500 ${
                  activeStage === "interviewing" 
                    ? "bg-amber-500/20 border border-amber-500 text-amber-400 animate-pulse" 
                    : "bg-brand-teal/20 border border-brand-teal text-brand-teal"
                }`}>
                  {activeStage === "interviewing" ? "3" : <Check size={12} strokeWidth={3} />}
                </div>
                <div className="space-y-1 mt-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${activeStage === "interviewing" ? "text-amber-400" : "text-white"}`}>
                      3. Enterprise Match & Interviews
                    </h4>
                    {activeStage === "interviewing" ? (
                      <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-mono uppercase font-bold">Active</span>
                    ) : (
                      <span className="text-[9px] bg-brand-teal/10 border border-brand-teal/20 text-brand-teal px-1.5 py-0.5 rounded font-mono uppercase font-bold">Done</span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    Direct workspace matchmaking against B-BBEE designated physical nodes. Live virtual discussions orchestrated cleanly within compliant parameters.
                  </p>
                </div>
              </div>

              {/* Milestone 4 */}
              <div className="flex gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all duration-500 ${
                  activeStage === "onboarding" 
                    ? "bg-violet-500/20 border border-violet-500 text-violet-400 animate-pulse" 
                    : activeStage === "active" 
                      ? "bg-brand-teal/20 border border-brand-teal text-brand-teal"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-550"
                }`}>
                  {activeStage === "active" ? <Check size={12} strokeWidth={3} /> : "4"}
                </div>
                <div className="space-y-1 mt-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                      activeStage === "onboarding" ? "text-violet-400" : activeStage === "active" ? "text-white" : "text-zinc-500"
                    }`}>
                      4. Custom Adaptations Delivery
                    </h4>
                    {activeStage === "onboarding" ? (
                      <span className="text-[9px] bg-violet-500/10 border border-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded font-mono uppercase font-bold">Active</span>
                    ) : activeStage === "active" ? (
                      <span className="text-[9px] bg-brand-teal/10 border border-brand-teal/20 text-brand-teal px-1.5 py-0.5 rounded font-mono uppercase font-bold">Done</span>
                    ) : (
                      <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded font-mono uppercase font-bold">Pending</span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    Logistics deployment of sponsored hardware (chairs, screens) and live integration of virtual workspace container layers custom configured to your screen readers.
                  </p>
                </div>
              </div>

              {/* Milestone 5 */}
              <div className="flex gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all duration-500 ${
                  activeStage === "active" 
                    ? "bg-brand-teal/20 border border-brand-teal text-brand-teal animate-pulse" 
                    : "bg-zinc-900 border border-zinc-800 text-zinc-550"
                }`}>
                  5
                </div>
                <div className="space-y-1 mt-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${activeStage === "active" ? "text-brand-teal" : "text-zinc-500"}`}>
                      5. Active Placement Desk Sync
                    </h4>
                    {activeStage === "active" ? (
                      <span className="text-[9px] bg-brand-teal/10 border border-brand-teal/20 text-brand-teal px-1.5 py-0.5 rounded font-mono uppercase font-bold">Active</span>
                    ) : (
                      <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded font-mono uppercase font-bold">Pending</span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">
                    Formal integration within operational workflows. Ongoing professional mentorship, physical accommodation adjustments, and audit sync reporting.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ADAPTIVE SCHEDULING & COMPLIANCE CALENDAR */}
          <div className="bg-[#0b0c13] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-white font-medium flex items-center gap-2">
                  <Calendar size={18} className="text-brand-teal" />
                  Compliance Scheduling Calendar
                </h3>
                <p className="text-zinc-400 text-xs font-light mt-1">Manage interview availability, block focused learning times, and secure workshop registrations.</p>
              </div>
              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-brand-teal px-2.5 py-1 rounded-sm uppercase font-bold tracking-wider">Live Scheduler</span>
            </div>

            {/* List of active Scheduled blocks */}
            <div className="space-y-3.5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Active Time Blocks & Availability</span>
              {calendarEvents.length === 0 ? (
                <p className="text-xs text-zinc-550 font-mono text-center py-6 bg-zinc-950/45 border border-zinc-900/60 rounded-2xl">No schedules logged. Add your availability or block focus training below.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {calendarEvents.map((evt) => (
                    <div key={evt.id} className="p-4 bg-zinc-955/65 border border-zinc-850 rounded-2xl hover:border-zinc-755 transition-all flex flex-col justify-between space-y-3 relative group">
                      <button 
                        onClick={() => handleRemoveCalendarEvent(evt.id)}
                        className="absolute top-3 right-3 text-zinc-650 hover:text-rose-450 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs"
                        title="Remove time block"
                      >
                        <Trash2 size={13} />
                      </button>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                            evt.type === "Availability" 
                              ? "bg-brand-teal/5 border-brand-teal/20 text-brand-teal" 
                              : evt.type === "Training Block"
                                ? "bg-amber-500/5 border-amber-500/20 text-brand-amber"
                                : "bg-violet-500/5 border-violet-500/20 text-violet-400"
                          }`}>
                            {evt.type}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-550">{evt.date}</span>
                        </div>
                        <h4 className="text-white text-xs font-semibold leading-snug">{evt.title}</h4>
                        <p className="text-zinc-400 text-[11px] font-light leading-relaxed">{evt.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 pt-1.5 border-t border-zinc-900/40 text-[10px] text-zinc-550 font-mono">
                        <Clock size={11} className="text-brand-teal" />
                        <span>Scheduled: {evt.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Register for Workshops section */}
            <div className="border-t border-zinc-900/80 pt-6 space-y-4">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Upcoming Professional Workshops & Seminars</span>
              <div className="space-y-3.5">
                {availableWorkshops.map((wk) => (
                  <div key={wk.id} className="p-4 bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
                    <div className="space-y-1 text-left">
                      <div className="text-[10px] text-brand-teal font-mono flex items-center gap-2">
                        <span>{wk.date} &bull; {wk.time}</span>
                      </div>
                      <h4 className="text-white text-xs font-semibold">{wk.title}</h4>
                      <p className="text-zinc-500 text-[10px] font-mono">Instructor: {wk.instructor}</p>
                    </div>
                    {wk.registered ? (
                      <span className="text-[10px] font-mono text-brand-teal bg-brand-teal/10 border border-brand-teal/20 px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider flex items-center gap-1 self-start sm:self-auto select-none">
                        <Check size={11} strokeWidth={3} /> Registered
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRegisterWorkshop(wk.id)}
                        className="px-3.5 py-1.5 bg-brand-teal/10 hover:bg-brand-teal text-brand-teal hover:text-black border border-brand-teal/25 hover:border-transparent font-mono text-[9.5px] font-bold uppercase tracking-wider rounded-xl transition-all self-start sm:self-auto cursor-pointer"
                      >
                        Register & Book Slot
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule focus or availability form */}
            <div className="border-t border-zinc-900/80 pt-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-4 flex items-center gap-1.5">
                <Plus size={14} className="text-brand-teal" /> Log Custom Schedule Time
              </h4>
              <form onSubmit={handleCreateCalendarEvent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">Schedule Action / Title</label>
                    <input 
                      type="text"
                      value={newCalTitle}
                      onChange={(e) => setNewCalTitle(e.target.value)}
                      placeholder="e.g., Available for Cape Town Placements Desk"
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">Action Type</label>
                    <select
                      value={newCalType}
                      onChange={(e) => setNewCalType(e.target.value)}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors cursor-pointer"
                    >
                      <option value="Availability">Available Slot (For Corporate Matching)</option>
                      <option value="Training Block">Focus Training Block (Hands-free calibrations)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono block">Date of Action</label>
                    <input 
                      type="date"
                      value={newCalDate}
                      onChange={(e) => setNewCalDate(e.target.value)}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors cursor-pointer"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">Time Focus Slot</label>
                    <input 
                      type="text"
                      value={newCalTime}
                      onChange={(e) => setNewCalTime(e.target.value)}
                      placeholder="e.g., 09:30 - 11:30"
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">Schedules Context Description</label>
                  <input 
                    type="text"
                    value={newCalDesc}
                    onChange={(e) => setNewCalDesc(e.target.value)}
                    placeholder="Provide details about accessibility setup, screen reader configuration parameters, etc."
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-teal hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Sync Time Block with Workspace Desk
                </button>
              </form>
            </div>
          </div>

          {/* SKILL VERIFICATION MODULE */}
          <div className="bg-[#0b0c13] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-white font-medium flex items-center gap-2">
                  <Award size={18} className="text-brand-teal" />
                  Skill Verification Registry
                </h3>
                <p className="text-[#9a9ba5] text-xs font-light mt-1">Logged certifications and verified assistive technology configurations.</p>
              </div>
              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-sm">Audit Active</span>
            </div>

            {/* List of Verified/Pending Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skl) => (
                <div key={skl.id} className="p-4 bg-zinc-950/55 border border-zinc-850 rounded-2xl flex flex-col justify-between space-y-3.5 hover:border-zinc-755 transition-all">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[8px] uppercase tracking-wider font-mono font-bold text-brand-teal bg-brand-teal/5 px-2 py-0.5 rounded-sm">
                        {skl.category}
                      </span>
                      <span className={`text-[8.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 border rounded-sm ${
                        skl.status === "Verified" 
                          ? "bg-brand-teal/5 border-brand-teal/20 text-brand-teal" 
                          : "bg-amber-500/5 border-amber-500/20 text-amber-500 animate-pulse"
                      }`}>
                        {skl.status}
                      </span>
                    </div>
                    <h4 className="text-white text-xs font-semibold leading-snug">{skl.name}</h4>
                  </div>

                  <div className="pt-2 border-t border-zinc-900/60 flex flex-col space-y-1 text-[10px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Check size={10} className="text-brand-teal shrink-0" />
                      <span>Proficiency: <strong className="text-white">{skl.proficiency}</strong></span>
                    </span>
                    <span className="truncate">{skl.verifier}</span>
                    <span className="text-zinc-650 text-[9px]">{skl.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Form to submit a new Verification */}
            <div className="border-t border-zinc-900/80 pt-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-4 flex items-center gap-1.5">
                <Plus size={14} className="text-brand-teal" /> Register Assistive Competency
              </h4>
              
              <form onSubmit={handleVerifySkill} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Certificate / Skill Title</label>
                    <input 
                      type="text" 
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      placeholder="e.g., JAWS High Speed Navigation"
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Adaptation Category</label>
                    <select
                      value={newSkillCat}
                      onChange={(e) => setNewSkillCat(e.target.value)}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors cursor-pointer"
                    >
                      <option value="Assistive Tech">Assistive Tech (Software Overlays)</option>
                      <option value="Hands-Free Software">Hands-Free Software (Voice Dictation)</option>
                      <option value="Adaptive Hardware">Adaptive Hardware Controls</option>
                      <option value="Professional License">Professional Workspace License</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Skill Competency Level</label>
                    <select
                      value={newSkillProf}
                      onChange={(e) => setNewSkillProf(e.target.value)}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors cursor-pointer"
                    >
                      <option value="Beginner">Beginner (Familiar setup)</option>
                      <option value="Intermediate">Intermediate (Consistent operation)</option>
                      <option value="Advanced">Advanced (Sustained speed sync)</option>
                      <option value="Expert">Expert (Low-latency tuning expert)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Proof Attachment File (MOCK)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        id="skill-proof-file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setNewSkillProofFileName(e.target.files[0].name);
                            showToast("File Attached", "success", `Proof file "${e.target.files[0].name}" successfully parsed client-side.`);
                          }
                        }}
                        className="hidden"
                      />
                      <label 
                        htmlFor="skill-proof-file"
                        className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="truncate">{newSkillProofFileName || "Choose accreditation file..."}</span>
                        <UploadCloud size={14} className="text-brand-teal shrink-0" />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={skillSubmitting}
                  className="w-full py-3 bg-brand-teal hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-855 disabled:text-zinc-550"
                >
                  {skillSubmitting ? "Uploading Credentials & Files..." : "Log Competency & Request Audit"}
                </button>
              </form>
            </div>
          </div>

          {/* DOCUMENT LOCKER COMPONENT */}
          <div className="bg-[#0b0c13] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-white font-medium flex items-center gap-2">
                  <Lock size={18} className="text-brand-teal" />
                  Secure Document Locker
                </h3>
                <p className="text-zinc-400 text-xs font-light mt-1">Review, sign, or download official South African EE-compliant employment agreements.</p>
              </div>
              <span className="text-[9px] font-mono border border-brand-teal/20 bg-brand-teal/5 text-brand-teal px-2 py-0.5 rounded font-bold uppercase">Locked 256-Bit</span>
            </div>

            {/* Document List */}
            <div className="space-y-4">
              {contracts.map((doc) => (
                <div key={doc.id} className="p-5 bg-zinc-955/60 border border-zinc-850 hover:border-zinc-755 rounded-2xl transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-900/60">
                    <div className="space-y-1">
                      <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider">{doc.type}</span>
                      <h4 className="text-white text-sm font-semibold leading-snug">{doc.title}</h4>
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-1 border rounded-lg shrink-0 text-center ${
                      doc.status === "Signed & Certified" 
                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                        : "bg-rose-500/5 border-rose-500/20 text-rose-400 animate-pulse"
                    }`}>
                      {doc.status}
                    </span>
                  </div>

                  {/* Meta Details or Interactive Signature Section */}
                  {doc.status === "Signed & Certified" ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-900 gap-3 text-xs">
                      <div className="font-mono text-zinc-500 text-[10.5px] space-y-0.5">
                        <div className="text-zinc-400">Electronic Certification Node ID: <span className="text-brand-teal font-mono">E-SIGN-{(doc.id).toUpperCase()}-905B</span></div>
                        <div>Signer: <span className="text-white font-sans">{doc.signer}</span></div>
                        <div>Certified Timestamp: <span className="text-white">{doc.signDate}</span></div>
                      </div>
                      
                      {/* Fake PDF Download Trigger */}
                      <button 
                        onClick={() => {
                          showToast("Downloading Certified Document", "success", `Generating legal cryptographed PDF of: "${doc.title}"... Document downloaded (Virtual).`);
                          const link = document.createElement("a");
                          link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(`CERTIFIED SIGNED COMPLIANT DOCUMENT\nDocument Title: ${doc.title}\nStatus: Certified\nSigner: ${doc.signer}\nTimestamp: ${doc.signDate}\nPortal: Virtuabled South Africa EE`);
                          link.download = doc.fileUrl;
                          link.click();
                        }}
                        className="p-2 bg-zinc-90 w-full sm:w-auto hover:bg-zinc-900 hover:text-white border border-zinc-800 rounded-xl flex items-center justify-center gap-2 font-mono text-[10px] font-bold text-zinc-300 transition-colors cursor-pointer shrink-0"
                      >
                        <Download size={12} className="text-brand-teal" /> Download PDF
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-zinc-400 text-xs font-light leading-relaxed">
                        To activate your senior placements desk, we require visual confirmation of compliance terms. Expand document context or proceed directly to digital signature below.
                      </p>
                      
                      {/* Accordion view preview */}
                      <div className="border border-zinc-900 bg-zinc-955 rounded-xl overflow-hidden">
                        <button 
                          onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                          className="w-full p-3.5 text-xs text-left text-zinc-300 font-mono hover:bg-zinc-900 flex justify-between items-center cursor-pointer select-none"
                        >
                          <span className="flex items-center gap-1.5"><Eye size={12} className="text-brand-teal" /> View Document Content Preview</span>
                          <span>{expandedDoc === doc.id ? "Hide Draft Contract" : "Show Full Layout"}</span>
                        </button>
                        {expandedDoc === doc.id && (
                          <div className="p-4 border-t border-zinc-900 font-sans text-xs font-light text-zinc-350 leading-relaxed whitespace-pre-line bg-black/30 select-text max-h-56 overflow-y-auto">
                            {doc.textPreview}
                          </div>
                        )}
                      </div>

                      {/* Trigger Signature Form or Render typed layout style */}
                      {signingDocId === doc.id ? (
                        <div className="p-4 bg-zinc-900/35 border border-brand-teal/20 rounded-xl space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                            <span className="text-[10px] font-mono font-bold uppercase text-brand-teal tracking-wider flex items-center gap-1">
                              <PenTool size={11} /> Cryptographic Signature Staging
                            </span>
                            <button 
                              onClick={() => setSigningDocId(null)}
                              className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                            >
                              <X size={14} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div className="sm:col-span-2 space-y-1 text-left">
                              <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Signatory Legal Full Name</label>
                              <input 
                                type="text"
                                value={signerFullName}
                                onChange={(e) => setSignerFullName(e.target.value)}
                                placeholder="Type your full legal name..."
                                className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors"
                              />
                            </div>
                            <div className="space-y-1 text-left">
                              <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Signature Style</label>
                              <select 
                                value={typedSignStyle}
                                onChange={(e) => setTypedSignStyle(e.target.value as any)}
                                className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-brand-teal cursor-pointer"
                              >
                                <option value="fancy">Elegant Cursive</option>
                                <option value="slant">Modern Slanted</option>
                                <option value="standard">Classic Sans Serif</option>
                              </select>
                            </div>
                          </div>

                          {/* Dynamic live signature display */}
                          {signerFullName && (
                            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl text-center select-none space-y-1.5 relative overflow-hidden">
                              <div className="absolute top-2 left-2 text-[8px] font-mono text-zinc-500 tracking-wider">SECURE DIGITAL PREVIEW</div>
                              
                              <p 
                                className="pt-2 text-2xl"
                                style={{
                                  fontFamily: typedSignStyle === "fancy" ? "'Playfair Display', Georgia, serif" : typedSignStyle === "slant" ? "monospace" : "sans-serif",
                                  fontStyle: typedSignStyle === "fancy" ? "italic" : "normal",
                                  fontWeight: typedSignStyle === "standard" ? "bold" : "normal",
                                  letterSpacing: typedSignStyle === "slant" ? "0.15em" : "normal",
                                  color: "#14b8a6"
                                }}
                              >
                                {signerFullName}
                              </p>
                              <div className="w-48 h-[1px] bg-zinc-800 mx-auto" />
                              <p className="text-[9px] font-mono text-zinc-500">Cryptographic Hash Sync: SHA256_STABLE_V9</p>
                            </div>
                          )}

                          <div className="flex items-start gap-2 pt-1 text-left">
                            <input 
                              type="checkbox" 
                              id="consent-box"
                              value=""
                              checked={consentCheck}
                              onChange={(e) => setConsentCheck(e.target.checked)}
                              className="mt-1 rounded border-zinc-800 bg-zinc-955 text-brand-teal focus:ring-brand-teal cursor-pointer shrink-0"
                            />
                            <label htmlFor="consent-box" className="text-[10px] text-zinc-400 font-light select-none leading-relaxed cursor-pointer">
                              I confirm my authorization of South African Employment Equity disclosures, allowing fully sponsored adaptive hardware dispatch and cryptographic certificate lodging.
                            </label>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSignDocument(doc.id)}
                              disabled={isSigningLive}
                              className="flex-1 py-2.5 bg-brand-teal hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-colors disabled:bg-zinc-855 disabled:text-zinc-550 cursor-pointer animate-none"
                            >
                              {isSigningLive ? "Encrypting Signature Keys..." : "Apply Certified Signature"}
                            </button>
                            <button
                              onClick={() => setSigningDocId(null)}
                              className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 border border-zinc-850 rounded-xl transition-colors cursor-pointer text-xs font-mono font-bold uppercase tracking-wider"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSigningDocId(doc.id);
                            setSignerFullName("John Doe");
                          }}
                          className="w-full py-3 bg-brand-teal/10 hover:bg-brand-teal border border-brand-teal/25 hover:border-transparent text-brand-teal hover:text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_2px_8px_rgba(20,184,166,0.03)]"
                        >
                          <PenTool size={13} /> Securely Digitally Sign Agreement
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5/12 spacing): Get Help & Active Ticket Management */}
        <div className="lg:col-span-5 space-y-8">

          {/* CHRONOLOGICAL ACTIVITY FEED */}
          <div className="bg-[#0b0c13] border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-white font-medium flex items-center gap-2">
                <Layers size={18} className="text-brand-teal" />
                Live Activity Feed
              </h3>
              <span className="text-[9px] font-mono border border-brand-teal/20 bg-brand-teal/5 text-brand-teal px-2 py-0.5 rounded uppercase font-bold">Real-time</span>
            </div>
            <p className="text-zinc-400 text-xs font-light">Transparency tracker of profile matches, certifications, compliance contracts, and accommodation logs.</p>
            
            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
              {activities.length === 0 ? (
                <div className="text-center py-6 text-zinc-500 text-xs font-mono">No actions recorded in buffer.</div>
              ) : (
                activities.map((act) => (
                  <div key={act.id} className="relative pl-6 pb-2 last:pb-0 group">
                    {/* Visual connector lines */}
                    <div className="absolute left-2.5 top-2.5 bottom-0 w-[1px] bg-zinc-850 group-last:hidden" />
                    
                    {/* Bullet */}
                    <div className={`absolute left-1.5 top-2.5 w-2.5 h-2.5 rounded-full border border-[#0b0c13] ${
                      act.status === "completed" 
                        ? "bg-brand-teal shadow-[0_0_8px_rgba(20,184,166,0.5)]" 
                        : "bg-amber-400 animate-pulse"
                    }`} />

                    <div className="space-y-1 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-white text-xs font-semibold leading-none">{act.title}</h4>
                        <span className="text-[8px] font-mono text-zinc-500 shrink-0">{act.time}</span>
                      </div>
                      <p className="text-zinc-400 text-[11px] font-light leading-relaxed">{act.description}</p>
                      <span className="inline-block text-[8px] font-mono text-brand-teal bg-brand-teal/5 border border-brand-teal/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                        {act.category}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* GET HELP SECTION */}
          <div className="bg-[#0b0c13] border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-white font-medium flex items-center gap-2">
                <Heart size={18} className="text-brand-teal" />
                Direct Human Support Desk
              </h3>
              <span className="text-[10px] uppercase font-mono bg-brand-teal/10 border border-brand-teal/20 text-brand-teal px-2.5 py-1 rounded-sm">Support Line</span>
            </div>

            <p className="text-zinc-450 text-xs font-sans font-light leading-relaxed">
              No cold, robotic support tickets. Virtuabled was built by founder Eugene Hefer — who lived this problem — and Elmarie, our voice-enabled guide, walks you through every step. If you're encountering software lag or workspace issues, reach out below for direct, human-backed assistance.
            </p>

            {/* Support guide cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
              <div className="p-3.5 bg-zinc-950/60 border border-zinc-850 rounded-2xl space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-brand-teal/40 bg-zinc-900">
                    <img
                      src={elmarieAvatar}
                      alt="Elmarie — Virtuabled guide"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wide">Elmarie</h5>
                    <p className="text-[8px] font-mono text-brand-teal uppercase">Your Virtuabled guide · voice-enabled</p>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 font-sans font-light leading-relaxed">
                  "I'll walk you through the platform step by step — no form is a barrier. Ask me anything as you go."
                </p>
              </div>

              <div className="p-3.5 bg-zinc-950/60 border border-zinc-850 rounded-2xl space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber text-[10px] font-mono uppercase font-bold">EH</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wide">Eugene Hefer</h5>
                    <p className="text-[8px] font-mono text-brand-amber uppercase">Founder</p>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 font-sans font-light leading-relaxed">
                  "I built the platform I needed and didn't find. We stay with you past placement — through onboarding and the 30/60/90-day check-ins."
                </p>
              </div>
            </div>

            {/* Direct Document Search Trigger */}
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                placeholder="Search custom accommodation guides & manuals..."
                className="w-full bg-zinc-950 text-white border border-zinc-805 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-brand-teal transition-all"
              />
            </div>

            {/* Interactive Documentation List */}
            <div className="space-y-3.5">
              <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block font-bold">Our Curated Troubleshooting Solutions</span>
              
              {filteredDocs.length === 0 ? (
                <div className="text-center py-4 text-zinc-500 text-xs font-mono">No matching documentation guides.</div>
              ) : (
                filteredDocs.map((doc) => {
                  const isExpanded = expandedDoc === doc.id;
                  return (
                    <div 
                      key={doc.id} 
                      className="border border-zinc-850 hover:border-zinc-750 bg-zinc-950/40 rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <button 
                        onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                        className="w-full p-4 text-left flex justify-between items-start gap-3 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase tracking-wider font-mono font-bold text-brand-teal bg-brand-teal/5 px-2 py-0.5 rounded-sm">{doc.category}</span>
                          <h4 className="text-white text-xs font-medium pt-1.5 leading-snug">{doc.title}</h4>
                          {!isExpanded && (
                            <p className="text-zinc-500 text-[11px] font-light line-clamp-1">{doc.short}</p>
                          )}
                        </div>
                        <div className="pt-2 text-zinc-500">
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="bg-black/40 border-t border-zinc-900"
                          >
                            <div className="p-4 text-xs font-light text-zinc-350 leading-relaxed space-y-3 whitespace-pre-line border-l-2 border-brand-teal">
                              {doc.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>

            {/* Direct Ticket Raising Action Divider */}
            <div className="border-t border-zinc-900 pt-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-4 flex items-center gap-1.5">
                <MessageSquare size={14} className="text-brand-teal" /> Share Your Request Directly
              </h4>

              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Message Subject</label>
                    <input 
                      type="text" 
                      value={subj}
                      onChange={(e) => setSubj(e.target.value)}
                      placeholder="e.g., Physical desk configuration"
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Accommodation Area</label>
                    <select
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors cursor-pointer"
                    >
                      <option value="Software Overlays">Software Overlays</option>
                      <option value="Hardware Logistics">Hardware Logistics</option>
                      <option value="Interviewing Adaptations">Interviewing Adaptations</option>
                      <option value="Sanctuary Sanctuary">Sanctuary Setup</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Your Custom Accommodation Requirement</label>
                  <input 
                    type="text" 
                    value={accNeed}
                    onChange={(e) => setAccNeed(e.target.value)}
                    placeholder="e.g., Custom screen-zooms, specialized mouse buttons..."
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Your Heart-to-Heart Message Code</label>
                  <textarea 
                    rows={3}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Describe your story, physical requirements, or setup ideas here in your own words..."
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-teal transition-colors resize-none text-light"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-teal hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-850 disabled:text-zinc-550"
                >
                  {isSubmitting ? (
                    "Delivering message directly..."
                  ) : (
                    <>
                      <Send size={13} /> Deliver to Founders
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* SIMULATED ACTIVE SERVICE TICKETS */}
          <div className="bg-zinc-950/40 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Our Active Conversations & Dedicated Adjustments ({tickets.length})</span>
            
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 bg-[#070b13] border border-zinc-850 rounded-xl text-left space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[9.5px] font-mono text-[#a1a1aa] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded-sm font-bold tracking-tight">{t.id}</span>
                      <h4 className="text-white text-xs font-semibold mt-1.5 leading-snug">{t.subject}</h4>
                    </div>
                    <span 
                      className="text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border shrink-0"
                      style={{
                        backgroundColor: t.status === "Open" ? "rgba(20, 184, 166, 0.03)" : t.status === "In Review" ? "rgba(245, 158, 11, 0.03)" : "rgba(139, 92, 246, 0.03)",
                        borderColor: t.status === "Open" ? "rgba(20, 184, 166, 0.2)" : t.status === "In Review" ? "rgba(245, 158, 11, 0.2)" : "rgba(139, 92, 246, 0.2)",
                        color: t.status === "Open" ? "#14b8a6" : t.status === "In Review" ? "#f59e0b" : "#a78bfa"
                      }}
                    >
                      {t.status}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-[11px] font-light leading-relaxed truncate">{t.description}</p>
                  
                  <div className="pt-2 border-t border-zinc-900 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-550 font-mono items-center">
                    <div className="flex items-center gap-1">
                      <Clock size={11} className="text-brand-teal" />
                      <span>{t.slaTime}</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 hidden sm:block" />
                    <div>{t.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
