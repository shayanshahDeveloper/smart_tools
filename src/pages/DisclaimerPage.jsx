const DisclaimerPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Disclaimer</h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Please read this disclaimer carefully before using Smart Tools.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          No Warranties
        </h2>
        <p className="mb-6">
          Smart Tools is provided "as is" without any warranties, expressed or
          implied. We do not guarantee the accuracy, reliability, or
          completeness of any tool or its results.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Limitation of Liability
        </h2>
        <p className="mb-6">
          We shall not be liable for any damages arising from the use or
          inability to use our tools, including but not limited to direct,
          indirect, incidental, or consequential damages.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Tool Accuracy
        </h2>
        <p className="mb-6">
          While we strive to provide accurate tools, we cannot guarantee that
          all tools will produce error-free results. Always verify important
          calculations or conversions through additional means.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          External Links
        </h2>
        <p className="mb-6">
          Our website may contain links to external websites. We are not
          responsible for the content or privacy practices of these sites.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Changes to Tools
        </h2>
        <p className="mb-6">
          We reserve the right to modify, suspend, or discontinue any tool at
          any time without prior notice.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
          <p className="font-semibold text-yellow-800">
            Important: Our tools are for informational purposes only. For
            critical decisions, always consult with appropriate professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
