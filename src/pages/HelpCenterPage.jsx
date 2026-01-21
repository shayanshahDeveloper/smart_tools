import {
  HelpCircle,
  Search,
  MessageCircle,
  Video,
  Book,
  Users,
} from "lucide-react";

const HelpCenterPage = () => {
  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn how to use Smart Tools effectively",
      articles: 12,
      link: "#",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      articles: 8,
      link: "#",
    },
    {
      icon: MessageCircle,
      title: "Common Questions",
      description: "Answers to frequently asked questions",
      articles: 25,
      link: "#",
    },
    {
      icon: Users,
      title: "Community Help",
      description: "Get help from our user community",
      articles: 45,
      link: "#",
    },
  ];

  const popularArticles = [
    "How to use the PDF Merger tool",
    "Image compression settings explained",
    "Understanding the JSON Formatter",
    "Troubleshooting tool loading issues",
    "Best practices for using text tools",
    "How to convert files between formats",
    "Privacy and security FAQs",
    "Browser compatibility guide",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers, guides, and tutorials to help you make the most of Smart
          Tools
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help articles, tutorials, or FAQs..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {helpCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <category.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {category.title}
            </h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {category.articles} articles
              </span>
              <a
                href={category.link}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Browse →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular Articles
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {popularArticles.map((article, index) => (
            <a
              key={index}
              href="#"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                <span className="text-gray-800 hover:text-blue-600">
                  {article}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to
            help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Contact Support
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-800 font-semibold border border-gray-300 rounded-lg hover:border-blue-500"
            >
              Submit a Request
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
