import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FileText,
  Upload,
  Scissors,
  Download,
  Copy,
  Check,
  Hash,
  Plus,
  Minus,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PDFSplitter = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [splitOptions, setSplitOptions] = useState("range");
  const [pageRanges, setPageRanges] = useState([{ from: 1, to: 1 }]);
  const [totalPages, setTotalPages] = useState(0);
  const [splitResults, setSplitResults] = useState([]);
  const [currentPreviewPage, setCurrentPreviewPage] = useState(1);
  const [previewPages, setPreviewPages] = useState([]);
  const [documentInfo, setDocumentInfo] = useState({
    title: "",
    author: "",
    subject: "",
    keywords: "",
  });

  const fileInputRef = useRef(null);

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

    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error("File size exceeds 50MB limit");
      return;
    }

    const fileObj = {
      id: Date.now(),
      file: selectedFile,
      name: selectedFile.name,
      size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
      type: selectedFile.type,
      uploadedAt: new Date().toLocaleTimeString(),
    };

    setFile(fileObj);

    // Simulate extracting document info and generating preview
    simulateDocumentAnalysis(selectedFile);

    // Reset split results when new file is uploaded
    setSplitResults([]);
    setSplitOptions("range");
    setPageRanges([{ from: 1, to: 1 }]);

    toast.success(`PDF uploaded: ${selectedFile.name}`);
  };

  const simulateDocumentAnalysis = (pdfFile) => {
    // Simulate extracting document properties
    setTotalPages(Math.max(10, Math.floor(Math.random() * 50) + 10)); // Random between 10-60 pages

    // Generate preview pages
    const pages = [];
    for (let i = 1; i <= Math.min(10, totalPages); i++) {
      pages.push({
        number: i,
        content: `Page ${i} Content Preview`,
        isCover: i === 1,
        source: pdfFile.name,
      });
    }
    setPreviewPages(pages);
    setCurrentPreviewPage(1);

    // Simulate document metadata extraction
    setDocumentInfo({
      title: pdfFile.name.replace(".pdf", ""),
      author: "Document Author",
      subject: "Sample Document",
      keywords: "pdf, split, document",
    });

    toast.info(`Document analyzed: ${pages.length} pages loaded for preview`);
  };

  const addPageRange = () => {
    if (pageRanges.length >= 10) {
      toast.warning("Maximum 10 page ranges allowed");
      return;
    }
    setPageRanges([...pageRanges, { from: totalPages, to: totalPages }]);
    toast.info("Added new page range");
  };

  const removePageRange = (index) => {
    if (pageRanges.length > 1) {
      const newRanges = [...pageRanges];
      const removedRange = newRanges.splice(index, 1);
      setPageRanges(newRanges);
      toast.info(
        `Removed page range ${removedRange[0].from}-${removedRange[0].to}`
      );
    }
  };

  const updatePageRange = (index, field, value) => {
    const newRanges = [...pageRanges];
    let numValue = parseInt(value) || 1;

    // Validate min/max
    if (numValue < 1) numValue = 1;
    if (numValue > totalPages) numValue = totalPages;

    newRanges[index][field] = numValue;

    // Ensure "from" is not greater than "to"
    if (field === "from" && numValue > newRanges[index].to) {
      newRanges[index].to = numValue;
    }
    if (field === "to" && numValue < newRanges[index].from) {
      newRanges[index].from = numValue;
    }

    setPageRanges(newRanges);
  };

  const validatePageRanges = () => {
    // Check for overlaps or gaps in ranges
    const sortedRanges = [...pageRanges].sort((a, b) => a.from - b.from);

    for (let i = 0; i < sortedRanges.length; i++) {
      if (sortedRanges[i].from > sortedRanges[i].to) {
        toast.error(`Range ${i + 1}: "From" cannot be greater than "To"`);
        return false;
      }

      if (i > 0 && sortedRanges[i].from <= sortedRanges[i - 1].to) {
        toast.warning(
          `Ranges ${i} and ${i + 1} overlap. Pages may be duplicated.`
        );
      }
    }

    return true;
  };

  const splitPDF = () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }

    if (splitOptions === "range" && !validatePageRanges()) {
      return;
    }

    setProcessing(true);
    const processingToast = toast.info("Splitting PDF document...", {
      autoClose: false,
    });

    // Simulate PDF splitting process
    setTimeout(() => {
      setProcessing(false);
      toast.dismiss(processingToast);

      let results = [];

      if (splitOptions === "range") {
        results = pageRanges.map((range, index) => ({
          id: index + 1,
          name: `${file.name.replace(".pdf", "")}_part${index + 1}.pdf`,
          pages: `${range.from}-${range.to}`,
          pageCount: range.to - range.from + 1,
          size:
            (
              (parseFloat(file.size.replace(" MB", "")) *
                (range.to - range.from + 1)) /
              totalPages
            ).toFixed(2) + " MB",
          createdAt: new Date().toLocaleTimeString(),
          downloadUrl: "#",
        }));
      } else if (splitOptions === "single") {
        results = Array.from({ length: totalPages }, (_, i) => ({
          id: i + 1,
          name: `${file.name.replace(".pdf", "")}_page${i + 1}.pdf`,
          pages: `${i + 1}`,
          pageCount: 1,
          size:
            (parseFloat(file.size.replace(" MB", "")) / totalPages).toFixed(2) +
            " MB",
          createdAt: new Date().toLocaleTimeString(),
          downloadUrl: "#",
        }));
      } else if (splitOptions === "evenodd") {
        results = [
          {
            id: 1,
            name: `${file.name.replace(".pdf", "")}_even_pages.pdf`,
            pages: "Even pages (2, 4, 6, ...)",
            pageCount: Math.floor(totalPages / 2),
            size:
              (parseFloat(file.size.replace(" MB", "")) * 0.5).toFixed(2) +
              " MB",
            createdAt: new Date().toLocaleTimeString(),
            downloadUrl: "#",
          },
          {
            id: 2,
            name: `${file.name.replace(".pdf", "")}_odd_pages.pdf`,
            pages: "Odd pages (1, 3, 5, ...)",
            pageCount: Math.ceil(totalPages / 2),
            size:
              (parseFloat(file.size.replace(" MB", "")) * 0.5).toFixed(2) +
              " MB",
            createdAt: new Date().toLocaleTimeString(),
            downloadUrl: "#",
          },
        ];
      }

      setSplitResults(results);

      // Generate preview for split results
      const resultPreviewPages = [];
      results.forEach((result, resultIndex) => {
        const pages = result.pages;
        resultPreviewPages.push({
          id: result.id,
          name: result.name,
          pages: result.pages,
          previewText: `Split Result ${resultIndex + 1}: ${pages} pages`,
        });
      });

      setPreviewPages(resultPreviewPages);

      toast.success(
        `PDF split into ${results.length} file${results.length > 1 ? "s" : ""}!`
      );
    }, 2000);
  };

  const downloadSplitFile = (result) => {
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
BT /F1 12 Tf 72 720 Td (${result.name}) Tj ET
BT /F1 12 Tf 72 680 Td (Pages: ${result.pages}) Tj ET
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
    link.download = result.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Downloading ${result.name}...`);
  };

  const downloadAll = () => {
    if (splitResults.length === 0) {
      toast.error("No files to download");
      return;
    }

    // Create a simulated ZIP file for download
    const zipContent = `This is a simulated ZIP file containing ${splitResults.length} PDF files.`;
    const blob = new Blob([zipContent], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "split_files.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Downloading ${splitResults.length} files as ZIP...`);
  };

  const clearAll = () => {
    if (!file && splitResults.length === 0) {
      toast.info("Nothing to clear");
      return;
    }

    setFile(null);
    setPageRanges([{ from: 1, to: 1 }]);
    setSplitResults([]);
    setTotalPages(0);
    setPreviewPages([]);
    setCurrentPreviewPage(1);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast.info("All files and settings cleared");
  };

  const nextPreviewPage = () => {
    if (currentPreviewPage < totalPages) {
      setCurrentPreviewPage((prev) => prev + 1);
    } else {
      toast.info("You have reached the last page");
    }
  };

  const prevPreviewPage = () => {
    if (currentPreviewPage > 1) {
      setCurrentPreviewPage((prev) => prev - 1);
    } else {
      toast.info("You are on the first page");
    }
  };

  const splitOptionsList = [
    {
      id: "range",
      label: "Custom Range",
      description: "Split by specific page ranges",
    },
    {
      id: "single",
      label: "Single Pages",
      description: "Extract each page as separate PDF",
    },
    {
      id: "evenodd",
      label: "Even/Odd Pages",
      description: "Split into even and odd pages",
    },
  ];

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
          <Scissors className="w-10 h-10 text-blue-600" />
          PDF Splitter
        </h1>
        <p className="text-gray-600 text-lg">
          Split PDF documents into multiple files by page range, single pages,
          or even/odd pages.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Upload & Options */}
        <div className="space-y-6">
          {/* File Upload */}
          <div
            className="bg-white rounded-2xl border border-gray-200 shadow-sm"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
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
                    <div className="text-xl font-bold text-gray-900 mb-2 truncate">
                      {file.name}
                    </div>
                    <div className="text-gray-600">
                      {file.size} • Uploaded {file.uploadedAt}
                    </div>
                    <div className="mt-2 text-sm text-blue-600">
                      {totalPages} pages • Ready to split
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
                    Drag & drop or click to browse
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,application/pdf"
                    className="hidden"
                    id="pdf-upload-split"
                  />
                  <label
                    htmlFor="pdf-upload-split"
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

          {/* Split Options */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Split Options
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Split Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Split Method
                  </label>
                  <div className="space-y-3">
                    {splitOptionsList.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                          splitOptions === option.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="splitOption"
                          value={option.id}
                          checked={splitOptions === option.id}
                          onChange={(e) => {
                            setSplitOptions(e.target.value);
                            toast.info(`Selected: ${option.label}`);
                          }}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {option.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Page Range Input (only for range option) */}
                {splitOptions === "range" && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Page Ranges
                      </label>
                      <button
                        onClick={addPageRange}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Range
                      </button>
                    </div>

                    <div className="space-y-3">
                      {pageRanges.map((range, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">
                                From
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={range.from}
                                  onChange={(e) =>
                                    updatePageRange(
                                      index,
                                      "from",
                                      e.target.value
                                    )
                                  }
                                  min="1"
                                  max={totalPages}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">
                                To
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={range.to}
                                  onChange={(e) =>
                                    updatePageRange(index, "to", e.target.value)
                                  }
                                  min="1"
                                  max={totalPages}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-5">
                            {pageRanges.length > 1 && (
                              <button
                                onClick={() => removePageRange(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      Total pages in document: {totalPages}
                    </div>
                  </div>
                )}

                {/* Page Count for single pages */}
                {splitOptions === "single" && file && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {totalPages}
                      </div>
                      <div className="text-gray-600">
                        Total pages to extract
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        Each page will be saved as a separate PDF file
                      </div>
                    </div>
                  </div>
                )}

                {/* Even/Odd Info */}
                {splitOptions === "evenodd" && file && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Hash className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Even/Odd Split
                        </div>
                        <div className="text-sm text-gray-600">
                          Will create two files:
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          • Even pages: {Math.floor(totalPages / 2)} pages
                          <br />• Odd pages: {Math.ceil(totalPages / 2)} pages
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Split Button */}
                <button
                  onClick={splitPDF}
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
                      Splitting PDF...
                    </div>
                  ) : (
                    `Split PDF Document (${totalPages} pages)`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Split Results */}
          {splitResults.length > 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Split Results ({splitResults.length})
                  </h2>
                  <button
                    onClick={downloadAll}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download All as ZIP
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {splitResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 truncate max-w-xs">
                            {result.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            Pages: {result.pages} • Size: {result.size}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Created: {result.createdAt}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(result.name);
                            toast.info(`Copied: ${result.name}`);
                          }}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Copy filename"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadSplitFile(result)}
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
                  Split Results
                </h2>
              </div>

              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scissors className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {file ? "Ready to Split" : "No Results Yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {file
                    ? `Uploaded ${file.name} with ${totalPages} pages`
                    : "Upload a PDF file and split it to see the results here."}
                </p>

                {file && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg">
                    <Eye className="w-4 h-4" />
                    <span>Ready to split {file.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Document Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Document Preview
                </h2>
                {file && (
                  <div className="text-sm text-gray-600">
                    Page {currentPreviewPage} of {totalPages}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="aspect-[1/1.414] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300 p-8 relative overflow-hidden">
                {file ? (
                  <>
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {currentPreviewPage === 1
                        ? "COVER PAGE"
                        : `PAGE ${currentPreviewPage}`}
                    </div>

                    <div className="h-full flex flex-col items-center justify-center p-8">
                      <FileText className="w-16 h-16 text-gray-400 mb-4" />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800 mb-2">
                          {splitResults.length > 0
                            ? `Split Result Preview`
                            : `Page ${currentPreviewPage} Preview`}
                        </div>
                        <div className="text-gray-600 mb-4">
                          {splitResults.length > 0
                            ? splitResults[
                                Math.min(
                                  currentPreviewPage - 1,
                                  splitResults.length - 1
                                )
                              ]?.previewText
                            : `Content preview for page ${currentPreviewPage}`}
                        </div>

                        {/* Simulated page content */}
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
                          <div
                            className="h-32 bg-gray-200 rounded mt-4 animate-pulse"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Document Info */}
                    <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                      {file.name}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-300 mb-4" />
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-400 mb-2">
                        No Document Loaded
                      </div>
                      <p className="text-gray-500">
                        Upload a PDF to see document preview
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {file && (
                <>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={prevPreviewPage}
                      disabled={currentPreviewPage === 1}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        currentPreviewPage === 1
                          ? "bg-gray-100 text-gray-400"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }).map(
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPreviewPage(pageNum)}
                              className={`w-8 h-10 rounded flex items-center justify-center text-sm ${
                                currentPreviewPage === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                      {totalPages > 5 && (
                        <>
                          <div className="w-8 h-10 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-400">
                            ...
                          </div>
                          <button
                            onClick={() => setCurrentPreviewPage(totalPages)}
                            className={`w-8 h-10 rounded flex items-center justify-center text-sm ${
                              currentPreviewPage === totalPages
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={nextPreviewPage}
                      disabled={currentPreviewPage === totalPages}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        currentPreviewPage === totalPages
                          ? "bg-gray-100 text-gray-400"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Document Information */}
                  {documentInfo.title && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-600">Title:</div>
                          <div className="font-medium truncate">
                            {documentInfo.title}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Total Pages:</div>
                          <div className="font-medium">{totalPages}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Split Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Use page ranges to extract specific sections</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Single page extraction is great for presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Even/odd split useful for double-sided printing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Scissors className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Split Modes
          </h3>
          <p className="text-gray-600">
            Choose from range-based, single-page, or even/odd splits to suit
            your needs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Hash className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Flexible Page Selection
          </h3>
          <p className="text-gray-600">
            Select any range of pages with easy-to-use controls. Add multiple
            ranges for complex splits.
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
            Download all split files as individual PDFs or as a single ZIP
            archive.
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
            <h3 className="font-semibold text-gray-900 mb-3">
              Business Documents
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Extract specific pages from contracts</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Separate invoices from statements</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Split multi-page reports</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Academic & Personal
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Extract chapters from ebooks</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Separate scanned document pages</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Create handouts from presentations</span>
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

export default PDFSplitter;
