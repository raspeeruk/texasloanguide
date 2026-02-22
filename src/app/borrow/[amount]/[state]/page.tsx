import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLoanAmountBySlug,
  getPublishedLoanAmountSlugs,
  calculateRepayment,
} from "@/lib/data/loanAmounts";
import {
  getStateBySlug,
  getSiteStateSlugs,
  formatApr,
  formatCurrency as formatStateCurrency,
} from "@/lib/data/states";
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
  params: Promise<{ amount: string; state: string }>;
}

export async function generateStaticParams() {
  const amounts = getPublishedLoanAmountSlugs();
  const states = getSiteStateSlugs();

  return amounts.flatMap((amount) =>
    states.map((state) => ({ amount, state }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount, state: stateSlug } = await params;
  const loan = getLoanAmountBySlug(amount);
  const state = getStateBySlug(stateSlug);
  if (!loan || !state) return {};

  return createMetadata({
    title: `${loan.displayAmount} Loans in ${state.name} - Rates, Rules & How to Apply`,
    description: `Compare ${loan.displayAmount} loan options in ${state.name}. ${state.paydayLegal ? `Max APR: ${formatApr(state.maxApr)}.` : "Payday lending is prohibited."} See ${state.name} regulations, eligibility, and apply online.`,
    path: `/borrow/${loan.slug}/${state.slug}`,
  });
}

export default async function LoanAmountStatePage({ params }: Props) {
  const { amount, state: stateSlug } = await params;
  const loan = getLoanAmountBySlug(amount);
  const state = getStateBySlug(stateSlug);
  if (!loan || !state) notFound();

  const midApr = Math.round((loan.minApr + loan.maxApr) / 2);
  const midTerm = Math.round((loan.minTermMonths + loan.maxTermMonths) / 2);
  const midExample = calculateRepayment(loan.amount, midApr, midTerm);

  // State-specific APR — use state cap if available and lower than general max
  const effectiveMaxApr =
    state.maxApr !== null && state.maxApr < loan.maxApr
      ? state.maxApr
      : loan.maxApr;

  // Check if the amount exceeds state max
  const exceedsStateMax =
    state.maxLoanAmount !== null && loan.amount > state.maxLoanAmount;

  const faqs = [
    {
      question: `Is a ${loan.displayAmount} ${state.paydayLegal ? "payday" : ""} loan legal in ${state.name}?`,
      answer: state.paydayLegal
        ? `Yes, short-term lending is legal in ${state.name}. The state regulates these loans through the ${state.regulatorName}.${state.maxLoanAmount ? ` The maximum loan amount is ${formatStateCurrency(state.maxLoanAmount)}.` : ""}${state.maxApr ? ` The maximum APR is ${state.maxApr}%.` : ""}`
        : `Payday lending is prohibited in ${state.name}. However, you may still be eligible for personal installment loans from licensed lenders. These loans typically have lower APRs and longer repayment terms.`,
    },
    {
      question: `What is the maximum APR for a ${loan.displayAmount} loan in ${state.name}?`,
      answer: state.maxApr !== null
        ? `${state.name} caps the APR on short-term loans at ${state.maxApr}%.${state.maxFeePerHundred !== null ? ` The maximum fee is $${state.maxFeePerHundred} per $100 borrowed.` : ""} Always review the full terms of any loan offer before accepting.`
        : state.paydayLegal
          ? `${state.name} does not impose a specific APR cap on short-term loans. This means rates can vary significantly between lenders. It is especially important to compare offers from multiple lenders in ${state.name}.`
          : `Since payday lending is prohibited in ${state.name}, APR caps vary by loan type. Personal installment loans are subject to the state's usury laws.`,
    },
    {
      question: `How quickly can I get a ${loan.displayAmount} loan in ${state.name}?`,
      answer: `Many online lenders can provide approval decisions within minutes for ${state.name} residents. If approved, funds are typically deposited into your bank account as soon as the next business day. Some lenders offer same-day funding for applications completed early in the day.`,
    },
    {
      question: `Can I get a ${loan.displayAmount} loan in ${state.name} with bad credit?`,
      answer: `Yes, many lenders in ${siteConfig.name}'s network consider ${state.name} applicants with bad credit or no credit history. Lenders look at factors beyond your credit score, including your income and employment status. APRs may be higher for borrowers with lower credit scores.`,
    },
    {
      question: `Where can I file a complaint about a lender in ${state.name}?`,
      answer: `If you have a complaint about a lender operating in ${state.name}, contact the ${state.regulatorName}. You can also file a complaint with the Consumer Financial Protection Bureau (CFPB) at consumerfinance.gov.`,
    },
    {
      question: `What happens if I can't repay a ${loan.displayAmount} loan in ${state.name}?`,
      answer: `Contact your lender immediately if you are unable to make a payment. Many lenders offer payment plans or extensions.${state.rolloverAllowed === true ? ` ${state.name} allows loan rollovers, though this will increase the total cost of borrowing.` : state.rolloverAllowed === false ? ` ${state.name} does not allow loan rollovers, which helps prevent debt cycles.` : ""}${state.coolingOffPeriod ? ` ${state.name} requires a cooling-off period of ${state.coolingOffPeriod} between loans.` : ""} You also have the right to file a complaint with the ${state.regulatorName}.`,
    },
  ];

  return (
    <>
      <LoanSchema
        amount={loan.amount}
        displayAmount={loan.displayAmount}
        minApr={loan.minApr}
        maxApr={effectiveMaxApr}
        minTermMonths={loan.minTermMonths}
        maxTermMonths={loan.maxTermMonths}
        state={state.name}
      />
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Borrow", href: "/borrow" },
            {
              name: `${loan.displayAmount} Loan`,
              href: `/borrow/${loan.slug}`,
            },
            {
              name: state.name,
              href: `/borrow/${loan.slug}/${state.slug}`,
            },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {loan.displayAmount} Loans in {state.name} ({state.abbreviation})
            </h1>

            <BLUFSummary
              amount={loan.displayAmount}
              minApr={loan.minApr}
              maxApr={effectiveMaxApr}
              fundingTime="as soon as the next business day"
              badCreditOk={true}
            />

            {/* State warning if payday not legal */}
            {!state.paydayLegal && (
              <div className="mb-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
                <p className="font-semibold text-amber-800">
                  Payday Lending Not Available in {state.name}
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  {state.name} prohibits payday lending. However, residents may
                  still qualify for personal installment loans from licensed
                  online lenders with longer repayment terms and lower APRs.
                </p>
              </div>
            )}

            {/* State exceeded warning */}
            {exceedsStateMax && state.paydayLegal && (
              <div className="mb-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
                <p className="font-semibold text-amber-800">
                  Amount Exceeds {state.name} Payday Loan Limit
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  {state.name} limits payday loans to{" "}
                  {formatStateCurrency(state.maxLoanAmount)}. A{" "}
                  {loan.displayAmount} loan in {state.name} would need to be
                  structured as an installment loan, which typically comes with
                  lower APRs and longer repayment terms.
                </p>
              </div>
            )}

            {/* State Regulations */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {state.name} Loan Regulations
              </h2>
              <p className="mb-4 text-gray-600">
                {state.paydayLegal
                  ? `Short-term lending is legal and regulated in ${state.name}. The ${state.regulatorName} oversees lender licensing and consumer protections.`
                  : `${state.name} prohibits traditional payday lending to protect consumers from high-cost short-term debt. Personal loans and installment loans from licensed lenders are available as alternatives.`}
              </p>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                        Payday Lending Status
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {state.paydayLegal ? (
                          <span className="font-medium text-brand">
                            Legal &amp; Regulated
                          </span>
                        ) : (
                          <span className="font-medium text-red-600">
                            Prohibited
                          </span>
                        )}
                      </td>
                    </tr>
                    {state.maxLoanAmount !== null && (
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                          Maximum Loan Amount
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {formatStateCurrency(state.maxLoanAmount)}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                        Maximum APR
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {formatApr(state.maxApr)}
                      </td>
                    </tr>
                    {state.maxFeePerHundred !== null && (
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                          Max Fee per $100
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          ${state.maxFeePerHundred}
                        </td>
                      </tr>
                    )}
                    {(state.minTermDays !== null ||
                      state.maxTermDays !== null) && (
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                          Loan Term
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {state.minTermDays !== null &&
                          state.maxTermDays !== null
                            ? `${state.minTermDays} – ${state.maxTermDays} days`
                            : state.minTermDays !== null
                              ? `Minimum ${state.minTermDays} days`
                              : `Maximum ${state.maxTermDays} days`}
                        </td>
                      </tr>
                    )}
                    {state.coolingOffPeriod !== null && (
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                          Cooling-Off Period
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {state.coolingOffPeriod}
                        </td>
                      </tr>
                    )}
                    {state.rolloverAllowed !== null && (
                      <tr>
                        <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                          Rollovers Allowed
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {state.rolloverAllowed ? "Yes" : "No"}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                        State Regulator
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={state.regulatorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand underline"
                        >
                          {state.regulatorName}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Source: {state.regulatorName}. Information current as of
                February 2026. Regulations may change; verify with the state
                regulator for the most up-to-date requirements.
              </p>
            </section>

            {/* Cost in this state */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                What Does a {loan.displayAmount} Loan Cost in {state.name}?
              </h2>
              <p className="mb-4 text-gray-600">
                The cost of a {loan.displayAmount} loan in {state.name} depends
                on the APR, fees, and repayment term offered by the lender.
                {state.maxApr !== null
                  ? ` ${state.name} caps the APR at ${state.maxApr}%, which limits the maximum cost.`
                  : ` ${state.name} does not cap the APR, so rates can vary widely between lenders.`}
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        apr: loan.minApr,
                        term: loan.minTermMonths,
                      },
                      { apr: midApr, term: midTerm },
                      {
                        apr: effectiveMaxApr,
                        term: loan.maxTermMonths,
                      },
                    ].map((row, i) => {
                      const calc = calculateRepayment(
                        loan.amount,
                        row.apr,
                        row.term
                      );
                      return (
                        <tr key={i}>
                          <td className="px-4 py-3">{row.apr}%</td>
                          <td className="px-4 py-3">{row.term} months</td>
                          <td className="px-4 py-3">
                            ${calc.monthlyPayment.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            ${calc.totalCost.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Representative examples. Actual rates depend on your credit
                profile, income, and the lender&apos;s criteria.
                {state.maxApr !== null &&
                  ` APRs above ${state.maxApr}% are not permitted in ${state.name}.`}
              </p>
            </section>

            {/* Local economic context */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Borrowing Context in {state.name}
              </h2>
              <p className="mb-4 text-gray-600">
                Understanding the local economic landscape can help you make
                informed borrowing decisions. Here is how {state.name} compares:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-500">
                    Median Household Income
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${state.medianIncome.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {state.medianIncome > 70000
                      ? "Above national median"
                      : state.medianIncome > 55000
                        ? "Near national median"
                        : "Below national median"}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-sm text-gray-500">Cost of Living Index</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {state.costOfLivingIndex}
                  </p>
                  <p className="text-xs text-gray-400">
                    {state.costOfLivingIndex > 110
                      ? "Above national average (100)"
                      : state.costOfLivingIndex > 95
                        ? "Near national average (100)"
                        : "Below national average (100)"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                A {loan.displayAmount} loan represents approximately{" "}
                {((loan.amount / state.medianIncome) * 100).toFixed(1)}% of the
                median annual household income in {state.name}. Consider
                whether the monthly payments fit comfortably within your budget
                before borrowing.
              </p>
            </section>

            {/* How to apply */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How to Apply for a {loan.displayAmount} Loan in {state.name}
              </h2>
              <ol className="space-y-3">
                {[
                  `Check your eligibility — you must be at least 18 years old${state.abbreviation === "AL" || state.abbreviation === "NE" ? " (19 in " + state.name + ")" : ""} and a ${state.name} resident.`,
                  `Compare your options on ${siteConfig.name} to understand the rates, terms, and fees available to you.`,
                  "Complete the application form with your personal and financial information.",
                  "Review any loan offer carefully, including the APR, total cost, and repayment schedule.",
                  "Accept the offer that works best for your situation. Funds can be deposited as soon as the next business day.",
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

            {/* Other amounts in this state */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Other Loan Amounts in {state.name}
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {[100, 300, 500, 750, 1000, 1500, 2000, 5000].map((amt) => {
                  if (amt === loan.amount) return null;
                  const slug = `${amt}-dollar-loan`;
                  const display =
                    amt >= 1000
                      ? `$${(amt / 1000).toLocaleString()},000`
                      : `$${amt}`;
                  return (
                    <Link
                      key={amt}
                      href={`/borrow/${slug}/${state.slug}`}
                      className="rounded border border-gray-200 px-3 py-2 text-center text-sm text-gray-600 transition-colors hover:border-brand-light hover:bg-brand-lighter hover:text-brand"
                    >
                      {display}
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {loan.displayAmount} Loans in {state.name}: FAQ
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
                state={state.abbreviation}
              />

              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  {loan.displayAmount} Loan in {state.abbreviation}
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
                      {loan.minApr}% &ndash; {effectiveMaxApr}%
                    </dd>
                  </div>
                  {state.maxLoanAmount !== null && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">State Max</dt>
                      <dd className="font-medium text-gray-900">
                        {formatStateCurrency(state.maxLoanAmount)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Funding Speed</dt>
                    <dd className="font-medium text-gray-900">
                      As fast as next day
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Payday Legal</dt>
                    <dd className="font-medium text-gray-900">
                      {state.paydayLegal ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  {state.name} Regulator
                </h3>
                <p className="text-sm text-gray-600">
                  <a
                    href={state.regulatorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline"
                  >
                    {state.regulatorName}
                  </a>
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  File complaints or verify lender licenses through your state
                  regulator.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
