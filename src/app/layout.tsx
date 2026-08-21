import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="font-bold text-xl text-blue-800 tracking-tight">
              INV.Barokah
            </div>
            <nav className="text-sm font-medium text-gray-600">
              Marketing App
            </nav>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
