import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
