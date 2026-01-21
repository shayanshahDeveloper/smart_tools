import { useState, useEffect } from "react";
import {
  Monitor,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  RefreshCw,
  Bell,
  Download,
  BarChart3,
  Server,
} from "lucide-react";

const WebsiteMonitor = () => {
  const [url, setUrl] = useState("https://example.com");
  const [checkInterval, setCheckInterval] = useState(5);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [uptimeData, setUptimeData] = useState([]);
  const [responseTime, setResponseTime] = useState(0);
  const [status, setStatus] = useState("up");
  const [alerts, setAlerts] = useState([]);

  const simulateCheck = () => {
    // Simulate response time between 100ms to 2000ms
    const simulatedTime = Math.floor(Math.random() * 1900) + 100;
    setResponseTime(simulatedTime);

    // Random status (95% up, 5% down for simulation)
    const isUp = Math.random() > 0.05;
    setStatus(isUp ? "up" : "down");

    // Add to history
    const newEntry = {
      time: new Date().toLocaleTimeString(),
      responseTime: simulatedTime,
      status: isUp ? "up" : "down",
    };

    setUptimeData((prev) => [newEntry, ...prev.slice(0, 9)]);

    // Add alert if down
    if (!isUp) {
      const alert = {
        id: Date.now(),
        message: `Website ${url} is down!`,
        time: new Date().toLocaleString(),
        severity: "critical",
      };
      setAlerts((prev) => [alert, ...prev]);
    }
  };

  useEffect(() => {
    let interval;
    if (isMonitoring) {
      simulateCheck(); // Initial check
      interval = setInterval(simulateCheck, checkInterval * 1000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring, checkInterval]);

  const startMonitoring = () => {
    setIsMonitoring(true);
    setUptimeData([]);
    setAlerts([]);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const formatResponseTime = (ms) => {
    return `${ms}ms`;
  };

  const getStatusColor = (status) => {
    return status === "up"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getResponseTimeColor = (ms) => {
    if (ms < 500) return "text-green-600";
    if (ms < 1500) return "text-yellow-600";
    return "text-red-600";
  };

  const monitoringPresets = [
    { interval: 1, label: "Real-time", desc: "Every 1 second" },
    { interval: 5, label: "Standard", desc: "Every 5 seconds" },
    { interval: 30, label: "Economy", desc: "Every 30 seconds" },
    { interval: 60, label: "Basic", desc: "Every minute" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Monitor className="w-10 h-10 text-blue-600" />
          Website Monitor
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor website uptime, response time, and receive instant alerts
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* URL Input & Status */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Website Monitoring
              </h3>

              <div className="space-y-6">
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
                        disabled={isMonitoring}
                      />
                    </div>
                    <button
                      onClick={() => !isMonitoring && setUrl("")}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                      disabled={isMonitoring}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Interval Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Check Interval
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {monitoringPresets.map((preset) => (
                      <button
                        key={preset.interval}
                        onClick={() => setCheckInterval(preset.interval)}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          checkInterval === preset.interval
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        disabled={isMonitoring}
                      >
                        <div className="font-medium text-gray-900">
                          {preset.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {preset.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Interval Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Custom Interval: {checkInterval} seconds
                    </label>
                    <span className="text-sm font-medium text-blue-600">
                      {checkInterval}s
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="300"
                    step="1"
                    value={checkInterval}
                    onChange={(e) => setCheckInterval(parseInt(e.target.value))}
                    disabled={isMonitoring}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 disabled:opacity-50"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1s</span>
                    <span>150s</span>
                    <span>5min</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {!isMonitoring ? (
                    <button
                      onClick={startMonitoring}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <Activity className="w-5 h-5" />
                      Start Monitoring
                    </button>
                  ) : (
                    <button
                      onClick={stopMonitoring}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <AlertCircle className="w-5 h-5" />
                      Stop Monitoring
                    </button>
                  )}
                  <button
                    onClick={simulateCheck}
                    disabled={!isMonitoring}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Check Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Alerts
                </h3>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                  <Bell className="w-4 h-4" />
                  Setup Alerts
                </button>
              </div>

              {alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {alert.message}
                          </div>
                          <div className="text-sm text-gray-600">
                            {alert.time}
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                        Critical
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No alerts yet. Everything looks good!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Current Status Card */}
          <div
            className={`rounded-2xl border p-6 ${
              status === "up"
                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
                : "bg-gradient-to-br from-red-50 to-pink-50 border-red-100"
            }`}
          >
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 ${
                  status === "up" ? "bg-green-100" : "bg-red-100"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {status === "up" ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Current Status
              </h3>
              <div
                className={`text-3xl font-bold ${
                  status === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status === "up" ? "UP" : "DOWN"}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Last checked: {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Response Time</span>
                <span
                  className={`font-medium ${getResponseTimeColor(
                    responseTime
                  )}`}
                >
                  {formatResponseTime(responseTime)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Monitoring</span>
                <span className="font-medium text-blue-600">
                  {isMonitoring ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Check Interval</span>
                <span className="font-medium text-gray-900">
                  {checkInterval}s
                </span>
              </div>
            </div>
          </div>

          {/* Recent Checks */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Checks
              </h3>
              <div className="space-y-3">
                {uptimeData.map((check, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          check.status === "up" ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {check.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-medium ${getResponseTimeColor(
                          check.responseTime
                        )}`}
                      >
                        {formatResponseTime(check.responseTime)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          check.status
                        )}`}
                      >
                        {check.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Total Checks</span>
                </div>
                <span className="text-sm font-medium text-blue-600">
                  {uptimeData.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Uptime Rate</span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {uptimeData.length > 0
                    ? `${(
                        (uptimeData.filter((c) => c.status === "up").length /
                          uptimeData.length) *
                        100
                      ).toFixed(1)}%`
                    : "0%"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Downtime Count</span>
                </div>
                <span className="text-sm font-medium text-red-600">
                  {uptimeData.filter((c) => c.status === "down").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoring Chart */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Response Time History
            </h3>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>

          {/* Simple bar chart visualization */}
          <div className="h-64 flex items-end gap-1 p-4 bg-gray-50 rounded-xl">
            {uptimeData.slice(0, 20).map((check, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t-lg ${
                    check.status === "up"
                      ? check.responseTime < 500
                        ? "bg-gradient-to-t from-green-400 to-emerald-500"
                        : check.responseTime < 1500
                        ? "bg-gradient-to-t from-yellow-400 to-amber-500"
                        : "bg-gradient-to-t from-red-400 to-pink-500"
                      : "bg-gradient-to-t from-red-600 to-red-700"
                  }`}
                  style={{
                    height: `${Math.min(100, check.responseTime / 20)}%`,
                  }}
                ></div>
                <div className="text-xs text-gray-600 mt-1">
                  {uptimeData.length - index}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Real-time Monitoring
          </h3>
          <p className="text-gray-600">
            Continuous monitoring with configurable check intervals from 1
            second to 5 minutes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Instant Alerts
          </h3>
          <p className="text-gray-600">
            Get notified immediately when your website goes down or performance
            degrades.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Detailed Analytics
          </h3>
          <p className="text-gray-600">
            Track uptime history, response times, and performance trends over
            time.
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

export default WebsiteMonitor;
