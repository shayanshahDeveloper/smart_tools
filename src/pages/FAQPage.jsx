import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: "General Questions",
      items: [
        {
          question: "Is Smart Tools really free?",
          answer:
            "Yes, absolutely! All our tools are completely free to use with no hidden charges, no subscriptions, and no registration required. We believe in providing valuable tools without barriers.",
        },
        {
          question: "Do I need to create an account?",
          answer:
            "No account is required. All our tools can be used instantly without any sign-up process. Just visit the tool you need and start using it immediately.",
        },
        {
          question: "How many tools do you offer?",
          answer:
            "We currently offer 100+ tools across various categories including PDF tools, image tools, developer tools, education tools, finance tools, and more. We regularly add new tools based on user feedback.",
        },
        {
          question: "Can I use these tools on mobile devices?",
          answer:
            "Yes! Our website is fully responsive and works perfectly on mobile phones, tablets, and desktop computers. All tools are optimized for mobile use.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      items: [
        {
          question: "Is my data safe?",
          answer:
            "Yes. Most of our tools process data locally in your browser. We do not store files, text, or personal information that you process through our tools.",
        },
        {
          question: "Do you sell user data?",
          answer:
            "No, we do not sell, trade, or share user data with third parties. We respect your privacy and are committed to protecting it.",
        },
        {
          question: "Are my uploaded files stored on your servers?",
          answer:
            "In most cases, files are processed directly in your browser and never leave your device. For tools that require server processing, files are deleted immediately after processing.",
        },
      ],
    },
    {
      category: "Tool Usage",
      items: [
        {
          question: "Are there any usage limits?",
          answer:
            "Most tools have no usage limits. However, to ensure fair usage for all users, some resource-intensive tools may have reasonable limits on file size or processing frequency.",
        },
        {
          question: "What file formats are supported?",
          answer:
            "We support a wide range of file formats including PDF, JPG, PNG, GIF, SVG, DOC, DOCX, TXT, JSON, CSV, and many more. Specific supported formats are listed on each tool page.",
        },
        {
          question: "Can I use these tools for commercial purposes?",
          answer:
            "Yes, you can use our tools for commercial purposes. However, please review our Terms of Service for specific details about commercial usage rights.",
        },
        {
          question: "Do the tools work offline?",
          answer:
            "Some basic tools work offline, but most tools require an internet connection as they may need to load necessary libraries or perform server-side processing.",
        },
      ],
    },
    {
      category: "Technical Support",
      items: [
        {
          question: "What browsers are supported?",
          answer:
            "We support all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. For the best experience, we recommend using the latest version of your browser.",
        },
        {
          question: "A tool is not working properly. What should I do?",
          answer:
            "First, try refreshing the page and clearing your browser cache. If the issue persists, please report it through our Contact page with details about the problem and your browser information.",
        },
        {
          question: "Can I request a new tool?",
          answer:
            "Absolutely! We welcome tool suggestions from our users. Please use our Feature Request page to suggest new tools you'd like to see on Smart Tools.",
        },
        {
          question: "How often are new tools added?",
          answer:
            "We add new tools regularly based on user demand and technological advancements. Follow us on social media or check our blog for announcements about new tools.",
        },
      ],
    },
  ];

  const toggleFAQ = (categoryIndex, itemIndex) => {
    const index = `${categoryIndex}-${itemIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600">
          Find quick answers to common questions about Smart Tools
        </p>
      </div>

      <div className="space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {category.category}
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {category.items.map((item, itemIndex) => {
                const isOpen = openIndex === `${categoryIndex}-${itemIndex}`;
                return (
                  <div key={itemIndex} className="px-6 py-4">
                    <button
                      onClick={() => toggleFAQ(categoryIndex, itemIndex)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <h3 className="text-lg font-medium text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="mt-3 text-gray-600">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Didn't find what you were looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Contact Support
            </a>
            <a
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-800 font-semibold border border-gray-300 rounded-lg hover:border-blue-500"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
