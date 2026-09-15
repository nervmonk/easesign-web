import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeClient from "./HomeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn
      ? "Digital Signature & Official e-Meterai Indonesia | EaseSign"
      : "Tanda Tangan Digital Sah UU ITE & e-Meterai Resmi Indonesia | EaseSign",
    description: isEn
      ? "Legally binding electronic signatures (PSrE) and official Peruri e-Meterai in Indonesia. Sign contracts without login friction."
      : "Solusi tanda tangan digital sah UU ITE berinduk Komdigi dan e-meterai resmi Peruri. Tanpa ribet daftar, bayar instan via QRIS.",
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar lang={lang} dict={dict.navbar} />
      <HomeClient lang={lang} dict={dict} />
      <Footer lang={lang} dict={dict.footer} />
    </div>
  );
}
