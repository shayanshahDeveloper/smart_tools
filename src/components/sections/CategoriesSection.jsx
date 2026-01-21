import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  FileText,
  Image as ImageIcon,
  TrendingUp,
  GraduationCap,
  Type,
  Search,
  Heart,
  Briefcase,
  Globe,
  ArrowRight,
} from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      id: "developers",
      name: "Developer Tools",
      icon: Code,
      gradient: "from-blue-100 to-cyan-100",
      textColor: "text-blue-600",
      exploreColor: "text-blue-500 hover:text-blue-600",
      count: 25,
    },
    {
      id: "pdf",
      name: "PDF Tools",
      icon: FileText,
      gradient: "from-red-100 to-pink-100",
      textColor: "text-red-600",
      exploreColor: "text-red-500 hover:text-red-600",
      count: 15,
    },
    {
      id: "images",
      name: "Image Tools",
      icon: ImageIcon,
      gradient: "from-green-100 to-emerald-100",
      textColor: "text-green-600",
      exploreColor: "text-green-500 hover:text-green-600",
      count: 18,
    },
    {
      id: "finance",
      name: "Finance Tools",
      icon: TrendingUp,
      gradient: "from-emerald-100 to-teal-100",
      textColor: "text-emerald-600",
      exploreColor: "text-emerald-500 hover:text-emerald-600",
      count: 12,
    },
    {
      id: "education",
      name: "Education Tools",
      icon: GraduationCap,
      gradient: "from-purple-100 to-violet-100",
      textColor: "text-purple-600",
      exploreColor: "text-purple-500 hover:text-purple-600",
      count: 20,
    },
    {
      id: "text",
      name: "Text Tools",
      icon: Type,
      gradient: "from-orange-100 to-amber-100",
      textColor: "text-orange-600",
      exploreColor: "text-orange-500 hover:text-orange-600",
      count: 16,
    },
    {
      id: "seo",
      name: "SEO Tools",
      icon: Search,
      gradient: "from-indigo-100 to-blue-100",
      textColor: "text-indigo-600",
      exploreColor: "text-indigo-500 hover:text-indigo-600",
      count: 10,
    },
    {
      id: "health",
      name: "Health Tools",
      icon: Heart,
      gradient: "from-pink-100 to-rose-100",
      textColor: "text-pink-600",
      exploreColor: "text-pink-500 hover:text-pink-600",
      count: 8,
    },
    {
      id: "business",
      name: "Business Tools",
      icon: Briefcase,
      gradient: "from-cyan-100 to-sky-100",
      textColor: "text-cyan-600",
      exploreColor: "text-cyan-500 hover:text-cyan-600",
      count: 14,
    },
    {
      id: "webmaster",
      name: "Webmaster Tools",
      icon: Globe,
      gradient: "from-teal-100 to-emerald-100",
      textColor: "text-teal-600",
      exploreColor: "text-teal-500 hover:text-teal-600",
      count: 22,
    },
  ];

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tools Categories
          </h2>
          <p className="text-gray-600 text-lg">Browse tools by category</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <Link to={`/tools/${category.id}`} className="block">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full group-hover:border-blue-300">
                  <div className="flex flex-col items-center text-center h-full">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${category.gradient}`}
                    >
                      <category.icon
                        className={`w-8 h-8 ${category.textColor}`}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {category.count} tools available
                    </p>
                    <div className="mt-auto font-medium flex items-center justify-center">
                      <span className={category.exploreColor}>Explore</span>
                      <ArrowRight
                        className={`ml-2 w-4 h-4 ${category.exploreColor} transition-transform duration-300 group-hover:translate-x-2`}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
