import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "How It Works",
  description:
    `See how ${SITE_NAME} connects you with loan offers in minutes. Compare rates, choose your best option, and get funded fast.`,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "How It Works", href: "/how-it-works" }]} />

      <h1 className="mb-6 text-3xl font-bold text-gray-900">How It Works</h1>

      <div className="space-y-8 text-gray-600">
        <p>
          {siteConfig.name} makes it easy to compare loan options from multiple lenders
          in one place. Here&apos;s how the process works:
        </p>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                1
              </span>
              <h2 className="text-xl font-bold text-gray-900">
                Tell Us What You Need
              </h2>
            </div>
            <p>
              Start by selecting the loan amount you&apos;re looking for.
              Browse our loan pages to understand your options, or go directly to
              our application form to get started.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                2
              </span>
              <h2 className="text-xl font-bold text-gray-900">
                Submit Your Information
              </h2>
            </div>
            <p>
              Complete a short application form with your basic details, income
              information, and loan preferences. The form takes just a few
              minutes. Your information is protected with 256-bit SSL
              encryption.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                3
              </span>
              <h2 className="text-xl font-bold text-gray-900">
                Get Matched with Lenders
              </h2>
            </div>
            <p>
              Your application is shared with lenders in our network who may be
              able to offer you a loan. Multiple lenders can review your
              information and compete to offer you the best terms available.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                4
              </span>
              <h2 className="text-xl font-bold text-gray-900">
                Review Your Options
              </h2>
            </div>
            <p>
              If a lender is interested, you&apos;ll be connected directly with
              them to review the loan terms, APR, fees, and repayment schedule.
              You are never obligated to accept any offer.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                5
              </span>
              <h2 className="text-xl font-bold text-gray-900">
                Get Your Funds
              </h2>
            </div>
            <p>
              Once you accept a loan offer and complete the lender&apos;s
              process, funds can be deposited into your bank account. Many
              lenders offer same-day or next-business-day funding.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">
              Does applying affect my credit score?
            </h3>
            <p>
              Submitting your information through {siteConfig.name} does not affect
              your credit score. However, if you proceed with a lender and they
              perform a hard credit check, that may impact your score.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Is {siteConfig.name} a lender?
            </h3>
            <p>
              No. {siteConfig.name} is a comparison service that connects you with
              lenders. We do not make lending decisions, set interest rates, or
              fund loans. All lending decisions are made by the individual
              lenders in our network.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              How does {siteConfig.name} make money?
            </h3>
            <p>
              We receive a referral fee from lenders when consumers are
              successfully connected through our platform. This service is free
              for you. See our{" "}
              <Link
                href="/advertiser-disclosure"
                className="text-brand underline"
              >
                advertiser disclosure
              </Link>{" "}
              for details.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Am I guaranteed to receive a loan offer?
            </h3>
            <p>
              No. Receiving a loan offer depends on your individual
              circumstances, including your credit history, income, and state of
              residence. Lenders independently decide whether to extend an
              offer.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900">Learn More</h2>
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          <li>
            <Link href="/borrow" className="text-brand underline">
              Browse loan amounts
            </Link>{" "}
            from $100 to $35,000
          </li>
          <li>
            <Link href="/loans" className="text-brand underline">
              Compare loan types
            </Link>{" "}
            &mdash; payday, installment, bad credit, and more
          </li>
          <li>
            <Link href="/guides" className="text-brand underline">
              Read our financial guides
            </Link>{" "}
            for expert borrowing advice
          </li>
          <li>
            <Link href="/calculator" className="text-brand underline">
              Use our loan calculator
            </Link>{" "}
            to estimate repayment costs
          </li>
          <li>
            <Link href="/states" className="text-brand underline">
              Check your state&apos;s lending laws
            </Link>{" "}
            before applying
          </li>
        </ul>

        <p className="text-sm text-gray-600">
          {siteConfig.name} is regulated under federal consumer protection laws. For
          more information about your rights as a borrower, visit the{" "}
          <a
            href="https://www.consumerfinance.gov/consumer-tools/payday-loans/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline"
          >
            CFPB&apos;s payday loan resource page
          </a>
          .
        </p>

        <div className="rounded-lg bg-brand-lighter p-6 text-center">
          <p className="mb-3 font-semibold text-gray-900">
            Ready to see your options?
          </p>
          <Link
            href="/apply"
            className="inline-block rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
