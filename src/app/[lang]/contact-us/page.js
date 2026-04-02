import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import { getDictionary } from '../../dictionaries';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Contact Us - Digital Signature Consultation | EaseSign' : 'Hubungi Kami - Konsultasi Tanda Tangan Digital | EaseSign',
    description: lang === 'en' ? 'Contact the EaseSign team for a free consultation on digital signature, e-seal, and document management needs.' : 'Hubungi tim EaseSign untuk konsultasi gratis mengenai kebutuhan tanda tangan digital, e-meterai, dan manajemen dokumen untuk perusahaan Anda.',
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#180f33] via-[#0d0d1a] to-[#050505] text-white font-sans overflow-x-hidden">
      <main className="flex-grow">
        <Navbar lang={lang} dict={dict.navbar} />
        <ContactSection dict={dict.contactSection} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </div>
  );
}