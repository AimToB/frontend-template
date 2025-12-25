import {
  routing
} from "./chunk-W4SZH4V5.js";
import {
  __glob
} from "./chunk-YZFATT7X.js";

// src/request.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

// import("./messages/**/*.json") in src/request.ts
var globImport_messages_json = __glob({
  "./messages/de.json": () => import("./de-DI2WCHB6.js"),
  "./messages/en.json": () => import("./en-QEUD3EOX.js")
});

// src/request.ts
var request_default = getRequestConfig(async ({ locale }) => {
  const selected = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  return {
    locale: selected,
    messages: (await globImport_messages_json(`./messages/${selected}.json`)).default
  };
});

export {
  request_default
};
