import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import HeaderWrapper from './HeaderWrapper';

export const metadata: Metadata = {
  title: 'Marketing Invoice App',
  description: 'Aplikasi Pembuatan Invoice Marketing',
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
