import {
  apiVersion,
  dataset,
  projectId
} from "./chunk-KMCAPWCS.js";

// src/live.ts
import { defineLive } from "next-sanity/live";

// src/client.ts
import { createClient } from "next-sanity";
var client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false
});

// src/live.ts
var { sanityFetch, SanityLive } = defineLive({
  client
});

export {
  client,
  sanityFetch,
  SanityLive
};
