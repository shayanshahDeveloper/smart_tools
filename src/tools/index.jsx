// Import all categories
import { educationTools } from "./education/index.jsx";
import { developerTools } from "./developers/index.jsx";
import { pdfTools } from "./pdf/index.jsx";
import { imageTools } from "./images/index.jsx";
import { financeTools } from "./finance/index.jsx";
import { textTools } from "./text/index.jsx";
import { funTools } from "./fun/index.jsx";
import { healthTools } from "./health/index.jsx";
import { seoTools } from "./seo/index.jsx";
import { businessTools } from "./business/index.jsx";
import { webmasterTools } from "./webmaster/index.jsx";

// Combine all tools
export const allTools = [
  ...educationTools,
  ...developerTools,
  ...pdfTools,
  ...imageTools,
  ...financeTools,
  ...textTools,
  ...funTools,
  ...healthTools,
  ...seoTools,
  ...businessTools,
  ...webmasterTools,
];

// Export by category
export {
  educationTools,
  developerTools,
  pdfTools,
  imageTools,
  financeTools,
  textTools,
  funTools,
  healthTools,
  seoTools,
  businessTools,
  webmasterTools,
};

// Helper to get tool by ID
export const getToolById = (toolId) => {
  return allTools.find((tool) => tool.id === toolId);
};

// Helper to get tools by category
export const getToolsByCategory = (category) => {
  const categoryMap = {
    education: educationTools,
    developers: developerTools,
    pdf: pdfTools,
    images: imageTools,
    finance: financeTools,
    text: textTools,
    fun: funTools,
    health: healthTools,
    business: businessTools,
    webmaster: webmasterTools,
  };
  return categoryMap[category] || [];
};

// Get all categories with their tools
export const getAllCategories = () => {
  return [
    {
      id: "education",
      name: "Education Tools",
      description: "Tools for students and teachers",
      icon: "GraduationCap",
      tools: educationTools,
      color: "indigo",
    },
    {
      id: "developers",
      name: "Developer Tools",
      description: "Essential tools for programmers",
      icon: "Code",
      tools: developerTools,
      color: "blue",
    },
    {
      id: "pdf",
      name: "PDF Tools",
      description: "Edit and manipulate PDF files",
      icon: "FileText",
      tools: pdfTools,
      color: "red",
    },
    {
      id: "images",
      name: "Image Tools",
      description: "Edit and optimize images",
      icon: "Image",
      tools: imageTools,
      color: "green",
    },
    {
      id: "finance",
      name: "Finance Tools",
      description: "Financial calculators and tools",
      icon: "DollarSign",
      tools: financeTools,
      color: "emerald",
    },
    {
      id: "text",
      name: "Text Tools",
      description: "Text manipulation and analysis",
      icon: "Type",
      tools: textTools,
      color: "yellow",
    },
    {
      id: "fun",
      name: "Fun Tools",
      description: "Entertaining and useful tools",
      icon: "Smile",
      tools: funTools,
      color: "pink",
    },
    {
      id: "health",
      name: "Health Tools",
      description: "Health and fitness calculators",
      icon: "Heart",
      tools: healthTools,
      color: "rose",
    },
    {
      id: "seo",
      name: "SEO Tools",
      description:
        "Search Engine Optimization tools to improve website ranking",
      icon: "Search",
      color: "indigo",
      tools: seoTools,
    },
    {
      id: "business",
      name: "Business Tools",
      description:
        "Search Engine Optimization tools to improve website ranking",
      icon: "Search",
      color: "indigo",
      tools: businessTools,
    },
    {
      id: "webmaster",
      name: "Webmaster Tools",
      description:
        "Search Engine Optimization tools to improve website ranking",
      icon: "Search",
      color: "indigo",
      tools: webmasterTools,
    },
  ];
};
