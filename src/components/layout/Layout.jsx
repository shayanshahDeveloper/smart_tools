import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import AdBanner from "./AdBanner.jsx";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <AdBanner />
      <Footer />
    </div>
  );
};

export default Layout;
