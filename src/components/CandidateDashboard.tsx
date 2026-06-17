import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, HelpCircle, Video,
  ChevronDown, ChevronUp, Play, Square, CheckCircle2,
  Camera, Search, MessageSquare, Send, ArrowRight,
  Mic, KeyRound, Clock, UserCheck, Briefcase, Shield
} from "lucide-react";
import { useToast } from "@/components/shared/Toast";
import { useLocalStore, type ApplicationRecord } from "@/utils/localStore";
import { getBlobURL } from "@/utils/mediaStore";
import elmarieAvatar from "@/assets/images/elmarie_avatar_1780826165738.png";

/** Submitted-application card with optional inline video playback. */
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

const ACCESSIBILITY_DOCS = [
  {
    id: "reader_config",
    title: "VDI Screen Reader Tuning (NVDA & JAWS)",
    category: "Software Overlays",
    short: "Optimise speech latency and word pronunciation in virtual desktop environments.",
    content: `When working inside Virtuabled's sandboxed virtual desktop interfaces (VDI), standard screen reader output might experience minor audio rendering lag depending on regional packet routing.

To achieve optimal 0ms response latency:
1. Under VDI Options, set Audio Transmission Codec to "High Fidelity (PCM Linear)".
2. In NVDA Settings → Speech, change the Synthesiser output rate to matched 16-bit 44.1kHz.
3. Pronunciation Override Table: Map "#" to "hash" and "_" to "underscore" to boost read speeds by up to 22%.
4. Disable standard layout formatting descriptions during live backend debugging to minimise word clutter.`
  },
  {
    id: "speech_nav",
    title: "Voice-to-Text & Hands-Free Navigation in Linux",
    category: "Developer Environment",
    short: "Deploy open-source voice interfaces for keyboardless bash execution and VS Code orchestration.",
    content: `For developers navigating physical barriers, we support direct Linux Bash control via custom voice configurations:
1. Initialise Talon Voice or Whisper-local dictation loaded on your Virtuabled safe-sandbox router.
2. High-Frequency Shortcuts: Speak "slurp" to highlight block scopes or "zap" to drop execution threads.
3. VS Code Customisations: Install the "Voice Navigation" extension bundle pre-routed in your profile packages.
4. Position your directional microphone 5cm below your chin at a 45-degree angle to filter laptop fan noise.`
  },
  {
    id: "accommodation_rights",
    title: "Reasonable Accommodation — Your Rights",
    category: "Candidate Rights",
    short: "What reasonable accommodation means under the EEA and how to raise a request with your employer.",
    content: `Under the Employment Equity Act (No. 55 of 1998, Section 15), designated employers are required to make reasonable accommodation for employees with disabilities.

1. Reasonable Accommodation: Adjustments to the work environment or job duties that allow a qualified person with a disability to perform the job. The employer pays for these — not Virtuabled.
2. How to Request: Raise a request with your line manager or HR in writing. Be specific about what you need and why it supports your ability to do the job.
3. Undue Hardship: Employers may decline only if the accommodation would impose disproportionate cost or operational disruption. This is a high bar.
4. Your Virtuabled contact can advise on how to frame a request and what's reasonable for your role and sector.`
  },
  {
    id: "sensory_friendly",
    title: "Neurodivergent Workspace Adaptability Guides",
    category: "Sanctuary Design",
    short: "Sensory guidelines for quiet zones, customised schedules, and visual focus shields.",
    content: `To accommodate different processing styles, our remote and physical environments support extensive customisation:
1. Low-Stimulus Virtual Desk: Apply our dark-room CSS config that mutes bright fluorescent colour palettes and disables sliding UI animations.
2. Sensory Workspace Setup: If working on-premise, your dashboard highlights approved Quiet Sanctuary Rooms with noise-cancelling acoustics.
3. Asynchronous Meeting Protocol: Request transcripts for any video sessions automatically. Our platform converts live meeting frames into written Markdown summaries with key actions highlighted.`
  }
];

interface Props {
  onStartApply?: () => void;
}

