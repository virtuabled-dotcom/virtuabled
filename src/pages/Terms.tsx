import React from 'react';
import { HeroAuroraBackdrop } from "@/components/shared/HeroAuroraBackdrop";
import { motion } from 'framer-motion';
import { FileText, ClipboardList, AlertCircle, Scale, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/shared/Breadcrumb';

export default function Terms() {
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
          <span className="text-brand-coral font-bold tracking-widest uppercase text-xs mb-4 block px-3 py-1 bg-brand-coral/10 border border-brand-coral/20 w-max rounded-md">Legal Infrastructure</span>
          <h1 className="text-4xl md:text-6xl font-display font-light leading-none tracking-tight mb-6">
            Terms of <span className="font-medium italic">Service.</span>
          </h1>
          <p className="text-zinc-400 font-light text-lg">
            Operational bylaws governing candidates, employer portals, proprietary active back-hunting streams, and inclusive workstation setups.
          </p>
        </motion.div>

        {/* Core Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <ClipboardList className="text-brand-coral mb-4" size={24} />
            <h4 className="text-white font-medium mb-1">Candidate Warranties</h4>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Registered candidates guarantee skill accuracy. No charges are ever levied on job seekers. Sourcing remains completely free.
            </p>
          </div>
          <div className="p-6 bg-[#0c0c0c] border border-gray-800 rounded-2xl">
            <Scale className="text-brand-coral mb-4" size={24} />
            <h4 className="text-white font-medium mb-1">Employer Compliance</h4>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Corporate portal users commit to fair audit, reasonable UI accommodations, and adhering to strict statutory equity hiring standards.
            </p>
          </div>
          <div className="p-[#121212] bg-gradient-to-br from-brand-coral/5 to-[#0c0c0c] border border-brand-coral/25 p-6 rounded-2xl">
            <AlertCircle className="text-brand-coral mb-4" size={24} />
            <h4 className="text-white font-medium mb-1">Outbound Auto Hunt</h4>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Our automated outbound processes continuously reverse-engineer applications to bridge high unemployment numbers in the disabled community.
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
          <section id="agreement" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">1. Agreement to Terms and Operational Framework</h3>
            <p className="mb-4">
              These Terms of Service (“Terms”) constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and Virtuabled Pty Ltd, its subsidiaries, concerning your access to and use of our web application (https://virtuabled.com), internal employer portals, and candidate sourcing databases.
            </p>
            <p className="mb-4">
              By accessing our platform, registering a profile, configuring accessibility metrics, running compliance calculators, or matching candidate profiles, you acknowledge that you have read, understood, and agreed to be bound by these entire Terms. If you do not accept these provisions, you are strictly prohibited from utilizing our digital tools.
            </p>
          </section>

          <section id="candidate-bylaws" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">2. Candidate Sourcing Bylaws (No Fee Mandate)</h3>
            <p className="mb-4">
              Our primary operational mandate is the dismantling of hiring friction that prevents qualified disabled individuals from finding meaningful work. Accordingly, the following criteria govern Candidate accounts:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong>Absolute Cost-Free Sourcing:</strong> Candidates will never, under any circumstances, be charged fees for resume parsing, voice-driven intake, matching algorithm listings, or workspace hardware consulting. Sourcing remains 100% free for applicants.</li>
              <li><strong>Profile Accuracy:</strong> Candidates warrant that all skill profiles, CV details, and specified accommodation parameters represent honest, factual professional history. False or misleading submissions may result in permanent portal suspension.</li>
              <li><strong>Active-Hunting Consent:</strong> Users understand that our platform is fundamentally active, not passive. Uploading a resume authorizes our matching engine to read and analyze your profile, model target role alignments, search enterprise job ecosystems, and reach out directly to corporate recruiters with custom workspace matching packages on your behalf.</li>
            </ul>
          </section>

          <section id="employer-rules" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">3. Employer Sourcing Rules and Compliance Tracking</h3>
            <p className="mb-4">
              Corporate portal users, hiring managers, and enterprise directors are bound by the following mandates:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong>Mandate of Reasonable Accommodation:</strong> By using our candidate search engine, tracking compliance on our Employer Portal, or licensing our remote BPO solutions, you commit to establishing a workplace environment that respects the specific physical or software needs of the placed talent, conforming with the South African Code of Good Practice on Employment of People with Disabilities.</li>
              <li><strong>Audit Integrity:</strong> Data outputs from our compliance calculators represent illustrative estimates of liability and statutory goals based on guidelines of the Department of Employment and Labour. They do not constitute formal legal counsel. Employers remain independently accountable for official regulatory filings.</li>
              <li><strong>Access Control:</strong> Candidate profiles surfaced through the search filters contain unique accessibility details that are highly confidential. Employers shall process, handle, and store such metrics in exact adherence with POPIA parameters.</li>
            </ul>
          </section>

          <section id="liability-limitations" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">4. Limitations of Liability and Warranty Exclusions</h3>
            <p className="mb-4">
              Virtuabled acts as an engineering intermediary. We provide advanced matching, remote infrastructure configurations, and software interfaces to make workplaces accessible. While our system operates high-grade algorithms, we make no representation that any candidate profile will secure any specific role or that any employer will execute placements.
            </p>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, VIRTUABLED WILL NOT BE HELD LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE PLATFORM, WORKSPACE RECOMMENDATIONS, OR MATTERS RELATING TO PLACED WORKERS.
            </p>
          </section>

          <section id="governing-law" className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">5. Governing Law</h3>
            <p className="mb-4">
              These Terms and your use of our platform shall be governed by, interpreted, and enforced in accordance with the laws of the Republic of South Africa, without regard to conflicts of law principles. Any dispute arising under these terms shall be subject to the exclusive jurisdiction of the High Court of South Africa.
            </p>
            <p className="mt-4">
              For administrative inquiries regarding intellectual property rights or contract licensing constraints, reach out to us at <a href="mailto:hello@virtuabled.com" className="text-brand-coral hover:underline font-medium">hello@virtuabled.com</a>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
