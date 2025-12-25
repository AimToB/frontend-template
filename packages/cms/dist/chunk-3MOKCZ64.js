import {
  apiVersion,
  dataset,
  projectId
} from "./chunk-JDD6AR7K.js";

// ../../src/core/cms/publicClient.ts
import { createClient } from "next-sanity";
var client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true
  // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export {
  client
};
