export interface StateInfo {
  slug: string;
  name: string;
  abbreviation: string;
  published: boolean;
  paydayLegal: boolean;
  maxLoanAmount: number | null;
  maxApr: number | null;
  maxFeePerHundred: number | null;
  minTermDays: number | null;
  maxTermDays: number | null;
  coolingOffPeriod: string | null;
  rolloverAllowed: boolean | null;
  regulatorName: string;
  regulatorUrl: string;
  medianIncome: number;
  costOfLivingIndex: number;
}

export interface CityInfo {
  slug: string;
  name: string;
  stateSlug: string;
  stateAbbreviation: string;
  population: number;
  medianIncome: number;
  unemploymentRate: number;
  costOfLivingIndex: number;
  paydayLenderCount: number | null;
}
