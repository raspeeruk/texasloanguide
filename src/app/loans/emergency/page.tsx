import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site.config";
import { getPublishedLoanAmounts } from "@/lib/data/loanAmounts";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLUFSummary } from "@/components/content/BLUFSummary";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { QuickApplyWidget } from "@/components/forms/QuickApplyWidget";
import { AuthorByline } from "@/components/content/AuthorByline";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";

export const metadata: Metadata = createMetadata({
  title: "Emergency Loans - Quick Cash for Urgent Expenses",
  description:
    "Compare emergency loan options for unexpected expenses. Medical bills, car repairs, urgent home repairs. Apply in minutes, funds as soon as next business day.",
  path: "/loans/emergency",
});

const faqs = [
  {
    question: "What qualifies as an emergency loan?",
    answer:
      "An emergency loan is any personal loan used to cover an unexpected, urgent expense — medical bills, car repairs, emergency travel, urgent home repairs, or other costs that can't wait until your next paycheck. There is no formal definition; it's about the borrower's need for fast funding.",
  },
  {
    question: "How fast can I get an emergency loan?",
    answer:
      "Many online lenders offer approval decisions within minutes and can deposit funds as soon as the same business day or next business day. For same-day funding, apply early on a weekday (before 10:30 AM ET) with all required documents ready.",
  },
  {
    question: "Do I need good credit for an emergency loan?",
    answer:
      "No. Many emergency loan lenders accept applicants with bad credit or no credit history. They evaluate your income and ability to repay rather than relying solely on credit scores. Expect higher APRs with lower credit scores.",
  },
  {
    question: "How much can I borrow for an emergency?",
    answer:
      "Emergency loan amounts typically range from $100 to $5,000 depending on the lender, your income, and your state. Borrow only what you need to cover the emergency — taking out more means paying more in interest.",
  },
  {
    question: "What if I need money before my next paycheck?",
    answer:
      "Short-term options include payday loans (repaid on your next payday), earned wage access apps (like Earnin or Dave that let you access wages you've already earned), credit card cash advances, or asking your employer for a paycheck advance.",
  },
  {
    question: "Should I use a credit card or an emergency loan?",
    answer:
      "If you have available credit, a credit card is usually cheaper — typical credit card APRs are 20-30% compared to 200%+ for payday loans. However, credit card cash advances carry higher rates and fees than purchases. If you don't have available credit, an emergency loan may be your best option.",
  },
];

