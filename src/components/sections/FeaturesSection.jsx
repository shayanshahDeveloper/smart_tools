import { motion } from "framer-motion";
import { Lock, Shield, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Lock,
      title: "100% Free Forever",
      description:
        "No hidden charges, no subscriptions, no limits. All tools are completely free to use.",
      color: "blue",
      gradient: "from-blue-100 to-cyan-100",
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description:
        "All processing happens in your browser. We don't store your files or data.",
      color: "green",
      gradient: "from-green-100 to-emerald-100",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Fast processing with real-time results. No waiting, no delays.",
      color: "purple",
      gradient: "from-purple-100 to-pink-100",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Smart Tools?
          </h2>
          <p className="text-gray-600 text-lg">
            We're committed to providing the best free tools experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.gradient}`}
              >
                <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
