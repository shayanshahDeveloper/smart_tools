import { useParams, Link } from "react-router-dom";
import { getAllCategories, allTools } from "../tools/index.jsx";
import {
  GraduationCap,
  Code,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Type,
  Smile,
  Heart,
  ArrowLeft,
  Star,
  Search,
} from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  const categories = getAllCategories();
  const currentCategory = categories.find((cat) => cat.id === category);

  // Get tools for this category - fixed filtering logic
  const categoryTools = allTools.filter((tool) => {
    // Check if tool belongs to this category through multiple ways
    return (
      tool.category === category ||
      tool.tags.includes(category) ||
      (currentCategory &&
        currentCategory.tools &&
        currentCategory.tools.some((t) => t.id === tool.id))
    );
  });

  if (!currentCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Tools
          </Link>
        </div>
      </div>
    );
  }

  const iconMap = {
    GraduationCap: GraduationCap,
    Code: Code,
    FileText: FileText,
    Image: ImageIcon,
    DollarSign: DollarSign,
    Type: Type,
    Smile: Smile,
    Heart: Heart,
  };

  const Icon = iconMap[currentCategory.icon] || GraduationCap;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Tools
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${
              currentCategory.color === "blue"
                ? "from-blue-100 to-blue-50"
                : currentCategory.color === "purple"
                ? "from-purple-100 to-purple-50"
                : currentCategory.color === "green"
                ? "from-green-100 to-green-50"
                : currentCategory.color === "red"
                ? "from-red-100 to-red-50"
                : currentCategory.color === "orange"
                ? "from-orange-100 to-orange-50"
                : currentCategory.color === "teal"
                ? "from-teal-100 to-teal-50"
                : currentCategory.color === "indigo"
                ? "from-indigo-100 to-indigo-50"
                : "from-gray-100 to-gray-50"
            }`}
          >
            <Icon
              className={`w-10 h-10 ${
                currentCategory.color === "blue"
                  ? "text-blue-600"
                  : currentCategory.color === "purple"
                  ? "text-purple-600"
                  : currentCategory.color === "green"
                  ? "text-green-600"
                  : currentCategory.color === "red"
                  ? "text-red-600"
                  : currentCategory.color === "orange"
                  ? "text-orange-600"
                  : currentCategory.color === "teal"
                  ? "text-teal-600"
                  : currentCategory.color === "indigo"
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {currentCategory.name}
            </h1>
            <p className="text-gray-600 text-lg">
              {currentCategory.description}
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span>{categoryTools.length} tools available</span>
              <span>•</span>
              <span>100% free to use</span>
              <span>•</span>
              <span>No registration required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {categoryTools.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categoryTools.map((tool) => {
              // Get tool icon based on category or tool-specific icon
              const ToolIcon = iconMap[tool.icon] || Icon;

              return (
                <Link
                  key={tool.id}
                  to={`/tools/${category}/${tool.id}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          tool.popular
                            ? "bg-gradient-to-r from-yellow-100 to-orange-100"
                            : "bg-gradient-to-r from-blue-100 to-cyan-100"
                        }`}
                      >
                        <ToolIcon
                          className={`w-6 h-6 ${
                            tool.popular ? "text-yellow-600" : "text-blue-600"
                          }`}
                        />
                      </div>
                      {tool.popular && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          <Star className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {tool.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          +{tool.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                      Use Tool →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Category Description */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About {currentCategory.name}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                {currentCategory.name} are designed to help you with specific
                tasks related to {currentCategory.description.toLowerCase()}.
                Whether you're a student, professional, or hobbyist, these tools
                can save you time and effort.
              </p>
              <p className="mt-4">
                All tools in this category are completely free, require no
                registration, and work directly in your browser. No software
                installation or downloads required.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 mb-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            No tools found in this category
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We're working on adding more tools to this category. Try exploring
            other categories or check back later for new tools.
          </p>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse All Tools
          </Link>
        </div>
      )}

      {/* Other Categories */}
      {categoryTools.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter((cat) => cat.id !== category)
              .slice(0, 4)
              .map((cat) => {
                const CatIcon = iconMap[cat.icon] || GraduationCap;
                return (
                  <Link
                    key={cat.id}
                    to={`/tools/${cat.id}`}
                    className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all text-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                        cat.color === "blue"
                          ? "bg-gradient-to-br from-blue-100 to-blue-50"
                          : cat.color === "purple"
                          ? "bg-gradient-to-br from-purple-100 to-purple-50"
                          : cat.color === "green"
                          ? "bg-gradient-to-br from-green-100 to-green-50"
                          : cat.color === "red"
                          ? "bg-gradient-to-br from-red-100 to-red-50"
                          : cat.color === "orange"
                          ? "bg-gradient-to-br from-orange-100 to-orange-50"
                          : cat.color === "teal"
                          ? "bg-gradient-to-br from-teal-100 to-teal-50"
                          : cat.color === "indigo"
                          ? "bg-gradient-to-br from-indigo-100 to-indigo-50"
                          : "bg-gradient-to-br from-gray-100 to-gray-50"
                      }`}
                    >
                      <CatIcon
                        className={`w-6 h-6 ${
                          cat.color === "blue"
                            ? "text-blue-600"
                            : cat.color === "purple"
                            ? "text-purple-600"
                            : cat.color === "green"
                            ? "text-green-600"
                            : cat.color === "red"
                            ? "text-red-600"
                            : cat.color === "orange"
                            ? "text-orange-600"
                            : cat.color === "teal"
                            ? "text-teal-600"
                            : cat.color === "indigo"
                            ? "text-indigo-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                      {cat.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {cat.tools ? cat.tools.length : 0} tools
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      )}

      {/* Ad Space */}
      <div className="mt-12 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-center">
        <div className="text-gray-500 mb-4">Advertisement</div>
        <div className="h-[250px] flex items-center justify-center bg-white rounded-xl border border-gray-300">
          <div className="text-gray-400">
            Ad Space (728x250)
            <div className="text-sm mt-2">Support free tools development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
