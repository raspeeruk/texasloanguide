import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: `About ${SITE_NAME}`,
  description:
    `${SITE_NAME} is a loan comparison service connecting borrowers with lenders. Learn about our mission, team, and how we help people find the right loan.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        About {siteConfig.name}
      </h1>

      <div className="space-y-6 text-gray-600">
        <p>
          {siteConfig.name} is a loan comparison service that connects borrowers with
          lenders. We are not a lender, do not make credit decisions, and do not
          broker loans. Our goal is to help consumers compare their options and
          find the right loan for their needs.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
        <p>
          We believe that everyone deserves access to transparent, easy-to-understand
          information about borrowing options. Our platform makes it simple to
          compare rates, terms, and fees from multiple lenders so you can make
          an informed decision.
        </p>

        <h2 className="text-xl font-bold text-gray-900">How We Make Money</h2>
        <p>
          {siteConfig.name} earns referral fees when consumers are matched with
          lenders through our platform. This compensation helps us keep our
          service free for consumers. It may influence how and where lenders
          appear on our site, but it does not affect our editorial content or
          the information we provide about each loan option.
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          Our Editorial Standards
        </h2>
        <p>
          All financial content on {siteConfig.name} is reviewed by credentialed
          professionals. We cite official sources including state regulatory
          agencies and the{" "}
          <a
            href="https://www.consumerfinance.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline"
          >
            Consumer Financial Protection Bureau (CFPB)
          </a>
          . Read our{" "}
          <Link
            href="/editorial-guidelines"
            className="text-brand underline"
          >
            editorial guidelines
          </Link>{" "}
          and{" "}
          <Link
            href="/advertiser-disclosure"
            className="text-brand underline"
          >
            advertiser disclosure
          </Link>{" "}
          for details.
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          Learn More
        </h2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <Link href="/how-it-works" className="text-brand underline">
              How {siteConfig.name} Works
            </Link>{" "}
            &mdash; step-by-step guide to our process
          </li>
          <li>
            <Link href="/guides" className="text-brand underline">
              Financial Guides
            </Link>{" "}
            &mdash; expert-reviewed borrowing guides
          </li>
          <li>
            <Link href="/contact" className="text-brand underline">
              Contact Us
            </Link>{" "}
            &mdash; questions, feedback, or media inquiries
          </li>
        </ul>
      </div>
    </div>
  );
}
