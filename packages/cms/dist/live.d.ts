import * as react from 'react';
import * as next_sanity_live from 'next-sanity/live';

declare const sanityFetch: next_sanity_live.DefinedSanityFetchType;
declare const SanityLive: react.ComponentType<next_sanity_live.DefinedSanityLiveProps>;

export { SanityLive, sanityFetch };
