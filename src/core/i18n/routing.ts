import { defineRouting } from "next-intl/routing";

/**
 * Core i18n routing configuration.
 *
 * This file defines:
 * - Which locales are supported by your application
 * - Which locale is the default fallback
 *
 * IMPORTANT: When you add/remove locales:
 * 1. Update the locales array below
 * 2. Create/remove corresponding message files in ./messages/
 * 3. Update language switcher components
 * 4. Rebuild the application
 */

/**
 * List of supported locale codes.
 * Must match the message files in ./messages/ directory.
 */
export const locales = ["en", "de"];

/**
 * Default locale used when:
 * - No locale is specified in the URL
 * - An invalid locale is requested
 * - User has no locale preference
 */
export const defaultLocale = "en";

/**
 * Routing configuration object used by next-intl.
 * Consumed by middleware and navigation wrappers.
 */
export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
});
