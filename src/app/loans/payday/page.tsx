import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site.config";
import { getPaydayLegalStates, getSiteStates } from "@/lib/data/states";
import { getPublishedLoanAmounts } from "@/lib/data/loanAmounts";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLUFSummary } from "@/components/content/BLUFSummary";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { QuickApplyWidget } from "@/components/forms/QuickApplyWidget";
import { AuthorByline } from "@/components/content/AuthorByline";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";

export const metadata: Metadata = createMetadata({
  title: "Payday Loans Online - Compare Rates & Apply",
  description:
    "Compare payday loan options from multiple lenders. Amounts from $100 to $1,000. Fast approval, funds as soon as next business day. Bad credit considered.",
  path: "/loans/payday",
});

const faqs = [
  {
    question: "What is a payday loan?",
    answer:
      "A payday loan is a short-term, small-dollar loan typically due on your next payday. Loan amounts usually range from $100 to $1,000 with repayment terms of 2 to 4 weeks. They are designed for borrowers who need quick access to cash for unexpected expenses.",
  },
  {
    question: "How much does a payday loan cost?",
    answer:
      "Payday loan costs vary by state and lender. Fees typically range from $10 to $30 per $100 borrowed, which translates to APRs of 260% to 780%. For example, borrowing $500 with a $15 per $100 fee costs $75 in fees, for a total repayment of $575. Always review the full cost before accepting any loan offer.",
  },
  {
    question: "Are payday loans legal in every state?",
    answer:
      "No. As of 2026, payday lending is legal and regulated in approximately 32 states. States including New York, New Jersey, Georgia, and others prohibit payday lending or cap rates low enough to effectively ban them. Check your state's regulations before applying.",
  },
  {
    question: "Can I get a payday loan with bad credit?",
    answer:
      "Yes. Many payday lenders do not rely heavily on traditional credit scores. Instead, they focus on your income, employment status, and ability to repay the loan. However, borrowers with lower credit scores may receive higher APRs.",
  },
  {
    question: "How quickly can I get funds from a payday loan?",
    answer:
      "Many online payday lenders offer approval decisions within minutes. If approved, funds are typically deposited into your bank account as soon as the next business day. Some lenders offer same-day funding for applications submitted early in the day.",
  },
  {
    question: "What are the alternatives to payday loans?",
    answer:
      "Alternatives include credit union payday alternative loans (PALs) with APRs capped at 28%, earned wage access apps like Earnin or Dave, credit card cash advances, payment plans with your creditor, local emergency assistance programs, and borrowing from family or friends.",
  },
  {
    question: "What happens if I can't repay a payday loan on time?",
    answer:
      "Contact your lender immediately. Depending on your state, options may include an extended payment plan, a loan extension (rollover), or a cooling-off period before taking a new loan. Failure to repay can result in additional fees, collection activity, and damage to your credit. Some states prohibit rollovers to prevent debt cycles.",
  },
  {
    question: "Does applying for a payday loan affect my credit score?",
    answer:
      `Submitting your information through ${siteConfig.name} does not affect your credit score. Most payday lenders perform a soft credit check or no credit check during the application. However, if you fail to repay, the debt may be sent to collections, which can negatively impact your credit.`,
  },
];

