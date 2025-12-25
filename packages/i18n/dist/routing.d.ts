import * as next_intl_routing from 'next-intl/routing';

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
declare const locales: string[];
/**
 * Default locale used when:
 * - No locale is specified in the URL
 * - An invalid locale is requested
 * - User has no locale preference
 */
declare const defaultLocale = "en";
/**
 * Routing configuration object used by next-intl.
 * Consumed by middleware and navigation wrappers.
 */
declare const routing: {
    locales: string[];
    defaultLocale: string;
    localePrefix?: next_intl_routing.LocalePrefix<string[], "always"> | undefined;
    domains?: undefined;
    localeCookie?: boolean | {
        maxAge?: number | undefined | undefined;
        priority?: "low" | "medium" | "high" | undefined | undefined;
        domain?: string | undefined | undefined;
        path?: string | undefined | undefined;
        secure?: boolean | undefined | undefined;
        sameSite?: true | false | "lax" | "strict" | "none" | undefined | undefined;
        partitioned?: boolean | undefined | undefined;
        name?: string | undefined;
    };
    alternateLinks?: boolean;
    localeDetection?: boolean;
};

export { defaultLocale, locales, routing };
