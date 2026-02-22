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
  title: "Installment Loans - Fixed Payments, Predictable Repayment",
  description:
    "Compare installment loan options with fixed monthly payments. Amounts from $500 to $35,000. Longer terms, lower APRs than payday loans. Apply online in minutes.",
  path: "/loans/installment",
});

const faqs = [
  {
    question: "What is an installment loan?",
    answer:
      "An installment loan is a loan that you repay in fixed, scheduled payments (installments) over a set period, typically 3 to 60 months. Unlike payday loans that require full repayment at once, installment loans spread the cost over time, making monthly payments more manageable.",
  },
  {
    question: "How are installment loans different from payday loans?",
    answer:
      "Payday loans are repaid in a single lump sum (usually within 2-4 weeks) and are limited to small amounts ($100-$1,000). Installment loans are repaid in multiple monthly payments over months or years, offer larger amounts ($500-$35,000), and generally have lower APRs. Installment loans are available in all 50 states, while payday loans are restricted in many states.",
  },
  {
    question: "What credit score do I need for an installment loan?",
    answer:
      "Credit requirements vary by lender. Traditional banks typically require scores of 670+. Online lenders may accept scores as low as 580, and some specialize in bad credit lending with no minimum score requirement. Higher scores generally qualify for lower APRs.",
  },
  {
    question: "Can I pay off an installment loan early?",
    answer:
      "Most online installment lenders allow early repayment without penalties. However, some lenders charge prepayment penalties. Always check the loan terms for prepayment clauses before accepting. Paying early saves you money on interest.",
  },
  {
    question: "How much can I borrow with an installment loan?",
    answer:
      "Online installment loans typically range from $500 to $35,000, depending on the lender, your creditworthiness, income, and state regulations. Some lenders offer up to $50,000 or more for well-qualified borrowers.",
  },
  {
    question: "Do installment loans affect my credit score?",
    answer:
      "Yes, most installment lenders report to one or more credit bureaus. Making on-time payments can improve your credit score over time. Late or missed payments will hurt your score. The initial hard credit inquiry may temporarily lower your score by a few points.",
  },
];

