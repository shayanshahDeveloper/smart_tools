import { Link } from "react-router-dom";
import { Bolt, Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Categories: [
      { name: "Developer Tools", href: "/tools/developers" },
      { name: "PDF Tools", href: "/tools/pdf" },
      { name: "Image Tools", href: "/tools/images" },
      { name: "Education Tools", href: "/tools/education" },
      { name: "Finance Tools", href: "/tools/finance" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Disclaimer", href: "/disclaimer" },
      { name: "Terms of Service", href: "/terms" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
      { name: "Report Issue", href: "/report-issue" },
      { name: "Feature Request", href: "/feature-request" },
      { name: "Status", href: "/status" },
      { name: "Support", href: "/support" }, // Add this
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Bolt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Smart Tools</h2>
                <p className="text-gray-400 text-sm">for Smart People</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your one-stop destination for free online tools. We provide 100+
              tools for developers, students, and professionals. All tools are
              completely free, no registration required.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Smart Tools. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/disclaimer"
                className="text-gray-400 hover:text-white text-sm"
              >
                Disclaimer
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
