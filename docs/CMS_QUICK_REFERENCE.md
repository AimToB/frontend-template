# CMS Quick Reference (Sanity)

## Common Tasks

### Fetch content (draft-aware)

```ts
import { client } from "@cms";

const data = await client.fetch(`*[_type == "blogPost" ]{title}`);
```

### Use CDN client for public reads

```ts
import { publicClient } from "@cms";

const data = await publicClient.fetch(`*[_type == "blogPost" ]{title}`);
```

### Live content

```ts
import { sanityFetch, SanityLive } from "@cms";

const { data } = await sanityFetch({ query, params });
// Render <SanityLive /> in a parent layout once per page tree.
```

### Images

```ts
import { urlFor } from "@cms";

const src = urlFor(imageField).width(800).height(600).url();
```

### Add a schema

1. Create `src/core/cms/schemas/myType.ts`
2. Export in `src/core/cms/schemas/index.ts`
3. Rebuild Studio (`npm run dev`)

### Update env

Set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

## Import Patterns

**Do this**

```ts
import { client, publicClient, urlFor, sanityFetch } from "@cms";
```

**Not this**

```ts
// Avoid deep imports
import { client } from "@cms/client";
```

## Debugging Checklist

- Env vars present? (`projectId`, `dataset`, `apiVersion`)
- Using correct client (CDN vs non-CDN)?
- Schema exported from `schemas/index.ts`?
- Studio build errors? Check terminal for schema issues.
- GROQ query valid? Test in Vision (Studio).

## File Map

- `src/core/cms/env.ts` — env values (throws if missing)
- `src/core/cms/client.ts` — primary client (useCdn: false)
- `src/core/cms/publicClient.ts` — CDN client
- `src/core/cms/live.ts` — `sanityFetch`, `SanityLive`
- `src/core/cms/image.ts` — `urlFor`
- `src/core/cms/schemas/` — all schemas
- `src/core/cms/structure.ts` — desk structure
- `src/core/cms/index.ts` — barrel exports
- `sanity.config.ts` — Studio config (imports from cms module)
- `sanity.cli.ts` — CLI config (project/dataset)

## Emergency Fixes

- Clear `.next` and restart: `rm -rf .next && npm run dev`
- Check env: `echo $NEXT_PUBLIC_SANITY_PROJECT_ID`
- Validate query in Vision: open `/studio` → Vision tool.
