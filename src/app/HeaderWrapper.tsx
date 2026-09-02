'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Hide header on the public landing page
  if (pathname === '/') {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl text-blue-800 tracking-tight">
          Dashboard Admin
        </div>
        <nav className="text-sm font-medium text-gray-600">
          Marketing App
        </nav>
      </div>
    </header>
  );
}