export default function PaydayLoansPage() {
  const legalStates = getPaydayLegalStates();
  const allStates = getSiteStates();
  const illegalStates = allStates.filter((s) => !s.paydayLegal);
  const amounts = getPublishedLoanAmounts().filter((a) => a.amount <= 1000);

  return (
    <>
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Loans", href: "/loans" },
            { name: "Payday Loans", href: "/loans/payday" },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Payday Loans Online &mdash; Compare &amp; Apply
            </h1>

            <BLUFSummary
              amount="$100 – $1,000"
              minApr={200}
              maxApr={664}
              fundingTime="as soon as the next business day"
              badCreditOk={true}
            />

            {/* What is a payday loan */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                What Is a Payday Loan?
              </h2>
              <p className="mb-4 text-gray-600">
                A payday loan is a short-term, small-dollar loan designed to
                cover expenses until your next paycheck. Borrowers typically
                repay the full loan amount plus fees in a single payment on their
                next payday, usually within 2 to 4 weeks.
              </p>
              <p className="mb-4 text-gray-600">
                Payday loans are available from both storefront locations and
                online lenders. Online payday loans have become increasingly
                popular because they allow borrowers to complete the entire
                process from home and receive funds via direct deposit.
              </p>
              <p className="text-gray-600">
                These loans are intended for short-term financial needs such as
                emergency car repairs, medical bills, utility payments, or other
                unexpected expenses. They are not designed for long-term
                borrowing or large purchases.
              </p>
            </section>

            {/* How payday loans work */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How Payday Loans Work
              </h2>
              <ol className="space-y-4">
                {[
                  {
                    step: "Apply online or in-store",
                    detail:
                      "Provide your personal information, employment details, income, and bank account information. Online applications typically take 5-10 minutes.",
                  },
                  {
                    step: "Receive an approval decision",
                    detail:
                      "Most payday lenders provide a decision within minutes. Approval is based primarily on your income and ability to repay, not your credit score.",
                  },
                  {
                    step: "Review and accept the loan terms",
                    detail:
                      "Carefully review the loan amount, fees, APR, and repayment date before accepting. You are never obligated to accept an offer.",
                  },
                  {
                    step: "Receive your funds",
                    detail:
                      "For online loans, funds are deposited directly into your bank account, typically by the next business day. Some lenders offer same-day funding.",
                  },
                  {
                    step: "Repay on your due date",
                    detail:
                      "The lender will typically withdraw the loan amount plus fees from your bank account on the agreed-upon date, usually your next payday.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.step}</p>
                      <p className="text-gray-600">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Costs */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Payday Loan Costs &amp; Fees
              </h2>
              <p className="mb-4 text-gray-600">
                Payday loan fees are typically expressed as a dollar amount per
                $100 borrowed. The equivalent APR can be very high because the
                loan term is short. Here are typical costs for common payday loan
                amounts:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Amount
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Fee ($15/$100)
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Total Repayment
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        APR (14-day term)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[100, 300, 500, 750, 1000].map((amt) => {
                      const fee = amt * 0.15;
                      const apr = Math.round((fee / amt / 14) * 365 * 100);
                      return (
                        <tr key={amt}>
                          <td className="px-4 py-3">${amt}</td>
                          <td className="px-4 py-3">${fee}</td>
                          <td className="px-4 py-3">${amt + fee}</td>
                          <td className="px-4 py-3">{apr}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Based on a $15 per $100 fee with a 14-day term. Actual fees vary
                by lender and state. Some states cap fees below $15 per $100.
              </p>
            </section>

            {/* Pros and Cons */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Pros and Cons of Payday Loans
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg border border-brand-light bg-brand-lighter p-5">
                  <h3 className="mb-3 font-semibold text-brand-dark">Pros</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand-accent">&#10003;</span>
                      Fast approval and funding (often next business day)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand-accent">&#10003;</span>
                      Available to borrowers with bad or no credit
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand-accent">&#10003;</span>
                      Simple application process
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand-accent">&#10003;</span>
                      No collateral required
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-5">
                  <h3 className="mb-3 font-semibold text-red-800">Cons</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-600">&#10007;</span>
                      Very high APRs compared to other loan types
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-600">&#10007;</span>
                      Short repayment period can strain your budget
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-600">&#10007;</span>
                      Risk of debt cycle if loans are rolled over
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-600">&#10007;</span>
                      Not available in all states
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* State availability */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Payday Loan Availability by State
              </h2>
              <p className="mb-4 text-gray-600">
                Payday lending is legal in{" "}
                <strong>{legalStates.length} states</strong> and prohibited or
                effectively banned in{" "}
                <strong>{illegalStates.length} states</strong> (including DC).
                Regulations vary significantly — some states cap fees at $10 per
                $100 while others have no caps at all.
              </p>

              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-brand">
                  States Where Payday Loans Are Legal
                </h3>
                <div className="flex flex-wrap gap-2">
                  {legalStates.map((s) => (
                    <span
                      key={s.slug}
                      className="rounded bg-brand-lighter px-2 py-1 text-xs font-medium text-brand"
                    >
                      {s.abbreviation}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-red-600">
                  States Where Payday Loans Are Prohibited
                </h3>
                <div className="flex flex-wrap gap-2">
                  {illegalStates.map((s) => (
                    <span
                      key={s.slug}
                      className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600"
                    >
                      {s.abbreviation}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Alternatives */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Alternatives to Payday Loans
              </h2>
              <p className="mb-4 text-gray-600">
                Before taking out a payday loan, consider whether these lower-cost
                alternatives might work for your situation:
              </p>
              <ul className="space-y-3">
                {[
                  {
                    title: "Payday alternative loans (PALs)",
                    desc: "Offered by federal credit unions with APRs capped at 28%. Amounts from $200 to $1,000 with 1-6 month terms.",
                  },
                  {
                    title: "Earned wage access apps",
                    desc: "Apps like Earnin, Dave, and MoneyLion let you access earned wages before payday, often with no interest or minimal fees.",
                  },
                  {
                    title: "Personal installment loans",
                    desc: "Longer repayment terms (3-24 months) with lower APRs. Monthly payments are more manageable than lump-sum repayment.",
                  },
                  {
                    title: "Credit card cash advance",
                    desc: "If you have available credit, cash advances typically cost 3-5% upfront plus 25-30% APR — much lower than payday loan rates.",
                  },
                  {
                    title: "Local assistance programs",
                    desc: "Many nonprofits and community organizations offer emergency financial assistance for rent, utilities, and medical bills.",
                  },
                ].map((alt, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-900">
                      {alt.title}:
                    </span>{" "}
                    <span className="text-gray-600">{alt.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Browse by amount */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Payday Loans by Amount
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
                  <p className="mt-1 text-sm text-gray-500">Options for borrowers with less-than-perfect credit</p>
                </Link>
                <Link
                  href="/loans/same-day"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Same Day Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Get funds deposited as fast as the same business day</p>
                </Link>
                <Link
                  href="/loans/no-credit-check"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">No Credit Check Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Lenders that use alternative data beyond your credit score</p>
                </Link>
                <Link
                  href="/loans/installment"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Installment Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Repay over time with fixed monthly payments</p>
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
                  <a href="https://www.consumerfinance.gov/consumer-tools/payday-loans/" target="_blank" rel="noopener noreferrer" className="text-brand underline">Consumer Financial Protection Bureau (CFPB) — Payday Loans</a>
                  {" "}<span className="text-gray-500">— Federal guidance on payday lending rights and protections</span>
                </li>
                <li>
                  <a href="https://consumer.ftc.gov/credit-loans-and-debt" target="_blank" rel="noopener noreferrer" className="text-brand underline">Federal Trade Commission (FTC) — Payday Lending</a>
                  {" "}<span className="text-gray-500">— Consumer protection information and enforcement actions</span>
                </li>
                <li>
                  <a href="https://www.ncua.gov/consumers/financial-literacy-resources" target="_blank" rel="noopener noreferrer" className="text-brand underline">National Credit Union Administration (NCUA) — Payday Alternative Loans</a>
                  {" "}<span className="text-gray-500">— Information on lower-cost PAL alternatives from credit unions</span>
                </li>
                <li>
                  <a href="https://www.211.org/" target="_blank" rel="noopener noreferrer" className="text-brand underline">211.org</a>
                  {" "}<span className="text-gray-500">— Find local emergency financial assistance programs</span>
                </li>
              </ul>
            </section>

            {/* FAQs */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Payday Loan FAQ
              </h2>
              <FAQAccordion faqs={faqs} />
            </section>

            <AuthorByline
              name="Sarah Mitchell"
              slug="sarah-mitchell"
              credentials="Certified Financial Planner (CFP)"
              reviewDate="2026-02-15"
            />

            <AffiliateDisclosure />
          </div>

          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-8">
              <QuickApplyWidget />

              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Payday Loans at a Glance
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Amounts</dt>
                    <dd className="font-medium text-gray-900">$100 – $1,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Terms</dt>
                    <dd className="font-medium text-gray-900">2 – 4 weeks</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Typical APR</dt>
                    <dd className="font-medium text-gray-900">200% – 664%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Funding</dt>
                    <dd className="font-medium text-gray-900">Next business day</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Credit</dt>
                    <dd className="font-medium text-gray-900">All types</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Available in</dt>
                    <dd className="font-medium text-gray-900">
                      {legalStates.length} states
                    </dd>
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
