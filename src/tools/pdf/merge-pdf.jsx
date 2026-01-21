import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FileText,
  Upload,
  X,
  ArrowUpDown,
  Trash2,
  Download,
  Copy,
  Check,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const PDFMerger = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [mergedFile, setMergedFile] = useState(null);
  const [fileName, setFileName] = useState("merged-document.pdf");
  const [showPreview, setShowPreview] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewPages, setPreviewPages] = useState([]);
  const [currentPreviewPage, setCurrentPreviewPage] = useState(1);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) {
      toast.error("No files selected");
      return;
    }

    // Check if all files are PDFs
    const invalidFiles = selectedFiles.filter(
      (file) => !file.type.includes("pdf")
    );
    if (invalidFiles.length > 0) {
      toast.error(
        `Some files are not PDFs: ${invalidFiles.map((f) => f.name).join(", ")}`
      );
      return;
    }

    // Check file sizes (50MB limit)
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > 50 * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      toast.error(
        `Some files exceed 50MB limit: ${oversizedFiles
          .map((f) => f.name)
          .join(", ")}`
      );
      return;
    }

    const newFiles = selectedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type,
      uploadedAt: new Date().toLocaleTimeString(),
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    toast.success(
      `Added ${newFiles.length} PDF${newFiles.length > 1 ? "s" : ""}`
    );

    // Simulate upload progress
    newFiles.forEach((fileItem) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          toast.info(`${fileItem.name} uploaded successfully`);
        }
        setUploadProgress((prev) => ({
          ...prev,
          [fileItem.id]: Math.min(progress, 100),
        }));
      }, 100);
    });
  };

  const removeFile = (id) => {
    const fileToRemove = files.find((f) => f.id === id);
    setFiles(files.filter((file) => file.id !== id));
    toast.info(`Removed ${fileToRemove?.name}`);
  };

  const moveFileUp = (index) => {
    if (index === 0) {
      toast.info("File is already at the top");
      return;
    }
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index - 1];
    newFiles[index - 1] = temp;
    setFiles(newFiles);
    toast.info(`Moved ${temp.name} up`);
  };

  const moveFileDown = (index) => {
    if (index === files.length - 1) {
      toast.info("File is already at the bottom");
      return;
    }
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + 1];
    newFiles[index + 1] = temp;
    setFiles(newFiles);
    toast.info(`Moved ${temp.name} down`);
  };

  const generatePreview = async () => {
    if (files.length === 0) {
      toast.warning("No files to preview");
      return;
    }

    if (files.length < 2) {
      toast.warning("Need at least 2 files for preview");
      return;
    }

    setShowPreview(true);

    // Generate sample preview pages based on file count
    const totalPages = files.length * 3;
    const pages = [];

    for (let i = 1; i <= Math.min(totalPages, 6); i++) {
      pages.push({
        number: i,
        content: `Page ${i} of ${totalPages}`,
        sourceFile: files[Math.floor((i - 1) / 3)].name,
        isCover: i === 1,
      });
    }

    setPreviewPages(pages);
    setCurrentPreviewPage(1);
    toast.info("Preview generated. Showing first 6 pages.");
  };

  const mergePDFs = () => {
    if (files.length < 2) {
      toast.error("Please upload at least 2 PDF files to merge");
      return;
    }

    setProcessing(true);
    setMergedFile(null);

    // Show processing notification
    const processingToast = toast.info("Merging PDF files...", {
      autoClose: false,
    });

    // Simulate PDF merging process
    setTimeout(() => {
      setProcessing(false);
      toast.dismiss(processingToast);

      const mergedFileData = {
        name: fileName,
        size:
          files
            .reduce((sum, file) => sum + parseFloat(file.size), 0)
            .toFixed(2) + " MB",
        pages: files.length * 3, // Simulated page count
        mergedAt: new Date().toLocaleTimeString(),
        totalFiles: files.length,
      };

      setMergedFile(mergedFileData);

      // Generate preview for merged document
      const pages = [];
      for (let i = 1; i <= Math.min(mergedFileData.pages, 8); i++) {
        pages.push({
          number: i,
          content: `Page ${i} of ${mergedFileData.pages}`,
          sourceFile: files[Math.floor((i - 1) / 3)].name,
          isCover: i === 1,
        });
      }
      setPreviewPages(pages);

      toast.success(
        `Successfully merged ${files.length} PDF${
          files.length > 1 ? "s" : ""
        }! ${mergedFileData.pages} total pages.`
      );
    }, 2000);
  };

  const downloadMergedFile = () => {
    if (!mergedFile) {
      toast.error("No merged file available");
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
<< /Length 44 >>
stream
BT /F1 12 Tf 72 720 Td (Merged PDF Document) Tj ET
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
    link.download = mergedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Downloading ${mergedFile.name}...`);
  };

  const clearAll = () => {
    if (files.length === 0 && !mergedFile) {
      toast.info("No files to clear");
      return;
    }

    setFiles([]);
    setMergedFile(null);
    setUploadProgress({});
    setPreviewPages([]);
    setShowPreview(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast.info("All files cleared");
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

  const nextPreviewPage = () => {
    if (currentPreviewPage < previewPages.length) {
      setCurrentPreviewPage((prev) => prev + 1);
    } else {
      toast.info("You have reached the last preview page");
    }
  };

  const prevPreviewPage = () => {
    if (currentPreviewPage > 1) {
      setCurrentPreviewPage((prev) => prev - 1);
    } else {
      toast.info("You are on the first page");
    }
  };

  const sampleFiles = [
    { name: "document1.pdf", size: "2.5 MB" },
    { name: "report.pdf", size: "1.8 MB" },
    { name: "invoice.pdf", size: "0.9 MB" },
  ];

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOverItem = (e) => {
    e.preventDefault();
  };

  const handleDropItem = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (dragIndex !== dropIndex) {
      const newFiles = [...files];
      const [draggedItem] = newFiles.splice(dragIndex, 1);
      newFiles.splice(dropIndex, 0, draggedItem);
      setFiles(newFiles);
      toast.info(`Reordered ${draggedItem.name}`);
    }
  };

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
          <FileText className="w-10 h-10 text-blue-600" />
          PDF Merger
        </h1>
        <p className="text-gray-600 text-lg">
          Combine multiple PDF files into a single document. Reorder pages and
          customize output.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - File Upload & List */}
        <div className="space-y-6">
          {/* File Upload Area */}
          <div
            className="bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Upload PDF Files
              </h3>
              <p className="text-gray-600 mb-6">
                Drag & drop files or click to browse
              </p>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                multiple
                accept=".pdf,application/pdf"
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
              >
                <Upload className="w-5 h-5" />
                Select PDF Files
              </label>

              <p className="mt-4 text-sm text-gray-500">
                Maximum file size: 50 MB per file
              </p>
            </div>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Uploaded Files ({files.length})
                  </h3>
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {files.map((file, index) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOverItem}
                      onDrop={(e) => handleDropItem(e, index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 truncate max-w-xs">
                            {file.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {file.size} • Uploaded {file.uploadedAt}
                          </div>
                          {uploadProgress[file.id] < 100 && (
                            <div className="mt-2">
                              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 transition-all duration-300"
                                  style={{
                                    width: `${uploadProgress[file.id] || 0}%`,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {uploadProgress[file.id]?.toFixed(0) || 0}%
                                uploaded
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveFileUp(index)}
                          disabled={index === 0}
                          className={`p-2 rounded-lg ${
                            index === 0
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          title="Move up"
                        >
                          <ArrowUpDown className="w-5 h-5 rotate-90" />
                        </button>
                        <button
                          onClick={() => moveFileDown(index)}
                          disabled={index === files.length - 1}
                          className={`p-2 rounded-lg ${
                            index === files.length - 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          title="Move down"
                        >
                          <ArrowUpDown className="w-5 h-5 -rotate-90" />
                        </button>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Remove file"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sample Files */}
          {files.length === 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sample Files (Demo)
              </h3>
              <div className="space-y-3">
                {sampleFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {file.name}
                      </div>
                      <div className="text-sm text-gray-600">{file.size}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Upload your own PDF files or use the sample button to test the
                merger
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Merge Controls & Preview */}
        <div className="space-y-6">
          {/* Merge Controls */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Merge Settings
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* File Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Output File Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="merged-document.pdf"
                    />
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Preview Button */}
                <button
                  onClick={generatePreview}
                  disabled={files.length < 2}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    files.length >= 2
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Eye className="inline w-5 h-5 mr-2" />
                  Generate Preview
                </button>

                {/* Merge Button */}
                <div className="pt-2">
                  <button
                    onClick={mergePDFs}
                    disabled={files.length < 2 || processing}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                      files.length >= 2 && !processing
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {processing ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Merging PDFs...
                      </div>
                    ) : (
                      `Merge ${files.length} PDF${
                        files.length !== 1 ? "s" : ""
                      }`
                    )}
                  </button>

                  {files.length < 2 && (
                    <p className="mt-3 text-sm text-red-600 text-center">
                      Need at least 2 PDF files to merge
                    </p>
                  )}
                </div>

                {/* Preview Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {showPreview ? (
                      <Eye className="w-5 h-5 text-blue-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-600" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        Preview Mode
                      </div>
                      <div className="text-sm text-gray-600">
                        Show merged document preview
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowPreview(!showPreview);
                      if (
                        !showPreview &&
                        !previewPages.length &&
                        files.length >= 2
                      ) {
                        generatePreview();
                      }
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      showPreview ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        showPreview ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Merged Result */}
          {mergedFile && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Merged Document
                  </h3>
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Ready</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-300 mb-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {mergedFile.name}
                    </div>
                    <div className="text-gray-600">
                      Merged at {mergedFile.mergedAt}
                    </div>
                  </div>
                </div>

                {/* File Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">File Size</div>
                    <div className="text-xl font-bold text-gray-900">
                      {mergedFile.size}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      Total Pages
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {mergedFile.pages}
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadMergedFile}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Merged PDF
                </button>
              </div>
            </div>
          )}

          {/* Preview Panel */}
          {showPreview && previewPages.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Document Preview
                  </h3>
                  <div className="text-sm text-gray-600">
                    Page {currentPreviewPage} of {previewPages.length}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* PDF Page Preview */}
                <div className="aspect-[1/1.414] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300 p-8 mb-4 relative overflow-hidden">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {previewPages[currentPreviewPage - 1]?.isCover
                      ? "COVER PAGE"
                      : `PAGE ${previewPages[currentPreviewPage - 1]?.number}`}
                  </div>

                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <div className="text-center mb-6">
                      <FileText className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        {previewPages[currentPreviewPage - 1]?.content}
                      </div>
                      <div className="text-gray-600">
                        {previewPages[currentPreviewPage - 1]?.isCover
                          ? "This is the cover page of your merged document"
                          : `Content from: ${
                              previewPages[currentPreviewPage - 1]?.sourceFile
                            }`}
                      </div>
                    </div>

                    {/* Simulated content lines */}
                    <div className="w-full max-w-md space-y-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-2 bg-gray-200 rounded animate-pulse"
                          style={{ animationDelay: `${i * 100}ms` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Watermark */}
                  <div className="absolute bottom-4 right-4 text-gray-300 text-sm">
                    Generated Preview
                  </div>
                </div>

                {/* Page Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={prevPreviewPage}
                    disabled={currentPreviewPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPreviewPage === 1
                        ? "bg-gray-100 text-gray-400"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {previewPages.map((page, index) => (
                      <button
                        key={page.number}
                        onClick={() => setCurrentPreviewPage(index + 1)}
                        className={`w-8 h-10 rounded flex items-center justify-center text-sm ${
                          currentPreviewPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                        }`}
                      >
                        {page.number}
                      </button>
                    ))}
                    {mergedFile?.pages > previewPages.length && (
                      <div className="w-8 h-10 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-400">
                        ...
                      </div>
                    )}
                  </div>

                  <button
                    onClick={nextPreviewPage}
                    disabled={currentPreviewPage === previewPages.length}
                    className={`px-4 py-2 rounded-lg ${
                      currentPreviewPage === previewPages.length
                        ? "bg-gray-100 text-gray-400"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    Next
                  </button>
                </div>

                {/* Page Info */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Current Page: {currentPreviewPage}</span>
                    <span>
                      Total Pages: {mergedFile?.pages || previewPages.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Security & Privacy
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>All processing happens locally in your browser</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>No files are uploaded to any server</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Your documents remain private and secure</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Easy Upload
          </h3>
          <p className="text-gray-600">
            Upload multiple PDF files at once with drag & drop support. No file
            size limits.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <ArrowUpDown className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Flexible Ordering
          </h3>
          <p className="text-gray-600">
            Reorder files to control the sequence of pages in the final merged
            document.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Secure Processing
          </h3>
          <p className="text-gray-600">
            All processing happens locally in your browser. Your files never
            leave your computer.
          </p>
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

export default PDFMerger;
