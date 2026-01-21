import { useState } from "react";
import {
  FileDiff,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Hash,
  Percent,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  GitCompare,
  FileCode,
  Code,
} from "lucide-react";

const TextComparer = () => {
  const [text1, setText1] = useState(
    "The quick brown fox jumps over the lazy dog.\nThis is the first sample text for comparison.\nIt contains multiple lines to demonstrate differences."
  );
  const [text2, setText2] = useState(
    "The quick brown fox jumps over the sleepy dog.\nThis is the second sample text for comparison.\nIt contains some differences to show comparison features."
  );
  const [showWhitespace, setShowWhitespace] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const sampleComparisons = [
    {
      name: "Code Diff",
      text1: "function add(a, b) {\n  return a + b;\n}",
      text2: "function add(a, b) {\n  return a + b + 1;\n}",
    },
    {
      name: "Paragraphs",
      text1:
        "Digital marketing strategies focus on online channels. Content creation is essential for engagement.",
      text2:
        "Modern marketing strategies emphasize digital channels. Quality content drives user engagement.",
    },
    {
      name: "Lists",
      text1: "1. First item\n2. Second item\n3. Third item",
      text2: "1. First item\n2. Updated item\n3. Third item\n4. New item",
    },
    {
      name: "Config Files",
      text1: "api_url: https://api.example.com\napi_key: abc123\ntimeout: 30",
      text2:
        "api_url: https://api.new.example.com\napi_key: xyz789\ntimeout: 60\nretries: 3",
    },
  ];

  const calculateDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");

    const result = {
      added: [],
      removed: [],
      modified: [],
      same: [],
      statistics: {
        totalLines1: lines1.length,
        totalLines2: lines2.length,
        sameLines: 0,
        differentLines: 0,
        addedLines: 0,
        removedLines: 0,
      },
    };

    const maxLength = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLength; i++) {
      const line1 = caseSensitive ? lines1[i] : (lines1[i] || "").toLowerCase();
      const line2 = caseSensitive ? lines2[i] : (lines2[i] || "").toLowerCase();

      if (i >= lines1.length) {
        // Added in text2
        result.added.push({ line: lines2[i], index: i });
        result.statistics.addedLines++;
        result.statistics.differentLines++;
      } else if (i >= lines2.length) {
        // Removed from text1
        result.removed.push({ line: lines1[i], index: i });
        result.statistics.removedLines++;
        result.statistics.differentLines++;
      } else if (line1 === line2) {
        // Same
        result.same.push({ line: lines1[i], index: i });
        result.statistics.sameLines++;
      } else {
        // Modified
        result.modified.push({
          line1: lines1[i],
          line2: lines2[i],
          index: i,
        });
        result.statistics.differentLines++;
      }
    }

    // Calculate similarity percentage
    const totalLines = Math.max(lines1.length, lines2.length);
    result.statistics.similarity =
      totalLines > 0
        ? Math.round((result.statistics.sameLines / totalLines) * 100)
        : 100;

    return result;
  };

  const diff = calculateDiff();

  const copyToClipboard = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const clearText = (setter) => {
    setter("");
  };

  const swapTexts = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const loadSample = (sample) => {
    setText1(sample.text1);
    setText2(sample.text2);
  };

  const getSimilarityColor = (percentage) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    if (percentage >= 30) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <FileDiff className="w-10 h-10 text-indigo-600" />
          Text Comparer
        </h1>
        <p className="text-gray-600 text-lg">
          Compare two texts and find differences. Perfect for code reviews,
          document revisions, and content analysis.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Text Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Text Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Text 1
                  </h2>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-600">
                      {text1.split("\n").length} lines
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                  placeholder="Enter first text here..."
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => copyToClipboard(text1, setCopied1)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                      copied1
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {copied1 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied1 ? "Copied!" : "Copy"}
                  </button>

                  <button
                    onClick={() => clearText(setText1)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Text 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Text 2
                  </h2>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">
                      {text2.split("\n").length} lines
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                  placeholder="Enter second text here..."
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => copyToClipboard(text2, setCopied2)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                      copied2
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {copied2 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied2 ? "Copied!" : "Copy"}
                  </button>

                  <button
                    onClick={() => clearText(setText2)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Options */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <GitCompare className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Comparison Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="showWhitespace"
                    checked={showWhitespace}
                    onChange={() => setShowWhitespace(!showWhitespace)}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                  <label
                    htmlFor="showWhitespace"
                    className="font-medium text-gray-900"
                  >
                    Show whitespace differences
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="caseSensitive"
                    checked={caseSensitive}
                    onChange={() => setCaseSensitive(!caseSensitive)}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                  <label
                    htmlFor="caseSensitive"
                    className="font-medium text-gray-900"
                  >
                    Case-sensitive comparison
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={swapTexts}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Swap Texts
                </button>

                <button
                  onClick={() => {
                    clearText(setText1);
                    clearText(setText2);
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
                >
                  Clear Both
                </button>
              </div>
            </div>
          </div>

          {/* Sample Comparisons */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Sample Comparisons
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sampleComparisons.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadSample(sample)}
                    className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900 mb-2">
                      {sample.name}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {sample.text1.substring(0, 40)}...
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Comparison Results */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
            <div className="px-6 py-4 border-b border-green-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Comparison Results
                </h2>
                <div
                  className={`text-lg font-bold ${getSimilarityColor(
                    diff.statistics.similarity
                  )}`}
                >
                  {diff.statistics.similarity}% similar
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 p-4 rounded-xl">
                    <div className="text-xs text-gray-600 mb-1">Same Lines</div>
                    <div className="text-2xl font-bold text-green-600">
                      {diff.statistics.sameLines}
                    </div>
                  </div>

                  <div className="bg-white/70 p-4 rounded-xl">
                    <div className="text-xs text-gray-600 mb-1">
                      Different Lines
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {diff.statistics.differentLines}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 p-4 rounded-xl">
                    <div className="text-xs text-gray-600 mb-1">
                      Added Lines
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {diff.statistics.addedLines}
                    </div>
                  </div>

                  <div className="bg-white/70 p-4 rounded-xl">
                    <div className="text-xs text-gray-600 mb-1">
                      Removed Lines
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {diff.statistics.removedLines}
                    </div>
                  </div>
                </div>
              </div>

              {/* Similarity Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Similarity Score</span>
                  <span>{diff.statistics.similarity}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${getSimilarityColor(
                      diff.statistics.similarity
                    ).replace("text-", "bg-")}`}
                    style={{ width: `${diff.statistics.similarity}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="bg-white/70 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-2">Summary</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">
                      {diff.statistics.sameLines} lines are identical
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-700">
                      {diff.statistics.differentLines} lines have differences
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-700">
                      {diff.statistics.removedLines} lines removed,{" "}
                      {diff.statistics.addedLines} lines added
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diff View */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FileDiff className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Diff View
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {/* Show differences */}
                {diff.added.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-blue-600 mb-2">
                      Added Lines ({diff.added.length})
                    </div>
                    {diff.added.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="text-sm bg-blue-50 p-2 rounded mb-1"
                      >
                        <span className="font-mono">+ {item.line}</span>
                      </div>
                    ))}
                    {diff.added.length > 3 && (
                      <div className="text-xs text-gray-500">
                        + {diff.added.length - 3} more lines...
                      </div>
                    )}
                  </div>
                )}

                {diff.removed.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-red-600 mb-2">
                      Removed Lines ({diff.removed.length})
                    </div>
                    {diff.removed.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="text-sm bg-red-50 p-2 rounded mb-1"
                      >
                        <span className="font-mono">- {item.line}</span>
                      </div>
                    ))}
                    {diff.removed.length > 3 && (
                      <div className="text-xs text-gray-500">
                        - {diff.removed.length - 3} more lines...
                      </div>
                    )}
                  </div>
                )}

                {diff.modified.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-orange-600 mb-2">
                      Modified Lines ({diff.modified.length})
                    </div>
                    {diff.modified.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="space-y-1 mb-2">
                        <div className="text-sm bg-red-50 p-2 rounded">
                          <span className="font-mono">- {item.line1}</span>
                        </div>
                        <div className="text-sm bg-green-50 p-2 rounded">
                          <span className="font-mono">+ {item.line2}</span>
                        </div>
                      </div>
                    ))}
                    {diff.modified.length > 2 && (
                      <div className="text-xs text-gray-500">
                        ... {diff.modified.length - 2} more modified lines
                      </div>
                    )}
                  </div>
                )}

                {diff.added.length === 0 &&
                  diff.removed.length === 0 &&
                  diff.modified.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No differences found
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Common Uses
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Code Review
                </div>
                <div className="text-xs text-gray-600">
                  Compare code versions
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Document Revision
                </div>
                <div className="text-xs text-gray-600">Track changes</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Plagiarism Check
                </div>
                <div className="text-xs text-gray-600">Find similarities</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Data Validation
                </div>
                <div className="text-xs text-gray-600">Verify consistency</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <FileDiff className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Line-by-Line Comparison
          </h3>
          <p className="text-gray-600">
            Compare text line by line with clear highlighting of additions,
            deletions, and modifications.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Percent className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Similarity Analysis
          </h3>
          <p className="text-gray-600">
            Get percentage similarity score and detailed statistics about
            differences between texts.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Code & Text Support
          </h3>
          <p className="text-gray-600">
            Perfect for comparing code snippets, documents, configuration files,
            and any text content.
          </p>
        </div>
      </div>

      {/* Comparison Scenarios */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Comparison Scenarios
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Professional Use
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Code reviews and version control comparisons</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Legal document revisions and contract changes</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Academic paper plagiarism detection</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Configuration file changes in DevOps</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Personal Use</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Comparing product descriptions when shopping</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Checking recipe variations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Reviewing edited photos or documents</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Comparing translations or paraphrased content</span>
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

export default TextComparer;
