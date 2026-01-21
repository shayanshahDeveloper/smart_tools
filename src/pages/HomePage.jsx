import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Rocket, Search } from "lucide-react";
import HeroSection from "../components/sections/HeroSection.jsx";
import CategoriesSection from "../components/sections/CategoriesSection.jsx";
import FeaturesSection from "../components/sections/FeaturesSection.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);

  // Simple navigation
  const goTo = (path) => {
    navigate(path);
  };

  // FAQ toggle
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "Is Smart Tools really free?",
      answer:
        "Yes, absolutely! All our tools are completely free to use with no hidden charges, no subscriptions, and no registration required.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No account is required. All our tools can be used instantly without any sign-up process. Just visit the tool you need and start using it immediately.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes. Most of our tools process data locally in your browser. We do not store files, text, or personal information that you process through our tools.",
    },
    {
      question: "Are there any usage limits?",
      answer:
        "Most tools have no usage limits. However, to ensure fair usage for all users, some resource-intensive tools may have reasonable limits on file size or processing frequency.",
    },
    {
      question: "Can I use these tools on mobile devices?",
      answer:
        "Yes! Our website is fully responsive and works perfectly on mobile phones, tablets, and desktop computers. All tools are optimized for mobile use.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "We support a wide range of file formats including PDF, JPG, PNG, GIF, SVG, DOC, DOCX, TXT, JSON, CSV, and many more.",
    },
  ];

  return (
    <div className="relative">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-30">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of smart people who use our tools daily
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tools"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("/tools");
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <Rocket className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Explore All Tools
              </a>
              <a
                href="/tools/developers"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("/tools/developers");
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                Try Developer Tools
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="relative z-10">
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:gap-12">
              {/* FAQ Content */}
              <div className="lg:w-2/3">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Get quick answers to common questions about Smart Tools
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => {
                    const isOpen = openFAQ === index;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10"
                      >
                        <div
                          onClick={() => toggleFAQ(index)}
                          className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1 mr-4">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">
                                  Q{index + 1}
                                </span>
                              </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 pr-8">
                              {faq.question}
                            </h3>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>

                        {/* FAQ Answer */}
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <div className="flex">
                              <div className="flex-shrink-0 w-8 mr-4">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <span className="text-green-600 font-semibold text-sm">
                                    A
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-600 pt-1">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10">
                  <a
                    href="/faq"
                    onClick={(e) => {
                      e.preventDefault();
                      goTo("/faq");
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
                  >
                    View All FAQ
                    <ChevronDown className="ml-2 w-4 h-4 transform group-hover:rotate-180 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Stats Card */}
              <div className="lg:w-1/3 mt-10 lg:mt-0">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Search className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Quick Stats
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-blue-100">
                      <span className="text-gray-600">Active Users</span>
                      <span className="text-2xl font-bold text-blue-600">
                        10K+
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-blue-100">
                      <span className="text-gray-600">Tools Available</span>
                      <span className="text-2xl font-bold text-purple-600">
                        100+
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-blue-100">
                      <span className="text-gray-600">Files Processed</span>
                      <span className="text-2xl font-bold text-green-600">
                        1M+
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Satisfaction Rate</span>
                      <span className="text-2xl font-bold text-orange-600">
                        98%
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-white rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600 italic">
                      "Smart Tools has saved me hours of manual work. The best
                      free toolset I've found online!"
                    </p>
                    <div className="flex items-center mt-3">
                      <div>
                        <img
                          className="w-10 h-10 rounded-full mr-3"
                          src="https://avatars.githubusercontent.com/u/161978365?v=4"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Shayan Shah
                        </p>
                        <p className="text-xs text-gray-500">Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
