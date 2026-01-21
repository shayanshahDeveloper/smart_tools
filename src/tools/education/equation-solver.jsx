import { useState } from "react";
import {
  Calculator,
  Plus,
  Minus,
  X,
  Divide,
  Square,
  Radical,
  Superscript,
  RefreshCw,
  Copy,
  History,
} from "lucide-react";

const EquationSolver = () => {
  const [equation, setEquation] = useState("2x + 5 = 13");
  const [solution, setSolution] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const solveEquation = () => {
    if (!equation.trim()) {
      alert("Please enter an equation");
      return;
    }

    // Simple equation solving logic for demonstration
    // In a real app, you'd use a proper math parser
    const eq = equation.toLowerCase().replace(/\s/g, "");

    try {
      let result = null;
      let steps = [];

      // Simple linear equation: ax + b = c
      if (eq.includes("x") && eq.includes("=")) {
        const [left, right] = eq.split("=");

        // Extract coefficients
        const coeffMatch = left.match(/([-+]?\d*)x/);
        const coeff = coeffMatch
          ? parseFloat(coeffMatch[1] || 1) *
            (coeffMatch[0].startsWith("-") ? -1 : 1)
          : 0;
        const constLeft =
          parseFloat(left.replace(/x/g, "").replace(/[+-]?\d*x/g, "")) || 0;
        const constRight = parseFloat(right) || 0;

        steps.push(`Original equation: ${equation}`);
        steps.push(
          `Step 1: Move constants: ${coeff}x = ${constRight} - ${constLeft}`
        );

        const rightSide = constRight - constLeft;
        steps.push(`Step 2: Calculate right side: ${coeff}x = ${rightSide}`);

        if (coeff !== 0) {
          const solution = rightSide / coeff;
          steps.push(
            `Step 3: Divide by coefficient: x = ${rightSide} / ${coeff}`
          );
          steps.push(`Step 4: Solution: x = ${solution}`);

          result = {
            solution: `x = ${solution}`,
            steps,
            type: "linear",
            explanation: `The equation ${equation} has one solution.`,
          };
        } else {
          result = {
            solution: "No solution or infinite solutions",
            steps,
            type: "linear",
            explanation: "Coefficient of x is zero.",
          };
        }
      } else if (eq.includes("^2") || eq.includes("**2")) {
        // Simple quadratic demonstration
        result = {
          solution: "x = ± solution (use quadratic formula)",
          steps: ["Quadratic equations require using the quadratic formula"],
          type: "quadratic",
          explanation:
            "Quadratic equations can have 0, 1, or 2 real solutions.",
        };
      } else {
        result = {
          solution: "Cannot solve automatically",
          steps: ["Please enter a valid equation with x"],
          type: "unknown",
          explanation:
            "Only simple linear equations are supported in this demo.",
        };
      }

      setSolution(result);

      // Add to history
      setHistory((prev) => [
        {
          equation,
          solution: result.solution,
          timestamp: new Date().toLocaleTimeString(),
          type: result.type,
        },
        ...prev.slice(0, 9),
      ]); // Keep last 10
    } catch (error) {
      setSolution({
        solution: "Error solving equation",
        steps: ["Invalid equation format"],
        type: "error",
        explanation: "Please check your equation syntax.",
      });
    }
  };

  const clearEquation = () => {
    setEquation("");
    setSolution(null);
  };

  const insertSymbol = (symbol) => {
    setEquation((prev) => prev + symbol);
  };

  const loadExample = (type) => {
    const examples = {
      linear: "3x - 7 = 14",
      quadratic: "x^2 - 5x + 6 = 0",
      system: "2x + 3y = 7\nx - y = 1",
    };
    setEquation(examples[type]);
    setSolution(null);
  };

  const copySolution = () => {
    if (solution) {
      navigator.clipboard.writeText(solution.solution);
      alert("Solution copied to clipboard!");
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const EquationButtons = () => (
    <div className="grid grid-cols-5 gap-2 mb-6">
      {[
        { symbol: "x", label: "Variable" },
        { symbol: "+", label: "Plus", icon: Plus },
        { symbol: "-", label: "Minus", icon: Minus },
        { symbol: "*", label: "Multiply", icon: X },
        { symbol: "/", label: "Divide", icon: Divide },
        { symbol: "^", label: "Power", icon: Superscript },
        { symbol: "²", label: "Square", icon: Square },
        { symbol: "√", label: "Root", icon: Radical },
        { symbol: "(", label: "Open Paren" },
        { symbol: ")", label: "Close Paren" },
        { symbol: "=", label: "Equals" },
      ].map((item) => (
        <button
          key={item.symbol}
          onClick={() => insertSymbol(item.symbol)}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center"
          title={item.label}
        >
          {item.icon ? (
            <item.icon className="w-5 h-5" />
          ) : (
            <span className="text-lg font-medium">{item.symbol}</span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          Equation Solver
        </h1>
        <p className="text-gray-600 text-lg">
          Solve linear, quadratic, and other mathematical equations step by step
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input & Solution */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              {/* Equation Input */}
              <div className="mb-8">
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Enter Your Equation
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="e.g., 2x + 5 = 13 or x^2 - 4 = 0"
                    className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  />
                  <button
                    onClick={clearEquation}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Symbol Buttons */}
              <EquationButtons />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={solveEquation}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                >
                  <Calculator className="w-5 h-5" />
                  Solve Equation
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Examples:</span>
                  <button
                    onClick={() => loadExample("linear")}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => loadExample("quadratic")}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                  >
                    Quadratic
                  </button>
                  <button
                    onClick={() => loadExample("system")}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                  >
                    System
                  </button>
                </div>
              </div>

              {/* Solution Display */}
              {solution && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Solution
                    </h3>
                    <button
                      onClick={copySolution}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>

                  <div className="mb-8">
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 font-mono">
                          {solution.solution}
                        </div>
                        <div className="mt-2 text-gray-600">
                          {solution.explanation}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Solution Steps */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Step-by-Step Solution
                    </h4>
                    <div className="space-y-4">
                      {solution.steps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="pt-1">
                            <p className="text-gray-800">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - History & Info */}
        <div className="space-y-6">
          {/* History */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">History</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 hover:bg-gray-200 rounded-lg"
                >
                  <History className="w-5 h-5 text-gray-600" />
                </button>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {showHistory && (
              <div className="p-4 max-h-96 overflow-y-auto">
                {history.length > 0 ? (
                  <div className="space-y-3">
                    {history.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900 truncate">
                          {item.equation}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {item.solution}
                        </div>
                        <div className="text-xs text-gray-500 mt-2 flex justify-between">
                          <span className="capitalize">{item.type}</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No history yet
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Equation Types */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Equation Types
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Linear Equations
                </div>
                <div className="text-sm text-gray-600">ax + b = c</div>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Quadratic Equations
                </div>
                <div className="text-sm text-gray-600">ax² + bx + c = 0</div>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Systems of Equations
                </div>
                <div className="text-sm text-gray-600">
                  Multiple equations with multiple variables
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tips for Entering Equations
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Use x, y, z for variables</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Include = sign for equations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Use ^ for exponents: x^2</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Use * for multiplication</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How Equation Solving Works
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Equation solving involves finding the value(s) of variables that
              make the equation true. Different types of equations require
              different solving techniques:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <span>
                  <strong>Linear equations:</strong> Use inverse operations to
                  isolate the variable
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <span>
                  <strong>Quadratic equations:</strong> Use factoring,
                  completing the square, or quadratic formula
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <span>
                  <strong>Systems of equations:</strong> Use substitution,
                  elimination, or graphing methods
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Common Formulas
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-mono text-gray-900 mb-2">
                Quadratic Formula
              </div>
              <div className="text-sm text-gray-600">
                x = [-b ± √(b² - 4ac)] / 2a
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-mono text-gray-900 mb-2">
                Linear Equation
              </div>
              <div className="text-sm text-gray-600">ax + b = 0 → x = -b/a</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-mono text-gray-900 mb-2">
                Slope-Intercept
              </div>
              <div className="text-sm text-gray-600">y = mx + b</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Space */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-center">
        <div className="text-gray-500 mb-2">Advertisement</div>
        <div className="h-[90px] flex items-center justify-center bg-white rounded-xl border border-gray-300">
          <div className="text-gray-400">
            Ad Space (728x90)
            <div className="text-xs mt-1">Your ad could be here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquationSolver;
