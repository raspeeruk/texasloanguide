import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLoanAmountBySlug,
  getPublishedLoanAmountSlugs,
  calculateRepayment,
} from "@/lib/data/loanAmounts";
import { getSiteStates, getPaydayLegalStates } from "@/lib/data/states";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site.config";
import { LoanSchema } from "@/components/seo/LoanSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLUFSummary } from "@/components/content/BLUFSummary";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { QuickApplyWidget } from "@/components/forms/QuickApplyWidget";
import { AuthorByline } from "@/components/content/AuthorByline";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";

interface Props {
  params: Promise<{ amount: string }>;
}

export async function generateStaticParams() {
  return getPublishedLoanAmountSlugs().map((slug) => ({ amount: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount } = await params;
  const loan = getLoanAmountBySlug(amount);
  if (!loan) return {};

  return createMetadata({
    title: `${loan.displayAmount} Loans - Apply Online Today`,
    description: `Compare ${loan.displayAmount} loan options from multiple lenders. APRs from ${loan.minApr}% to ${loan.maxApr}%. Bad credit OK. Apply in minutes, funds as soon as same day.`,
    path: `/borrow/${loan.slug}/`,
  });
}

export default async function LoanAmountPage({ params }: Props) {
  const { amount } = await params;
  const loan = getLoanAmountBySlug(amount);
  if (!loan) notFound();

  const legalStates = getPaydayLegalStates();
  const allStates = getSiteStates();

  // Calculate repayment examples
  const lowExample = calculateRepayment(loan.amount, loan.minApr, loan.minTermMonths);
  const midApr = Math.round((loan.minApr + loan.maxApr) / 2);
  const midTerm = Math.round((loan.minTermMonths + loan.maxTermMonths) / 2);
  const midExample = calculateRepayment(loan.amount, midApr, midTerm);
  const highExample = calculateRepayment(loan.amount, loan.maxApr, loan.maxTermMonths);

  const faqs = [
    {
      question: `Can I get a ${loan.displayAmount} loan with bad credit?`,
      answer: `Yes, many lenders in ${siteConfig.name}'s network consider applicants with bad credit or no credit history for ${loan.displayAmount} loans. Approval depends on factors beyond credit score, including income and employment status. APRs may be higher for borrowers with lower credit scores.`,
    },
    {
      question: `How fast can I get a ${loan.displayAmount} loan?`,
      answer: `Many lenders can provide approval decisions within minutes. If approved, funds are typically deposited into your bank account as soon as the next business day. Some lenders offer same-day funding for applications completed early in the day.`,
    },
    {
      question: `What are the requirements for a ${loan.displayAmount} loan?`,
      answer: `Requirements vary by lender but typically include: being at least 18 years old, having a regular source of income, having an active bank account, and being a US citizen or permanent resident. Some lenders may have minimum income requirements.`,
    },
    {
      question: `How much does a ${loan.displayAmount} loan cost?`,
      answer: `The total cost depends on the APR and repayment term. For example, a ${loan.displayAmount} loan at ${midApr}% APR over ${midTerm} months would cost approximately $${midExample.totalCost.toLocaleString()} in total ($${midExample.monthlyPayment.toLocaleString()}/month). Always review the full terms before accepting any loan offer.`,
    },
    {
      question: `What can I use a ${loan.displayAmount} loan for?`,
      answer: `You can use a ${loan.displayAmount} loan for almost any purpose, including emergency expenses, medical bills, car repairs, utility payments, debt consolidation, or other unexpected costs. The lender typically does not restrict how you use the funds.`,
    },
    {
      question: `Is it safe to apply for a ${loan.displayAmount} loan online?`,
      answer: `Yes, applying through ${siteConfig.name} is safe. We use 256-bit SSL encryption to protect your information. We only connect you with licensed lenders who comply with federal and state regulations. Your information is never sold to third parties without your consent.`,
    },
  ];

  return (
    <>
      <LoanSchema
        amount={loan.amount}
        displayAmount={loan.displayAmount}
        minApr={loan.minApr}
        maxApr={loan.maxApr}
        minTermMonths={loan.minTermMonths}
        maxTermMonths={loan.maxTermMonths}
      />
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Borrow", href: "/borrow" },
            { name: `${loan.displayAmount} Loan`, href: `/borrow/${loan.slug}` },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {loan.displayAmount} Loans &mdash; Compare Options &amp; Apply
              Online
            </h1>

            <BLUFSummary
              amount={loan.displayAmount}
              minApr={loan.minApr}
              maxApr={loan.maxApr}
              fundingTime="as soon as the next business day"
              badCreditOk={true}
            />

            {/* How It Works */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How {loan.displayAmount} Loans Work
              </h2>
              <p className="mb-4 text-gray-600">
                Getting a {loan.displayAmount} loan through {siteConfig.name} is a
                straightforward process. We connect you with multiple lenders so
                you can compare offers and choose the best option for your
                situation.
              </p>
              <ol className="space-y-4">
                {[
                  {
                    step: "Submit your information",
                    detail:
                      "Complete a simple form with basic details about yourself and your financial situation. This takes just a few minutes.",
                  },
                  {
                    step: "Get matched with lenders",
                    detail: `Our network of lenders will review your information and provide ${loan.displayAmount} loan offers tailored to your profile.`,
                  },
                  {
                    step: "Compare and choose",
                    detail:
                      "Review the rates, terms, and fees from each lender. Choose the offer that works best for your needs and budget.",
                  },
                  {
                    step: "Receive your funds",
                    detail:
                      "Once you accept an offer and complete the lender's process, funds are typically deposited into your bank account as soon as the next business day.",
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

            {/* Costs and Fees */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {loan.displayAmount} Loan Costs &amp; Fees
              </h2>
              <p className="mb-4 text-gray-600">
                The total cost of a {loan.displayAmount} loan depends on the
                annual percentage rate (APR) and repayment term. Below are
                representative examples to help you understand potential costs.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        APR
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Term
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Monthly Payment
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Total Cost
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-900">
                        Total Interest
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { label: "Low", apr: loan.minApr, term: loan.minTermMonths, ...lowExample },
                      { label: "Mid", apr: midApr, term: midTerm, ...midExample },
                      { label: "High", apr: loan.maxApr, term: loan.maxTermMonths, ...highExample },
                    ].map((row) => (
                      <tr key={row.label}>
                        <td className="px-4 py-3">{row.apr}%</td>
                        <td className="px-4 py-3">{row.term} months</td>
                        <td className="px-4 py-3">
                          ${row.monthlyPayment.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          ${row.totalCost.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          ${row.totalInterest.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Representative examples only. Actual rates and terms will vary
                based on your credit profile, income, and the lender&apos;s criteria.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Eligibility Requirements
              </h2>
              <p className="mb-4 text-gray-600">
                While requirements vary by lender, most {loan.displayAmount}{" "}
                loan providers look for the following:
              </p>
              <ul className="space-y-2">
                {[
                  "Be at least 18 years old (19 in Alabama and Nebraska)",
                  "Be a US citizen or permanent resident",
                  "Have a regular source of income",
                  "Have an active checking or savings account",
                  "Provide a valid email address and phone number",
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="mt-0.5 text-brand-accent">&#10003;</span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Alternatives */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Alternatives to a {loan.displayAmount} Loan
              </h2>
              <p className="mb-4 text-gray-600">
                Before borrowing, consider whether these alternatives might work
                for your situation:
              </p>
              <ul className="space-y-3">
                {[
                  {
                    title: "Credit union loans",
                    desc: "Many credit unions offer small-dollar loans with much lower rates than online lenders. Check with your local credit union.",
                  },
                  {
                    title: "Payment plans",
                    desc: "If you owe a specific bill, contact the provider to ask about payment plan options before taking out a loan.",
                  },
                  {
                    title: "Credit card cash advance",
                    desc: "If you have available credit, a cash advance may be cheaper than a high-APR loan, though fees still apply.",
                  },
                  {
                    title: "Borrow from family or friends",
                    desc: "A personal loan from someone you trust may come with no interest, though it can strain relationships.",
                  },
                  {
                    title: "Earned wage access apps",
                    desc: "Apps like Earnin or Dave let you access wages you've already earned before payday, often with minimal fees.",
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

            {/* Loan Types */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {loan.displayAmount} Loan Types Available
              </h2>
              <p className="mb-4 text-gray-600">
                Depending on your state and credit profile, you may qualify for
                different types of {loan.displayAmount} loans:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: "Payday Loans", href: "/loans/payday", desc: "Short-term, repaid on your next payday" },
                  { name: "Installment Loans", href: "/loans/installment", desc: "Fixed monthly payments over 3-24 months" },
                  { name: "Bad Credit Loans", href: "/loans/bad-credit", desc: "Options for all credit backgrounds" },
                  { name: "Same Day Loans", href: "/loans/same-day", desc: "Fast funding, often same business day" },
                  { name: "Emergency Loans", href: "/loans/emergency", desc: "For urgent, unexpected expenses" },
                  { name: "No Credit Check Loans", href: "/loans/no-credit-check", desc: "Lenders using alternative data" },
                ].map((type) => (
                  <Link
                    key={type.href}
                    href={type.href}
                    className="rounded-lg border border-gray-200 p-3 transition-colors hover:border-brand-light hover:bg-brand-lighter/50"
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {type.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {type.desc}
                    </span>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Use our{" "}
                <Link
                  href="/calculator"
                  className="text-brand underline"
                >
                  loan repayment calculator
                </Link>{" "}
                to estimate costs for different loan types and terms, or read
                our{" "}
                <Link
                  href="/guides/understanding-apr-small-dollar-loans"
                  className="text-brand underline"
                >
                  guide to understanding APR
                </Link>{" "}
                to compare offers effectively.
              </p>
            </section>

            {/* Consumer Resources */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Consumer Resources
              </h2>
              <p className="mb-3 text-gray-600">
                Before borrowing, review these resources from federal consumer
                protection agencies:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="https://www.consumerfinance.gov/consumer-tools/payday-loans/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline"
                  >
                    CFPB Payday Loan Resources
                  </a>{" "}
                  &mdash; Federal guidance on short-term borrowing
                </li>
                <li>
                  <a
                    href="https://consumer.ftc.gov/credit-loans-and-debt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline"
                  >
                    FTC Borrowing &amp; Credit Advice
                  </a>{" "}
                  &mdash; Consumer protection tips and scam warnings
                </li>
                <li>
                  <a
                    href="https://www.annualcreditreport.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline"
                  >
                    AnnualCreditReport.com
                  </a>{" "}
                  &mdash; Check your credit reports for free before applying
                </li>
              </ul>
            </section>

            {/* State Availability */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {loan.displayAmount} Loans by State
              </h2>
              <p className="mb-4 text-gray-600">
                Loan availability and regulations vary by state. Select your
                state to see specific rates, terms, and legal requirements for{" "}
                {loan.displayAmount} loans in your area.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {allStates
                  .filter((s) => s.abbreviation !== "DC")
                  .map((state) => (
                    <Link
                      key={state.slug}
                      href={`/borrow/${loan.slug}/${state.slug}`}
                      className="rounded border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-brand-light hover:bg-brand-lighter hover:text-brand"
                    >
                      {state.name}
                    </Link>
                  ))}
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Short-term lending is available in{" "}
                <strong>{legalStates.length} states</strong> where it is
                regulated by state law.
              </p>
            </section>

            {/* FAQs */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Frequently Asked Questions
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

          {/* Sidebar */}
          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-8">
              <QuickApplyWidget
                amount={loan.amount.toString()}
              />

              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  {loan.displayAmount} Loan at a Glance
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Loan Amount</dt>
                    <dd className="font-medium text-gray-900">
                      {loan.displayAmount}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">APR Range</dt>
                    <dd className="font-medium text-gray-900">
                      {loan.minApr}% &ndash; {loan.maxApr}%
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Term</dt>
                    <dd className="font-medium text-gray-900">
                      {loan.minTermMonths} &ndash; {loan.maxTermMonths} months
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Funding Speed</dt>
                    <dd className="font-medium text-gray-900">
                      As fast as next day
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Credit Required</dt>
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
