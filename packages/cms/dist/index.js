import {
  urlFor
} from "./chunk-OKTM34FL.js";
import {
  SanityLive,
  client,
  sanityFetch
} from "./chunk-3EI65NOB.js";
import {
  client as client2
} from "./chunk-DE7UER5E.js";
import {
  apiVersion,
  dataset,
  projectId
} from "./chunk-KMCAPWCS.js";
import {
  structure
} from "./chunk-NI6RDMOF.js";

// src/schemas/blogType.ts
import { defineField, defineType } from "sanity";
var blogType = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "locale",
      type: "string",
      readOnly: true
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }]
    })
  ]
});

// src/schemas/index.ts
var schema = [blogType];
export {
  SanityLive,
  apiVersion,
  client,
  dataset,
  projectId,
  client2 as publicClient,
  sanityFetch,
  schema,
  structure,
  urlFor
};
