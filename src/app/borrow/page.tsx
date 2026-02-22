import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedLoanAmounts } from "@/lib/data/loanAmounts";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Borrow Money Online - Compare Loan Amounts",
  description:
    `Compare loan options from $100 to $35,000. Find the right loan amount for your needs with ${SITE_NAME}'s network of lenders. Bad credit considered.`,
  path: "/borrow/",
});

export default function BorrowPage() {
  const amounts = getPublishedLoanAmounts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Borrow", href: "/borrow" }]} />

      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        Borrow Money Online
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-gray-600">
        Choose the loan amount you need. {siteConfig.name} connects you with lenders
        offering competitive rates for every budget. Select an amount below to
        compare options, see costs, and apply.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {amounts.map((loan) => (
          <Link
            key={loan.slug}
            href={`/borrow/${loan.slug}`}
            className="group rounded-lg border border-gray-200 p-5 transition-all hover:border-brand-light hover:shadow-md"
          >
            <p className="text-2xl font-bold text-brand group-hover:text-brand-dark">
              {loan.displayAmount}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              APR from {loan.minApr}%
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {loan.minTermMonths}&ndash;{loan.maxTermMonths} month terms
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          How to Choose the Right Loan Amount
        </h2>
        <div className="max-w-3xl space-y-4 text-gray-600">
          <p>
            Borrowing the right amount is important. Taking out more than you
            need means paying more in interest, while borrowing too little may
            leave you short. Here are some guidelines:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Only borrow what you need</strong> &mdash; Calculate the
              exact amount required for your expense before applying.
            </li>
            <li>
              <strong>Consider your repayment ability</strong> &mdash; Make sure
              the monthly payments fit comfortably within your budget.
            </li>
            <li>
              <strong>Compare total costs</strong> &mdash; A lower monthly
              payment with a longer term may cost more overall due to interest.
            </li>
            <li>
              <strong>Check state regulations</strong> &mdash; Some states cap
              the maximum loan amount for certain loan types.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
