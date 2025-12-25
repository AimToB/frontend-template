export { apiVersion, dataset, projectId } from './env.js';
import * as next_sanity from 'next-sanity';
export { client as publicClient } from './publicClient.js';
export { SanityLive, sanityFetch } from './live.js';
export { urlFor } from './image.js';
export { schema } from './schemas.js';
export { structure } from './structure.js';
import 'react';
import 'next-sanity/live';
import 'sanity';
import '@sanity/image-url';
import 'sanity/structure';

declare const client: next_sanity.SanityClient;

export { client };
