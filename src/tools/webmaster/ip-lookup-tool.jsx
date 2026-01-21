import { useState } from "react";
import {
  Globe,
  MapPin,
  Server,
  Shield,
  Activity,
  RefreshCw,
  Download,
  Wifi,
  Clock,
  Users,
  Flag,
  ExternalLink,
} from "lucide-react";

const IPLookupTool = () => {
  const [ipAddress, setIpAddress] = useState("8.8.8.8");
  const [ipData, setIpData] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);

  const simulateIPLookup = () => {
    setIsChecking(true);
    setError(null);

    setTimeout(() => {
      // Validate IP format
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipPattern.test(ipAddress)) {
        setError("Please enter a valid IP address (e.g., 8.8.8.8)");
        setIsChecking(false);
        return;
      }

      // Simulate IP data
      const isp = ["Google LLC", "Cloudflare", "Amazon AWS", "Microsoft Azure"][
        Math.floor(Math.random() * 4)
      ];
      const city = [
        "Mountain View",
        "San Francisco",
        "New York",
        "London",
        "Tokyo",
      ][Math.floor(Math.random() * 5)];
      const country = [
        "United States",
        "United Kingdom",
        "Germany",
        "Japan",
        "Singapore",
      ][Math.floor(Math.random() * 5)];
      const countryCode = ["US", "GB", "DE", "JP", "SG"][
        Math.floor(Math.random() * 5)
      ];

      const ipInfo = {
        ip: ipAddress,
        isp,
        organization: isp,
        city,
        region:
          city === "Mountain View"
            ? "California"
            : city === "San Francisco"
            ? "California"
            : city === "New York"
            ? "New York"
            : city === "London"
            ? "England"
            : "Tokyo",
        country,
        countryCode,
        continent:
          country === "United States" || country === "United Kingdom"
            ? "North America"
            : country === "Germany"
            ? "Europe"
            : country === "Japan"
            ? "Asia"
            : "Asia",
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
        timezone:
          "UTC" +
          (Math.random() > 0.5 ? "+" : "-") +
          Math.floor(Math.random() * 12),
        asn: "AS" + Math.floor(Math.random() * 100000),
        reverseDns: `dns.google.com`,
        ispRating: Math.floor(Math.random() * 100),
        threatLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        proxy: Math.random() > 0.8,
        vpn: Math.random() > 0.9,
        tor: Math.random() > 0.95,
      };

      setIpData(ipInfo);
      setIsChecking(false);
    }, 1000);
  };

  const getThreatColor = (level) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFlagEmoji = (countryCode) => {
    // Simple flag emoji mapping
    const flags = {
      US: "🇺🇸",
      GB: "🇬🇧",
      DE: "🇩🇪",
      JP: "🇯🇵",
      SG: "🇸🇬",
    };
    return flags[countryCode] || "🏳️";
  };

  const presetIPs = [
    { ip: "8.8.8.8", name: "Google DNS" },
    { ip: "1.1.1.1", name: "Cloudflare DNS" },
    { ip: "208.67.222.222", name: "OpenDNS" },
    { ip: "142.250.185.206", name: "Google.com" },
  ];

  const isValidIP = (ip) => {
    const parts = ip.split(".");
    if (parts.length !== 4) return false;
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return !isNaN(num) && num >= 0 && num <= 255;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Globe className="w-10 h-10 text-blue-600" />
          IP Lookup Tool
        </h1>
        <p className="text-gray-600 text-lg">
          Get detailed information about any IP address including location, ISP,
          and security details
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* IP Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Common IP Addresses
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presetIPs.map((preset) => (
                  <button
                    key={preset.ip}
                    onClick={() => setIpAddress(preset.ip)}
                    className={`p-4 border rounded-xl text-center transition-all ${
                      ipAddress === preset.ip
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {preset.name}
                    </div>
                    <div className="text-sm text-gray-600 font-mono">
                      {preset.ip}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* IP Input */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                IP Address Lookup
              </h3>

              <div className="space-y-6">
                {/* IP Input Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    IP Address
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="8.8.8.8"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                      />
                    </div>
                    <button
                      onClick={() => {
                        // Try to get user's IP
                        fetch("https://api.ipify.org?format=json")
                          .then((res) => res.json())
                          .then((data) => setIpAddress(data.ip))
                          .catch(() => setIpAddress(""));
                      }}
                      className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Wifi className="w-5 h-5" />
                      My IP
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Enter IPv4 address (e.g., 192.168.1.1)
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={simulateIPLookup}
                    disabled={isChecking || !isValidIP(ipAddress)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Looking up...
                      </>
                    ) : (
                      <>
                        <Globe className="w-5 h-5" />
                        Lookup IP
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIpAddress("");
                      setIpData(null);
                      setError(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Clear
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

          {/* Location Details */}
          {ipData && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Location Details
                  </h3>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Location Information */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          Location
                        </span>
                      </div>
                      <div className="text-lg text-gray-800">
                        {ipData.city}, {ipData.region}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl">
                          {getFlagEmoji(ipData.countryCode)}
                        </span>
                        <span className="text-gray-600">{ipData.country}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">
                          Coordinates
                        </span>
                      </div>
                      <div className="font-mono text-gray-800">
                        {ipData.latitude}, {ipData.longitude}
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800 mt-2 flex items-center gap-1">
                        <ExternalLink className="w-4 h-4" />
                        View on Map
                      </button>
                    </div>
                  </div>

                  {/* Network Information */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Server className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-900">
                          ISP & Organization
                        </span>
                      </div>
                      <div className="text-gray-800">{ipData.isp}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        ASN: {ipData.asn}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-gray-900">
                          Timezone
                        </span>
                      </div>
                      <div className="text-gray-800">{ipData.timezone}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Reverse DNS: {ipData.reverseDns}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Results */}
        {ipData && (
          <div className="space-y-6">
            {/* IP Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  IP Address
                </h3>
                <div className="text-3xl font-bold text-blue-600 font-mono">
                  {ipData.ip}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xl">
                    {getFlagEmoji(ipData.countryCode)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {ipData.country}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">ISP Rating</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${ipData.ispRating}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-green-600">
                      {ipData.ispRating}/100
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Continent</span>
                  <span className="font-medium text-gray-900">
                    {ipData.continent}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">ASN</span>
                  <span className="font-medium text-gray-900 font-mono">
                    {ipData.asn}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Analysis */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Security Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Threat Level</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getThreatColor(
                        ipData.threatLevel
                      )}`}
                    >
                      {ipData.threatLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Proxy Detected</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ipData.proxy
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ipData.proxy ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">VPN Detected</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ipData.vpn
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ipData.vpn ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">TOR Network</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ipData.tor
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ipData.tor ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Details */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Network Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">ISP</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate ml-2">
                    {ipData.isp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Organization</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate ml-2">
                    {ipData.organization}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Reverse DNS</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 font-mono truncate ml-2">
                    {ipData.reverseDns}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Visualization */}
      {ipData && (
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Geographic Location
            </h3>

            {/* Simple map visualization */}
            <div className="h-64 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl relative border border-gray-300">
              {/* Continent outlines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Simplified world map representation */}
                  <div className="absolute top-1/4 left-1/4 w-16 h-8 bg-green-200 rounded-lg border border-green-300"></div>
                  <div className="absolute top-1/3 left-2/3 w-12 h-10 bg-blue-200 rounded-lg border border-blue-300"></div>
                  <div className="absolute top-2/3 left-1/3 w-20 h-12 bg-yellow-200 rounded-lg border border-yellow-300"></div>

                  {/* IP location marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg border border-gray-300 shadow-sm whitespace-nowrap">
                        <div className="text-xs font-medium text-gray-900">
                          {ipData.city}
                        </div>
                        <div className="text-xs text-gray-600">
                          {ipData.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">
                  Latitude
                </div>
                <div className="text-lg font-mono text-gray-900">
                  {ipData.latitude}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">
                  Longitude
                </div>
                <div className="text-lg font-mono text-gray-900">
                  {ipData.longitude}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">
                  Timezone
                </div>
                <div className="text-lg text-gray-900">{ipData.timezone}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">
                  Continent
                </div>
                <div className="text-lg text-gray-900">{ipData.continent}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Geolocation
          </h3>
          <p className="text-gray-600">
            Get precise geographic location including city, region, country, and
            coordinates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Server className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            ISP Information
          </h3>
          <p className="text-gray-600">
            Identify Internet Service Provider, organization, and network
            details.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Security Analysis
          </h3>
          <p className="text-gray-600">
            Detect proxies, VPNs, TOR networks, and assess threat levels.
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

export default IPLookupTool;
