import { useState, useEffect } from "react";
import {
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  TrendingDown,
  Calculator,
  Download,
  RefreshCw,
  Scale,
} from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(5);
  const [loanType, setLoanType] = useState("reducing");
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [comparison, setComparison] = useState({ flat: 0, reducing: 0 });

  const calculateLoan = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure * 12;

    if (loanType === "reducing" || loanType === "both") {
      // Reducing balance EMI calculation
      const emiValue =
        (principal * rate * Math.pow(1 + rate, tenure)) /
        (Math.pow(1 + rate, tenure) - 1);
      setEmi(emiValue);
      setTotalPayment(emiValue * tenure);
      setTotalInterest(emiValue * tenure - principal);
    } else {
      // Flat interest calculation
      const totalInterestFlat = principal * (interestRate / 100) * loanTenure;
      const totalPaymentFlat = principal + totalInterestFlat;
      const emiFlat = totalPaymentFlat / tenure;
      setEmi(emiFlat);
      setTotalPayment(totalPaymentFlat);
      setTotalInterest(totalInterestFlat);
    }

    // Calculate comparison
    const emiReducing =
      (principal * rate * Math.pow(1 + rate, tenure)) /
      (Math.pow(1 + rate, tenure) - 1);
    const totalInterestReducing = emiReducing * tenure - principal;

    const totalInterestFlat = principal * (interestRate / 100) * loanTenure;
    const emiFlat = (principal + totalInterestFlat) / tenure;

    setComparison({
      flat: emiFlat,
      reducing: emiReducing,
      difference: Math.abs(emiFlat - emiReducing),
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTenure, loanType]);

  const resetValues = () => {
    setLoanAmount(500000);
    setInterestRate(8.5);
    setLoanTenure(5);
    setLoanType("reducing");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const loanPresets = [
    { amount: 200000, rate: 9, years: 3, label: "Personal Loan" },
    { amount: 700000, rate: 8, years: 7, label: "Car Loan" },
    { amount: 2000000, rate: 8.5, years: 20, label: "Home Loan" },
    { amount: 1000000, rate: 10, years: 5, label: "Business Loan" },
  ];

  const tenureOptions = [
    { years: 1, label: "1 Year" },
    { years: 3, label: "3 Years" },
    { years: 5, label: "5 Years" },
    { years: 10, label: "10 Years" },
    { years: 15, label: "15 Years" },
    { years: 20, label: "20 Years" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <DollarSign className="w-10 h-10 text-indigo-600" />
          Loan Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate loan payments with flat vs reducing balance interest
          comparison
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Loan Types
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {loanPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setLoanAmount(preset.amount);
                      setInterestRate(preset.rate);
                      setLoanTenure(preset.years);
                    }}
                    className={`p-4 border rounded-xl text-center transition-all ${
                      loanAmount === preset.amount &&
                      interestRate === preset.rate &&
                      loanTenure === preset.years
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {preset.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {preset.rate}% for {preset.years} years
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
                Loan Parameters
              </h3>

              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Loan Amount
                    </label>
                    <span className="text-sm font-medium text-indigo-600">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹1 Lakh</span>
                    <span>₹25 Lakh</span>
                    <span>₹50 Lakh</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Interest Rate (Annual)
                    </label>
                    <span className="text-sm font-medium text-purple-600">
                      {interestRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) =>
                      setInterestRate(parseFloat(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>5%</span>
                    <span>12.5%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Loan Tenure (Years)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {tenureOptions.map((option) => (
                      <button
                        key={option.years}
                        onClick={() => setLoanTenure(option.years)}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          loanTenure === option.years
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

                {/* Interest Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interest Calculation Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLoanType("reducing")}
                      className={`p-4 border rounded-xl text-center transition-all ${
                        loanType === "reducing"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900">
                        Reducing Balance
                      </div>
                      <div className="text-sm text-gray-600">
                        Lower interest over time
                      </div>
                    </button>
                    <button
                      onClick={() => setLoanType("flat")}
                      className={`p-4 border rounded-xl text-center transition-all ${
                        loanType === "flat"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900">
                        Flat Interest
                      </div>
                      <div className="text-sm text-gray-600">
                        Fixed interest amount
                      </div>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={calculateLoan}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate Loan
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
                <Scale className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Monthly Payment
              </h3>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(emi)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {loanType === "reducing" ? "Reducing Balance" : "Flat Interest"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Total Interest</span>
                <span className="font-medium text-purple-600">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Total Payment</span>
                <span className="font-medium text-indigo-600">
                  {formatCurrency(totalPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Loan Amount</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Interest Comparison
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Reducing Balance</span>
                  </div>
                  <span className="font-medium text-green-600">
                    {formatCurrency(comparison.reducing)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Flat Interest</span>
                  </div>
                  <span className="font-medium text-blue-600">
                    {formatCurrency(comparison.flat)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-gray-700 font-medium">Difference</span>
                  <span className="font-bold text-pink-600">
                    {formatCurrency(comparison.difference)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Potential Savings
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Choosing reducing balance over flat interest can save you:
            </p>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(comparison.difference * loanTenure * 12)}
              </div>
              <div className="text-sm text-gray-600">
                over {loanTenure} years
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Scale className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Dual Calculation
          </h3>
          <p className="text-gray-600">
            Compare flat vs reducing balance interest calculations side by side.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingDown className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Savings Analysis
          </h3>
          <p className="text-gray-600">
            See how much you can save with different interest calculation
            methods.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Loan Types
          </h3>
          <p className="text-gray-600">
            Calculate payments for personal, home, car, and business loans.
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

export default LoanCalculator;
