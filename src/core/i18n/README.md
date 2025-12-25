# i18n Module

Core internationalization module for this Next.js project using `next-intl`.

## 📁 File Structure

```
src/core/i18n/
├── README.md           # This file
├── index.ts            # Public API exports
├── routing.ts          # Locale configuration
├── navigation.ts       # Localized navigation wrappers
├── request.ts          # Server-side request config
└── messages/           # Translation files
    ├── en.json
    └── de.json
```

## 🏗️ Architecture

### Core Components

#### 1. `routing.ts`

Defines supported locales and default locale using `defineRouting`.

```typescript
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
});
```

**When to modify:**

- Adding/removing supported languages
- Changing default locale

---

#### 2. `navigation.ts`

Exports locale-aware navigation utilities that wrap Next.js navigation APIs.

```typescript
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

**What it provides:**

- `Link` - Drop-in replacement for `next/link` with locale awareness
- `redirect` - Server/client redirect with locale prefix
- `usePathname` - Get pathname without locale prefix
- `useRouter` - Router with locale methods
- `getPathname` - Get pathname for specific locale

**Usage in components:**

```typescript
import { Link, useRouter } from '@i18n';

// Automatically prefixes with current locale
<Link href="/about">About</Link>
```

---

#### 3. `request.ts`

Server-side configuration that:

- Validates incoming locale from URL
- Falls back to default locale if invalid
- Loads appropriate message file

```typescript
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

**⚠️ Critical:**

- Path to this file is configured in `next.config.ts`
- If you move this file, update `createNextIntlPlugin("./src/core/i18n/request.ts")`
- Messages are dynamically imported - ensure message files exist

---

#### 4. `messages/`

JSON translation files, one per locale. Keys must match between files.

**Structure:**

```json
{
  "ComponentName": {
    "key": "Translated value"
  }
}
```

**Usage:**

```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('ComponentName');
return <h1>{t('key')}</h1>;
```

---

## 🔌 Integration Points

### 1. Next.js Config (`next.config.ts`)

```typescript
const withNextIntl = createNextIntlPlugin("./src/core/i18n/request.ts");
export default withNextIntl(nextConfig);
```

**Purpose:**

- Configures next-intl plugin
- Points to request config location
- Automatically sets up middleware

---

### 2. Middleware (`src/proxy.ts`)

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./core/i18n/routing";

export default createMiddleware(routing);
```

**Purpose:**

- Intercepts requests
- Adds locale prefix to URLs
- Redirects to default locale if needed

**Matcher config:**

```typescript
export const config = {
  matcher: "/((?!api|trpc|studio|_next|_vercel|.*\\..*).*)",
};
```

**When to modify matcher:**

- Excluding new API routes
- Adding public assets
- Custom route handling

---

### 3. Root Layout (`src/app/[locale]/layout.tsx`)

```typescript
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@i18n/routing";

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Purpose:**

- Validates locale parameter
- Provides translations to client components
- Sets HTML lang attribute

---

## 🚀 Usage Examples

### Basic Translation

```typescript
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('Home');
  return <h1>{t('title')}</h1>;
}
```

### Navigation with Locale

```typescript
import { Link } from '@i18n';

// Stays in current locale
<Link href="/about">About</Link>

// Switch to specific locale
<Link href="/about" locale="de">Über uns</Link>
```

### Server-side Translation

```typescript
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('Home');
  return <h1>{t('title')}</h1>;
}
```

### Get Current Locale

```typescript
import { useLocale } from 'next-intl';

export default function Component() {
  const locale = useLocale(); // "en" | "de"
  return <span>Current: {locale}</span>;
}
```

---

## 🔧 Configuration

### Adding a New Language

1. **Add locale to routing**

```typescript
// src/core/i18n/routing.ts
export const routing = defineRouting({
  locales: ["en", "de", "fr"], // Add "fr"
  defaultLocale: "en",
});
```

2. **Create message file**

```bash
touch src/core/i18n/messages/fr.json
```

3. **Copy structure from existing locale**

```bash
cp src/core/i18n/messages/en.json src/core/i18n/messages/fr.json
```

4. **Update language switcher components**

```typescript
const locales = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" }, // Add this
];
```

---

## 🐛 Troubleshooting

### "Couldn't find next-intl config file"

**Cause:** Path to `request.ts` is incorrect in `next.config.ts`

**Fix:**

```typescript
// next.config.ts
const withNextIntl = createNextIntlPlugin("./src/core/i18n/request.ts");
```

---

### 404 on all pages

**Cause:** Middleware matcher is too restrictive

**Fix:** Check `src/proxy.ts` matcher:

```typescript
export const config = {
  matcher: "/((?!api|trpc|studio|_next|_vercel|.*\\..*).*)",
};
```

---

### Missing translations

**Cause:** Key doesn't exist in message file

**Fix:**

1. Check message file has the key
2. Ensure namespace matches: `useTranslations('Namespace')`
3. Key path: `t('key')` or `t('nested.key')`

---

### Locale not switching

**Cause:** Using `next/link` instead of localized `Link`

**Fix:**

```typescript
// ❌ Wrong
import Link from "next/link";

// ✅ Correct
import { Link } from "@i18n";
```

---

### Translation not updating

**Cause:** Message file changes not picked up in development

**Fix:**

1. Restart dev server
2. Clear `.next` folder: `rm -rf .next`
3. Restart: `npm run dev`

---

## 📝 Module Exports

**Public API (`src/core/i18n/index.ts`):**

```typescript
export { routing } from "./routing";
export {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} from "./navigation";
```

**Import in your code:**

```typescript
import { Link, routing } from "@i18n";
```

---

## 🎯 Best Practices

1. **Always use module exports**

- Import from `@i18n`, not directly from `next-intl`
- Ensures consistent locale handling

2. **Keep message keys organized**
   - Use namespaces: `Home`, `Navigation`, `Footer`
   - Nest related keys: `errors.notFound`, `errors.serverError`

3. **Validate before deployment**
   - All locales have same keys
   - No missing translations
   - Default locale is complete

4. **Server vs Client**
   - Use `getTranslations()` in Server Components
   - Use `useTranslations()` in Client Components

---

## 🔗 Related Files

Outside this module, but tightly coupled:

- `src/app/[locale]/layout.tsx` - Root locale layout
- `src/app/[locale]/(default)/layout.tsx` - Default pages layout
- `src/app/[locale]/blog/[slug]/layout.tsx` - Blog-specific layout with translation-aware switcher
- `src/components/common/LanguageSwitcher.tsx` - Standard language switcher
- `src/components/common/BlogLanguageSwitcher.tsx` - Blog post language switcher
- `src/proxy.ts` - Middleware configuration

---

## 📚 Resources

- [next-intl Documentation](https://next-intl.dev/)
- [App Router Setup](https://next-intl.dev/docs/getting-started/app-router)
- [Routing Configuration](https://next-intl.dev/docs/routing)
- [Server Components](https://next-intl.dev/docs/environments/server-client-components)
