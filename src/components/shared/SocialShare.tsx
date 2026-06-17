import React from "react";
import { Linkedin, Twitter, Link as LinkIcon, Share2, Check } from "lucide-react";
import { useToast } from "@/components/shared/Toast";
import { cn } from "@/lib/utils";

interface SocialShareProps {
  title: string;
  className?: string;
  layout?: "horizontal" | "vertical" | "minimal";
}

export function SocialShare({ title, className, layout = "horizontal" }: SocialShareProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const getPageUrl = () => {
    return window.location.href;
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(getPageUrl());
      setCopied(true);
      showToast(
        "Link Copied",
        "success",
        `Copied share link for "${title}" to your clipboard.`
      );
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast("Copy Failed", "error", "We couldn't write the link into your clipboard.");
    }
  };

  const handleShareLinkedIn = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = encodeURIComponent(getPageUrl());
    const shareTitle = encodeURIComponent(title);
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    // Avoid blocked popup issues by checking if frame-contained
    if (window.top !== window.self) {
      try {
        window.open(linkedinUrl, "_blank", "noopener,noreferrer");
      } catch (err) {
        showToast("Open Link Blocked", "info", "Pop-up blocked. Open the preview in a new tab to share directly.");
      }
    } else {
      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleShareTwitter = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = encodeURIComponent(getPageUrl());
    const shareText = encodeURIComponent(`Check out "${title}" on Virtuabled:`);
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${shareText}`;
    
    if (window.top !== window.self) {
      try {
        window.open(twitterUrl, "_blank", "noopener,noreferrer");
      } catch (err) {
        showToast("Open Link Blocked", "info", "Pop-up blocked. Open the preview in a new tab to share directly.");
      }
    } else {
      window.open(twitterUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (layout === "minimal") {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.08] text-zinc-350 hover:text-white hover:bg-white/[0.06] hover:border-brand-teal/40 transition-all cursor-pointer"
          title="Copy Link to Clipboard"
          aria-label={`Copy Link to share: ${title}`}
        >
          {copied ? <Check size={14} className="text-brand-teal" /> : <LinkIcon size={14} />}
        </button>
        <button
          onClick={handleShareLinkedIn}
          className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.08] text-zinc-350 hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 transition-all cursor-pointer"
          title="Share to LinkedIn"
          aria-label="Share this article to LinkedIn"
        >
          <Linkedin size={14} />
        </button>
        <button
          onClick={handleShareTwitter}
          className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.08] text-zinc-350 hover:text-[#1da1f2] hover:bg-[#1da1f2]/10 hover:border-[#1da1f2]/30 transition-all cursor-pointer"
          title="Share to Twitter / X"
          aria-label="Share this article to Twitter"
        >
          <Twitter size={14} />
        </button>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "p-4 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md flex items-center justify-between gap-4",
        layout === "vertical" && "flex-col items-start gap-4 p-5",
        className
      )}
      aria-label="Social sharing utility widget"
    >
      <div className="flex items-center gap-2.5">
        <Share2 size={16} className="text-brand-teal" />
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#14b8a6]">Share Article</h4>
          <p className="text-[11px] text-zinc-400 font-light hidden sm:block">Support inclusive workspace policies</p>
        </div>
      </div>

      <div className={cn("flex items-center gap-2", layout === "vertical" && "w-full justify-between")}>
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-350 hover:text-white hover:bg-white/[0.05] hover:border-brand-teal/40 transition-all flex items-center gap-2 cursor-pointer"
          title="Copy Link"
        >
          {copied ? (
            <>
              <Check size={12} className="text-brand-teal" />
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Copied</span>
            </>
          ) : (
            <>
              <LinkIcon size={12} />
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Copy</span>
            </>
          )}
        </button>

        {/* LinkedIn Share */}
        <button
          onClick={handleShareLinkedIn}
          className="px-3.5 py-2 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/20 text-xs text-[#00a0dc] hover:text-white hover:bg-[#0077b5] hover:border-transparent transition-all flex items-center gap-2 cursor-pointer"
          title="Share on LinkedIn"
        >
          <Linkedin size={12} />
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider">LinkedIn</span>
        </button>

        {/* Twitter Share */}
        <button
          onClick={handleShareTwitter}
          className="px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300 hover:text-white hover:bg-[#1da1f2]/20 hover:border-[#1da1f2]/40 transition-all flex items-center gap-2 cursor-pointer"
          title="Share on Twitter / X"
        >
          <Twitter size={12} />
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Twitter</span>
        </button>
      </div>
    </div>
  );
}