export default function InstallmentLoansPage() {
  const amounts = getPublishedLoanAmounts();

  return (
    <>
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Loans", href: "/loans" },
            { name: "Installment Loans", href: "/loans/installment" },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Installment Loans &mdash; Fixed Monthly Payments
            </h1>

            <BLUFSummary
              amount="$500 – $35,000"
              minApr={6}
              maxApr={199}
              fundingTime="as soon as the next business day"
              badCreditOk={true}
            />

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                What Are Installment Loans?
              </h2>
              <p className="mb-4 text-gray-600">
                An installment loan is a type of loan where you borrow a fixed
                amount and repay it in equal monthly payments over a set period.
                Each payment includes a portion of the principal (the amount
                borrowed) plus interest. Your payment amount stays the same
                every month, making it easy to budget.
              </p>
              <p className="text-gray-600">
                Installment loans are one of the most common forms of consumer
                lending. Auto loans, mortgages, and student loans are all types
                of installment loans. Personal installment loans offer the
                flexibility to use funds for any purpose.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Installment Loans vs. Payday Loans
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Feature
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Installment Loan
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Payday Loan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Amounts
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        $500 – $35,000+
                      </td>
                      <td className="px-4 py-3 text-gray-600">$100 – $1,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Repayment
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Monthly installments (3-60 months)
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Single lump sum (2-4 weeks)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Typical APR
                      </td>
                      <td className="px-4 py-3 text-gray-600">6% – 199%</td>
                      <td className="px-4 py-3 text-gray-600">200% – 664%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Credit check
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Usually (soft or hard)
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Often none
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Credit building
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Yes (if lender reports)
                      </td>
                      <td className="px-4 py-3 text-gray-600">Rarely</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        State availability
                      </td>
                      <td className="px-4 py-3 text-gray-600">All 50 states</td>
                      <td className="px-4 py-3 text-gray-600">~32 states</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                APR Ranges by Credit Profile
              </h2>
              <p className="mb-4 text-gray-600">
                Your credit score significantly affects the APR you will be
                offered on an installment loan. Here are typical ranges:
              </p>
              <div className="space-y-3">
                {[
                  {
                    profile: "Excellent (750+)",
                    apr: "6% – 12%",
                    color: "bg-brand-light text-brand-dark",
                  },
                  {
                    profile: "Good (670-749)",
                    apr: "12% – 24%",
                    color: "bg-brand-lighter text-brand",
                  },
                  {
                    profile: "Fair (580-669)",
                    apr: "24% – 36%",
                    color: "bg-yellow-50 text-yellow-700",
                  },
                  {
                    profile: "Poor (below 580)",
                    apr: "36% – 199%",
                    color: "bg-red-50 text-red-700",
                  },
                ].map((tier) => (
                  <div
                    key={tier.profile}
                    className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                  >
                    <span className="font-medium text-gray-900">
                      {tier.profile}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${tier.color}`}
                    >
                      {tier.apr}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Ranges are approximate and vary by lender. Your actual APR
                depends on multiple factors including income, debt-to-income
                ratio, and loan amount.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How to Choose an Installment Loan
              </h2>
              <ul className="space-y-3">
                {[
                  {
                    title: "Compare APRs, not just monthly payments",
                    desc: "A lower monthly payment with a longer term can cost significantly more in total interest. Always compare the total cost of the loan.",
                  },
                  {
                    title: "Check for origination fees",
                    desc: "Some lenders charge 1-8% of the loan amount as an origination fee, deducted from your disbursement. Factor this into your total cost.",
                  },
                  {
                    title: "Look for no prepayment penalties",
                    desc: "The best installment loans let you pay early without penalties, saving you money on interest.",
                  },
                  {
                    title: "Verify the lender reports to credit bureaus",
                    desc: "If building credit is important to you, choose a lender that reports your payments to Equifax, Experian, or TransUnion.",
                  },
                  {
                    title: "Choose a term you can afford",
                    desc: "Shorter terms mean higher monthly payments but less total interest. Longer terms mean lower payments but more total cost. Find the balance that fits your budget.",
                  },
                ].map((tip, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-900">
                      {tip.title}:
                    </span>{" "}
                    <span className="text-gray-600">{tip.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Installment Loans by Amount
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
                  href="/loans/payday"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Payday Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Short-term loans for small amounts, repaid on your next payday</p>
                </Link>
                <Link
                  href="/loans/bad-credit"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Bad Credit Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Options for borrowers with all credit types</p>
                </Link>
                <Link
                  href="/loans/same-day"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Same Day Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Get funds deposited as fast as today</p>
                </Link>
                <Link
                  href="/loans/emergency"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Emergency Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Quick funding for unexpected expenses</p>
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
                  <a href="https://www.consumerfinance.gov/ask-cfpb/" target="_blank" rel="noopener noreferrer" className="text-brand underline">CFPB — Personal Loans</a>
                  {" "}<span className="text-gray-500">— Federal guidance on personal loan rights and protections</span>
                </li>
                <li>
                  <a href="https://www.annualcreditreport.com/" target="_blank" rel="noopener noreferrer" className="text-brand underline">AnnualCreditReport.com</a>
                  {" "}<span className="text-gray-500">— Check your credit report before applying</span>
                </li>
                <li>
                  <a href="https://consumer.ftc.gov/credit-loans-and-debt" target="_blank" rel="noopener noreferrer" className="text-brand underline">FTC — Borrowing and Credit</a>
                  {" "}<span className="text-gray-500">— Avoid lending scams and understand your rights</span>
                </li>
                <li>
                  <a href="https://www.myfico.com/credit-education/credit-scores" target="_blank" rel="noopener noreferrer" className="text-brand underline">myFICO — Credit Scores</a>
                  {" "}<span className="text-gray-500">— Understand how your score affects loan rates</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Installment Loans: FAQ
              </h2>
              <FAQAccordion faqs={faqs} />
            </section>

            <AuthorByline
              name="Maria Gonzalez"
              slug="maria-gonzalez"
              credentials="Accredited Financial Counselor (AFC)"
              reviewDate="2026-02-15"
            />

            <AffiliateDisclosure />
          </div>

          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-8">
              <QuickApplyWidget />

              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Installment Loans at a Glance
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Amounts</dt>
                    <dd className="font-medium text-gray-900">
                      $500 – $35,000
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Terms</dt>
                    <dd className="font-medium text-gray-900">3 – 60 months</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">APR Range</dt>
                    <dd className="font-medium text-gray-900">6% – 199%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Repayment</dt>
                    <dd className="font-medium text-gray-900">
                      Fixed monthly
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Availability</dt>
                    <dd className="font-medium text-gray-900">All 50 states</dd>
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
