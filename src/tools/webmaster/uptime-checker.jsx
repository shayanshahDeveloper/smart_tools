import { useState, useEffect } from "react";
import {
  Activity,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  BarChart3,
  AlertTriangle,
  Server,
  MapPin,
  Zap,
} from "lucide-react";

const UptimeChecker = () => {
  const [url, setUrl] = useState("https://example.com");
  const [locations, setLocations] = useState([
    "us-east",
    "eu-west",
    "asia-south",
  ]);
  const [uptimeData, setUptimeData] = useState([]);
  const [responseTimes, setResponseTimes] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [stats, setStats] = useState({
    uptime: 99.9,
    avgResponse: 285,
    lastDown: "2024-01-15 14:30",
  });

  const simulateUptimeCheck = () => {
    setIsChecking(true);
    setUptimeData([]);
    setResponseTimes({});

    // Simulate checking from multiple locations
    const checkPromises = locations.map((location) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const responseTime = Math.floor(Math.random() * 2000) + 100;
          const isUp = Math.random() > 0.1; // 90% uptime for simulation

          resolve({
            location,
            responseTime,
            isUp,
            timestamp: new Date().toISOString(),
          });
        }, Math.random() * 1000);
      });
    });

    Promise.all(checkPromises).then((results) => {
      const newUptimeData = results.map((result) => ({
        ...result,
        time: new Date().toLocaleTimeString(),
      }));

      const responseTimesObj = {};
      results.forEach((result) => {
        responseTimesObj[result.location] = result.responseTime;
      });

      setUptimeData(newUptimeData);
      setResponseTimes(responseTimesObj);

      // Calculate stats
      const upCount = results.filter((r) => r.isUp).length;
      const avgResponse =
        results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;

      setStats({
        uptime: (upCount / results.length) * 100,
        avgResponse: Math.round(avgResponse),
        lastDown: results.some((r) => !r.isUp)
          ? new Date().toLocaleString()
          : stats.lastDown,
      });

      setIsChecking(false);
    });
  };

  const getResponseTimeColor = (ms) => {
    if (ms < 300) return "text-green-600";
    if (ms < 800) return "text-yellow-600";
    if (ms < 1500) return "text-orange-600";
    return "text-red-600";
  };

  const getStatusColor = (isUp) => {
    return isUp ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const locationOptions = [
    { id: "us-east", name: "US East", flag: "🇺🇸", city: "New York" },
    { id: "us-west", name: "US West", flag: "🇺🇸", city: "San Francisco" },
    { id: "eu-west", name: "EU West", flag: "🇪🇺", city: "London" },
    { id: "eu-central", name: "EU Central", flag: "🇩🇪", city: "Frankfurt" },
    { id: "asia-south", name: "Asia South", flag: "🇸🇬", city: "Singapore" },
    { id: "asia-east", name: "Asia East", flag: "🇯🇵", city: "Tokyo" },
    { id: "aus-east", name: "Australia", flag: "🇦🇺", city: "Sydney" },
    { id: "sa-east", name: "South America", flag: "🇧🇷", city: "São Paulo" },
  ];

  const presetURLs = [
    { url: "https://google.com", name: "Google" },
    { url: "https://github.com", name: "GitHub" },
    { url: "https://stackoverflow.com", name: "StackOverflow" },
    { url: "https://cloudflare.com", name: "Cloudflare" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Activity className="w-10 h-10 text-blue-600" />
          Uptime Checker
        </h1>
        <p className="text-gray-600 text-lg">
          Check website uptime and response times from multiple global locations
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* URL Input & Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Website Monitoring
              </h3>

              <div className="space-y-6">
                {/* Quick Presets */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Popular Sites
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {presetURLs.map((preset) => (
                      <button
                        key={preset.url}
                        onClick={() => setUrl(preset.url)}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          url === preset.url
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {preset.name}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {preset.url.replace("https://", "")}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* URL Input */}
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

                {/* Location Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Check Locations
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {locationOptions.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          if (locations.includes(loc.id)) {
                            setLocations(locations.filter((l) => l !== loc.id));
                          } else {
                            setLocations([...locations, loc.id]);
                          }
                        }}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          locations.includes(loc.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-2xl mb-1">{loc.flag}</div>
                        <div className="font-medium text-gray-900 text-sm">
                          {loc.name}
                        </div>
                        <div className="text-xs text-gray-600">{loc.city}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={simulateUptimeCheck}
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
                        Check Uptime
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setUrl("https://example.com");
                      setLocations(["us-east", "eu-west", "asia-south"]);
                      setUptimeData([]);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          {uptimeData.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Check Results
                  </h3>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    Export Results
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Location
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Response Time
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {uptimeData.map((check, index) => {
                        const location = locationOptions.find(
                          (l) => l.id === check.location
                        );
                        return (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <span className="text-xl">
                                  {location?.flag}
                                </span>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {location?.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {location?.city}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  check.isUp
                                )}`}
                              >
                                {check.isUp ? "UP" : "DOWN"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-medium ${getResponseTimeColor(
                                    check.responseTime
                                  )}`}
                                >
                                  {check.responseTime}ms
                                </span>
                                {check.responseTime < 300 && (
                                  <Zap className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {check.time}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Uptime Summary
              </h3>
              <div className="text-3xl font-bold text-blue-600">
                {stats.uptime.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Based on {locations.length} locations
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Avg Response Time</span>
                <span
                  className={`font-medium ${getResponseTimeColor(
                    stats.avgResponse
                  )}`}
                >
                  {stats.avgResponse}ms
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Locations Checked</span>
                <span className="font-medium text-blue-600">
                  {locations.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Last Downtime</span>
                <span className="font-medium text-gray-900">
                  {stats.lastDown.split(" ")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Response Times */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Response Times
              </h3>
              <div className="space-y-3">
                {Object.entries(responseTimes).map(([locationId, time]) => {
                  const location = locationOptions.find(
                    (l) => l.id === locationId
                  );
                  return (
                    <div
                      key={locationId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{location?.flag}</span>
                        <span className="text-sm text-gray-700">
                          {location?.name}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-medium ${getResponseTimeColor(
                          time
                        )}`}
                      >
                        {time}ms
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Performance Grade */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance Grade
            </h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-green-600 mb-2">A</div>
              <div className="text-sm text-gray-600">Excellent Performance</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Response Time</span>
                <span className="font-medium text-green-600">Good</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Uptime</span>
                <span className="font-medium text-green-600">Excellent</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Consistency</span>
                <span className="font-medium text-yellow-600">Average</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Chart */}
      {uptimeData.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Global Response Times
            </h3>

            {/* Simple bar chart */}
            <div className="h-48 flex items-end gap-2 p-4 bg-gray-50 rounded-xl">
              {Object.entries(responseTimes).map(([locationId, time]) => {
                const location = locationOptions.find(
                  (l) => l.id === locationId
                );
                const height = Math.min(100, (time / 2000) * 100);

                return (
                  <div
                    key={locationId}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className={`w-full rounded-t-lg ${
                        time < 300
                          ? "bg-gradient-to-t from-green-400 to-emerald-500"
                          : time < 800
                          ? "bg-gradient-to-t from-yellow-400 to-amber-500"
                          : "bg-gradient-to-t from-red-400 to-pink-500"
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs text-gray-600 mt-2">
                      {location?.flag}
                    </div>
                    <div className="text-xs font-medium text-gray-900">
                      {time}ms
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Global Monitoring
          </h3>
          <p className="text-gray-600">
            Check uptime from multiple global locations to ensure worldwide
            accessibility.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Response Time Analysis
          </h3>
          <p className="text-gray-600">
            Measure and analyze response times to identify performance
            bottlenecks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Detailed Reports
          </h3>
          <p className="text-gray-600">
            Generate comprehensive reports with performance metrics and
            recommendations.
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

export default UptimeChecker;
