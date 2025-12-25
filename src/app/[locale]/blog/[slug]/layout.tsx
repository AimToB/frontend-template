import type { ReactNode } from "react";
import BlogNavbar from "@/components/layout/BlogNavbar";
import Footer from "@/components/layout/Footer";
import BlogLanguageSwitcher from "@/components/common/BlogLanguageSwitcher";

type BlogLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string; slug: string }>;
};

// This function fetches the blog post data to get translations for the navbar
async function getBlogTranslations(locale: string, slug: string) {
  const { client } = await import("@cms");

  const query = `
    *[_type == "blogPost" && slug.current == $slug && locale == $locale][0]{
      "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
        locale,
        slug
      }
    }
  `;

  const result = await client.fetch(query, { slug, locale });
  return result?._translations || [];
}

export default async function BlogLayout({
  children,
  params,
}: BlogLayoutProps) {
  const { locale, slug } = await params;
  const translations = await getBlogTranslations(locale, slug);

  return (
    <>
      <BlogNavbar
        languageSwitcher={
          <BlogLanguageSwitcher
            currentLocale={locale}
            translations={translations}
          />
        }
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
