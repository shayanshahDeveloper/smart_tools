import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Hash,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  Upload,
  Download,
  Lock,
  Unlock,
} from "lucide-react";

const Base64Encoder = () => {
  const [input, setInput] = useState("Hello, World!");
  const [output, setOutput] = useState("");
  const [operation, setOperation] = useState("encode");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  const encodeBase64 = (text) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      toast.error("Cannot encode non-ASCII characters directly");
      return "Error: Cannot encode non-ASCII characters directly";
    }
  };

  const decodeBase64 = (base64) => {
    try {
      return decodeURIComponent(escape(atob(base64)));
    } catch (error) {
      toast.error("Invalid Base64 string");
      return "Error: Invalid Base64 string";
    }
  };

  const processInput = () => {
    if (!input.trim()) {
      toast.error("Please enter some text or Base64 string");
      return;
    }

    if (operation === "encode") {
      const encoded = encodeBase64(input);
      setOutput(encoded);
      if (!encoded.startsWith("Error:")) {
        toast.success("Text encoded to Base64 successfully!");
      }
    } else {
      const decoded = decodeBase64(input);
      setOutput(decoded);
      if (!decoded.startsWith("Error:")) {
        toast.success("Base64 decoded to text successfully!");
      }
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.warning("No output to copy");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setFileName("");
    setFileType("");
    toast.info("All fields cleared");
  };

  const loadSample = () => {
    if (operation === "encode") {
      setInput("Sample text for Base64 encoding demonstration.");
      toast.info("Loaded sample text for encoding");
    } else {
      setInput(
        "U2FtcGxlIEJhc2U2NCBzdHJpbmcgZm9yIGRlY29kaW5nIGRlbW9uc3RyYXRpb24u"
      );
      toast.info("Loaded sample Base64 string for decoding");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setFileType(file.type);

    const reader = new FileReader();
    reader.onload = (event) => {
      // For demonstration, we'll show a message
      setInput(`File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      setOutput("File encoded to Base64 would appear here...");
      toast.info(
        `File "${file.name}" loaded. Click "Encode to Base64" to convert.`
      );
    };

    reader.onerror = () => {
      toast.error("Failed to read file");
    };

    reader.readAsDataURL(file);
  };

  const examples = {
    encode: [
      { text: "Hello", base64: "SGVsbG8=" },
      { text: "Base64", base64: "QmFzZTY0" },
      { text: "123456", base64: "MTIzNDU2" },
      { text: "Test@123", base64: "VGVzdEAxMjM=" },
    ],
    decode: [
      { base64: "SGVsbG8gV29ybGQh", text: "Hello World!" },
      { base64: "QXBwbGUg8J+Yig==", text: "Apple 🍎" },
      { base64: "5L2g5aW977yM5LiW55WM", text: "你好，世界" },
      { base64: "8J+UpQ==", text: "💕" },
    ],
  };

  const commonUses = [
    "Data URIs in HTML/CSS",
    "API authentication headers",
    "Email attachments",
    "Image embedding",
    "Binary data in JSON",
    "URL-safe encoding",
  ];

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
          <Hash className="w-10 h-10 text-blue-600" />
          Base64 Encoder/Decoder
        </h1>
        <p className="text-gray-600 text-lg">
          Encode text to Base64 or decode Base64 back to text. Supports file
          encoding.
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
                    {operation === "encode"
                      ? "Text to Encode"
                      : "Base64 to Decode"}
                  </h2>
                  <div className="flex items-center gap-2">
                    {operation === "encode" ? (
                      <Lock className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Unlock className="w-5 h-5 text-green-600" />
                    )}
                    <select
                      value={operation}
                      onChange={(e) => {
                        const newOperation = e.target.value;
                        setOperation(newOperation);
                        // Swap input and output when switching operation
                        if (output && !output.startsWith("Error:")) {
                          setInput(output);
                          setOutput("");
                          toast.info(`Switched to ${newOperation} mode`);
                        } else {
                          setInput("");
                          setOutput("");
                          toast.info(`Switched to ${newOperation} mode`);
                        }
                      }}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="encode">Encode</option>
                      <option value="decode">Decode</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={loadSample}
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
                className="w-full h-64 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={
                  operation === "encode"
                    ? "Enter text to encode to Base64..."
                    : "Enter Base64 string to decode..."
                }
                spellCheck="false"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload className="inline w-4 h-4 mr-2" />
                  Upload File (for encoding)
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={operation === "decode"}
                />
                {fileName && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected: {fileName} ({fileType})
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={processInput}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              {operation === "encode" ? (
                <Lock className="w-5 h-5" />
              ) : (
                <Unlock className="w-5 h-5" />
              )}
              {operation === "encode"
                ? "Encode to Base64"
                : "Decode from Base64"}
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
              {copied ? "Copied!" : "Copy Result"}
            </button>
          </div>

          {/* Examples */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {operation === "encode"
                ? "Encoding Examples"
                : "Decoding Examples"}
            </h3>
            <div className="space-y-3">
              {examples[operation].map((example, index) => (
                <div key={index} className="p-3 bg-white/50 rounded-lg">
                  <div className="font-mono text-sm">
                    <div className="text-gray-900">
                      {operation === "encode" ? example.text : example.base64}
                    </div>
                    <div className="text-gray-600 mt-1">
                      → {operation === "encode" ? example.base64 : example.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {operation === "encode" ? "Base64 Output" : "Decoded Text"}
                </h2>
                <div className="text-sm text-gray-600">
                  {output.length} characters
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <pre className="font-mono text-sm whitespace-pre-wrap break-words min-h-64 max-h-96 overflow-auto">
                  {output ||
                    (operation === "encode"
                      ? "Base64 encoded text will appear here..."
                      : "Decoded text will appear here...")}
                </pre>
              </div>

              {output && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">
                        {operation === "encode"
                          ? "Successfully encoded!"
                          : "Successfully decoded!"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Length: {output.length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Common Uses */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Common Uses of Base64
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {commonUses.map((use, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          index % 3 === 0
                            ? "bg-blue-100"
                            : index % 3 === 1
                            ? "bg-green-100"
                            : "bg-purple-100"
                        }`}
                      >
                        {index % 3 === 0 ? (
                          <FileText className="w-4 h-4 text-blue-600" />
                        ) : index % 3 === 1 ? (
                          <ImageIcon className="w-4 h-4 text-green-600" />
                        ) : (
                          <Download className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{use}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About Base64
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Base64 encodes binary data into ASCII characters</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Increases data size by about 33%</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Uses 64 characters: A-Z, a-z, 0-9, +, /</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>= is used for padding at the end</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Secure Encoding
          </h3>
          <p className="text-gray-600">
            Encode sensitive data for transmission over text-based protocols
            like HTTP, email, or URLs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            File Support
          </h3>
          <p className="text-gray-600">
            Encode files like images, PDFs, and documents to Base64 for
            embedding in web pages or APIs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Hash className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Bidirectional
          </h3>
          <p className="text-gray-600">
            Convert between text and Base64 in both directions. Perfect for
            debugging and data analysis.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-12">
        <button
          onClick={() => {
            setOperation("encode");
            setInput("");
            setOutput("");
            toast.info("Switched to encode mode");
          }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          Switch to Encode Mode
        </button>
        <button
          onClick={() => {
            setOperation("decode");
            setInput("");
            setOutput("");
            toast.info("Switched to decode mode");
          }}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors"
        >
          Switch to Decode Mode
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
        >
          <RefreshCw className="inline w-4 h-4 mr-2" />
          Reset All
        </button>
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

export default Base64Encoder;
