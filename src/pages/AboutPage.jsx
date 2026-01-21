import {
  Shield,
  Zap,
  Users,
  Heart,
  Globe,
  Code,
  Rocket,
  TrendingUp,
  Target,
  Star,
  Award,
  Lightbulb,
} from "lucide-react";

const AboutPage = () => {
  const stats = [
    {
      value: "50+",
      label: "Free Tools",
      icon: Code,
      color: "from-blue-600 to-blue-700",
    },
    {
      value: "100k+",
      label: "Monthly Users",
      icon: Users,
      color: "from-purple-600 to-purple-700",
    },
    {
      value: "24/7",
      label: "Uptime",
      icon: Zap,
      color: "from-green-600 to-green-700",
    },
    {
      value: "0$",
      label: "Cost",
      icon: Heart,
      color: "from-pink-600 to-pink-700",
    },
  ];

  const values = [
    {
      title: "100% Free Forever",
      description:
        "No hidden charges, subscriptions, or premium tiers. Every tool is completely free.",
      icon: Award,
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Privacy First",
      description:
        "All processing happens in your browser. We don't store your data or track your usage.",
      icon: Shield,
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Instant Access",
      description:
        "No registration required. Use any tool instantly without signing up or logging in.",
      icon: Rocket,
      color: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Fast & Reliable",
      description:
        "Optimized tools that work when you need them, with minimal loading times.",
      icon: Zap,
      color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Community Driven",
      description:
        "Tools are developed based on user requests and feedback from our community.",
      icon: Users,
      color: "bg-gradient-to-br from-pink-50 to-pink-100",
      iconColor: "text-pink-600",
    },
    {
      title: "Always Improving",
      description:
        "Continuous updates and new tools added regularly based on user needs.",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];

  const teamPrinciples = [
    {
      title: "Accessibility",
      description: "Making useful tools available to everyone, everywhere.",
      icon: Globe,
    },
    {
      title: "Innovation",
      description:
        "Continuously developing new solutions for everyday problems.",
      icon: Lightbulb,
    },
    {
      title: "Quality",
      description:
        "Maintaining high standards for accuracy and user experience.",
      icon: Star,
    },
    {
      title: "Impact",
      description:
        "Creating tools that make a real difference in people's work.",
      icon: Target,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
          <Code className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          About{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Smart Tools
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your comprehensive suite of free online tools designed for developers,
          students, professionals, and anyone who needs quick access to powerful
          utilities.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 mb-16 border border-blue-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            To empower individuals and businesses with high-quality, accessible
            tools that simplify complex tasks and boost productivity. We believe
            that everyone should have access to the tools they need to work
            smarter, not harder.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We're committed to keeping all our tools completely free, with no
            registration required, and we promise to maintain this commitment
            forever.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we build and every decision we
            make
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className={`${value.color} rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Principles */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How We Build Better Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamPrinciples.map((principle, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <principle.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Commitment to You</h2>
          <p className="text-lg mb-8 opacity-90 leading-relaxed">
            We promise to always provide free, high-quality tools without
            compromising on features or user experience. Your feedback shapes
            our development, and your privacy is our priority.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              No Ads Interruption
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              No Data Selling
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              No User Tracking
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              Free Forever
            </div>
          </div>
        </div>
      </div>

      {/* Join Community Section */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Join Our Growing Community
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Help us build the future of free online tools. Your suggestions drive
          our development and help us create better solutions for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/tools"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Explore All Tools
          </a>
          <a
            href="/contact"
            className="px-8 py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Share Feedback
          </a>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          Made with ❤️ for the global community • Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
