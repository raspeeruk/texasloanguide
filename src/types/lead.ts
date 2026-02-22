export interface LeadFormData {
  // Step 1 - Loan Details
  loanAmount: number;
  loanPurpose: string;
  state: string;

  // Step 2 - Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;

  // Step 3 - Income & Employment
  employmentStatus: string;
  monthlyIncome: number;
  payFrequency: string;
  timeAtEmployer: string;
}

export interface LeadSubmission extends LeadFormData {
  id: string;
  createdAt: string;
  sourceUrl: string;
  ipAddress: string;
  userAgent: string;
  status: "pending" | "submitted" | "accepted" | "rejected";
}

export type FormStep = 1 | 2 | 3 | 4;

export const LOAN_PURPOSES = [
  "Debt Consolidation",
  "Emergency Expense",
  "Medical Bills",
  "Car Repair",
  "Home Improvement",
  "Moving Costs",
  "Other",
] as const;

export const EMPLOYMENT_STATUSES = [
  "Employed Full-Time",
  "Employed Part-Time",
  "Self-Employed",
  "Retired",
  "Benefits/Disability",
  "Unemployed",
] as const;

export const PAY_FREQUENCIES = [
  "Weekly",
  "Bi-Weekly",
  "Semi-Monthly",
  "Monthly",
] as const;

export const TIME_AT_EMPLOYER_OPTIONS = [
  "Less than 6 months",
  "6-12 months",
  "1-2 years",
  "2-5 years",
  "5+ years",
] as const;
