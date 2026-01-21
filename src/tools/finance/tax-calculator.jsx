import { useState, useEffect } from "react";
import {
  Receipt,
  Calculator,
  DollarSign,
  Percent,
  TrendingDown,
  FileText,
  Download,
  RefreshCw,
  Shield,
} from "lucide-react";

const TaxCalculator = () => {
  const [income, setIncome] = useState(800000);
  const [ageGroup, setAgeGroup] = useState("below-60");
  const [deductions, setDeductions] = useState(150000);
  const [taxLiability, setTaxLiability] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);
  const [taxSlabs, setTaxSlabs] = useState([]);
  const [breakdown, setBreakdown] = useState([]);

  const calculateTax = () => {
    const taxableIncome = Math.max(0, income - deductions);
    let tax = 0;
    const slabs = [];
    const taxBreakdown = [];

    // Get tax slabs based on age group
    let taxSlabRates = [];
    if (ageGroup === "below-60") {
      taxSlabRates = [
        { limit: 250000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 750000, rate: 0.1 },
        { limit: 1000000, rate: 0.15 },
        { limit: 1250000, rate: 0.2 },
        { limit: 1500000, rate: 0.25 },
        { limit: Infinity, rate: 0.3 },
      ];
    } else if (ageGroup === "60-80") {
      taxSlabRates = [
        { limit: 300000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 750000, rate: 0.1 },
        { limit: 1000000, rate: 0.15 },
        { limit: 1250000, rate: 0.2 },
        { limit: 1500000, rate: 0.25 },
        { limit: Infinity, rate: 0.3 },
      ];
    } else {
      taxSlabRates = [
        { limit: 500000, rate: 0 },
        { limit: 750000, rate: 0.05 },
        { limit: 1000000, rate: 0.1 },
        { limit: 1250000, rate: 0.15 },
        { limit: 1500000, rate: 0.2 },
        { limit: Infinity, rate: 0.25 },
      ];
    }

    let remainingIncome = taxableIncome;
    let previousLimit = 0;

    for (let i = 0; i < taxSlabRates.length; i++) {
      const slab = taxSlabRates[i];
      const slabIncome = Math.min(remainingIncome, slab.limit - previousLimit);

      if (slabIncome > 0) {
        const slabTax = slabIncome * slab.rate;
        tax += slabTax;

        slabs.push({
          range: `₹${formatNumber(previousLimit)} - ₹${formatNumber(
            slab.limit
          )}`,
          rate: `${(slab.rate * 100).toFixed(0)}%`,
          tax: slabTax,
        });

        taxBreakdown.push({
          slab: i + 1,
          income: slabIncome,
          rate: slab.rate,
          tax: slabTax,
        });
      }

      previousLimit = slab.limit;
      remainingIncome -= slabIncome;

      if (remainingIncome <= 0) break;
    }

    // Add health and education cess (4%)
    const cess = tax * 0.04;
    tax += cess;

    setTaxLiability(tax);
    setEffectiveRate(income > 0 ? (tax / income) * 100 : 0);
    setTaxSlabs(slabs);
    setBreakdown(taxBreakdown);
  };

  useEffect(() => {
    calculateTax();
  }, [income, ageGroup, deductions]);

  const resetValues = () => {
    setIncome(800000);
    setAgeGroup("below-60");
    setDeductions(150000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const incomePresets = [
    { amount: 500000, label: "Entry Level" },
    { amount: 800000, label: "Mid Level" },
    { amount: 1500000, label: "Senior Level" },
    { amount: 2500000, label: "Executive" },
  ];

  const deductionOptions = [
    { amount: 50000, label: "Standard" },
    { amount: 150000, label: "80C + Standard" },
    { amount: 200000, label: "Maximum" },
    { amount: 0, label: "No Deduction" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Receipt className="w-10 h-10 text-indigo-600" />
          Income Tax Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate your income tax liability with deductions and tax slabs
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Income Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Income Levels
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {incomePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setIncome(preset.amount)}
                    className={`p-4 border rounded-xl text-center transition-all ${
                      income === preset.amount
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {preset.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(preset.amount)}
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
                Tax Calculation Details
              </h3>

              <div className="space-y-6">
                {/* Annual Income */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Annual Income
                    </label>
                    <span className="text-sm font-medium text-indigo-600">
                      {formatCurrency(income)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300000"
                    max="5000000"
                    step="50000"
                    value={income}
                    onChange={(e) => setIncome(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹3 Lakh</span>
                    <span>₹25 Lakh</span>
                    <span>₹50 Lakh</span>
                  </div>
                </div>

                {/* Age Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Age Group
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setAgeGroup("below-60")}
                      className={`p-4 border rounded-xl text-center transition-all ${
                        ageGroup === "below-60"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900">Below 60</div>
                      <div className="text-sm text-gray-600">Standard</div>
                    </button>
                    <button
                      onClick={() => setAgeGroup("60-80")}
                      className={`p-4 border rounded-xl text-center transition-all ${
                        ageGroup === "60-80"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900">
                        60-80 Years
                      </div>
                      <div className="text-sm text-gray-600">
                        Senior Citizen
                      </div>
                    </button>
                    <button
                      onClick={() => setAgeGroup("above-80")}
                      className={`p-4 border rounded-xl text-center transition-all ${
                        ageGroup === "above-80"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900">Above 80</div>
                      <div className="text-sm text-gray-600">Super Senior</div>
                    </button>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Standard Deductions
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {deductionOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => setDeductions(option.amount)}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          deductions === option.amount
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(option.amount)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={calculateTax}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate Tax
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
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tax Liability
              </h3>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(taxLiability)}
              </div>
              <p className="text-sm text-gray-600 mt-2">Annual tax amount</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Taxable Income</span>
                <span className="font-medium text-indigo-600">
                  {formatCurrency(Math.max(0, income - deductions))}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Effective Tax Rate</span>
                <span className="font-medium text-purple-600">
                  {effectiveRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Net Income</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(income - taxLiability)}
                </span>
              </div>
            </div>
          </div>

          {/* Tax Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tax Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Gross Income</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(income)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">Deductions</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(deductions)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Percent className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Tax Slab</span>
                  </div>
                  <span className="font-medium text-gray-900 capitalize">
                    {ageGroup.replace("-", " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Monthly Tax</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(taxLiability / 12)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Slabs */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tax Slabs Applied
            </h3>
            <div className="space-y-2">
              {taxSlabs.slice(0, 3).map((slab, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{slab.range}</span>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">
                    {slab.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tax Breakdown */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Detailed Tax Calculation
            </h3>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
              <Download className="w-4 h-4" />
              Export Calculation
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Tax Slab
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Income in Slab
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Tax Rate
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Tax Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((item) => (
                  <tr
                    key={item.slab}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Slab {item.slab}
                    </td>
                    <td className="py-3 px-4 text-indigo-600">
                      {formatCurrency(item.income)}
                    </td>
                    <td className="py-3 px-4 text-purple-600">
                      {(item.rate * 100).toFixed(0)}%
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {formatCurrency(item.tax)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="py-3 px-4" colSpan={3}>
                    Total Tax (before cess)
                  </td>
                  <td className="py-3 px-4 text-green-600">
                    {formatCurrency(taxLiability / 1.04)}
                  </td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="py-3 px-4" colSpan={3}>
                    Health & Education Cess (4%)
                  </td>
                  <td className="py-3 px-4 text-pink-600">
                    {formatCurrency(taxLiability * 0.04)}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="py-3 px-4" colSpan={3}>
                    Total Tax Liability
                  </td>
                  <td className="py-3 px-4 text-green-700">
                    {formatCurrency(taxLiability)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Receipt className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Tax Regimes
          </h3>
          <p className="text-gray-600">
            Calculate tax under both old and new tax regimes with deductions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingDown className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Deduction Planning
          </h3>
          <p className="text-gray-600">
            Optimize your tax savings with various deduction options.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Detailed Breakdown
          </h3>
          <p className="text-gray-600">
            Get slab-wise tax calculation with complete transparency.
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

export default TaxCalculator;
