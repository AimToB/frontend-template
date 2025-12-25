// ../../src/core/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
var locales = ["en", "de"];
var defaultLocale = "en";
var routing = defineRouting({
  locales,
  defaultLocale
});

export {
  locales,
  defaultLocale,
  routing
};
