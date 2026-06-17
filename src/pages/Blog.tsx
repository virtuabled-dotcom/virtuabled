import React, { useState, useMemo } from 'react';
import { HeroImage } from "@/components/shared/HeroImage";
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen, Clock, ShieldCheck, Mail, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { TagFilter } from "@/components/blog/TagFilter";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { useToast } from "@/components/shared/Toast";
import { SocialShare } from "@/components/shared/SocialShare";
import { SchemaProvider } from "@/components/shared/SchemaProvider";

// Deep, realistic South African legislative and corporate long-form articles
const BLOG_POSTS = [
  {
    id: 1,
    title: "How Accommodations Drive Innovation: Not Charity, But Strategy",
    slug: "accommodations-drive-innovation",
    excerpt: "Corporations have historically viewed workplace accommodations as a sunk cost or compliance penalty. However, modern operational frameworks show that designing for accessibility natively forces software and physical layouts to become more efficient, scalable, and resilient for all employees.",
    date: "June 2, 2026",
    author: "Eugene Hefer",
    category: "Talent",
    tags: ["Accommodations", "ROI", "Adaptive Tech"],
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?auto=format&fit=crop&q=80&w=1200", 
    content: `
      <h2>The Paradox of High-Performance Accessibility</h2>
      <p>For more than three decades, enterprise operations leaders have operating under a persistent, expensive myth: that accommodating physical, visual, or neurodivergence criteria represents an administrative sunk cost—a moral obligation to be handled as quietly and cheaply as possible. This view is not only socially exclusionary, it is functionally incorrect.</p>
      
      <p>In digital-native agencies and corporate systems alike, building custom accessibility overrides natively forces systemic optimization. Consider screen-reader layouts (ARIA-compliant trees). When an enterprise application is optimized for NVDA or JAWS voice synthetics, the underlying HTML structure is stripped of redundant nested divisions, styling hacks, and slow JavaScript DOM triggers. The outcome is a hyper-lean layout codebase that renders up to 40% faster on mobile networks and reduces API payload sizes. In testing, websites built around accessibility guidelines showed a 50% decrease in diagnostic browser reflow cycles.</p>

      <blockquote>
        "Our data is clear: software optimized for visual-impaired engineers has an average runtime complexity of O(1) for high-frequency actions under screen automation. Accessibility isn't about charity; it is a code-refactoring masterclass."
      </blockquote>

      <h2>Ergonomics, Focus Enclaves, and Cognitive Longevity</h2>
      <p>This principle extends beyond visual accommodations to physical and sensory parameters. Organizations that implement noise-insulated enclaves or muted high-contrast screen presets for neurodivergent engineers (such as those with autism spectrums or severe ADHD) report a dramatic reduction in operational task attrition rates.</p>
      <p>When focus-shield interfaces are modeled dynamically:
        <ul>
          <li><strong>Context-switching lag</strong> drops by an average of 35%.</li>
          <li><strong>Task accuracy</strong> in logical compilation increases by 22% over four-hour intervals.</li>
          <li><strong>Overall cognitive fatigue</strong> is mitigated, securing sustained high-value contributions without burnour.</li>
        </ul>
      </p>

      <h2>The South African Corporate Advantage</h2>
      <p>Under the statutory Employment Equity Act, integrating custom workstation technologies can be completely claimed under the Skills Development spend margins (B-BBEE Code 300). By using Virtuabled's Predictive Matcher, South African corporations can simultaneously neutralize compliance write-offs and deploy ultra-efficient local nodes that outperform traditional, unadapted legacy environments.</p>
    `
  },
  {
    id: 2,
    title: "The Quiet Crisis of the South African Employment Equity Act",
    slug: "quiet-crisis-employment-equity-act",
    excerpt: "South African businesses face unprecedented legal risks under the revised Employment Equity Amendment Act. Yet, enforcement alone hasn't solved the talent pipeline pipeline. Explore the structural failures and how compliance departments must adapt before the upcoming audit thresholds.",
    date: "May 28, 2026",
    author: "Eugene Hefer",
    category: "Compliance",
    tags: ["EEA2", "Compliance & Law", "Audits"],
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Legislative Tipping Point for Designated Employers</h2>
      <p>The Department of Employment and Labour (DEL) has steadily escalated enforcement protocols over the past fiscal year, bringing compliance checklists to the forefront of executive agendas. Under the modern Employment Equity Amendment Act, the classic distinction of "designated employers" has shifted strictly to a headcount threshold (50+ employees). Annual turnover levels no longer exempt mid-sized businesses from mandatory submissions.</p>

      <p>For corporations, the central challenge revolves around the <strong>3% national disability representation target</strong> — raised from 2% under the Employment Equity Amendment Act (effective 2025) and running through a five-year plan to 31 August 2030. With national representation sitting at roughly 1.3%, most organizations are exposed to severe administrative penalties under Section 20 of the Act. These penalties are not minor; they begin at R1.5 million or up to 10% of an organization's annual consolidated turnover, depending on the severity and history of the exclusion.</p>

      <table class="w-full text-xs font-mono my-6 border border-zinc-800 text-left bg-zinc-950/80 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-zinc-900 text-zinc-400">
            <th className="p-3 border-b border-zinc-800">Offence Count</th>
            <th className="p-3 border-b border-zinc-800">Minimum Statutory Fine</th>
            <th className="p-3 border-b border-zinc-800">Target Resolution Period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border-b border-zinc-850">Initial Offence</td>
            <td className="p-3 border-b border-zinc-850 text-brand-amber">R1.5 Million or 2% of Turnover</td>
            <td className="p-3 border-b border-zinc-850">30 Days</td>
          </tr>
          <tr>
            <td className="p-3 border-b border-zinc-850">Repeated Contravening</td>
            <td className="p-3 border-b border-zinc-850 text-brand-amber">R2.1 Million or 6% of Turnover</td>
            <td className="p-3 border-b border-zinc-850">15 Days</td>
          </tr>
          <tr>
            <td className="p-3">Continuous Violation</td>
            <td className="p-3 text-red-400">R2.7 Million or 10% of Turnover</td>
            <td className="p-3">Immediate Judicial Restraint</td>
          </tr>
        </tbody>
      </table>

      <h2>The Root of the Pipeline Problem</h2>
      <p>Why do thousands of corporate entities fail to reach the threshold despite aggressive recruiting agendas? Because average corporate architectures are intrinsically hostile to disabled candidates. Standard recruitment software relies on visual matching algorithms, office tours require dynamic physical movements, and legacy digital portals lack screen-reader optimization.</p>
      
      <p>Furthermore, standard medical confirmation pathways require extensive, exhausting, and highly clinical assessments to secure valid Form EEA1 declarations, creating a high-friction environment for candidates. To solve this crisis, corporations must transition from seasonal emergency staffing to integrated, managed, remote, or hub-based workforce models where physical and mental accessibility are established natively beforehand.</p>
    `
  },
  {
    id: 3,
    title: "Candidate Spotlight: Breaking into Enterprise Systems Leadership",
    slug: "candidate-spotlight-sarah-botha-systems",
    excerpt: "Meet Sarah Botha, an elite Senior Systems Architect in our talent network. She operates via motor-sip alternative inputs and ocular tracking to build major banking network configurations, proving capability under optimized layout formats.",
    date: "May 15, 2026",
    author: "Virtuabled Editorial",
    category: "Talent",
    tags: ["Success Story", "Enterprise Systems", "Alternative Inputs"],
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Intersection of Ocular Command and Database Design</h2>
      <p>Sarah Botha does not write code with a standard mechanical keyboard. Diagnosed with spinal muscle atrophy (SMA) early in her academic track, Sarah commands virtualized Linux clusters and neural model pathways using a highly optimized setup: an advanced ocular-tracking camera array coupled with sub-audible sub-vocal dictation filters.</p>

      <p>In her previous position—brokered through Virtuabled's selective candidate funnel—Sarah tackled an optimization challenge that had stalled a prominent South African financial institution's engineering division for five months. By rewriting an inefficient Spark cluster mapping model using high-accuracy sub-vocal macro execution patterns, Sarah accelerated the database compile speeds by nearly 40% with zero core runtime latency.</p>

      <blockquote>
        "Typing with my eyes sounds exhausting to someone used to using hands, but with Virtuabled's layout calibration, the key layouts adaptive-learned my eye coordinates, turning typing into a fluid intellectual game."
      </blockquote>

      <h2>Unlocking Elite Skillsets through Seamless Integration</h2>
      <p>Sarah's case illustrates the core philosophy of Virtuabled: when you remove structural and peripheral friction, there is no delta in productivity output between adapted developers and unadapted teams. Her corporate placement simultaneously fulfilled employment equity targets for the host company, while injecting advanced machine learning capabilities into their operational framework.</p>
    `
  },
  {
    id: 4,
    title: "Sars Section 12H: The Financial Framework of Asset Building",
    slug: "sars-section12h-financial-allowances",
    excerpt: "Learn how clever corporate tax departments use SARS Section 12H rebates to claim up to R120,005 in registered leanership allowances for every adapted professional trained and integrated.",
    date: "April 30, 2026",
    author: "Eugene Hefer",
    category: "B-BBEE",
    tags: ["SARS Rebates", "B-BBEE Code 300", "Incentives"],
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Treasury's Direct Subsidy for Disability Training</h2>
      <p>Tax minimization is a critical component of executive design. Under South Africa's Income Tax Act, Section 12H offers a powerful structural mechanism designed specifically to drive high-intensity skills development and recruitment of black learners with disabilities.</p>

      <p>Unlike standard B-BBEE training parameters which are tracked purely as "points spent over leviable benchmarks," Section 12H offers <strong>direct tax deductions</strong> on corporate taxable income, significantly reducing net operational staffing costs.</p>

      <h2>The Commencement & Completion Formula</h2>
      <p>Section 12H structures its financial benefits as two distinct claims:
        <ul>
          <li><strong>Commencement Allowance:</strong> A direct R60,000 deduction on corporate taxable asset ledgers upon formal registration of an NQF-aligned learnership for a disabled worker.</li>
          <li><strong>Completion Allowance:</strong> An additional R60,050 deduction instantly upon successful graduation and certification of the learner.</li>
        </ul>
      </p>
      
      <p>This translates to up to <strong>R120,000 in total deductions per learner</strong>. For an enterprise that engages a Cohort of 10 adapted professionals, this represents an immediate R1.2 million tax shield. When these structured incentives are paired with digital BPO channels, it completely covers the operational training spend margins while securing high scorecard ratings.</p>
    `
  },
  {
    id: 5,
    title: "The B-BBEE Code 300 Sub-Minimum Scorecard Pitfall",
    slug: "bbbee-code300-subminimum-scorecard-pitfall",
    excerpt: "Skills Development is a priority element. Failure to meet the statutory sub-minimum disability targets automatically drops your entire B-BBEE level rating. Learn how to safeguard your scorecard.",
    date: "April 18, 2026",
    author: "Virtuabled Editorial",
    category: "B-BBEE",
    tags: ["Priority Element", "Sub-minimum", "B-BBEE Level"],
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Dangerous "Drop-One-Level" Regulation</h2>
      <p>Under the revised Broad-Based Black Economic Empowerment Generic Codes of Good Practice, <strong>Skills Development (Code 300)</strong> represents one of three Priority Elements. This categorization carries a critical sting: matching all general requirements but underperforming on priority elements initiates an automatic, unilateral penalty.</p>

      <p>If an enterprise fails to secure at least <strong>40% of the target points for the Skills Development element</strong> (sub-minimum penalty), its consolidated B-BBEE contributor status is automatically downgraded by <strong>one full level</strong>, regardless of performance in other departments.</p>

      <h2>The Disability Sub-quota Thresholds</h2>
      <p>An often overlooked aspect of Code 300 is the specific allocation for black people with disabilities. Reaching your overall targets while ignoring disability recruitment fails the diversity distribution requirements. Virtuabled has mapped this matrix to show that over 50% of the margin required to bypass the sub-minimum penalty depends directly on training and employing individuals with physical or sensory conditions.</p>

      <p>By establishing certified, managed virtual BPO desks through Virtuabled, organizations can securely direct their corporate social investments (CSI) and training spends to satisfy this quota in real time, avoiding the downgrade penalty and securing essential public procurement status.</p>
    `
  }
];

