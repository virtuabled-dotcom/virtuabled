import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, Send, CheckCircle2, Heart, Sparkles } from "lucide-react";
import elmarieAvatar from "@/assets/images/elmarie_avatar_1780826165738.png";

// Curated FAQ framework (fallback / quick answers)
const FOUNDER_FAQS = [
  {
    id: "origin",
    category: "Our Origin Story",
    question: "Why was Virtuabled founded?",
    answer: "Founder Eugene Hefer broke his back in a car accident at 19 and spent years on the outside of every system that was supposed to work. He climbed out through a Virgin Active learnership, then spent twelve years in tech building recruitment systems and remote teams. When he watched a friend — just as qualified — stay locked out, he pointed those tools at his own people. Virtuabled is the door he needed and didn't find."
  },
  {
    id: "ee_mandate",
    category: "The 3% EE Target",
    question: "How do you help us meet the 3% Employment Equity target?",
    answer: "We place qualified professionals with disabilities into real, permanent roles — not quota fillers. We read a candidate's CV, match their skills to live vacancies, and bring the accommodation and 30/60/90-day retention support with them. That closes the gap the Department of Labour measures you against, sustainably."
  },
  {
    id: "bee_scorecard",
    category: "B-BBEE Scorecard",
    question: "Can these placements count toward Skills Development?",
    answer: "Yes. Combining accommodated employment with certified training streams lets sponsors claim learnership scorecard points. We keep POPIA-secured training logs and audit dossiers for year-end verification."
  },
  {
    id: "audits_accommodations",
    category: "Workspace Accommodations",
    question: "What workplace modifications do you handle?",
    answer: "We assess both the physical space and the software setup — ergonomic seating, specialised keyboards, screen-zoom and high-contrast layouts, or alternative input devices. The goal is simple: remove the barrier so capability does the rest. (I'm Elmarie, the platform's AI guide — the audits are run by Virtuabled's team.)"
  }
];

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Elmarie — your guide to Virtuabled. Ask me about getting placed, hiring through us, or how South Africa's 3% Employment Equity target works.",
};

