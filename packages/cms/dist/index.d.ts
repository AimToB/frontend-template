export { apiVersion, dataset, projectId } from './env.js';
import * as next_sanity from 'next-sanity';
export { client as publicClient } from './publicClient.js';
export { SanityLive, sanityFetch } from './live.js';
export { urlFor } from './image.js';
import * as sanity from 'sanity';
export { structure } from './structure.js';
import 'react';
import 'next-sanity/live';
import '@sanity/image-url';
import 'sanity/structure';

declare const client: next_sanity.SanityClient;

declare const schema: ({
    type: "document";
    name: "blogPost";
} & Omit<sanity.DocumentDefinition, "preview"> & {
    preview?: sanity.PreviewConfig<Record<string, string>, Record<never, any>> | undefined;
})[];

export { client, schema };
