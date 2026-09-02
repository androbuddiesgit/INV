import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import HeaderWrapper from './HeaderWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://nbfashion.biz.id'),
  title: {
    default: 'NB FASHION | Pabrik Konveksi & Garment Industri di Majalengka',
    template: '%s | NB FASHION'
  },
  description: 'Pusat konveksi dan garment skala industri di Cikijing, Majalengka. Melayani pembuatan seragam, kaos, kemeja, makloon dengan kapasitas 200.000 pcs/bulan. Kualitas ekspor & One Stop Production.',
  keywords: ['Konveksi Majalengka', 'Garment Cikijing', 'Jasa Makloon', 'Konveksi Seragam', 'Vendor Kaos', 'NB Fashion', 'Pabrik Garment Jawa Barat', 'Bikin Seragam Kantor', 'Konveksi Terpercaya', 'CMT'],
  authors: [{ name: 'NB FASHION' }],
  creator: 'NB FASHION',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://nbfashion.biz.id',
    title: 'NB FASHION | Pabrik Konveksi & Garment Industri di Majalengka',
    description: 'Pusat konveksi dan garment skala industri di Cikijing, Majalengka. Kapasitas 200rb pcs/bulan. Melayani B2B, Instansi, dan Brand Lokal.',
    siteName: 'NB FASHION',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NB FASHION | Pabrik Konveksi & Garment Industri',
    description: 'Pusat konveksi dan garment skala industri di Cikijing, Majalengka. Kapasitas 200rb pcs/bulan.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <HeaderWrapper />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
