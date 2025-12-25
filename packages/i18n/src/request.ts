import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const selected = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  return {
    locale: selected,
    messages: (await import(`./messages/${selected}.json`)).default,
  };
});
