import { useState } from "react";
import {
  Search,
  FileText,
  Code,
  Copy,
  Check,
  Globe,
  Eye,
  Smartphone,
  Download,
} from "lucide-react";

const MetaTagGenerator = () => {
  const [metaData, setMetaData] = useState({
    title: "Your Website Title",
    description: "Your website description for SEO optimization",
    keywords: "keyword1, keyword2, keyword3",
    author: "Author Name",
    viewport: "width=device-width, initial-scale=1",
    robots: "index, follow",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
  });

  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");

  const handleChange = (field, value) => {
    setMetaData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateMetaTags = () => {
    return `<!-- Meta Tags for SEO -->
<title>${metaData.title}</title>
<meta name="description" content="${metaData.description}" />
<meta name="keywords" content="${metaData.keywords}" />
<meta name="author" content="${metaData.author}" />
<meta name="viewport" content="${metaData.viewport}" />
<meta name="robots" content="${metaData.robots}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${
      metaData.ogUrl || "https://yourwebsite.com"
    }" />
<meta property="og:title" content="${metaData.ogTitle || metaData.title}" />
<meta property="og:description" content="${
      metaData.ogDescription || metaData.description
    }" />
<meta property="og:image" content="${
      metaData.ogImage || "https://yourwebsite.com/image.jpg"
    }" />

<!-- Twitter -->
<meta property="twitter:card" content="${metaData.twitterCard}" />
<meta property="twitter:url" content="${
      metaData.ogUrl || "https://yourwebsite.com"
    }" />
<meta property="twitter:title" content="${
      metaData.twitterTitle || metaData.title
    }" />
<meta property="twitter:description" content="${
      metaData.twitterDescription || metaData.description
    }" />
<meta property="twitter:image" content="${
      metaData.twitterImage ||
      metaData.ogImage ||
      "https://yourwebsite.com/image.jpg"
    }" />`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMetaTags = () => {
    const blob = new Blob([generateMetaTags()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meta-tags.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setMetaData({
      title: "Your Website Title",
      description: "Your website description for SEO optimization",
      keywords: "keyword1, keyword2, keyword3",
      author: "Author Name",
      viewport: "width=device-width, initial-scale=1",
      robots: "index, follow",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      ogUrl: "",
      twitterCard: "summary_large_image",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <FileText className="w-10 h-10 text-indigo-600" />
          Meta Tag Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Generate SEO-optimized meta tags for better search engine ranking and
          social media sharing
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Meta Tags */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-600" />
                Basic Meta Tags
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title
                  </label>
                  <input
                    type="text"
                    value={metaData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter page title (50-60 characters recommended)"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {metaData.title.length}/60 characters
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={metaData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter meta description (150-160 characters recommended)"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {metaData.description.length}/160 characters
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={metaData.keywords}
                    onChange={(e) => handleChange("keywords", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="comma-separated keywords"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={metaData.author}
                      onChange={(e) => handleChange("author", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Viewport
                    </label>
                    <input
                      type="text"
                      value={metaData.viewport}
                      onChange={(e) => handleChange("viewport", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Meta Tags */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                Social Media Meta Tags
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Title
                  </label>
                  <input
                    type="text"
                    value={metaData.ogTitle}
                    onChange={(e) => handleChange("ogTitle", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="OG title (Facebook, LinkedIn)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Description
                  </label>
                  <textarea
                    value={metaData.ogDescription}
                    onChange={(e) =>
                      handleChange("ogDescription", e.target.value)
                    }
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="OG description for social media"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={metaData.ogImage}
                    onChange={(e) => handleChange("ogImage", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <input
                    type="text"
                    value={metaData.ogUrl}
                    onChange={(e) => handleChange("ogUrl", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com/page"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview & Results */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                Preview
              </h3>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`px-4 py-2 rounded-lg ${
                    previewMode === "desktop"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`px-4 py-2 rounded-lg ${
                    previewMode === "mobile"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Smartphone className="w-4 h-4 inline mr-1" />
                  Mobile
                </button>
              </div>

              <div
                className={`border rounded-lg p-4 ${
                  previewMode === "mobile" ? "max-w-xs mx-auto" : ""
                }`}
              >
                <div className="text-sm text-gray-500 mb-2">
                  Search Result Preview
                </div>
                <div className="text-blue-700 font-medium truncate">
                  {metaData.title}
                </div>
                <div className="text-green-700 text-sm">
                  https://yourwebsite.com
                </div>
                <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {metaData.description}
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                Generated Meta Tags
              </h3>

              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm whitespace-pre-wrap">
                  {generateMetaTags()}
                </pre>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy Code"}
                </button>

                <button
                  onClick={downloadMetaTags}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>

                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              SEO Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Keep title under 60 characters for optimal display</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Meta description should be 150-160 characters</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Include primary keywords naturally</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Social media tags improve click-through rates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            SEO Optimized
          </h3>
          <p className="text-gray-600">
            Generate meta tags that follow best SEO practices for better search
            engine ranking.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Social Media Ready
          </h3>
          <p className="text-gray-600">
            Includes Open Graph and Twitter Card tags for optimal social media
            sharing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Easy to Use
          </h3>
          <p className="text-gray-600">
            Copy generated code directly or download as HTML file for instant
            use.
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

export default MetaTagGenerator;
