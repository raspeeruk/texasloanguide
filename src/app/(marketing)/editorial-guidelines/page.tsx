import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig, SITE_NAME } from "@/lib/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Editorial Guidelines",
  description:
    `Learn about ${SITE_NAME}'s editorial standards, content review process, and commitment to accurate financial information.`,
  path: "/editorial-guidelines",
});

export default function EditorialGuidelinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Editorial Guidelines", href: "/editorial-guidelines" },
        ]}
      />

      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Editorial Guidelines
      </h1>

      <div className="space-y-6 text-gray-600">
        <p>
          At {siteConfig.name}, we are committed to providing accurate, helpful, and
          transparent financial information. These guidelines outline how we
          create, review, and maintain our content.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Content Standards</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            All financial content is reviewed by qualified professionals with
            experience in personal finance and lending
          </li>
          <li>
            We cite official sources including state regulatory agencies, the
            CFPB, and federal regulations where applicable
          </li>
          <li>
            APR ranges, fee structures, and loan terms are researched and
            verified before publication
          </li>
          <li>
            State-specific content reflects current regulations as of the
            published date
          </li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">Review Process</h2>
        <p>
          Every piece of content on {siteConfig.name} goes through the following
          review process:
        </p>
        <ol className="list-inside list-decimal space-y-2">
          <li>Research and drafting by a writer with financial knowledge</li>
          <li>Fact-checking of all claims, rates, and regulatory details</li>
          <li>Review by a credentialed financial professional</li>
          <li>
            Regular updates to ensure information remains current and accurate
          </li>
        </ol>

        <h2 className="text-xl font-bold text-gray-900">
          Updates and Accuracy
        </h2>
        <p>
          Financial regulations and lender offerings change frequently. We
          review and update our content regularly. Every page displays a
          &ldquo;Last Updated&rdquo; date so you know when the information was
          last verified. If you notice any inaccurate information, please{" "}
          <Link href="/contact" className="text-brand underline">
            let us know
          </Link>
          .
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          Independence from Advertisers
        </h2>
        <p>
          Our editorial content is independent from our advertising
          relationships. Lender compensation does not influence the accuracy of
          our regulatory information, educational guides, or the details we
          provide about loan products. See our{" "}
          <Link
            href="/advertiser-disclosure"
            className="text-brand underline"
          >
            advertiser disclosure
          </Link>{" "}
          for more details.
        </p>
      </div>
    </div>
  );
}
