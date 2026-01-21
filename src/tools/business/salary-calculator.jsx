import React, { useState } from "react";
import {
  DollarSign,
  Calculator,
  Users,
  TrendingUp,
  Percent,
  Calendar,
  Download,
  Copy,
  Check,
  AlertCircle,
  Banknote,
  Shield,
  CreditCard,
  Receipt,
  Home,
  Car,
  Utensils,
  BarChart3,
  PieChart,
  Target,
  Zap,
  RefreshCw,
} from "lucide-react";

const SalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState(60000);
  const [payFrequency, setPayFrequency] = useState("annually");
  const [federalTaxRate, setFederalTaxRate] = useState(22);
  const [stateTaxRate, setStateTaxRate] = useState(5);
  const [socialSecurityRate, setSocialSecurityRate] = useState(6.2);
  const [medicareRate, setMedicareRate] = useState(1.45);
  const [retirementContribution, setRetirementContribution] = useState(5);
  const [healthInsurance, setHealthInsurance] = useState(200);
  const [otherDeductions, setOtherDeductions] = useState(100);
  const [bonuses, setBonuses] = useState(2000);
  const [cityTaxRate, setCityTaxRate] = useState(0);

  const calculateSalary = () => {
    let annualGross = grossSalary;
    
    // Adjust for pay frequency
    if (payFrequency === "monthly") annualGross = grossSalary * 12;
    if (payFrequency === "biweekly") annualGross = grossSalary * 26;
    if (payFrequency === "weekly") annualGross = grossSalary * 52;
    if (payFrequency === "hourly") annualGross = grossSalary * 2080; // 40 hours/week * 52 weeks

    // Calculate deductions
    const federalTax = (annualGross * federalTaxRate) / 100;
    const stateTax = (annualGross * stateTaxRate) / 100;
    const cityTax = (annualGross * cityTaxRate) / 100;
    const socialSecurity = (annualGross * socialSecurityRate) / 100;
    const medicare = (annualGross * medicareRate) / 100;
    const retirement = (annualGross * retirementContribution) / 100;
    
    const totalAnnualDeductions = federalTax + stateTax + cityTax + socialSecurity + medicare + retirement + 
                                 (healthInsurance * 12) + (otherDeductions * 12);
    
    const netAnnual = annualGross - totalAnnualDeductions + bonuses;
    
    // Calculate per period
    const monthlyGross = annualGross / 12;
    const biweeklyGross = annualGross / 26;
    const weeklyGross = annualGross / 52;
    const hourlyGross = annualGross / 2080;
    
    const monthlyNet = netAnnual / 12;
    const biweeklyNet = netAnnual / 26;
    const weeklyNet = netAnnual / 52;
    const hourlyNet = netAnnual / 2080;
    
    // Tax breakdown percentages
    const totalTaxRate = federalTaxRate + stateTaxRate + cityTaxRate + socialSecurityRate + medicareRate;
    const effectiveTaxRate = ((federalTax + stateTax + cityTax + socialSecurity + medicare) / annualGross) * 100;
    const takeHomePercentage = (netAnnual / annualGross) * 100;
    
    return {
      annualGross,
      annualNet: netAnnual,
      monthlyGross,
      monthlyNet,
      biweeklyGross,
      biweeklyNet,
      weeklyGross,
      weeklyNet,
      hourlyGross,
      hourlyNet,
      federalTax,
      stateTax,
      cityTax,
      socialSecurity,
      medicare,
      retirement,
      healthInsuranceAnnual: healthInsurance * 12,
      otherDeductionsAnnual: otherDeductions * 12,
      totalDeductions: totalAnnualDeductions,
      totalTaxRate: totalTaxRate.toFixed(1),
      effectiveTaxRate: effectiveTaxRate.toFixed(1),
      takeHomePercentage: takeHomePercentage.toFixed(1),
      bonuses
    };
  };

  const results = calculateSalary();

  const payFrequencyOptions = [
    { id: "annually", label: "Annual", multiplier: 1, color: "from-blue-600 to-cyan-600" },
    { id: "monthly", label: "Monthly", multiplier: 12, color: "from-purple-600 to-pink-600" },
    { id: "biweekly", label: "Bi-weekly", multiplier: 26, color: "from-green-600 to-emerald-600" },
    { id: "weekly", label: "Weekly", multiplier: 52, color: "from-orange-600 to-red-600" },
    { id: "hourly", label: "Hourly", multiplier: 2080, color: "from-indigo-600 to-purple-600" },
  ];

  const taxBrackets = [
    { min: 0, max: 11000, rate: 10, label: "10% - Up to $11,000" },
    { min: 11001, max: 44725, rate: 12, label: "12% - $11,001 to $44,725" },
    { min: 44726, max: 95375, rate: 22, label: "22% - $44,726 to $95,375" },
    { min: 95376, max: 182100, rate: 24, label: "24% - $95,376 to $182,100" },
    { min: 182101, max: 231250, rate: 32, label: "32% - $182,101 to $231,250" },
    { min: 231251, max: 578125, rate: 35, label: "35% - $231,251 to $578,125" },
    { min: 578126, max: Infinity, rate: 37, label: "37% - Over $578,125" },
  ];

  const currentBracket = taxBrackets.find(bracket => 
    results.annualGross >= bracket.min && results.annualGross <= bracket.max
  ) || taxBrackets[taxBrackets.length - 1];

  const handleCopyResults = async () => {
    const resultsText = `Salary Calculation Results:
- Gross Annual: $${results.annualGross.toLocaleString()}
- Net Annual: $${results.annualNet.toLocaleString()}
- Monthly Take-home: $${results.monthlyNet.toLocaleString()}
- Effective Tax Rate: ${results.effectiveTaxRate}%
- Take-home Percentage: ${results.takeHomePercentage}%`;
    
    try {
      await navigator.clipboard.writeText(resultsText);
      alert("✓ Salary results copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleReset = () => {
    setGrossSalary(60000);
    setPayFrequency("annually");
    setFederalTaxRate(22);
    setStateTaxRate(5);
    setCityTaxRate(0);
    setSocialSecurityRate(6.2);
    setMedicareRate(1.45);
    setRetirementContribution(5);
    setHealthInsurance(200);
    setOtherDeductions(100);
    setBonuses(2000);
  };

  const handleDownload = () => {
    const content = `Salary Calculation Report
=====================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

SALARY DETAILS:
---------------
Gross Salary: $${grossSalary.toLocaleString()} (${payFrequency})
Federal Tax Rate: ${federalTaxRate}%
State Tax Rate: ${stateTaxRate}%
City Tax Rate: ${cityTaxRate}%
Social Security: ${socialSecurityRate}%
Medicare: ${medicareRate}%
Retirement Contribution: ${retirementContribution}%
Health Insurance: $${healthInsurance}/month
Other Deductions: $${otherDeductions}/month
Annual Bonuses: $${bonuses.toLocaleString()}

CALCULATED RESULTS:
-------------------
Annual Gross Income: $${results.annualGross.toLocaleString()}
Annual Net Income: $${results.annualNet.toLocaleString()}
Monthly Take-home: $${results.monthlyNet.toLocaleString()}
Bi-weekly Take-home: $${results.biweeklyNet.toLocaleString()}
Weekly Take-home: $${results.weeklyNet.toLocaleString()}
Hourly Rate (after tax): $${results.hourlyNet.toFixed(2)}

TAX BREAKDOWN:
--------------
Federal Tax: $${results.federalTax.toLocaleString()}
State Tax: $${results.stateTax.toLocaleString()}
City Tax: $${results.cityTax.toLocaleString()}
Social Security: $${results.socialSecurity.toLocaleString()}
Medicare: $${results.medicare.toLocaleString()}
Retirement: $${results.retirement.toLocaleString()}
Health Insurance: $${results.healthInsuranceAnnual.toLocaleString()}
Other Deductions: $${results.otherDeductionsAnnual.toLocaleString()}
Total Deductions: $${results.totalDeductions.toLocaleString()}

SUMMARY:
--------
Effective Tax Rate: ${results.effectiveTaxRate}%
Take-home Percentage: ${results.takeHomePercentage}%
Current Tax Bracket: ${currentBracket.rate}%

Notes:
This report was generated using the Salary Calculator tool.
Tax rates are estimates - consult with a tax professional for accurate calculations.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `salary-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const budgetBreakdown = [
    { category: "Housing", percentage: 30, color: "from-blue-500 to-cyan-500", icon: Home },
    { category: "Transportation", percentage: 15, color: "from-purple-500 to-pink-500", icon: Car },
    { category: "Food & Dining", percentage: 12, color: "from-green-500 to-emerald-500", icon: Utensils },
    { category: "Savings & Investments", percentage: 20, color: "from-yellow-500 to-amber-500", icon: TrendingUp },
    { category: "Entertainment", percentage: 8, color: "from-red-500 to-orange-500", icon: Users },
    { category: "Other Expenses", percentage: 15, color: "from-indigo-500 to-purple-500", icon: Receipt },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Salary Calculator
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Calculate net salary, taxes, deductions, and take-home pay with
              detailed breakdowns
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Calculator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Salary Settings Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-orange-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Salary Parameters
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Pay Frequency and Gross Salary */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Pay Frequency
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {payFrequencyOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setPayFrequency(option.id)}
                          className={`p-2 rounded-lg text-center text-sm font-medium ${
                            payFrequency === option.id
                              ? `bg-gradient-to-r ${option.color} text-white shadow-md`
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Gross Salary
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={grossSalary}
                        onChange={(e) =>
                          setGrossSalary(parseFloat(e.target.value) || 0)
                        }
                      />
                      <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Tax Rates */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        Federal Tax (%)
                      </div>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="50"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={federalTaxRate}
                      onChange={(e) =>
                        setFederalTaxRate(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        State Tax (%)
                      </div>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="15"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={stateTaxRate}
                      onChange={(e) =>
                        setStateTaxRate(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        City Tax (%)
                      </div>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={cityTaxRate}
                      onChange={(e) =>
                        setCityTaxRate(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>

                {/* Social Security & Medicare */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Security (6.2%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="12.4"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={socialSecurityRate}
                      onChange={(e) =>
                        setSocialSecurityRate(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medicare (1.45%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="3.8"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={medicareRate}
                      onChange={(e) =>
                        setMedicareRate(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>

                {/* Deductions & Bonuses */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retirement Contribution (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={retirementContribution}
                        onChange={(e) =>
                          setRetirementContribution(
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Health Insurance ($/month)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={healthInsurance}
                        onChange={(e) =>
                          setHealthInsurance(parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Deductions ($/month)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={otherDeductions}
                        onChange={(e) =>
                          setOtherDeductions(parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Bonuses ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={bonuses}
                        onChange={(e) =>
                          setBonuses(parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Salary Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Adjust Salary: ${grossSalary.toLocaleString()}
                    </label>
                    <span className="text-sm text-gray-500">
                      Drag to adjust
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="1000"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$10k</span>
                    <span>$500k</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Calculate Salary
                  </button>
                  <button
                    onClick={handleCopyResults}
                    className="px-6 py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all flex items-center gap-2"
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
                  Salary Breakdown
                </h2>
                <div className="text-sm font-medium text-gray-700">
                  Take-home: {results.takeHomePercentage}%
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Gross vs Net Comparison */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Gross Income
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Annual</span>
                      <span className="text-2xl font-bold">
                        ${results.annualGross.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly</span>
                      <span className="text-xl font-bold">
                        ${results.monthlyGross.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bi-weekly</span>
                      <span className="text-lg font-bold">
                        ${results.biweeklyGross.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Weekly</span>
                      <span className="text-lg font-bold">
                        ${results.weeklyGross.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-green-600" />
                    Net Income (Take-home)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Annual</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${results.annualNet.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly</span>
                      <span className="text-xl font-bold text-green-600">
                        ${results.monthlyNet.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bi-weekly</span>
                      <span className="text-lg font-bold text-green-600">
                        ${results.biweeklyNet.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Weekly</span>
                      <span className="text-lg font-bold text-green-600">
                        ${results.weeklyNet.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Deductions Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">Federal Tax</span>
                    <span className="font-bold text-gray-900">
                      ${results.federalTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">State Tax</span>
                    <span className="font-bold text-gray-900">
                      ${results.stateTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">Social Security</span>
                    <span className="font-bold text-gray-900">
                      ${results.socialSecurity.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">Medicare</span>
                    <span className="font-bold text-gray-900">
                      ${results.medicare.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">Retirement</span>
                    <span className="font-bold text-gray-900">
                      ${results.retirement.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="text-gray-700">Health Insurance</span>
                    <span className="font-bold text-gray-900">
                      ${results.healthInsuranceAnnual.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg border-t border-gray-200 pt-4">
                    <span className="text-lg font-bold text-gray-900">
                      Total Deductions
                    </span>
                    <span className="text-lg font-bold text-red-600">
                      ${results.totalDeductions.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tax Bracket Info */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Federal Tax Bracket
                </h3>
                <div className="p-4 bg-white/70 rounded-lg mb-3">
                  <div className="font-medium text-gray-900 mb-1">
                    Current Bracket
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {currentBracket.rate}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentBracket.label}
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="flex justify-between mb-1">
                    <span>Effective Tax Rate</span>
                    <span className="font-bold">
                      {results.effectiveTaxRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Tax Rate</span>
                    <span className="font-bold">{results.totalTaxRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Planner */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Budget Planner (Based on Monthly Take-home)
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {budgetBreakdown.map((item, index) => {
                  const Icon = item.icon;
                  const amount = (results.monthlyNet * item.percentage) / 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">
                            $
                            {amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.percentage}% of income
                          </div>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features & Tips */}
        <div className="space-y-6">
          {/* Features Card */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-orange-600" />
              Calculator Features
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Detailed Breakdown
                </div>
                <div className="text-sm text-gray-600">
                  Complete salary breakdown with all deductions
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Tax Calculations
                </div>
                <div className="text-sm text-gray-600">
                  Federal, state, and local tax calculations
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Multiple Frequencies
                </div>
                <div className="text-sm text-gray-600">
                  Convert between annual, monthly, weekly, hourly
                </div>
              </div>
            </div>
          </div>

          {/* Budget Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-2">
                  Budget Tips
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Aim to save 20% of take-home pay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Maximize retirement contributions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Consider tax-advantaged accounts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Salaries */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Common Salaries
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setGrossSalary(50000);
                  setFederalTaxRate(22);
                  setPayFrequency("annually");
                }}
                className="w-full p-3 bg-white/70 rounded-lg text-left hover:bg-white transition-all"
              >
                <div className="font-medium text-gray-900">Entry Level</div>
                <div className="text-sm text-gray-600">$50,000 annual</div>
              </button>
              <button
                onClick={() => {
                  setGrossSalary(80000);
                  setFederalTaxRate(24);
                  setPayFrequency("annually");
                }}
                className="w-full p-3 bg-white/70 rounded-lg text-left hover:bg-white transition-all"
              >
                <div className="font-medium text-gray-900">Mid Career</div>
                <div className="text-sm text-gray-600">$80,000 annual</div>
              </button>
              <button
                onClick={() => {
                  setGrossSalary(120000);
                  setFederalTaxRate(32);
                  setPayFrequency("annually");
                }}
                className="w-full p-3 bg-white/70 rounded-lg text-left hover:bg-white transition-all"
              >
                <div className="font-medium text-gray-900">Senior Level</div>
                <div className="text-sm text-gray-600">$120,000 annual</div>
              </button>
            </div>
          </div>

          {/* Tax Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tax Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Maximize pre-tax retirement contributions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Consider Health Savings Accounts (HSAs)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Track deductible expenses</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Adjust withholdings as needed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Precise Calculations
          </h3>
          <p className="text-gray-600">
            Accurate salary calculations with all taxes and deductions included
            for precise take-home pay.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
            <PieChart className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Detailed Breakdown
          </h3>
          <p className="text-gray-600">
            Complete breakdown of taxes, deductions, and net income for better
            financial planning.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Pay Frequency
          </h3>
          <p className="text-gray-600">
            Convert between annual, monthly, bi-weekly, weekly, and hourly pay
            rates instantly.
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

export default SalaryCalculator;