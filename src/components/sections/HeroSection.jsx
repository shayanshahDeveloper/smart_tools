import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Grid, Infinity, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="animate-slide-up"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 font-semibold text-sm mb-6">
              <Zap className="mr-2 w-4 h-4" />
              Free Tools for Lifetime
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Smart Tools
              </span>
              <br />
              <span className="text-gray-900">for Smart People</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Access 100+ free online tools for developers, students, and
              professionals. No registration required. No hidden fees. Free
              forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <Rocket className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Explore All Tools
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-gray-800 font-semibold text-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <Grid className="mr-3 w-5 h-5" />
                Browse Categories
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-blue-600">100+</div>
              <div className="text-gray-600">Free Tools</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-green-600">0$</div>
              <div className="text-gray-600">No Cost</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-pink-600">∞</div>
              <div className="text-gray-600">Lifetime Access</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
