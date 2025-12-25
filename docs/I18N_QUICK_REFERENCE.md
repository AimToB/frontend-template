# Quick Reference: i18n Module

## 🚀 Common Tasks

### Add a New Language

```bash
# 1. Update routing config
# src/core/i18n/routing.ts
locales: ["en", "de", "fr"]

# 2. Create message file
cp src/core/i18n/messages/en.json src/core/i18n/messages/fr.json

# 3. Translate messages in fr.json

# 4. Update language switchers
# src/components/common/LanguageSwitcher.tsx
const locales = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
];
```

### Add a Translation Key

```bash
# 1. Add to all message files
# messages/en.json
{
  "NewSection": {
    "newKey": "New value"
  }
}

# 2. Use in component
const t = useTranslations('NewSection');
<p>{t('newKey')}</p>
```

### Exclude Route from Locale Prefix

```typescript
// src/proxy.ts
export const config = {
  matcher: "/((?!api|trpc|studio|webhooks|_next|_vercel|.*\\..*).*)",
  //                            ^^^^^^^^ Add here
};
```

---

## 📝 Import Patterns

### ✅ Correct

```typescript
// Navigation
import { Link, useRouter, redirect } from "@i18n";

// Translations (client)
import { useTranslations, useLocale } from "next-intl";

// Translations (server)
import { getTranslations } from "next-intl/server";

// Config
import { routing } from "@i18n";
```

### ❌ Wrong

```typescript
// Don't import Link from next/link
import Link from "next/link";

// Don't import navigation from next-intl directly
import { createNavigation } from "next-intl/navigation";

// Don't import routing from deep path
import { routing } from "@i18n/routing"; // Use index instead
```

---

## 🔍 Quick Debugging

### Issue: Translations not showing

```typescript
// Check 1: Correct namespace?
const t = useTranslations("Home"); // Must match message file structure

// Check 2: Key exists?
console.log(t("title")); // Should not be undefined

// Check 3: Wrapped in provider?
// [locale]/layout.tsx must have <NextIntlClientProvider>
```

### Issue: Locale not switching

```typescript
// Check 1: Using correct Link?
import { Link } from "@i18n"; // ✅
import Link from "next/link"; // ❌

// Check 2: Middleware configured?
// src/proxy.ts must exist and export default

// Check 3: Config points to request.ts?
// next.config.ts: createNextIntlPlugin("./src/core/i18n/request.ts")
```

### Issue: 404 on valid routes

```typescript
// Check middleware matcher in src/proxy.ts
export const config = {
  matcher: "/((?!api|trpc|studio|_next|_vercel|.*\\..*).*)",
};
// Make sure your route isn't excluded!
```

---

## 🎯 API Cheatsheet

### Client Components

```typescript
'use client';
import { useTranslations, useLocale } from 'next-intl';

function Component() {
  const t = useTranslations('Namespace');
  const locale = useLocale();

  return <div>
    <p>{t('key')}</p>
    <p>{t('nested.key')}</p>
    <p>Locale: {locale}</p>
  </div>;
}
```

### Server Components

```typescript
import { getTranslations, getLocale } from 'next-intl/server';

async function Page() {
  const t = await getTranslations('Namespace');
  const locale = await getLocale();

  return <div>
    <p>{t('key')}</p>
    <p>Locale: {locale}</p>
  </div>;
}
```

### Navigation

```typescript
import { Link, redirect, useRouter, usePathname } from '@i18n';

// Link - stays in current locale
<Link href="/about">About</Link>

// Link - switch locale
<Link href="/about" locale="de">Über uns</Link>

// Redirect (server)
redirect('/login');

// Router (client)
const router = useRouter();
router.push('/dashboard');
router.push('/about', { locale: 'de' });

// Get pathname without locale
const pathname = usePathname(); // "/about" not "/en/about"
```

---

## 📂 File Locations

| What                | Where                                            |
| ------------------- | ------------------------------------------------ |
| Locale config       | `src/core/i18n/routing.ts`                       |
| Request config      | `src/core/i18n/request.ts`                       |
| Navigation wrappers | `src/core/i18n/navigation.ts`                    |
| Module exports      | `src/core/i18n/index.ts`                         |
| English messages    | `src/core/i18n/messages/en.json`                 |
| German messages     | `src/core/i18n/messages/de.json`                 |
| Middleware          | `src/proxy.ts`                                   |
| Next.js config      | `next.config.ts`                                 |
| Root layout         | `src/app/[locale]/layout.tsx`                    |
| Language switcher   | `src/components/common/LanguageSwitcher.tsx`     |
| Blog switcher       | `src/components/common/BlogLanguageSwitcher.tsx` |

---

## 🛠️ Maintenance

### When You Move Core Module

```typescript
// Update next.config.ts
const withNextIntl = createNextIntlPlugin("./src/NEW_PATH/request.ts");
```

### When Adding Locale-Specific Content

```typescript
// Blog posts with translations
// Query for translations in layout
const translations = await getBlogTranslations(locale, slug);

// Pass to specialized switcher
<BlogLanguageSwitcher currentLocale={locale} translations={translations} />
```

### When Changing Message Structure

```bash
# 1. Update all locale files (en.json, de.json, etc.)
# 2. Update components using old keys
# 3. Test in all locales
# 4. Search codebase for old key: `git grep "oldKey"`
```

---

## 🆘 Emergency Fixes

### Everything broken after update

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules yarn.lock
yarn install

# Restart dev server
yarn dev
```

### Locale not detected

```typescript
// Quick fix: Add debug logging
// src/core/i18n/request.ts
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  console.log('🌐 Requested:', requested);

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  console.log('🌐 Resolved:', locale);

  return { locale, messages: ... };
});
```

### Translations missing in production

```bash
# Verify message files included in build
ls .next/server/chunks/

# Check build logs for import errors
npm run build 2>&1 | grep messages
```

---

## 📚 Documentation Links

- **Detailed docs**: `src/core/i18n/README.md`
- **Architecture**: `docs/I18N_ARCHITECTURE.md`
- **next-intl**: https://next-intl.dev/
- **Troubleshooting**: See architecture doc
