import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Settings,
  Check,
  Eye,
  Wand,
  ImageOff,
  Layers,
  Image as ImageIcon,
  Tag,
  Type,
  Droplets,
} from "lucide-react";

const RemoveBackground = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [aiMode, setAiMode] = useState(true);
  const [edgeRefinement, setEdgeRefinement] = useState(true);
  const [outputFormat, setOutputFormat] = useState("png");
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile({
      id: Date.now(),
      file: selectedFile,
      name: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(2) + " KB",
      type: selectedFile.type.split("/")[1].toUpperCase(),
      uploadedAt: new Date().toLocaleTimeString(),
    });

    setProcessedFile(null);
  };

  const removeBackground = () => {
    if (!file) {
      alert("Please upload an image first");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      setProcessedFile({
        name: file.name.replace(/\.[^/.]+$/, "_nobg.png"),
        format: outputFormat.toUpperCase(),
        originalSize: file.size,
        newSize:
          (
            parseFloat(file.size.replace(" KB", "")) *
            (outputFormat === "png" ? 1.1 : 0.8)
          ).toFixed(2) + " KB",
        backgroundRemoved: true,
        aiMode: aiMode,
        edgeRefinement: edgeRefinement,
        backgroundColor: backgroundColor,
        quality: "High",
        subjects: ["Person", "Product", "Animal"][
          Math.floor(Math.random() * 3)
        ],
        createdAt: new Date().toLocaleTimeString(),
      });

      alert("Background removed successfully!");
    }, 3500);
  };

  const downloadProcessedFile = () => {
    if (!processedFile) return;

    alert(`Downloading ${processedFile.name}...`);
  };

  const clearAll = () => {
    setFile(null);
    setProcessedFile(null);
  };

  const sampleResults = [
    {
      name: "product_nobg.png",
      format: "PNG",
      original: "2.1 MB",
      result: "1.8 MB",
      subjects: "Product",
    },
    {
      name: "portrait_nobg.jpg",
      format: "JPG",
      original: "3.4 MB",
      result: "2.1 MB",
      subjects: "Person",
    },
    {
      name: "pet_nobg.webp",
      format: "WebP",
      original: "1.9 MB",
      result: "1.2 MB",
      subjects: "Animal",
    },
  ];

  const colors = [
    {
      id: "transparent",
      name: "Transparent",
      value: "transparent",
      color: "bg-gradient-to-r from-gray-200 to-gray-300",
    },
    {
      id: "white",
      name: "White",
      value: "#FFFFFF",
      color: "bg-white border border-gray-300",
    },
    { id: "black", name: "Black", value: "#000000", color: "bg-black" },
    {
      id: "green",
      name: "Green Screen",
      value: "#00FF00",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Wand className="w-10 h-10 text-indigo-600" />
          Background Remover
        </h1>
        <p className="text-gray-600 text-lg">
          Automatically remove image backgrounds with AI-powered precision.
          Perfect for product photos, portraits, and creative projects.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Upload Image
              </h2>
            </div>

            <div className="p-6">
              {file ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ImageIcon className="w-10 h-10 text-indigo-600" />
                  </div>

                  <div className="mb-6">
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {file.name}
                    </div>
                    <div className="text-gray-600">
                      {file.size} • {file.type} format
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() =>
                        document.getElementById("image-upload-bg").click()
                      }
                      className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                    >
                      Replace Image
                    </button>
                    <button
                      onClick={clearAll}
                      className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition-colors">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-8 h-8 text-indigo-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Select Image File
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choose an image to remove background from
                  </p>

                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="image-upload-bg"
                  />
                  <label
                    htmlFor="image-upload-bg"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Image
                  </label>

                  <p className="mt-4 text-sm text-gray-500">
                    Best results with clear subject edges
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Removal Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Removal Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* AI Mode */}
                <div>
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Wand className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          AI-Powered Removal
                        </div>
                        <div className="text-sm text-gray-600">
                          Use artificial intelligence for best results
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAiMode(!aiMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        aiMode ? "bg-indigo-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          aiMode ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Output Background
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setBackgroundColor(color.id)}
                        className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${
                          backgroundColor === color.id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg ${color.color}`}
                        ></div>
                        <div className="text-sm font-medium text-gray-900">
                          {color.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Output Format
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["png", "jpg", "webp"].map((format) => (
                      <button
                        key={format}
                        onClick={() => setOutputFormat(format)}
                        className={`p-4 border rounded-xl text-center ${
                          outputFormat === format
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {format.toUpperCase()}
                        </div>
                        {format === "png" && (
                          <div className="text-xs text-gray-600">
                            Transparency
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <ImageOff className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Edge Refinement
                        </div>
                        <div className="text-sm text-gray-600">
                          Improve edge detection and smoothing
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEdgeRefinement(!edgeRefinement)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        edgeRefinement ? "bg-indigo-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          edgeRefinement ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>

                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Layers className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Multiple Subjects
                        </div>
                        <div className="text-sm text-gray-600">
                          Detect and separate multiple objects
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={removeBackground}
                  disabled={!file || processing}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    file && !processing
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Removing Background...
                    </div>
                  ) : (
                    "Remove Background"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Preview */}
        <div className="space-y-6">
          {/* Results */}
          {processedFile ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Background Removal Results
                  </h2>
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">
                      Background Successfully Removed
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* File Info */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wand className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {processedFile.name}
                    </div>
                    <div className="text-gray-600">
                      Processed at {processedFile.createdAt}
                    </div>
                  </div>
                </div>

                {/* Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Original</div>
                    <div className="text-lg font-bold text-red-600">
                      {processedFile.originalSize}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      With Background
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Processed</div>
                    <div className="text-lg font-bold text-green-600">
                      {processedFile.newSize}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Background Removed
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Subjects Detected</span>
                    <span className="font-medium text-indigo-600">
                      {processedFile.subjects}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Output Format</span>
                    <span className="font-medium text-purple-600">
                      {processedFile.format}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Background</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {processedFile.backgroundColor}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">AI Mode</span>
                    <span
                      className={`font-medium ${
                        processedFile.aiMode
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {processedFile.aiMode ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Edge Refinement</span>
                    <span
                      className={`font-medium ${
                        processedFile.edgeRefinement
                          ? "text-indigo-600"
                          : "text-gray-600"
                      }`}
                    >
                      {processedFile.edgeRefinement ? "Applied" : "Not Applied"}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadProcessedFile}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Image (No Background)
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Background Removal Results
                </h2>
              </div>

              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wand className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ready to Remove Background
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload an image to remove the background automatically.
                </p>

                {file && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg">
                    <Eye className="w-4 h-4" />
                    <span>Ready to remove background from {file.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Original */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2 text-center">
                    Original
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🖼️</div>
                      <div className="text-sm text-gray-600">
                        With Background
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processed */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2 text-center">
                    Processed
                  </div>
                  <div
                    className={`aspect-square rounded-lg border border-gray-300 flex items-center justify-center ${
                      backgroundColor === "transparent"
                        ? "bg-gradient-to-br from-gray-100 to-gray-200"
                        : backgroundColor === "white"
                        ? "bg-white"
                        : backgroundColor === "black"
                        ? "bg-black"
                        : "bg-green-500"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">✨</div>
                      <div className="text-sm text-gray-600 bg-white/80 px-2 py-1 rounded">
                        No Background
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Wand className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      AI Detection Active
                    </div>
                    <div className="text-sm text-gray-600">
                      The AI will detect and isolate the main subject from the
                      background.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Results */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sample Results
            </h3>
            <div className="space-y-3">
              {sampleResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0
                        ? "bg-purple-100"
                        : index === 1
                        ? "bg-blue-100"
                        : "bg-green-100"
                    }`}
                  >
                    <Wand
                      className={`w-5 h-5 ${
                        index === 0
                          ? "text-purple-600"
                          : index === 1
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {result.name}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {result.original} → {result.result}
                      </span>
                      <span className="font-medium text-indigo-600">
                        {result.subjects}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Wand className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            AI-Powered Detection
          </h3>
          <p className="text-gray-600">
            Advanced artificial intelligence accurately detects subjects and
            removes backgrounds automatically.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <ImageOff className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Precise Edge Detection
          </h3>
          <p className="text-gray-600">
            Smart edge refinement ensures clean cuts around hair, fur, and
            complex shapes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Format Support
          </h3>
          <p className="text-gray-600">
            Export in PNG, JPG, or WebP with transparent or custom-colored
            backgrounds.
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              E-commerce & Product
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Create product images with white backgrounds</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Prepare images for online catalogs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Make product collages and composites</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Creative & Marketing
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Remove backgrounds from portraits</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Create marketing materials and ads</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Prepare images for presentations</span>
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

export default RemoveBackground;
