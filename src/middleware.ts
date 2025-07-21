import { NextRequest, NextResponse } from "next/server";

// Define supported locales and fallback
const SUPPORTED_LOCALES = ["en", "bg"];
const FALLBACK_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip _next, static files, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(.*)$/.test(pathname)
  ) {
    return;
  }

  // If the pathname already includes a locale, continue
  const hasLocale = SUPPORTED_LOCALES.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  if (hasLocale) return;

  // Optionally: detect preferred language from Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  const preferredLocale =
    acceptLang?.split(",")?.[0]?.split("-")?.[0] ?? FALLBACK_LOCALE;

  const matchedLocale = SUPPORTED_LOCALES.includes(preferredLocale)
    ? preferredLocale
    : FALLBACK_LOCALE;

  // Redirect to locale-prefixed path
  const localeURL = new URL(`/${matchedLocale}${pathname}`, request.url);
  return NextResponse.redirect(localeURL);
}
