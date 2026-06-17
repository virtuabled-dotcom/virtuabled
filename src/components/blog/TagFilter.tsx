import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tag, X, ShieldAlert, Award, Compass, Sparkles } from "lucide-react";

interface TagFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function TagFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  tags,
  selectedTag,
  onSelectTag,
  searchTerm,
  onSearchChange,
}: TagFilterProps) {
  return (
    <section 
      className="bg-zinc-950/60 p-6 md:p-8 rounded-3xl border border-zinc-800 relative z-10 overflow-hidden shadow-2xl"
      aria-label="Search and Categorization Panel"
      id="blog-tag-filter-component"
    >
      {/* Subtle Glowing Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-12 w-32 h-32 bg-brand-amber/5 blur-3xl rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Search Input Box */}
        <div className="lg:col-span-5 relative">
          <label htmlFor="blog-search" className="sr-only">Search Articles</label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input 
            id="blog-search"
            type="text"
            placeholder="Search legislation guidelines, case studies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/30 transition-all font-sans"
          />
          {searchTerm && (
            <button 
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              aria-label="Clear Search Input"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Categories Tablist */}
        <div className="lg:col-span-7 flex flex-wrap gap-2 items-center" role="tablist">
          <span className="text-[10px] font-mono font-bold text-zinc-500 mr-2 uppercase tracking-widest flex items-center gap-1">
            <Compass size={12} className="text-zinc-500" /> Segment:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  // Resets active tag filter when category changes for neat SEO user experience
                  onSelectTag(null);
                }}
                className={`relative px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected 
                    ? "text-brand-teal border border-brand-teal/30 bg-brand-teal/5" 
                    : "text-zinc-400 hover:text-white border border-transparent bg-zinc-900/40 hover:bg-zinc-900/80"
                }`}
                role="tab"
                aria-selected={isSelected}
              >
                {/* Micro Animated Dot Indicator */}
                {isSelected && (
                  <motion.span 
                    layoutId="activeCategoryDot" 
                    className="inline-block w-1.5 h-1.5 rounded-full bg-brand-teal mr-1.5 align-middle"
                  />
                )}
                <span className="align-middle">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Category Dwell Information Banner */}
      <div className="mt-5 p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1 px-2 rounded-md bg-brand-amber/10 border border-brand-amber/20">
            <Award className="text-brand-amber shrink-0" size={14} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-brand-amber block">
              Dynamic Relevance Mapping
            </span>
            <span className="text-[11px] text-zinc-400 font-sans font-light block mt-0.5">
              Articles filtered under <strong className="text-white font-medium">"{selectedCategory}"</strong> are verified against SARS guidelines and B-BBEE Code Series.
            </span>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
          <Sparkles size={11} className="text-brand-teal shrink-0 animate-pulse" />
          <span>SEO OPTIMIZED DIRECTORY</span>
        </div>
      </div>

      {/* Dynamic Tag Pills */}
      <div className="mt-6 pt-5 border-t border-zinc-800/50">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-mono font-bold text-zinc-500 mr-2 uppercase tracking-wide flex items-center gap-1 shrink-0">
            <Tag size={12} className="text-zinc-500" /> Focus Filters:
          </span>
          
          <div className="flex flex-wrap gap-1.5 items-center">
            {tags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => onSelectTag(isSelected ? null : tag)}
                  className={`px-3 py-1 text-[10px] font-mono rounded-full font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    isSelected 
                      ? "bg-brand-amber text-zinc-950 font-bold border border-brand-amber" 
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>#{tag}</span>
                  {isSelected && <X size={10} className="shrink-0 text-zinc-950" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedTag && (
              <motion.button 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                onClick={() => onSelectTag(null)}
                className="text-[10px] text-brand-coral font-mono font-bold hover:underline ml-2 cursor-pointer"
              >
                Clear Tag Focus
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
