import {
  Lightbulb,
  TrendingUp,
  Users,
  Rocket,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const FeatureRequestPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    useCase: "",
    priority: "",
    contactEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "new-tool", label: "New Tool Request" },
    { value: "existing-improvement", label: "Improvement to Existing Tool" },
    { value: "ui-ux", label: "UI/UX Improvement" },
    { value: "performance", label: "Performance Enhancement" },
    { value: "mobile", label: "Mobile Experience" },
    { value: "integration", label: "Integration Feature" },
    { value: "other", label: "Other Feature" },
  ];

  const priorities = [
    {
      value: "low",
      label: "Low Priority",
      color: "text-green-600 bg-green-50",
    },
    {
      value: "medium",
      label: "Medium Priority",
      color: "text-yellow-600 bg-yellow-50",
    },
    {
      value: "high",
      label: "High Priority",
      color: "text-orange-600 bg-orange-50",
    },
    {
      value: "critical",
      label: "Critical Need",
      color: "text-red-600 bg-red-50",
    },
  ];

  const popularRequests = [
    {
      title: "Batch processing for image tools",
      votes: 125,
      status: "planned",
    },
    { title: "Dark mode for all tools", votes: 89, status: "in-progress" },
    { title: "Desktop application version", votes: 76, status: "under-review" },
    { title: "API access for developers", votes: 64, status: "planned" },
    { title: "More video editing tools", votes: 53, status: "considering" },
    { title: "Offline mode for basic tools", votes: 42, status: "considering" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a feature title");
      return false;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Please provide a detailed description");
      return false;
    }
    if (!formData.priority) {
      toast.error("Please select a priority level");
      return false;
    }
    if (
      formData.contactEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)
    ) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        to_email: "features@smarttools.com",
        subject: `New Feature Request: ${formData.title}`,
        feature_title: formData.title,
        feature_category:
          categories.find((cat) => cat.value === formData.category)?.label ||
          formData.category,
        feature_description: formData.description,
        feature_usecase: formData.useCase || "Not specified",
        feature_priority:
          priorities.find((pri) => pri.value === formData.priority)?.label ||
          formData.priority,
        user_email:
          formData.contactEmail || "Anonymous user (email not provided)",
        submission_date_time: `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        "service_t66xmpn",
        "template_qyt9kmd",
        templateParams,
        "P-DFoYopDqL0tCEqJ"
      );

      // SIMPLER SUCCESS TOAST MESSAGE
      toast.success("✓ Feature request submitted!", {
        position: "top-right",
        autoClose: 3000, // Shorter duration (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form
      setFormData({
        title: "",
        category: "",
        description: "",
        useCase: "",
        priority: "",
        contactEmail: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      // SIMPLER ERROR TOAST MESSAGE
      toast.error("✗ Failed to submit request", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = (index) => {
    const updatedRequests = [...popularRequests];
    updatedRequests[index].votes += 1;

    // SIMPLER VOTE TOAST
    toast.info("✓ Vote recorded", {
      position: "top-right",
      autoClose: 2000, // Very short for votes
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Feature Request
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have an idea to improve Smart Tools? We'd love to hear it!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Submit Your Idea
              </h2>
              <p className="text-white/90">
                Your suggestions help us build better tools for everyone
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feature Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief, descriptive title for your feature idea"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your feature idea in detail. What problem does it solve? How should it work?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Use Case */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Use Case
                </label>
                <textarea
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How would you use this feature? What specific tasks would it help you accomplish?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How important is this for you? *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {priorities.map((priority) => (
                    <label
                      key={priority.value}
                      className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all ${
                        formData.priority === priority.value
                          ? "border-blue-500 ring-2 ring-blue-100"
                          : "border-gray-200 hover:border-gray-300"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priority.value}
                        checked={formData.priority === priority.value}
                        onChange={handleChange}
                        className="sr-only"
                        required
                        disabled={isSubmitting}
                      />
                      <span
                        className={`text-sm font-medium ${priority.color} px-3 py-1 rounded-full`}
                      >
                        {priority.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email (Optional)
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
                <p className="mt-2 text-sm text-gray-500">
                  We'll contact you if we need more information about your
                  suggestion
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-3 w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-3 w-5 h-5" />
                      Submit Feature Request
                    </>
                  )}
                </button>
                <p className="mt-3 text-sm text-gray-500 text-center">
                  By submitting, you agree to our terms and privacy policy
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Requests */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                Popular Requests
              </h3>
            </div>
            <div className="space-y-4">
              {popularRequests.map((request, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-medium text-gray-900">
                      {request.title}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        request.status === "in-progress"
                          ? "bg-blue-100 text-blue-600"
                          : request.status === "planned"
                          ? "bg-green-100 text-green-600"
                          : request.status === "considering"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {request.status.replace("-", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">
                        {request.votes} votes
                      </span>
                    </div>
                    <button
                      onClick={() => handleVote(index)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center mb-6">
              <Lightbulb className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                Tips for Great Suggestions
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Be specific about what you want
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Explain the problem it solves
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Include examples if possible
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Check if it's already requested
                </span>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-white mr-3" />
              <h3 className="text-xl font-semibold">Community Impact</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,234+</div>
              <p className="text-white/90">Features suggested by users</p>
              <div className="mt-4 text-sm text-white/80">
                <div className="flex justify-between mb-1">
                  <span>Implemented:</span>
                  <span className="font-medium">256</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>In Development:</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span>Under Review:</span>
                  <span className="font-medium">156</span>
                </div>
              </div>
            </div>
          </div>

          {/* Process Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What Happens Next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <span className="text-gray-700">Review by our team</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <span className="text-gray-700">Priority assessment</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <span className="text-gray-700">Development planning</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-medium text-blue-600">4</span>
                </div>
                <span className="text-gray-700">Implementation & release</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequestPage;
