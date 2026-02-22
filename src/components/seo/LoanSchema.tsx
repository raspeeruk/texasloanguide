import { JsonLd } from "./JsonLd";
import { siteConfig } from "@/lib/site.config";

interface LoanSchemaProps {
  amount: number;
  displayAmount: string;
  minApr: number;
  maxApr: number;
  minTermMonths: number;
  maxTermMonths: number;
  state?: string;
}

export function LoanSchema({
  amount,
  displayAmount,
  minApr,
  maxApr,
  minTermMonths,
  maxTermMonths,
  state,
}: LoanSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LoanOrCredit",
    name: `${displayAmount} Personal Loan`,
    amount: {
      "@type": "MonetaryAmount",
      value: amount,
      currency: "USD",
    },
    annualPercentageRate: {
      "@type": "QuantitativeValue",
      minValue: minApr,
      maxValue: maxApr,
    },
    loanTerm: {
      "@type": "QuantitativeValue",
      minValue: minTermMonths,
      maxValue: maxTermMonths,
      unitCode: "MON",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (state) {
    data.areaServed = {
      "@type": "State",
      name: state,
    };
  }

  return <JsonLd data={data} />;
}
