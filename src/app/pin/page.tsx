'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function PinPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '202608') {
      // Set cookie berlaku 1 tahun (dalam detik)
      document.cookie = "app_pin=202608; path=/; max-age=31536000";
      router.push('/');
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-sm w-full p-8 rounded-2xl shadow-lg text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Akses Terkunci</h1>
        <p className="text-gray-500 mb-8 text-sm">Masukkan PIN keamanan untuk mengakses aplikasi Invoice.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError(false);
            }}
            placeholder="Masukkan PIN"
            className={`w-full text-center tracking-widest text-2xl font-bold border-2 rounded-xl py-3 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-4 font-medium">PIN yang Anda masukkan salah!</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Buka Aplikasi
          </button>
        </form>
      </div>
    </div>
  );
}
