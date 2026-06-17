import React from 'react';
import { HeroAuroraBackdrop } from "@/components/shared/HeroAuroraBackdrop";
import { motion } from 'framer-motion';
import { Eye, Keyboard, Mic, Heart, Accessibility, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/shared/Breadcrumb';

export default function AccessibilityPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-ink text-zinc-100 relative overflow-hidden">
      <HeroAuroraBackdrop tint="#14B8A6" />
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb / Back button */}
        <Breadcrumb />

        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-brand-teal font-bold tracking-widest uppercase text-xs mb-4 block px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 w-max rounded-md">Universal Standard</span>
          <h1 className="text-4xl md:text-6xl font-display font-light leading-none tracking-tight mb-6">
            Accessibility <span className="font-medium italic">Statement.</span>
          </h1>
          <p className="text-zinc-400 font-light text-lg">
            Our commitment to a structurally barrier-free digital environment. We don't just advocate for accessibility—we build it into every viewport.
          </p>
        </motion.div>

        {/* Core Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          <div className="p-5 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <Eye className="text-brand-teal mb-3" size={22} />
            <h4 className="text-white text-sm font-medium mb-1">High Contrast Toggle</h4>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
              Toggle class settings on the document root instantly to invoke eye-safe high contrast mode for readability.
            </p>
          </div>
          <div className="p-5 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <Keyboard className="text-brand-teal mb-3" size={22} />
            <h4 className="text-white text-sm font-medium mb-1">Full Keyboard Navigate</h4>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
              100% accessible via standard keyboard focus structures, logical tabs, and custom skip navigations.
            </p>
          </div>
          <div className="p-5 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <Mic className="text-brand-teal mb-3" size={22} />
            <h4 className="text-white text-sm font-medium mb-1">Elmarie Voice Input</h4>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
              Voice-driven assistants allow non-sighted or motor-disabled applicants to parse requirements seamlessly.
            </p>
          </div>
          <div className="p-5 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <Accessibility className="text-brand-teal mb-3" size={22} />
            <h4 className="text-white text-sm font-medium mb-1">WCAG 2.1 AA Compliant</h4>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
              Meticulously engineered to conform with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and AAA parameters.
            </p>
          </div>
        </div>

        {/* Detailed Written Prose */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-10 text-zinc-300 font-light text-sm leading-relaxed"
        >
          <section id="policy-goals" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">1. Structural Inclusivity Paradigm</h3>
            <p className="mb-4">
              At Virtuabled, universal access is not a secondary checkbox—it is our absolute design driver. Standard corporate platforms continue to present enormous digital roadblocks to individuals of varying physical, visual, sensory, or cognitive capabilities. Our platform is continuously re-engineered to guarantee that every single user, candidate, and corporate hiring officer can operate with equivalent autonomy, speed, and comfort.
            </p>
            <p className="mb-4">
              Our website uses HTML5 structured semantics, responsive fluid flex layouts, and explicit ARIA (Accessible Rich Internet Applications) landmarks to ensure that the internal site context translates cleanly to modern screen readers and assistive devices.
            </p>
          </section>

          <section id="conformance-status" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">2. WCAG Conformance and Design Measures</h3>
            <p className="mb-4">
              To guarantee optimal usability across all profiles, Virtuabled takes the following strict technical measures:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong>High-Contrast Modality:</strong> We have engineered a global, persistent accessibility switch inside the custom navigation header. Activating this toggle injects the <code>.high-contrast</code> styling class onto the <code>html</code> root element, modifying colors, enhancing outline borders, intensifying text weight, and setting contrast ratios to conform with WCAG 2.1 Level AAA requirements (&gt; 7:1).</li>
              <li><strong>Form Control Accessibility:</strong> Standard web forms have been overhauled. We support both manual, high-contrast inputs and fully operational voice-driven intake forms powered by our Elmarie Voice Assistant widget, allowing candidates with physical or motor impairments to navigate and complete records comfortably.</li>
              <li><strong>Alt-Text Scribing:</strong> All functional visual graphics, illustration assets, and dynamically generated charts include explicit, contextual description parameters (<code>alt</code> text or <code>aria-label</code> containers) ensuring Screen Readers (such as NVDA, JAWS, or VoiceOver) digest information perfectly.</li>
              <li><strong>Substantial Touch Footprints:</strong> Mobile viewports and responsive touch targets maintain at least a 44px by 44px footprint, avoiding crowded click maps and preventing incorrect selection events.</li>
            </ul>
          </section>

          <section id="keyboard-spec" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">3. Keyboard and Focus Navigation Standards</h3>
            <p className="mb-4">
              Our platform offers comprehensive keyboard operation capability. Crucial interface rules implemented include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Logical <code>tabindex</code> progressions that sequence naturally matching the visual direction of layouts.</li>
              <li>Highly visible focus indicators (e.g. glowing borders, high-contrast outlines) that clearly indicate the active interactive item.</li>
              <li>Persistent accessibility skip links when using nested portals, enabling keyboard users to skip header lists and land immediately inside primary content divs.</li>
            </ul>
          </section>

          <section id="continuous-assessment" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">4. Ongoing Auditing and Feedback Loop</h3>
            <p className="mb-4">
              We understand that accessibility is an ongoing journey. We periodically test our interfaces using automated validators (including Google Lighthouse and axe Pro) alongside subjective manual testing conducted by specialized assessors from the disabled community.
            </p>
            <p className="mb-4">
              Despite our rigorous quality assurance metrics, some sections may present unexpected friction depending on outdated browser or screen reader configurations. If you encounter any access barriers, visual distortions, or keyboard traps, please contact us immediately so our technical engineering team can deploy a hotfix:
            </p>
            <div className="p-6 bg-zinc-900 border border-gray-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-6">
              <div>
                <span className="text-white block font-medium">Submit Accessibility Feedback</span>
                <span className="text-zinc-400 text-xs mt-1 block">Help us maintain a 100% barrier-free ecosystem.</span>
              </div>
              <a href="mailto:hello@virtuabled.com" className="px-5 py-2.5 bg-brand-teal text-[#0a0a0a] text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform shrink-0">
                Email Technical Support
              </a>
            </div>
          </section>

          <div className="flex items-center gap-3 pt-6 text-xs text-zinc-500 italic">
            <Heart size={14} className="text-brand-coral" /> This Accessibility Statement was last reviewed, optimized, and validated on June 8, 2026.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
