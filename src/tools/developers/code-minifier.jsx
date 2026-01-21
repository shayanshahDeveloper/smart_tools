import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Minimize2,
  Copy,
  Check,
  Code,
  FileCode,
  Palette,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

const CodeMinifier = () => {
  const [input, setInput] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        
        p {
            line-height: 1.6;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>This is a sample HTML page with CSS and JavaScript.</p>
        <button id="clickMe">Click Me!</button>
    </div>
    
    <script>
        document.getElementById('clickMe').addEventListener('click', function() {
            alert('Button clicked!');
        });
    </script>
</body>
</html>`);

  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("html");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    original: 0,
    minified: 0,
    reduction: 0,
  });

  const languages = [
    { id: "html", name: "HTML", icon: FileCode },
    { id: "css", name: "CSS", icon: Palette },
    { id: "js", name: "JavaScript", icon: Code },
  ];

  const minifyCode = () => {
    if (!input.trim()) {
      toast.error("Please enter code to minify");
      return;
    }

    let minified = input;

    // Basic minification (for demo purposes)
    if (language === "html") {
      minified = input
        .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/>\s+</g, "><") // Remove spaces between tags
        .trim();
    } else if (language === "css") {
      minified = input
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
        .replace(/\s+/g, " ") // Replace multiple spaces
        .replace(/\s*{\s*/g, "{")
        .replace(/\s*}\s*/g, "}")
        .replace(/\s*;\s*/g, ";")
        .replace(/\s*:\s*/g, ":")
        .replace(/,\s*/g, ",")
        .trim();
    } else if (language === "js") {
      minified = input
        .replace(/\/\/.*$/gm, "") // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
        .replace(/\s+/g, " ") // Replace multiple spaces
        .replace(/\s*{\s*/g, "{")
        .replace(/\s*}\s*/g, "}")
        .replace(/\s*;\s*/g, ";")
        .replace(/\s*=\s*/g, "=")
        .replace(/\s*\+\s*/g, "+")
        .replace(/\s*-\s*/g, "-")
        .replace(/\s*\*\s*/g, "*")
        .replace(/\s*\/\s*/g, "/")
        .trim();
    }

    setOutput(minified);

    const originalSize = input.length;
    const minifiedSize = minified.length;
    const reduction =
      originalSize > 0
        ? (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1)
        : 0;

    setStats({
      original: originalSize,
      minified: minifiedSize,
      reduction: parseFloat(reduction),
    });

    if (reduction > 0) {
      toast.success(`Code minified! Size reduced by ${reduction}%`);
    } else if (reduction === 0 && originalSize > 0) {
      toast.info("Code processed (no size reduction)");
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied minified code to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.warning("No minified code to copy");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setStats({ original: 0, minified: 0, reduction: 0 });
    toast.info("All fields cleared");
  };

  const loadSample = (lang) => {
    setLanguage(lang);

    const samples = {
      html: `<!DOCTYPE html>
<html>
<head>
    <title>Sample Page</title>
    <style>
        /* This is a CSS comment */
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial;
        }
    </style>
</head>
<body>
    <h1>Hello World</h1>
    <!-- This is an HTML comment -->
    <p>Welcome to our website.</p>
</body>
</html>`,
      css: `/* Reset CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Navigation Styles */
.nav {
    background-color: #333;
    padding: 1rem;
}

.nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
}

.nav a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
}

.nav a:hover {
    color: #ff6b6b;
}`,
      js: `// This is a JavaScript function
function calculateSum(a, b) {
    // Return the sum of two numbers
    return a + b;
}

// Event listener for button click
document.getElementById('myButton').addEventListener('click', function() {
    console.log('Button was clicked!');
    
    // Calculate and display result
    const result = calculateSum(5, 10);
    alert('The sum is: ' + result);
});`,
    };

    setInput(samples[lang]);
    toast.info(`Loaded ${lang.toUpperCase()} sample code`);
  };

  const LanguageIcon = languages.find((l) => l.id === language)?.icon || Code;

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
          <Minimize2 className="w-10 h-10 text-blue-600" />
          Code Minifier
        </h1>
        <p className="text-gray-600 text-lg">
          Minify HTML, CSS, and JavaScript code to reduce file size and improve
          loading times.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Input Code
                  </h2>
                  <div className="flex items-center gap-2">
                    <LanguageIcon className="w-5 h-5 text-gray-600" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                    >
                      {languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadSample(language)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Sample
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-96 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={`Paste your ${language.toUpperCase()} code here...`}
                spellCheck="false"
              />

              <div className="mt-4 text-sm text-gray-600">
                {input.length} characters
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={minifyCode}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              <Minimize2 className="w-5 h-5" />
              Minify Code
            </button>

            <button
              onClick={copyToClipboard}
              disabled={!output}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-shadow ${
                output
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={clearAll}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Minified Code
                </h2>
                <div className="text-sm text-gray-600">
                  Reduction:{" "}
                  {stats.reduction > 0 ? `${stats.reduction}%` : "0%"}
                </div>
              </div>
            </div>

            <div className="p-6">
              <pre className="w-full h-96 overflow-auto font-mono text-sm p-4 bg-gray-50 border border-gray-300 rounded-lg whitespace-pre-wrap">
                {output || "Minified code will appear here..."}
              </pre>

              {output && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">
                        Code minified successfully
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {stats.minified} characters (was {stats.original})
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {stats.original}
              </div>
              <div className="text-sm text-gray-600">Original Size</div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {stats.minified}
              </div>
              <div className="text-sm text-gray-600">Minified Size</div>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                stats.reduction > 0
                  ? "bg-red-50 border-red-100"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <div
                className={`text-2xl font-bold mb-1 ${
                  stats.reduction > 0 ? "text-red-600" : "text-gray-600"
                }`}
              >
                {stats.reduction}%
              </div>
              <div className="text-sm text-gray-600">Size Reduction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Why Minify Your Code?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Minimize2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Smaller File Size
            </h3>
            <p className="text-gray-600">
              Reduce your code size by up to 70% by removing whitespace,
              comments, and unnecessary characters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Faster Loading
            </h3>
            <p className="text-gray-600">
              Smaller files load faster, improving your website's performance
              and user experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FileCode className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Better SEO
            </h3>
            <p className="text-gray-600">
              Faster loading websites rank higher in search engines like Google.
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-8 mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Important Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Do's</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Always keep a non-minified version for development</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Test minified code thoroughly before deploying</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Use source maps for debugging minified code</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Don'ts</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                <span>Don't minify code during development</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                <span>Avoid minifying already minified code</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                <span>Don't rely solely on minification for security</span>
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

export default CodeMinifier;
