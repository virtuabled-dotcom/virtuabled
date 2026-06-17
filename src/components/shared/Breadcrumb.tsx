import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

const pathMap: Record<string, string> = {
  about: "About Company",
  services: "Focus Sectors",
  "for-employers": "Compliance Suite",
  "employer-portal": "Employer Portal",
  blog: "Insights & News",
  apply: "Candidate Gate",
  "why-we-do-it": "Why We Do It",
  genesis: "The Genesis",
  "managed-bpo": "Managed BPO",
  "how-it-works": "How It Works",
  privacy: "Trust & Privacy",
  terms: "Terms of Service",
  accessibility: "Accessibility Core",
  solutions: "Solutions",
  "predictive-matcher": "Predictive Matcher Engine",
  "eea-esg-dashboard": "EEA ESG Compliance Dashboard",
  "vetted-placements": "Vetted Placements Talent Matrix",
  "turnkey-operations": "Managed BPO",
  "the-pipeline": "Sourcing Discovery Pipeline",
  "compliance-hub": "Digital Quarters Compliance Hub",
  "bbbee-ee-targets": "B-BBEE Scorecard Point Optimizer",
  "facility-audits": "Physical & Digital Facility Audits",
  "eea-compliance-guide": "Employment Equity Act (EEA) Disability Compliance & Reporting Guide",
  "skills-development": "B-BBEE Code 300 & Skills Development Spend",
  "reasonable-accommodation": "S.A. Reasonable Accommodation Code & Workspace Adapters",
};

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  // Build breadcrumb items with accurate path hierarchy
  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const cleanName = name.replace(/-/g, " ");
    const fallbackName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    const mappedName = pathMap[name] || fallbackName;
    const isLast = index === pathnames.length - 1;

    return {
      name: mappedName,
      url: routeTo,
      isLast,
    };
  });

  // Self-contained SEO Structural JSON-LD ItemList
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Core Terminal",
        "item": window.location.origin
      },
      ...breadcrumbItems.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": item.name,
        "item": `${window.location.origin}${item.url}`
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-8" id="system-breadcrumb-navigation">
      {/* Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider bg-zinc-950/40 border border-zinc-900/60 rounded-xl px-4 py-2 w-max max-w-full backdrop-blur-sm">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-brand-teal transition-colors"
          >
            <Home size={12} className="text-zinc-650" />
            <span className="hidden sm:inline">Terminal</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight size={10} className="text-zinc-700 select-none shrink-0" />
            {item.isLast ? (
              <span className="text-brand-teal font-semibold font-sans normal-case tracking-normal">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.url}
                className="hover:text-brand-teal transition-colors py-0.5"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
