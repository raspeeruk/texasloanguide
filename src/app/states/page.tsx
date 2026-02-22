import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { getAllStates } from "@/lib/data/states";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Loan Regulations by State",
  description:
    "Browse payday loan and personal loan regulations for all 50 US states. See APR caps, maximum loan amounts, and lending rules for your state.",
  path: "/states",
});

export default function StatesPage() {
  const states = getAllStates().filter((s) => s.abbreviation !== "DC");
  const legalCount = states.filter((s) => s.paydayLegal).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "States", href: "/states" }]} />

      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        Loan Regulations by State
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-gray-600">
        Payday lending is legal in <strong>{legalCount} states</strong> and
        prohibited in <strong>{50 - legalCount} states</strong>. Select your
        state below to see specific regulations, APR caps, loan limits, and
        available lending options.
      </p>

      <div className="mb-12 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-900">State</th>
              <th className="px-4 py-3 font-semibold text-gray-900">
                Payday Legal
              </th>
              <th className="px-4 py-3 font-semibold text-gray-900">
                Max Amount
              </th>
              <th className="px-4 py-3 font-semibold text-gray-900">
                Max APR
              </th>
              <th className="px-4 py-3 font-semibold text-gray-900">
                Regulator
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {states.map((state) => (
              <tr key={state.slug} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/states/${state.slug}`}
                    className="font-medium text-brand hover:text-brand-dark"
                  >
                    {state.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {state.paydayLegal ? (
                    <span className="text-brand">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {state.maxLoanAmount
                    ? `$${state.maxLoanAmount.toLocaleString()}`
                    : state.paydayLegal
                      ? "No limit"
                      : "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {state.maxApr ? `${state.maxApr}%` : state.paydayLegal ? "No cap" : "N/A"}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={state.regulatorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand underline"
                  >
                    {state.regulatorName}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Understanding State Lending Laws
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Lending regulations in the United States are primarily governed at
            the state level. Each state sets its own rules regarding maximum
            loan amounts, APR caps, fee limits, loan terms, cooling-off
            periods, and whether rollovers are permitted.
          </p>
          <p>
            States that prohibit payday lending typically have usury laws that
            cap interest rates at levels that make short-term, small-dollar
            lending unprofitable (usually 24-36% APR). In these states,
            consumers may still access personal installment loans from licensed
            online lenders.
          </p>
          <p>
            The Consumer Financial Protection Bureau (CFPB) provides federal
            oversight of lending practices. For state-specific questions or
            complaints, contact your state&apos;s financial regulator listed in
            the table above.
          </p>
        </div>
      </section>
    </div>
  );
}
