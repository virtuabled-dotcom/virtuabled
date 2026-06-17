import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HeroVideo } from "@/components/shared/HeroVideo";

const FOUNDATIONS = [
  {
    title: "Lived experience",
    detail: "Built by someone who spent years on the wrong side of the access gap, then twelve years building the recruitment systems to close it. Not theory — method.",
  },
  {
    title: "The law is moving",
    detail: "South Africa's Employment Equity targets now set a 3% disability threshold for designated employers. Inclusion is no longer optional — it is measured.",
  },
  {
    title: "A real, unmet gap",
    detail: "Over 2.5 million working-age South Africans live with a disability, yet roughly 1.3% of the formal workforce is represented. The distance between those numbers is the work.",
  },
];

const BELIEFS = [
  {
    title: "The difference is access",
    desc: "A disabled person and an abled-body person are, in every meaningful sense, the same — same intellect, ambition, and capacity to deliver. The difference is access. And access is fixable.",
  },
  {
    title: "Transformation isn't a number on a report",
    desc: "Genuine change isn't achieved by editing an EE figure. It's achieved by changing what companies believe is possible and what candidates believe they deserve.",
  },
  {
    title: "Compliance and culture are not opposites",
    desc: "The companies that do this right are more commercially competitive, not less. Inclusion is a business strategy. We are the evidence.",
  },
];

