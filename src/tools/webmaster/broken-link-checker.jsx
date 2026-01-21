import { useState, useEffect } from "react";
import {
  Link,
  Unlink,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Download,
  BarChart3,
  Filter,
  Globe,
  Clock,
  FileText,
} from "lucide-react";

const BrokenLinkChecker = () => {
  const [url, setUrl] = useState("https://example.com");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState(null);
  const [filters, setFilters] = useState({
    showBroken: true,
    showRedirects: true,
    showWorking: false,
    minStatusCode: 400,
  });

  const simulateLinkCheck = () => {
    setIsChecking(true);
    setResults(null);

    setTimeout(() => {
      // Simulate finding links
      const simulatedLinks = [
        {
          url: "https://example.com/page1",
          status: 200,
          type: "internal",
          text: "Home Page",
          time: 150,
        },
        {
          url: "https://example.com/page2",
          status: 404,
          type: "internal",
          text: "About Us",
          time: 200,
        },
        {
          url: "https://example.com/page3",
          status: 301,
          type: "internal",
          text: "Services",
          time: 180,
        },
        {
          url: "https://google.com",
          status: 200,
          type: "external",
          text: "Search Engine",
          time: 300,
        },
        {
          url: "https://nonexistent-domain-xyz.com",
          status: 0,
          type: "external",
          text: "Partner Site",
          time: 5000,
        },
        {
          url: "https://example.com/image.jpg",
          status: 200,
          type: "image",
          text: "Hero Image",
          time: 120,
        },
        {
          url: "https://example.com/script.js",
          status: 200,
          type: "script",
          text: "Main Script",
          time: 110,
        },
        {
          url: "https://example.com/old-page",
          status: 410,
          type: "internal",
          text: "Old Content",
          time: 220,
        },
        {
          url: "https://example.com/redirect",
          status: 302,
          type: "internal",
          text: "Temporary Redirect",
          time: 190,
        },
        {
          url: "https://example.com/forbidden",
          status: 403,
          type: "internal",
          text: "Restricted Area",
          time: 210,
        },
        {
          url: "https://example.com/server-error",
          status: 500,
          type: "internal",
          text: "Admin Panel",
          time: 250,
        },
        {
          url: "https://example.com/styles.css",
          status: 200,
          type: "stylesheet",
          text: "Main CSS",
          time: 100,
        },
      ];

      const brokenLinks = simulatedLinks.filter(
        (link) => link.status >= 400 || link.status === 0
      );
      const workingLinks = simulatedLinks.filter(
        (link) => link.status >= 200 && link.status < 300
      );
      const redirectLinks = simulatedLinks.filter(
        (link) => link.status >= 300 && link.status < 400
      );

      setResults({
        totalLinks: simulatedLinks.length,
        brokenLinks: brokenLinks.length,
        workingLinks: workingLinks.length,
        redirectLinks: redirectLinks.length,
        averageResponseTime: Math.round(
          simulatedLinks.reduce((sum, link) => sum + link.time, 0) /
            simulatedLinks.length
        ),
        links: simulatedLinks,
        checkedAt: new Date().toLocaleString(),
      });

      setIsChecking(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    if (status === 0) return "bg-red-100 text-red-800";
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
    if (status >= 300 && status < 400) return "bg-yellow-100 text-yellow-800";
    if (status >= 400 && status < 500) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusText = (status) => {
    if (status === 0) return "Failed";
    if (status === 200) return "OK";
    if (status === 301) return "Moved Permanently";
    if (status === 302) return "Found";
    if (status === 404) return "Not Found";
    if (status === 410) return "Gone";
    if (status === 403) return "Forbidden";
    if (status === 500) return "Internal Server Error";
    return `Status ${status}`;
  };

  const getTypeColor = (type) => {
    const colors = {
      internal: "bg-blue-100 text-blue-800",
      external: "bg-purple-100 text-purple-800",
      image: "bg-pink-100 text-pink-800",
      script: "bg-yellow-100 text-yellow-800",
      stylesheet: "bg-indigo-100 text-indigo-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const filteredLinks =
    results?.links.filter((link) => {
      if (link.status >= 400 || link.status === 0) return filters.showBroken;
      if (link.status >= 300 && link.status < 400) return filters.showRedirects;
      return filters.showWorking;
    }) || [];

  const presetSites = [
    { url: "https://web.dev", name: "Web.dev" },
    { url: "https://developer.mozilla.org", name: "MDN" },
    { url: "https://github.com", name: "GitHub" },
    { url: "https://stackoverflow.com", name: "StackOverflow" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Unlink className="w-10 h-10 text-blue-600" />
          Broken Link Checker
        </h1>
        <p className="text-gray-600 text-lg">
          Find and fix broken links on your website for better user experience
          and SEO
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* URL Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Example Websites
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presetSites.map((preset) => (
                  <button
                    key={preset.url}
                    onClick={() => setUrl(preset.url)}
                    className={`p-4 border rounded-xl text-center transition-all ${
                      url === preset.url
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {preset.name}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {preset.url.replace("https://", "")}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* URL Input */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Check Website Links
              </h3>

              <div className="space-y-6">
                {/* URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Website URL
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => setUrl("")}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={simulateLinkCheck}
                    disabled={isChecking}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Checking Links...
                      </>
                    ) : (
                      <>
                        <Link className="w-5 h-5" />
                        Check Links
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setUrl("https://example.com");
                      setResults(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          {results && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filter Results
                  </h3>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.showBroken}
                      onChange={(e) =>
                        setFilters({ ...filters, showBroken: e.target.checked })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Broken Links ({results.brokenLinks})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.showRedirects}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          showRedirects: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Redirects ({results.redirectLinks})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.showWorking}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          showWorking: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Working Links ({results.workingLinks})
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Results Table */}
          {results && filteredLinks.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Link Analysis Results
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          URL
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Response Time
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLinks.map((link, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-gray-900 truncate max-w-xs">
                                {link.text}
                              </div>
                              <div className="text-sm text-gray-600 font-mono truncate max-w-xs">
                                {link.url}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                link.status
                              )}`}
                            >
                              {getStatusText(link.status)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                link.type
                              )}`}
                            >
                              {link.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">
                                {link.time}ms
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <button className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-800 text-sm">
                              <ExternalLink className="w-4 h-4" />
                              Visit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Results */}
        {results && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Link className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Link Analysis
                </h3>
                <div className="text-3xl font-bold text-blue-600">
                  {results.totalLinks}
                </div>
                <p className="text-sm text-gray-600 mt-2">Total links found</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Broken Links</span>
                  <span
                    className={`font-medium ${
                      results.brokenLinks > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {results.brokenLinks}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Redirects</span>
                  <span className="font-medium text-yellow-600">
                    {results.redirectLinks}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Avg Response Time</span>
                  <span className="font-medium text-green-600">
                    {results.averageResponseTime}ms
                  </span>
                </div>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Status Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        Working (200-299)
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {results.workingLinks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        Redirects (300-399)
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {results.redirectLinks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        Broken (400+)
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {results.brokenLinks}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommendations
              </h3>
              <div className="space-y-3">
                {results.brokenLinks > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Fix Broken Links
                      </div>
                      <div className="text-sm text-gray-600">
                        Found {results.brokenLinks} broken links that need to be
                        fixed or removed.
                      </div>
                    </div>
                  </div>
                )}
                {results.redirectLinks > 5 && (
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Minimize Redirects
                      </div>
                      <div className="text-sm text-gray-600">
                        Consider reducing redirect chains to improve page load
                        speed.
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Regular Monitoring
                    </div>
                    <div className="text-sm text-gray-600">
                      Check for broken links regularly to maintain site quality.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Link Type Distribution */}
      {results && (
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Link Type Analysis
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Link types chart */}
              <div className="h-48 flex items-end gap-2 p-4 bg-gray-50 rounded-xl">
                {["internal", "external", "image", "script"].map((type) => {
                  const count = results.links.filter(
                    (link) => link.type === type
                  ).length;
                  const height = (count / results.totalLinks) * 100;

                  return (
                    <div
                      key={type}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className={`w-full rounded-t-lg ${
                          type === "internal"
                            ? "bg-blue-500"
                            : type === "external"
                            ? "bg-purple-500"
                            : type === "image"
                            ? "bg-pink-500"
                            : "bg-yellow-500"
                        }`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2 capitalize">
                        {type}
                      </div>
                      <div className="text-xs font-medium text-gray-900">
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Broken Link Rate
                    </span>
                    <span className="text-sm font-medium text-red-600">
                      {(
                        (results.brokenLinks / results.totalLinks) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (results.brokenLinks / results.totalLinks) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Internal Links
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      {
                        results.links.filter((l) => l.type === "internal")
                          .length
                      }
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (results.links.filter((l) => l.type === "internal")
                            .length /
                            results.totalLinks) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      External Links
                    </span>
                    <span className="text-sm font-medium text-purple-600">
                      {
                        results.links.filter((l) => l.type === "external")
                          .length
                      }
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (results.links.filter((l) => l.type === "external")
                            .length /
                            results.totalLinks) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Check Info */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Checked At
                  </div>
                  <div className="text-gray-800">{results.checkedAt}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Website
                  </div>
                  <div className="text-gray-800 truncate">
                    {url.replace("https://", "")}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                  <FileText className="w-5 h-5" />
                  Generate Report
                </button>
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700">
                  <Download className="w-5 h-5" />
                  Export CSV
                </button>
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200">
                  <RefreshCw className="w-5 h-5" />
                  Re-check
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Unlink className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Broken Link Detection
          </h3>
          <p className="text-gray-600">
            Find 404 errors, server errors, and other broken links that harm
            user experience.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Comprehensive Analysis
          </h3>
          <p className="text-gray-600">
            Analyze link types, response times, and get detailed status reports.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Filter className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Smart Filtering
          </h3>
          <p className="text-gray-600">
            Filter results by status code, link type, and response time for
            focused analysis.
          </p>
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

export default BrokenLinkChecker;
