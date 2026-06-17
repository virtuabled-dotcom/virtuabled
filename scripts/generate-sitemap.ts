import fs from "fs";
import path from "path";

const DOMAIN = "https://www.virtuabled.com"; // Canonical production domain (matches index.html canonical)

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/for-employers",
  "/employer-portal",
  "/blog",
  "/apply",
  "/privacy",
  "/terms",
  "/accessibility",
  "/why-we-do-it",
  "/genesis",
  "/managed-bpo",
  "/how-it-works"
];

const SOLUTIONS_ROUTES = [
  "/solutions/predictive-matcher",
  "/solutions/eea-esg-dashboard",
  "/solutions/vetted-placements",
  "/solutions/the-pipeline",
  "/solutions/compliance-hub",
  "/solutions/bbbee-ee-targets",
  "/solutions/facility-audits",
  "/solutions/eea-compliance-guide",
  "/solutions/skills-development",
  "/solutions/reasonable-accommodation"
];

function extractBlogSlugs(): string[] {
  const slugs: string[] = [];
  try {
    const blogFilePath = path.join(process.cwd(), "src", "pages", "Blog.tsx");
    if (fs.existsSync(blogFilePath)) {
      const content = fs.readFileSync(blogFilePath, "utf8");
      // Use regex to locate slug declarations, e.g., slug: "some-slug-value"
      const slugRegex = /slug:\s*["']([^"']+)["']/g;
      let match;
      while ((match = slugRegex.exec(content)) !== null) {
        if (match[1]) {
          slugs.push(`/blog?post=${match[1]}`);
        }
      }
    }
  } catch (error) {
    console.error("Warning: Unable to parse Blog.tsx for dynamic sitemap generation:", error);
  }
  // Fallbacks if regex search returns empty or fails
  if (slugs.length === 0) {
    slugs.push("/blog?post=accommodations-drive-innovation");
  }
  return [...new Set(slugs)];
}

function generateSitemap(): void {
  console.log("Generating sitemap dynamically via TS script...");
  
  const blogRoutes = extractBlogSlugs();
  const allRoutes = [...STATIC_ROUTES, ...SOLUTIONS_ROUTES, ...blogRoutes];
  const currentDate = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  allRoutes.forEach((route) => {
    const priority = route === "" ? "1.0" : route.startsWith("/solutions/") ? "0.8" : "0.5";
    const changefreq = route === "" || route === "/blog" ? "daily" : "weekly";
    
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  // Output to public and dist directories
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf8");
  console.log(`Success: Dynamic sitemap.xml generated in public/ with ${allRoutes.length} route URLs.`);

  // Verify paths from App.tsx to ensure no orphaned content exists
  try {
    const appFilePath = path.join(process.cwd(), "src", "App.tsx");
    if (fs.existsSync(appFilePath)) {
      const appContent = fs.readFileSync(appFilePath, "utf8");
      const pathRegex = /path=["']([^"']+)["']/g;
      const appPaths: string[] = [];
      let match;
      while ((match = pathRegex.exec(appContent)) !== null) {
        const routePath = match[1];
        if (routePath !== "*" && !appPaths.includes(routePath)) {
          appPaths.push(routePath);
        }
      }
      
      console.log(`\n--- SITEMAP VERIFICATION LOG ---`);
      console.log(`Checking ${appPaths.length} route paths defined in src/App.tsx:`);
      
      const normalizedSitemapRoutes = allRoutes.map(r => r === "" ? "/" : r);
      let allFound = true;
      appPaths.forEach(p => {
        const isPresent = normalizedSitemapRoutes.includes(p);
        if (isPresent) {
          console.log(`  ✅ Route [${p}] is correctly indexed in sitemap.`);
        } else {
          console.log(`  ❌ WARNING: Route [${p}] is defined in App.tsx but is MISSING from sitemap!`);
          allFound = false;
        }
      });
      
      if (allFound) {
        console.log(`Success: All ${appPaths.length} routes from App.tsx are correctly referenced in sitemap.xml. No orphans!\n`);
      } else {
        console.log(`Warning: Some App.tsx routes are not represented in sitemap.xml\n`);
      }
    }
  } catch (err) {
    console.error("Warning: Could not verify sitemap against App.tsx:", err);
  }

  const distDir = path.join(process.cwd(), "dist");
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml, "utf8");
    console.log("Success: Copied sitemap.xml to dist/");
  }
}

generateSitemap();
