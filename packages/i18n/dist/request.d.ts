import * as next_intl_server from 'next-intl/server';

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
declare const _default: (params: next_intl_server.GetRequestConfigParams) => next_intl_server.RequestConfig | Promise<next_intl_server.RequestConfig>;

export { _default as default };
