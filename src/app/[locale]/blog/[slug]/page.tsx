import { type SanityDocument } from "next-sanity";
import PortableText from "@/components/sanity/PortableText";
import { client } from "@cms";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import { Link } from "@i18n/navigation";

const POST_QUERY = `
*[_type == "blogPost" && slug.current == $slug && locale == $locale][0]{
  _id,
  title,
  slug,
  locale,
  publishedAt,
  excerpt,
  content
}
`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;

  if (!slug || !locale) {
    notFound();
  }

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug, locale },
    options
  );

  if (!post) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <article className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 mb-10 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back to home
          </Link>

          {/* Meta */}
          {post.publishedAt && (
            <time
              className="block mb-3 text-sm uppercase tracking-wide text-muted-foreground"
              dateTime={post.publishedAt}
            >
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}

          {/* Title */}
          <h1 className="text-4xl leading-tight font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              {post.excerpt}
            </p>
          )}

          {/* Divider */}
          <div className="h-px w-full bg-border mb-10" />

          {/* Content */}
          {post.content && (
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:scroll-mt-24
                        prose-p:leading-relaxed
                        prose-a:font-medium
                        prose-a:underline-offset-4
                        prose-blockquote:border-l-muted
                        prose-blockquote:text-muted-foreground"
            >
              <PortableText value={post.content} />
            </div>
          )}
        </article>
      </Container>
    </Section>
  );
}
