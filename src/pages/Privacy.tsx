import React from 'react';
import { HeroAuroraBackdrop } from "@/components/shared/HeroAuroraBackdrop";
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Server, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/shared/Breadcrumb';

export default function Privacy() {
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
          <span className="text-brand-teal font-bold tracking-widest uppercase text-xs mb-4 block px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 w-max rounded-md">Legal Infrastructure</span>
          <h1 className="text-4xl md:text-6xl font-display font-light leading-none tracking-tight mb-6">
            Privacy <span className="font-medium italic">Policy.</span>
          </h1>
          <p className="text-zinc-400 font-light text-lg">
            How Virtuabled secures biometric voice maps, physical accommodation checklists, and professional resumes with enterprise-grade encryption.
          </p>
        </motion.div>

        {/* Core Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <Shield className="text-brand-teal mb-4" size={24} />
            <h4 className="text-white font-medium mb-1">State-of-the-Art POPIA</h4>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Meticulously aligned with SA Protection of Personal Information Act. Disability metrics require explicit client telemetry consent.
            </p>
          </div>
          <div className="p-6 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <Eye className="text-brand-teal mb-4" size={24} />
            <h4 className="text-white font-medium mb-1">Biometric Voice Protection</h4>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Audio data processed by the Elmarie audio widget uses client-side voice-to-text; raw recording waveforms are not persisted on remote database logs.
            </p>
          </div>
          <div className="p-6 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <Lock className="text-brand-teal mb-4" size={24} />
            <h4 className="text-white font-medium mb-1">Zero Third-Party Sharing</h4>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Candidate blueprints are exclusively accessible to verified, premium corporate networks looking to close 3% Employment Equity quotas.
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
          <section id="introduction" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">1. Scope and Information Collected</h3>
            <p className="mb-4">
              Virtuabled Pty Ltd (“Virtuabled”, “we”, “our”, or “us”) operates advanced onboarding, voice-driven skills parsing, and matching engines to pair qualified disabled candidates with enterprise jobs. To facilitate these matching sequences, we process personal information that falls within standard and special categories as defined by the Protection of Personal Information Act, No. 4 of 2013 (“POPIA”).
            </p>
            <p className="mb-4">
              We collect information directly from you when you register on our Candidate Portal, use the Elmarie voice interactive widget, submit a curriculum vitae (resume), or communicate directly with our sourcing agents. This data includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong>Inherent Personal Identification:</strong> Full name, telephone numbers, geographic location, primary language preference, and email address.</li>
              <li><strong>Professional Experience Background:</strong> Career history, educational certifications, skill proficiencies, and software competencies.</li>
              <li><strong>Self-Declared Disability Metrics:</strong> Specific information regarding physical, sensory, cognitive, or neurodivergent accommodations required to execute work. This special, sensitive data represents a core requirement for our statutory tracking models.</li>
              <li><strong>Dynamic UI Telemetry:</strong> High-Contrast configurations, reading preferences, keyboard navigational traces, and platform interaction logs.</li>
            </ul>
          </section>

          <section id="processing-purposes" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">2. Processing Justification and Sourcing Integrity</h3>
            <p className="mb-4">
              We process your special personal information on the ground of explicit, voluntary, written or digital consent. Candidates utilize Virtuabled as an proactive tool to manage their placement. By uploading a CV and completing our multi-modal profile, you instruct our back-hunting engine to locate corporate roles that provide corresponding workspace layouts.
            </p>
            <p className="mb-4">
              We justify this handling on the following bases:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong>The Execution of Sourcing Proposals:</strong> Negotiating and presenting customized remote setups, licensing requirements, and matching candidates with verified employers.</li>
              <li><strong>Employment Equity Legislative Benchmarking:</strong> Creating aggregate compliance maps so enterprise partners can measure progress toward South African 2030 ESG and BBEEE inclusive talent requirements.</li>
            </ul>
          </section>

          <section id="data-retention" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">3. Absolute Security Infrastructure</h3>
            <p className="mb-4">
              All stored information is stored on isolated server instances equipped with TLS 1.3 protocol filters. Storage arrays utilize AES-256 military-grade encryption at rest. Audit trails monitor each instance where a corporate hiring manager view, downloads, or matches with a Candidate profile.
            </p>
            <div className="p-4 bg-zinc-900 border border-gray-800 rounded-xl flex items-start gap-4 my-6">
              <Server className="text-brand-coral shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-zinc-400">
                <span className="text-white block font-medium mb-1">Local Hosting Framework</span>
                Our technical systems run inside secure, isolated data center regions. This guarantees compliance with South Africa’s cross-border information transfer laws. Sensitive biometric credentials never leave democratic, legally regulated zones.
              </div>
            </div>
          </section>

          <section id="candidate-rights" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">4. Candidate Rights and Data Rectification</h3>
            <p className="mb-4">
              You maintain total, perpetual ownership of your digital profile. At any time, you are legally entitled to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Access and review all personal and accessibility-indexed records held in our databases.</li>
              <li>Correct, amend, or adjust any outdated CV attributes, listed skillset points, or specified accommodation parameters.</li>
              <li>Permanently delete your profile. Upon receiving a deletion request, our technical operators strip all identifying markers from database storage within 48 business hours.</li>
            </ul>
            <p className="mt-4">
              To submit an inquiry, audit request, or file a POPIA objection, contact our designated Information Officer directly at <a href="mailto:hello@virtuabled.com" className="text-brand-teal hover:underline font-medium">hello@virtuabled.com</a>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