export default function About() {
  return (
    <div className="pt-24 pb-0 bg-[#0B132B] text-zinc-100 min-h-screen relative overflow-hidden">
      {/* Decorative BG light */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Spinal column video — the lived-experience centerpiece (right half of hero) */}
      <div className="absolute top-0 right-0 w-1/2 h-[88vh] hidden lg:block" aria-hidden>
        <HeroVideo src="/images/hero-spine.mp4" poster="/images/hero-spine.jpg" tint="#14B8A6" scrim={false} className="w-full h-full" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0B132B] to-transparent pointer-events-none z-[3]" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0B132B] to-transparent pointer-events-none z-[3]" />
      </div>

      {/* band 1: Hero */}
      <div className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <Breadcrumb />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mt-8"
        >
          <span className="text-brand-amber font-mono font-bold tracking-widest uppercase text-[10px] mb-4 block px-3 py-1 bg-brand-amber/10 border border-brand-amber/20 w-max rounded-md">
            Why Virtuabled Exists
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-light leading-[1.05] tracking-tight mb-8">
            I built the company because I <span className="font-medium italic text-brand-teal">lived the problem.</span>
          </h1>
          <p className="text-zinc-300 font-light text-xl leading-relaxed max-w-3xl font-sans">
            Virtuabled was founded by Eugene Hefer — a paraplegic entrepreneur who spent three years on the streets before building a career in tech, and who built this platform because he kept watching capable people get locked out of a system that wasn't designed for their bodies.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/genesis" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-teal text-slate-950 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors">
              Read Eugene's Story <ArrowRight size={16} />
            </Link>
            <Link to="/for-employers" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-200 font-bold text-sm uppercase tracking-widest hover:border-white hover:text-white transition-colors">
              For Employers
            </Link>
          </div>
        </motion.div>
      </div>

      {/* band 2: The Founder's Story */}
      <div className="bg-[#0B132B] py-20 px-6 border-t border-zinc-850">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 order-2 lg:order-1"
          >
            <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
              The Founder's Story
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-light text-white leading-tight">
              This is where Virtuabled comes from.
            </h2>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light font-sans">
              Eugene Hefer grew up in Stellenbosch. He was an athlete — sport was his whole life. At 19, on his way home from a holiday, a car accident broke his back. What followed was a year and eight months in hospitals and rehabilitation centres, and surgery on both hips.
            </p>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light font-sans">
              He got out. A year later his mother died — he had already lost the rest of his family to cancer. He ended up on the streets with a wheelchair and a backpack. Three months in, a pressure sore kept him flat on his stomach for the next three years.
            </p>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light font-sans">
              When he finally got up, he was taken in by Turfhall Cheshire Home in Cape Town's southern suburbs. He put himself in front of every recruiter he could find and got the first learnership he interviewed for — a call-centre role at Virgin Active. He pushed to work from the shelter to Lansdowne station every morning, in the rain, sometimes throwing his wheelchair out of carriage doors when trains stopped between platforms. In his first month he posted the highest sales in the centre, and eventually opened the Virgin Active club at Table Bay Mall.
            </p>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light font-sans">
              From there: twelve years building operations infrastructure and remote teams for companies across South Africa, the UK, and the US. Then he watched a friend — brilliant, qualified, experienced — still locked out, because the system wasn't built for his body. He had spent years building the exact tools that could fix it. He should be pointing them at his own people.
            </p>
            <p className="text-white text-base md:text-lg font-medium leading-relaxed font-sans">
              That is why Virtuabled exists. Not charity. Not compliance theatre. A structural solution built by someone who needed it and didn't find it.
            </p>
            <p className="text-zinc-400 font-light text-sm leading-relaxed font-sans italic border-l-2 border-brand-teal/40 pl-4">
              "I do not tell this for sympathy. I know exactly what the bottom looks like — and I know it is possible to climb out."
            </p>
            <p className="text-[10px] font-mono text-brand-teal uppercase tracking-widest">— Eugene Hefer, Founder</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-4"
          >
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800/60 bg-zinc-950 aspect-[4/5]">
              <img
                src="/images/eugene-virgin-active.jpg"
                alt="Eugene Hefer at Virgin Active Table Bay Mall — where his career in tech began"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Virgin Active · Table Bay Mall
                </p>
                <p className="text-white text-sm font-light mt-1">
                  Where it started. The learnership that opened the door.
                </p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-zinc-800/60">
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono font-bold block mb-2">
                The Only Metric That Counts
              </span>
              <p className="text-zinc-300 font-light text-sm leading-relaxed font-sans">
                Not how fast we place someone. Whether, three months later, they've passed probation and are still in a permanent role.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* band 3: The Platform — light slate for readability */}
      <div className="bg-[#F8FAFC] text-slate-900 py-24 px-6 border-t border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
              What We Actually Built
            </span>
            <h3 className="text-3xl font-display font-light text-slate-800 leading-tight">
              Not a job board. An <span className="font-medium italic text-brand-teal">active placement network.</span>
            </h3>
            <p className="text-slate-600 font-light text-sm leading-relaxed font-sans">
              When a candidate comes to Virtuabled, the system reads their CV, extracts their real skills and experience, searches live vacancies across the major job portals, identifies the right hiring contact at each company, and drafts a personalised outreach — in five to seven minutes.
            </p>
            <p className="text-slate-600 font-light text-sm leading-relaxed font-sans">
              The platform is fully voice-controlled for candidates who need it. Elmarie, our built-in guide, walks every candidate through the process step by step — no form is a barrier. We don't hand a company a CV and disappear: we bring the systems and the support with the candidate, with check-ins at 30, 60, and 90 days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {BELIEFS.map((pt, pidx) => (
              <div key={pidx} className="p-5 bg-white rounded-2xl border border-slate-150 shadow-sm flex gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-brand-teal shrink-0 mt-0.5">
                  <Star size={14} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider">{pt.title}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed mt-1 font-sans">{pt.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* band 4: What this is built on */}
      <div className="bg-[#0B132B] py-24 px-6 border-t border-zinc-850">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <span className="text-brand-amber font-mono text-[10px] font-bold tracking-widest uppercase block mb-1">
              What This Is Built On
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-light text-white leading-tight mt-2">
              Not optimism. A gap, a mandate, and a method.
            </h2>
            <p className="text-zinc-400 font-light text-sm leading-relaxed mt-3">
              Virtuabled exists where three forces meet: the founder's lived experience, a legal mandate that finally measures inclusion, and a talent gap too large to ignore.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOUNDATIONS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-6 rounded-3xl bg-zinc-950/60 border border-zinc-800/80"
              >
                <div className="w-10 h-10 rounded-2xl bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal mb-4">
                  <Star size={18} fill="currentColor" />
                </div>
                <h4 className="text-white font-bold text-base">{p.title}</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mt-3">{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* band 5: The Name */}
      <div className="bg-[#0B132B] py-24 px-6 border-t border-zinc-850">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand-teal font-mono text-[10px] font-bold tracking-widest uppercase block mb-3">
            The Name
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-white leading-tight">
            Virtuabled. <span className="font-medium italic text-brand-teal">Virtual + Able.</span>
          </h2>
          <p className="text-zinc-400 font-light text-base leading-relaxed mt-6">
            The removal of physical barriers through technology, process, and the right opportunity. The reclaiming of "able" — because disabled professionals were never unable. They were navigating a world that wasn't built for them.
          </p>
          <p className="text-white font-medium text-lg leading-relaxed mt-6">
            Virtuabled removes what was in the way. What remains is ability.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#060B13] border-t border-zinc-800 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-light text-white">Work with us</h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">Partner with Virtuabled — whether you're a candidate ready to be placed, or an employer ready to close your EE gap.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:partners@virtuabled.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-colors">
              Partner with Us
            </a>
            <a href="/apply" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-white/5 transition-colors">
              Candidate Apply
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
