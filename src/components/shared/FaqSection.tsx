import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Laptop, ShieldCheck, Cpu, Briefcase } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How do Virtuabled's technical adaptations empower remote placements?",
      answer: "Virtuabled builds and delivers tailored remote workstations equipped with customized hardware wrappers (e.g., modern screen readers, eye-tracking rigs, sip-and-puff adaptors) while managing recruitment paths, physical logistics, end-to-end SLA compliance, and support via daily administrative check-ins.",
      icon: <Cpu className="text-brand-teal" size={16} />
    },
    {
      question: "Is there any financial cost for candidates to configure and receive these workspaces?",
      answer: "No, candidate workstations are entirely funded by Virtuabled and our partner organizations. We craft custom-adapted systems (including specialized mouse controllers, braille displays, and cognitive layouts) and ship them straight to candidates' homes at zero personal expense. This removes any initial hardware friction.",
      icon: <Laptop className="text-brand-coral" size={16} />
    },
    {
      question: "How do you guarantee enterprise-grade data security across remote adapted devices?",
      answer: "All hardware devices operate on Virtuabled's custom compliance sandbox configurations. They are configured with end-to-end secure VPNs, standard identity access controls, and are isolated from personal web activities. They adhere completely to standard ISO 27001 configurations and corporate IT security requirements.",
      icon: <ShieldCheck className="text-zinc-400" size={16} />
    },
    {
      question: "How does our organization calculate compliance equity benefits from this framework?",
      answer: "Virtuabled provides regular auditable reporting of the remote team, helping your HR department seamlessly declare disability representation metrics to satisfy BBBEE statutory requirements, Employment Equity quotas, or international corporate ESG goals. We manage the payroll administrative burden under standard Service Level Agreements.",
      icon: <Briefcase className="text-brand-amber" size={16} />
    },
  ];

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mt-20 border-t border-zinc-850 pt-16" id="faq-interactive-accordion">
      <div className="text-center mb-12">
        <span className="text-[10px] font-mono tracking-widest text-[#999] uppercase bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded w-max mx-auto block mb-3 font-bold">
          System Inquiry & FAQ
        </span>
        <h2 className="text-2xl md:text-4xl font-display font-light text-white">
          Integration <span className="font-medium italic text-brand-teal">Schedules.</span>
        </h2>
        <p className="text-zinc-450 text-xs font-light max-w-lg mx-auto mt-2 leading-relaxed">
          Unpacking the operational link between automated assistive technology presets and continuous human enterprise support.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#08080a] border border-zinc-850 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 select-none focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    {faq.icon}
                  </div>
                  <span className="text-sm font-medium text-white/90 font-sans tracking-wide">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="text-zinc-500 shrink-0"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 text-xs text-zinc-400 font-light leading-relaxed border-t border-zinc-900/50 font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
