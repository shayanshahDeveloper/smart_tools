import {
  AlertCircle,
  Bug,
  FileWarning,
  Server,
  Monitor,
  Smartphone as SmartphoneIcon,
} from "lucide-react";
import { useState } from "react";

const ReportIssuePage = () => {
  const [formData, setFormData] = useState({
    issueType: "",
    title: "",
    description: "",
    steps: "",
    browser: "",
    device: "",
    contactEmail: "",
  });

  const issueTypes = [
    {
      id: "bug",
      label: "Bug/Error",
      icon: Bug,
      description: "Something is not working correctly",
    },
    {
      id: "performance",
      label: "Performance Issue",
      icon: Server,
      description: "Tool is slow or unresponsive",
    },
    {
      id: "ui",
      label: "UI/UX Problem",
      icon: FileWarning,
      description: "Design or usability issue",
    },
    {
      id: "security",
      label: "Security Concern",
      icon: AlertCircle,
      description: "Potential security issue",
    },
    {
      id: "other",
      label: "Other Issue",
      icon: AlertCircle,
      description: "Something else not listed",
    },
  ];

  const browsers = [
    "Chrome",
    "Firefox",
    "Safari",
    "Edge",
    "Opera",
    "Brave",
    "Other",
  ];
  const devices = ["Desktop", "Mobile", "Tablet", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Issue submitted:", formData);
    alert(
      "Thank you for reporting the issue! We will look into it as soon as possible."
    );
    setFormData({
      issueType: "",
      title: "",
      description: "",
      steps: "",
      browser: "",
      device: "",
      contactEmail: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Report an Issue
        </h1>
        <p className="text-xl text-gray-600">
          Help us improve by reporting problems you encounter
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Report Form
          </h2>
          <p className="text-gray-600">
            Please provide as much detail as possible so we can quickly identify
            and fix the issue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What type of issue are you experiencing? *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {issueTypes.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.issueType === type.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="issueType"
                    value={type.id}
                    checked={formData.issueType === type.id}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                    required
                  />
                  <div>
                    <div className="flex items-center mb-2">
                      <type.icon className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="font-medium text-gray-900">
                        {type.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brief description of the issue *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., PDF Merger not processing files over 10MB"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Please describe the issue in detail. What were you trying to do? What happened instead?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Steps to Reproduce */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Steps to reproduce the issue
            </label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              rows="3"
              placeholder="1. Go to...
2. Click on...
3. Enter...
4. See error..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Technical Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Monitor className="inline w-4 h-4 mr-2" />
                Browser *
              </label>
              <select
                name="browser"
                value={formData.browser}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select browser</option>
                {browsers.map((browser) => (
                  <option key={browser} value={browser}>
                    {browser}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SmartphoneIcon className="inline w-4 h-4 mr-2" />
                Device *
              </label>
              <select
                name="device"
                value={formData.device}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select device</option>
                {devices.map((device) => (
                  <option key={device} value={device}>
                    {device}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email (Optional)
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-500">
              We'll only use this to follow up on your report if needed
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow text-lg"
            >
              Submit Report
            </button>
            <p className="mt-4 text-sm text-gray-500 text-center">
              By submitting this report, you help make Smart Tools better for
              everyone. Thank you!
            </p>
          </div>
        </form>
      </div>

      {/* Before Reporting */}
      <div className="mt-12 bg-blue-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Before You Report
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              1
            </span>
            <span>Try refreshing the page and clearing your browser cache</span>
          </li>
          <li className="flex items-start">
            <span className=" w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              2
            </span>
            <span>Check if the issue occurs in a different browser</span>
          </li>
          <li className="flex items-start">
            <span className=" w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              3
            </span>
            <span>Ensure you're using the latest version of your browser</span>
          </li>
          <li className="flex items-start">
            <span className="  w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              4
            </span>
            <span>
              Check if the issue has already been reported in our FAQs
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReportIssuePage;
