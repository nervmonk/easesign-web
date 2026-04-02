import ClientWrapper from './ClientWrapper';
import { getDictionary } from '../../dictionaries';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  return {
    title: isEn 
      ? 'Sign PDF Online - Free Digital Signature | EaseSign' 
      : 'Tanda Tangan PDF Online - Gratis & Cepat | EaseSign',
    description: isEn 
      ? 'Quick, secure, and privacy-first PDF electronic signature. Sign your documents online for free without uploading to a server.' 
      : 'Tanda tangan elektronik PDF gratis, cepat, dan aman. Proses tanda tangan dilakukan di browser Anda tanpa upload dokumen ke server.'
  }
}

export default async function SignPdfServer({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return <ClientWrapper lang={lang} dict={dict.signPdf} navbarDict={dict.navbar} />;
}
