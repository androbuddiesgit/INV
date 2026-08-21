import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pin = request.cookies.get('app_pin')?.value;
  
  // Jika PIN salah dan tidak sedang berada di halaman /pin
  if (pin !== '202608' && !request.nextUrl.pathname.startsWith('/pin')) {
    return NextResponse.redirect(new URL('/pin', request.url));
  }
  
  // Jika PIN benar atau sedang di halaman /pin, biarkan lewat
  return NextResponse.next();
}

export const config = {
  // Terapkan ke semua halaman KECUALI file statis, gambar, dan api
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
