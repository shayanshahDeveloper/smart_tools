import { useState, useEffect } from "react";
import {
  Clock,
  Copy,
  Check,
  RefreshCw,
  Calendar,
  Hash,
  Globe,
  TrendingUp,
} from "lucide-react";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateTime, setDateTime] = useState("");
  const [timezone, setTimezone] = useState("local");
  const [format, setFormat] = useState("human");
  const [copied, setCopied] = useState({ type: "", value: "" });
  const [relativeTime, setRelativeTime] = useState("");

  // Initialize with current timestamp
  useEffect(() => {
    updateFromTimestamp(timestamp);
  }, []);

  const updateFromTimestamp = (ts) => {
    const tsNum = parseInt(ts) || 0;
    const date = new Date(tsNum * 1000);

    setDateTime(formatDateTime(date));
    setRelativeTime(getRelativeTime(date));
  };

  const updateFromDateTime = (dateStr) => {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const ts = Math.floor(date.getTime() / 1000);
      setTimestamp(ts);
      setRelativeTime(getRelativeTime(date));
    }
  };

  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return date.toLocaleString("en-US", options);
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 0) {
      const futureDiff = Math.abs(diffSec);
      if (futureDiff < 60)
        return `in ${futureDiff} second${futureDiff !== 1 ? "s" : ""}`;
      if (futureDiff < 3600)
        return `in ${Math.floor(futureDiff / 60)} minute${
          Math.floor(futureDiff / 60) !== 1 ? "s" : ""
        }`;
      if (futureDiff < 86400)
        return `in ${Math.floor(futureDiff / 3600)} hour${
          Math.floor(futureDiff / 3600) !== 1 ? "s" : ""
        }`;
      return `in ${Math.floor(futureDiff / 86400)} day${
        Math.floor(futureDiff / 86400) !== 1 ? "s" : ""
      }`;
    }

    if (diffSec < 60) return `${diffSec} second${diffSec !== 1 ? "s" : ""} ago`;
    if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
    if (diffHour < 24)
      return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`;
    if (diffDay < 30) return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;

    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12)
      return `${diffMonth} month${diffMonth !== 1 ? "s" : ""} ago`;

    const diffYear = Math.floor(diffMonth / 12);
    return `${diffYear} year${diffYear !== 1 ? "s" : ""} ago`;
  };

  const getFormattedOutput = () => {
    const date = new Date(timestamp * 1000);

    switch (format) {
      case "iso":
        return date.toISOString();
      case "utc":
        return date.toUTCString();
      case "human":
      default:
        return formatDateTime(date);
    }
  };

  const copyToClipboard = (value, type) => {
    navigator.clipboard.writeText(value);
    setCopied({ type, value });
    setTimeout(() => setCopied({ type: "", value: "" }), 2000);
  };

  const setToCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now);
    updateFromTimestamp(now);
  };

  const setToCustomDate = () => {
    const dateStr = prompt(
      "Enter date (YYYY-MM-DD HH:MM:SS):",
      new Date().toISOString().split("T")[0] + " 12:00:00"
    );

    if (dateStr) {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const ts = Math.floor(date.getTime() / 1000);
        setTimestamp(ts);
        updateFromTimestamp(ts);
      }
    }
  };

  const commonTimestamps = [
    { label: "Now", value: Math.floor(Date.now() / 1000) },
    { label: "1 hour ago", value: Math.floor(Date.now() / 1000) - 3600 },
    { label: "24 hours ago", value: Math.floor(Date.now() / 1000) - 86400 },
    { label: "1 week ago", value: Math.floor(Date.now() / 1000) - 604800 },
    { label: "1 month ago", value: Math.floor(Date.now() / 1000) - 2592000 },
    { label: "1 year ago", value: Math.floor(Date.now() / 1000) - 31536000 },
    { label: "Unix Epoch", value: 0 },
    { label: "Y2K", value: 946684800 },
    { label: "Facebook Launch", value: 1104537600 },
    { label: "First iPhone", value: 1181088000 },
  ];

  const timezones = [
    { id: "local", name: "Local Time" },
    { id: "utc", name: "UTC" },
    { id: "est", name: "EST (GMT-5)" },
    { id: "pst", name: "PST (GMT-8)" },
    { id: "gmt", name: "GMT" },
    { id: "cet", name: "CET (GMT+1)" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Clock className="w-10 h-10 text-blue-600" />
          Timestamp Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Convert Unix timestamps to human-readable dates and vice versa.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Timestamp Input */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Unix Timestamp
                </h2>
                <button
                  onClick={setToCurrentTime}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Set to Now
                </button>
              </div>
            </div>

            <div className="p-6">
              <input
                type="number"
                value={timestamp}
                onChange={(e) => {
                  const value = e.target.value;
                  setTimestamp(value);
                  updateFromTimestamp(value);
                }}
                className="w-full px-6 py-4 text-2xl font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Unix timestamp"
              />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    copyToClipboard(timestamp.toString(), "timestamp")
                  }
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2"
                >
                  {copied.type === "timestamp" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied.type === "timestamp" ? "Copied!" : "Copy Timestamp"}
                </button>
                <button
                  onClick={setToCustomDate}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Set Custom Date
                </button>
              </div>
            </div>
          </div>

          {/* Date Input */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Date & Time
                </h2>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {timezones.map((tz) => (
                      <option key={tz.id} value={tz.id}>
                        {tz.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6">
              <input
                type="datetime-local"
                value={
                  dateTime
                    ? new Date(timestamp * 1000).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) => updateFromDateTime(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {relativeTime}
                  </div>
                  <div className="text-sm text-gray-600">Relative time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {/* Formatted Output */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Converted Date
                </h2>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="human">Human Readable</option>
                  <option value="iso">ISO 8601</option>
                  <option value="utc">UTC String</option>
                </select>
              </div>
            </div>

            <div className="p-6">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-300">
                <div className="text-2xl font-mono text-gray-900 text-center break-words">
                  {getFormattedOutput() || "Converted date will appear here..."}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => copyToClipboard(getFormattedOutput(), "date")}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  {copied.type === "date" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                  {copied.type === "date"
                    ? "Copied to Clipboard!"
                    : "Copy Converted Date"}
                </button>
              </div>
            </div>
          </div>

          {/* Common Timestamps */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Common Timestamps
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {commonTimestamps.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setTimestamp(item.value);
                      updateFromTimestamp(item.value);
                    }}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-left transition-colors"
                  >
                    <div className="font-medium text-gray-900">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-600 font-mono mt-1">
                      {item.value}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About Unix Timestamps
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>
                  Unix timestamp is seconds since January 1, 1970 (Unix Epoch)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>
                  Millisecond timestamps are commonly used in JavaScript
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Timestamps are timezone-independent</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Hash className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Unix Timestamp
          </h3>
          <p className="text-gray-600">
            A Unix timestamp is the number of seconds that have elapsed since
            the Unix Epoch (January 1, 1970).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Date Formats
          </h3>
          <p className="text-gray-600">
            Convert between different date formats including human-readable, ISO
            8601, and UTC strings.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Timezone Support
          </h3>
          <p className="text-gray-600">
            View timestamps in different timezones including UTC, EST, PST, GMT,
            and local time.
          </p>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Programming</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>API responses often use timestamps</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Database timestamp fields</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                <span>Log file timestamps</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Data Analysis</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Time series data processing</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Event timestamp conversion</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                <span>Time duration calculations</span>
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
            <div className="text-xs mt-1">Your ad could be here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;
