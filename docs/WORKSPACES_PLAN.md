# Workspaces Proof of Concept

Branch: `packages-poc`
Goal: keep current app working while trialing Yarn workspaces and package-style modules for CMS and i18n.

## What changed

- Added Yarn workspaces in the root `package.json` (`packages/*`).
- Added `tsup` to build package artifacts.
- Added package aliases in `tsconfig.json`:
  - `@frontend-template/cms`, `@frontend-template/cms/*`
  - `@frontend-template/i18n`, `@frontend-template/i18n/*`
- Scaffolded two packages that re-export the existing core code:
  - `packages/cms`
  - `packages/i18n`
- Each package has a `build` script using `tsup` and an `exports` map with subpaths.

## How to build

```bash
yarn install
yarn build:packages
```

- Builds go to `packages/*/dist`. The app still runs from `src/` and can import the package aliases.

## How to import

- Prefer the short aliases:
  - `import { client } from "@cms";`
  - `import { sanityFetch } from "@cms/live";`
  - `import { routing } from "@i18n/routing";`
- Longer names still work if you prefer: `@frontend-template/cms`, `@frontend-template/i18n`.

## Next steps (if we like this)

- Move source files from `src/core/cms` → `packages/cms/src` and update imports to package aliases.
- Same for `src/core/i18n`.
- Add Changesets for versioning when you want per-package releases.
- Optionally publish packages to a private registry; otherwise keep as workspaces and use forks per client.

## Rollback

- Remove `workspaces` and `tsup` from `package.json`.
- Delete `packages/` directory.
- Remove the package paths from `tsconfig.json`.
