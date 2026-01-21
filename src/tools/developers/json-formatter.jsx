import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Code,
  Copy,
  Check,
  AlertTriangle,
  Braces,
  Download,
  Upload,
} from "lucide-react";

const JSONFormatter = () => {
  const [input, setInput] = useState(`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "gaming", "coding"]
}`);

  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indentation, setIndentation] = useState(2);

  const formatJSON = () => {
    try {
      if (!input.trim()) {
        setIsValid(false);
        setError("Please enter JSON data");
        toast.error("Please enter JSON data");
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentation);

      setOutput(formatted);
      setIsValid(true);
      setError("");
      toast.success("JSON formatted successfully!");
    } catch (err) {
      setIsValid(false);
      setError(err.message);
      setOutput("");
      toast.error(`Formatting failed: ${err.message}`);
    }
  };

  const minifyJSON = () => {
    try {
      if (!input.trim()) {
        setIsValid(false);
        setError("Please enter JSON data");
        toast.error("Please enter JSON data");
        return;
      }

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      setOutput(minified);
      setIsValid(true);
      setError("");
      toast.success("JSON minified successfully!");
    } catch (err) {
      setIsValid(false);
      setError(err.message);
      setOutput("");
      toast.error(`Minification failed: ${err.message}`);
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
      toast.success("JSON is valid!");
    } catch (err) {
      setIsValid(false);
      setError(err.message);
      toast.error(`❌ Invalid JSON: ${err.message}`);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.warning("No content to copy");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(true);
    toast.info("All fields cleared");
  };

  const loadSample = () => {
    setInput(`{
  "employees": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "position": "Software Engineer",
      "department": "Development",
      "skills": ["JavaScript", "React", "Node.js"],
      "contact": {
        "email": "alice@company.com",
        "phone": "+1-555-1234"
      }
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "position": "Product Manager",
      "department": "Product",
      "skills": ["Agile", "Scrum", "Product Strategy"],
      "contact": {
        "email": "bob@company.com",
        "phone": "+1-555-5678"
      }
    }
  ],
  "company": {
    "name": "TechCorp Inc.",
    "location": "San Francisco",
    "founded": 2015
  }
}`);
    toast.info("Sample JSON loaded");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Braces className="w-10 h-10 text-blue-600" />
          JSON Formatter & Validator
        </h1>
        <p className="text-gray-600 text-lg">
          Format, validate, and minify JSON data. Make your JSON readable and
          error-free.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Input JSON
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={loadSample}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Load Sample
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-96 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Paste your JSON data here..."
                spellCheck="false"
              />

              {!isValid && error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">Invalid JSON</span>
                  </div>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={formatJSON}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <Code className="w-6 h-6 mb-2" />
              <span className="font-medium">Format</span>
            </button>

            <button
              onClick={minifyJSON}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <Code className="w-6 h-6 mb-2" />
              <span className="font-medium">Minify</span>
            </button>

            <button
              onClick={validateJSON}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <Check className="w-6 h-6 mb-2" />
              <span className="font-medium">Validate</span>
            </button>

            <button
              onClick={copyToClipboard}
              disabled={!output}
              className={`flex flex-col items-center justify-center p-4 rounded-xl hover:shadow-lg transition-shadow ${
                output
                  ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {copied ? (
                <Check className="w-6 h-6 mb-2" />
              ) : (
                <Copy className="w-6 h-6 mb-2" />
              )}
              <span className="font-medium">{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Formatted JSON
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Indent:</span>
                    <select
                      value={indentation}
                      onChange={(e) => setIndentation(parseInt(e.target.value))}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                      <option value={1}>1 space</option>
                      <option value={0}>No indent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <pre className="w-full h-96 overflow-auto font-mono text-sm p-4 bg-gray-50 border border-gray-300 rounded-lg">
                {output || "Formatted JSON will appear here..."}
              </pre>

              {output && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">
                        JSON formatted successfully
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {output.length} characters
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* JSON Info */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              JSON Formatting Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Use 2-4 spaces for indentation (industry standard)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Always use double quotes for keys and string values</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Trailing commas are not allowed in JSON</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>JSON is case-sensitive</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Real-time Validation
          </h3>
          <p className="text-gray-600">
            Instantly validate JSON syntax and get detailed error messages with
            line numbers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Smart Formatting
          </h3>
          <p className="text-gray-600">
            Choose between different indentation levels and formatting styles
            for readability.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Copy className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Easy Copy & Download
          </h3>
          <p className="text-gray-600">
            Copy formatted JSON to clipboard with one click. No installation
            required.
          </p>
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

export default JSONFormatter;
