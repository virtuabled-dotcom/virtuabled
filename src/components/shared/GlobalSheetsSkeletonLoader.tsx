import React from "react";
import { motion } from "framer-motion";

interface GlobalSheetsSkeletonLoaderProps {
  className?: string;
  cardsCount?: number;
}

export function GlobalSheetsSkeletonLoader({ className = "", cardsCount = 4 }: GlobalSheetsSkeletonLoaderProps) {
  return (
    <div className={`space-y-8 w-full animate-pulse ${className}`} id="global-sheets-skeleton">
      {/* Sifting/Handshake Header Status skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-850">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-zinc-800 rounded-lg" />
          <div className="h-3.5 w-80 bg-zinc-900 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div className="h-4 w-40 bg-zinc-900 rounded font-mono text-xs" />
        </div>
      </div>

      {/* Grid of cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: cardsCount }).map((_, i) => (
          <div 
            key={i} 
            className="p-5 bg-zinc-950/40 border border-zinc-850 rounded-2xl space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 bg-zinc-850 rounded" />
              <div className="w-5 h-5 bg-zinc-900 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-16 bg-zinc-800 rounded-lg" />
              <div className="h-2.5 w-full bg-zinc-900 rounded" />
            </div>
            <div className="pt-2 border-t border-zinc-900 flex justify-between items-center">
              <div className="h-2 w-16 bg-zinc-900 rounded" />
              <div className="h-2 w-20 bg-zinc-900 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts area skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Performance Metric Bar Graph Skeleton */}
        <div className="p-6 bg-[#0d0d0d] border border-gray-800 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-zinc-800 rounded-lg" />
              <div className="h-3 w-56 bg-zinc-900 rounded" />
            </div>
            <div className="h-6 w-20 bg-zinc-900 rounded-lg" />
          </div>
          <div className="h-[280px] w-full bg-zinc-950/40 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between">
            {/* Mock Chart Rails */}
            <div className="flex-1 flex items-end justify-around gap-4 pb-2 border-b border-zinc-900">
              <div className="w-10 h-[40%] bg-zinc-900 rounded-t-sm" />
              <div className="w-10 h-[65%] bg-zinc-850 rounded-t-sm" />
              <div className="w-10 h-[50%] bg-zinc-900 rounded-t-sm" />
              <div className="w-10 h-[85%] bg-zinc-800 rounded-t-sm" />
              <div className="w-10 h-[95%] bg-zinc-705 rounded-t-sm" />
            </div>
            <div className="flex justify-around pt-2">
              <div className="h-2 w-10 bg-zinc-900 rounded" />
              <div className="h-2 w-10 bg-zinc-900 rounded" />
              <div className="h-2 w-10 bg-zinc-900 rounded" />
              <div className="h-2 w-10 bg-zinc-900 rounded" />
              <div className="h-2 w-10 bg-zinc-900 rounded" />
            </div>
          </div>
        </div>

        {/* Right Side: Growth Area Graph Skeleton */}
        <div className="p-6 bg-[#0d0d0d] border border-gray-800 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-5 w-48 bg-zinc-805 rounded-lg" />
              <div className="h-3 w-48 bg-zinc-905 rounded" />
            </div>
            <div className="h-6 w-16 bg-zinc-900 rounded-lg" />
          </div>
          <div className="h-[280px] w-full bg-zinc-950/40 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between">
            {/* Mock line area graph silhouette */}
            <div className="flex-1 flex items-end relative overflow-hidden pb-2 border-b border-zinc-900">
              <div className="absolute inset-0 flex flex-col justify-between py-2">
                <div className="border-t border-zinc-900/50 w-full h-px" />
                <div className="border-t border-zinc-900/50 w-full h-px" />
                <div className="border-t border-zinc-900/50 w-full h-px" />
              </div>
              <svg className="w-full h-full text-zinc-900" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L20,80 L40,65 L60,40 L80,30 L100,5" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-20" />
              </svg>
            </div>
            <div className="flex justify-around pt-2">
              <div className="h-2 w-12 bg-zinc-900 rounded" />
              <div className="h-2 w-12 bg-zinc-900 rounded" />
              <div className="h-2 w-12 bg-zinc-900 rounded" />
              <div className="h-2 w-12 bg-zinc-900 rounded" />
              <div className="h-2 w-12 bg-zinc-900 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
