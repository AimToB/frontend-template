"use client";

import { Link } from "@i18n/navigation";
import { Globe } from "lucide-react";
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

type Translation = {
  locale: string;
  slug: { current: string } | string;
};

type BlogLanguageSwitcherProps = {
  currentLocale: string;
  translations: Translation[];
};

export default function BlogLanguageSwitcher({
  currentLocale,
  translations,
}: BlogLanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => {
          const isActive = locale.code === currentLocale;
          const translation = translations?.find(
            (t) => t.locale === locale.code
          );
          const translationSlug =
            typeof translation?.slug === "string"
              ? translation.slug
              : translation?.slug?.current;

          return (
            <DropdownMenuItem
              key={locale.code}
              asChild={!!translationSlug && !isActive}
              disabled={!translationSlug && !isActive}
            >
              {isActive ? (
                <span className="font-bold cursor-default">{locale.label}</span>
              ) : translationSlug ? (
                <Link
                  href={`/blog/${translationSlug}`}
                  locale={locale.code}
                  className="font-normal"
                >
                  {locale.label}
                </Link>
              ) : (
                <span className="opacity-50 cursor-not-allowed">
                  {locale.label}
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
