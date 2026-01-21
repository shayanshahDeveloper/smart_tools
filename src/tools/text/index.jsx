import React from "react";
import TextCounter from "./text-counter";
import CaseConverter from "./case-converter";
import LoremGenerator from "./lorem-generator";
import TextComparer from "./text-comparer";

const PlaceholderComponent = ({ name }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
    <p className="text-gray-600 text-lg mb-8">This tool is under development</p>
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
      <div className="text-3xl font-bold text-gray-400">Coming Soon</div>
    </div>
  </div>
);

export const textTools = [
  {
    id: "text-counter",
    name: "Text Counter",
    component: TextCounter,
    description: "Count characters, words, sentences with detailed analysis",
    icon: "FileText",
    tags: ["counter", "analyzer", "text"],
    color: "indigo",
    popular: true,
  },
  {
    id: "case-converter",
    name: "Case Converter",
    component: CaseConverter,
    description: "Convert text between different cases instantly",
    icon: "Type",
    tags: ["case", "converter", "format"],
    color: "purple",
    popular: true,
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum Generator",
    component: LoremGenerator,
    description: "Generate placeholder text for designs and layouts",
    icon: "FileText",
    tags: ["lorem", "generator", "placeholder"],
    color: "green",
  },
  {
    id: "text-comparer",
    name: "Text Comparer",
    component: TextComparer,
    description: "Compare two texts and find differences",
    icon: "FileDiff",
    tags: ["compare", "diff", "analyzer"],
    color: "blue",
  },
];

export { TextCounter, CaseConverter, LoremGenerator, TextComparer };
