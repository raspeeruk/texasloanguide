import type { StateInfo } from "@/types/state";
import statesData from "../../../public/data/states.json";

const STATES: StateInfo[] = statesData as StateInfo[];

/** All states regardless of published status */
export function getAllStates(): StateInfo[] {
  return STATES;
}

/** Only states marked as published — use for pages, sitemap, navigation */
export function getPublishedStates(): StateInfo[] {
  return STATES.filter((s) => s.published);
}

export function getStateBySlug(slug: string): StateInfo | undefined {
  return STATES.find((s) => s.slug === slug);
}

export function getPaydayLegalStates(): StateInfo[] {
  return STATES.filter((s) => s.paydayLegal);
}

export function getAllStateSlugs(): string[] {
  return STATES.map((s) => s.slug);
}

export function getPublishedStateSlugs(): string[] {
  return getPublishedStates().map((s) => s.slug);
}

export function formatApr(apr: number | null): string {
  if (apr === null) return "No cap";
  return `${apr}%`;
}

export function formatCurrency(amount: number | null): string {
  if (amount === null) return "No limit";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
