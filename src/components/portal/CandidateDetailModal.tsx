import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Play, Pause, Mail, Phone, FileText, CheckCircle2, 
  Calendar, MessageSquare, MapPin, Clock, ArrowRight, UserPlus, UserMinus, Plus
} from "lucide-react";
import { useToast } from "@/components/shared/Toast";
import { cn } from "@/lib/utils";
import {
  useLocalStore,
  type MessagesState,
  type InterviewsState,
  type NotesState,
  type ChatMessage,
} from "@/utils/localStore";

const SEED_MESSAGE: ChatMessage = {
  id: 1,
  sender: "candidate",
  text: "Thank you for reviewing my accommodations profile! I look forward to introducing my systems approach.",
  time: "Yesterday",
};

interface Candidate {
  id: number;
  name: string;
  role: string;
  location: string;
  matchScore: number;
  skills: string[];
  requirements: string[];
  avatar: string;
  avatarImg?: string;
  bio: string;
  experience: string;
  education: string;
  contactEmail: string;
  contactPhone: string;
  captions: { time: number; text: string }[];
}

interface CandidateDetailModalProps {
  candidate: Candidate;
  isShortlisted: boolean;
  onToggleShortlist: () => void;
  onClose: () => void;
}

export function CandidateDetailModal({ 
  candidate, 
  isShortlisted, 
  onToggleShortlist, 
  onClose 
}: CandidateDetailModalProps) {
  const { showToast } = useToast();
  
  // Tab control in Modal: intro vs profile vs schedule
  const [activeSubTab, setActiveSubTab] = useState<"intro" | "profile" | "schedule" | "chat">("intro");
  
  // Video Player simulation states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0); // 0 to 100
  const [currentCaption, setCurrentCaption] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cid = String(candidate.id);

  // Scheduling state (form inputs ephemeral; the booking itself is persisted)
  const [scheduleDate, setScheduleDate] = useState("2026-06-15");
  const [scheduleTime, setScheduleTime] = useState("10:00");
  const [scheduleType, setScheduleType] = useState("Video Call with captions interpreter");
  const [interviews, setInterviews] = useLocalStore<InterviewsState>("virtuabled_interviews", {});
  const scheduled = interviews[cid];
  const isScheduled = !!scheduled;

  // Chat/Message state (persisted locally, keyed by candidate)
  const [messageText, setMessageText] = useState("");
  const [allMessages, setAllMessages] = useLocalStore<MessagesState>("virtuabled_messages", {});
  const chatMessages = allMessages[cid] ?? [SEED_MESSAGE];
  const appendMessage = (msg: ChatMessage) =>
    setAllMessages(prev => ({ ...prev, [cid]: [...(prev[cid] ?? [SEED_MESSAGE]), msg] }));

  // Private notes (persisted locally, keyed by candidate)
  const [notes, setNotes] = useLocalStore<NotesState>("virtuabled_notes", {});

  // Video progress and captions effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setPlayProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            setIsPlaying(false);
            setPlayProgress(0);
            return 0;
          }
          
          // Match playProgress% to caption times
          // Video duration simulated: 30 seconds (100 ticks = 300ms each)
          const elapsedSeconds = (next / 100) * 30;
          const matchedCaption = candidate.captions.reduce((acc, curr) => {
            if (elapsedSeconds >= curr.time) {
              return curr.text;
            }
            return acc;
          }, candidate.captions[0].text);
          setCurrentCaption(matchedCaption);
          
          return next;
        });
      }, 300);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, candidate]);

  // Handle scheduled submit (persisted)
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInterviews(prev => ({
      ...prev,
      [cid]: {
        candidateId: candidate.id,
        candidateName: candidate.name,
        date: scheduleDate,
        time: scheduleTime,
        type: scheduleType,
        scheduledAt: new Date().toISOString(),
      },
    }));
    showToast(
      "Interview Proposal Dispatched",
      "success",
      `Accommodated interview slot scheduled for ${scheduleDate} at ${scheduleTime}.`
    );
  };

  const handleReschedule = () => {
    setInterviews(prev => {
      const { [cid]: _removed, ...rest } = prev;
      return rest;
    });
  };

  // Handle Chat submit (persisted)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    appendMessage({
      id: Date.now(),
      sender: "employer",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setMessageText("");

    // Simulate candidate reply based on disability profile
    setTimeout(() => {
      appendMessage({
        id: Date.now() + 1,
        sender: "candidate",
        text: `Confirmed, thank you! I've received your inquiry. I will ensure our integrated screen-readers/channels are active for our next coordination.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      showToast(
        "Response Received",
        "info",
        `${candidate.name} updated the chat loop.`
      );
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-[#0a0f1d] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[650px]"
      >
        {/* Left Aspect: The Video Player or Large Interactive Visual Section */}
        <div className="w-full md:w-5/12 bg-black flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800">
          {candidate.avatarImg && (
            <img src={candidate.avatarImg} alt={candidate.name} className="absolute inset-0 w-full h-full object-cover object-top opacity-70" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/85 z-10 pointer-events-none" />
          
          {/* Sub-tab navigation on the Player side */}
          <div className="z-20 p-4 shrink-0 flex gap-2">
            <button 
              onClick={() => setActiveSubTab("intro")}
              className={cn(
                "px-3 py-1.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider transition-colors",
                activeSubTab === "intro" ? "bg-brand-teal text-[#050C1A]" : "text-zinc-400 bg-zinc-900/60 hover:text-white"
              )}
            >
              Intro Stream
            </button>
            <button 
              onClick={() => setActiveSubTab("profile")}
              className={cn(
                "px-3 py-1.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider transition-colors",
                activeSubTab === "profile" ? "bg-brand-teal text-[#050C1A]" : "text-zinc-400 bg-zinc-900/60 hover:text-white"
              )}
            >
              Accommodations
            </button>
          </div>

          {/* Interactive Screen content depending on tab selection */}
          <div className="flex-1 flex items-center justify-center p-6 relative">
            <AnimatePresence mode="wait">
              {activeSubTab === "intro" ? (
                <motion.div 
                  key="video-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col justify-between absolute inset-0 p-6 z-20"
                >
                  {/* Hologram/Simulation Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none animate-pulse" />
                  
                  {/* Screen status bar */}
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-wider text-brand-teal">
                    <span className="flex items-center gap-1.5">
                      <span className={cn("w-2 h-2 rounded-full inline-block", isPlaying ? "bg-red-500 animate-ping" : "bg-brand-teal")} />
                      {isPlaying ? "Streaming" : "Standby"}
                    </span>
                    <span>1080p WebVTT</span>
                  </div>

                  {/* Play Center Button or Avatar representation */}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 rounded-full bg-brand-teal/10 border border-brand-teal/40 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-teal/5 cursor-pointer"
                      aria-label={isPlaying ? "Pause introduction" : "Play introduction"}
                    >
                      {isPlaying ? <Pause size={30} /> : <Play size={30} className="ml-1.5" />}
                    </button>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase mt-4 tracking-wider select-none">
                      {isPlaying ? "Simulated HD Loop" : "Watch WCAG Captioned Preview"}
                    </p>
                  </div>

                  {/* Simulated Captions Box - Dynamic placement */}
                  <div className="w-full bg-black/95 border border-zinc-800 p-4 rounded-xl shadow-2xl relative z-30">
                    <span className="text-[8px] font-mono uppercase text-brand-teal block mb-1">Live Subtitles interpreter:</span>
                    <p className="text-xs text-white leading-relaxed font-sans font-light h-10 overflow-hidden text-left">
                      {isPlaying ? currentCaption : "Click play to listen to a brief South African sign/verbal video introduction outlining their work approach."}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="acc-details-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full space-y-4 max-h-[80%] overflow-y-auto text-left"
                >
                  <h4 className="text-xs font-mono uppercase font-bold text-brand-teal tracking-wider">Verified Accommodation Requirements</h4>
                  <p className="text-xs text-zinc-400 font-light">The candidate has vetted their profile under our integrated system. These conditions are checked matching your office assets:</p>
                  
                  <div className="space-y-3 pt-2">
                    {candidate.requirements.map(req => (
                      <div key={req} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-brand-teal shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-medium text-white block">{req}</span>
                          <span className="text-[10px] text-zinc-550 font-light leading-snug">Vetted by South African Occupational Therapists.</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Player controls */}
          <div className="p-4 bg-zinc-950/80 z-20 border-t border-zinc-800/60 shrink-0">
            <div className="h-1 bg-zinc-900 rounded-full relative overflow-hidden mb-3">
              <div 
                className="h-full bg-brand-teal" 
                style={{ width: `${playProgress}%` }} 
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-550 select-none">
              <span>0:{Math.floor((playProgress/100) * 30).toString().padStart(2, "0")}</span>
              <span>0:30</span>
            </div>
          </div>
        </div>

        {/* Right Aspect: Profile Information, Schedulers and Workspace communication logs */}
        <div className="flex-1 flex flex-col h-full bg-[#0b1122]">
          {/* Header Bar */}
          <div className="p-6 pb-4 border-b border-zinc-800/80 flex justify-between items-start shrink-0">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-brand-teal text-xs font-mono font-bold tracking-widest uppercase">{candidate.role}</span>
                <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-brand-teal/10 text-brand-teal border border-brand-teal/20 rounded font-mono font-bold">
                  {candidate.matchScore}% Match
                </span>
              </div>
              <h3 className="text-2xl text-white font-display font-light mt-1 tracking-tight">{candidate.name}</h3>
              <p className="text-xs text-zinc-400 font-light mt-0.5 flex items-center gap-1">
                <MapPin size={12} className="text-brand-teal shrink-0" /> {candidate.location}
              </p>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-805 transition-colors cursor-pointer"
              aria-label="Close modal dialog"
            >
              <X size={15} />
            </button>
          </div>

          {/* Action Tabs under Details */}
          <div className="px-6 py-2 border-b border-zinc-800/40 shrink-0 flex gap-4 text-xs font-mono uppercase tracking-wider">
            <button 
              onClick={() => setActiveSubTab("profile")}
              className={cn("pb-2 border-b-2 transition-all font-bold cursor-pointer", activeSubTab === "profile" ? "border-brand-teal text-white" : "border-transparent text-zinc-400 hover:text-white")}
            >
              Review Profile
            </button>
            <button 
              onClick={() => setActiveSubTab("schedule")}
              className={cn("pb-2 border-b-2 transition-all font-bold cursor-pointer", activeSubTab === "schedule" ? "border-brand-teal text-white" : "border-transparent text-zinc-400 hover:text-white")}
            >
              Schedule Interview {isScheduled && <span className="inline-block w-2 h-2 rounded-full bg-brand-teal ml-1" />}
            </button>
            <button 
              onClick={() => setActiveSubTab("chat")}
              className={cn("pb-2 border-b-2 transition-all font-bold cursor-pointer", activeSubTab === "chat" ? "border-brand-teal text-white" : "border-transparent text-zinc-400 hover:text-white")}
            >
              Direct Chat
            </button>
          </div>

          {/* Scrolling Content panel */}
          <div className="flex-1 overflow-y-auto p-6 text-left">
            <AnimatePresence mode="wait">
              {activeSubTab === "profile" && (
                <motion.div 
                  key="pro-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Bio */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono uppercase text-zinc-555 font-extrabold tracking-widest block">Executive Bio</span>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed whitespace-pre-line">{candidate.bio}</p>
                  </div>

                  {/* Core Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-900">
                      <span className="text-[8px] font-mono uppercase text-zinc-500 font-bold block">Qualifications</span>
                      <span className="text-xs text-white block font-medium leading-normal">{candidate.education}</span>
                    </div>
                    <div className="space-y-1 p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-900">
                      <span className="text-[8px] font-mono uppercase text-zinc-500 font-bold block">Years Experience</span>
                      <span className="text-xs text-white block font-medium leading-normal">{candidate.experience}</span>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono uppercase text-zinc-500 font-bold block">Validated Tech stack</span>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map(skill => (
                        <div key={skill} className="px-3 py-1.5 bg-zinc-950/60 border border-zinc-800 text-zinc-300 text-[10px] rounded-lg font-mono tracking-wider">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download CV Simulated */}
                  <div className="bg-zinc-950/60 p-4 border border-zinc-800/60 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#c084fc]/10 text-[#c084fc] flex items-center justify-center border border-[#c084fc]/20">
                        <FileText size={18} />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">Official Candidate Resume.pdf</span>
                        <span className="text-[10px] text-zinc-500 font-light block">Includes clinical occupational therapy clearance documents</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        showToast("Document Generated", "success", "Candidate portfolio package compiled.");
                      }}
                      className="px-4 py-2 hover:bg-white hover:text-[#0a0a0a] border border-gray-700 bg-transparent text-white text-[10px] font-mono uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                      Download CV
                    </button>
                  </div>

                  {/* Private notes (persisted locally) */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono uppercase text-zinc-500 font-bold tracking-widest block">Private Notes</span>
                    <textarea
                      rows={3}
                      value={notes[cid] ?? ""}
                      onChange={(e) => setNotes(prev => ({ ...prev, [cid]: e.target.value }))}
                      placeholder="Jot down your impressions, follow-ups, or panel feedback…"
                      className="w-full bg-[#050C1A] border border-zinc-800 text-xs px-4 py-3 rounded-xl text-white focus:outline-none focus:border-brand-teal transition-colors resize-none"
                    />
                    <span className="text-[10px] text-zinc-600 font-light">Visible only to you — saved in this browser.</span>
                  </div>
                </motion.div>
              )}

              {activeSubTab === "schedule" && (
                <motion.div 
                  key="sch-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-xl bg-brand-teal/5 border border-brand-teal/20 text-xs text-brand-teal flex items-start gap-3">
                    <Clock size={16} className="shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Virtuabled handles scheduling, automatically matching workspace requirements. Our system provisions high-speed real-time captions and provides localized South African Sign Language (SASL) interpreter feeds on video streams.</p>
                  </div>

                  {isScheduled ? (
                    <div className="p-6 rounded-2xl border border-brand-teal/20 bg-zinc-950/40 text-center space-y-4">
                      <CheckCircle2 size={48} className="text-brand-teal mx-auto" />
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Interview Scheduled Successfully</h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          A video conference room has been secured for <span className="text-white font-semibold">{scheduled?.date}</span> at <span className="text-white font-semibold">{scheduled?.time}</span>.
                          Dual-audio loops are activated.
                        </p>
                      </div>
                      <button
                        onClick={handleReschedule}
                        className="px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase font-mono font-bold bg-white text-zinc-900 transition-colors"
                      >
                        Reschedule
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleScheduleSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest">Select Date</label>
                        <input 
                          type="date" 
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="w-full bg-[#050C1A] border border-zinc-800 text-xs px-4 py-3 rounded-xl text-white focus:outline-none focus:border-brand-teal" 
                          required 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest">Select Time</label>
                        <input 
                          type="time" 
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="w-full bg-[#050C1A] border border-zinc-800 text-xs px-4 py-3 rounded-xl text-white focus:outline-none focus:border-brand-teal" 
                          required 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest">Inclusion Services Requested</label>
                        <select 
                          value={scheduleType}
                          onChange={(e) => setScheduleType(e.target.value)}
                          className="w-full bg-[#050C1A] border border-zinc-800 text-xs px-4 py-3 rounded-xl text-white focus:outline-none focus:border-brand-teal"
                        >
                          <option>Video Call with live AI captioning & high-contrast loop</option>
                          <option>Video Call with South African Sign Language (SASL) interpreter feed</option>
                          <option>Audio-Only Phone Call with instant speech-to-text live-chat overlay</option>
                        </select>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-3.5 rounded-xl bg-brand-teal text-slate-950 font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                      >
                        Dispatch Interview Slot
                      </button>
                    </form>
                  )}
                </motion.div>
              )}

              {activeSubTab === "chat" && (
                <motion.div 
                  key="chat-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex-1 space-y-3 max-h-[180px] overflow-y-auto mb-4 p-2 text-left bg-zinc-950/30 rounded-xl border border-zinc-900">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={cn("p-2.5 rounded-xl max-w-[85%] text-xs shrink-0 flex flex-col", msg.sender === "candidate" ? "bg-zinc-805/80 border border-zinc-800 self-start p-3" : "bg-brand-teal/15 text-white border border-brand-teal/10 self-end ml-auto text-right p-3")}>
                        <span className="font-mono text-[7px] uppercase tracking-wider text-zinc-550 block mb-1">
                          {msg.sender === "candidate" ? candidate.name : "System User"}
                        </span>
                        <span>{msg.text}</span>
                        <span className="text-[7.5px] text-zinc-500 mt-2 font-light self-end">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type inclusive query... (Press Enter to transmit)" 
                      value={messageText} 
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 bg-[#050C1A] border border-zinc-800 text-xs px-4 py-3 rounded-xl text-white focus:outline-none focus:border-brand-teal"
                    />
                    <button 
                      type="submit" 
                      className="px-4 bg-[#7a39ec] hover:bg-[#6c28d8] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer controls: Shortlisting and direct inquiries */}
          <div className="p-6 border-t border-zinc-800/80 bg-zinc-950/40 shrink-0 flex gap-4">
            <button 
              onClick={onToggleShortlist}
              className={cn(
                "flex-1 py-3.5 rounded-xl text-xs font-mono uppercase font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border",
                isShortlisted 
                  ? "bg-zinc-900 border-red-500/20 text-red-400 hover:bg-red-500/5 hover:text-red-300"
                  : "bg-brand-teal/10 border-brand-teal/30 text-brand-teal hover:bg-brand-teal hover:text-black"
              )}
            >
              {isShortlisted ? (
                <>
                  <UserMinus size={14} /> Remove Shortlist
                </>
              ) : (
                <>
                  <UserPlus size={14} /> Bookmark Shortlist
                </>
              )}
            </button>
            <a 
              href={`mailto:${candidate.contactEmail}?subject=Virtuabled Accommodation Opportunity`}
              className="px-6 py-3.5 border border-zinc-800 hover:border-zinc-550 bg-zinc-950 text-white text-xs uppercase tracking-widest font-mono font-bold rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
            >
              Direct Inquiry
            </a>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
