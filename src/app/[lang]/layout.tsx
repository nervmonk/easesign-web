import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';

  return {
    metadataBase: new URL('https://easesign.site'),
    title: {
      default: isEn ? "Digital Signature & Official e-Seal (PSrE) Indonesia" : "Tanda Tangan Digital & E-Meterai Digital Resmi",
      template: "%s | EaseSign"
    },
    description: isEn 
      ? "EaseSign provides legally binding digital signature and electronic seal (e-seal) solutions recognized in Indonesia. PSrE & Komdigi certified." 
      : "EaseSign menyediakan solusi tanda tangan digital dan meterai elektronik (e-meterai) resmi tersertifikasi PSrE & Komdigi. Sah secara hukum di Indonesia.",
    alternates: {
      canonical: `/${lang}/`,
      languages: {
        'en-ID': '/en/',
        'id-ID': '/id/',
        'x-default': '/id/',
      },
    },
    openGraph: {
      title: 'EaseSign',
      description: isEn ? 'Secure and efficient digital signature solutions.' : 'Solusi tanda tangan digital yang aman dan efisien.',
      url: `https://easesign.site/${lang}/`,
      siteName: 'EaseSign',
      images: [
        {
          url: 'https://easesign.site/og-image.png',
          width: 1200,
          height: 630
        }
      ],
      locale: isEn ? 'en_US' : 'id_ID',
      type: 'website'
    }
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    'name': 'EaseSign',
    'url': 'https://easesign.site',
    'logo': 'https://easesign.site/easesign-logo.png',
    'description': lang === 'en' ? 'Legally binding digital signature and electronic seal (e-seal) solutions in Indonesia.' : 'Solusi tanda tangan digital dan meterai elektronik (e-meterai) resmi di Indonesia.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+62-21-38915110',
      'contactType': 'Customer Service',
      'email': 'info@easesign.id'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Dea Tower II, 15th Floor Suite, Jl. Mega Kuningan Barat Kav. E4.3 No. 1-2',
      'addressLocality': 'South Jakarta',
      'postalCode': '12950',
      'addressCountry': 'ID'
    },
    'sameAs': [
      'https://www.linkedin.com/company/easesign-id/',
    ]
  };
  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
