import JSONFormatter from "./json-formatter.jsx";
import CodeMinifier from "./code-minifier.jsx";
import ColorConverter from "./color-converter.jsx";
import TimestampConverter from "./timestamp-converter.jsx";
import Base64Encoder from "./base64-encoder.jsx";

export const developerTools = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    component: JSONFormatter,
    description: "Format, validate, and minify JSON data",
    icon: "Code",
    tags: ["json", "format", "developer", "code"],
    color: "blue",
    popular: true,
  },
  {
    id: "code-minifier",
    name: "Code Minifier",
    component: CodeMinifier,
    description: "Minify HTML, CSS, and JavaScript code",
    icon: "Minimize2",
    tags: ["minify", "code", "developer"],
    color: "green",
    popular: true,
  },
  {
    id: "color-converter",
    name: "Color Converter",
    component: ColorConverter,
    description: "Convert between HEX, RGB, and HSL color formats",
    icon: "Palette",
    tags: ["color", "converter", "design", "developer"],
    color: "purple",
    popular: true,
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    component: Base64Encoder,
    description: "Encode and decode Base64 strings",
    icon: "Hash",
    tags: ["base64", "encode", "decode"],
    color: "orange",
    popular: true,
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    component: TimestampConverter,
    description: "Convert between timestamps and human-readable dates",
    icon: "Clock",
    tags: ["timestamp", "date", "converter"],
    color: "red",
  },
];

export {
  JSONFormatter,
  CodeMinifier,
  ColorConverter,
  TimestampConverter,
  Base64Encoder,
};
