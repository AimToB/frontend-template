# CMS Architecture (Sanity)

High-level design for the Sanity integration.

## System Overview

```
┌─────────────────────────────────────────────┐
│ Incoming request                            │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ Page/Server Component                        │
│  • Uses `client` or `sanityFetch`            │
│  • GROQ query constructed per feature        │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ CMS Module (`src/core/cms`)                  │
│  • env.ts (projectId, dataset, apiVersion)   │
│  • client.ts (non-CDN)                       │
│  • publicClient.ts (CDN)                     │
│  • live.ts (sanityFetch, SanityLive)         │
│  • image.ts (urlFor)                         │
│  • schemas/*                                 │
│  • structure.ts                              │
│  • index.ts (public exports)                 │
└─────────────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│ Sanity APIs                                  │
│  • Content lake                              │
│  • CDN (if useCdn: true)                     │
└─────────────────────────────────────────────┘
```

## Data Flow

1. **Build / Studio**
   - `sanity.config.ts` imports `schema` and `structure` from the module.
   - CLI uses `sanity.cli.ts` env vars for project/dataset.

2. **Runtime Fetch**
   - Components call `client.fetch` (non-CDN) for draft-aware or ISR usage.
   - Optional `publicClient` for CDN-cached reads.
   - `sanityFetch` (live.ts) enables live content with `<SanityLive />` in layout.

3. **Images**
   - `urlFor(source).width(...).height(...).url()` builds image URLs with project/dataset from env.

## Responsibilities

- **env.ts**: Validate env vars; throw if missing.
- **client.ts**: Canonical server/client fetch client (useCdn: false).
- **publicClient.ts**: CDN client (useCdn: true) — optional for public pages.
- **live.ts**: Live content helpers (sanityFetch/SanityLive).
- **image.ts**: Image URL builder.
- **schemas/**: All document/object schemas; exported via schemas/index.ts.
- **structure.ts**: Custom Studio structure (desk tool).
- **index.ts**: Public API barrel.

## Configuration Points

- Env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`.
- Client CDN toggle: `useCdn` in client.ts / publicClient.ts.
- Studio plugins and basePath: `sanity.config.ts`.
- Structure / schema registration: `schemas/index.ts`, `structure.ts`.

## Routing / Studio

- Studio mounted at `/studio` via `sanity.config.ts` + `app/studio/[[...tool]]/page.tsx`.
- Middleware excludes `/studio` in `src/proxy.ts` matcher.

## Error Surfaces

- Missing env var → thrown in `env.ts` at startup.
- Invalid schema export → Studio build error.
- Missing translation in schema (i18n) → query returns null; handle in fetchers.

## When Forking

- Update env vars for the new project/dataset.
- Decide on CDN strategy (publicClient vs client).
- Add/remove schemas in `schemas/` and export in `schemas/index.ts`.
- Adjust `structure.ts` if you need a custom desk.
- Keep imports from `@cms` only (no deep paths).
