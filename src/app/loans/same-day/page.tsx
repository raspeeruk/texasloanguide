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
  title: "Same Day Loans - Get Funds as Fast as Today",
  description:
    "Compare same day loan options with fast approval and funding. Amounts from $100 to $5,000. Apply online in minutes, get funds deposited the same business day.",
  path: "/loans/same-day",
});

const faqs = [
  {
    question: "Can I really get a loan the same day I apply?",
    answer:
      "Yes, many online lenders offer same-day funding for applications completed and approved early in the business day, typically before 10:30 AM ET. However, funding speed depends on your bank's processing times, the lender's policies, and whether the application is complete and verified quickly.",
  },
  {
    question: "What do I need to apply for a same day loan?",
    answer:
      "You typically need: a valid government-issued ID, proof of income (pay stubs, bank statements, or tax returns), an active checking account with direct deposit, a valid email address, and a phone number. Having these ready speeds up the process.",
  },
  {
    question: "Are same day loans more expensive than regular loans?",
    answer:
      "Not necessarily. Same day loans are not a separate loan product — they are regular payday or installment loans from lenders that process applications quickly. The cost depends on the loan type, amount, and your credit profile, not the funding speed.",
  },
  {
    question: "What if I apply after business hours?",
    answer:
      "Applications submitted after business hours, on weekends, or on holidays are typically processed the next business day. To maximize your chance of same-day funding, apply as early as possible on a weekday.",
  },
  {
    question: "Can I get a same day loan with bad credit?",
    answer:
      "Yes. Many lenders that offer fast funding also accept applicants with bad credit. The approval decision is based on your income and ability to repay, not just your credit score. Expect higher APRs with lower credit scores.",
  },
  {
    question: "How much can I borrow with a same day loan?",
    answer:
      "Same day loan amounts typically range from $100 to $5,000 depending on the lender and your state. Smaller amounts ($100-$1,000) are more commonly funded the same day, while larger amounts may require additional verification.",
  },
];

export default function SameDayLoansPage() {
  const amounts = getPublishedLoanAmounts().filter((a) => a.amount <= 5000);

  return (
    <>
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Loans", href: "/loans" },
            { name: "Same Day Loans", href: "/loans/same-day" },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Same Day Loans &mdash; Fast Approval &amp; Funding
            </h1>

            <BLUFSummary
              amount="$100 – $5,000"
              minApr={36}
              maxApr={664}
              fundingTime="as soon as the same business day"
              badCreditOk={true}
            />

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                What Are Same Day Loans?
              </h2>
              <p className="mb-4 text-gray-600">
                Same day loans are any loan products where the lender can approve
                your application and deposit funds into your bank account within
                the same business day. This includes payday loans, personal
                installment loans, and lines of credit from lenders with
                streamlined application processes.
              </p>
              <p className="text-gray-600">
                The key factor is the lender&apos;s processing speed, not the
                loan type itself. Many online lenders have automated
                underwriting systems that can evaluate your application in
                minutes rather than days.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How to Get a Loan the Same Day
              </h2>
              <ol className="space-y-4">
                {[
                  {
                    step: "Apply early in the day",
                    detail:
                      "Most lenders require applications before 10:30 AM ET for same-day processing. The earlier you apply, the better your chances of receiving funds today.",
                  },
                  {
                    step: "Have your documents ready",
                    detail:
                      "Gather your ID, proof of income, and bank account details before starting. Incomplete applications cause delays.",
                  },
                  {
                    step: "Provide accurate information",
                    detail:
                      "Errors or inconsistencies trigger manual review, which slows down the process. Double-check everything before submitting.",
                  },
                  {
                    step: "Accept the offer promptly",
                    detail:
                      "Once approved, review and accept the loan terms as soon as possible. Delays in acceptance push funding to the next business day.",
                  },
                  {
                    step: "Complete any verification",
                    detail:
                      "Some lenders require phone or email verification. Respond quickly to any verification requests to avoid delays.",
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

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Same Day vs. Next Day Funding
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Factor
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Same Day
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Next Business Day
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Application deadline
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Before ~10:30 AM ET
                      </td>
                      <td className="px-4 py-3 text-gray-600">Anytime</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Availability
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Weekdays only
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Apply anytime
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Lender options
                      </td>
                      <td className="px-4 py-3 text-gray-600">Fewer</td>
                      <td className="px-4 py-3 text-gray-600">More</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Cost
                      </td>
                      <td className="px-4 py-3 text-gray-600">Same</td>
                      <td className="px-4 py-3 text-gray-600">Same</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Most lenders that offer same-day funding also offer next-business-day
                funding as the standard option.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Same Day Loans by Amount
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
                  <p className="mt-1 text-sm text-gray-500">Short-term loans with fast approval</p>
                </Link>
                <Link
                  href="/loans/emergency"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Emergency Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Quick cash for urgent expenses</p>
                </Link>
                <Link
                  href="/loans/bad-credit"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Bad Credit Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Options for all credit types</p>
                </Link>
                <Link
                  href="/loans/installment"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Installment Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Fixed monthly payments over longer terms</p>
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
                  <a href="https://www.consumerfinance.gov/consumer-tools/payday-loans/" target="_blank" rel="noopener noreferrer" className="text-brand underline">CFPB — Payday Loans</a>
                  {" "}<span className="text-gray-500">— Federal guidance on short-term lending rights</span>
                </li>
                <li>
                  <a href="https://consumer.ftc.gov/credit-loans-and-debt" target="_blank" rel="noopener noreferrer" className="text-brand underline">FTC — Borrowing and Credit</a>
                  {" "}<span className="text-gray-500">— Consumer protection tips and scam prevention</span>
                </li>
                <li>
                  <a href="https://www.fdic.gov/consumer-resource-center" target="_blank" rel="noopener noreferrer" className="text-brand underline">FDIC Consumer Assistance</a>
                  {" "}<span className="text-gray-500">— Help with bank-related issues and deposits</span>
                </li>
                <li>
                  <a href="https://www.211.org/" target="_blank" rel="noopener noreferrer" className="text-brand underline">211.org</a>
                  {" "}<span className="text-gray-500">— Local emergency assistance if you need help immediately</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Same Day Loans: FAQ
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
                  Same Day Loans at a Glance
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Amounts</dt>
                    <dd className="font-medium text-gray-900">$100 – $5,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Terms</dt>
                    <dd className="font-medium text-gray-900">
                      2 weeks – 24 months
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Funding</dt>
                    <dd className="font-medium text-gray-900">Same day*</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Credit</dt>
                    <dd className="font-medium text-gray-900">All types</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-gray-400">
                  *For applications approved before ~10:30 AM ET on business days.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
