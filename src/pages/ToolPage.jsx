import { useParams } from "react-router-dom";
import { getToolById } from "../tools/index.jsx";

const ToolPage = () => {
  const { category, toolId } = useParams();
  const tool = getToolById(toolId);

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tool Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            The tool you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/tools"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Tools
          </a>
        </div>
      </div>
    );
  }

  const ToolComponent = tool.component;

  return (
    <div>
      <ToolComponent />

      {/* Related Tools Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* You can add related tools here based on tags */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Need more tools?
            </h3>
            <p className="text-gray-600 mb-4">
              Check out other tools in the same category or with similar
              functionality.
            </p>
            <a
              href={`/tools/${category}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse {category} tools →
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Popular Tools
            </h3>
            <p className="text-gray-600 mb-4">
              Discover our most used and loved tools by the community.
            </p>
            <a
              href="/tools"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View popular tools →
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Suggest a Tool
            </h3>
            <p className="text-gray-600 mb-4">
              Missing a tool you need? Let us know what we should build next.
            </p>
            <a
              href="/feature-request"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Request a feature →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
