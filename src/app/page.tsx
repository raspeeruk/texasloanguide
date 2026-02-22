import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_URL, siteConfig } from "@/lib/site.config";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedLoanAmounts } from "@/lib/data/loanAmounts";

export const metadata: Metadata = createMetadata({
  title: "Compare Personal Loans & Payday Loans Online",
  description:
    `Compare personal loan and payday loan options from ${SITE_NAME}'s network of lenders. Bad credit considered. Apply in minutes, funds as soon as same day.`,
  path: "/",
});

const LOAN_TYPES = [
  {
    name: "Payday Loans",
    href: "/loans/payday",
    description: "Short-term loans typically repaid on your next payday",
  },
  {
    name: "Bad Credit Loans",
    href: "/loans/bad-credit",
    description: "Options for borrowers with less-than-perfect credit",
  },
  {
    name: "Same Day Loans",
    href: "/loans/same-day",
    description: "Get funds deposited as fast as the same business day",
  },
  {
    name: "Emergency Loans",
    href: "/loans/emergency",
    description: "Quick funding for unexpected expenses and urgent needs",
  },
  {
    name: "No Credit Check",
    href: "/loans/no-credit-check",
    description: "Lenders that use alternative data beyond your credit score",
  },
  {
    name: "Installment Loans",
    href: "/loans/installment",
    description: "Repay over time with fixed monthly payments and predictable terms",
  },
];

const TRUST_POINTS = [
  {
    title: "Compare Multiple Lenders",
    description:
      "See offers from multiple lenders in one place. Choose the rate and terms that work for you.",
  },
  {
    title: "Fast Decisions",
    description:
      "Get matched with lenders in minutes. No lengthy paperwork or branch visits required.",
  },
  {
    title: "All Credit Types",
    description:
      "Our lender network considers applicants with all credit backgrounds, including bad credit.",
  },
  {
    title: "Secure & Private",
    description:
      "Your information is protected with 256-bit SSL encryption. We never sell your data.",
  },
];

export default function HomePage() {
  const topAmounts = getPublishedLoanAmounts().filter((a) =>
    [100, 300, 500, 750, 1000, 1500, 2000, 5000].includes(a.amount)
  );

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      `Compare personal loan and payday loan options from ${siteConfig.name}'s network of lenders.`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/borrow/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={websiteSchema} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-lighter to-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Compare Loan Options.
            <br />
            <span className="text-brand">Find Your Best Rate.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            {siteConfig.name} connects you with lenders offering personal loans from
            $100 to $35,000. Compare rates, terms, and fees from multiple
            lenders &mdash; all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/apply"
              className="rounded-lg bg-brand px-8 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              See My Options
            </Link>
            <Link
              href="/borrow"
              className="rounded-lg border border-gray-300 px-8 py-3.5 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Browse Loan Amounts
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Amounts */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Popular Loan Amounts
        </h2>
        <p className="mb-8 text-gray-600">
          Select an amount to compare rates and terms from our lender network.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {topAmounts.map((loan) => (
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
              <p className="mt-3 text-xs font-medium text-brand-accent opacity-0 transition-opacity group-hover:opacity-100">
                Compare options &rarr;
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/borrow"
            className="text-sm font-medium text-brand hover:text-brand-dark"
          >
            View all loan amounts &rarr;
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
            How {siteConfig.name} Works
          </h2>
          <p className="mb-10 text-center text-gray-600">
            Three simple steps to compare loan options.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Tell Us What You Need",
                desc: "Fill out a simple form with your desired loan amount and basic information. It takes less than 5 minutes.",
              },
              {
                step: "2",
                title: "Compare Your Options",
                desc: "We match you with lenders in our network. Review offers with different rates, terms, and fees side by side.",
              },
              {
                step: "3",
                title: "Get Your Funds",
                desc: "Choose the best offer and complete the lender's process. Funds can be deposited as soon as the next business day.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-lg font-bold text-brand">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Loan Types We Compare
        </h2>
        <p className="mb-8 text-gray-600">
          Whatever your situation, we have lenders who can help.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {LOAN_TYPES.map((type) => (
            <Link
              key={type.href}
              href={type.href}
              className="rounded-lg border border-gray-200 p-5 transition-all hover:border-brand-light hover:shadow-md"
            >
              <h3 className="font-semibold text-gray-900">{type.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{type.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">
            Why Choose {siteConfig.name}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point) => (
              <div key={point.title}>
                <h3 className="font-semibold text-gray-900">{point.title}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Tools &amp; Resources
        </h2>
        <p className="mb-8 text-gray-600">
          Free tools and expert-reviewed guides to help you make informed
          borrowing decisions.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/calculator"
            className="rounded-lg border border-gray-200 p-5 transition-all hover:border-brand-light hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">
              Loan Repayment Calculator
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Calculate monthly payments, total interest, and compare costs
              across different loan amounts and APRs.
            </p>
          </Link>
          <Link
            href="/guides"
            className="rounded-lg border border-gray-200 p-5 transition-all hover:border-brand-light hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">
              Financial Guides
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Expert-reviewed guides on payday loans, APR, alternatives to
              high-cost borrowing, and more.
            </p>
          </Link>
          <Link
            href="/states"
            className="rounded-lg border border-gray-200 p-5 transition-all hover:border-brand-light hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">
              State Lending Laws
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Check payday loan regulations, APR caps, and borrower protections
              in your state.
            </p>
          </Link>
        </div>
      </section>

      {/* Consumer Protection Resources */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-lg font-bold text-gray-900">
            Consumer Protection Resources
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Before borrowing, we encourage you to review resources from these
            federal consumer protection agencies:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="https://www.consumerfinance.gov/consumer-tools/payday-loans/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 bg-white p-4 text-sm transition-colors hover:border-brand-light"
            >
              <p className="font-medium text-gray-900">CFPB</p>
              <p className="mt-1 text-xs text-gray-500">
                Payday loan guidance from the Consumer Financial Protection
                Bureau
              </p>
            </a>
            <a
              href="https://consumer.ftc.gov/credit-loans-and-debt"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 bg-white p-4 text-sm transition-colors hover:border-brand-light"
            >
              <p className="font-medium text-gray-900">FTC</p>
              <p className="mt-1 text-xs text-gray-500">
                Federal Trade Commission consumer credit advice and scam
                prevention
              </p>
            </a>
            <a
              href="https://www.annualcreditreport.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 bg-white p-4 text-sm transition-colors hover:border-brand-light"
            >
              <p className="font-medium text-gray-900">
                AnnualCreditReport.com
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Free credit reports from all three bureaus &mdash; the official
                federal site
              </p>
            </a>
            <a
              href="https://www.211.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 bg-white p-4 text-sm transition-colors hover:border-brand-light"
            >
              <p className="font-medium text-gray-900">211.org</p>
              <p className="mt-1 text-xs text-gray-500">
                Local emergency financial assistance, utility help, and
                community resources
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
