import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  Download,
  RefreshCw,
  PieChart,
  TrendingDown,
} from "lucide-react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [breakdown, setBreakdown] = useState([]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure * 12;

    let emiValue; // Declare emiValue here so it's available in the entire function

    if (rate === 0) {
      emiValue = principal / tenure; // Assign value
      setEmi(emiValue);
      setTotalInterest(0);
      setTotalPayment(principal);
    } else {
      emiValue =
        (principal * rate * Math.pow(1 + rate, tenure)) /
        (Math.pow(1 + rate, tenure) - 1); // Assign value
      setEmi(emiValue);
      setTotalPayment(emiValue * tenure);
      setTotalInterest(emiValue * tenure - principal);
    }

    // Generate amortization breakdown
    const breakdownArray = [];
    let remainingPrincipal = principal;
    for (let month = 1; month <= 5 && month <= tenure; month++) {
      const interest = remainingPrincipal * rate;
      const principalPaid = emiValue - interest; // Now emiValue is defined here
      remainingPrincipal -= principalPaid;

      breakdownArray.push({
        month,
        principal: principalPaid,
        interest,
        balance: remainingPrincipal,
      });
    }
    setBreakdown(breakdownArray);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const resetValues = () => {
    setLoanAmount(500000);
    setInterestRate(8.5);
    setLoanTenure(20);
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

  const tenureOptions = [
    { years: 5, label: "5 Years" },
    { years: 10, label: "10 Years" },
    { years: 15, label: "15 Years" },
    { years: 20, label: "20 Years" },
    { years: 25, label: "25 Years" },
    { years: 30, label: "30 Years" },
  ];

  const loanPresets = [
    { amount: 500000, label: "Home Loan" },
    { amount: 1000000, label: "Car Loan" },
    { amount: 50000, label: "Personal Loan" },
    { amount: 2000000, label: "Business Loan" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Calculator className="w-10 h-10 text-indigo-600" />
          EMI Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate your Equated Monthly Installment (EMI) for loans. Plan your
          finances with detailed breakdown.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Loan Presets
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {loanPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setLoanAmount(preset.amount)}
                    className={`p-4 border rounded-xl text-center transition-all ${
                      loanAmount === preset.amount
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
                Loan Details
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
                    min="50000"
                    max="5000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹50K</span>
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

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={calculateEMI}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate EMI
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
          {/* EMI Result Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Monthly EMI
              </h3>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(emi)}
              </div>
              <p className="text-sm text-gray-600 mt-2">Per month</p>
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

          {/* Loan Details */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Loan Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Principal Amount</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Percent className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">Interest Rate</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {interestRate}% p.a.
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Loan Tenure</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {loanTenure} years ({loanTenure * 12} months)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Total Payable</span>
                  </div>
                  <span className="font-bold text-green-600">
                    {formatCurrency(totalPayment)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Interest vs Principal
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                  <span className="text-sm text-gray-700">Principal</span>
                </div>
                <span className="text-sm font-medium text-indigo-600">
                  {Math.round((loanAmount / totalPayment) * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span className="text-sm text-gray-700">Interest</span>
                </div>
                <span className="text-sm font-medium text-purple-600">
                  {Math.round((totalInterest / totalPayment) * 100)}%
                </span>
              </div>
            </div>
            <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Schedule */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Amortization Schedule (First 5 Months)
            </h3>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
              <Download className="w-4 h-4" />
              Export Schedule
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Month
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    EMI Payment
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Principal
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Interest
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Outstanding Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((item) => (
                  <tr
                    key={item.month}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {item.month}
                    </td>
                    <td className="py-3 px-4 text-indigo-600">
                      {formatCurrency(emi)}
                    </td>
                    <td className="py-3 px-4 text-green-600">
                      {formatCurrency(item.principal)}
                    </td>
                    <td className="py-3 px-4 text-purple-600">
                      {formatCurrency(item.interest)}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {formatCurrency(item.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <PieChart className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Detailed Breakdown
          </h3>
          <p className="text-gray-600">
            Get complete amortization schedule showing principal vs interest
            payments over time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingDown className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Impact Analysis
          </h3>
          <p className="text-gray-600">
            See how changes in interest rates and tenure affect your monthly
            payments.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Multiple Scenarios
          </h3>
          <p className="text-gray-600">
            Compare different loan options with preset configurations for
            various needs.
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Personal Finance
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Calculate home loan EMIs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Plan car loan repayments</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Estimate personal loan costs</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Business Planning
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Calculate business loan EMIs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Plan equipment financing</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Estimate working capital requirements</span>
              </li>
            </ul>
          </div>
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

export default EMICalculator;
