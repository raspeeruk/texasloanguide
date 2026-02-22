import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { getPublishedLoanAmounts } from "@/lib/data/loanAmounts";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLUFSummary } from "@/components/content/BLUFSummary";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { QuickApplyWidget } from "@/components/forms/QuickApplyWidget";
import { AuthorByline } from "@/components/content/AuthorByline";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";

export const metadata: Metadata = createMetadata({
  title: "No Credit Check Loans - Apply Without a Hard Inquiry",
  description:
    "Compare loan options from lenders that don't require a traditional credit check. Apply without affecting your credit score. Bad credit and no credit OK.",
  path: "/loans/no-credit-check",
});

const faqs = [
  {
    question: "What does 'no credit check' actually mean?",
    answer:
      "A 'no credit check' loan means the lender does not perform a hard inquiry on your credit report through traditional bureaus (Equifax, Experian, TransUnion). Instead, they may use alternative data sources such as your bank account history, income verification, employment records, or specialty consumer reporting agencies.",
  },
  {
    question: "Are no credit check loans legitimate?",
    answer:
      "Yes, many legitimate lenders offer loans without traditional credit checks. However, be cautious of scams. Legitimate lenders will never ask for upfront fees before disbursing funds, will clearly disclose all terms and costs, and will be licensed in your state. Check with your state's financial regulator to verify a lender's license.",
  },
  {
    question: "Why are no credit check loans more expensive?",
    answer:
      "Without a credit check, lenders take on more risk because they have less information about your repayment history. To compensate for this higher risk, they charge higher APRs and fees. This is why it's important to compare offers and only borrow what you truly need.",
  },
  {
    question: "Will a no credit check loan help build my credit?",
    answer:
      "It depends on the lender. Some lenders that don't check your credit before lending will still report your payment activity to credit bureaus. If they report and you make on-time payments, it can help build your credit. Ask the lender before accepting whether they report to any of the three major bureaus.",
  },
  {
    question: "What do lenders check if not my credit score?",
    answer:
      "Lenders may verify your identity, income (pay stubs, bank statements), employment status, bank account history (checking for regular deposits and sufficient balance), and your history with specialty reporting agencies like Clarity Services or DataX.",
  },
  {
    question: "Can I get a larger loan without a credit check?",
    answer:
      "Most no-credit-check loans are limited to smaller amounts ($100-$1,000) because of the higher risk to the lender. For larger amounts, lenders typically require at least a soft credit check or alternative verification. Secured loans backed by collateral may offer larger amounts without traditional credit checks.",
  },
];

