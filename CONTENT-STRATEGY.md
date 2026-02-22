# FundingZest Content Strategy

## Content Pillars

### 1. Guides (Educational - E-E-A-T Authority Builders)

Long-form, expert-reviewed articles that build topical authority and attract informational search traffic. These pages link heavily to commercial pages (amounts, loan types) and earn backlinks naturally.

**Location**: `/guides/[slug]/`
**Format**: MDX with frontmatter (title, description, author, publishedDate, updatedDate, category, tags)
**Word count**: 2,500-4,000 words
**Schema**: Article + FAQPage + Person (author)
**Publishing cadence**: 2-4 per month

#### Priority Guide Topics (Launch)

| Priority | Title | Target Keyword | Search Intent |
|----------|-------|---------------|---------------|
| 1 | How Payday Loans Work: Complete Guide | how do payday loans work | Informational |
| 2 | Understanding APR on Small Dollar Loans | what is apr on a loan | Informational |
| 3 | Payday Loan Regulations by State [2026] | payday loan laws by state | Informational |
| 4 | Payday Loan Alternatives: 10 Options Before You Borrow | payday loan alternatives | Informational |
| 5 | What Happens If You Can't Repay a Payday Loan | can't repay payday loan | Informational |
| 6 | Cash Advance Apps vs Payday Loans: Which Is Better? | cash advance apps vs payday loans | Comparison |
| 7 | How to Choose Between a Payday Loan and Installment Loan | payday vs installment loan | Comparison |
| 8 | How to Build Credit with Bad Credit or No Credit | build credit with bad credit | Informational |
| 9 | Emergency Fund: How Much You Need and How to Start | emergency fund guide | Informational |
| 10 | How Loan Comparison Sites Work (And How We Make Money) | how loan comparison sites work | Transparency |

#### Guide Content Template

```
1. BLUF Summary (key takeaways in 3-4 bullet points)
2. What is [Topic]? (definition, context)
3. How It Works (step-by-step process)
4. Costs and Fees (specific numbers, examples)
5. Pros and Cons (balanced view — critical for E-E-A-T)
6. Who This Is Best For (audience segmentation)
7. Alternatives (shows objectivity)
8. State Considerations (regulatory notes with links to /states/)
9. FAQ (5-8 questions with FAQPage schema)
10. Author Byline + Last Updated
11. Related Content (internal links to amount pages, loan types)
```

### 2. News & Updates (Freshness Signals)

Short-form content responding to regulatory changes, industry news, and market updates. Keeps the site fresh for Google's freshness signals and positions FundingZest as an up-to-date source.

**Location**: `/news/[slug]/` (future)
**Word count**: 500-1,000 words
**Publishing cadence**: 1-2 per week (once established)

#### News Content Types

- **Regulatory updates**: "New Mexico Caps Payday Loan APR at 36% — What Borrowers Need to Know"
- **Industry reports**: "Payday Loan Demand Up 15% in Q1 2026, CFPB Data Shows"
- **Seasonal content**: "Holiday Borrowing: How to Avoid Debt Traps This Season"
- **App/product updates**: "Earnin Raises Cash Advance Limit to $750 — How It Compares"
- **State-specific**: "[State] Governor Signs New Lending Reform Bill"

### 3. Financial Planning Content (Topical Authority Expansion)

Broader personal finance content that supports the loan comparison core but expands topical authority. These attract links, build E-E-A-T, and capture users earlier in their financial journey.

**Location**: `/guides/[slug]/` (same as guides, tagged by category)
**Word count**: 2,000-3,000 words
**Publishing cadence**: 1-2 per month

#### Financial Planning Topics

| Topic | Angle | Internal Link Opportunity |
|-------|-------|--------------------------|
| How to Create a Budget That Works | Practical steps, templates | Links to loan alternatives sections |
| Understanding Your Credit Score | What affects it, how to check | Links to bad credit loans, credit-builder content |
| Debt Snowball vs Debt Avalanche | Comparison with calculator | Links to installment loans, calculator |
| When Is It OK to Borrow Money? | Decision framework | Links to all loan type pages |
| How to Negotiate Medical Bills | Step-by-step | Links to emergency loans |
| The True Cost of Overdraft Fees | Analysis with alternatives | Links to payday loans, earned wage access |
| How to Read a Loan Agreement | Red flags, key terms | Links to how-it-works, disclosure |
| Credit Union vs Online Lender | Pros/cons comparison | Links to payday alternatives |

---

## Content Production Workflow

### Step 1: Research & Brief (Day 1)
- Identify target keyword and search intent
- Analyze top 5 SERP results for content gaps
- Check AI Overview for that query — what is it citing?
- Draft content brief with required sections, target word count, internal links to include

