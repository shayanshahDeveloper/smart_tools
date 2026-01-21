import { useState } from "react";
import {
  Search,
  TrendingUp,
  BarChart3,
  Globe,
  Hash,
  AlertCircle,
  Copy,
  Download,
  Zap,
  Filter,
  RefreshCw,
  ChevronRight,
  Check,
} from "lucide-react";

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [relatedKeywords, setRelatedKeywords] = useState([]);
  const [copied, setCopied] = useState(false);
  const [volumeFilter, setVolumeFilter] = useState([0, 10000]);
  const [difficultyFilter, setDifficultyFilter] = useState([0, 100]);

  const exampleKeywords = [
    "SEO tools",
    "keyword research",
    "search volume",
    "competition analysis",
    "long tail keywords",
  ];

  const analyzeKeyword = () => {
    if (!keyword.trim()) return;

    setIsAnalyzing(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        searchVolume: Math.floor(Math.random() * 100000) + 1000,
        competition: Math.random() * 100,
        difficulty: Math.floor(Math.random() * 100),
        cpc: (Math.random() * 5 + 0.5).toFixed(2),
        trends: Array.from({ length: 12 }, (_, i) => ({
          month: `Month ${i + 1}`,
          volume: Math.floor(Math.random() * 10000) + 1000,
        })),
        intent: [
          "Informational",
          "Commercial",
          "Navigational",
          "Transactional",
        ][Math.floor(Math.random() * 4)],
      };

      const mockRelated = [
        {
          keyword: `${keyword} for beginners`,
          volume: 2400,
          difficulty: 45,
          cpc: 1.2,
          intent: "Informational",
        },
        {
          keyword: `${keyword} best practices`,
          volume: 3200,
          difficulty: 65,
          cpc: 2.5,
          intent: "Commercial",
        },
        {
          keyword: `${keyword} tutorial`,
          volume: 1800,
          difficulty: 30,
          cpc: 0.8,
          intent: "Informational",
        },
        {
          keyword: `${keyword} free tools`,
          volume: 5600,
          difficulty: 75,
          cpc: 3.2,
          intent: "Commercial",
        },
        {
          keyword: `${keyword} 2024`,
          volume: 8900,
          difficulty: 55,
          cpc: 1.8,
          intent: "Navigational",
        },
        {
          keyword: `${keyword} guide`,
          volume: 4200,
          difficulty: 60,
          cpc: 2.1,
          intent: "Informational",
        },
        {
          keyword: `best ${keyword}`,
          volume: 6700,
          difficulty: 70,
          cpc: 3.5,
          intent: "Commercial",
        },
        {
          keyword: `${keyword} online`,
          volume: 3100,
          difficulty: 40,
          cpc: 1.5,
          intent: "Transactional",
        },
        {
          keyword: `${keyword} software`,
          volume: 5100,
          difficulty: 68,
          cpc: 2.8,
          intent: "Commercial",
        },
        {
          keyword: `${keyword} tips`,
          volume: 1900,
          difficulty: 35,
          cpc: 0.9,
          intent: "Informational",
        },
      ];

      setResults(mockResults);
      setRelatedKeywords(mockRelated);
      setIsAnalyzing(false);
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportKeywords = () => {
    const keywordsList = relatedKeywords.map((k) => k.keyword).join("\n");
    const blob = new Blob([keywordsList], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keywords-${keyword}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = [
      "Keyword",
      "Monthly Volume",
      "Difficulty",
      "CPC",
      "Intent",
    ];
    const csvContent = [
      headers.join(","),
      ...relatedKeywords.map((k) =>
        [k.keyword, k.volume, k.difficulty, k.cpc, k.intent].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keywords-${keyword}-detailed.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredKeywords = relatedKeywords.filter(
    (k) =>
      k.volume >= volumeFilter[0] &&
      k.volume <= volumeFilter[1] &&
      k.difficulty >= difficultyFilter[0] &&
      k.difficulty <= difficultyFilter[1]
  );

  const getDifficultyColor = (difficulty) => {
    if (difficulty < 40) return "text-green-600";
    if (difficulty < 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getDifficultyBg = (difficulty) => {
    if (difficulty < 40) return "bg-green-100";
    if (difficulty < 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getIntentColor = (intent) => {
    switch (intent) {
      case "Informational":
        return "text-blue-600 bg-blue-100";
      case "Commercial":
        return "text-purple-600 bg-purple-100";
      case "Transactional":
        return "text-green-600 bg-green-100";
      case "Navigational":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-4">
          <Search className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Keyword Research Tool
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover profitable keywords, analyze search volume, competition, and
          get keyword suggestions to boost your SEO strategy.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Column - Input & Filters */}
        <div className="lg:col-span-3 space-y-8">
          {/* Search Input */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter keyword or phrase
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && analyzeKeyword()}
                    placeholder="e.g., digital marketing, seo tools, content strategy"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={analyzeKeyword}
                  disabled={isAnalyzing || !keyword.trim()}
                  className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all w-full md:w-auto ${
                    isAnalyzing || !keyword.trim()
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
                    "Analyze Keyword"
                  )}
                </button>
              </div>
            </div>

            {/* Quick Examples */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {exampleKeywords.map((example) => (
                  <button
                    key={example}
                    onClick={() => {
                      setKeyword(example);
                      setTimeout(analyzeKeyword, 100);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {results && (
            <>
              {/* Key Metrics */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Keyword Analysis: "{keyword}"
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">
                        Global
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {results.searchVolume.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Monthly Searches
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          results.difficulty < 40
                            ? "bg-green-100 text-green-700"
                            : results.difficulty < 70
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {results.difficulty < 40
                          ? "Easy"
                          : results.difficulty < 70
                          ? "Medium"
                          : "Hard"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {results.difficulty}/100
                    </div>
                    <div className="text-sm text-gray-600">
                      Keyword Difficulty
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <Hash className="w-5 h-5 text-purple-600" />
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          results.competition < 40
                            ? "bg-green-100 text-green-700"
                            : results.competition < 70
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {results.competition < 40
                          ? "Low"
                          : results.competition < 70
                          ? "Medium"
                          : "High"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {results.competition.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Competition</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl border border-orange-100">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                      <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded">
                        Avg. CPC
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${results.cpc}
                    </div>
                    <div className="text-sm text-gray-600">Cost Per Click</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Search Intent
                      </div>
                      <div className="font-medium text-gray-900">
                        {results.intent}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Trend Direction
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-900">
                          Growing
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Keywords */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Related Keyword Suggestions
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({filteredKeywords.length} results)
                    </span>
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={exportKeywords}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export TXT
                    </button>
                    <button
                      onClick={exportCSV}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Volume: {volumeFilter[0].toLocaleString()} -{" "}
                      {volumeFilter[1].toLocaleString()}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={volumeFilter[0]}
                        onChange={(e) =>
                          setVolumeFilter([
                            parseInt(e.target.value),
                            volumeFilter[1],
                          ])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={volumeFilter[1]}
                        onChange={(e) =>
                          setVolumeFilter([
                            volumeFilter[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty: {difficultyFilter[0]} - {difficultyFilter[1]}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={difficultyFilter[0]}
                        onChange={(e) =>
                          setDifficultyFilter([
                            parseInt(e.target.value),
                            difficultyFilter[1],
                          ])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={difficultyFilter[1]}
                        onChange={(e) =>
                          setDifficultyFilter([
                            difficultyFilter[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Keyword
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Volume
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Difficulty
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          CPC
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Intent
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKeywords.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">
                              {item.keyword}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{
                                    width: `${(item.volume / 10000) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-gray-700 font-medium">
                                {item.volume.toLocaleString()}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`px-3 py-1 rounded-full ${getDifficultyBg(
                                  item.difficulty
                                )}`}
                              >
                                <span
                                  className={`text-sm font-medium ${getDifficultyColor(
                                    item.difficulty
                                  )}`}
                                >
                                  {item.difficulty}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-gray-900">
                              ${item.cpc}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${getIntentColor(
                                item.intent
                              )}`}
                            >
                              {item.intent}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => copyToClipboard(item.keyword)}
                              className="px-3 py-1.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                            >
                              {copied ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Tips & Tools */}
        <div className="space-y-6">
          {/* Tips Card */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Pro Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <p className="text-sm text-gray-700">
                  Focus on long-tail keywords (3+ words) for better conversion
                  rates
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <p className="text-sm text-gray-700">
                  Target keywords with difficulty under 60 for new websites
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <p className="text-sm text-gray-700">
                  Look for keywords with commercial intent (buy, review, best)
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">4</span>
                </div>
                <p className="text-sm text-gray-700">
                  Analyze competitor keywords for opportunities
                </p>
              </li>
            </ul>
          </div>

          {/* Keyword Generator */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Generate More Ideas
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seed Keywords (one per line)
                </label>
                <textarea
                  placeholder="Enter seed keywords..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-colors">
                  Expand
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Features
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                Search volume estimation
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                Competition analysis
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                Related keyword suggestions
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                Advanced filtering
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                Export to CSV/TXT
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          {results && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Volume</span>
                  <span className="font-medium text-gray-900">
                    {Math.round(
                      relatedKeywords.reduce((sum, k) => sum + k.volume, 0) /
                        relatedKeywords.length
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Difficulty</span>
                  <span className="font-medium text-gray-900">
                    {Math.round(
                      relatedKeywords.reduce(
                        (sum, k) => sum + k.difficulty,
                        0
                      ) / relatedKeywords.length
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Keywords</span>
                  <span className="font-medium text-gray-900">
                    {relatedKeywords.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Low Competition</span>
                  <span className="font-medium text-gray-900">
                    {relatedKeywords.filter((k) => k.difficulty < 40).length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions when no analysis */}
      {!results && (
        <div className="mt-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How to Use This Tool
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-4">
              <div className="w-12 h-12 bg-white border border-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <p className="text-gray-700">Enter a keyword or phrase above</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-white border border-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <p className="text-gray-700">
                Click "Analyze Keyword" to get insights
              </p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-white border border-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <p className="text-gray-700">
                Explore related keywords and export data
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// DollarSign icon component
const DollarSign = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default KeywordResearch;
