import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LoanCalculator } from "@/components/calculator/LoanCalculator";

export const metadata: Metadata = createMetadata({
  title: "Loan Repayment Calculator",
  description:
    "Calculate your monthly payment, total cost, and total interest for any loan amount. Compare different APRs and terms to find the best option.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Calculator", href: "/calculator" }]} />

      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        Loan Repayment Calculator
      </h1>
      <p className="mb-8 text-gray-600">
        Use this calculator to estimate your monthly payment, total cost, and
        total interest for any loan amount. Adjust the APR and term to compare
        different scenarios.
      </p>

      <LoanCalculator />

      <div className="mt-12 space-y-6 text-gray-600">
        <h2 className="text-2xl font-bold text-gray-900">
          How to Use This Calculator
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Loan Amount:</strong> Enter the total amount you want to
            borrow.
          </li>
          <li>
            <strong>APR:</strong> Enter the annual percentage rate offered by
            the lender. This includes interest and certain fees.
          </li>
          <li>
            <strong>Term:</strong> Select the repayment period in months.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900">
          Understanding Your Results
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Monthly Payment:</strong> The fixed amount you pay each
            month, including principal and interest.
          </li>
          <li>
            <strong>Total Cost:</strong> The total amount you will pay over the
            life of the loan (principal + interest).
          </li>
          <li>
            <strong>Total Interest:</strong> The total interest charged over the
            life of the loan.
          </li>
        </ul>

        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
          <p className="font-semibold text-amber-800">Important</p>
          <p className="mt-1 text-sm text-amber-700">
            This calculator provides estimates only. Actual loan terms, rates,
            and payments may differ based on the lender, your credit profile,
            and your state&apos;s regulations. Always review the full loan
            agreement before accepting any offer.
          </p>
        </div>

        <div className="mt-8 rounded-lg bg-brand-lighter p-6">
          <h2 className="mb-2 text-lg font-bold text-gray-900">
            Ready to Compare Actual Loan Offers?
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            This calculator shows estimates. See real rates and terms from
            lenders in our network.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              See My Options
            </Link>
            <Link
              href="/borrow"
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Browse Loan Amounts
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Explore Loan Types
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href="/loans/payday"
              className="rounded border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-brand-light hover:text-brand"
            >
              Payday Loans (200%–664% APR)
            </Link>
            <Link
              href="/loans/installment"
              className="rounded border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-brand-light hover:text-brand"
            >
              Installment Loans (6%–199% APR)
            </Link>
            <Link
              href="/loans/bad-credit"
              className="rounded border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-brand-light hover:text-brand"
            >
              Bad Credit Loans
            </Link>
            <Link
              href="/loans/same-day"
              className="rounded border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-brand-light hover:text-brand"
            >
              Same Day Loans
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Learn More About Loan Costs
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link
                href="/guides/understanding-apr-small-dollar-loans"
                className="text-brand underline"
              >
                Understanding APR on Small Dollar Loans
              </Link>{" "}
              &mdash; what APR means and how to use it to compare offers
            </li>
            <li>
              <Link
                href="/guides/how-payday-loans-work"
                className="text-brand underline"
              >
                How Payday Loans Work
              </Link>{" "}
              &mdash; complete guide to costs, eligibility, and the process
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/consumer-tools/payday-loans/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline"
              >
                CFPB Payday Loan Resources
              </a>{" "}
              &mdash; federal consumer protection guidance
            </li>
            <li>
              <Link
                href="/states"
                className="text-brand underline"
              >
                State Lending Regulations
              </Link>{" "}
              &mdash; APR caps and borrower protections in your state
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
