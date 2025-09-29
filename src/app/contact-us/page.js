import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';

export const metadata = {
  title: 'Hubungi Kami - Konsultasi Tanda Tangan Digital | EaseSign',
  description: 'Hubungi tim EaseSign untuk konsultasi gratis mengenai kebutuhan tanda tangan digital, e-meterai, dan manajemen dokumen untuk perusahaan Anda.',
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