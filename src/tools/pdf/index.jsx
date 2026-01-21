import PDFMerger from "./merge-pdf.jsx";
import PDFSplitter from "./split-pdf.jsx";
import PDFCompressor from "./compress-pdf.jsx";
import PDFToImage from "./pdf-to-image.jsx";
import PDFToWord from "./pdf-to-word.jsx";

const PlaceholderComponent = ({ name }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
    <p className="text-gray-600 text-lg mb-8">This tool is under development</p>
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
      <div className="text-3xl font-bold text-gray-400">Coming Soon</div>
    </div>
  </div>
);

export const pdfTools = [
  {
    id: "merge-pdf",
    name: "Merge PDF",
    component: PDFMerger,
    description: "Combine multiple PDF files into one",
    icon: "FileText",
    tags: ["pdf", "merge", "document"],
    color: "red",
    popular: true,
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    component: PDFSplitter,
    description: "Split PDF files into multiple documents",
    icon: "Scissors",
    tags: ["pdf", "split", "document"],
    color: "orange",
    popular: true,
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    component: PDFCompressor,
    description: "Reduce PDF file size while maintaining quality",
    icon: "Zip",
    tags: ["pdf", "compress", "optimize"],
    color: "blue",
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    component: PDFToWord,
    description: "Convert PDF documents to editable Word format",
    icon: "FileText",
    tags: ["pdf", "word", "convert", "document"],
    color: "green",
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    component: PDFToImage,
    description: "Convert PDF pages to image files (JPG, PNG)",
    icon: "Image",
    tags: ["pdf", "image", "convert"],
    color: "purple",
  },
];

export { PDFMerger, PDFSplitter, PDFCompressor, PDFToImage, PDFToWord };
