"use client";

import { Link, usePathname } from "@i18n/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const locales = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

export default function LanguageSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  // Normalize to a locale-agnostic pathname to avoid duplicating segments
  const basePath = pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale.code} asChild>
            <Link
              href={basePath}
              locale={locale.code}
              className={
                activeLocale === locale.code ? "font-bold" : "font-normal"
              }
            >
              {locale.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
