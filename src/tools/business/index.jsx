import BusinessPlan from "./business-plan.jsx";
import ContractGenerator from "./contract-generator.jsx";
import InvoiceGenerator from "./invoice-generator.jsx";
import ROICalculator from "./roi-calculator.jsx";
import SalaryCalculator from "./salary-calculator.jsx";

export const businessTools = [
  {
    id: "business-plan",
    name: "Business Plan",
    component: BusinessPlan,
    description: "Create professional business plans with templates",
    icon: "Briefcase",
    tags: ["business", "planning", "startup", "strategy", "professional"],
    color: "indigo",
    popular: true,
  },
  {
    id: "contract-generator",
    name: "Contract Generator",
    component: ContractGenerator,
    description: "Generate legal contracts and agreements",
    icon: "FileText",
    tags: ["legal", "contract", "agreement", "business", "document"],
    color: "blue",
    popular: true,
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    component: InvoiceGenerator,
    description: "Create professional invoices and billing documents",
    icon: "DollarSign",
    tags: ["finance", "invoice", "billing", "payment", "business"],
    color: "green",
    popular: true,
  },
  {
    id: "roi-calculator",
    name: "ROI Calculator",
    component: ROICalculator,
    description: "Calculate Return on Investment for business projects",
    icon: "TrendingUp",
    tags: ["finance", "investment", "calculator", "business", "analysis"],
    color: "purple",
    popular: false,
  },
  {
    id: "salary-calculator",
    name: "Salary Calculator",
    component: SalaryCalculator,
    description: "Calculate salaries, taxes, and net income",
    icon: "Users",
    tags: ["finance", "salary", "tax", "calculator", "hr"],
    color: "orange",
    popular: false,
  },
];

export {
  BusinessPlan,
  ContractGenerator,
  InvoiceGenerator,
  ROICalculator,
  SalaryCalculator,
};
