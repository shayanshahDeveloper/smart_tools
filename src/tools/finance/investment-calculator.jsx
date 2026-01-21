import { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Percent,
  Calendar,
  PieChart,
  Target,
  BarChart3,
  Download,
  RefreshCw,
} from "lucide-react";

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [futureValue, setFutureValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [yearlyBreakdown, setYearlyBreakdown] = useState([]);

  const calculateInvestment = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = investmentPeriod * 12;

    // Calculate future value with monthly contributions
    let fv = initialInvestment * Math.pow(1 + monthlyRate, months);

    // Add monthly contributions (annuity due formula)
    if (monthlyContribution > 0 && monthlyRate > 0) {
      fv +=
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    } else if (monthlyContribution > 0) {
      fv += monthlyContribution * months;
    }

    setFutureValue(fv);
    setTotalInvested(initialInvestment + monthlyContribution * months);
    setTotalInterest(fv - (initialInvestment + monthlyContribution * months));

    // Generate yearly breakdown
    const breakdown = [];
    let currentValue = initialInvestment;

    for (let year = 1; year <= investmentPeriod; year++) {
      for (let month = 1; month <= 12; month++) {
        currentValue = (currentValue + monthlyContribution) * (1 + monthlyRate);
      }

      breakdown.push({
        year,
        value: currentValue,
        invested: initialInvestment + monthlyContribution * 12 * year,
        interest:
          currentValue - (initialInvestment + monthlyContribution * 12 * year),
      });
    }

    setYearlyBreakdown(breakdown.slice(0, 5)); // Show first 5 years
  };

  useEffect(() => {
    calculateInvestment();
  }, [
    initialInvestment,
    monthlyContribution,
    investmentPeriod,
    expectedReturn,
  ]);

  const resetValues = () => {
    setInitialInvestment(10000);
    setMonthlyContribution(1000);
    setInvestmentPeriod(10);
    setExpectedReturn(12);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const investmentPresets = [
    {
      initial: 50000,
      monthly: 5000,
      years: 15,
      return: 10,
      label: "Retirement Fund",
    },
    { initial: 20000, monthly: 2000, years: 5, return: 8, label: "Short Term" },
    {
      initial: 100000,
      monthly: 10000,
      years: 20,
      return: 12,
      label: "Wealth Building",
    },
    { initial: 0, monthly: 3000, years: 10, return: 10, label: "SIP Plan" },
  ];

  const periodOptions = [
    { years: 5, label: "5 Years" },
    { years: 10, label: "10 Years" },
    { years: 15, label: "15 Years" },
    { years: 20, label: "20 Years" },
    { years: 25, label: "25 Years" },
    { years: 30, label: "30 Years" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <TrendingUp className="w-10 h-10 text-indigo-600" />
          Investment Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate investment growth with compound interest and monthly
          contributions
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Investment Scenarios
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {investmentPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setInitialInvestment(preset.initial);
                      setMonthlyContribution(preset.monthly);
                      setInvestmentPeriod(preset.years);
                      setExpectedReturn(preset.return);
                    }}
                    className={`p-4 border rounded-xl text-center transition-all ${
                      initialInvestment === preset.initial &&
                      monthlyContribution === preset.monthly &&
                      investmentPeriod === preset.years &&
                      expectedReturn === preset.return
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {preset.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {preset.return}% return
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Inputs */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Investment Details
              </h3>

              <div className="space-y-6">
                {/* Initial Investment */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Initial Investment
                    </label>
                    <span className="text-sm font-medium text-indigo-600">
                      {formatCurrency(initialInvestment)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={initialInvestment}
                    onChange={(e) =>
                      setInitialInvestment(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹0</span>
                    <span>₹5 Lakh</span>
                    <span>₹10 Lakh</span>
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Monthly Contribution
                    </label>
                    <span className="text-sm font-medium text-purple-600">
                      {formatCurrency(monthlyContribution)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={monthlyContribution}
                    onChange={(e) =>
                      setMonthlyContribution(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹0</span>
                    <span>₹25K</span>
                    <span>₹50K</span>
                  </div>
                </div>

                {/* Expected Return */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Expected Annual Return
                    </label>
                    <span className="text-sm font-medium text-pink-600">
                      {expectedReturn}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) =>
                      setExpectedReturn(parseFloat(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1%</span>
                    <span>15.5%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Investment Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Investment Period (Years)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {periodOptions.map((option) => (
                      <button
                        key={option.years}
                        onClick={() => setInvestmentPeriod(option.years)}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          investmentPeriod === option.years
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {option.years * 12} months
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={calculateInvestment}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Calculate Growth
                  </button>
                  <button
                    onClick={resetValues}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Result Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Future Value
              </h3>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(futureValue)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                After {investmentPeriod} years
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Total Invested</span>
                <span className="font-medium text-indigo-600">
                  {formatCurrency(totalInvested)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Total Interest</span>
                <span className="font-medium text-purple-600">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Return on Investment</span>
                <span className="font-medium text-pink-600">
                  {totalInvested > 0
                    ? ((totalInterest / totalInvested) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Investment Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Investment Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Initial Amount</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(initialInvestment)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">Monthly Contribution</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(monthlyContribution)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Percent className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Annual Return</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {expectedReturn}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Time Period</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {investmentPeriod} years
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Yearly Growth
            </h3>
            <div className="space-y-3">
              {yearlyBreakdown.map((year) => (
                <div
                  key={year.year}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Year {year.year}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">
                    {formatCurrency(year.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Growth Projection
            </h3>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          {/* Simple bar chart visualization */}
          <div className="h-64 flex items-end gap-2 p-4 bg-gray-50 rounded-xl">
            {yearlyBreakdown.map((year) => (
              <div
                key={year.year}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg"
                  style={{
                    height: `${Math.min(
                      100,
                      (year.value / futureValue) * 100
                    )}%`,
                  }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">Y{year.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Compound Growth
          </h3>
          <p className="text-gray-600">
            See how your investments grow exponentially with compound interest
            over time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <PieChart className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Detailed Analysis
          </h3>
          <p className="text-gray-600">
            Get yearly breakdowns showing principal vs interest growth.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Scenario Planning
          </h3>
          <p className="text-gray-600">
            Compare different investment strategies and their potential
            outcomes.
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

export default InvestmentCalculator;
