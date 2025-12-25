# 🌐 Internationalization Architecture

This document explains the high-level architecture of the i18n system.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Incoming Request                          │
│                   example.com/de/blog/post                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Middleware (proxy.ts)                        │
│  • Extracts locale from URL path                            │
│  • Validates against routing.locales                         │
│  • Redirects invalid locales to default                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            [locale] Layout (app/[locale]/layout.tsx)         │
│  • Receives locale as param                                  │
│  • Validates with hasLocale()                                │
│  • Wraps children with NextIntlClientProvider                │
│  • Sets HTML lang attribute                                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         Request Config (core/i18n/request.ts)                │
│  • Triggered by next-intl plugin                             │
│  • Receives requestLocale from URL                           │
│  • Loads messages from ./messages/{locale}.json              │
│  • Returns { locale, messages }                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Page/Component                            │
│  • useTranslations('Namespace')                              │
│  • t('key') returns translated string                        │
│  • <Link> uses locale-aware navigation                       │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Configuration Phase (Build Time)

```
next.config.ts
    │
        ├─> createNextIntlPlugin("./packages/i18n/src/request.ts")
    │       │
    │       └─> Registers request handler
    │
    └─> Configures middleware integration
```

### 2. Request Phase (Runtime)

```
1. Browser Request: /de/about
        ↓
2. Middleware (proxy.ts)
   - Reads URL: locale = "de"
   - Checks routing.locales.includes("de") ✓
   - Passes through
        ↓
3. Next.js matches route: app/[locale]/about/page.tsx
   - params.locale = "de"
        ↓
4. [locale]/layout.tsx
   - Validates locale
   - Wraps with NextIntlClientProvider
        ↓
5. request.ts triggered
   - Loads messages/de.json
   - Returns { locale: "de", messages: {...} }
        ↓
6. Page renders with German translations
```

### 3. Client Navigation

```
User clicks: <Link href="/about">
        ↓
navigation.ts (Link wrapper)
   - Current locale: "de"
   - Generates: /de/about
   - Navigates without page reload
        ↓
Same flow as Request Phase (steps 2-6)
```

## Component Types

### Server Components

```typescript
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('Home');
  return <h1>{t('title')}</h1>;
}
```

**Flow:**

1. Next.js renders on server
2. `request.ts` provides messages
3. Translation happens server-side
4. HTML sent to client

### Client Components

```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('Home');
  return <h1>{t('title')}</h1>;
}
```

**Flow:**

1. `NextIntlClientProvider` passes messages down
2. Hook accesses messages from context
3. Translation happens client-side
4. React hydrates with correct text

## Special Cases

### Blog Post Translation Switcher

The blog has a unique requirement: switching languages should navigate to the translated version of the same post (different slug), not just change the locale prefix.

```
┌─────────────────────────────────────────────────────────────┐
│       app/[locale]/blog/[slug]/layout.tsx                    │
│                                                              │
│  1. Queries Sanity for post translations                    │
│  2. Extracts slug for each locale                           │
│  3. Passes to BlogLanguageSwitcher                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│          BlogLanguageSwitcher Component                      │
│                                                              │
│  • Shows EN | DE                                            │
│  • Current locale: bold                                      │
│  • Other locales:                                           │
│    - If translation exists: link to /blog/{translated-slug} │
│    - If no translation: disabled                            │
└─────────────────────────────────────────────────────────────┘
```

**Why separate from standard LanguageSwitcher?**

- Standard switcher: changes locale, keeps path structure
- Blog switcher: changes locale AND slug to match translated content

## Routing Strategy

### URL Structure

```
/                    → Redirects to /en or /de based on preference
/en                  → English home
/de                  → German home
/en/about            → English about page
/de/ueber-uns        → German about page (if using localized paths)
/en/blog/hello       → English blog post
/de/blog/hallo       → German blog post (translated slug)
```

### Path Types

1. **Non-localized paths** (default)

   ```
   /en/about
   /de/about  ← Same pathname, different locale
   ```

2. **Localized slugs** (blog posts)
   ```
   /en/blog/hello-world
   /de/blog/hallo-welt  ← Different pathname, related content
   ```