export default function NoCreditCheckLoansPage() {
  const amounts = getPublishedLoanAmounts().filter((a) => a.amount <= 1000);

  return (
    <>
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Loans", href: "/loans" },
            { name: "No Credit Check Loans", href: "/loans/no-credit-check" },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              No Credit Check Loans &mdash; Apply Without a Hard Inquiry
            </h1>

            <BLUFSummary
              amount="$100 – $1,000"
              minApr={200}
              maxApr={664}
              fundingTime="as soon as the next business day"
              badCreditOk={true}
            />

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                What Are No Credit Check Loans?
              </h2>
              <p className="mb-4 text-gray-600">
                No credit check loans are lending products where the lender does
                not perform a traditional hard inquiry on your credit report.
                Instead of relying on your FICO score, these lenders use
                alternative data to evaluate your ability to repay.
              </p>
              <p className="mb-4 text-gray-600">
                This means applying won&apos;t affect your credit score — a key
                advantage for borrowers who are concerned about further damage to
                their credit or who have no credit history at all.
              </p>
              <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
                <p className="font-semibold text-amber-800">Important Note</p>
                <p className="mt-1 text-sm text-amber-700">
                  &ldquo;No credit check&rdquo; does not mean &ldquo;no
                  verification.&rdquo; Legitimate lenders will still verify your
                  identity, income, and banking information. Any lender that
                  offers a loan with absolutely no verification at all should be
                  treated with extreme caution.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How No Credit Check Loans Work
              </h2>
              <p className="mb-4 text-gray-600">
                Instead of pulling your credit report, these lenders evaluate you
                using:
              </p>
              <ul className="space-y-3">
                {[
                  {
                    title: "Bank account analysis",
                    desc: "Lenders review your bank statements to verify income deposits, spending patterns, and account balances.",
                  },
                  {
                    title: "Income verification",
                    desc: "Pay stubs, employer verification, or tax documents confirm your ability to make loan payments.",
                  },
                  {
                    title: "Specialty reporting agencies",
                    desc: "Services like Clarity Services, DataX, or FactorTrust track payday loan history specifically, even without traditional credit data.",
                  },
                  {
                    title: "Identity verification",
                    desc: "Government ID, Social Security number, and address verification confirm you are who you say you are.",
                  },
                ].map((item, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-900">
                      {item.title}:
                    </span>{" "}
                    <span className="text-gray-600">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Types of No Credit Check Lending
              </h2>
              <div className="space-y-4">
                {[
                  {
                    type: "Payday loans",
                    check: "None or soft check only",
                    amounts: "$100 – $1,000",
                    cost: "High (200%+ APR)",
                  },
                  {
                    type: "Title loans",
                    check: "None (secured by vehicle)",
                    amounts: "$100 – $10,000",
                    cost: "High (100%–300% APR)",
                  },
                  {
                    type: "Pawn shop loans",
                    check: "None (secured by item)",
                    amounts: "$50 – $500",
                    cost: "Moderate–High",
                  },
                  {
                    type: "Earned wage access",
                    check: "Employment verification only",
                    amounts: "$50 – $500",
                    cost: "Very low (tips only)",
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="flex items-start gap-4 rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.type}</p>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>Check: {item.check}</span>
                        <span>Amounts: {item.amounts}</span>
                        <span>Cost: {item.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Red Flags to Watch For
              </h2>
              <p className="mb-4 text-gray-600">
                While many no-credit-check lenders are legitimate, the space
                attracts some predatory operators. Watch for these warning signs:
              </p>
              <ul className="space-y-2">
                {[
                  "Upfront fees required before receiving funds",
                  "Guaranteed approval regardless of any circumstances",
                  "No clear disclosure of APR, fees, or total repayment amount",
                  "Pressure to borrow more than you requested",
                  "No verifiable state license or physical address",
                  "Requests for unusual payment methods (gift cards, wire transfers)",
                ].map((flag, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="mt-0.5 text-red-500">&#9888;</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                No Credit Check Loans by Amount
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {amounts.map((loan) => (
                  <Link
                    key={loan.slug}
                    href={`/borrow/${loan.slug}`}
                    className="rounded border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-600 transition-colors hover:border-brand-light hover:bg-brand-lighter hover:text-brand"
                  >
                    {loan.displayAmount}
                  </Link>
                ))}
              </div>
            </section>

            {/* Related Loan Types */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Related Loan Types
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/loans/bad-credit"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Bad Credit Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Options for borrowers with poor or no credit history</p>
                </Link>
                <Link
                  href="/loans/payday"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Payday Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Short-term loans with minimal credit requirements</p>
                </Link>
                <Link
                  href="/loans/same-day"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Same Day Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Fast approval and same-day funding</p>
                </Link>
                <Link
                  href="/loans/emergency"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Emergency Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Quick cash for urgent expenses</p>
                </Link>
              </div>
            </section>

            {/* External Resources */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Official Resources
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/" target="_blank" rel="noopener noreferrer" className="text-brand underline">CFPB — Credit Reports and Scores</a>
                  {" "}<span className="text-gray-500">— Understand your credit rights and dispute errors</span>
                </li>
                <li>
                  <a href="https://consumer.ftc.gov/credit-loans-and-debt" target="_blank" rel="noopener noreferrer" className="text-brand underline">FTC — Borrowing and Credit</a>
                  {" "}<span className="text-gray-500">— Avoid scams and predatory lenders</span>
                </li>
                <li>
                  <a href="https://www.annualcreditreport.com/" target="_blank" rel="noopener noreferrer" className="text-brand underline">AnnualCreditReport.com</a>
                  {" "}<span className="text-gray-500">— Free annual credit reports from all three bureaus</span>
                </li>
                <li>
                  <a href="https://www.211.org/" target="_blank" rel="noopener noreferrer" className="text-brand underline">211.org</a>
                  {" "}<span className="text-gray-500">— Find local financial assistance programs and alternatives to borrowing</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                No Credit Check Loans: FAQ
              </h2>
              <FAQAccordion faqs={faqs} />
            </section>

            <AuthorByline
              name="James Carter"
              slug="james-carter"
              credentials="Chartered Financial Analyst (CFA)"
              reviewDate="2026-02-15"
            />

            <AffiliateDisclosure />
          </div>

          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-8">
              <QuickApplyWidget />

              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  No Credit Check Loans at a Glance
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Amounts</dt>
                    <dd className="font-medium text-gray-900">$100 – $1,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Credit Check</dt>
                    <dd className="font-medium text-gray-900">None / Soft</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Typical APR</dt>
                    <dd className="font-medium text-gray-900">200% – 664%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Funding</dt>
                    <dd className="font-medium text-gray-900">Next business day</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
