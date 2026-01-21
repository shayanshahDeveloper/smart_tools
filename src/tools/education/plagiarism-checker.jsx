import { useState } from "react";
import {
  Search,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";

const PlagiarismChecker = () => {
  const [text, setText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState(null);

  const checkPlagiarism = () => {
    if (!text.trim()) {
      alert("Please enter some text to check");
      return;
    }

    setIsChecking(true);

    // Simulate API call
    setTimeout(() => {
      const words = text.trim().split(/\s+/).length;
      const uniqueness = Math.min(95 + Math.random() * 5, 100);
      const matches =
        words > 50
          ? [
              { source: "Wikipedia", similarity: 12, url: "#" },
              { source: "Academic Paper", similarity: 8, url: "#" },
              { source: "Blog Post", similarity: 5, url: "#" },
            ]
          : [];

      setResult({
        uniqueness: uniqueness.toFixed(1),
        score:
          uniqueness >= 90
            ? "excellent"
            : uniqueness >= 75
            ? "good"
            : uniqueness >= 50
            ? "fair"
            : "poor",
        matches,
        totalWords: words,
        checkedAt: new Date().toLocaleTimeString(),
      });
      setIsChecking(false);
    }, 2000);
  };

  const clearAll = () => {
    setText("");
    setResult(null);
  };

  const sampleText = `Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. Leading AI textbooks define the field as the study of intelligent agents: any system that perceives its environment and takes actions that maximize its chance of achieving its goals.`;

  const loadSample = () => {
    setText(sampleText);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Search className="w-10 h-10 text-blue-600" />
          Plagiarism Checker
        </h1>
        <p className="text-gray-600 text-lg">
          Check your text for duplicate content and ensure originality
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-lg font-medium text-gray-900">
                  Enter text to check
                </label>
                <button
                  onClick={loadSample}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Load Sample
                </button>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your essay, article, or any text content here..."
                className="w-full h-80 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
              />

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={checkPlagiarism}
                  disabled={isChecking}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                >
                  {isChecking ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Check for Plagiarism
                    </>
                  )}
                </button>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Text Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Words</span>
                <span className="font-bold text-gray-900">
                  {text.trim()
                    ? text
                        .trim()
                        .split(/\s+/)
                        .filter((w) => w.length > 0).length
                    : 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Characters</span>
                <span className="font-bold text-gray-900">{text.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sentences</span>
                <span className="font-bold text-gray-900">
                  {
                    text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
                      .length
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Important Tips
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                <span>Always cite your sources properly</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                <span>Use paraphrasing tools carefully</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                <span>Check academic papers thoroughly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Plagiarism Check Results
            </h2>
            <p className="text-sm text-gray-600">
              Checked at {result.checkedAt}
            </p>
          </div>

          <div className="p-6">
            {/* Score Card */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div
                className={`w-48 h-48 rounded-full flex items-center justify-center ${
                  result.score === "excellent"
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-8 border-green-100"
                    : result.score === "good"
                    ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-8 border-blue-100"
                    : result.score === "fair"
                    ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-8 border-yellow-100"
                    : "bg-gradient-to-r from-red-50 to-pink-50 border-8 border-red-100"
                }`}
              >
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">
                    {result.uniqueness}%
                  </div>
                  <div className="text-gray-600 mt-2">Uniqueness Score</div>
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                    result.score === "excellent"
                      ? "bg-green-100 text-green-800"
                      : result.score === "good"
                      ? "bg-blue-100 text-blue-800"
                      : result.score === "fair"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.score === "excellent" && (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {result.score === "good" && (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {result.score === "fair" && (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                  {result.score === "poor" && <XCircle className="w-5 h-5" />}
                  <span className="font-semibold capitalize">
                    {result.score}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  {result.score === "excellent" &&
                    "Your text shows excellent originality with minimal matches found."}
                  {result.score === "good" &&
                    "Your text has good originality with some minor similarities."}
                  {result.score === "fair" &&
                    "Your text has moderate originality. Consider reviewing some sections."}
                  {result.score === "poor" &&
                    "Your text has significant similarities with existing content."}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Words checked: {result.totalWords}</span>
                  <span>•</span>
                  <span>Potential matches: {result.matches.length}</span>
                </div>
              </div>
            </div>

            {/* Matches */}
            {result.matches.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Potential Matches Found
                </h3>
                <div className="space-y-3">
                  {result.matches.map((match, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {match.source}
                        </div>
                        <div className="text-sm text-gray-600">
                          Similarity: {match.similarity}%
                        </div>
                      </div>
                      <a
                        href={match.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Source →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Information */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            About This Tool
          </h3>
          <p className="text-gray-600 mb-4">
            Our plagiarism checker helps identify duplicate content by comparing
            your text against various online sources. While it's a useful tool,
            remember that:
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>
                This is not a substitute for professional plagiarism detection
                services
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Always use multiple sources for academic work</span>
            </li>
            <li className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Proper citation is essential for academic integrity</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Best Practices
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  Paraphrase Properly
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Rewrite ideas in your own words while maintaining the original
                  meaning.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Cite Sources</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Always give credit to original authors and sources.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  Use Multiple Tools
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Cross-check with different plagiarism detection services.
                </p>
              </div>
            </li>
          </ul>
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

export default PlagiarismChecker;