## Module Boundaries

### Core Module (`src/core/i18n/`)

**Responsibilities:**

- Locale configuration
- Navigation wrappers
- Message loading
- Type-safe exports

**Dependencies:**

- `next-intl` package
- Message JSON files

**Consumed by:**

- All pages and layouts
- Navigation components
- Language switchers

### Consumer Code

**What it uses:**

- `Link` from `@i18n` instead of `next/link`
- `useTranslations()` or `getTranslations()` for text
- `routing.locales` for locale lists

**What it provides:**

- UI components (switchers, nav)
- Page-specific translations
- Business logic

## Configuration Points

### 1. Adding a Locale

```typescript
// src/core/i18n/routing.ts
locales: ["en", "de", "fr"]; // Add here
```

**Cascading changes:**

- Create `messages/fr.json`
- Update language switcher components
- Update locale type definitions (if using TypeScript strict mode)

### 2. Changing Default Locale

```typescript
// src/core/i18n/routing.ts
defaultLocale: "de"; // Change here
```

**Impact:**

- Users without locale preference get German
- Root `/` redirects to `/de`

### 3. Excluding Routes from Locale Prefix

```typescript
// src/proxy.ts
matcher: "/((?!api|trpc|studio|_next|_vercel|.*\\..*).*)";
//       ^^^^^^ Add exclusions here
```

**Common additions:**

- API routes: `|api-v2`
- Public assets: `|assets`
- Health checks: `|health`

## Performance Considerations

### Message Loading

- **Dynamic import**: `import(\`./messages/${locale}.json\`)`
- **Tree-shaking**: Only used translations bundled
- **Caching**: Messages cached per locale in production

### Navigation

- **Client-side**: No page reload, instant switches
- **Prefetching**: Next.js prefetches locale variants
- **No flash**: Locale determined before render

### Build Optimization

- Static pages generated per locale
- Shared chunks for common code
- Locale-specific chunks only when needed

## Testing Strategy

### Unit Tests

```typescript
// Test translation keys exist
expect(messages.en.Home.title).toBeDefined();
expect(messages.de.Home.title).toBeDefined();

// Test routing config
expect(routing.locales).toContain("en");
expect(routing.defaultLocale).toBe("en");
```

### Integration Tests

```typescript
// Test middleware redirects
await request("/").expect(302).expect("Location", "/en");

// Test locale validation
await request("/invalid-locale/about").expect(404);
```

### E2E Tests

```typescript
// Test language switching
await page.goto("/en/about");
await page.click('[data-locale="de"]');
expect(page.url()).toBe("/de/about");
expect(await page.textContent("h1")).toBe("Über uns");
```

## Migration Guide (When Forking)

### Checklist

- [ ] Review `routing.ts` - update locales if needed
- [ ] Check all `messages/*.json` files are present
- [ ] Update `next.config.ts` if you moved `request.ts`
- [ ] Verify middleware matcher excludes your API routes
- [ ] Test locale switching works
- [ ] Confirm 404s redirect correctly
- [ ] Check HTML lang attribute matches locale

### Common Customizations

1. **Different locale codes**: Change `en`/`de` to `en-US`/`de-DE`
2. **Region-specific**: Add `en-GB`, `en-US` as separate locales
3. **RTL languages**: Add `dir` attribute handling in layout
4. **Currency/date formatting**: Use `next-intl` format functions

## Debugging

### Enable verbose logging

```typescript
// src/core/i18n/request.ts
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  console.log('[i18n] Requested locale:', requested);

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  console.log('[i18n] Resolved locale:', locale);

  return { locale, messages: ... };
});
```

### Common issues

1. **Locale mismatch**: Check URL, middleware, and request.ts logs
2. **Missing translations**: Verify message file exists and is valid JSON
3. **404 on valid routes**: Check middleware matcher isn't too broad
4. **Wrong language shown**: Verify `NextIntlClientProvider` wraps content

## Further Reading

- Core module README: `src/core/i18n/README.md`
- next-intl docs: https://next-intl.dev/
- Routing patterns: https://next-intl.dev/docs/routing
