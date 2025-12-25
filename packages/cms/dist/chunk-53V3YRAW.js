import {
  apiVersion,
  dataset,
  projectId
} from "./chunk-JDD6AR7K.js";

// ../../src/core/cms/client.ts
import { createClient } from "next-sanity";
var client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false
});

// ../../src/core/cms/live.ts
import { defineLive } from "next-sanity/live";
var { sanityFetch, SanityLive } = defineLive({
  client
});

export {
  client,
  sanityFetch,
  SanityLive
};
