import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Settings,
  Check,
  Eye,
  Maximize,
  Crop,
  Ruler,
  Image as ImageIcon,
} from "lucide-react";

const ResizeImage = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [resizedFile, setResizedFile] = useState(null);
  const [resizeMode, setResizeMode] = useState("percentage");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [percentage, setPercentage] = useState(50);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [preserveQuality, setPreserveQuality] = useState(true);

  const presets = [
    {
      name: "Social Media",
      sizes: [
        { label: "Facebook", w: 1200, h: 630 },
        { label: "Instagram", w: 1080, h: 1080 },
      ],
    },
    {
      name: "Web",
      sizes: [
        { label: "HD", w: 1280, h: 720 },
        { label: "Full HD", w: 1920, h: 1080 },
      ],
    },
    {
      name: "Print",
      sizes: [
        { label: "A4", w: 2480, h: 3508 },
        { label: "Business Card", w: 1050, h: 600 },
      ],
    },
  ];

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile({
      id: Date.now(),
      file: selectedFile,
      name: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(2) + " KB",
      type: selectedFile.type.split("/")[1].toUpperCase(),
      dimensions: "1920×1080",
      uploadedAt: new Date().toLocaleTimeString(),
    });

    setResizedFile(null);
  };

  const resizeImage = () => {
    if (!file) {
      alert("Please upload an image first");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      let newWidth, newHeight;
      if (resizeMode === "percentage") {
        newWidth = Math.round(1920 * (percentage / 100));
        newHeight = Math.round(1080 * (percentage / 100));
      } else {
        newWidth = width;
        newHeight = height;
      }

      setResizedFile({
        name: file.name.replace(/\.[^/.]+$/, "_resized.jpg"),
        format: file.type,
        originalSize: file.size,
        newSize:
          (
            parseFloat(file.size.replace(" KB", "")) *
            (percentage / 100)
          ).toFixed(2) + " KB",
        originalDimensions: file.dimensions,
        newDimensions: `${newWidth}×${newHeight}`,
        percentage:
          resizeMode === "percentage"
            ? percentage
            : Math.round((newWidth / 1920) * 100),
        mode: resizeMode,
        qualityPreserved: preserveQuality,
        aspectMaintained: maintainAspect,
        createdAt: new Date().toLocaleTimeString(),
      });

      alert("Image resized successfully!");
    }, 2000);
  };

  const downloadResizedFile = () => {
    if (!resizedFile) return;

    alert(`Downloading ${resizedFile.name}...`);
  };

  const clearAll = () => {
    setFile(null);
    setResizedFile(null);
  };

  const applyPreset = (presetWidth, presetHeight) => {
    setWidth(presetWidth);
    setHeight(presetHeight);
    setResizeMode("dimensions");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Crop className="w-10 h-10 text-indigo-600" />
          Image Resizer
        </h1>
        <p className="text-gray-600 text-lg">
          Resize images to exact dimensions or percentages. Optimize for web,
          social media, or print.
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
                      {file.size} • {file.dimensions} • {file.type}
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() =>
                        document.getElementById("image-upload-resize").click()
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
                    Choose an image to resize
                  </p>

                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="image-upload-resize"
                  />
                  <label
                    htmlFor="image-upload-resize"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Image
                  </label>

                  <p className="mt-4 text-sm text-gray-500">
                    Supports JPG, PNG, WebP, GIF
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Resize Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Resize Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Resize Mode */}
                <div>
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setResizeMode("percentage")}
                      className={`flex-1 py-3 rounded-lg font-medium ${
                        resizeMode === "percentage"
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      By Percentage
                    </button>
                    <button
                      onClick={() => setResizeMode("dimensions")}
                      className={`flex-1 py-3 rounded-lg font-medium ${
                        resizeMode === "dimensions"
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      By Dimensions
                    </button>
                  </div>

                  {resizeMode === "percentage" ? (
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Resize Percentage
                        </label>
                        <span className="text-sm font-medium text-indigo-600">
                          {percentage}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        value={percentage}
                        onChange={(e) =>
                          setPercentage(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>10% (Smaller)</span>
                        <span>100% (Original)</span>
                        <span>200% (Larger)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Width (px)
                        </label>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) =>
                            setWidth(parseInt(e.target.value) || 0)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          min="1"
                          max="10000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Height (px)
                        </label>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) =>
                            setHeight(parseInt(e.target.value) || 0)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          min="1"
                          max="10000"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quick Presets
                  </label>
                  <div className="space-y-3">
                    {presets.map((preset, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium text-gray-900 mb-2">
                          {preset.name}
                        </div>
                        <div className="flex gap-2">
                          {preset.sizes.map((size, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => applyPreset(size.w, size.h)}
                              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                            >
                              <div className="font-medium text-gray-900">
                                {size.label}
                              </div>
                              <div className="text-xs text-gray-600">
                                {size.w}×{size.h}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Crop className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Maintain Aspect Ratio
                        </div>
                        <div className="text-sm text-gray-600">
                          Keep original width/height ratio
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMaintainAspect(!maintainAspect)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        maintainAspect ? "bg-indigo-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          maintainAspect ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Preserve Quality
                        </div>
                        <div className="text-sm text-gray-600">
                          Prevent quality loss during resize
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreserveQuality(!preserveQuality)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        preserveQuality ? "bg-purple-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preserveQuality ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                </div>

                {/* Resize Button */}
                <button
                  onClick={resizeImage}
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
                      Resizing Image...
                    </div>
                  ) : (
                    "Resize Image"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Preview */}
        <div className="space-y-6">
          {/* Results */}
          {resizedFile ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Resizing Results
                  </h2>
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Successfully Resized</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* File Info */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crop className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {resizedFile.name}
                    </div>
                    <div className="text-gray-600">
                      Resized at {resizedFile.createdAt}
                    </div>
                  </div>
                </div>

                {/* Size Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Original Dimensions
                    </div>
                    <div className="text-xl font-bold text-red-600">
                      {resizedFile.originalDimensions}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {resizedFile.originalSize}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      New Dimensions
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {resizedFile.newDimensions}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {resizedFile.newSize}
                    </div>
                  </div>
                </div>

                {/* Resize Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Scale</span>
                    <span className="font-bold text-indigo-600">
                      {resizedFile.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">
                      Aspect Ratio Maintained
                    </span>
                    <span
                      className={`font-medium ${
                        resizedFile.aspectMaintained
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {resizedFile.aspectMaintained ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Quality Preserved</span>
                    <span
                      className={`font-medium ${
                        resizedFile.qualityPreserved
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {resizedFile.qualityPreserved ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Resize Mode</span>
                    <span className="font-medium text-purple-600">
                      {resizedFile.mode === "percentage"
                        ? "Percentage"
                        : "Dimensions"}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadResizedFile}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Resized Image
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Resizing Results
                </h2>
              </div>

              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Crop className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ready to Resize
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload an image and set dimensions to see the results here.
                </p>

                {file && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg">
                    <Eye className="w-4 h-4" />
                    <span>Ready to resize {file.name}</span>
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
                <h2 className="text-xl font-semibold text-gray-900">
                  Size Preview
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-700">Original Size</div>
                <div className="font-medium text-gray-900">1920×1080</div>
              </div>

              <div className="relative h-32 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
                {/* Original size indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-gray-700 font-medium">Original</div>
                      <div className="text-sm text-gray-600">1920×1080</div>
                    </div>
                  </div>
                </div>

                {/* New size overlay */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-500 bg-indigo-50/30"
                  style={{
                    width: `${
                      resizeMode === "percentage"
                        ? percentage
                        : (width / 1920) * 100
                    }%`,
                    height: `${
                      resizeMode === "percentage"
                        ? percentage
                        : (height / 1080) * 100
                    }%`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-indigo-700 font-medium">New</div>
                      <div className="text-xs text-indigo-600">
                        {resizeMode === "percentage"
                          ? `${Math.round(
                              1920 * (percentage / 100)
                            )}×${Math.round(1080 * (percentage / 100))}`
                          : `${width}×${height}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-gray-700">New Size</div>
                <div className="font-medium text-indigo-600">
                  {resizeMode === "percentage"
                    ? `${Math.round(1920 * (percentage / 100))}×${Math.round(
                        1080 * (percentage / 100)
                      )}`
                    : `${width}×${height}`}
                </div>
              </div>
            </div>
          </div>

          {/* Dimension Info */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Common Dimensions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Web Banner</div>
                <div className="text-sm text-gray-600">728×90 px</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Thumbnail</div>
                <div className="text-sm text-gray-600">150×150 px</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Social Media
                </div>
                <div className="text-sm text-gray-600">1200×630 px</div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Mobile Wallpaper
                </div>
                <div className="text-sm text-gray-600">1080×1920 px</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Crop className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Flexible Resizing
          </h3>
          <p className="text-gray-600">
            Resize by exact dimensions, percentages, or use predefined presets
            for common use cases.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Maximize className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Aspect Ratio Control
          </h3>
          <p className="text-gray-600">
            Maintain aspect ratio automatically or specify custom dimensions for
            creative cropping.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Ruler className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Batch Processing
          </h3>
          <p className="text-gray-600">
            Resize multiple images simultaneously with consistent settings for
            all files.
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
            <h3 className="font-semibold text-gray-900 mb-3">Web & Digital</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Optimize images for websites</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Create thumbnails and previews</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Prepare images for social media</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Print & Professional
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Resize for printing requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Prepare images for presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Create consistent image sizes</span>
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

export default ResizeImage;
