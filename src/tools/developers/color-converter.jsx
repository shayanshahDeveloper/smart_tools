import { useState, useEffect } from "react";
import {
  Palette,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Contrast,
  Droplets,
} from "lucide-react";

const ColorConverter = () => {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("59, 130, 246");
  const [hsl, setHsl] = useState("217, 92%, 60%");
  const [copied, setCopied] = useState({ type: "", value: "" });
  const [previewBg, setPreviewBg] = useState("#3b82f6");
  const [contrastColor, setContrastColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Convert HEX to RGB
  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return `${r}, ${g}, ${b}`;
  };

  // Convert RGB to HEX
  const rgbToHex = (rgbStr) => {
    const [r, g, b] = rgbStr.split(",").map((val) => parseInt(val.trim()));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  // Convert RGB to HSL
  const rgbToHsl = (rgbStr) => {
    let [r, g, b] = rgbStr.split(",").map((val) => parseInt(val.trim()));

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%`;
  };

  // Convert HSL to RGB
  const hslToRgb = (hslStr) => {
    let [h, s, l] = hslStr
      .split(",")
      .map((val) => parseFloat(val.replace("%", "").trim()));

    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r, g, b;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `${r}, ${g}, ${b}`;
  };

  // Calculate contrast ratio
  const calculateContrast = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    // Calculate relative luminance
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Return white or black based on luminance
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  // Update all values when one changes
  const updateFromHex = (newHex) => {
    if (!newHex.match(/^#?([0-9A-F]{3}){1,2}$/i)) return;

    newHex = newHex.startsWith("#") ? newHex : `#${newHex}`;
    setHex(newHex);

    const rgbStr = hexToRgb(newHex);
    setRgb(rgbStr);

    const hslStr = rgbToHsl(rgbStr);
    setHsl(hslStr);

    setPreviewBg(newHex);
    setContrastColor(calculateContrast(newHex));
  };

  const updateFromRgb = (newRgb) => {
    if (!newRgb.match(/^\s*\d+\s*,\s*\d+\s*,\s*\d+\s*$/)) return;

    setRgb(newRgb);

    const hexStr = rgbToHex(newRgb);
    setHex(hexStr);

    const hslStr = rgbToHsl(newRgb);
    setHsl(hslStr);

    setPreviewBg(hexStr);
    setContrastColor(calculateContrast(hexStr));
  };

  const updateFromHsl = (newHsl) => {
    if (!newHsl.match(/^\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*$/)) return;

    setHsl(newHsl);

    const rgbStr = hslToRgb(newHsl);
    setRgb(rgbStr);

    const hexStr = rgbToHex(rgbStr);
    setHex(hexStr);

    setPreviewBg(hexStr);
    setContrastColor(calculateContrast(hexStr));
  };

  // Initialize
  useEffect(() => {
    updateFromHex(hex);
  }, []);

  const copyToClipboard = (value, type) => {
    navigator.clipboard.writeText(value);
    setCopied({ type, value });
    setTimeout(() => setCopied({ type: "", value: "" }), 2000);
  };

  const resetToDefault = () => {
    updateFromHex("#3b82f6");
  };

  const loadRandomColor = () => {
    const randomHex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    updateFromHex(randomHex);
  };

  const presetColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Palette className="w-10 h-10 text-blue-600" />
          Color Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Convert between HEX, RGB, and HSL color formats. Preview colors and
          get contrast ratios.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Color Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div
              className="h-64 transition-colors duration-300"
              style={{ backgroundColor: previewBg }}
            >
              <div className="h-full flex items-center justify-center">
                <div
                  className="text-center p-8 rounded-2xl bg-white/90 backdrop-blur-sm"
                  style={{ color: previewBg }}
                >
                  <div className="text-4xl font-bold mb-2">{hex}</div>
                  <div className="text-lg font-medium">Current Color</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Color Preview
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Contrast Color:</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: contrastColor }}
                    ></div>
                    <span className="font-mono">{contrastColor}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2"
                    >
                      {showColorPicker ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                      {showColorPicker ? "Hide Picker" : "Show Picker"}
                    </button>
                    <button
                      onClick={loadRandomColor}
                      className="flex-1 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Random
                    </button>
                  </div>

                  {showColorPicker && (
                    <div className="mt-4">
                      <input
                        type="color"
                        value={hex}
                        onChange={(e) => updateFromHex(e.target.value)}
                        className="w-full h-10 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preset Colors */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preset Colors
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateFromHex(color)}
                  className="aspect-square rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Color Formats */}
        <div className="lg:col-span-2 space-y-6">
          {/* HEX Format */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  HEX Color
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: hex }}
                  ></div>
                  <button
                    onClick={() => copyToClipboard(hex, "hex")}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center gap-1"
                  >
                    {copied.type === "hex" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied.type === "hex" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  #
                </div>
                <input
                  type="text"
                  value={hex.replace("#", "")}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 font-mono text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="FFFFFF"
                  maxLength={6}
                />
              </div>
              <p className="mt-3 text-sm text-gray-600">
                HEX colors start with # and use 6 characters (0-9, A-F).
              </p>
            </div>
          </div>

          {/* RGB Format */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  RGB Color
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: hex }}
                  ></div>
                  <button
                    onClick={() => copyToClipboard(`rgb(${rgb})`, "rgb")}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center gap-1"
                  >
                    {copied.type === "rgb" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied.type === "rgb" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  rgb(
                </div>
                <input
                  type="text"
                  value={rgb}
                  onChange={(e) => updateFromRgb(e.target.value)}
                  className="w-full pl-14 pr-10 py-4 font-mono text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="255, 255, 255"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  )
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                RGB colors use three values (0-255) for Red, Green, and Blue.
              </p>
            </div>
          </div>

          {/* HSL Format */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  HSL Color
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: hex }}
                  ></div>
                  <button
                    onClick={() => copyToClipboard(`hsl(${hsl})`, "hsl")}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center gap-1"
                  >
                    {copied.type === "hsl" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied.type === "hsl" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  hsl(
                </div>
                <input
                  type="text"
                  value={hsl}
                  onChange={(e) => updateFromHsl(e.target.value)}
                  className="w-full pl-14 pr-10 py-4 font-mono text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0, 0%, 100%"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  )
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                HSL colors use Hue (0-360), Saturation (0-100%), and Lightness
                (0-100%).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Information */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">HEX Format</h3>
          </div>
          <p className="text-gray-700">
            Hexadecimal colors are 6-digit codes prefixed with #. Each pair
            represents Red, Green, and Blue values.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Contrast className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">RGB Format</h3>
          </div>
          <p className="text-gray-700">
            RGB uses decimal values (0-255) for Red, Green, and Blue. Commonly
            used in digital design.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">HSL Format</h3>
          </div>
          <p className="text-gray-700">
            HSL represents colors in terms of Hue, Saturation, and Lightness,
            making it more intuitive for adjustments.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-12">
        <button
          onClick={resetToDefault}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
        >
          Reset to Default
        </button>
        <button
          onClick={() =>
            copyToClipboard(
              `HEX: ${hex}\nRGB: rgb(${rgb})\nHSL: hsl(${hsl})`,
              "all"
            )
          }
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          Copy All Formats
        </button>
        <button
          onClick={loadRandomColor}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
        >
          Generate Random Color
        </button>
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

export default ColorConverter;
