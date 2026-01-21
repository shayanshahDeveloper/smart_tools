import { useState } from "react";
import {
  Calendar,
  Globe,
  Clock,
  Info,
  AlertCircle,
  RefreshCw,
  Download,
  Database,
  Users,
  Shield,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

const DomainAgeChecker = () => {
  const [domain, setDomain] = useState("example.com");
  const [domainData, setDomainData] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);

  const simulateDomainCheck = () => {
    setIsChecking(true);
    setError(null);

    setTimeout(() => {
      if (!domain || domain === "example.com") {
        setError("Please enter a valid domain name");
        setIsChecking(false);
        return;
      }

      // Simulate domain age data
      const creationDate = new Date(
        Date.now() - Math.random() * 10 * 365 * 24 * 60 * 60 * 1000
      );
      const expirationDate = new Date(
        creationDate.getTime() + 365 * 24 * 60 * 60 * 1000
      );
      const ageInDays = Math.floor(
        (Date.now() - creationDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const ageInYears = ageInDays / 365;

      const domainInfo = {
        domain,
        creationDate: creationDate.toLocaleDateString(),
        expirationDate: expirationDate.toLocaleDateString(),
        updatedDate: new Date(
          creationDate.getTime() + 180 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        ageInDays,
        ageInYears: ageInYears.toFixed(1),
        registrar: "GoDaddy.com, LLC",
        status: [
          "clientDeleteProhibited",
          "clientRenewProhibited",
          "clientTransferProhibited",
        ],
        nameServers: ["ns1.cloudflare.com", "ns2.cloudflare.com"],
        dnssec: "Signed",
        whoisServer: "whois.godaddy.com",
        popularity: Math.floor(Math.random() * 100),
        trustScore: Math.floor(Math.random() * 100),
        seoValue: Math.floor(Math.random() * 100),
      };

      setDomainData(domainInfo);
      setIsChecking(false);
    }, 1200);
  };

  const getAgeColor = (years) => {
    if (years < 1) return "text-red-600";
    if (years < 3) return "text-yellow-600";
    if (years < 5) return "text-blue-600";
    return "text-green-600";
  };

  const getPopularityColor = (score) => {
    if (score < 30) return "text-red-600";
    if (score < 70) return "text-yellow-600";
    return "text-green-600";
  };

  const presetDomains = [
    { domain: "google.com", name: "Google" },
    { domain: "facebook.com", name: "Facebook" },
    { domain: "amazon.com", name: "Amazon" },
    { domain: "twitter.com", name: "Twitter" },
    { domain: "github.com", name: "GitHub" },
    { domain: "wikipedia.org", name: "Wikipedia" },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Calendar className="w-10 h-10 text-blue-600" />
          Domain Age Checker
        </h1>
        <p className="text-gray-600 text-lg">
          Check domain registration date, age, and WHOIS information
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Domain Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Domains
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {presetDomains.map((preset) => (
                  <button
                    key={preset.domain}
                    onClick={() => setDomain(preset.domain)}
                    className={`p-4 border rounded-xl text-center transition-all ${
                      domain === preset.domain
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {preset.name}
                    </div>
                    <div className="text-sm text-gray-600">{preset.domain}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Domain Input */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Check Domain Age
              </h3>

              <div className="space-y-6">
                {/* Domain Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Domain Name
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => setDomain("")}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Enter domain without http:// or www.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={simulateDomainCheck}
                    disabled={isChecking}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Globe className="w-5 h-5" />
                        Check Domain
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setDomain("example.com");
                      setDomainData(null);
                      setError(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700">{error}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* WHOIS Details */}
          {domainData && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    WHOIS Information
                  </h3>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    Export WHOIS
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          Creation Date
                        </span>
                      </div>
                      <div className="text-gray-800">
                        {formatDate(domainData.creationDate)}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-900">
                          Expiration Date
                        </span>
                      </div>
                      <div className="text-gray-800">
                        {formatDate(domainData.expirationDate)}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">
                          Updated Date
                        </span>
                      </div>
                      <div className="text-gray-800">
                        {formatDate(domainData.updatedDate)}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Database className="w-5 h-5 text-indigo-600" />
                        <span className="font-medium text-gray-900">
                          Registrar
                        </span>
                      </div>
                      <div className="text-gray-800">
                        {domainData.registrar}
                      </div>
                    </div>
                  </div>

                  {/* Name Servers */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Server className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-gray-900">
                        Name Servers
                      </span>
                    </div>
                    <div className="space-y-2">
                      {domainData.nameServers.map((ns, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-mono text-sm text-gray-700">
                            {ns}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Domain Status */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">
                        Domain Status
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {domainData.status.map((status, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {status}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Results */}
        {domainData && (
          <div className="space-y-6">
            {/* Age Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Domain Age
                </h3>
                <div
                  className={`text-3xl font-bold ${getAgeColor(
                    domainData.ageInYears
                  )}`}
                >
                  {domainData.ageInYears} years
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {domainData.ageInDays.toLocaleString()} days
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Domain</span>
                  <span className="font-medium text-gray-900 font-mono">
                    {domainData.domain}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Days Old</span>
                  <span className="font-medium text-blue-600">
                    {domainData.ageInDays.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">DNSSEC</span>
                  <span className="font-medium text-green-600">
                    {domainData.dnssec}
                  </span>
                </div>
              </div>
            </div>

            {/* Domain Scores */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Domain Metrics
                </h3>
                <div className="space-y-4">
                  {/* Popularity Score */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Popularity Score
                      </span>
                      <span
                        className={`text-sm font-medium ${getPopularityColor(
                          domainData.popularity
                        )}`}
                      >
                        {domainData.popularity}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${domainData.popularity}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Trust Score */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Trust Score
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {domainData.trustScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${domainData.trustScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* SEO Value */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        SEO Value
                      </span>
                      <span className="text-sm font-medium text-purple-600">
                        {domainData.seoValue}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${domainData.seoValue}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Age Analysis */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Age Analysis
              </h3>
              <div className="space-y-3">
                {domainData.ageInYears < 1 && (
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        New Domain
                      </div>
                      <div className="text-sm text-gray-600">
                        This domain is less than 1 year old. Search engines may
                        trust it less.
                      </div>
                    </div>
                  </div>
                )}
                {domainData.ageInYears >= 5 && (
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Established Domain
                      </div>
                      <div className="text-sm text-gray-600">
                        This domain has significant age, which can positively
                        impact SEO.
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Domain History
                    </div>
                    <div className="text-sm text-gray-600">
                      Domains older than 2 years generally have better search
                      engine trust.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Age Timeline */}
      {domainData && (
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Domain Timeline
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 right-0 top-6 h-0.5 bg-gray-200"></div>

              <div className="relative flex justify-between">
                {/* Creation */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mb-2"></div>
                  <div className="text-sm font-medium text-gray-900">
                    Creation
                  </div>
                  <div className="text-xs text-gray-600">
                    {domainData.creationDate.split("/")[2]}
                  </div>
                </div>

                {/* Update */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mb-2"></div>
                  <div className="text-sm font-medium text-gray-900">
                    Update
                  </div>
                  <div className="text-xs text-gray-600">
                    {domainData.updatedDate.split("/")[2]}
                  </div>
                </div>

                {/* Today */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mb-2"></div>
                  <div className="text-sm font-medium text-gray-900">Today</div>
                  <div className="text-xs text-gray-600">
                    {new Date().getFullYear()}
                  </div>
                </div>

                {/* Expiration */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mb-2"></div>
                  <div className="text-sm font-medium text-gray-900">
                    Expiration
                  </div>
                  <div className="text-xs text-gray-600">
                    {domainData.expirationDate.split("/")[2]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Age Verification
          </h3>
          <p className="text-gray-600">
            Check exact domain registration date and calculate precise age in
            years and days.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            WHOIS Lookup
          </h3>
          <p className="text-gray-600">
            Get complete WHOIS information including registrar, status, and
            nameservers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            SEO Analysis
          </h3>
          <p className="text-gray-600">
            Analyze domain metrics including trust score, popularity, and SEO
            value.
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

export default DomainAgeChecker;
