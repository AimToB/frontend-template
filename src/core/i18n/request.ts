import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Server-side request configuration for next-intl.
 *
 * This function is called automatically by next-intl on every request to:
 * 1. Validate the incoming locale from the URL
 * 2. Load the appropriate message translations
 *
 * CRITICAL: The path to this file must be configured in next.config.ts:
 * createNextIntlPlugin("./src/core/i18n/request.ts")
 *
 * If you move this file, update next.config.ts accordingly.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // Extract locale from URL (e.g., "en" from "/en/about")
  const requested = await requestLocale;

  // Validate locale exists in routing.locales, fallback to default if not
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // Dynamically import the message file for this locale
    // Messages are cached in production builds
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
