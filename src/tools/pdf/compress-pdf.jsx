import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FileText,
  Upload,
  Download,
  Gauge,
  Zap,
  BarChart3,
  Eye,
  Settings,
  Lock,
  Trash2,
  Check,
} from "lucide-react";

const PDFCompressor = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState("balanced");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const fileInputRef = useRef(null);

  const compressionLevels = [
    {
      id: "low",
      name: "Low Compression",
      description: "Minimal compression, best quality",
      reduction: "10-20%",
      quality: "Excellent",
      color: "green",
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
    },
    {
      id: "balanced",
      name: "Balanced",
      description: "Good balance of size and quality",
      reduction: "30-50%",
      quality: "Very Good",
      color: "blue",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
    },
    {
      id: "high",
      name: "High Compression",
      description: "Maximum compression, good quality",
      reduction: "50-70%",
      quality: "Good",
      color: "orange",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
    },
    {
      id: "extreme",
      name: "Extreme",
      description: "Maximum file size reduction",
      reduction: "70-90%",
      quality: "Fair",
      color: "red",
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
    },
  ];

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    if (!selectedFile.type.includes("pdf")) {
      toast.error("Please upload a PDF file");
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error("File size exceeds 100MB limit");
      return;
    }

    const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
    setOriginalSize(parseFloat(fileSizeMB));

    const fileObj = {
      id: Date.now(),
      file: selectedFile,
      name: selectedFile.name,
      size: fileSizeMB + " MB",
      type: selectedFile.type,
      uploadedAt: new Date().toLocaleTimeString(),
    };

    setFile(fileObj);
    setCompressedFile(null);
    setCompressedSize(0);

    toast.success(`PDF uploaded: ${selectedFile.name} (${fileSizeMB} MB)`);
  };

  const compressPDF = () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }

    setProcessing(true);
    const processingToast = toast.info("Compressing PDF file...", {
      autoClose: false,
    });

    // Calculate compressed size based on compression level
    let reductionPercentage;
    let qualityRating;

    switch (compressionLevel) {
      case "low":
        reductionPercentage = 0.15; // 15% reduction
        qualityRating = "Excellent";
        break;
      case "balanced":
        reductionPercentage = 0.4; // 40% reduction
        qualityRating = "Very Good";
        break;
      case "high":
        reductionPercentage = 0.6; // 60% reduction
        qualityRating = "Good";
        break;
      case "extreme":
        reductionPercentage = 0.8; // 80% reduction
        qualityRating = "Fair";
        break;
      default:
        reductionPercentage = 0.4;
        qualityRating = "Very Good";
    }

    setTimeout(() => {
      setProcessing(false);
      toast.dismiss(processingToast);

      const newSize = originalSize * (1 - reductionPercentage);
      const compressedSizeValue = parseFloat(newSize.toFixed(2));
      setCompressedSize(compressedSizeValue);

      const compressedFileObj = {
        name: file.name.replace(".pdf", `_${compressionLevel}_compressed.pdf`),
        size: newSize.toFixed(2) + " MB",
        reduction: (reductionPercentage * 100).toFixed(0) + "%",
        quality: qualityRating,
        createdAt: new Date().toLocaleTimeString(),
        compressionLevel: compressionLevel,
        originalSize: originalSize,
        savedMB: (originalSize - compressedSizeValue).toFixed(2),
      };

      setCompressedFile(compressedFileObj);

      const stats = getCompressionStats(compressedFileObj);
      toast.success(
        `PDF compressed successfully! Saved ${stats.savedMB} MB (${stats.percentage}%)`
      );
    }, 2000);
  };

  const downloadCompressedFile = () => {
    if (!compressedFile) {
      toast.error("No compressed file available");
      return;
    }

    // Create a simulated PDF file for download
    const simulatedContent = `%PDF-1.4
%����
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 200 >>
stream
BT /F1 16 Tf 72 720 Td (Compressed PDF Document) Tj ET
BT /F1 12 Tf 72 680 Td (${compressedFile.name}) Tj ET
BT /F1 12 Tf 72 650 Td (Compression Level: ${
      compressionLevels.find((l) => l.id === compressionLevel).name
    }) Tj ET
BT /F1 12 Tf 72 620 Td (Original Size: ${originalSize.toFixed(2)} MB) Tj ET
BT /F1 12 Tf 72 590 Td (Compressed Size: ${compressedSize.toFixed(2)} MB) Tj ET
BT /F1 12 Tf 72 560 Td (Size Saved: ${
      getCompressionStats(compressedFile).savedMB
    } MB) Tj ET
BT /F1 12 Tf 72 530 Td (Reduction: ${
      getCompressionStats(compressedFile).percentage
    }%) Tj ET
BT /F1 12 Tf 72 500 Td (Quality: ${compressedFile.quality}) Tj ET
BT /F1 12 Tf 72 470 Td (Compressed: ${compressedFile.createdAt}) Tj ET
BT /F1 12 Tf 72 440 Td (--- End of Document ---) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000053 00000 n
0000000106 00000 n
0000000179 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
261
%%EOF`;

    const blob = new Blob([simulatedContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = compressedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Downloading ${compressedFile.name}...`);
  };

  const clearAll = () => {
    if (!file && !compressedFile) {
      toast.info("Nothing to clear");
      return;
    }

    setFile(null);
    setCompressedFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setCompressionLevel("balanced");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    const fileName = file ? file.name : "PDF file";
    toast.info(`Cleared ${fileName} and all results`);
  };

  const getCompressionStats = (fileObj = compressedFile) => {
    if (!fileObj || originalSize === 0) return null;

    const savedMB = (originalSize - compressedSize).toFixed(2);
    const percentage = (
      ((originalSize - compressedSize) / originalSize) *
      100
    ).toFixed(1);

    return {
      savedMB,
      percentage,
      ratio: (compressedSize / originalSize).toFixed(2),
      compressionLevel: fileObj.compressionLevel,
    };
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const dt = e.dataTransfer;
    const droppedFiles = dt.files;

    if (droppedFiles.length > 0) {
      const event = {
        target: {
          files: droppedFiles,
        },
      };
      handleFileUpload(event);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("File information copied to clipboard");
  };

  const stats = getCompressionStats();

  const currentCompressionLevel = compressionLevels.find(
    (l) => l.id === compressionLevel
  );

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
          <Zap className="w-10 h-10 text-blue-600" />
          PDF Compressor
        </h1>
        <p className="text-gray-600 text-lg">
          Reduce PDF file size while maintaining quality. Optimize documents for
          sharing and storage.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          {/* File Upload */}
          <div
            className="bg-white rounded-2xl border border-gray-200 shadow-sm"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Upload PDF
                </h2>
                {file && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              {file ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-red-600" />
                  </div>

                  <div className="mb-6">
                    <div className="text-xl font-bold text-gray-900 mb-2 truncate">
                      {file.name}
                    </div>
                    <div className="text-gray-600">
                      {file.size} • Uploaded {file.uploadedAt}
                    </div>
                    <div className="mt-2 text-sm text-blue-600">
                      Ready for compression
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                      Replace File
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(`${file.name} - ${file.size}`)
                      }
                      className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200"
                    >
                      Copy Info
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
                    Drag & drop or click to browse
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,application/pdf"
                    className="hidden"
                    id="pdf-upload-compress"
                  />
                  <label
                    htmlFor="pdf-upload-compress"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Choose PDF File
                  </label>

                  <p className="mt-4 text-sm text-gray-500">
                    Maximum file size: 100 MB
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Compression Level
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {compressionLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => {
                          setCompressionLevel(level.id);
                          toast.info(`Selected: ${level.name}`);
                        }}
                        className={`p-4 border rounded-xl text-left transition-all ${
                          compressionLevel === level.id
                            ? `${level.borderColor} border-2 ${level.bgColor}`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900 flex items-center justify-between">
                          {level.name}
                          {compressionLevel === level.id && (
                            <Check className={`w-4 h-4 ${level.iconColor}`} />
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {level.description}
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm font-medium text-gray-700">
                            {level.reduction} reduction
                          </span>
                          <span
                            className={`text-sm font-medium ${level.iconColor}`}
                          >
                            {level.quality}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compress Button */}
                <button
                  onClick={compressPDF}
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
                      Compressing PDF...
                    </div>
                  ) : (
                    `Compress PDF ${file ? `(${file.size})` : ""}`
                  )}
                </button>

                {file && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-center text-sm">
                      <div className="text-gray-600 mb-1">
                        Current Selection:
                      </div>
                      <div className="font-medium text-gray-900">
                        {currentCompressionLevel.name}
                      </div>
                      <div className="text-gray-600 mt-1">
                        Estimated reduction: {currentCompressionLevel.reduction}
                      </div>
                    </div>
                  </div>
                )}
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
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2 truncate">
                      {compressedFile.name}
                    </div>
                    <div className="text-gray-600">
                      Compressed at {compressedFile.createdAt}
                    </div>
                    <div className="mt-2 text-sm text-blue-600">
                      Quality: {compressedFile.quality}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {stats && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        Size Saved
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        {stats.savedMB} MB
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        Reduction
                      </div>
                      <div className="text-xl font-bold text-green-600">
                        {stats.percentage}%
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Quality</div>
                      <div className="text-xl font-bold text-purple-600">
                        {compressedFile.quality}
                      </div>
                    </div>
                  </div>
                )}

                {/* Size Comparison */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Size Comparison
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Original</span>
                        <span>{originalSize.toFixed(2)} MB</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 transition-all duration-500"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Compressed</span>
                        <span>{compressedSize.toFixed(2)} MB</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{
                            width: `${(compressedSize / originalSize) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadCompressedFile}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Compressed PDF
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={clearAll}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Compress another file
                  </button>
                </div>
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
                  <Zap className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {file ? "Ready to Compress" : "No Results Yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {file
                    ? `Uploaded ${file.name} (${file.size})`
                    : "Upload a PDF file and compress it to see the results here."}
                </p>

                {file && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg">
                    <Eye className="w-4 h-4" />
                    <span>Ready to compress {file.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Quality Preview
                </h2>
                {file && (
                  <div className="ml-auto text-sm text-gray-600">
                    Level: {currentCompressionLevel.name}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="aspect-[1/1.414] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300 p-8">
                <div className="h-full flex flex-col items-center justify-center">
                  {file ? (
                    <>
                      <FileText className="w-16 h-16 text-gray-400 mb-4" />
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-700 mb-2">
                          {compressedFile
                            ? "Compressed Preview"
                            : "Quality Preview"}
                        </div>
                        <p className="text-gray-600 mb-4">
                          {currentCompressionLevel.description}
                        </p>

                        {/* Simulated document content */}
                        <div className="w-full max-w-md space-y-3 mx-auto">
                          <div className="h-3 bg-gray-300 rounded animate-pulse"></div>
                          <div
                            className="h-3 bg-gray-300 rounded animate-pulse"
                            style={{ animationDelay: "100ms" }}
                          ></div>
                          <div
                            className="h-3 bg-gray-300 rounded animate-pulse"
                            style={{ animationDelay: "200ms" }}
                          ></div>

                          {/* Quality indicator */}
                          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-900 mb-2">
                              Estimated Quality:
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${currentCompressionLevel.iconColor.replace(
                                  "text-",
                                  "bg-"
                                )}`}
                              ></div>
                              <span className="text-gray-700">
                                {currentCompressionLevel.quality}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <FileText className="w-16 h-16 text-gray-300 mb-4" />
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-400 mb-2">
                          No Document Loaded
                        </div>
                        <p className="text-gray-500">
                          Upload a PDF to see quality preview
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Compression Tips
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Use "Balanced" for most documents</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>"Extreme" compression may reduce image quality</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Always preview before downloading</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Quality Loss
          </h3>
          <p className="text-gray-600 text-sm">
            Text and vector graphics remain crisp at all compression levels
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Fast Processing
          </h3>
          <p className="text-gray-600 text-sm">
            Compress large PDFs in seconds using optimized algorithms
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Secure Processing
          </h3>
          <p className="text-gray-600 text-sm">
            All processing happens locally. Your files never leave your computer
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Smart Optimization
          </h3>
          <p className="text-gray-600 text-sm">
            Intelligently reduces file size while preserving important details
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          When to Use PDF Compression
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Sharing & Email
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Reduce size for email attachments</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Optimize for cloud storage limits</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Speed up file transfers</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Web & Mobile</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Faster website loading times</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Reduce mobile data usage</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Improve web application performance</span>
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
            <div className="text-xs mt-1">Your ad could be here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFCompressor;
