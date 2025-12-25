import {
  dataset,
  projectId
} from "./chunk-KMCAPWCS.js";

// src/image.ts
import createImageUrlBuilder from "@sanity/image-url";
var builder = createImageUrlBuilder({ projectId, dataset });
var urlFor = (source) => {
  return builder.image(source);
};

export {
  urlFor
};
