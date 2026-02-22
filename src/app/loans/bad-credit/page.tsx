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
  title: "Bad Credit Loans - Compare Options & Apply Online",
  description:
    "Compare bad credit loan options from lenders who consider all credit types. Amounts from $100 to $5,000. No minimum credit score required. Apply in minutes.",
  path: "/loans/bad-credit",
});

const faqs = [
  {
    question: "What credit score is considered bad credit?",
    answer:
      `FICO scores below 580 are generally considered 'poor' credit, while scores between 580 and 669 are 'fair.' Many lenders in ${siteConfig.name}'s network consider applicants with scores below 580 or even those with no credit history at all. Your credit score is just one factor lenders evaluate.`,
  },
  {
    question: "Can I really get a loan with bad credit?",
    answer:
      "Yes. Many lenders specialize in lending to borrowers with bad credit. They evaluate factors beyond your credit score, including your current income, employment stability, existing debts, and banking history. You may receive higher APRs, but approval is possible.",
  },
  {
    question: "Will applying for a bad credit loan hurt my credit score?",
    answer:
      `Submitting your information through ${siteConfig.name} does not affect your credit score. Some lenders perform a soft credit check during pre-qualification, which has no impact. If you proceed with a lender and they perform a hard credit check, that may temporarily lower your score by a few points.`,
  },
  {
    question: "What interest rates can I expect with bad credit?",
    answer:
      "APRs for bad credit loans typically range from 36% to 400%+ depending on the loan type, amount, and your specific financial situation. Smaller, shorter-term loans tend to have higher APRs. Installment loans for bad credit generally have lower APRs than payday loans.",
  },
  {
    question: "How can I improve my chances of approval?",
    answer:
      "To improve your chances: apply with accurate information, demonstrate steady income, reduce existing debts where possible, have an active bank account with regular deposits, consider a co-signer if available, and only borrow what you can afford to repay.",
  },
  {
    question: "Can a bad credit loan help improve my credit score?",
    answer:
      "Yes, if the lender reports to credit bureaus (not all do). Making on-time payments on an installment loan can gradually improve your credit score. Ask the lender whether they report to Equifax, Experian, or TransUnion before accepting.",
  },
];

