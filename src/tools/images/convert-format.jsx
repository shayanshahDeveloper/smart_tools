import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Settings,
  Check,
  Eye,
  Repeat,
  Image as ImageIcon,
  Type,
} from "lucide-react";

const ConvertFormat = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState("jpg");
  const [quality, setQuality] = useState(85);
  const [preserveTransparency, setPreserveTransparency] = useState(true);
  const [removeMetadata, setRemoveMetadata] = useState(false);

  const formats = [
    {
      id: "jpg",
      name: "JPG",
      description: "Best for photos",
      color: "indigo",
      features: ["Lossy", "Small file size"],
    },
    {
      id: "png",
      name: "PNG",
      description: "Best for graphics",
      color: "purple",
      features: ["Lossless", "Transparency"],
    },
    {
      id: "webp",
      name: "WebP",
      description: "Modern format",
      color: "pink",
      features: ["High compression", "Quality"],
    },
    {
      id: "gif",
      name: "GIF",
      description: "For animations",
      color: "blue",
      features: ["Animation", "256 colors"],
    },
    {
      id: "bmp",
      name: "BMP",
      description: "Uncompressed",
      color: "gray",
      features: ["Lossless", "Large size"],
    },
    {
      id: "ico",
      name: "ICO",
      description: "For icons",
      color: "indigo",
      features: ["Multiple sizes", "Favicons"],
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
      uploadedAt: new Date().toLocaleTimeString(),
    });

    setConvertedFile(null);
  };

  const convertFormat = () => {
    if (!file) {
      alert("Please upload an image first");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      const target = formats.find((f) => f.id === targetFormat);

      setConvertedFile({
        name: file.name.replace(/\.[^/.]+$/, `.${targetFormat}`),
        format: target.name,
        originalFormat: file.type,
        targetFormat: target.id.toUpperCase(),
        originalSize: file.size,
        newSize:
          (
            parseFloat(file.size.replace(" KB", "")) *
            (target.id === "png" ? 1.2 : 0.7)
          ).toFixed(2) + " KB",
        quality: quality,
        transparencyPreserved: targetFormat === "png" && preserveTransparency,
        metadataRemoved: removeMetadata,
        createdAt: new Date().toLocaleTimeString(),
      });

      alert(`Image converted to ${target.name} successfully!`);
    }, 2500);
  };

  const downloadConvertedFile = () => {
    if (!convertedFile) return;

    alert(`Downloading ${convertedFile.name}...`);
  };

  const clearAll = () => {
    setFile(null);
    setConvertedFile(null);
  };

  const formatInfo = formats.find((f) => f.id === targetFormat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Repeat className="w-10 h-10 text-indigo-600" />
          Image Format Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Convert images between different formats (JPG, PNG, WebP, GIF, BMP,
          ICO). Preserve quality and optimize for your needs.
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
                        document.getElementById("image-upload-format").click()
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
                    Choose an image to convert to another format
                  </p>

                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="image-upload-format"
                  />
                  <label
                    htmlFor="image-upload-format"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Image
                  </label>

                  <p className="mt-4 text-sm text-gray-500">
                    Supports all major image formats
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Conversion Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Conversion Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Target Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Convert To
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formats.map((formatItem) => (
                      <button
                        key={formatItem.id}
                        onClick={() => setTargetFormat(formatItem.id)}
                        className={`p-4 border rounded-xl text-left transition-all ${
                          targetFormat === formatItem.id
                            ? `border-indigo-500 bg-indigo-50`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900 mb-1">
                          {formatItem.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {formatItem.description}
                        </div>
                        <div className="mt-2 flex gap-1 flex-wrap">
                          {formatItem.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-white/50 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Setting */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Quality Setting
                    </label>
                    <span className="text-sm font-medium text-indigo-600">
                      {quality}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Lower quality</span>
                    <span>Higher quality</span>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4">
                  {targetFormat === "png" && (
                    <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 text-purple-600">🔄</div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Preserve Transparency
                          </div>
                          <div className="text-sm text-gray-600">
                            Keep alpha channel (PNG only)
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setPreserveTransparency(!preserveTransparency)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          preserveTransparency ? "bg-purple-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            preserveTransparency
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </label>
                  )}

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Remove Metadata
                        </div>
                        <div className="text-sm text-gray-600">
                          Strip EXIF and other metadata
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRemoveMetadata(!removeMetadata)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        removeMetadata ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          removeMetadata ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                </div>

                {/* Convert Button */}
                <button
                  onClick={convertFormat}
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
                      Converting to {formatInfo?.name}...
                    </div>
                  ) : (
                    `Convert to ${formatInfo?.name}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Info */}
        <div className="space-y-6">
          {/* Results */}
          {convertedFile ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Conversion Results
                  </h2>
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Successfully Converted</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* File Info */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Repeat className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {convertedFile.name}
                    </div>
                    <div className="text-gray-600">
                      Converted at {convertedFile.createdAt}
                    </div>
                  </div>
                </div>

                {/* Format Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Original</div>
                    <div className="text-xl font-bold text-red-600">
                      {convertedFile.originalFormat}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {convertedFile.originalSize}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Converted To
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {convertedFile.targetFormat}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {convertedFile.newSize}
                    </div>
                  </div>
                </div>

                {/* Conversion Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Quality Setting</span>
                    <span className="font-medium text-indigo-600">
                      {convertedFile.quality}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">
                      Transparency Preserved
                    </span>
                    <span
                      className={`font-medium ${
                        convertedFile.transparencyPreserved
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {convertedFile.transparencyPreserved ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Metadata Removed</span>
                    <span
                      className={`font-medium ${
                        convertedFile.metadataRemoved
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {convertedFile.metadataRemoved ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadConvertedFile}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download {formatInfo?.name} Image
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Conversion Results
                </h2>
              </div>

              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Repeat className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ready to Convert
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload an image and choose a target format to see the results
                  here.
                </p>

                {file && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg">
                    <Eye className="w-4 h-4" />
                    <span>
                      Ready to convert {file.name} to {formatInfo?.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Format Info */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {formatInfo?.name} Format Information
            </h3>
            <div className="space-y-4">
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="font-medium text-gray-900 mb-2">Best For</div>
                <div className="text-gray-700">{formatInfo?.description}</div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="font-medium text-gray-900 mb-2">Features</div>
                <div className="flex flex-wrap gap-2">
                  {formatInfo?.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="font-medium text-gray-900 mb-2">
                  Common Uses
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  {targetFormat === "jpg" && (
                    <>
                      <div>• Photographs and digital cameras</div>
                      <div>• Web images and social media</div>
                      <div>• Email attachments</div>
                    </>
                  )}
                  {targetFormat === "png" && (
                    <>
                      <div>• Logos and graphics with transparency</div>
                      <div>• Screenshots and UI elements</div>
                      <div>• Web graphics requiring transparency</div>
                    </>
                  )}
                  {targetFormat === "webp" && (
                    <>
                      <div>• Modern web images</div>
                      <div>• E-commerce product images</div>
                      <div>• Progressive web apps</div>
                    </>
                  )}
                  {targetFormat === "gif" && (
                    <>
                      <div>• Simple animations</div>
                      <div>• Memes and reaction images</div>
                      <div>• Low-color graphics</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Format Comparison */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Image Format Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Format</th>
                <th className="text-left py-3 px-4">Best For</th>
                <th className="text-left py-3 px-4">Compression</th>
                <th className="text-left py-3 px-4">Transparency</th>
                <th className="text-left py-3 px-4">Animation</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((format, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{format.name}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {format.description}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        format.id === "jpg" || format.id === "webp"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {format.features[0]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        format.id === "png"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {format.id === "png" || format.id === "gif"
                        ? "Yes"
                        : "No"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        format.id === "gif"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {format.id === "gif" ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Repeat className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Wide Format Support
          </h3>
          <p className="text-gray-600">
            Convert between all major image formats including JPG, PNG, WebP,
            GIF, BMP, and ICO.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Customizable Quality
          </h3>
          <p className="text-gray-600">
            Adjust quality settings for each format to balance file size and
            visual fidelity.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Type className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Preserve Details
          </h3>
          <p className="text-gray-600">
            Maintain image details, colors, and transparency during format
            conversion.
          </p>
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

export default ConvertFormat;
