# Merge packages-poc → main: Workspaces & Package Architecture

## Summary

This PR establishes Yarn workspaces and package-based architecture as the new golden standard for the template. Modules (`@cms`, `@i18n`) are now built independently with tsup, enabling cleaner imports, tree-shaking, and a scalable "feature → package" workflow for client projects.

## Changes

### Architecture

- **Workspaces**: Added `packages/*` configuration; root is private.
- **Packages**:
  - `@frontend-template/cms` — Sanity CMS client, live queries, image utils, schemas.
  - `@frontend-template/i18n` — next-intl routing, navigation, request config.
- **Build**: Each package exports via subpaths; tsup generates ESM + d.ts.
- **TS Aliases**: Short names (`@cms`, `@i18n`) for cleaner imports.

### App Updates

- Replaced all `@/core/cms` and `@/core/i18n` imports with package aliases.
- Updated docs (CMS_QUICK_REFERENCE, I18N_QUICK_REFERENCE, architecture guides).
- Aligned with Yarn workflow (removed package-lock.json).

### Build Files

- Added `tsconfig.packages.json` for package builds (avoids root noEmit conflicts).
- Added `packages/cms` and `packages/i18n` with minimal `package.json` + `src/*` + build scripts.

## Verification

- ✅ `yarn install` — Dependencies resolved.
- ✅ `yarn build:packages` — cms and i18n built to dist/ with declarations.
- ✅ `yarn build` — Next.js app compiles successfully.
- ✅ All imports use short aliases (`@cms`, `@i18n`, subpaths).

## Next Steps After Merge

1. **Delete branch**: `git branch -d packages-poc` locally and on origin.
2. **Tag release**: `git tag -a v0.2.0 -m "Introduce workspaces & package architecture"`.
3. **Future features**: Create feature branches from main, build directly, move to packages as needed.
4. **Patching packages**: Edit under `packages/*/src`, rebuild, PR to main.

## Notes

- Packages are private; no external publishing yet.
- Changesets optional; adopt when formalizing multi-package releases.
- Keep imports pointing to package aliases; delete stale `src/core/*` as code migrates.
