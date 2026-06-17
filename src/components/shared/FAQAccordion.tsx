import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  accordionId: string;
}

export function FAQAccordion({ items, accordionId }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleIndex(index);
    }
  };

  return (
    <div className="space-y-4 w-full" id={`faq-accordion-${accordionId}`}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${accordionId}-btn-${idx}`;
        const panelId = `${accordionId}-panel-${idx}`;

        return (
          <div
            key={item.id || idx}
            className="bg-[#0e172a] border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-md"
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left text-zinc-150 hover:text-white transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-brand-teal/50"
              >
                <span className="text-sm font-semibold flex items-center gap-3">
                  <HelpCircle size={16} className={`${isOpen ? "text-brand-amber" : "text-brand-teal"} shrink-0`} />
                  {item.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-zinc-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-brand-teal" : ""
                  }`}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-900 text-xs md:text-sm text-zinc-400 font-light leading-relaxed font-sans">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
