import React, { useState } from "react";
import {
  Briefcase,
  Download,
  Copy,
  Save,
  FileText,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Check,
  AlertCircle,
  ChevronRight,
  Lightbulb,
  BarChart3,
  Globe,
} from "lucide-react";

const BusinessPlan = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [foundedDate, setFoundedDate] = useState("");
  const [executiveSummary, setExecutiveSummary] = useState("");
  const [marketAnalysis, setMarketAnalysis] = useState("");
  const [financialProjections, setFinancialProjections] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [planTemplate, setPlanTemplate] = useState("startup");

  const templates = [
    {
      id: "startup",
      name: "Startup Plan",
      color: "from-blue-600 to-cyan-600",
      icon: TrendingUp,
    },
    {
      id: "nonprofit",
      name: "Nonprofit Plan",
      color: "from-green-600 to-emerald-600",
      icon: Users,
    },
    {
      id: "simple",
      name: "Simple Plan",
      color: "from-purple-600 to-pink-600",
      icon: FileText,
    },
    {
      id: "detailed",
      name: "Detailed Plan",
      color: "from-orange-600 to-red-600",
      icon: BarChart3,
    },
    {
      id: "ecommerce",
      name: "E-commerce Plan",
      color: "from-indigo-600 to-purple-600",
      icon: Globe,
    },
  ];

  const generatePlan = () => {
    const templateContent = {
      startup: `# ${businessName || "Your Business"} - Startup Business Plan
## Created: ${new Date().toLocaleDateString()}

## Executive Summary
${
  executiveSummary ||
  "Brief description of your business idea, target market, and financial projections."
}

## Company Description
**Business Name:** ${businessName || "[Your Business Name]"}
**Business Type:** ${businessType || "[Your Business Type]"}
**Industry:** ${industry || "[Your Industry]"}
**Founded:** ${foundedDate || "[Date]"}
**Mission Statement:** ${missionStatement || "[Your Mission Statement]"}

## Market Analysis
${
  marketAnalysis ||
  "Describe your target market, competitors, and market trends."
}

## Products & Services
List your products or services in detail.

## Marketing & Sales Strategy
Explain how you plan to attract and retain customers.

## Management Team
Describe your key team members and their roles.

## Financial Projections
${
  financialProjections ||
  "Include projected income statements, balance sheets, and cash flow statements for 3-5 years."
}

## Funding Requirements
Detail your funding needs and how funds will be used.

## Appendix
Additional supporting documents and information.`,

      simple: `# ${businessName || "Your Business"} - Simple Business Plan

## Business Overview
- **Name:** ${businessName || "[Your Business Name]"}
- **Type:** ${businessType || "[Your Business Type]"}
- **Industry:** ${industry || "[Your Industry]"}

## Executive Summary
${executiveSummary || "Brief overview of your business."}

## Goals & Objectives
What you want to achieve in the next 1-3 years.

## Target Market
Who your customers are and how you'll reach them.

## Financial Plan
Basic financial projections and funding needs.`,
    };

    return templateContent[planTemplate] || templateContent.startup;
  };

  const handleDownload = () => {
    const planContent = generatePlan();
    const blob = new Blob([planContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${businessName || "business"}-plan-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatePlan());
      alert("✓ Business plan copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const currentTemplate = templates.find((t) => t.id === planTemplate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Business Plan Generator
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Create professional business plans with customizable templates for
              startups and established businesses
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Plan Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plan Settings Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Business Details
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Plan Template
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {templates.map((template) => {
                      const Icon = template.icon;
                      return (
                        <button
                          key={template.id}
                          onClick={() => setPlanTemplate(template.id)}
                          className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                            planTemplate === template.id
                              ? `bg-gradient-to-r ${template.color} text-white shadow-lg scale-105`
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium text-center">
                            {template.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Business Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your business name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type
                      </label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., LLC, Corporation, Sole Proprietorship"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                      </label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., Technology, Retail, Services"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Founded Date
                        </div>
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={foundedDate}
                        onChange={(e) => setFoundedDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Mission Statement
                    </div>
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                    placeholder="Describe your business purpose and values..."
                    value={missionStatement}
                    onChange={(e) => setMissionStatement(e.target.value)}
                  />
                </div>

                {/* Executive Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Executive Summary
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                    placeholder="Briefly describe your business idea, target market, and financial projections..."
                    value={executiveSummary}
                    onChange={(e) => setExecutiveSummary(e.target.value)}
                  />
                </div>

                {/* Market Analysis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Market Analysis
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                    placeholder="Describe your target market, competitors, and market trends..."
                    value={marketAnalysis}
                    onChange={(e) => setMarketAnalysis(e.target.value)}
                  />
                </div>

                {/* Financial Projections */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Financial Projections
                    </div>
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                    placeholder="Outline your financial projections, funding needs, and revenue model..."
                    value={financialProjections}
                    onChange={(e) => setFinancialProjections(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Plan
                  </button>
                  <button
                    onClick={handleCopy}
                    className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    Copy to Clipboard
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Template
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Plan Preview
                </h2>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {currentTemplate?.name}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 p-6 rounded-xl whitespace-pre-wrap font-mono text-sm border-2 border-gray-200 max-h-[400px] overflow-y-auto">
                {generatePlan()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features & Tips */}
        <div className="space-y-6">
          {/* Features Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-indigo-600" />
              Plan Features
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Professional Templates
                </div>
                <div className="text-sm text-gray-600">
                  Industry-specific business plan templates
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Easy Customization
                </div>
                <div className="text-sm text-gray-600">
                  Tailor plans to your specific business needs
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Investor Ready
                </div>
                <div className="text-sm text-gray-600">
                  Formats suitable for investors and banks
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-2">
                  Essential Tips
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Keep executive summary concise (1-2 pages)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Include realistic financial projections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Update plan regularly as business grows</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Templates
            </h3>
            <div className="space-y-2">
              {templates.slice(0, 3).map((template) => (
                <button
                  key={template.id}
                  onClick={() => setPlanTemplate(template.id)}
                  className="w-full p-3 bg-white/70 rounded-lg text-left hover:bg-white transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">
                      {template.name}
                    </div>
                    {planTemplate === template.id && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Plan Checklist
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Clear executive summary</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Detailed market analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Financial projections</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Marketing strategy</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span>Management team overview</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Professional Templates
          </h3>
          <p className="text-gray-600">
            Choose from professionally designed templates for various business
            types and industries.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Financial Tools
          </h3>
          <p className="text-gray-600">
            Built-in financial projection tools and calculators for accurate
            business planning.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Easy Export
          </h3>
          <p className="text-gray-600">
            Download in multiple formats including PDF, Word, and plain text for
            easy sharing.
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Business Plan Essentials
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Key Components
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <span>
                  <strong>Executive Summary:</strong> Brief overview of your
                  business and goals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <span>
                  <strong>Market Analysis:</strong> Target market, competitors,
                  and trends
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <span>
                  <strong>Financial Projections:</strong> Revenue, expenses, and
                  funding needs
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-cyan-600" />
              Common Mistakes
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-cyan-600">A</span>
                </div>
                <span>
                  <strong>Unrealistic projections</strong> - Use market data and
                  benchmarks
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-cyan-600">B</span>
                </div>
                <span>
                  <strong>Ignoring competition</strong> - Analyze direct and
                  indirect competitors
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-cyan-600">C</span>
                </div>
                <span>
                  <strong>Weak marketing strategy</strong> - Detail customer
                  acquisition plans
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ad Space */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-center">
        <div className="text-gray-500 mb-2">Advertisement</div>
        <div className="h-[90px] flex items-center justify-center bg-white rounded-xl border border-gray-300">
          <div className="text-gray-400">
            Ad Space (728x90)
            <div className="text-xs mt-1">Support free tools development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlan;
