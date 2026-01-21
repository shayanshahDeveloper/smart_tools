const AdBanner = () => {
  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center">
          <div className="text-sm text-gray-500">
            {/* Ad Space - This is where you can place Google AdSense or other ads */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
              <div className="h-[90px] flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 rounded">
                <div className="text-gray-400">
                  Ad Space (728x90)
                  <div className="text-xs mt-1">
                    Google AdSense or Custom Ads
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Advertisement - Supports free tools development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