export default function EmergencyLoansPage() {
  const amounts = getPublishedLoanAmounts().filter((a) => a.amount <= 5000);

  return (
    <>
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Loans", href: "/loans" },
            { name: "Emergency Loans", href: "/loans/emergency" },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Emergency Loans &mdash; Fast Cash for Urgent Needs
            </h1>

            <BLUFSummary
              amount="$100 – $5,000"
              minApr={36}
              maxApr={664}
              fundingTime="as soon as the next business day"
              badCreditOk={true}
            />

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                When You Need Money Fast
              </h2>
              <p className="mb-4 text-gray-600">
                Financial emergencies don&apos;t wait for convenient timing. Whether
                it&apos;s an unexpected medical bill, a car breakdown, or an urgent
                home repair, you may need access to cash quickly. Emergency loans
                provide a way to cover these expenses and repay over time.
              </p>
              <p className="text-gray-600">
                {siteConfig.name} connects you with lenders who specialize in fast
                approvals and quick funding. Compare multiple offers to find the
                best rates and terms for your situation.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Common Emergency Expenses
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    expense: "Medical bills",
                    typical: "$500 – $3,000",
                    note: "ER visits, prescriptions, dental emergencies",
                  },
                  {
                    expense: "Car repairs",
                    typical: "$300 – $2,500",
                    note: "Engine, transmission, tires, accident damage",
                  },
                  {
                    expense: "Home repairs",
                    typical: "$500 – $5,000",
                    note: "Plumbing, HVAC, roof leaks, appliance replacement",
                  },
                  {
                    expense: "Utility bills",
                    typical: "$200 – $800",
                    note: "Overdue electric, gas, or water bills",
                  },
                  {
                    expense: "Emergency travel",
                    typical: "$300 – $2,000",
                    note: "Family emergency, funeral, urgent relocation",
                  },
                  {
                    expense: "Pet emergencies",
                    typical: "$200 – $3,000",
                    note: "Emergency vet visits, surgery, medication",
                  },
                ].map((item) => (
                  <div
                    key={item.expense}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <p className="font-semibold text-gray-900">
                      {item.expense}
                    </p>
                    <p className="text-sm text-brand">{item.typical}</p>
                    <p className="text-xs text-gray-500">{item.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Emergency Loan Options Compared
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Option
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Speed
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Cost
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Best For
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Payday loan
                      </td>
                      <td className="px-4 py-3 text-gray-600">Same day – 1 day</td>
                      <td className="px-4 py-3 text-gray-600">Highest</td>
                      <td className="px-4 py-3 text-gray-600">
                        Small amounts, fastest funding
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Online installment loan
                      </td>
                      <td className="px-4 py-3 text-gray-600">1 – 2 days</td>
                      <td className="px-4 py-3 text-gray-600">Moderate</td>
                      <td className="px-4 py-3 text-gray-600">
                        Larger amounts, manageable payments
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Credit card cash advance
                      </td>
                      <td className="px-4 py-3 text-gray-600">Instant</td>
                      <td className="px-4 py-3 text-gray-600">Moderate</td>
                      <td className="px-4 py-3 text-gray-600">
                        If you have available credit
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Earned wage access
                      </td>
                      <td className="px-4 py-3 text-gray-600">Instant – 1 day</td>
                      <td className="px-4 py-3 text-gray-600">Lowest</td>
                      <td className="px-4 py-3 text-gray-600">
                        Small amounts from earned wages
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        Credit union PAL
                      </td>
                      <td className="px-4 py-3 text-gray-600">1 – 3 days</td>
                      <td className="px-4 py-3 text-gray-600">Low</td>
                      <td className="px-4 py-3 text-gray-600">
                        Members of federal credit unions
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Before Borrowing: Consider These Steps
              </h2>
              <ul className="space-y-3">
                {[
                  {
                    title: "Negotiate with the provider",
                    desc: "Many hospitals, mechanics, and utility companies offer payment plans. Call and ask before borrowing.",
                  },
                  {
                    title: "Check for assistance programs",
                    desc: "211.org connects you with local assistance for utilities, rent, food, and medical bills. Churches, nonprofits, and government programs may also help.",
                  },
                  {
                    title: "Use your emergency fund",
                    desc: "If you have savings set aside for emergencies, this is exactly what they are for. No interest, no fees.",
                  },
                  {
                    title: "Ask family or friends",
                    desc: "A personal loan from someone you trust is interest-free, though it can affect relationships if not handled carefully.",
                  },
                  {
                    title: "Sell items you don't need",
                    desc: "Facebook Marketplace, Craigslist, or local consignment shops can turn unused items into quick cash.",
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
                Emergency Loans by Amount
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
                  href="/loans/same-day"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Same Day Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Get funds deposited as fast as today</p>
                </Link>
                <Link
                  href="/loans/payday"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Payday Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Short-term loans repaid on your next payday</p>
                </Link>
                <Link
                  href="/loans/bad-credit"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Bad Credit Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Options for borrowers with all credit types</p>
                </Link>
                <Link
                  href="/loans/installment"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Installment Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Manageable payments spread over months</p>
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
                  <a href="https://www.211.org/" target="_blank" rel="noopener noreferrer" className="text-brand underline">211.org</a>
                  {" "}<span className="text-gray-500">— Connect with local assistance for utilities, rent, food, and medical bills</span>
                </li>
                <li>
                  <a href="https://www.consumerfinance.gov/consumer-tools/payday-loans/" target="_blank" rel="noopener noreferrer" className="text-brand underline">CFPB — Payday Loans</a>
                  {" "}<span className="text-gray-500">— Know your rights before borrowing</span>
                </li>
                <li>
                  <a href="https://www.benefits.gov/" target="_blank" rel="noopener noreferrer" className="text-brand underline">Benefits.gov</a>
                  {" "}<span className="text-gray-500">— Find government assistance programs you may qualify for</span>
                </li>
                <li>
                  <a href="https://www.ncua.gov/consumers/financial-literacy-resources" target="_blank" rel="noopener noreferrer" className="text-brand underline">NCUA — Payday Alternative Loans</a>
                  {" "}<span className="text-gray-500">— Lower-cost alternatives from federal credit unions</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Emergency Loans: FAQ
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
                  Emergency Loans at a Glance
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Amounts</dt>
                    <dd className="font-medium text-gray-900">$100 – $5,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Terms</dt>
                    <dd className="font-medium text-gray-900">
                      1 – 24 months
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Funding</dt>
                    <dd className="font-medium text-gray-900">
                      Same day – next day
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Credit</dt>
                    <dd className="font-medium text-gray-900">All types</dd>
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
