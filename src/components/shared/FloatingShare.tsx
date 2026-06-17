import React from "react";
import { useLocation } from "react-router-dom";
import { SocialShare } from "./SocialShare";

export function FloatingShare() {
  const location = useLocation();
  
  // Only display on specific subdirectories: solutions or blog posts
  const isTargetPage = location.pathname.startsWith("/solutions/") || location.pathname.startsWith("/blog/");
  
  if (!isTargetPage) return null;
  
  // Handle rendering nicely with a clean, descriptive page heading title
  const pathParts = location.pathname.split("/");
  const slug = pathParts[pathParts.length - 1];
  const pageTitle = slug
    ? slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Virtuabled Solutions";

  return (
    <div 
      className="fixed left-4 bottom-20 lg:bottom-1/2 lg:translate-y-1/2 z-[40] pointer-events-none"
      id="global-floating-share-dock"
      role="region"
      aria-label="Floating social share action bar"
    >
      <div className="pointer-events-auto bg-[#0a0f1d]/90 border border-white/[0.08] backdrop-blur-xl p-2 rounded-2xl shadow-3xl flex flex-row lg:flex-col items-center gap-1.5 transition-all hover:border-[#14b8a6]/40 shadow-brand-teal/5">
        <div className="hidden lg:block text-[8px] font-mono uppercase tracking-[0.2em] text-[#14b8a6] rotate-180 [writing-mode:vertical-lr] mb-2 font-extrabold select-none cursor-default py-1">
          Share Insights
        </div>
        <SocialShare title={pageTitle} layout="minimal" />
      </div>
    </div>
  );
}
