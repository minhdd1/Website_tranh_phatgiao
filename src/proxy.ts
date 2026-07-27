import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['vi', 'en'];
const defaultLocale = 'vi';

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase().substring(0, 2))
      .find((lang) => locales.includes(lang));

    if (preferredLocale) return preferredLocale;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const matchedLocale = locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )!;

    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', matchedLocale, { path: '/' });
    return response;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  const redirectResponse = NextResponse.redirect(request.nextUrl);
  redirectResponse.cookies.set('NEXT_LOCALE', locale, { path: '/' });
  return redirectResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|api).*)',
  ],
};
