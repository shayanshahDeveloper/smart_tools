import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Type,
  Upload,
  Download,
  Smile,
  Sparkles,
  Trash2,
  Copy,
  Share2,
  Layers,
  Palette,
  Zap,
} from "lucide-react";

const MemeGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("impact");
  const [generatedMeme, setGeneratedMeme] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Sample meme templates
  const memeTemplates = [
    {
      id: 1,
      name: "Distracted Boyfriend",
      url: "https://api.memegen.link/images/distracted.png",
      width: 1200,
      height: 900,
    },
    {
      id: 2,
      name: "Drake Hotline Bling",
      url: "https://api.memegen.link/images/drake.png",
      width: 1200,
      height: 1200,
    },
    {
      id: 3,
      name: "Change My Mind",
      url: "https://api.memegen.link/images/changemymind.png",
      width: 1200,
      height: 628,
    },
    {
      id: 4,
      name: "Two Buttons",
      url: "https://api.memegen.link/images/buttons.png",
      width: 1200,
      height: 900,
    },
    {
      id: 5,
      name: "Expanding Brain",
      url: "https://api.memegen.link/images/expandbrain.png",
      width: 1200,
      height: 628,
    },
    {
      id: 6,
      name: "Always Has Been",
      url: "https://api.memegen.link/images/always.png",
      width: 1200,
      height: 900,
    },
    {
      id: 7,
      name: "Spongebob Mocking",
      url: "https://api.memegen.link/images/spongebob.png",
      width: 1200,
      height: 900,
    },
    {
      id: 8,
      name: "Woman Yelling at Cat",
      url: "https://api.memegen.link/images/woman-yelling.png",
      width: 1200,
      height: 900,
    },
  ];

  const fontOptions = [
    { id: "impact", name: "Impact" },
    { id: "arial", name: "Arial" },
    { id: "comic-sans", name: "Comic Sans" },
    { id: "verdana", name: "Verdana" },
  ];

  const colorOptions = [
    { id: "#FFFFFF", name: "White" },
    { id: "#000000", name: "Black" },
    { id: "#FF0000", name: "Red" },
    { id: "#00FF00", name: "Green" },
    { id: "#0000FF", name: "Blue" },
    { id: "#FFFF00", name: "Yellow" },
  ];

  const outlineOptions = [
    { id: "#000000", name: "Black" },
    { id: "#FFFFFF", name: "White" },
    { id: "#FF0000", name: "Red" },
    { id: "#0000FF", name: "Blue" },
  ];

  useEffect(() => {
    if (memeTemplates.length > 0 && !selectedTemplate) {
      setSelectedTemplate(memeTemplates[0]);
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setSelectedTemplate(null);
    };
    reader.readAsDataURL(file);
  };

  const generateMeme = () => {
    if (!selectedTemplate && !uploadedImage) {
      alert("Please select a template or upload an image");
      return;
    }

    // In a real app, this would generate actual meme
    // For demo, we'll create a mock result
    const imageUrl = uploadedImage || selectedTemplate?.url;

    setGeneratedMeme({
      id: Date.now(),
      url: imageUrl,
      name: `meme_${Date.now()}.png`,
      topText,
      bottomText,
      fontSize: `${fontSize}px`,
      textColor,
      outlineColor,
      fontFamily,
      dimensions: "1200×900",
      size: "1.2 MB",
      timestamp: new Date().toLocaleTimeString(),
    });

    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById("meme-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const clearAll = () => {
    setSelectedTemplate(null);
    setTopText("");
    setBottomText("");
    setFontSize(32);
    setTextColor("#FFFFFF");
    setOutlineColor("#000000");
    setFontFamily("impact");
    setGeneratedMeme(null);
    setUploadedImage(null);
  };

  const copyMemeLink = () => {
    if (!generatedMeme) return;
    navigator.clipboard.writeText(
      `https://example.com/meme/${generatedMeme.id}`
    );
    alert("Meme link copied to clipboard!");
  };

  const shareMeme = () => {
    if (!generatedMeme) return;
    if (navigator.share) {
      navigator.share({
        title: "Check out this meme!",
        text: "I created this awesome meme!",
        url: `https://example.com/meme/${generatedMeme.id}`,
      });
    } else {
      copyMemeLink();
    }
  };

  const downloadMeme = () => {
    if (!generatedMeme) return;
    alert(`Downloading ${generatedMeme.name}...`);
    // In real app: trigger actual download
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Smile className="w-10 h-10 text-indigo-600" />
          Meme Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Create hilarious memes with popular templates or your own images. Add
          custom text and style.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Template Selection & Settings */}
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Choose Template
              </h2>
            </div>

            <div className="p-6">
              {/* Template Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {memeTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setUploadedImage(null);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedTemplate?.id === template.id
                        ? "border-indigo-600 ring-2 ring-indigo-100"
                        : "border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-3xl">🖼️</div>
                    </div>
                    <div className="text-xs font-medium text-gray-700 mt-1 truncate px-1">
                      {template.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Image Upload */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-600" />
                  Use Custom Image
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
                  {uploadedImage ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={uploadedImage}
                          alt="Custom"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            document.getElementById("meme-image-upload").click()
                          }
                          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                        >
                          Change Image
                        </button>
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Upload your own image
                      </p>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                        id="meme-image-upload"
                      />
                      <label
                        htmlFor="meme-image-upload"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Image
                      </label>
                      <p className="mt-3 text-sm text-gray-500">
                        Supports JPG, PNG, GIF
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Text Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Type className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Text Settings
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Top Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Text
                </label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="When you..."
                  maxLength={100}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {topText.length}/100
                </div>
              </div>

              {/* Bottom Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bottom Text
                </label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="But then..."
                  maxLength={100}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {bottomText.length}/100
                </div>
              </div>

              {/* Font Settings */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="16"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    />
                    <span className="text-sm font-medium text-indigo-600 w-12">
                      {fontSize}px
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.id} value={font.id}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Color Settings */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex gap-2">
                    {colorOptions.map((colorOption) => (
                      <button
                        key={colorOption.id}
                        onClick={() => setTextColor(colorOption.id)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          textColor === colorOption.id
                            ? "border-indigo-600"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: colorOption.id }}
                        title={colorOption.name}
                      />
                    ))}
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-8 h-8 cursor-pointer rounded-full border border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outline Color
                  </label>
                  <div className="flex gap-2">
                    {outlineOptions.map((outlineOption) => (
                      <button
                        key={outlineOption.id}
                        onClick={() => setOutlineColor(outlineOption.id)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          outlineColor === outlineOption.id
                            ? "border-indigo-600"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: outlineOption.id }}
                        title={outlineOption.name}
                      />
                    ))}
                    <input
                      type="color"
                      value={outlineColor}
                      onChange={(e) => setOutlineColor(e.target.value)}
                      className="w-8 h-8 cursor-pointer rounded-full border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={generateMeme}
                  className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Meme
                </button>
                <button
                  onClick={clearAll}
                  className="px-6 py-4 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Popular Text Presets */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Popular Text Presets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { top: "Me:", bottom: "Also me:" },
                { top: "One does not simply", bottom: "Make a meme" },
                { top: "They don't know", bottom: "That I know they know" },
                { top: "Wait, it's all?", bottom: "Always has been" },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopText(preset.top);
                    setBottomText(preset.bottom);
                  }}
                  className="bg-white/50 p-3 rounded-lg border border-indigo-100 hover:border-indigo-300 transition-colors text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">
                    {preset.top}
                  </div>
                  <div className="text-gray-600 text-sm">{preset.bottom}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Preview & Results */}
        <div className="space-y-6">
          {/* Meme Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Meme Preview
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 relative overflow-hidden">
                {/* Template/Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Custom"
                      className="w-full h-full object-contain"
                    />
                  ) : selectedTemplate ? (
                    <div className="text-center">
                      <div className="text-4xl mb-2">🖼️</div>
                      <div className="text-gray-700">
                        {selectedTemplate.name}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      Select a template or upload image
                    </div>
                  )}
                </div>

                {/* Top Text Overlay */}
                {topText && (
                  <div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 text-center"
                    style={{
                      fontSize: `${fontSize}px`,
                      fontFamily:
                        fontFamily === "impact"
                          ? "Impact, sans-serif"
                          : fontFamily,
                      color: textColor,
                      textShadow: `2px 2px 0 ${outlineColor}, -2px -2px 0 ${outlineColor}, 2px -2px 0 ${outlineColor}, -2px 2px 0 ${outlineColor}`,
                      fontWeight: "bold",
                    }}
                  >
                    {topText.toUpperCase()}
                  </div>
                )}

                {/* Bottom Text Overlay */}
                {bottomText && (
                  <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 text-center"
                    style={{
                      fontSize: `${fontSize}px`,
                      fontFamily:
                        fontFamily === "impact"
                          ? "Impact, sans-serif"
                          : fontFamily,
                      color: textColor,
                      textShadow: `2px 2px 0 ${outlineColor}, -2px -2px 0 ${outlineColor}, 2px -2px 0 ${outlineColor}, -2px 2px 0 ${outlineColor}`,
                      fontWeight: "bold",
                    }}
                  >
                    {bottomText.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Preview Stats */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Font Size</div>
                  <div className="font-medium text-gray-900">{fontSize}px</div>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Text Color</div>
                  <div className="font-medium text-indigo-600">
                    <div
                      className="w-4 h-4 rounded-full inline-block mr-2"
                      style={{ backgroundColor: textColor }}
                    ></div>
                    {textColor}
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Outline</div>
                  <div className="font-medium text-purple-600">
                    <div
                      className="w-4 h-4 rounded-full inline-block mr-2"
                      style={{ backgroundColor: outlineColor }}
                    ></div>
                    {outlineColor}
                  </div>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Font</div>
                  <div className="font-medium text-pink-600">
                    {fontOptions.find((f) => f.id === fontFamily)?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div id="meme-results">
            {generatedMeme ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Your Meme is Ready!
                    </h2>
                    <div className="flex items-center gap-2 text-green-700">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-medium">
                        Generated Successfully
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Meme Preview */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-6xl">😂</div>
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      {generatedMeme.name}
                    </div>
                    <div className="text-gray-600">
                      Generated at {generatedMeme.timestamp}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">Top Text</div>
                        <div className="font-medium text-gray-900">
                          {generatedMeme.topText || "None"}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">Bottom Text</div>
                        <div className="font-medium text-gray-900">
                          {generatedMeme.bottomText || "None"}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <div className="text-xs text-gray-600">Font Size</div>
                        <div className="font-medium text-indigo-600">
                          {generatedMeme.fontSize}
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-xs text-gray-600">Text Color</div>
                        <div className="font-medium text-purple-600">
                          {generatedMeme.textColor}
                        </div>
                      </div>
                      <div className="p-3 bg-pink-50 rounded-lg">
                        <div className="text-xs text-gray-600">Font</div>
                        <div className="font-medium text-pink-600">
                          {
                            fontOptions.find(
                              (f) => f.id === generatedMeme.fontFamily
                            )?.name
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={downloadMeme}
                      className="py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                    <button
                      onClick={copyMemeLink}
                      className="py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                    >
                      <Copy className="w-5 h-5" />
                      Copy Link
                    </button>
                    <button
                      onClick={shareMeme}
                      className="py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Meme Results
                  </h2>
                </div>

                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Create Your First Meme
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Select a template, add text, and generate your meme. The
                    results will appear here.
                  </p>

                  {(selectedTemplate || uploadedImage) && (
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg">
                      <Sparkles className="w-4 h-4" />
                      <span>Ready to generate!</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Meme Categories
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Reaction Memes
                </div>
                <div className="text-sm text-gray-600">
                  Express feelings and reactions
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Funny Situations
                </div>
                <div className="text-sm text-gray-600">
                  Humorous everyday scenarios
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Pop Culture
                </div>
                <div className="text-sm text-gray-600">
                  References from movies, shows
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Social Media
                </div>
                <div className="text-sm text-gray-600">
                  Perfect for Instagram, Twitter
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
            <Layers className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Popular Templates
          </h3>
          <p className="text-gray-600">
            Choose from dozens of popular meme templates updated regularly with
            trending formats.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Palette className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Custom Text Styling
          </h3>
          <p className="text-gray-600">
            Full control over font size, color, outline, and positioning for
            perfect meme text.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Custom Images
          </h3>
          <p className="text-gray-600">
            Upload your own photos or images to create personalized memes.
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How to Use This Meme Generator
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-lg font-bold text-indigo-600">1</div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Choose Template
            </h3>
            <p className="text-sm text-gray-600">
              Select from popular templates or upload your own image
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-lg font-bold text-indigo-600">2</div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Add Text</h3>
            <p className="text-sm text-gray-600">
              Enter top and bottom text with custom styling options
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-lg font-bold text-indigo-600">3</div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Customize</h3>
            <p className="text-sm text-gray-600">
              Adjust font, colors, size, and outline effects
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-lg font-bold text-indigo-600">4</div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Generate & Share
            </h3>
            <p className="text-sm text-gray-600">
              Create your meme and share it on social media
            </p>
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

export default MemeGenerator;
