// finance/index.jsx
import React from "react";
import EMICalculator from "./emi-calculator.jsx";
import CurrencyConverter from "./currency-converter.jsx";
import InvestmentCalculator from "./investment-calculator.jsx";
import TaxCalculator from "./tax-calculator.jsx";
import LoanCalculator from "./loan-calculator.jsx";

const PlaceholderComponent = ({ name }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
    <p className="text-gray-600 text-lg mb-8">This tool is under development</p>
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
      <div className="text-3xl font-bold text-gray-400">Coming Soon</div>
    </div>
  </div>
);

export const financeTools = [
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    component: LoanCalculator,
    description:
      "Calculate loan payments with flat vs reducing balance interest",
    icon: "DollarSign",
    tags: ["finance", "calculator", "loan"],
    color: "indigo",
    popular: true,
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    component: EMICalculator,
    description: "Calculate Equated Monthly Installments for loans",
    icon: "Calculator",
    tags: ["finance", "calculator", "emi"],
    color: "indigo",
    popular: true,
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    component: CurrencyConverter,
    description: "Convert between different currencies",
    icon: "RefreshCw",
    tags: ["finance", "currency", "converter"],
    color: "indigo",
  },
  {
    id: "investment-calculator",
    name: "Investment Calculator",
    component: InvestmentCalculator,
    description: "Calculate investment returns and growth",
    icon: "TrendingUp",
    tags: ["finance", "calculator", "investment"],
    color: "indigo",
  },
  {
    id: "tax-calculator",
    name: "Tax Calculator",
    component: TaxCalculator,
    description: "Calculate income tax and deductions",
    icon: "Receipt",
    tags: ["finance", "calculator", "tax"],
    color: "indigo",
  },
];

export {
  EMICalculator,
  CurrencyConverter,
  InvestmentCalculator,
  TaxCalculator,
  LoanCalculator,
};
