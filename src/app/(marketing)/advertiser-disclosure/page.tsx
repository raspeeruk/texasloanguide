import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Advertiser Disclosure",
  description:
    `Learn how ${SITE_NAME} is compensated and how this may affect the products and lenders displayed on our site.`,
  path: "/advertiser-disclosure",
});

export default function AdvertiserDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Advertiser Disclosure", href: "/advertiser-disclosure" },
        ]}
      />

      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Advertiser Disclosure
      </h1>

      <div className="space-y-6 text-gray-600">
        <p>
          {siteConfig.name} is a free service for consumers. We are compensated by
          lenders and financial service providers when consumers are connected
          with them through our platform. This page explains how our
          compensation model works and how it may affect what you see on our
          site.
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          How We Are Compensated
        </h2>
        <p>
          When you submit your information through our platform and are matched
          with a lender, we may receive a referral fee from that lender. The
          amount of compensation varies depending on the lender and the type of
          loan product. We may also receive compensation when you click on
          certain links on our site.
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          How Compensation Affects Our Site
        </h2>
        <p>
          Our compensation may affect how and where lenders appear on our site,
          including the order in which they are displayed. However, our
          editorial content, loan information, educational guides, and
          state-specific regulatory information are not influenced by our
          advertising relationships.
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          What We Do Not Control
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            The interest rates, fees, or terms offered by individual lenders
          </li>
          <li>Whether a lender approves or denies your application</li>
          <li>The speed at which funds are disbursed</li>
          <li>
            Any changes to loan terms after you have been connected with a
            lender
          </li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">Our Commitment</h2>
        <p>
          We strive to provide accurate, up-to-date information about loan
          products and lending regulations. Our editorial team reviews all
          content for accuracy and completeness. If you find any information on
          our site that appears inaccurate, please{" "}
          <Link href="/contact" className="text-brand underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
