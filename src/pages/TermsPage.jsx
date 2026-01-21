const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Terms of Service
      </h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <p className="font-semibold text-blue-800">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-blue-700 mt-2">
            Please read these Terms of Service carefully before using Smart
            Tools.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using Smart Tools, you accept and agree to be bound
            by the terms and provisions of this agreement. If you do not agree
            to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Use License
          </h2>
          <p className="mb-4">
            Permission is granted to temporarily use our tools for personal,
            non-commercial purposes only. This is the grant of a license, not a
            transfer of title.
          </p>
          <p>Under this license you may not:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
            <li>
              Transfer the materials to another person or "mirror" the materials
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. User Responsibilities
          </h2>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Use the tools for lawful purposes only</li>
            <li>Not upload harmful or malicious content</li>
            <li>Not attempt to disrupt or interfere with the service</li>
            <li>Respect the intellectual property rights of others</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Disclaimer
          </h2>
          <p className="mb-4">
            The tools on Smart Tools are provided on an 'as is' basis. We make
            no warranties, expressed or implied, and hereby disclaim and negate
            all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Limitations
          </h2>
          <p>
            In no event shall Smart Tools or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the tools on our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Revisions and Errata
          </h2>
          <p>
            The materials appearing on Smart Tools could include technical,
            typographical, or photographic errors. We do not warrant that any of
            the materials are accurate, complete, or current. We may make
            changes to the materials at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Links</h2>
          <p>
            We have not reviewed all of the sites linked to our website and are
            not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by Smart Tools. Use
            of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Modifications
          </h2>
          <p>
            We may revise these terms of service at any time without notice. By
            using this website you are agreeing to be bound by the then current
            version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Governing Law
          </h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws and you irrevocably submit to the exclusive
            jurisdiction of the courts in that location.
          </p>
        </section>

        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Contact Information
          </h3>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please
            contact us at:
            <br />
            <span className="font-medium">legal@smarttools.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
