import { useState } from "react";
import {
  Type,
  Copy,
  Check,
  RefreshCw,
  ArrowUpDown,
  FileText,
  Hash,
  Sparkles,
  CaseSensitive,
  ToggleLeft,
  ToggleRight,
  Zap,
} from "lucide-react";

const CaseConverter = () => {
  const [text, setText] = useState(
    "Convert text between different cases easily. This tool supports multiple case formats including sentence case, title case, lowercase, uppercase, and more."
  );
  const [copied, setCopied] = useState(false);
  const [activeCase, setActiveCase] = useState("sentence");

  const caseTypes = [
    {
      id: "sentence",
      name: "Sentence Case",
      description: "First letter of each sentence capitalized",
    },
    {
      id: "title",
      name: "Title Case",
      description: "First letter of each word capitalized",
    },
    { id: "upper", name: "UPPERCASE", description: "All letters in uppercase" },
    { id: "lower", name: "lowercase", description: "All letters in lowercase" },
    {
      id: "camel",
      name: "camelCase",
      description: "First word lowercase, others capitalized",
    },
    {
      id: "pascal",
      name: "PascalCase",
      description: "First letter of each word capitalized",
    },
    {
      id: "snake",
      name: "snake_case",
      description: "Words separated by underscores",
    },
    {
      id: "kebab",
      name: "kebab-case",
      description: "Words separated by hyphens",
    },
    {
      id: "toggle",
      name: "tOGGLE cASE",
      description: "Toggle between uppercase and lowercase",
    },
    {
      id: "alternating",
      name: "AlTeRnAtInG cAsE",
      description: "Alternate between uppercase and lowercase",
    },
    {
      id: "inverse",
      name: "iNVERSE cASE",
      description: "Invert the current case",
    },
    {
      id: "capitalize",
      name: "Capitalize Words",
      description: "First letter of each word capitalized",
    },
  ];

  const sampleTexts = [
    { name: "Blog Title", text: "how to learn programming in 2024" },
    { name: "Variable Name", text: "user authentication token" },
    { name: "File Name", text: "monthly sales report" },
    { name: "API Endpoint", text: "get user profile data" },
  ];

  const convertCase = (text, caseType) => {
    if (!text.trim()) return text;

    switch (caseType) {
      case "sentence":
        return text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());

      case "title":
        return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

      case "upper":
        return text.toUpperCase();

      case "lower":
        return text.toLowerCase();

      case "camel":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
          .replace(/^./, (c) => c.toLowerCase());

      case "pascal":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
          .replace(/^./, (c) => c.toUpperCase());

      case "snake":
        return text
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_]/g, "");

      case "kebab":
        return text
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "");

      case "toggle":
        return text
          .split("")
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join("");

      case "alternating":
        return text
          .split("")
          .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
          .join("");

      case "inverse":
        return text
          .split("")
          .map((c) =>
            c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
          )
          .join("");

      case "capitalize":
        return text.replace(/\b\w/g, (c) => c.toUpperCase());

      default:
        return text;
    }
  };

  const convertedText = convertCase(text, activeCase);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText("");
  };

  const loadSample = (sample) => {
    setText(sample.text);
  };

  const applyCase = (caseType) => {
    setActiveCase(caseType);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Type className="w-10 h-10 text-indigo-600" />
          Case Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Convert text between different cases instantly. Perfect for
          programming, writing, and formatting.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Input & Case Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Input Text
              </h2>
            </div>

            <div className="p-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter text to convert..."
              />

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                    copied
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                  }`}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy Original"}
                </button>

                <button
                  onClick={clearText}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  Clear Text
                </button>

                <div className="flex-1"></div>

                <div className="text-sm text-gray-600">
                  {text.length.toLocaleString()} characters
                </div>
              </div>
            </div>
          </div>

          {/* Case Selection Grid */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <CaseSensitive className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Case Type
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {caseTypes.map((caseType) => (
                  <button
                    key={caseType.id}
                    onClick={() => applyCase(caseType.id)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      activeCase === caseType.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="font-medium mb-1">{caseType.name}</div>
                    <div
                      className={`text-xs ${
                        activeCase === caseType.id
                          ? "text-indigo-100"
                          : "text-gray-600"
                      }`}
                    >
                      {caseType.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Texts */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Quick Examples
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sampleTexts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadSample(sample)}
                    className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-indigo-600 group-hover:text-indigo-700" />
                      <span className="font-medium text-gray-900">
                        {sample.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {sample.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Convert Button */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <button
                onClick={() => applyCase(activeCase)}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
              >
                <RefreshCw className="w-5 h-5" />
                Convert Text
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                Active: {caseTypes.find((c) => c.id === activeCase)?.name}
              </p>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
            <div className="px-6 py-4 border-b border-green-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Converted Text
              </h2>
            </div>

            <div className="p-6">
              <div className="bg-white/70 rounded-xl p-4 mb-6">
                <div className="text-sm text-gray-600 mb-2">
                  {caseTypes.find((c) => c.id === activeCase)?.name}
                </div>
                <div className="font-mono text-gray-900 whitespace-pre-wrap break-words">
                  {convertedText || "Converted text will appear here..."}
                </div>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(convertedText)}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Converted Text
              </button>
            </div>
          </div>

          {/* Case Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <ArrowUpDown className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Preview
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {[
                  { id: "sentence", label: "Sentence Case" },
                  { id: "upper", label: "UPPERCASE" },
                  { id: "lower", label: "lowercase" },
                  { id: "camel", label: "camelCase" },
                ].map((caseType) => (
                  <div key={caseType.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">
                      {caseType.label}
                    </div>
                    <div className="text-sm font-mono text-gray-900 truncate">
                      {convertCase(text.substring(0, 50), caseType.id)}...
                    </div>
                  </div>
                ))}
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
                  Programming
                </div>
                <div className="text-xs text-gray-600">
                  Variable naming conventions
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Writing</div>
                <div className="text-xs text-gray-600">Title formatting</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">File Names</div>
                <div className="text-xs text-gray-600">Consistent naming</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Databases</div>
                <div className="text-xs text-gray-600">Column names</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <CaseSensitive className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            12+ Case Formats
          </h3>
          <p className="text-gray-600">
            Convert between sentence case, title case, uppercase, lowercase,
            camelCase, PascalCase, snake_case, and more.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Instant Conversion
          </h3>
          <p className="text-gray-600">
            See changes in real-time as you select different case formats. No
            waiting, immediate results.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Copy className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            One-Click Copy
          </h3>
          <p className="text-gray-600">
            Copy converted text instantly with a single click. Perfect for quick
            formatting tasks.
          </p>
        </div>
      </div>

      {/* Case Type Guide */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Case Type Guide
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Writing Cases</h3>
            {caseTypes.slice(0, 4).map((caseType) => (
              <div key={caseType.id} className="bg-white p-4 rounded-xl">
                <div className="font-medium text-gray-900 mb-1">
                  {caseType.name}
                </div>
                <div className="text-sm text-gray-600">
                  {caseType.description}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Programming Cases</h3>
            {caseTypes.slice(4, 8).map((caseType) => (
              <div key={caseType.id} className="bg-white p-4 rounded-xl">
                <div className="font-medium text-gray-900 mb-1">
                  {caseType.name}
                </div>
                <div className="text-sm text-gray-600">
                  {caseType.description}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Special Cases</h3>
            {caseTypes.slice(8).map((caseType) => (
              <div key={caseType.id} className="bg-white p-4 rounded-xl">
                <div className="font-medium text-gray-900 mb-1">
                  {caseType.name}
                </div>
                <div className="text-sm text-gray-600">
                  {caseType.description}
                </div>
              </div>
            ))}
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

export default CaseConverter;
