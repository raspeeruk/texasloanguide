import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: `${SITE_NAME} terms of service. Read the terms and conditions for using our loan comparison platform.`,
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms-of-service" }]} />

      <h1 className="mb-6 text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="mb-4 text-sm text-gray-500">Last updated: February 2026</p>

      <div className="space-y-6 text-gray-600">
        <p>
          By using {siteConfig.name} (&ldquo;the Service&rdquo;), you agree to these Terms of Service. Please read them carefully.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Service Description</h2>
        <p>
          {siteConfig.name} is a loan comparison service that connects consumers with lenders. We are not a lender, do not make credit decisions, and do not guarantee that you will receive a loan offer. The lenders in our network independently determine whether to offer you a loan, and what rates and terms to provide.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Eligibility</h2>
        <p>
          You must be at least 18 years old and a US resident to use our service. By submitting information through our platform, you represent that all information you provide is accurate and complete.
        </p>

        <h2 className="text-xl font-bold text-gray-900">No Guarantee of Loan Offers</h2>
        <p>
          Submitting your information through {siteConfig.name} does not guarantee that you will receive a loan offer. Approval decisions are made solely by the lenders in our network based on their own criteria.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Third-Party Lenders</h2>
        <p>
          When you are connected with a lender through our platform, your relationship with that lender is governed by their own terms, conditions, and privacy policy. {siteConfig.name} is not responsible for the actions, products, or services of any third-party lender.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Limitation of Liability</h2>
        <p>
          {siteConfig.name} provides information for general educational purposes. We are not financial advisors and do not provide financial advice. You should consult with a qualified financial professional before making any borrowing decisions. Our service is provided &ldquo;as is&rdquo; without warranties of any kind.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href={`mailto:${siteConfig.emails.legal}`} className="text-brand underline">{siteConfig.emails.legal}</a>.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Related Policies</h2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <Link href="/privacy-policy" className="text-brand underline">Privacy Policy</Link> &mdash; how we handle your personal information
          </li>
          <li>
            <Link href="/advertiser-disclosure" className="text-brand underline">Advertiser Disclosure</Link>
          </li>
          <li>
            <Link href="/contact" className="text-brand underline">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
