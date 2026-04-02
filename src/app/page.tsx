import Navbar from './components/Navbar'
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FeatureSection from './components/FeatureSection';
import ValuePropsSection from './components/ValuePropsSection';
import ProductsSection from './components/ProductsSection';
import ClientSection from './components/ClientSection';
import Footer from './components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tanda Tangan Digital & E-Meterai Resmi untuk Bisnis | EaseSign',
  description: 'EaseSign menyediakan solusi tanda tangan digital dan meterai elektronik (e-meterai) yang sah secara hukum dan diakui di Indonesia. Amankan dokumen dan percepat alur kerja bisnis Anda.'
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#180f33] via-[#0d0d1a] to-[#050505] text-white font-sans overflow-x-hidden">
      <main className="flex-grow">
        <Navbar />
        <Hero />
        <AboutSection/>
        <FeatureSection />
        <ValuePropsSection/>
        <ProductsSection/>
        <ClientSection/>
      </main>
      <Footer/>
      {/* You can add the rest of your page sections here */}
    </div>
  );
}
