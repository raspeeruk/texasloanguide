import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { AUTHORS, SITE_URL, siteConfig, type Author } from "@/lib/site.config";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  return createMetadata({
    title: `${author.name}, ${author.credentials} - Author`,
    description: `${author.name} is a ${author.title} who reviews and contributes financial content for ${siteConfig.name}. Learn about their qualifications and expertise.`,
    path: `/authors/${author.slug}`,
  });
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `${SITE_URL}/authors/${author.slug}`,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: SITE_URL,
    },
    knowsAbout: author.expertise,
    alumniOf: author.education,
    ...(author.linkedin && {
      sameAs: [author.linkedin],
    }),
  };

  return (
    <>
      <JsonLd data={personSchema} />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: author.name, href: `/authors/${author.slug}` }]}
        />

        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-light text-2xl font-bold text-brand">
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {author.name}
              </h1>
              <p className="text-lg text-brand">{author.title}</p>
              <p className="text-sm text-gray-500">{author.education}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">About</h2>
            <p>{author.bio}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Areas of Expertise
            </h2>
            <ul className="space-y-2">
              {author.expertise.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-brand-accent">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Editorial Role
            </h2>
            <p>
              {author.name} reviews financial content published on {siteConfig.name}
              to ensure accuracy, regulatory compliance, and consumer
              protection. All loan-related information, APR ranges, fee
              structures, and state regulation details are verified before
              publication.
            </p>
            <p className="mt-3">
              Learn more about our content standards in our{" "}
              <Link
                href="/editorial-guidelines"
                className="text-brand underline"
              >
                editorial guidelines
              </Link>
              .
            </p>
          </section>

          {author.linkedin && (
            <section>
              <h2 className="mb-3 text-xl font-bold text-gray-900">Connect</h2>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand underline"
              >
                LinkedIn Profile
              </a>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
