import {
  __glob
} from "./chunk-YZFATT7X.js";

// import("./messages/**/*.json") in src/request.ts
var globImport_messages_json = __glob({
  "./messages/de.json": () => import("./de-DI2WCHB6.js"),
  "./messages/en.json": () => import("./en-QEUD3EOX.js")
});

// src/request.ts
async function getRequestConfig({
  locale
}) {
  return {
    locale,
    messages: (await globImport_messages_json(`./messages/${locale}.json`)).default,
    timeZone: "UTC",
    now: /* @__PURE__ */ new Date()
  };
}

export {
  getRequestConfig
};
