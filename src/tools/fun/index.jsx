import React from "react";
import QRGenerator from "./qr-generator";
import MemeGenerator from "./meme-generator";
import NameGenerator from "./name-generator";
import PasswordGenerator from "./password-generator";

const PlaceholderComponent = ({ name }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
    <p className="text-gray-600 text-lg mb-8">This tool is under development</p>
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
      <div className="text-3xl font-bold text-gray-400">Coming Soon</div>
    </div>
  </div>
);

export const funTools = [
  {
    id: "qr-generator",
    name: "QR Code Generator",
    component: QRGenerator,
    description: "Create QR codes for URLs and text",
    icon: "QrCode",
    tags: ["qr", "generator", "fun"],
    color: "pink",
    popular: true,
  },
  {
    id: "meme-generator",
    name: "Meme Generator",
    component: MemeGenerator,
    description: "Create custom memes with popular templates",
    icon: "Smile",
    tags: ["meme", "generator", "fun"],
    color: "yellow",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    component: PasswordGenerator,
    description: "Generate strong random passwords",
    icon: "Lock",
    tags: ["password", "generator", "security"],
    color: "blue",
  },
  {
    id: "name-generator",
    name: "Name Generator",
    component: NameGenerator,
    description: "Generate strong random passwords",
    icon: "Lock",
    tags: ["name", "generator", "custom name generator"],
    color: "blue",
  },
];

export { MemeGenerator, NameGenerator, PasswordGenerator, QRGenerator };
