import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivacyNotice from "../components/PrivacyNotice";

export const metadata = {
  title: 'Privacy Notice | EaseSign',
  description: 'Learn about EaseSign (PT Paramita Digital Nusantara), our vision, and the team dedicated to providing reliable and secure digital document solutions.',
};

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
