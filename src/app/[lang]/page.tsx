import Navbar from '../components/Navbar'
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FeatureSection from '../components/FeatureSection';
import ProductsSection from '../components/ProductsSection';
import ClientSection from '../components/ClientSection';
import Footer from '../components/Footer';
import { Metadata } from 'next';
import { getDictionary } from '../dictionaries';

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Digital Signature & Official e-Seal for Business | EaseSign' : 'Tanda Tangan Digital & E-Meterai Resmi untuk Bisnis | EaseSign',
    description: lang === 'en' ? 'EaseSign provides legally binding digital signature and electronic seal (e-seal) solutions recognized in Indonesia. Secure documents and accelerate your business workflows.' : 'EaseSign menyediakan solusi tanda tangan digital dan meterai elektronik (e-meterai) yang sah secara hukum dan diakui di Indonesia. Amankan dokumen dan percepat alur kerja bisnis Anda.'
  }
}

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#180f33] via-[#0d0d1a] to-[#050505] text-white font-sans overflow-x-hidden">
      <main className="flex-grow">
        <Navbar lang={lang} dict={dict.navbar} />
        <Hero lang={lang} dict={dict.hero} valuePropsDict={dict.valuePropsSection} />
        <AboutSection dict={dict.aboutSection} />
        <FeatureSection dict={dict.featureSection} />
        <ProductsSection dict={dict.productsSection} />
        <ClientSection dict={dict.clientSection} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
      {/* You can add the rest of your page sections here */}
    </div>
  );
}
