import { useState, useEffect } from "react";
import {
  FileText,
  Hash,
  Clock,
  Type,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  BarChart3,
  TrendingUp,
  BookOpen,
} from "lucide-react";

const TextCounter = () => {
  const [text, setText] = useState(
    "Welcome to our text analysis tool! This powerful utility helps you count characters, words, sentences, and paragraphs in your text. Simply paste or type your content below to get real-time statistics.\n\nYou can use this for:\n• Social media posts\n• Academic papers\n• Blog articles\n• Business documents"
  );
  const [includeSpaces, setIncludeSpaces] = useState(true);
  const [includePunctuation, setIncludePunctuation] = useState(true);

  // Calculate statistics
  const calculateStats = () => {
    if (!text.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
        longestWord: "",
        wordFrequency: {},
      };
    }

    // Basic calculations
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const sentences = text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length;
    const paragraphs = text
      .split(/\n+/)
      .filter((para) => para.trim().length > 0).length;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    // Speaking time (average 130 words per minute)
    const speakingTime = Math.ceil(words / 130);

    // Find longest word
    const wordsArray = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);
    const longestWord = wordsArray.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      ""
    );

    // Word frequency
    const wordFrequency = {};
    wordsArray.forEach((word) => {
      if (word.length > 0) {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });

    return {
      characters: includeSpaces ? characters : charactersNoSpaces,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      longestWord,
      wordFrequency,
    };
  };

  const stats = calculateStats();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText("");
  };

  const sampleTexts = [
    {
      name: "Blog Post",
      text: "Digital marketing has revolutionized how businesses connect with their audience. With the rise of social media and content platforms, brands now have unprecedented opportunities to engage directly with consumers.\n\nEffective marketing strategies combine data analytics with creative storytelling to deliver personalized experiences that resonate with target demographics.",
    },
    {
      name: "Social Media",
      text: "Excited to announce our new product launch! 🎉\n\nAfter months of development, we're proud to introduce the next generation of productivity tools.\n\n#productivity #tech #innovation",
    },
    {
      name: "Academic",
      text: "The study examines the correlation between digital literacy and economic mobility in developing regions. Methodology includes surveys and statistical analysis of 500 participants across three countries.\n\nResults indicate a strong positive relationship, suggesting policy interventions should focus on digital education initiatives.",
    },
    {
      name: "Business",
      text: "Q4 financial report shows 15% revenue growth year-over-year. Key drivers include new market expansion and product diversification.\n\nStrategic priorities for next quarter:\n1. Enhance customer experience\n2. Optimize operational efficiency\n3. Explore strategic partnerships",
    },
  ];

  const loadSample = (sample) => {
    setText(sample.text);
  };

  // Get top 5 most frequent words
  const topWords = Object.entries(stats.wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <FileText className="w-10 h-10 text-indigo-600" />
          Text Counter & Analyzer
        </h1>
        <p className="text-gray-600 text-lg">
          Analyze text with detailed statistics including character count, word
          count, reading time, and more.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Text Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Text Input Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Enter Your Text
              </h2>
            </div>

            <div className="p-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Paste or type your text here..."
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
                  {copied ? "Copied!" : "Copy Text"}
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

              {/* Options */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="includeSpaces"
                    checked={includeSpaces}
                    onChange={() => setIncludeSpaces(!includeSpaces)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <label
                    htmlFor="includeSpaces"
                    className="font-medium text-gray-900"
                  >
                    Include spaces in character count
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="includePunctuation"
                    checked={includePunctuation}
                    onChange={() => setIncludePunctuation(!includePunctuation)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <label
                    htmlFor="includePunctuation"
                    className="font-medium text-gray-900"
                  >
                    Include punctuation in word count
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Texts */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Sample Texts
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sampleTexts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadSample(sample)}
                    className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900 mb-2">
                      {sample.name}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {sample.text.substring(0, 60)}...
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Word Frequency */}
          {topWords.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Word Frequency Analysis
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {topWords.map(([word, count], idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-indigo-600">
                            {idx + 1}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 capitalize">
                            {word}
                          </div>
                          <div className="text-sm text-gray-600">
                            {count} occurrence{count !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          style={{
                            width: `${
                              (count / Math.max(...topWords.map((w) => w[1]))) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Statistics */}
        <div className="space-y-6">
          {/* Statistics Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
            <div className="px-6 py-4 border-b border-green-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Text Statistics
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Type className="w-4 h-4 text-indigo-600" />
                      <div className="text-sm text-gray-600">Characters</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.characters.toLocaleString()}
                    </div>
                    {!includeSpaces && (
                      <div className="text-xs text-gray-500 mt-1">
                        ({stats.charactersNoSpaces.toLocaleString()} without
                        spaces)
                      </div>
                    )}
                  </div>

                  <div className="bg-white/70 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-indigo-600" />
                      <div className="text-sm text-gray-600">Words</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.words.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <div className="text-sm text-gray-600">Sentences</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.sentences.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-white/70 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <div className="text-sm text-gray-600">Paragraphs</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.paragraphs.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-green-600" />
                    <div className="text-sm text-gray-600">Reading Time</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {stats.readingTime} min
                      </div>
                      <div className="text-xs text-gray-600">
                        Reading (200 wpm)
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {stats.speakingTime} min
                      </div>
                      <div className="text-xs text-gray-600">
                        Speaking (130 wpm)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Longest Word */}
                <div className="bg-white/70 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <div className="text-sm text-gray-600">Longest Word</div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {stats.longestWord || "N/A"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {stats.longestWord?.length || 0} characters
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Recommendations
            </h3>
            <ul className="space-y-3">
              {stats.words < 50 && (
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                  <span className="text-sm text-gray-700">
                    Consider adding more content for better engagement
                  </span>
                </li>
              )}
              {stats.words > 1000 && (
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  <span className="text-sm text-gray-700">
                    Excellent length for detailed content
                  </span>
                </li>
              )}
              {stats.paragraphs < 3 && stats.words > 200 && (
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm text-gray-700">
                    Consider breaking into more paragraphs for readability
                  </span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                <span className="text-sm text-gray-700">
                  Average sentence length:{" "}
                  {(stats.words / Math.max(stats.sentences, 1)).toFixed(1)}{" "}
                  words
                </span>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Perfect For
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Social Media
                </div>
                <div className="text-xs text-gray-600">
                  Twitter, LinkedIn posts
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Academic Papers
                </div>
                <div className="text-xs text-gray-600">Word count tracking</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  SEO Content
                </div>
                <div className="text-xs text-gray-600">
                  Blog posts, articles
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Business Docs
                </div>
                <div className="text-xs text-gray-600">Reports, proposals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Comprehensive Analysis
          </h3>
          <p className="text-gray-600">
            Get detailed statistics including character count, word count,
            sentence count, paragraphs, and reading time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Word Frequency
          </h3>
          <p className="text-gray-600">
            Identify most common words and analyze text composition with visual
            frequency charts.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Time Estimates
          </h3>
          <p className="text-gray-600">
            Calculate reading and speaking times to optimize content length for
            different platforms.
          </p>
        </div>
      </div>

      {/* Platform Limits */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Platform Character Limits
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-lg font-bold text-gray-900 mb-2">Twitter</div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">280</div>
            <div className="text-sm text-gray-600">Characters per tweet</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-lg font-bold text-gray-900 mb-2">LinkedIn</div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">3,000</div>
            <div className="text-sm text-gray-600">Characters per post</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-lg font-bold text-gray-900 mb-2">Facebook</div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              63,206
            </div>
            <div className="text-sm text-gray-600">Characters per post</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-lg font-bold text-gray-900 mb-2">
              Instagram
            </div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">2,200</div>
            <div className="text-sm text-gray-600">Characters per caption</div>
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

export default TextCounter;
