import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';

export const metadata = {
  title: 'Contact Us | EaseSign',
  description: 'Learn about EaseSign (PT Paramita Digital Nusantara), our vision, and the team dedicated to providing reliable and secure digital document solutions.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Navbar />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}