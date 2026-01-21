import React, { useState } from "react";
import {
  FileText,
  Download,
  Copy,
  Printer,
  ChevronRight,
  AlertCircle,
  Check,
  Calendar,
  MapPin,
  Clock,
  Users,
  FileSignature,
  Shield,
} from "lucide-react";

const ContractGenerator = () => {
  const [contractType, setContractType] = useState("nda");
  const [party1Name, setParty1Name] = useState("");
  const [party2Name, setParty2Name] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [terms, setTerms] = useState("2 years");
  const [jurisdiction, setJurisdiction] = useState("");
  const [additionalTerms, setAdditionalTerms] = useState("");

  const contractTemplates = [
    {
      id: "nda",
      name: "Non-Disclosure Agreement",
      color: "from-blue-600 to-cyan-600",
      icon: Shield,
    },
    {
      id: "service",
      name: "Service Agreement",
      color: "from-purple-600 to-pink-600",
      icon: FileText,
    },
    {
      id: "employment",
      name: "Employment Contract",
      color: "from-green-600 to-emerald-600",
      icon: Users,
    },
    {
      id: "lease",
      name: "Lease Agreement",
      color: "from-orange-600 to-red-600",
      icon: FileSignature,
    },
    {
      id: "partnership",
      name: "Partnership Agreement",
      color: "from-indigo-600 to-purple-600",
      icon: Users,
    },
  ];

  const generateContract = () => {
    const templates = {
      nda: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of ${
        effectiveDate || "[DATE]"
      } by and between:

${party1Name || "[PARTY 1 NAME]"} ("Disclosing Party")
and
${party2Name || "[PARTY 2 NAME]"} ("Receiving Party")

1. CONFIDENTIAL INFORMATION
The term "Confidential Information" means any information or material that is proprietary to the Disclosing Party.

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party shall hold and maintain the Confidential Information in strictest confidence.

3. TIME PERIODS
This Agreement shall remain in effect for a period of ${
        terms || "[TERM]"
      } from the Effective Date.

4. GOVERNING LAW
This Agreement shall be governed by the laws of ${
        jurisdiction || "[JURISDICTION]"
      }.

${additionalTerms ? `\n5. ADDITIONAL TERMS\n${additionalTerms}\n` : ""}

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

___________________________          ___________________________
${party1Name || "[PARTY 1 SIGNATURE]"}          ${
        party2Name || "[PARTY 2 SIGNATURE]"
      }
Date: ${effectiveDate || "[DATE]"}              Date: ${
        effectiveDate || "[DATE]"
      }`,

      service: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is made effective as of ${
        effectiveDate || "[DATE]"
      } by and between:

${party1Name || "[SERVICE PROVIDER]"} ("Provider")
and
${party2Name || "[CLIENT]"} ("Client")

1. SERVICES
Provider agrees to provide services as described in attached exhibits.

2. COMPENSATION
Client agrees to pay Provider for services as outlined in attached schedule.

3. TERM
This Agreement shall commence on the Effective Date and continue for ${
        terms || "[TERM]"
      }.

4. GOVERNING LAW
This Agreement shall be governed by the laws of ${
        jurisdiction || "[JURISDICTION]"
      }.

${additionalTerms ? `\n5. ADDITIONAL TERMS\n${additionalTerms}\n` : ""}

___________________________          ___________________________
${party1Name || "[PROVIDER SIGNATURE]"}          ${
        party2Name || "[CLIENT SIGNATURE]"
      }
Date: ${effectiveDate || "[DATE]"}              Date: ${
        effectiveDate || "[DATE]"
      }`,
    };

    return templates[contractType] || templates.nda;
  };

  const handleDownload = () => {
    const contractContent = generateContract();
    const blob = new Blob([contractContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contractType}-agreement-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateContract());
      alert("✓ Contract copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Contract Document</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; background: #f8fafc; }
            .contract { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            pre { white-space: pre-wrap; font-family: 'Courier New', monospace; }
            .header { text-align: center; margin-bottom: 30px; }
            .signatures { margin-top: 60px; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="contract">
            <pre>${generateContract()}</pre>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const currentTemplate = contractTemplates.find((t) => t.id === contractType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Contract Generator
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Create professional legal contracts with customizable templates
              and terms
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Contract Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract Settings Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-blue-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Contract Details
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Contract Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {contractTemplates.map((template) => {
                      const Icon = template.icon;
                      return (
                        <button
                          key={template.id}
                          onClick={() => setContractType(template.id)}
                          className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                            contractType === template.id
                              ? `bg-gradient-to-r ${template.color} text-white shadow-lg scale-105`
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium text-center">
                            {template.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Parties Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Party 1 (Disclosing)
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name / Company
                        </label>
                        <input
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter first party name"
                          value={party1Name}
                          onChange={(e) => setParty1Name(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      Party 2 (Receiving)
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name / Company
                        </label>
                        <input
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter second party name"
                          value={party2Name}
                          onChange={(e) => setParty2Name(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contract Terms */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Effective Date
                      </div>
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Terms & Duration
                      </div>
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 2 years, 90 days"
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Governing Jurisdiction
                      </div>
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., State of California"
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                    />
                  </div>
                </div>

                {/* Additional Terms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Terms (Optional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                    placeholder="Enter any additional terms or special conditions..."
                    value={additionalTerms}
                    onChange={(e) => setAdditionalTerms(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Contract
                  </button>
                  <button
                    onClick={handleCopy}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Contract Preview
                </h2>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {currentTemplate?.name}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 p-6 rounded-xl whitespace-pre-wrap font-mono text-sm border-2 border-gray-200 max-h-[400px] overflow-y-auto">
                {generateContract()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features & Info */}
        <div className="space-y-6">
          {/* Features Card */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-600" />
              Key Features
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Professional Templates
                </div>
                <div className="text-sm text-gray-600">
                  Industry-standard contract templates
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Easy Customization
                </div>
                <div className="text-sm text-gray-600">
                  Edit terms and conditions easily
                </div>
              </div>
              <div className="p-3 bg-white/70 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Multiple Formats
                </div>
                <div className="text-sm text-gray-600">
                  Download as text, print, or copy
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-2">
                  Legal Disclaimer
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>
                      This tool generates sample contracts for reference only
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Always consult with a legal professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Verify local laws and regulations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Templates
            </h3>
            <div className="space-y-2">
              {contractTemplates.slice(0, 3).map((template) => (
                <button
                  key={template.id}
                  onClick={() => setContractType(template.id)}
                  className="w-full p-3 bg-white/70 rounded-lg text-left hover:bg-white transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">
                      {template.name}
                    </div>
                    {contractType === template.id && (
                      <Check className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contract Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Always include effective dates and signatures</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Specify governing law and jurisdiction</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Clearly define terms and termination conditions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Professional Templates
          </h3>
          <p className="text-gray-600">
            Choose from professionally drafted contract templates for various
            business needs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Easy Export
          </h3>
          <p className="text-gray-600">
            Download contracts in multiple formats or print directly for
            signatures.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Legal Framework
          </h3>
          <p className="text-gray-600">
            Built on standard legal frameworks with customizable terms and
            conditions.
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Essential Contract Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
              <Check className="w-5 h-5 text-indigo-600" />
              Before Signing
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-600">1</span>
                </div>
                <span>
                  Read the entire contract carefully, including fine print
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-600">2</span>
                </div>
                <span>Verify all parties' information is accurate</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-600">3</span>
                </div>
                <span>Check dates, amounts, and deadlines</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              Important Clauses
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-purple-600">A</span>
                </div>
                <span>Clearly define termination conditions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-purple-600">B</span>
                </div>
                <span>Include dispute resolution mechanisms</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-purple-600">C</span>
                </div>
                <span>Specify confidentiality and non-compete terms</span>
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

export default ContractGenerator;
