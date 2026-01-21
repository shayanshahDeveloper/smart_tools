import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ToolsPage from "./pages/ToolsPage";
import CategoryPage from "./pages/CategoryPage";
import ToolPage from "./pages/ToolPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import TermsPage from "./pages/TermsPage";
import FAQPage from "./pages/FAQPage"; // Make sure this import is correct

export default function AppRoutes() {
  return (
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
        <Route path="terms" element={<TermsPage />} />
        <Route path="faq" element={<FAQPage />} />{" "}
        {/* Make sure this line is here */}
      </Route>
    </Routes>
  );
}
