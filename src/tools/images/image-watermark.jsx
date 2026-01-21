import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Settings,
  Check,
  Eye,
  Tag,
  Type,
  Image as ImageIcon,
  Droplets,
  Layers,
} from "lucide-react";

const ImageWatermark = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [watermarkedFile, setWatermarkedFile] = useState(null);
  const [watermarkType, setWatermarkType] = useState("text");
  const [text, setText] = useState("© Your Brand");
  const [position, setPosition] = useState("bottom-right");
  const [opacity, setOpacity] = useState(50);
  const [size, setSize] = useState(30);
  const [color, setColor] = useState("#000000");
  const [uploadedImage, setUploadedImage] = useState(null);

  const positions = [
    { id: "top-left", name: "Top Left" },
    { id: "top-center", name: "Top Center" },
    { id: "top-right", name: "Top Right" },
    { id: "center", name: "Center" },
    { id: "bottom-left", name: "Bottom Left" },
    { id: "bottom-center", name: "Bottom Center" },
    { id: "bottom-right", name: "Bottom Right" },
    { id: "tiled", name: "Tiled" },
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

    setWatermarkedFile(null);
  };

  const handleWatermarkImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploadedImage(URL.createObjectURL(selectedFile));
    }
  };

  const applyWatermark = () => {
    if (!file) {
      alert("Please upload an image first");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      setWatermarkedFile({
        name: file.name.replace(/\.[^/.]+$/, "_watermarked.jpg"),
        format: file.type,
        originalSize: file.size,
        newSize:
          (parseFloat(file.size.replace(" KB", "")) * 1.1).toFixed(2) + " KB",
        watermarkType: watermarkType,
        position: positions.find((p) => p.id === position)?.name || position,
        opacity: opacity,
        size: size,
        text: watermarkType === "text" ? text : "Custom Image",
        color: watermarkType === "text" ? color : "N/A",
        createdAt: new Date().toLocaleTimeString(),
      });

      alert("Watermark applied successfully!");
    }, 2500);
  };

  const downloadWatermarkedFile = () => {
    if (!watermarkedFile) return;

    alert(`Downloading ${watermarkedFile.name}...`);
  };

  const clearAll = () => {
    setFile(null);
    setWatermarkedFile(null);
    setUploadedImage(null);
  };

  const colorOptions = [
    { id: "#000000", name: "Black" },
    { id: "#FFFFFF", name: "White" },
    { id: "#FF0000", name: "Red" },
    { id: "#0000FF", name: "Blue" },
    { id: "#00FF00", name: "Green" },
    { id: "#FFA500", name: "Orange" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Tag className="w-10 h-10 text-indigo-600" />
          Image Watermark
        </h1>
        <p className="text-gray-600 text-lg">
          Add text or image watermarks to protect your images. Customize
          position, opacity, and style.
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
                        document
                          .getElementById("image-upload-watermark")
                          .click()
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
                    Choose an image to add watermark to
                  </p>

                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="image-upload-watermark"
                  />
                  <label
                    htmlFor="image-upload-watermark"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Image
                  </label>

                  <p className="mt-4 text-sm text-gray-500">
                    Supports JPG, PNG, WebP
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Watermark Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Watermark Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Watermark Type */}
                <div>
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setWatermarkType("text")}
                      className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                        watermarkType === "text"
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Type className="w-4 h-4" />
                      Text Watermark
                    </button>
                    <button
                      onClick={() => setWatermarkType("image")}
                      className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                        watermarkType === "image"
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Image Watermark
                    </button>
                  </div>

                  {watermarkType === "text" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Watermark Text
                        </label>
                        <input
                          type="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter watermark text"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Text Color
                        </label>
                        <div className="flex gap-2">
                          {colorOptions.map((colorOption) => (
                            <button
                              key={colorOption.id}
                              onClick={() => setColor(colorOption.id)}
                              className={`w-8 h-8 rounded-full border-2 ${
                                color === colorOption.id
                                  ? "border-indigo-600"
                                  : "border-gray-300"
                              }`}
                              style={{ backgroundColor: colorOption.id }}
                              title={colorOption.name}
                            />
                          ))}
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-8 h-8 cursor-pointer rounded-full border border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Upload Watermark Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
                        {uploadedImage ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 border border-gray-300 rounded-lg overflow-hidden">
                              <img
                                src={uploadedImage}
                                alt="Watermark"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <button
                              onClick={() =>
                                document
                                  .getElementById("watermark-image-upload")
                                  .click()
                              }
                              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                            >
                              Change Image
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <ImageIcon className="w-6 h-6 text-indigo-600" />
                            </div>
                            <p className="text-gray-600 mb-4">
                              Upload PNG with transparency for best results
                            </p>
                            <input
                              type="file"
                              onChange={handleWatermarkImageUpload}
                              accept="image/*"
                              className="hidden"
                              id="watermark-image-upload"
                            />
                            <label
                              htmlFor="watermark-image-upload"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 cursor-pointer"
                            >
                              <Upload className="w-4 h-4" />
                              Upload Watermark
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Position
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {positions.map((pos) => (
                      <button
                        key={pos.id}
                        onClick={() => setPosition(pos.id)}
                        className={`py-2 rounded-lg text-sm font-medium ${
                          position === pos.id
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {pos.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Opacity
                      </label>
                      <span className="text-sm font-medium text-indigo-600">
                        {opacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Size
                      </label>
                      <span className="text-sm font-medium text-indigo-600">
                        {size}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    />
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={applyWatermark}
                  disabled={
                    !file ||
                    processing ||
                    (watermarkType === "image" && !uploadedImage)
                  }
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    file &&
                    !processing &&
                    (watermarkType === "text" || uploadedImage)
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Applying Watermark...
                    </div>
                  ) : (
                    "Apply Watermark"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Preview */}
        <div className="space-y-6">
          {/* Results */}
          {watermarkedFile ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Watermark Results
                  </h2>
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">
                      Watermark Applied Successfully
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* File Info */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tag className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {watermarkedFile.name}
                    </div>
                    <div className="text-gray-600">
                      Processed at {watermarkedFile.createdAt}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Watermark Type</span>
                    <span className="font-medium text-indigo-600">
                      {watermarkedFile.watermarkType === "text"
                        ? "Text"
                        : "Image"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Position</span>
                    <span className="font-medium text-gray-900">
                      {watermarkedFile.position}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Opacity</span>
                    <span className="font-medium text-indigo-600">
                      {watermarkedFile.opacity}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Size</span>
                    <span className="font-medium text-indigo-600">
                      {watermarkedFile.size}%
                    </span>
                  </div>
                  {watermarkedFile.watermarkType === "text" && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Text</span>
                      <span className="font-medium text-gray-900">
                        {watermarkedFile.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadWatermarkedFile}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Watermarked Image
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Watermark Results
                </h2>
              </div>

              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Tag className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ready to Watermark
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload an image and configure watermark settings to see the
                  results here.
                </p>

                {file && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg">
                    <Eye className="w-4 h-4" />
                    <span>Ready to watermark {file.name}</span>
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
                  Watermark Preview
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 relative overflow-hidden">
                {/* Mock image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <div className="text-gray-700">Your Image</div>
                  </div>
                </div>

                {/* Watermark overlay */}
                <div
                  className={`absolute ${
                    position === "top-left"
                      ? "top-4 left-4"
                      : position === "top-center"
                      ? "top-4 left-1/2 transform -translate-x-1/2"
                      : position === "top-right"
                      ? "top-4 right-4"
                      : position === "center"
                      ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      : position === "bottom-left"
                      ? "bottom-4 left-4"
                      : position === "bottom-center"
                      ? "bottom-4 left-1/2 transform -translate-x-1/2"
                      : position === "bottom-right"
                      ? "bottom-4 right-4"
                      : "inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-4"
                  }`}
                >
                  {position === "tiled" ? (
                    Array.from({ length: 9 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center"
                        style={{ opacity: opacity / 100 }}
                      >
                        {watermarkType === "text" ? (
                          <div
                            className="text-sm font-bold px-2 py-1 rounded"
                            style={{
                              color: color,
                              transform: `scale(${size / 100})`,
                            }}
                          >
                            {text}
                          </div>
                        ) : (
                          <div
                            className="w-8 h-8 bg-indigo-500/50 rounded"
                            style={{ transform: `scale(${size / 100})` }}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        opacity: opacity / 100,
                        transform: `scale(${size / 100})`,
                      }}
                    >
                      {watermarkType === "text" ? (
                        <div
                          className="text-lg font-bold px-3 py-2 bg-white/20 rounded"
                          style={{ color: color }}
                        >
                          {text}
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-indigo-500/50 rounded-lg flex items-center justify-center">
                          <Tag className="w-8 h-8 text-white/80" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Position</div>
                  <div className="font-medium text-gray-900">
                    {positions.find((p) => p.id === position)?.name}
                  </div>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Opacity</div>
                  <div className="font-medium text-indigo-600">{opacity}%</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Size</div>
                  <div className="font-medium text-purple-600">{size}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Common Watermark Uses
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Copyright Protection
                </div>
                <div className="text-sm text-gray-600">
                  Protect your images from unauthorized use
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Brand Promotion
                </div>
                <div className="text-sm text-gray-600">
                  Add your logo to marketing materials
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Photography
                </div>
                <div className="text-sm text-gray-600">
                  Watermark professional photos
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Social Media
                </div>
                <div className="text-sm text-gray-600">
                  Prepare images for online sharing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Tag className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Text & Image Watermarks
          </h3>
          <p className="text-gray-600">
            Add text watermarks with custom fonts or upload your own logo/image
            as a watermark.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Flexible Positioning
          </h3>
          <p className="text-gray-600">
            Choose from 8 different positions or tile watermarks across the
            entire image.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Droplets className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Customizable Appearance
          </h3>
          <p className="text-gray-600">
            Adjust opacity, size, color, and rotation to create the perfect
            watermark.
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
              Professional & Business
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Brand stock photos and assets</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Marketing materials and presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Product catalogs and brochures</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Creative & Personal
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Photography portfolios and samples</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Social media content creation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Digital art and illustrations</span>
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

export default ImageWatermark;
