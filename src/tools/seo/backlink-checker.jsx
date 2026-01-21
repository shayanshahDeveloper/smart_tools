import { useState } from "react";
import {
  Link as LinkIcon,
  Globe,
  ExternalLink,
  TrendingUp,
  Shield,
  AlertCircle,
  Filter,
  Download,
  Copy,
  BarChart3,
} from "lucide-react";

const BacklinkChecker = () => {
  const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [backlinks, setBacklinks] = useState(null);
  const [filters, setFilters] = useState({
    domainAuthority: [0, 100],
    spamScore: [0, 100],
    follow: "all",
  });

  const checkBacklinks = () => {
    if (!url.trim()) return;

    setIsChecking(true);

    // Simulate API call
    setTimeout(() => {
      const mockBacklinks = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        referringUrl: `https://example${Math.floor(
          Math.random() * 10
        )}.com/page-${i + 1}`,
        domain: `example${Math.floor(Math.random() * 10)}.com`,
        domainAuthority: Math.floor(Math.random() * 100),
        spamScore: Math.floor(Math.random() * 100),
        anchorText: [
          "click here",
          "learn more",
          "read article",
          "visit site",
          "best tools",
        ][Math.floor(Math.random() * 5)],
        date: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        follow: Math.random() > 0.5 ? "follow" : "nofollow",
        traffic: Math.floor(Math.random() * 10000),
        isNew: Math.random() > 0.7,
      }));

      const summary = {
        total: mockBacklinks.length,
        follow: mockBacklinks.filter((b) => b.follow === "follow").length,
        nofollow: mockBacklinks.filter((b) => b.follow === "nofollow").length,
        avgDA: Math.round(
          mockBacklinks.reduce((sum, b) => sum + b.domainAuthority, 0) /
            mockBacklinks.length
        ),
        avgSpam: Math.round(
          mockBacklinks.reduce((sum, b) => sum + b.spamScore, 0) /
            mockBacklinks.length
        ),
        newLinks: mockBacklinks.filter((b) => b.isNew).length,
        lostLinks: Math.floor(Math.random() * 5),
      };

      setBacklinks({
        list: mockBacklinks,
        summary,
      });
      setIsChecking(false);
    }, 2500);
  };

  const filteredBacklinks =
    backlinks?.list.filter((link) => {
      if (filters.follow !== "all" && link.follow !== filters.follow)
        return false;
      if (
        link.domainAuthority < filters.domainAuthority[0] ||
        link.domainAuthority > filters.domainAuthority[1]
      )
        return false;
      if (
        link.spamScore < filters.spamScore[0] ||
        link.spamScore > filters.spamScore[1]
      )
        return false;
      return true;
    }) || [];

  const exportToCSV = () => {
    const headers = [
      "Referring URL",
      "Domain",
      "DA",
      "Spam Score",
      "Anchor Text",
      "Date",
      "Follow",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredBacklinks.map((link) =>
        [
          link.referringUrl,
          link.domain,
          link.domainAuthority,
          link.spamScore,
          `"${link.anchorText}"`,
          link.date,
          link.follow,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const urlObj = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObj;
    a.download = `backlinks-${url.replace(/[^a-z0-9]/gi, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(urlObj);
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  const getDAcolor = (da) => {
    if (da >= 70) return "text-green-600";
    if (da >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getDAbg = (da) => {
    if (da >= 70) return "bg-green-100";
    if (da >= 40) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mb-4">
          <LinkIcon className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Backlink Checker
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Analyze backlink profile, discover referring domains, and identify
          link-building opportunities for any website.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL to Check
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && checkBacklinks()}
                placeholder="https://example.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={checkBacklinks}
              disabled={isChecking || !url.trim()}
              className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all w-full md:w-auto ${
                isChecking || !url.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isChecking ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </span>
              ) : (
                "Check Backlinks"
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Enter any website URL to analyze its backlink profile and referring
            domains.
          </p>
        </div>
      </div>

      {backlinks && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <LinkIcon className="w-6 h-6 text-blue-600" />
                <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">
                  Total
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {backlinks.summary.total}
              </div>
              <div className="text-sm text-gray-600">Backlinks Found</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                  Follow
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {backlinks.summary.follow}
              </div>
              <div className="text-sm text-gray-600">Follow Links</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
                <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                  Avg DA
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {backlinks.summary.avgDA}
              </div>
              <div className="text-sm text-gray-600">Domain Authority</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
              <div className="flex items-center justify-between mb-3">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded">
                  New
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {backlinks.summary.newLinks}
              </div>
              <div className="text-sm text-gray-600">New This Month</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  Filters
                </h3>

                <div className="space-y-6">
                  {/* Domain Authority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Domain Authority: {filters.domainAuthority[0]} -{" "}
                      {filters.domainAuthority[1]}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.domainAuthority[0]}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            domainAuthority: [
                              parseInt(e.target.value),
                              filters.domainAuthority[1],
                            ],
                          })
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.domainAuthority[1]}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            domainAuthority: [
                              filters.domainAuthority[0],
                              parseInt(e.target.value),
                            ],
                          })
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Spam Score */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Max Spam Score: {filters.spamScore[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.spamScore[1]}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          spamScore: [0, parseInt(e.target.value)],
                        })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Follow Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Link Type
                    </label>
                    <div className="space-y-2">
                      {["all", "follow", "nofollow"].map((type) => (
                        <button
                          key={type}
                          onClick={() =>
                            setFilters({ ...filters, follow: type })
                          }
                          className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                            filters.follow === type
                              ? "bg-blue-50 text-blue-700"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {filteredBacklinks.length}
                      </div>
                      <div className="text-sm text-gray-600">Results</div>
                    </div>
                  </div>

                  {/* Export Button */}
                  <button
                    onClick={exportToCSV}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export as CSV
                  </button>
                </div>
              </div>
            </div>

            {/* Backlinks List */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Backlink Analysis Results
                  </h3>
                  <div className="text-sm text-gray-600">
                    Showing {filteredBacklinks.length} of{" "}
                    {backlinks.list.length} links
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                          Referring URL
                        </th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                          DA
                        </th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                          Spam
                        </th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                          Type
                        </th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBacklinks.map((link) => (
                        <tr
                          key={link.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-medium text-gray-900 truncate max-w-md">
                                {link.referringUrl}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                Anchor: "{link.anchorText}" • {link.date}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full ${getDAbg(
                                link.domainAuthority
                              )}`}
                            >
                              <span
                                className={`text-sm font-medium ${getDAcolor(
                                  link.domainAuthority
                                )}`}
                              >
                                {link.domainAuthority}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    link.spamScore < 30
                                      ? "bg-green-500"
                                      : link.spamScore < 70
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                  style={{ width: `${link.spamScore}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-700">
                                {link.spamScore}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                link.follow === "follow"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {link.follow}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyUrl(link.referringUrl)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Copy URL"
                              >
                                <Copy className="w-4 h-4 text-gray-600" />
                              </button>
                              <a
                                href={link.referringUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Open in new tab"
                              >
                                <ExternalLink className="w-4 h-4 text-gray-600" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quality Score */}
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Backlink Quality Score
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Link Quality
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round(
                          (backlinks.summary.avgDA / 100) * 60 +
                            ((100 - backlinks.summary.avgSpam) / 100) * 40
                        )}
                        /100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-yellow-500 h-3 rounded-full"
                        style={{
                          width: `${
                            (backlinks.summary.avgDA / 100) * 60 +
                            ((100 - backlinks.summary.avgSpam) / 100) * 40
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${
                        backlinks.summary.avgDA >= 50 &&
                        backlinks.summary.avgSpam < 30
                          ? "text-green-600"
                          : backlinks.summary.avgDA >= 30 &&
                            backlinks.summary.avgSpam < 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {backlinks.summary.avgDA >= 50 &&
                      backlinks.summary.avgSpam < 30
                        ? "Good"
                        : backlinks.summary.avgDA >= 30 &&
                          backlinks.summary.avgSpam < 50
                        ? "Fair"
                        : "Poor"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Instructions when no data */}
      {!backlinks && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="text-center max-w-2xl mx-auto">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What You'll Get
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Domain Authority
                </h4>
                <p className="text-sm text-gray-600">
                  Check authority scores of referring domains
                </p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Spam Detection
                </h4>
                <p className="text-sm text-gray-600">
                  Identify and filter low-quality spam links
                </p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
                <p className="text-sm text-gray-600">
                  Download backlink reports in CSV format
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600 mb-3">
                <strong>Note:</strong> This tool uses simulated data for
                demonstration. In a real application, this would connect to SEO
                APIs like Moz, Ahrefs, or SEMrush.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BacklinkChecker;
