// src/tools/seo/index.jsx
import MetaTagGenerator from "./meta-tag-generator.jsx";
import SitemapGenerator from "./sitemap-generator.jsx";
import KeywordResearch from "./keyword-research.jsx";
import SEOAnalyzer from "./seo-analyzer.jsx";
import BacklinkChecker from "./backlink-checker.jsx";

export const seoTools = [
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    component: MetaTagGenerator,
    description: "Generate SEO-optimized meta tags for your website",
    icon: "FileText", // Valid icon
    tags: ["seo", "meta", "html", "tags", "optimization"],
    color: "indigo",
    popular: true,
  },
  {
    id: "sitemap-generator",
    name: "Sitemap Generator",
    component: SitemapGenerator,
    description: "Create XML sitemaps for better search engine crawling",
    icon: "Map", // Changed from Sitemap to Map
    tags: ["seo", "sitemap", "xml", "search", "crawling"],
    color: "indigo",
    popular: true,
  },
  {
    id: "keyword-research",
    name: "Keyword Research Tool",
    component: KeywordResearch,
    description: "Find and analyze keywords for SEO optimization",
    icon: "Search", // Valid icon
    tags: ["seo", "keywords", "research", "analysis"],
    color: "indigo",
    popular: false,
  },
  {
    id: "seo-analyzer",
    name: "SEO Analyzer",
    component: SEOAnalyzer,
    description: "Analyze website SEO factors and get improvement suggestions",
    icon: "BarChart3", // Valid icon
    tags: ["seo", "analysis", "audit", "optimization"],
    color: "indigo",
    popular: false,
  },
  {
    id: "backlink-checker",
    name: "Backlink Checker",
    component: BacklinkChecker,
    description: "Check and analyze backlinks for any website",
    icon: "Link", // Valid icon
    tags: ["seo", "backlinks", "analysis", "ranking"],
    color: "indigo",
    popular: false,
  },
];

export {
  MetaTagGenerator,
  SitemapGenerator,
  KeywordResearch,
  SEOAnalyzer,
  BacklinkChecker,
};
