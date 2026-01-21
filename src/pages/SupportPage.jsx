import {
  Mail,
  MessageSquare,
  Phone,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";

const SupportPage = () => {
  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      availability: "Mon-Fri, 9AM-6PM EST",
      response: "Instant",
      buttonText: "Start Chat",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email with your questions",
      availability: "24/7",
      response: "Within 24 hours",
      buttonText: "Send Email",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      availability: "Mon-Fri, 10AM-5PM EST",
      response: "Immediate",
      buttonText: "Call Now",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const quickLinks = [
    {
      title: "Help Center",
      description: "Browse articles and tutorials",
      link: "/help",
    },
    {
      title: "FAQs",
      description: "Find quick answers to common questions",
      link: "/faq",
    },
    {
      title: "Report an Issue",
      description: "Report bugs or problems",
      link: "/report-issue",
    },
    {
      title: "Feature Request",
      description: "Suggest new features or improvements",
      link: "/feature-request",
    },
    {
      title: "Status Page",
      description: "Check service availability",
      link: "/status",
    },
    {
      title: "Contact Form",
      description: "Send us a detailed message",
      link: "/contact",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Support Center
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're here to help you get the most out of Smart Tools
        </p>
      </div>

      {/* Support Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {supportOptions.map((option) => (
          <div
            key={option.title}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className={`h-2 bg-gradient-to-r ${option.color}`}></div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center`}
                >
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {option.title}
                  </h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-3" />
                  <span className="text-sm">
                    Availability: {option.availability}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-3" />
                  <span className="text-sm">Response: {option.response}</span>
                </div>
              </div>

              <button
                className={`w-full py-3 bg-gradient-to-r ${option.color} text-white font-semibold rounded-lg hover:shadow-md transition-shadow`}
              >
                {option.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Quick Help & Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.link}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                {link.title}
              </h3>
              <p className="text-gray-600">{link.description}</p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                Learn more
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contact Information
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                General Inquiries
              </h3>
              <p className="text-gray-700">support@smarttools.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Technical Support
              </h3>
              <p className="text-gray-700">tech@smarttools.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Business Inquiries
              </h3>
              <p className="text-gray-700">business@smarttools.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Number</h3>
              <p className="text-gray-700">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-purple-600 mr-4" />
            <h2 className="text-2xl font-bold text-gray-900">
              Community Support
            </h2>
          </div>
          <p className="text-gray-700 mb-6">
            Join our community of users who help each other. Many questions are
            already answered by our active community.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>24/7 community discussions</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Expert users ready to help</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Share tips and best practices</span>
            </div>
          </div>
          <button className="mt-8 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-md transition-shadow">
            Join Community
          </button>
        </div>
      </div>

      {/* Support Hours */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Support Hours & Service Level
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Standard Support Hours
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday:</span>
                <span className="font-medium">9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday:</span>
                <span className="font-medium">10:00 AM - 4:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday:</span>
                <span className="font-medium">Emergency only</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Response Times</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Critical Issues:</span>
                <span className="font-medium text-red-600">
                  2 hours or less
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">High Priority:</span>
                <span className="font-medium text-orange-600">4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Normal:</span>
                <span className="font-medium text-green-600">24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