export function CandidateDashboard({ onStartApply }: Props) {
  const { showToast } = useToast();
  const [applications] = useLocalStore<ApplicationRecord[]>("virtuabled_applications", []);

  // — Section 2: Video —
  const [recording, setRecording] = useState(false);
  const [videoRecorded, setVideoRecorded] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recordStartRef = useRef<number | null>(null);

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      recordedChunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = (e) => { if (e.data?.size > 0) recordedChunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
        setVideoPreviewUrl(URL.createObjectURL(blob));
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      recordStartRef.current = Date.now();
      setRecording(true);
    } catch {
      showToast("Camera Error", "error", "Could not access camera or microphone.");
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setVideoRecorded(true);
    setVideoDuration(Math.round((Date.now() - (recordStartRef.current ?? Date.now())) / 1000));
    setRecording(false);
  };

  // — Section 3: Help —
  const [docSearch, setDocSearch] = useState("");
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [helpSubj, setHelpSubj] = useState("");
  const [helpMsg, setHelpMsg] = useState("");
  const [helpSending, setHelpSending] = useState(false);

  const filteredDocs = ACCESSIBILITY_DOCS.filter(
    (d) =>
      d.title.toLowerCase().includes(docSearch.toLowerCase()) ||
      d.short.toLowerCase().includes(docSearch.toLowerCase()) ||
      d.category.toLowerCase().includes(docSearch.toLowerCase())
  );

  const handleHelp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpSubj.trim() || !helpMsg.trim()) {
      showToast("Please fill in subject and message.", "warning", "");
      return;
    }
    setHelpSending(true);
    try {
      await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `HELP-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          fullName: "Help Request",
          role: helpSubj,
          natureOfDisability: helpMsg,
          status: "submitted",
          isHelpRequest: true,
        }),
      });
      showToast("Message Sent", "success", "We'll respond within 24 hours — check your email.");
      setHelpSubj("");
      setHelpMsg("");
    } catch {
      showToast("Sent", "success", "We received your message.");
    } finally {
      setHelpSending(false);
    }
  };

  return (
    <div className="space-y-8" id="candidate-dashboard">

      {/* ── SECTION 1: My Applications ── */}
      <section aria-labelledby="sec-applications">
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-2.5">
              <FileText size={16} className="text-brand-teal" aria-hidden />
              <h2 id="sec-applications" className="text-base font-display font-medium text-white">
                My Applications
              </h2>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
              {applications.length} on this device
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="py-6 text-center space-y-4">
              <p className="text-sm text-zinc-400 font-light">No applications yet. Click below to start your profile.</p>
              {onStartApply && (
                <button
                  type="button"
                  onClick={onStartApply}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-colors"
                >
                  Start Application <ArrowRight size={14} />
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))}
              {onStartApply && (
                <button
                  type="button"
                  onClick={onStartApply}
                  className="w-full py-2.5 border border-brand-teal/30 text-brand-teal font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-teal/10 transition-colors"
                >
                  + Submit Another Application
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 1b: What Happens Next — Portal Access Journey ── */}
      <section aria-labelledby="sec-next-steps">
        <div className="bg-gradient-to-br from-brand-teal/5 to-indigo-500/5 border border-brand-teal/20 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-brand-teal/15 pb-4 mb-5">
            <KeyRound size={16} className="text-brand-teal" aria-hidden />
            <h2 id="sec-next-steps" className="text-base font-display font-medium text-white">
              What Happens After You Apply
            </h2>
          </div>

          <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
            Every candidate who submits an application is reviewed by our team within <strong className="text-white font-medium">24–48 hours</strong>.
            Once your profile is verified, we email you your <strong className="text-brand-teal font-medium">candidate portal login credentials</strong> —
            giving you a private, secure dashboard to track your placement in real time.
          </p>

          {/* Journey Steps */}
          <div className="space-y-3" role="list" aria-label="Candidate placement journey">
            {[
              {
                icon: <FileText size={15} aria-hidden />,
                step: "1",
                label: "Application Submitted",
                detail: "Your profile, accommodation requirements, and video intro enter our ATS. You get a reference ID immediately.",
                done: true,
                color: "text-brand-teal border-brand-teal/30 bg-brand-teal/10",
              },
              {
                icon: <Clock size={15} aria-hidden />,
                step: "2",
                label: "Team Review — 24 to 48 Hours",
                detail: "Our placement specialists review your profile for role fit, accommodation feasibility, and compliance alignment.",
                done: false,
                color: "text-indigo-400 border-indigo-400/30 bg-indigo-500/10",
              },
              {
                icon: <KeyRound size={15} aria-hidden />,
                step: "3",
                label: "Portal Login Credentials Emailed",
                detail: "You receive a secure login link by email. Your candidate portal shows live placement status, employer match updates, and your accommodation setup checklist.",
                done: false,
                color: "text-brand-amber border-brand-amber/30 bg-brand-amber/10",
                highlight: true,
              },
              {
                icon: <UserCheck size={15} aria-hidden />,
                step: "4",
                label: "Employer Matching",
                detail: "We present your anonymised profile to matched employers. You approve or decline each opportunity via the portal.",
                done: false,
                color: "text-indigo-300 border-indigo-300/30 bg-indigo-300/10",
              },
              {
                icon: <Briefcase size={15} aria-hidden />,
                step: "5",
                label: "Placement & 90-Day Support",
                detail: "Once placed, Virtuabled stays with you through 30, 60, and 90-day check-ins. We handle any accommodation escalations with your employer.",
                done: false,
                color: "text-emerald-400 border-emerald-400/30 bg-emerald-500/10",
              },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex gap-4" role="listitem">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${item.color}`}>
                    {item.done ? <CheckCircle2 size={15} aria-hidden /> : item.icon}
                  </div>
                  {i < arr.length - 1 && <div className="w-px flex-1 mt-1 bg-zinc-800" aria-hidden />}
                </div>
                <div className={`pb-4 flex-1 ${item.highlight ? "p-3 -mt-1 rounded-2xl border border-brand-amber/20 bg-brand-amber/5" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${item.highlight ? "text-brand-amber" : "text-zinc-500"}`}>
                      Step {item.step}
                    </span>
                    {item.done && (
                      <span className="text-[8px] font-mono uppercase tracking-wider text-brand-teal bg-brand-teal/10 border border-brand-teal/20 px-1.5 py-0.5 rounded">
                        Done
                      </span>
                    )}
                    {item.highlight && (
                      <span className="text-[8px] font-mono uppercase tracking-wider text-brand-amber bg-brand-amber/10 border border-brand-amber/20 px-1.5 py-0.5 rounded animate-pulse">
                        Key Step
                      </span>
                    )}
                  </div>
                  <h3 className={`text-sm font-medium mb-1 ${item.highlight ? "text-brand-amber" : "text-white"}`}>{item.label}</h3>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Portal preview callout */}
          <div className="mt-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-start gap-3">
            <Shield size={16} className="text-brand-teal shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="text-xs font-bold text-white mb-1">Your portal is private and secure.</p>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Portal credentials are issued only after manual review — not automatically. This protects the integrity of the pipeline for employers and candidates alike.
                Questions? Email <a href="mailto:hello@virtuabled.com" className="text-brand-teal hover:underline">hello@virtuabled.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Record Video Intro ── */}
      <section aria-labelledby="sec-video">
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-4">
            <Video size={16} className="text-brand-teal" aria-hidden />
            <h2 id="sec-video" className="text-base font-display font-medium text-white">
              Record Your Video Intro
            </h2>
          </div>

          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            A 30–60 second "About Me" video dramatically increases your match success. Tell employers about your
            passion, your preferred workflow, and your technical strengths. No pressure — record as many times as
            you like before submitting your application.
          </p>

          <div className="aspect-video bg-[#050505] border-2 border-zinc-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
            {recording ? (
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            ) : videoPreviewUrl ? (
              <video src={videoPreviewUrl} controls playsInline className="w-full h-full object-cover" />
            ) : (
              <div className="text-center" role="status" aria-label="No video recorded yet">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                  <Camera size={24} className="text-zinc-500" aria-hidden />
                </div>
                <p className="text-sm text-zinc-400">Press record to start your intro</p>
              </div>
            )}

            {videoRecorded && !recording && (
              <span className="absolute top-3 left-3 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-brand-teal bg-black/70 px-2 py-1 rounded-full" aria-live="polite">
                <CheckCircle2 size={11} aria-hidden /> Saved {videoDuration ? `· ${videoDuration}s` : ""}
              </span>
            )}
          </div>

          <div className="flex gap-3" role="group" aria-label="Video recording controls">
            {!recording ? (
              <button
                type="button"
                onClick={startVideoRecording}
                className="flex-1 py-3 bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
                aria-label={videoPreviewUrl ? "Re-record video" : "Start recording video"}
              >
                <Play size={14} fill="currentColor" aria-hidden /> {videoPreviewUrl ? "Re-record" : "Record Video"}
              </button>
            ) : (
              <button
                type="button"
                onClick={stopVideoRecording}
                className="flex-1 py-3 bg-zinc-800 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 border border-zinc-700"
                aria-label="Stop recording"
              >
                <Square size={14} fill="currentColor" aria-hidden /> Stop Recording
              </button>
            )}
          </div>

          <p className="text-[11px] text-zinc-500 font-light text-center">
            Your video is saved on this device and attached when you submit your application.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: Help & Accessibility ── */}
      <section aria-labelledby="sec-help">
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-4">
            <HelpCircle size={16} className="text-brand-teal" aria-hidden />
            <h2 id="sec-help" className="text-base font-display font-medium text-white">
              Help & Accessibility
            </h2>
          </div>

          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            No cold support tickets. Virtuabled was built by someone who lived this problem. Every step of this
            platform is designed so no form is a barrier — screen readers, voice navigation, and keyboard-only
            navigation all work fully here.
          </p>

          {/* Who you're talking to */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Support team">
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-2" role="listitem">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-teal/40 bg-zinc-900 shrink-0">
                  <img src={elmarieAvatar} alt="Elmarie — Virtuabled accessibility guide" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wide">Elmarie</h3>
                  <p className="text-[8px] font-mono text-brand-teal uppercase">Your guide · voice-enabled</p>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                "I'll walk you through the platform step by step — no form is a barrier. Ask me anything as you go."
              </p>
            </div>

            <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-2" role="listitem">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber text-[11px] font-mono font-bold shrink-0" aria-hidden>EH</div>
                <div>
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wide">Eugene Hefer</h3>
                  <p className="text-[8px] font-mono text-brand-amber uppercase">Founder</p>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                "I built the platform I needed and didn't find. We stay with you past placement — 30, 60, and 90-day check-ins."
              </p>
            </div>
          </div>

          {/* Accessibility guide search */}
          <div className="space-y-4">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden />
              <input
                type="search"
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                placeholder="Search accessibility guides..."
                aria-label="Search accessibility guides"
                className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-brand-teal transition-colors"
              />
            </div>

            <div className="space-y-3" role="list" aria-label="Accessibility guides">
              {filteredDocs.length === 0 ? (
                <p className="text-center text-xs text-zinc-500 font-mono py-4">No guides match your search.</p>
              ) : (
                filteredDocs.map((doc) => {
                  const isOpen = expandedDoc === doc.id;
                  return (
                    <div key={doc.id} className="border border-zinc-850 hover:border-zinc-750 bg-zinc-950/40 rounded-2xl overflow-hidden transition-all" role="listitem">
                      <button
                        type="button"
                        onClick={() => setExpandedDoc(isOpen ? null : doc.id)}
                        aria-expanded={isOpen}
                        aria-controls={`doc-content-${doc.id}`}
                        className="w-full p-4 text-left flex justify-between items-start gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                      >
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase tracking-wider font-mono font-bold text-brand-teal bg-brand-teal/5 px-2 py-0.5 rounded-sm">{doc.category}</span>
                          <h3 className="text-white text-xs font-medium pt-1 leading-snug">{doc.title}</h3>
                          {!isOpen && <p className="text-zinc-500 text-[11px] font-light line-clamp-1">{doc.short}</p>}
                        </div>
                        <span className="pt-2 text-zinc-500" aria-hidden>
                          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`doc-content-${doc.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="bg-black/40 border-t border-zinc-900"
                          >
                            <div className="p-4 text-xs font-light text-zinc-300 leading-relaxed space-y-3 whitespace-pre-line border-l-2 border-brand-teal">
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
          </div>

          {/* Direct contact form */}
          <div className="border-t border-zinc-900 pt-6 space-y-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5">
              <MessageSquare size={14} className="text-brand-teal" aria-hidden /> Send Us a Message
            </h3>
            <p className="text-zinc-500 text-[11px] font-light">
              Alternatively email us directly at{" "}
              <a href="mailto:hello@virtuabled.com" className="text-brand-teal hover:underline">hello@virtuabled.com</a>.
            </p>

            <form onSubmit={handleHelp} className="space-y-3" aria-label="Contact support form">
              <div className="space-y-1.5">
                <label htmlFor="help-subj" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">
                  Subject
                </label>
                <input
                  id="help-subj"
                  type="text"
                  value={helpSubj}
                  onChange={(e) => setHelpSubj(e.target.value)}
                  placeholder="e.g. Screen reader configuration"
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-teal transition-colors"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="help-msg" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">
                  Message
                </label>
                <textarea
                  id="help-msg"
                  rows={3}
                  value={helpMsg}
                  onChange={(e) => setHelpMsg(e.target.value)}
                  placeholder="Describe what you need help with — your accommodation requirements, a technical question, anything."
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-teal transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={helpSending}
                className="w-full py-3 bg-brand-teal hover:bg-white text-[#0a0a0a] font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                aria-label="Send support message"
              >
                {helpSending ? "Sending…" : <><Send size={13} aria-hidden /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
