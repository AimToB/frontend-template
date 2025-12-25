# CMS Module (Sanity)

Core Sanity integration, packaged for reuse.

## Files

- `env.ts` – reads `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
- `client.ts` – primary client (useCdn: false)
- `publicClient.ts` – CDN client (useCdn: true)
- `live.ts` – `sanityFetch`, `SanityLive` helpers
- `image.ts` – `urlFor` image URL builder
- `schemas/` – Sanity schema types (e.g., `blogType`)
- `structure.ts` – Studio structure builder
- `index.ts` – public exports

## Import from consumers

```ts
import { client, urlFor, sanityFetch, SanityLive } from "@cms";
```

## Studio config

`sanity.config.ts` imports everything from `@cms`.

## Add a schema

1. Create `schemas/myType.ts`
2. Export via `schemas/index.ts` in `schema` array

## Change dataset/project

- Update environment variables
- No code change needed unless you rename env vars

## Live content

- Render `<SanityLive />` in a layout when using `sanityFetch`

## Image helper

```ts
const src = urlFor(imageField).width(800).height(600).url();
```

## More docs

- Architecture: `docs/CMS_ARCHITECTURE.md`
- Quick reference: `docs/CMS_QUICK_REFERENCE.md`
