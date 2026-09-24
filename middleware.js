import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifyAdminSessionToken } from '@/lib/adminSession';

// Protects the admin dashboard and admin API. Fails closed: if the admin credentials
// are not configured, nobody can get in.
export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  if (pathname === '/admin/login' || pathname === '/api/admin/login') return NextResponse.next();

  const ok = await verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
