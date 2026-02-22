import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { getPublishedGuides } from "@/lib/data/guides";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = createMetadata({
  title: "Financial Guides & Resources",
  description:
    "Educational guides on personal loans, payday loans, credit building, and managing debt. Expert-reviewed content to help you make informed borrowing decisions.",
  path: "/guides",
});

const UPCOMING_GUIDES = [
  {
    title: "What Happens If You Can't Repay a Payday Loan",
    description:
      "Your options if you're struggling to repay, including payment plans, state protections, and avoiding debt cycles.",
  },
  {
    title: "How to Choose Between a Payday Loan and Installment Loan",
    description:
      "A side-by-side comparison to help you decide which loan type fits your situation and budget.",
  },
  {
    title: "Cash Advance Apps vs Payday Loans: Which Is Better?",
    description:
      "Comparing Earnin, Dave, MoneyLion, and traditional payday loans on cost, speed, and eligibility.",
  },
];

export default function GuidesPage() {
  const guides = getPublishedGuides();

  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Guides", href: "/guides" }]}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Guides", href: "/guides" }]} />

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Financial Guides &amp; Resources
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Expert-reviewed guides to help you understand your borrowing options,
          compare loan products, and make informed financial decisions.
        </p>

        {guides.length > 0 && (
          <section className="mb-12">
            <div className="space-y-6">
              {guides.map((guide) => (
                <Link
                  key={guide.frontmatter.slug}
                  href={`/guides/${guide.frontmatter.slug}`}
                  className="block rounded-lg border border-gray-200 p-6 transition-colors hover:border-brand-light hover:bg-brand-lighter/50"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand-dark">
                      {guide.frontmatter.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {guide.frontmatter.readingTime}
                    </span>
                  </div>

                  <h2 className="mb-2 text-xl font-bold text-gray-900">
                    {guide.frontmatter.title}
                  </h2>
                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    {guide.frontmatter.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>
                      By {guide.frontmatter.author.name},{" "}
                      {guide.frontmatter.author.credentials}
                    </span>
                    <span>|</span>
                    <span>
                      Reviewed by {guide.frontmatter.reviewer.name},{" "}
                      {guide.frontmatter.reviewer.credentials}
                    </span>
                    <span>|</span>
                    <span>
                      Updated{" "}
                      {new Date(
                        guide.frontmatter.updatedDate
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {UPCOMING_GUIDES.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Coming Soon
            </h2>
            <div className="space-y-3">
              {UPCOMING_GUIDES.map((guide) => (
                <div
                  key={guide.title}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="font-semibold text-gray-900">
                    {guide.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {guide.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-lg bg-brand-lighter p-6">
          <h2 className="mb-2 text-lg font-bold text-gray-900">
            Explore More Resources
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Compare loan options, check state regulations, and calculate
            repayment costs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/loans"
              className="rounded-lg border border-brand-light bg-white px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-light"
            >
              Loan Types
            </Link>
            <Link
              href="/borrow"
              className="rounded-lg border border-brand-light bg-white px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-light"
            >
              Browse Loan Amounts
            </Link>
            <Link
              href="/calculator"
              className="rounded-lg border border-brand-light bg-white px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-light"
            >
              Loan Calculator
            </Link>
            <Link
              href="/states"
              className="rounded-lg border border-brand-light bg-white px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-light"
            >
              State Regulations
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