### Step 2: Draft (Day 2-3)
- Writer creates first draft following the guide template
- Include specific numbers, APR examples, state-specific data
- Add internal links (minimum 5 to relevant FundingZest pages)
- Add external links (minimum 3 to authoritative sources)
- Include FAQ section with 5-8 questions

### Step 3: Expert Review (Day 4)
- Credentialed financial professional reviews for accuracy
- Verify all APR ranges, fee examples, and regulatory claims
- Ensure balanced perspective (pros AND cons, alternatives mentioned)
- Verify state-specific claims against current regulations

### Step 4: SEO Review (Day 5)
- Verify against SEO-BEST-PRACTICES.md checklist
- Check schema markup (Article, FAQPage, Person)
- Verify internal links are working
- Verify external links are to high-DA sources
- Check word count meets minimum
- Verify BLUF summary is present
- Test page speed after adding content

### Step 5: Publish & Promote (Day 5-6)
- Publish to site
- Add internal links from 3+ existing pages to new content
- Submit URL to Google Search Console for indexing
- Share on social channels if applicable
- Monitor Search Console for indexing and initial impressions

### Step 6: Update Cycle (Ongoing)
- Review all guides quarterly for accuracy
- Update "Last updated" date when changes are made
- Refresh with new data, regulatory changes, or market shifts
- Monitor search performance — if position drops, investigate and update

---

## Content Calendar Framework

### Month 1 (Launch)
- 2 foundational guides (How Payday Loans Work, Understanding APR)
- Focus on building internal link network between existing pages

### Month 2
- 2 guides (State Regulations, Payday Alternatives)
- 1 comparison piece (Cash Advance Apps vs Payday Loans)

### Month 3
- 2 guides (Can't Repay, Payday vs Installment)
- 1 financial planning piece (Budget guide)
- Start news/updates cadence (1/week)

### Month 4-6
- 2 guides/month
- 1 financial planning piece/month
- 1-2 news updates/week
- Original research piece: "The True Cost of a $500 Payday Loan in Every US State" (interactive, link-building asset)

### Month 7-12
- Maintain 2-3 content pieces/month
- Expand into higher-value verticals (debt consolidation, installment loans, cash advance apps)
- Commission original research/surveys quarterly for PR and links

---

## Guides Technical Implementation

### MDX Setup (When Ready to Build)

File structure:
```
content/
  guides/
    how-payday-loans-work.mdx
    understanding-apr.mdx
    payday-loan-regulations-by-state.mdx
```

Frontmatter schema:
```yaml
---
title: "How Payday Loans Work: Complete Guide"
description: "Everything you need to know about payday loans..."
author: "sarah-mitchell"
publishedDate: "2026-03-01"
updatedDate: "2026-03-15"
category: "lending-basics"
tags: ["payday-loans", "how-it-works", "beginner"]
readingTime: 12
---
```

### Guide Categories

- `lending-basics` — How loan products work
- `regulations` — State and federal law guides
- `comparison` — Product and lender comparisons
- `financial-planning` — Budgeting, credit building, debt management
- `news` — Industry updates, regulatory changes

---

## Link Building Through Content

### Content Types That Earn Links

1. **Original research** — "The True Cost of Borrowing in Every State" (interactive map)
2. **Data visualizations** — State regulation comparison charts
3. **Comprehensive guides** — "Payday Loan Regulations by State [2026]" (journalistic resource)
4. **Tools** — Loan calculator (attracts embed links from blogs)
5. **Consumer advocacy content** — "How to File a Complaint Against a Lender" (linked by .gov sites)

### Outreach Content Calendar

| Month | Link-Building Asset | Target Links |
|-------|-------------------|-------------|
| 2 | State regulations guide (comprehensive) | Finance bloggers, news outlets |
| 3 | Loan calculator embeddable widget | Personal finance blogs |
| 4 | Original research: cost of $500 loan by state | Journalists, PR, HARO |
| 5 | Consumer rights guide (complaints, protections) | .gov resource pages, nonprofits |
| 6 | Survey: "How Americans Use Short-Term Loans" | Industry publications, news |

---

## Measuring Content Performance

### KPIs Per Content Piece

| Metric | Target (3 months) | Target (6 months) |
|--------|-------------------|-------------------|
| Organic impressions | 1,000+ | 5,000+ |
| Organic clicks | 50+ | 500+ |
| Average position | Top 20 | Top 10 |
| Time on page | 3+ minutes | 4+ minutes |
| Internal link clicks | 10%+ CTR | 15%+ CTR |
| Form starts from page | 2%+ | 4%+ |

### Content Audit Triggers

Review and update a piece when:
- Position drops 5+ places for target keyword
- Competitor publishes superior content on same topic
- Regulatory change affects accuracy
- 6+ months since last update
- User feedback identifies inaccuracy
