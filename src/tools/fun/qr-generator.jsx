import { useState, useEffect } from "react";
import {
  QrCode,
  Download,
  Copy,
  Check,
  RefreshCw,
  Link,
  FileText,
  Image as ImageIcon,
  Settings,
  Sparkles,
  Eye,
  Share2,
  Smartphone,
  Globe,
  Tag,
  Zap,
} from "lucide-react";

const QRGenerator = () => {
  const [qrContent, setQrContent] = useState("https://example.com");
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [includeMargin, setIncludeMargin] = useState(true);
  const [qrType, setQrType] = useState("url");
  const [errorLevel, setErrorLevel] = useState("M");
  const [logoSize, setLogoSize] = useState(50);
  const [generatedQR, setGeneratedQR] = useState(null);
  const [copied, setCopied] = useState(false);

  // Sample content types
  const contentTypes = [
    {
      id: "url",
      name: "Website URL",
      icon: Globe,
      placeholder: "https://example.com",
    },
    {
      id: "text",
      name: "Plain Text",
      icon: FileText,
      placeholder: "Enter text here...",
    },
    { id: "email", name: "Email", icon: Tag, placeholder: "email@example.com" },
    {
      id: "phone",
      name: "Phone",
      icon: Smartphone,
      placeholder: "+1234567890",
    },
  ];

  const errorLevels = [
    { id: "L", name: "Low (7%)", desc: "Small size, less reliable" },
    { id: "M", name: "Medium (15%)", desc: "Good balance" },
    { id: "Q", name: "Quartile (25%)", desc: "High reliability" },
    { id: "H", name: "High (30%)", desc: "Maximum reliability" },
  ];

  const presetContents = [
    { text: "https://github.com", label: "GitHub", type: "url" },
    { text: "https://twitter.com", label: "Twitter", type: "url" },
    {
      text: "WIFI:S:MyNetwork;T:WPA;P:MyPassword;;",
      label: "WiFi",
      type: "text",
    },
    { text: "mailto:hello@example.com", label: "Email", type: "email" },
  ];

  const sizePresets = [
    { size: 128, label: "Small" },
    { size: 256, label: "Medium" },
    { size: 384, label: "Large" },
    { size: 512, label: "Extra Large" },
  ];

  const generateQRCode = () => {
    if (!qrContent.trim()) {
      alert("Please enter content for the QR code");
      return;
    }

    // In a real app, this would generate actual QR code
    // For demo, we'll create a mock QR code
    const qrData = {
      id: Date.now(),
      content: qrContent,
      size: qrSize,
      color: qrColor,
      bgColor: bgColor,
      type: qrType,
      errorLevel,
      includeMargin,
      generatedAt: new Date().toLocaleTimeString(),
      downloadUrl: `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrContent
      )}&color=${qrColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}`,
    };

    setGeneratedQR(qrData);
  };

  const downloadQR = () => {
    if (!generatedQR) return;

    alert(`Downloading QR code as PNG...`);
    // In real app: trigger actual download
  };

  const copyQRCode = () => {
    if (!generatedQR) return;

    navigator.clipboard.writeText(generatedQR.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareQRCode = () => {
    if (!generatedQR) return;

    if (navigator.share) {
      navigator.share({
        title: "QR Code",
        text: "Check out this QR code I generated!",
        url: generatedQR.downloadUrl,
      });
    } else {
      copyQRCode();
    }
  };

  const applyPreset = (preset) => {
    setQrContent(preset.text);
    setQrType(preset.type);
  };

  const clearAll = () => {
    setQrContent("");
    setGeneratedQR(null);
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Icon */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <QrCode className="w-10 h-10 text-indigo-600" />
          QR Code Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Create customizable QR codes for URLs, text, emails, and more.
          Download in high quality.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Inputs & Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Input Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                QR Code Content
              </h2>
            </div>

            <div className="p-6">
              {/* Content Type Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setQrType(type.id)}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
                      qrType === type.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <type.icon className="w-5 h-5 mb-2" />
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                ))}
              </div>

              {/* Content Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {contentTypes.find((t) => t.id === qrType)?.name}
                </label>
                <textarea
                  value={qrContent}
                  onChange={(e) => setQrContent(e.target.value)}
                  placeholder={
                    contentTypes.find((t) => t.id === qrType)?.placeholder
                  }
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {qrContent.length}/500 characters
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Quick Presets
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {presetContents.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyPreset(preset)}
                      className="p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left"
                    >
                      <div className="font-medium text-gray-900 mb-1">
                        {preset.label}
                      </div>
                      <div className="text-xs text-gray-600 truncate">
                        {preset.text.substring(0, 20)}...
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  QR Code Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              {/* Size Settings */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <span className="text-sm font-medium text-indigo-600">
                    {qrSize}×{qrSize} px
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {sizePresets.map((preset) => (
                    <button
                      key={preset.size}
                      onClick={() => setQrSize(preset.size)}
                      className={`py-3 rounded-lg font-medium ${
                        qrSize === preset.size
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {preset.label} ({preset.size}px)
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="100"
                  max="1000"
                  value={qrSize}
                  onChange={(e) => setQrSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                />
              </div>

              {/* Color Settings */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    QR Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="text-gray-900 font-medium mb-1">
                        {qrColor}
                      </div>
                      <div className="text-sm text-gray-600">
                        Click to change color
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="text-gray-900 font-medium mb-1">
                        {bgColor}
                      </div>
                      <div className="text-sm text-gray-600">
                        Click to change color
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Error Correction Level
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {errorLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setErrorLevel(level.id)}
                        className={`p-3 rounded-lg text-left ${
                          errorLevel === level.id
                            ? "bg-indigo-100 border border-indigo-300"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {level.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {level.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">
                      Include Margin
                    </div>
                    <div className="text-sm text-gray-600">
                      Add white space around QR code
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeMargin}
                      onChange={() => setIncludeMargin(!includeMargin)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview & Results */}
        <div className="space-y-6">
          {/* Generate Button */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <button
                onClick={generateQRCode}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Generate QR Code
              </button>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={clearAll}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setQrContent("")}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
                >
                  Clear Text
                </button>
              </div>
            </div>
          </div>

          {/* QR Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                QR Code Preview
              </h2>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-6 mb-6 flex items-center justify-center">
                <div
                  className="relative"
                  style={{
                    width: qrSize,
                    height: qrSize,
                    backgroundColor: bgColor,
                    padding: includeMargin ? "20px" : "0",
                  }}
                >
                  {/* Mock QR Code - in real app would be actual QR */}
                  <div className="grid grid-cols-7 gap-1 w-full h-full">
                    {Array.from({ length: 49 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${
                          i % 2 === 0 ? "bg-black" : "bg-white"
                        } rounded-sm`}
                        style={{
                          backgroundColor: i % 2 === 0 ? qrColor : bgColor,
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Finder patterns (mock) */}
                  <div className="absolute top-2 left-2 w-8 h-8 border-2 border-black rounded"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 border-2 border-black rounded"></div>
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-2 border-black rounded"></div>
                </div>
              </div>

              {/* Preview Info */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Size</div>
                  <div className="font-medium text-indigo-600">
                    {qrSize}×{qrSize} px
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Type</div>
                  <div className="font-medium text-gray-900">
                    {contentTypes.find((t) => t.id === qrType)?.name}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">QR Color</div>
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: qrColor }}
                    ></div>
                    {qrColor}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Background</div>
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: bgColor }}
                    ></div>
                    {bgColor}
                  </div>
                </div>
              </div>

              {generatedQR && (
                <div className="space-y-3">
                  <button
                    onClick={downloadQR}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download QR Code (PNG)
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={copyQRCode}
                      className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Link
                        </>
                      )}
                    </button>
                    <button
                      onClick={shareQRCode}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Card */}
          {generatedQR && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
              <div className="px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    QR Code Generated
                  </h2>
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Successfully Created</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-gray-700">Content Type</span>
                    <span className="font-medium text-indigo-600">
                      {
                        contentTypes.find((t) => t.id === generatedQR.type)
                          ?.name
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-gray-700">Size</span>
                    <span className="font-medium text-gray-900">
                      {generatedQR.size}×{generatedQR.size} px
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-gray-700">Error Correction</span>
                    <span className="font-medium text-gray-900">
                      {
                        errorLevels.find((e) => e.id === generatedQR.errorLevel)
                          ?.name
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-gray-700">Generated At</span>
                    <span className="font-medium text-gray-900">
                      {generatedQR.generatedAt}
                    </span>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="bg-white/70 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Content Preview
                  </div>
                  <div className="font-mono text-sm bg-gray-50 p-3 rounded-lg overflow-x-auto">
                    {generatedQR.content.length > 100
                      ? `${generatedQR.content.substring(0, 100)}...`
                      : generatedQR.content}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Common Uses
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Website Links
                </div>
                <div className="text-xs text-gray-600">Share URLs easily</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Contact Info
                </div>
                <div className="text-xs text-gray-600">
                  Business cards, resumes
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  WiFi Access
                </div>
                <div className="text-xs text-gray-600">
                  Share WiFi credentials
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Payments</div>
                <div className="text-xs text-gray-600">UPI, PayPal, Venmo</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <QrCode className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Customizable Design
          </h3>
          <p className="text-gray-600">
            Choose colors, size, and style. Add logos and customize every aspect
            of your QR code.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Link className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Content Types
          </h3>
          <p className="text-gray-600">
            Generate QR codes for URLs, text, emails, phone numbers, WiFi, and
            more.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            High Quality Export
          </h3>
          <p className="text-gray-600">
            Download QR codes in PNG, SVG, and PDF formats with high resolution
            for professional use.
          </p>
        </div>
      </div>

      {/* QR Code Types */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Types of QR Codes You Can Create
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Business & Marketing
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Website URLs and landing pages</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Social media profiles and links</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Product information and reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>App download links</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Personal & Utility
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Contact information (vCards)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>WiFi network credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Email addresses and phone numbers</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Event details and calendar invites</span>
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

export default QRGenerator;
