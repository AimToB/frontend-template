import * as sanity from 'sanity';
import { SanityImageSource } from '@sanity/image-url';

declare const urlFor: (source: SanityImageSource) => sanity.ImageUrlBuilder;

export { urlFor };