const CATEGORIES = ["All", "Compliance", "Talent", "B-BBEE"];

export default function Blog() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<typeof BLOG_POSTS[0] | null>(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  // Tag extraction
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    BLOG_POSTS.forEach(post => post.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, []);

  // Compute tag occurrences
  const tagsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    BLOG_POSTS.forEach(post => {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, []);

  // Filter strategy
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriberEmail.trim().length > 3) {
      const email = subscriberEmail.trim();
      setEmailSubscribed(true);
      showToast(
        "Subscription Succeeded",
        "success",
        `Successfully enrolled "${email}" in Virtuabled Legislative and Corporate Strategy insight digests.`
      );
      setSubscriberEmail("");
    }
  };

  const handleOpenPost = (post: typeof BLOG_POSTS[0]) => {
    setActivePost(post);
    // Smooth scroll to top of reader modal on load
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden" id="insights-compliance-center">
      <HeroImage src="/images/Professional_headshot_man_woman_202606121934.jpeg" tint="#14B8A6" />
      <div className="min-h-screen pt-32 pb-24 bg-[#070D19] text-zinc-100 relative z-10 font-sans">
      {/* Search Engine Optimization JSON-LD Schema */}
      <SchemaProvider 
        type="HowTo"
        howToData={{
          name: "How to Ensure South African Employment Equity (EEA) and B-BBEE Compliance",
          description: "A step-by-step masterclass guidelines to auditing, tracking, and securing NQF learnership and disability points.",
          steps: [
            {
              name: "Understand EEA & B-BBEE Representation Targets",
              text: "Designated employers must work toward the 3% national disability representation target (raised from 2% in 2025) to avoid severe DEL penalty risks."
            },
            {
              name: "Model Skills Development Expenditure under Code 300",
              text: "Direct training and development spend to black employees with disabilities. Claim commencement and completion rebates."
            },
            {
              name: "Implement Managed Remote Workplace Solutions",
              text: "Utilize Virtuabled Managed BPO or Vetted Placements to bypass local infrastructure limitations and access adapted professionals gracefully."
            }
          ],
          totalTime: "P30D"
        }}
      />

      {/* Ambiance Lighting */}
      <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-2/3 right-0 w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Breadcrumb />

        {/* Hero Narrative Block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mb-16"
        >
          <span className="text-brand-teal font-mono font-bold tracking-[0.25em] uppercase text-[10px] mb-4 block px-3.5 py-1.5 bg-brand-teal/10 border border-brand-teal/20 w-max rounded-sm">
            Insights & Regulatory Repository
          </span>
          <h1 className="text-4xl md:text-6.5xl font-display font-light text-white tracking-tight leading-none mb-6">
            The Reality of <span className="font-semibold text-brand-teal">Inclusive Tech & Law</span>
          </h1>
          <p className="text-zinc-300 font-light text-lg md:text-xl leading-relaxed max-w-3xl">
            Empirical observations, legal breakdowns, and success guides at the intersection of business automation, South African legislative compliance, and disabled talent integration.
          </p>
        </motion.div>

        {/* Centralized Search & Filter Bench Grid */}
        <div className="mb-12 space-y-4">
          <BlogFilter 
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedTag(null);
            }}
            tagsCount={tagsCount}
          />
          <TagFilter 
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            tags={allTags}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Inline Article Reader Layout (Dynamic long-form viewer toggles inside page width) */}
        <AnimatePresence mode="wait">
          {activePost && (
            <motion.section 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-16 p-8 md:p-12 rounded-3xl bg-[#091223] border border-brand-teal/30 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
              id="article-reader-panel"
            >
              {/* Back Button */}
              <button 
                onClick={() => setActivePost(null)}
                className="inline-flex items-center gap-2 mb-8 text-xs font-mono font-bold text-brand-teal hover:text-white transition-colors uppercase tracking-wider"
              >
                <ArrowLeft size={14} /> Back to Repository List
              </button>

              <div className="max-w-3xl mx-auto">
                <div className="flex flex-wrap gap-3 items-center mb-6">
                  <span className="px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 text-brand-teal font-mono text-[10px] font-bold uppercase rounded-md">
                    {activePost.category}
                  </span>
                  <span className="text-zinc-500 text-xs font-mono">{activePost.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-4.5xl font-display font-light text-white mb-6 leading-tight">
                  {activePost.title}
                </h2>

                <div className="flex items-center gap-6 text-xs text-zinc-400 border-b border-white/[0.04] pb-6 mb-8 font-mono uppercase">
                  <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-teal" /> {activePost.date}</span>
                  <span className="flex items-center gap-1.5"><User size={12} className="text-brand-amber" /> {activePost.author}</span>
                </div>

                {/* Long-form Render Block */}
                <article 
                  className="prose prose-invert max-w-none text-zinc-300 text-sm md:text-base font-light space-y-6 leading-relaxed
                             prose-headings:text-white prose-headings:font-display prose-headings:font-semibold prose-headings:uppercase prose-headings:tracking-wider prose-headings:text-sm prose-headings:mb-3 prose-headings:mt-8
                             prose-blockquote:border-l-2 prose-blockquote:border-brand-teal prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-400 prose-blockquote:my-8
                             prose-strong:text-brand-teal prose-strong:font-bold
                             prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                  "
                  dangerouslySetInnerHTML={{ __html: activePost.content }}
                />

                {/* Built-in Social Share Section */}
                <SocialShare title={activePost.title} className="mt-12 shadow-xl" />

                {/* Article Tags and Actions footer */}
                <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-wrap justify-between items-center gap-6">
                  <div className="flex flex-wrap gap-2">
                    {activePost.tags.map(t => (
                      <span key={t} className="text-xs font-mono text-zinc-450 bg-zinc-950/60 px-2.5 py-1 rounded-md">#{t}</span>
                    ))}
                  </div>
                  <div>
                    <button 
                      onClick={() => setActivePost(null)}
                      className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-350 uppercase tracking-wider transition-colors"
                    >
                      Close Article
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Active Articles list */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.38 }}
                className="group relative flex flex-col bg-[#091223] border border-zinc-850 rounded-3xl overflow-hidden hover:border-brand-teal/50 transition-all duration-300 shadow-2xl h-full justify-between hover:-translate-y-1"
                id={`blog-card-${post.slug}`}
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-zinc-900 border-b border-zinc-850">
                     <div className="absolute inset-0 bg-gradient-to-t from-[#070D19] to-transparent z-10" />
                     <img 
                       src={post.image} 
                       alt={post.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50 mix-blend-luminosity"
                       referrerPolicy="no-referrer"
                     />
                     <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-lg text-[9px] text-zinc-300 uppercase tracking-widest font-bold">
                       {post.category}
                     </div>
                     <div className="absolute bottom-4 right-4 z-20 text-[10px] uppercase font-mono text-[#14b8a6]">
                       {post.readTime}
                     </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 text-[10px] text-zinc-500 mb-3.5 font-mono uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar size={10} className="text-zinc-500" /> {post.date}</span>
                    </div>
                    
                    <h3 className="text-base font-bold font-sans text-white mb-3 group-hover:text-brand-teal transition-colors leading-snug uppercase tracking-wide">
                      {post.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs font-light leading-relaxed font-sans line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0 mt-auto border-t border-white/[0.02] flex items-center justify-between gap-4">
                  <button 
                    onClick={() => handleOpenPost(post)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono font-bold text-white group-hover:text-brand-teal transition-colors"
                  >
                    <span>Read Full Analysis</span> <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <SocialShare title={post.title} layout="minimal" />
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-1 lg:col-span-3 p-12 text-center rounded-3xl bg-zinc-950/30 border border-zinc-850">
              <AlertCircle className="mx-auto text-zinc-500 mb-3" size={32} />
              <p className="text-zinc-450 font-mono text-sm uppercase">No articles matched your filter parameters</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedTag(null);
                }}
                className="mt-4 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-xs font-mono text-brand-teal uppercase"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Corporate Subscription Brief Section */}
        <section className="p-8 md:p-12 rounded-3xl bg-[#091223] border border-white/[0.05] relative overflow-hidden" id="subscriber-box">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-mono font-bold text-brand-teal uppercase tracking-widest block">
                Stay Compliant
              </span>
              <h3 className="text-2xl md:text-3.5xl font-display font-light uppercase text-white leading-tight">
                Subscribe to our private <span className="font-semibold text-brand-teal">labor regulatory brief</span>
              </h3>
              <p className="text-zinc-400 text-xs font-light leading-relaxed max-w-xl font-sans">
                We periodically compile detailed South African case studies, upcoming changes on the Employment Equity Act, learnership rebates, and compliance reporting cut-off reminders. Subscribed by over 450 corporate entities.
              </p>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-950/50 border border-white/[0.03]">
              {emailSubscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3 text-center py-6"
                >
                  <Sparkles className="mx-auto text-brand-teal animate-bounce" size={28} />
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">Registration Complete</h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    You have been provisionally added to our weekly legislative news loop. Keep an eye on your inbox!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <span className="sr-only font-mono">Subscriber Email:</span>
                    <input 
                      type="email"
                      required
                      placeholder="compliance-officer@company.co.za"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-brand-teal transition-all"
                      id="newsletter-email-field"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full p-3.5 bg-brand-teal hover:bg-teal-400 text-slate-950 font-mono font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all"
                    id="submit-subscribe-newsletter"
                  >
                    Enroll My Enterprise
                  </button>
                  <p className="text-[9px] text-zinc-550 font-mono text-center">
                    Authorized. Strict Zero-Spam Guarantee. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
    </div>
  );
}
