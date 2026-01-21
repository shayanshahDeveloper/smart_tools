import { useState } from "react";
import { FileText, Copy, RotateCcw, BarChart3, Clock } from "lucide-react";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = {
    words: text.trim()
      ? text
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length
      : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences: text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length,
    paragraphs: text
      .split(/\n\s*\n/)
      .filter((paragraph) => paragraph.trim().length > 0).length,
    readingTime: Math.ceil(
      text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length / 200
    ),
  };

  const clearText = () => {
    setText("");
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const sampleText = `This is a sample text to demonstrate the word counter tool. 
You can type or paste your own text here to get real-time statistics.

The tool counts:
- Words
- Characters (with and without spaces)
- Sentences
- Paragraphs
- Estimated reading time`;

  const loadSample = () => {
    setText(sampleText);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <FileText className="w-10 h-10 text-blue-600" />
          Word Counter
        </h1>
        <p className="text-gray-600 text-lg">
          Count words, characters, sentences, paragraphs, and reading time in
          real-time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Words</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.words}</div>
        </div>

        <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              Characters
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.characters}
          </div>
        </div>

        <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              No Spaces
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.charactersNoSpaces}
          </div>
        </div>

        <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">
              Sentences
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.sentences}
          </div>
        </div>

        <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-600">Paragraphs</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.paragraphs}
          </div>
        </div>

        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">
              Reading Time
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.readingTime} min
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-lg font-medium text-gray-900">
              Enter or paste your text below
            </label>
            <div className="text-sm text-gray-500">
              {stats.characters} characters
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
            autoFocus
          />

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={clearText}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Text
            </button>
            <button
              onClick={copyText}
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy Text
            </button>
            <button
              onClick={loadSample}
              className="inline-flex items-center gap-2 px-5 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-xl transition-colors"
            >
              Load Sample
            </button>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How it Works
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span>Words are counted by splitting text on whitespace</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span>Characters include all letters, numbers, and symbols</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span>Sentences are detected by punctuation marks (. ! ?)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span>Reading time is based on 200 words per minute</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Common Use Cases
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span>Checking essay or article word count</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span>Social media post character limits</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span>Email and document length analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span>Content planning and editing</span>
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
            <div className="text-xs mt-1">Your ad could be here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
