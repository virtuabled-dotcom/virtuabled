import React from "react";
import { motion } from "framer-motion";
import { ListFilter, Tag, Briefcase, FileText } from "lucide-react";

interface BlogFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  tagsCount: { [key: string]: number };
}

export function BlogFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  tagsCount,
}: BlogFilterProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Compliance":
        return <FileText size={16} className="text-brand-amber mr-1.5" />;
      case "Talent":
        return <Briefcase size={16} className="text-brand-teal mr-1.5" />;
      case "B-BBEE":
        return <Tag size={16} className="text-indigo-400 mr-1.5" />;
      default:
        return <ListFilter size={16} className="text-zinc-400 mr-1.5" />;
    }
  };

  return (
    <div 
      className="bg-zinc-950/40 p-4 rounded-2xl border border-zinc-800/80 shadow-md mb-8 flex flex-wrap gap-2 items-center justify-between"
      id="blog-filter-interactive-comp"
    >
      <div className="flex flex-wrap items-center gap-2" role="tablist">
        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mr-2 select-none">
          Quick Filter:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer overflow-hidden flex items-center ${
                isSelected
                  ? "text-white font-bold border border-brand-teal/40 bg-brand-teal/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900"
              }`}
              role="tab"
              aria-selected={isSelected}
              id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {getCategoryIcon(cat)}
              <span className="relative z-10">{cat}</span>
              {isSelected && (
                <motion.span
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 bg-brand-teal/5 border-b border-brand-teal pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-3 text-[10px] text-zinc-400 font-mono">
        <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
        <span>RECORDS CLASSIFIED ACCORDING TO B-BBEE CODE SERIES 300</span>
      </div>
    </div>
  );
}
