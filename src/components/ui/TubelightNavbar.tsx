import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Eye, EyeOff } from "lucide-react";

interface NavItem {
  name: string;
  url: string;
}

export function TubelightNavbar({ items }: { items: NavItem[] }) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(() => {
    return localStorage.getItem('high-contrast') === 'true';
  });
  const location = useLocation();

  useEffect(() => {
    const currentItem = items.find(item => item.url === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location, items]);

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('high-contrast', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('high-contrast', 'false');
    }
  }, [isHighContrast]);

  const toggleHighContrast = () => setIsHighContrast(!isHighContrast);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 flex gap-4 items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1 bg-[#09090b]/40 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-2xl">
        {items.map((item) => {
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-[11px] uppercase tracking-widest font-semibold px-6 py-2 rounded-full transition-colors",
                "hover:text-brand-teal",
                isActive ? "text-white" : "text-white/60"
              )}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-teal rounded-t-full">
                    <div className="absolute w-12 h-6 bg-brand-teal/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-brand-teal/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-brand-teal/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
        <button
          onClick={toggleHighContrast}
          className="ml-2 w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition"
          aria-label={isHighContrast ? "Disable High Contrast" : "Enable High Contrast"}
          title={isHighContrast ? "Disable High Contrast" : "Enable High Contrast"}
        >
          {isHighContrast ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden flex items-center justify-between w-[calc(100vw-2rem)] bg-[#09090b]/80 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl">
        <span className="font-display font-bold tracking-tight text-white uppercase italic">Virtuabled.</span>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleHighContrast}
            className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition"
            aria-label={isHighContrast ? "Disable High Contrast" : "Enable High Contrast"}
          >
            {isHighContrast ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/80 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-16 left-0 right-0 w-[calc(100vw-2rem)] mx-auto bg-[#09090b]/95 border border-white/10 backdrop-blur-2xl rounded-2xl p-4 flex flex-col gap-2"
        >
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => {
                setActiveTab(item.name);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "px-4 py-3 rounded-xl text-lg font-medium transition-colors",
                activeTab === item.name ? "bg-brand-teal/10 text-brand-teal" : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
