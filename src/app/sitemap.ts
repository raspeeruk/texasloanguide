import type { MetadataRoute } from "next";
import { getPublishedLoanAmounts } from "@/lib/data/loanAmounts";
import { getPublishedStates, getAllStates } from "@/lib/data/states";
import { getPublishedGuides } from "@/lib/data/guides";
import { SITE_URL, AUTHORS } from "@/lib/site.config";

const LOAN_TYPE_SLUGS = [
  "payday",
  "bad-credit",
  "same-day",
  "emergency",
  "no-credit-check",
  "installment",
];

const AUTHOR_SLUGS = AUTHORS.map((a) => a.slug);

export default function sitemap(): MetadataRoute.Sitemap {
  const loanAmounts = getPublishedLoanAmounts();
  const publishedStates = getPublishedStates();
  const allStates = getAllStates().filter((s) => s.abbreviation !== "DC");

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/borrow`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/loans`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/states`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/advertiser-disclosure`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/editorial-guidelines`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  // Loan type pillar pages
  const loanTypePages: MetadataRoute.Sitemap = LOAN_TYPE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/loans/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Author pages
  const authorPages: MetadataRoute.Sitemap = AUTHOR_SLUGS.map((slug) => ({
    url: `${SITE_URL}/authors/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  // Dollar amount pages — only published
  const amountPages: MetadataRoute.Sitemap = loanAmounts.map((la) => ({
    url: `${SITE_URL}/borrow/${la.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Amount + state pages — published amounts x published states
  const amountStatePages: MetadataRoute.Sitemap = loanAmounts.flatMap((la) =>
    publishedStates.map((state) => ({
      url: `${SITE_URL}/borrow/${la.slug}/${state.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // State hub pages — always include all states (the directory is useful)
  const stateHubPages: MetadataRoute.Sitemap = allStates.map((state) => ({
    url: `${SITE_URL}/states/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Guide pages — only published
  const guidePages: MetadataRoute.Sitemap = getPublishedGuides().map((guide) => ({
    url: `${SITE_URL}/guides/${guide.frontmatter.slug}`,
    lastModified: new Date(guide.frontmatter.updatedDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...loanTypePages,
    ...authorPages,
    ...amountPages,
    ...amountStatePages,
    ...stateHubPages,
    ...guidePages,
  ];
}
