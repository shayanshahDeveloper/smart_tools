import { Link } from "react-router-dom";
import { Menu, X, Search, Bolt, ChevronDown } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "All Tools", href: "/tools" },
    { name: "Categories", href: "#", submenu: true },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    { name: "Developer Tools", href: "/tools/developers", icon: "💻" },
    { name: "PDF Tools", href: "/tools/pdf", icon: "📄" },
    { name: "Image Tools", href: "/tools/images", icon: "🖼️" },
    { name: "Finance Tools", href: "/tools/finance", icon: "💰" },
    { name: "Education Tools", href: "/tools/education", icon: "🎓" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Bolt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Smart Tools
                </h1>
                <p className="text-xs text-gray-500">for Smart People</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                    {item.name}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    {item.name}
                  </Link>
                )}

                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-4">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.href}
                          className="flex items-center p-3 hover:bg-gray-50 rounded-lg group"
                        >
                          <span className="text-xl mr-3">{category.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {category.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              10+ tools
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and CTA */}
          <div className="hidden md:flex items-center gap-4">
            <SearchBar />
            <Link
              to="/tools"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-xl transition-shadow"
            >
              Start Using
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <SearchBar />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
