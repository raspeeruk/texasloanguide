# FundingZest SEO Best Practices & Audit Checklist

This file is the canonical reference for SEO standards across FundingZest. Use it when creating new pages, auditing existing content, or onboarding new contributors.

---

## On-Page SEO Checklist (Every Page)

### Meta & Head

- [ ] **Title tag** via `createMetadata()` — under 60 characters, includes primary keyword
- [ ] **Meta description** — 120-155 characters, includes primary keyword, has a clear value proposition
- [ ] **Canonical URL** — set automatically by `createMetadata({ path })`, verify no duplicate pages exist
- [ ] **Open Graph & Twitter cards** — handled by `createMetadata()`, verify title and description render correctly in social previews

### Content Structure

- [ ] **Single H1** per page — contains the primary keyword naturally
- [ ] **H2 hierarchy** — logical section structure, each H2 should be a potential featured snippet/AI answer
- [ ] **BLUF summary** — every commercial/loan page starts with a `<BLUFSummary>` for AI extraction (GEO)
- [ ] **Word count minimums**:
  - Dollar amount pages (`/borrow/[amount]`): 2,000+ words
  - Amount + state pages (`/borrow/[amount]/[state]`): 1,500+ words with 30-40% unique content
  - Loan type pillar pages (`/loans/[type]`): 3,000+ words
  - Guide articles (`/guides/[slug]`): 2,500-4,000 words
  - State hub pages (`/states/[state]`): 1,500+ words
  - City pages (future): 800-1,200 words with 500+ unique words

### Schema Markup

- [ ] **Organization schema** — on every page (handled by root layout)
- [ ] **BreadcrumbList schema** — on every page with breadcrumbs (`<Breadcrumbs>` component handles this)
- [ ] **LoanOrCredit schema** — on all loan amount pages and amount+state pages (`<LoanSchema>`)
- [ ] **FAQPage schema** — on all pages with FAQ sections (`<FAQSchema>`)
- [ ] **Person schema** — on author pages (`/authors/[slug]`)
- [ ] **Article schema** — on guide/blog posts (when built)
- [ ] Validate all schema at https://search.google.com/test/rich-results

### E-E-A-T (YMYL Requirement)

- [ ] **Author byline** on every content page with credentials and link to author page (`<AuthorByline>`)
- [ ] **"Last updated" date** — visible and accurate on every content page
- [ ] **Affiliate/lead gen disclosure** — on every commercial page (`<AffiliateDisclosure>`)
- [ ] **Disclosure banner** — visible site-wide in header
- [ ] **Citations to authoritative sources** — state regulators, CFPB, federal agencies
- [ ] **External links to high-DA sites** — each content page should link to at least 2-3 authoritative external sources

---

## Internal Linking Rules

### Minimum Internal Links Per Page Type

| Page Type | Min Internal Links | Must Link To |
|-----------|-------------------|--------------|
| Homepage | 15+ | Top amounts, loan types, how-it-works, apply |
| Dollar amount page | 10+ | State pages, apply, other amounts, loan types, calculator |
| Amount + state page | 8+ | Parent amount page, other amounts in state, state hub, regulator, apply |
| Loan type pillar | 10+ | Relevant amounts, states, calculator, other loan types, apply |
| State hub page | 8+ | Amount+state pages, loan types, regulator, apply |
| Guide/blog post | 5+ | Relevant amount pages, loan type pages, calculator, other guides |
| Author page | 3+ | Editorial guidelines, other content |
| Trust pages | 2+ | Contact, related trust pages |

### Internal Linking Best Practices

1. **Use descriptive anchor text** — Never "click here" or "learn more" alone. Use: "$500 loan options in California", "payday loan regulations", "loan repayment calculator"
2. **Link contextually** — Links should appear naturally within paragraph content, not just in lists
3. **Cross-link related content** — Amount pages link to loan type pages and vice versa
4. **Hub-and-spoke model** — Hub pages (/borrow, /loans, /states) link to all child pages; child pages link back to hub
5. **Every page within 3 clicks of homepage** — No orphan pages
6. **New pages get at least 3 internal links** from existing pages within 48 hours of publishing

### Anchor Text Guidelines

- **Exact match**: Use the primary keyword 1-2 times per page (e.g., "$500 loans")
- **Partial match**: Variations 2-3 times (e.g., "borrow $500", "five hundred dollar loan options")
- **Branded**: Occasional "FundingZest" anchors to internal pages
- **Natural**: Most anchors should read naturally in context
- **Never**: "click here", "this page", "read more" as standalone anchors

---

## External Linking Rules

### Required External Links by Page Type

| Page Type | External Links Required |
|-----------|----------------------|
| Amount + state pages | State regulator website (required), CFPB (recommended) |
| Loan type pillars | CFPB, 1-2 educational sources, credit counseling resources |
| State hub pages | State regulator (required), CFPB, 211.org for assistance |
| Guides/blog | 3-5 authoritative sources cited |
| Trust pages | Regulatory bodies where relevant |

### High-Authority External Link Targets

These domains are strong signals for YMYL content:

- **consumerfinance.gov** (CFPB) — Federal lending regulations, consumer complaints
- **State regulator websites** — Already in `states.json` regulatorUrl field
- **fdic.gov** — Banking regulations
- **ftc.gov** — Consumer protection, scam warnings
- **211.org** — Local assistance programs
- **annualcreditreport.com** — Free credit reports
- **investor.gov** — SEC financial education
- **usa.gov** — Government benefits, assistance programs
- **nfcc.org** — National Foundation for Credit Counseling
- **bls.gov** — Bureau of Labor Statistics (economic data citations)
- **census.gov** — Census data citations

