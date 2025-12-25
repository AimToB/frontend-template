import {
  dataset,
  projectId
} from "./chunk-JDD6AR7K.js";

// ../../src/core/cms/image.ts
import createImageUrlBuilder from "@sanity/image-url";
var builder = createImageUrlBuilder({ projectId, dataset });
var urlFor = (source) => {
  return builder.image(source);
};

export {
  urlFor
};
