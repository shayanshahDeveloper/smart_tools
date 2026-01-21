import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  Calculator,
  Target,
  Check,
  AlertCircle,
  Download,
  Copy,
  RefreshCw,
  BarChart3,
  TrendingDown,
  Clock,
  Zap,
  LineChart,
  PieChart,
} from "lucide-react";

const ROICalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(2000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(800);
  const [timePeriod, setTimePeriod] = useState(12);
  const [inflationRate, setInflationRate] = useState(3);
  const [riskFactor, setRiskFactor] = useState("medium");

  const calculateROI = () => {
    const totalInvestment = initialInvestment;
    const monthlyProfit = monthlyRevenue - monthlyExpenses;
    const totalProfit = monthlyProfit * timePeriod;
    const roi = ((totalProfit - totalInvestment) / totalInvestment) * 100;
    const paybackPeriod = totalInvestment / monthlyProfit;
    const monthlyROI = roi / timePeriod;

    // Adjusted for inflation
    const inflationAdjustedProfit =
      totalProfit * Math.pow(1 - inflationRate / 100, timePeriod / 12);
    const inflationAdjustedROI =
      ((inflationAdjustedProfit - totalInvestment) / totalInvestment) * 100;

    return {
      totalInvestment,
      monthlyProfit,
      totalProfit,
      roi: roi.toFixed(2),
      monthlyROI: monthlyROI.toFixed(2),
      paybackPeriod: paybackPeriod.toFixed(1),
      inflationAdjustedROI: inflationAdjustedROI.toFixed(2),
      isProfitable: roi > 0,
      roiClass:
        roi >= 50
          ? "excellent"
          : roi >= 20
          ? "good"
          : roi >= 0
          ? "fair"
          : "poor",
      monthlyBreakEven: Math.ceil(totalInvestment / monthlyProfit),
    };
  };

  const results = calculateROI();

  const roiClasses = {
    excellent: "from-emerald-600 to-green-600",
    good: "from-green-600 to-lime-600",
    fair: "from-yellow-600 to-amber-600",
    poor: "from-red-600 to-orange-600",
  };

  const riskOptions = [
    {
      id: "low",
      label: "Low Risk",
      color: "from-green-600 to-emerald-600",
      icon: TrendingUp,
    },
    {
      id: "medium",
      label: "Medium Risk",
      color: "from-yellow-600 to-amber-600",
      icon: Target,
    },
    {
      id: "high",
      label: "High Risk",
      color: "from-red-600 to-orange-600",
      icon: TrendingDown,
    },
  ];

  const handleReset = () => {
    setInitialInvestment(10000);
    setMonthlyRevenue(2000);
    setMonthlyExpenses(800);
    setTimePeriod(12);
    setInflationRate(3);
    setRiskFactor("medium");
  };

  const handleCopyResults = async () => {
    const resultsText = `ROI Results:
- Initial Investment: $${results.totalInvestment.toLocaleString()}
- Monthly Profit: $${results.monthlyProfit.toLocaleString()}
- Total Profit: $${results.totalProfit.toLocaleString()}
- ROI: ${results.roi}%
- Payback Period: ${results.paybackPeriod} months
- Risk Level: ${riskFactor}`;

    try {
      await navigator.clipboard.writeText(resultsText);
      alert("✓ ROI results copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const content = `ROI Calculation Report
=====================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

INVESTMENT DETAILS:
-------------------
Initial Investment: $${results.totalInvestment.toLocaleString()}
Monthly Revenue: $${monthlyRevenue.toLocaleString()}
Monthly Expenses: $${monthlyExpenses.toLocaleString()}
Time Period: ${timePeriod} months
Inflation Rate: ${inflationRate}%
Risk Level: ${riskFactor}

RESULTS:
--------
Return on Investment (ROI): ${results.roi}%
Monthly ROI: ${results.monthlyROI}%
Total Profit: $${results.totalProfit.toLocaleString()}
Payback Period: ${results.paybackPeriod} months
Inflation Adjusted ROI: ${results.inflationAdjustedROI}%

Status: ${results.isProfitable ? "Profitable Investment" : "Not Profitable"}

Notes:
This report was generated using the ROI Calculator tool.
For business decisions, consult with financial advisors.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roi-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">ROI Calculator</h1>
            <p className="text-gray-600 text-lg mt-2">
              Calculate Return on Investment for business projects with detailed
              analysis and forecasting
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Calculator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calculator Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 border-b border-emerald-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Investment Parameters
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Main Parameters */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Initial Investment ($)
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="100"
                          className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          value={initialInvestment}
                          onChange={(e) =>
                            setInitialInvestment(
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                        <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Time Period (Months)
                        </div>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        value={timePeriod}
                        onChange={(e) =>
                          setTimePeriod(parseInt(e.target.value) || 1)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Monthly Revenue ($)
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="100"
                          className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          value={monthlyRevenue}
                          onChange={(e) =>
                            setMonthlyRevenue(parseFloat(e.target.value) || 0)
                          }
                        />
                        <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4" />
                          Monthly Expenses ($)
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="100"
                          className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          value={monthlyExpenses}
                          onChange={(e) =>
                            setMonthlyExpenses(parseFloat(e.target.value) || 0)
                          }
                        />
                        <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Parameters */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        Inflation Rate (%)
                      </div>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="20"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={inflationRate}
                      onChange={(e) =>
                        setInflationRate(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Risk Factor
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {riskOptions.map((risk) => {
                        const Icon = risk.icon;
                        return (
                          <button
                            key={risk.id}
                            onClick={() => setRiskFactor(risk.id)}
                            className={`p-3 rounded-xl flex flex-col items-center gap-1 ${
                              riskFactor === risk.id
                                ? `bg-gradient-to-r ${risk.color} text-white shadow-lg`
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              {risk.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sliders for Fine-tuning */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Initial Investment: $
                        {initialInvestment.toLocaleString()}
                      </label>
                      <span className="text-sm text-gray-500">
                        Drag to adjust
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="100000"
                      step="100"
                      value={initialInvestment}
                      onChange={(e) =>
                        setInitialInvestment(parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$100</span>
                      <span>$100k</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Time Period: {timePeriod} months
                      </label>
                      <span className="text-sm text-gray-500">
                        Drag to adjust
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 month</span>
                      <span>60 months</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Calculate ROI
                  </button>
                  <button
                    onClick={handleCopyResults}
                    className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    Copy Results
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-blue-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  ROI Analysis Results
                </h2>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    results.isProfitable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {results.isProfitable ? "Profitable" : "Not Profitable"}
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Main ROI Display */}
              <div
                className={`p-8 rounded-2xl mb-6 bg-gradient-to-r ${
                  roiClasses[results.roiClass]
                } text-white text-center`}
              >
                <div className="text-sm font-medium mb-2">
                  RETURN ON INVESTMENT
                </div>
                <div className="text-5xl font-bold mb-2">{results.roi}%</div>
                <div className="text-lg font-medium">
                  {results.roiClass === "excellent" && "Excellent Return! 🎯"}
                  {results.roiClass === "good" && "Good Investment! 👍"}
                  {results.roiClass === "fair" && "Fair Return ⚖️"}
                  {results.roiClass === "poor" && "Consider Alternatives ⚠️"}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ${results.totalInvestment.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Investment</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${results.monthlyProfit.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Profit</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div
                    className={`text-2xl font-bold ${
                      results.totalProfit >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${results.totalProfit.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Profit</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {results.paybackPeriod}
                  </div>
                  <div className="text-sm text-gray-600">Payback Months</div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Detailed Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">Monthly ROI Rate</span>
                    <span className="font-bold text-gray-900">
                      {results.monthlyROI}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">
                      Inflation Adjusted ROI
                    </span>
                    <span className="font-bold text-gray-900">
                      {results.inflationAdjustedROI}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">Net Profit Margin</span>
                    <span className="font-bold text-gray-900">
                      {monthlyRevenue > 0
                        ? (
                            (results.monthlyProfit / monthlyRevenue) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">
                      Monthly Break-even Point
                    </span>
                    <span className="font-bold text-gray-900">
                      {results.monthlyBreakEven} months
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features & Tips */}
        <div className="space-y-6">
          {/* Features Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              Calculator Features
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Detailed Analysis
                </div>
                <div className="text-sm text-gray-600">
                  Comprehensive ROI calculations with multiple metrics
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Inflation Adjustment
                </div>
                <div className="text-sm text-gray-600">
                  Adjust for inflation for more accurate projections
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Risk Assessment
                </div>
                <div className="text-sm text-gray-600">
                  Factor in different risk levels for better planning
                </div>
              </div>
            </div>
          </div>

          {/* ROI Interpretation */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-2">
                  ROI Interpretation
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5"></div>
                    <span>
                      <strong>50%+:</strong> Excellent investment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                    <span>
                      <strong>20-49%:</strong> Good investment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>
                      <strong>0-19%:</strong> Fair return
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                    <span>
                      <strong>Negative:</strong> Reconsider investment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Scenarios */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Scenarios
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setInitialInvestment(5000);
                  setMonthlyRevenue(1500);
                  setMonthlyExpenses(500);
                  setTimePeriod(12);
                }}
                className="w-full p-3 bg-white/70 rounded-lg text-left hover:bg-white transition-all"
              >
                <div className="font-medium text-gray-900">Small Business</div>
                <div className="text-sm text-gray-600">
                  $5k investment, $1k monthly profit
                </div>
              </button>
              <button
                onClick={() => {
                  setInitialInvestment(25000);
                  setMonthlyRevenue(5000);
                  setMonthlyExpenses(2000);
                  setTimePeriod(24);
                }}
                className="w-full p-3 bg-white/70 rounded-lg text-left hover:bg-white transition-all"
              >
                <div className="font-medium text-gray-900">Medium Business</div>
                <div className="text-sm text-gray-600">
                  $25k investment, $3k monthly profit
                </div>
              </button>
              <button
                onClick={() => {
                  setInitialInvestment(100000);
                  setMonthlyRevenue(20000);
                  setMonthlyExpenses(8000);
                  setTimePeriod(36);
                }}
                className="w-full p-3 bg-white/70 rounded-lg text-left hover:bg-white transition-all"
              >
                <div className="font-medium text-gray-900">Large Business</div>
                <div className="text-sm text-gray-600">
                  $100k investment, $12k monthly profit
                </div>
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Investment Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Always consider inflation in long-term investments</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Factor in opportunity costs</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Calculate multiple scenarios before investing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Consider tax implications on returns</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Accurate Calculations
          </h3>
          <p className="text-gray-600">
            Precise ROI calculations with inflation adjustment and risk factor
            consideration.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Detailed Analysis
          </h3>
          <p className="text-gray-600">
            Comprehensive metrics including payback period, monthly ROI, and
            profit margins.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Investment Planning
          </h3>
          <p className="text-gray-600">
            Make informed investment decisions with detailed projections and
            scenarios.
          </p>
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

export default ROICalculator;
