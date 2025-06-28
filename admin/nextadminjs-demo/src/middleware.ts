import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const PUBLIC_ROUTES = ['/auth/login', '/favicon.ico', '/403'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get('jwt')?.value;


  if (!token) {
        return NextResponse.redirect(new URL('/403', req.url));
  }

  try {
    const decoded: any = jwtDecode(token);
    const role = decoded?.role?.toUpperCase();

    const isAdmin = role === 'ROLE_ADMIN';
    const isEntrepreneur = role === 'ROLE_EMPRENDEDOR';

    const ENTREPRENEUR_ROUTES = [
      '/myprofile',
      '/my-products',
      '/edit-profile',
      '/talonario',
      '/contract',
      '/restock'
    ];

    const ADMIN_ROUTES = [
      '/entrepreneurs',
      '/solicitudes',
      '/admin/talonario',
      '/admin/products',
      '/aproverestock'
    ];

    if (ENTREPRENEUR_ROUTES.some((r) => pathname.startsWith(r)) && !isEntrepreneur) {
      return NextResponse.redirect(new URL('/403', req.url));
    }

    if (ADMIN_ROUTES.some((r) => pathname.startsWith(r)) && !isAdmin) {
      return NextResponse.redirect(new URL('/403', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/403', req.url));
  }
}

export const config = {
  matcher: [
    '/myprofile/:path*',
    '/my-products/:path*',
    '/edit-profile/:path*',
    '/talonario/:path*',
    '/contract/:path*',
    '/restock/:path*',
    '/entrepreneurs/:path*',
    '/solicitudes/:path*',
    '/admin/:path*',
  ],
};
