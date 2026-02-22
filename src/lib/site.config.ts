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
// FundingZest Configuration
// ============================================================================

export const siteConfig: SiteConfig = {
  name: "FundingZest",
  domain: "fundingzest.com",
  url: "https://fundingzest.com",
  tagline: "Compare Personal Loans & Payday Loans Online",
  description:
    "Compare personal loan and payday loan options from FundingZest's network of lenders. Bad credit considered. Apply in minutes, funds as soon as same day.",

  emails: {
    support: "support@fundingzest.com",
    privacy: "privacy@fundingzest.com",
    legal: "legal@fundingzest.com",
  },

  variant: "sidebar",

  authors: [
    {
      slug: "sarah-mitchell",
      name: "Sarah Mitchell",
      credentials: "CFP",
      title: "Certified Financial Planner",
      bio: "Sarah Mitchell is a Certified Financial Planner (CFP) with over 10 years of experience in personal finance and consumer lending. She specializes in helping consumers understand short-term lending products, compare loan options, and make informed borrowing decisions. Sarah reviews all financial content on FundingZest for accuracy, regulatory compliance, and consumer protection.",
      expertise: [
        "Personal finance and budgeting",
        "Consumer lending and credit products",
        "State lending regulations",
        "Financial literacy education",
        "Debt management strategies",
      ],
      education: "B.S. Finance, University of Michigan",
      linkedin: "https://linkedin.com",
    },
    {
      slug: "james-carter",
      name: "James Carter",
      credentials: "CFA",
      title: "Chartered Financial Analyst",
      bio: "James Carter is a Chartered Financial Analyst (CFA) with expertise in consumer credit markets, risk assessment, and financial product analysis. He brings 8 years of experience in financial services, including roles at consumer lending institutions and financial advisory firms. James contributes in-depth analyses of loan products, APR calculations, and market trends for FundingZest.",
      expertise: [
        "Consumer credit analysis",
        "APR and fee structure analysis",
        "Financial product comparison",
        "Risk assessment",
        "Market trend analysis",
      ],
      education: "M.B.A. Finance, NYU Stern School of Business",
      linkedin: "https://linkedin.com",
    },
    {
      slug: "maria-gonzalez",
      name: "Maria Gonzalez",
      credentials: "AFC",
      title: "Accredited Financial Counselor",
      bio: "Maria Gonzalez is an Accredited Financial Counselor (AFC) focused on consumer advocacy and financial education. With 7 years of experience counseling individuals on borrowing decisions, debt management, and financial planning, she ensures FundingZest's content prioritizes consumer interests. Maria is passionate about helping underserved communities access fair financial products.",
      expertise: [
        "Consumer financial counseling",
        "Debt management and repayment strategies",
        "Financial education and literacy",
        "Consumer protection regulations",
        "Underserved community financial access",
      ],
      education: "M.A. Financial Planning, Kansas State University",
      linkedin: "https://linkedin.com",
    },
  ],

  niche: {
    type: "general",
    focusStates: [],
    focusLoanTypes: [],
    includeCityPages: false,
  },

  voice: {
    tone: "professional-helpful",
    companyDescriptor: "loan comparison service",
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
// Convenience exports (for backward compatibility during refactor)
// ============================================================================

export const SITE_NAME = siteConfig.name;
export const SITE_URL = siteConfig.url;
export const SITE_DESCRIPTION = siteConfig.description;
export const AUTHORS = siteConfig.authors;
