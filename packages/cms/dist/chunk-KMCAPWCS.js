// src/env.ts
var apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-25";
var dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);
var projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);
function assertValue(v, errorMessage) {
  if (v === void 0) {
    throw new Error(errorMessage);
  }
  return v;
}

export {
  apiVersion,
  dataset,
  projectId
};
