import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_URL } from "@/lib/site.config";
import {
  getGuideBySlug,
  getPublishedGuideSlugs,
  isGuidePublished,
} from "@/lib/data/guides";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";
import { StatHighlight } from "@/components/content/StatHighlight";
import { StatsGrid } from "@/components/content/StatsGrid";
import { Callout } from "@/components/content/Callout";
import { ComparisonRow } from "@/components/content/ComparisonRow";

// Force SSR for guide pages — Turbopack SSG has a known issue with
// MDX-compiled JSX expression props (arrays/objects) during prerendering.
// Dev mode and SSR work correctly; only static generation fails.
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide || !isGuidePublished(guide.frontmatter)) return {};

  return createMetadata({
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    path: `/guides/${guide.frontmatter.slug}`,
    type: "article",
    publishedTime: guide.frontmatter.publishedDate,
    modifiedTime: guide.frontmatter.updatedDate,
    authorName: guide.frontmatter.author.name,
  });
}

function ApplyButton({ amount, text }: { amount: number; text: string }) {
  return (
    <div className="my-8 text-center">
      <Link
        href={`/apply?amount=${amount}`}
        className="inline-block rounded-lg bg-brand px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        {text}
      </Link>
      <p className="mt-2 text-xs text-gray-500">
        Free to use. No impact on credit score to check options.
      </p>
    </div>
  );
}

const mdxComponents = {
  ApplyButton,
  StatHighlight,
  StatsGrid,
  Callout,
  ComparisonRow,
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className="text-brand underline" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-brand underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id =
      typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : undefined;
    return (
      <h2
        id={id}
        className="mt-10 mb-4 text-2xl font-bold text-gray-900"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-900" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-gray-600" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-4 list-inside list-disc space-y-1 text-gray-600"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-4 list-inside list-decimal space-y-1 text-gray-600"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="min-w-full divide-y divide-gray-200 text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  th: ({
    children,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left font-semibold text-gray-900"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-gray-600" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-gray-100" {...props}>
      {children}
    </tr>
  ),
  blockquote: ({
    children,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-4 border-l-4 border-brand-accent bg-brand-lighter py-3 pl-4 pr-4 text-gray-700"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
};

function TableOfContents({ content }: { content: string }) {
  const headings = content.match(/^## .+$/gm);
  if (!headings || headings.length < 3) return null;

  const items = headings.map((h) => {
    const text = h.replace(/^## /, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { text, id };
  });

  return (
    <nav
      className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5"
      aria-label="Table of Contents"
    >
      <p className="mb-3 font-semibold text-gray-900">In This Guide</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm text-brand hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide || !isGuidePublished(guide.frontmatter)) notFound();

  const { frontmatter, content } = guide;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedDate,
    dateModified: frontmatter.updatedDate,
    url: `${SITE_URL}/guides/${frontmatter.slug}`,
    author: {
      "@type": "Person",
      name: frontmatter.author.name,
      url: `${SITE_URL}/authors/${frontmatter.author.slug}`,
      jobTitle: frontmatter.author.credentials,
    },
    reviewer: {
      "@type": "Person",
      name: frontmatter.reviewer.name,
      url: `${SITE_URL}/authors/${frontmatter.reviewer.slug}`,
      jobTitle: frontmatter.reviewer.credentials,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/${frontmatter.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      {frontmatter.faqs.length > 0 && (
        <FAQSchema faqs={frontmatter.faqs} />
      )}

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Guides", href: "/guides" },
            {
              name: frontmatter.title,
              href: `/guides/${frontmatter.slug}`,
            },
          ]}
        />

        {/* Article header */}
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-light px-3 py-0.5 text-xs font-medium text-brand-dark">
              {frontmatter.category}
            </span>
            <span className="text-sm text-gray-500">
              {frontmatter.readingTime}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            {frontmatter.title}
          </h1>

          <p className="mb-6 text-lg text-gray-600">
            {frontmatter.description}
          </p>

          {/* Author and reviewer info */}
          <div className="flex flex-wrap items-center gap-4 border-t border-b border-gray-200 py-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand">
                {frontmatter.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <span className="text-gray-500">Written by </span>
                <Link
                  href={`/authors/${frontmatter.author.slug}`}
                  className="font-medium text-brand hover:underline"
                >
                  {frontmatter.author.name}
                </Link>
                <span className="text-gray-400">
                  , {frontmatter.author.credentials}
                </span>
              </div>
            </div>

            <span className="hidden text-gray-300 sm:inline">|</span>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {frontmatter.reviewer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <span className="text-gray-500">Reviewed by </span>
                <Link
                  href={`/authors/${frontmatter.reviewer.slug}`}
                  className="font-medium text-brand hover:underline"
                >
                  {frontmatter.reviewer.name}
                </Link>
                <span className="text-gray-400">
                  , {frontmatter.reviewer.credentials}
                </span>
              </div>
            </div>

            <span className="hidden text-gray-300 sm:inline">|</span>

            <div className="text-gray-500">
              Updated{" "}
              <time dateTime={frontmatter.updatedDate}>
                {new Date(frontmatter.updatedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <TableOfContents content={content} />

        {/* Affiliate disclosure at top */}
        <AffiliateDisclosure />

        {/* MDX content */}
        <div className="prose-fundingzest">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* FAQ section */}
        {frontmatter.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={frontmatter.faqs} />
          </section>
        )}

        {/* Author byline at bottom */}
        <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-lg font-bold text-brand">
              {frontmatter.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                About the Author
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <Link
                  href={`/authors/${frontmatter.author.slug}`}
                  className="font-medium text-brand hover:underline"
                >
                  {frontmatter.author.name}
                </Link>{" "}
                ({frontmatter.author.credentials}) writes about personal finance,
                consumer lending, and financial literacy for {siteConfig.name}. This
                article was reviewed for accuracy by{" "}
                <Link
                  href={`/authors/${frontmatter.reviewer.slug}`}
                  className="font-medium text-brand hover:underline"
                >
                  {frontmatter.reviewer.name}
                </Link>{" "}
                ({frontmatter.reviewer.credentials}).
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Learn about our{" "}
                <Link
                  href="/editorial-guidelines"
                  className="underline hover:text-gray-600"
                >
                  editorial standards
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Related guides / CTA */}
        <div className="mt-8 rounded-lg bg-brand-lighter p-6 text-center">
          <p className="mb-2 font-semibold text-gray-900">
            Ready to explore your options?
          </p>
          <p className="mb-4 text-sm text-gray-600">
            Compare loan offers from {siteConfig.name}&apos;s network of lenders. Free to
            use, no impact on your credit score.
          </p>
          <Link
            href="/apply"
            className="inline-block rounded-lg bg-brand px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Compare Loan Options
          </Link>
        </div>
      </article>
    </>
  );
}
