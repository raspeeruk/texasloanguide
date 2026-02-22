export interface LoanAmount {
  slug: string;
  amount: number;
  displayAmount: string;
  published: boolean;
  minApr: number;
  maxApr: number;
  minTermMonths: number;
  maxTermMonths: number;
  description: string;
}

export type LoanType =
  | "payday"
  | "bad-credit"
  | "same-day"
  | "emergency"
  | "no-credit-check"
  | "installment";

export interface LoanTypeInfo {
  slug: LoanType;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  minApr: number;
  maxApr: number;
  minTermMonths: number;
  maxTermMonths: number;
}
