import {
  apiVersion,
  dataset,
  projectId
} from "./chunk-KMCAPWCS.js";

// src/publicClient.ts
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
