import { useState } from "react";
import {
  BarChart3,
  Globe,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Download,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

const SEOAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeSEO = () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);

    // Simulate API call
    setTimeout(() => {
      const mockAnalysis = {
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        issues: [
          {
            type: "warning",
            message: "Missing meta description",
            fix: "Add a unique meta description under 155 characters",
          },
          {
            type: "error",
            message: "Slow page speed (3.2s)",
            fix: "Optimize images and enable browser caching",
          },
          {
            type: "warning",
            message: "Missing alt text on images",
            fix: "Add descriptive alt text to all images",
          },
          { type: "success", message: "Mobile responsive ✓", fix: "" },
          {
            type: "warning",
            message: "Thin content (< 300 words)",
            fix: "Add more valuable content to the page",
          },
          { type: "success", message: "SSL certificate installed ✓", fix: "" },
        ],
        metrics: {
          pageSpeed: Math.floor(Math.random() * 40) + 60,
          mobileFriendly: Math.random() > 0.3,
          ssl: Math.random() > 0.2,
          titleLength: Math.floor(Math.random() * 30) + 40,
          metaDescriptionLength: Math.floor(Math.random() * 100) + 80,
          wordCount: Math.floor(Math.random() * 1000) + 500,
          internalLinks: Math.floor(Math.random() * 20) + 5,
          externalLinks: Math.floor(Math.random() * 10) + 1,
        },
        recommendations: [
          "Improve page loading speed by compressing images",
          "Add more internal links to related content",
          "Create a proper heading structure (H1, H2, H3)",
          "Build more backlinks from authority sites",
          "Update content regularly to stay fresh",
        ],
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBg = (score) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 70) return "bg-yellow-100";
    if (score >= 50) return "bg-orange-100";
    return "bg-red-100";
  };

  const downloadReport = () => {
    const report = `
SEO Analysis Report
URL: ${url}
Date: ${new Date().toLocaleDateString()}
Score: ${analysis?.score}/100

Issues:
${analysis?.issues.map((issue) => `- ${issue.message}`).join("\n")}

Recommendations:
${analysis?.recommendations.map((rec) => `- ${rec}`).join("\n")}
    `;

    const blob = new Blob([report], { type: "text/plain" });
    const urlObj = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObj;
    a.download = `seo-report-${url.replace(/[^a-z0-9]/gi, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(urlObj);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl mb-4">
          <BarChart3 className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">SEO Analyzer</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Analyze any website's SEO performance, identify issues, and get
          actionable recommendations to improve search rankings.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && analyzeSEO()}
                placeholder="https://example.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={analyzeSEO}
              disabled={isAnalyzing || !url.trim()}
              className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all w-full md:w-auto ${
                isAnalyzing || !url.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </span>
              ) : (
                "Analyze SEO"
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Enter any website URL (including https://) to analyze its SEO
            performance.
          </p>
        </div>
      </div>

      {analysis && (
        <div className="space-y-8">
          {/* Score Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  SEO Score
                </h2>
                <p className="text-gray-600">
                  Overall rating based on technical SEO, content quality, and
                  user experience factors.
                </p>
              </div>
              <div
                className={`w-40 h-40 rounded-full ${getScoreBg(
                  analysis.score
                )} flex items-center justify-center`}
              >
                <div className="text-center">
                  <div
                    className={`text-5xl font-bold ${getScoreColor(
                      analysis.score
                    )}`}
                  >
                    {analysis.score}
                  </div>
                  <div className="text-gray-600 mt-2">out of 100</div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={downloadReport}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
                <button
                  onClick={analyzeSEO}
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-lg hover:from-gray-700 hover:to-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Re-analyze
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Issues & Recommendations */}
            <div className="lg:col-span-2 space-y-8">
              {/* Issues */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Issues Found (
                  {analysis.issues.filter((i) => i.type !== "success").length})
                </h3>
                <div className="space-y-4">
                  {analysis.issues.map((issue, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        issue.type === "error"
                          ? "border-red-200 bg-red-50"
                          : issue.type === "warning"
                          ? "border-yellow-200 bg-yellow-50"
                          : "border-green-200 bg-green-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {issue.type === "error" && (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        {issue.type === "warning" && (
                          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        )}
                        {issue.type === "success" && (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mb-1">
                            {issue.message}
                          </div>
                          {issue.fix && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Fix: </span>
                              {issue.fix}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-green-700">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-gray-700">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Metrics */}
            <div className="space-y-6">
              {/* Quick Metrics */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Key Metrics
                </h3>
                <div className="space-y-4">
                  {Object.entries(analysis.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-medium text-gray-900">
                        {typeof value === "boolean"
                          ? value
                            ? "✓"
                            : "✗"
                          : typeof value === "number" &&
                            key.toLowerCase().includes("speed")
                          ? `${value}%`
                          : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  SEO Checklist
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Meta Title (50-60 chars)",
                      checked:
                        analysis.metrics.titleLength >= 40 &&
                        analysis.metrics.titleLength <= 60,
                    },
                    {
                      label: "Meta Description (120-155)",
                      checked:
                        analysis.metrics.metaDescriptionLength >= 120 &&
                        analysis.metrics.metaDescriptionLength <= 155,
                    },
                    {
                      label: "Mobile Friendly",
                      checked: analysis.metrics.mobileFriendly,
                    },
                    { label: "SSL Secure", checked: analysis.metrics.ssl },
                    {
                      label: "Good Page Speed (>70)",
                      checked: analysis.metrics.pageSpeed >= 70,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          item.checked
                            ? "bg-green-100 border-green-400"
                            : "bg-red-100 border-red-300"
                        }`}
                      >
                        {item.checked ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          item.checked ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Pro Tip
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  SEO is a marathon, not a sprint. Focus on fixing critical
                  issues first, then work on improvements over time.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Clock className="w-4 h-4" />
                  <span>Estimated improvement time: 2-4 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions when no analysis */}
      {!analysis && (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How to Use This Tool
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-4">
              <div className="w-12 h-12 bg-white border border-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <p className="text-gray-700">Enter any website URL above</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-white border border-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <p className="text-gray-700">
                Click "Analyze SEO" to run the check
              </p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-white border border-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <p className="text-gray-700">
                Review issues and get recommendations
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOAnalyzer;
