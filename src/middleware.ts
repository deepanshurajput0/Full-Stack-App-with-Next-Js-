import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;  // Get the current path
  const token = request.cookies.get('token')?.value || '';

  const publicRoutes = ['/login', '/signup'];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));  // Redirect to home
  }

  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));  // Redirect to login
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/profile', '/create', '/todos'],
};
