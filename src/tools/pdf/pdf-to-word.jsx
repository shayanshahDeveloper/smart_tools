import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FileText,
  Upload,
  Download,
  FileEdit,
  Settings,
  Check,
  Eye,
  Type,
  Layout,
  Trash2,
  Copy,
} from "lucide-react";

const PDFToWord = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [format, setFormat] = useState("docx");
  const [preserveLayout, setPreserveLayout] = useState(true);
  const [extractImages, setExtractImages] = useState(true);
  
  const fileInputRef = useRef(null);

  const formats = [
    {
      id: "docx",
      name: "DOCX",
      description: "Microsoft Word (Modern)",
      color: "blue",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
    },
    {
      id: "doc",
      name: "DOC",
      description: "Microsoft Word (Legacy)",
      color: "green",
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
    },
    {
      id: "odt",
      name: "ODT",
      description: "OpenDocument Text",
      color: "purple",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
    },
    {
      id: "rtf",
      name: "RTF",
      description: "Rich Text Format",
      color: "orange",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
    },
  ];

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    if (!selectedFile.type.includes('pdf')) {
      toast.error("Please upload a PDF file");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error("File size exceeds 50MB limit");
      return;
    }

    const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
    const pageCount = Math.floor(Math.random() * 20) + 5; // Simulated page count

    setFile({
      id: Date.now(),
      file: selectedFile,
      name: selectedFile.name,
      size: fileSizeMB + " MB",
      pages: pageCount,
      uploadedAt: new Date().toLocaleTimeString(),
    });

    setConvertedFile(null);
    
    toast.success(`PDF uploaded: ${selectedFile.name} (${fileSizeMB} MB, ${pageCount} pages)`);
  };

  const convertToWord = () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }

    setProcessing(true);
    const processingToast = toast.info("Converting PDF to Word format...", {
      autoClose: false
    });

    setTimeout(() => {
      setProcessing(false);
      toast.dismiss(processingToast);

      const selectedFormat = formats.find(f => f.id === format);
      const convertedFileSize = (parseFloat(file.size.replace(" MB", "")) * 0.8).toFixed(2);
      
      const convertedFileObj = {
        name: file.name.replace(".pdf", `_converted.${format}`),
        format: format.toUpperCase(),
        size: convertedFileSize + " MB",
        pages: file.pages,
        layoutPreserved: preserveLayout,
        imagesExtracted: extractImages,
        createdAt: new Date().toLocaleTimeString(),
        originalName: file.name,
        formatDetails: selectedFormat
      };

      setConvertedFile(convertedFileObj);
      
      toast.success(`PDF converted to ${selectedFormat.name} successfully!`);
    }, 3000);
  };

  const downloadConvertedFile = () => {
    if (!convertedFile) {
      toast.error("No converted file available");
      return;
    }

    // Create a simulated document file for download
    let fileContent = "";
    let mimeType = "";
    let fileExtension = "";
    
    switch (format) {
      case "docx":
        fileContent = `Microsoft Word Document
Title: ${convertedFile.name}
Converted from: ${file.name}
Pages: ${convertedFile.pages}
Format: ${convertedFile.format}
Layout Preserved: ${convertedFile.layoutPreserved ? "Yes" : "No"}
Images Extracted: ${convertedFile.imagesExtracted ? "Yes" : "No"}
Converted: ${convertedFile.createdAt}

This is a simulated DOCX file. In a real application,
this would be an actual Microsoft Word document.`;
        mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        fileExtension = "docx";
        break;
        
      case "doc":
        fileContent = `Microsoft Word Document (Legacy)
Title: ${convertedFile.name}
Converted from: ${file.name}
Pages: ${convertedFile.pages}
Format: ${convertedFile.format}
Converted: ${convertedFile.createdAt}

This is a simulated DOC file.`;
        mimeType = "application/msword";
        fileExtension = "doc";
        break;
        
      case "odt":
        fileContent = `OpenDocument Text
Title: ${convertedFile.name}
Converted from: ${file.name}
Pages: ${convertedFile.pages}
Format: ${convertedFile.format}
Converted: ${convertedFile.createdAt}

This is a simulated ODT file.`;
        mimeType = "application/vnd.oasis.opendocument.text";
        fileExtension = "odt";
        break;
        
      case "rtf":
        fileContent = `{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1033
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
{\\*\\generator Msftedit 5.41.21.2510;}\\viewkind4\\uc1\\pard\\f0\\fs20 
\\b PDF to Word Conversion Result\\b0\\par
\\par
Title: ${convertedFile.name}\\par
Converted from: ${file.name}\\par
Pages: ${convertedFile.pages}\\par
Format: ${convertedFile.format}\\par
Layout Preserved: ${convertedFile.layoutPreserved ? "Yes" : "No"}\\par
Images Extracted: ${convertedFile.imagesExtracted ? "Yes" : "No"}\\par
Converted: ${convertedFile.createdAt}\\par
\\par
This is a simulated RTF file created by PDF to Word converter.\\par
}`;
        mimeType = "application/rtf";
        fileExtension = "rtf";
        break;
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = convertedFile.name.endsWith(`.${fileExtension}`) 
      ? convertedFile.name 
      : `${convertedFile.name}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Downloading ${convertedFile.name}...`);
  };

  const clearAll = () => {
    if (!file && !convertedFile) {
      toast.info("Nothing to clear");
      return;
    }
    
    setFile(null);
    setConvertedFile(null);
    setFormat("docx");
    setPreserveLayout(true);
    setExtractImages(true);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    const fileName = file ? file.name : "PDF file";
    toast.info(`Cleared ${fileName} and all results`);
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
          files: droppedFiles
        }
      };
      handleFileUpload(event);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("File information copied to clipboard");
  };

  const sampleDocuments = [
    { name: "report.docx", format: "DOCX", size: "2.1 MB", pages: 15 },
    { name: "contract.doc", format: "DOC", size: "1.8 MB", pages: 8 },
    { name: "article.odt", format: "ODT", size: "1.5 MB", pages: 12 },
  ];

  const currentFormat = formats.find(f => f.id === format);

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
          <FileEdit className="w-10 h-10 text-blue-600" />
          PDF to Word Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Convert PDF documents to editable Word format. Preserve formatting and
          extract text accurately.
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
                      {file.size} • {file.pages} pages • Uploaded{" "}
                      {file.uploadedAt}
                    </div>
                    <div className="mt-2 text-sm text-blue-600">
                      Ready for conversion
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
                      onClick={() => copyToClipboard(`${file.name} - ${file.size} - ${file.pages} pages`)}
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
                    id="pdf-upload-word"
                  />
                  <label
                    htmlFor="pdf-upload-word"
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
                {/* Output Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Output Format
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {formats.map((formatItem) => (
                      <button
                        key={formatItem.id}
                        onClick={() => {
                          setFormat(formatItem.id);
                          toast.info(`Selected: ${formatItem.name}`);
                        }}
                        className={`p-4 border rounded-xl text-left transition-all ${
                          format === formatItem.id
                            ? `${formatItem.borderColor} border-2 ${formatItem.bgColor}`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900 flex items-center justify-between">
                          {formatItem.name}
                          {format === formatItem.id && (
                            <Check className={`w-4 h-4 ${formatItem.iconColor}`} />
                          )}
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
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <Layout className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Preserve Layout
                        </div>
                        <div className="text-sm text-gray-600">
                          Keep original formatting and structure
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPreserveLayout(!preserveLayout);
                        toast.info(`Layout preservation ${!preserveLayout ? 'enabled' : 'disabled'}`);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        preserveLayout ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preserveLayout ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileEdit className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Extract Images
                        </div>
                        <div className="text-sm text-gray-600">
                          Include images in the Word document
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setExtractImages(!extractImages);
                        toast.info(`Image extraction ${!extractImages ? 'enabled' : 'disabled'}`);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        extractImages ? "bg-green-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          extractImages ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Current Settings */}
                {file && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-center text-sm">
                      <div className="text-gray-600 mb-1">Current Settings:</div>
                      <div className="font-medium text-gray-900">
                        {currentFormat.name} • Layout: {preserveLayout ? 'Preserved' : 'Basic'} • Images: {extractImages ? 'Included' : 'Text Only'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Convert Button */}
                <button
                  onClick={convertToWord}
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
                      Converting to {currentFormat.name}...
                    </div>
                  ) : (
                    `Convert PDF to ${currentFormat.name}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Preview */}
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
                    <div className={`w-16 h-16 ${currentFormat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <FileEdit className={`w-8 h-8 ${currentFormat.iconColor}`} />
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2 truncate">
                      {convertedFile.name}
                    </div>
                    <div className="text-gray-600">
                      Converted at {convertedFile.createdAt}
                    </div>
                    <div className="mt-2 text-sm text-blue-600">
                      Format: {convertedFile.format}
                    </div>
                  </div>
                </div>

                {/* File Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">File Size</div>
                    <div className="text-xl font-bold text-blue-600">
                      {convertedFile.size}
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${currentFormat.bgColor}`}>
                    <div className="text-sm text-gray-600 mb-1">Format</div>
                    <div className={`text-xl font-bold ${currentFormat.iconColor}`}>
                      {convertedFile.format}
                    </div>
                  </div>
                </div>

                {/* Conversion Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Pages Converted</span>
                    <span className="font-medium text-gray-900">
                      {convertedFile.pages}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Layout Preserved</span>
                    <span
                      className={`font-medium ${
                        convertedFile.layoutPreserved
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {convertedFile.layoutPreserved ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Images Extracted</span>
                    <span
                      className={`font-medium ${
                        convertedFile.imagesExtracted
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {convertedFile.imagesExtracted ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadConvertedFile}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download {currentFormat.name} Document
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={clearAll}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Convert another file
                  </button>
                </div>
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
                  <FileEdit className="w-10 h-10 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {file ? "Ready to Convert" : "No Results Yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {file 
                    ? `Uploaded ${file.name} (${file.size})`
                    : "Upload a PDF file and convert it to see the Word document here."}
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

          {/* Enhanced Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Document Preview
                </h2>
                {file && (
                  <div className="ml-auto text-sm text-gray-600">
                    Output: {currentFormat.name}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="aspect-[1/1.414] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300 p-8">
                <div className="h-full flex flex-col items-center justify-center">
                  {file ? (
                    <>
                      <FileEdit className={`w-16 h-16 ${currentFormat.iconColor} mb-4`} />
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-700 mb-2">
                          {convertedFile ? "Converted Document" : "Conversion Preview"}
                        </div>
                        <p className="text-gray-600 mb-4">
                          {currentFormat.description}
                        </p>
                        
                        {/* Simulated document content */}
                        <div className="w-full max-w-md space-y-3 mx-auto">
                          <div className="h-3 bg-gray-300 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-300 rounded animate-pulse" style={{animationDelay: '100ms'}}></div>
                          <div className="h-3 bg-gray-300 rounded animate-pulse" style={{animationDelay: '200ms'}}></div>
                          
                          {/* Settings indicator */}
                          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-900 mb-2">
                              Conversion Settings:
                            </div>
                            <div className="space-y-2 text-xs text-gray-600">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${currentFormat.iconColor.replace('text-', 'bg-')}`}></div>
                                <span>Format: {currentFormat.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${preserveLayout ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                <span>Layout: {preserveLayout ? 'Preserved' : 'Basic'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${extractImages ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span>Images: {extractImages ? 'Included' : 'Text Only'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <FileEdit className="w-16 h-16 text-gray-300 mb-4" />
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-400 mb-2">
                          No Document Loaded
                        </div>
                        <p className="text-gray-500">
                          Upload a PDF to see conversion preview
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Output */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sample Output Formats
            </h3>
            <div className="space-y-3">
              {sampleDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-colors"
                >
                  <div
                    className={`w-10 h-10 ${formats[index % formats.length].bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <FileEdit
                      className={`w-5 h-5 ${formats[index % formats.length].iconColor}`}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{doc.name}</div>
                    <div className="text-sm text-gray-600">
                      {doc.format} • {doc.size} • {doc.pages} pages
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
            <FileEdit className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Accurate Conversion
          </h3>
          <p className="text-gray-600">
            Maintain text formatting, fonts, and layout from the original PDF
            document.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Layout className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Format Preservation
          </h3>
          <p className="text-gray-600">
            Keep tables, columns, headers, and footers intact during conversion.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Type className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Editable Text
          </h3>
          <p className="text-gray-600">
            Convert scanned PDFs to searchable and editable text with OCR
            technology.
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
              Business & Legal
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Edit contracts and legal documents</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Update reports and proposals</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Modify invoices and statements</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Academic & Research
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Edit research papers and articles</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Update thesis and dissertations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Modify educational materials</span>
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

export default PDFToWord;