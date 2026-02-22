// ============================================================================
// Site Configuration
// ============================================================================
// This is the SINGLE SOURCE OF TRUTH for all brand-specific values.
// Every component imports from here. To create a new site from this template,
// change these values and the entire site rebrands.
// ============================================================================

export interface Author {
  slug: string;
  name: string;
  credentials: string;
  title: string;
  bio: string;
  expertise: string[];
  education: string;
  linkedin?: string;
}

export interface SiteConfig {
  // Brand identity
  name: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;

  // Contact
  emails: {
    support: string;
    privacy: string;
    legal: string;
  };

  // Template variant: "sidebar" | "editorial" | "astro" | "static"
  variant: string;

  // Authors (E-E-A-T personas)
  authors: Author[];

  // Niche focus
  niche: {
    type: "general" | "state-specific" | "loan-type-specific" | "audience-specific";
    focusStates: string[]; // Empty = all states
    focusLoanTypes: string[]; // Empty = all types
    includeCityPages: boolean;
  };

  // Content voice
  voice: {
    tone:
      | "professional-helpful"
      | "casual-friendly"
      | "authoritative-educational"
      | "empathetic-advocacy"
      | "direct-no-nonsense";
    companyDescriptor: string; // e.g., "loan comparison service"
  };

  // Social profiles
  social: {
    linkedin: string;
    twitter: string;
  };

  // Analytics (populated after site setup)
  analytics: {
    gaId: string; // GA4 Measurement ID (G-XXXXXXX)
    gscProperty: string; // Search Console property
  };

  // Cross-linking targets (populated by factory)
  crossLinks: Array<{
    name: string;
    url: string;
    anchor: string;
  }>;
}

// ============================================================================
// TexasLoanGuide Configuration
// ============================================================================

export const siteConfig: SiteConfig = {
  name: "TexasLoanGuide",
  domain: "texasloanguide.com",
  url: "https://texasloanguide.com",
  tagline: "Compare loan options with TexasLoanGuide",
  description:
    "TexasLoanGuide connects you with lenders offering competitive rates. Compare options, check rates, and apply — all in one place.",

  emails: {
    support: "support@texasloanguide.com",
    privacy: "privacy@texasloanguide.com",
    legal: "legal@texasloanguide.com",
  },

  variant: "sidebar",

  authors: [
    {
      slug: "nicole-taylor",
      name: "Nicole Taylor",
      credentials: "CFP",
      title: "Certified Financial Planner",
      bio: "Nicole Taylor is a Certified Financial Planner (CFP) specializing in consumer lending, personal finance, and financial education. Nicole Taylor reviews all financial content on TexasLoanGuide for accuracy and consumer protection.",
      expertise: [
        "Personal finance and budgeting",
        "Consumer lending and credit products",
        "Financial literacy education",
        "Debt management strategies",
        "Loan comparison and analysis",
      ],
      education: "B.S. Finance, University of Florida",
      linkedin: "https://linkedin.com",
    },
    {
      slug: "emily-johnson",
      name: "Emily Johnson",
      credentials: "CPA",
      title: "Certified Public Accountant",
      bio: "Emily Johnson is a Certified Public Accountant (CPA) specializing in consumer lending, personal finance, and financial education. Emily Johnson reviews all financial content on TexasLoanGuide for accuracy and consumer protection.",
      expertise: [
        "Personal finance and budgeting",
        "Consumer lending and credit products",
        "Financial literacy education",
        "Debt management strategies",
        "Loan comparison and analysis",
      ],
      education: "B.S. Accounting, Indiana University",
      linkedin: "https://linkedin.com",
    },
    {
      slug: "daniel-harris",
      name: "Daniel Harris",
      credentials: "CFA",
      title: "Chartered Financial Analyst",
      bio: "Daniel Harris is a Chartered Financial Analyst (CFA) specializing in consumer lending, personal finance, and financial education. Daniel Harris reviews all financial content on TexasLoanGuide for accuracy and consumer protection.",
      expertise: [
        "Personal finance and budgeting",
        "Consumer lending and credit products",
        "Financial literacy education",
        "Debt management strategies",
        "Loan comparison and analysis",
      ],
      education: "M.S. Finance, Georgetown University",
      linkedin: "https://linkedin.com",
    }
  ],

  niche: {
    type: "state-specific",
    focusStates: ["texas"],
    focusLoanTypes: [],
    includeCityPages: true,
  },

  voice: {
    tone: "casual-friendly",
    companyDescriptor: "loan comparison platform",
  },

  social: {
    linkedin: "",
    twitter: "",
  },

  analytics: {
    gaId: "",
    gscProperty: "",
  },

  crossLinks: [],
};

// ============================================================================
// Convenience exports
// ============================================================================

export const SITE_NAME = siteConfig.name;
export const SITE_URL = siteConfig.url;
export const SITE_DESCRIPTION = siteConfig.description;
export const AUTHORS = siteConfig.authors;
