import { PortableText as BasePortableText } from "@portabletext/react";

export default function PortableText({ value }: { value: any }) {
  return (
    <BasePortableText
      value={value}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-12 mb-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-10 mb-4">{children}</h2>
          ),
          normal: ({ children }) => (
            <p className="mb-6 leading-relaxed">{children}</p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-4 border-border pl-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
        },

        list: {
          bullet: ({ children }) => (
            <ul className="my-6 list-disc pl-6 space-y-2">{children}</ul>
          ),
          number: ({ children }) => (
            <ol className="my-6 list-decimal pl-6 space-y-2">{children}</ol>
          ),
        },

        marks: {
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          link: ({ value, children }) => (
            <a
              href={value.href}
              className="underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        },
      }}
    />
  );
}
