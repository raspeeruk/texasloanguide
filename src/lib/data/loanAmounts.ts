import type { LoanAmount } from "@/types/loan";
import { SITE_NAME } from "@/lib/site.config";
import loanAmountsData from "../../../public/data/loan-amounts.json";

const LOAN_AMOUNTS: LoanAmount[] = loanAmountsData.map((item) => ({
  ...item,
  minApr: item.amount <= 1000 ? 200 : item.amount <= 5000 ? 36 : 6,
  maxApr: item.amount <= 1000 ? 664 : item.amount <= 5000 ? 199 : 36,
  minTermMonths: item.amount <= 500 ? 1 : item.amount <= 2000 ? 3 : 6,
  maxTermMonths: item.amount <= 500 ? 6 : item.amount <= 5000 ? 24 : 60,
  description: `Compare ${item.displayAmount} loan options from ${SITE_NAME}'s lender network. Bad credit considered. Apply in minutes.`,
}));

/** All loan amounts regardless of published status */
export function getAllLoanAmounts(): LoanAmount[] {
  return LOAN_AMOUNTS;
}

/** Only loan amounts marked as published — use for pages, sitemap, navigation */
export function getPublishedLoanAmounts(): LoanAmount[] {
  return LOAN_AMOUNTS.filter((la) => la.published);
}

export function getLoanAmountBySlug(slug: string): LoanAmount | undefined {
  return LOAN_AMOUNTS.find((la) => la.slug === slug);
}

/** Slugs for published amounts only — used by generateStaticParams */
export function getPublishedLoanAmountSlugs(): string[] {
  return getPublishedLoanAmounts().map((la) => la.slug);
}

export function getAllLoanAmountSlugs(): string[] {
  return LOAN_AMOUNTS.map((la) => la.slug);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateRepayment(
  principal: number,
  aprPercent: number,
  termMonths: number
): { monthlyPayment: number; totalCost: number; totalInterest: number } {
  const monthlyRate = aprPercent / 100 / 12;
  if (monthlyRate === 0) {
    return {
      monthlyPayment: principal / termMonths,
      totalCost: principal,
      totalInterest: 0,
    };
  }
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  const totalCost = monthlyPayment * termMonths;
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    totalInterest: Math.round((totalCost - principal) * 100) / 100,
  };
}
