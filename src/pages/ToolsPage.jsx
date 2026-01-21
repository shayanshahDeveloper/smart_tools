import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Code,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Type,
  Smile,
  Heart,
  Search,
  Filter,
  Grid,
  List,
  Star,
  TrendingUp,
  Map, // Add this
  BarChart3, // Add this
} from "lucide-react";
import { getAllCategories, allTools } from "../tools/index.jsx";

const ToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const categories = getAllCategories();

  // Debug: Check all tools and their components
  useEffect(() => {
    console.log("=== DEBUG TOOLS ===");
    categories.forEach((category) => {
      console.log(`Category: ${category.name}`);
      category.tools.forEach((tool) => {
        console.log(`  - ${tool.name}:`, {
          component: tool.component,
          componentType: typeof tool.component,
          hasComponent: !!tool.component,
        });

        if (!tool.component) {
          console.error(`  ERROR: ${tool.name} has no component!`);
        }
      });
    });
  }, [categories]);

  // Get tools for the selected category
  const getToolsForCategory = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.tools : [];
  };

  // Filter tools based on search and category
  const filteredTools = (() => {
    let toolsToFilter;

    if (selectedCategory === "all") {
      toolsToFilter = allTools;
    } else {
      toolsToFilter = getToolsForCategory(selectedCategory);
    }

    if (!searchQuery) {
      return toolsToFilter;
    }

    return toolsToFilter.filter((tool) => {
      const matchesName = tool.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDescription = tool.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags = tool.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchesName || matchesDescription || matchesTags;
    });
  })();

  // Get popular tools (marked as popular)
  const popularTools = allTools.filter((tool) => tool.popular);

  const iconMap = {
    GraduationCap,
    Code,
    FileText,
    Image: ImageIcon,
    DollarSign,
    Type,
    Smile,
    Heart,
    Search, // Already here for the SEO category
    Map, // For sitemap generator tool icon (if used elsewhere)
    BarChart3, // For SEO analyzer tool icon (if used elsewhere)
    Link, // For backlink checker tool icon (if used elsewhere)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tools</h1>
        <p className="text-gray-600 text-lg mb-8">
          Browse 100+ free online tools for developers, students, and
          professionals
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for tools by name, description, or keyword..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {filteredTools.length} tools found
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-white shadow" : "hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-white shadow" : "hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Filter by:</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Categories */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Categories */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === "all"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">All Tools</div>
                  <div className="text-sm text-gray-500">
                    {allTools.length} tools
                  </div>
                </button>
                {categories.map((category) => {
                  const Icon = iconMap[category.icon];
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                        selectedCategory === category.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedCategory === category.id
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            selectedCategory === category.id
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-gray-500">
                          {category.tools.length} tools
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Tools */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Popular Tools
              </h3>
              <div className="space-y-3">
                {popularTools.slice(0, 5).map((tool) => (
                  <Link
                    key={tool.id}
                    to={`/tools/education/${tool.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">
                        {tool.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {tool.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Tools Grid/List */}
        <div className="lg:col-span-3">
          {viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const category = categories.find((cat) =>
                  cat.tools.some((t) => t.id === tool.id)
                );
                const Icon = iconMap[category?.icon] || GraduationCap;

                return (
                  <Link
                    key={tool.id}
                    to={`/tools/${category?.id || "education"}/${tool.id}`}
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
                          <Icon
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
                        {tool.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="capitalize">{category?.name}</span>
                        <span className="group-hover:text-blue-600 group-hover:translate-x-1 transition-transform">
                          Use Tool →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredTools.map((tool) => {
                const category = categories.find((cat) =>
                  cat.tools.some((t) => t.id === tool.id)
                );
                const Icon = iconMap[category?.icon] || GraduationCap;

                return (
                  <Link
                    key={tool.id}
                    to={`/tools/${category?.id || "education"}/${tool.id}`}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-6"
                  >
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        tool.popular
                          ? "bg-gradient-to-r from-yellow-100 to-orange-100"
                          : "bg-gradient-to-r from-blue-100 to-cyan-100"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          tool.popular ? "text-yellow-600" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                          {tool.name}
                        </h3>
                        {tool.popular && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            <Star className="w-3 h-3" />
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{tool.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tool.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-2 capitalize">
                        {category?.name}
                      </div>
                      <div className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                        Open →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                No tools found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {allTools.length}+
          </div>
          <div className="text-gray-700">Total Tools</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {categories.length}
          </div>
          <div className="text-gray-700">Categories</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
          <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
          <div className="text-gray-700">Free Forever</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
          <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
          <div className="text-gray-700">Available</div>
        </div>
      </div>

      {/* Ad Space */}
      <div className="mt-12 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-center">
        <div className="text-gray-500 mb-4">Advertisement</div>
        <div className="h-[250px] flex items-center justify-center bg-white rounded-xl border border-gray-300">
          <div className="text-gray-400">
            Ad Space (728x250)
            <div className="text-sm mt-2">Your ad could be here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
