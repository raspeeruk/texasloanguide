import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Loan Types",
  description:
    `Explore different loan types available through ${SITE_NAME}: payday loans, bad credit loans, same day loans, emergency loans, and more.`,
  path: "/loans",
});

const LOAN_TYPES = [
  {
    slug: "payday",
    name: "Payday Loans",
    description:
      "Short-term loans typically due on your next payday. Amounts usually range from $100 to $1,000 with fast approval.",
    amounts: "$100 – $1,000",
    terms: "2 – 4 weeks",
  },
  {
    slug: "bad-credit",
    name: "Bad Credit Loans",
    description:
      "Loan options designed for borrowers with poor or limited credit history. Lenders focus on income and ability to repay.",
    amounts: "$100 – $5,000",
    terms: "3 – 24 months",
  },
  {
    slug: "same-day",
    name: "Same Day Loans",
    description:
      "Loans with expedited processing that can deliver funds to your bank account as soon as the same business day you apply.",
    amounts: "$100 – $5,000",
    terms: "2 weeks – 24 months",
  },
  {
    slug: "emergency",
    name: "Emergency Loans",
    description:
      "Quick-access loans for unexpected expenses like medical bills, car repairs, or urgent home repairs.",
    amounts: "$100 – $5,000",
    terms: "1 – 24 months",
  },
  {
    slug: "no-credit-check",
    name: "No Credit Check Loans",
    description:
      "Some lenders offer loans without performing a traditional hard credit inquiry, using alternative data to assess eligibility.",
    amounts: "$100 – $1,000",
    terms: "2 weeks – 6 months",
  },
  {
    slug: "installment",
    name: "Installment Loans",
    description:
      "Loans repaid over a set number of scheduled payments. Offers more manageable repayment than lump-sum payday loans.",
    amounts: "$500 – $35,000",
    terms: "3 – 60 months",
  },
];

export default function LoansPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Loans", href: "/loans" }]} />

      <h1 className="mb-4 text-3xl font-bold text-gray-900">Loan Types</h1>
      <p className="mb-8 max-w-2xl text-gray-600">
        Not sure which type of loan is right for you? Browse our loan categories
        below to understand your options, compare terms, and find the best fit
        for your situation.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LOAN_TYPES.map((type) => (
          <Link
            key={type.slug}
            href={`/loans/${type.slug}`}
            className="group rounded-lg border border-gray-200 p-6 transition hover:border-brand hover:shadow-md"
          >
            <h2 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-brand">
              {type.name}
            </h2>
            <p className="mb-4 text-sm text-gray-600">{type.description}</p>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Amounts:</dt>
                <dd className="font-medium text-gray-900">{type.amounts}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Terms:</dt>
                <dd className="font-medium text-gray-900">{type.terms}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-brand-lighter p-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Know how much you need?
        </h2>
        <p className="mb-4 text-gray-600">
          Browse loan options by dollar amount to see rates, terms, and
          requirements.
        </p>
        <Link
          href="/borrow"
          className="inline-block rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark"
        >
          Browse by Amount
        </Link>
      </div>
    </div>
  );
}
