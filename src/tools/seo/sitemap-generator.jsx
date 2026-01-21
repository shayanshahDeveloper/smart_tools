import { useState } from "react";
import {
  Map,
  Globe,
  FileText,
  Download,
  Copy,
  Check,
  Link as LinkIcon,
  Plus,
  Trash2,
} from "lucide-react";

const SitemapGenerator = () => {
  const [urls, setUrls] = useState([
    {
      url: "/",
      priority: "1.0",
      changefreq: "daily",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      url: "/about",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      url: "/contact",
      priority: "0.7",
      changefreq: "yearly",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      url: "/services",
      priority: "0.9",
      changefreq: "weekly",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      url: "/blog",
      priority: "0.8",
      changefreq: "daily",
      lastmod: new Date().toISOString().split("T")[0],
    },
  ]);

  const [baseUrl, setBaseUrl] = useState("https://yourwebsite.com");
  const [copied, setCopied] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const generateSitemap = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  )
  .join("")}
</urlset>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSitemap());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSitemap = () => {
    const blob = new Blob([generateSitemap()], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addUrl = () => {
    if (newUrl.trim()) {
      const newPage = {
        url: newUrl.startsWith("/") ? newUrl : `/${newUrl}`,
        priority: "0.5",
        changefreq: "monthly",
        lastmod: new Date().toISOString().split("T")[0],
      };
      setUrls([...urls, newPage]);
      setNewUrl("");
    }
  };

  const removeUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index, field, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = { ...updatedUrls[index], [field]: value };
    setUrls(updatedUrls);
  };

  const frequencyOptions = [
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never",
  ];
  const priorityOptions = [
    "0.1",
    "0.2",
    "0.3",
    "0.4",
    "0.5",
    "0.6",
    "0.7",
    "0.8",
    "0.9",
    "1.0",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Map className="w-10 h-10 text-indigo-600" />
          Sitemap Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Create XML sitemaps for better search engine crawling and indexing
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - URL Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Base URL */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                Website Configuration
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base URL
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
                <p className="text-xs text-gray-500 mt-2">
                  All URLs will be prefixed with this base URL
                </p>
              </div>
            </div>
          </div>

          {/* Add New URL */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                Add New Page
              </h3>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="/page-url"
                />
                <button
                  onClick={addUrl}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* URL List */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-indigo-600" />
                Pages in Sitemap ({urls.length})
              </h3>

              <div className="space-y-4">
                {urls.map((page, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {baseUrl}
                          {page.url}
                        </div>
                        <div className="text-sm text-gray-500">
                          Last Modified: {page.lastmod}
                        </div>
                      </div>
                      <button
                        onClick={() => removeUrl(index)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Change Frequency
                        </label>
                        <select
                          value={page.changefreq}
                          onChange={(e) =>
                            updateUrl(index, "changefreq", e.target.value)
                          }
                          className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          {frequencyOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Priority
                        </label>
                        <select
                          value={page.priority}
                          onChange={(e) =>
                            updateUrl(index, "priority", e.target.value)
                          }
                          className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          {priorityOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview & Export */}
        <div className="space-y-6">
          {/* Generated Sitemap */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Generated Sitemap
              </h3>

              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto mb-4">
                <pre className="text-xs whitespace-pre-wrap">
                  {generateSitemap()}
                </pre>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy XML"}
                </button>

                <button
                  onClick={downloadSitemap}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Sitemap Info */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sitemap Information
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Pages</span>
                  <span className="font-medium text-indigo-600">
                    {urls.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">File Size</span>
                  <span className="font-medium text-indigo-600">
                    {(generateSitemap().length / 1024).toFixed(2)} KB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Max Pages</span>
                  <span className="font-medium text-indigo-600">50,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sitemap Best Practices
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Include only canonical URLs (no duplicates)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Update lastmod when content changes</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Submit sitemap to Google Search Console</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Keep file under 50MB (uncompressed)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            XML Format
          </h3>
          <p className="text-gray-600">
            Generate standard XML sitemaps compatible with all search engines.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Map className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Easy Management
          </h3>
          <p className="text-gray-600">
            Add, edit, and remove URLs with priority and change frequency
            settings.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Instant Export
          </h3>
          <p className="text-gray-600">
            Copy XML code or download file directly for immediate use.
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

export default SitemapGenerator;