export function ElmarieWidget() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "faqs" | "send-line">("chat");
  const [selectedFaqId, setSelectedFaqId] = useState<string>("origin");
  const [inputText, setInputText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // AI chat state
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-open on homepage once per session so the popup is visible on the hero
  useEffect(() => {
    if (location.pathname !== "/") return;
    if (sessionStorage.getItem("elmarie-greeted")) return;
    const t = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("elmarie-greeted", "1");
    }, 2000);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Keyboard shortcut: Alt + E to toggle the guide widget
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "e" || e.key === "E")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const sendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch("/api/elmarie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      const reply = (data && data.reply) ? String(data.reply) : "";
      if (!reply) throw new Error("empty reply");
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I can't reach my AI right now. Try the Quick Answers tab, or email us at hello@virtuabled.com and we'll come straight back to you.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsSending(true);
    // Route the message to the team inbox via the visitor's email client.
    const body = `${inputText.trim()}\n\n— Sent from virtuabled.com`;
    window.location.href = `mailto:hello@virtuabled.com?subject=${encodeURIComponent("Message via Virtuabled site")}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      setIsSending(false);
      setMessageSent(true);
      setInputText("");
    }, 800);
  };

  const currentFaq = FOUNDER_FAQS.find((f) => f.id === selectedFaqId) || FOUNDER_FAQS[0];

  return (
    <>
      {/* Floating launcher button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 200);
          }
        }}
        id="elmarie-launcher-btn"
        aria-label="Open Elmarie — Virtuabled guide"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full overflow-hidden shadow-2xl bg-zinc-950 border-2 border-brand-teal/60 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-brand-teal group cursor-pointer"
      >
        <div className="absolute inset-0 bg-brand-teal/10 group-hover:bg-brand-teal/20 transition-colors z-10" />
        <img
          src={elmarieAvatar}
          alt="Elmarie — Virtuabled guide"
          className="w-full h-full object-cover object-center relative z-0"
          referrerPolicy="no-referrer"
        />
      </motion.button>

      {/* Main Support Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-labelledby="support-line-title"
            className="fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-120px)] bg-[#090b11] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col font-sans"
          >
            {/* Header branding */}
            <div className="p-5 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Animated 3D motion vector logo */}
                <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" style={{ filter: "drop-shadow(0 0 6px rgba(20,184,166,0.5))" }}>
                    <defs>
                      <linearGradient id="wdg-body" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#0d9488" />
                      </linearGradient>
                      <radialGradient id="wdg-sun" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="40%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                      </radialGradient>
                    </defs>
                    <rect width="100" height="100" rx="22" fill="#0B132B" />
                    <circle cx="50" cy="40" r="13" fill="url(#wdg-body)" />
                    <path d="M 27,74 C 27,60 37,55 50,55 C 63,55 73,60 73,74 Z" fill="url(#wdg-body)" />
                    {/* Orbit ring + accent dots — SMIL spin around body centre */}
                    <g transform="translate(50, 55)">
                      <g>
                        <ellipse cx="0" cy="0" rx="36" ry="14" stroke="#14b8a6" strokeWidth="2.5" fill="none" opacity="0.95" />
                        <circle cx="26" cy="-9" r="7" fill="url(#wdg-sun)" />
                        <circle cx="-35" cy="-2" r="3" fill="#fbbf24" />
                        <circle cx="28" cy="9" r="3" fill="#fbbf24" />
                        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-15" to="345" dur="4s" repeatCount="indefinite" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div>
                  <h4 id="support-line-title" className="font-display font-bold text-sm tracking-wide text-white uppercase">
                    Elmarie
                  </h4>
                  <p className="text-[10px] text-brand-teal flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal inline-block animate-pulse" />
                    YOUR VIRTUABLED GUIDE
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Support Panel"
                className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Mission banner block */}
            <div className="px-5 py-3 bg-[#11192A] border-b border-white/5 text-[11px] text-zinc-350 leading-relaxed font-sans flex items-center gap-2">
              <Heart size={14} className="text-brand-coral shrink-0" />
              <span>AI guide • Walking you through every step, across South Africa</span>
            </div>

            {/* Support Mode Tabs */}
            <div className="grid grid-cols-3 border-b border-white/5 text-[11px] font-mono">
              {([
                ["chat", "Ask Elmarie"],
                ["faqs", "Quick Answers"],
                ["send-line", "Email Us"],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setMessageSent(false);
                  }}
                  className={`py-3.5 text-center uppercase tracking-wider transition-colors ${
                    activeTab === key
                      ? "text-brand-teal bg-white/[0.01] font-bold border-b-2 border-brand-teal"
                      : "text-zinc-550 hover:text-zinc-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Body content */}
            <div className="flex-1 overflow-y-auto p-5 bg-zinc-950/40">
              {activeTab === "chat" ? (
                <div className="flex flex-col gap-3 min-h-full">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed font-light ${
                        m.role === "user"
                          ? "self-end bg-brand-teal text-[#0a0a0c] rounded-br-sm"
                          : "self-start bg-zinc-900/70 border border-white/5 text-zinc-200 rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="self-start bg-zinc-900/70 border border-white/5 text-zinc-400 rounded-2xl rounded-bl-sm px-4 py-2.5 text-xs flex items-center gap-1.5">
                      <Sparkles size={12} className="text-brand-teal animate-pulse" /> Elmarie is typing…
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              ) : activeTab === "faqs" ? (
                <div className="space-y-4 h-full flex flex-col">
                  <div className="grid grid-cols-2 gap-2">
                    {FOUNDER_FAQS.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => setSelectedFaqId(faq.id)}
                        className={`p-3 text-left rounded-xl transition-all border text-[11px] ${
                          selectedFaqId === faq.id
                            ? "bg-brand-teal/5 border-brand-teal text-brand-teal font-semibold"
                            : "bg-white/[0.02] border-white/5 text-zinc-450 hover:text-zinc-200"
                        }`}
                      >
                        {faq.category}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 bg-zinc-900/60 border border-white/5 rounded-2xl flex-1 flex flex-col justify-start">
                    <div className="flex items-start gap-2 text-brand-amber font-semibold text-xs uppercase mb-2">
                      <HelpCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{currentFaq.question}</span>
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed font-sans font-light">
                      {currentFaq.answer}
                    </p>
                  </div>
                </div>
              ) : (
                /* Email Us (routes via the visitor's mail client) */
                <div className="h-full flex flex-col justify-between">
                  {!messageSent ? (
                    <form onSubmit={handleSendDirectMessage} className="space-y-5">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-brand-amber uppercase tracking-widest block">
                          Direct to the team
                        </span>
                        <h5 className="text-sm font-semibold text-white uppercase tracking-wider">
                          Send us a message
                        </h5>
                        <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
                          Candidate looking for a role, or an employer or NPO wanting to partner — write to us and it lands at hello@virtuabled.com. (Businesses &amp; NPOs can also reach partners@virtuabled.com.)
                        </p>
                      </div>

                      <div className="space-y-3">
                        <textarea
                          placeholder="Your message, accommodation request, or questions…"
                          required
                          rows={5}
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          className="w-full bg-[#10131c] border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-teal leading-relaxed resize-none font-sans font-light"
                        />
                        <button
                          type="submit"
                          disabled={isSending || !inputText.trim()}
                          className={`w-full py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors ${
                            inputText.trim() && !isSending
                              ? "bg-brand-teal text-[#0a0a0c] hover:bg-white"
                              : "bg-zinc-850 text-zinc-500 cursor-not-allowed"
                          }`}
                        >
                          {isSending ? "Opening email…" : "Open Email"}
                          <Send size={12} />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-4 my-auto p-4"
                    >
                      <div className="w-12 h-12 bg-brand-teal/10 border border-brand-teal/30 rounded-full flex items-center justify-center mx-auto text-brand-teal">
                        <CheckCircle2 size={24} />
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-white uppercase tracking-wider">
                          Email drafted
                        </h5>
                        <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
                          We've opened your email client addressed to hello@virtuabled.com — just hit send and we'll write back personally.
                        </p>
                      </div>
                      <button
                        onClick={() => setMessageSent(false)}
                        className="px-5 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-[10px] font-mono uppercase tracking-wider"
                      >
                        Write Another
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Chat composer (only in chat tab) */}
            {activeTab === "chat" && (
              <form onSubmit={sendChat} className="p-3 border-t border-white/5 bg-[#0a0a0e] flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask Elmarie anything…"
                  className="flex-1 bg-[#10131c] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-teal font-sans"
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  aria-label="Send message to Elmarie"
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    chatInput.trim() && !chatLoading
                      ? "bg-brand-teal text-[#0a0a0c] hover:bg-white"
                      : "bg-zinc-850 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <Send size={15} />
                </button>
              </form>
            )}

            {/* Hotkey display line */}
            <div className="px-4 py-2 border-t border-white/5 bg-[#0a0a0e] text-center text-[9px] text-zinc-600 font-mono tracking-wider">
              HOTKEY: ALT + E • ESC TO CLOSE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Alias exported for seamless full compatibility across existing imports
export const DirectHumanSupportLine = ElmarieWidget;
