import CompressImage from "./compress-image.jsx";
import ConvertFormat from "./convert-format.jsx";
import ResizeImage from "./resize-image.jsx";
import RemoveBackground from "./remove-background.jsx";
import ImageWatermark from "./image-watermark.jsx";

const PlaceholderComponent = ({ name }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
    <p className="text-gray-600 text-lg mb-8">This tool is under development</p>
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
      <div className="text-3xl font-bold text-gray-400">Coming Soon</div>
    </div>
  </div>
);

export const imageTools = [
  {
    id: "compress-image",
    name: "Compress Image",
    component: CompressImage,
    description: "Reduce image file size while maintaining quality",
    icon: "Compress",
    tags: ["image", "compress", "optimize"],
    color: "blue",
    popular: true,
  },
  {
    id: "convert-format",
    name: "Convert Format",
    component: ConvertFormat,
    description: "Convert images between JPG, PNG, WebP, GIF, BMP, ICO",
    icon: "RefreshCw",
    tags: ["image", "convert", "format"],
    color: "purple",
    popular: true,
  },
  {
    id: "resize-image",
    name: "Resize Image",
    component: ResizeImage,
    description: "Resize images to exact dimensions or percentages",
    icon: "Maximize2",
    tags: ["image", "resize", "dimensions"],
    color: "orange",
  },
  {
    id: "remove-background",
    name: "Remove Background",
    component: RemoveBackground,
    description: "Automatically remove image backgrounds with AI",
    icon: "Wand2",
    tags: ["image", "background", "ai"],
    color: "teal",
    popular: true,
  },
  {
    id: "image-watermark",
    name: "Image Watermark",
    component: ImageWatermark,
    description: "Add text or image watermarks to protect your images",
    icon: "Tag",
    tags: ["image", "watermark", "copyright"],
    color: "indigo",
  },
];

export {
  CompressImage,
  ConvertFormat,
  ResizeImage,
  RemoveBackground,
  ImageWatermark,
};