### External Link Rules

1. All external links use `target="_blank" rel="noopener noreferrer"`
2. Link to .gov, .edu, and established .org domains when available
3. Never link to competitor comparison sites
4. Never link to individual lenders (conflict of interest with lead gen model)
5. Verify external links quarterly — broken links hurt SEO and trust

---

## Technical SEO

### Page Speed (Core Web Vitals)

- [ ] **LCP** (Largest Contentful Paint) < 2.5 seconds
- [ ] **INP** (Interaction to Next Paint) < 200ms
- [ ] **CLS** (Cumulative Layout Shift) < 0.1
- [ ] Images use `next/image` with proper `width`/`height` to prevent CLS
- [ ] No render-blocking JavaScript in initial load
- [ ] Client components (`"use client"`) only where interactivity is required

### Rendering Strategy

- **SSG** (`generateStaticParams`): Dollar amount pages, loan type pillars, author pages, state hub pages
- **ISR** (future, `revalidate`): City-level pages, guide articles
- **Static**: All trust/marketing pages, calculator, sitemap, robots.txt
- Client components: FAQAccordion, LoanCalculator, future forms only

### URL Structure

- Lowercase, hyphenated slugs only
- No trailing slashes (Next.js default)
- No URL parameters for content pages
- Canonical URLs set on every page via `createMetadata()`
- Pattern: `/borrow/[amount]-dollar-loan/[state]/[city]/`

### Sitemap

- Generated dynamically in `src/app/sitemap.ts`
- Only includes published pages (`published: true` in data files)
- Priority hierarchy: homepage (1.0) > amounts/loan types (0.9) > states (0.6-0.7) > trust pages (0.3)
- Submitted to Google Search Console and Bing Webmaster Tools

### Robots.txt

- Allows all crawlers
- Blocks `/api/` and `/apply/` (no-index lead capture)
- Points to sitemap.xml

---

## Content Quality Standards (YMYL)

### Every Loan Content Page Must Have

1. Representative APR examples with specific numbers
2. Clear statement that FundingZest is not a lender
3. Affiliate/lead gen disclosure
4. State regulator reference (on state-specific pages)
5. "Last updated" date
6. Author byline with verifiable credentials
7. Alternatives section (shows objectivity — critical for E-E-A-T)
8. FAQ section with FAQPage schema

### Content Differentiation (Anti-Thin Content)

- Amount pages: Unique cost calculations, state availability grid
- Amount + state pages: State-specific regulations, economic context, local alternatives — minimum 30-40% unique vs parent amount page
- City pages (future): Census/BLS data, local lender counts, city ordinances — minimum 500 unique words
- Never duplicate content across pages — each must have genuinely unique information

---

## GEO (Generative Engine Optimization)

### Formatting for AI Extraction

1. **BLUF boxes** — Structured summary at top of every commercial page
2. **Q&A format** — FAQs match conversational search queries ("Can I get a $500 loan with bad credit?")
3. **Comparison tables** — Clear headers, structured data that AI can parse
4. **Specific numbers** — "$500 at 399% APR costs $665 total over 3 months" not "costs vary"
5. **Speakable content** — Key sections use clear, citation-worthy language
6. **FAQPage schema** — Enables FAQ rich results and AI extraction

### Content Patterns That Get Cited by AI

- Direct answers in the first sentence of each section
- Numerical data points (APR ranges, dollar amounts, time periods)
- Comparison format ("X vs Y" sections)
- Step-by-step processes (numbered lists)
- State-specific regulatory facts (unique, hard to find elsewhere)

---

## Quarterly SEO Audit Checklist

### Technical

- [ ] Run Lighthouse on top 10 pages — all Core Web Vitals green
- [ ] Check Google Search Console for crawl errors, index coverage issues
- [ ] Validate schema on top 10 pages via Rich Results Test
- [ ] Verify all sitemap URLs are indexable (not 404, not redirected)
- [ ] Check for duplicate content issues (Search Console > Coverage)
- [ ] Verify robots.txt is correct

### Content

- [ ] Review top 50 pages for content freshness — update "Last updated" dates
- [ ] Check all state regulation data against current state laws
- [ ] Verify all APR ranges and fee examples are accurate
- [ ] Review programmatic pages for thin content signals
- [ ] Ensure all pages meet word count minimums (see table above)

### Links

- [ ] Run broken link checker on all internal links
- [ ] Verify all external links still work (especially .gov sites)
- [ ] Check for new internal linking opportunities (new pages need links)
- [ ] Review anchor text distribution — not over-optimized
- [ ] Verify no orphan pages exist (every page reachable from navigation + sitemap)

### Competitive

- [ ] Check SERP positions for top 25 target keywords
- [ ] Review top 3 competitors' new content for gaps
- [ ] Monitor AI Overview citations — are we being cited?
- [ ] Track referring domains growth (target: 20-30/month)

---

## Published Flag Workflow

When releasing new content:

1. Set `"published": true` in `loan-amounts.json` or `states.json`
2. Verify the page renders correctly locally (`npm run dev`)
3. Deploy to Vercel
4. Submit updated sitemap to Google Search Console
5. Add internal links from existing pages to the new page (minimum 3)
6. Monitor Search Console for indexing within 48 hours

Rollout cadence:
- **Week 1**: Trust pages + 5 seed amount pages (done)
- **Week 2**: 5 more amount pages
- **Week 3-4**: Remaining amount pages
- **Month 2**: State pages in batches of 50-100/week
- **Month 3+**: City pages via ISR
