const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          At Smart Tools, we take your privacy seriously. This Privacy Policy
          explains how we handle your information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Information We Collect
        </h2>
        <p className="mb-4">
          Most of our tools process data locally in your browser. We do not
          collect or store:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Files you upload for processing</li>
          <li>Text you enter into our tools</li>
          <li>Personal information</li>
          <li>Usage data (except anonymous analytics)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Third-Party Services
        </h2>
        <p className="mb-6">
          We may use third-party services like Google Analytics for anonymous
          usage statistics. These services collect non-personal information to
          help us improve our tools.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies</h2>
        <p className="mb-6">
          We use minimal cookies only for essential functions. No tracking
          cookies are used.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at privacy@smarttools.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
