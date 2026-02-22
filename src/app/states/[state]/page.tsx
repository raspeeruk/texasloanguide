import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getStateBySlug,
  getPublishedStateSlugs,
  formatApr,
  formatCurrency,
} from "@/lib/data/states";
import { getPublishedLoanAmounts } from "@/lib/data/loanAmounts";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { QuickApplyWidget } from "@/components/forms/QuickApplyWidget";
import { AuthorByline } from "@/components/content/AuthorByline";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return getPublishedStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return {};

  return createMetadata({
    title: `Loans in ${state.name} - Rates, Regulations & How to Apply`,
    description: `Compare loan options in ${state.name}. ${state.paydayLegal ? `Payday loans legal. Max APR: ${formatApr(state.maxApr)}.` : "Payday loans prohibited."} See ${state.name} lending regulations and apply online.`,
    path: `/states/${state.slug}`,
  });
}

export default async function StateHubPage({ params }: Props) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const loanAmounts = getPublishedLoanAmounts();

  const faqs = [
    {
      question: `Are payday loans legal in ${state.name}?`,
      answer: state.paydayLegal
        ? `Yes, payday loans are legal and regulated in ${state.name}. The ${state.regulatorName} oversees lender licensing and enforces consumer protections.${state.maxLoanAmount ? ` The maximum payday loan amount is ${formatCurrency(state.maxLoanAmount)}.` : ""}${state.maxApr ? ` The maximum APR is ${state.maxApr}%.` : ""}`
        : `No, payday loans are prohibited in ${state.name}. The state's usury laws and lending regulations effectively ban high-cost, short-term payday lending. However, ${state.name} residents can still access personal installment loans from licensed online lenders.`,
    },
    {
      question: `What is the maximum loan amount in ${state.name}?`,
      answer: state.maxLoanAmount
        ? `${state.name} caps payday loan amounts at ${formatCurrency(state.maxLoanAmount)}. For larger amounts, you would need to apply for a personal installment loan, which is governed by different regulations.`
        : state.paydayLegal
          ? `${state.name} does not set a specific maximum loan amount for payday loans. However, individual lenders may have their own limits based on your income and ability to repay.`
          : `Since payday loans are not available in ${state.name}, loan amounts for personal installment loans vary by lender and depend on your creditworthiness, income, and the lender's policies.`,
    },
    {
      question: `What are the interest rate caps in ${state.name}?`,
      answer: state.maxApr
        ? `${state.name} caps the APR on short-term loans at ${state.maxApr}%.${state.maxFeePerHundred ? ` The maximum fee is $${state.maxFeePerHundred} per $100 borrowed.` : ""} These caps are enforced by the ${state.regulatorName}.`
        : state.paydayLegal
          ? `${state.name} does not impose a specific APR cap on short-term loans, meaning interest rates can vary widely between lenders. This makes it particularly important to compare offers from multiple lenders before accepting.`
          : `${state.name} prohibits payday lending. Rates for available loan products are governed by the state's general usury laws and consumer protection statutes.`,
    },
    {
      question: `How do I file a complaint against a lender in ${state.name}?`,
      answer: `To file a complaint against a lender operating in ${state.name}, contact the ${state.regulatorName} at ${state.regulatorUrl}. You can also file a federal complaint with the Consumer Financial Protection Bureau (CFPB) at consumerfinance.gov. Document all communication with the lender and keep copies of your loan agreement.`,
    },
    {
      question: `What alternatives are available in ${state.name}?`,
      answer: `${state.name} residents have several alternatives to payday loans: credit union payday alternative loans (PALs) capped at 28% APR, personal installment loans from online lenders, earned wage access apps (Earnin, Dave), credit card cash advances, employer paycheck advances, and local emergency assistance programs through 211.org.`,
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "States", href: "/states" },
            { name: state.name, href: `/states/${state.slug}` },
          ]}
        />

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Loans in {state.name} ({state.abbreviation})
            </h1>

            <p className="mb-6 text-lg text-gray-600">
              {state.paydayLegal
                ? `${state.name} allows payday lending under state regulation. Short-term loans are available from licensed lenders with consumer protections enforced by the ${state.regulatorName}.`
                : `${state.name} prohibits traditional payday lending. However, residents can access personal installment loans from licensed online lenders with regulated terms and rates.`}
            </p>

            {/* Regulation summary */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {state.name} Lending Regulations
              </h2>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
                        Payday Lending
                      </td>
                      <td className="px-4 py-3">
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
                          {formatCurrency(state.maxLoanAmount)}
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
                          Rollovers
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {state.rolloverAllowed ? "Allowed" : "Not allowed"}
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
                Source: {state.regulatorName}. Information current as of February
                2026.
              </p>
            </section>

            {/* Economic context */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {state.name} Economic Overview
              </h2>
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
                      ? "Above national median ($74,580)"
                      : state.medianIncome > 55000
                        ? "Near national median ($74,580)"
                        : "Below national median ($74,580)"}
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
            </section>

            {/* Loan amounts */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Loan Amounts Available in {state.name}
              </h2>
              <p className="mb-4 text-gray-600">
                Compare loan options by amount for {state.name} residents. Click
                an amount to see rates, costs, and {state.name}-specific
                regulations.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {loanAmounts.map((loan) => (
                  <Link
                    key={loan.slug}
                    href={`/borrow/${loan.slug}/${state.slug}`}
                    className="rounded border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-600 transition-colors hover:border-brand-light hover:bg-brand-lighter hover:text-brand"
                  >
                    {loan.displayAmount}
                  </Link>
                ))}
              </div>
            </section>

            {/* Loan types */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Loan Types in {state.name}
              </h2>
              <div className="space-y-3">
                {[
                  {
                    type: "Payday Loans",
                    href: "/loans/payday",
                    available: state.paydayLegal,
                    note: state.paydayLegal
                      ? `Legal in ${state.name}${state.maxLoanAmount ? ` up to ${formatCurrency(state.maxLoanAmount)}` : ""}`
                      : `Prohibited in ${state.name}`,
                  },
                  {
                    type: "Installment Loans",
                    href: "/loans/installment",
                    available: true,
                    note: `Available in ${state.name} from licensed online lenders`,
                  },
                  {
                    type: "Bad Credit Loans",
                    href: "/loans/bad-credit",
                    available: true,
                    note: `Multiple options for ${state.name} residents with poor credit`,
                  },
                  {
                    type: "Emergency Loans",
                    href: "/loans/emergency",
                    available: true,
                    note: "Fast funding for urgent expenses",
                  },
                ].map((item) => (
                  <Link
                    key={item.type}
                    href={item.href}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:border-brand-light"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.note}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.available ? "bg-brand-lighter text-brand" : "bg-red-50 text-red-600"}`}
                    >
                      {item.available ? "Available" : "Not available"}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Loans in {state.name}: FAQ
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
              <QuickApplyWidget state={state.abbreviation} />

              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  {state.name} at a Glance
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Payday Legal</dt>
                    <dd className="font-medium text-gray-900">
                      {state.paydayLegal ? "Yes" : "No"}
                    </dd>
                  </div>
                  {state.maxLoanAmount !== null && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Max Amount</dt>
                      <dd className="font-medium text-gray-900">
                        {formatCurrency(state.maxLoanAmount)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Max APR</dt>
                    <dd className="font-medium text-gray-900">
                      {formatApr(state.maxApr)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Median Income</dt>
                    <dd className="font-medium text-gray-900">
                      ${state.medianIncome.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Cost of Living</dt>
                    <dd className="font-medium text-gray-900">
                      {state.costOfLivingIndex}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 rounded-lg border border-gray-200 p-5">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  State Regulator
                </h3>
                <a
                  href={state.regulatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand underline"
                >
                  {state.regulatorName}
                </a>
                <p className="mt-2 text-xs text-gray-400">
                  Verify lender licenses and file complaints.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
