import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['vi', 'en'];
const defaultLocale = 'vi';

function getLocale(request: NextRequest): string {
  // 1. Check for cookie setting
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Parse Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase().substring(0, 2))
      .find(lang => locales.includes(lang));
    
    if (preferredLocale) return preferredLocale;
  }

  // 3. Fallback
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static assets, icons, and API route handlers
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already contains a supported locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it has a valid locale, set a cookie to persist configuration preference
    const matchedLocale = locales.find(
      locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )!;
    
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', matchedLocale, { path: '/' });
    return response;
  }

  // Otherwise, retrieve fallback/preferred language and redirect to localized path
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  const redirectResponse = NextResponse.redirect(request.nextUrl);
  redirectResponse.cookies.set('NEXT_LOCALE', locale, { path: '/' });
  return redirectResponse;
}

export const config = {
  matcher: [
    // Apply middleware to all relevant path patterns
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|api).*)',
  ],
};
