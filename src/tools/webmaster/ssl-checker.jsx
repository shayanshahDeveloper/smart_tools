import { useState } from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Lock,
  Globe,
  Server,
  RefreshCw,
  Download,
} from "lucide-react";

const SSLChecker = () => {
  const [url, setUrl] = useState("https://example.com");
  const [sslData, setSslData] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);

  const simulateSSLCheck = () => {
    setIsChecking(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      const validDomains = [
        "google.com",
        "github.com",
        "facebook.com",
        "twitter.com",
      ];
      const domain = url.replace(/https?:\/\//, "").split("/")[0];

      if (!domain || domain === "example.com") {
        setError("Please enter a valid website URL");
        setIsChecking(false);
        return;
      }

      // Simulate SSL data
      const isExpired = Math.random() > 0.8; // 20% chance of expired
      const daysUntilExpiry = isExpired
        ? -Math.floor(Math.random() * 30)
        : Math.floor(Math.random() * 365);

      const sslInfo = {
        domain,
        isValid: !isExpired,
        issuer: "Let's Encrypt Authority X3",
        issuedDate: new Date(
          Date.now() - 90 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        expiryDate: new Date(
          Date.now() + daysUntilExpiry * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        daysUntilExpiry,
        protocol: "TLS 1.3",
        cipher: "TLS_AES_256_GCM_SHA384",
        signatureAlgorithm: "SHA256-RSA",
        keySize: 2048,
        san: [`${domain}`, `www.${domain}`],
        grade: isExpired
          ? "F"
          : daysUntilExpiry < 30
          ? "C"
          : daysUntilExpiry < 90
          ? "B"
          : "A",
      };

      setSslData(sslInfo);
      setIsChecking(false);
    }, 1500);
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "C":
        return "bg-yellow-100 text-yellow-800";
      case "D":
        return "bg-orange-100 text-orange-800";
      case "F":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (isValid) => {
    return isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getDaysColor = (days) => {
    if (days < 0) return "text-red-600";
    if (days < 30) return "text-red-600";
    if (days < 90) return "text-yellow-600";
    return "text-green-600";
  };

  const presetDomains = [
    { domain: "google.com", label: "Google" },
    { domain: "github.com", label: "GitHub" },
    { domain: "facebook.com", label: "Facebook" },
    { domain: "twitter.com", label: "Twitter" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Shield className="w-10 h-10 text-blue-600" />
          SSL Certificate Checker
        </h1>
        <p className="text-gray-600 text-lg">
          Verify SSL certificate validity, expiration dates, and security
          details
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* URL Input */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Check SSL Certificate
              </h3>

              <div className="space-y-6">
                {/* Quick Domain Presets */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Quick Check
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {presetDomains.map((preset) => (
                      <button
                        key={preset.domain}
                        onClick={() => setUrl(`https://${preset.domain}`)}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          url.includes(preset.domain)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {preset.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {preset.domain}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* URL Input Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Website URL
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => setUrl("")}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={simulateSSLCheck}
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
                        <Shield className="w-5 h-5" />
                        Check SSL
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setUrl("");
                      setSslData(null);
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

          {/* Certificate Details */}
          {sslData && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Certificate Details
                  </h3>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          Domain
                        </span>
                      </div>
                      <div className="text-lg font-mono text-gray-800">
                        {sslData.domain}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Server className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-900">
                          Issuer
                        </span>
                      </div>
                      <div className="text-gray-800">{sslData.issuer}</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Lock className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">
                          Protocol
                        </span>
                      </div>
                      <div className="text-gray-800">{sslData.protocol}</div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <span className="font-medium text-gray-900">
                          Issued Date
                        </span>
                      </div>
                      <div className="text-gray-800">{sslData.issuedDate}</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-pink-600" />
                        <span className="font-medium text-gray-900">
                          Expiry Date
                        </span>
                      </div>
                      <div className="text-gray-800">{sslData.expiryDate}</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-gray-900">
                          Cipher
                        </span>
                      </div>
                      <div className="text-gray-800">{sslData.cipher}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Results */}
        {sslData && (
          <div className="space-y-6">
            {/* Status Card */}
            <div
              className={`rounded-2xl border p-6 ${
                sslData.isValid
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
                  : "bg-gradient-to-br from-red-50 to-pink-50 border-red-100"
              }`}
            >
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 ${
                    sslData.isValid ? "bg-green-100" : "bg-red-100"
                  } rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {sslData.isValid ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  SSL Status
                </h3>
                <div
                  className={`text-3xl font-bold ${
                    sslData.isValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {sslData.isValid ? "VALID" : "INVALID"}
                </div>
                <div
                  className={`mt-2 px-4 py-1 inline-block rounded-full ${getStatusColor(
                    sslData.isValid
                  )}`}
                >
                  {sslData.isValid
                    ? "Certificate is valid"
                    : "Certificate has expired"}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Days Until Expiry</span>
                  <span
                    className={`font-medium ${getDaysColor(
                      sslData.daysUntilExpiry
                    )}`}
                  >
                    {sslData.daysUntilExpiry > 0
                      ? `${sslData.daysUntilExpiry} days`
                      : `Expired ${-sslData.daysUntilExpiry} days ago`}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Security Grade</span>
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${getGradeColor(
                      sslData.grade
                    )}`}
                  >
                    Grade {sslData.grade}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Key Size</span>
                  <span className="font-medium text-gray-900">
                    {sslData.keySize} bits
                  </span>
                </div>
              </div>
            </div>

            {/* SAN List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Subject Alternative Names
                </h3>
                <div className="space-y-2">
                  {sslData.san.map((name, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{name}</span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Valid
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommendations
              </h3>
              <div className="space-y-3">
                {sslData.daysUntilExpiry < 30 && (
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Renew Certificate
                      </div>
                      <div className="text-sm text-gray-600">
                        Your SSL certificate will expire soon. Renew it to avoid
                        security warnings.
                      </div>
                    </div>
                  </div>
                )}
                {sslData.keySize < 2048 && (
                  <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                    <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Upgrade Key Size
                      </div>
                      <div className="text-sm text-gray-600">
                        Consider upgrading to 2048-bit or higher RSA key for
                        better security.
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <Lock className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Enable HSTS</div>
                    <div className="text-sm text-gray-600">
                      Consider enabling HTTP Strict Transport Security for
                      enhanced security.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Certificate Validation
          </h3>
          <p className="text-gray-600">
            Verify SSL certificate validity, issuer details, and encryption
            strength.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Expiry Monitoring
          </h3>
          <p className="text-gray-600">
            Track certificate expiration dates and get alerts before they
            expire.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Server className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Security Analysis
          </h3>
          <p className="text-gray-600">
            Analyze encryption protocols, cipher strength, and security
            configurations.
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

export default SSLChecker;
