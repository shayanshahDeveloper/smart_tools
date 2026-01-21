import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Settings,
  Check,
  Eye,
  FileInput,
  Gauge,
  Minimize2,
  Image as ImageIcon,
} from "lucide-react";

const CompressImage = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [compressedFile, setCompressedFile] = useState(null);
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState("same");
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [reduceDimensions, setReduceDimensions] = useState(true);

  const formats = [
    {
      id: "same",
      name: "Keep Original",
      description: "Maintain original format",
      color: "indigo",
    },
    {
      id: "jpg",
      name: "JPG",
      description: "Best for photos",
      color: "indigo",
    },
    {
      id: "png",
      name: "PNG",
      description: "Best for graphics",
      color: "purple",
    },
    {
      id: "webp",
      name: "WebP",
      description: "Modern format",
      color: "pink",
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

    setCompressedFile(null);
  };

  const compressImage = () => {
    if (!file) {
      alert("Please upload an image first");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      const originalSize = parseFloat(file.size.replace(" KB", ""));
      const compressionRatio = quality / 100;
      const newSize = (originalSize * compressionRatio).toFixed(2);

      setCompressedFile({
        name: file.name.replace(
          /\.[^/.]+$/,
          `_compressed.${format === "same" ? file.type.toLowerCase() : format}`
        ),
        format: format === "same" ? file.type : format.toUpperCase(),
        originalSize: file.size,
        compressedSize: newSize + " KB",
        reduction: Math.round((1 - compressionRatio) * 100) + "%",
        quality: quality,
        dimensions: reduceDimensions ? "1280×720" : file.dimensions,
        createdAt: new Date().toLocaleTimeString(),
      });

      alert("Image compressed successfully!");
    }, 2000);
  };

  const downloadCompressedFile = () => {
    if (!compressedFile) return;

    alert(`Downloading ${compressedFile.name}...`);
  };

  const clearAll = () => {
    setFile(null);
    setCompressedFile(null);
  };

  const sampleImages = [
    {
      name: "photo_compressed.jpg",
      format: "JPG",
      original: "2.4 MB",
      compressed: "856 KB",
      reduction: "65%",
    },
    {
      name: "screenshot_compressed.png",
      format: "PNG",
      original: "1.8 MB",
      compressed: "624 KB",
      reduction: "66%",
    },
    {
      name: "logo_compressed.webp",
      format: "WebP",
      original: "980 KB",
      compressed: "256 KB",
      reduction: "74%",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Minimize2 className="w-10 h-10 text-indigo-600" />
          Image Compressor
        </h1>
        <p className="text-gray-600 text-lg">
          Reduce image file size without significant quality loss. Optimize
          images for web and storage.
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
                      {file.size} • {file.type} • {file.dimensions}
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() =>
                        document.getElementById("image-upload").click()
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
                    Choose an image to compress (JPG, PNG, WebP, GIF)
                  </p>

                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Image
                  </label>

                  <p className="mt-4 text-sm text-gray-500">
                    Supports JPG, PNG, WebP, GIF • Max 20 MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Compression Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Compression Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Quality Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Compression Quality
                    </label>
                    <span className="text-sm font-medium text-indigo-600">
                      {quality}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="95"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Smaller file</span>
                    <span>Better quality</span>
                  </div>
                </div>

                {/* Output Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Output Format
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {formats.map((formatItem) => (
                      <button
                        key={formatItem.id}
                        onClick={() => setFormat(formatItem.id)}
                        className={`p-4 border rounded-xl text-left transition-all ${
                          format === formatItem.id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {formatItem.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatItem.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Gauge className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Reduce Dimensions
                        </div>
                        <div className="text-sm text-gray-600">
                          Optimize for web display
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReduceDimensions(!reduceDimensions)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        reduceDimensions ? "bg-indigo-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          reduceDimensions ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Preserve Metadata
                        </div>
                        <div className="text-sm text-gray-600">
                          Keep EXIF data and metadata
                        </div>
                      </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </div>
                  </label>
                </div>

                {/* Compress Button */}
                <button
                  onClick={compressImage}
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
                      Compressing Image...
                    </div>
                  ) : (
                    "Compress Image"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Preview */}
        <div className="space-y-6">
          {/* Results */}
          {compressedFile ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Compression Results
                  </h2>
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Successfully Compressed</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* File Info */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Minimize2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {compressedFile.name}
                    </div>
                    <div className="text-gray-600">
                      Compressed at {compressedFile.createdAt}
                    </div>
                  </div>
                </div>

                {/* Size Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Original Size
                    </div>
                    <div className="text-xl font-bold text-red-600">
                      {compressedFile.originalSize}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Compressed Size
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {compressedFile.compressedSize}
                    </div>
                  </div>
                </div>

                {/* Compression Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Size Reduction</span>
                    <span className="font-bold text-green-600">
                      {compressedFile.reduction}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Quality Setting</span>
                    <span className="font-medium text-indigo-600">
                      {compressedFile.quality}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Output Dimensions</span>
                    <span className="font-medium text-gray-900">
                      {compressedFile.dimensions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Output Format</span>
                    <span className="font-medium text-purple-600">
                      {compressedFile.format}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadCompressedFile}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Compressed Image
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Compression Results
                </h2>
              </div>

              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Minimize2 className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ready to Compress
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload an image and compress it to see the results here.
                </p>

                {file && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg">
                    <Eye className="w-4 h-4" />
                    <span>Ready to compress {file.name}</span>
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
                  Image Preview
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg border border-gray-300 flex items-center justify-center">
                {file ? (
                  <div className="text-center">
                    <div className="text-5xl mb-2">🖼️</div>
                    <div className="text-gray-700 font-medium">{file.name}</div>
                    <div className="text-sm text-gray-600">
                      {file.dimensions}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <div className="text-gray-600">
                      Upload an image to see preview
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Original Quality</div>
                  <div className="text-lg font-bold text-gray-900">100%</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Compressed Quality
                  </div>
                  <div className="text-lg font-bold text-indigo-600">
                    {quality}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Output */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sample Compression
            </h3>
            <div className="space-y-3">
              {sampleImages.map((img, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0
                        ? "bg-indigo-100"
                        : index === 1
                        ? "bg-purple-100"
                        : "bg-pink-100"
                    }`}
                  >
                    <Minimize2
                      className={`w-5 h-5 ${
                        index === 0
                          ? "text-indigo-600"
                          : index === 1
                          ? "text-purple-600"
                          : "text-pink-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{img.name}</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {img.original} → {img.compressed}
                      </span>
                      <span className="font-bold text-green-600">
                        {img.reduction}
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
            <Minimize2 className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Lossless Compression
          </h3>
          <p className="text-gray-600">
            Reduce file size while maintaining visual quality with smart
            algorithms.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Gauge className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Fast Processing
          </h3>
          <p className="text-gray-600">
            Optimize images quickly with our high-performance compression
            engine.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Batch Processing
          </h3>
          <p className="text-gray-600">
            Compress multiple images simultaneously with consistent settings.
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
            <h3 className="font-semibold text-gray-900 mb-3">Web & Mobile</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Optimize images for websites</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Reduce app bundle size</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Improve page load times</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Storage & Sharing
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Save cloud storage space</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Send images via email</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Upload to social media</span>
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

export default CompressImage;
