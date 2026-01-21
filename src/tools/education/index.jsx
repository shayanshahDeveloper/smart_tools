import WordCounter from "./word-counter.jsx";
import PlagiarismChecker from "./plagiarism-checker.jsx";
import GPACalculator from "./gpa-calculator.jsx";
import UnitConverter from "./unit-converter.jsx";
import EquationSolver from "./equation-solver.jsx";

export const educationTools = [
  {
    id: "word-counter",
    name: "Word Counter",
    component: WordCounter,
    description:
      "Count words, characters, sentences, paragraphs and reading time",
    icon: "FileText",
    tags: ["text", "counter", "words", "characters", "education"],
    color: "blue",
    popular: true,
  },
  {
    id: "plagiarism-checker",
    name: "Plagiarism Checker",
    component: PlagiarismChecker,
    description: "Check text for duplicate content and ensure originality",
    icon: "Search",
    tags: ["checker", "duplicate", "content", "academic", "education"],
    color: "red",
    popular: true,
  },
  {
    id: "gpa-calculator",
    name: "GPA Calculator",
    component: GPACalculator,
    description: "Calculate Grade Point Average for any semester",
    icon: "Calculator",
    tags: ["calculator", "grades", "academic", "student", "education"],
    color: "green",
    popular: true,
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    component: UnitConverter,
    description: "Convert between different units of measurement",
    icon: "Repeat",
    tags: ["converter", "units", "measurement", "science", "education"],
    color: "purple",
    popular: true,
  },
  {
    id: "equation-solver",
    name: "Equation Solver",
    component: EquationSolver,
    description: "Solve mathematical equations step by step",
    icon: "Sigma",
    tags: ["math", "equation", "solver", "calculator", "education"],
    color: "orange",
  },
];

export {
  WordCounter,
  PlagiarismChecker,
  GPACalculator,
  UnitConverter,
  EquationSolver,
};
