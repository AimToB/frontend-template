import createMiddleware from "next-intl/middleware";
import { routing } from "@i18n";

/**
 * Next.js Middleware for internationalization.
 *
 * This middleware:
 * 1. Intercepts all incoming requests
 * 2. Extracts locale from URL path (e.g., "/en/about" → locale="en")
 * 3. Validates locale against routing.locales
 * 4. Redirects invalid locales to default locale
 * 5. Sets locale cookie for future visits
 *
 * The middleware is automatically integrated by the next-intl plugin
 * configured in next.config.ts.
 */
export default createMiddleware(routing);

export const config = {
  /**
   * Matcher pattern defines which routes the middleware runs on.
   *
   * Current exclusions:
   * - /api/* - API routes
   * - /trpc/* - tRPC routes
   * - /studio/* - Sanity Studio
   * - /_next/* - Next.js internal routes
   * - /_vercel/* - Vercel internal routes
   * - Files with extensions (e.g., favicon.ico, robots.txt)
   *
   * Add more exclusions using the pipe operator (|):
   * matcher: "/((?!api|trpc|studio|webhooks|_next|_vercel|.*\\..*).*)"
   */
  matcher: "/((?!api|trpc|studio|_next|_vercel|.*\\..*).*)",
};