export default function BadCreditLoansPage() {
  const amounts = getPublishedLoanAmounts().filter((a) => a.amount <= 5000);

  return (
    <>
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Loans", href: "/loans" },
            { name: "Bad Credit Loans", href: "/loans/bad-credit" },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Bad Credit Loans &mdash; Options for All Credit Types
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
                What Are Bad Credit Loans?
              </h2>
              <p className="mb-4 text-gray-600">
                Bad credit loans are lending products designed for borrowers
                whose credit scores fall below what traditional banks require.
                While conventional lenders often require scores of 670+, bad
                credit lenders consider applicants with FICO scores below 580,
                limited credit history, or past financial difficulties such as
                bankruptcy or collections.
              </p>
              <p className="text-gray-600">
                These lenders evaluate your full financial picture — including
                your income, employment, and banking history — rather than
                relying solely on your credit score. The trade-off is typically
                higher interest rates and fees compared to loans available to
                borrowers with good credit.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Types of Bad Credit Loans
              </h2>
              <div className="space-y-4">
                {[
                  {
                    type: "Payday loans",
                    amounts: "$100 – $1,000",
                    terms: "2 – 4 weeks",
                    apr: "200% – 664%",
                    detail:
                      "Short-term loans repaid in a lump sum on your next payday. Easiest approval but highest cost.",
                  },
                  {
                    type: "Installment loans",
                    amounts: "$500 – $5,000",
                    terms: "3 – 24 months",
                    apr: "36% – 199%",
                    detail:
                      "Repaid in fixed monthly payments. More manageable than payday loans with generally lower APRs.",
                  },
                  {
                    type: "Secured loans",
                    amounts: "$100 – $5,000",
                    terms: "1 – 36 months",
                    apr: "15% – 36%",
                    detail:
                      "Backed by collateral (vehicle, savings). Lower rates because the lender has less risk. You risk losing the collateral if you default.",
                  },
                  {
                    type: "Credit-builder loans",
                    amounts: "$300 – $1,000",
                    terms: "6 – 24 months",
                    apr: "5% – 16%",
                    detail:
                      "Designed specifically to build credit. Payments are held in savings and released to you at the end of the term.",
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="rounded-lg border border-gray-200 p-5"
                  >
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {item.type}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">{item.detail}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>Amounts: {item.amounts}</span>
                      <span>Terms: {item.terms}</span>
                      <span>APR: {item.apr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How to Get a Loan with Bad Credit
              </h2>
              <ol className="space-y-3">
                {[
                  "Check your credit score for free through your bank or a service like Credit Karma so you know where you stand.",
                  `Compare options through ${siteConfig.name} to see rates and terms from multiple lenders at once.`,
                  "Only borrow what you need and can realistically repay. Overborrowing leads to debt cycles.",
                  "Review the full loan terms including APR, fees, total repayment amount, and due dates before accepting.",
                  "Make payments on time to avoid additional fees and to begin building a positive credit history.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-gray-600">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Tips for Borrowing with Bad Credit
              </h2>
              <ul className="space-y-3">
                {[
                  {
                    title: "Compare multiple offers",
                    desc: "Rates and terms can vary dramatically between lenders. Always compare at least 3 options before committing.",
                  },
                  {
                    title: "Watch for predatory lenders",
                    desc: "Avoid lenders that guarantee approval regardless of circumstances, charge upfront fees before disbursing funds, or pressure you to borrow more than you need.",
                  },
                  {
                    title: "Choose installment over lump-sum",
                    desc: "Installment loans let you spread repayment over months, making it easier to manage your budget compared to a payday loan due in 2 weeks.",
                  },
                  {
                    title: "Read the fine print",
                    desc: "Look for origination fees, prepayment penalties, and late payment fees. These can significantly increase the total cost of your loan.",
                  },
                  {
                    title: "Use it to build credit",
                    desc: "Ask if the lender reports to credit bureaus. On-time payments on a reported loan can help rebuild your credit over time.",
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

            {/* Browse by amount */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Bad Credit Loans by Amount
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
                  <p className="mt-1 text-sm text-gray-500">Short-term loans repaid on your next payday</p>
                </Link>
                <Link
                  href="/loans/no-credit-check"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">No Credit Check Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Apply without a hard inquiry on your credit report</p>
                </Link>
                <Link
                  href="/loans/installment"
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:border-brand-light hover:shadow-sm"
                >
                  <p className="font-semibold text-gray-900">Installment Loans</p>
                  <p className="mt-1 text-sm text-gray-500">Fixed monthly payments over longer terms</p>
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
                  <a href="https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/" target="_blank" rel="noopener noreferrer" className="text-brand underline">CFPB — Credit Reports and Scores</a>
                  {" "}<span className="text-gray-500">— Understand your credit report and how to dispute errors</span>
                </li>
                <li>
                  <a href="https://www.annualcreditreport.com/" target="_blank" rel="noopener noreferrer" className="text-brand underline">AnnualCreditReport.com</a>
                  {" "}<span className="text-gray-500">— Get your free annual credit report from all three bureaus</span>
                </li>
                <li>
                  <a href="https://www.myfico.com/credit-education/credit-scores" target="_blank" rel="noopener noreferrer" className="text-brand underline">myFICO — Understanding Credit Scores</a>
                  {" "}<span className="text-gray-500">— Learn how FICO scores work and what affects them</span>
                </li>
                <li>
                  <a href="https://consumer.ftc.gov/credit-loans-and-debt" target="_blank" rel="noopener noreferrer" className="text-brand underline">FTC — Borrowing and Credit</a>
                  {" "}<span className="text-gray-500">— Federal guidance on avoiding lending scams</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Bad Credit Loans: FAQ
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
                  Bad Credit Loans at a Glance
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Amounts</dt>
                    <dd className="font-medium text-gray-900">$100 – $5,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Terms</dt>
                    <dd className="font-medium text-gray-900">2 weeks – 24 months</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">APR Range</dt>
                    <dd className="font-medium text-gray-900">36% – 664%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Min Credit Score</dt>
                    <dd className="font-medium text-gray-900">None</dd>
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
