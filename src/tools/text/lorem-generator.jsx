import { useState } from "react";
import {
  FileText,
  Copy,
  Check,
  RefreshCw,
  Hash,
  Type,
  FileCode,
  BookOpen,
  Sparkles,
  Layers,
  Braces,
  Code,
  FileOutput,
} from "lucide-react";

const LoremGenerator = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(5);
  const [words, setWords] = useState(50);
  const [outputType, setOutputType] = useState("paragraphs");
  const [includeHtml, setIncludeHtml] = useState(false);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);

  const loremIpsum = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident.",
    "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    "Accusantium doloremque laudantium, totam rem aperiam.",
    "Eaque ipsa quae ab illo inventore veritatis et quasi architecto.",
    "Beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
    "Aut odit aut fugit, sed quia consequuntur magni dolores.",
    "Eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "Consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
    "Incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
    "Suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
  ];

  const outputTypes = [
    { id: "paragraphs", name: "Paragraphs", icon: FileText },
    { id: "sentences", name: "Sentences", icon: Type },
    { id: "words", name: "Words", icon: Hash },
  ];

  const samplePresets = [
    {
      paragraphs: 1,
      sentences: 3,
      words: 30,
      name: "Short",
      desc: "Quick placeholder",
    },
    {
      paragraphs: 3,
      sentences: 5,
      words: 50,
      name: "Medium",
      desc: "Standard length",
    },
    {
      paragraphs: 5,
      sentences: 8,
      words: 100,
      name: "Long",
      desc: "Detailed content",
    },
    {
      paragraphs: 10,
      sentences: 10,
      words: 200,
      name: "Very Long",
      desc: "Full page",
    },
  ];

  const formatPresets = [
    { name: "Plain Text", html: false, lorem: true },
    { name: "HTML", html: true, lorem: true },
    { name: "No Lorem", html: false, lorem: false },
    { name: "HTML + No Lorem", html: true, lorem: false },
  ];

  const generateLorem = () => {
    let result = "";

    if (outputType === "paragraphs") {
      for (let p = 0; p < paragraphs; p++) {
        if (includeHtml) result += "<p>";
        if (startWithLorem || p > 0) {
          result += loremIpsum[0];
        }
        for (let s = 1; s < sentences; s++) {
          result += " " + loremIpsum[s % loremIpsum.length];
        }
        if (includeHtml) result += "</p>\n";
        else result += "\n\n";
      }
    } else if (outputType === "sentences") {
      for (let s = 0; s < sentences; s++) {
        if (startWithLorem || s > 0) {
          result += loremIpsum[s % loremIpsum.length];
        }
        if (s < sentences - 1) result += " ";
      }
    } else if (outputType === "words") {
      const allWords = loremIpsum.join(" ").split(" ");
      for (let w = 0; w < words; w++) {
        result += allWords[w % allWords.length];
        if (w < words - 1) result += " ";
      }
    }

    setGeneratedText(result.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset) => {
    setParagraphs(preset.paragraphs);
    setSentences(preset.sentences);
    setWords(preset.words);
  };

  const applyFormat = (format) => {
    setIncludeHtml(format.html);
    setStartWithLorem(format.lorem);
  };

  const clearOutput = () => {
    setGeneratedText("");
  };

  // Initialize on component mount
  useState(() => {
    generateLorem();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <FileText className="w-10 h-10 text-indigo-600" />
          Lorem Ipsum Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Generate placeholder text for your designs, websites, and documents.
          Customize length and format.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Output Type Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Output Type
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-6">
                {outputTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setOutputType(type.id)}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
                      outputType === type.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <type.icon className="w-6 h-6 mb-2" />
                    <span className="font-medium">{type.name}</span>
                  </button>
                ))}
              </div>

              {/* Sliders based on output type */}
              <div className="space-y-6">
                {outputType === "paragraphs" && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Number of Paragraphs
                      </label>
                      <span className="text-sm font-medium text-indigo-600">
                        {paragraphs}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={paragraphs}
                      onChange={(e) => setParagraphs(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    />
                  </div>
                )}

                {outputType === "sentences" && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Number of Sentences
                      </label>
                      <span className="text-sm font-medium text-indigo-600">
                        {sentences}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={sentences}
                      onChange={(e) => setSentences(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    />
                  </div>
                )}

                {outputType === "words" && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Number of Words
                      </label>
                      <span className="text-sm font-medium text-indigo-600">
                        {words}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      value={words}
                      onChange={(e) => setWords(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Format Options */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Format Options
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="includeHtml"
                    checked={includeHtml}
                    onChange={() => setIncludeHtml(!includeHtml)}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                  <label
                    htmlFor="includeHtml"
                    className="font-medium text-gray-900"
                  >
                    Include HTML Tags
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="startWithLorem"
                    checked={startWithLorem}
                    onChange={() => setStartWithLorem(!startWithLorem)}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                  <label
                    htmlFor="startWithLorem"
                    className="font-medium text-gray-900"
                  >
                    Start with "Lorem ipsum"
                  </label>
                </div>
              </div>

              {/* Quick Format Presets */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Quick Format Presets
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formatPresets.map((format, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyFormat(format)}
                      className={`p-3 border rounded-lg text-left ${
                        includeHtml === format.html &&
                        startWithLorem === format.lorem
                          ? "border-indigo-300 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900 mb-1">
                        {format.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        HTML: {format.html ? "Yes" : "No"} • Lorem:{" "}
                        {format.lorem ? "Yes" : "No"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Quick Presets
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(preset)}
                    className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900 mb-2">
                      {preset.name}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {preset.paragraphs} paragraphs
                    </div>
                    <div className="text-xs text-gray-500">{preset.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Generate Button */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <button
                onClick={generateLorem}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
              >
                <RefreshCw className="w-5 h-5" />
                Generate Lorem Ipsum
              </button>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={copyToClipboard}
                  className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
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
                  {copied ? "Copied!" : "Copy Text"}
                </button>

                <button
                  onClick={clearOutput}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
            <div className="px-6 py-4 border-b border-green-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Generated Text
                </h2>
                <div className="text-sm text-gray-600">
                  {generatedText.split(/\s+/).length} words
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-white/70 rounded-xl p-4 mb-6">
                <div className="text-sm text-gray-600 mb-3">
                  {outputTypes.find((t) => t.id === outputType)?.name} •
                  {includeHtml && " HTML"} •
                  {startWithLorem ? " With Lorem" : " No Lorem"}
                </div>
                <div className="font-mono text-sm text-gray-900 whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {generatedText || "Generated text will appear here..."}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Characters</div>
                  <div className="font-bold text-gray-900">
                    {generatedText.length.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Words</div>
                  <div className="font-bold text-gray-900">
                    {generatedText
                      .split(/\s+/)
                      .filter((w) => w.length > 0)
                      .length.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Paragraphs</div>
                  <div className="font-bold text-gray-900">
                    {(generatedText.match(/\n\n/g) || []).length + 1}
                  </div>
                </div>
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
                <div className="font-medium text-gray-900 mb-1">Web Design</div>
                <div className="text-xs text-gray-600">Placeholder text</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Printing</div>
                <div className="text-xs text-gray-600">Type specimens</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Layout Testing
                </div>
                <div className="text-xs text-gray-600">Content preview</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Presentations
                </div>
                <div className="text-xs text-gray-600">Mock content</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Current Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Output Type</span>
                  <span className="font-medium text-indigo-600">
                    {outputTypes.find((t) => t.id === outputType)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">HTML Tags</span>
                  <span className="font-medium text-gray-900">
                    {includeHtml ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Start with Lorem</span>
                  <span className="font-medium text-gray-900">
                    {startWithLorem ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Length</span>
                  <span className="font-medium text-gray-900">
                    {outputType === "paragraphs" && `${paragraphs} paragraphs`}
                    {outputType === "sentences" && `${sentences} sentences`}
                    {outputType === "words" && `${words} words`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <FileCode className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Formats
          </h3>
          <p className="text-gray-600">
            Generate paragraphs, sentences, or words. Include HTML tags for web
            development or plain text.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Braces className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            HTML Ready
          </h3>
          <p className="text-gray-600">
            Option to include paragraph tags for immediate use in websites and
            applications.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <FileOutput className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Quick Presets
          </h3>
          <p className="text-gray-600">
            Use predefined lengths for common scenarios like short snippets or
            full pages.
          </p>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          About Lorem Ipsum
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Origin</h3>
            <p className="text-gray-700 mb-4">
              Lorem Ipsum is dummy text used by the printing and typesetting
              industry since the 1500s. It has survived not only five centuries,
              but also the leap into electronic typesetting.
            </p>
            <p className="text-gray-700">
              The text is derived from Cicero's "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) written in 45 BC, though the words
              have been altered and scrambled.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Modern Usage</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Web design and development placeholder text</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Printing and graphic design type specimens</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Layout and visual mockups</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Testing fonts and typography</span>
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

export default LoremGenerator;
