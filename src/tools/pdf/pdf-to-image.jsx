import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Image as ImageIcon,
  Settings,
  Check,
  Eye,
  Grid,
  FileImage,
} from "lucide-react";

const PDFToImage = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [convertedImages, setConvertedImages] = useState([]);
  const [imageFormat, setImageFormat] = useState("jpg");
  const [quality, setQuality] = useState(85);
  const [selectedPages, setSelectedPages] = useState("all");
  const [totalPages, setTotalPages] = useState(12);

  const imageFormats = [
    { id: "jpg", name: "JPG", description: "Best for photos", color: "blue" },
    {
      id: "png",
      name: "PNG",
      description: "Best for graphics",
      color: "green",
    },
    { id: "webp", name: "WebP", description: "Modern format", color: "purple" },
    { id: "svg", name: "SVG", description: "Vector format", color: "orange" },
  ];

  const pageOptions = [
    { id: "all", label: "All Pages" },
    { id: "range", label: "Page Range" },
    { id: "single", label: "Single Page" },
    { id: "even", label: "Even Pages" },
    { id: "odd", label: "Odd Pages" },
  ];

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile({
      id: Date.now(),
      file: selectedFile,
      name: selectedFile.name,
      size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
      type: selectedFile.type,
      uploadedAt: new Date().toLocaleTimeString(),
    });

    setConvertedImages([]);
  };

  const convertToImages = () => {
    if (!file) {
      alert("Please upload a PDF file first");
      return;
    }

    setProcessing(true);

    // Calculate number of images to generate
    let pageCount;
    switch (selectedPages) {
      case "all":
        pageCount = totalPages;
        break;
      case "range":
        pageCount = 5; // Example range
        break;
      case "single":
        pageCount = 1;
        break;
      case "even":
      case "odd":
        pageCount = Math.floor(totalPages / 2);
        break;
      default:
        pageCount = totalPages;
    }

    setTimeout(() => {
      setProcessing(false);

      // Generate mock image data
      const images = Array.from({ length: pageCount }, (_, i) => ({
        id: i + 1,
        name: `${file.name.replace(".pdf", "")}_page${i + 1}.${imageFormat}`,
        format: imageFormat.toUpperCase(),
        size: (Math.random() * 2 + 0.5).toFixed(2) + " MB",
        dimensions: "2480x3508",
        quality: `${quality}%`,
        createdAt: new Date().toLocaleTimeString(),
      }));

      setConvertedImages(images);
      alert(
        "PDF converted to images successfully! In a real application, this would generate actual image files."
      );
    }, 2000);
  };

  const downloadImage = (image) => {
    alert(
      `Downloading ${image.name}... In a real application, this would download the actual image file.`
    );
  };

  const downloadAllAsZip = () => {
    alert(
      "Downloading all images as ZIP... In a real application, this would download a ZIP containing all converted images."
    );
  };

  const clearAll = () => {
    setFile(null);
    setConvertedImages([]);
  };

  const sampleImages = [
    { name: "document_page1.jpg", format: "JPG", size: "1.2 MB" },
    { name: "document_page2.jpg", format: "JPG", size: "1.1 MB" },
    { name: "document_page3.jpg", format: "JPG", size: "1.3 MB" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <FileImage className="w-10 h-10 text-blue-600" />
          PDF to Image Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Convert PDF pages to high-quality images (JPG, PNG, WebP, SVG).
          Extract pages as images.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          {/* File Upload */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Upload PDF
              </h2>
            </div>

            <div className="p-6">
              {file ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-red-600" />
                  </div>

                  <div className="mb-6">
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {file.name}
                    </div>
                    <div className="text-gray-600">
                      {file.size} • Uploaded {file.uploadedAt}
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() =>
                        document.getElementById("pdf-upload-image").click()
                      }
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                      Replace File
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
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Select PDF File
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choose a PDF file to convert to images
                  </p>

                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,application/pdf"
                    className="hidden"
                    id="pdf-upload-image"
                  />
                  <label
                    htmlFor="pdf-upload-image"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Choose PDF File
                  </label>

                  <p className="mt-4 text-sm text-gray-500">
                    Maximum file size: 50 MB
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
                {/* Image Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Output Format
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {imageFormats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => setImageFormat(format.id)}
                        className={`p-4 border rounded-xl text-left transition-all ${
                          imageFormat === format.id
                            ? `border-${format.color}-500 bg-${format.color}-50`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {format.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {format.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Pages to Convert
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {pageOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedPages(option.id)}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          selectedPages === option.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="font-medium text-gray-900">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {selectedPages === "range" && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          From Page
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={totalPages}
                          defaultValue="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          To Page
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={totalPages}
                          defaultValue={totalPages}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {selectedPages === "single" && (
                    <div className="mt-3">
                      <label className="block text-xs text-gray-600 mb-1">
                        Page Number
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        defaultValue="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Quality Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Image Quality
                    </label>
                    <span className="text-sm text-gray-600">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Smaller File</span>
                    <span>Better Quality</span>
                  </div>
                </div>

                {/* Convert Button */}
                <button
                  onClick={convertToImages}
                  disabled={!file || processing}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    file && !processing
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Converting to Images...
                    </div>
                  ) : (
                    "Convert PDF to Images"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Results */}
          {convertedImages.length > 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Converted Images ({convertedImages.length})
                  </h2>
                  <button
                    onClick={downloadAllAsZip}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download All as ZIP
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {convertedImages.map((image) => (
                    <div
                      key={image.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {image.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {image.dimensions} • {image.size} • Quality:{" "}
                            {image.quality}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => downloadImage(image)}
                          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Converted Images
                </h2>
              </div>

              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  No Images Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload a PDF file and convert it to see the images here.
                </p>

                {file && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg">
                    <Eye className="w-4 h-4" />
                    <span>Ready to convert {file.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Image Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Grid className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Image Preview
                </h2>
              </div>
            </div>

            <div className="p-6">
              {convertedImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {convertedImages.slice(0, 6).map((image) => (
                    <div
                      key={image.id}
                      className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-xs text-gray-600">
                          Page {image.id}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-700">
                      Image preview will appear here
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      After conversion
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sample Output */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sample Output
            </h3>
            <div className="space-y-3">
              {sampleImages.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {image.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {image.format} • {image.size}
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
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <ImageIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Formats
          </h3>
          <p className="text-gray-600">
            Convert to JPG, PNG, WebP, or SVG formats. Choose the best format
            for your needs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Custom Settings
          </h3>
          <p className="text-gray-600">
            Adjust quality, select specific pages, and choose output dimensions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Batch Download
          </h3>
          <p className="text-gray-600">
            Download individual images or all images as a single ZIP archive.
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Web & Design</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Create website thumbnails from PDFs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Extract graphics for presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Prepare images for social media</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Document Management
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Create image archives of documents</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Extract signatures and stamps</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Prepare documents for OCR processing</span>
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

export default PDFToImage;
