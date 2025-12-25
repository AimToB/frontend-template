import {
  routing
} from "./chunk-ZDYVLAXH.js";
import {
  __glob
} from "./chunk-YZFATT7X.js";

// ../../src/core/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

// import("./messages/**/*.json") in ../../src/core/i18n/request.ts
var globImport_messages_json = __glob({
  "./messages/de.json": () => import("./de-R5GM33GV.js"),
  "./messages/en.json": () => import("./en-5M32TDE2.js")
});

// ../../src/core/i18n/request.ts
var request_default = getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return {
    locale,
    // Dynamically import the message file for this locale
    // Messages are cached in production builds
    messages: (await globImport_messages_json(`./messages/${locale}.json`)).default
  };
});

export {
  request_default
};
