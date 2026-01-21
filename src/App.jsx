import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ToolsPage from "./pages/ToolsPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import DisclaimerPage from "./pages/DisclaimerPage.jsx";

// New pages
import TermsPage from "./pages/TermsPage.jsx";
import HelpCenterPage from "./pages/HelpCenterPage.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import ReportIssuePage from "./pages/ReportIssuePage.jsx";
import FeatureRequestPage from "./pages/FeatureRequestPage.jsx";
import StatusPage from "./pages/StatusPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="tools/:category" element={<CategoryPage />} />
          <Route path="tools/:category/:toolId" element={<ToolPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />

          {/* New Routes */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/report-issue" element={<ReportIssuePage />} />
          <Route path="/feature-request" element={<FeatureRequestPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
