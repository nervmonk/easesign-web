import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivacyNotice from "../components/PrivacyNotice";

export default function PrivacyNoticePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-white">
        <Navbar />
        <PrivacyNotice />
      </main>
      <Footer />
    </div>
  );
}
