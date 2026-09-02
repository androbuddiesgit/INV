import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pin = request.cookies.get('app_pin')?.value;
  const path = request.nextUrl.pathname;
  
  const isProtected = 
    path.startsWith('/dashboard') || 
    path.startsWith('/invoice') || 
    path.startsWith('/settings') || 
    path.startsWith('/catalog-admin');

  // Jika mencoba akses rute terproteksi tanpa PIN yang benar
  if (isProtected && pin !== '202608') {
    return NextResponse.redirect(new URL('/pin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
