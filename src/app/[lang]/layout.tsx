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

export const metadata: Metadata = {
  title: {
    default: "EaseSign",
    template: "%s | EaseSign"
  },
  description: "Electronic Signatures Made Easy in Indonesia.",
  openGraph: {
    title: 'EaseSign',
    description: 'Secure and efficient digital signature solutions.',
    url: 'https://easesign.id',
    siteName: 'EaseSign',
    images: [
      {
        url: 'https://easesign.id/og-image.png',
        width: 1200,
        height: 630
      }
    ],
    locale: 'id_ID',
    type: 'website'
  }
};

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
    'url': 'https://easesign.id',
    'logo': 'https://easesign.id/easesign-logo.png',
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
    'sameAs': []
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
