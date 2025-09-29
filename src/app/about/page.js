import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutHero from '../components/AboutHero';
import VisionSection from '../components/VisionSection';
import TeamSection from '../components/TeamSection';

export const metadata = {
  title: 'Tentang Kami - Penyedia Tanda Tangan Digital Terpercaya | EaseSign',
  description: 'Pelajari tentang EaseSign (PT Paramita Digital Nusantara), visi kami, dan tim profesional di balik solusi dokumen digital yang aman dan terpercaya untuk perusahaan di Indonesia.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-white text-gray-800">
        <Navbar />
        <AboutHero />
        <VisionSection/>
        <TeamSection/>
        {/* You can add more sections for the about page here */}
      </main>
      <Footer />
    </div>
  );
}